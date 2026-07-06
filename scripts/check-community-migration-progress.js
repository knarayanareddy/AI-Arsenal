#!/usr/bin/env node
// Tracks progress of the community-vertical reorganisation (kind/topics/
// audience/access/activity_level/activity_evidence/last_checked/
// safety_level/how_to_get_value/what_to_avoid fields + content/community/
// {forums,chat,newsletters,events,meetups,creators,datasets}/ folders,
// replacing the generic entry_type: "guide" + section: "community"
// directory-style aggregator files previously used for community pointers).
//
// Usage:
//   node scripts/check-community-migration-progress.js              # report only, exit 0
//   node scripts/check-community-migration-progress.js --enforce     # exit 1 if < 100%
//
// Mirrors the observability-vertical guard script's structure exactly:
// tracks migration OUT of the generic 'guide' type into the new dedicated
// 'community' type, not within-type field completion, since
// community.schema.json has no optional-then-required migration window
// (see its x-migration-note). Pre-existing entries that were RETIRED during
// migration (superseded by an existing person entry's channels[], or
// retired as a pure routing/index page duplicating an auto-generated
// index) are excluded from the denominator entirely via
// RETIRED_LEGACY_IDS, rather than counted as permanently "pending" for a
// migration that will never happen. content/community/people/*.md person
// entries are intentionally OUT OF SCOPE for this vertical entirely (they
// already have a dedicated, compliant entry type -- person.schema.json --
// predating this reorganisation) and are excluded via a path check, not
// RETIRED_LEGACY_IDS, since they were never "pending" in the first place.
// See docs/automation-policy.md and scripts/check-observability-migration-progress.js.

import chalk from 'chalk';
import { getMarkdownFiles, readMarkdown, isNavigationFile, normalizePath } from './utils/frontmatter.js';
import { writeJson } from './utils/entries.js';

const VALID_KINDS = new Set(['forum', 'chat', 'newsletter', 'event', 'meetup', 'creator', 'dataset']);
const KIND_TO_FOLDER = {
  forum: 'forums',
  chat: 'chat',
  newsletter: 'newsletters',
  event: 'events',
  meetup: 'meetups',
  creator: 'creators',
  dataset: 'datasets'
};

// content/community/{discord-communities,newsletters,podcasts,youtube-channels,
// people-to-follow}.md were retired (not migrated) during the Phase 1 audit:
// they mixed entity kinds (Failure Mode 4), carried no activity evidence or
// safety notes, and in two cases (Simon Willison Weblog, Andrej Karpathy
// YouTube) duplicated a channel already tracked on an existing person
// entry. See .migration/community-audit-report.md for the full reasoning.
// Excluded from the migration denominator since there is no migrated
// destination for these specific files -- they were deleted, not moved.
const RETIRED_LEGACY_IDS = new Set([
  'discord-communities',
  'newsletters',
  'podcasts',
  'youtube-channels',
  'people-to-follow'
]);

const enforce = process.argv.includes('--enforce');

const allCommunityFiles = (await getMarkdownFiles('content/community/**/*.md'))
  .filter((f) => !isNavigationFile(f))
  // content/community/people/*.md is a pre-existing, already-compliant
  // entry type (person.schema.json) and is not part of this vertical's
  // migration surface at all.
  .filter((f) => !normalizePath(f).startsWith('content/community/people/'));

const migrated = [];
const pending = [];

for (const file of allCommunityFiles) {
  const { data, hasFrontmatter } = await readMarkdown(file);
  if (!hasFrontmatter) continue;
  if (RETIRED_LEGACY_IDS.has(data.id)) continue;

  const isMigrated = data.entry_type === 'community' && Boolean(data.kind) && VALID_KINDS.has(data.kind);
  const folder = file.split('/')[2]; // content/community/{kind-folder}/{id}.md

  if (isMigrated) {
    const expectedFolder = KIND_TO_FOLDER[data.kind];
    const kindFolderMismatch = expectedFolder !== folder;
    const record = {
      id: data.id,
      file,
      kind: data.kind,
      folder,
      enrichment_status: data.enrichment_status ?? null,
      activity_level: data.activity_level ?? null,
      safety_level: data.safety_level ?? null,
      kind_folder_mismatch: Boolean(kindFolderMismatch)
    };
    if (!kindFolderMismatch) migrated.push(record);
    else pending.push({ ...record, missing_fields: ['kind-folder-mismatch'] });
  } else {
    pending.push({
      id: data.id ?? file,
      file,
      kind: null,
      folder: `${folder} (unmigrated, entry_type is "${data.entry_type ?? 'unset'}", not "community")`,
      enrichment_status: null,
      missing_fields: ['entry_type', 'kind', 'url', 'topics', 'audience', 'access', 'activity_level', 'activity_evidence', 'last_checked', 'safety_level', 'how_to_get_value', 'what_to_avoid']
    });
  }
}

// Derived from migrated+pending (both of which explicitly skip retired
// files via the `continue` above), NOT allCommunityFiles.length minus a
// fixed RETIRED_LEGACY_IDS.size -- see the identical, previously-fixed
// arithmetic bug in check-observability-migration-progress.js's history:
// that subtraction is only correct while a retired file still physically
// exists on disk, and double-counts the retirement (producing an inflated
// percentage) once the file has actually been deleted, which is the
// normal end state here since all five legacy files are deleted in this
// migration's first content commit.
const total = migrated.length + pending.length;
const migratedCount = migrated.length;
const percent = total === 0 ? 100 : Math.round((migratedCount / total) * 1000) / 10;

const draftCount = migrated.filter((m) => m.enrichment_status === 'draft').length;
const unknownActivityCount = migrated.filter((m) => m.activity_level === 'unknown').length;
const cautionOrAvoidCount = migrated.filter((m) => m.safety_level && m.safety_level !== 'generally-safe').length;

const report = {
  generated_at: new Date().toISOString(),
  total_community_files: total,
  migrated_count: migratedCount,
  pending_count: pending.length,
  percent_migrated: percent,
  draft_enrichment_count: draftCount,
  unknown_activity_count: unknownActivityCount,
  caution_or_avoid_safety_count: cautionOrAvoidCount,
  retired_legacy_ids: [...RETIRED_LEGACY_IDS],
  pending_entries: pending,
  migrated_entries: migrated.map((m) => m.id)
};

await writeJson('data/community-migration-progress.json', report);

console.log(chalk.bold(`Community migration progress: ${migratedCount}/${total} (${percent}%)`));
if (RETIRED_LEGACY_IDS.size > 0) {
  console.log(chalk.blue(`${RETIRED_LEGACY_IDS.size} entr${RETIRED_LEGACY_IDS.size === 1 ? 'y' : 'ies'} retired (not migrated, superseded/duplicative; not counted above): ${[...RETIRED_LEGACY_IDS].join(', ')}.`));
}
if (draftCount > 0) {
  console.log(chalk.yellow(`${draftCount} migrated entr${draftCount === 1 ? 'y has' : 'ies have'} enrichment_status: draft (activity evidence not yet independently re-confirmed by a maintainer).`));
}
if (unknownActivityCount > 0) {
  console.log(chalk.yellow(`${unknownActivityCount} migrated entr${unknownActivityCount === 1 ? 'y has' : 'ies have'} activity_level: unknown (no credible public activity signal found as of last_checked).`));
}
if (cautionOrAvoidCount > 0) {
  console.log(chalk.yellow(`${cautionOrAvoidCount} migrated entr${cautionOrAvoidCount === 1 ? 'y has' : 'ies have'} safety_level other than generally-safe.`));
}

if (pending.length) {
  console.log(chalk.yellow(`${pending.length} community entr${pending.length === 1 ? 'y' : 'ies'} not yet fully migrated:`));
  for (const item of pending.slice(0, 50)) {
    const reasons = item.missing_fields ?? [];
    console.log(chalk.yellow(`- ${item.id} (${item.file}): ${reasons.join(', ')}`));
  }
  if (pending.length > 50) console.log(chalk.yellow(`... and ${pending.length - 50} more. See data/community-migration-progress.json.`));
}

if (enforce && pending.length > 0) {
  console.error(chalk.red(`Migration enforcement failed: ${pending.length} community entr${pending.length === 1 ? 'y' : 'ies'} not yet migrated. Run without --enforce to see the full list.`));
  process.exit(1);
}

if (pending.length === 0) {
  console.log(chalk.green('All community entries are fully migrated to the dedicated community type and kind-folder model.'));
}

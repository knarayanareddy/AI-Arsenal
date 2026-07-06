#!/usr/bin/env node
// Tracks progress of the observability-vertical reorganisation (category/
// scope/signal_types/verification_status/data_sensitivity/
// instrumentation_contract/enrichment_status fields + content/observability/
// {category}/ folders, replacing the generic entry_type: "guide" + section:
// "observability" combination previously used for all pre-existing
// observability entries).
//
// Usage:
//   node scripts/check-observability-migration-progress.js              # report only, exit 0
//   node scripts/check-observability-migration-progress.js --enforce     # exit 1 if < 100%
//
// Mirrors the architectures-vertical guard script's structure exactly:
// tracks migration OUT of the generic 'guide' type into the new dedicated
// 'observability' type, not within-type field completion, since
// observability.schema.json has no optional-then-required migration window
// (see its x-migration-note). A pre-existing entry that was RETIRED during
// migration (superseded by a canonical entry elsewhere, e.g. an
// architecture decision-tree entry that already covers the same ground --
// see .migration/observability-audit-report.md) is excluded from the
// denominator entirely via RETIRED_LEGACY_IDS, rather than counted as
// permanently "pending" for a migration that will never happen.
// See docs/automation-policy.md and scripts/check-architectures-migration-progress.js.

import chalk from 'chalk';
import { getMarkdownFiles, readMarkdown, isNavigationFile } from './utils/frontmatter.js';
import { writeJson } from './utils/entries.js';

const VALID_CATEGORIES = new Set([
  'instrumentation',
  'tracing',
  'evaluation-quality',
  'monitoring-alerting',
  'cost-usage',
  'privacy-governance',
  'incident-response'
]);

// content/observability/overview.md was retired (not migrated) during the
// Phase 1 audit: its decision-tree content substantially duplicated
// content/architectures/evaluation-strategy/choose-observability-tool.md,
// which already exists and is the correct canonical home for "which
// observability tool should I pick." See .migration/observability-audit-
// report.md for the full reasoning. Excluded from the migration
// denominator since there is no migrated destination for this specific
// file -- it was deleted, not moved.
const RETIRED_LEGACY_IDS = new Set(['overview']);

const enforce = process.argv.includes('--enforce');

const allObsFiles = (await getMarkdownFiles('content/observability/**/*.md')).filter((f) => !isNavigationFile(f));

const migrated = [];
const pending = [];

for (const file of allObsFiles) {
  const { data, hasFrontmatter } = await readMarkdown(file);
  if (!hasFrontmatter) continue;
  if (RETIRED_LEGACY_IDS.has(data.id)) continue;

  const isMigrated = data.entry_type === 'observability' && Boolean(data.category);
  const folder = file.split('/')[2]; // content/observability/{category-folder}/{id}.md

  if (isMigrated) {
    const categoryFolderMismatch = VALID_CATEGORIES.has(folder) && data.category !== folder;
    const record = {
      id: data.id,
      file,
      category: data.category ?? null,
      folder: VALID_CATEGORIES.has(folder) ? folder : `${folder} (unrecognised)`,
      enrichment_status: data.enrichment_status ?? null,
      category_folder_mismatch: Boolean(categoryFolderMismatch)
    };
    if (!categoryFolderMismatch) migrated.push(record);
    else pending.push({ ...record, missing_fields: ['category-folder-mismatch'] });
  } else {
    pending.push({
      id: data.id ?? file,
      file,
      category: null,
      folder: `${folder} (unmigrated, entry_type is "${data.entry_type ?? 'unset'}", not "observability")`,
      enrichment_status: null,
      missing_fields: ['entry_type', 'category', 'scope', 'signal_types', 'verification_status', 'data_sensitivity', 'instrumentation_contract', 'enrichment_status']
    });
  }
}

const total = allObsFiles.length - RETIRED_LEGACY_IDS.size;
const migratedCount = migrated.length;
const percent = total === 0 ? 100 : Math.round((migratedCount / total) * 1000) / 10;

const draftCount = migrated.filter((m) => m.enrichment_status === 'draft').length;

const report = {
  generated_at: new Date().toISOString(),
  total_observability_files: total,
  migrated_count: migratedCount,
  pending_count: pending.length,
  percent_migrated: percent,
  draft_enrichment_count: draftCount,
  retired_legacy_ids: [...RETIRED_LEGACY_IDS],
  pending_entries: pending,
  migrated_entries: migrated.map((m) => m.id)
};

await writeJson('data/observability-migration-progress.json', report);

console.log(chalk.bold(`Observability migration progress: ${migratedCount}/${total} (${percent}%)`));
if (RETIRED_LEGACY_IDS.size > 0) {
  console.log(chalk.blue(`${RETIRED_LEGACY_IDS.size} entr${RETIRED_LEGACY_IDS.size === 1 ? 'y' : 'ies'} retired (not migrated, superseded by a canonical entry elsewhere; not counted above): ${[...RETIRED_LEGACY_IDS].join(', ')}.`));
}
if (draftCount > 0) {
  console.log(chalk.yellow(`${draftCount} migrated entr${draftCount === 1 ? 'y has' : 'ies have'} enrichment_status: draft (verification_status claims not yet independently re-confirmed by a maintainer).`));
}

if (pending.length) {
  console.log(chalk.yellow(`${pending.length} observability entr${pending.length === 1 ? 'y' : 'ies'} not yet fully migrated:`));
  for (const item of pending.slice(0, 50)) {
    const reasons = item.missing_fields ?? [];
    console.log(chalk.yellow(`- ${item.id} (${item.file}): ${reasons.join(', ')}`));
  }
  if (pending.length > 50) console.log(chalk.yellow(`... and ${pending.length - 50} more. See data/observability-migration-progress.json.`));
}

if (enforce && pending.length > 0) {
  console.error(chalk.red(`Migration enforcement failed: ${pending.length} observability entr${pending.length === 1 ? 'y' : 'ies'} not yet migrated. Run without --enforce to see the full list.`));
  process.exit(1);
}

if (pending.length === 0) {
  console.log(chalk.green('All observability entries are fully migrated to the dedicated observability type and category-folder model.'));
}

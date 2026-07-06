#!/usr/bin/env node
// Tracks progress of the architectures-vertical reorganisation (category/
// decision_type/approaches/key_factors/has_decision_framework/confidence/
// tradeoffs_as_of/enrichment_status fields + content/architectures/{category}/
// folders, replacing the generic entry_type: "guide" + section:
// "architectures" combination previously used for all 14 pre-existing
// architecture entries).
//
// Usage:
//   node scripts/check-architectures-migration-progress.js              # report only, exit 0
//   node scripts/check-architectures-migration-progress.js --enforce     # exit 1 if < 100%
//
// Unlike the tools/projects/research/tips/build-examples-vertical guard
// scripts, this one tracks migration OUT of the generic 'guide' type into
// the new dedicated 'architecture' type, not migration within an
// already-dedicated type into new required fields -- so "pending" here
// means "still entry_type: guide under content/architectures/", not
// "architecture-typed but missing a field" (that case is instead a hard
// schema-validation failure, since architecture.schema.json has no
// optional-then-required migration window; see its x-migration-note).
// See docs/automation-policy.md and the build-examples-vertical precedent
// in scripts/check-build-examples-migration-progress.js.

import chalk from 'chalk';
import { getMarkdownFiles, readMarkdown, isNavigationFile } from './utils/frontmatter.js';
import { writeJson } from './utils/entries.js';

const VALID_CATEGORIES = new Set([
  'system-design',
  'data-strategy',
  'model-selection',
  'serving-patterns',
  'evaluation-strategy',
  'reference-stacks'
]);

const enforce = process.argv.includes('--enforce');

// Total scope = every content/architectures/ file that is a real content
// entry (not _index.md/_registry.md) and either already carries the new
// 'architecture' entry type OR is a not-yet-migrated entry_type: "guide"
// file under this section -- both count toward the vertical's total, since
// both represent an architecture decision that either has or hasn't been
// through Phase 3 authoring yet.
const allArchFiles = (await getMarkdownFiles('content/architectures/**/*.md')).filter((f) => !isNavigationFile(f));

const migrated = [];
const pending = [];

for (const file of allArchFiles) {
  const { data, hasFrontmatter } = await readMarkdown(file);
  if (!hasFrontmatter) continue;

  const isMigrated = data.entry_type !== 'guide' && Boolean(data.category);
  const folder = file.split('/')[2]; // content/architectures/{category-folder}/{id}.md

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
      folder: `${folder} (unmigrated, still entry_type: guide)`,
      enrichment_status: null,
      missing_fields: ['category', 'decision_type', 'decision_summary', 'approaches', 'key_factors', 'has_decision_framework', 'confidence', 'tradeoffs_as_of', 'enrichment_status']
    });
  }
}

const total = allArchFiles.length;
const migratedCount = migrated.length;
const percent = total === 0 ? 100 : Math.round((migratedCount / total) * 1000) / 10;

const draftCount = migrated.filter((m) => m.enrichment_status === 'draft').length;

const report = {
  generated_at: new Date().toISOString(),
  total_architecture_files: total,
  migrated_count: migratedCount,
  pending_count: pending.length,
  percent_migrated: percent,
  draft_enrichment_count: draftCount,
  pending_entries: pending,
  migrated_entries: migrated.map((m) => m.id)
};

await writeJson('data/architectures-migration-progress.json', report);

console.log(chalk.bold(`Architectures migration progress: ${migratedCount}/${total} (${percent}%)`));
if (draftCount > 0) {
  console.log(chalk.yellow(`${draftCount} migrated entr${draftCount === 1 ? 'y has' : 'ies have'} enrichment_status: draft (tradeoffs_as_of not yet independently re-verified by a maintainer).`));
}

if (pending.length) {
  console.log(chalk.yellow(`${pending.length} architecture entr${pending.length === 1 ? 'y' : 'ies'} not yet fully migrated:`));
  for (const item of pending.slice(0, 50)) {
    const reasons = item.missing_fields ?? [];
    console.log(chalk.yellow(`- ${item.id} (${item.file}): ${reasons.join(', ')}`));
  }
  if (pending.length > 50) console.log(chalk.yellow(`... and ${pending.length - 50} more. See data/architectures-migration-progress.json.`));
}

if (enforce && pending.length > 0) {
  console.error(chalk.red(`Migration enforcement failed: ${pending.length} architecture entr${pending.length === 1 ? 'y' : 'ies'} not yet migrated. Run without --enforce to see the full list.`));
  process.exit(1);
}

if (pending.length === 0) {
  console.log(chalk.green('All architecture entries are fully migrated to the dedicated architecture type and category-folder model.'));
}

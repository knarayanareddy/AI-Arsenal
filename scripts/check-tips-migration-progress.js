#!/usr/bin/env node
// Tracks progress of the tips-vertical reorganisation (phase/effort/
// verification_status/applies_to/gotchas/reversible/last_reviewed fields +
// content/tips-and-tricks/{phase}/ folders).
//
// Usage:
//   node scripts/check-tips-migration-progress.js              # report only, exit 0
//   node scripts/check-tips-migration-progress.js --enforce     # exit 1 if < 100%
//
// Once migration is complete (100%), the fields below should be flipped to
// `required` in schemas/tip.schema.json (plus `minItems: 1` added to the
// pre-existing `applies_to` field) and CI should switch from
// `migration:tips:progress` to `migration:tips:enforce`. See
// docs/automation-policy.md and the tools/projects/research-vertical
// precedents in scripts/check-migration-progress.js,
// scripts/check-projects-migration-progress.js, and
// scripts/check-research-migration-progress.js.

import chalk from 'chalk';
import { loadEntries, writeJson } from './utils/entries.js';

const REQUIRED_FIELDS = ['phase', 'effort', 'verification_status', 'applies_to', 'gotchas', 'reversible', 'last_reviewed'];

// 4 tip IDs were merged away during the Pragmatist's audit triage (see
// .migration/tips-audit-report.md) and no longer exist as separate files --
// this set exists only to document that merges happened; by the time this
// guard runs against the live content/ tree, merged-away files are simply
// gone, so no runtime filtering is actually needed. Kept as an empty set
// (matching the projects/research-vertical precedent) so a future partial
// migration state could reintroduce a deferral without restructuring this
// script.
const DEFERRED_OUT_OF_SCOPE = new Set();

const VALID_PHASES = new Set([
  'prompting',
  'rag-and-retrieval',
  'agents-and-orchestration',
  'evaluation',
  'inference-and-serving',
  'fine-tuning',
  'debugging-and-observability',
  'cost-and-performance'
]);

const enforce = process.argv.includes('--enforce');

const entries = (await loadEntries({ includeContent: false })).filter((e) => e.type === 'tip' && !DEFERRED_OUT_OF_SCOPE.has(e.data.id));

const migrated = [];
const pending = [];

for (const entry of entries) {
  const missingFields = REQUIRED_FIELDS.filter((field) => {
    const value = entry.data[field];
    if (Array.isArray(value)) return value.length === 0;
    return value === undefined || value === null || value === '';
  });

  const folder = entry.file.split('/')[2]; // content/tips-and-tricks/{phase-folder}/{id}.md
  const phaseFolderMismatch = entry.data.phase && VALID_PHASES.has(folder) && entry.data.phase !== folder;

  const record = {
    id: entry.data.id,
    file: entry.file,
    phase: entry.data.phase ?? null,
    folder: VALID_PHASES.has(folder) ? folder : `${folder} (unmigrated)`,
    missing_fields: missingFields,
    enrichment_status: entry.data.enrichment_status ?? null,
    phase_folder_mismatch: Boolean(phaseFolderMismatch)
  };

  if (missingFields.length === 0 && !phaseFolderMismatch) migrated.push(record);
  else pending.push(record);
}

const total = entries.length;
const migratedCount = migrated.length;
const percent = total === 0 ? 100 : Math.round((migratedCount / total) * 1000) / 10;

const draftCount = entries.filter((e) => e.data.enrichment_status === 'draft').length;

const report = {
  generated_at: new Date().toISOString(),
  total_tips: total,
  migrated_count: migratedCount,
  pending_count: pending.length,
  percent_migrated: percent,
  draft_enrichment_count: draftCount,
  deferred_out_of_scope: [...DEFERRED_OUT_OF_SCOPE],
  pending_entries: pending,
  migrated_entries: migrated.map((m) => m.id)
};

await writeJson('data/tips-migration-progress.json', report);

console.log(chalk.bold(`Tips migration progress: ${migratedCount}/${total} (${percent}%)`));
if (DEFERRED_OUT_OF_SCOPE.size > 0) {
  console.log(chalk.blue(`${DEFERRED_OUT_OF_SCOPE.size} entr${DEFERRED_OUT_OF_SCOPE.size === 1 ? 'y' : 'ies'} deferred as out-of-scope for the phase taxonomy (not counted above): ${[...DEFERRED_OUT_OF_SCOPE].join(', ')}.`));
}
if (draftCount > 0) {
  console.log(chalk.yellow(`${draftCount} migrated entr${draftCount === 1 ? 'y has' : 'ies have'} enrichment_status: draft (honest minimal scaffolding or unverified theoretical tips pending a deeper authoring/verification pass).`));
}

if (pending.length) {
  console.log(chalk.yellow(`${pending.length} tip entr${pending.length === 1 ? 'y' : 'ies'} not yet fully migrated:`));
  for (const item of pending.slice(0, 50)) {
    const reasons = [...item.missing_fields.map((f) => `missing ${f}`), item.phase_folder_mismatch ? 'phase/folder mismatch' : null].filter(Boolean);
    console.log(chalk.yellow(`- ${item.id} (${item.file}): ${reasons.join(', ')}`));
  }
  if (pending.length > 50) console.log(chalk.yellow(`... and ${pending.length - 50} more. See data/tips-migration-progress.json.`));
}

if (enforce && pending.length > 0) {
  console.error(chalk.red(`Migration enforcement failed: ${pending.length} tip(s) not yet migrated. Run without --enforce to see the full list.`));
  process.exit(1);
}

if (pending.length === 0) {
  console.log(chalk.green('All tip entries are fully migrated to the phase-folder model.'));
}

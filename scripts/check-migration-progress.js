#!/usr/bin/env node
// Tracks progress of the tools-vertical reorganisation (phase/audience/
// best_when/avoid_when/last_reviewed fields + content/tools/{phase}/ folders).
//
// Usage:
//   node scripts/check-migration-progress.js              # report only, exit 0
//   node scripts/check-migration-progress.js --enforce     # exit 1 if < 100%
//
// Once migration is complete (100%), the fields below should be flipped to
// `required` in schemas/tool.schema.json and CI should switch from
// `migration:progress` to `migration:enforce`. See docs/automation-policy.md.

import chalk from 'chalk';
import { loadEntries, writeJson } from './utils/entries.js';

const REQUIRED_FIELDS = ['phase', 'audience', 'best_when', 'avoid_when', 'last_reviewed'];
const VALID_PHASES = new Set([
  'data-ingestion',
  'model-layer',
  'orchestration',
  'serving-and-deployment',
  'evaluation-and-observability',
  'dx-and-tooling'
]);

const enforce = process.argv.includes('--enforce');

const entries = (await loadEntries({ includeContent: false })).filter((e) => e.type === 'tool');

const migrated = [];
const pending = [];

for (const entry of entries) {
  const missingFields = REQUIRED_FIELDS.filter((field) => {
    const value = entry.data[field];
    if (Array.isArray(value)) return value.length === 0;
    return value === undefined || value === null || value === '';
  });

  const folderPhase = entry.file.split('/')[2]; // content/tools/{phase}/{id}.md
  const phaseFolderMismatch = entry.data.phase && VALID_PHASES.has(folderPhase) && entry.data.phase !== folderPhase;

  const record = {
    id: entry.data.id,
    file: entry.file,
    phase: entry.data.phase ?? null,
    folder: VALID_PHASES.has(folderPhase) ? folderPhase : 'by-job (unmigrated)',
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
  total_tools: total,
  migrated_count: migratedCount,
  pending_count: pending.length,
  percent_migrated: percent,
  draft_enrichment_count: draftCount,
  pending_entries: pending,
  migrated_entries: migrated.map((m) => m.id)
};

await writeJson('data/migration-progress.json', report);

console.log(chalk.bold(`Tools migration progress: ${migratedCount}/${total} (${percent}%)`));
if (draftCount > 0) {
  console.log(chalk.yellow(`${draftCount} migrated entr${draftCount === 1 ? 'y has' : 'ies have'} enrichment_status: draft (best_when/avoid_when not yet backed by third-party usage evidence).`));
}

if (pending.length) {
  console.log(chalk.yellow(`${pending.length} tool entr${pending.length === 1 ? 'y' : 'ies'} not yet fully migrated:`));
  for (const item of pending.slice(0, 50)) {
    const reasons = [...item.missing_fields.map((f) => `missing ${f}`), item.phase_folder_mismatch ? 'phase/folder mismatch' : null].filter(Boolean);
    console.log(chalk.yellow(`- ${item.id} (${item.file}): ${reasons.join(', ')}`));
  }
  if (pending.length > 50) console.log(chalk.yellow(`... and ${pending.length - 50} more. See data/migration-progress.json.`));
}

if (enforce && pending.length > 0) {
  console.error(chalk.red(`Migration enforcement failed: ${pending.length} tool(s) not yet migrated. Run without --enforce to see the full list.`));
  process.exit(1);
}

if (pending.length === 0) {
  console.log(chalk.green('All tool entries are fully migrated to the phase-folder model.'));
}

#!/usr/bin/env node
// Tracks progress of the projects-vertical reorganisation (phase/domain/
// relation_to_stack/health_signals/ecosystem_role/best_for/avoid_if/
// last_reviewed fields + content/projects/{phase}/ folders).
//
// Usage:
//   node scripts/check-projects-migration-progress.js              # report only, exit 0
//   node scripts/check-projects-migration-progress.js --enforce     # exit 1 if < 100%
//
// Once migration is complete (100%), the fields below should be flipped to
// `required` in schemas/project.schema.json and CI should switch from
// `migration:projects:progress` to `migration:projects:enforce`.
// See docs/automation-policy.md and the tools-vertical precedent in
// scripts/check-migration-progress.js.

import chalk from 'chalk';
import { loadEntries, writeJson } from './utils/entries.js';

const REQUIRED_FIELDS = ['phase', 'domain', 'relation_to_stack', 'health_signals', 'ecosystem_role', 'best_for', 'avoid_if', 'last_reviewed'];

// No entries are deferred from the phase taxonomy: every project entry,
// including borderline scope fits (see uiverse-design's enrichment_notes
// for a flagged maintainer-review case), is migrated to a phase folder
// and passes the full validator checklist. Kept as an empty set (rather
// than removed) so a future migration can reintroduce a deferral without
// restructuring this script.
const DEFERRED_OUT_OF_SCOPE = new Set();

const VALID_PHASES = new Set([
  'foundation-models',
  'frameworks',
  'inference-engines',
  'agent-systems',
  'data-and-retrieval',
  'training-and-alignment',
  'benchmarks-and-evals'
]);
// Frontmatter `phase` values use singular/hyphenated forms per TAXONOMY.md;
// folder names are the plural forms used in the brief's folder map. Map
// frontmatter phase -> expected folder name explicitly rather than assuming
// a mechanical transform.
const PHASE_TO_FOLDER = {
  'foundation-model': 'foundation-models',
  framework: 'frameworks',
  'inference-engine': 'inference-engines',
  'agent-system': 'agent-systems',
  'data-and-retrieval': 'data-and-retrieval',
  'training-and-alignment': 'training-and-alignment',
  'benchmark-and-eval': 'benchmarks-and-evals'
};

const enforce = process.argv.includes('--enforce');

const entries = (await loadEntries({ includeContent: false })).filter((e) => e.type === 'project' && !DEFERRED_OUT_OF_SCOPE.has(e.data.id));

const migrated = [];
const pending = [];

for (const entry of entries) {
  const missingFields = REQUIRED_FIELDS.filter((field) => {
    const value = entry.data[field];
    if (Array.isArray(value)) return value.length === 0;
    return value === undefined || value === null || value === '';
  });

  const folder = entry.file.split('/')[2]; // content/projects/{phase-folder}/.../{id}.md
  const expectedFolder = PHASE_TO_FOLDER[entry.data.phase];
  const phaseFolderMismatch = expectedFolder && VALID_PHASES.has(folder) && expectedFolder !== folder;

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
  total_projects: total,
  migrated_count: migratedCount,
  pending_count: pending.length,
  percent_migrated: percent,
  draft_enrichment_count: draftCount,
  deferred_out_of_scope: [...DEFERRED_OUT_OF_SCOPE],
  pending_entries: pending,
  migrated_entries: migrated.map((m) => m.id)
};

await writeJson('data/projects-migration-progress.json', report);

console.log(chalk.bold(`Projects migration progress: ${migratedCount}/${total} (${percent}%)`));
if (DEFERRED_OUT_OF_SCOPE.size > 0) {
  console.log(chalk.blue(`${DEFERRED_OUT_OF_SCOPE.size} entr${DEFERRED_OUT_OF_SCOPE.size === 1 ? 'y' : 'ies'} deferred as out-of-scope for the phase taxonomy (not counted above): ${[...DEFERRED_OUT_OF_SCOPE].join(', ')}.`));
}
if (draftCount > 0) {
  console.log(chalk.yellow(`${draftCount} migrated entr${draftCount === 1 ? 'y has' : 'ies have'} enrichment_status: draft (architecture/ecosystem/production claims not yet backed by third-party evidence).`));
}

if (pending.length) {
  console.log(chalk.yellow(`${pending.length} project entr${pending.length === 1 ? 'y' : 'ies'} not yet fully migrated:`));
  for (const item of pending.slice(0, 50)) {
    const reasons = [...item.missing_fields.map((f) => `missing ${f}`), item.phase_folder_mismatch ? 'phase/folder mismatch' : null].filter(Boolean);
    console.log(chalk.yellow(`- ${item.id} (${item.file}): ${reasons.join(', ')}`));
  }
  if (pending.length > 50) console.log(chalk.yellow(`... and ${pending.length - 50} more. See data/projects-migration-progress.json.`));
}

if (enforce && pending.length > 0) {
  console.error(chalk.red(`Migration enforcement failed: ${pending.length} project(s) not yet migrated. Run without --enforce to see the full list.`));
  process.exit(1);
}

if (pending.length === 0) {
  console.log(chalk.green('All project entries are fully migrated to the phase-folder model.'));
}

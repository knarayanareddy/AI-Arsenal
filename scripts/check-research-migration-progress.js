#!/usr/bin/env node
// Tracks progress of the research-vertical reorganisation (phase/venue/year/
// authors/practical_applicability/reproduction_status/result_status/has_code/
// tldr/key_contribution/last_reviewed fields + content/research/{phase}/
// folders).
//
// Usage:
//   node scripts/check-research-migration-progress.js              # report only, exit 0
//   node scripts/check-research-migration-progress.js --enforce     # exit 1 if < 100%
//
// Once migration is complete (100%), the fields below should be flipped to
// `required` in schemas/research.schema.json and CI should switch from
// `migration:research:progress` to `migration:research:enforce`. At that
// point schemas/paper.schema.json can be retired (see its x-migration-note
// counterpart in schemas/research.schema.json). See docs/automation-policy.md
// and the tools/projects-vertical precedents in
// scripts/check-migration-progress.js and
// scripts/check-projects-migration-progress.js.

import chalk from 'chalk';
import { loadEntries, writeJson } from './utils/entries.js';

const REQUIRED_FIELDS = ['phase', 'venue', 'year', 'authors', 'practical_applicability', 'reproduction_status', 'result_status', 'has_code', 'tldr', 'key_contribution', 'last_reviewed'];

// No entries are deferred from the phase taxonomy at this time -- see the
// research-vertical audit report (.migration/research-audit-report.md) for
// the full folder migration map. Kept as an empty set (rather than removed)
// so a future migration can reintroduce a deferral without restructuring
// this script, matching the projects-vertical precedent.
const DEFERRED_OUT_OF_SCOPE = new Set();

const VALID_PHASES = new Set([
  'foundational',
  'architectures',
  'training-and-alignment',
  'inference-and-efficiency',
  'retrieval-and-memory',
  'agents-and-reasoning',
  'evaluation-and-safety',
  'surveys'
]);

const enforce = process.argv.includes('--enforce');

// Research entries are `type: 'paper'` (inferEntryType infers 'paper' from
// the content/research/papers/ path OR the new content/research/{phase}/
// paths once migrated -- see scripts/utils/frontmatter.js). Only entries
// that are genuinely single-paper research briefings count here; the
// cross-cutting guide pages (emerging-techniques.md, must-read-papers.md,
// sota-benchmarks.md, weekly-arxiv-picks.md) are entry_type: 'guide' and are
// correctly excluded by the `type === 'paper'` filter below.
const entries = (await loadEntries({ includeContent: false })).filter((e) => e.type === 'paper' && !DEFERRED_OUT_OF_SCOPE.has(e.data.id));

const migrated = [];
const pending = [];

for (const entry of entries) {
  const missingFields = REQUIRED_FIELDS.filter((field) => {
    const value = entry.data[field];
    if (Array.isArray(value)) return value.length === 0;
    return value === undefined || value === null || value === '';
  });

  const folder = entry.file.split('/')[2]; // content/research/{phase-folder}/{id}.md
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
  total_research_entries: total,
  migrated_count: migratedCount,
  pending_count: pending.length,
  percent_migrated: percent,
  draft_enrichment_count: draftCount,
  deferred_out_of_scope: [...DEFERRED_OUT_OF_SCOPE],
  pending_entries: pending,
  migrated_entries: migrated.map((m) => m.id)
};

await writeJson('data/research-migration-progress.json', report);

console.log(chalk.bold(`Research migration progress: ${migratedCount}/${total} (${percent}%)`));
if (DEFERRED_OUT_OF_SCOPE.size > 0) {
  console.log(chalk.blue(`${DEFERRED_OUT_OF_SCOPE.size} entr${DEFERRED_OUT_OF_SCOPE.size === 1 ? 'y' : 'ies'} deferred as out-of-scope for the phase taxonomy (not counted above): ${[...DEFERRED_OUT_OF_SCOPE].join(', ')}.`));
}
if (draftCount > 0) {
  console.log(chalk.yellow(`${draftCount} migrated entr${draftCount === 1 ? 'y has' : 'ies have'} enrichment_status: draft (post-publication critiques, reproduction attempts, or citation counts not yet confirmed by third-party evidence).`));
}

if (pending.length) {
  console.log(chalk.yellow(`${pending.length} research entr${pending.length === 1 ? 'y' : 'ies'} not yet fully migrated:`));
  for (const item of pending.slice(0, 50)) {
    const reasons = [...item.missing_fields.map((f) => `missing ${f}`), item.phase_folder_mismatch ? 'phase/folder mismatch' : null].filter(Boolean);
    console.log(chalk.yellow(`- ${item.id} (${item.file}): ${reasons.join(', ')}`));
  }
  if (pending.length > 50) console.log(chalk.yellow(`... and ${pending.length - 50} more. See data/research-migration-progress.json.`));
}

if (enforce && pending.length > 0) {
  console.error(chalk.red(`Migration enforcement failed: ${pending.length} research entr${pending.length === 1 ? 'y' : 'ies'} not yet migrated. Run without --enforce to see the full list.`));
  process.exit(1);
}

if (pending.length === 0) {
  console.log(chalk.green('All research entries are fully migrated to the phase-folder model.'));
}

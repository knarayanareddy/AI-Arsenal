import test from 'node:test';
import assert from 'node:assert/strict';

// Mirrors the core "is this tool entry migrated" predicate used by
// scripts/check-migration-progress.js. Tested as a pure unit here (rather
// than against the live content/ tree) so the test stays fast and
// deterministic regardless of how many tools exist in the repo.

const REQUIRED_FIELDS = ['phase', 'audience', 'best_when', 'avoid_when', 'last_reviewed'];
const VALID_PHASES = new Set([
  'data-ingestion',
  'model-layer',
  'orchestration',
  'serving-and-deployment',
  'evaluation-and-observability',
  'dx-and-tooling'
]);

function isMigrated(entry) {
  const missingFields = REQUIRED_FIELDS.filter((field) => {
    const value = entry.data[field];
    if (Array.isArray(value)) return value.length === 0;
    return value === undefined || value === null || value === '';
  });
  const folderPhase = entry.file.split('/')[2];
  const inPhaseFolder = VALID_PHASES.has(folderPhase);
  const phaseFolderMismatch = !inPhaseFolder || (entry.data.phase && entry.data.phase !== folderPhase);
  return missingFields.length === 0 && !phaseFolderMismatch;
}

test('migration-progress: a fully migrated entry is detected as migrated', () => {
  const entry = {
    file: 'content/tools/orchestration/airflow.md',
    data: {
      phase: 'orchestration',
      audience: ['production'],
      best_when: ['You already run batch pipelines'],
      avoid_when: ['You need streaming-style orchestration'],
      last_reviewed: '2026-06-30'
    }
  };
  assert.equal(isMigrated(entry), true);
});

test('migration-progress: an entry still in by-job/ with no new fields is pending', () => {
  const entry = {
    file: 'content/tools/by-job/airflow.md',
    data: { last_reviewed: '2026-06-13' }
  };
  assert.equal(isMigrated(entry), false);
});

test('migration-progress: an entry with an empty best_when array is pending', () => {
  const entry = {
    file: 'content/tools/orchestration/airflow.md',
    data: {
      phase: 'orchestration',
      audience: ['production'],
      best_when: [],
      avoid_when: ['You need streaming-style orchestration'],
      last_reviewed: '2026-06-30'
    }
  };
  assert.equal(isMigrated(entry), false);
});

test('migration-progress: a phase/folder mismatch is flagged as pending', () => {
  const entry = {
    file: 'content/tools/orchestration/airflow.md',
    data: {
      phase: 'model-layer', // does not match the orchestration/ folder
      audience: ['production'],
      best_when: ['You already run batch pipelines'],
      avoid_when: ['You need streaming-style orchestration'],
      last_reviewed: '2026-06-30'
    }
  };
  assert.equal(isMigrated(entry), false);
});

test('migration-progress: a tool outside the six phase folders is pending', () => {
  // content/tools/by-job/ is not a phase folder. An entry that carries every
  // required field there is still unmigrated: the phase folder is part of the
  // migration contract, not a cosmetic detail.
  const entry = {
    file: 'content/tools/by-job/some-guide.md',
    data: {
      phase: 'orchestration',
      audience: ['production'],
      best_when: ['x'],
      avoid_when: ['y'],
      last_reviewed: '2026-06-30'
    }
  };
  assert.equal(isMigrated(entry), false);
});

test('migration-progress: a flat content/tools/<id>.md file is pending even when complete', () => {
  const entry = {
    file: 'content/tools/airflow.md',
    data: {
      phase: 'orchestration',
      audience: ['production'],
      best_when: ['You already run batch pipelines'],
      avoid_when: ['You need streaming-style orchestration'],
      last_reviewed: '2026-06-30'
    }
  };
  assert.equal(isMigrated(entry), false);
});

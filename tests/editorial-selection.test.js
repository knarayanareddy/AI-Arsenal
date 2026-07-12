import test from 'node:test';
import assert from 'node:assert/strict';
import { selectEntries } from '../scripts/validate-editorial-quality.js';
import { getChangedFiles } from '../scripts/utils/changed-files.js';

// Minimal fixture entries. entryKind() infers type from the path.
const project = { file: 'content/projects/frameworks/proj.md', data: { id: 'proj', added_date: '2024-01-01' }, content: '' };
const paper = { file: 'content/research/papers/paper.md', data: { id: 'paper', added_date: '2026-07-12' }, content: '' };
const tool = { file: 'content/tools/orchestration/tool.md', data: { id: 'tool', added_date: '2026-07-12' }, content: '' };
const tip = { file: 'content/tips-and-tricks/evaluation/tip.md', data: { id: 'tip', added_date: '2026-07-12' }, content: '' };
const entries = [project, paper, tool, tip];

const files = ({ selected, structuralOnly }) => ({
  selected: selected.map((e) => e.file),
  structuralOnly: structuralOnly.map((e) => e.file)
});

test('changed mode: a newly added entry with an OLD added_date is still inspected', () => {
  // proj has added_date 2024 (older than the latest) — the date gate would
  // have skipped it; changed-file selection must not.
  const { selected } = selectEntries(entries, { mode: 'changed', changed: new Set([project.file]) });
  assert.deepEqual(selected.map((e) => e.file), [project.file]);
});

test('changed mode: a modified old entry is inspected', () => {
  const { selected } = selectEntries(entries, { mode: 'changed', changed: new Set([tool.file]) });
  assert.deepEqual(selected.map((e) => e.file), [tool.file]);
});

test('changed mode: unchanged entries are NOT inspected', () => {
  const { selected } = selectEntries(entries, { mode: 'changed', changed: new Set([paper.file]) });
  assert.deepEqual(selected.map((e) => e.file), [paper.file]);
  assert.ok(!selected.some((e) => e.file === project.file));
  assert.ok(!selected.some((e) => e.file === tool.file));
});

test('changed mode: deleted files do not cause failures', () => {
  // A deleted path is present in the diff but not among loaded entries.
  const deleted = 'content/projects/frameworks/gone.md';
  const { selected, structuralOnly } = selectEntries(entries, { mode: 'changed', changed: new Set([deleted]) });
  assert.deepEqual(selected, []);
  assert.deepEqual(structuralOnly, []);
});

test('changed mode: a renamed file is validated at its destination path', () => {
  // The diff reports the new path; the entry exists at the new path.
  const renamed = { file: 'content/projects/frameworks/renamed.md', data: { id: 'renamed', added_date: '2024-01-01' }, content: '' };
  const { selected } = selectEntries([...entries, renamed], { mode: 'changed', changed: new Set([renamed.file]) });
  assert.deepEqual(selected.map((e) => e.file), [renamed.file]);
});

test('changed mode: unsupported types are reported structural-only, not silently skipped', () => {
  const result = selectEntries(entries, { mode: 'changed', changed: new Set([tip.file, project.file]) });
  const { selected, structuralOnly } = files(result);
  assert.deepEqual(selected, [project.file]);
  assert.deepEqual(structuralOnly, [tip.file]);
});

test('date mode: selects supported entries sharing the latest added_date', () => {
  const { selected, targetDate } = selectEntries(entries, { mode: 'date' });
  assert.equal(targetDate, '2026-07-12');
  assert.deepEqual(selected.map((e) => e.file).sort(), [paper.file, tool.file].sort());
});

test('all mode: selects every supported entry regardless of date or diff', () => {
  const { selected } = selectEntries(entries, { mode: 'all' });
  assert.deepEqual(selected.map((e) => e.file).sort(), [project.file, paper.file, tool.file].sort());
});

test('getChangedFiles: non-strict walks fallbacks and returns an array', () => {
  // Locally (strict: false) an unresolvable base must not throw — the helper
  // walks its fallback candidates and ultimately returns an array.
  const throwingRun = () => { throw new Error('fatal: bad revision'); };
  const out = getChangedFiles({ base: 'definitely-not-a-real-ref-zzz', strict: false, run: throwingRun });
  assert.ok(Array.isArray(out));
  assert.deepEqual(out, []);
});

test('getChangedFiles: strict fails closed instead of returning []', () => {
  // In CI (strict: true) an unresolvable base is a hard error, so a broken
  // comparison can never masquerade as "0 changed entries".
  const throwingRun = () => { throw new Error('fatal: bad revision'); };
  assert.throws(
    () => getChangedFiles({ base: 'definitely-not-a-real-ref-zzz', strict: true, run: throwingRun }),
    /Refusing to fail open in CI/
  );
});

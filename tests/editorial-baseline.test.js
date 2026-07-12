import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  normalizeFinding,
  computeFingerprint,
  findingToBaselineEntry,
  parseBaseline,
  applyBaseline,
  serializeBaseline
} from '../scripts/utils/editorial-baseline.js';
import { inspectEntry } from '../scripts/validate-editorial-quality.js';

const finding = (file, rule, message) => ({ file, rule, message });
const mapOf = (findings) => new Map(findings.map((f) => { const e = findingToBaselineEntry(f); return [e.fingerprint, e]; }));

test('1. a known historical finding is suppressed in --all', () => {
  const f = finding('content/projects/frameworks/a.md', 'project-section-length', 'project section "Overview" needs at least 180 characters');
  const { newFindings, suppressed } = applyBaseline([f], mapOf([f]));
  assert.equal(newFindings.length, 0);
  assert.equal(suppressed.length, 1);
});

test('2. a NEW finding in a baselined file still fails', () => {
  const file = 'content/projects/frameworks/a.md';
  const baselined = finding(file, 'project-section-length', 'project section "Overview" needs at least 180 characters');
  const fresh = finding(file, 'ecosystem-position-missing-comparison', 'Ecosystem Position must state a comparison');
  const { newFindings } = applyBaseline([baselined, fresh], mapOf([baselined]));
  assert.deepEqual(newFindings.map((x) => x.rule), ['ecosystem-position-missing-comparison']);
});

test('3. changed-file mode ignores the baseline (empty baseline => every finding is strict/new)', () => {
  const f = finding('content/projects/frameworks/a.md', 'project-section-length', 'project section "Overview" needs at least 180 characters');
  // Changed mode never consults the baseline; that is equivalent to an empty
  // baseline, where nothing is suppressed even if an identical fingerprint
  // exists in history.
  const { newFindings, suppressed } = applyBaseline([f], new Map());
  assert.equal(suppressed.length, 0);
  assert.equal(newFindings.length, 1);
});

test('4. a changed finding context produces a new fingerprint', () => {
  const file = 'content/projects/frameworks/a.md';
  const before = finding(file, 'project-section-tech', 'project section "Overview" lacks named technical content');
  const after = finding(file, 'project-section-tech', 'project section "Architecture" lacks named technical content');
  assert.notEqual(computeFingerprint(before), computeFingerprint(after));
  // But a purely numeric (volatile) change keeps the fingerprint stable.
  const five = finding(file, 'section-too-short', 'section "Overview" is too short for a curated entry (5 characters)');
  const ten = finding(file, 'section-too-short', 'section "Overview" is too short for a curated entry (10 characters)');
  assert.equal(computeFingerprint(five), computeFingerprint(ten));
});

test('5. a rename / path change does NOT inherit the old exemption', () => {
  const oldPath = finding('content/projects/frameworks/old.md', 'project-section-length', 'project section "Overview" needs at least 180 characters');
  const newPath = finding('content/projects/frameworks/new.md', 'project-section-length', 'project section "Overview" needs at least 180 characters');
  assert.notEqual(computeFingerprint(oldPath), computeFingerprint(newPath));
  const { newFindings } = applyBaseline([newPath], mapOf([oldPath]));
  assert.equal(newFindings.length, 1);
});

test('6a. stale baseline entries are detected', () => {
  const kept = finding('content/projects/frameworks/a.md', 'project-section-length', 'project section "Overview" needs at least 180 characters');
  const resolved = finding('content/projects/frameworks/b.md', 'project-section-length', 'project section "Architecture" needs at least 180 characters');
  const { stale } = applyBaseline([kept], mapOf([kept, resolved]));
  assert.equal(stale.length, 1);
  assert.equal(stale[0].file, 'content/projects/frameworks/b.md');
});

test('6b. malformed baseline entries are rejected', () => {
  assert.throws(() => parseBaseline('{ not json'), /not valid JSON/);
  assert.throws(() => parseBaseline(JSON.stringify({ entries: 'nope' })), /entries.*array/);
  assert.throws(() => parseBaseline(JSON.stringify({ entries: [{ file: 'x', rule: 'y' }] })), /malformed/);
  // A fingerprint that does not match its (file, rule, finding) is rejected.
  const tampered = JSON.stringify({ entries: [{ fingerprint: 'deadbeef::x::0000', file: 'content/x.md', rule: 'r', finding: 'z' }] });
  assert.throws(() => parseBaseline(tampered), /does not match/);
});

test('7. duplicate fingerprints are rejected', () => {
  const f = finding('content/projects/frameworks/a.md', 'project-section-length', 'project section "Overview" needs at least 180 characters');
  const entry = findingToBaselineEntry(f);
  const raw = JSON.stringify({ entries: [entry, { ...entry }] });
  assert.throws(() => parseBaseline(raw), /duplicate fingerprint/);
});

test('round-trip: serializeBaseline output parses and is self-consistent', () => {
  const entries = [
    findingToBaselineEntry(finding('content/projects/frameworks/a.md', 'project-section-length', 'project section "Overview" needs at least 180 characters')),
    findingToBaselineEntry(finding('content/tools/orchestration/t.md', 'tool-section-length', 'tool section "Overview" needs at least 160 characters'))
  ];
  const parsed = parseBaseline(serializeBaseline(entries));
  assert.equal(parsed.size, 2);
});

test('unsupported entry types produce no findings, so the baseline cannot make them look validated', () => {
  const tip = inspectEntry({ file: 'content/tips-and-tricks/evaluation/x.md', data: { id: 'x' }, content: '## Anything\nshort' });
  assert.equal(tip.length, 0);
});

test('the committed baseline file is valid and internally consistent', () => {
  const raw = fs.readFileSync(new URL('../docs/editorial-baseline.json', import.meta.url), 'utf8');
  const parsed = parseBaseline(raw); // throws on malformed / duplicate / mismatched fingerprint
  assert.ok(parsed.size > 0);
});

test('normalizeFinding collapses whitespace and digits', () => {
  assert.equal(normalizeFinding('foo   bar 123\n baz'), 'foo bar # baz');
});

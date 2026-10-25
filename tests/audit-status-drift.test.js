import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyEntry, daysSince, summarize } from '../scripts/audit-status-drift.js';

const NOW = new Date('2026-10-24T00:00:00Z');

test('daysSince counts whole days and rejects unparseable dates', () => {
  assert.equal(daysSince('2026-10-24', NOW), 0);
  assert.equal(daysSince('2025-10-24', NOW), 365);
  assert.equal(daysSince(null, NOW), null);
  assert.equal(daysSince('not-a-date', NOW), null);
});

test('an active entry past the watching ceiling is reported', () => {
  const findings = classifyEntry({ status: 'active', last_commit: '2025-01-22' }, NOW);
  assert.deepEqual(findings.map((f) => f.rule), ['active-but-stale']);
  assert.equal(findings[0].days, 640);
});

test('an active entry inside the window is not reported, however it is worded', () => {
  assert.deepEqual(classifyEntry({ status: 'active', last_commit: '2026-08-01' }, NOW), []);
  // 179 days: outside the active window but still inside the watching ceiling,
  // which the catalogue allows to stay "active" (the rubric only forbids it
  // past 180 days).
  assert.deepEqual(classifyEntry({ status: 'active', last_commit: '2026-04-28' }, NOW), []);
});

test('an actively-maintained signal is checked at the tighter threshold', () => {
  const findings = classifyEntry({ status: 'active', last_commit: '2026-05-01', health_signals: ['actively-maintained'] }, NOW);
  assert.deepEqual(findings.map((f) => f.rule), ['claims-actively-maintained']);
});

test('a watching entry that resumed is reported for re-review', () => {
  const findings = classifyEntry({ status: 'watching', last_commit: '2026-10-20' }, NOW);
  assert.deepEqual(findings.map((f) => f.rule), ['watching-but-fresh']);
});

test('undated projects are reported, undated tools are not', () => {
  assert.deepEqual(classifyEntry({ status: 'active' }, NOW).map((f) => f.rule), ['undated']);
  assert.deepEqual(classifyEntry({ status: 'active' }, NOW, { kind: 'tool' }), []);
});

test('findings are summarised per rule', () => {
  const summary = summarize([{ rule: 'undated' }, { rule: 'undated' }, { rule: 'active-but-stale' }]);
  assert.deepEqual(summary, { undated: 2, 'active-but-stale': 1 });
});

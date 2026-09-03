import test from 'node:test';
import assert from 'node:assert/strict';
import {
  readStaleReport,
  staleIssueTitle,
  staleIssueBody,
  planStaleIssues
} from '../scripts/create-stale-issues.js';

// These tests cover the planning logic behind scripts/create-stale-issues.js.
// No network calls: planStaleIssues is pure and takes the existing-issue title
// set as an argument.

const REPORT = {
  generated_at: '2026-09-03T09:00:00.000Z',
  threshold_days: 90,
  stale_count: 3,
  stale_entries: [
    { id: 'autogen', type: 'project', path: 'content/projects/frameworks/autogen.md', last_reviewed: '2026-06-05', age_days: 90 },
    { id: 'langchain', type: 'project', path: 'content/projects/frameworks/langchain.md', last_reviewed: '2026-06-06', age_days: 89 },
    { id: 'vllm', type: 'project', path: 'content/projects/inference-engines/vllm.md', last_reviewed: '2026-06-07', age_days: 88 }
  ]
};

test('readStaleReport tolerates a missing or malformed report', () => {
  assert.deepEqual(readStaleReport(null).entries, []);
  assert.deepEqual(readStaleReport({}).entries, []);
  assert.deepEqual(readStaleReport({ stale_entries: 'nope' }).entries, []);
  // Entries without a path cannot produce a usable issue and are dropped.
  assert.equal(readStaleReport({ stale_entries: [{ id: 'x' }, { id: 'y', path: 'a.md' }] }).entries.length, 1);
});

test('readStaleReport carries the threshold and timestamp through to issue bodies', () => {
  const parsed = readStaleReport(REPORT);
  assert.equal(parsed.thresholdDays, 90);
  assert.equal(parsed.generatedAt, REPORT.generated_at);
  assert.equal(parsed.entries.length, 3);
});

test('staleIssueTitle is path-keyed so re-runs dedupe against open issues', () => {
  assert.equal(staleIssueTitle(REPORT.stale_entries[0]), '[STALE CONTENT] content/projects/frameworks/autogen.md');
  // Titles must stay inside GitHub's limit even for long paths.
  const long = { path: `content/${'x'.repeat(400)}.md` };
  assert.ok(staleIssueTitle(long).length <= 240);
});

test('staleIssueBody states the age, the threshold, and the required action', () => {
  const body = staleIssueBody(REPORT.stale_entries[0], readStaleReport(REPORT));
  assert.match(body, /Age: 90 days \(threshold: 90\)/);
  assert.match(body, /content\/projects\/frameworks\/autogen\.md/);
  assert.match(body, /last_reviewed/);
  assert.match(body, /deprecation policy/);
  assert.match(body, /Do not edit the issue title/);
});

test('planStaleIssues files one issue per stale entry within the limit', () => {
  const plan = planStaleIssues(REPORT, { limit: 10 });
  assert.equal(plan.toCreate.length, 3);
  assert.equal(plan.skippedDuplicate, 0);
  assert.equal(plan.skippedLimit, 0);
  assert.equal(plan.total, 3);
  assert.deepEqual(plan.toCreate.map((i) => i.title), [
    '[STALE CONTENT] content/projects/frameworks/autogen.md',
    '[STALE CONTENT] content/projects/frameworks/langchain.md',
    '[STALE CONTENT] content/projects/inference-engines/vllm.md'
  ]);
  assert.deepEqual(plan.toCreate[0].labels, ['needs-review']);
});

test('planStaleIssues never double-files an entry that already has an open issue', () => {
  const existing = new Set(['[STALE CONTENT] content/projects/frameworks/autogen.md']);
  const plan = planStaleIssues(REPORT, { existingTitles: existing, limit: 10 });
  assert.equal(plan.toCreate.length, 2);
  assert.equal(plan.skippedDuplicate, 1);
  assert.ok(!plan.toCreate.some((i) => i.title.includes('autogen')));
});

test('planStaleIssues caps the run so a freshness cliff cannot open hundreds of issues', () => {
  const plan = planStaleIssues(REPORT, { limit: 2 });
  assert.equal(plan.toCreate.length, 2);
  assert.equal(plan.skippedLimit, 1);
  assert.equal(plan.total, 3);
});

test('an empty report plans nothing', () => {
  const plan = planStaleIssues({ stale_entries: [], stale_count: 0 }, { limit: 10 });
  assert.equal(plan.toCreate.length, 0);
  assert.equal(plan.total, 0);
});

test('labels are configurable so a fresh clone is not forced onto a missing label', () => {
  const plan = planStaleIssues(REPORT, { limit: 1, labels: ['stale-content', 'needs-review'] });
  assert.deepEqual(plan.toCreate[0].labels, ['stale-content', 'needs-review']);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseRepoSlug,
  repoUrlOf,
  classify,
  severityRank,
  buildTriage,
  toArtifact,
  SEVERITY_ORDER,
  asMarkdown
} from '../scripts/triage-stale-entries.js';

test('parseRepoSlug accepts repo URLs and strips paths, queries and .git', () => {
  assert.equal(parseRepoSlug('https://github.com/langroid/langroid'), 'langroid/langroid');
  assert.equal(parseRepoSlug('http://github.com/a/b.git'), 'a/b');
  assert.equal(parseRepoSlug('https://github.com/google/adk-go/tree/main/examples'), 'google/adk-go');
  assert.equal(parseRepoSlug('https://github.com/a/b?tab=readme'), 'a/b');
});

test('parseRepoSlug rejects site paths that look like owner/repo', () => {
  // github.com/features/copilot is a marketing page. Treating it as a
  // repository produced a false "deleted" finding in the first audit run.
  for (const url of [
    'https://github.com/features/copilot',
    'https://github.com/pricing/enterprise',
    'https://github.com/orgs/acme',
    'https://github.com/search?q=honen.app',
    'https://github.com/topics/rag'
  ]) {
    assert.equal(parseRepoSlug(url), null, url);
  }
});

test('parseRepoSlug returns null for non-GitHub and non-string input', () => {
  assert.equal(parseRepoSlug('https://gitlab.com/a/b'), null);
  assert.equal(parseRepoSlug(undefined), null);
  assert.equal(parseRepoSlug(''), null);
});

test('repoUrlOf prefers github_url, then source_url, then url', () => {
  assert.deepEqual(
    repoUrlOf({ github_url: 'https://github.com/a/b', url: 'https://example.com' }),
    { url: 'https://github.com/a/b', slug: 'a/b' }
  );
  assert.deepEqual(
    repoUrlOf({ source_url: 'https://github.com/c/d', url: 'https://example.com' }),
    { url: 'https://github.com/c/d', slug: 'c/d' }
  );
  assert.deepEqual(
    repoUrlOf({ url: 'https://github.com/e/f' }),
    { url: 'https://github.com/e/f', slug: 'e/f' }
  );
  assert.equal(repoUrlOf({ url: 'https://example.com' }), null);
});

test('classify ranks a 404 above an archived repo above a rename', () => {
  assert.equal(classify({}, { missing: true }), 'deleted');
  assert.equal(classify({}, { archived: true }), 'archived');
  assert.equal(classify({}, { renameTo: 'new/name' }), 'renamed');
  assert.equal(classify({}, { dormant: true }), 'dormant');
  assert.equal(classify({}, { dormant: false }), 'active');
});

test('classify never reports an unchecked or failed lookup as active', () => {
  // The first audit run classified every failed fetch as "active" because an
  // error payload is truthy and carries none of the failure flags. A broken
  // check must never look like a clean entry.
  assert.equal(classify({}, { error: 'fetch failed' }), 'error');
  assert.equal(classify({}, undefined), 'unchecked');
  assert.equal(classify({}, null), 'no-repo');
});

test('classify treats a generated routing page as nothing to review', () => {
  assert.equal(classify({ path: 'content/tools/by-job/prototyping.md' }, null), 'generated');
  assert.equal(classify({ path: 'content/tools/by-stack/stack-ruby.md' }, null), 'generated');
  assert.equal(classify({ path: 'content/tips-and-tricks/prompting/x.md' }, null), 'no-repo');
});

test('severityRank orders defects before scheduling work', () => {
  assert.ok(severityRank('deleted') < severityRank('archived'));
  assert.ok(severityRank('archived') < severityRank('renamed'));
  assert.ok(severityRank('renamed') < severityRank('dormant'));
  assert.ok(severityRank('dormant') < severityRank('active'));
  assert.ok(severityRank('active') < severityRank('no-repo'));
  assert.equal(severityRank('not-a-bucket'), SEVERITY_ORDER.length);
});

test('buildTriage groups rows, sorts by age and carries a suggested action', () => {
  const rows = [
    { entry: { id: 'old', path: 'content/tools/a.md', age_days: 120 }, repo: { missing: true }, reposlug: 'a/a' },
    { entry: { id: 'new', path: 'content/tools/b.md', age_days: 95 }, repo: { missing: true }, reposlug: 'b/b' },
    { entry: { id: 'live', path: 'content/tools/c.md', age_days: 99 }, repo: { dormant: false }, reposlug: 'c/c' },
    { entry: { id: 'guide', path: 'content/tips/x.md', age_days: 100 }, repo: null }
  ];
  const triage = buildTriage(rows, { generatedAt: '2026-10-24T00:00:00.000Z', thresholdDays: 90 });

  assert.equal(triage.total, 4);
  assert.equal(triage.counts.deleted, 2);
  assert.equal(triage.counts.active, 1);
  assert.equal(triage.counts['no-repo'], 1);
  // Oldest first inside a bucket.
  assert.deepEqual(triage.buckets.deleted.map((i) => i.id), ['old', 'new']);
  assert.match(triage.buckets.deleted[0].action, /404|no longer exists/);
});

test('asMarkdown lists defect buckets but not the whole backlog', () => {
  const triage = buildTriage([
    { entry: { id: 'gone', path: 'content/tools/gone.md', age_days: 100 }, repo: { missing: true }, reposlug: 'x/gone' },
    { entry: { id: 'live', path: 'content/tools/live.md', age_days: 100 }, repo: { dormant: false }, reposlug: 'x/live' }
  ], { generatedAt: '2026-10-24T00:00:00.000Z', thresholdDays: 90 });
  const md = asMarkdown(triage);

  assert.match(md, /# Stale content triage/);
  assert.match(md, /Repository returns 404 \(1\)/);
  assert.match(md, /gone/);
  // The "active" bucket is scheduling work, not a defect table.
  assert.doesNotMatch(md, /## Public and recently pushed/);
});

test('toArtifact keeps detail for actionable buckets and ids only for the rest', () => {
  const triage = buildTriage([
    { entry: { id: 'gone', path: 'content/tools/gone.md', age_days: 100 }, repo: { missing: true }, reposlug: 'x/gone' },
    { entry: { id: 'live', path: 'content/tools/live.md', age_days: 100 }, repo: { dormant: false }, reposlug: 'x/live' },
    { entry: { id: 'live2', path: 'content/tools/live2.md', age_days: 99 }, repo: { dormant: false }, reposlug: 'x/live2' }
  ], { generatedAt: '2026-10-24T00:00:00.000Z', thresholdDays: 90 });
  const artifact = toArtifact(triage);

  // Defect buckets stay readable row by row.
  assert.equal(artifact.buckets.deleted.length, 1);
  assert.equal(artifact.buckets.deleted[0].id, 'gone');
  // Scheduling buckets collapse to ids so the committed file stays reviewable.
  assert.deepEqual(artifact.buckets.active, { count: 2, ids: ['live', 'live2'] });
  assert.equal(artifact.counts.active, 2);
  assert.equal(artifact.total, 3);
});

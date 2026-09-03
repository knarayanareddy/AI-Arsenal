import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GATES,
  PHASE_FOLDERS,
  STAR_FLOOR,
  ACTIVE_DAYS,
  WATCHING_DAYS,
  daysSince,
  recencyVerdict,
  scoreCandidate,
  scoreAll,
  formatReport,
  loadExisting
} from '../scripts/score-entry-candidates.js';

// Frozen "now" so the recency arithmetic cannot drift with the calendar and
// silently change which gate a candidate fails.
const NOW = new Date('2026-09-03T00:00:00.000Z');

function emptyCatalogue() {
  return { ids: new Map(), urls: new Set() };
}

function candidate(overrides = {}) {
  return {
    repo: 'octocat/thing',
    id: 'thing',
    github_url: 'https://github.com/octocat/thing',
    phase: 'agent-system',
    stars: 25000,
    license: 'Apache-2.0',
    language: 'Python',
    pushed_at: '2026-09-01',
    archived: false,
    source_in_repo: true,
    ...overrides
  };
}

test('a candidate meeting every gate passes', () => {
  const scored = scoreCandidate(candidate(), emptyCatalogue(), NOW);
  assert.equal(scored.pass, true, JSON.stringify(scored.failed));
  assert.deepEqual(scored.failed, []);
  assert.equal(scored.status, 'active');
});

test('G1 rejects an id already in the catalogue', () => {
  const existing = emptyCatalogue();
  existing.ids.set('thing', 'content/projects/agent-systems/thing.md');
  const scored = scoreCandidate(candidate(), existing, NOW);
  assert.equal(scored.pass, false);
  assert.deepEqual(scored.failed, [GATES.UNIQUE_ID]);
  assert.match(scored.results[0].reason, /already catalogued/);
});

test('G2 rejects a github_url catalogued under a different id', () => {
  const existing = emptyCatalogue();
  existing.urls.add('https://github.com/octocat/thing');
  const scored = scoreCandidate(candidate({ id: 'thing-alias' }), existing, NOW);
  assert.equal(scored.pass, false);
  assert.deepEqual(scored.failed, [GATES.UNIQUE_URL]);
});

test('G2 normalises trailing slashes on the repo URL', () => {
  const existing = emptyCatalogue();
  existing.urls.add('https://github.com/octocat/thing');
  const scored = scoreCandidate(candidate({ github_url: 'https://github.com/octocat/thing/' }), existing, NOW);
  assert.deepEqual(scored.failed, [GATES.UNIQUE_URL]);
});

test('J1 rejects an archived repository', () => {
  const scored = scoreCandidate(candidate({ archived: true }), emptyCatalogue(), NOW);
  assert.equal(scored.pass, false);
  assert.deepEqual(scored.failed, [GATES.NOT_ARCHIVED]);
});

test('J2 rejects below the star floor and accepts at it', () => {
  assert.equal(scoreCandidate(candidate({ stars: STAR_FLOOR - 1 }), emptyCatalogue(), NOW).pass, false);
  assert.equal(scoreCandidate(candidate({ stars: STAR_FLOOR }), emptyCatalogue(), NOW).pass, true);
});

test('J2 rejects a missing star count rather than treating it as zero', () => {
  const scored = scoreCandidate(candidate({ stars: undefined }), emptyCatalogue(), NOW);
  assert.equal(scored.pass, false);
  assert.match(scored.results.find((r) => r.gate === GATES.MIN_STARS).reason, /star count missing/);
});

test('J3 grades recency into active, watching, and reject', () => {
  const active = recencyVerdict('2026-09-03', NOW);
  assert.equal(active.status, 'active');

  const watching = recencyVerdict('2026-07-01', NOW); // 64 days -> still active
  assert.equal(watching.status, 'active');

  const edge = recencyVerdict('2026-06-05', NOW); // exactly ACTIVE_DAYS
  assert.equal(edge.days, ACTIVE_DAYS);
  assert.equal(edge.status, 'active');

  const late = recencyVerdict('2026-06-04', NOW); // ACTIVE_DAYS + 1
  assert.equal(late.pass, true);
  assert.equal(late.status, 'watching');

  const stale = recencyVerdict('2025-09-30', NOW);
  assert.equal(stale.pass, false);
  assert.ok(stale.days > WATCHING_DAYS);
});

test('J3 rejects an unparseable pushed_at instead of passing it', () => {
  const verdict = recencyVerdict('not-a-date', NOW);
  assert.equal(verdict.pass, false);
  assert.match(verdict.reason, /missing or unparseable/);
  assert.equal(daysSince('not-a-date', NOW), null);
});

test('J4 rejects every unnamed-licence placeholder GitHub can emit', () => {
  for (const licence of ['NOASSERTION', 'none', 'Other', '', null]) {
    const scored = scoreCandidate(candidate({ license: licence }), emptyCatalogue(), NOW);
    assert.equal(scored.pass, false, `licence ${JSON.stringify(licence)} should fail J4`);
    assert.deepEqual(scored.failed, [GATES.LICENCE_NAMED]);
  }
});

test('J4 accepts a named fair-code licence, since naming it is the requirement', () => {
  const scored = scoreCandidate(candidate({ license: 'Sustainable Use License' }), emptyCatalogue(), NOW);
  assert.equal(scored.pass, true, JSON.stringify(scored.failed));
});

test('J5 rejects a landing page that holds no source', () => {
  const scored = scoreCandidate(candidate({ source_in_repo: false }), emptyCatalogue(), NOW);
  assert.equal(scored.pass, false);
  assert.deepEqual(scored.failed, [GATES.SOURCE_IN_REPO]);
  assert.match(scored.results.find((r) => r.gate === GATES.SOURCE_IN_REPO).reason, /no source/);
});

test('J7 rejects an unknown phase and accepts all seven lifecycle phases', () => {
  assert.equal(scoreCandidate(candidate({ phase: 'vector-database' }), emptyCatalogue(), NOW).pass, false);
  for (const phase of Object.keys(PHASE_FOLDERS)) {
    const scored = scoreCandidate(candidate({ phase }), emptyCatalogue(), NOW);
    assert.equal(scored.pass, true, `phase ${phase} should pass: ${JSON.stringify(scored.failed)}`);
  }
  assert.equal(Object.keys(PHASE_FOLDERS).length, 7);
});

test('every accepted phase maps to a folder that validate:paths will agree with', () => {
  // The folder names here must match the phaseToFolder map in
  // scripts/validate-paths.js, or a candidate that passes intake fails CI.
  assert.deepEqual(PHASE_FOLDERS, {
    'foundation-model': 'foundation-models',
    framework: 'frameworks',
    'inference-engine': 'inference-engines',
    'agent-system': 'agent-systems',
    'data-and-retrieval': 'data-and-retrieval',
    'training-and-alignment': 'training-and-alignment',
    'benchmark-and-eval': 'benchmarks-and-evals'
  });
});

test('a candidate can fail several gates at once and reports all of them', () => {
  const scored = scoreCandidate(
    candidate({ archived: true, stars: 12, license: 'NOASSERTION', phase: 'nonsense', source_in_repo: false }),
    emptyCatalogue(),
    NOW
  );
  assert.equal(scored.pass, false);
  assert.deepEqual(scored.failed.sort(), [
    GATES.NOT_ARCHIVED,
    GATES.MIN_STARS,
    GATES.LICENCE_NAMED,
    GATES.PHASE_KNOWN,
    GATES.SOURCE_IN_REPO
  ].sort());
});

test('scoreAll scores a manifest and the report names each gate', () => {
  const scored = scoreAll([candidate(), candidate({ repo: 'octocat/archived', id: 'archived', archived: true })], emptyCatalogue(), NOW);
  assert.equal(scored.length, 2);
  assert.equal(scored[0].pass, true);
  assert.equal(scored[1].pass, false);
  const report = formatReport(scored);
  assert.match(report, /PASS\s+octocat\/thing/);
  assert.match(report, /FAIL\s+octocat\/archived/);
  assert.match(report, /1\/2 candidate\(s\) pass the intake rubric/);
  assert.match(report, new RegExp(GATES.NOT_ARCHIVED));
});

// Regression test for a real defect found while scoring the 2026-09 candidate
// pool: loadExisting() originally scoped its scan to content/projects/, but
// scripts/check-duplicates.js enforces id uniqueness catalogue-wide. A
// project-only scan passed candidates (cline, mem0, litellm, unsloth, e2b)
// whose ids were already held by TOOL entries, which then fail
// `pnpm run check:duplicates`.
test('loadExisting scans the whole catalogue, not just content/projects', async () => {
  const existing = await loadExisting();
  assert.ok(existing.ids.size > 1000, `expected the full catalogue, got ${existing.ids.size} ids`);
  // These repos are catalogued as tools, not projects. A project-only scan
  // misses them and would accept a colliding id.
  for (const id of ['cline', 'mem0', 'litellm', 'unsloth', 'e2b']) {
    assert.ok(existing.ids.has(id), `id "${id}" must be seen catalogue-wide`);
    assert.match(existing.ids.get(id), /^content\/tools\//, `${id} should be held by a tool entry`);
  }
  // And the project vertical must be a strict subset of what the scan sees.
  // Deliberately not an exact count: this catalogue grows, and a hardcoded
  // total here would fail on every content PR — the same drift
  // generate-readme-stats.js was added to remove.
  const projectEntries = [...existing.ids.values()].filter((f) => f.startsWith('content/projects/'));
  assert.ok(projectEntries.length > 300, `expected the full project vertical, got ${projectEntries.length}`);
  assert.ok(projectEntries.length < existing.ids.size, 'project entries must be a subset of the catalogue, not all of it');
});

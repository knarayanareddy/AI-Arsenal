import test from 'node:test';
import assert from 'node:assert/strict';
import { getChangedFiles, getChangedMarkdownFiles, isContentEntryCandidate } from '../scripts/utils/changed-files.js';

// A fake git runner: records the args it was called with, then returns a
// canned list or throws (to simulate a missing/unfetched base ref).
function fakeRun({ output = [], throwOn = () => false } = {}) {
  const calls = [];
  const run = (args) => {
    calls.push(args);
    if (throwOn(args)) throw new Error('fatal: bad revision');
    return output;
  };
  return { run, calls };
}

const BASE_ENV = process.env.GITHUB_BASE_SHA;
const CI_ENV = process.env.CI;
const GHA_ENV = process.env.GITHUB_ACTIONS;

function clearEnv() {
  delete process.env.GITHUB_BASE_SHA;
  delete process.env.CI;
  delete process.env.GITHUB_ACTIONS;
}

function restoreEnv() {
  if (BASE_ENV === undefined) delete process.env.GITHUB_BASE_SHA; else process.env.GITHUB_BASE_SHA = BASE_ENV;
  if (CI_ENV === undefined) delete process.env.CI; else process.env.CI = CI_ENV;
  if (GHA_ENV === undefined) delete process.env.GITHUB_ACTIONS; else process.env.GITHUB_ACTIONS = GHA_ENV;
}

test('strict mode fails closed when the base ref cannot be resolved', () => {
  clearEnv();
  try {
    const { run } = fakeRun({ throwOn: () => true });
    assert.throws(
      () => getChangedFiles({ base: 'origin/main', strict: true, run }),
      /Refusing to fail open in CI/
    );
  } finally {
    restoreEnv();
  }
});

test('strict mode returns the diff when the base resolves', () => {
  clearEnv();
  try {
    const { run, calls } = fakeRun({ output: ['content/a.md', 'scripts/x.js'] });
    const files = getChangedFiles({ base: 'origin/main', strict: true, run });
    assert.deepEqual(files, ['content/a.md', 'scripts/x.js']);
    assert.deepEqual(calls[0], ['diff', '--name-only', 'origin/main...HEAD']);
  } finally {
    restoreEnv();
  }
});

test('non-strict mode falls back through candidates and finally returns []', () => {
  clearEnv();
  try {
    const { run, calls } = fakeRun({ throwOn: () => true });
    const files = getChangedFiles({ base: 'origin/main', strict: false, run });
    assert.deepEqual(files, []);
    // primary, HEAD~1, then bare working-tree diff — three attempts.
    assert.equal(calls.length, 3);
  } finally {
    restoreEnv();
  }
});

test('base resolution prefers GITHUB_BASE_SHA when no explicit base is given', () => {
  clearEnv();
  process.env.GITHUB_BASE_SHA = 'deadbeef';
  try {
    const { run, calls } = fakeRun({ output: [] });
    getChangedFiles({ strict: true, run });
    assert.deepEqual(calls[0], ['diff', '--name-only', 'deadbeef...HEAD']);
  } finally {
    restoreEnv();
  }
});

test('an explicit base overrides GITHUB_BASE_SHA', () => {
  clearEnv();
  process.env.GITHUB_BASE_SHA = 'deadbeef';
  try {
    const { run, calls } = fakeRun({ output: [] });
    getChangedFiles({ base: 'abc123', strict: true, run });
    assert.deepEqual(calls[0], ['diff', '--name-only', 'abc123...HEAD']);
  } finally {
    restoreEnv();
  }
});

test('strict defaults to true under GITHUB_ACTIONS', () => {
  clearEnv();
  process.env.GITHUB_ACTIONS = 'true';
  try {
    const { run } = fakeRun({ throwOn: () => true });
    // strict not passed -> inferred from env -> should throw (fail closed).
    assert.throws(() => getChangedFiles({ base: 'origin/main', run }), /Refusing to fail open/);
  } finally {
    restoreEnv();
  }
});

test('getChangedMarkdownFiles filters to .md files', () => {
  clearEnv();
  try {
    const { run } = fakeRun({ output: ['content/a.md', 'scripts/x.js', 'data/b.json', 'content/c.md'] });
    const files = getChangedMarkdownFiles({ base: 'origin/main', strict: true, run });
    assert.deepEqual(files, ['content/a.md', 'content/c.md']);
  } finally {
    restoreEnv();
  }
});

test('isContentEntryCandidate excludes generated index/registry files', () => {
  assert.equal(isContentEntryCandidate('content/tools/x/foo.md'), true);
  assert.equal(isContentEntryCandidate('content/tools/x/_index.md'), false);
  assert.equal(isContentEntryCandidate('content/tools/x/_registry.md'), false);
  assert.equal(isContentEntryCandidate('scripts/x.js'), false);
  assert.equal(isContentEntryCandidate('data/tools.json'), false);
});

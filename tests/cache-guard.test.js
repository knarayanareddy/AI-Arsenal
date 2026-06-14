import test from 'node:test';
import assert from 'node:assert/strict';
import { validateRepoCache, sanitizeRepoCache } from '../scripts/utils/cache-guard.js';

test('validateRepoCache accepts reasonable records', () => {
  const result = validateRepoCache({
    stars: 1000,
    forks: 200,
    open_issues: 50,
    pushed_at: '2026-06-13T00:00:00Z'
  });
  assert.equal(result.ok, true);
});

test('validateRepoCache rejects non-objects', () => {
  assert.equal(validateRepoCache(null).ok, false);
  assert.equal(validateRepoCache(undefined).ok, false);
  assert.equal(validateRepoCache('string').ok, false);
  assert.equal(validateRepoCache(42).ok, false);
});

test('validateRepoCache rejects out-of-range stars', () => {
  assert.equal(validateRepoCache({ stars: -1 }).ok, false);
  assert.equal(validateRepoCache({ stars: 3_000_000 }).ok, false);
  assert.equal(validateRepoCache({ stars: 0 }).ok, true); // legit zero
});

test('validateRepoCache rejects out-of-range forks', () => {
  assert.equal(validateRepoCache({ stars: 1000, forks: -5 }).ok, false);
  assert.equal(validateRepoCache({ stars: 1000, forks: 2_000_000 }).ok, false);
});

test('validateRepoCache rejects forks > stars', () => {
  assert.equal(validateRepoCache({ stars: 100, forks: 200 }).ok, false);
  assert.equal(validateRepoCache({ stars: 100, forks: 101 }).ok, true); // 1 off is OK
});

test('validateRepoCache rejects out-of-range issues', () => {
  assert.equal(validateRepoCache({ stars: 1000, open_issues: -1 }).ok, false);
  assert.equal(validateRepoCache({ stars: 1000, open_issues: 2_000_000 }).ok, false);
});

test('validateRepoCache rejects non-ISO pushed_at', () => {
  assert.equal(validateRepoCache({ stars: 100, pushed_at: 'yesterday' }).ok, false);
  assert.equal(validateRepoCache({ stars: 100, pushed_at: '2026-06-13T00:00:00Z' }).ok, true);
});

test('sanitizeRepoCache drops bad records and keeps good ones', () => {
  const cache = {
    generated_at: '2026-06-13T00:00:00Z',
    repos: {
      'good/repo': { stars: 1000, forks: 200 },
      'bad/repo': { stars: 99_999_999 }, // out of range
      'missing/data': null
    }
  };
  const sanitized = sanitizeRepoCache(cache);
  assert.ok(sanitized.repos['good/repo']);
  assert.equal(sanitized.repos['bad/repo'], undefined);
  assert.equal(sanitized.repos['missing/data'], undefined);
});

test('sanitizeRepoCache handles empty/invalid input', () => {
  assert.deepEqual(sanitizeRepoCache(null), { generated_at: null, repos: {} });
  assert.deepEqual(sanitizeRepoCache(undefined), { generated_at: null, repos: {} });
  assert.deepEqual(sanitizeRepoCache({}), { generated_at: null, repos: {} });
});

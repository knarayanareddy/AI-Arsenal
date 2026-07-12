import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeReleaseTag, resolveReleaseTag } from '../scripts/resolve-release-tag.js';

test('normalizeReleaseTag accepts v-prefixed and unprefixed semver', () => {
  assert.equal(normalizeReleaseTag('1.2.3'), 'v1.2.3');
  assert.equal(normalizeReleaseTag('v2.0.0'), 'v2.0.0');
  assert.equal(normalizeReleaseTag('v2.0.0-rc.1'), 'v2.0.0-rc.1');
});

test('normalizeReleaseTag rejects malformed versions', () => {
  assert.throws(() => normalizeReleaseTag('v1'), /must be semver/);
  assert.throws(() => normalizeReleaseTag('release-latest'), /must be semver/);
});

test('resolveReleaseTag starts at v1.0.0 when no stable tags exist', () => {
  assert.equal(resolveReleaseTag('', []), 'v1.0.0');
  assert.equal(resolveReleaseTag('', ['v0.9.0-rc.1']), 'v1.0.0');
});

test('resolveReleaseTag increments the highest stable patch version', () => {
  assert.equal(resolveReleaseTag('', ['v1.2.3', 'v1.10.0', 'v1.9.9']), 'v1.10.1');
});

test('resolveReleaseTag honors an explicit requested version', () => {
  assert.equal(resolveReleaseTag('2.4.6', ['v2.4.6']), 'v2.4.6');
});

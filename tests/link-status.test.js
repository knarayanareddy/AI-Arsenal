import test from 'node:test';
import assert from 'node:assert/strict';
import { categorizeHttpStatus, classifyNetError, isTransientError, RATE_LIMIT_DOMAINS } from '../scripts/utils/link-status.js';

// --- categorizeHttpStatus -------------------------------------------------

test('categorizeHttpStatus: 2xx/3xx are ok', () => {
  assert.equal(categorizeHttpStatus(200), 'ok');
  assert.equal(categorizeHttpStatus(301), 'ok');
  assert.equal(categorizeHttpStatus(399), 'ok');
});

test('categorizeHttpStatus: 401/403/429 (auth/rate-limit) are ok, not broken', () => {
  assert.equal(categorizeHttpStatus(401), 'ok');
  assert.equal(categorizeHttpStatus(403), 'ok');
  assert.equal(categorizeHttpStatus(429), 'ok');
});

test('categorizeHttpStatus: 404/410 are broken (confirmed dead)', () => {
  assert.equal(categorizeHttpStatus(404), 'broken');
  assert.equal(categorizeHttpStatus(410), 'broken');
});

test('categorizeHttpStatus: other >=400 are soft warnings', () => {
  for (const s of [400, 402, 405, 406, 500, 502, 503, 504, 501]) {
    assert.equal(categorizeHttpStatus(s), 'soft', `status ${s} should be soft`);
  }
});

test('categorizeHttpStatus: null/missing is soft', () => {
  assert.equal(categorizeHttpStatus(null), 'soft');
  assert.equal(categorizeHttpStatus(undefined), 'soft');
});

// --- classifyNetError -----------------------------------------------------

test('classifyNetError: ENOTFOUND is a hard failure', () => {
  const r = classifyNetError({ code: 'ENOTFOUND', message: 'getaddrinfo ENOTFOUND example.invalid' });
  assert.equal(r.soft, false);
  assert.equal(r.reason, 'dns-not-found');
});

test('classifyNetError: transient codes are soft', () => {
  for (const code of ['ECONNRESET', 'ETIMEDOUT', 'EAI_AGAIN', 'UND_ERR_SOCKET']) {
    const r = classifyNetError({ code, message: `${code} something` });
    assert.equal(r.soft, true, `${code} should be soft`);
  }
});

test('classifyNetError: timeout/abort messages are soft', () => {
  const r = classifyNetError({ message: 'The operation was aborted due to timeout' });
  assert.equal(r.soft, true);
});

test('classifyNetError: unknown network errors default to soft (CI stability)', () => {
  const r = classifyNetError({ message: 'weird failure' });
  assert.equal(r.soft, true);
});

// --- isTransientError -----------------------------------------------------

test('isTransientError: true for transient codes', () => {
  assert.equal(isTransientError({ code: 'ECONNRESET' }), true);
  assert.equal(isTransientError({ code: 'EAI_AGAIN' }), true);
});

test('isTransientError: false for non-transient', () => {
  assert.equal(isTransientError({ code: 'ENOTFOUND' }), false);
  assert.equal(isTransientError({ message: 'certificate has expired' }), false);
});

// --- RATE_LIMIT_DOMAINS ---------------------------------------------------

test('RATE_LIMIT_DOMAINS covers GitHub and X', () => {
  assert.ok(RATE_LIMIT_DOMAINS.some((d) => d === 'github.com'));
  assert.ok(RATE_LIMIT_DOMAINS.some((d) => d === 'api.github.com'));
  assert.ok(RATE_LIMIT_DOMAINS.some((d) => d === 'x.com'));
  assert.ok(RATE_LIMIT_DOMAINS.some((d) => d === 'twitter.com'));
});

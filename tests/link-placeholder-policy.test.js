import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { warningCategory, categorizeHttpStatus } from '../scripts/utils/link-status.js';

test('placeholder-in-prose warnings get their own category', () => {
  // A URL-shaped string in prose (localhost, bare hostname, private IP) is
  // rejected by the SSRF guard and never fetched. It must not be bucketed as
  // "transient", or the report will misrepresent what was and was not contacted.
  assert.equal(warningCategory({ ok: false, error: 'localhost-hostname', placeholder: true }), 'placeholder');
  assert.equal(warningCategory({ ok: false, error: 'invalid-url', placeholder: true }), 'placeholder');
  assert.equal(warningCategory({ ok: false, error: 'bare-hostname', placeholder: true }), 'placeholder');
  assert.equal(warningCategory({ ok: false, error: 'private-ip-127.0.0.1', placeholder: true }), 'placeholder');
});

test('host-rate-limited still outranks the placeholder bucket', () => {
  // Order matters: a host that hit the per-host cap was genuinely skipped for
  // amplification reasons, which is a different fact from "this is a placeholder".
  assert.equal(warningCategory({ ok: false, error: 'host-rate-limited' }), 'host_cap');
  assert.equal(warningCategory({ ok: false, error: 'host-rate-limited', placeholder: false }), 'host_cap');
});

test('non-placeholder soft warnings keep their existing categories', () => {
  assert.equal(warningCategory({ ok: false, error: 'http-503' }), 'http_soft');
  assert.equal(warningCategory({ ok: false, error: 'redirect-unsafe:localhost-hostname' }), 'redirect');
  assert.equal(warningCategory({ ok: false, error: 'net-ECONNRESET' }), 'transient');
  assert.equal(warningCategory({ ok: false, error: 'dns-ESERVFAIL' }), 'transient');
});

test('a 404 remains a hard failure, not a warning', () => {
  // The placeholder reclassification must not weaken genuine dead-link detection.
  // check-links.js maps category 'broken' to soft:false regardless of category().
  assert.equal(categorizeHttpStatus(404), 'broken');
  assert.equal(categorizeHttpStatus(410), 'broken');
  assert.equal(categorizeHttpStatus(403), 'ok');
  assert.equal(categorizeHttpStatus(200), 'ok');
});

test('exceeding the URL cap must not abort the run', () => {
  // Regression guard for the change that made catalog-wide PRs mergeable.
  //
  // Previously check-links.js printed "Refusing to check N URLs" and exited 1
  // whenever a PR touched more than LINK_CHECK_MAX_URLS. That made a large but
  // perfectly clean content PR unmergeable, and indistinguishable from a real
  // broken-link failure. The cap must now bound *how many are contacted* while
  // still reporting the rest, so the run completes and reports honestly.
  const src = readFileSync(new URL('../scripts/check-links.js', import.meta.url), 'utf8');

  assert.ok(
    !/Refusing to check/.test(src),
    'check-links.js must not refuse to run when the URL cap is exceeded'
  );
  assert.doesNotMatch(
    src,
    /allUrls\.length\s*>\s*maxUrls\)\s*\{[^}]*process\.exit\(1\)/,
    'the over-cap branch must not call process.exit(1)'
  );
  assert.match(
    src,
    /allUrls\.length\s*>\s*maxUrls/,
    'the cap is still applied as a sampling bound'
  );
  assert.match(
    src,
    /\.sort\(\)\.slice\(0,\s*maxUrls\)/,
    'the sample must be deterministic across runs'
  );
});

test('placeholder handling is reversible via LINK_CHECK_STRICT_URLS', () => {
  // The relaxation must be opt-out-able, so a docs audit can still insist that
  // no entry documents a bare placeholder URL.
  const src = readFileSync(new URL('../scripts/check-links.js', import.meta.url), 'utf8');
  assert.match(src, /LINK_CHECK_STRICT_URLS/);
  assert.match(src, /STRICT_URLS/);
  // And placeholders must still never be fetched.
  assert.match(src, /!STRICT_URLS\s*&&\s*\(isPlaceholderReason/);
});

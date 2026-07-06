// Pure classification helpers for the link checker.
//
// These functions contain NO network I/O so the link-checker's scoring
// logic can be unit-tested without making real HTTP requests. The actual
// fetch/SSRF logic lives in scripts/check-links.js and scripts/utils/network-guard.js.

// HTTP status categories used by the link checker:
//   'ok'     -> link is fine (also covers 401/403/429: auth/rate-limit, not dead)
//   'broken' -> confirmed dead link worth failing CI / filing an issue
//   'soft'   -> everything else >= 400 is treated as a transient warning
//
// The design goal: only confirmed-missing resources (404/410) and genuine
// infrastructure failures (DNS miss, SSRF) are hard failures. Rate limits,
// transient 5xx, and method-not-allowed responses are warnings, never CI
// failures — see docs/automation-policy.md and the PR that introduced this.
export function categorizeHttpStatus(status) {
  if (status == null) return 'soft';
  if (status < 400) return 'ok';
  // Auth challenges and rate limits are NOT dead links.
  if (status === 401 || status === 403 || status === 429) return 'ok';
  // Gone / Not Found are the only statuses we treat as definitively broken.
  if (status === 404 || status === 410) return 'broken';
  return 'soft';
}

// Known, frequently-throttled hosts. Exceeding our per-host call budget on
// these is expected and must never be reported as a broken link.
export const RATE_LIMIT_DOMAINS = [
  'github.com',
  'www.github.com',
  'gist.github.com',
  'api.github.com',
  'raw.githubusercontent.com',
  'x.com',
  'www.x.com',
  'twitter.com',
  'www.twitter.com',
  'mobile.twitter.com',
];

// Network errors that are safe to retry, and safe to treat as soft warnings.
const TRANSIENT_NET_CODES = new Set([
  'ECONNRESET',
  'ETIMEDOUT',
  'ECONNREFUSED',
  'ENETUNREACH',
  'EHOSTUNREACH',
  'EAI_AGAIN', // temporary DNS failure
  'UND_ERR_CONNECT_TIMEOUT',
  'UND_ERR_SOCKET',
  'UND_ERR_ECONNRESET',
]);

// Classify a network/fetch error into { soft, reason }.
//   soft: true  -> transient / rate-limit: warning only, never fails CI
//   soft: false -> genuine failure (e.g. DNS name does not exist)
export function classifyNetError(err) {
  const code = err?.code || err?.cause?.code;
  const msg = `${err?.message || ''} ${err?.cause?.message || ''}`;
  // A name that does not resolve at all is a real dead host -> hard.
  if (code === 'ENOTFOUND') return { soft: false, reason: 'dns-not-found' };
  if (code && TRANSIENT_NET_CODES.has(code)) return { soft: true, reason: `net-${code}` };
  if (/aborted|timeout|socket hang up|fetch failed|connection reset|econn/i.test(msg)) {
    return { soft: true, reason: 'net-transient' };
  }
  // Default unknown network errors to soft so CI is not flaky on transient issues.
  return { soft: true, reason: 'net-error' };
}

// Whether an error is worth retrying (transient only — never retry 404s, etc.).
export function isTransientError(err) {
  const code = err?.code || err?.cause?.code;
  if (code && TRANSIENT_NET_CODES.has(code)) return true;
  const msg = `${err?.message || ''} ${err?.cause?.message || ''}`;
  return /aborted|timeout|socket hang up|fetch failed|connection reset|econn/i.test(msg);
}

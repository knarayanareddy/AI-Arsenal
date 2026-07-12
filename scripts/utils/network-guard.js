// SSRF / network safety guards used by link checker, star updater, and any
// other script that issues outbound HTTP from CI. Hardened against the
// standard attacker model: a malicious contributor plants a URL that, when
// fetched from the GitHub Actions runner, exfiltrates data from internal
// services or cloud metadata endpoints.

import net from 'node:net';
import http from 'node:http';
import https from 'node:https';
import dns from 'node:dns/promises';

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

const PRIVATE_IPV4_RANGES = [
  [ip4('10.0.0.0'), ip4('10.255.255.255')],
  [ip4('172.16.0.0'), ip4('172.31.255.255')],
  [ip4('192.168.0.0'), ip4('192.168.255.255')],
  [ip4('127.0.0.0'), ip4('127.255.255.255')], // loopback
  [ip4('169.254.0.0'), ip4('169.254.255.255')], // link-local (AWS/GCP/Azure metadata)
  [ip4('0.0.0.0'), ip4('0.255.255.255')],
  [ip4('100.64.0.0'), ip4('100.127.255.255')], // carrier-grade NAT
  [ip4('198.18.0.0'), ip4('198.19.255.255')], // benchmarking
  [ip4('224.0.0.0'), ip4('239.255.255.255')], // multicast
  [ip4('240.0.0.0'), ip4('255.255.255.255')]  // reserved
];

function ip4(s) {
  const parts = s.split('.').map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

export function isPrivateIpv4(addr) {
  if (!net.isIPv4(addr)) return false;
  const n = ip4(addr);
  return PRIVATE_IPV4_RANGES.some(([lo, hi]) => n >= lo && n <= hi);
}

export function isPrivateIpv6(addr) {
  if (!net.isIPv6(addr)) return false;
  const lower = addr.toLowerCase();
  // loopback ::1
  if (lower === '::1') return true;
  // link-local fe80::/10
  if (lower.startsWith('fe8') || lower.startsWith('fe9') || lower.startsWith('fea') || lower.startsWith('feb')) return true;
  // unique-local fc00::/7
  if (lower.startsWith('fc') || lower.startsWith('fd')) return true;
  // IPv4-mapped [::ffff:a.b.c.d]
  const mapped = lower.match(/^::ffff:([0-9.]+)$/);
  if (mapped) return isPrivateIpv4(mapped[1]);
  // IPv4-compatible deprecated form [::a.b.c.d]
  const compat = lower.match(/^::([0-9.]+)$/);
  if (compat) return isPrivateIpv4(compat[1]);
  // :: (unspecified)
  if (lower === '::') return true;
  return false;
}

export function isPrivateAddress(addr) {
  return isPrivateIpv4(addr) || isPrivateIpv6(addr);
}

// Resolve an HTTP redirect location relative to the URL that returned it.
// HTTP Location headers are commonly path-relative (for example, `/docs`).
export function resolveRedirectUrl(location, baseUrl) {
  try { return new URL(String(location), String(baseUrl)).toString(); }
  catch { return null; }
}

// Parse a URL safely and reject anything that isn't http(s).
export function parseSafeUrl(input) {
  let url;
  try { url = new URL(String(input)); } catch { return { ok: false, reason: 'invalid-url' }; }
  if (!ALLOWED_PROTOCOLS.has(url.protocol)) return { ok: false, reason: `protocol-${url.protocol.replace(':', '')}` };
  if (!url.hostname) return { ok: false, reason: 'no-host' };
  if (url.hostname.length > 253) return { ok: false, reason: 'host-too-long' };
  // Bare hostnames (no dots) are suspicious and disallowed.
  if (!url.hostname.includes('.') && url.hostname !== 'localhost') return { ok: false, reason: 'bare-hostname' };
  return { ok: true, url };
}

// Resolve the hostname to all A/AAAA records and reject if any are private.
// Defeats DNS rebinding-style attacks where the hostname resolves to a
// public IP at parse time but to a private IP at fetch time.
export async function assertPublicHostname(hostname) {
  if (hostname === 'localhost') return { ok: false, reason: 'localhost-hostname' };
  let records;
  try { records = await dns.lookup(hostname, { all: true }); }
  catch (error) { return { ok: false, reason: `dns-${error.code ?? 'error'}` }; }
  for (const { address } of records) {
    if (isPrivateAddress(address)) return { ok: false, reason: `private-ip-${address}` };
  }
  return { ok: true, addresses: records };
}

// Build a Node `dns.lookup`-compatible resolver bound to a fixed, pre-validated
// set of addresses. A naive `fetch`/`http.request` re-resolves DNS at connect
// time, which reopens the TOCTOU that assertPublicHostname closes: a rebinding
// server can answer with a public IP at validation time and a private IP at
// connect time. Pinning the socket to the addresses assertPublicHostname
// already approved removes that gap; retries cannot silently fall back to fresh
// resolution because they reuse this same bound lookup. The hostname itself is
// left untouched, so TLS SNI and certificate verification still use it.
export function pinnedLookup(addresses) {
  const approved = (addresses ?? [])
    .filter((entry) => entry && entry.address && !isPrivateAddress(entry.address))
    .map((entry) => ({ address: entry.address, family: entry.family === 6 || entry.family === 'IPv6' ? 6 : 4 }));
  return function lookup(hostname, options, callback) {
    const cb = typeof options === 'function' ? options : callback;
    const opts = typeof options === 'function' ? {} : (options ?? {});
    if (!approved.length) {
      cb(Object.assign(new Error(`no approved public address for ${hostname}`), { code: 'ENOTFOUND' }));
      return;
    }
    if (opts.all) {
      cb(null, approved.map((entry) => ({ address: entry.address, family: entry.family })));
      return;
    }
    const match = opts.family === 4 || opts.family === 6
      ? approved.find((entry) => entry.family === opts.family)
      : approved[0];
    if (!match) {
      cb(Object.assign(new Error(`no approved IPv${opts.family} address for ${hostname}`), { code: 'ENOTFOUND' }));
      return;
    }
    cb(null, match.address, match.family);
  };
}

// Issue a single HTTP(S) request whose socket is pinned to `lookup`, returning
// only the status line and Location header (the body is drained and discarded).
// Redirects are never auto-followed — the caller re-validates every Location
// against the SSRF rules. Errors carry Node's socket error codes
// (ENOTFOUND/ECONNREFUSED/ETIMEDOUT/…) so the existing classifier handles them
// unchanged. `agent: false` avoids connection pooling so the pinned lookup
// always applies and sockets are never reused across hosts.
export function requestStatus(rawUrl, { method = 'GET', lookup, timeoutMs = 15000, headers = {} } = {}) {
  const url = rawUrl instanceof URL ? rawUrl : new URL(String(rawUrl));
  const transport = url.protocol === 'https:' ? https : http;
  return new Promise((resolve, reject) => {
    const req = transport.request(
      url,
      { method, headers, lookup, servername: url.hostname, agent: false },
      (res) => {
        const status = res.statusCode;
        const location = res.headers.location ?? null;
        res.resume();
        resolve({ status, location });
      }
    );
    req.setTimeout(timeoutMs, () => req.destroy(Object.assign(new Error('request timeout'), { code: 'ETIMEDOUT' })));
    req.on('error', reject);
    req.end();
  });
}

// Configurable allow-list of domains (e.g., for internal scanners in
// self-hosted runners). When empty, all domains are allowed subject to
// the IP rules above.
export function domainAllowed(hostname, allowList = []) {
  if (!allowList.length) return true;
  const lower = hostname.toLowerCase();
  return allowList.some((pattern) => {
    const p = pattern.toLowerCase();
    return lower === p || lower.endsWith(`.${p}`);
  });
}

// Enforce per-host rate limits to prevent amplification attacks against
// a single victim host. Returns true if the host may be checked again.
const hostCallCounts = new Map();
export function hostCallAllowed(hostname, max = Number(process.env.LINK_CHECK_MAX_URLS_PER_HOST ?? 10)) {
  const count = hostCallCounts.get(hostname) ?? 0;
  if (count >= max) return false;
  hostCallCounts.set(hostname, count + 1);
  return true;
}
export function resetHostCallCounts() { hostCallCounts.clear(); }

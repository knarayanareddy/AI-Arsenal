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

// Expand an IPv6 address (already validated by net.isIPv6) to its 16 bytes.
// Handles the `::` zero-run, an optional zone id, and an embedded dotted-quad
// IPv4 tail (e.g. ::ffff:127.0.0.1). Returns null if it cannot be parsed.
export function ipv6ToBytes(addr) {
  if (!net.isIPv6(addr)) return null;
  let text = addr.toLowerCase();
  const zone = text.indexOf('%');
  if (zone !== -1) text = text.slice(0, zone);

  // Convert a trailing dotted-quad into two hextets so the rest is pure hex.
  const lastColon = text.lastIndexOf(':');
  const tail = text.slice(lastColon + 1);
  if (tail.includes('.')) {
    if (!net.isIPv4(tail)) return null;
    const [a, b, c, d] = tail.split('.').map(Number);
    text = `${text.slice(0, lastColon + 1)}${((a << 8) | b).toString(16)}:${((c << 8) | d).toString(16)}`;
  }

  const halves = text.split('::');
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(':') : [];
  const hasGap = halves.length === 2;
  const rear = hasGap ? (halves[1] ? halves[1].split(':') : []) : [];

  let hextets;
  if (hasGap) {
    const fill = 8 - head.length - rear.length;
    if (fill < 0) return null;
    hextets = [...head, ...Array(fill).fill('0'), ...rear];
  } else {
    hextets = head;
  }
  if (hextets.length !== 8) return null;

  const bytes = new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    if (!/^[0-9a-f]{1,4}$/.test(hextets[i])) return null;
    const value = parseInt(hextets[i], 16);
    bytes[i * 2] = (value >> 8) & 0xff;
    bytes[i * 2 + 1] = value & 0xff;
  }
  return bytes;
}

export function isPrivateIpv6(addr) {
  const b = ipv6ToBytes(addr);
  if (!b) return false;

  // IPv4-mapped ::ffff:0:0/96 — the address really reaches the embedded IPv4,
  // so classify against the v4 policy (defeats the hex-form loopback/metadata
  // bypass, e.g. ::ffff:7f00:1 -> 127.0.0.1).
  const first10Zero = b.slice(0, 10).every((x) => x === 0);
  if (first10Zero && b[10] === 0xff && b[11] === 0xff) {
    return isPrivateIpv4(`${b[12]}.${b[13]}.${b[14]}.${b[15]}`);
  }
  // First 12 bytes zero: unspecified (::), loopback (::1), or the deprecated
  // IPv4-compatible ::a.b.c.d form — all non-global.
  if (b.slice(0, 12).every((x) => x === 0)) {
    if (b[12] === 0 && b[13] === 0 && b[14] === 0 && b[15] <= 1) return true; // :: and ::1
    return isPrivateIpv4(`${b[12]}.${b[13]}.${b[14]}.${b[15]}`);
  }
  // Multicast ff00::/8
  if (b[0] === 0xff) return true;
  // Unique-local fc00::/7
  if ((b[0] & 0xfe) === 0xfc) return true;
  // Link-local fe80::/10 and deprecated site-local fec0::/10
  if (b[0] === 0xfe && (b[1] & 0xc0) !== 0x00) return true;
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
        // Only the status line and Location are needed. Destroy the response
        // immediately so a server cannot keep streaming a body (and holding the
        // socket) after we've already scored the URL — the request timeout is an
        // inactivity timer, not a total deadline.
        res.destroy();
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

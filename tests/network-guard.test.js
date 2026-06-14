import test from 'node:test';
import assert from 'node:assert/strict';
import { isPrivateIpv4, isPrivateIpv6, isPrivateAddress, parseSafeUrl, domainAllowed, hostCallAllowed, resetHostCallCounts } from '../scripts/utils/network-guard.js';

test('isPrivateIpv4 detects all private/loopback/link-local ranges', () => {
  // Loopback
  assert.equal(isPrivateIpv4('127.0.0.1'), true);
  assert.equal(isPrivateIpv4('127.255.255.255'), true);
  // Private RFC1918
  assert.equal(isPrivateIpv4('10.0.0.1'), true);
  assert.equal(isPrivateIpv4('10.255.255.255'), true);
  assert.equal(isPrivateIpv4('172.16.0.1'), true);
  assert.equal(isPrivateIpv4('172.31.255.255'), true);
  assert.equal(isPrivateIpv4('192.168.0.1'), true);
  assert.equal(isPrivateIpv4('192.168.255.255'), true);
  // Link-local (cloud metadata!)
  assert.equal(isPrivateIpv4('169.254.169.254'), true);
  assert.equal(isPrivateIpv4('169.254.0.1'), true);
  // Carrier-grade NAT
  assert.equal(isPrivateIpv4('100.64.0.1'), true);
  // 0.0.0.0
  assert.equal(isPrivateIpv4('0.0.0.0'), true);
  // Multicast
  assert.equal(isPrivateIpv4('224.0.0.1'), true);
  // Reserved
  assert.equal(isPrivateIpv4('240.0.0.1'), true);
  // Public addresses
  assert.equal(isPrivateIpv4('8.8.8.8'), false);
  assert.equal(isPrivateIpv4('1.1.1.1'), false);
  assert.equal(isPrivateIpv4('140.82.121.4'), false); // GitHub
  // Invalid
  assert.equal(isPrivateIpv4('not-an-ip'), false);
  assert.equal(isPrivateIpv4('256.0.0.1'), false);
});

test('isPrivateIpv6 detects loopback, link-local, ULA, mapped, unspecified', () => {
  assert.equal(isPrivateIpv6('::1'), true);
  assert.equal(isPrivateIpv6('fe80::1'), true);
  assert.equal(isPrivateIpv6('fc00::1'), true);
  assert.equal(isPrivateIpv6('fd00::1'), true);
  assert.equal(isPrivateIpv6('::'), true);
  assert.equal(isPrivateIpv6('::ffff:127.0.0.1'), true);
  assert.equal(isPrivateIpv6('::ffff:169.254.169.254'), true);
  assert.equal(isPrivateIpv6('2001:4860:4860::8888'), false); // Google public DNS
  assert.equal(isPrivateIpv6('2606:4700:4700::1111'), false); // Cloudflare public DNS
  assert.equal(isPrivateIpv6('not-an-ip'), false);
});

test('isPrivateAddress combines v4 and v6', () => {
  assert.equal(isPrivateAddress('127.0.0.1'), true);
  assert.equal(isPrivateAddress('::1'), true);
  assert.equal(isPrivateAddress('8.8.8.8'), false);
  assert.equal(isPrivateAddress('2001:4860:4860::8888'), false);
});

test('parseSafeUrl rejects non-http schemes', () => {
  assert.equal(parseSafeUrl('file:///etc/passwd').ok, false);
  assert.equal(parseSafeUrl('gopher://example.com').ok, false);
  assert.equal(parseSafeUrl('ftp://example.com').ok, false);
  assert.equal(parseSafeUrl('dict://example.com').ok, false);
  assert.equal(parseSafeUrl('javascript:alert(1)').ok, false);
  assert.equal(parseSafeUrl('data:text/html,<script>alert(1)</script>').ok, false);
});

test('parseSafeUrl accepts http and https', () => {
  const http = parseSafeUrl('http://example.com/path');
  assert.equal(http.ok, true);
  assert.equal(http.url.protocol, 'http:');
  const https = parseSafeUrl('https://example.com/path');
  assert.equal(https.ok, true);
  assert.equal(https.url.protocol, 'https:');
});

test('parseSafeUrl rejects malformed URLs', () => {
  assert.equal(parseSafeUrl('not a url').ok, false);
  assert.equal(parseSafeUrl('').ok, false);
  assert.equal(parseSafeUrl('http://').ok, false);
});

test('parseSafeUrl rejects bare hostnames (no dots)', () => {
  const noDot = parseSafeUrl('http://localhost/foo');
  // localhost is allowed by name but should still be flagged via DNS guard.
  // The hostname-without-dot rule applies to non-localhost bare names.
  assert.equal(parseSafeUrl('http://intranet/foo').ok, false);
  assert.equal(parseSafeUrl('http://nodot/foo').ok, false);
});

test('parseSafeUrl rejects overly long hostnames', () => {
  const longHost = 'a'.repeat(254);
  const result = parseSafeUrl(`http://${longHost}.com/`);
  assert.equal(result.ok, false);
});

test('domainAllowed defaults to allowing all (when allowlist empty)', () => {
  assert.equal(domainAllowed('example.com', []), true);
  assert.equal(domainAllowed('sub.example.com', []), true);
});

test('domainAllowed enforces explicit allowlist', () => {
  const allow = ['example.com', 'github.com'];
  assert.equal(domainAllowed('example.com', allow), true);
  assert.equal(domainAllowed('sub.example.com', allow), true);
  assert.equal(domainAllowed('github.com', allow), true);
  assert.equal(domainAllowed('evil.com', allow), false);
  assert.equal(domainAllowed('evil.example.com.attacker.com', allow), false);
});

test('hostCallAllowed enforces per-host caps', () => {
  resetHostCallCounts();
  const host = 'cap-test.example.com';
  // First call allowed
  assert.equal(hostCallAllowed(host, 3), true);
  assert.equal(hostCallAllowed(host, 3), true);
  assert.equal(hostCallAllowed(host, 3), true);
  // Fourth call denied
  assert.equal(hostCallAllowed(host, 3), false);
  // Different host unaffected
  resetHostCallCounts();
  assert.equal(hostCallAllowed(host, 3), true);
  assert.equal(hostCallAllowed('other.example.com', 3), true);
});

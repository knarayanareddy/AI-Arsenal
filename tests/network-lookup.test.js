import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { pinnedLookup, requestStatus } from '../scripts/utils/network-guard.js';

// Promisified single-shot lookup for assertions.
function look(lookup, hostname, options = {}) {
  return new Promise((resolve, reject) => {
    lookup(hostname, options, (err, address, family) => {
      if (err) reject(err);
      else resolve({ address, family });
    });
  });
}

test('pinnedLookup returns an approved IPv4 address (default family)', async () => {
  const lookup = pinnedLookup([{ address: '93.184.216.34', family: 4 }]);
  assert.deepEqual(await look(lookup, 'example.com'), { address: '93.184.216.34', family: 4 });
});

test('pinnedLookup honours an IPv6 family request from a mixed answer', async () => {
  const lookup = pinnedLookup([
    { address: '93.184.216.34', family: 4 },
    { address: '2606:2800:220:1:248:1893:25c8:1946', family: 6 },
  ]);
  assert.deepEqual(await look(lookup, 'example.com', { family: 6 }), {
    address: '2606:2800:220:1:248:1893:25c8:1946',
    family: 6,
  });
  assert.deepEqual(await look(lookup, 'example.com', { family: 4 }), { address: '93.184.216.34', family: 4 });
});

test('pinnedLookup with { all: true } returns every approved address', async () => {
  const lookup = pinnedLookup([
    { address: '93.184.216.34', family: 4 },
    { address: '2606:2800:220:1:248:1893:25c8:1946', family: 6 },
  ]);
  const all = await new Promise((resolve, reject) =>
    lookup('example.com', { all: true }, (err, addresses) => (err ? reject(err) : resolve(addresses)))
  );
  assert.deepEqual(all, [
    { address: '93.184.216.34', family: 4 },
    { address: '2606:2800:220:1:248:1893:25c8:1946', family: 6 },
  ]);
});

test('pinnedLookup drops private addresses from a mixed answer (rebinding defence)', async () => {
  // A public + private mixed answer: the private entry must never be handed to
  // the socket, so only the public one survives.
  const lookup = pinnedLookup([
    { address: '169.254.169.254', family: 4 }, // cloud metadata
    { address: '93.184.216.34', family: 4 },
  ]);
  assert.deepEqual(await look(lookup, 'example.com'), { address: '93.184.216.34', family: 4 });
});

test('pinnedLookup fails ENOTFOUND when every approved address is private/empty', async () => {
  const privateOnly = pinnedLookup([{ address: '127.0.0.1', family: 4 }, { address: '10.0.0.5', family: 4 }]);
  await assert.rejects(() => look(privateOnly, 'evil.internal'), (err) => err.code === 'ENOTFOUND');
  const empty = pinnedLookup([]);
  await assert.rejects(() => look(empty, 'nowhere'), (err) => err.code === 'ENOTFOUND');
});

test('pinnedLookup is bound to its snapshot and never consults live DNS', async () => {
  // Even if real DNS for this host would now return a private IP, the resolver
  // only ever yields the addresses captured at construction time.
  const lookup = pinnedLookup([{ address: '93.184.216.34', family: 4 }]);
  for (let i = 0; i < 5; i++) {
    assert.equal((await look(lookup, 'rebind.example.com')).address, '93.184.216.34');
  }
});

test('requestStatus returns status + Location and never auto-follows redirects', async () => {
  const server = http.createServer((req, res) => {
    if (req.url === '/redirect') {
      res.writeHead(302, { Location: 'https://example.com/final' });
      res.end();
    } else {
      res.writeHead(204);
      res.end();
    }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  // Loopback lookup only to exercise the transport plumbing (not the SSRF guard).
  const loopback = (hostname, options, cb) => {
    const done = typeof options === 'function' ? options : cb;
    const opts = typeof options === 'function' ? {} : (options ?? {});
    if (opts.all) done(null, [{ address: '127.0.0.1', family: 4 }]);
    else done(null, '127.0.0.1', 4);
  };
  try {
    const redirect = await requestStatus(`http://local.test:${port}/redirect`, { method: 'HEAD', lookup: loopback });
    assert.equal(redirect.status, 302);
    assert.equal(redirect.location, 'https://example.com/final'); // returned, not followed
    const ok = await requestStatus(`http://local.test:${port}/ok`, { method: 'GET', lookup: loopback });
    assert.equal(ok.status, 204);
    assert.equal(ok.location, null);
  } finally {
    server.close();
  }
});

test('requestStatus terminates a streaming response after headers (no unbounded drain)', async () => {
  let clientGone = false;
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
    // Stream forever until the client tears the socket down.
    const timer = setInterval(() => {
      if (!res.write('x'.repeat(1024))) { /* backpressure ok */ }
    }, 5);
    const stop = () => { clearInterval(timer); clientGone = true; };
    res.on('close', stop);
    req.on('close', stop);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const loopback = (hostname, options, cb) => {
    const done = typeof options === 'function' ? options : cb;
    const opts = typeof options === 'function' ? {} : (options ?? {});
    if (opts.all) done(null, [{ address: '127.0.0.1', family: 4 }]);
    else done(null, '127.0.0.1', 4);
  };
  try {
    const r = await requestStatus(`http://local.test:${port}/stream`, { method: 'GET', lookup: loopback, timeoutMs: 5000 });
    assert.equal(r.status, 200);
    // The server's socket should be torn down promptly once we have the headers.
    await new Promise((resolve) => setTimeout(resolve, 100));
    assert.equal(clientGone, true);
  } finally {
    server.close();
  }
});

test('requestStatus times out with an ETIMEDOUT-coded error', async () => {
  const server = http.createServer(() => { /* never responds */ });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const loopback = (hostname, options, cb) => {
    const done = typeof options === 'function' ? options : cb;
    const opts = typeof options === 'function' ? {} : (options ?? {});
    if (opts.all) done(null, [{ address: '127.0.0.1', family: 4 }]);
    else done(null, '127.0.0.1', 4);
  };
  try {
    await assert.rejects(
      () => requestStatus(`http://local.test:${port}/hang`, { method: 'GET', lookup: loopback, timeoutMs: 150 }),
      (err) => err.code === 'ETIMEDOUT'
    );
  } finally {
    server.close();
  }
});

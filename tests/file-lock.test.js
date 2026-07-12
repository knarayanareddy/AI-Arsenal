import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pidAlive, lockIsStale, acquireLock, releaseLock } from '../scripts/utils/file-lock.js';

const fixturesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures');

// Unique lock path per test so runs stay isolated and never collide.
function lockPath(name) {
  return path.join(fixturesDir, `.lock-test-${name}-${process.pid}`);
}

async function cleanup(p) {
  await fs.unlink(p).catch(() => {});
}

test('acquireLock then releaseLock leaves no lock file (success path)', async () => {
  const p = lockPath('success');
  await cleanup(p);
  const handle = await acquireLock(p);
  assert.ok(handle, 'should acquire the lock');
  assert.equal((await fs.readFile(p, 'utf8')).trim(), String(process.pid));
  await releaseLock(p, handle);
  await assert.rejects(fs.stat(p), 'lock file should be gone after release');
});

test('releaseLock runs cleanly even when the run "failed" (finally semantics)', async () => {
  const p = lockPath('failure');
  await cleanup(p);
  const handle = await acquireLock(p);
  let released = false;
  try {
    throw new Error('simulated run failure');
  } catch {
    // ignore
  } finally {
    await releaseLock(p, handle);
    released = true;
  }
  assert.ok(released);
  await assert.rejects(fs.stat(p), 'lock file should be removed in finally');
});

test('acquireLock returns null when a live owner holds the lock', async () => {
  const p = lockPath('live');
  await cleanup(p);
  // Write a lock owned by THIS (definitely alive) process.
  await fs.writeFile(p, `${process.pid}\n`);
  try {
    const handle = await acquireLock(p);
    assert.equal(handle, null, 'must not steal a live lock');
    // The live lock file must remain untouched.
    assert.equal((await fs.readFile(p, 'utf8')).trim(), String(process.pid));
  } finally {
    await cleanup(p);
  }
});

test('acquireLock reclaims a stale lock owned by a dead PID', async () => {
  const p = lockPath('stale-pid');
  await cleanup(p);
  // PID 2^31-1 is effectively never a running process.
  await fs.writeFile(p, `2147483647\n`);
  try {
    const handle = await acquireLock(p);
    assert.ok(handle, 'should reclaim a lock whose owner is dead');
    assert.equal((await fs.readFile(p, 'utf8')).trim(), String(process.pid));
    await releaseLock(p, handle);
  } finally {
    await cleanup(p);
  }
});

test('lockIsStale: dead PID is stale; live PID within age is not', async () => {
  const p = lockPath('is-stale');
  await cleanup(p);
  await fs.writeFile(p, `2147483647\n`);
  assert.equal(await lockIsStale(p), true);

  await fs.writeFile(p, `${process.pid}\n`);
  assert.equal(await lockIsStale(p), false);

  // A live owner but an old file is still stale (age-based recovery).
  assert.equal(await lockIsStale(p, { staleMs: 0, now: Date.now() + 1000 }), true);
  await cleanup(p);
});

test('pidAlive: current process is alive, absurd PID is not', () => {
  assert.equal(pidAlive(process.pid), true);
  assert.equal(pidAlive(2147483647), false);
  assert.equal(pidAlive(null), false);
});

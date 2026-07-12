import fs from 'node:fs/promises';

// A minimal advisory file lock used to prevent concurrent data-mutating runs
// (e.g. the star refresher). The lock file records the owner PID so an
// abandoned lock left by a crashed run can be reclaimed instead of blocking
// every future run forever.

export const DEFAULT_STALE_MS = 30 * 60 * 1000;

// process.kill(pid, 0) probes liveness without delivering a signal:
//   throws ESRCH -> process is gone
//   throws EPERM -> process exists but is owned by someone else (alive)
// Anything else we conservatively treat as alive.
export function pidAlive(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === 'EPERM';
  }
}

export async function readLockPid(lockPath) {
  try {
    const pid = parseInt((await fs.readFile(lockPath, 'utf8')).trim(), 10);
    return Number.isInteger(pid) ? pid : null;
  } catch {
    return null;
  }
}

// A lock is stale if its owner PID is dead, or the lock file is older than
// `staleMs` (a crashed run that never released it).
export async function lockIsStale(lockPath, { staleMs = DEFAULT_STALE_MS, now = Date.now() } = {}) {
  if (!pidAlive(await readLockPid(lockPath))) return true;
  try {
    const { mtimeMs } = await fs.stat(lockPath);
    return now - mtimeMs > staleMs;
  } catch {
    return false;
  }
}

// Try to acquire the lock. Returns the open file handle on success, or null if
// a live owner already holds it. A single stale lock is reclaimed and retried.
export async function acquireLock(lockPath, { staleMs = DEFAULT_STALE_MS } = {}) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const handle = await fs.open(lockPath, 'wx');
      await handle.writeFile(`${process.pid}\n`);
      return handle;
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      if (attempt === 0 && (await lockIsStale(lockPath, { staleMs }))) {
        await fs.unlink(lockPath).catch(() => {});
        continue;
      }
      return null;
    }
  }
  return null;
}

export async function releaseLock(lockPath, handle) {
  if (!handle) return;
  await handle.close().catch(() => {});
  await fs.unlink(lockPath).catch(() => {});
}

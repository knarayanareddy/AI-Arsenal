// Lightweight validation for cached GitHub repo metrics. We refuse to
// trust or write absurd values that would poison the data layer if a
// poisoned cache file were ever committed.

const MAX_REASONABLE_STARS = 2_000_000;
const MAX_REASONABLE_FORKS = 1_000_000;
const MAX_REASONABLE_ISSUES = 1_000_000;

export function validateRepoCache(record) {
  if (!record || typeof record !== 'object') return { ok: false, reason: 'not-an-object' };
  if (typeof record.stars !== 'number' || record.stars < 0 || record.stars > MAX_REASONABLE_STARS) {
    return { ok: false, reason: `stars-out-of-range:${record.stars}` };
  }
  if (typeof record.forks === 'number' && (record.forks < 0 || record.forks > MAX_REASONABLE_FORKS)) {
    return { ok: false, reason: `forks-out-of-range:${record.forks}` };
  }
  if (record.forks > record.stars + 1) {
    return { ok: false, reason: `forks-greater-than-stars:${record.forks}>${record.stars}` };
  }
  if (typeof record.open_issues === 'number' && (record.open_issues < 0 || record.open_issues > MAX_REASONABLE_ISSUES)) {
    return { ok: false, reason: `issues-out-of-range:${record.open_issues}` };
  }
  if (typeof record.pushed_at === 'string' && Number.isNaN(Date.parse(record.pushed_at))) {
    return { ok: false, reason: `pushed-at-not-iso:${record.pushed_at}` };
  }
  return { ok: true };
}

export function sanitizeRepoCache(cache) {
  if (!cache || typeof cache !== 'object' || !cache.repos) return { generated_at: null, repos: {} };
  const sanitized = { generated_at: cache.generated_at ?? null, repos: {} };
  for (const [key, value] of Object.entries(cache.repos)) {
    const verdict = validateRepoCache(value);
    if (verdict.ok) sanitized.repos[key] = value;
  }
  return sanitized;
}

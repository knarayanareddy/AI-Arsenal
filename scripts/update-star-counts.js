#!/usr/bin/env node
import fs from 'node:fs/promises';
import { unlinkSync } from 'node:fs';
import path from 'node:path';
import matter from './utils/safe-matter.js';
import chalk from 'chalk';
import { getEntryFiles, readMarkdown, inferEntryType } from './utils/frontmatter.js';
import { fetchGitHubRepo, parseGitHubRepo } from './utils/github-api.js';
import { sanitizeRepoCache } from './utils/cache-guard.js';
import { acquireLock, releaseLock } from './utils/file-lock.js';

const dryRun = process.argv.includes('--dry-run');
const cachePath = 'data/github-cache.json';
const lockPath = 'data/.star-lock';
const skipTokenCheck = process.env.AI_ARSENAL_SKIP_TOKEN_CHECK === 'true';

// In CI we require a GITHUB_TOKEN to avoid hitting the 60-req/hour
// anonymous rate limit. Set AI_ARSENAL_SKIP_TOKEN_CHECK=true to opt out.
if (!process.env.GITHUB_TOKEN && !skipTokenCheck && process.env.CI === 'true') {
  console.error(chalk.red('GITHUB_TOKEN is required for star refresh in CI. Set AI_ARSENAL_SKIP_TOKEN_CHECK=true to override.'));
  process.exit(2);
}

// Refuse to run if another live run holds the lock; a stale lock left by a
// crashed run (dead PID or old file) is reclaimed automatically.
let lockHandle = await acquireLock(lockPath);
if (!lockHandle) {
  console.error(chalk.red(`Another star-refresh is in progress (lock at ${lockPath}). Refusing to run.`));
  process.exit(3);
}
// Best-effort synchronous safety net: Node does not await async 'exit'
// handlers, so the real release happens in the awaited finally block below.
// This only covers abrupt exits that skip the finally.
process.on('exit', () => {
  if (!lockHandle) return;
  try { unlinkSync(lockPath); } catch {}
});

async function run() {
let cache = { generated_at: null, repos: {} };
try { cache = sanitizeRepoCache(JSON.parse(await fs.readFile(cachePath, 'utf8'))); } catch {}

function repoKey(url) {
  const parsed = parseGitHubRepo(url);
  return parsed ? `${parsed.owner}/${parsed.repo}` : null;
}

function calculateTrendingScore(data, repoData) {
  const now = new Date();
  const velocityScore = Math.min(((data.github_stars_last_30d ?? repoData?.stars_last_30d ?? 0) / 500) * 40, 40);
  const recentBuzz = (data.buzz_sources ?? []).filter((b) => (now - new Date(b.date)) / 86400000 < 30).length;
  const buzzScore = Math.min(recentBuzz * 10, 30);
  const daysOld = data.added_date ? (now - new Date(`${data.added_date}T00:00:00Z`)) / 86400000 : 999;
  const recencyBonus = daysOld < 14 ? 15 : daysOld < 30 ? 8 : 0;
  const starScore = Math.min(Math.log10((data.github_stars ?? repoData?.stars ?? 0) + 1) * 5, 15);
  return Math.max(0, Math.min(100, Math.round(velocityScore + buzzScore + recencyBonus + starScore)));
}

let checked = 0;
let updated = 0;
let skipped = 0;
const failures = [];

for (const file of await getEntryFiles()) {
  const parsed = await readMarkdown(file);
  if (!parsed.hasFrontmatter || inferEntryType(file, parsed.data) !== 'project') continue;
  const key = repoKey(parsed.data.github_url);
  if (!key) { skipped += 1; continue; }
  checked += 1;
  try {
    const repo = await fetchGitHubRepo(parsed.data.github_url);
    if (!repo) { skipped += 1; continue; }
    const previous = cache.repos[key]?.stars ?? parsed.data.github_stars ?? 0;
    const current = repo.stargazers_count ?? previous;
    parsed.data.github_stars = current;
    parsed.data.github_stars_last_30d = Math.max(0, current - previous);
    parsed.data.last_commit = repo.pushed_at ? repo.pushed_at.slice(0, 10) : parsed.data.last_commit;
    cache.repos[key] = {
      stars: current,
      previous_stars: previous,
      stars_last_30d: Math.max(0, current - previous),
      forks: repo.forks_count ?? null,
      open_issues: repo.open_issues_count ?? null,
      pushed_at: repo.pushed_at ?? null,
      default_branch: repo.default_branch ?? null,
      archived: repo.archived ?? false,
      disabled: repo.disabled ?? false,
      checked_at: new Date().toISOString()
    };
    if (repo.archived && parsed.data.status === 'active') parsed.data.status = 'archived';
    // Recompute trending score immediately so that running only this
    // script still yields a consistent data layer (S-23 fix).
    parsed.data.trending_score = calculateTrendingScore(parsed.data, cache.repos[key]);
    if (!dryRun) await fs.writeFile(file, matter.stringify(parsed.content, parsed.data));
    updated += 1;
    await new Promise((resolve) => setTimeout(resolve, 200));
  } catch (error) {
    skipped += 1;
    failures.push(`${file}: ${error.message}`);
  }
}

cache.generated_at = new Date().toISOString();
if (!dryRun) {
  await fs.mkdir(path.dirname(cachePath), { recursive: true });
  await fs.writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`);
}

if (failures.length) {
  console.warn(chalk.yellow(`Star refresh warnings (${failures.length}):`));
  for (const failure of failures) console.warn(chalk.yellow(`- ${failure}`));
}
console.log(chalk.green(`Star refresh complete. Checked ${checked}, updated ${updated}, skipped ${skipped}. Dry run: ${dryRun}.`));
}

try {
  await run();
} finally {
  // Always release the lock — awaited, unlike the 'exit' safety net.
  const handle = lockHandle;
  lockHandle = null;
  await releaseLock(lockPath, handle);
}

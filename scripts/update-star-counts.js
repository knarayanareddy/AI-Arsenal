#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import chalk from 'chalk';
import { getEntryFiles, readMarkdown, inferEntryType } from './utils/frontmatter.js';
import { fetchGitHubRepo, parseGitHubRepo } from './utils/github-api.js';

const dryRun = process.argv.includes('--dry-run');
const cachePath = 'data/github-cache.json';
let cache = { generated_at: null, repos: {} };
try { cache = JSON.parse(await fs.readFile(cachePath, 'utf8')); } catch {}

function repoKey(url) {
  const parsed = parseGitHubRepo(url);
  return parsed ? `${parsed.owner}/${parsed.repo}` : null;
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
    if (!dryRun) await fs.writeFile(file, matter.stringify(parsed.content, parsed.data));
    updated += 1;
    await new Promise((resolve) => setTimeout(resolve, 150));
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

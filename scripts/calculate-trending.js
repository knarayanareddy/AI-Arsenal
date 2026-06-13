#!/usr/bin/env node
import fs from 'node:fs/promises';
import matter from 'gray-matter';
import chalk from 'chalk';
import { getEntryFiles, readMarkdown, inferEntryType } from './utils/frontmatter.js';
import { parseGitHubRepo } from './utils/github-api.js';

let cache = { repos: {} };
try { cache = JSON.parse(await fs.readFile('data/github-cache.json', 'utf8')); } catch {}

function repoKey(url) {
  const parsed = parseGitHubRepo(url);
  return parsed ? `${parsed.owner}/${parsed.repo}` : null;
}

function calculateTrendingScore(entry) {
  const key = repoKey(entry.github_url);
  const githubData = key ? cache.repos[key] : null;
  const now = new Date();
  const starVelocity = entry.github_stars_last_30d ?? githubData?.stars_last_30d ?? 0;
  const velocityScore = Math.min((starVelocity / 500) * 40, 40);
  const buzzSources = entry.buzz_sources ?? [];
  const recentBuzz = buzzSources.filter((b) => (now - new Date(b.date)) / 86400000 < 30).length;
  const buzzScore = Math.min(recentBuzz * 10, 30);
  const daysOld = entry.added_date ? (now - new Date(`${entry.added_date}T00:00:00Z`)) / 86400000 : 999;
  const recencyBonus = daysOld < 14 ? 15 : daysOld < 30 ? 8 : 0;
  const starScore = Math.min(Math.log10((entry.github_stars ?? githubData?.stars ?? 0) + 1) * 5, 15);
  return Math.max(0, Math.min(100, Math.round(velocityScore + buzzScore + recencyBonus + starScore)));
}

let updated = 0;
for (const file of await getEntryFiles()) {
  const parsed = await readMarkdown(file);
  if (!parsed.hasFrontmatter || inferEntryType(file, parsed.data) !== 'project') continue;
  const score = calculateTrendingScore(parsed.data);
  if (parsed.data.trending_score !== score) {
    parsed.data.trending_score = score;
    await fs.writeFile(file, matter.stringify(parsed.content, parsed.data));
    updated += 1;
  }
}
console.log(chalk.green(`Recalculated trending scores for ${updated} project entr${updated === 1 ? 'y' : 'ies'}.`));

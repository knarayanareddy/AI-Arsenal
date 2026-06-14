#!/usr/bin/env node
import fs from 'node:fs/promises';
import chalk from 'chalk';

const reportPath = process.argv.find((a) => a.startsWith('--report='))?.split('=')[1] ?? 'data/link-check-report.json';
const limit = Number(process.env.BROKEN_LINK_ISSUE_LIMIT ?? 10);

let report = { broken_links: [] };
try { report = JSON.parse(await fs.readFile(reportPath, 'utf8')); } catch {}

const broken = report.broken_links ?? [];
if (!broken.length) {
  console.log(chalk.green('No broken links to file.'));
  process.exit(0);
}

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
if (!token || !repo) {
  console.log(chalk.yellow(`No GitHub token/repository available. Would file ${broken.length} broken-link issue(s).`));
  process.exit(0);
}

async function gh(path, options = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers ?? {})
    }
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
  return response.json();
}

const [owner, name] = repo.split('/');
const existing = await gh(`/repos/${owner}/${name}/issues?state=open&labels=broken-link&per_page=100`);
const existingTitles = new Set(existing.map((issue) => issue.title));
let created = 0;

// Always deduplicate within this run as well.
const seenThisRun = new Set();
let skippedDuplicate = 0;
let skippedLimit = 0;

for (const item of broken) {
  if (created >= limit) { skippedLimit += 1; continue; }
  const title = `[BROKEN LINK] ${item.url}`.slice(0, 240);
  if (existingTitles.has(title) || seenThisRun.has(title)) { skippedDuplicate += 1; continue; }
  seenThisRun.add(title);

  const body = [
    'Automated link check found a broken URL.',
    '',
    `URL: ${item.url}`,
    `Status/Error: ${item.status ?? item.error ?? 'unknown'}`,
    '',
    'Files:',
    ...(item.files ?? []).map((f) => `- ${f}`),
    '',
    `Report generated: ${report.generated_at}`,
    '',
    '<!-- Do not edit the issue title; automation skips issues that already exist. -->'
  ].join('\n');
  await gh(`/repos/${owner}/${name}/issues`, { method: 'POST', body: JSON.stringify({ title, body, labels: ['broken-link', 'needs-review'] }) });
  created += 1;
  // Brief sleep to avoid hammering the GitHub API.
  await new Promise((resolve) => setTimeout(resolve, 200));
}

console.log(chalk.green(`Created ${created} broken-link issue(s). Skipped: ${skippedDuplicate} duplicates, ${skippedLimit} over the limit of ${limit}.`));

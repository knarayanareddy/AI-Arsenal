#!/usr/bin/env node
import fs from 'node:fs/promises';
import chalk from 'chalk';

const reportPath = process.argv.find((a) => a.startsWith('--report='))?.split('=')[1] ?? 'data/link-check-report.json';
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

for (const item of broken.slice(0, 25)) {
  const title = `[BROKEN LINK] ${item.url}`.slice(0, 240);
  if (existingTitles.has(title)) continue;
  const body = [
    'Automated link check found a broken URL.',
    '',
    `URL: ${item.url}`,
    `Status/Error: ${item.status ?? item.error ?? 'unknown'}`,
    '',
    'Files:',
    ...(item.files ?? []).map((f) => `- ${f}`),
    '',
    `Report generated: ${report.generated_at}`
  ].join('\n');
  await gh(`/repos/${owner}/${name}/issues`, { method: 'POST', body: JSON.stringify({ title, body, labels: ['broken-link', 'needs-review'] }) });
  created += 1;
}

console.log(chalk.green(`Created ${created} broken-link issue(s).`));

#!/usr/bin/env node
// File GitHub issues for entries that crossed the stale threshold, so the
// "Stale entry update — Monthly — 30 days" SLA in GOVERNANCE.md has an owner
// loop behind it. This is the stale-content counterpart to
// scripts/create-link-issues.js, which does the same for broken links.
//
// Reads data/stale-report.json (written by scripts/check-stale.js) and opens
// one issue per stale entry, deduplicated against open issues so repeated runs
// never double-file. Without GITHUB_TOKEN/GITHUB_REPOSITORY it reports what it
// would file and exits 0, so local runs and CI dry-runs are safe.
//
// GOVERNANCE.md previously claimed a `stale-bot` did this; no such automation
// existed. This script is that automation.
import fs from 'node:fs/promises';
import chalk from 'chalk';

const DEFAULT_LIMIT = 10;
// `needs-review` already exists in this repository. Labels that do not exist
// are rejected by the issues API, so the label set is configurable rather than
// hardcoded to something a fresh clone may not have.
const DEFAULT_LABELS = ['needs-review'];

export function readStaleReport(report) {
  const entries = Array.isArray(report?.stale_entries) ? report.stale_entries : [];
  return {
    generatedAt: report?.generated_at ?? null,
    thresholdDays: report?.threshold_days ?? null,
    entries: entries.filter((entry) => entry && typeof entry === 'object' && entry.path)
  };
}

export function staleIssueTitle(entry) {
  return `[STALE CONTENT] ${entry.path}`.slice(0, 240);
}

export function staleIssueBody(entry, report) {
  return [
    'Automated freshness check found an entry past its review threshold.',
    '',
    `Entry: \`${entry.id ?? 'unknown'}\` (${entry.type ?? 'unknown type'})`,
    `Path: \`${entry.path}\``,
    `Last reviewed / added: ${entry.last_reviewed ?? 'unknown'}`,
    `Age: ${entry.age_days ?? 'unknown'} days (threshold: ${report.thresholdDays ?? 'unknown'})`,
    '',
    'Action: re-verify the entry against its primary sources, then update `last_reviewed`',
    'and `enrichment_status`. If the entry is obsolete, follow the deprecation policy in',
    '`GOVERNANCE.md` (set `status: deprecated`, add a notice and a reason, link alternatives).',
    '',
    `Report generated: ${report.generatedAt ?? 'unknown'}`,
    '',
    '<!-- Do not edit the issue title; automation skips issues that already exist. -->'
  ].join('\n');
}

/**
 * Decide which issues to open. Pure so it can be tested without network access.
 *
 * @returns {{toCreate: Array<{title: string, body: string}>, skippedDuplicate: number, skippedLimit: number}}
 */
export function planStaleIssues(report, { existingTitles = new Set(), limit = DEFAULT_LIMIT, labels = DEFAULT_LABELS } = {}) {
  const parsed = readStaleReport(report);
  const seen = new Set();
  const toCreate = [];
  let skippedDuplicate = 0;
  let skippedLimit = 0;

  for (const entry of parsed.entries) {
    if (toCreate.length >= limit) { skippedLimit += 1; continue; }
    const title = staleIssueTitle(entry);
    if (existingTitles.has(title) || seen.has(title)) { skippedDuplicate += 1; continue; }
    seen.add(title);
    toCreate.push({ title, body: staleIssueBody(entry, parsed), labels });
  }

  return { toCreate, skippedDuplicate, skippedLimit, total: parsed.entries.length };
}

async function gh(token, path, options = {}) {
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

async function main() {
  const reportPath = process.argv.find((a) => a.startsWith('--report='))?.split('=')[1] ?? 'data/stale-report.json';
  const limit = Number(process.env.STALE_ENTRY_ISSUE_LIMIT ?? DEFAULT_LIMIT);
  const labels = (process.env.STALE_ISSUE_LABELS ?? DEFAULT_LABELS.join(',')).split(',').map((l) => l.trim()).filter(Boolean);

  let raw = null;
  try { raw = JSON.parse(await fs.readFile(reportPath, 'utf8')); } catch {}
  if (!raw) {
    console.log(chalk.yellow(`No stale report at ${reportPath}; run \`pnpm run check:stale\` first. Nothing to file.`));
    return;
  }

  const parsed = readStaleReport(raw);
  if (!parsed.entries.length) {
    console.log(chalk.green('No stale entries to file.'));
    return;
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  if (!token || !repo) {
    console.log(chalk.yellow(`No GitHub token/repository available. Would file up to ${Math.min(limit, parsed.entries.length)} of ${parsed.entries.length} stale-entry issue(s).`));
    return;
  }

  const [owner, name] = repo.split('/');
  const existing = await gh(token, `/repos/${owner}/${name}/issues?state=open&labels=${encodeURIComponent(labels.join(','))}&per_page=100`);
  const existingTitles = new Set((Array.isArray(existing) ? existing : []).map((issue) => issue.title));

  const plan = planStaleIssues(raw, { existingTitles, limit, labels });
  let created = 0;
  for (const issue of plan.toCreate) {
    await gh(token, `/repos/${owner}/${name}/issues`, { method: 'POST', body: JSON.stringify(issue) });
    created += 1;
    // Brief sleep to avoid hammering the GitHub API.
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  console.log(chalk.green(
    `Created ${created} stale-content issue(s) from ${plan.total} stale entr${plan.total === 1 ? 'y' : 'ies'}. ` +
    `Skipped: ${plan.skippedDuplicate} duplicates, ${plan.skippedLimit} over the limit of ${limit}.`
  ));
}

// Only run when invoked directly, so tests can import the pure helpers without
// touching the network or the filesystem.
const invokedDirectly = process.argv[1] && process.argv[1].endsWith('create-stale-issues.js');
if (invokedDirectly) {
  await main();
}

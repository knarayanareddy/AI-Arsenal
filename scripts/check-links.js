#!/usr/bin/env node
import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import chalk from 'chalk';
import { getMarkdownFiles, readMarkdown } from './utils/frontmatter.js';
import { extractUrls } from './utils/markdown.js';

const args = new Set(process.argv.slice(2));
const changedOnly = args.has('--changed-only');
const writeReport = !args.has('--no-report');
const concurrency = Number(process.env.LINK_CHECK_CONCURRENCY ?? 8);
const timeoutMs = Number(process.env.LINK_CHECK_TIMEOUT_MS ?? 15000);
const ignoredPatterns = (process.env.LINK_CHECK_IGNORE ?? '').split(',').filter(Boolean).map((s) => new RegExp(s));

async function filesToCheck() {
  if (!changedOnly) return (await getMarkdownFiles('**/*.md')).filter((f) => !f.startsWith('templates/'));
  try {
    const output = execFileSync('git', ['diff', '--name-only', 'origin/main...HEAD'], { encoding: 'utf8' });
    return output.split(/\r?\n/).filter((f) => f.endsWith('.md') && !f.startsWith('templates/'));
  } catch {
    try {
      const output = execFileSync('git', ['diff', '--name-only', 'HEAD~1...HEAD'], { encoding: 'utf8' });
      return output.split(/\r?\n/).filter((f) => f.endsWith('.md') && !f.startsWith('templates/'));
    } catch { return []; }
  }
}

function shouldIgnore(url) {
  if (!url.startsWith('http')) return true;
  if (url.includes('localhost') || url.includes('127.0.0.1')) return true;
  // The generated data-release branch may not exist until the first scheduled/manual publish.
  if (url.includes('raw.githubusercontent.com') && url.includes('/data-release')) return true;
  return ignoredPatterns.some((pattern) => pattern.test(url));
}

async function checkUrl(url) {
  if (shouldIgnore(url)) return { url, ok: true, ignored: true };
  for (const method of ['HEAD', 'GET']) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, { method, redirect: 'follow', signal: controller.signal, headers: { 'User-Agent': 'AI-Arsenal-Link-Checker/1.0 (+https://github.com/knarayanareddy/AI-Arsenal)' } });
      clearTimeout(timeout);
      if (response.status < 400 || [401, 403, 429].includes(response.status)) return { url, ok: true, status: response.status };
      if (![405, 501].includes(response.status) && method === 'GET') return { url, ok: false, status: response.status };
    } catch (error) {
      clearTimeout(timeout);
      if (method === 'GET') return { url, ok: false, error: error.message };
    }
  }
  return { url, ok: false, error: 'unknown link check failure' };
}

async function pool(items, worker) {
  const results = [];
  let index = 0;
  async function run() {
    while (index < items.length) {
      const current = items[index++];
      results.push(await worker(current));
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, run));
  return results;
}

const files = await filesToCheck();
const urlToFiles = new Map();
for (const file of files) {
  const { raw } = await readMarkdown(file);
  for (const url of extractUrls(raw)) {
    if (!urlToFiles.has(url)) urlToFiles.set(url, []);
    urlToFiles.get(url).push(file);
  }
}

const results = await pool([...urlToFiles.keys()], checkUrl);
const broken = results.filter((r) => !r.ok).map((r) => ({ ...r, files: urlToFiles.get(r.url) }));
const report = { generated_at: new Date().toISOString(), mode: changedOnly ? 'changed-only' : 'all', files_checked: files.length, urls_checked: results.length, broken_links: broken };
if (writeReport) {
  await fs.mkdir('data', { recursive: true });
  await fs.writeFile('data/link-check-report.json', `${JSON.stringify(report, null, 2)}\n`);
}

if (broken.length) {
  console.error(chalk.red(`Link check failed with ${broken.length} broken URL(s):`));
  for (const item of broken) console.error(chalk.red(`- ${item.url} (${item.status ?? item.error}) in ${item.files.join(', ')}`));
  process.exit(1);
}
console.log(chalk.green(`Link check passed. Checked ${results.length} unique URL(s) in ${files.length} file(s).`));

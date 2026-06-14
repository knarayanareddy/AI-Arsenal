#!/usr/bin/env node
import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import chalk from 'chalk';
import { getMarkdownFiles, readMarkdown } from './utils/frontmatter.js';
import { extractUrls } from './utils/markdown.js';
import { parseSafeUrl, assertPublicHostname, hostCallAllowed, domainAllowed, resetHostCallCounts } from './utils/network-guard.js';

const args = new Set(process.argv.slice(2));
const changedOnly = args.has('--changed-only');
const writeReport = !args.has('--no-report');
const concurrency = Number(process.env.LINK_CHECK_CONCURRENCY ?? 8);
const timeoutMs = Number(process.env.LINK_CHECK_TIMEOUT_MS ?? 15000);
const maxUrls = Number(process.env.LINK_CHECK_MAX_URLS ?? 500);
const maxPerHost = Number(process.env.LINK_CHECK_MAX_URLS_PER_HOST ?? 10);
const allowList = (process.env.LINK_CHECK_ALLOW_DOMAINS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
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

function shouldIgnoreByPattern(url) {
  return ignoredPatterns.some((pattern) => pattern.test(url));
}

async function checkUrl(rawUrl) {
  // Hard limits before any network activity.
  if (rawUrl.length > 2048) return { url: rawUrl, ok: false, error: 'url-too-long' };
  if (shouldIgnoreByPattern(rawUrl)) return { url: rawUrl, ok: true, ignored: true };

  const parsed = parseSafeUrl(rawUrl);
  if (!parsed.ok) return { url: rawUrl, ok: false, error: parsed.reason };
  const { url } = parsed;

  // The generated data-release branch may not exist until first publish.
  if (url.hostname === 'raw.githubusercontent.com' && url.pathname.includes('/data-release/')) {
    return { url: rawUrl, ok: true, ignored: true };
  }

  if (!domainAllowed(url.hostname, allowList)) return { url: rawUrl, ok: false, error: 'domain-not-allowlisted' };
  if (!hostCallAllowed(url.hostname, maxPerHost)) return { url: rawUrl, ok: false, error: 'host-rate-limited' };

  // Resolve hostname → IP. Reject if any record is private/loopback/link-local.
  const dns = await assertPublicHostname(url.hostname);
  if (!dns.ok) return { url: rawUrl, ok: false, error: dns.reason };

  for (const method of ['HEAD', 'GET']) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        method,
        redirect: 'manual', // refuse to follow redirects; we'll re-check.
        signal: controller.signal,
        headers: { 'User-Agent': 'AI-Arsenal-Link-Checker/1.0 (+https://github.com/knarayanareddy/AI-Arsenal)' }
      });
      clearTimeout(timeout);

      // 3xx redirect: re-validate the Location header against SSRF rules.
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location');
        if (!location) return { url: rawUrl, ok: false, status: response.status, error: 'redirect-without-location' };
        const recheck = await checkUrl(location);
        if (!recheck.ok) return { url: rawUrl, ok: false, status: response.status, error: `redirect-unsafe:${recheck.error}` };
        return { url: rawUrl, ok: true, status: response.status };
      }
      if (response.status < 400 || [401, 403, 429].includes(response.status)) return { url: rawUrl, ok: true, status: response.status };
      if (![405, 501].includes(response.status) && method === 'GET') return { url: rawUrl, ok: false, status: response.status };
    } catch (error) {
      clearTimeout(timeout);
      if (method === 'GET') return { url: rawUrl, ok: false, error: error.message };
    }
  }
  return { url: rawUrl, ok: false, error: 'unknown link check failure' };
}

async function pool(items, worker) {
  const results = [];
  let index = 0;
  async function run() {
    while (index < items.length) {
      const current = index++;
      results.push(await worker(items[current]));
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

const allUrls = [...urlToFiles.keys()];
if (allUrls.length > maxUrls) {
  console.error(chalk.red(`Refusing to check ${allUrls.length} URLs (> ${maxUrls}). Possible amplification. Reduce URL count or set LINK_CHECK_MAX_URLS.`));
  process.exit(1);
}

resetHostCallCounts();
const results = await pool(allUrls, checkUrl);
const broken = results.filter((r) => !r.ok).map((r) => ({ ...r, files: urlToFiles.get(r.url) }));
const report = {
  generated_at: new Date().toISOString(),
  mode: changedOnly ? 'changed-only' : 'all',
  files_checked: files.length,
  urls_checked: results.length,
  max_urls_per_host: maxPerHost,
  broken_links: broken
};
if (writeReport) {
  await fs.mkdir('data', { recursive: true });
  await fs.writeFile('data/link-check-report.json', `${JSON.stringify(report, null, 2)}\n`);
}

if (broken.length) {
  console.error(chalk.red(`Link check failed with ${broken.length} broken URL(s):`));
  for (const item of broken.slice(0, 50)) console.error(chalk.red(`- ${item.url} (${item.status ?? item.error}) in ${item.files.join(', ')}`));
  process.exit(1);
}
console.log(chalk.green(`Link check passed. Checked ${results.length} unique URL(s) in ${files.length} file(s).`));

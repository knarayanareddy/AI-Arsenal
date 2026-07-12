#!/usr/bin/env node
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import chalk from 'chalk';
import { getMarkdownFiles, readMarkdown } from './utils/frontmatter.js';
import { extractUrls, stripNonRenderedMarkdown } from './utils/markdown.js';
import { parseSafeUrl, resolveRedirectUrl, assertPublicHostname, pinnedLookup, requestStatus, domainAllowed, hostCallAllowed, resetHostCallCounts } from './utils/network-guard.js';
import { categorizeHttpStatus, classifyNetError, isTransientError, RATE_LIMIT_DOMAINS } from './utils/link-status.js';

const args = new Set(process.argv.slice(2));
const changedOnly = args.has('--changed-only');
const writeReport = !args.has('--no-report');
const concurrency = Number(process.env.LINK_CHECK_CONCURRENCY ?? 8);
const timeoutMs = Number(process.env.LINK_CHECK_TIMEOUT_MS ?? 15000);
const maxUrls = Number(process.env.LINK_CHECK_MAX_URLS ?? 2000);
const maxPerHost = Number(process.env.LINK_CHECK_MAX_URLS_PER_HOST ?? 10);
const retries = Number(process.env.LINK_CHECK_RETRIES ?? 2);
const backoffMs = Number(process.env.LINK_CHECK_BACKOFF_MS ?? 400);
// Per-host budget is raised for known rate-limited hosts so we still check a
// meaningful sample of them without amplification, while remaining bounded.
const rateLimitDomains = (process.env.LINK_CHECK_RATE_LIMIT_DOMAINS ?? RATE_LIMIT_DOMAINS.join(',')).split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
const rateLimitCap = Number(process.env.LINK_CHECK_RATE_LIMIT_CAP ?? 40);
const allowList = (process.env.LINK_CHECK_ALLOW_DOMAINS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
const ignoredPatterns = (process.env.LINK_CHECK_IGNORE ?? '').split(',').filter(Boolean).map((s) => new RegExp(s));

const USER_AGENT = 'AI-Arsenal-Link-Checker/1.0 (+https://github.com/knarayanareddy/AI-Arsenal)';

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

async function filesToCheck() {
  if (!changedOnly) return (await getMarkdownFiles('**/*.md')).filter((f) => !f.startsWith('templates/') && !f.startsWith('tests/fixtures/'));
  try {
    const output = execFileSync('git', ['diff', '--name-only', 'origin/main...HEAD'], { encoding: 'utf8' });
    return output.split(/\r?\n/).filter((f) => f.endsWith('.md') && !f.startsWith('templates/') && !f.startsWith('tests/fixtures/') && existsSync(f));
  } catch {
    try {
      const output = execFileSync('git', ['diff', '--name-only', 'HEAD~1...HEAD'], { encoding: 'utf8' });
      return output.split(/\r?\n/).filter((f) => f.endsWith('.md') && !f.startsWith('templates/') && !f.startsWith('tests/fixtures/') && existsSync(f));
    } catch { return []; }
  }
}

function shouldIgnoreByPattern(url) {
  return ignoredPatterns.some((pattern) => pattern.test(url));
}

// URLs inside HTML comments are non-rendered template text (e.g. the
// contributor template in CONTRIBUTORS.md) and must not be link-checked.
function stripHtmlComments(markdown) {
  // Re-apply until stable so nested/overlapping comment markers cannot
  // survive a single pass.
  let previous;
  let current = markdown;
  do {
    previous = current;
    current = current.replace(/<!--[\s\S]*?-->/g, '');
  } while (current !== previous);
  return current;
}

// The socket is pinned to `lookup` (the addresses assertPublicHostname already
// approved), so DNS is never re-resolved at connect time and redirects/retries
// cannot be rebound to a private IP. Redirects are returned, never followed.
function fetchOnce(url, method, lookup) {
  return requestStatus(url, {
    method,
    lookup,
    timeoutMs,
    headers: { 'User-Agent': USER_AGENT },
  });
}

async function fetchWithRetry(url, method, lookup) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fetchOnce(url, method, lookup);
    } catch (error) {
      lastErr = error;
      if (attempt < retries && isTransientError(error)) {
        await sleep(backoffMs * (attempt + 1));
        continue;
      }
      throw error;
    }
  }
  throw lastErr;
}

async function checkUrl(rawUrl, redirectDepth = 0) {
  // Hard limits / pre-flight checks — these are always definitive.
  if (rawUrl.length > 2048) return { url: rawUrl, ok: false, error: 'url-too-long', soft: false };
  if (shouldIgnoreByPattern(rawUrl)) return { url: rawUrl, ok: true, ignored: true };

  const parsed = parseSafeUrl(rawUrl);
  if (!parsed.ok) return { url: rawUrl, ok: false, error: parsed.reason, soft: false };
  const { url } = parsed;

  // The generated data-release branch may not exist until first publish.
  if (url.hostname === 'raw.githubusercontent.com' && url.pathname.includes('/data-release/')) {
    return { url: rawUrl, ok: true, ignored: true };
  }

  if (!domainAllowed(url.hostname, allowList)) return { url: rawUrl, ok: false, error: 'domain-not-allowlisted', soft: false };
  // Per-host amplification cap. Exceeding it on a known rate-limited host is
  // expected and reported as a SOFT warning, never a broken link.
  const perHostCap = rateLimitDomains.includes(url.hostname.toLowerCase()) ? rateLimitCap : maxPerHost;
  if (!hostCallAllowed(url.hostname, perHostCap)) {
    return { url: rawUrl, ok: false, error: 'host-rate-limited', soft: true };
  }

  // Resolve hostname -> IP. Reject private/loopback/link-local (SSRF guard).
  const dns = await assertPublicHostname(url.hostname);
  if (!dns.ok) return { url: rawUrl, ok: false, error: dns.reason, soft: false };
  // Bind every subsequent connection (incl. retries) to exactly those approved
  // addresses, so a rebinding server cannot swap in a private IP after the check.
  const lookup = pinnedLookup(dns.addresses);

  for (const method of ['HEAD', 'GET']) {
    let response;
    try {
      response = await fetchWithRetry(url, method, lookup);
    } catch (error) {
      if (method === 'GET') {
        const c = classifyNetError(error);
        return { url: rawUrl, ok: false, error: c.reason, soft: c.soft };
      }
      // HEAD failed (often method-not-allowed / transient); fall through to GET.
      continue;
    }

    // 3xx redirect: re-validate the Location header against SSRF rules.
    if (response.status >= 300 && response.status < 400) {
      const location = response.location;
      if (!location) return { url: rawUrl, ok: false, status: response.status, error: 'redirect-without-location', soft: false };
      if (redirectDepth >= 5) return { url: rawUrl, ok: false, status: response.status, error: 'redirect-depth-exceeded', soft: false };
      const redirectUrl = resolveRedirectUrl(location, url);
      if (!redirectUrl) return { url: rawUrl, ok: false, status: response.status, error: 'redirect-invalid-location', soft: false };
      const recheck = await checkUrl(redirectUrl, redirectDepth + 1);
      if (!recheck.ok) {
        return {
          url: rawUrl,
          ok: false,
          status: response.status,
          error: `redirect-unsafe:${recheck.error}`,
          soft: recheck.soft === true
        };
      }
      return { url: rawUrl, ok: true, status: response.status };
    }

    const category = categorizeHttpStatus(response.status);
    if (category === 'ok') return { url: rawUrl, ok: true, status: response.status };
    if (category === 'broken') return { url: rawUrl, ok: false, status: response.status, error: `http-${response.status}`, soft: false };
    // 'soft' — non-404/410 >= 400 (5xx, 405, etc.) on GET: transient warning.
    if (method === 'GET') return { url: rawUrl, ok: false, status: response.status, error: `http-${response.status}`, soft: true };
    // On HEAD with an unexpected status, fall through to GET (HEAD may be blocked).
  }
  return { url: rawUrl, ok: false, error: 'unknown link check failure', soft: true };
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
  for (const url of extractUrls(stripNonRenderedMarkdown(stripHtmlComments(raw)))) {
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
// Hard failures (confirmed dead / SSRF / DNS miss) fail CI and open issues.
const broken = results.filter((r) => !r.ok && r.soft !== true);
// Soft warnings (rate-limited, transient, non-404-410) are reported, not failed.
const warnings = results.filter((r) => !r.ok && r.soft === true);
const report = {
  generated_at: new Date().toISOString(),
  mode: changedOnly ? 'changed-only' : 'all',
  files_checked: files.length,
  urls_checked: results.length,
  max_urls_per_host: maxPerHost,
  broken_links: broken.map((r) => ({ ...r, files: urlToFiles.get(r.url) })),
  warning_links: warnings.map((r) => ({ ...r, files: urlToFiles.get(r.url) })),
  summary: {
    ok: results.filter((r) => r.ok).length,
    ignored: results.filter((r) => r.ignored).length,
    broken: broken.length,
    warnings: warnings.length,
  },
};
if (writeReport) {
  await fs.mkdir('data', { recursive: true });
  await fs.writeFile('data/link-check-report.json', `${JSON.stringify(report, null, 2)}\n`);
}

if (broken.length) {
  console.error(chalk.red(`Link check failed with ${broken.length} confirmed broken URL(s):`));
  for (const item of report.broken_links.slice(0, 50)) console.error(chalk.red(`- ${item.url} (${item.status ?? item.error}) in ${(item.files ?? []).join(', ')}`));
  process.exit(1);
}
if (warnings.length) {
  console.warn(chalk.yellow(`Link check passed with ${warnings.length} soft warning(s) (rate-limited / transient / non-404-410). These do NOT fail CI:`));
  for (const item of warnings.slice(0, 30)) console.warn(chalk.yellow(`- ${item.url} (${item.status ?? item.error})`));
}
console.log(chalk.green(`Link check passed. Checked ${results.length} unique URL(s) in ${files.length} file(s); ${broken.length} broken, ${warnings.length} soft warning(s).`));

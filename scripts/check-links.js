#!/usr/bin/env node
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import chalk from 'chalk';
import { getMarkdownFiles, readMarkdown } from './utils/frontmatter.js';
import { getChangedFiles } from './utils/changed-files.js';
import { extractUrls, stripNonRenderedMarkdown } from './utils/markdown.js';
import { parseSafeUrl, resolveRedirectUrl, assertPublicHostname, pinnedLookup, requestStatus, domainAllowed, hostCallAllowed, resetHostCallCounts } from './utils/network-guard.js';
import { categorizeHttpStatus, classifyNetError, isTransientError, warningCategory, RATE_LIMIT_DOMAINS } from './utils/link-status.js';

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

function keepMarkdown(f) {
  return f.endsWith('.md') && !f.startsWith('templates/') && !f.startsWith('tests/fixtures/');
}

async function filesToCheck() {
  if (!changedOnly) return (await getMarkdownFiles('**/*.md')).filter(keepMarkdown);
  // Shared changed-file detection: fails closed in CI (throws) rather than
  // silently returning no files, so a broken base ref can't skip link checks.
  return getChangedFiles().filter((f) => keepMarkdown(f) && existsSync(f));
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

// URL-shaped strings that are illustrative rather than linkable.
//
// The SSRF guard is correct for a *fetch target*: never resolve or connect to
// localhost, a bare hostname, or a private IP. But these strings appear in
// Architecture and Getting Started sections as documentation — "the config key
// must point at http://localhost:3000" is a true and useful statement about how
// a tool is run, and failing CI on it is a false positive that pushes authors
// to delete accurate documentation.
//
// So they are still rejected by the guard (never fetched), but they are reported
// as informational rather than as broken links. `LINK_CHECK_STRICT_URLS=1`
// restores the old hard-fail behaviour for anyone auditing a docs tree.
const STRICT_URLS = /^(1|true|yes)$/i.test(process.env.LINK_CHECK_STRICT_URLS ?? '');

// Reasons that mean "this string is a placeholder in prose", not "this site is
// broken". Anything a human would fix by rewording the sentence.
const PLACEHOLDER_REASONS = new Set([
  'invalid-url',
  'bare-hostname',
  'no-host',
  'localhost-hostname',
  'protocol-'
]);
const isPlaceholderReason = (reason) =>
  PLACEHOLDER_REASONS.has(reason) || reason.startsWith('private-ip-');

// A DNS name that does not resolve can be a placeholder too. `http://target` and
// `http://localhost` are both bare labels used as stand-ins in documentation, and
// the trailing punctuation the markdown extractor leaves behind ("http://target.")
// makes them look like real hostnames. These are only ever DNS misses, never
// confirmed-dead pages, so they belong with the placeholders rather than failing
// CI on a sentence that is factually correct about how a tool is configured.
const isPlaceholderDnsReason = (reason) =>
  reason === 'localhost-hostname' || reason.startsWith('dns-');

async function checkUrl(rawUrl, redirectDepth = 0) {
  // Hard limits / pre-flight checks — these are always definitive.
  if (rawUrl.length > 2048) return { url: rawUrl, ok: false, error: 'url-too-long', soft: false };
  if (shouldIgnoreByPattern(rawUrl)) return { url: rawUrl, ok: true, ignored: true };

  const parsed = parseSafeUrl(rawUrl);
  if (!parsed.ok) {
    // Never fetch these; just decide whether they should fail CI.
    const soft = !STRICT_URLS && isPlaceholderReason(parsed.reason);
    return { url: rawUrl, ok: false, error: parsed.reason, soft, placeholder: soft };
  }
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
  if (!dns.ok) {
    // A private/loopback target in prose is documentation, not a dead site. Still
    // never fetched; reported softly unless STRICT_URLS is set.
    const soft = !STRICT_URLS && (isPlaceholderReason(dns.reason) || isPlaceholderDnsReason(dns.reason));
    return { url: rawUrl, ok: false, error: dns.reason, soft, placeholder: soft };
  }
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
    // A 404/410 from HEAD is not conclusive: a number of documentation hosts
    // (llamaindex.ai, for one) answer HEAD with 404 while serving GET normally.
    // Returning here would report a live page as dead, so fall through to GET
    // and only treat the status as broken if GET agrees.
    if (category === 'broken') {
      if (method === 'GET') return { url: rawUrl, ok: false, status: response.status, error: `http-${response.status}`, soft: false };
      continue;
    }
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
// Over-cap is a sampling decision, not a hard stop. The cap exists to bound
// network amplification (SSRF-hardened fetches against third-party hosts), and
// that bound is still honoured: we check a deterministic sample and report the
// remainder as a soft warning. Refusing to run at all made every large
// catalog-wide PR unmergeable and indistinguishable from a genuinely broken
// one, which is the exact case the cap was meant to protect against.
//
// The sample is sorted so it is stable across runs — a URL that is skipped on
// one run is not newly checked on the next, so the report does not flap.
let capped = false;
let urlsToCheck = allUrls;
if (allUrls.length > maxUrls) {
  capped = true;
  urlsToCheck = [...allUrls].sort().slice(0, maxUrls);
  console.warn(chalk.yellow(
    `Link cap reached: ${allUrls.length} unique URLs exceeds LINK_CHECK_MAX_URLS=${maxUrls}. `
    + `Checking a deterministic sample of ${maxUrls}; ${allUrls.length - maxUrls} not contacted. `
    + `Raise LINK_CHECK_MAX_URLS to widen coverage. This does NOT fail CI.`
  ));
}

resetHostCallCounts();
const results = await pool(urlsToCheck, checkUrl);
// Hard failures (confirmed dead / SSRF / DNS miss) fail CI and open issues.
const broken = results.filter((r) => !r.ok && r.soft !== true);
// Soft warnings (rate-limited, transient, non-404-410) are reported, not failed.
const warnings = results.filter((r) => !r.ok && r.soft === true).map((r) => ({ ...r, category: warningCategory(r) }));
const warningsByType = { host_cap: 0, http_soft: 0, redirect: 0, transient: 0, placeholder: 0 };
for (const w of warnings) warningsByType[w.category] += 1;
// Effective coverage: host-cap skips and prose placeholders are NOT contacted;
// everything else that wasn't ignored had a network request attempted.
const ignoredCount = results.filter((r) => r.ignored).length;
const contacted = results.length - ignoredCount - warningsByType.host_cap - warningsByType.placeholder;
const report = {
  generated_at: new Date().toISOString(),
  mode: changedOnly ? 'changed-only' : 'all',
  files_checked: files.length,
  urls_found: allUrls.length,
  urls_checked: results.length,
  max_urls: maxUrls,
  max_urls_per_host: maxPerHost,
  capped,
  urls_skipped_by_cap: allUrls.length - urlsToCheck.length,
  broken_links: broken.map((r) => ({ ...r, files: urlToFiles.get(r.url) })),
  warning_links: warnings.map((r) => ({ ...r, files: urlToFiles.get(r.url) })),
  summary: {
    ok: results.filter((r) => r.ok).length,
    ignored: ignoredCount,
    broken: broken.length,
    warnings: warnings.length,
    // Distinguish effective network coverage rather than one opaque count.
    contacted,
    skipped_host_cap: warningsByType.host_cap,
    skipped_url_cap: allUrls.length - urlsToCheck.length,
    warnings_by_type: warningsByType,
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
  const b = warningsByType;
  console.warn(chalk.yellow(`Link check passed with ${warnings.length} soft warning(s) — host-cap skipped: ${b.host_cap}, transient: ${b.transient}, http-soft: ${b.http_soft}, redirect: ${b.redirect}, placeholder-in-prose: ${b.placeholder}. These do NOT fail CI:`));
  for (const item of warnings.slice(0, 30)) console.warn(chalk.yellow(`- [${item.category}] ${item.url} (${item.status ?? item.error})`));
}
console.log(chalk.green(`Link check passed. ${contacted} of ${results.length} checked URL(s) contacted in ${files.length} file(s) (${warningsByType.host_cap} skipped by host cap${capped ? `, ${allUrls.length - urlsToCheck.length} of ${allUrls.length} not sampled (URL cap)` : ''}); ${broken.length} broken, ${warnings.length} soft warning(s).`));

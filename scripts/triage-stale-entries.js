#!/usr/bin/env node
// Freshness triage.
//
// data/stale-report.json says WHICH entries are past their review threshold.
// It does not say which ones are worth a reviewer's afternoon. This script
// answers that: for every stale entry that points at a GitHub repository it
// checks the repository itself and sorts the entry into an actionable bucket,
// so the backlog can be worked in severity order instead of alphabetically.
//
// Buckets, most severe first:
//   error     — the API call did not complete. Never silently folded into
//               "active": an unchecked entry must not look like a clean one.
//   deleted   — the repository returns 404. The entry describes something that
//               no longer exists. This is a correctness bug, not a convention.
//   archived  — read-only upstream. The entry must say so before someone
//               adopts it.
//   renamed   — the repository moved or changed owner. The stored URL is a
//               redirect at best; fix the frontmatter.
//   dormant   — still public, no push in --dormancy-days (default 365). Not
//               wrong, but the maintenance claim in the entry needs re-reading.
//   active    — public and pushed recently. Metadata can be re-verified
//               mechanically; the prose still needs a human.
//   no-repo   — no GitHub URL to check (guides, papers, people, tips). These
//               can only be reviewed editorially and are reported separately.
//   generated — a by-cost/by-job/by-stack routing page. It is rebuilt from
//               frontmatter, so its review date is the generator's business and
//               listing it as editorial work would be noise every month.
//
// The script only MEASURES. It never edits content, never bumps last_reviewed,
// and never flips a verdict: that would turn a backlog into a green dashboard
// without anyone having read the entry.
//
// Usage:
//   node scripts/triage-stale-entries.js                 # console summary
//   node scripts/triage-stale-entries.js --json          # machine-readable
//   node scripts/triage-stale-entries.js --out FILE      # markdown worklist
//   node scripts/triage-stale-entries.js --limit 20      # sample
//   node scripts/triage-stale-entries.js --offline       # skip network
//
// Authentication: reads GH_TOKEN or GITHUB_TOKEN (falls back to `gh auth token`
// when available). Unauthenticated runs hit the 60/hour limit almost at once,
// so the script refuses rather than reporting rate limits as findings.

import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import chalk from 'chalk';
import { loadEntries } from './utils/entries.js';

const DORMANCY_DEFAULT = 365;
const CONCURRENCY_DEFAULT = 8;

const args = new Set(process.argv.slice(2));
// Accept both `--out=file` and `--out file`; a flag whose value is missing
// falls back rather than swallowing the next flag.
const argValue = (name, fallback) => {
  const withEquals = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (withEquals) return withEquals.slice(name.length + 3);
  const index = process.argv.indexOf(`--${name}`);
  if (index !== -1 && process.argv[index + 1] && !process.argv[index + 1].startsWith('--')) {
    return process.argv[index + 1];
  }
  return fallback;
};

const LIMIT = Number(argValue('limit', 0)) || 0;
const DORMANCY_DAYS = Number(argValue('dormancy-days', DORMANCY_DEFAULT));
const CONCURRENCY = Number(argValue('concurrency', CONCURRENCY_DEFAULT));
const OFFLINE = args.has('--offline');
const AS_JSON = args.has('--json');
const OUT = argValue('out', null);

// --- pure helpers (exported for tests) -------------------------------------

// Pull "owner/repo" out of a GitHub URL. Accepts a trailing path, query, hash,
// and a trailing ".git". Returns null for anything that is not a repo URL.
const SITE_PATHS = new Set([
  'features', 'pricing', 'about', 'login', 'join', 'apps', 'enterprise', 'site',
  'contact', 'security', 'solutions', 'customer-stories', 'readme', 'blog',
  'orgs', 'search', 'topics', 'sponsors', 'marketplace', 'collections', 'settings',
  'notifications', 'explore', 'trending', 'new', 'codespaces', 'issues', 'pulls'
]);

export function parseRepoSlug(url) {
  if (typeof url !== 'string' || !url) return null;
  const match = url.match(/^https?:\/\/(?:www\.)?github\.com\/([A-Za-z0-9-_.]+)\/([A-Za-z0-9-_.]+)/);
  if (!match) return null;
  const [, owner, rawRepo] = match;
  const repo = rawRepo.replace(/\.git$/, '');
  // github.com/<x>/<y> is also how a lot of site pages look (features/copilot,
  // pricing/enterprise, orgs/acme, search?q=). Those are not repositories, and
  // treating one as a repo produced a false "deleted" finding for
  // github.com/features/copilot.
  if (SITE_PATHS.has(owner.toLowerCase())) return null;
  return `${owner}/${repo}`;
}

// The repository a stale entry points at, preferring the explicit field.
export function repoUrlOf(data = {}) {
  for (const field of ['github_url', 'source_url', 'url']) {
    const slug = parseRepoSlug(data[field]);
    if (slug) return { url: data[field], slug };
  }
  return null;
}

// Classify one entry from the stale report plus (optionally) the API payload.
// `repo` is null when the API was not consulted.
const GENERATED_GUIDE_RE = /^content\/tools\/(?:by-cost|by-job|by-stack)\//;

export function classify(entry, repo) {
  if (repo === undefined) return 'unchecked';
  if (!repo) return GENERATED_GUIDE_RE.test(entry?.path ?? '') ? 'generated' : 'no-repo';
  if (repo.error) return 'error';
  if (repo.missing) return 'deleted';
  if (repo.archived) return 'archived';
  if (repo.renameTo) return 'renamed';
  if (repo.dormant) return 'dormant';
  return 'active';
}

export const SEVERITY_ORDER = ['error', 'deleted', 'archived', 'renamed', 'dormant', 'active', 'no-repo', 'generated', 'unchecked'];

export function severityRank(bucket) {
  const index = SEVERITY_ORDER.indexOf(bucket);
  return index === -1 ? SEVERITY_ORDER.length : index;
}

// Turn raw (entry, repo) pairs into the report shape. Pure: no I/O.
export function buildTriage(rows, { generatedAt = new Date().toISOString(), thresholdDays = null } = {}) {
  const buckets = Object.fromEntries(SEVERITY_ORDER.map((key) => [key, []]));
  for (const row of rows) {
    const bucket = row.bucket ?? classify(row.entry, row.repo);
    const item = {
      id: row.entry.id ?? null,
      type: row.entry.type ?? null,
      path: row.entry.path,
      last_reviewed: row.entry.last_reviewed ?? null,
      age_days: row.entry.age_days ?? null,
      bucket,
      repo: row.reposlug ?? null,
      repo_url: row.repoUrl ?? null,
      suggested_url: row.repo?.htmlUrl ?? null,
      pushed_at: row.repo?.pushedAt ?? null,
      stars: row.repo?.stars ?? null,
      action: ACTION_FOR[bucket]
    };
    (buckets[bucket] ??= []).push(item);
  }
  for (const key of Object.keys(buckets)) {
    buckets[key].sort((a, b) => (b.age_days ?? 0) - (a.age_days ?? 0) || String(a.id).localeCompare(String(b.id)));
  }
  const counts = Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, v.length]));
  return {
    generated_at: generatedAt,
    threshold_days: thresholdDays,
    dormancy_days: DORMANCY_DAYS,
    total: rows.length,
    counts,
    buckets
  };
}

// The committed artefact keeps full records for the buckets someone will act
// on and only ids + counts for the rest. A 500 KB file containing 400 rows
// nobody will edit is churn in every monthly PR; the ids are enough to look
// one up when its turn comes.
const DETAILED_BUCKETS = ['error', 'deleted', 'archived', 'renamed', 'dormant'];

export function toArtifact(triage) {
  const artifact = {
    generated_at: triage.generated_at,
    threshold_days: triage.threshold_days,
    dormancy_days: triage.dormancy_days,
    total: triage.total,
    counts: triage.counts,
    buckets: {}
  };
  for (const key of SEVERITY_ORDER) {
    const items = triage.buckets[key] ?? [];
    if (!items.length) continue;
    artifact.buckets[key] = DETAILED_BUCKETS.includes(key)
      ? items
      : { count: items.length, ids: items.map((item) => item.id).sort() };
  }
  return artifact;
}

const ACTION_FOR = {
  error: 'The GitHub API call failed for this entry. Re-run before trusting the triage.',
  deleted: 'Remove the entry, or replace it with whatever the project became. A 404 is a correctness bug.',
  archived: 'State that upstream is archived in the entry, and reconsider the verdict before anyone adopts it.',
  renamed: 'Rewrite github_url/source_url/url to the current location; the stored link only resolves by redirect.',
  dormant: 'Re-read the maintenance claims. The project is public but has not been pushed in a year.',
  active: 'Re-verify metadata (stars, licence, release) and read the prose against the current README.',
  'no-repo': 'Editorial review only: no repository to check, so a human has to judge whether it is still right.',
  generated: 'Nothing to review: the routing table is regenerated from tool frontmatter.',
  unchecked: 'Not checked in this run (--offline or --limit).'
};

// --- network ---------------------------------------------------------------

function token() {
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN;
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() || null;
  } catch {
    return null;
  }
}

async function fetchRepo(slug, auth, { now = Date.now() } = {}) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'AI-Arsenal-Freshness-Triage/1.0' };
  if (auth) headers.Authorization = `Bearer ${auth}`;
  const response = await fetch(`https://api.github.com/repos/${slug}`, { headers });
  if (response.status === 404) return { missing: true };
  if (response.status === 403 || response.status === 429) {
    throw new Error(`GitHub rate limit or abuse detection hit while checking ${slug} (HTTP ${response.status})`);
  }
  if (!response.ok) return { error: `http-${response.status}` };
  const body = await response.json();
  const canonical = String(body.full_name ?? '');
  const renameTo = canonical.toLowerCase() === slug.toLowerCase() ? null : canonical;
  const pushedAt = body.pushed_at ?? null;
  const dormant = pushedAt ? now - Date.parse(pushedAt) > DORMANCY_DAYS * 86400000 : true;
  return {
    archived: Boolean(body.archived),
    renameTo,
    dormant,
    pushedAt,
    stars: body.stargazers_count ?? null,
    htmlUrl: body.html_url ?? null,
    license: body.license?.spdx_id ?? null
  };
}

async function pool(items, worker, concurrency) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, run));
  return results;
}

// --- main ------------------------------------------------------------------

// A monthly worklist that diffs only on its own timestamp trains reviewers to
// ignore the diff. Keep the previous file when nothing but the stamp moved,
// the same rule the data generators follow via writeJson.
async function writeReport(file, content) {
  const stampOf = (text) => text.replace(/^Generated .*$/m, 'Generated <stamp>');
  try {
    const previous = await fs.readFile(file, 'utf8');
    // Leave the file alone entirely when only the stamp moved.
    if (stampOf(previous) === stampOf(content)) return;
  } catch {
    // No previous worklist: write the fresh one.
  }
  await fs.writeFile(file, content);
}

async function main() {
  let report;
  try {
    report = JSON.parse(await fs.readFile('data/stale-report.json', 'utf8'));
  } catch {
    console.error(chalk.red('No data/stale-report.json. Run `pnpm run check:stale` first.'));
    process.exit(1);
  }

  let entries = Array.isArray(report.stale_entries) ? report.stale_entries : [];
  if (LIMIT) entries = entries.slice(0, LIMIT);

  // The stale report carries id/path/dates only; the repository URL lives in
  // the entry frontmatter, so join the two by path.
  const byPath = new Map((await loadEntries({ includeContent: false })).map((e) => [e.file, e.data]));

  const withRepo = [];
  const rows = [];
  for (const entry of entries) {
    const found = repoUrlOf(byPath.get(entry.path) ?? {});
    if (found) withRepo.push({ entry, ...found });
    else rows.push({ entry, repo: null }); // buildTriage decides no-repo vs generated
  }

  if (OFFLINE) {
    for (const item of withRepo) rows.push({ entry: item.entry, repo: undefined, bucket: 'unchecked' });
  } else {
    const auth = token();
    if (!auth) {
      console.error(chalk.red('No GitHub token found (GH_TOKEN, GITHUB_TOKEN, or `gh auth token`).'));
      console.error(chalk.yellow('Unauthenticated triage would exhaust the 60/hour limit and misreport it as staleness.'));
      process.exit(1);
    }
    let done = 0;
    const checked = await pool(withRepo, async (item) => {
      let repo;
      try {
        repo = await fetchRepo(item.slug, auth);
      } catch (error) {
        if (/rate limit/i.test(error.message)) throw error;
        repo = { error: error.message };
      }
      done += 1;
      if (process.stderr.isTTY && done % 25 === 0) process.stderr.write(`\rchecked ${done}/${withRepo.length}`);
      return { entry: item.entry, repo, reposlug: item.slug, repoUrl: item.url };
    }, CONCURRENCY);
    if (process.stderr.isTTY) process.stderr.write('\r');
    rows.push(...checked);
  }

  const triage = buildTriage(rows, { thresholdDays: report.threshold_days ?? null });
  await fs.mkdir('data', { recursive: true });
  await fs.writeFile('data/freshness-triage.json', `${JSON.stringify(toArtifact(triage), null, 2)}\n`);

  if (OUT) await writeReport(OUT, asMarkdown(triage));

  if (AS_JSON) {
    console.log(JSON.stringify(triage, null, 2));
    return;
  }

  console.log(chalk.bold(`Freshness triage: ${triage.total} stale entries (${report.threshold_days ?? 90}-day threshold)`));
  for (const key of SEVERITY_ORDER) {
    const count = triage.counts[key] ?? 0;
    if (!count) continue;
    const paint = key === 'deleted' || key === 'archived' ? chalk.red : key === 'renamed' ? chalk.yellow : chalk.gray;
    console.log(paint(`  ${key.padEnd(9)} ${String(count).padStart(5)}`));
  }
  const errors = triage.counts.error ?? 0;
  if (errors) {
    console.error(chalk.red(`${errors} entr${errors === 1 ? 'y' : 'ies'} could not be checked (API error or rate limit). The triage is incomplete.`));
  }
  const actionable = ['deleted', 'archived', 'renamed'].reduce((sum, key) => sum + (triage.counts[key] ?? 0), 0);
  console.log(actionable
    ? chalk.yellow(`\n${actionable} entries describe a repository that is gone, archived or moved. Those are correctness bugs, not freshness nitpicks.`)
    : chalk.green('\nNo entry points at a repository that is gone, archived or moved.'));
  console.log(chalk.gray('Report: data/freshness-triage.json'));
  if (errors && args.has('--fail')) process.exit(1);
}

export function asMarkdown(triage) {
  const lines = [
    '# Stale content triage',
    '',
    `Generated ${triage.generated_at} from \`data/stale-report.json\`.`,
    `${triage.total} entries are past the ${triage.threshold_days ?? 90}-day review threshold.`,
    '',
    'Buckets are ordered by what a reviewer can actually do about them. Only',
    '`deleted`, `archived` and `renamed` are defects; the rest is scheduling.',
    '',
    '| Bucket | Entries | What it means | Action |',
    '|---|---:|---|---|',
    ...SEVERITY_ORDER.filter((key) => triage.counts[key]).map(
      (key) => `| ${key} | ${triage.counts[key]} | ${BUCKET_MEANING[key]} | ${ACTION_FOR[key]} |`
    ),
    ''
  ];
  for (const key of ['error', 'deleted', 'archived', 'renamed']) {
    const items = triage.buckets[key] ?? [];
    if (!items.length) continue;
    lines.push(`## ${BUCKET_MEANING[key]} (${items.length})`, '');
    lines.push('| Entry | Path | Repo | Suggested URL | Last reviewed |');
    lines.push('|---|---|---|---|---|');
    for (const item of items) {
      lines.push(`| ${item.id} | ${item.path} | ${item.repo ?? '—'} | ${item.suggested_url ?? '—'} | ${item.last_reviewed ?? '—'} |`);
    }
    lines.push('');
  }
  const dormant = triage.buckets.dormant ?? [];
  if (dormant.length) {
    lines.push(`## Dormant upstreams (${dormant.length})`, '');
    lines.push(`Public, but no push in ${triage.dormancy_days} days. The entry may still be accurate; the maintenance claim needs re-reading.`, '');
    for (const item of dormant.slice(0, 40)) lines.push(`- ${item.id} — last push ${item.pushed_at ?? 'unknown'} (\`${item.path}\`)`);
    if (dormant.length > 40) lines.push(`- … and ${dormant.length - 40} more in \`data/freshness-triage.json\``);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

const BUCKET_MEANING = {
  error: 'Triage could not check the repository',
  deleted: 'Repository returns 404',
  archived: 'Upstream repository is archived',
  renamed: 'Repository moved or changed owner',
  dormant: 'No push in the dormancy window',
  active: 'Public and recently pushed',
  'no-repo': 'No GitHub URL to check',
  generated: 'Generated routing page',
  unchecked: 'Not checked in this run'
};

const invokedDirectly = process.argv[1] && /triage-stale-entries\.js$/.test(process.argv[1]);
if (invokedDirectly) {
  main().catch((error) => {
    console.error(chalk.red(error.message));
    process.exit(1);
  });
}

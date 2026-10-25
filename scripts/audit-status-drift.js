#!/usr/bin/env node
// Status drift: entries whose declared maintenance status no longer matches the
// only dated evidence the catalogue holds — `last_commit`.
//
// `check-stale.js` measures how long ago an entry was *reviewed*; this measures
// whether the entry is still telling the truth about the project. Those are
// different failures. A reviewed entry can carry `status: active` and
// `health_signals: [actively-maintained]` for a repository that has not been
// pushed to in two years, and no age metric catches it, because the entry itself
// is freshly reviewed. The thresholds are the ones the candidate rubric already
// uses (`scripts/score-entry-candidates.js`): 90 days may claim active and
// `actively-maintained`, 180 days is the ceiling before the catalogue only lets
// a project be described as `watching`.
//
//   --out <path>   write a markdown worklist (default: stdout only)
//   --json <path>  write the raw findings
//   --all          include every finding (default: one line per entry)
import fs from 'node:fs/promises';
import path from 'node:path';
import { getEntryFiles, inferEntryType, readMarkdown } from './utils/frontmatter.js';

export const ACTIVE_DAYS = 90;
export const WATCHING_DAYS = 180;

const FINDINGS = {
  ACTIVE_BUT_STALE: 'active-but-stale',
  CLAIMS_ACTIVELY_MAINTAINED: 'claims-actively-maintained',
  WATCHING_BUT_FRESH: 'watching-but-fresh',
  UNDATED: 'undated'
};

export function daysSince(value, now = new Date()) {
  const then = new Date(String(value ?? '').slice(0, 10));
  if (Number.isNaN(then.getTime())) return null;
  return Math.floor((now.getTime() - then.getTime()) / 86400000);
}

// Pure so the thresholds can be tested without touching the catalogue.
export function classifyEntry(entry, now = new Date(), { kind = null } = {}) {
  const findings = [];
  const days = daysSince(entry.last_commit, now);
  const status = String(entry.status ?? '').trim();
  const signals = Array.isArray(entry.health_signals) ? entry.health_signals : [];

  if (days === null) {
    // Tool entries are not required to carry `last_commit`; their maintenance
    // evidence is the review date and the star refresh. Reporting them as
    // undated would bury the project entries that genuinely lost the field.
    if (kind === 'tool') return findings;
    findings.push({
      rule: FINDINGS.UNDATED,
      days: null,
      detail: 'no parseable last_commit, so no maintenance claim in this file can be checked against a date'
    });
    return findings;
  }

  if (status === 'active' && days > WATCHING_DAYS) {
    findings.push({
      rule: FINDINGS.ACTIVE_BUT_STALE,
      days,
      detail: `status is active but the last commit was ${days} days ago; the catalogue's own rubric stops allowing "active" after ${WATCHING_DAYS}`
    });
  }

  if (signals.includes('actively-maintained') && days > ACTIVE_DAYS) {
    findings.push({
      rule: FINDINGS.CLAIMS_ACTIVELY_MAINTAINED,
      days,
      detail: `health_signals claim actively-maintained but the last commit was ${days} days ago (allowed window is ${ACTIVE_DAYS})`
    });
  }

  if (status === 'watching' && days <= ACTIVE_DAYS) {
    findings.push({
      rule: FINDINGS.WATCHING_BUT_FRESH,
      days,
      detail: `status is watching but the last commit was ${days} days ago; the project may have resumed`
    });
  }

  return findings;
}

export function summarize(findings) {
  const byRule = {};
  for (const finding of findings) byRule[finding.rule] = (byRule[finding.rule] ?? 0) + 1;
  return byRule;
}

function worklistMarkdown(findings, generatedAt) {
  const byRule = summarize(findings);
  const order = [FINDINGS.ACTIVE_BUT_STALE, FINDINGS.CLAIMS_ACTIVELY_MAINTAINED, FINDINGS.WATCHING_BUT_FRESH, FINDINGS.UNDATED];
  const lines = [
    '# Status drift worklist',
    '',
    `Generated ${generatedAt} by \`pnpm run audit:status-drift\`. Do not edit by hand; re-run it.`,
    '',
    'An entry is reviewed (so it is not in `data/stale-report.json`) while still describing a',
    'repository that stopped moving. This list is the difference between "nobody has looked at',
    'this file" and "this file no longer matches its project". Each row is a claim to re-check and',
    'then correct in frontmatter — not a licence to bulk-edit status.',
    '',
    '| Finding | Entries |',
    '|---|---:|',
    ...order.map((rule) => `| \`${rule}\` | ${byRule[rule] ?? 0} |`),
    `| **total** | **${findings.length}** |`,
    ''
  ];
  for (const rule of order) {
    const rows = findings.filter((finding) => finding.rule === rule).sort((a, b) => (b.days ?? 0) - (a.days ?? 0));
    if (!rows.length) continue;
    lines.push(`## \`${rule}\``, '');
    lines.push('| Entry | Last commit | Days | Suggested correction |', '|---|---|---:|---|');
    for (const row of rows) {
      const suggestion = rule === FINDINGS.ACTIVE_BUT_STALE
        ? 'status → `watching`, or re-verify that the project moved elsewhere'
        : rule === FINDINGS.CLAIMS_ACTIVELY_MAINTAINED
          ? 'drop `actively-maintained`, or re-check the repository'
          : rule === FINDINGS.WATCHING_BUT_FRESH
            ? 'candidate for `active` after re-reading the entry'
            : 'add `last_commit` from the GitHub API';
      lines.push(`| \`${row.id}\` (${row.file}) | ${row.last_commit || '—'} | ${row.days ?? '—'} | ${suggestion} |`);
    }
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

function flagValue(argv, name) {
  const index = argv.indexOf(name);
  return index >= 0 ? argv[index + 1] : null;
}

async function main() {
  const argv = process.argv.slice(2);
  const now = new Date();
  const findings = [];
  for (const file of await getEntryFiles()) {
    const { data } = await readMarkdown(file);
    if (!data?.id) continue;
    // Only kinds that carry maintenance fields; tips, guides and digests have
    // no repository behind them. The kind comes from the path, not from a
    // `type` field: project entries do not carry one at all.
    const kind = inferEntryType(file, data);
    if (!['project', 'tool', 'paper'].includes(kind)) continue;
    for (const finding of classifyEntry(data, now, { kind })) {
      findings.push({
        ...finding,
        id: data.id,
        file,
        type: kind,
        status: data.status ?? null,
        last_commit: data.last_commit ?? null
      });
    }
  }

  const byRule = summarize(findings);
  console.log(`Status drift: ${findings.length} finding(s) across ${new Set(findings.map((f) => f.file)).size} entries.`);
  for (const [rule, count] of Object.entries(byRule).sort((a, b) => b[1] - a[1])) console.log(`  ${count.toString().padStart(4)}  ${rule}`);

  const out = flagValue(argv, '--out');
  if (out) {
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, worklistMarkdown(findings, now.toISOString().slice(0, 10)));
    console.log(`Worklist written to ${out}.`);
  }
  const json = flagValue(argv, '--json');
  if (json) {
    await fs.mkdir(path.dirname(json), { recursive: true });
    await fs.writeFile(json, `${JSON.stringify({ generated_at: now.toISOString(), count: findings.length, findings }, null, 2)}\n`);
    console.log(`Findings written to ${json}.`);
  }
  if (argv.includes('--all')) {
    for (const finding of findings) console.log(`- ${finding.file} [${finding.rule}]: ${finding.detail}`);
  }
}

if (process.argv[1] && process.argv[1].endsWith('audit-status-drift.js')) await main();

#!/usr/bin/env node

// Applies the objective (mechanical) gates of
// docs/policies/new-project-entry-rubric.md to a candidate manifest, so the
// "is this project eligible?" decision is reproducible instead of a matter of
// reviewer memory.
//
// The judgement gates J1-J4 are computable from GitHub API facts and from the
// existing catalogue; the prose gates (G5-G15) are enforced later by
// `pnpm run ci` on the entry itself. This script is the *intake* filter: it
// answers "should anyone spend time writing this entry?", and it records why
// not, so a rejected candidate is not re-litigated on the next pass.
//
//   node scripts/score-entry-candidates.js --manifest candidates.json
//   node scripts/score-entry-candidates.js --manifest candidates.json --json
//
// Manifest shape: an array of candidate objects. `repo` is required; the GitHub
// facts may be supplied inline (offline/CI use) or fetched with --fetch.
//
//   [{ "repo": "octocat/hello", "phase": "agent-system",
//      "stars": 1234, "license": "MIT", "language": "Python",
//      "pushed_at": "2026-09-03", "archived": false, "source_in_repo": true }]

import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { getEntryFiles, readMarkdown } from './utils/frontmatter.js';

export const GATES = {
  UNIQUE_ID: 'G1-unique-id',
  UNIQUE_URL: 'G2-unique-github-url',
  NOT_ARCHIVED: 'J1-not-archived',
  MIN_STARS: 'J2-min-stars',
  RECENCY: 'J3-recency',
  LICENCE_NAMED: 'J4-licence-named',
  SOURCE_IN_REPO: 'J5-source-in-repo',
  PHASE_KNOWN: 'J7-phase-known'
};

export const STAR_FLOOR = 5000;
export const ACTIVE_DAYS = 90;
export const WATCHING_DAYS = 180;

// Phases that own a folder under content/projects/ (TAXONOMY.md § Project
// Phases). Mirrors the phaseToFolder map in scripts/validate-paths.js so a
// candidate scored here cannot later fail validate:paths.
export const PHASE_FOLDERS = {
  'foundation-model': 'foundation-models',
  framework: 'frameworks',
  'inference-engine': 'inference-engines',
  'agent-system': 'agent-systems',
  'data-and-retrieval': 'data-and-retrieval',
  'training-and-alignment': 'training-and-alignment',
  'benchmark-and-eval': 'benchmarks-and-evals'
};

// "NOASSERTION" is GitHub's placeholder when it cannot map a licence file to an
// SPDX id. It carries no information, so the rubric requires the reviewer to
// name the licence — including fair-code ones — in frontmatter.
const UNNAMED_LICENCES = new Set(['', 'none', 'noassertion', 'other', 'null', 'undefined']);

export function daysSince(isoDate, now = new Date()) {
  const then = new Date(String(isoDate ?? '').slice(0, 10));
  if (Number.isNaN(then.getTime())) return null;
  return Math.floor((now.getTime() - then.getTime()) / 86400000);
}

// J3: recency decides the status vocabulary an entry may use, not merely
// pass/fail. Within ACTIVE_DAYS the entry may claim `actively-maintained`;
// between ACTIVE_DAYS and WATCHING_DAYS it may be catalogued as `watching`
// only; beyond that it is rejected.
export function recencyVerdict(pushedAt, now = new Date()) {
  const days = daysSince(pushedAt, now);
  if (days === null) return { gate: GATES.RECENCY, pass: false, status: null, reason: 'pushed_at missing or unparseable' };
  if (days <= ACTIVE_DAYS) return { gate: GATES.RECENCY, pass: true, status: 'active', days, reason: `pushed ${days} day(s) ago; may claim actively-maintained` };
  if (days <= WATCHING_DAYS) return { gate: GATES.RECENCY, pass: true, status: 'watching', days, reason: `pushed ${days} day(s) ago; outside the ${ACTIVE_DAYS}-day window, so status must be "watching" without an actively-maintained signal` };
  return { gate: GATES.RECENCY, pass: false, status: null, days, reason: `pushed ${days} day(s) ago; beyond the ${WATCHING_DAYS}-day ceiling` };
}

export function scoreCandidate(candidate, existing, now = new Date()) {
  const results = [];
  const add = (gate, pass, reason) => results.push({ gate, pass, reason });

  // The entry's id is what check-duplicates.js will actually test, and it is a
  // choice the author makes, not a property of the repository: this pass filed
  // `modelcontextprotocol/servers` as `mcp-servers` and `livekit/agents` as
  // `livekit-agents`. Deriving an id from the repo name is a guess, so when the
  // manifest omits one, G1 is answered against the guess and the result is
  // flagged -- a clean G1 on a derived id does not clear the real one.
  const idSupplied = Boolean(candidate.id);
  const id = String(candidate.id ?? candidate.repo ?? '').split('/').pop().toLowerCase();
  const idNote = idSupplied ? '' : ` (derived from the repo name; confirm the id the entry will actually use)`;
  add(GATES.UNIQUE_ID, !existing.ids.has(id), (existing.ids.has(id) ? `id "${id}" already catalogued at ${existing.ids.get(id)}` : `id "${id}" is unused`) + idNote);

  const url = String(candidate.github_url ?? `https://github.com/${candidate.repo ?? ''}`).replace(/\/+$/, '').toLowerCase();
  add(GATES.UNIQUE_URL, !existing.urls.has(url), existing.urls.has(url) ? `${url} already catalogued` : `${url} is not in the catalogue`);

  add(GATES.NOT_ARCHIVED, candidate.archived !== true, candidate.archived === true ? 'repository is archived in the GitHub API' : 'repository is not archived');

  const stars = Number(candidate.stars ?? candidate.github_stars ?? NaN);
  add(GATES.MIN_STARS, Number.isFinite(stars) && stars >= STAR_FLOOR, Number.isFinite(stars) ? `${stars} star(s) vs the ${STAR_FLOOR} floor` : 'star count missing');

  const recency = recencyVerdict(candidate.pushed_at ?? candidate.last_commit, now);
  add(recency.gate, recency.pass, recency.reason);

  const licence = String(candidate.license ?? '').trim().toLowerCase();
  add(GATES.LICENCE_NAMED, !UNNAMED_LICENCES.has(licence), UNNAMED_LICENCES.has(licence) ? `licence "${candidate.license ?? 'missing'}" is unnamed; name it (fair-code included)` : `licence "${candidate.license}" is named`);

  add(GATES.SOURCE_IN_REPO, candidate.source_in_repo !== false, candidate.source_in_repo === false ? 'repository holds no source (landing page, docs repo, or awesome-list)' : 'source code present in the repository');

  add(GATES.PHASE_KNOWN, Object.hasOwn(PHASE_FOLDERS, candidate.phase), Object.hasOwn(PHASE_FOLDERS, candidate.phase) ? `phase "${candidate.phase}" maps to content/projects/${PHASE_FOLDERS[candidate.phase]}/` : `phase "${candidate.phase ?? 'missing'}" is not one of the 7 lifecycle phases`);

  const failed = results.filter((r) => !r.pass);
  return {
    repo: candidate.repo ?? id,
    id,
    idSupplied,
    pass: failed.length === 0,
    status: recency.pass ? recency.status : null,
    results,
    failed: failed.map((r) => r.gate)
  };
}

// Scope matters here, and the obvious choice is wrong. scripts/check-duplicates.js
// enforces id uniqueness across EVERY entry type in the catalogue, not per
// vertical — so a project entry cannot reuse an id already held by a tool,
// research, or tip entry. Scoping this scan to content/projects/ would let a
// candidate through intake that then fails `pnpm run check:duplicates`.
// Many popular repos already have a tool entry (cline, mem0, litellm, unsloth,
// e2b, agno, aider, n8n, letta, zep, gemini-cli); a second project entry for
// the same repo needs a distinct id plus `corresponding_tool_entry`, and has to
// clear gate J6 on its own merits.
export async function loadExisting() {
  const ids = new Map();
  const urls = new Set();
  for (const file of await getEntryFiles()) {
    const { data, hasFrontmatter } = await readMarkdown(file);
    if (!hasFrontmatter || !data.id) continue;
    if (!ids.has(data.id)) ids.set(data.id, file);
    if (data.github_url) urls.add(String(data.github_url).replace(/\/+$/, '').toLowerCase());
  }
  return { ids, urls };
}

export function scoreAll(candidates, existing, now = new Date()) {
  return candidates.map((candidate) => scoreCandidate(candidate, existing, now));
}

export function formatReport(scored) {
  const lines = [];
  for (const entry of scored) {
    const mark = entry.pass ? chalk.green('PASS') : chalk.red('FAIL');
    lines.push(`${mark}  ${entry.repo}${entry.pass && entry.status === 'watching' ? chalk.yellow(' (status: watching)') : ''}`);
    for (const result of entry.results) {
      const tick = result.pass ? chalk.green('  ok  ') : chalk.red('  XX  ');
      lines.push(`${tick}${result.gate}: ${result.reason}`);
    }
  }
  const passed = scored.filter((s) => s.pass).length;
  lines.push('');
  lines.push(`${passed}/${scored.length} candidate(s) pass the intake rubric.`);
  return lines.join('\n');
}

async function main() {
  const args = process.argv.slice(2);
  const manifestFlag = args.indexOf('--manifest');
  if (manifestFlag === -1) {
    console.error('Usage: node scripts/score-entry-candidates.js --manifest <file.json> [--json]');
    process.exit(2);
  }
  const manifestPath = args[manifestFlag + 1];
  const raw = await fs.readFile(manifestPath, 'utf8');
  const candidates = JSON.parse(raw);
  if (!Array.isArray(candidates)) {
    console.error(`${manifestPath}: manifest must be a JSON array of candidates`);
    process.exit(2);
  }
  const existing = await loadExisting();
  const scored = scoreAll(candidates, existing);
  if (args.includes('--json')) {
    console.log(JSON.stringify(scored, null, 2));
  } else {
    console.log(formatReport(scored));
  }
  process.exit(scored.some((s) => !s.pass) ? 1 : 0);
}

const invokedDirectly = process.argv[1] && import.meta.url === `file://${path.resolve(process.argv[1])}`;
if (invokedDirectly) await main();

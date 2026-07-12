#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getEntryFiles, inferEntryType, readMarkdown } from './utils/frontmatter.js';
import { getChangedMarkdownFiles, isContentEntryCandidate } from './utils/changed-files.js';
import { applyBaseline, parseBaseline } from './utils/editorial-baseline.js';

// Committed, human-reviewed baseline of pre-existing full-catalog findings.
// Only consulted in --all mode; changed-file mode stays strict and baseline-free.
export const BASELINE_PATH = 'docs/editorial-baseline.json';

// Entry kinds that currently have bespoke editorial rules. Other content
// types (tips, benchmarks, architectures, observability, community, build
// examples) receive only structural/schema validation for now — they are
// reported explicitly as "structural-only" rather than silently skipped, so
// the coverage gap is visible instead of implied to be enforced.
const SUPPORTED_KINDS = ['project', 'paper', 'tool'];

const PROJECT_HEADINGS = [
  'Overview',
  "Why it's in the Arsenal",
  'Architecture',
  'Ecosystem Position',
  'Getting Started',
  'Key Use Cases',
  'Strengths',
  'Limitations',
  'Relation to the Arsenal',
  'Resources'
];

const RESEARCH_HEADINGS = [
  'Overview',
  "Why it's in the Arsenal",
  'Core Contribution',
  'Key Results',
  'Methodology',
  'Practical Applicability',
  'Limitations & Critiques',
  'Reproductions & Follow-up Work',
  'Relation to the Arsenal',
  'Resources'
];

const TOOL_HEADINGS = [
  'Overview',
  "Why It's in the Arsenal",
  'Key Features',
  'Architecture / How It Works',
  'Getting Started',
  'Use Cases',
  'Strengths',
  'Limitations / When NOT to Use',
  'Integration Patterns',
  'Resources',
  'Buzz & Reception'
];

const GENERIC_BODY_PATTERNS = [
  /fresh candidate for the .* layer because it addresses a concrete engineering decision/i,
  /the work addresses a concrete engineering question around agent memory, retrieval, evaluation, or reliability/i,
  /it is included as a paper-reported result, not as an independently verified production recommendation/i,
  /it complements adjacent AI model, data, agent, serving, and evaluation components/i,
  /the repository provides the implementation and integrations described by its official documentation/i,
  /independent production evidence is not established in this first pass/i,
  /a fresh evaluation or research contribution for AI engineering/i,
  /a focused engineering use case aligned with the repository description/i,
  /this entry keeps the architecture summary deliberately high-level until independent reproduction/i
];

const GENERIC_FRONTMATTER_PATTERNS = [
  /problem space covered by an open-source component/i,
  /independently verified production guarantee rather than a candidate component/i,
  /evaluate the current release against your own data, deployment, and operational constraints/i,
  /cannot review licenses, permissions, model dependencies, and failure behavior before adoption/i,
  /compatibility, operational cost, and security boundaries require workload-specific testing/i
];

const TECHNICAL_TERMS = /\b(?:API|MCP|Python|TypeScript|Rust|Go|Kubernetes|Docker|GPU|models?|checkpoint|dataset|retrieval|embedding|vector|cache|gateway|provider|workflow|sandbox|prompt|adapter|benchmark|ablation|trajectory|judge|baseline|latency|tokens?|authorization|deletion|confidence|decoder|test suite|rollback|streaming|batching|storage|agents?|rubric|citation|support|false-positive|task|turn|instance|multimodal|vision|robotics|corpus|construct|cases?|domains?|settings?|telemetry|detector|explorer|F1|scores?|accuracy|results?)\b/i;
const COMPARISON_TERMS = /\b(?:overlaps?|compete\w*|compare|alternative|between|above|below|alongside|complement\w*|rather than|not a)\b/i;
const BAD_INTERPOLATION = /\babout\s+(?:a|an|the\s+)?(?:defines|introduces|combines|builds|presents|evaluates|provides|uses|is)\b/i;

function normalize(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/[`*_#>|\-]/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(text) {
  return new Set(normalize(text).split(' ').filter((token) => token.length > 2));
}

export function tokenOverlap(left, right) {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return 0;
  let common = 0;
  for (const token of a) if (b.has(token)) common += 1;
  return common / Math.min(a.size, b.size);
}

export function extractSections(content) {
  const matches = [...String(content ?? '').matchAll(/^##\s+(.+?)\s*$/gm)];
  const sections = new Map();
  for (let index = 0; index < matches.length; index += 1) {
    const heading = matches[index][1].trim();
    const start = matches[index].index + matches[index][0].length;
    const end = matches[index + 1]?.index ?? content.length;
    sections.set(heading, content.slice(start, end).trim());
  }
  return sections;
}

function listValues(value) {
  return Array.isArray(value) ? value.join(' ') : String(value ?? '');
}

function isNearCopy(section, field) {
  const sectionText = normalize(section);
  const fieldText = normalize(field);
  if (!sectionText || !fieldText) return false;
  return tokenOverlap(section, field) > 0.88 && sectionText.length <= fieldText.length * 1.6;
}

function entryKind(file, data) {
  return inferEntryType(file, data);
}

function editorialDate(entries, explicitDate) {
  if (explicitDate) return explicitDate;
  const dates = entries
    .map(({ data }) => data.added_date)
    .filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date ?? ''))
    .sort();
  return dates.at(-1);
}

function addIssue(issues, file, rule, message) {
  issues.push({ file, rule, message });
}

// Stable identifiers for each editorial rule. They are part of a finding's
// identity (file + rule + normalized message) so a future finding-level
// baseline can tolerate pre-existing debt without exempting whole files.
export const EDITORIAL_RULES = {
  SECTION_TOO_SHORT: 'section-too-short',
  REJECTED_BOILERPLATE: 'rejected-boilerplate',
  GENERIC_FRONTMATTER: 'generic-frontmatter',
  BAD_INTERPOLATION: 'bad-interpolation',
  OVERVIEW_COPIED: 'overview-copied-from-frontmatter',
  PROJECT_SECTION_LENGTH: 'project-section-length',
  PROJECT_SECTION_TECH: 'project-section-missing-technical-content',
  ECOSYSTEM_COMPARISON: 'ecosystem-position-missing-comparison',
  BEST_AVOID_SCENARIOS: 'best-for-avoid-if-scenarios',
  RESEARCH_SECTION_LENGTH: 'research-section-length',
  RESEARCH_SECTION_TECH: 'research-section-missing-detail',
  CONTRIBUTION_COPIED: 'core-contribution-copied-from-frontmatter',
  TOOL_SECTION_LENGTH: 'tool-section-length',
  TOOL_SECTION_TECH: 'tool-section-missing-technical-content',
  REPEATED_PARAGRAPH: 'repeated-paragraph'
};

export function inspectEntry({ file, data, content }) {
  const issues = [];
  const kind = entryKind(file, data);
  const sections = extractSections(content);
  const expected = kind === 'project' ? PROJECT_HEADINGS : kind === 'paper' ? RESEARCH_HEADINGS : kind === 'tool' ? TOOL_HEADINGS : [];

  for (const heading of expected) {
    const body = sections.get(heading) ?? '';
    if (body.length < 80 && heading !== 'Resources') {
      addIssue(issues, file, EDITORIAL_RULES.SECTION_TOO_SHORT, `section "${heading}" is too short for a curated entry (${body.length} characters)`);
    }
  }

  const bodyText = String(content ?? '');
  for (const pattern of GENERIC_BODY_PATTERNS) {
    if (pattern.test(bodyText)) addIssue(issues, file, EDITORIAL_RULES.REJECTED_BOILERPLATE, `contains rejected boilerplate: ${pattern}`);
  }

  const frontmatterText = [data.description, data.tldr, data.key_contribution, data.ecosystem_role, data.best_for, data.avoid_if]
    .map(listValues)
    .join(' ');
  for (const pattern of GENERIC_FRONTMATTER_PATTERNS) {
    if (pattern.test(frontmatterText)) addIssue(issues, file, EDITORIAL_RULES.GENERIC_FRONTMATTER, `contains generic frontmatter judgment: ${pattern}`);
  }
  if (BAD_INTERPOLATION.test(bodyText)) addIssue(issues, file, EDITORIAL_RULES.BAD_INTERPOLATION, 'contains a likely grammatical interpolation error around "about"');

  if (kind === 'project') {
    if (isNearCopy(sections.get('Overview') ?? '', data.description)) {
      addIssue(issues, file, EDITORIAL_RULES.OVERVIEW_COPIED, 'Overview is effectively copied from description frontmatter');
    }
    for (const heading of ['Overview', 'Architecture', 'Ecosystem Position', 'Limitations']) {
      const body = sections.get(heading) ?? '';
      if (body.length < 180) addIssue(issues, file, EDITORIAL_RULES.PROJECT_SECTION_LENGTH, `project section "${heading}" needs at least 180 characters of bespoke analysis`);
      if (heading !== 'Limitations' && !TECHNICAL_TERMS.test(body)) addIssue(issues, file, EDITORIAL_RULES.PROJECT_SECTION_TECH, `project section "${heading}" lacks named technical content`);
    }
    if (!COMPARISON_TERMS.test(sections.get('Ecosystem Position') ?? '')) {
      addIssue(issues, file, EDITORIAL_RULES.ECOSYSTEM_COMPARISON, 'Ecosystem Position must state a comparison, boundary, or relationship to alternatives');
    }
    for (const field of ['best_for', 'avoid_if']) {
      if (!Array.isArray(data[field]) || data[field].length < 2) addIssue(issues, file, EDITORIAL_RULES.BEST_AVOID_SCENARIOS, `${field} must contain at least two workload-specific scenarios`);
    }
  }

  if (kind === 'paper') {
    for (const heading of ['Overview', 'Core Contribution', 'Key Results', 'Methodology', 'Limitations & Critiques']) {
      const body = sections.get(heading) ?? '';
      if (body.length < 160) addIssue(issues, file, EDITORIAL_RULES.RESEARCH_SECTION_LENGTH, `research section "${heading}" needs at least 160 characters of paper-specific analysis`);
    }
    for (const heading of ['Core Contribution', 'Key Results', 'Methodology']) {
      if (!TECHNICAL_TERMS.test(sections.get(heading) ?? '')) addIssue(issues, file, EDITORIAL_RULES.RESEARCH_SECTION_TECH, `research section "${heading}" lacks method, baseline, dataset, or result detail`);
    }
    const contribution = sections.get('Core Contribution') ?? '';
    if (isNearCopy(contribution, data.key_contribution)) {
      addIssue(issues, file, EDITORIAL_RULES.CONTRIBUTION_COPIED, 'Core Contribution is effectively copied from key_contribution frontmatter');
    }
  }

  if (kind === 'tool') {
    if (isNearCopy(sections.get('Overview') ?? '', data.description)) {
      addIssue(issues, file, EDITORIAL_RULES.OVERVIEW_COPIED, 'Overview is effectively copied from description frontmatter');
    }
    for (const heading of ['Overview', 'Architecture / How It Works', 'Limitations / When NOT to Use', 'Integration Patterns']) {
      const body = sections.get(heading) ?? '';
      if (body.length < 160) addIssue(issues, file, EDITORIAL_RULES.TOOL_SECTION_LENGTH, `tool section "${heading}" needs at least 160 characters of bespoke analysis`);
      if (heading !== 'Limitations / When NOT to Use' && !TECHNICAL_TERMS.test(body)) addIssue(issues, file, EDITORIAL_RULES.TOOL_SECTION_TECH, `tool section "${heading}" lacks named technical content`);
    }
  }

  return issues;
}

function isSupported(entry) {
  return SUPPORTED_KINDS.includes(entryKind(entry.file, entry.data) || '');
}

// Resolve which loaded entries to inspect for a given mode. Pure: the set of
// changed content files is passed in (computed from git by the caller) so the
// selection logic is deterministic and unit-testable.
//   - 'changed': entries added or modified vs the merge base (closes the
//     backdate/rewrite bypass — selection is by diff, never by added_date).
//   - 'date':    legacy maintenance mode; entries sharing the latest (or an
//     explicit) added_date.
//   - 'all':     every supported entry (for full-catalog runs; pair with a
//     finding-level baseline to tolerate pre-existing debt).
// Deleted files are naturally excluded (they aren't among loaded entries);
// renamed files are validated at their destination path (the new path is what
// the diff and the filesystem report).
export function selectEntries(entries, { mode, date, changed = new Set() } = {}) {
  if (mode === 'changed') {
    const changedEntries = entries.filter((entry) => changed.has(entry.file));
    return {
      selected: changedEntries.filter(isSupported),
      structuralOnly: changedEntries.filter((entry) => !isSupported(entry))
    };
  }
  if (mode === 'date') {
    const targetDate = editorialDate(entries, date);
    return {
      selected: entries.filter((entry) => entry.data.added_date === targetDate && isSupported(entry)),
      structuralOnly: [],
      targetDate
    };
  }
  return { selected: entries.filter(isSupported), structuralOnly: [] };
}

export async function validateEditorialQuality({ mode = 'changed', date = null, base = 'origin/main' } = {}) {
  const files = await getEntryFiles();
  const entries = [];
  for (const file of files) {
    const parsed = await readMarkdown(file);
    if (parsed.data?.id) entries.push({ file, data: parsed.data, content: parsed.content });
  }

  const effectiveMode = date ? 'date' : mode;
  const changed = effectiveMode === 'changed'
    ? new Set(getChangedMarkdownFiles({ base }).filter(isContentEntryCandidate))
    : new Set();
  const { selected, structuralOnly, targetDate } = selectEntries(entries, { mode: effectiveMode, date, changed });

  const issues = [];
  const paragraphs = new Map();
  for (const entry of selected) {
    issues.push(...inspectEntry(entry));
    for (const paragraph of entry.content.split(/\n\s*\n/).map((value) => value.trim()).filter((value) => value.length >= 120 && !value.startsWith('- [') && !value.startsWith('```'))) {
      const normalized = normalize(paragraph);
      if (!paragraphs.has(normalized)) paragraphs.set(normalized, []);
      paragraphs.get(normalized).push(entry.file);
    }
  }
  for (const [paragraph, filesForParagraph] of paragraphs) {
    if (filesForParagraph.length > 1) {
      for (const file of filesForParagraph) {
        issues.push({ file, rule: EDITORIAL_RULES.REPEATED_PARAGRAPH, message: `repeated paragraph shared with ${filesForParagraph.filter((other) => other !== file).join(', ')}: "${paragraph.slice(0, 120)}..."` });
      }
    }
  }
  return { mode: effectiveMode, targetDate, selected: selected.length, structuralOnly: structuralOnly.map((entry) => entry.file), issues };
}

export function formatIssue({ file, rule, message }) {
  return `${file} [${rule}]: ${message}`;
}

// Load the committed baseline. A missing file yields an empty baseline, which
// is safe: every finding is then treated as new and fails loudly rather than
// being silently tolerated.
export async function loadBaseline(baselinePath = BASELINE_PATH) {
  let raw;
  try {
    raw = await fs.readFile(baselinePath, 'utf8');
  } catch {
    return new Map();
  }
  return parseBaseline(raw);
}

async function runAll() {
  const { issues } = await validateEditorialQuality({ mode: 'all' });
  const baseline = await loadBaseline();
  const { newFindings, suppressed, stale } = applyBaseline(issues, baseline);

  console.log(`Full-catalog editorial validation: ${issues.length} findings, ${suppressed.length} suppressed by baseline (${BASELINE_PATH}).`);

  if (newFindings.length) {
    console.error(`\n${newFindings.length} NEW editorial finding(s) not covered by the baseline:`);
    for (const issue of newFindings) console.error(`- ${formatIssue(issue)}`);
    console.error(`\nFix these entries. If they are intentionally accepted debt, a maintainer can regenerate the baseline with \`pnpm run editorial:baseline\` (a reviewed change).`);
    process.exitCode = 1;
    return;
  }
  if (stale.length) {
    console.error(`\n${stale.length} baseline entr${stale.length === 1 ? 'y is' : 'ies are'} stale (the finding is resolved). The baseline must only shrink — prune with \`pnpm run editorial:baseline:prune\`:`);
    for (const entry of stale) console.error(`- ${entry.file} [${entry.rule}]: ${entry.finding}`);
    process.exitCode = 1;
    return;
  }
  console.log('No new findings; baseline is current.');
}

async function main() {
  if (process.argv.includes('--all')) {
    await runAll();
    return;
  }
  const dateIndex = process.argv.indexOf('--date');
  const date = dateIndex >= 0 ? process.argv[dateIndex + 1] : null;
  const baseIndex = process.argv.indexOf('--base');
  const base = baseIndex >= 0 ? process.argv[baseIndex + 1] : 'origin/main';

  const result = await validateEditorialQuality({ mode: 'changed', date, base });
  const scope = result.mode === 'date' ? `entries dated ${result.targetDate}` : `${result.mode} entries`;
  if (result.structuralOnly.length) {
    console.log(`Note: ${result.structuralOnly.length} changed entr${result.structuralOnly.length === 1 ? 'y receives' : 'ies receive'} structural-only validation (no bespoke editorial rules yet): ${result.structuralOnly.join(', ')}`);
  }
  if (result.issues.length) {
    console.error(`Editorial quality validation failed for ${result.selected} ${scope}:`);
    for (const issue of result.issues) console.error(`- ${formatIssue(issue)}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Editorial quality validation passed for ${result.selected} ${scope}.`);
}

const entrypoint = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (entrypoint && fileURLToPath(import.meta.url) === entrypoint) main();

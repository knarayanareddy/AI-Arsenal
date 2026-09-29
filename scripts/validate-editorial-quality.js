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

// Entry kinds that receive bespoke per-section editorial rules. Other content
// types still get the catalog-wide rules below (echo detection, generator
// verdict sentences, TL;DR concatenation, repeated paragraphs) — they are only
// excluded from the per-section heading and length checks, which assume a
// fixed section shape that the other kinds do not share.
const SUPPORTED_KINDS = ['project', 'paper', 'tool'];

// Every kind that gets any editorial rule applied. The catalog-wide rules need
// no heading assumptions, so they run against all content entries; without
// this, 398 entries (tips, guides, benchmarks, community, person, ...) would
// ship with no prose validation at all, which is the gap that let templated
// entries accumulate unnoticed.
const ALL_KINDS_WITH_EDITORIAL_RULES = 'all';

// The verdict sentence a schema-filling generator emits, in the variants seen
// across the catalog. It states no verifiable fact about the entry, so it is a
// reliable marker of generated prose.
const GENERATOR_VERDICT_PATTERNS = [
  /It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation/i,
  /earns a place in the Arsenal because it directly addresses a recurring decision point/i,
  /is included as a comparison point against the other tools in its phase/i,
  /see Strengths \/ Limitations below before adopting it/i,
  /is included because their work is useful for understanding/i
];

// Which body section should not be a restatement of which frontmatter field,
// per entry kind. These are the fields that already carry the scenario
// information; echoing them into the body adds length without adding analysis.
const ECHO_PAIRS = {
  tool: [
    ['Strengths', 'best_when'],
    ['Limitations / When NOT to Use', 'avoid_when'],
    ['Use Cases', 'best_when']
  ],
  guide: [
    ['Strengths', 'best_when'],
    ['Limitations / When NOT to Use', 'avoid_when'],
    ['Use Cases', 'best_when']
  ],
  project: [
    ['Strengths', 'best_for'],
    ['Limitations', 'avoid_if'],
    ['Key Use Cases', 'best_for']
  ],
  person: [
    ['Why Follow', 'description']
  ]
};

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

// Generic-praise / vibes prose, checked per section. An entry that describes a
// project in superlatives with no named noun anywhere near the claim carries no
// information, which is the Failure Mode 2 the community check already guards
// for community entries. Same idea, applied to every entry kind.
//
// Deliberately excludes words that are ordinary technical usage: "robust",
// "powerful", "first-class", "seamless", and "impressive" all appear in real
// engineering prose ("a robust parser", "first-class support"), so including
// them produced false positives on specific, well-written entries.
const VIBE_ADJECTIVES = '(?:amazing|awesome|excellent|fantastic|wonderful|incredible|game[- ]changing|revolutionary|unparalleled|unmatched|unbeatable)';
// A concrete-signal word that shows the praise is attached to something real.
const CONCRETE_SIGNAL = /\b(?:\d[\d,.kKmM]*|v?\d+\.\d+|\b(?:19|20)\d{2}\b|active|release|stars?|issue[s]?|commit|benchmark|measured?|documented|install|pip|npm|docker|kubectl|api|sdk)\b/i;
const SECTION_VIBES_PATTERN = new RegExp(
  `\\b${VIBE_ADJECTIVES}\\b[^.!?\\n]{0,160}\\b${VIBE_ADJECTIVES}\\b`,
  'gi'
);
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

// Flags a body section that is a near-copy of a frontmatter field.
//
// The previous guard was `sectionText.length <= fieldText.length * 1.6`, which
// was inverted: it only fired when the section was SHORTER than the field, so
// pasting the description three or ten times made the copy invisible. Any
// section that is mostly a restatement of a frontmatter field is the failure
// mode regardless of how much padding surrounds it, so the overlap test alone
// is the right signal. A genuinely written section that merely restates a few
// domain nouns scores far below the threshold.
function isNearCopy(section, field) {
  const sectionText = normalize(section);
  const fieldText = normalize(field);
  if (!sectionText || !fieldText) return false;
  if (tokenOverlap(section, field) <= 0.88) return false;
  // A length ratio is the wrong guard here: padding a copy to 3x the field
  // used to make it invisible. What actually distinguishes a restatement from
  // real writing is whether the section introduces any vocabulary the field
  // did not have. Genuine analysis names modules, mechanisms, and trade-offs
  // that the one-line description never mentions; a padded copy adds no new
  // words at all, however long it is.
  const sectionTokens = tokens(sectionText);
  const fieldTokens = tokens(fieldText);
  const novel = [...sectionTokens].filter((token) => !fieldTokens.has(token));
  return novel.length / Math.max(sectionTokens.size, 1) < 0.15;
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
  SECTION_VIBES: 'section-generic-praise',
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
  REPEATED_PARAGRAPH: 'repeated-paragraph',
  BODY_ECHOES_FRONTMATTER: 'body-section-echoes-frontmatter',
  GENERATOR_VERDICT_SENTENCE: 'generator-verdict-sentence',
  TLDR_ECHOES_FRONTMATTER: 'tldr-echoes-frontmatter'
};

// Generated shortlist cards are parallel *data*, not duplicated prose. A
// routing page (by-job, by-cost, by-stack) renders one card per tool from that
// tool's frontmatter, so a facet row like "**Cost** | Check linked entry" and
// the card's per-tool Strengths line repeat by construction across every card
// on the page. Treating those as repeated paragraphs flags the generator that
// produced the page rather than any duplicated writing, so they are excluded
// from the cross-entry paragraph check. The rule still applies to real prose on
// the same page, which is what caught the guide boilerplate earlier.
function isGeneratedCard(paragraph) {
  return /\| Field \| Value \|/.test(paragraph)
    || /Check linked entry/.test(paragraph)
    || /^> \*\*TL;DR:\*\* .* is a candidate for/.test(paragraph)
    || /^\*\*[A-Za-z ]+:\*\*/.test(paragraph)
    || /^### .+ — /.test(paragraph)
    || /^- (Cost|Open Source|Self-hostable|Stack) \|/.test(paragraph)
    || /^\*\*Strengths:\*\*/.test(paragraph)
    || /^\*\*Avoid if:\*\*/.test(paragraph);
}

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

  // Vibes-only prose, checked per section across every entry kind. Two praise
  // adjectives close together with no concrete signal between them is the
  // tell: real writing attaches superlatives to something named and dated.
  for (const [heading, sectionBody] of sections) {
    const text = String(sectionBody ?? '');
    if (text.length < 80) continue;
    const vibes = [...text.matchAll(new RegExp(SECTION_VIBES_PATTERN.source, 'gi'))];
    if (vibes.length === 0) continue;
    // Require the praise run to be *unbacked*: strip the praise sentences out
    // and require real substance to remain. Testing the whole section for any
    // single technical noun was too weak — one word like "support" anywhere in
    // a puff piece was enough to excuse an entirely generic section.
    const stripped = text
      .split(/(?<=[.!?])\s+|\n/)
      .filter((sentence) => !new RegExp(SECTION_VIBES_PATTERN.source, 'i').test(sentence))
      .join(' ')
      .trim();
    const backedByNouns = (stripped.match(new RegExp(TECHNICAL_TERMS.source, 'gi')) ?? []).length >= 3;
    const backedBySignal = CONCRETE_SIGNAL.test(stripped);
    if (!backedByNouns && !backedBySignal) {
      addIssue(
        issues,
        file,
        EDITORIAL_RULES.SECTION_VIBES,
        `section "${heading}" is generic praise with no named technical or concrete signal`
      );
    }
  }

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

  // ---- Catalog-wide rules, applied to every entry kind -------------------
  //
  // These three are what a generator produces when it fills a schema without
  // writing: a body section that restates the frontmatter it was given, a
  // canned verdict sentence, and a TL;DR assembled by concatenation. None of
  // them are visible to the kind-specific rules above, because each passes the
  // length and technical-term bars while carrying no information.

  // 1. A body section that is mostly a copy of a frontmatter field.
  //    `best_when`/`avoid_when` belong in frontmatter; a Strengths section
  //    restating them says nothing the frontmatter did not already say.
  for (const [sectionName, field] of ECHO_PAIRS[kind] ?? []) {
    const body = sections.get(sectionName);
    const value = listValues(data[field]);
    if (!body || !value) continue;
    const overlap = tokenOverlap(body, value);
    if (overlap > 0.6) {
      addIssue(
        issues,
        file,
        EDITORIAL_RULES.BODY_ECHOES_FRONTMATTER,
        `section "${sectionName}" restates the ${field} frontmatter (token overlap ${overlap.toFixed(2)}); the body should add analysis the field does not carry`
      );
    }
  }

  // 2. The canned verdict sentence.
  for (const pattern of GENERATOR_VERDICT_PATTERNS) {
    if (pattern.test(bodyText)) {
      addIssue(issues, file, EDITORIAL_RULES.GENERATOR_VERDICT_SENTENCE, `contains a generated verdict sentence: ${pattern}`);
    }
  }

  // 3. A TL;DR assembled by concatenating frontmatter.
  const tldr = String(content ?? '').match(/^>\s*\*\*TL;DR:\*\*\s*(.+)$/m)?.[1];
  if (tldr) {
    const source = [data.description, listValues(data.best_when), listValues(data.avoid_when), listValues(data.best_for), listValues(data.avoid_if)].join(' ');
    const overlap = tokenOverlap(tldr, source);
    if (overlap > 0.7) {
      addIssue(
        issues,
        file,
        EDITORIAL_RULES.TLDR_ECHOES_FRONTMATTER,
        `TL;DR restates description/best_when frontmatter (token overlap ${overlap.toFixed(2)}) rather than summarising the entry`
      );
    }
  }

  return issues;
}

function isSupported(entry) {
  return SUPPORTED_KINDS.includes(entryKind(entry.file, entry.data) || '');
}

// Every content entry gets the catalog-wide rules. Entries whose kind has no
// per-section heading contract are still inspected — they are reported as
// 'catalog-wide only' rather than skipped, so the coverage is explicit and
// the per-section rules stay opt-in per kind.
function isInspectable(entry) {
  return Boolean(entryKind(entry.file, entry.data));
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
      // Entries outside SUPPORTED_KINDS still get the catalog-wide rules, so
      // they are inspected rather than reported as structural-only.
      catalogWide: changedEntries.filter((entry) => isInspectable(entry) && !isSupported(entry)),
      structuralOnly: changedEntries.filter((entry) => !isInspectable(entry))
    };
  }
  if (mode === 'date') {
    const targetDate = editorialDate(entries, date);
    return {
      selected: entries.filter((entry) => entry.data.added_date === targetDate && isSupported(entry)),
      catalogWide: entries.filter((entry) => entry.data.added_date === targetDate && isInspectable(entry) && !isSupported(entry)),
      structuralOnly: [],
      targetDate
    };
  }
  return { selected: entries.filter(isSupported), catalogWide: entries.filter((entry) => isInspectable(entry) && !isSupported(entry)), structuralOnly: [] };
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
  const { selected, catalogWide, structuralOnly, targetDate } = selectEntries(entries, { mode: effectiveMode, date, changed });

  const issues = [];
  const paragraphs = new Map();
  // Catalog-wide entries are inspected by the same function: the per-section
  // rules inside it are gated on `kind`, so an entry with no heading contract
  // simply skips them and still receives the echo/verdict/TL;DR/repeated-
  // paragraph checks. This is what closes the 398-entry validation gap.
  for (const entry of [...selected, ...catalogWide]) {
    issues.push(...inspectEntry(entry));
    for (const paragraph of entry.content.split(/\n\s*\n/).map((value) => value.trim()).filter((value) => value.length >= 120 && !value.startsWith('- [') && !value.startsWith('```') && !isGeneratedCard(value))) {
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
  return {
    mode: effectiveMode,
    targetDate,
    selected: selected.length,
    catalogWide: catalogWide.length,
    structuralOnly: structuralOnly.map((entry) => entry.file),
    issues
  };
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
  // Leave undefined when unspecified so getChangedFiles() can resolve the base
  // from GITHUB_BASE_SHA in CI (and fail closed if it cannot be established).
  const base = baseIndex >= 0 ? process.argv[baseIndex + 1] : undefined;

  const result = await validateEditorialQuality({ mode: 'changed', date, base });
  const scope = result.mode === 'date' ? `entries dated ${result.targetDate}` : `${result.mode} entries`;
  if (result.structuralOnly.length) {
    console.log(`Note: ${result.structuralOnly.length} changed entr${result.structuralOnly.length === 1 ? 'y receives' : 'ies receive'} structural-only validation (no bespoke editorial rules yet): ${result.structuralOnly.join(', ')}`);
  }
  if (result.catalogWide) {
    console.log(`Note: ${result.catalogWide} changed entr${result.catalogWide === 1 ? 'y' : 'ies'} validated by the catalog-wide rules only (frontmatter-echo, generator verdict, TL;DR echo, repeated paragraph).`);
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

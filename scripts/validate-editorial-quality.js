#!/usr/bin/env node

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getEntryFiles, inferEntryType, readMarkdown } from './utils/frontmatter.js';

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

function addIssue(issues, file, message) {
  issues.push(`${file}: ${message}`);
}

export function inspectEntry({ file, data, content }) {
  const issues = [];
  const kind = entryKind(file, data);
  const sections = extractSections(content);
  const expected = kind === 'project' ? PROJECT_HEADINGS : kind === 'paper' ? RESEARCH_HEADINGS : kind === 'tool' ? TOOL_HEADINGS : [];

  for (const heading of expected) {
    const body = sections.get(heading) ?? '';
    if (body.length < 80 && heading !== 'Resources') {
      addIssue(issues, file, `section "${heading}" is too short for a curated entry (${body.length} characters)`);
    }
  }

  const bodyText = String(content ?? '');
  for (const pattern of GENERIC_BODY_PATTERNS) {
    if (pattern.test(bodyText)) addIssue(issues, file, `contains rejected boilerplate: ${pattern}`);
  }

  const frontmatterText = [data.description, data.tldr, data.key_contribution, data.ecosystem_role, data.best_for, data.avoid_if]
    .map(listValues)
    .join(' ');
  for (const pattern of GENERIC_FRONTMATTER_PATTERNS) {
    if (pattern.test(frontmatterText)) addIssue(issues, file, `contains generic frontmatter judgment: ${pattern}`);
  }
  if (BAD_INTERPOLATION.test(bodyText)) addIssue(issues, file, 'contains a likely grammatical interpolation error around "about"');

  if (kind === 'project') {
    if (isNearCopy(sections.get('Overview') ?? '', data.description)) {
      addIssue(issues, file, 'Overview is effectively copied from description frontmatter');
    }
    for (const heading of ['Overview', 'Architecture', 'Ecosystem Position', 'Limitations']) {
      const body = sections.get(heading) ?? '';
      if (body.length < 180) addIssue(issues, file, `project section "${heading}" needs at least 180 characters of bespoke analysis`);
      if (heading !== 'Limitations' && !TECHNICAL_TERMS.test(body)) addIssue(issues, file, `project section "${heading}" lacks named technical content`);
    }
    if (!COMPARISON_TERMS.test(sections.get('Ecosystem Position') ?? '')) {
      addIssue(issues, file, 'Ecosystem Position must state a comparison, boundary, or relationship to alternatives');
    }
    for (const field of ['best_for', 'avoid_if']) {
      if (!Array.isArray(data[field]) || data[field].length < 2) addIssue(issues, file, `${field} must contain at least two workload-specific scenarios`);
    }
  }

  if (kind === 'paper') {
    for (const heading of ['Overview', 'Core Contribution', 'Key Results', 'Methodology', 'Limitations & Critiques']) {
      const body = sections.get(heading) ?? '';
      if (body.length < 160) addIssue(issues, file, `research section "${heading}" needs at least 160 characters of paper-specific analysis`);
    }
    for (const heading of ['Core Contribution', 'Key Results', 'Methodology']) {
      if (!TECHNICAL_TERMS.test(sections.get(heading) ?? '')) addIssue(issues, file, `research section "${heading}" lacks method, baseline, dataset, or result detail`);
    }
    const contribution = sections.get('Core Contribution') ?? '';
    if (isNearCopy(contribution, data.key_contribution)) {
      addIssue(issues, file, 'Core Contribution is effectively copied from key_contribution frontmatter');
    }
  }

  if (kind === 'tool') {
    if (isNearCopy(sections.get('Overview') ?? '', data.description)) {
      addIssue(issues, file, 'Overview is effectively copied from description frontmatter');
    }
    for (const heading of ['Overview', 'Architecture / How It Works', 'Limitations / When NOT to Use', 'Integration Patterns']) {
      const body = sections.get(heading) ?? '';
      if (body.length < 160) addIssue(issues, file, `tool section "${heading}" needs at least 160 characters of bespoke analysis`);
      if (heading !== 'Limitations / When NOT to Use' && !TECHNICAL_TERMS.test(body)) addIssue(issues, file, `tool section "${heading}" lacks named technical content`);
    }
  }

  return issues;
}

export async function validateEditorialQuality({ date = null } = {}) {
  const files = await getEntryFiles();
  const entries = [];
  for (const file of files) {
    const parsed = await readMarkdown(file);
    if (parsed.data?.id) entries.push({ file, data: parsed.data, content: parsed.content });
  }
  const targetDate = editorialDate(entries, date);
  const selected = entries.filter(({ file, data }) => data.added_date === targetDate && ['project', 'paper', 'tool'].includes(entryKind(file, data) || ''));
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
      issues.push(`${filesForParagraph.join(', ')}: repeated paragraph detected: "${paragraph.slice(0, 120)}..."`);
    }
  }
  return { targetDate, selected: selected.length, issues };
}

async function main() {
  const dateIndex = process.argv.indexOf('--date');
  const date = dateIndex >= 0 ? process.argv[dateIndex + 1] : null;
  const result = await validateEditorialQuality({ date });
  if (result.issues.length) {
    console.error(`Editorial quality validation failed for ${result.selected} entries dated ${result.targetDate}:`);
    for (const issue of result.issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Editorial quality validation passed for ${result.selected} entries dated ${result.targetDate}.`);
}

const entrypoint = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (entrypoint && fileURLToPath(import.meta.url) === entrypoint) main();

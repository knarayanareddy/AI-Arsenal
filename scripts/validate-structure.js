#!/usr/bin/env node
import chalk from 'chalk';
import { getEntryFiles, readMarkdown, inferEntryType } from './utils/frontmatter.js';
import { REQUIRED_ENTRY_HEADINGS, extractHeadings } from './utils/markdown.js';
import { getChangedMarkdownFiles, isContentEntryCandidate } from './utils/changed-files.js';
import { fixTextFile } from './utils/formatting.js';

const AGENT_FRAMEWORK_HEADINGS = [
  'Overview',
  'Key Features',
  'Architecture Model',
  'Getting Started',
  'Best For',
  'Not Ideal For',
  'Comparison Context',
  'Resources',
  'Community Buzz'
];

// Projects-vertical reorganisation: the canonical body structure for a
// migrated project entry (see the projects-vertical-reorg brief). Applied
// only once an entry carries the new `phase` field, so unmigrated entries
// continue to validate against their pre-migration heading set during the
// folder-by-folder migration. See scripts/check-projects-migration-progress.js.
const PROJECT_HEADINGS_NEW = [
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

const PAPER_HEADINGS = [
  'The Problem It Solved',
  'Key Contribution',
  'Results / Key Numbers',
  'How to Apply This Today',
  'Code / Implementation',
  'Further Reading'
];

// Research-vertical reorganisation: the canonical body structure for a
// migrated research entry (see the research-vertical-reorg brief). Applied
// only once an entry carries the new `phase` field, so unmigrated papers
// continue to validate against PAPER_HEADINGS during the folder-by-folder
// migration. See scripts/check-research-migration-progress.js.
const RESEARCH_HEADINGS_NEW = [
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

const typeHeadings = {
  project: REQUIRED_ENTRY_HEADINGS,
  tool: REQUIRED_ENTRY_HEADINGS,
  paper: PAPER_HEADINGS,
  tip: REQUIRED_ENTRY_HEADINGS,
  'build-example': [
    "What You're Building",
    'Architecture Overview',
    'Stack',
    'Prerequisites',
    'Key Implementation Steps',
    'Gotchas & Tips',
    'Full Reference Implementations',
    'Related Entries'
  ],
  person: ['Overview', 'Why Follow', 'Notable Work', 'Channels', 'Resources'],
  digest: ['TL;DR', 'Top Projects', 'Top Tools', 'Research Highlights', 'Architecture Notes', 'Community Signals', 'What to Watch Next Month'],
  guide: REQUIRED_ENTRY_HEADINGS
};

// Research-vertical reorganisation: pull a heading's body text (between this
// heading and the next `## `) so the checks below can look at actual content,
// not just heading presence. Used only for migrated research entries.
function sectionBody(content, heading) {
  const lines = content.split(/\r?\n/);
  const startIdx = lines.findIndex((line) => line.trim() === `## ${heading}`);
  if (startIdx === -1) return null;
  const rest = lines.slice(startIdx + 1);
  const endIdx = rest.findIndex((line) => /^##\s+/.test(line));
  return (endIdx === -1 ? rest : rest.slice(0, endIdx)).join('\n').trim();
}

const BANNED_PRACTICAL_APPLICABILITY_PHRASES = [
  'engineers should be aware of this',
  'engineers should read this',
  'read this paper',
  'this paper is important and engineers should read it'
];

const BANNED_LIMITATIONS_PHRASES = ['no known limitations'];

function researchContentChecks(file, content, errors) {
  const limitations = sectionBody(content, 'Limitations & Critiques');
  if (limitations !== null) {
    if (limitations.length === 0) errors.push(`${file}: "Limitations & Critiques" section must not be empty`);
    const lower = limitations.toLowerCase();
    for (const phrase of BANNED_LIMITATIONS_PHRASES) {
      if (lower.includes(phrase)) errors.push(`${file}: "Limitations & Critiques" must not read "${phrase}" -- state author-acknowledged limitations or "No post-publication challenges identified as of last_reviewed: {date}" instead`);
    }
  }

  const reproductions = sectionBody(content, 'Reproductions & Follow-up Work');
  if (reproductions !== null && reproductions.length === 0) {
    errors.push(`${file}: "Reproductions & Follow-up Work" section must not be empty`);
  }

  const practicalApplicability = sectionBody(content, 'Practical Applicability');
  if (practicalApplicability !== null) {
    if (practicalApplicability.length === 0) errors.push(`${file}: "Practical Applicability" section must not be empty`);
    const lower = practicalApplicability.toLowerCase().trim();
    for (const phrase of BANNED_PRACTICAL_APPLICABILITY_PHRASES) {
      if (lower === phrase || lower === `${phrase}.`) errors.push(`${file}: "Practical Applicability" must answer what an engineer DOES differently, not just "${phrase}"`);
    }
  }

  const overview = sectionBody(content, 'Overview');
  if (overview !== null && overview.length === 0) errors.push(`${file}: "Overview" section must not be empty`);
}

const changedOnly = process.argv.includes('--changed-only');
const fix = process.argv.includes('--fix');
const errors = [];
let fixed = 0;
let checked = 0;

for (const file of await getEntryFiles(changedOnly ? getChangedMarkdownFiles().filter(isContentEntryCandidate) : null)) {
  if (fix && await fixTextFile(file)) fixed += 1;
  const { data, content, hasFrontmatter } = await readMarkdown(file);
  if (!hasFrontmatter) continue;
  const type = inferEntryType(file, data);
  let required;
  if (type === 'project' && data.phase) {
    // Migrated project entry: use the new canonical structure.
    required = PROJECT_HEADINGS_NEW;
  } else if (type === 'project' && data.category === 'agents' && data.subcategory === 'agent-frameworks') {
    required = AGENT_FRAMEWORK_HEADINGS;
  } else if (type === 'paper' && data.phase) {
    // Migrated research entry: use the new canonical structure.
    required = RESEARCH_HEADINGS_NEW;
  } else {
    required = typeHeadings[type] ?? REQUIRED_ENTRY_HEADINGS;
  }
  const headings = extractHeadings(content);
  for (const heading of required) {
    if (!headings.includes(heading)) errors.push(`${file}: missing required section "## ${heading}"`);
  }
  if (type === 'paper' && data.phase) researchContentChecks(file, content, errors);
  checked += 1;
}


if (errors.length) {
  console.error(chalk.red(`Markdown structure validation failed with ${errors.length} error(s):`));
  for (const error of errors) console.error(chalk.red(`- ${error}`));
  process.exit(1);
}

console.log(chalk.green(`Markdown structure validation passed. Checked ${checked} content entr${checked === 1 ? 'y' : 'ies'}.${fix ? ` Fixed ${fixed} file(s).` : ''}`));

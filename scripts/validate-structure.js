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

const PAPER_HEADINGS = [
  'The Problem It Solved',
  'Key Contribution',
  'Results / Key Numbers',
  'How to Apply This Today',
  'Code / Implementation',
  'Further Reading'
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
  const required = type === 'project' && data.category === 'agents' && data.subcategory === 'agent-frameworks'
    ? AGENT_FRAMEWORK_HEADINGS
    : (typeHeadings[type] ?? REQUIRED_ENTRY_HEADINGS);
  const headings = extractHeadings(content);
  for (const heading of required) {
    if (!headings.includes(heading)) errors.push(`${file}: missing required section "## ${heading}"`);
  }
  checked += 1;
}

if (errors.length) {
  console.error(chalk.red(`Markdown structure validation failed with ${errors.length} error(s):`));
  for (const error of errors) console.error(chalk.red(`- ${error}`));
  process.exit(1);
}

console.log(chalk.green(`Markdown structure validation passed. Checked ${checked} content entr${checked === 1 ? 'y' : 'ies'}.${fix ? ` Fixed ${fixed} file(s).` : ''}`));

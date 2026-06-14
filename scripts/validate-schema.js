#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import Ajv from 'ajv/dist/2020.js';
import chalk from 'chalk';
import { getEntryFiles, readMarkdown, inferEntryType, expectedIdFromFilename } from './utils/frontmatter.js';
import { getChangedMarkdownFiles, isContentEntryCandidate } from './utils/changed-files.js';

const schemaByType = {
  project: 'project.schema.json',
  tool: 'tool.schema.json',
  paper: 'paper.schema.json',
  tip: 'tip.schema.json',
  'build-example': 'build-example.schema.json',
  person: 'person.schema.json',
  digest: 'digest.schema.json',
  guide: 'guide.schema.json'
};

const today = new Date().toISOString().slice(0, 10);
const changedOnly = process.argv.includes('--changed-only');
const parseConcurrency = Number(process.env.AI_ARSENAL_PARSE_CONCURRENCY ?? 64);

function formatAjvError(error) {
  const loc = error.instancePath || '(root)';
  return `${loc} ${error.message}${error.params?.additionalProperty ? `: ${error.params.additionalProperty}` : ''}`;
}

function validDateString(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function crossFieldChecks(file, type, data, errors, warnings) {
  for (const field of ['added_date', 'last_reviewed', 'last_commit', 'published_date']) {
    if (data[field] && !validDateString(data[field])) errors.push(`${file}: ${field} must be a real ISO date (YYYY-MM-DD)`);
    if (data[field] && data[field] > today && field !== 'published_date') warnings.push(`${file}: ${field} is in the future relative to ${today}`);
  }

  if (typeof data.description === 'string') {
    if (data.description.trim().endsWith('.')) warnings.push(`${file}: description should be a sentence fragment without a trailing period for card/list rendering`);
    if (/\s{2,}/.test(data.description)) warnings.push(`${file}: description contains repeated whitespace`);
  }

  if (type === 'tool') {
    if (data.open_source === true && !data.source_url && !data.github_url) warnings.push(`${file}: open_source=true should include source_url or github_url`);
    if (data.free_tier === true && !data.free_tier_limits) warnings.push(`${file}: free_tier=true should describe free_tier_limits when known`);
    if (data.self_hostable === true && data.open_source !== true) warnings.push(`${file}: self_hostable=true usually implies open_source=true; verify metadata`);
  }

  if (type === 'project') {
    if (!String(data.github_url ?? '').startsWith('https://github.com/') && !(type === 'project' && (data.type === 'model' && data.hf_url || ['service', 'platform'].includes(data.type)))) warnings.push(`${file}: project github_url should be a GitHub repository URL`);
    if ((data.github_stars ?? 0) === 0 && data.status === 'active' && !(data.type === 'model' && data.hf_url) && !(data.type === 'service' && !String(data.github_url ?? '').startsWith('https://github.com/'))) warnings.push(`${file}: github_stars is 0; run update-star-counts.js before public launch`);
    if (data.last_reviewed && data.added_date && data.last_reviewed < data.added_date) errors.push(`${file}: last_reviewed cannot be earlier than added_date`);
  }

  if (type === 'paper') {
    if (data.arxiv_id && data.arxiv_url && !data.arxiv_url.includes(data.arxiv_id)) warnings.push(`${file}: arxiv_url does not include arxiv_id ${data.arxiv_id}`);
    if (data.has_code === true && !data.code_url) warnings.push(`${file}: has_code=true should include code_url`);
  }
}

const ajv = new Ajv({ allErrors: true, strict: false });
const validators = {};
for (const [type, schemaFile] of Object.entries(schemaByType)) {
  const schema = JSON.parse(await fs.readFile(path.join('schemas', schemaFile), 'utf8'));
  validators[type] = ajv.compile(schema);
}

const candidateFiles = changedOnly ? getChangedMarkdownFiles().filter(isContentEntryCandidate) : null;
const files = await getEntryFiles(candidateFiles);
const errors = [];
const warnings = [];
let checked = 0;
let cursor = 0;

async function validateFile(file) {
  const parsed = await readMarkdown(file);
  if (!parsed.hasFrontmatter) {
    errors.push(`${file}: missing YAML frontmatter. Content entries must start with ---`);
    return;
  }
  const entryType = inferEntryType(file, parsed.data);
  if (!entryType || !validators[entryType]) {
    errors.push(`${file}: unable to infer entry type from path. Move file under a schema-governed content section.`);
    return;
  }

  const expectedId = expectedIdFromFilename(file, entryType);
  if (parsed.data.id && parsed.data.id !== expectedId) {
    errors.push(`${file}: id "${parsed.data.id}" must match filename-derived id "${expectedId}"`);
  }

  const validate = validators[entryType];
  if (!validate(parsed.data)) {
    for (const error of validate.errors ?? []) errors.push(`${file}: ${formatAjvError(error)}`);
  }
  crossFieldChecks(file, entryType, parsed.data, errors, warnings);
  checked += 1;
}

async function worker() {
  while (cursor < files.length) {
    const file = files[cursor++];
    await validateFile(file);
  }
}
await Promise.all(Array.from({ length: Math.min(parseConcurrency, Math.max(1, files.length)) }, worker));

if (warnings.length) {
  console.warn(chalk.yellow(`Schema validation warnings (${warnings.length}):`));
  for (const warning of warnings) console.warn(chalk.yellow(`- ${warning}`));
}

if (errors.length) {
  console.error(chalk.red(`Schema validation failed with ${errors.length} error(s):`));
  for (const error of errors) console.error(chalk.red(`- ${error}`));
  process.exit(1);
}

console.log(chalk.green(`Schema validation passed. Checked ${checked} content entr${checked === 1 ? 'y' : 'ies'}.`));

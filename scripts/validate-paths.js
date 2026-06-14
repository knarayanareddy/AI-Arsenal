#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { glob } from 'glob';
import { getEntryFiles, readMarkdown, inferEntryType, expectedIdFromFilename, isNavigationFile } from './utils/frontmatter.js';

const errors = [];
const warnings = [];
const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;
const allowedSpecial = new Set(['_index.md', '_registry.md', 'README.md']);

for (const file of await glob('content/**/*.md', { nodir: true, posix: true })) {
  const base = path.basename(file);
  if (!allowedSpecial.has(base) && !kebab.test(base)) {
    errors.push(`${file}: filename must be kebab-case .md, except _index.md/_registry.md/README.md`);
  }
}

for (const dir of await glob('content/**/', { posix: true })) {
  const clean = dir.replace(/\/$/, '');
  if (!clean || clean === 'content') continue;
  try {
    await fs.access(path.join(clean, '_index.md'));
  } catch {
    errors.push(`${clean}: every content directory must include _index.md`);
  }
}

for (const file of await getEntryFiles()) {
  const parsed = await readMarkdown(file);
  if (!parsed.hasFrontmatter) continue;
  const type = inferEntryType(file, parsed.data);
  const expectedId = expectedIdFromFilename(file, type);
  if (parsed.data.id !== expectedId) errors.push(`${file}: id must match filename-derived id "${expectedId}"`);

  const p = file.split('/');
  if (type === 'project') {
    if (p[0] !== 'content' || p[1] !== 'projects') errors.push(`${file}: project entries must live under content/projects/`);
    if (parsed.data.category && p[2] !== parsed.data.category) errors.push(`${file}: project category "${parsed.data.category}" must match folder "${p[2]}"`);
    if (parsed.data.subcategory && p[3] !== parsed.data.subcategory) {
      const allowedAlias = parsed.data.category === 'agents' && p[3] === 'frameworks' && parsed.data.subcategory === 'agent-frameworks';
      if (!allowedAlias) warnings.push(`${file}: subcategory "${parsed.data.subcategory}" does not match folder "${p[3]}"`);
    }
  }
  if (type === 'paper' && !file.startsWith('content/research/papers/')) errors.push(`${file}: paper entries must live in content/research/papers/`);
  if (type === 'tip' && !file.startsWith('content/tips-and-tricks/')) errors.push(`${file}: tip entries must live in content/tips-and-tricks/`);
  if (type === 'build-example' && !file.startsWith(`content/build-examples/${parsed.data.difficulty}/`)) errors.push(`${file}: build example folder must match difficulty "${parsed.data.difficulty}"`);
}

for (const file of await glob('data/*.json', { nodir: true, posix: true })) {
  try { JSON.parse(await fs.readFile(file, 'utf8')); }
  catch (error) { errors.push(`${file}: invalid JSON: ${error.message}`); }
}

if (warnings.length) {
  console.warn(chalk.yellow(`Path validation warnings (${warnings.length}):`));
  for (const warning of warnings) console.warn(chalk.yellow(`- ${warning}`));
}

if (errors.length) {
  console.error(chalk.red(`Path validation failed with ${errors.length} error(s):`));
  for (const error of errors) console.error(chalk.red(`- ${error}`));
  process.exit(1);
}
console.log(chalk.green('Path validation passed.'));

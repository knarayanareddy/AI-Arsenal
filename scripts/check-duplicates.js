#!/usr/bin/env node
import chalk from 'chalk';
import { getEntryFiles, readMarkdown } from './utils/frontmatter.js';

const seen = new Map();
const errors = [];
let checked = 0;

for (const file of await getEntryFiles()) {
  const { data, hasFrontmatter } = await readMarkdown(file);
  if (!hasFrontmatter || !data.id) continue;
  if (seen.has(data.id)) errors.push(`Duplicate id "${data.id}" in ${seen.get(data.id)} and ${file}`);
  else seen.set(data.id, file);
  checked += 1;
}

if (errors.length) {
  console.error(chalk.red(`Duplicate ID check failed with ${errors.length} error(s):`));
  for (const error of errors) console.error(chalk.red(`- ${error}`));
  process.exit(1);
}

console.log(chalk.green(`Duplicate ID check passed. Checked ${checked} content entr${checked === 1 ? 'y' : 'ies'}.`));

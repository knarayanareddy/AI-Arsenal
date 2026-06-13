#!/usr/bin/env node
import chalk from 'chalk';
import { glob } from 'glob';
import { fixTextFile } from './utils/formatting.js';

const patterns = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
const defaultPatterns = ['**/*.md', '**/*.json', '**/*.yml', '**/*.yaml'];
const targetPatterns = patterns.length ? patterns : defaultPatterns;
const ignore = ['node_modules/**', '.git/**', 'dist/**', 'build/**', 'coverage/**'];
const files = new Set();

for (const pattern of targetPatterns) {
  for (const file of await glob(pattern, { nodir: true, posix: true, ignore })) files.add(file);
}

let changed = 0;
for (const file of [...files].sort()) {
  try {
    if (await fixTextFile(file)) {
      changed += 1;
      console.log(chalk.cyan(`fixed ${file}`));
    }
  } catch (error) {
    console.warn(chalk.yellow(`skipped ${file}: ${error.message}`));
  }
}

console.log(chalk.green(`Formatting fix complete. Updated ${changed} file(s).`));

#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { PUBLIC_DATA_FILES, AUXILIARY_DATA_FILES } from './utils/collections.js';

const outDir = process.argv.find((arg) => arg.startsWith('--out='))?.split('=')[1] ?? '.data-release';
await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });

const files = [...PUBLIC_DATA_FILES, ...AUXILIARY_DATA_FILES];
let copied = 0;
for (const file of files) {
  try {
    await fs.copyFile(path.join('data', file), path.join(outDir, file));
    copied += 1;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

const readme = [
  '# AI Arsenal Data Release',
  '',
  'This branch contains generated AI Arsenal JSON data files published for static consumers such as the future UI repository.',
  '',
  'All public collection files are defined by `scripts/utils/collections.js`.',
  '',
  'Canonical examples:',
  '',
  '- `index.json`',
  '- `projects.json`',
  '- `tools.json`',
  '- `architectures.json`',
  '- `benchmarks.json`',
  '- `trending.json`',
  '- `search-index.json`',
  '- `tags.json`',
  '- `stats.json`',
  '',
  `Generated at: ${new Date().toISOString()}`,
  '',
  'Source branch: main',
  '',
  'Do not edit this branch manually. It is overwritten by the `data-refresh.yml` workflow.',
  ''
].join('\n');
await fs.writeFile(path.join(outDir, 'README.md'), readme);

await fs.writeFile(path.join(outDir, '.nojekyll'), '');
console.log(chalk.green(`Prepared ${copied} public/auxiliary JSON file(s) in ${outDir}`));

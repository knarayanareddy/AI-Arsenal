#!/usr/bin/env node
import fs from 'node:fs/promises';
import chalk from 'chalk';
import { COLLECTIONS, collectionStats } from './utils/collections.js';

const entriesByType = {};
for (const collection of COLLECTIONS) {
  try {
    const json = JSON.parse(await fs.readFile(`data/${collection.file}`, 'utf8'));
    entriesByType[collection.type] = json.count ?? json.items?.length ?? 0;
  } catch {
    entriesByType[collection.type] = 0;
  }
}

const stats = {
  schema_version: '1.0.0',
  generated_at: new Date().toISOString(),
  entries: collectionStats(entriesByType)
};
await fs.writeFile('data/stats.json', `${JSON.stringify(stats, null, 2)}\n`);
console.log(chalk.green('Generated data/stats.json'));

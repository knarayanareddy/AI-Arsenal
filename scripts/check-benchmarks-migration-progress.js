#!/usr/bin/env node
import fs from 'node:fs/promises';
import chalk from 'chalk';
import { loadEntries } from './utils/entries.js';

const enforce = process.argv.includes('--enforce');

const entries = await loadEntries({ includeContent: false });
const benchmarks = entries.filter(e => e.type === 'benchmark');

const byCategory = {};
for (const b of benchmarks) {
  const cat = b.data.category || 'uncategorized';
  byCategory[cat] = (byCategory[cat] || 0) + 1;
}

const expectedCategories = [
  'general-llm',
  'code',
  'retrieval-rag',
  'agents',
  'safety',
  'multimodal',
  'evaluation-methods'
];

console.log(chalk.bold('\nBenchmarks Migration Progress\n'));
console.log(`Total benchmark entries: ${benchmarks.length}\n`);
console.log('By category:');
for (const cat of expectedCategories) {
  const count = byCategory[cat] || 0;
  const status = count > 0 ? chalk.green('✓') : chalk.yellow('○');
  console.log(`  ${status} ${cat.padEnd(20)} ${count}`);
}
const otherCats = Object.keys(byCategory).filter(c => !expectedCategories.includes(c));
if (otherCats.length) {
  console.log('\nOther:');
  for (const cat of otherCats) console.log(`  ? ${cat} ${byCategory[cat]}`);
}

const reviewed = benchmarks.filter(b => (b.data.enrichment_status||'draft') !== 'draft').length;
console.log(`\nEnrichment: ${reviewed}/${benchmarks.length} reviewed+`);

if (enforce) {
  // Phase 5 promotion: require at least 1 entry per category (7 total)
  const minEntries = 7;
  const missingCategories = expectedCategories.filter(c => (byCategory[c] || 0) === 0);
  let failed = false;
  if (benchmarks.length < minEntries) {
    console.error(chalk.red(`\nEnforce failed: need at least ${minEntries} benchmark entries, found ${benchmarks.length}`));
    failed = true;
  }
  if (missingCategories.length) {
    console.error(chalk.red(`Enforce failed: missing entries in categories: ${missingCategories.join(', ')}`));
    failed = true;
  }
  if (failed) process.exit(1);
  console.log(chalk.green('\nMigration enforce: PASS'));
} else {
  console.log(chalk.dim('\nRun with --enforce to fail CI if below threshold'));
}

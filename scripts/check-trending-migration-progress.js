#!/usr/bin/env node
// Tracks progress of the trending-vertical reorganisation: every
// content/trending/ entry should carry entry_type: "trend" and validate
// against schemas/trend.schema.json, with all three kinds represented.
//
// Usage:
//   node scripts/check-trending-migration-progress.js              # report only, exit 0
//   node scripts/check-trending-migration-progress.js --enforce     # exit 1 if below threshold
//
// Once the vertical is fully populated (all three kinds present and every
// entry carrying the required fields), CI should run this with --enforce.

import chalk from 'chalk';
import { loadEntries } from './utils/entries.js';

const enforce = process.argv.includes('--enforce');

const entries = await loadEntries({ includeContent: false });
const trends = entries.filter((e) => e.type === 'trend');

const byKind = {};
for (const t of trends) {
  const k = t.data.kind || 'uncategorized';
  byKind[k] = (byKind[k] || 0) + 1;
}

const expectedKinds = ['weekly-snapshot', 'hall-of-fame', 'source-feed'];

console.log(chalk.bold('\nTrending Migration Progress\n'));
console.log(`Total trend entries: ${trends.length}\n`);
console.log('By kind:');
for (const k of expectedKinds) {
  const count = byKind[k] || 0;
  const status = count > 0 ? chalk.green('✓') : chalk.yellow('○');
  console.log(`  ${status} ${k.padEnd(18)} ${count}`);
}
const other = Object.keys(byKind).filter((k) => !expectedKinds.includes(k));
if (other.length) {
  console.log('\nOther:');
  for (const k of other) console.log(`  ? ${k} ${byKind[k]}`);
}

// Required-field integrity (mirrors other verticals' migration guards).
const requiredFields = ['id', 'title', 'kind', 'status', 'as_of', 'signals_used', 'sources', 'last_reviewed', 'added_date', 'added_by'];
let incomplete = 0;
for (const t of trends) {
  const missing = requiredFields.filter((f) => t.data[f] === undefined);
  if (missing.length > 0) {
    incomplete += 1;
    console.warn(chalk.yellow(`- ${t.data.id} (${t.file}) missing: ${missing.join(', ')}`));
  }
}
console.log(`\nField completeness: ${trends.length - incomplete}/${trends.length} carry all required fields`);

if (enforce) {
  const missingKinds = expectedKinds.filter((k) => (byKind[k] || 0) === 0);
  let failed = false;
  if (trends.length < 4) {
    console.error(chalk.red(`\nEnforce failed: need at least 4 trend entries, found ${trends.length}`));
    failed = true;
  }
  if (missingKinds.length) {
    console.error(chalk.red(`Enforce failed: missing kinds: ${missingKinds.join(', ')}`));
    failed = true;
  }
  if (incomplete > 0) {
    console.error(chalk.red(`Enforce failed: ${incomplete} entr${incomplete === 1 ? 'y' : 'ies'} missing required fields`));
    failed = true;
  }
  if (failed) process.exit(1);
  console.log(chalk.green('\nMigration enforce: PASS'));
} else {
  console.log(chalk.dim('\nRun with --enforce to fail CI if below threshold'));
}

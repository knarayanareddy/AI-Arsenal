#!/usr/bin/env node
import fs from 'node:fs/promises';
import chalk from 'chalk';
import { differenceInDays, parseISO, isValid } from 'date-fns';
import { loadEntries } from './utils/entries.js';

const thresholdArg = process.argv.find((arg) => arg.startsWith('--threshold='));
const threshold = Number(thresholdArg?.split('=')[1] ?? 90);
const fail = process.argv.includes('--fail');
const now = new Date();
const stale = [];
const invalid = [];

for (const entry of await loadEntries({ includeContent: false })) {
  const dateString = entry.data.last_reviewed ?? entry.data.added_date ?? entry.data.published_date;
  if (!dateString) continue;
  const date = parseISO(dateString);
  if (!isValid(date)) { invalid.push({ id: entry.data.id, path: entry.file, date: dateString }); continue; }
  const age_days = differenceInDays(now, date);
  if (age_days > threshold) stale.push({ id: entry.data.id, type: entry.type, path: entry.file, last_reviewed: dateString, age_days });
}

const report = { generated_at: now.toISOString(), threshold_days: threshold, stale_count: stale.length, invalid_dates: invalid, stale_entries: stale };
await fs.mkdir('data', { recursive: true });
await fs.writeFile('data/stale-report.json', `${JSON.stringify(report, null, 2)}\n`);

if (invalid.length) {
  console.error(chalk.red(`Found ${invalid.length} invalid date(s).`));
  if (fail) process.exit(1);
}
if (stale.length) {
  console.log(chalk.yellow(`Found ${stale.length} stale entr${stale.length === 1 ? 'y' : 'ies'} older than ${threshold} days. Report: data/stale-report.json`));
  for (const item of stale.slice(0, 25)) console.log(`- ${item.path}: ${item.age_days} days`);
  if (fail) process.exit(1);
} else {
  console.log(chalk.green('No stale entries found.'));
}

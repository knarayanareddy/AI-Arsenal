#!/usr/bin/env node
// Populates the `alternatives` frontmatter field for migrated tool entries
// using the comparison data already curated in the content/tools/by-job/
// guide pages (each guide's "**Alternatives:** X, Y, Z" line). Per Curator
// Rule C-2, only IDs that already resolve to a real catalog entry are
// written; nothing is invented.
//
// Usage: node scripts/apply-tool-alternatives.js [--dry-run]

import fs from 'node:fs/promises';
import { glob } from 'glob';
import matter from 'gray-matter';
import chalk from 'chalk';

const dryRun = process.argv.includes('--dry-run');
const altMap = JSON.parse(await fs.readFile('.migration/alternatives-from-guides.json', 'utf8'));

const files = await glob('content/tools/*/*.md', {
  posix: true,
  ignore: ['content/tools/*/_index.md']
});

// Verify every catalog id referenced actually exists (defense in depth,
// even though alt-map generation already filtered against the catalog).
const existingIds = new Set();
for (const file of files) {
  const { data } = matter(await fs.readFile(file, 'utf8'));
  if (data.id) existingIds.add(data.id);
}

let changed = 0;
for (const file of files) {
  const raw = await fs.readFile(file, 'utf8');
  const { data } = matter(raw);
  const id = data.id;
  const alts = (altMap[id] ?? []).filter((a) => existingIds.has(a));
  if (alts.length === 0) continue;

  // Only fill in if currently empty, to avoid clobbering any future manual edits.
  const emptyArrayLine = /^alternatives: \[\]$/m;
  if (!emptyArrayLine.test(raw)) continue;

  const replacement = `alternatives: [${alts.join(', ')}]`;
  const next = raw.replace(emptyArrayLine, replacement);
  if (next !== raw) {
    changed += 1;
    if (!dryRun) await fs.writeFile(file, next);
  }
}

console.log(chalk.green(`${dryRun ? '[DRY RUN] ' : ''}Populated alternatives for ${changed} tool entries.`));

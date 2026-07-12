#!/usr/bin/env node
// One-time mechanical rename: `type:` -> `artifact_type:` in every
// content/projects/**/*.md frontmatter block. This frees up `type` for the
// new phase-driving classification field, matching the tools vertical's
// `phase` field. See TAXONOMY.md "Project Artifact Types" for the rationale.
//
// Usage: node scripts/rename-project-type-field.js [--dry-run]

import fs from 'node:fs/promises';
import { glob } from 'glob';
import matter from './utils/safe-matter.js';
import chalk from 'chalk';

const dryRun = process.argv.includes('--dry-run');
const files = await glob('content/projects/**/*.md', { posix: true, ignore: ['**/_index.md', '**/_registry.md'] });

let changed = 0;
for (const file of files) {
  const raw = await fs.readFile(file, 'utf8');
  const parsed = matter(raw);
  if (parsed.data.type === undefined) continue;

  const frontmatterMatch = raw.match(/^(---\n[\s\S]*?\n---\n)/);
  if (!frontmatterMatch) continue;
  const [, frontmatterBlock] = frontmatterMatch;

  // Rename the `type:` key to `artifact_type:` in place, preserving the
  // original line's value formatting exactly (quoted or bare).
  const renamed = frontmatterBlock.replace(/^type:(\s*.*)$/m, 'artifact_type:$1');
  if (renamed === frontmatterBlock) {
    console.error(chalk.red(`Could not find a bare "type:" line to rename in ${file}`));
    process.exitCode = 1;
    continue;
  }

  const newRaw = raw.replace(frontmatterBlock, renamed);
  changed += 1;
  if (!dryRun) await fs.writeFile(file, newRaw);
}

console.log(chalk.green(`${dryRun ? '[DRY RUN] ' : ''}Renamed type -> artifact_type in ${changed} project entries.`));

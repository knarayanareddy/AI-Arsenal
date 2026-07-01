#!/usr/bin/env node
// Rewrites Markdown links pointing at a migrated project's old
// content/projects/{category}/{subcategory}/{id}.md location to its new
// content/projects/{phase-folder}/{id}.md location, and redirects any link
// to a project id that was merged away (per the migration-completion-report)
// to the surviving canonical id.
//
// Usage: node scripts/fix-project-link-paths.js [--dry-run]

import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';
import chalk from 'chalk';

const dryRun = process.argv.includes('--dry-run');

// id -> new phase folder (only for ids migrated so far; extended per phase
// as later folders are migrated).
const idToPhaseFolder = JSON.parse(await fs.readFile('.migration/proj-id-to-phase-folder.json', 'utf8').catch(() => '{}'));

// id -> id, for entries deleted via merge/consolidation during migration.
const MERGE_REDIRECTS = {
  'llama-models': 'llama-3',
  'mistral-inference': 'mistral-models',
  ragas: 'ragas-rag-evaluation',
  'haystack-agents': 'haystack',
  'langchain-rag': 'langchain'
};

const files = await glob('**/*.md', { posix: true, nodir: true, ignore: ['node_modules/**', '.git/**'] });

const linkPattern = /\(([^()\s]*?projects\/[a-z0-9-]+\/(?:[a-z0-9-]+\/)?([a-z0-9-]+)\.md)\)/g;

let filesChanged = 0;
let linksChanged = 0;

for (const file of files) {
  const raw = await fs.readFile(file, 'utf8');
  let changed = false;
  const next = raw.replace(linkPattern, (match, fullLinkPath, rawId) => {
    const id = MERGE_REDIRECTS[rawId] ?? rawId;
    const phase = idToPhaseFolder[id];
    if (!phase) return match; // not a migrated/merged project id; leave as-is
    const newTarget = `content/projects/${phase}/${id}.md`;
    const newRelative = path.relative(path.dirname(file), newTarget).split(path.sep).join('/');
    const finalRelative = newRelative.startsWith('.') ? newRelative : `./${newRelative}`;
    changed = true;
    linksChanged += 1;
    return `(${finalRelative})`;
  });
  if (changed) {
    filesChanged += 1;
    if (!dryRun) await fs.writeFile(file, next);
  }
}

console.log(chalk.green(`${dryRun ? '[DRY RUN] ' : ''}Rewrote ${linksChanged} link(s) across ${filesChanged} file(s).`));

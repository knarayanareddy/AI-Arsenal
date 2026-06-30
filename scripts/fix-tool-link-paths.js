#!/usr/bin/env node
// Rewrites every Markdown link that points at a migrated tool's old
// content/tools/by-job/{id}.md location to its new content/tools/{phase}/{id}.md
// location. Handles relative link prefixes of any depth (./, ../../, etc.)
// by matching on the by-job/{id}.md suffix and recomputing the relative path
// for each file individually.
//
// Usage: node scripts/fix-tool-link-paths.js [--dry-run]

import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';
import chalk from 'chalk';

const dryRun = process.argv.includes('--dry-run');
const idToPhase = JSON.parse(await fs.readFile('.migration/id-to-phase.json', 'utf8'));

const files = await glob('**/*.md', {
  posix: true,
  nodir: true,
  ignore: ['node_modules/**', '.git/**']
});

// Matches links that explicitly reference the old by-job/ path (any relative
// depth), e.g. ../../tools/by-job/foo.md or tools/by-job/foo.md.
const explicitLinkPattern = /\(([^()\s]*?tools\/by-job\/([a-z0-9-]+)\.md)\)/g;
// Matches bare same-directory links, e.g. ./foo.md or (foo.md), used by the
// by-job guide pages (which live alongside the tools they used to co-locate
// with) to reference sibling tool entries that have now moved out.
const bareLinkPattern = /\(\.?\/?([a-z0-9-]+)\.md\)/g;

let filesChanged = 0;
let linksChanged = 0;

for (const file of files) {
  const raw = await fs.readFile(file, 'utf8');
  let changed = false;
  let next = raw.replace(explicitLinkPattern, (match, fullLinkPath, id) => {
    const phase = idToPhase[id];
    if (!phase) return match;
    const newTarget = `content/tools/${phase}/${id}.md`;
    const newRelative = path.relative(path.dirname(file), newTarget).split(path.sep).join('/');
    const finalRelative = newRelative.startsWith('.') ? newRelative : `./${newRelative}`;
    changed = true;
    linksChanged += 1;
    return `(${finalRelative})`;
  });

  // Only apply the bare-link pass to files that themselves live in
  // content/tools/by-job/ (the job-guide pages), since elsewhere a bare
  // "(foo.md)"-shaped match is ambiguous and could be a false positive.
  if (file.startsWith('content/tools/by-job/')) {
    next = next.replace(bareLinkPattern, (match, id) => {
      const phase = idToPhase[id];
      if (!phase) return match; // not a migrated tool id; leave alone (e.g. links to other guides)
      const newTarget = `content/tools/${phase}/${id}.md`;
      const newRelative = path.relative(path.dirname(file), newTarget).split(path.sep).join('/');
      const finalRelative = newRelative.startsWith('.') ? newRelative : `./${newRelative}`;
      changed = true;
      linksChanged += 1;
      return `(${finalRelative})`;
    });
  }

  if (changed) {
    filesChanged += 1;
    if (!dryRun) await fs.writeFile(file, next);
  }
}

console.log(chalk.green(`${dryRun ? '[DRY RUN] ' : ''}Rewrote ${linksChanged} link(s) across ${filesChanged} file(s).`));

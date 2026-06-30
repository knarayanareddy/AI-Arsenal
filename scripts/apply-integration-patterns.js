#!/usr/bin/env node
// Enriches the "Integration Patterns" section with concrete links to a
// tool's alternatives and integrates_with entries (resolved by ID against
// the catalog), replacing the generic boilerplate left over from the
// original population pass.
//
// Usage: node scripts/apply-integration-patterns.js [--dry-run]

import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';
import matter from 'gray-matter';
import chalk from 'chalk';

const dryRun = process.argv.includes('--dry-run');

const files = await glob('content/tools/*/*.md', {
  posix: true,
  ignore: ['content/tools/*/_index.md']
});

const idToFile = {};
for (const file of files) {
  const { data } = matter(await fs.readFile(file, 'utf8'));
  if (data.id) idToFile[data.id] = file;
}

function rel(fromFile, toFile) {
  let r = path.relative(path.dirname(fromFile), toFile).split(path.sep).join('/');
  if (!r.startsWith('.')) r = `./${r}`;
  return r;
}

let changed = 0;
for (const file of files) {
  const raw = await fs.readFile(file, 'utf8');
  const parsed = matter(raw);
  const { data } = parsed;
  const alternatives = (data.alternatives ?? []).filter((id) => idToFile[id]);
  if (alternatives.length === 0) continue; // nothing new to add

  const frontmatterMatch = raw.match(/^(---\n[\s\S]*?\n---\n)/);
  if (!frontmatterMatch) continue;
  const frontmatterBlock = frontmatterMatch[1];
  let body = parsed.content;

  const altLinks = alternatives.map((id) => {
    const altFile = idToFile[id];
    const altData = matter.read(altFile).data;
    return `[${altData.name}](${rel(file, altFile)})`;
  });

  const integrationBlock = `- Compare against ${altLinks.join(', ')} before adopting — they solve the same job in this phase.\n- Link this tool from job guides using its canonical ID \`${data.id}\`.\n- Record pricing, hosting, and data-retention assumptions before production adoption.`;

  const next = body.replace(
    /## Integration Patterns\n\n[\s\S]*?(?=\n## )/,
    `## Integration Patterns\n\n${integrationBlock}\n\n`
  );

  if (next !== body) {
    const newFile = `${frontmatterBlock}\n${next.replace(/^\n+/, '')}`;
    changed += 1;
    if (!dryRun) await fs.writeFile(file, newFile);
  }
}

console.log(chalk.green(`${dryRun ? '[DRY RUN] ' : ''}Updated Integration Patterns for ${changed} tool entries.`));

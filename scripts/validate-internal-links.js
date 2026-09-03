#!/usr/bin/env node
// Internal link validation for the Markdown catalog.
//
// Scope: every `content/**/*.md` file, including the generated/tracked
// `_index.md` and `_registry.md` navigation files (they are rendered on GitHub
// and shipped into `data/*.json` body_html, so a dead link there is a real dead
// link). `templates/` is deliberately excluded: its links are written relative
// to the *destination* the scaffold copies them to, not to `templates/`.
//
// Absolute http(s) URLs remain the job of `scripts/check-links.js`.
import path from 'node:path';
import chalk from 'chalk';
import { getMarkdownFiles, CONTENT_GLOB } from './utils/frontmatter.js';
import { getChangedMarkdownFiles } from './utils/changed-files.js';
import { findBrokenInternalLinks } from './utils/internal-links.js';

const changedOnly = process.argv.includes('--changed-only');

function inScope(file) {
  return file.startsWith('content/') && file.endsWith('.md');
}

const files = changedOnly
  ? getChangedMarkdownFiles().filter(inScope)
  : (await getMarkdownFiles(CONTENT_GLOB)).filter(inScope);

const { broken, checkedFiles, checkedLinks } = findBrokenInternalLinks(files);

if (broken.length) {
  const byFile = new Map();
  for (const item of broken) {
    if (!byFile.has(item.file)) byFile.set(item.file, []);
    byFile.get(item.file).push(item);
  }
  console.error(chalk.red(`Internal link validation failed: ${broken.length} broken link(s) in ${byFile.size} file(s).`));
  for (const [file, items] of [...byFile.entries()].sort()) {
    console.error(chalk.red(`- ${file}`));
    for (const item of items) {
      const relative = path.relative(process.cwd(), item.resolved);
      console.error(chalk.red(`    ${item.target}  ->  ${relative} (not found)`));
    }
  }
  console.error('');
  console.error(chalk.yellow('Links must resolve relative to the linking file (GitHub renders them that way).'));
  console.error(chalk.yellow('A target that only resolves from the repository root is still broken.'));
  process.exit(1);
}

console.log(chalk.green(`Internal link validation passed. Checked ${checkedFiles} file(s), ${checkedLinks} relative link(s).`));

#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';
import { readMarkdown } from './utils/frontmatter.js';
import { loadEntries } from './utils/entries.js';
import { expectedBlock, START, END } from './generate-tools-by-job-tables.js';

async function main() {
  const entries = await loadEntries();
  const tools = entries.filter((e) => e.type === 'tool');
  const files = (await glob('content/tools/by-job/*.md', { posix: true }))
    .filter((f) => path.basename(f) !== '_index.md')
    .sort();
  let failed = false;
  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    const body = m ? m[2] : raw;
    const { data } = await readMarkdown(file);
    const jobId = data.id;
    if (!jobId) {
      console.error(`by-job tables out of date; run generate-tools-by-job-tables.js (no id: ${file})`);
      failed = true;
      continue;
    }
    const idxStart = body.indexOf(START);
    const idxEnd = body.indexOf(END);
    if (idxStart === -1 || idxEnd === -1) {
      console.error(`by-job tables out of date; run generate-tools-by-job-tables.js (missing markers: ${file})`);
      failed = true;
      continue;
    }
    const actual = body.slice(idxStart, idxEnd + END.length);
    const expected = expectedBlock(jobId, tools, file);
    if (actual.trimEnd() !== expected.trimEnd()) {
      console.error(`by-job tables out of date; run generate-tools-by-job-tables.js (stale block: ${file})`);
      failed = true;
    }
  }
  if (failed) {
    console.error('by-job tables out of date; run generate-tools-by-job-tables.js');
    process.exit(1);
  }
  console.log('All by-job matching-tools tables are up to date.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

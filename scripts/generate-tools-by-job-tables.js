#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import { readMarkdown } from './utils/frontmatter.js';
import { loadEntries } from './utils/entries.js';
import { escapeMarkdownCell } from './utils/markdown-escape.js';

export const START = '<!-- AUTO-GENERATED MATCHING TOOLS BELOW — do not edit -->';
export const END = '<!-- AUTO-GENERATED MATCHING TOOLS ABOVE — do not edit -->';

function rel(fromFile, toFile) {
  let r = path.relative(path.dirname(fromFile), toFile).split(path.sep).join('/');
  if (!r.startsWith('.')) r = `./${r}`;
  return r;
}

function cell(value) {
  return escapeMarkdownCell(value);
}

function tableBlock(tools, jobId, guidePath) {
  const rows = tools
    .filter((t) => (t.data.job ?? []).includes(jobId))
    .slice()
    .sort((a, b) => String(a.data.id).localeCompare(String(b.data.id)))
    .map((t) => {
      const d = t.data;
      const link = `[${cell(d.name ?? d.id)}](${rel(guidePath, t.file)})`;
      const phase = cell((d.phase ?? '').replace(/-/g, ' '));
      const cost = cell(d.cost_model ?? '');
      const free = d.free_tier ? 'Yes' : 'No';
      const self = d.self_hostable ? 'Yes' : 'No';
      const oss = d.open_source ? 'Yes' : 'No';
      const stack = cell((d.stack ?? []).join(', '));
      const verdict = cell(d.verdict ?? '');
      return `| ${link} | ${phase} | ${cost} | ${free} | ${self} | ${oss} | ${stack} | ${verdict} |`;
    });
  const header = '| Tool | Phase | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |';
  const sep = '|---|---|---|---|---|---|---|---|';
  if (rows.length === 0) return `${header}\n${sep}`;
  return [header, sep, ...rows].join('\n');
}

// Shared source of truth for the generated block (between + including the two
// markers). Used by both the generator (to write) and the checker (to verify),
// so the two can never drift.
export function expectedBlock(jobId, tools, guidePath) {
  const intro = `This table is exhaustive for tools tagged with job = ${jobId}.`;
  return `${START}\n${intro}\n\n${tableBlock(tools, jobId, guidePath)}\n${END}`;
}

function splitFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { frontmatter: '', body: raw };
  return { frontmatter: m[1], body: m[2] };
}

async function main() {
  const entries = await loadEntries();
  const tools = entries.filter((e) => e.type === 'tool');
  const files = (await glob('content/tools/by-job/*.md', { posix: true }))
    .filter((f) => path.basename(f) !== '_index.md')
    .sort();
  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const { frontmatter, body } = splitFrontmatter(raw);
    const { data } = await readMarkdown(file);
    const jobId = data.id;
    if (!jobId) {
      console.error(`Skip ${file}: no id in frontmatter`);
      continue;
    }
    const block = expectedBlock(jobId, tools, file);
    let newBody;
    const hasStart = body.includes(START);
    const hasEnd = body.includes(END);
    if (hasStart && hasEnd) {
      // Idempotent update: only the block between markers is regenerated.
      const idxStart = body.indexOf(START);
      const idxEnd = body.indexOf(END);
      newBody = body.slice(0, idxStart) + block + body.slice(idxEnd + END.length);
    } else {
      // First run (or partial markers): strip any stray markers, then insert
      // the full block immediately before '## Use Cases'. Curated content
      // (including non-tool/project links above) is left untouched.
      const cleaned = body
        .replace(new RegExp(`${START}|${END}`, 'g'), '')
        .replace(/\n{3,}/g, '\n\n');
      newBody = cleaned.replace(/(^|\n)(## Use Cases)/, `$1\n${block}\n\n$2`);
    }
    const newRaw = `---\n${frontmatter}\n---\n${newBody}`.replace(/\n+$/, '\n');
    await fs.writeFile(file, newRaw);
  }
  console.log(`Updated ${files.length} by-job guides with generated matching-tools tables.`);
}

const invokedDirectly =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (invokedDirectly) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

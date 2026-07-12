#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';
import { glob } from 'glob';
import matter from 'gray-matter';
import { loadEntries } from './utils/entries.js';

const entries = await loadEntries();

// Marker that separates hand-authored "curated" index content (What belongs
// here / What does NOT belong here / Decision guidance) from the
// auto-generated registry table below it. Index files using this template
// (see templates/README.md and the tools-vertical reorganisation) keep their
// authored prose untouched; generate-toc.js only ever rewrites content
// after this marker.
const REGISTRY_MARKER = '<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->';

function rel(fromFile, toFile) {
  let r = path.relative(path.dirname(fromFile), toFile).split(path.sep).join('/');
  if (!r.startsWith('.')) r = `./${r}`;
  return r;
}

function table(rows, fromFile) {
  return ['| ID | Name | Description |', '|---|---|---|', ...rows.map((e) => `| \`${e.data.id}\` | [${e.data.name ?? e.data.title}](${rel(fromFile, e.file)}) | ${String(e.data.description ?? e.data.tldr ?? e.data.summary ?? '').replace(/\\/g, '\\\\').replace(/\|/g, '\\|')} |`)].join('\n');
}

const projects = entries.filter((e) => e.type === 'project').sort((a, b) => a.data.id.localeCompare(b.data.id));
const tools = entries.filter((e) => e.type === 'tool').sort((a, b) => a.data.id.localeCompare(b.data.id));
await fs.writeFile('content/projects/_registry.md', `# Projects Registry\n\n> Auto-generated master list. Do not edit manually.\n\n${projects.length ? table(projects, 'content/projects/_registry.md') : '_No project entries yet._'}\n`);
await fs.writeFile('content/tools/_registry.md', `# Tools Registry\n\n> Auto-generated master list. Do not edit manually.\n\n${tools.length ? table(tools, 'content/tools/_registry.md') : '_No tool entries yet._'}\n`);

function buildRegistryBlock(indexFile, dir, title) {
  const local = entries.filter((e) => e.file.startsWith(`${dir}/`));
  const recent = [...local].sort((a, b) => String(b.data.added_date ?? '').localeCompare(String(a.data.added_date ?? ''))).slice(0, 10);
  const browse = local.map((e) => `- [${e.data.name ?? e.data.title}](${rel(indexFile, e.file)}) — ${e.data.description ?? e.data.tldr ?? e.data.summary ?? ''}`).join('\n') || '_No entries yet._';
  const popular = [...local].filter((e) => e.data.github_stars !== undefined).sort((a, b) => (b.data.github_stars ?? 0) - (a.data.github_stars ?? 0)).slice(0, 10).map((e) => `- [${e.data.name ?? e.data.title}](${rel(indexFile, e.file)}) — ⭐ ${e.data.github_stars ?? 0}`).join('\n') || '_No star-tracked entries yet._';
  return `## ${title} in This Phase\n\n### Recently Added\n\n${recent.map((e) => `- [${e.data.name ?? e.data.title}](${rel(indexFile, e.file)})`).join('\n') || '_No entries yet._'}\n\n### Most Popular\n\n${popular}\n\n### Browse All\n\n${browse}\n`;
}

for (const indexFile of await glob('content/**/_index.md', { nodir: true, posix: true })) {
  const dir = path.dirname(indexFile);
  const title = path.basename(dir) === 'content' ? 'Content' : path.basename(dir).replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  let existingRaw = '';
  try { existingRaw = await fs.readFile(indexFile, 'utf8'); } catch { /* new file */ }
  const parsed = matter(existingRaw || '---\n---\n');
  const isCurated = parsed.data.auto_generated === false && existingRaw.includes(REGISTRY_MARKER);

  if (isCurated) {
    // Preserve everything up to and including the marker verbatim; only
    // regenerate the registry list below it.
    const [authoredPart] = existingRaw.split(REGISTRY_MARKER);
    const registryBlock = buildRegistryBlock(indexFile, dir, title.replace(/ Tools$/, ''));
    await fs.writeFile(indexFile, `${authoredPart.trimEnd()}\n\n${REGISTRY_MARKER}\n\n${registryBlock}`);
    continue;
  }

  const local = entries.filter((e) => e.file.startsWith(`${dir}/`));
  const directDirs = (await glob(`${dir}/*/`, { posix: true })).map((d) => d.replace(/\/$/, '')).sort();
  const navRows = directDirs.map((d) => {
    const count = entries.filter((e) => e.file.startsWith(`${d}/`)).length;
    return `| [${path.basename(d).replace(/-/g, ' ')}](./${path.basename(d)}/) | ${count} entries | ${new Date().toISOString().slice(0, 10)} |`;
  });
  const recent = [...local].sort((a, b) => String(b.data.added_date ?? '').localeCompare(String(a.data.added_date ?? ''))).slice(0, 10);
  const browse = local.map((e) => `- [${e.data.name ?? e.data.title}](${rel(indexFile, e.file)}) — ${e.data.description ?? e.data.tldr ?? e.data.summary ?? ''}`).join('\n') || '_No entries yet._';
  const content = `# ${title}\n\n> Navigation file for the ${title} section. This file is auto-generated and is not a content entry.\n\n## Quick Navigation\n\n| Sub-section | Count | Last Updated |\n|---|---:|---|\n${navRows.join('\n') || '| _No sub-sections_ | 0 entries | — |'}\n\n## Recently Added\n\n${recent.map((e) => `- [${e.data.name ?? e.data.title}](${rel(indexFile, e.file)})`).join('\n') || '_No entries yet._'}\n\n## Most Popular\n\n${[...local].filter((e) => e.data.github_stars !== undefined).sort((a, b) => (b.data.github_stars ?? 0) - (a.data.github_stars ?? 0)).slice(0, 10).map((e) => `- [${e.data.name ?? e.data.title}](${rel(indexFile, e.file)}) — ⭐ ${e.data.github_stars ?? 0}`).join('\n') || '_No star-tracked entries yet._'}\n\n## Browse All\n\n${browse}\n`;
  await fs.writeFile(indexFile, content);
}

console.log(chalk.green(`Generated registries and ${await glob('content/**/_index.md', { nodir: true, posix: true }).then((x) => x.length)} index files.`));


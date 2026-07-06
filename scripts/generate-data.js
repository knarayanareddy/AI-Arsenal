#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { remark } from 'remark';
import html from 'remark-html';
import chalk from 'chalk';
import { loadEntries, SCHEMA_VERSION, entryDisplayName, entryDescription, entryDate, canonicalUrl, writeJson, publicEntry } from './utils/entries.js';
import { stripMarkdown, extractHeadings } from './utils/markdown.js';
import { sanitizeBodyHtml } from './utils/html-sanitizer.js';

const generatedAt = new Date().toISOString();
const collections = { project: [], tool: [], paper: [], tip: [], person: [], digest: [], 'build-example': [], guide: [], architecture: [] };
const entries = [];

function readingTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return { words, minutes: Math.max(1, Math.ceil(words / 220)) };
}

async function renderSafeHtml(markdown) {
  // remark-html sanitize option is no-op in v14+, so we explicitly sanitize.
  const raw = await remark().use(html).process(markdown);
  return sanitizeBodyHtml(String(raw));
}

for (const entry of await loadEntries()) {
  if (!collections[entry.type]) continue;
  const bodyText = stripMarkdown(entry.content ?? '');
  const rt = readingTime(bodyText);
  const item = {
    ...entry.data,
    entry_type: entry.type,
    path: entry.file,
    url: canonicalUrl(entry.file),
    slug: path.basename(entry.file, '.md'),
    section_path: path.dirname(entry.file),
    display_name: entryDisplayName(entry.data),
    summary: entryDescription(entry.data),
    last_updated: entryDate(entry.data),
    headings: extractHeadings(entry.content ?? ''),
    reading_time_minutes: rt.minutes,
    word_count: rt.words,
    body_html: await renderSafeHtml(entry.content ?? ''),
    body_text: bodyText
  };
  collections[entry.type].push(item);
  entries.push(publicEntry(entry, {
    category: entry.data.category ?? entry.data.section ?? null,
    maturity: entry.data.maturity ?? null,
    cost_model: entry.data.cost_model ?? null,
    status: entry.data.status ?? null,
    featured: entry.data.featured ?? false
  }));
}

await fs.mkdir('data', { recursive: true });

const totals = {
  total_projects: collections.project.length,
  total_tools: collections.tool.length,
  total_papers: collections.paper.length,
  total_tips: collections.tip.length,
  total_people: collections.person.length,
  total_digests: collections.digest.length,
  total_guides: collections.guide.length,
  total_build_examples: collections['build-example'].length,
  total_architectures: collections.architecture.length
};

await writeJson('data/index.json', {
  meta: { generated_at: generatedAt, ...totals, schema_version: SCHEMA_VERSION },
  entries: entries.sort((a, b) => String(a.id).localeCompare(String(b.id)))
});

const map = { projects: 'project', tools: 'tool', papers: 'paper', tips: 'tip', people: 'person', digests: 'digest', 'build-examples': 'build-example', guides: 'guide', architectures: 'architecture' };
for (const [filePrefix, type] of Object.entries(map)) {
  const items = collections[type].sort((a, b) => String(a.id).localeCompare(String(b.id)));
  await writeJson(`data/${filePrefix}.json`, { schema_version: SCHEMA_VERSION, generated_at: generatedAt, count: items.length, items });
}

const tagCounts = new Map();
for (const entry of entries) {
  for (const tag of entry.tags ?? []) {
    const record = tagCounts.get(tag) ?? {
      id: tag,
      label: tag.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      count: 0,
      types: {},
      entries: []
    };
    record.count += 1;
    record.types[entry.type] = (record.types[entry.type] ?? 0) + 1;
    record.entries.push(entry.id);
    tagCounts.set(tag, record);
  }
}
await writeJson('data/tags.json', { schema_version: SCHEMA_VERSION, generated_at: generatedAt, tags: [...tagCounts.values()].sort((a, b) => a.id.localeCompare(b.id)) });
await writeJson('data/stats.json', {
  schema_version: SCHEMA_VERSION,
  generated_at: generatedAt,
  entries: {
    total: entries.length,
    projects: collections.project.length,
    tools: collections.tool.length,
    papers: collections.paper.length,
    tips: collections.tip.length,
    people: collections.person.length,
    digests: collections.digest.length,
    guides: collections.guide.length,
    build_examples: collections['build-example'].length,
    architectures: collections.architecture.length
  },
  tags: { total: tagCounts.size },
  content: { total_words: Object.values(collections).flat().reduce((sum, item) => sum + (item.word_count ?? 0), 0) }
});

console.log(chalk.green(`Generated data layer for ${entries.length} entries.`));

#!/usr/bin/env node
import fs from 'node:fs/promises';
import chalk from 'chalk';
import { truncate } from './utils/markdown-escape.js';

const datasets = ['projects', 'tools', 'papers', 'tips', 'people', 'digests', 'guides', 'build-examples'];
const docs = [];

for (const dataset of datasets) {
  try {
    const json = JSON.parse(await fs.readFile(`data/${dataset}.json`, 'utf8'));
    for (const item of json.items ?? []) {
      const type = item.entry_type ?? dataset.replace(/s$/, '');
      const name = item.name ?? item.title ?? item.display_name ?? item.id;
      const description = item.description ?? item.tldr ?? item.summary ?? '';
      const tags = item.tags ?? [];
      docs.push({
        id: item.id,
        type,
        name,
        title: name,
        description,
        tags,
        category: item.category ?? item.section ?? null,
        subcategory: item.subcategory ?? null,
        maturity: item.maturity ?? null,
        cost_model: item.cost_model ?? null,
        status: item.status ?? null,
        phase: item.phase ?? null,
        audience: item.audience ?? null,
        path: item.path,
        url: item.url,
        boost_title: name,
        boost_tags: tags.join(' '),
        boost_description: description,
        // S-10 fix: truncate body text in the lightweight index.
        body: [name, description, tags.join(' '), item.category, item.subcategory, item.section, truncate(item.body_text ?? '', 600)].filter(Boolean).join(' ')
      });
    }
  } catch {}
}

const facets = {
  types: {}, tags: {}, categories: {}, maturity: {}, cost_model: {}, status: {}, phase: {}, audience: {}
};
for (const doc of docs) {
  facets.types[doc.type] = (facets.types[doc.type] ?? 0) + 1;
  for (const tag of doc.tags ?? []) facets.tags[tag] = (facets.tags[tag] ?? 0) + 1;
  if (doc.category) facets.categories[doc.category] = (facets.categories[doc.category] ?? 0) + 1;
  if (doc.maturity) facets.maturity[doc.maturity] = (facets.maturity[doc.maturity] ?? 0) + 1;
  if (doc.cost_model) facets.cost_model[doc.cost_model] = (facets.cost_model[doc.cost_model] ?? 0) + 1;
  if (doc.status) facets.status[doc.status] = (facets.status[doc.status] ?? 0) + 1;
  if (doc.phase) facets.phase[doc.phase] = (facets.phase[doc.phase] ?? 0) + 1;
  for (const a of doc.audience ?? []) facets.audience[a] = (facets.audience[a] ?? 0) + 1;
}

await fs.writeFile('data/search-index.json', `${JSON.stringify({
  version: '1.0.0',
  engine: 'flexsearch',
  generated_at: new Date().toISOString(),
  config: {
    document: {
      id: 'id',
      index: [
        { field: 'name', tokenize: 'forward', resolution: 9 },
        { field: 'description', tokenize: 'strict', resolution: 5 },
        { field: 'tags', tokenize: 'strict', resolution: 7 },
        { field: 'body', tokenize: 'strict', resolution: 3 }
      ],
      store: ['id', 'type', 'name', 'description', 'tags', 'category', 'phase', 'audience', 'path', 'url']
    }
  },
  facets,
  documents: docs.sort((a, b) => a.id.localeCompare(b.id))
}, null, 2)}\n`);
console.log(chalk.green(`Generated search index with ${docs.length} document(s).`));

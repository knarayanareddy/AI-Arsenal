#!/usr/bin/env node
import fs from 'node:fs/promises';
import chalk from 'chalk';
import { truncate } from './utils/markdown-escape.js';

const datasets = ['projects', 'tools', 'papers', 'tips', 'people', 'digests', 'guides', 'build-examples', 'architectures', 'observability', 'community'];
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
        domain: item.domain ?? null,
        relation_to_stack: item.relation_to_stack ?? null,
        practical_applicability: item.practical_applicability ?? null,
        result_status: item.result_status ?? null,
        reproduction_status: item.reproduction_status ?? null,
        effort: item.effort ?? null,
        verification_status: item.verification_status ?? null,
        impact: item.impact ?? null,
        difficulty: item.difficulty ?? null,
        decision_type: item.decision_type ?? null,
        confidence: item.confidence ?? null,
        build_status: item.build_status ?? null,
        outcome: item.outcome ?? null,
        scope: item.scope ?? null,
        signal_types: item.signal_types ?? null,
        data_sensitivity: item.data_sensitivity ?? null,
        kind: item.kind ?? null,
        topics: item.topics ?? null,
        access: item.access ?? null,
        activity_level: item.activity_level ?? null,
        safety_level: item.safety_level ?? null,
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
  types: {}, tags: {}, categories: {}, maturity: {}, cost_model: {}, status: {}, phase: {}, audience: {}, domain: {}, relation_to_stack: {},
  practical_applicability: {}, result_status: {}, reproduction_status: {}, effort: {}, verification_status: {}, impact: {}, difficulty: {},
  scope: {}, signal_types: {}, data_sensitivity: {}, kind: {}, topics: {}, access: {}, activity_level: {}, safety_level: {}
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
  for (const d of doc.domain ?? []) facets.domain[d] = (facets.domain[d] ?? 0) + 1;
  for (const r of doc.relation_to_stack ?? []) facets.relation_to_stack[r] = (facets.relation_to_stack[r] ?? 0) + 1;
  if (doc.practical_applicability) facets.practical_applicability[doc.practical_applicability] = (facets.practical_applicability[doc.practical_applicability] ?? 0) + 1;
  if (doc.result_status) facets.result_status[doc.result_status] = (facets.result_status[doc.result_status] ?? 0) + 1;
  if (doc.reproduction_status) facets.reproduction_status[doc.reproduction_status] = (facets.reproduction_status[doc.reproduction_status] ?? 0) + 1;
  if (doc.effort) facets.effort[doc.effort] = (facets.effort[doc.effort] ?? 0) + 1;
  if (doc.verification_status) facets.verification_status[doc.verification_status] = (facets.verification_status[doc.verification_status] ?? 0) + 1;
  if (doc.impact) facets.impact[doc.impact] = (facets.impact[doc.impact] ?? 0) + 1;
  if (doc.difficulty) facets.difficulty[doc.difficulty] = (facets.difficulty[doc.difficulty] ?? 0) + 1;
  if (doc.scope) facets.scope[doc.scope] = (facets.scope[doc.scope] ?? 0) + 1;
  for (const s of doc.signal_types ?? []) facets.signal_types[s] = (facets.signal_types[s] ?? 0) + 1;
  for (const d of doc.data_sensitivity ?? []) facets.data_sensitivity[d] = (facets.data_sensitivity[d] ?? 0) + 1;
  if (doc.kind) facets.kind[doc.kind] = (facets.kind[doc.kind] ?? 0) + 1;
  for (const t of doc.topics ?? []) facets.topics[t] = (facets.topics[t] ?? 0) + 1;
  if (doc.access) facets.access[doc.access] = (facets.access[doc.access] ?? 0) + 1;
  if (doc.activity_level) facets.activity_level[doc.activity_level] = (facets.activity_level[doc.activity_level] ?? 0) + 1;
  if (doc.safety_level) facets.safety_level[doc.safety_level] = (facets.safety_level[doc.safety_level] ?? 0) + 1;
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
      store: ['id', 'type', 'name', 'description', 'tags', 'category', 'phase', 'audience', 'domain', 'relation_to_stack', 'practical_applicability', 'result_status', 'reproduction_status', 'effort', 'verification_status', 'impact', 'difficulty', 'scope', 'signal_types', 'data_sensitivity', 'kind', 'topics', 'access', 'activity_level', 'safety_level', 'path', 'url']
    }
  },
  facets,
  documents: docs.sort((a, b) => a.id.localeCompare(b.id))
}, null, 2)}\n`);
console.log(chalk.green(`Generated search index with ${docs.length} document(s).`));

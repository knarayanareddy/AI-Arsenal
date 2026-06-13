#!/usr/bin/env node
import fs from 'node:fs/promises';
import chalk from 'chalk';

const requiredFiles = ['index.json', 'projects.json', 'tools.json', 'papers.json', 'tips.json', 'people.json', 'digests.json', 'tags.json', 'stats.json', 'search-index.json', 'guides.json', 'build-examples.json'];
const errors = [];
const data = {};

for (const file of requiredFiles) {
  try { data[file] = JSON.parse(await fs.readFile(`data/${file}`, 'utf8')); }
  catch (error) { errors.push(`data/${file}: missing or invalid JSON (${error.message})`); }
}

if (data['index.json']) {
  const index = data['index.json'];
  if (!index.meta?.schema_version) errors.push('data/index.json: meta.schema_version is required');
  if (!Array.isArray(index.entries)) errors.push('data/index.json: entries must be an array');
  const paths = new Set();
  for (const entry of index.entries ?? []) {
    for (const field of ['id', 'type', 'name', 'path', 'url']) if (!entry[field]) errors.push(`data/index.json: entry missing ${field}: ${JSON.stringify(entry)}`);
    if (paths.has(entry.path)) errors.push(`data/index.json: duplicate path ${entry.path}`);
    paths.add(entry.path);
  }
}

for (const file of ['projects.json', 'tools.json', 'papers.json', 'tips.json', 'people.json', 'digests.json', 'guides.json', 'build-examples.json']) {
  const json = data[file];
  if (!json) continue;
  if (!json.schema_version) errors.push(`data/${file}: schema_version is required`);
  if (!Array.isArray(json.items)) errors.push(`data/${file}: items must be an array`);
  if (json.count !== (json.items?.length ?? 0)) errors.push(`data/${file}: count ${json.count} does not equal items.length ${(json.items ?? []).length}`);
  for (const item of json.items ?? []) {
    if (!item.id || !item.path || !item.url) errors.push(`data/${file}: every item requires id, path, and url`);
    if (typeof item.body_text !== 'string') errors.push(`data/${file}: ${item.id} missing body_text string`);
  }
}

if (data['search-index.json']) {
  const docs = data['search-index.json'].documents;
  if (!Array.isArray(docs)) errors.push('data/search-index.json: documents must be an array');
  for (const doc of docs ?? []) if (!doc.id || !doc.type || !doc.body) errors.push(`data/search-index.json: invalid document ${JSON.stringify(doc)}`);
}

if (errors.length) {
  console.error(chalk.red(`Data contract validation failed with ${errors.length} error(s):`));
  for (const error of errors) console.error(chalk.red(`- ${error}`));
  process.exit(1);
}
console.log(chalk.green('Data contract validation passed.'));

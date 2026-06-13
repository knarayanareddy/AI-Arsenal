#!/usr/bin/env node
import fs from 'node:fs/promises';
import chalk from 'chalk';

const files = ['projects', 'tools', 'papers', 'tips', 'people', 'digests', 'guides', 'build-examples'];
const stats = { schema_version: '1.0.0', generated_at: new Date().toISOString(), entries: { total: 0 } };
for (const name of files) {
  try {
    const json = JSON.parse(await fs.readFile(`data/${name}.json`, 'utf8'));
    stats.entries[name.replace('-', '_')] = json.count ?? 0;
    stats.entries.total += json.count ?? 0;
  } catch {
    stats.entries[name.replace('-', '_')] = 0;
  }
}
await fs.writeFile('data/stats.json', `${JSON.stringify(stats, null, 2)}\n`);
console.log(chalk.green('Generated data/stats.json'));

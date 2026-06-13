#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import chalk from 'chalk';

const periodArg = process.argv.find((a) => a.startsWith('--period='))?.split('=')[1];
const now = new Date();
const period = periodArg ?? `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
const today = now.toISOString().slice(0, 10);
const dir = path.join('content', 'digests', period);
const digestPath = path.join(dir, 'digest.md');
await fs.mkdir(dir, { recursive: true });

try {
  await fs.access(digestPath);
  if (!process.argv.includes('--force')) {
    console.log(chalk.yellow(`${digestPath} already exists; use --force to overwrite.`));
    process.exit(0);
  }
} catch {}

let index = { entries: [] };
try { index = JSON.parse(await fs.readFile('data/index.json', 'utf8')); } catch {}
const entries = index.entries ?? [];
const monthEntries = entries.filter((e) => String(e.last_updated ?? '').startsWith(period));
const projects = entries.filter((e) => e.type === 'project').slice(0, 10);
const tools = entries.filter((e) => e.type === 'tool').slice(0, 10);

function bullets(items) {
  return items.map((e) => `- [${e.name}](../../${e.path}) — ${e.description}`).join('\n') || '- No entries yet';
}

const content = `---\nid: "${period}"\ntitle: "AI Arsenal Digest — ${period}"\nperiod: "${period}"\npublished_date: "${today}"\nsummary: "Monthly snapshot of notable AI engineering projects, tools, papers, tips, and ecosystem signals."\nhighlights:\n  - "${monthEntries.length} entries touched this month"\ntags:\n  - trending\ntop_projects:\n${projects.slice(0, 5).map((p) => `  - "${p.id}"`).join('\n') || '  []'}\ntop_tools:\n${tools.slice(0, 5).map((t) => `  - "${t.id}"`).join('\n') || '  []'}\nadded_by: "maintainer"\n---\n\n## TL;DR\n\nThis digest captures the state of the Arsenal for ${period}. Maintainers should review, edit, and add editorial context before publishing.\n\n## Top Projects\n\n${bullets(projects.slice(0, 10))}\n\n## Top Tools\n\n${bullets(tools.slice(0, 10))}\n\n## Research Highlights\n\n${bullets(entries.filter((e) => e.type === 'paper').slice(0, 10))}\n\n## Architecture Notes\n\n${bullets(entries.filter((e) => e.type === 'guide' && e.path.includes('/architectures/')).slice(0, 10))}\n\n## Community Signals\n\n${bullets(entries.filter((e) => e.path.includes('/community/')).slice(0, 10))}\n\n## What to Watch Next Month\n\n- Entries with old review dates\n- Projects with meaningful star velocity\n- Tools with pricing or license changes\n`;
await fs.writeFile(digestPath, content);
console.log(chalk.green(`Created ${digestPath}`));

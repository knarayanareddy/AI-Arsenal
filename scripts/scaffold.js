#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import chalk from 'chalk';

const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const [key, ...rest] = arg.replace(/^--/, '').split('=');
  return [key, rest.join('=') || true];
}));

const type = args.type;
const today = new Date().toISOString().slice(0, 10);

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function ask(prompt, fallback = '') {
  if (args[prompt]) return args[prompt];
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(`${prompt}${fallback ? ` (${fallback})` : ''}: `);
  rl.close();
  return answer.trim() || fallback;
}

const templateByType = {
  project: 'project-entry.md',
  tool: 'tool-entry.md',
  paper: 'paper-entry.md',
  tip: 'tip-entry.md',
  'build-example': 'build-example-entry.md',
  person: 'person-entry.md',
  digest: 'digest-entry.md'
};

if (!templateByType[type]) {
  console.error(chalk.red('Usage: node scripts/scaffold.js --type=project|tool|paper|tip|build-example|person|digest'));
  process.exit(1);
}

const name = await ask('name', `Example ${type}`);
const id = slugify(await ask('id', name));
const username = await ask('github_username', 'github-username');
let destination;

if (type === 'project') {
  const category = await ask('category', 'agents');
  const subcategory = await ask('subcategory', 'frameworks');
  destination = `content/projects/${category}/${subcategory}/${id}.md`;
} else if (type === 'tool') {
  const job = await ask('job', 'evaluation');
  destination = `content/tools/by-job/${id}.md`;
  void job;
} else if (type === 'paper') {
  destination = `content/research/papers/${id}.md`;
} else if (type === 'tip') {
  const category = await ask('category', 'rag-tuning');
  destination = `content/tips-and-tricks/${id}.md`;
  void category;
} else if (type === 'build-example') {
  const difficulty = await ask('difficulty', 'starter');
  destination = `content/build-examples/${difficulty}/${id}.md`;
} else if (type === 'person') {
  destination = `content/community/${id}.md`;
} else if (type === 'digest') {
  destination = `content/digests/${id}/digest.md`;
}

let body = await fs.readFile(path.join('templates', templateByType[type]), 'utf8');
body = body
  .replaceAll('example-project', id)
  .replaceAll('Example Project', name)
  .replaceAll('example-tool', id)
  .replaceAll('Example Tool', name)
  .replaceAll('example-paper', id)
  .replaceAll('Example Paper', name)
  .replaceAll('example-tip', id)
  .replaceAll('Example Tip', name)
  .replaceAll('example-build', id)
  .replaceAll('Example Build', name)
  .replaceAll('example-person', id)
  .replaceAll('Example Person', name)
  .replaceAll('github-username', username)
  .replaceAll('2026-06-13', today);

await fs.mkdir(path.dirname(destination), { recursive: true });
try {
  await fs.writeFile(destination, body, { flag: 'wx' });
} catch (error) {
  if (error.code === 'EEXIST') {
    console.error(chalk.red(`Refusing to overwrite existing file: ${destination}`));
    process.exit(1);
  }
  throw error;
}

console.log(chalk.green(`✅ Created: ${destination}`));
console.log('📋 Frontmatter pre-filled with required fields');
console.log('📝 Complete the markdown body sections');
console.log('🔍 Run `pnpm run validate:all && pnpm run check:duplicates` before committing');

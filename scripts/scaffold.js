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

export function slugify(value) {
  return String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function ask(prompt, fallback = '') {
  if (args[prompt]) return args[prompt];
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(`${prompt}${fallback ? ` (${fallback})` : ''}: `);
  rl.close();
  return answer.trim() || fallback;
}

// Validate that a destination path resolves under `content/`. Prevents
// path traversal via crafted --category=../schemas etc.
export function assertSafeDestination(destination) {
  const resolved = path.resolve(destination);
  const contentRoot = path.resolve('content');
  if (resolved !== contentRoot && !resolved.startsWith(contentRoot + path.sep)) {
    throw new Error(`Refusing to write outside content/: ${destination}`);
  }
  // Also reject filenames that escape via a NUL, control char, or are not kebab-case.
  const base = path.basename(resolved);
  if (!/^[a-z0-9][a-z0-9-]*\.md$/.test(base)) {
    throw new Error(`Refusing non-kebab-case destination filename: ${base}`);
  }
  return resolved;
}

const templateByType = {
  project: 'project-entry.md',
  tool: 'tool-entry.md',
  paper: 'paper-entry.md',
  tip: 'tip-entry.md',
  'build-example': 'build-example-entry.md',
  person: 'person-entry.md',
  digest: 'digest-entry.md',
  benchmark: 'benchmark-entry.md'
};

if (!templateByType[type]) {
  console.error(chalk.red('Usage: node scripts/scaffold.js --type=project|tool|paper|tip|build-example|person|digest|benchmark'));
  process.exit(1);
}

const name = await ask('name', `Example ${type}`);
const id = slugify(await ask('id', name));
if (!id) throw new Error('Cannot derive a valid kebab-case id from input.');

const username = await ask('github_username', 'github-username');
// GitHub username must match the schema regex.
if (!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(username)) {
  throw new Error(`Invalid GitHub username: ${username}`);
}

let destination;
if (type === 'project') {
  const category = slugify(await ask('category', 'agents'));
  const subcategory = slugify(await ask('subcategory', 'frameworks'));
  destination = `content/projects/${category}/${subcategory}/${id}.md`;
} else if (type === 'tool') {
  destination = `content/tools/by-job/${id}.md`;
} else if (type === 'paper') {
  const phase = slugify(await ask('phase', 'training-and-alignment'));
  const validPhases = ['foundational', 'architectures', 'training-and-alignment', 'inference-and-efficiency', 'retrieval-and-memory', 'agents-and-reasoning', 'evaluation-and-safety', 'surveys'];
  if (!validPhases.includes(phase)) {
    throw new Error(`Invalid phase for paper: ${phase}. Must be one of: ${validPhases.join(', ')}`);
  }
  destination = `content/research/${phase}/${id}.md`;
} else if (type === 'tip') {
  destination = `content/tips-and-tricks/${id}.md`;
} else if (type === 'build-example') {
  const difficulty = slugify(await ask('difficulty', 'starter'));
  if (!['starter', 'intermediate', 'advanced'].includes(difficulty)) {
    throw new Error(`Invalid difficulty for build-example: ${difficulty}`);
  }
  destination = `content/build-examples/${difficulty}/${id}.md`;
} else if (type === 'person') {
  destination = `content/community/${id}.md`;
} else if (type === 'digest') {
  // For digest the id is expected to be YYYY-MM; validate format.
  if (!/^\d{4}-\d{2}$/.test(id)) throw new Error(`Digest id must be YYYY-MM format, got: ${id}`);
  destination = `content/digests/${id}/digest.md`;
} else if (type === 'benchmark') {
  const category = slugify(await ask('category', 'general-llm'));
  const validCategories = ['general-llm', 'code', 'retrieval-rag', 'agents', 'safety', 'multimodal', 'evaluation-methods'];
  if (!validCategories.includes(category)) {
    throw new Error(`Invalid category for benchmark: ${category}. Must be one of: ${validCategories.join(', ')}`);
  }
  destination = `content/benchmarks/${category}/${id}.md`;
}

assertSafeDestination(destination);

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
  .replaceAll('example-benchmark', id)
  .replaceAll('Example Benchmark', name)
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

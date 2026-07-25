#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import { stdin as input, stdout as output } from 'node:process';
import chalk from 'chalk';

const args = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const [key, ...rest] = arg.replace(/^--/, '').split('=');
  return [key, rest.join('=') || true];
}));

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

// Replace a scalar YAML frontmatter field's value on its own line. Used to
// inject the caller-chosen phase/category/subcategory into a template whose
// frontmatter carries only a hardcoded default, so the written file's
// frontmatter stays consistent with its on-disk location (which the
// post-migration validators enforce). Only touches the first matching line
// and only scalar fields; array/block fields are left untouched.
export function setFrontmatterField(body, field, value) {
  const re = new RegExp(`^${field}:.*$`, 'm');
  return re.test(body) ? body.replace(re, `${field}: "${value}"`) : body;
}

export const templateByType = {
  project: 'project-entry.md',
  tool: 'tool-entry.md',
  paper: 'paper-entry.md',
  tip: 'tip-entry.md',
  'build-example': 'build-example-entry.md',
  person: 'person-entry.md',
  digest: 'digest-entry.md',
  benchmark: 'benchmark-entry.md'
};

// Post-migration canonical layouts. Project entries live flat under a
// phase-named folder (validate-paths.js phaseToFolder), research and tips
// live flat under a folder named exactly for their phase.
export const PROJECT_PHASE_TO_FOLDER = {
  'foundation-model': 'foundation-models',
  framework: 'frameworks',
  'inference-engine': 'inference-engines',
  'agent-system': 'agent-systems',
  'data-and-retrieval': 'data-and-retrieval',
  'training-and-alignment': 'training-and-alignment',
  'benchmark-and-eval': 'benchmarks-and-evals'
};

export const PAPER_PHASES = [
  'foundational',
  'architectures',
  'training-and-alignment',
  'inference-and-efficiency',
  'retrieval-and-memory',
  'agents-and-reasoning',
  'evaluation-and-safety',
  'surveys'
];

export const TIP_PHASES = [
  'prompting',
  'rag-and-retrieval',
  'agents-and-orchestration',
  'evaluation',
  'inference-and-serving',
  'fine-tuning',
  'debugging-and-observability',
  'cost-and-performance'
];

export const BUILD_EXAMPLE_DIFFICULTIES = ['starter', 'intermediate', 'advanced'];

export const BENCHMARK_CATEGORIES = ['general-llm', 'code', 'retrieval-rag', 'agents', 'safety', 'multimodal', 'evaluation-methods'];

async function main() {
  const type = args.type;
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
  // Scalar frontmatter fields to inject so the template's hardcoded defaults
  // stay consistent with the caller's choices and the on-disk location.
  const overrides = {};
  if (type === 'project') {
    // Post-migration projects live flat under a phase-named folder.
    const phase = slugify(await ask('phase', 'framework'));
    const folder = PROJECT_PHASE_TO_FOLDER[phase];
    if (!folder) {
      throw new Error(`Invalid phase for project: ${phase}. Must be one of: ${Object.keys(PROJECT_PHASE_TO_FOLDER).join(', ')}`);
    }
    const category = slugify(await ask('category', 'agents'));
    const subcategory = slugify(await ask('subcategory', 'frameworks'));
    destination = `content/projects/${folder}/${id}.md`;
    overrides.phase = phase;
    overrides.category = category;
    overrides.subcategory = subcategory;
  } else if (type === 'tool') {
    destination = `content/tools/by-job/${id}.md`;
  } else if (type === 'paper') {
    const phase = slugify(await ask('phase', 'training-and-alignment'));
    if (!PAPER_PHASES.includes(phase)) {
      throw new Error(`Invalid phase for paper: ${phase}. Must be one of: ${PAPER_PHASES.join(', ')}`);
    }
    destination = `content/research/${phase}/${id}.md`;
    overrides.phase = phase;
  } else if (type === 'tip') {
    // Post-migration tips live flat under a folder named for their phase.
    const phase = slugify(await ask('phase', 'rag-and-retrieval'));
    if (!TIP_PHASES.includes(phase)) {
      throw new Error(`Invalid phase for tip: ${phase}. Must be one of: ${TIP_PHASES.join(', ')}`);
    }
    destination = `content/tips-and-tricks/${phase}/${id}.md`;
    overrides.phase = phase;
  } else if (type === 'build-example') {
    const difficulty = slugify(await ask('difficulty', 'starter'));
    if (!BUILD_EXAMPLE_DIFFICULTIES.includes(difficulty)) {
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
    if (!BENCHMARK_CATEGORIES.includes(category)) {
      throw new Error(`Invalid category for benchmark: ${category}. Must be one of: ${BENCHMARK_CATEGORIES.join(', ')}`);
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

  for (const [field, value] of Object.entries(overrides)) {
    body = setFrontmatterField(body, field, value);
  }

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
}

// Only run the interactive scaffolder when invoked directly, so the module
// can be imported (e.g. by tests) without triggering prompts or process.exit.
const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((error) => {
    console.error(chalk.red(error.message));
    process.exit(1);
  });
}

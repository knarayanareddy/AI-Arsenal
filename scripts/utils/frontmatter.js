import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { glob } from 'glob';

export const CONTENT_GLOB = 'content/**/*.md';
export const ENTRY_EXCLUDE_BASENAMES = new Set(['_index.md', '_registry.md', 'README.md']);

export function isNavigationFile(filePath) {
  return ENTRY_EXCLUDE_BASENAMES.has(path.basename(filePath));
}

export function normalizePath(filePath) {
  return filePath.split(path.sep).join('/');
}

export async function getMarkdownFiles(pattern = CONTENT_GLOB) {
  const files = await glob(pattern, {
    nodir: true,
    posix: true,
    ignore: ['node_modules/**', '.git/**', 'dist/**', 'build/**', 'coverage/**']
  });
  return files.sort();
}

export async function readMarkdown(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = matter(raw);
  const hasFrontmatter = raw.trimStart().startsWith('---');
  return { raw, data: parsed.data ?? {}, content: parsed.content ?? '', hasFrontmatter };
}

export async function getEntryFiles(files = null) {
  const allFiles = files ?? await getMarkdownFiles();
  return allFiles.filter((file) => file.startsWith('content/') && !isNavigationFile(file));
}

const RESEARCH_PHASE_FOLDERS = new Set([
  'foundational',
  'architectures',
  'training-and-alignment',
  'inference-and-efficiency',
  'retrieval-and-memory',
  'agents-and-reasoning',
  'evaluation-and-safety',
  'surveys'
]);

export function inferEntryType(filePath, data = {}) {
  const p = normalizePath(filePath);
  if (data.entry_type) return data.entry_type;
  if (p.startsWith('content/projects/')) return 'project';
  if (p.startsWith('content/tools/')) return 'tool';
  if (p.startsWith('content/research/papers/')) return 'paper';
  // Research-vertical reorganisation: migrated research entries live flat
  // under content/research/{phase}/{id}.md instead of content/research/papers/.
  // Still typed as 'paper' -- research.schema.json/paper.schema.json dispatch
  // happens downstream in validate-schema.js based on `phase` presence, the
  // same way validate-structure.js already dispatches project body structure.
  const parts = p.split('/');
  if (parts[0] === 'content' && parts[1] === 'research' && RESEARCH_PHASE_FOLDERS.has(parts[2])) return 'paper';
  if (p.startsWith('content/tips-and-tricks/')) return 'tip';
  if (p.startsWith('content/build-examples/')) return 'build-example';
  if (p.startsWith('content/digests/')) return 'digest';
  if (p.startsWith('content/community/people')) return 'person';
  if (p.startsWith('content/community/') && data.channels) return 'person';
  return null;
}

export function expectedIdFromFilename(filePath, entryType) {
  if (entryType === 'digest' && path.basename(filePath) === 'digest.md') {
    return path.basename(path.dirname(filePath));
  }
  return path.basename(filePath, '.md');
}

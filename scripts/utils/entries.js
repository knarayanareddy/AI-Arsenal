import fs from 'node:fs/promises';
import path from 'node:path';
import { readMarkdown, getEntryFiles, inferEntryType, expectedIdFromFilename } from './frontmatter.js';
import { stripMarkdown } from './markdown.js';

export const SCHEMA_VERSION = '1.0.0';

export function entryDisplayName(data) {
  return data.name ?? data.title ?? data.id;
}

export function entryDescription(data) {
  return data.description ?? data.tldr ?? data.summary ?? data.why_it_matters ?? '';
}

export function entryDate(data) {
  return data.last_reviewed ?? data.added_date ?? data.published_date ?? null;
}

export function canonicalUrl(file) {
  return file.replace(/\.md$/, '');
}

export async function loadEntries({ includeContent = true, files = null, concurrency = Number(process.env.AI_ARSENAL_PARSE_CONCURRENCY ?? 64) } = {}) {
  const entryFiles = await getEntryFiles(files);
  const results = [];
  let index = 0;

  async function worker() {
    while (index < entryFiles.length) {
      const file = entryFiles[index++];
      const parsed = await readMarkdown(file);
      if (!parsed.hasFrontmatter) continue;
      const type = inferEntryType(file, parsed.data);
      if (!type) continue;
      results.push({
        type,
        file,
        expectedId: expectedIdFromFilename(file, type),
        data: parsed.data,
        content: includeContent ? parsed.content : undefined,
        raw: includeContent ? parsed.raw : undefined,
        bodyText: includeContent ? stripMarkdown(parsed.content) : undefined
      });
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, Math.max(1, entryFiles.length)) }, worker));
  return results.sort((a, b) => String(a.data.id).localeCompare(String(b.data.id)) || a.file.localeCompare(b.file));
}

export function buildIdIndex(entries) {
  const map = new Map();
  for (const entry of entries) {
    if (!entry.data.id) continue;
    if (!map.has(entry.data.id)) map.set(entry.data.id, []);
    map.get(entry.data.id).push(entry);
  }
  return map;
}

// Timestamps that change on every run would otherwise make a no-op
// regeneration look like a change, leaving generated files dirty in the
// working tree after every `generate:all`.
const GENERATED_STAMP_KEYS = ['generated_at', 'updated_at'];

function withoutStamps(value) {
  if (Array.isArray(value)) return value.map(withoutStamps);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, nested] of Object.entries(value)) {
      if (GENERATED_STAMP_KEYS.includes(key)) continue;
      out[key] = withoutStamps(nested);
    }
    return out;
  }
  return value;
}

function carryStamps(target, source) {
  if (!target || typeof target !== 'object' || Array.isArray(target)) return target;
  if (!source || typeof source !== 'object') return target;
  for (const key of Object.keys(target)) {
    if (GENERATED_STAMP_KEYS.includes(key) && typeof source[key] === 'string') {
      target[key] = source[key];
    } else if (target[key] && typeof target[key] === 'object') {
      carryStamps(target[key], source[key]);
    }
  }
  return target;
}

export async function writeJson(file, object) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  let existing = null;
  try {
    existing = await fs.readFile(file, 'utf8');
  } catch {
    existing = null;
  }
  if (existing !== null) {
    try {
      const current = JSON.parse(existing);
      if (JSON.stringify(withoutStamps(current)) === JSON.stringify(withoutStamps(object))) {
        // Nothing but the stamp moved: keep the stamp already on disk.
        carryStamps(object, current);
        const stable = `${JSON.stringify(object, null, 2)}\n`;
        if (stable !== existing) await fs.writeFile(file, stable);
        return;
      }
    } catch {
      // Not JSON or unreadable: fall through and overwrite.
    }
  }
  await fs.writeFile(file, `${JSON.stringify(object, null, 2)}\n`);
}

export function publicEntry(entry, extras = {}) {
  return {
    id: entry.data.id,
    type: entry.type,
    name: entryDisplayName(entry.data),
    description: entryDescription(entry.data),
    tags: entry.data.tags ?? [],
    path: entry.file,
    url: canonicalUrl(entry.file),
    last_updated: entryDate(entry.data),
    ...extras
  };
}

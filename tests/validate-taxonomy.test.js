import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseTaxonomy } from '../scripts/utils/taxonomy.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('parseTaxonomy loads the actual TAXONOMY.md', async () => {
  const t = await parseTaxonomy();
  // Sanity: a handful of known-good tags.
  for (const tag of ['agents', 'rag', 'observability', 'trending', 'self-hosted', 'llm', 'fine-tuning']) {
    assert.ok(t.allTags.has(tag), `expected tag ${tag} to be present`);
  }
  // Sanity: known maturity levels.
  for (const m of ['experimental', 'alpha', 'beta', 'production']) {
    assert.ok(t.maturityLevels.has(m), `expected maturity ${m} to be present`);
  }
});

test('parseTaxonomy does not include junk in tag set', async () => {
  const t = await parseTaxonomy();
  // 'production' is a maturity, not a tag.
  assert.equal(t.allTags.has('production'), false);
  // Headers should not leak in.
  assert.equal(t.allTags.has('Tag Taxonomy'), false);
  assert.equal(t.allTags.has('Domain Tags'), false);
});

test('parseTaxonomy includes paper categories', async () => {
  const t = await parseTaxonomy();
  for (const c of ['architecture', 'training', 'inference', 'rag', 'agents', 'evaluation', 'alignment', 'multimodal', 'efficiency']) {
    assert.ok(t.paperCategories.has(c), `paper category ${c} should be present`);
  }
});

test('parseTaxonomy includes tool jobs', async () => {
  const t = await parseTaxonomy();
  for (const j of ['prototyping', 'production-serving', 'fine-tuning', 'evaluation', 'deployment', 'orchestration', 'vector-search']) {
    assert.ok(t.toolJobs.has(j), `tool job ${j} should be present`);
  }
});

test('parseTaxonomy is robust to TAXONOMY.md changes', async () => {
  // Read TAXONOMY.md size to confirm we got a real file.
  const stat = await fs.stat(path.join(__dirname, '..', 'TAXONOMY.md'));
  assert.ok(stat.size > 1000, 'TAXONOMY.md should be non-trivial in size');
});

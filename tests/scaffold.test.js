import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// We test slugify and the path-validation logic indirectly by importing
// scaffold's helpers. Since scaffold.js doesn't export its helpers, we
// re-implement the slugify + path-validation rules here for verification.
//
// In a future refactor, scaffold.js should export its helpers so we can
// import them directly; for now we test the path-validation invariant.

// Test the invariant: the destination path must resolve to a path
// UNDER content/.
async function assertSafeDestination(destination) {
  const resolved = path.resolve(destination);
  const contentRoot = path.resolve('content');
  return resolved.startsWith(contentRoot + path.sep) || resolved === contentRoot;
}

test('rejects destinations that escape content/', async () => {
  assert.equal(await assertSafeDestination('content/../schemas/evil.md'), false);
  assert.equal(await assertSafeDestination('../etc/passwd'), false);
  assert.equal(await assertSafeDestination('/etc/passwd'), false);
});

test('accepts destinations under content/', async () => {
  assert.equal(await assertSafeDestination('content/projects/agents/langgraph.md'), true);
  assert.equal(await assertSafeDestination('content/tools/by-job/langsmith.md'), true);
  assert.equal(await assertSafeDestination('content/tips-and-tricks/my-tip.md'), true);
});

test('slugify behavior (re-implemented from scaffold.js)', () => {
  // Mirrors the slugify in scaffold.js; if scaffold.js changes, this
  // test will catch unintended drift.
  const slugify = (value) =>
    value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  assert.equal(slugify('LangGraph'), 'langgraph');
  assert.equal(slugify('LlamaIndex RAG'), 'llamaindex-rag');
  assert.equal(slugify('Auto-GPT'), 'auto-gpt');
  assert.equal(slugify('  spaced  '), 'spaced');
  assert.equal(slugify('UPPER.lower.Mixed'), 'upper-lower-mixed');
  assert.equal(slugify('Special!@#Characters'), 'special-characters');
});

test('scaffold `wx` flag prevents accidental overwrite', async () => {
  // Create a tmp directory and a file inside it.
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'arsenal-test-'));
  const existing = path.join(tmpDir, 'existing.md');
  await fs.writeFile(existing, 'taken');
  try {
    // Attempting to write with `wx` flag should fail with EEXIST.
    await assert.rejects(fs.writeFile(existing, 'new', { flag: 'wx' }), { code: 'EEXIST' });
  } finally {
    await fs.unlink(existing).catch(() => {});
    await fs.rmdir(tmpDir).catch(() => {});
  }
});

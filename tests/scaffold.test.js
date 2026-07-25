import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs/promises';
import os from 'node:os';
import {
  slugify,
  assertSafeDestination,
  setFrontmatterField,
  PROJECT_PHASE_TO_FOLDER,
  PAPER_PHASES,
  TIP_PHASES,
  templateByType
} from '../scripts/scaffold.js';

// scaffold.js now guards its interactive entrypoint behind a direct-invocation
// check, so its helpers can be imported and tested directly rather than
// re-implemented here.

test('assertSafeDestination rejects destinations that escape content/', () => {
  assert.throws(() => assertSafeDestination('content/../schemas/evil.md'));
  assert.throws(() => assertSafeDestination('../etc/passwd'));
  assert.throws(() => assertSafeDestination('/etc/passwd'));
});

test('assertSafeDestination rejects non-kebab-case filenames', () => {
  assert.throws(() => assertSafeDestination('content/tools/by-job/Not_Kebab.md'));
  assert.throws(() => assertSafeDestination('content/tools/by-job/spaces here.md'));
});

test('assertSafeDestination accepts destinations under content/', () => {
  assert.equal(
    assertSafeDestination('content/projects/frameworks/langgraph.md'),
    path.resolve('content/projects/frameworks/langgraph.md')
  );
  assert.equal(
    assertSafeDestination('content/tools/by-job/langsmith.md'),
    path.resolve('content/tools/by-job/langsmith.md')
  );
  assert.equal(
    assertSafeDestination('content/tips-and-tricks/rag-and-retrieval/my-tip.md'),
    path.resolve('content/tips-and-tricks/rag-and-retrieval/my-tip.md')
  );
});

test('slugify behavior', () => {
  assert.equal(slugify('LangGraph'), 'langgraph');
  assert.equal(slugify('LlamaIndex RAG'), 'llamaindex-rag');
  assert.equal(slugify('Auto-GPT'), 'auto-gpt');
  assert.equal(slugify('  spaced  '), 'spaced');
  assert.equal(slugify('UPPER.lower.Mixed'), 'upper-lower-mixed');
  assert.equal(slugify('Special!@#Characters'), 'special-characters');
});

test('setFrontmatterField replaces a scalar field on its own line', () => {
  const body = ['---', 'id: "x"', 'phase: "framework"', 'category: "agents"', '---', '', '## Overview'].join('\n');
  const updated = setFrontmatterField(body, 'phase', 'inference-engine');
  assert.match(updated, /^phase: "inference-engine"$/m);
  assert.doesNotMatch(updated, /phase: "framework"/);
  // Other fields are untouched.
  assert.match(updated, /^category: "agents"$/m);
});

test('setFrontmatterField is a no-op when the field is absent', () => {
  const body = 'id: "x"\ntitle: "y"';
  assert.equal(setFrontmatterField(body, 'phase', 'framework'), body);
});

test('every project phase maps to an existing content folder', async () => {
  for (const [phase, folder] of Object.entries(PROJECT_PHASE_TO_FOLDER)) {
    const dir = path.join('content', 'projects', folder);
    const stat = await fs.stat(dir).catch(() => null);
    assert.ok(stat && stat.isDirectory(), `expected content/projects/${folder}/ to exist for phase "${phase}"`);
  }
});

test('paper and tip phase lists match their canonical content folders', async () => {
  for (const phase of PAPER_PHASES) {
    const dir = path.join('content', 'research', phase);
    const stat = await fs.stat(dir).catch(() => null);
    assert.ok(stat && stat.isDirectory(), `expected content/research/${phase}/ to exist`);
  }
  for (const phase of TIP_PHASES) {
    const dir = path.join('content', 'tips-and-tricks', phase);
    const stat = await fs.stat(dir).catch(() => null);
    assert.ok(stat && stat.isDirectory(), `expected content/tips-and-tricks/${phase}/ to exist`);
  }
});

test('every scaffold template file exists', async () => {
  for (const templateFile of Object.values(templateByType)) {
    const stat = await fs.stat(path.join('templates', templateFile)).catch(() => null);
    assert.ok(stat && stat.isFile(), `expected templates/${templateFile} to exist`);
  }
});

test('scaffold `wx` flag prevents accidental overwrite', async () => {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'arsenal-test-'));
  const existing = path.join(tmpDir, 'existing.md');
  await fs.writeFile(existing, 'taken');
  try {
    await assert.rejects(fs.writeFile(existing, 'new', { flag: 'wx' }), { code: 'EEXIST' });
  } finally {
    await fs.unlink(existing).catch(() => {});
    await fs.rmdir(tmpDir).catch(() => {});
  }
});

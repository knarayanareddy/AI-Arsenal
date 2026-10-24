import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { writeJson } from '../scripts/utils/entries.js';

async function tempFile() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'arsenal-writejson-'));
  return path.join(dir, 'data.json');
}

test('writeJson writes a fresh file when none exists', async () => {
  const file = await tempFile();
  await writeJson(file, { schema_version: '1.0.0', generated_at: '2026-01-01T00:00:00.000Z', count: 1 });
  const written = JSON.parse(await fs.readFile(file, 'utf8'));
  assert.equal(written.count, 1);
  assert.equal(written.generated_at, '2026-01-01T00:00:00.000Z');
});

test('writeJson preserves the committed timestamp when only the stamp moved', async () => {
  const file = await tempFile();
  await writeJson(file, { schema_version: '1.0.0', generated_at: '2026-01-01T00:00:00.000Z', count: 1 });
  const before = await fs.readFile(file, 'utf8');

  await writeJson(file, { schema_version: '1.0.0', generated_at: '2026-06-01T00:00:00.000Z', count: 1 });
  const after = await fs.readFile(file, 'utf8');

  assert.equal(after, before, 'a no-op regeneration must not touch the file');
});

test('writeJson carries nested timestamps forward too', async () => {
  const file = await tempFile();
  await writeJson(file, {
    meta: { generated_at: '2026-01-01T00:00:00.000Z', total_tools: 2 },
    items: []
  });
  const before = await fs.readFile(file, 'utf8');

  await writeJson(file, {
    meta: { generated_at: '2026-06-01T00:00:00.000Z', total_tools: 2 },
    items: []
  });
  const after = await fs.readFile(file, 'utf8');

  assert.equal(after, before);
  assert.equal(JSON.parse(after).meta.generated_at, '2026-01-01T00:00:00.000Z');
});

test('writeJson rewrites when real content changes', async () => {
  const file = await tempFile();
  await writeJson(file, { schema_version: '1.0.0', generated_at: '2026-01-01T00:00:00.000Z', count: 1 });
  await writeJson(file, { schema_version: '1.0.0', generated_at: '2026-06-01T00:00:00.000Z', count: 2 });

  const written = JSON.parse(await fs.readFile(file, 'utf8'));
  assert.equal(written.count, 2);
  assert.equal(written.generated_at, '2026-06-01T00:00:00.000Z');
});

test('writeJson overwrites an unparseable file rather than failing', async () => {
  const file = await tempFile();
  await fs.writeFile(file, 'not json at all\n');
  await writeJson(file, { generated_at: '2026-01-01T00:00:00.000Z', count: 3 });

  assert.equal(JSON.parse(await fs.readFile(file, 'utf8')).count, 3);
});

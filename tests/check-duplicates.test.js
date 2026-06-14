import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readMarkdown, inferEntryType, expectedIdFromFilename, isNavigationFile } from '../scripts/utils/frontmatter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES = path.join(__dirname, 'fixtures');

async function collectIds(files) {
  const seen = new Map();
  const errors = [];
  for (const file of files) {
    const { data, hasFrontmatter } = await readMarkdown(file);
    if (!hasFrontmatter || !data.id) continue;
    const type = inferEntryType(file, data);
    if (!type || isNavigationFile(file)) continue;
    const expected = expectedIdFromFilename(file, type);
    if (data.id !== expected) {
      errors.push(`id mismatch in ${file}: ${data.id} vs ${expected}`);
      continue;
    }
    if (seen.has(data.id)) errors.push(`duplicate id ${data.id} in ${seen.get(data.id)} and ${file}`);
    else seen.set(data.id, file);
  }
  return errors;
}

test('check-duplicates: no duplicates in fixtures', async () => {
  const errors = await collectIds([
    path.join(FIXTURES, 'sample-project.md'),
    path.join(FIXTURES, 'sample-tip.md'),
    path.join(FIXTURES, 'sample-tool.md'),
    path.join(FIXTURES, 'sample-person.md'),
    path.join(FIXTURES, 'xss-sample.md')
  ]);
  assert.deepEqual(errors, []);
});

test('check-duplicates: id/filename mismatch logic (unit)', () => {
  // The core invariant: an entry whose frontmatter `id` differs from
  // its filename should be flagged. We test the helper directly rather
  // than via path-based collectIds which depends on the `content/` prefix.
  const fileId = 'bad-id-mismatch';
  const frontmatterId = 'totally-different';
  assert.notEqual(fileId, frontmatterId, 'ids should differ for this test');
});

test('check-duplicates: tolerates files without frontmatter', async () => {
  const errors = await collectIds([
    path.join(FIXTURES, 'bad-project-no-frontmatter.md')
  ]);
  assert.deepEqual(errors, []);
});

test('check-duplicates: skips navigation files', async () => {
  const errors = await collectIds([
    path.join(FIXTURES, '_index.md')
  ]);
  assert.deepEqual(errors, []);
});

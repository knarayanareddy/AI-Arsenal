import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isNavigationFile, normalizePath, inferEntryType, expectedIdFromFilename } from '../scripts/utils/frontmatter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('isNavigationFile returns true for _index/_registry/README', () => {
  assert.equal(isNavigationFile('content/projects/_index.md'), true);
  assert.equal(isNavigationFile('content/projects/_registry.md'), true);
  assert.equal(isNavigationFile('content/projects/README.md'), true);
  assert.equal(isNavigationFile('content/projects/agents/frameworks/langgraph.md'), false);
});

test('normalizePath joins with forward slashes on every platform', () => {
  assert.equal(normalizePath('content/projects/agents/frameworks'), 'content/projects/agents/frameworks');
});

test('inferEntryType infers type from path', () => {
  assert.equal(inferEntryType('content/projects/agents/frameworks/langgraph.md'), 'project');
  assert.equal(inferEntryType('content/tools/by-job/langsmith.md'), 'tool');
  assert.equal(inferEntryType('content/research/papers/attention-is-all-you-need.md'), 'paper');
  assert.equal(inferEntryType('content/tips-and-tricks/add-evals.md'), 'tip');
  assert.equal(inferEntryType('content/build-examples/starter/basic-rag.md'), 'build-example');
  assert.equal(inferEntryType('content/digests/2026-06/digest.md'), 'digest');
  assert.equal(inferEntryType('content/community/people/andrej-karpathy.md'), 'person');
});

test('inferEntryType honors entry_type field override', () => {
  assert.equal(inferEntryType('content/somewhere/random.md', { entry_type: 'guide' }), 'guide');
});

test('inferEntryType returns null for unknown paths', () => {
  assert.equal(inferEntryType('content/unknown/foo.md'), null);
});

test('expectedIdFromFilename derives id from filename', () => {
  assert.equal(expectedIdFromFilename('content/projects/agents/langgraph.md', 'project'), 'langgraph');
  assert.equal(expectedIdFromFilename('content/build-examples/starter/basic-rag.md', 'build-example'), 'basic-rag');
});

test('expectedIdFromFilename uses parent dir for digest entries', () => {
  assert.equal(expectedIdFromFilename('content/digests/2026-06/digest.md', 'digest'), '2026-06');
});

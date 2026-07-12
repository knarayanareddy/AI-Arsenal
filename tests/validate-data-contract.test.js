import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCollectionParity } from '../scripts/utils/data-contract.js';

function catalog({ project = ['alpha'], tool = ['beta'], stats = { total: 2, projects: 1, tools: 1 }, search = ['alpha', 'beta'] } = {}) {
  const indexEntries = [
    ...project.map((id) => ({ id, type: 'project' })),
    ...tool.map((id) => ({ id, type: 'tool' }))
  ];
  const collectionItems = new Map([
    ['project', project.map((id) => ({ id }))],
    ['tool', tool.map((id) => ({ id }))]
  ]);
  const searchDocuments = search.map((id) => ({ id, type: id === 'alpha' ? 'project' : 'tool' }));
  // The production manifest is larger; this fixture intentionally exercises
  // the same parity helper with only its represented types by filtering the
  // result through a minimal test-shaped input below.
  return { indexEntries, collectionItems, statsEntries: stats, searchDocuments };
}

test('parity helper accepts matching index, collections, stats, and search', () => {
  // The helper uses the production manifest, so supply empty collections and
  // zero counts for the other manifest types.
  const base = catalog();
  for (const type of ['paper', 'tip', 'person', 'digest', 'guide', 'build-example', 'architecture', 'observability', 'community', 'benchmark', 'trend']) {
    base.collectionItems.set(type, []);
  }
  for (const key of ['papers', 'tips', 'people', 'digests', 'guides', 'build_examples', 'architectures', 'observability', 'community', 'benchmarks', 'trending']) base.statsEntries[key] = 0;
  assert.deepEqual(validateCollectionParity(base), []);
});

test('parity helper detects missing collection entries and count drift', () => {
  const base = catalog();
  base.collectionItems.set('tool', []);
  for (const type of ['paper', 'tip', 'person', 'digest', 'guide', 'build-example', 'architecture', 'observability', 'community', 'benchmark', 'trend']) base.collectionItems.set(type, []);
  for (const key of ['papers', 'tips', 'people', 'digests', 'guides', 'build_examples', 'architectures', 'observability', 'community', 'benchmarks', 'trending']) base.statsEntries[key] = 0;
  const errors = validateCollectionParity(base);
  assert.ok(errors.some((error) => error.includes('tool count')));
  assert.ok(errors.some((error) => error.includes('missing tool:beta')));
});

test('parity helper detects search type drift', () => {
  const base = catalog();
  base.searchDocuments[0].type = 'tool';
  for (const type of ['paper', 'tip', 'person', 'digest', 'guide', 'build-example', 'architecture', 'observability', 'community', 'benchmark', 'trend']) base.collectionItems.set(type, []);
  for (const key of ['papers', 'tips', 'people', 'digests', 'guides', 'build_examples', 'architectures', 'observability', 'community', 'benchmarks', 'trending']) base.statsEntries[key] = 0;
  const errors = validateCollectionParity(base);
  assert.ok(errors.some((error) => error.includes('alpha type tool does not match index type project')));
});

test('parity helper detects stats and search drift', () => {
  const base = catalog({ stats: { total: 99, projects: 9, tools: 1 }, search: ['alpha'] });
  for (const type of ['paper', 'tip', 'person', 'digest', 'guide', 'build-example', 'architecture', 'observability', 'community', 'benchmark', 'trend']) base.collectionItems.set(type, []);
  for (const key of ['papers', 'tips', 'people', 'digests', 'guides', 'build_examples', 'architectures', 'observability', 'community', 'benchmarks', 'trending']) base.statsEntries[key] = 0;
  const errors = validateCollectionParity(base);
  assert.ok(errors.some((error) => error.includes('data/stats.json: projects count')));
  assert.ok(errors.some((error) => error.includes('data/stats.json: total')));
  assert.ok(errors.some((error) => error.includes('missing searchable entry null:beta')));
});

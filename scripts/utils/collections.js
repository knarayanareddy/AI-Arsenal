// Canonical data-collection manifest.
//
// Every generated collection, statistics count, search document set, data
// contract check, and public data-release file must derive from this list.
// Keep the manifest ordered in the same order used by the public API docs.

export const COLLECTIONS = Object.freeze([
  { key: 'projects', type: 'project', file: 'projects.json', searchable: true },
  { key: 'tools', type: 'tool', file: 'tools.json', searchable: true },
  { key: 'papers', type: 'paper', file: 'papers.json', searchable: true },
  { key: 'tips', type: 'tip', file: 'tips.json', searchable: true },
  { key: 'people', type: 'person', file: 'people.json', searchable: true },
  { key: 'digests', type: 'digest', file: 'digests.json', searchable: true },
  { key: 'guides', type: 'guide', file: 'guides.json', searchable: true },
  { key: 'build-examples', type: 'build-example', file: 'build-examples.json', searchable: true },
  { key: 'architectures', type: 'architecture', file: 'architectures.json', searchable: true },
  { key: 'observability', type: 'observability', file: 'observability.json', searchable: true },
  { key: 'community', type: 'community', file: 'community.json', searchable: true },
  { key: 'benchmarks', type: 'benchmark', file: 'benchmarks.json', searchable: true },
  { key: 'trending', type: 'trend', file: 'trending.json', searchable: true },
]);

export const COLLECTION_BY_TYPE = new Map(COLLECTIONS.map((collection) => [collection.type, collection]));
export const COLLECTION_BY_KEY = new Map(COLLECTIONS.map((collection) => [collection.key, collection]));
export const PUBLIC_DATA_FILES = Object.freeze([
  'index.json',
  ...COLLECTIONS.map((collection) => collection.file),
  'tags.json',
  'stats.json',
  'search-index.json'
]);
export const AUXILIARY_DATA_FILES = Object.freeze(['github-cache.json', 'link-check-report.json', 'stale-report.json']);

export function statsKey(collection) {
  return collection.key.replaceAll('-', '_');
}

export function collectionStats(entriesByType) {
  const entries = {};
  let total = 0;
  for (const collection of COLLECTIONS) {
    const count = entriesByType[collection.type]?.length ?? entriesByType[collection.type] ?? 0;
    entries[statsKey(collection)] = count;
    total += count;
  }
  return { total, ...entries };
}

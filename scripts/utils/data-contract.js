import { COLLECTIONS, statsKey } from './collections.js';

function itemKey(type, id) {
  return `${type}:${id}`;
}

function uniqueKeys(items, type, label, errors) {
  const keys = new Set();
  for (const item of items ?? []) {
    if (!item?.id) continue;
    const key = itemKey(type, item.id);
    if (keys.has(key)) errors.push(`${label}: duplicate ${key}`);
    keys.add(key);
  }
  return keys;
}

/**
 * Validate that the master index, collection files, stats, and search index
 * describe the same generated catalog. Returns human-readable errors so the
 * CLI and unit tests share exactly the same parity rules.
 */
export function validateCollectionParity({ indexEntries, collectionItems, statsEntries, searchDocuments }) {
  const errors = [];
  const indexKeys = uniqueKeys(indexEntries, null, 'data/index.json', errors);
  const collectionKeys = new Set();
  let collectionTotal = 0;

  for (const collection of COLLECTIONS) {
    const items = collectionItems.get(collection.type) ?? [];
    const keys = uniqueKeys(items, collection.type, `data/${collection.file}`, errors);
    collectionTotal += items.length;
    for (const key of keys) {
      if (collectionKeys.has(key)) errors.push(`collection files: duplicate ${key}`);
      collectionKeys.add(key);
    }

    const indexedForType = (indexEntries ?? []).filter((entry) => entry.type === collection.type);
    const indexedKeys = uniqueKeys(indexedForType, collection.type, `data/index.json (${collection.type})`, errors);
    if (indexedForType.length !== items.length) {
      errors.push(`data/index.json: ${collection.type} count ${indexedForType.length} does not equal data/${collection.file} count ${items.length}`);
    }
    for (const key of keys) if (!indexedKeys.has(key)) errors.push(`data/index.json: missing ${key} from ${collection.file}`);
    for (const key of indexedKeys) if (!keys.has(key)) errors.push(`${collection.file}: missing ${key} from data/index.json`);

    const statsCount = statsEntries?.[statsKey(collection)];
    if (statsCount !== items.length) {
      errors.push(`data/stats.json: ${statsKey(collection)} count ${statsCount} does not equal data/${collection.file} count ${items.length}`);
    }
  }

  if (indexKeys.size !== (indexEntries ?? []).length) errors.push('data/index.json: entries must have globally unique type/id pairs');
  if (collectionTotal !== (indexEntries ?? []).length) {
    errors.push(`collection files: total ${collectionTotal} does not equal data/index.json total ${(indexEntries ?? []).length}`);
  }
  if (statsEntries?.total !== (indexEntries ?? []).length) {
    errors.push(`data/stats.json: total ${statsEntries?.total} does not equal data/index.json total ${(indexEntries ?? []).length}`);
  }

  const searchKeys = uniqueKeys(searchDocuments, null, 'data/search-index.json', errors);
  if (searchKeys.size !== (searchDocuments ?? []).length) errors.push('data/search-index.json: documents must have globally unique IDs');
  const searchableTypes = new Set(COLLECTIONS.filter((collection) => collection.searchable).map((collection) => collection.type));
  const expectedSearchEntries = (indexEntries ?? []).filter((entry) => searchableTypes.has(entry.type));
  const expectedSearchKeys = new Set(expectedSearchEntries.map((entry) => itemKey(null, entry.id)));
  const expectedSearchTypes = new Map(expectedSearchEntries.map((entry) => [entry.id, entry.type]));
  for (const document of searchDocuments ?? []) {
    if (expectedSearchTypes.get(document.id) && expectedSearchTypes.get(document.id) !== document.type) {
      errors.push(`data/search-index.json: ${document.id} type ${document.type} does not match index type ${expectedSearchTypes.get(document.id)}`);
    }
  }
  for (const key of expectedSearchKeys) if (!searchKeys.has(key)) errors.push(`data/search-index.json: missing searchable entry ${key}`);
  for (const key of searchKeys) if (!expectedSearchKeys.has(key)) errors.push(`data/search-index.json: unexpected entry ${key}`);

  return errors;
}

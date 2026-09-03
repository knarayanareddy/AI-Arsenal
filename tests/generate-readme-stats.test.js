import test from 'node:test';
import assert from 'node:assert/strict';
import {
  renderStatsTable,
  applyStatsBlock,
  STATS_BLOCK_START,
  STATS_BLOCK_END
} from '../scripts/generate-readme-stats.js';

// Covers scripts/generate-readme-stats.js, which rewrites only the marked
// stats block in README.md from data/stats.json.

const STATS = {
  schema_version: '1.0.0',
  generated_at: '2026-09-03T09:00:00.000Z',
  entries: {
    total: 1062,
    projects: 322,
    tools: 215,
    papers: 128,
    tips: 171,
    people: 25,
    digests: 1,
    guides: 59,
    build_examples: 8,
    architectures: 29,
    observability: 16,
    community: 32,
    benchmarks: 52,
    trending: 4
  }
};

test('renderStatsTable reflects stats.json exactly, in the documented row order', () => {
  const table = renderStatsTable(STATS);
  assert.match(table, /\| Tools \| 215 \|/);
  assert.match(table, /\| Total content entries \| 1062 \|/);
  // Display order is the documented one, not stats.json key order.
  const order = [...table.matchAll(/^\| ([^|]+) \|/gm)].map((m) => m[1].trim());
  assert.deepEqual(order.slice(0, 5), ['Type', 'Projects', 'Tools', 'Papers', 'Tips']);
  assert.equal(order[order.length - 1], 'Total content entries');
});

test('renderStatsTable includes every collection, so a new vertical cannot be silently dropped', () => {
  const withExtra = { entries: { ...STATS.entries, skills: 35 } };
  const table = renderStatsTable(withExtra);
  assert.match(table, /\| skills \| 35 \|/);
  // ...and the total still comes from stats.json rather than being summed here.
  assert.match(table, /\| Total content entries \| 1062 \|/);
});

test('renderStatsTable refuses to write a table from a malformed stats file', () => {
  assert.throws(() => renderStatsTable({}), /entries\.total/);
  assert.throws(() => renderStatsTable({ entries: { projects: 1 } }), /entries\.total/);
});

test('applyStatsBlock replaces an existing block and leaves surrounding prose alone', () => {
  const readme = [
    '# AI Arsenal',
    '',
    'Current generated stats:',
    '',
    STATS_BLOCK_START,
    '| Type | Count |',
    '|---|---:|',
    '| Projects | 999 |',
    '| Total content entries | 999 |',
    STATS_BLOCK_END,
    '',
    'Browse the generated statistics in [`data/stats.json`](./data/stats.json).',
    ''
  ].join('\n');

  const updated = applyStatsBlock(readme, renderStatsTable(STATS));
  assert.ok(!updated.includes('| Projects | 999 |'), 'stale count survived');
  assert.match(updated, /\| Projects \| 322 \|/);
  assert.ok(updated.startsWith('# AI Arsenal\n\nCurrent generated stats:'), 'prose above the block was modified');
  assert.ok(updated.includes('Browse the generated statistics in'), 'prose below the block was modified');
  assert.equal(updated.split(STATS_BLOCK_START).length, 2, 'block markers must appear exactly once');
});

test('applyStatsBlock is idempotent', () => {
  const once = applyStatsBlock(`# T\n\n${STATS_BLOCK_START}\nold\n${STATS_BLOCK_END}\n\ntail\n`, renderStatsTable(STATS));
  const twice = applyStatsBlock(once, renderStatsTable(STATS));
  assert.equal(once, twice);
});

test('applyStatsBlock inserts the block above the stats anchor on first run', () => {
  const readme = '# AI Arsenal\n\nCurrent generated stats:\n\n| Type | Count |\n|---|---:|\n| Projects | 322 |\n\nBrowse the generated statistics in [`data/stats.json`](./data/stats.json).\n';
  const updated = applyStatsBlock(readme, renderStatsTable(STATS));
  assert.ok(updated.includes(STATS_BLOCK_START));
  assert.ok(updated.indexOf(STATS_BLOCK_START) < updated.indexOf('Browse the generated statistics in'));
});

test('applyStatsBlock fails loudly rather than silently doing nothing', () => {
  assert.throws(() => applyStatsBlock('# No anchor here\n', renderStatsTable(STATS)), /anchor/);
});

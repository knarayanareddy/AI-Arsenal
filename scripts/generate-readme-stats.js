#!/usr/bin/env node
// Regenerate the "Current generated stats" table in README.md from
// data/stats.json.
//
// The table was hand-maintained and had drifted (it claimed 214 tools / 1,061
// entries while the catalog held 215 / 1,062, and it disagreed with the very
// data/stats.json it links to). Rather than fix the numbers once, the block is
// now generated between explicit markers — the same pattern the repo already
// uses for the registry section of content/**/_index.md.
//
// Only the marked block is rewritten; everything else in README.md is
// hand-authored and left untouched.
import fs from 'node:fs/promises';
import chalk from 'chalk';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const STATS_BLOCK_START = '<!-- AUTO-GENERATED STATS TABLE — do not edit; run `pnpm run generate:readme-stats` -->';
export const STATS_BLOCK_END = '<!-- /AUTO-GENERATED STATS TABLE -->';

// Stable display order and labels, keyed by the data/stats.json entry keys.
// Anything stats.json adds later is appended in key order so a new vertical
// shows up instead of being silently dropped.
const ROW_ORDER = [
  ['projects', 'Projects'],
  ['tools', 'Tools'],
  ['papers', 'Papers'],
  ['tips', 'Tips'],
  ['guides', 'Guides'],
  ['benchmarks', 'Benchmarks'],
  ['people', 'People'],
  ['community', 'Community'],
  ['architectures', 'Architectures'],
  ['build_examples', 'Build examples'],
  ['observability', 'Observability'],
  ['trending', 'Trends'],
  ['digests', 'Digests']
];

export function renderStatsTable(stats) {
  const entries = stats?.entries;
  if (!entries || typeof entries !== 'object' || typeof entries.total !== 'number') {
    throw new Error('data/stats.json is missing entries.total; run `pnpm run generate:stats` first.');
  }
  const rows = [];
  const seen = new Set();
  for (const [key, label] of ROW_ORDER) {
    if (typeof entries[key] !== 'number') continue;
    seen.add(key);
    rows.push(`| ${label} | ${entries[key]} |`);
  }
  for (const [key, value] of Object.entries(entries)) {
    if (key === 'total' || seen.has(key) || typeof value !== 'number') continue;
    rows.push(`| ${key.replace(/_/g, ' ')} | ${value} |`);
  }
  return [
    STATS_BLOCK_START,
    '| Type | Count |',
    '|---|---:|',
    ...rows,
    `| Total content entries | ${entries.total} |`,
    STATS_BLOCK_END
  ].join('\n');
}

// Replace the marked block, or insert it directly above the "Browse the
// generated statistics" line the first time this runs.
export function applyStatsBlock(readme, block) {
  const start = readme.indexOf(STATS_BLOCK_START);
  const end = readme.indexOf(STATS_BLOCK_END);
  if (start !== -1 && end !== -1 && end > start) {
    return `${readme.slice(0, start)}${block}${readme.slice(end + STATS_BLOCK_END.length)}`;
  }
  const anchor = 'Browse the generated statistics in';
  const anchorIndex = readme.indexOf(anchor);
  if (anchorIndex === -1) {
    throw new Error('README.md has no stats block markers and no "Browse the generated statistics" anchor to insert at.');
  }
  // Walk back to the start of the line so the block sits on its own lines.
  const lineStart = readme.lastIndexOf('\n', anchorIndex) + 1;
  return `${readme.slice(0, lineStart)}${block}\n\n${readme.slice(lineStart)}`;
}

async function main() {
  const repoRoot = process.cwd();
  const readmePath = process.argv.find((a) => a.startsWith('--readme='))?.split('=')[1] ?? 'README.md';
  const statsPath = process.argv.find((a) => a.startsWith('--stats='))?.split('=')[1] ?? 'data/stats.json';

  const [readme, stats] = await Promise.all([
    fs.readFile(path.resolve(repoRoot, readmePath), 'utf8'),
    JSON.parse(await fs.readFile(path.resolve(repoRoot, statsPath), 'utf8'))
  ]);

  const updated = applyStatsBlock(readme, renderStatsTable(stats));
  if (updated === readme) {
    console.log(chalk.green(`README stats table already current (${readmePath}).`));
    return;
  }
  await fs.writeFile(path.resolve(repoRoot, readmePath), updated);
  console.log(chalk.green(`Updated README stats table in ${readmePath} (${stats.entries.total} entries).`));
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  await main();
}

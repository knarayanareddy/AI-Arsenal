import test from 'node:test';
import assert from 'node:assert/strict';
import { renderBrowseSection } from '../scripts/utils/toc.js';

const fmt = (e) => `- [${e.data.name}](${e.file})`;

test('renderBrowseSection lists every entry (no cap)', () => {
  const local = Array.from({ length: 137 }, (_, i) => ({
    file: `dir/entry-${i}.md`,
    data: { name: `Entry ${i}` },
  }));
  const out = renderBrowseSection(local, fmt);
  const lines = out.split('\n');
  assert.equal(lines.length, 137, 'Browse All must include all entries, not a truncated slice');
  // Both the first and the alphabetically-later tail entries are present.
  assert.ok(out.includes('dir/entry-0.md'));
  assert.ok(out.includes('dir/entry-136.md'));
});

test('renderBrowseSection preserves input order', () => {
  const local = [
    { file: 'a.md', data: { name: 'A' } },
    { file: 'b.md', data: { name: 'B' } },
    { file: 'c.md', data: { name: 'C' } },
  ];
  assert.equal(renderBrowseSection(local, fmt), '- [A](a.md)\n- [B](b.md)\n- [C](c.md)');
});

test('renderBrowseSection returns placeholder when empty', () => {
  assert.equal(renderBrowseSection([], fmt), '_No entries yet._');
});

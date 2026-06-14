import test from 'node:test';
import assert from 'node:assert/strict';
import { escapeMarkdownCell, escapeMarkdownInline, truncate } from '../scripts/utils/markdown-escape.js';

test('escapeMarkdownCell escapes pipe characters', () => {
  assert.equal(escapeMarkdownCell('foo | bar'), 'foo \\| bar');
  assert.equal(escapeMarkdownCell('no pipes here'), 'no pipes here');
});

test('escapeMarkdownCell escapes backticks', () => {
  assert.equal(escapeMarkdownCell('use `npm` to install'), 'use \\`npm\\` to install');
});

test('escapeMarkdownCell collapses newlines into spaces', () => {
  assert.equal(escapeMarkdownCell('line1\nline2\r\nline3'), 'line1 line2 line3');
});

test('escapeMarkdownCell handles null and undefined', () => {
  assert.equal(escapeMarkdownCell(null), '');
  assert.equal(escapeMarkdownCell(undefined), '');
  assert.equal(escapeMarkdownCell(42), '42');
});

test('escapeMarkdownInline escapes brackets', () => {
  assert.equal(escapeMarkdownInline('[link](url)'), '\\[link\\](url)');
});

test('truncate preserves text under the limit', () => {
  assert.equal(truncate('short text', 100), 'short text');
});

test('truncate adds ellipsis when over the limit', () => {
  const text = 'a'.repeat(700);
  const out = truncate(text, 100);
  assert.ok(out.length <= 100);
  assert.ok(out.endsWith('…'));
});

test('truncate trims whitespace', () => {
  assert.equal(truncate('   spaces   ', 100), 'spaces');
});

test('truncate handles non-string', () => {
  assert.equal(truncate(null, 100), '');
  assert.equal(truncate(undefined, 100), '');
});

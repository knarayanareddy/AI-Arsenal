import test from 'node:test';
import assert from 'node:assert/strict';
import { extractUrls } from '../scripts/utils/markdown.js';

test('extractUrls filters and dedupes', () => {
  const md = `
    See https://example.com and https://example.com again.
    Also [the GitHub page](https://github.com/foo/bar).
  `;
  const urls = extractUrls(md);
  assert.equal(urls.length, 2);
  assert.ok(urls.some((u) => u === 'https://example.com'));
  assert.ok(urls.some((u) => u === 'https://github.com/foo/bar'));
});

test('extractUrls handles URLs inside parentheses correctly', () => {
  const md = 'See [docs](https://example.com/docs?q=1) and [home](https://example.com/)';
  const urls = extractUrls(md);
  assert.equal(urls.length, 2);
  assert.ok(urls.some((u) => u === 'https://example.com/docs?q=1'));
  assert.ok(urls.some((u) => u === 'https://example.com/'));
});

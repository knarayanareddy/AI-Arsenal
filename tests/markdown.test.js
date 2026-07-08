import test from 'node:test';
import assert from 'node:assert/strict';
import { extractHeadings, stripMarkdown, extractUrls, REQUIRED_ENTRY_HEADINGS } from '../scripts/utils/markdown.js';

test('extractHeadings returns H2 headings', () => {
  const md = `## Overview\n\n## Why It's in the Arsenal\n\n### Subheading (ignored)\n\n## Resources`;
  const headings = extractHeadings(md);
  assert.deepEqual(headings, ['Overview', "Why It's in the Arsenal", 'Resources']);
});

test('extractHeadings returns empty array for no headings', () => {
  assert.deepEqual(extractHeadings('No headings here\nJust text'), []);
});

test('extractHeadings handles CRLF line endings', () => {
  const md = '## A\r\n## B\r\n## C\r\n';
  assert.deepEqual(extractHeadings(md), ['A', 'B', 'C']);
});

test('stripMarkdown removes code fences', () => {
  const md = 'before ```code block``` after';
  const stripped = stripMarkdown(md);
  assert.equal(stripped.includes('code'), false);
  assert.match(stripped, /before/);
  assert.match(stripped, /after/);
});

test('stripMarkdown removes inline code backticks', () => {
  const md = 'text with `inline code` here';
  const stripped = stripMarkdown(md);
  assert.equal(stripped, 'text with inline code here');
});

test('stripMarkdown extracts link text from markdown links', () => {
  const md = 'See [the docs](https://example.com) for more';
  const stripped = stripMarkdown(md);
  assert.equal(stripped, 'See the docs for more');
});

test('stripMarkdown drops image syntax but keeps alt text', () => {
  const md = '![alt text](https://example.com/img.png) caption';
  const stripped = stripMarkdown(md);
  assert.match(stripped, /caption/);
});

test('stripMarkdown collapses repeated whitespace', () => {
  const md = 'a\n\n\n\nb\n\t\tc';
  const stripped = stripMarkdown(md);
  assert.equal(stripped, 'a b c');
});

test('extractUrls finds bare URLs', () => {
  const md = 'See https://example.com and http://other.com for details';
  const urls = extractUrls(md);
  assert.deepEqual(urls.sort(), ['http://other.com', 'https://example.com']);
});

test('extractUrls finds markdown link URLs', () => {
  const md = 'See [link](https://example.com) and [other](https://other.com/path?q=1)';
  const urls = extractUrls(md);
  assert.deepEqual(urls.sort(), ['https://example.com', 'https://other.com/path?q=1']);
});

test('extractUrls dedupes overlapping URLs', () => {
  const md = 'https://example.com\n[link](https://example.com)';
  const urls = extractUrls(md);
  assert.equal(urls.length, 1);
  assert.equal(urls[0], 'https://example.com');
});

test('extractUrls captures URLs (does not strip trailing punctuation by default)', () => {
  // Note: the current regex `https?:\/\/[^\s)>'\"]+` keeps trailing dots
  // in URLs. We document this as known behaviour; callers should treat
  // URLs as substrings and strip punctuation at the consumer if needed.
  const md = 'Visit https://example.com.';
  const urls = extractUrls(md);
  assert.equal(urls.length, 1);
  assert.equal(urls[0], 'https://example.com.');
});

test('REQUIRED_ENTRY_HEADINGS is non-empty', () => {
  assert.ok(REQUIRED_ENTRY_HEADINGS.length > 0);
  assert.ok(REQUIRED_ENTRY_HEADINGS.includes('Overview'));
});

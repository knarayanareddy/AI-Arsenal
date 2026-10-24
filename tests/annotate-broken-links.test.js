import test from 'node:test';
import assert from 'node:assert/strict';
import { escapeAnnotation, formatAnnotations, MAX_ANNOTATIONS } from '../scripts/annotate-broken-links.js';

test('broken links are annotated with the file that contains them', () => {
  const report = {
    broken_links: [{ url: 'https://example.com/gone', status: 404, files: ['content/tools/x.md', 'docs/y.md'] }]
  };
  const lines = formatAnnotations(report).join('\n').split('\n');
  assert.equal(lines.length, 2);
  assert.match(lines[0], /^::error file=content\/tools\/x\.md,title=Broken link::broken link \(404\): https:\/\/example\.com\/gone$/);
  assert.match(lines[1], /file=docs\/y\.md/);
});

test('an unattributed URL still produces a visible annotation', () => {
  const lines = formatAnnotations({ broken_links: [{ url: 'https://example.com/gone', error: 'ENOTFOUND' }] });
  assert.deepEqual(lines, ['::error title=Broken link::broken link (ENOTFOUND): https://example.com/gone']);
});

test('annotation payloads cannot break out of the workflow command', () => {
  assert.equal(escapeAnnotation('a%b\r\nc'), 'a%25b%0D%0Ac');
  const [line] = formatAnnotations({ broken_links: [{ url: 'https://example.com/a%20b', status: 410 }] });
  assert.ok(line.includes('a%2520b'));
});

test('missing or empty reports emit nothing', () => {
  assert.deepEqual(formatAnnotations(null), []);
  assert.deepEqual(formatAnnotations({ broken_links: [] }), []);
});

test('annotations are capped so one run cannot flood the checks view', () => {
  const broken_links = Array.from({ length: MAX_ANNOTATIONS + 5 }, (_, i) => ({ url: `https://example.com/${i}`, status: 404 }));
  assert.equal(formatAnnotations({ broken_links }).length, MAX_ANNOTATIONS);
});

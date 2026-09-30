import test from 'node:test';
import assert from 'node:assert/strict';
import {
  extractInternalLinkTargets,
  isExternalTarget,
  resolveInternalTarget,
  stripHtmlComments,
  findBrokenInternalLinks
} from '../scripts/utils/internal-links.js';
import { getMarkdownFiles, CONTENT_GLOB } from '../scripts/utils/frontmatter.js';

// These tests exercise the logic behind scripts/validate-internal-links.js,
// which covers the gap between check-links.js (absolute http(s) URLs only) and
// validate-references.js (frontmatter IDs only). `readFile` / `exists` are
// injected, so the broken-link cases run against an in-memory tree.

const TREE = {
  'content/a/one.md': 'See [two](./two.md), [the index](../_index.md), and [ghost](./missing.md).',
  'content/a/two.md': 'Back to [one](one.md), or [a folder](../b/).',
  'content/_index.md': '# Index',
  'content/b/': null // directory marker
};
const FILES = Object.keys(TREE).filter((f) => f.endsWith('.md'));
const readFile = (file) => {
  if (!(file in TREE)) throw new Error(`ENOENT: ${file}`);
  return TREE[file];
};
// resolveInternalTarget returns absolute paths, so match on the repo-relative tail.
const exists = (target) => target.endsWith('content/b') || Object.keys(TREE).some((k) => target.endsWith(k));

test('extractInternalLinkTargets skips external, mailto, and anchor targets', () => {
  const md = [
    '[site](https://example.com/x.md)',
    '[proto-relative](//cdn.example.com/x.md)',
    '[mail](mailto:hi@example.com)',
    '[anchor](#overview)',
    '[local](./two.md)'
  ].join('\n');
  assert.deepEqual(extractInternalLinkTargets(md), ['./two.md']);
});

test('isExternalTarget classifies schemes and fragments', () => {
  assert.equal(isExternalTarget('https://example.com'), true);
  assert.equal(isExternalTarget('mailto:a@b.c'), true);
  assert.equal(isExternalTarget('#heading'), true);
  assert.equal(isExternalTarget('./two.md'), false);
  assert.equal(isExternalTarget('../_index.md'), false);
});

test('links and images are both collected, with titles and angle brackets handled', () => {
  const md = '![logo](./img/logo.png) [titled](./two.md "Two") [spaced](<./two.md>)';
  assert.deepEqual(extractInternalLinkTargets(md), ['./img/logo.png', './two.md', './two.md']);
});

test('non-rendered text is not link-checked: code fences, inline code, HTML comments', () => {
  const md = [
    '```md',
    '[fenced](./missing-in-fence.md)',
    '```',
    'Inline `[not-a-link](./missing-inline.md)` stays prose.',
    '<!-- [commented](./missing-in-comment.md) -->',
    '[real](./two.md)'
  ].join('\n');
  assert.deepEqual(extractInternalLinkTargets(md), ['./two.md']);
});

test('stripHtmlComments removes comments and re-runs until stable', () => {
  assert.equal(stripHtmlComments('a <!-- x --> b <!-- y --> c'), 'a  b  c');
  // Overlapping markers cannot survive a single pass; the loop keeps going
  // until no comment opener is left (same rule as scripts/check-links.js).
  const overlapped = stripHtmlComments('a <!-- x <!-- y --> b --> c');
  assert.ok(!overlapped.includes('<!--'), `comment marker survived: ${overlapped}`);
});

test('resolveInternalTarget drops fragments and queries, and decodes escapes', () => {
  assert.equal(resolveInternalTarget('content/a/one.md', './two.md#overview'), resolveInternalTarget('content/a/one.md', './two.md'));
  assert.equal(resolveInternalTarget('content/a/one.md', './two.md?x=1'), resolveInternalTarget('content/a/one.md', './two.md'));
  assert.equal(resolveInternalTarget('content/a/one.md', './two%20copy.md'), resolveInternalTarget('content/a/one.md', './two copy.md'));
  assert.equal(resolveInternalTarget('content/a/one.md', '#only-a-fragment'), null);
});

test('a repo-root-relative target is broken when it only resolves from the root', () => {
  // The content/trending/this-week.md pattern: "content/projects/x" written
  // from inside content/trending/ resolves to content/trending/content/...
  const files = ['content/trending/this-week.md'];
  const read = () => '[DSPy](content/projects/frameworks/dspy)';
  const existsFn = (target) => target.endsWith('content/projects/frameworks/dspy.md');
  const { broken } = findBrokenInternalLinks(files, { readFile: read, exists: existsFn });
  assert.equal(broken.length, 1);
  assert.equal(broken[0].target, 'content/projects/frameworks/dspy');
});

test('findBrokenInternalLinks reports missing targets and accepts valid ones', () => {
  const { broken, checkedFiles, checkedLinks } = findBrokenInternalLinks(FILES, { readFile, exists });
  assert.deepEqual(broken.map((b) => `${b.file}:${b.target}`), ['content/a/one.md:./missing.md']);
  assert.equal(checkedFiles, 3);
  assert.equal(checkedLinks, 5);
});

test('a directory target resolves, and repeated broken links are reported once', () => {
  const files = ['content/c/repeat.md'];
  const read = () => '[a](../b/) and [a again](../b/) and [missing](../nope.md) and [missing](../nope.md)';
  const existsFn = (target) => target.endsWith('content/b');
  const { broken, checkedLinks } = findBrokenInternalLinks(files, { readFile: read, exists: existsFn });
  assert.equal(checkedLinks, 4);
  assert.equal(broken.length, 1);
  assert.equal(broken[0].target, '../nope.md');
});

test('unreadable files are skipped rather than reported as link failures', () => {
  // A changed-file run can be handed a path deleted in the same commit; that
  // is not a link finding, and the remaining file is still scanned.
  const { broken, checkedFiles } = findBrokenInternalLinks(['content/deleted.md', 'content/_index.md'], { readFile, exists });
  assert.equal(checkedFiles, 1);
  assert.equal(broken.length, 0);
});

test('the committed catalog has no broken internal links', async () => {
  const files = (await getMarkdownFiles(CONTENT_GLOB)).filter((f) => f.startsWith('content/') && f.endsWith('.md'));
  assert.ok(files.length > 1000, `expected the full catalog to be scanned, got ${files.length}`);
  const { broken, checkedLinks } = findBrokenInternalLinks(files);
  assert.ok(checkedLinks > 5000, `expected thousands of relative links, got ${checkedLinks}`);
  assert.deepEqual(broken.map((b) => `${b.file}: ${b.target}`), []);
});

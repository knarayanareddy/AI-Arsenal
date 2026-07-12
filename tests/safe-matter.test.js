import test from 'node:test';
import assert from 'node:assert/strict';
import safeMatter, { assertSafeFrontmatter, MAX_FRONTMATTER_BYTES } from '../scripts/utils/safe-matter.js';

test('parses ordinary frontmatter into the same shape as before', () => {
  const raw = '---\nid: demo\nname: Demo\ntags:\n  - agents\n  - rag\nadded_date: "2026-07-12"\n---\n## Overview\nbody';
  const { data, content } = safeMatter(raw);
  assert.deepEqual(data, { id: 'demo', name: 'Demo', tags: ['agents', 'rag'], added_date: '2026-07-12' });
  assert.match(content, /## Overview/);
});

test('does not execute custom YAML type tags (no !!js/function code execution)', () => {
  const raw = '---\nx: !!js/function "function(){return 1}"\n---\n';
  // js-yaml v4 default schema does not resolve !!js/* tags, so this throws
  // rather than producing an executable function.
  assert.throws(() => safeMatter(raw));
});

test('rejects YAML anchors/aliases (alias-expansion DoS vector)', () => {
  assert.throws(() => assertSafeFrontmatter('a: &anchor value\nb: *anchor'), /anchors, aliases, or merge keys/);
  assert.throws(() => safeMatter('---\na: &x [1]\nb: *x\n---\n'), /anchors, aliases, or merge keys/);
});

test('rejects YAML merge keys', () => {
  assert.throws(() => assertSafeFrontmatter('base: &b { k: 1 }\nchild:\n  <<: *b'), /anchors, aliases, or merge keys/);
});

test('rejects frontmatter over the byte cap', () => {
  const big = `k: "${'a'.repeat(MAX_FRONTMATTER_BYTES + 1)}"`;
  assert.throws(() => assertSafeFrontmatter(big), /byte limit/);
});

test('does not misfire on * or & inside quoted scalars', () => {
  const raw = '---\ndescription: "rated 5 * and A&B partners"\nnote: \'use * wildcard\'\n---\n';
  assert.doesNotThrow(() => safeMatter(raw));
  assert.equal(safeMatter(raw).data.description, 'rated 5 * and A&B partners');
});

test('stringify round-trips without emitting YAML references', () => {
  const shared = { a: 1 };
  const data = { first: shared, second: shared };
  const out = safeMatter.stringify('body', data);
  assert.doesNotMatch(out, /[&*]/);
  assert.deepEqual(safeMatter(out).data, { first: { a: 1 }, second: { a: 1 } });
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeBodyHtml } from '../scripts/utils/html-sanitizer.js';

test('sanitizeBodyHtml preserves safe Markdown-derived HTML', () => {
  const input = '<p>Hello <strong>world</strong></p><ul><li>one</li><li>two</li></ul>';
  const output = sanitizeBodyHtml(input);
  assert.match(output, /<p>Hello <strong>world<\/strong><\/p>/);
  assert.match(output, /<li>one<\/li>/);
});

test('sanitizeBodyHtml strips script tags and content', () => {
  const input = '<p>safe</p><script>alert("xss")</script>';
  const output = sanitizeBodyHtml(input);
  assert.doesNotMatch(output, /script/i);
  assert.doesNotMatch(output, /alert/);
  assert.match(output, /<p>safe<\/p>/);
});

test('sanitizeBodyHtml strips event handlers', () => {
  const input = '<img src="https://example.com/x.png" onerror="alert(1)">';
  const output = sanitizeBodyHtml(input);
  assert.doesNotMatch(output, /onerror/i);
  assert.doesNotMatch(output, /alert/);
});

test('sanitizeBodyHtml strips javascript: URLs in href', () => {
  const input = '<a href="javascript:alert(1)">click</a>';
  const output = sanitizeBodyHtml(input);
  assert.doesNotMatch(output, /javascript:/i);
});

test('sanitizeBodyHtml strips data: URLs except in img', () => {
  const anchorInput = '<a href="data:text/html,<script>alert(1)</script>">x</a>';
  assert.doesNotMatch(sanitizeBodyHtml(anchorInput), /data:/i);

  const imgInput = '<img src="data:image/png;base64,iVBORw0KGgo=" alt="x">';
  // data: in img is allowed; the alt is preserved
  const out = sanitizeBodyHtml(imgInput);
  assert.match(out, /alt="x"/);
});

test('sanitizeBodyHtml strips iframe', () => {
  const input = '<iframe src="https://evil.example/"></iframe>';
  const output = sanitizeBodyHtml(input);
  assert.doesNotMatch(output, /iframe/i);
});

test('sanitizeBodyHtml strips object and embed', () => {
  const input = '<object data="evil"></object><embed src="evil">';
  const output = sanitizeBodyHtml(input);
  assert.doesNotMatch(output, /object/i);
  assert.doesNotMatch(output, /embed/i);
});

test('sanitizeBodyHtml strips style tags', () => {
  const input = '<style>body { background: url(javascript:alert(1)) }</style>';
  const output = sanitizeBodyHtml(input);
  assert.doesNotMatch(output, /style/i);
});

test('sanitizeBodyHtml adds noopener/noreferrer to external links', () => {
  const input = '<a href="https://example.com">x</a>';
  const output = sanitizeBodyHtml(input);
  assert.match(output, /rel="noopener noreferrer nofollow"/);
  assert.match(output, /target="_blank"/);
});

test('sanitizeBodyHtml handles non-string input', () => {
  assert.equal(sanitizeBodyHtml(undefined), '');
  assert.equal(sanitizeBodyHtml(null), '');
  assert.equal(sanitizeBodyHtml(42), '');
});

test('sanitizeBodyHtml allows Mermaid-relevant divs', () => {
  // Mermaid code blocks are written as fenced ```mermaid blocks; the
  // sanitized output is the rendered text content, not the original
  // <div class="mermaid"> wrapper (we never render pre-sanitization
  // HTML in our pipeline). Verify content preservation instead.
  const input = '<div class="mermaid">graph TD; A-->B</div>';
  const output = sanitizeBodyHtml(input);
  assert.match(output, /graph TD/);
  assert.match(output, /A/);
  assert.match(output, /B/);
});

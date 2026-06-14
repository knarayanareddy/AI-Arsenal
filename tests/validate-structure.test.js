import test from 'node:test';
import assert from 'node:assert/strict';
import { REQUIRED_ENTRY_HEADINGS, extractHeadings } from '../scripts/utils/markdown.js';

test('REQUIRED_ENTRY_HEADINGS includes the standard set', () => {
  for (const heading of [
    'Overview',
    "Why It's in the Arsenal",
    'Key Features',
    'Architecture / How It Works',
    'Getting Started',
    'Use Cases',
    'Strengths',
    'Limitations / When NOT to Use',
    'Integration Patterns',
    'Resources',
    'Buzz & Reception'
  ]) {
    assert.ok(REQUIRED_ENTRY_HEADINGS.includes(heading), `missing required heading ${heading}`);
  }
});

test('extractHeadings returns headings in document order', () => {
  const md = [
    '## Overview',
    '## Why It\'s in the Arsenal',
    '## Key Features',
    '## Architecture / How It Works',
    '## Getting Started',
    '## Use Cases',
    '## Strengths',
    '## Limitations / When NOT to Use',
    '## Integration Patterns',
    '## Resources',
    '## Buzz & Reception'
  ].join('\n');
  const headings = extractHeadings(md);
  assert.equal(headings.length, REQUIRED_ENTRY_HEADINGS.length);
  for (let i = 0; i < REQUIRED_ENTRY_HEADINGS.length; i++) {
    assert.equal(headings[i], REQUIRED_ENTRY_HEADINGS[i]);
  }
});

test('extractHeadings detects missing headings', () => {
  const md = '## Overview\n## Key Features\n## Resources';
  const headings = extractHeadings(md);
  const missing = REQUIRED_ENTRY_HEADINGS.filter((h) => !headings.includes(h));
  assert.ok(missing.length > 0, 'should detect missing required headings');
  assert.ok(missing.includes('Getting Started'));
});

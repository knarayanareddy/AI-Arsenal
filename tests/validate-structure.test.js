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

// Mirrors the research-vertical "Key Results" benchmark-date heuristic in
// scripts/validate-structure.js's researchContentChecks(). Tested as a pure
// unit here (rather than against the live content/ tree), following the
// same pattern as tests/check-migration-progress.test.js.
function findUndatedBenchmarkBullets(keyResultsBody, paperYear = null) {
  const scoreLikePattern = /(\d+(\.\d+)?\s?%|pass@\d+|\bF1\b|\bBLEU\b|\bEM\b|exact match|accuracy|perplexity)/i;
  const yearPattern = /\b(19|20)\d{2}\b/;
  const currentClaimPattern = /\b(current|today|latest|frontier|recent|independent|post-publication|as of)\b/i;
  const flagged = [];
  for (const line of keyResultsBody.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('-') && !trimmed.startsWith('*')) continue;
    const hasDateContext = yearPattern.test(trimmed) || (paperYear && !currentClaimPattern.test(trimmed));
    if (scoreLikePattern.test(trimmed) && !hasDateContext) flagged.push(trimmed);
  }
  return flagged;
}

test('research Key Results heuristic flags a benchmark claim with no year', () => {
  const body = '- 92.3 accuracy on GLUE\n- A prose line with no score at all';
  const flagged = findUndatedBenchmarkBullets(body);
  assert.equal(flagged.length, 1);
  assert.match(flagged[0], /92\.3 accuracy/);
});

test('research Key Results heuristic accepts explicit years and paper-year context', () => {
  const body = '- 92.3 accuracy on GLUE (2019) — now considered saturated\n- 28.4 BLEU on WMT 2014 (2017)\n- 91.0 accuracy on the paper benchmark';
  assert.equal(findUndatedBenchmarkBullets(body).length, 1);
  assert.equal(findUndatedBenchmarkBullets(body, 2019).length, 0);
});

test('research Key Results heuristic ignores non-bullet prose and non-score bullets', () => {
  const body = 'Some intro prose with 50% mentioned but not a bullet.\n- This bullet has no score-shaped text at all';
  const flagged = findUndatedBenchmarkBullets(body);
  assert.equal(flagged.length, 0);
});

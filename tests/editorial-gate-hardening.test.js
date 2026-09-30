// Regression test for the editorial gate's two hardened rules.
//
// These exist because an audit found both rules were evadable: a body section
// copied from `description` escaped when padded past 1.6x the field length,
// and generic-praise prose ("an amazing, awesome, fantastic project") was not
// checked at all outside the community vertical. This test proves the fixed
// rules catch the attacks and do not fire on well-written entries.
//
// Usage: node --test tests/editorial-gate-hardening.test.js
//        node tests/editorial-gate-hardening.test.js

import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// A real entry with zero baseline findings, so anything reported is genuinely
// new and the test measures the rule rather than a suppression.
const TARGET = 'content/projects/frameworks/dspy.md';

function splitEntry(text) {
  const parts = text.split('---', 2);
  return { frontmatter: `---${parts[1]}---`, body: parts[2] ?? '' };
}

function withBody(body, run) {
  const abs = path.join(REPO, TARGET);
  const original = fs.readFileSync(abs, 'utf8');
  try {
    fs.writeFileSync(abs, splitEntry(original).frontmatter + body);
    return run();
  } finally {
    fs.writeFileSync(abs, original);
  }
}

function editorialFindings() {
  // The validator exits non-zero precisely when it has findings to report,
  // which is the case under test, so a non-zero status is expected here and
  // must not be treated as a harness error.
  let out = '';
  try {
    out = execFileSync('node', ['scripts/validate-editorial-quality.js', '--all'], {
      cwd: REPO,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024
    });
  } catch (error) {
    out = `${error.stdout ?? ''}${error.stderr ?? ''}`;
  }
  return out
    .split('\n')
    .filter((line) => line.includes(TARGET))
    .map((line) => line.trim());
}

const DESCRIPTION =
  'A framework for programming and optimizing language model pipelines';

test('Overview copied from description is caught, however many times repeated', () => {
  for (const repeats of [1, 3, 6]) {
    const lines = withBody(
      `## Overview\n${(DESCRIPTION + '\n').repeat(repeats)}`,
      editorialFindings
    );
    assert.ok(
      lines.some((line) => line.includes('overview-copied-from-frontmatter')),
      `padding the copy ${repeats}x should not hide it; got: ${JSON.stringify(lines)}`
    );
  }
});

test('generic praise with no named technical content is caught', () => {
  const lines = withBody(
    '## Overview\n\nThis is an amazing, awesome, fantastic, wonderful community ' +
      'resource with incredible results for teams building agents and models ' +
      'across every task and domain you might encounter in production today.\n',
    editorialFindings
  );
  assert.ok(
    lines.some((line) => line.includes('section-generic-praise')),
    `unbacked praise should fail; got: ${JSON.stringify(lines)}`
  );
});

test('specific technical prose does not trip the generic-praise rule', () => {
  const lines = withBody(
    '## Overview\n\nDspy compiles declarative LM programs into a graph, then runs an ' +
      'optimizer such as BootstrapFewShot against a metric you supply, caching ' +
      'compiled artifacts per model. The optimizer searches over both the ' +
      'demonstrations and the LM itself, measuring improvement with your metric ' +
      'rather than a proxy, which is what matters when the task has no exact ' +
      'answer. Retrieval happens inside the compiled program, so changing the ' +
      'retriever is a graph edit rather than a prompt edit.\n',
    editorialFindings
  );
  assert.ok(
    !lines.some((line) => line.includes('section-generic-praise')),
    `substantive prose must not be flagged; got: ${JSON.stringify(lines)}`
  );
});

test('a real entry body produces no generic-praise finding', () => {
  const body = splitEntry(fs.readFileSync(path.join(REPO, TARGET), 'utf8')).body;
  const lines = withBody(body, editorialFindings);
  assert.ok(
    !lines.some((line) => line.includes('section-generic-praise')),
    `the shipped entry must stay clean; got: ${JSON.stringify(lines)}`
  );
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { extractSections, inspectEntry, tokenOverlap } from '../scripts/validate-editorial-quality.js';

test('editorial section extraction preserves section boundaries', () => {
  const sections = extractSections('## Overview\nOne.\n\n## Architecture\nTwo.\n');
  assert.equal(sections.get('Overview'), 'One.');
  assert.equal(sections.get('Architecture'), 'Two.');
});

test('token overlap identifies frontmatter copied into a body section', () => {
  assert.ok(tokenOverlap('The benchmark measures retrieval quality and latency.', 'The benchmark measures retrieval quality and latency.') > 0.99);
  assert.ok(tokenOverlap('The benchmark measures retrieval quality.', 'The deployment uses a Kubernetes gateway.') < 0.5);
});

test('editorial inspection rejects known boilerplate in a new project', () => {
  const headings = [
    'Overview',
    "Why it's in the Arsenal",
    'Architecture',
    'Ecosystem Position',
    'Getting Started',
    'Key Use Cases',
    'Strengths',
    'Limitations',
    'Relation to the Arsenal',
    'Resources'
  ];
  const content = headings.map((heading) => `## ${heading}\nThe repository provides the implementation and integrations described by its official documentation. This entry keeps the architecture summary deliberately high-level until independent reproduction confirms exact operational boundaries.`).join('\n\n');
  const issues = inspectEntry({
    file: 'content/projects/frameworks/example.md',
    data: {
      added_date: '2026-07-11',
      artifact_type: 'framework',
      description: 'Example framework for an AI workflow',
      best_for: ['You need the problem space covered by an open-source component', 'You can evaluate the current release against your own data, deployment, and operational constraints'],
      avoid_if: ['You need an independently verified production guarantee rather than a candidate component', 'You cannot review licenses, permissions, model dependencies, and failure behavior before adoption']
    },
    content
  });
  assert.ok(issues.some((issue) => issue.message.includes('rejected boilerplate')));
  assert.ok(issues.some((issue) => issue.message.includes('generic frontmatter judgment')));
  // Every finding carries a stable rule ID (used for finding-level baselines).
  assert.ok(issues.every((issue) => typeof issue.rule === 'string' && issue.rule.length > 0));
});

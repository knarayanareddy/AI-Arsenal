import test from 'node:test';
import assert from 'node:assert/strict';
import { extractSections, inspectEntry, partitionChangedFindings, tokenOverlap } from '../scripts/validate-editorial-quality.js';
import { findingToBaselineEntry, parseBaseline, serializeBaseline } from '../scripts/utils/editorial-baseline.js';

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

test('editorial inspection rejects the 2026 bulk-authoring template sentences', () => {
  const content = [
    '## Overview',
    'A library for fine-grained control over model generation, expressed as a program of literal text and sampled spans.',
    '## Why It\'s in the Arsenal',
    'Example is a library for controlled generation. Read it beside `instructor`, `outlines`: the choice between them is a deployment and cost decision before it is a capability one.',
    '## Architecture / How It Works',
    'Generation runs as a program mixing literal text, control flow, and model-generated spans, driven step by step by the library.'
  ].join('\n\n');
  const issues = inspectEntry({
    file: 'content/tools/model-layer/example.md',
    data: { added_date: '2026-06-13', self_hostable: true, open_source: true },
    content
  });
  assert.ok(issues.some((issue) => issue.rule === 'rejected-boilerplate'), 'template sentence should be rejected');
});

test('editorial inspection rejects a hosted-only claim contradicted by frontmatter', () => {
  const content = [
    '## Overview',
    'An Apache-2.0 library with a docker image for local inference.',
    '## Strengths',
    'It is installed with pip and runs in your own process.',
    '## Limitations / When NOT to Use',
    'There is no self-hosted path to Example, so quota and rate-limit changes are the vendor\'s to make and yours to absorb.'
  ].join('\n\n');
  const issues = inspectEntry({
    file: 'content/tools/model-layer/example.md',
    data: { added_date: '2026-06-13', self_hostable: true, open_source: true },
    content
  });
  assert.ok(issues.some((issue) => issue.rule === 'hosted-claim-contradicted'));
});

test('a hosted-only tool may describe itself as a service', () => {
  const content = [
    '## Overview',
    'A hosted inference API with no local deployment option.',
    '## Limitations / When NOT to Use',
    'There is no self-hosted path to Example, so quota and rate-limit changes are the vendor\'s to make and yours to absorb.'
  ].join('\n\n');
  const issues = inspectEntry({
    file: 'content/tools/model-layer/example-hosted.md',
    data: { added_date: '2026-06-13', self_hostable: false, open_source: false },
    content
  });
  assert.equal(issues.filter((issue) => issue.rule === 'hosted-claim-contradicted').length, 0);
});

test('a changed entry keeps only the debt it already had on record', () => {
  const known = {
    file: 'content/tools/model-layer/legacy.md',
    rule: 'rejected-boilerplate',
    message: 'contains rejected boilerplate: /included because this tool appears in current ai engineering tool comparisons/i'
  };
  const added = {
    file: 'content/tools/model-layer/legacy.md',
    rule: 'rejected-boilerplate',
    message: 'contains rejected boilerplate: /either survives contact with your data or does not/i'
  };
  const baseline = parseBaseline(serializeBaseline([findingToBaselineEntry(known)]));
  const { issues, preExisting } = partitionChangedFindings([known, added], baseline);
  assert.deepEqual(preExisting.map((issue) => issue.message), [known.message]);
  assert.deepEqual(issues.map((issue) => issue.message), [added.message]);
});

test('changed-entry suppression never covers a file with no baseline history', () => {
  const known = {
    file: 'content/tools/model-layer/legacy.md',
    rule: 'rejected-boilerplate',
    message: 'contains rejected boilerplate: /included because this tool appears in current ai engineering tool comparisons/i'
  };
  const baseline = parseBaseline(serializeBaseline([findingToBaselineEntry(known)]));
  const copy = { ...known, file: 'content/tools/model-layer/new-entry.md' };
  const { issues, preExisting } = partitionChangedFindings([copy], baseline);
  assert.equal(preExisting.length, 0);
  assert.deepEqual(issues.map((issue) => issue.file), ['content/tools/model-layer/new-entry.md']);
});

test('an empty or missing baseline leaves changed-entry findings untouched', () => {
  const known = {
    file: 'content/tools/model-layer/legacy.md',
    rule: 'rejected-boilerplate',
    message: 'contains rejected boilerplate: /included because this tool appears in current ai engineering tool comparisons/i'
  };
  for (const baseline of [null, new Map()]) {
    const { issues, preExisting } = partitionChangedFindings([known], baseline);
    assert.equal(preExisting.length, 0);
    assert.equal(issues.length, 1);
  }
});

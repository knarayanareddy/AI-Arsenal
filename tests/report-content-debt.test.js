import test from 'node:test';
import assert from 'node:assert/strict';
import {
  verticalOf,
  normalizeStatus,
  aggregateBaseline,
  aggregateEnrichment,
  renderMarkdown
} from '../scripts/report-content-debt.js';

test('verticalOf extracts the top-level content vertical', () => {
  assert.equal(verticalOf('content/projects/agent-systems/x.md'), 'projects');
  assert.equal(verticalOf('content/tools/by-job/y.md'), 'tools');
  assert.equal(verticalOf('nonsense'), 'unknown');
});

test('normalizeStatus reduces trailing prose to the leading token', () => {
  assert.equal(normalizeStatus('draft'), 'draft');
  assert.equal(normalizeStatus('draft; metadata verified via arXiv on 2026-07-08'), 'draft');
  assert.equal(normalizeStatus('reviewed rather than draft'), 'reviewed');
  assert.equal(normalizeStatus(null), 'unset');
  assert.equal(normalizeStatus('  Verified  '), 'verified');
});

test('aggregateBaseline counts by rule, vertical, and file', () => {
  const entries = [
    { file: 'content/projects/a/x.md', rule: 'repeated-paragraph', finding: 'f' },
    { file: 'content/projects/a/x.md', rule: 'section-too-short', finding: 'f' },
    { file: 'content/tools/b/y.md', rule: 'repeated-paragraph', finding: 'f' }
  ];
  const agg = aggregateBaseline(entries);
  assert.equal(agg.total, 3);
  assert.deepEqual(agg.byRule[0], ['repeated-paragraph', 2]);
  assert.deepEqual(agg.byVertical[0], ['projects', 2]);
  // Worst file first, with its finding count.
  assert.deepEqual(agg.topFiles[0], ['content/projects/a/x.md', 2]);
});

test('aggregateEnrichment computes status totals, draft share, and per-type breakdown', () => {
  const records = [
    { type: 'project', status: 'draft' },
    { type: 'project', status: 'reviewed' },
    { type: 'paper', status: 'draft; verified via arXiv' },
    { type: 'tip', status: null }
  ];
  const agg = aggregateEnrichment(records);
  assert.equal(agg.total, 4);
  assert.equal(agg.draftShare, 0.5);
  const statusMap = new Map(agg.byStatus);
  assert.equal(statusMap.get('draft'), 2);
  assert.equal(statusMap.get('reviewed'), 1);
  assert.equal(statusMap.get('unset'), 1);
  const projectRow = agg.byType.find((r) => r.type === 'project');
  assert.equal(projectRow.total, 2);
});

test('renderMarkdown produces a report with the key sections', () => {
  const baseline = aggregateBaseline([{ file: 'content/projects/a/x.md', rule: 'repeated-paragraph', finding: 'f' }]);
  const enrichment = aggregateEnrichment([{ type: 'project', status: 'draft' }]);
  const md = renderMarkdown(baseline, enrichment);
  assert.match(md, /# Content Debt Report/);
  assert.match(md, /Editorial baseline/);
  assert.match(md, /Enrichment status/);
  assert.match(md, /Recommended burn-down order/);
});

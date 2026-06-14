import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTaxonomy, requireAllowed, requireAllowedArray } from '../scripts/utils/taxonomy.js';

test('parseTaxonomy parses TAXONOMY.md', async () => {
  const taxonomy = await parseTaxonomy();
  assert.ok(taxonomy.maturityLevels.has('production'));
  assert.ok(taxonomy.maturityLevels.has('beta'));
  assert.ok(taxonomy.maturityLevels.has('alpha'));
  assert.ok(taxonomy.maturityLevels.has('experimental'));
  assert.ok(!taxonomy.maturityLevels.has('super-mega-mature'));

  assert.ok(taxonomy.costModels.has('open-source'));
  assert.ok(taxonomy.costModels.has('freemium'));
  assert.ok(taxonomy.costModels.has('paid'));
  assert.ok(taxonomy.costModels.has('self-hostable'));
  assert.ok(taxonomy.costModels.has('usage-based'));

  assert.ok(taxonomy.statusValues.has('active'));
  assert.ok(taxonomy.statusValues.has('archived'));
  assert.ok(taxonomy.statusValues.has('deprecated'));
  assert.ok(taxonomy.statusValues.has('watching'));

  assert.ok(taxonomy.projectCategories.has('agents'));
  assert.ok(taxonomy.projectCategories.has('llms'));
  assert.ok(taxonomy.projectCategories.has('rag'));

  assert.ok(taxonomy.tipCategories.has('prompting'));
  assert.ok(taxonomy.tipCategories.has('rag-tuning'));
});

test('parseTaxonomy extracts tags from Tag Taxonomy sections', async () => {
  const taxonomy = await parseTaxonomy();
  assert.ok(taxonomy.allTags.has('agents'));
  assert.ok(taxonomy.allTags.has('rag'));
  assert.ok(taxonomy.allTags.has('observability'));
  assert.ok(taxonomy.allTags.has('trending'));
  // Non-tag values should not leak into allTags.
  assert.equal(taxonomy.allTags.has('production'), false); // maturity, not tag
});

test('requireAllowed emits an error for unknown values', () => {
  const errors = [];
  const allowed = new Set(['a', 'b', 'c']);
  requireAllowed(errors, 'file.md', 'field', 'a', allowed);
  requireAllowed(errors, 'file.md', 'field', 'b', allowed);
  requireAllowed(errors, 'file.md', 'field', 'd', allowed);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /field=.*"d".*not declared/);
});

test('requireAllowed silently ignores undefined/null', () => {
  const errors = [];
  requireAllowed(errors, 'file.md', 'field', undefined, new Set(['a']));
  requireAllowed(errors, 'file.md', 'field', null, new Set(['a']));
  assert.equal(errors.length, 0);
});

test('requireAllowedArray validates every element', () => {
  const errors = [];
  const allowed = new Set(['x', 'y']);
  requireAllowedArray(errors, 'file.md', 'tags', ['x', 'y', 'z'], allowed);
  assert.equal(errors.length, 1);
  assert.match(errors[0], /tags=.*"z"/);
});

test('requireAllowedArray ignores non-arrays', () => {
  const errors = [];
  requireAllowedArray(errors, 'file.md', 'tags', 'not-an-array', new Set());
  requireAllowedArray(errors, 'file.md', 'tags', null, new Set());
  assert.equal(errors.length, 0);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv/dist/2020.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCHEMAS = path.join(__dirname, '..', 'schemas');
const FIXTURES = path.join(__dirname, 'fixtures');

async function loadSchema(name) {
  return JSON.parse(await fs.readFile(path.join(SCHEMAS, name), 'utf8'));
}

async function loadFixture(name) {
  return (await fs.readFile(path.join(FIXTURES, name), 'utf8')).replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

async function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;
  // We don't want a YAML dependency in tests; use a tiny parser.
  const yaml = match[1];
  const body = match[2];
  const data = {};
  for (const line of yaml.split(/\r?\n/)) {
    const m = line.match(/^([a-z_]+):\s*(.*)$/);
    if (m) {
      let value = m[2];
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      data[m[1]] = value;
    }
  }
  return { data, body };
}
test('project schema compiles and accepts a valid project', async () => {
  const schema = await loadSchema('project.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate({
    id: 'sample-project',
    name: 'Sample Project',
    type: 'framework',
    category: 'agents',
    subcategory: 'agent-frameworks',
    description: 'A sample project entry for testing',
    github_url: 'https://github.com/example/sample',
    license: 'MIT',
    primary_language: 'Python',
    tags: ['agents'],
    maturity: 'production',
    cost_model: 'open-source',
    github_stars: 100,
    trending_score: 40,
    last_commit: '2026-06-13',
    added_date: '2026-06-13',
    last_reviewed: '2026-06-13',
    added_by: 'tester',
    status: 'active'
  });
  assert.equal(valid, true);
});

test('project schema rejects missing required fields', async () => {
  const schema = await loadSchema('project.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate({
    id: 'incomplete',
    name: 'Incomplete Project'
    // most fields missing on purpose
  });
  assert.equal(valid, false);
  assert.ok(validate.errors.length > 0);
});

test('project schema rejects reserved IDs', async () => {
  const schema = await loadSchema('project.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  for (const reserved of ['index', 'registry', 'overview', 'introduction', 'readme', 'agent', 'context', 'taxonomy', 'contributing', 'governance', 'changelog', 'security', 'template', 'all', 'none', 'undefined', 'null', 'true', 'false']) {
    const valid = validate({
      id: reserved,
      name: 'X',
      type: 'framework',
      category: 'agents',
      subcategory: 'agent-frameworks',
      description: 'reserved id test, must be over 10 chars',
      github_url: 'https://github.com/example/sample',
      license: 'MIT',
      primary_language: 'Python',
      tags: ['agents'],
      maturity: 'production',
      cost_model: 'open-source',
      github_stars: 0,
      trending_score: 0,
      last_commit: '2026-06-13',
      added_date: '2026-06-13',
      last_reviewed: '2026-06-13',
      added_by: 'tester',
      status: 'active'
    });
    assert.equal(valid, false, `reserved id "${reserved}" should be rejected`);
  }
});

test('project schema rejects additional properties', async () => {
  const schema = await loadSchema('project.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate({
    id: 'sample-project',
    name: 'Sample Project',
    type: 'framework',
    category: 'agents',
    subcategory: 'agent-frameworks',
    description: 'A sample project entry for testing',
    github_url: 'https://github.com/example/sample',
    license: 'MIT',
    primary_language: 'Python',
    tags: ['agents'],
    maturity: 'production',
    cost_model: 'open-source',
    github_stars: 0,
    trending_score: 0,
    last_commit: '2026-06-13',
    added_date: '2026-06-13',
    last_reviewed: '2026-06-13',
    added_by: 'tester',
    status: 'active',
    evil_extra_field: 'should be rejected'
  });
  assert.equal(valid, false);
});

test('project schema rejects invalid date format', async () => {
  const schema = await loadSchema('project.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate({
    id: 'sample-project',
    name: 'Sample Project',
    type: 'framework',
    category: 'agents',
    subcategory: 'agent-frameworks',
    description: 'A sample project entry for testing',
    github_url: 'https://github.com/example/sample',
    license: 'MIT',
    primary_language: 'Python',
    tags: ['agents'],
    maturity: 'production',
    cost_model: 'open-source',
    github_stars: 0,
    trending_score: 0,
    last_commit: '06/13/2026', // wrong format
    added_date: '2026-06-13',
    last_reviewed: '2026-06-13',
    added_by: 'tester',
    status: 'active'
  });
  assert.equal(valid, false);
});

test('tool schema requires job to be a non-empty array of allowed values', async () => {
  const schema = await loadSchema('tool.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate({
    id: 'sample-tool',
    name: 'Sample Tool',
    type: 'tool',
    job: ['bogus-job'],
    description: 'A sample tool entry for testing',
    url: 'https://example.com/sample',
    cost_model: 'freemium',
    pricing_detail: 'Free for individuals',
    tags: ['evaluation'],
    maturity: 'production',
    stack: ['python'],
    free_tier: true,
    self_hostable: false,
    open_source: false,
    added_date: '2026-06-13',
    last_reviewed: '2026-06-13',
    added_by: 'tester',
    verdict: 'recommended',
    verdict_rationale: 'Solid evaluation framework',
    status: 'active'
  });
  assert.equal(valid, false);
});

test('tool schema accepts buzz_sources as optional', async () => {
  const schema = await loadSchema('tool.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate({
    id: 'sample-tool-with-buzz',
    name: 'Sample Tool with Buzz',
    type: 'tool',
    job: ['evaluation'],
    description: 'A sample tool entry with buzz_sources',
    url: 'https://example.com/sample',
    cost_model: 'freemium',
    pricing_detail: 'Free tier available',
    tags: ['evaluation'],
    maturity: 'production',
    stack: ['python'],
    free_tier: true,
    self_hostable: false,
    open_source: false,
    added_date: '2026-06-13',
    last_reviewed: '2026-06-13',
    added_by: 'tester',
    verdict: 'recommended',
    verdict_rationale: 'Tested and verified',
    status: 'active',
    buzz_sources: [
      { source: 'newsletter', url: 'https://example.com/news', date: '2026-06-13', description: 'Featured in newsletter' }
    ]
  });
  assert.equal(valid, true);
});

test('tool schema rejects malformed buzz_sources', async () => {
  const schema = await loadSchema('tool.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate({
    id: 'sample-tool-bad-buzz',
    name: 'Sample Tool Bad Buzz',
    type: 'tool',
    job: ['evaluation'],
    description: 'A sample tool entry with bad buzz_sources',
    url: 'https://example.com/sample',
    cost_model: 'freemium',
    pricing_detail: 'Free tier available',
    tags: ['evaluation'],
    maturity: 'production',
    stack: ['python'],
    free_tier: true,
    self_hostable: false,
    open_source: false,
    added_date: '2026-06-13',
    last_reviewed: '2026-06-13',
    added_by: 'tester',
    verdict: 'recommended',
    verdict_rationale: 'Tested',
    status: 'active',
    buzz_sources: [{ source: 'bogus-source', url: 'https://example.com', date: '2026-06-13', description: 'test' }]
  });
  assert.equal(valid, false);
});
test('tip schema requires valid category', async () => {
  const schema = await loadSchema('tip.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate({
    id: 'sample-tip',
    title: 'A sample tip',
    category: 'bogus-category',
    tags: ['evaluation'],
    difficulty: 'beginner',
    impact: 'high',
    time_to_implement: '30 minutes',
    applies_to: [],
    added_date: '2026-06-13',
    added_by: 'tester'
  });
  assert.equal(valid, false);
});

test('paper schema enforces arxiv_id regex', async () => {
  const schema = await loadSchema('paper.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  // arxiv_id regex is `^\d{4}\.\d{4,5}(v\d+)?$` — exactly 4 digits prefix
  // and 4-5 digit suffix, optionally followed by version (vN).
  for (const [valid_id, ok] of [['2303.08774', true], ['2406.00000v2', true], ['bogus', false], ['23.123', false], ['99999.99999', false]]) {
    const valid = validate({
      id: 'attention-paper',
      title: 'A Paper',
      authors: ['Author'],
      published_date: '2026-06-13',
      venue: 'arXiv',
      arxiv_id: valid_id,
      arxiv_url: `https://arxiv.org/abs/${valid_id}`,
      pdf_url: `https://arxiv.org/pdf/${valid_id}.pdf`,
      tags: ['attention'],
      category: 'architecture',
      importance: 'foundational',
      citation_count: 0,
      has_code: false,
      tldr: 'A long-enough TLDR for the schema minimum length requirement',
      why_it_matters: 'A long-enough explanation that exceeds the minimum length of 20 characters',
      added_date: '2026-06-13',
      added_by: 'tester'
    });
    assert.equal(valid, ok, `arxiv_id ${valid_id} expected ok=${ok}, got valid=${valid}`);
  }
});

test('person schema requires channels array', async () => {
  const schema = await loadSchema('person.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate({
    id: 'sample-person',
    name: 'Sample Person',
    role: 'Engineer',
    description: 'A sample person for testing channels array',
    url: 'https://example.com/sample',
    tags: ['llm'],
    channels: [],
    added_date: '2026-06-13',
    added_by: 'tester',
    status: 'active'
  });
  assert.equal(valid, false);
});

test('digest schema enforces YYYY-MM id regex', async () => {
  const schema = await loadSchema('digest.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate({
    id: '2026-06',
    title: 'June 2026 digest',
    period: '2026-06',
    published_date: '2026-06-30',
    summary: 'A summary that meets the minimum length requirement of 20 characters easily',
    highlights: ['item one'],
    tags: ['trending'],
    added_by: 'tester'
  });
  assert.equal(valid, true);

  const invalid = validate({
    id: 'june-2026', // wrong format
    title: 'X',
    period: '2026-06',
    published_date: '2026-06-30',
    summary: 'A summary that meets the minimum length requirement of 20 characters easily',
    highlights: ['item one'],
    tags: ['trending'],
    added_by: 'tester'
  });
  assert.equal(invalid, false);
});

test('guide schema accepts valid guide', async () => {
  const schema = await loadSchema('guide.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate({
    id: 'choose-llm',
    title: 'How to choose an LLM',
    entry_type: 'guide',
    section: 'architectures',
    description: 'Decision tree for choosing an LLM provider.',
    tags: ['llm'],
    added_date: '2026-06-13',
    last_reviewed: '2026-06-13',
    added_by: 'tester',
    status: 'active'
  });
  assert.equal(valid, true);
});

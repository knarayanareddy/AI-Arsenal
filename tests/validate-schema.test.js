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
    artifact_type: 'framework',
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
    status: 'active',
    phase: 'framework',
    domain: ['general-purpose'],
    relation_to_stack: ['build-on-top'],
    health_signals: ['community-driven'],
    ecosystem_role: ['Sample ecosystem role'],
    best_for: ['You need a quick sample framework for testing'],
    avoid_if: ['You need a fully verified production framework']
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
      artifact_type: 'framework',
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
    artifact_type: 'framework',
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
    artifact_type: 'framework',
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
    phase: 'evaluation-and-observability',
    audience: ['production'],
    best_when: ['You need a quick evaluation pass'],
    avoid_when: ['You need RAG-specific metrics'],
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

// Research-vertical reorganisation: papers now validate against
// research.schema.json (content/research/{phase}/[id].md), not the
// retired paper.schema.json (content/research/papers/[id].md).
function baseValidResearchFixture(overrides = {}) {
  return {
    id: 'attention-paper',
    title: 'A Paper',
    authors: ['Author'],
    phase: 'foundational',
    venue: 'arxiv-preprint',
    year: 2026,
    arxiv_id: '2303.08774',
    arxiv_url: 'https://arxiv.org/abs/2303.08774',
    pdf_url: 'https://arxiv.org/pdf/2303.08774.pdf',
    tags: ['attention'],
    practical_applicability: 'high',
    reproduction_status: 'reproduced',
    result_status: 'current',
    has_code: false,
    tldr: 'A long-enough TLDR for the schema minimum length requirement',
    key_contribution: 'A long-enough key contribution sentence for the schema minimum length',
    added_date: '2026-06-13',
    added_by: 'tester',
    last_reviewed: '2026-06-13',
    ...overrides
  };
}

test('research schema enforces arxiv_id regex', async () => {
  const schema = await loadSchema('research.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  // arxiv_id regex is `^\d{4}\.\d{4,5}(v\d+)?$` — exactly 4 digits prefix
  // and 4-5 digit suffix, optionally followed by version (vN).
  for (const [valid_id, ok] of [['2303.08774', true], ['2406.00000v2', true], ['bogus', false], ['23.123', false], ['99999.99999', false]]) {
    const valid = validate(baseValidResearchFixture({
      arxiv_id: valid_id,
      arxiv_url: `https://arxiv.org/abs/${valid_id}`,
      pdf_url: `https://arxiv.org/pdf/${valid_id}.pdf`
    }));
    assert.equal(valid, ok, `arxiv_id ${valid_id} expected ok=${ok}, got valid=${valid}`);
  }
});

test('research schema requires phase/venue/year/practical_applicability/reproduction_status/result_status/has_code/tldr/key_contribution/last_reviewed', async () => {
  const schema = await loadSchema('research.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  assert.equal(validate(baseValidResearchFixture()), true);

  for (const field of ['phase', 'venue', 'year', 'practical_applicability', 'reproduction_status', 'result_status', 'has_code', 'tldr', 'key_contribution', 'last_reviewed']) {
    const missing = baseValidResearchFixture();
    delete missing[field];
    assert.equal(validate(missing), false, `expected schema to reject missing ${field}`);
  }
});

test('research schema rejects an unknown phase value', async () => {
  const schema = await loadSchema('research.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  assert.equal(validate(baseValidResearchFixture({ phase: 'not-a-real-phase' })), false);
});

test('research schema requires superseded_by/builds_on/implemented_in to be valid kebab ids when present', async () => {
  const schema = await loadSchema('research.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  assert.equal(validate(baseValidResearchFixture({ superseded_by: 'some-other-paper' })), true);
  assert.equal(validate(baseValidResearchFixture({ builds_on: ['vaswani-2017-attention'] })), true);
  assert.equal(validate(baseValidResearchFixture({ implemented_in: ['some-tool-id'] })), true);
  assert.equal(validate(baseValidResearchFixture({ superseded_by: 'Not Kebab Case' })), false);
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

// Tools-vertical reorganisation: phase/audience/best_when/avoid_when are
// required on every tool entry (added once the migration reached 100%).
function baseValidToolFixture(overrides = {}) {
  return {
    id: 'sample-tool',
    name: 'Sample Tool',
    type: 'tool',
    job: ['evaluation'],
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
    status: 'active',
    phase: 'evaluation-and-observability',
    audience: ['production'],
    best_when: ['You need a quick evaluation pass'],
    avoid_when: ['You need a fully verified production tool'],
    ...overrides
  };
}

test('tool schema requires phase/audience/best_when/avoid_when', async () => {
  const schema = await loadSchema('tool.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const fullyValid = baseValidToolFixture();
  assert.equal(validate(fullyValid), true);

  for (const field of ['phase', 'audience', 'best_when', 'avoid_when']) {
    const missing = baseValidToolFixture();
    delete missing[field];
    assert.equal(validate(missing), false, `expected schema to reject missing ${field}`);
  }
});

test('tool schema rejects an unknown phase value', async () => {
  const schema = await loadSchema('tool.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate(baseValidToolFixture({ phase: 'not-a-real-phase' }));
  assert.equal(valid, false);
});

test('tool schema enforces best_when/avoid_when as 1-4 item arrays', async () => {
  const schema = await loadSchema('tool.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  assert.equal(validate(baseValidToolFixture({ best_when: [] })), false, 'empty best_when should be rejected');
  assert.equal(
    validate(baseValidToolFixture({ best_when: ['a', 'b', 'c', 'd', 'e'] })),
    false,
    'best_when with more than 4 items should be rejected'
  );
  assert.equal(
    validate(baseValidToolFixture({ avoid_when: ['a', 'b', 'c', 'd'] })),
    true,
    'avoid_when with exactly 4 items should be accepted'
  );
});

test('tool schema accepts optional enrichment_status/enrichment_notes', async () => {
  const schema = await loadSchema('tool.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate(baseValidToolFixture({
    enrichment_status: 'draft',
    enrichment_notes: 'Based on vendor docs only; needs third-party usage evidence.'
  }));
  assert.equal(valid, true);
});

test('tool schema rejects an invalid enrichment_status value', async () => {
  const schema = await loadSchema('tool.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate(baseValidToolFixture({ enrichment_status: 'not-a-real-status' }));
  assert.equal(valid, false);
});

// Projects-vertical reorganisation: phase/domain/relation_to_stack/
// health_signals/ecosystem_role/best_for/avoid_if are required on every
// project entry (added once the migration reached 100%), mirroring the
// tools-vertical pattern above.
function baseValidProjectFixture(overrides = {}) {
  return {
    id: 'sample-project',
    name: 'Sample Project',
    artifact_type: 'framework',
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
    status: 'active',
    phase: 'framework',
    domain: ['general-purpose'],
    relation_to_stack: ['build-on-top'],
    health_signals: ['community-driven'],
    ecosystem_role: ['Sample ecosystem role'],
    best_for: ['You need a quick sample framework for testing'],
    avoid_if: ['You need a fully verified production framework'],
    ...overrides
  };
}

test('project schema requires phase/domain/relation_to_stack/health_signals/ecosystem_role/best_for/avoid_if', async () => {
  const schema = await loadSchema('project.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const fullyValid = baseValidProjectFixture();
  assert.equal(validate(fullyValid), true);

  for (const field of ['phase', 'domain', 'relation_to_stack', 'health_signals', 'ecosystem_role', 'best_for', 'avoid_if']) {
    const missing = baseValidProjectFixture();
    delete missing[field];
    assert.equal(validate(missing), false, `expected schema to reject missing ${field}`);
  }
});

test('project schema rejects an unknown phase value', async () => {
  const schema = await loadSchema('project.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate(baseValidProjectFixture({ phase: 'not-a-real-phase' }));
  assert.equal(valid, false);
});

test('project schema enforces best_for/avoid_if as 1-4 item arrays', async () => {
  const schema = await loadSchema('project.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  assert.equal(validate(baseValidProjectFixture({ best_for: [] })), false, 'empty best_for should be rejected');
  assert.equal(
    validate(baseValidProjectFixture({ best_for: ['a', 'b', 'c', 'd', 'e'] })),
    false,
    'best_for with more than 4 items should be rejected'
  );
  assert.equal(
    validate(baseValidProjectFixture({ avoid_if: ['a', 'b', 'c', 'd'] })),
    true,
    'avoid_if with exactly 4 items should be accepted'
  );
});

test('project schema accepts optional corresponding_tool_entry/upstream_dependencies/downstream_consumers', async () => {
  const schema = await loadSchema('project.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate(baseValidProjectFixture({
    corresponding_tool_entry: 'some-tool-id',
    upstream_dependencies: ['pytorch'],
    downstream_consumers: ['some-downstream-project']
  }));
  assert.equal(valid, true);
});

test('project schema rejects an invalid enrichment_status value', async () => {
  const schema = await loadSchema('project.schema.json');
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate(baseValidProjectFixture({ enrichment_status: 'not-a-real-status' }));
  assert.equal(valid, false);
});

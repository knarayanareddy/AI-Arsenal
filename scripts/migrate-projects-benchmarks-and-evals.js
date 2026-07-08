#!/usr/bin/env node
// Migrates the benchmarks-and-evals/ phase of the projects-vertical
// reorganisation: moves the 12 canonical entries into
// content/projects/benchmarks-and-evals/, merging the ragas.md duplicate
// into ragas-rag-evaluation.md per the migration-completion-report's
// documented duplicate-resolution rule.
//
// Usage: node scripts/migrate-projects-benchmarks-and-evals.js [--dry-run]

import fs from 'node:fs/promises';
import matter from 'gray-matter';
import chalk from 'chalk';

const dryRun = process.argv.includes('--dry-run');
const today = new Date().toISOString().slice(0, 10);

const enrichment = JSON.parse(await fs.readFile('.migration/proj-benchmarks-and-evals.json', 'utf8'));

// Merge the ragas.md duplicate into ragas-rag-evaluation.md.
const MERGES = {
  'ragas-rag-evaluation': { mergeFrom: 'ragas', mergeFromFile: 'content/projects/observability/evaluation/ragas.md' }
};

// Original file locations for the 12 canonical benchmarks-and-evals entries.
const SOURCE_FILES = {
  agenta: 'content/projects/observability/tracing/agenta.md',
  braintrust: 'content/projects/observability/tracing/braintrust.md',
  deepeval: 'content/projects/observability/evaluation/deepeval.md',
  helicone: 'content/projects/observability/tracing/helicone.md',
  langfuse: 'content/projects/observability/tracing/langfuse.md',
  'langsmith-platform': 'content/projects/observability/tracing/langsmith-platform.md',
  lunary: 'content/projects/observability/tracing/lunary.md',
  openlit: 'content/projects/observability/tracing/openlit.md',
  openllmetry: 'content/projects/observability/tracing/openllmetry.md',
  opik: 'content/projects/observability/tracing/opik.md',
  phoenix: 'content/projects/observability/tracing/phoenix.md',
  'ragas-rag-evaluation': 'content/projects/rag/frameworks/ragas-rag-evaluation.md'
};

const DEST_DIR = 'content/projects/benchmarks-and-evals';

function buildFrontmatter(data, e) {
  const next = { ...data };
  next.phase = 'benchmark-and-eval';
  next.domain = e.domain;
  next.relation_to_stack = e.relation_to_stack;
  next.health_signals = e.health_signals;
  next.ecosystem_role = e.ecosystem_role;
  next.best_for = e.best_for;
  next.avoid_if = e.avoid_if;
  next.last_reviewed = today;
  if (e.enrichment_status) next.enrichment_status = e.enrichment_status;
  if (e.enrichment_notes) next.enrichment_notes = e.enrichment_notes;
  if (e.buzz_evidence) {
    next.buzz_sources = [...(next.buzz_sources ?? []), e.buzz_evidence];
  }
  if (!('version_tracked' in next)) next.version_tracked = null;
  if (!('org_or_maintainer' in next)) next.org_or_maintainer = null;
  if (!('corresponding_tool_entry' in next)) next.corresponding_tool_entry = null;
  if (!('upstream_dependencies' in next)) next.upstream_dependencies = [];
  if (!('downstream_consumers' in next)) next.downstream_consumers = [];

  const orderedKeys = [
    'id', 'name', 'version_tracked', 'artifact_type', 'category', 'subcategory', 'description',
    'github_url', 'license', 'primary_language', 'org_or_maintainer', 'tags', 'maturity', 'cost_model',
    'github_stars', 'github_stars_last_30d', 'trending_score', 'last_commit',
    'docs_url', 'demo_url', 'paper_url', 'paper_id', 'hf_url',
    'model_sizes', 'benchmark_scores', 'supports_quantization', 'supported_formats', 'api_compatible', 'approach',
    'phase', 'domain', 'relation_to_stack', 'health_signals', 'ecosystem_role', 'best_for', 'avoid_if',
    'upstream_dependencies', 'downstream_consumers', 'alternatives', 'integrates_with',
    'corresponding_tool_entry', 'enrichment_status', 'enrichment_notes',
    'added_date', 'last_reviewed', 'added_by', 'reviewed_by', 'buzz_sources', 'featured', 'status'
  ];
  const ordered = {};
  for (const key of orderedKeys) if (key in next) ordered[key] = next[key];
  for (const key of Object.keys(next)) if (!(key in ordered)) ordered[key] = next[key];
  return ordered;
}

function yamlScalarString(value) {
  if (/[\n:#]|^(true|false|null|yes|no)$/i.test(value) || /^\d{4}-\d{2}-\d{2}$/.test(value)) return JSON.stringify(value);
  if (value.includes('"')) return JSON.stringify(value);
  return value;
}

function yamlFlow(value) {
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((v) => {
      if (v === null) return 'null';
      if (typeof v === 'boolean' || typeof v === 'number') return String(v);
      if (typeof v === 'string') return /[\n:#,&[\]{}|]/.test(v) || /^\d{4}-\d{2}-\d{2}$/.test(v) ? JSON.stringify(v) : v;
      return JSON.stringify(v);
    });
    return `[${items.join(', ')}]`;
  }
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  if (typeof value === 'string') return yamlScalarString(value);
  return JSON.stringify(value);
}

const BLOCK_LIST_FIELDS = new Set(['best_for', 'avoid_if', 'ecosystem_role']);

function serializeFrontmatter(data) {
  const lines = Object.entries(data).map(([key, value]) => {
    if (BLOCK_LIST_FIELDS.has(key) && Array.isArray(value)) {
      if (value.length === 0) return `${key}: []`;
      return `${key}:\n${value.map((item) => `  - ${yamlScalarString(String(item))}`).join('\n')}`;
    }
    if (key === 'buzz_sources' && Array.isArray(value) && value.length > 0) {
      return `${key}:\n${value.map((b) => `  - ${yamlFlow(b)}`).join('\n')}`;
    }
    return `${key}: ${yamlFlow(value)}`;
  });
  return `---\n${lines.join('\n')}\n---\n`;
}

function buildBody(e) {
  const bestForBullets = e.best_for.map((b) => `- ${b}`).join('\n');
  const avoidIfBullets = e.avoid_if.map((b) => `- ${b}`).join('\n');
  const draftNote = e.enrichment_status === 'draft'
    ? `\n\n_Enrichment status: draft — architecture/production claims above are based on the vendor's own description or limited third-party sourcing; not yet independently verified. Last reviewed: ${today}._`
    : '';

  return `## Overview

${e.overview}

## Why it's in the Arsenal

${e.ecosystem_role[0]}. It earns a place in the Arsenal because it directly addresses a recurring decision point: ${e.best_for[0].charAt(0).toLowerCase() + e.best_for[0].slice(1)}. See Strengths / Limitations below before adopting it.

## Architecture

${e.architecture}

## Ecosystem Position

${e.ecosystem_position}

## Getting Started

\`\`\`bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
\`\`\`

## Key Use Cases

${e.best_for.map((b, i) => `${i + 1}. **Scenario**: ${b.charAt(0).toLowerCase() + b.slice(1)}`).join('\n')}

## Strengths

${bestForBullets}

## Limitations

${avoidIfBullets}${draftNote}

## Relation to the Arsenal

This is a benchmark-and-eval entry: it documents an evaluation, tracing, or observability platform. For job-based tool comparisons (evaluation, tracing, monitoring), see [tools/evaluation-and-observability/](../../tools/evaluation-and-observability/_index.md).

## Resources

- [GitHub](${'{{GITHUB_URL}}'})
- [Documentation](${'{{DOCS_URL}}'})
`;
}

async function run() {
  await fs.mkdir(DEST_DIR, { recursive: true });
  const moves = [];

  for (const [id, e] of Object.entries(enrichment)) {
    const sourceFile = SOURCE_FILES[id];
    if (!sourceFile) {
      console.error(chalk.red(`No source file mapping for "${id}". Aborting.`));
      process.exitCode = 1;
      return;
    }
    const raw = await fs.readFile(sourceFile, 'utf8');
    const parsed = matter(raw);

    const newFrontmatter = buildFrontmatter(parsed.data, e);
    let body = buildBody(e);
    body = body.replace('{{GITHUB_URL}}', parsed.data.github_url ?? '');
    body = body.replace('{{DOCS_URL}}', parsed.data.docs_url ?? parsed.data.github_url ?? '');

    const destination = `${DEST_DIR}/${id}.md`;
    const newFile = `${serializeFrontmatter(newFrontmatter)}\n${body}`;
    moves.push({ from: sourceFile, to: destination, id, mergedFrom: MERGES[id]?.mergeFrom ?? null });

    if (!dryRun) {
      await fs.writeFile(destination, newFile);
      if (destination !== sourceFile) await fs.rm(sourceFile);
    }
  }

  // Delete the merged-away duplicate files.
  for (const [, merge] of Object.entries(MERGES)) {
    moves.push({ from: merge.mergeFromFile, to: null, id: merge.mergeFrom, mergedInto: true });
    if (!dryRun) {
      try { await fs.rm(merge.mergeFromFile); } catch { /* already gone */ }
    }
  }

  console.log(chalk.green(`${dryRun ? '[DRY RUN] ' : ''}Migrated ${Object.keys(enrichment).length} benchmark-and-eval entries; deleted ${Object.keys(MERGES).length} merged duplicates.`));
  return moves;
}

const moves = await run();
if (moves) {
  await fs.mkdir('.migration', { recursive: true });
  await fs.writeFile('.migration/move-manifest-foundation-models.json', `${JSON.stringify(moves, null, 2)}\n`);
}

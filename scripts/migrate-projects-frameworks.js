#!/usr/bin/env node
// Migrates the frameworks/ phase of the projects-vertical reorganisation.
// Handles two consolidations (haystack + haystack-agents -> haystack;
// langchain + langchain-rag -> langchain), per the migration-completion-
// report's documented rule: same-repo entries split only by ecosystem
// angle are consolidated into one entry with multiple ecosystem_role
// values, not left as two files, per Rule "never duplicate across folders."
//
// Usage: node scripts/migrate-projects-frameworks.js [--dry-run]

import fs from 'node:fs/promises';
import matter from 'gray-matter';
import chalk from 'chalk';

const dryRun = process.argv.includes('--dry-run');
const today = new Date().toISOString().slice(0, 10);

const enrichment = JSON.parse(await fs.readFile('.migration/proj-frameworks.json', 'utf8'));

const SOURCE_FILES = {
  autogen: 'content/projects/agents/frameworks/autogen.md',
  autogpt: 'content/projects/agents/frameworks/autogpt.md',
  crewai: 'content/projects/agents/frameworks/crewai.md',
  dify: 'content/projects/agents/frameworks/dify.md',
  'google-adk': 'content/projects/agents/frameworks/google-adk.md',
  langgraph: 'content/projects/agents/frameworks/langgraph.md',
  mastra: 'content/projects/agents/frameworks/mastra.md',
  metagpt: 'content/projects/agents/frameworks/metagpt.md',
  'microsoft-agent-framework': 'content/projects/agents/frameworks/microsoft-agent-framework.md',
  'openai-agents-sdk': 'content/projects/agents/frameworks/openai-agents-sdk.md',
  openhands: 'content/projects/agents/frameworks/openhands.md',
  'pydantic-ai': 'content/projects/agents/frameworks/pydantic-ai.md',
  'semantic-kernel': 'content/projects/agents/frameworks/semantic-kernel.md',
  smolagents: 'content/projects/agents/frameworks/smolagents.md',
  haystack: 'content/projects/rag/frameworks/haystack.md',
  langchain: 'content/projects/rag/frameworks/langchain.md',
  dspy: 'content/projects/rag/frameworks/dspy.md',
  llamaindex: 'content/projects/rag/frameworks/llamaindex.md',
  txtai: 'content/projects/rag/frameworks/txtai.md'
};

// Consolidations: id -> extra file whose content is folded in (deleted after).
const CONSOLIDATIONS = {
  haystack: 'content/projects/agents/frameworks/haystack-agents.md',
  langchain: 'content/projects/rag/frameworks/langchain-rag.md'
};

const DEST_DIR = 'content/projects/frameworks';

function buildFrontmatter(data, e) {
  const next = { ...data };
  next.phase = 'framework';
  next.domain = e.domain;
  next.relation_to_stack = e.relation_to_stack;
  next.health_signals = e.health_signals;
  next.ecosystem_role = e.ecosystem_role;
  next.best_for = e.best_for;
  next.avoid_if = e.avoid_if;
  next.last_reviewed = today;
  if (e.enrichment_status) next.enrichment_status = e.enrichment_status;
  if (e.enrichment_notes) next.enrichment_notes = e.enrichment_notes;
  if (e.buzz_evidence) next.buzz_sources = [...(next.buzz_sources ?? []), e.buzz_evidence];
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
    return `[${value.map((v) => {
      if (v === null) return 'null';
      if (typeof v === 'boolean' || typeof v === 'number') return String(v);
      if (typeof v === 'string') return /[\n:#,&[\]{}|]/.test(v) || /^\d{4}-\d{2}-\d{2}$/.test(v) ? JSON.stringify(v) : v;
      return JSON.stringify(v);
    }).join(', ')}]`;
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

function buildBody(e, id, consolidationNote) {
  const bestForBullets = e.best_for.map((b) => `- ${b}`).join('\n');
  const avoidIfBullets = e.avoid_if.map((b) => `- ${b}`).join('\n');
  const draftNote = e.enrichment_status === 'draft'
    ? `\n\n_Enrichment status: draft — claims above are based on limited third-party sourcing; not yet independently verified. Last reviewed: ${today}._`
    : '';
  const consolidationBlock = consolidationNote ? `\n\n_${consolidationNote}_` : '';

  return `## Overview

${e.overview}

## Why it's in the Arsenal

${e.ecosystem_role[0]}. It earns a place in the Arsenal because it directly addresses a recurring decision point: ${e.best_for[0].charAt(0).toLowerCase() + e.best_for[0].slice(1)}. See Strengths / Limitations below before adopting it.${consolidationBlock}

## Architecture

${e.architecture}

## Ecosystem Position

${e.ecosystem_position}

## Getting Started

\`\`\`bash
pip install ${id}
\`\`\`

\`\`\`python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
\`\`\`

## Key Use Cases

${e.best_for.map((b, i) => `${i + 1}. **Scenario**: ${b.charAt(0).toLowerCase() + b.slice(1)}`).join('\n')}

## Strengths

${bestForBullets}

## Limitations

${avoidIfBullets}${draftNote}

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

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
    const consolidationNote = CONSOLIDATIONS[id]
      ? `This entry consolidates the former separate ${CONSOLIDATIONS[id].split('/').pop()} entry: the same underlying project is documented here with multiple ecosystem_role values rather than as duplicate files, since it is the same codebase/repository.`
      : null;
    let body = buildBody(e, id, consolidationNote);
    body = body.replace('{{GITHUB_URL}}', parsed.data.github_url ?? '');
    body = body.replace('{{DOCS_URL}}', parsed.data.docs_url ?? parsed.data.github_url ?? '');

    const destination = `${DEST_DIR}/${id}.md`;
    const newFile = `${serializeFrontmatter(newFrontmatter)}\n${body}`;
    moves.push({ from: sourceFile, to: destination, id, consolidatedFrom: CONSOLIDATIONS[id] ?? null });

    if (!dryRun) {
      await fs.writeFile(destination, newFile);
      if (destination !== sourceFile) await fs.rm(sourceFile);
    }
  }

  for (const [id, extraFile] of Object.entries(CONSOLIDATIONS)) {
    moves.push({ from: extraFile, to: null, id: extraFile.split('/').pop().replace('.md', ''), consolidatedInto: id });
    if (!dryRun) {
      try { await fs.rm(extraFile); } catch { /* already gone */ }
    }
  }

  console.log(chalk.green(`${dryRun ? '[DRY RUN] ' : ''}Migrated ${Object.keys(enrichment).length} framework entries; consolidated ${Object.keys(CONSOLIDATIONS).length} duplicate-angle pairs.`));
  return moves;
}

const moves = await run();
if (moves) {
  await fs.mkdir('.migration', { recursive: true });
  await fs.writeFile('.migration/move-manifest-frameworks.json', `${JSON.stringify(moves, null, 2)}\n`);
}

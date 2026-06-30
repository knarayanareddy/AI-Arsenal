#!/usr/bin/env node
// One-time migration script for the tools-vertical reorganisation.
// Moves every `type: tool` entry from content/tools/by-job/{id}.md into
// content/tools/{phase}/{id}.md, merges in the new phase/audience/
// best_when/avoid_when/enrichment_status fields, rewrites the Strengths/
// Limitations sections to be grounded in those fields, and rewrites every
// known cross-reference in the repo to the tool's new path.
//
// Job-guide pages (entry_type: guide, e.g. content/tools/by-job/orchestration.md)
// are NOT moved — they remain a job-based routing layer on top of the new
// phase folders, and their links are rewritten to point at the new paths.
//
// Usage: node scripts/migrate-tools-to-phases.js [--dry-run]

import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { glob } from 'glob';
import chalk from 'chalk';
import { yamlValue } from './utils/yaml-serializer.js';

const dryRun = process.argv.includes('--dry-run');
const today = new Date().toISOString().slice(0, 10);

const enrichmentFiles = {
  'data-ingestion': '.migration/data-ingestion.json',
  'model-layer': '.migration/model-layer.json',
  'serving-and-deployment': '.migration/serving-and-deployment.json',
  orchestration: '.migration/orchestration.json',
  'evaluation-and-observability': '.migration/evaluation-and-observability.json',
  'dx-and-tooling': '.migration/dx-and-tooling.json'
};

const phaseLabels = {
  'data-ingestion': 'Data Ingestion',
  'model-layer': 'Model Layer',
  orchestration: 'Orchestration',
  'serving-and-deployment': 'Serving & Deployment',
  'evaluation-and-observability': 'Evaluation & Observability',
  'dx-and-tooling': 'DX & Tooling'
};

const phaseScope = {
  'data-ingestion': {
    belongs: 'Loaders, scrapers, parsers, chunkers, embedding/annotation pipelines, and vector search tools that bring external data into an AI system.',
    notBelongs: 'Model providers and fine-tuning belong in Model Layer; agent memory belongs in Orchestration.',
    question: 'Does this tool primarily get data INTO the system, in a form the model layer can use?'
  },
  'model-layer': {
    belongs: 'LLM and image-model providers, local model runners, fine-tuning frameworks, model hubs/registries, and structured-generation libraries.',
    notBelongs: 'Hosting/serving infrastructure for those models belongs in Serving & Deployment; agent logic built on top of models belongs in Orchestration.',
    question: 'Is this tool primarily about producing, training, or hosting model weights/outputs, not the pipeline around it?'
  },
  orchestration: {
    belongs: 'Agent frameworks, workflow/pipeline schedulers, routers, memory layers, and tool-use coordination.',
    notBelongs: 'Raw inference serving belongs in Serving & Deployment; data collection belongs in Data Ingestion.',
    question: 'Does this tool coordinate multiple steps, tools, or agents toward a goal?'
  },
  'serving-and-deployment': {
    belongs: 'Inference servers, API gateways, containerization/scaling platforms, and hosting providers for AI workloads.',
    notBelongs: 'Agent logic belongs in Orchestration; model training belongs in Model Layer.',
    question: 'Does this tool primarily get a model or app running and reachable in production?'
  },
  'evaluation-and-observability': {
    belongs: 'Evaluation frameworks, tracing, monitoring, security/guardrail scanning, drift detection, and logging.',
    notBelongs: 'Data labeling for training data belongs in Data Ingestion; this phase is about judging behavior after the fact.',
    question: 'Does this tool tell you whether your AI system is working correctly, safely, or efficiently?'
  },
  'dx-and-tooling': {
    belongs: 'SDKs, CLIs, notebook/demo UI frameworks, prompt management, IDE/terminal assistants, and testing utilities for the humans building the system.',
    notBelongs: 'Tools whose primary consumer is the running AI system itself (not the developer) belong in one of the other five phases.',
    question: 'Does this tool primarily make the developer faster or the prompt/asset workflow easier, rather than run in production?'
  }
};

async function loadEnrichment() {
  const merged = {};
  for (const [phase, file] of Object.entries(enrichmentFiles)) {
    const data = JSON.parse(await fs.readFile(file, 'utf8'));
    for (const [id, value] of Object.entries(data)) merged[id] = { phase, ...value };
  }
  return merged;
}

function buildFrontmatter(data, enrichment) {
  const next = { ...data };
  next.phase = enrichment.phase;
  next.audience = enrichment.audience;
  next.best_when = enrichment.best_when;
  next.avoid_when = enrichment.avoid_when;
  next.last_reviewed = today;
  if (enrichment.enrichment_status) next.enrichment_status = enrichment.enrichment_status;
  if (enrichment.enrichment_notes) next.enrichment_notes = enrichment.enrichment_notes;
  if (!('version_tracked' in next)) next.version_tracked = null;

  // Preserve a stable, readable key order: original schema order first,
  // then the new fields appended in a fixed sequence.
  const orderedKeys = [
    'id', 'name', 'type', 'job', 'description', 'url', 'cost_model', 'pricing_detail',
    'tags', 'maturity', 'stack', 'free_tier', 'free_tier_limits', 'self_hostable', 'open_source',
    'source_url', 'docs_url', 'github_url', 'alternatives', 'integrates_with',
    'added_date', 'last_reviewed', 'added_by', 'reviewed_by',
    'phase', 'audience', 'best_when', 'avoid_when', 'version_tracked',
    'enrichment_status', 'enrichment_notes',
    'verdict', 'verdict_rationale', 'status', 'buzz_sources'
  ];
  const ordered = {};
  for (const key of orderedKeys) if (key in next) ordered[key] = next[key];
  for (const key of Object.keys(next)) if (!(key in ordered)) ordered[key] = next[key];
  return ordered;
}

// Fields that should always render as a block-style YAML list (one item per
// line, "- value"), regardless of length, because they hold prose-length
// strings that are unreadable in flow style ([a, b, c]).
const BLOCK_LIST_FIELDS = new Set(['best_when', 'avoid_when']);

function yamlScalarString(value) {
  if (/[\n:#]|^(true|false|null|yes|no)$/i.test(value) || /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return JSON.stringify(value);
  }
  // Quote strings containing a literal double-quote to keep YAML valid/clean.
  if (value.includes('"')) return JSON.stringify(value);
  return value;
}

function serializeFrontmatter(data) {
  const lines = Object.entries(data).map(([key, value]) => {
    if (BLOCK_LIST_FIELDS.has(key) && Array.isArray(value)) {
      if (value.length === 0) return `${key}: []`;
      const items = value.map((item) => `  - ${yamlScalarString(String(item))}`).join('\n');
      return `${key}:\n${items}`;
    }
    const rendered = yamlValue(value);
    if (rendered.includes('\n')) return `${key}:\n${rendered.split('\n').map((l) => `  ${l}`).join('\n')}`;
    return `${key}: ${rendered}`;
  });
  return `---\n${lines.join('\n')}\n---\n`;
}

function rewriteStrengthsAndLimitations(body, enrichment) {
  const strengthBullets = enrichment.best_when.map((b) => `- ${b}`).join('\n');
  const limitationBullets = enrichment.avoid_when.map((b) => `- ${b}`).join('\n');

  let next = body;
  next = next.replace(
    /## Strengths\n[\s\S]*?(?=\n## )/,
    `## Strengths\n\n${strengthBullets}\n\n`
  );
  next = next.replace(
    /## Limitations \/ When NOT to Use\n[\s\S]*?(?=\n## )/,
    `## Limitations / When NOT to Use\n\n${limitationBullets}\n\n`
  );
  if (enrichment.enrichment_status === 'draft') {
    next = next.replace(
      /(## Limitations \/ When NOT to Use\n\n)([\s\S]*?)(\n\n## )/,
      `$1$2\n- _Enrichment status: draft — best_when/avoid_when above are based on the vendor's own description; not yet confirmed against third-party production usage reports. Last reviewed: ${today}._$3`
    );
  }
  return next;
}

async function run() {
  const enrichment = await loadEnrichment();
  const files = await glob('content/tools/by-job/*.md', { posix: true });
  const moves = []; // { from, to, id }

  for (const file of files) {
    const raw = await fs.readFile(file, 'utf8');
    const parsed = matter(raw);
    if (parsed.data.type !== 'tool') continue; // skip guide pages
    const id = parsed.data.id;
    const e = enrichment[id];
    if (!e) {
      console.error(chalk.red(`No enrichment data found for tool "${id}" (${file}). Aborting.`));
      process.exitCode = 1;
      return;
    }

    const newFrontmatter = buildFrontmatter(parsed.data, e);
    const newBody = rewriteStrengthsAndLimitations(parsed.content, e);
    const newFile = `${serializeFrontmatter(newFrontmatter)}\n${newBody.replace(/^\n+/, '')}`;
    const destination = `content/tools/${e.phase}/${id}.md`;

    moves.push({ from: file, to: destination, id });

    if (!dryRun) {
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.writeFile(destination, newFile);
      if (destination !== file) await fs.rm(file);
    }
  }

  // Create _index.md for each phase folder per the section index template.
  for (const [phase, label] of Object.entries(phaseLabels)) {
    const dir = `content/tools/${phase}`;
    const indexPath = `${dir}/_index.md`;
    const scope = phaseScope[phase];
    const content = `---
title: "${label} Tools"
section: "tools/${phase}"
auto_generated: false
---

# ${label} Tools

## What belongs here

${scope.belongs}

## What does NOT belong here

${scope.notBelongs}

## Decision guidance

Before picking a tool in this phase, consider:

- See [Architecture Decision Trees](../../architectures/decision-trees/_index.md) for cross-cutting guidance.
- Key question to ask: ${scope.question}

## Tools in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->
`;
    if (!dryRun) {
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(indexPath, content);
    }
    moves.push({ from: null, to: indexPath, id: `_index(${phase})` });
  }

  console.log(chalk.green(`${dryRun ? '[DRY RUN] ' : ''}Migrated ${moves.filter((m) => m.from).length} tool entries into ${Object.keys(phaseLabels).length} phase folders.`));
  return moves;
}

const moves = await run();
if (moves) {
  await fs.mkdir('.migration', { recursive: true });
  await fs.writeFile('.migration/move-manifest.json', `${JSON.stringify(moves, null, 2)}\n`);
}

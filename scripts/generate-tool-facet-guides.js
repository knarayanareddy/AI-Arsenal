#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEntries } from './utils/entries.js';
import { escapeMarkdownCell } from './utils/markdown-escape.js';

export const MARKER = '<!-- AUTO-GENERATED TOOL TABLE BELOW — do not edit -->';

const COST_FACETS = ['open-source', 'freemium', 'paid', 'self-hostable', 'usage-based'];
const STACK_FACETS = ['python', 'typescript', 'rust', 'go', 'java', 'cpp', 'julia', 'polyglot'];

const COST_DIR = 'content/tools/by-cost';
const STACK_DIR = 'content/tools/by-stack';

export const FACETS = [
  ...COST_FACETS.map((f) => ({ facetType: 'cost', facet: f, path: `${COST_DIR}/cost-${f}.md` })),
  ...STACK_FACETS.map((f) => ({ facetType: 'stack', facet: f, path: `${STACK_DIR}/stack-${f}.md` })),
];

function rel(fromFile, toFile) {
  let r = path.relative(path.dirname(fromFile), toFile).split(path.sep).join('/');
  if (!r.startsWith('.')) r = `./${r}`;
  return r;
}

function facetLabel(value) {
  return value
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function facetPath(facetType, facet) {
  return facetType === 'cost'
    ? `${COST_DIR}/cost-${facet}.md`
    : `${STACK_DIR}/stack-${facet}.md`;
}

function matchTools(tools, facetType, facet) {
  return tools.filter((t) =>
    facetType === 'cost'
      ? t.data.cost_model === facet
      : (t.data.stack ?? []).includes(facet)
  );
}

function cell(value) {
  return escapeMarkdownCell(value);
}

function tableBlock(tools, facetType, facet, facetPagePath) {
  const rows = matchTools(tools, facetType, facet)
    .slice()
    .sort((a, b) => String(a.data.id).localeCompare(String(b.data.id)))
    .map((t) => {
      const d = t.data;
      const link = `[${cell(d.name ?? d.id)}](${rel(facetPagePath, t.file)})`;
      const phase = cell((d.phase ?? '').replace(/-/g, ' '));
      const jobs = cell((d.job ?? []).join(', '));
      const cost = cell(d.cost_model ?? '');
      const free = d.free_tier ? 'Yes' : 'No';
      const self = d.self_hostable ? 'Yes' : 'No';
      const oss = d.open_source ? 'Yes' : 'No';
      const stack = cell((d.stack ?? []).join(', '));
      const verdict = cell(d.verdict ?? '');
      return `| ${link} | ${phase} | ${jobs} | ${cost} | ${free} | ${self} | ${oss} | ${stack} | ${verdict} |`;
    });
  const header = '| Tool | Phase | Jobs | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |';
  const sep = '|---|---|---|---|---|---|---|---|---|';
  if (rows.length === 0) return `${header}\n${sep}`;
  return [header, sep, ...rows].join('\n');
}

// Shared source of truth for the generated table. Used by both the generator
// (to write) and the checker (to verify), so the two can never drift.
export async function expectedBelowMarker(facetType, facet, toolsArg) {
  const tools = toolsArg ?? (await loadEntries()).filter((e) => e.type === 'tool');
  const facetPagePath = facetPath(facetType, facet);
  return `\n${tableBlock(tools, facetType, facet, facetPagePath)}\n`;
}

function templatePreamble(facetType, facet) {
  const id = facetType === 'cost' ? `cost-${facet}` : `stack-${facet}`;
  const label = facetLabel(facet);
  const facetTypeName = facetType === 'cost' ? 'Cost' : 'Stack';
  return `---
id: "${id}"
title: "Tools by ${facetTypeName} — ${label}"
entry_type: "guide"
section: "tools"
description: "Tools in the Arsenal filtered by ${facetTypeName} facet ${label}, with an auto-generated routing table that keeps this page current"
tags:
  - llm
  - data
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

This routing page lists every tool in the Arsenal whose ${facetTypeName.toLowerCase()} facet is ${label}. It is generated and maintained from each tool's frontmatter, so it stays exhaustive as the catalog grows.

## Why It's in the Arsenal

Tool-by-facet pages let builders shortlist options along the two axes that matter most for adoption cost and integration fit, without browsing the entire repository.

## Key Features

- Exhaustive: every matching tool, derived from frontmatter
- Auto-updating: regenerated whenever tool facets change
- Links to canonical tool entries instead of duplicating long-form content

## Architecture / How It Works

The table below is produced by scripts/generate-tool-facet-guides.js from the cost_model and stack facets on each tool. Adding or editing a tool updates the relevant facet pages on the next generation.

## Getting Started

Pick a tool from the table below and validate it with a small proof of concept before adoption.

## Use Cases

1. **Scenario**: you need a ${facetTypeName.toLowerCase()} fit of "${label}" and want the full shortlist fast
2. **Scenario**: comparing options before a production or prototyping decision

## Strengths

- Fast, exhaustive shortlist for humans and LLM agents
- Avoids duplicate long-form tool descriptions

## Limitations / When NOT to Use

- Does not replace hands-on evaluation
- Pricing, hosting, and integration details change; verify before production

## Integration Patterns

- Link to canonical tool IDs from architecture docs and decision trees
- Pair with the By-Job and By-Phase routing pages for cross-cutting views

## Resources

- Linked tool entries in the table below carry the authoritative detail

## Buzz & Reception

This page is a maintained routing surface; the tool table below is auto-refreshed and is not a popularity ranking.

${MARKER}`;
}

async function main() {
  const entries = await loadEntries();
  const tools = entries.filter((e) => e.type === 'tool');
  for (const { facetType, facet, path: facetPagePath } of FACETS) {
    const below = await expectedBelowMarker(facetType, facet, tools);
    let existing = null;
    try {
      existing = await fs.readFile(facetPagePath, 'utf8');
    } catch {
      existing = null;
    }
    let newContent;
    if (existing && existing.includes(MARKER)) {
      const idx = existing.indexOf(MARKER);
      const preamble = existing.slice(0, idx + MARKER.length);
      newContent = preamble + below;
    } else if (existing) {
      newContent = existing.replace(/\s*$/, '') + '\n\n' + MARKER + below;
    } else {
      newContent = templatePreamble(facetType, facet) + below;
    }
    await fs.mkdir(path.dirname(facetPagePath), { recursive: true });
    await fs.writeFile(facetPagePath, newContent);
  }
  console.log(`Generated ${FACETS.length} tool facet guides.`);
}

const invokedDirectly =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (invokedDirectly) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

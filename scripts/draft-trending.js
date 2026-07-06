#!/usr/bin/env node
import fs from 'node:fs/promises';
import chalk from 'chalk';

// Draft a schema-compliant trend weekly-snapshot from generated project data.
// Emits content/trending/this-week.md with entry_type: "trend" so the file
// validates against schemas/trend.schema.json (see the Trending vertical
// reorganisation brief). Run after `pnpm run generate:all` so data/projects.json
// (which carries trending_score) is current.
let projects = { items: [] };
try { projects = JSON.parse(await fs.readFile('data/projects.json', 'utf8')); } catch {}

const today = new Date().toISOString().slice(0, 10);
const windowStart = (() => {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString().slice(0, 10);
})();

const top = [...(projects.items ?? [])]
  .sort((a, b) => (b.trending_score ?? 0) - (a.trending_score ?? 0))
  .slice(0, 10);

const rankedYaml = top.length
  ? top
      .map((p, i) => {
        const lines = [
          `  - rank: ${i + 1}`,
          `    entry_id: "${p.id}"`,
          `    entry_type: "project"`,
          `    why_here: "Trending score ${p.trending_score ?? 0}/100 from GitHub star velocity, recency, and buzz sources."`,
          `    score_snapshot: ${p.trending_score ?? 0}`
        ];
        return lines.join('\n');
      })
      .join('\n')
  : '  []';

const list =
  top.map((p, i) => `${i + 1}. [${p.name ?? p.id}](${p.url}) — ${p.description ?? ''}`).join('\n') ||
  '_No projects available yet._';

const content = `---
id: "this-week"
title: "This Week in AI Arsenal"
entry_type: "trend"
kind: "weekly-snapshot"
status: "draft"
as_of: "${today}"
window:
  start: "${windowStart}"
  end: "${today}"
signals_used:
  - github-stars-velocity
  - github-stars-total
  - github-activity
sources:
  - source: "github"
    url: "https://github.com/trending"
    last_checked: "${today}"
    notes: "GitHub Trending is the primary star-velocity signal."
ranked_entries:
${rankedYaml}
last_reviewed: "${today}"
added_date: "${today}"
added_by: "maintainer"
enrichment_status: "draft"
tags:
  - trending
---

## Overview

This weekly draft summarizes notable project movement and ecosystem signals for maintainer review.

## What this snapshot covers

Top projects by trending score (GitHub star velocity, recency, and buzz sources) over the trailing 7-day window (${windowStart} → ${today}).

## Method (signals + caveats)

Trending scores are computed by \`scripts/calculate-trending.js\` from structured project metadata. Star velocity is noisy and community buzz is anecdotal; scores are only as good as source metadata and must be human-verified before publishing.

## Ranked entries (with why)

${list}

## Notable changes to watch

- Re-run \`pnpm run update:trending\` and \`node scripts/draft-trending.js\` before publishing; verify external buzz sources.

## How to use this (links into the Arsenal)

Link the weekly draft from monthly digests and launch posts once reviewed. Pair with the [Hall of Fame](./hall-of-fame.md) for evergreen context.

## Sources

- [GitHub Trending](https://github.com/trending) (last_checked: ${today})
`;

await fs.writeFile('content/trending/this-week.md', content);
console.log(chalk.green('Drafted content/trending/this-week.md'));

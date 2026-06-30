#!/usr/bin/env node
// Replaces the generic, templated "Overview" / "Key Features" /
// "Architecture / How It Works" sections in migrated tool entries with
// genuine, tool-specific content (per Curator Rule C-5: never copy-paste
// vendor marketing; Rule C-6: overview must not start with the tool name).
//
// Usage: node scripts/apply-tool-body-content.js [--dry-run]

import fs from 'node:fs/promises';
import { glob } from 'glob';
import matter from 'gray-matter';
import chalk from 'chalk';

const dryRun = process.argv.includes('--dry-run');

const bodyFiles = [
  '.migration/body-data-ingestion.json',
  '.migration/body-model-layer.json',
  '.migration/body-serving-and-deployment.json',
  '.migration/body-orchestration.json',
  '.migration/body-evaluation-and-observability.json',
  '.migration/body-dx-and-tooling.json'
];

const content = {};
for (const file of bodyFiles) Object.assign(content, JSON.parse(await fs.readFile(file, 'utf8')));

// Best_when/avoid_when live in frontmatter (already migrated), not in the
// body-content JSON files, so "Why It's in the Arsenal" is derived directly
// from each file's own frontmatter at apply time.
function buildWhyInArsenal(name, bestWhen) {
  const first = bestWhen[0];
  const lowerFirst = first.charAt(0).toLowerCase() + first.slice(1);
  return `${name} earns a place in the Arsenal because it directly addresses a recurring decision point: ${lowerFirst}. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.`;
}

// Reframes each best_when condition (already a concrete, specific condition
// per Curator Rule C-1) as a "Scenario" use case, rather than authoring an
// entirely separate, possibly-inconsistent set of use cases. avoid_when[0]
// is included as a closing scenario describing when NOT to reach for this
// tool, since the prompt requires use cases to be concrete engineering
// scenarios, not abstract feature lists.
function buildUseCases(bestWhen, avoidWhen) {
  const scenarios = bestWhen.map((b) => {
    const lower = b.charAt(0).toLowerCase() + b.slice(1);
    return `**Scenario**: ${lower}`;
  });
  if (avoidWhen?.[0]) {
    const lowerAvoid = avoidWhen[0].charAt(0).toLowerCase() + avoidWhen[0].slice(1);
    scenarios.push(`**Scenario where this is NOT the right fit**: ${lowerAvoid} — evaluate an alternative instead`);
  }
  return scenarios.map((s, i) => `${i + 1}. ${s}`).join('\n');
}

const files = await glob('content/tools/*/*.md', {
  posix: true,
  ignore: ['content/tools/*/_index.md']
});

let changed = 0;
let skipped = 0;

for (const file of files) {
  const raw = await fs.readFile(file, 'utf8');
  const parsed = matter(raw);
  const id = parsed.data.id;
  const c = content[id];
  if (!c) { skipped += 1; continue; }

  // Preserve the original frontmatter block verbatim (avoid re-serializing
  // YAML, which could alter formatting/quoting decisions made earlier).
  const frontmatterMatch = raw.match(/^(---\n[\s\S]*?\n---\n)/);
  if (!frontmatterMatch) { skipped += 1; continue; }
  const frontmatterBlock = frontmatterMatch[1];

  let body = parsed.content;

  body = body.replace(
    /## Overview\n\n[\s\S]*?(?=\n## )/,
    `## Overview\n\n${c.overview}\n\n`
  );

  const featureBullets = c.key_features.map((f) => `- ${f}`).join('\n');
  body = body.replace(
    /## Key Features\n\n[\s\S]*?(?=\n## )/,
    `## Key Features\n\n${featureBullets}\n\n`
  );

  body = body.replace(
    /## Architecture \/ How It Works\n\n[\s\S]*?(?=\n## )/,
    `## Architecture / How It Works\n\n${c.architecture}\n\n`
  );

  if (Array.isArray(parsed.data.best_when) && parsed.data.best_when.length > 0) {
    const why = buildWhyInArsenal(parsed.data.name, parsed.data.best_when);
    body = body.replace(
      /## Why It's in the Arsenal\n\n[\s\S]*?(?=\n## )/,
      `## Why It's in the Arsenal\n\n${why}\n\n`
    );

    const useCases = buildUseCases(parsed.data.best_when, parsed.data.avoid_when);
    body = body.replace(
      /## Use Cases\n\n[\s\S]*?(?=\n## )/,
      `## Use Cases\n\n${useCases}\n\n`
    );
  }

  // Collapse any resulting triple-or-more blank lines down to a single
  // blank line for clean Markdown output.
  body = body.replace(/\n{3,}/g, '\n\n');

  const newFile = `${frontmatterBlock}\n${body.replace(/^\n+/, '')}`;
  if (newFile !== raw) {
    changed += 1;
    if (!dryRun) await fs.writeFile(file, newFile);
  }
}


console.log(chalk.green(`${dryRun ? '[DRY RUN] ' : ''}Rewrote body content for ${changed} tool entries (${skipped} skipped, no enrichment data).`));

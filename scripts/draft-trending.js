#!/usr/bin/env node
import fs from 'node:fs/promises';
import chalk from 'chalk';

let projects = { items: [] };
try { projects = JSON.parse(await fs.readFile('data/projects.json', 'utf8')); } catch {}
const top = [...(projects.items ?? [])].sort((a, b) => (b.trending_score ?? 0) - (a.trending_score ?? 0)).slice(0, 10);
const today = new Date().toISOString().slice(0, 10);
const list = top.map((p, i) => `${i + 1}. [${p.name}](../../${p.path}) — ${p.description}`).join('\n') || '_No projects available yet._';
const content = `---\nid: "this-week"\ntitle: "This Week in AI Arsenal"\nentry_type: "guide"\nsection: "trending"\ndescription: "Weekly draft of trending AI engineering projects and ecosystem signals"\ntags:\n  - trending\nrelated_entries: []\nadded_date: "${today}"\nlast_reviewed: "${today}"\nadded_by: "maintainer"\nstatus: "watching"\n---\n\n## Overview\n\nThis weekly draft summarizes notable project movement and ecosystem signals for maintainer review.\n\n## Why It's in the Arsenal\n\nTrending snapshots preserve freshness and make it easier for humans and agents to discover what changed recently.\n\n## Key Features\n\n- Generated from structured project metadata\n- Designed as a draft requiring maintainer review\n- Links back to canonical project entries\n\n## Architecture / How It Works\n\nThe script reads generated project data, sorts by trending score, and writes this Markdown file for human editing.\n\n## Getting Started\n\n\`\`\`bash\npnpm run generate && node scripts/draft-trending.js\n\`\`\`\n\n## Use Cases\n\n1. **Scenario**: Weekly maintainer review of ecosystem movement\n2. **Scenario**: Public digest preparation\n\n## Strengths\n\n- Keeps freshness visible\n- Reuses canonical metadata rather than duplicating entries\n\n## Limitations / When NOT to Use\n\n- Must not be treated as final without human verification\n- Trending scores are only as good as source metadata\n\n## Integration Patterns\n\nLink the weekly draft from monthly digests, launch posts, and future UI trending views.\n\n## Resources\n\n${list}\n\n## Buzz & Reception\n\nMaintainers should add verified buzz sources before publishing.\n\n---\n*Last reviewed: ${today} by @maintainer*\n`;
await fs.writeFile('content/trending/this-week.md', content);
console.log(chalk.green('Drafted content/trending/this-week.md'));

# 🧰 AI Arsenal

> A schema-first, Markdown-native knowledge base for AI engineering tools, projects, papers, architectures, tips, and build examples — designed for humans, LLMs, autonomous agents, and future UI/API consumers.

AI Arsenal is built around one core idea: **structured knowledge is more useful than scattered lists**. Every curated entry is a Markdown file with validated YAML frontmatter, so the repository works as a browsable GitHub knowledge base today and as a generated static data API tomorrow.

---

## Table of Contents

- [What This Is](#what-this-is)
- [Who This Is For](#who-this-is-for)
- [What Is Included](#what-is-included)
- [Repository Status](#repository-status)
- [Quick Start](#quick-start)
- [How to Browse](#how-to-browse)
- [How the Repository Works](#how-the-repository-works)
- [Content Model](#content-model)
- [Generated Data API](#generated-data-api)
- [Common Workflows](#common-workflows)
- [Contributing](#contributing)
- [Automation and CI](#automation-and-ci)
- [Using AI Arsenal with LLMs and Agents](#using-ai-arsenal-with-llms-and-agents)
- [Project Principles](#project-principles)
- [Important Files](#important-files)
- [FAQ](#faq)
- [License](#license)

---

## What This Is

AI Arsenal is a curated and machine-readable encyclopedia for practical AI engineering.

It tracks:

- notable open-source AI projects
- production tools
- research papers
- architecture decision trees
- reference stacks
- observability patterns
- tips and gotchas
- build examples
- community resources
- generated JSON indexes for future UI/search/API layers

Unlike a normal awesome-list, AI Arsenal enforces structure:

```text
Markdown body         = human-readable explanation
YAML frontmatter     = machine-readable database record
JSON Schema          = quality gate
TAXONOMY.md          = controlled vocabulary
/data/*.json         = generated static API contract
```

---

## Who This Is For

### AI Engineers

Use it to compare tools, choose architectures, find build examples, and avoid common production mistakes.

### Researchers and Technical Leads

Use it to map papers to practical system design decisions and evaluate emerging techniques.

### Product and Platform Teams

Use it to understand tradeoffs across cost, maturity, hosting model, observability, and operational complexity.

### Contributors

Use templates and validation scripts to add high-quality entries with immediate feedback.

### LLMs and Agents

Use `AGENT.md`, `CONTEXT.md`, and `/data/*.json` to route, retrieve, filter, and summarize repository knowledge with minimal ambiguity.

---

## What Is Included

Population progress is tracked in [`PROGRESS.md`](./PROGRESS.md).

Current generated stats:

| Type | Count |
|---|---:|
| Projects | 306 |
| Tools | 202 |
| Papers | 126 |
| Tips | 171 |
| Guides | 59 |
| Benchmarks | 52 |
| People | 25 |
| Community | 32 |
| Architectures | 29 |
| Build examples | 8 |
| Observability | 16 |
| Trends | 4 |
| Digests | 1 |
| Total content entries | 1031 |

Browse the generated statistics in [`data/stats.json`](./data/stats.json).

---

## Repository Status

Implemented and hardened:

- ✅ Schema-first content foundation
- ✅ Controlled taxonomy
- ✅ Contributor templates
- ✅ Validation pipeline
- ✅ Generated JSON data layer
- ✅ Generated search index
- ✅ Generated registries and section indexes
- ✅ Link, stale, path, reference, duplicate-ID, and data-contract checks
- ✅ GitHub workflows for PR validation and scheduled maintenance
- ✅ Batched generated-data refresh policy to avoid git history pollution
- ✅ Core content through launch bootstrap

Intentionally separate/future:

- ⏳ Web UI belongs in a separate future repository consuming `/data/*.json`
- ⏳ Advanced integrations such as email digest providers, Cloudflare Workers API, VS Code extension, Discord bot, and mobile app are future phases

---

## Quick Start

### Prerequisites

- Node.js `>=20`
- pnpm `>=9`

If pnpm is not installed globally, you can use Corepack:

```bash
corepack enable
corepack prepare pnpm@9 --activate
```

### Install

```bash
pnpm install
```

### Auto-fix minor formatting issues

```bash
pnpm run fix
```

This normalizes line endings, removes trailing whitespace, and ensures final newlines.

### Validate the repository

```bash
pnpm run ci
```

This runs schema validation, taxonomy validation, Markdown structure validation, path checks, reference checks, duplicate ID checks, data generation, search index generation, and data contract validation.

### Check links

```bash
pnpm run check:links
```

### Regenerate all generated files

```bash
pnpm run generate:all
```

---

## How to Browse

Start with these sections:

| Section | Path | Use it for |
|---|---|---|
| Projects | [`content/projects/`](./content/projects/) | Open-source projects, frameworks, models, platforms |
| Tools | [`content/tools/`](./content/tools/) | Products and tools, browsable by job (`by-job/`), cost, stack, or canonical lifecycle phase (`data-ingestion/`, `model-layer/`, `orchestration/`, `serving-and-deployment/`, `evaluation-and-observability/`, `dx-and-tooling/`) |
| Architectures | [`content/architectures/`](./content/architectures/) | Decision trees and reference stacks |
| Observability | [`content/observability/`](./content/observability/) | Tracing, monitoring, evaluation, cost tracking |
| Research | [`content/research/`](./content/research/) | Must-read papers and individual paper summaries |
| Tips | [`content/tips-and-tricks/`](./content/tips-and-tricks/) | Practical optimizations and production gotchas |
| Build examples | [`content/build-examples/`](./content/build-examples/) | Starter, intermediate, and advanced project guides |
| Community | [`content/community/`](./content/community/) | People, channels, and newsletters |
| Trending | [`content/trending/`](./content/trending/) | Weekly and evergreen ecosystem signals |

Each directory has an `_index.md` file for navigation. Registry files such as `content/projects/_registry.md` and `content/tools/_registry.md` are generated and should not be edited manually.

---

## How the Repository Works

AI Arsenal has five layers:

```text
Layer 1: Schema Layer
  schemas/*.schema.json
  TAXONOMY.md
  templates/*.md
  validation scripts

Layer 2: Content Layer
  content/**/*.md
  YAML frontmatter + Markdown body

Layer 3: Automation Layer
  scripts/*.js
  GitHub Actions workflows

Layer 4: Data API Layer
  data/*.json
  generated static JSON

Layer 5: Future UI Layer
  separate repository consuming /data/*.json
```

The key design rule is:

> Content is authored in Markdown, but frontmatter is the database record.

---

## Content Model

A content entry has two parts:

```markdown
---
id: "langgraph"
name: "LangGraph"
tags:
  - agents
  - orchestration
maturity: "production"
status: "active"
---

## Overview

Human-readable explanation goes here.
```

### Content entry types

| Type | Schema | Typical location |
|---|---|---|
| Project | [`schemas/project.schema.json`](./schemas/project.schema.json) | `content/projects/**/[id].md` |
| Tool | [`schemas/tool.schema.json`](./schemas/tool.schema.json) | `content/tools/**/[id].md` |
| Paper | [`schemas/research.schema.json`](./schemas/research.schema.json) | `content/research/{phase}/[id].md` |
| Tip | [`schemas/tip.schema.json`](./schemas/tip.schema.json) | `content/tips-and-tricks/{phase}/[id].md` |
| Build example | [`schemas/build-example.schema.json`](./schemas/build-example.schema.json) | `content/build-examples/{phase}/[id].md` |
| Person | [`schemas/person.schema.json`](./schemas/person.schema.json) | `content/community/people/[id].md` |
| Digest | [`schemas/digest.schema.json`](./schemas/digest.schema.json) | `content/digests/YYYY-MM/digest.md` |
| Guide | [`schemas/guide.schema.json`](./schemas/guide.schema.json) | guide pages across content sections |
| Architecture | [`schemas/architecture.schema.json`](./schemas/architecture.schema.json) | `content/architectures/{category}/[id].md` |
| Observability | [`schemas/observability.schema.json`](./schemas/observability.schema.json) | `content/observability/{category}/[id].md` |
| Community | [`schemas/community.schema.json`](./schemas/community.schema.json) | `content/community/{kind}/[id].md` |
| Benchmark | [`schemas/benchmark.schema.json`](./schemas/benchmark.schema.json) | `content/benchmarks/{category}/[id].md` |
| Trend | [`schemas/trend.schema.json`](./schemas/trend.schema.json) | `content/trending/{kind}/[id].md` |

### Controlled vocabulary

All controlled values live in [`TAXONOMY.md`](./TAXONOMY.md), including:

- tags
- project categories
- maturity levels
- cost models
- tool jobs
- status values
- paper importance values
- buzz sources

If a value is not in `TAXONOMY.md`, validation should reject it.

---

## Generated Data API

The `/data` directory is the generated static API contract.

| File | Purpose |
|---|---|
| [`data/index.json`](./data/index.json) | Lightweight master index of all entries |
| [`data/projects.json`](./data/projects.json) | Full project records |
| [`data/tools.json`](./data/tools.json) | Full tool records |
| [`data/papers.json`](./data/papers.json) | Full paper records |
| [`data/tips.json`](./data/tips.json) | Full tip records |
| [`data/guides.json`](./data/guides.json) | Full guide records |
| [`data/build-examples.json`](./data/build-examples.json) | Full build-example records |
| [`data/architectures.json`](./data/architectures.json) | Architecture decision records |
| [`data/observability.json`](./data/observability.json) | Observability playbooks |
| [`data/community.json`](./data/community.json) | Community resources |
| [`data/benchmarks.json`](./data/benchmarks.json) | Benchmark records |
| [`data/trending.json`](./data/trending.json) | Trending snapshots and source feeds |
| [`data/tags.json`](./data/tags.json) | Tag counts and type distribution |
| [`data/stats.json`](./data/stats.json) | Repository statistics |
| [`data/search-index.json`](./data/search-index.json) | FlexSearch-compatible search documents and facets |
| [`data/github-cache.json`](./data/github-cache.json) | Cached GitHub metrics from star refresh automation |
| [`data/link-check-report.json`](./data/link-check-report.json) | Latest link-check report |
| [`data/stale-report.json`](./data/stale-report.json) | Latest stale-content report |

Generated data includes:

- structured frontmatter fields
- canonical path and URL
- rendered `body_html`
- plain `body_text`
- headings
- word count
- reading time
- facets for filtering/search

Read more in [`docs/data-api.md`](./docs/data-api.md). External consumers can also fetch root-level JSON from the generated `data-release` branch; see [`docs/data-release.md`](./docs/data-release.md).

---

## Common Workflows

### Add a new project

```bash
pnpm run new:project
pnpm run fix:changed
pnpm run validate:changed
pnpm run check:duplicates
```

Then edit the generated Markdown file and open a PR.

### Add a new tool

```bash
pnpm run new:tool
pnpm run fix:changed
pnpm run validate:changed
pnpm run check:duplicates
```

### Add a new paper

```bash
pnpm run new:paper
pnpm run fix:changed
pnpm run validate:changed
pnpm run check:duplicates
```

### Add a new tip

```bash
pnpm run new:tip
pnpm run fix:changed
pnpm run validate:changed
pnpm run check:duplicates
```

### Add a new benchmark

```bash
pnpm run new:benchmark
pnpm run fix:changed
pnpm run validate:changed
pnpm run check:duplicates
```

Benchmarks require live verification: set `leaderboards[].last_checked`, use SOTA-safe wording (date + leaderboard URL + protocol variant), and flag unverified entries `enrichment_status: draft`. See [`docs/reports/PR_DESCRIPTION_BENCHMARKS.md`](./docs/reports/PR_DESCRIPTION_BENCHMARKS.md) for the full verification policy.

### Regenerate data locally

```bash
pnpm run generate:all
```

### Refresh GitHub stars and trending scores

```bash
pnpm run update:stars
pnpm run update:trending
pnpm run generate:all
```

For authenticated GitHub API access:

```bash
GITHUB_TOKEN=ghp_xxx pnpm run update:stars
```

### Find stale entries

```bash
pnpm run check:stale
```

### Run a local validation watcher

```bash
pnpm run dev
```

---

## Contributing

Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) first.

Before opening a PR:

```bash
pnpm run fix:changed
pnpm run validate:changed
pnpm run check:duplicates
```

For larger changes, run the full suite:

```bash
pnpm run ci
```

Important rules:

- Use templates or scaffold commands.
- Do not invent taxonomy values casually; update `TAXONOMY.md` only when justified.
- Entry IDs must be unique and match the filename.
- Do not manually edit generated registries unless you are changing the generator.
- Generated data is refreshed through batched automation PRs to avoid git history pollution.

---

## Automation and CI

AI Arsenal uses a scalable CI model:

- PRs validate changed content quickly.
- Global invariants are still checked.
- Generated data is verified but not committed on every merge.
- Scheduled workflows open batched maintenance PRs.

Key workflows:

| Workflow | Purpose |
|---|---|
| `.github/workflows/on-pr.yml` | Changed-file validation, global checks, generated data contract, changed-link checks |
| `.github/workflows/on-merge.yml` | Full post-merge verification without committing generated files |
| `.github/workflows/data-refresh.yml` | Batched generated-data refresh PR |
| `.github/workflows/weekly.yml` | Weekly metrics, links, and trending PR |
| `.github/workflows/monthly.yml` | Monthly digest, stale report, and stats PR |
| `.github/workflows/manual.yml` | Manual maintenance tasks |

Read [`docs/automation-policy.md`](./docs/automation-policy.md) for details.

---

## Using AI Arsenal with LLMs and Agents

For LLMs, start with:

1. [`AGENT.md`](./AGENT.md) — routing map
2. [`CONTEXT.md`](./CONTEXT.md) — dense summary
3. [`TAXONOMY.md`](./TAXONOMY.md) — vocabulary contract
4. `/data/*.json` — structured API data

Prompt templates are available in [`meta/prompt-templates/`](./meta/prompt-templates/).

Useful docs:

- [`meta/how-to-use-with-llm.md`](./meta/how-to-use-with-llm.md)
- [`meta/how-to-use-with-agents.md`](./meta/how-to-use-with-agents.md)
- [`docs/llm-agent-guide.md`](./docs/llm-agent-guide.md)

---

## Project Principles

AI Arsenal follows five core pillars:

1. **Signal over noise** — curated, not aggregated
2. **Structure as feature** — schema discipline enables AI-native discovery
3. **Freshness as trust** — stale data is worse than no data
4. **Contributor delight** — low friction, high reward
5. **UI-ready from day 1** — the data layer is the product

These principles guide repository structure, schema choices, automation, and contribution rules.

---

## Important Files

| File | Purpose |
|---|---|
| [`AGENT.md`](./AGENT.md) | LLM/agent navigation map |
| [`CONTEXT.md`](./CONTEXT.md) | Dense generated repository summary |
| [`TAXONOMY.md`](./TAXONOMY.md) | Controlled vocabulary |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | Contributor guide |
| [`GOVERNANCE.md`](./GOVERNANCE.md) | Maintainer roles and decision process |
| [`SECURITY.md`](./SECURITY.md) | Security reporting policy |
| [`schemas/README.md`](./schemas/README.md) | Schema system overview |
| [`scripts/README.md`](./scripts/README.md) | Automation script reference |
| [`templates/README.md`](./templates/README.md) | Entry template guide |
| [`docs/getting-started.md`](./docs/getting-started.md) | Beginner-friendly setup guide |
| [`docs/contributor-guide.md`](./docs/contributor-guide.md) | Step-by-step contribution guide |
| [`docs/data-api.md`](./docs/data-api.md) | Generated JSON API guide |
| [`docs/data-release.md`](./docs/data-release.md) | Dedicated data-release branch guide |
| [`docs/maintainer-runbook.md`](./docs/maintainer-runbook.md) | Maintainer operations guide |
| [`docs/provenance.md`](./docs/provenance.md) | Content provenance and `enrichment_status` meanings |
| [`docs/troubleshooting.md`](./docs/troubleshooting.md) | Common errors and fixes |
| [`docs/faq.md`](./docs/faq.md) | Frequently asked questions |

---

## FAQ

### Is this a website?

Not yet. This repository is the content and data layer. The future UI should be a separate repository that consumes `/data/*.json`.

### Why Markdown instead of a database?

Markdown keeps the project forkable, reviewable, versioned, and contributor-friendly. YAML frontmatter provides the database-like structure.

### Why so much schema validation?

The schema layer is the quality guarantor. It makes the content queryable, comparable, and safe for future UI/API/LLM consumers.

### Should contributors edit `/data/*.json`?

Usually no. Data files are generated. Edit Markdown content, then let automation regenerate the data layer.

### Why not auto-commit generated files on every merge?

Because it creates git history noise and merge conflicts at scale. Generated files are refreshed through batched automation PRs instead.

---

## License

MIT. See [`LICENSE`](./LICENSE).

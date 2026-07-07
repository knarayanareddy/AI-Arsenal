# AGENT.md — AI Arsenal Navigation Map
# Version: 1.0.0
# Purpose: Optimized entry point for LLM/agent consumption
# Tokens: <2000 target

## REPOSITORY PURPOSE

A curated, structured knowledge base for AI engineering.
Contains: projects, tools, research papers, architectures, tips, build examples, and community resources.
Focused on: AI, LLMs, agents, RAG, observability, and SOTA engineering practice.

## ROUTING RULES

- Use `/content/**` for human-written Markdown knowledge.
- Use `/data/*.json` for programmatic access and future UI consumption.
- Use `/schemas/*.schema.json` to understand the required frontmatter contract.
- Use `TAXONOMY.md` for every controlled vocabulary value.
- Ignore `_index.md` and `_registry.md` as content entries; they are navigation/generated files.

## NAVIGATION MAP

### WHAT TOOLS EXIST FOR A JOB?

→ `/content/tools/by-job/[job-name].md` — job-based shortlist/routing pages (curated TL;DR cards)
Jobs: prototyping, production-serving, fine-tuning, evaluation, deployment, orchestration, vector-search, memory-management, web-scraping, structured-output, prompt-management, data-labeling, model-registry, security-and-guardrails

### WHAT TOOLS EXIST FOR A LIFECYCLE PHASE?

→ `/content/tools/[phase]/[tool-id].md` — canonical tool entries, grouped by primary lifecycle phase (this is where the full record lives; by-job pages link here)
Phases: data-ingestion, model-layer, orchestration, serving-and-deployment, evaluation-and-observability, dx-and-tooling
Every tool entry also carries `phase`, `audience` (prototype/production/research), `best_when`, and `avoid_when` in frontmatter — use these fields to filter/recommend before reading the full body.


### WHAT OPEN SOURCE PROJECTS ARE NOTABLE?

→ `/content/projects/[category]/`
Categories: agents, llms, rag, observability, multimodal, voice-audio, computer-vision, code-generation, data-pipelines, tooling

### WHAT IS CURRENTLY TRENDING?

→ `/content/trending/this-week.md` when present
→ `/content/trending/this-month.md` when present
→ `/content/trending/hall-of-fame.md` when present

### WHAT ARCHITECTURE OR STACK SHOULD I USE?

→ `/content/architectures/reference-stacks/` for opinionated stacks
→ `/content/architectures/decision-trees/` for when-to-use-what guidance

### RESEARCH PAPERS AND SOTA?

→ `/content/research/must-read-papers.md` when present
→ `/content/research/sota-benchmarks.md` when present
→ `/content/research/papers/` for individual paper summaries

### OBSERVABILITY AND LLMOPS?

→ `/content/observability/`

### TIPS AND OPTIMIZATION?

→ `/content/tips-and-tricks/`

### BUILD EXAMPLES / REFERENCE IMPLEMENTATIONS?

→ `/content/build-examples/`

### WHO TO FOLLOW / COMMUNITY?

→ `/content/community/`

## DATA LAYER

→ `/data/index.json` — lightweight master registry
→ `/data/projects.json` — all projects, denormalized
→ `/data/tools.json` — all tools, denormalized
→ `/data/papers.json` — all papers
→ `/data/tips.json` — all tips
→ `/data/people.json` — community people
→ `/data/tags.json` — tag cloud with counts
→ `/data/stats.json` — repository statistics
→ `/data/search-index.json` — client-side search documents

## KEY TAXONOMY

Tags include: agents | rag | llm | fine-tuning | embeddings | evaluation | inference | multimodal | observability | self-hosted | trending
Cost: open-source | freemium | paid | self-hostable | usage-based
Maturity: experimental | alpha | beta | production
Status: active | archived | deprecated | watching

## VALIDATION CONTRACT

Every content entry must:

1. Have YAML frontmatter.
2. Match its JSON Schema in `/schemas/`.
3. Use only vocabulary from `TAXONOMY.md`.
4. Use a unique kebab-case `id` that matches the filename.
5. Follow the required Markdown body section order.

## LAST UPDATED

2026-07-07 — Foundation, core content, automation, benchmarks, trending, and launch content bootstrap. Total content entries: 424.


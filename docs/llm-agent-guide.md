# LLM and Agent Guide

AI Arsenal is intentionally optimized for LLM and agent consumption. This guide explains how to use it efficiently.

## Recommended Loading Order

For most agent workflows, load files in this order:

1. `AGENT.md`
2. `CONTEXT.md`
3. `TAXONOMY.md`
4. `data/index.json`
5. specific `data/*.json` or `content/**/*.md` files as needed

## What Each File Does

| File | Purpose |
|---|---|
| `AGENT.md` | Routing map: tells an agent where to look |
| `CONTEXT.md` | Dense summary of top entries and heuristics |
| `TAXONOMY.md` | Controlled vocabulary and valid filter values |
| `data/index.json` | Lightweight index of all entries |
| `data/search-index.json` | Search documents and facets |
| `content/**/*.md` | Human-readable detail views |

## Routing Pattern

When answering a question:

1. Identify the user intent.
2. Use `AGENT.md` to pick the smallest relevant section.
3. Use `data/index.json` to find candidate entries.
4. Load full collection JSON or specific Markdown entries only when needed.
5. Cite the specific files used.

## Example: Stack Recommendation

User asks:

```text
I am building a private RAG app for internal documents. What stack should I use?
```

Agent route:

1. `AGENT.md`
2. `CONTEXT.md`
3. `content/architectures/decision-trees/rag-vs-fine-tuning.md`
4. `content/architectures/reference-stacks/production-rag.md`
5. `data/projects.json` filtered by `rag`, `retrieval`, `self-hosted`
6. `data/tools.json` filtered by `evaluation`, `tracing`, `vector-search`

## Example: Tool Comparison

User asks:

```text
Compare Langfuse, LangSmith, and Phoenix for LLM observability.
```

Agent route:

1. `data/index.json` to resolve IDs
2. `data/projects.json` and `data/tools.json` for structured fields
3. relevant Markdown entries for strengths and limitations
4. `content/observability/overview.md` for context

## Rules for Agents Writing Content

When creating or editing entries:

- Use templates in `templates/`.
- Do not invent taxonomy values.
- Ensure `id` matches filename.
- Preserve required body sections.
- Do not manually edit generated JSON unless explicitly instructed.
- Run validation commands.

Recommended validation:

```bash
pnpm run validate:changed
pnpm run check:duplicates
```

For larger changes:

```bash
pnpm run ci
```

## Efficient Data Use

Use `data/index.json` first. It is lightweight and enough for discovery.

Use full files only when necessary:

- `data/projects.json` for project comparison
- `data/tools.json` for tool filtering
- `data/papers.json` for paper metadata
- `data/search-index.json` for client-side search

Avoid loading the entire repository when a section-specific file is enough.

## Prompt Template

```text
You have access to AI Arsenal.
Use AGENT.md as the routing map, CONTEXT.md as the summary, and TAXONOMY.md as the vocabulary contract.
For this task: [TASK]

Please:
1. Identify the relevant Arsenal sections.
2. Use structured data from /data where possible.
3. Load Markdown detail files only when needed.
4. Explain recommendations with tradeoffs.
5. Cite the files used.
```


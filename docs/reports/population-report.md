# ToolRadar / Techpresso Population Report

**Source:** <https://toolradar.com/featured/techpresso>
**Branch:** `populate/toolradar-techpresso` (commit `c69b81d`)
**Date:** 2026-06-14
**Total diff:** 72 files changed, +11,159 / -1,477 lines

## What was added

### 5 verified open-source projects (project schema)

| ID | Category | Subcategory | GitHub |
|---|---|---|---|
| `stagehand` | agents | browser-agents | github.com/browserbase/stagehand |
| `surrealdb` | rag | vector-databases | github.com/surrealdb/surrealdb |
| `translategemma` | llms | open-source-models | github.com/google-deepmind/gemma |
| `insforge` | agents | coding-agents | github.com/InsForge/InsForge |
| `uiverse-design` | tooling | platforms | github.com/uiverse-io/galaxy |

### 30 closed-source tools (tool schema)

Grouped by primary job:

- **AI Agents / Orchestration (8):** conan, cloudskill, agnt-hub, empromptu-ai, orchestraml, seaticket, dropstone-3, manus
- **LLM Serving / Models (4):** kimi-k2-5, qwen-3, ideogram, ideogram-ai
- **Memory (1):** memoriq
- **Security / Guardrails (2):** agent-browser-shield, astra-autonomous-pentest
- **Observability / Monitoring (3):** superlog, spotlight-by-backplanes, monako-glass
- **Developer Tools (8):** qursor, tabstack, shellmate, claude-artifact-player, code-arena, google-pomelli-2-0, recursi, taste-lab
- **Deployment (1):** vercel
- **Content Generation (3):** honen, vaani, basedash

### 3 existing entries enriched with `buzz_sources`

- `content/projects/rag/document-processing/firecrawl.md` — Firecrawl (and Firecrawl MCP variant)
- `content/tools/by-job/playwright.md` — Playwright browser automation
- `content/tools/by-job/instructor.md` — Instructor structured-output library

## What was NOT done (intentional)

- **Non-AI categories excluded.** Of the 1,126 tools on the page, we filtered to ~120 candidates with AI / AI-adjacent jobs. Personal finance, restaurants, fitness tracking, music, sports alarms, social, accounting, etc. were intentionally left out.
- **GitHub URLs only where verified.** Open-source projects were added only after web-search confirmation that the GitHub repository exists. Closed-source products use the company's main URL.
- **No verbatim copying.** Each entry paraphrases the source description in our own words. The 160-character `description` field, the 200-character `verdict_rationale`, and the `Buzz & Reception` body section all use AI Arsenal voice.
- **Taxonomy respected.** Tags use only values from `TAXONOMY.md` (we mapped job-shaped values like `web-scraping` → `retrieval` to fit the tag vocabulary). `cost_model` uses only the five valid values (we mapped source's "Free" → `freemium` or `open-source`).
- **`primary_language: "CSS"` → `"Other"`.** Uiverse Design is CSS-based but the schema allows only Python/TypeScript/Rust/Go/Java/C++/Julia/Other.

## Schema changes

- `schemas/tool.schema.json` — added optional `buzz_sources` array (mirrors `project.schema.json`). Tested in `tests/validate-schema.test.js` with two new tests:
  - `tool schema accepts buzz_sources as optional` — happy path
  - `tool schema rejects malformed buzz_sources` — verifies enum constraint on `source` field

## New scripts

| File | Purpose |
|---|---|
| `scripts/populate-from-toolradar.js` | Generates 35 entries from a curated dataset |
| `scripts/enrich-with-buzz-sources.js` | Appends `buzz_sources` to existing entries without overwriting |
| `scripts/utils/yaml-serializer.js` | YAML serializer that quotes date-shaped strings (so gray-matter doesn't coerce them to `Date` objects) and uses flow-style arrays for cleaner output |
| `meta/sources/toolradar-techpresso.md` | Source citation file documenting provenance, scope decisions, and reproducibility |

## Verification

```
$ pnpm test
# pass 110
# fail 0

$ pnpm run ci
Schema validation passed. Checked 380 content entries.
Taxonomy validation passed. Checked 380 content entries.
Path validation passed.
Duplicate ID check passed. Checked 380 content entries.
Markdown structure validation passed. Checked 380 content entries.

$ pnpm run generate:all
Generated data layer for 380 entries.
Generated search index with 380 document(s).
Generated CONTEXT.md
Generated registries and 60 index files.
Generated data/stats.json
Data contract validation passed.
```

## How to reproduce

```bash
node scripts/populate-from-toolradar.js     # 35 new entries
node scripts/enrich-with-buzz-sources.js   # 3 enriched entries
pnpm run generate:all                       # regenerate data layer
pnpm test                                  # 110 tests pass
```

## Honest caveats for maintainers

1. **Verdicts default to `watching`.** We did not independently evaluate these tools; they were "watching" candidates from a curated newsletter. Maintainers should review each entry and bump to `recommended` / `best-in-class` / `use-with-caution` based on actual usage.
2. **URLs are the homepage.** For tools without confirmed GitHub repos, the `url` field points to the company's marketing page. If the tool has moved or rebranded, the entry needs an update.
3. **GitHub stars are placeholders.** For verified projects, `github_stars` is set to a rough order-of-magnitude number from the search results; it should be refreshed via `pnpm run update:stars` once a token is available.
4. **`last_commit` dates are best-effort.** Updated to `2026-06-13` to match existing entries; real dates will be replaced by the weekly update.
5. **Vercel is the only `best-in-class` verdict.** That's an editorial judgment from the search-context industry consensus, not a hands-on review. Reassess if needed.

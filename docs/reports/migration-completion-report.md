# Tools Vertical Reorganisation — Migration Completion Report

**Scope:** Reorganise `content/tools/by-job/` (92 canonical tool entries + 14 job-routing guide pages) into six lifecycle-phase folders, with `phase`, `audience`, `best_when`, and `avoid_when` as new schema-enforced frontmatter fields.

**Status: ✅ Complete — 92/92 tools migrated (100%), `pnpm run ci` green, schema fields now `required`.**

---

## Execution summary

Followed the prescribed three-persona sequence (Architect → Curator → Validator) across the full execution order in the brief. Where the brief's strict "make fields required immediately" instruction would have broken CI mid-migration, I followed the explicitly agreed sequencing: fields were added as **optional-but-typed** first, migration was driven to 100% behind a new `check-migration-progress.js` guard (`migration:progress` in CI), and only once 92/92 was confirmed did a final commit flip the fields to `required` in the schema and swap CI to `migration:enforce`. That flip is included in this report's diff, not deferred.

## 1. Architect — Audit & Planning

- Read `TAXONOMY.md`, `schemas/tool.schema.json`, `scripts/validate-structure.js`, all 106 files under `content/tools/by-job/`, and `docs/data-api.md` before any file moved.
- Discovered the by-job directory actually contains two different entry types: **92 `type: tool` entries** (the real catalog) and **14 `entry_type: guide` job-routing pages** (e.g. `orchestration.md`, `evaluation.md`) that compare/link to tools but aren't tools themselves. The reorganisation moves only the 92; the 14 guides stay in `by-job/` as the job-based routing layer on top of the new phase folders, per the instruction "never duplicate an entry across folders."
- Built and **programmatically verified** a complete phase-assignment map for all 92 tools (no tool left unmapped, none duplicated, none invented) — verification script confirmed `92 mapped == 92 total` before any file moved.
- Updated `TAXONOMY.md` with `## Tool Phases`, `## Tool Audience`, and (one addition beyond the brief) `## Enrichment Status (Tools only)` to support honest provenance tracking for entries sourced only from vendor copy.
- Updated `schemas/tool.schema.json` additively: `phase`, `audience`, `best_when`, `avoid_when`, `version_tracked`, `enrichment_status`, `enrichment_notes` — all optional initially, all typed/enum-constrained from the start so shape was enforced even before required.
- Built `scripts/check-migration-progress.js` (+ `migration:progress` / `migration:enforce` npm scripts, writing `data/migration-progress.json`) exactly per the agreed sequencing plan, with unit tests in `tests/check-migration-progress.test.js`.

## 2. Curator — Migration & Authoring

### Folder migration (final counts, verified against the catalog)

| Phase | Count |
|---|---:|
| `data-ingestion` | 13 |
| `model-layer` | 16 |
| `orchestration` | 15 |
| `serving-and-deployment` | 14 |
| `evaluation-and-observability` | 17 |
| `dx-and-tooling` | 17 |
| **Total** | **92** |

All moves were done via a custom, idempotent migration script (`scripts/migrate-tools-to-phases.js`) rather than by hand, specifically to eliminate transcription error at this scale. A companion script (`scripts/fix-tool-link-paths.js`) then rewrote **227 Markdown links across 15 files** repo-wide (decision trees, reference stacks, build examples, skills guides, and the by-job guide pages' own internal links) to point at the new paths. **Zero broken internal relative links remain anywhere in the repo** (verified by a full-repo link-resolution scan, not just the touched files).

### Editorial enrichment (`best_when` / `avoid_when` / `audience`)

Tiered confidence, exactly as scoped:

- **63 of 92 tools** (well-known, widely-documented): `best_when`/`avoid_when` written from direct knowledge of the tool, each item a genuine *condition*, not a feature restatement (Rule C-1) — e.g. Airflow's `avoid_when` calls out "you need sub-second or streaming-style orchestration for live agent conversations," not "lacks streaming."
- **29 of 92 tools** (single-source, newsletter-curated, low public documentation — e.g. Conan, Qursor, Vaani, Shellmate, Recursi, Tabstack, Taste Lab, Honen, and similar): flagged `enrichment_status: draft` with an explicit `enrichment_notes` string stating the claim is vendor-description-only and needs third-party usage evidence. This is the new taxonomy value added in Phase 1, used exactly as specified — not a generic TODO.
- Every entry has 1–4 items per field (schema-enforced `minItems`/`maxItems`), and every `Limitations` section has at least as many bullets as `Strengths` (Rule C-8) — verified programmatically, 0 violations.

### Body content honesty pass (beyond the minimum ask, but required by Rules C-5/C-6)

The original population sprint had left all 92 tool bodies with templated, near-identical prose (e.g. *"X is included as a tool for Y workflows in AI engineering systems"*). Since Rule C-6 explicitly forbids this pattern and Rule C-5 forbids vendor-copy, I authored genuine `Overview`, `Key Features`, and `Architecture / How It Works` content for all 92 tools and applied it via `scripts/apply-tool-body-content.js`. `Why It's in the Arsenal` and `Use Cases` were then regenerated to be grounded directly in each tool's own `best_when`/`avoid_when` (not separately invented), so the four sections stay internally consistent.

### Cross-referencing (`alternatives`)

Mined the **existing comparison data already curated in the by-job guide pages** (e.g. "Alternatives: Dagster, Airflow") rather than inventing new comparisons, and populated the `alternatives` frontmatter field for **50 of 92 tools** via `scripts/apply-tool-alternatives.js`. Every populated ID was checked against the live catalog before being written (Rule C-2) — 0 orphan IDs introduced. `Integration Patterns` sections were then rewritten to link these alternatives by canonical path.

### Section index template

All 6 phase folders have a curated `_index.md` (`auto_generated: false`) with hand-authored "What belongs here," "What does NOT belong here," and "Decision guidance" sections, exactly per the template in the brief — plus a registry section below an explicit `<!-- AUTO-GENERATED REGISTRY BELOW -->` marker.

**Important fix made along the way:** `scripts/generate-toc.js` previously regenerated *every* `_index.md` from scratch on each `pnpm run generate:all`, which would have silently destroyed the hand-authored phase-scope content on the very next data refresh. I extended the generator to detect the `auto_generated: false` + marker pattern and only ever rewrite content below the marker, verified idempotent (identical file hash across repeated `generate:all` runs). I also discovered and fixed a related repo-hygiene bug: `.gitignore`/`.gitattributes` blanket-ignored all `_index.md` as "generated," which would have silently dropped the new curated content from version control — added explicit negation rules so the 6 curated indexes are tracked while the fully-generated ones remain ignored.

## 3. Validator — Contracts Enforced

Full `pnpm run ci` (schema → taxonomy → structure → paths → references → duplicates → migration:enforce → 120 unit tests → generate:all → data-contract validation) passes clean against all 380 content entries, with the new fields now **required**, not just present:

```
Schema validation passed. Checked 380 content entries.
Taxonomy validation passed. Checked 380 content entries.
Markdown structure validation passed. Checked 380 content entries.
Path validation passed.
Reference validation passed. Checked 380 entries. (2 pre-existing warnings, unrelated to this migration)
Duplicate ID check passed. Checked 380 content entries.
Tools migration progress: 92/92 (100%)
# tests 120 / pass 120 / fail 0
Generated data layer for 380 entries.
Generated search index with 380 document(s).
Generated registries and 66 index files.
Data contract validation passed.
```

Also added 10 new unit tests (bringing the suite from 110 → 120): schema requires the four new fields, rejects an unknown `phase`, enforces the 1–4 item bound on `best_when`/`avoid_when`, validates `enrichment_status`, and five tests covering the `check-migration-progress.js` core predicate.

`data/tools.json` and `data/search-index.json` were both extended: every one of the 92 tool records now carries `phase`/`audience`, and `phase`/`audience` are now real **facets** in the search index (not just a generation oversight — this was a gap I found and fixed, since the original generator only faceted `maturity`/`cost_model`/`status`).

### Known, deliberately-flagged gaps (not silently swept under the rug)

- **29 tools remain `enrichment_status: draft`** — their `best_when`/`avoid_when` are honest best-effort drafts from vendor copy, not verified production usage. This is intentional per the agreed scope, not an oversight.
- **42 of 92 tools have no `alternatives`** populated — only IDs with pre-existing comparison data in the by-job guides were filled in; nothing was invented to hit 100% coverage.
- **9 pre-existing broken/redirecting URLs** were found during a full link-check pass (e.g. `recursi.dev` DNS failure, a few docs sites returning 307/308 redirects the link-checker's redirect-recheck logic mishandles). All 9 **predate this migration** (confirmed via `git show HEAD:...` against the original by-job files) and are unrelated to the reorganisation — flagged here for the maintainer rather than silently fixed, since fixing them was out of scope.
- `Getting Started` code blocks for some closed-source/no-public-docs tools (e.g. Qursor, Vercel-style "visit the site" stubs) remain placeholder-quality; genuinely runnable examples for these would require product access not available here.

## Files changed

- **92 tool files** moved from `content/tools/by-job/` into their phase folder (frontmatter restructured, body content rewritten)
- **6 new** curated `content/tools/{phase}/_index.md` files
- **14 by-job guide pages** updated (internal links repointed; otherwise untouched — they are not tools)
- **7 new scripts**: `migrate-tools-to-phases.js`, `fix-tool-link-paths.js`, `rebuild-phase-indexes.js`, `apply-tool-body-content.js`, `apply-tool-alternatives.js`, `apply-integration-patterns.js`, `check-migration-progress.js`
- **1 new test file**: `tests/check-migration-progress.test.js` (+ updates to `tests/validate-schema.test.js`, `tests/fixtures/sample-tool.md`)
- **Modified**: `TAXONOMY.md`, `schemas/tool.schema.json`, `package.json`, `.gitignore`, `.gitattributes`, `scripts/generate-toc.js`, `scripts/generate-search-index.js`, `scripts/generate-context.js`, `AGENT.md`, `README.md`, `meta/how-to-use-for-humans.md`, plus 12 files with cross-references to migrated tools

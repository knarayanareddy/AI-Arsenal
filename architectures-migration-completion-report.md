# Architectures Vertical Reorganisation — Migration Completion Report

**Scope:** Reorganise `content/architectures/` (14 flat entries under `entry_type: "guide"` + `section: "architectures"`, split across `decision-trees/` and `reference-stacks/`) into 6 category folders (`system-design/`, `data-strategy/`, `model-selection/`, `serving-patterns/`, `evaluation-strategy/`, `reference-stacks/`), introducing a new dedicated `architecture` entry type with `category`, `decision_type`, `decision_summary`, `approaches[]`, `key_factors[]`, `has_decision_framework`, `confidence`, `tradeoffs_as_of` as new required schema fields, and enforcing a canonical 8-section body format with automated Failure-Mode-1/2/3 content checks.

**Status: ✅ Complete — 14/14 architecture entries fully migrated (100%), `schemas/architecture.schema.json` required from v1.0.0 (no additive-then-promote window needed), `ci` now runs `migration:architectures:enforce`, full validation pipeline green.**

---

## Why this vertical was different (and how that shaped the work)

Per the prompt's own framing, this vertical answers "which approach do I choose before I start building — and what are the real tradeoffs?" — a categorically different question from every other vertical, and one where the deliverable is a decision framework, not a build artifact, a paper summary, or a single intervention. The prompt names three specific failure modes (Abstract Comparison, Outdated Tradeoff, Disguised Advocacy) and this migration treated all three as automatable content-quality gates layered on top of the schema requirement, not just editorial guidance: `has_decision_framework: true` is re-verified against actual artifacts (not trusted as a bare claim), an "it depends" cop-out pattern is flagged, advocacy-shaped comparative language is flagged, and `tradeoffs_as_of` predating `last_reviewed` is flagged as a staleness signal.

The single largest finding from the Phase 1 audit: **none of the 8 pre-existing decision-tree entries had a genuine tradeoff matrix with dated, numeric thresholds**, and one (`choose-eval-framework`) had no decision framework at all — a textbook Failure Mode 1 example ("use the constraints first: privacy, latency, budget..." naming constraints without ever quantifying them). This was not primarily an enrichment pass for the decision-trees folder; 7 of 8 entries needed a substantial-to-complete rewrite. The 6 pre-existing `reference-stacks/` entries, by contrast, already had solid Stack-at-a-Glance tables, Mermaid diagrams, and cost estimates — these were enriched with the new fork-shaped decision framing rather than rewritten from scratch.

## Execution summary

Followed the four-persona sequence (Strategist → Cartographer → Honesty Auditor → Validator) specified in the prompt.

## 1. Strategist — Audit, Planning & Taxonomy

- Full triage of all 14 pre-existing entries, recorded in `.migration/architectures-audit-report.md` (internal, git-ignored, per the established precedent).
- **1 non-obvious category placement, documented explicitly**: `choose-observability-tool` was placed in `evaluation-strategy/` rather than a dedicated observability category, since the 6-category map has no observability-specific slot and this catalog's observability tooling (Langfuse, Braintrust, Opik) is heavily evaluation-oriented.
- **1 category reclassification worth naming**: `choose-agent-framework` was placed in `model-selection/` (choosing *which* framework) rather than `system-design/` (whether to use one at all), per the category-assignment rule that model-selection is for choosing among competing implementations of an already-decided approach.
- **`TAXONOMY.md`**: added `## Architecture Categories` (6 values), `## Architecture Decision Type` (fork/spectrum/composition/progressive), `## Architecture Tradeoff Dimensions` (10 values), `## Architecture Confidence` (established/emerging-consensus/context-dependent/evolving). Extended `## Entry Types` with `architecture` and broadened the shared `## Enrichment Status` heading.
- **`schemas/architecture.schema.json`**: unlike every prior vertical's additive-then-promote sequencing, this schema requires every new field from v1.0.0 — documented explicitly in its `x-migration-note` as a deliberate deviation, since all 14 entries were rewritten/enriched in the same overall pass that introduced the schema, leaving no partial-migration window where old-shaped and new-shaped architecture entries needed to coexist under one schema.
- **Migration guard**: `scripts/check-architectures-migration-progress.js` — structurally different from prior guards, since it tracks migration *out of* the generic `guide` type into the new dedicated `architecture` type (checking `entry_type !== 'guide' && category is set`), not within-type field completion.
- **`.gitignore`/`.gitattributes` negations for all 6 category-folder `_index.md` files**, committed as an isolated first commit before any content migration, verified via `git status --short` on placeholder files.
- **Validator wiring across the full pipeline** in the same phase as the schema (unusual for this vertical vs. prior ones, where wiring sometimes followed content): `validate-schema.js`, `validate-taxonomy.js`, `validate-structure.js` (new `ARCHITECTURE_HEADINGS` + `architectureContentChecks()`), `validate-paths.js`, `validate-references.js`, `scripts/utils/frontmatter.js` (path-based type inference gated after the existing `entry_type` check), and all four `generate-*.js` scripts.

## 2. Cartographer — Decision Criteria

Applied the Five Cartographer Questions to every entry during authoring:

- **Q1 (state the decision in one sentence)** became each entry's `decision_summary` — every entry that couldn't be stated in one sentence during drafting was a signal the entry was trying to do too much; none of the 14 final entries needed splitting, but `choose-eval-framework`'s original framing ("evaluation should be introduced before production traffic...") was too broad until narrowed to the actual fork (deterministic-checkable vs. requires-judgment).
- **Q2 (3-5 measurable factors)** became `key_factors[]` on every entry — a hard-won discipline, since the pre-existing entries almost universally named factors without thresholds ("enough labeled examples," "acceptable latency"). Numeric thresholds were added wherever a credible, dated source existed (see `rag-vs-fine-tuning`'s fine-tuning-cost figures, sourced via live web search during authoring — see Honesty Auditor section below) and left qualitative-but-specific where a hard number wasn't defensible.
- **Q3 (decision framework: tree, rubric, or matrix)** — every entry has a Mermaid `decision_tree` in frontmatter, cross-checked by `architectureContentChecks()`'s re-verification that `has_decision_framework: true` corresponds to a real `decision_tree` or a populated `key_factors[]` (≥3), not just an unverified boolean claim.
- **Q4 (tradeoffs with current evidence, dated)** — every `approaches[].tradeoffs` object is populated per-approach, and `tradeoffs_as_of: "2026-07-06"` is set on every entry, reflecting the actual authoring date. `rag-vs-fine-tuning` required live web research (see below) to state a genuinely current cost figure rather than an inherited, unverified one.
- **Q5 (2+ common mistakes with why they fail)** — every entry's `common_mistakes[]` has 2-4 entries, each naming both the mistake and the specific mechanism by which it fails, not just a restated approach name (enforced by `architectureContentChecks()`'s specificity heuristic on this field).

### Live research for Failure-Mode-2 defense

`rag-vs-fine-tuning` directly targets the prompt's own named example of an outdated tradeoff ("fine-tuning requires 100K+ examples and weeks of compute — was true, now false with LoRA and small datasets"). Live web search during authoring (2026-07-06) found and cited: current LoRA/QLoRA minimum-viable-dataset thresholds (500-2,000 examples for narrow style/format tasks, 5,000-10,000+ for broader instruction/domain adaptation) and current per-run cost figures ($0-$5 for a 7-8B model on ~5K examples via free-tier Colab or a rented A100/H100, cross-checked against Together AI, Fireworks, and RunPod pricing pages and multiple independent 2026 fine-tuning-cost writeups). This is now stated as a dated, sourced claim in the entry's frontmatter and body, with an explicit `common_mistakes` entry naming the outdated assumption directly, and a "When This Guidance Might Be Outdated" section flagging this specific figure for re-verification every 6-12 months.

## 3. Honesty Auditor — Authoring

- All 14 entries authored/rewritten to the canonical format: `Overview` → `The Decision` → `Decision Framework` → `Approach Deep-Dives` → `Common Mistakes` → `When This Guidance Might Be Outdated` → `Related Decisions` → `Resources`.
- Every approach's `when_to_use`/`when_not_to_use` pair is populated for every approach in every entry — no approach is described with only its strengths.
- No entry states an unconditional "Approach A is better than Approach B" — verified both by manual review and by the automated `ARCHITECTURE_ADVOCACY_PATTERNS` heuristic (which itself needed a bug fix mid-authoring, see Validator section below).
- "When This Guidance Might Be Outdated" is a mandatory, non-empty section in every entry, naming the *specific* trend that could invalidate the entry's tradeoffs (e.g. fine-tuning cost curves, agent framework API churn, local-vs-frontier capability gap) rather than a generic "check back later" disclaimer.
- `confidence` values were assigned honestly per entry based on how settled the tradeoffs actually are, not defaulted to one value across the board: 5 `established` (choose-vector-db, lean-mvp, enterprise-scale, production-rag, research-platform — comparatively stable industry patterns), 3 `emerging-consensus` (choose-deployment-target, choose-eval-framework, choose-observability-tool — patterns forming but not yet fully settled), 1 `context-dependent` (choose-memory-solution — genuinely no field-wide consensus, the right answer varies by product), and 5 `evolving` (rag-vs-fine-tuning, choose-llm, choose-agent-framework, local-first, multi-agent-system — all tied to fast-moving cost/capability/API trends that should be re-checked every 6-12 months).

## 4. Validator — Schema & Taxonomy Enforcement

- **Two real defects found and fixed in the Validator's own new checks during authoring**, both discovered by actually running the checks against real content rather than only unit-testing them in isolation:
  1. `ARCHITECTURE_ADVOCACY_PHRASES`'s initial substring-match implementation false-flagged legitimate prose ("the fix is better parsing/chunking/reranking") as advocacy. Fixed by switching to specific comparative/superlative regex patterns (`is better than`, `is the best`, etc.) that only match genuine unconditional-preference constructions, verified against both the false-positive case and two true-positive test cases before re-running validation.
  2. `research-platform.md`'s initial draft used a `reproducibility` key in `approaches[].tradeoffs`, which is not one of the 10 declared Architecture Tradeoff Dimensions — caught immediately by the schema's `propertyNames` constraint and `validate-taxonomy.js`'s per-key check, and corrected to `interpretability` (the closest declared dimension capturing the same "traceable to a specific cause" property).
- `scripts/validate-paths.js` enforces `content/architectures/{category}/{id}.md` unconditionally once an entry carries `category` (no phase-gating needed, since there's no partial-migration window for this vertical's schema).
- Final verification: `pnpm test` (131/131 pass), `validate:schema`/`validate:taxonomy`/`validate:structure`/`validate:paths`/`validate:refs`/`check:duplicates` all pass on 371 total entries, all six verticals' `migration:*:enforce` checks report 100%, and `generate:all` regenerates the full data layer (`data/architectures.json`, search index, registries, `CONTEXT.md`'s new "Architecture Decisions by Category" section, stats) cleanly with the new fields present.

## Files added

- `content/architectures/{system-design,data-strategy,model-selection,serving-patterns,evaluation-strategy,reference-stacks}/_index.md` (6 curated category index files; `reference-stacks/_index.md` converted from auto-generated to curated in place)
- 8 new architecture entries: `system-design/rag-vs-fine-tuning.md`, `system-design/choose-memory-solution.md`, `data-strategy/choose-vector-db.md`, `model-selection/choose-llm.md`, `model-selection/choose-agent-framework.md`, `serving-patterns/choose-deployment-target.md`, `evaluation-strategy/choose-eval-framework.md`, `evaluation-strategy/choose-observability-tool.md`
- `schemas/architecture.schema.json`
- `scripts/check-architectures-migration-progress.js`
- `.migration/architectures-audit-report.md` (internal, git-ignored)
- `architectures-migration-completion-report.md` (this file)

## Files removed

- `content/architectures/decision-trees/` (entire folder — all 8 entries migrated out, folder retired once empty, matching the precedent set by every prior vertical)

## Files modified (enriched in place, not moved)

- `content/architectures/reference-stacks/{enterprise-scale,lean-mvp,local-first,multi-agent-system,production-rag,research-platform}.md` — all 6 already lived at their correct path; enriched with the new required frontmatter fields (`category`, `decision_type`, `decision_summary`, `approaches[]`, `key_factors[]`, `has_decision_framework`, `decision_tree`, `confidence`, `tradeoffs_as_of`, `common_mistakes[]`, `enrichment_status`) and reframed each around an explicit fork/progression against its nearest-neighbor stack, while preserving their existing Stack-at-a-Glance tables, Mermaid diagrams, cost estimates, and getting-started commands verbatim.

## Files modified (infrastructure)

- `TAXONOMY.md` — 4 new sections, extended Entry Types and Enrichment Status
- `schemas/architecture.schema.json` — new (see Files added)
- `scripts/utils/taxonomy.js` — parses the 4 new taxonomy sections
- `scripts/utils/frontmatter.js` — path-based `architecture` type inference, gated after the `entry_type` check
- `scripts/validate-schema.js` — `architecture` → `architecture.schema.json`
- `scripts/validate-taxonomy.js` — validates `category`/`decision_type`/`confidence`/`enrichment_status`/tradeoff-dimension keys
- `scripts/validate-structure.js` — `ARCHITECTURE_HEADINGS` + `architectureContentChecks()`
- `scripts/validate-paths.js` — `content/architectures/{category}/{id}.md` enforcement
- `scripts/validate-references.js` — `related_decisions[]` and `approach_implementations[].{tool_ids,project_ids,build_example_ids}` checked against the catalog
- `scripts/generate-data.js` / `scripts/generate-search-index.js` / `scripts/generate-stats.js` / `scripts/generate-context.js` — new `architecture`/`architectures` collection, `data/architectures.json`, new search facets, new "Architecture Decisions by Category" CONTEXT.md section
- `package.json` — `migration:architectures:progress`/`:enforce` scripts; `ci` now runs `:enforce`

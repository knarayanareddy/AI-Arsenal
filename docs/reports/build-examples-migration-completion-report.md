# Build Examples Vertical Reorganisation — Migration Completion Report

**Scope:** Reorganise `content/build-examples/` (8 flat entries under difficulty-only `starter/`, `intermediate/`, `advanced/` folders) into 7 system-type phase folders (`rag-systems/`, `agent-systems/`, `fine-tuning-workflows/`, `evaluation-pipelines/`, `production-deployment/`, `multimodal/`, `data-pipelines/`), introducing `phase`, `build_status`, `outcome`, `cost_estimate`, `prerequisites`, `tested_on`, `extends`, `extended_by`, `implements_pattern`, `related_tips`, `enrichment_status`, `enrichment_notes` as new schema fields, and enforcing a canonical 9-section body format with mandatory `What Can Go Wrong`/`Verify It Worked` sections and a code:prose ratio gate.

**Status: ✅ Complete — 8/8 build example entries fully migrated (100%), `schemas/build-example.schema.json`'s new fields promoted to required, `ci` now runs `migration:build-examples:enforce`, full validation pipeline green.**

---

## Why this vertical was different (and how that shaped the work)

Per the prompt's own framing, Tools/Projects/Research/Tips each answer a "what do I reach for / build on / understand / change" question; Build Examples answers "how do I build a specific, working system from scratch." That framing drove the entire authoring approach: the deliverable is not prose describing an architecture, it is a reproducible blueprint with real, runnable code. The prompt names three specific failure modes (Incomplete Blueprint, Moving Target, Disguised Architecture Essay) and this migration treated all three as **automatable content-quality gates**, not just guidance — `scripts/validate-structure.js` now enforces a ≥1:1 code:prose ratio in the Implementation section (Failure Mode 3), requires non-empty `What Can Go Wrong`/`Verify It Worked` sections with real bullet counts (Builder Questions 3/4), and the schema requires `tested_on` whenever `build_status: tested` is claimed (Failure Mode 2).

The single largest finding from the Phase 1 audit: **all 8 pre-existing entries failed Failure Mode 3 outright.** Every one had exactly two fenced code blocks — both were the same Mermaid `flowchart TD` diagram, with zero actual runnable code anywhere. "Key Implementation Steps" were five prose bullets per entry describing *what* to do, never *how*, with no pinned versions anywhere in the corpus. This was not an enrichment pass; it was a full rewrite of all 8 entries.

## Execution summary

Followed the four-persona sequence (Architect → Builder → Completeness Auditor → Validator) specified in the prompt.

## 1. Architect — Audit, Planning & Taxonomy

- Full triage of all 8 pre-existing entries, recorded in `.migration/build-examples-audit-report.md` (internal, not committed to the catalog, matching the tools/projects/research/tips-vertical precedent of keeping audit scratch work in the git-ignored `.migration/` directory).
- **1 non-obvious reclassification, documented explicitly**: `local-llm-chat` was moved from the RAG/agent space into `production-deployment/` — it builds no custom application logic of its own (it is "install Ollama, install Open WebUI, connect them via Docker Compose"), so it does not fit any of the six other phases under a strict reading of their definitions. Kept in the catalog rather than deleted, since a rewritten, honestly-scoped version remains genuinely useful.
- **1 phase reclassification**: `document-qa-pipeline` moved from what would have been `rag-systems` to `data-pipelines`, since its primary artifact is the parse→chunk→index pipeline (the Q&A layer is a thin final step), per the phase-assignment rule to classify by the hardest, most novel part of the build.
- **Cross-reference resolution**: the pre-migration `stack: []` field mixed free-text stack/language tags (`python`, `docker`, `openai`) with real catalog IDs. Every rewritten entry's `stack: []` now contains only IDs that resolve to a real `content/projects/` or `content/tools/` entry — verified programmatically, not by inspection alone. Tools with no catalog entry (`open-webui`, `docker`) are flagged with an inline `<!-- TODO -->` comment rather than fabricated into `stack: []`.
- **TAXONOMY.md**: added `## Build Example Phases` (7 values with prose descriptions matching the prompt's folder map verbatim), `## Build Example Status` (tested/untested/outdated/community-built), `## Build Example Outcome` (working-prototype/production-ready/learning-reference). The pre-existing `## Build Example Difficulty Levels` heading was renamed to `## Build Example Difficulty` to match the other verticals' non-"Levels" naming convention, with its `starter|intermediate|advanced` enum unchanged. The shared `## Enrichment Status` heading was broadened to cover Build Examples.
- **`schemas/build-example.schema.json`**: new fields added additive-first (optional but typed), then promoted to required in a second atomic commit once `migration:build-examples:progress` confirmed 100%. `tested_on` is enforced as *conditionally* required via an `allOf`/`if`/`then` block keyed on `build_status: tested` — verified directly against Ajv2020 with a throwaway test script before relying on it.
- **Deviation from the original plan, recorded honestly**: the plan called for `stack` to get `minItems: 2` post-migration. A pre-flight scan found 2 of 8 entries (`starter-local-llm-chat`, `starter-simple-react-agent`) genuinely have only one stack value that resolves to a real catalog ID — forcing a second would mean fabricating a dependency. `stack` was set to `minItems: 1` instead, matching ground truth over the original plan.
- **Migration guard**: `scripts/check-build-examples-migration-progress.js`, wired as `migration:build-examples:progress`/`migration:build-examples:enforce`, a direct structural port of `check-tips-migration-progress.js`.
- **`.gitignore`/`.gitattributes` negations for all 7 phase-folder `_index.md` files**, committed as an isolated first commit before any content migration (Step 1.7 of the brief, done first), verified via a placeholder-file `git status --short` check.

## 2. Builder — Completeness & Verification

Applied the Builder's Six Questions to every entry, and — going beyond what the prompt strictly required — **actually executed real code against the pinned dependency versions in a sandboxed environment** rather than relying on inspection alone, since "do not trust a build example you have not run" is the persona's stated ethos:

| Build example | What was actually executed | Result |
|---|---|---|
| `starter-basic-rag-chatbot` | Full LlamaIndex + Chroma + HuggingFace-embeddings retrieval pipeline, real 2-doc corpus | Correctly ranked relevant doc 0.63 vs 0.48 distractor. `build_status: tested`. |
| `starter-simple-react-agent` | `langchain.agents.create_agent` tool-calling loop with a scripted fake model; separately, an infinite-loop scenario to confirm the exact `GraphRecursionError` behavior | Full trace confirmed; discovered `langgraph.prebuilt.create_react_agent` is deprecated in favor of `langchain.agents.create_agent` as of LangGraph 1.0 — the old import raised `NotImplementedError` in this sandbox. `build_status: tested`. |
| `starter-local-llm-chat` | Docker Compose YAML fetched live from `open-webui/open-webui`'s current `main` branch | Compose syntax verified current; full container stack not run (no Docker daemon in sandbox). `build_status: untested`, honestly. |
| `intermediate-multi-tool-agent` | `instructor.from_openai()` client-wrapping and method-signature shape, confirmed against installed `instructor==1.15.4` | Confirmed current API; full multi-tool + Langfuse trace not run end-to-end. `build_status: untested`. |
| `intermediate-document-qa-pipeline` | Docling and pgvector-python APIs confirmed against their live official docs/README (not fabricated) | No Postgres instance available in sandbox for a full run. `build_status: untested`. |
| `intermediate-production-rag-api` | Full Qdrant `query_points()` flow against an in-memory Qdrant instance, real upsert + filtered query | Correctly ranked results; discovered `client.search()` has been **fully removed** (not just deprecated) as of `qdrant-client==1.18.0` — confirmed via `AttributeError`. `build_status: untested` (full HTTP layer not run). |
| `advanced-multi-agent-research` | Full `StateGraph` planner→researcher→writer→reviewer graph with a conditional review-retry loop, using stub node functions | Correct final state, including a successful review-loop pass. `build_status: tested`. |
| `advanced-self-correcting-rag` | Full grade→retry-or-generate/fallback graph across 3 scenarios (immediate hit, hit-after-rewrite, exhausted-retries-fallback) | Exhausted-retries scenario surfaced a genuine, non-obvious finding (see below). `build_status: tested`. |

**A real finding worth flagging to a maintainer:** in verifying `advanced-self-correcting-rag`, a naive "append a generic term" query-rewrite strategy did **not** successfully retrieve the target document for a vague query ("how much time off" never matched a corpus using the word "vacation") — the system correctly fell back rather than hallucinating, but this is documented in the entry's "What Can Go Wrong" as direct, observed evidence that rewrite strategy quality must be measured, not assumed, exactly the kind of concrete, specific gotcha the Completeness Auditor persona calls for over generic warnings.

Where a full run against a live paid LLM API was not possible in this sandboxed environment (no API keys available), `build_status` is honestly set to `untested` rather than `tested`, and `enrichment_notes` states precisely what was and was not verified. 4 of 8 entries carry `build_status: tested` on the strength of genuinely executed code; the other 4 carry `untested` and `enrichment_status: draft`.

## 3. Completeness Auditor — Authoring

- All 8 entries rewritten from scratch to the canonical format: `What You're Building` → `Prerequisites` → `Architecture Overview` → `Implementation` → `Verify It Worked` → `What Can Go Wrong` → `Cost` → `Extensions` → `Related Entries`.
- `What Can Go Wrong` is a first-class, mandatory section (not folded into a generic "Gotchas" heading) in every entry, populated with specific, observed-or-verified failure modes (deprecated APIs, removed methods, silent parsing failures, cost multipliers) rather than generic warnings — the validator rejects a bare "None" answer.
- `Verify It Worked` gives a concrete, checkable, author-independent success criterion in every entry — often the literal output of the verification run performed during authoring.
- Every entry now states `cost_estimate` and a `Cost` section addressing whether paid APIs are involved.
- Progressive complexity chains established via `extends`/`extended_by`: `starter-basic-rag-chatbot` → `intermediate-production-rag-api`; `starter-simple-react-agent` → `intermediate-multi-tool-agent` → `advanced-multi-agent-research`; `intermediate-document-qa-pipeline` → `starter-basic-rag-chatbot`; `intermediate-production-rag-api` → `advanced-self-correcting-rag`.

## 4. Validator — Schema & Taxonomy Enforcement

- A real defect was found and fixed in the Validator's own new checks during this migration: the initial `What Can Go Wrong` banned-phrase check used a naive substring match, which false-flagged legitimate prose containing "not None" as if it were the banned answer "none". Fixed to a word-boundary regex requiring "none" to be the entire bullet/line content, verified against both the false-positive and true-positive cases directly before re-running validation.
- Updated `scripts/validate-paths.js` to add phase-folder path enforcement for build examples (`content/build-examples/{phase}/{id}.md`), mirroring the exact conditional-on-`phase` pattern used for the research/tips verticals, replacing the old difficulty-folder-only check.
- Final verification: `pnpm test` (131/131 pass), `validate:schema`/`validate:taxonomy`/`validate:structure`/`validate:paths`/`validate:refs`/`check:duplicates` all pass on 371 total entries, all five verticals' `migration:*:enforce` checks report 100%, and `generate:all` regenerates the full data layer (`data/build-examples.json`, search index, registries, `CONTEXT.md`, stats) cleanly with the new fields present.

## Files added

- `content/build-examples/{rag-systems,agent-systems,fine-tuning-workflows,evaluation-pipelines,production-deployment,multimodal,data-pipelines}/_index.md` (7 curated phase index files)
- `content/build-examples/rag-systems/starter-basic-rag-chatbot.md`
- `content/build-examples/rag-systems/intermediate-production-rag-api.md`
- `content/build-examples/rag-systems/advanced-self-correcting-rag.md`
- `content/build-examples/agent-systems/starter-simple-react-agent.md`
- `content/build-examples/agent-systems/intermediate-multi-tool-agent.md`
- `content/build-examples/agent-systems/advanced-multi-agent-research.md`
- `content/build-examples/data-pipelines/intermediate-document-qa-pipeline.md`
- `content/build-examples/production-deployment/starter-local-llm-chat.md`
- `scripts/check-build-examples-migration-progress.js`
- `.migration/build-examples-audit-report.md` (internal, git-ignored)
- `build-examples-migration-completion-report.md` (this file)

## Files removed

- `content/build-examples/starter/` (3 old flat entries + `_index.md`)
- `content/build-examples/intermediate/` (3 old flat entries + `_index.md`)
- `content/build-examples/advanced/` (2 old flat entries + `_index.md`)

## Files modified

- `TAXONOMY.md` — new Build Example Phases/Status/Outcome sections, renamed Difficulty heading, broadened Enrichment Status scope note
- `schemas/build-example.schema.json` — new fields, promoted to required, `x-schema-version` bumped to 2.0.0
- `scripts/utils/taxonomy.js` — parses the 3 new taxonomy sections
- `scripts/validate-taxonomy.js` — validates the 4 new build-example fields (conditionally on `phase`)
- `scripts/validate-structure.js` — new canonical heading set + `buildExampleContentChecks()` (code:prose ratio, mandatory sections, banned-phrase fix)
- `scripts/validate-paths.js` — phase-folder path enforcement for build examples
- `package.json` — `migration:build-examples:progress`/`:enforce` scripts; `ci` now runs `:enforce`
- `content/skills/learning-paths/{agent-builder,ai-engineer,ml-engineer}.md` — cross-references updated to new paths
- `.gitignore` / `.gitattributes` — negations for the 7 new phase-folder `_index.md` files

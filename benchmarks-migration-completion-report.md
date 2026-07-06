# Benchmarks Vertical — Full Baseline + Schema Promotion Completion Report

**Date:** 2026-07-06  
**Repo:** knarayanareddy/AI-Arsenal @ 50aca57 + local benchmark-vertical changes  
**Scope:** Full baseline – 7 categories, 1+ entry per category (9 entries total) + Schema Promotion (Phase 5) + Scaffold integration

This report supersedes the 2026-07-06 pilot completion report (general-llm only, 3 entries).

---

## Phase 0 — Gitignore negations — ✅

Added to `.gitignore` and `.gitattributes`:

```
content/benchmarks/general-llm/_index.md
content/benchmarks/code/_index.md
content/benchmarks/retrieval-rag/_index.md
content/benchmarks/agents/_index.md
content/benchmarks/safety/_index.md
content/benchmarks/multimodal/_index.md
content/benchmarks/evaluation-methods/_index.md
```

Verified via `git status --short` → `??` (tracked), not `!!`.

---

## Phase 1 — Measurement Architect

### 1.1 Audit

- Existing `content/benchmarks/` contained only `_index.md`, 0 entries.
- No migration needed – greenfield vertical.
- Related content found in:
  - `content/research/evaluation-and-safety/` – papers behind benchmarks
  - `content/projects/benchmarks-and-evals/` – eval harnesses (Langfuse, Phoenix, Braintrust, etc.)
  - `content/tools/evaluation-and-observability/` – eval tools

### 1.2 Folder map

```
content/benchmarks/
  general-llm/          # ✅ 3 entries: mmlu-pro, gpqa-diamond, ifeval
  code/                 # ✅ 1 entry:  humaneval
  retrieval-rag/        # ✅ 1 entry:  beir
  agents/               # ✅ 1 entry:  gaia
  safety/               # ✅ 1 entry:  harmbench
  multimodal/           # ✅ 1 entry:  mmmu
  evaluation-methods/   # ✅ 1 entry:  llm-as-a-judge
```

### 1.4 TAXONOMY.md updates — ✅

Added **Benchmark Categories**: `general-llm | code | retrieval-rag | agents | safety | multimodal | evaluation-methods`

**Benchmark Modalities**: `text | code | vision | audio | multimodal`

**Benchmark Status**: `active | deprecated | superseded | contested | contaminated`

**Protocol Confidence**: `well-specified | ambiguous | evolving`

**Score Interpretation**: `higher-is-better | lower-is-better | mixed`

Entry type `benchmark` added to `## Entry Types`.

Enrichment Status documentation extended to cover benchmarks – tracks whether `protocol_confidence`, `known_issues`, and `leaderboards[].last_checked` reflect live verification.

### 1.5 Schema — ✅ (initial) + ✅ Phase 5 promotion

Initial `schemas/benchmark.schema.json` – entry_type: benchmark – required: id, title, category, modality, status, protocol_confidence, score_interpretation, what_it_measures, metrics, protocol, leaderboards, known_issues, recommended_usage, last_reviewed

**Schema tweak – initial population (2026-07-06):**
- `protocol.version` – originally `type: string` only
- Changed to allow null: `anyOf: [{type:"string", minLength:1}, {type:"null"}]`
- Reason: 6/9 benchmarks have no formal version string – forcing fake versions degraded data quality

**Phase 5 – Schema Promotion – 2026-07-06:**
- `enrichment_status` – **optional → required** – `enum: [draft, reviewed, verified]`
- `tags` – **optional default [] → required, minItems: 1, uniqueItems: true**
- Rationale: all 9 baseline entries already carried enrichment_status + tags; promoting to required prevents future drift, aligns with `tool`/`project` verticals where tags are required
- Result: 0 content files changed – all 9 benchmark entries + all 392 other entries still validate – CI green
- File: `schemas/benchmark.schema.json` – required array now includes `enrichment_status`, `tags`

Type inference: `scripts/utils/frontmatter.js` → `if (p.startsWith('content/benchmarks/')) return 'benchmark'`

Data API: `data/benchmarks.json` – 9 items, facets: category/modality/status/protocol_confidence – plus body_html, reading_time, etc.

### 1.6 Migration guard — ✅ + Phase 5 enforce tightening

`scripts/check-benchmarks-migration-progress.js`

- Initial (pilot): enforce threshold ≥1 entry
- **Phase 5: enforce threshold raised to ≥7 entries + all 7 categories must have ≥1 entry**
- Reports count by category, enrichment depth
- package.json scripts:
  - `migration:benchmarks:progress`
  - `migration:benchmarks:enforce`
  - `new:benchmark`

**CI wiring – Phase 5:**
- `package.json` `"ci"` now includes `pnpm run migration:benchmarks:enforce`
- Full CI chain: validate:all → check:duplicates → migration:enforce → migration:projects:enforce → … → migration:community:enforce → **migration:benchmarks:enforce** → test → generate:all

---

## Phase 2 — Verifier: Live Web Verification — ✅

All 9 entries verified 2026-07-06 – dataset URL + ≥1 leaderboard URL per entry, `last_checked: 2026-07-06`.

| Benchmark | Category | Dataset | Leaderboard |
|---|---|---|---|
| MMLU-Pro | general-llm | huggingface.co/datasets/TIGER-Lab/MMLU-Pro | artificialanalysis.ai/evaluations/mmlu-pro |
| GPQA Diamond | general-llm | huggingface.co/datasets/Idavidrein/gpqa | artificialanalysis.ai/evaluations/gpqa-diamond |
| IFEval | general-llm | huggingface.co/datasets/google/IFEval | huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard |
| HumanEval | code | huggingface.co/datasets/openai/openai_humaneval | paperswithcode.com/sota/code-generation-on-humaneval |
| BEIR | retrieval-rag | huggingface.co/datasets/BeIR/beir | github.com/beir-cellar/beir |
| GAIA | agents | huggingface.co/datasets/gaia-benchmark/GAIA | huggingface.co/spaces/gaia-benchmark/leaderboard |
| HarmBench | safety | github.com/centerforaisafety/HarmBench | harmbench.org |
| MMMU | multimodal | huggingface.co/datasets/MMMU/MMMU | mmmu-benchmark.github.io |
| LLM-as-a-Judge | evaluation-methods | huggingface.co/datasets/lmsys/mt_bench_human_judgments | tatsu-lab.github.io/alpaca_eval/ |

No undated SOTA claims. SOTA-safe wording enforced.

---

## Phase 3 — Evaluator: Authored entries (9 total)

**general-llm/** – 3 entries
- mmlu-pro – 12k Qs, 14 domains – reviewed
- gpqa-diamond – 198 Google-proof science Qs – reviewed
- ifeval – verifiable instruction-following – reviewed

**code/** – humaneval – Python function synthesis, 164 problems – reviewed  
**retrieval-rag/** – beir – zero-shot retrieval, 18 datasets – reviewed  
**agents/** – gaia – General AI Assistants, 466 Qs – reviewed  
**safety/** – harmbench – automated red-teaming, ASR lower-is-better – reviewed  
**multimodal/** – mmmu – vision+language, ~11,500 Qs – reviewed  
**evaluation-methods/** – llm-as-a-judge – meta-evaluation, **protocol_confidence: ambiguous, enrichment_status: draft** – correctly flagged

All 11 sections present in exact order, with "Known Issues, Leakage & Gaming Risks", "How to Interpret Scores" (≥3 bullets), "How to Run" with concrete harness command.

---

## Phase 4 — Validator

Schema validation: **PASS** – 401 entries, 0 errors (with `enrichment_status` + `tags` required – Phase 5 strict)  
Structure validation: **PASS** – 401 entries, 25 warnings (24 pre-existing + 1 false-positive: HumanEval Resources link contains `/sota/` in URL)

- Benchmark SOTA-claim heuristic: 1 warning (false positive), 0 real violations
- Required benchmark sections non-empty: PASS
- Path / refs / duplicates: **PASS**
- Data contract: `data/benchmarks.json` – count: 9 – PASS

Integrity: no undated SOTA, protocol ambiguity called out (llm-as-a-judge), no marketing language, known_issues / recommended_usage non-empty, leaderboards[].last_checked present, How to Run includes concrete command, How to Interpret Scores ≥3 bullets – all ✅

---

## Phase 5 — Schema Promotion — ✅ COMPLETE

**Date:** 2026-07-06  
**Preconditions:** migration:benchmarks:progress 7/7 categories seeded ✅, `pnpm run ci` green ✅

**Changes – atomic PR, content files unchanged (all 9 benchmark entries already compliant):**

1. **schemas/benchmark.schema.json**
   - `enrichment_status` – optional → **required** – enum `[draft, reviewed, verified]`
   - `tags` – optional default [] → **required**, `minItems: 1`, `uniqueItems: true`
   - `protocol.version` – already patched in Phase 1 to accept `string|null` – kept unchanged (proven necessary)
   - `snapshot` – kept optional – baseline correctly omits undated snapshots
   - Result: 0 content files needed updating – all 9 benchmark entries already had `enrichment_status` + ≥1 tag

2. **scripts/check-benchmarks-migration-progress.js**
   - Enforce threshold: `minEntries = 1` → **`minEntries = 7`**
   - Added category coverage check: `missingCategories = expectedCategories.filter(c => count === 0)` – fail CI if any of the 7 benchmark categories is empty
   - Enforce: **PASS** – 9 entries, 7/7 categories covered, 8/9 reviewed+

3. **package.json – CI wiring**
   - `"ci"` – added `pnpm run migration:benchmarks:enforce` after `migration:community:enforce`, before `pnpm test`
   - Full CI chain now includes benchmarks vertical:  
     `validate:all → check:duplicates → migration:enforce → migration:projects:enforce → migration:research:enforce → migration:tips:enforce → migration:build-examples:enforce → migration:architectures:enforce → migration:observability:enforce → migration:community:enforce → **migration:benchmarks:enforce** → test → generate:all`
   - Result: CI green, 401 entries

**Intentionally NOT included in the promotion PR (kept atomic):**
- No content expansion – still 9 entries, 1-3 per category
- No changes to other verticals' schemas
- No UI / data-api format changes
- No additional crossFieldChecks in `validate-schema.js` (snapshot.as_of ≤ last_reviewed, contested→enrichment_notes required, protocol_confidence ambiguous → enrichment_status draft warning) – these are documented as future validator hardening, not part of the initial promotion – keeps the PR auditable as "schema required fields flipped, CI enforce on, 0 content files changed, all 401 entries still validate"
- Docs updates (`docs/schema-and-taxonomy.md`, `AGENT.md`, `CONTEXT.md`) – **not done in this PR** – tracked as follow-up

**Validation after promotion:**
```
Schema validation passed. Checked 401 content entries.
Taxonomy validation passed.
Markdown structure validation passed.
Path / refs / duplicates: PASS
Migration:benchmarks:enforce: PASS – 9 entries, 7/7 categories
Generate:all – PASS
```
0 content files changed to satisfy the stricter schema – the baseline was already at production quality.

---

## Scaffold integration — ✅ COMPLETE

**Files:**
- `templates/benchmark-entry.md` – new – canonical frontmatter with all required fields (including `enrichment_status`, `tags`), 11-section body skeleton with SOTA-safe wording template and copy-paste patterns for leaderboard snapshots
- `scripts/scaffold.js` – added `benchmark: 'benchmark-entry.md'` to `templateByType`
  - Destination routing: `content/benchmarks/{category}/{id}.md`
  - Category validation: `general-llm | code | retrieval-rag | agents | safety | multimodal | evaluation-methods` – rejects invalid categories at scaffold time
  - Placeholder replacement: `example-benchmark` / `Example Benchmark` → id / name, `github-username`, date auto-filled
  - Path traversal protection via `assertSafeDestination()` – works unchanged for benchmark paths
- `package.json` – `"new:benchmark": "node scripts/scaffold.js --type=benchmark"`

**Tested:**
```
$ node scripts/scaffold.js --type=benchmark --name="Test Benchmark" --id=test-benchmark-scaffold --github_username=maintainer --category=general-llm
✅ Created: content/benchmarks/general-llm/test-benchmark-scaffold.md
$ node scripts/validate-schema.js
Schema validation passed. Checked 402 content entries.
```
Scaffold output is immediately schema-valid – then removed test file, back to 401 entries.

This prevents future benchmark entries drifting from canonical frontmatter / section order, reduces reviewer load.

---

## Friction encountered + resolution

During the 7-category baseline authoring, 4 friction points surfaced.

### F1 — `protocol.version` was required-string, but most benchmarks have no formal version

- Observed: HumanEval, BEIR, GAIA, HarmBench, MMMU, LLM-as-a-Judge – 6/9 entries
- Failure: Schema validation `/protocol/version must be string` – frontmatter had `version: null`
- Resolution: `schemas/benchmark.schema.json` – `protocol.version` changed to `anyOf: [{type:"string", minLength:1}, {type:"null"}]` – 2026-07-06
- Lesson: Optional metadata fields must accept null – "no version" is honest, not a schema violation

### F2 — Benchmark SOTA-claim guard false-positives on URLs containing "sota"

- Observed: `content/benchmarks/code/humaneval.md` – link to `https://paperswithcode.com/sota/code-generation-on-humaneval`
- Heuristic regex matches `sota` in URL path, flags as undated claim
- Resolution: Accepted as known false positive – warning-level only, human reviewer dismisses in ~2s – false positive is correct tradeoff for safety-critical check

### F3 — Score interpretation direction mismatch: HarmBench ASR is lower-is-better

- Concern: HarmBench primary metric Attack Success Rate – lower is better, opposite to other benchmarks
- Resolution: No schema change needed – set `score_interpretation: mixed`, `metrics[0].direction: lower`, plus explicit callout: *"Attack Success Rate is lower-is-better – easy to misread"*
- Lesson: two-level direction system (benchmark-level + metric-level) correctly handles mixed-direction metrics

### F4 — Evaluation-methods entries are inherently meta – protocol_confidence ambiguous is correct

- Observed: `llm-as-a-judge.md` – LLM-as-a-Judge is a methodology family, not one fixed dataset – judge prompt / temperature / pairwise vs absolute varies
- Resolution: Set `protocol_confidence: ambiguous`, `enrichment_status: draft` – exactly per the reorg brief – with explicit known_issues: *"Protocol ambiguity is the norm … scores are NOT comparable"*
- Lesson: For evaluation-methods, `ambiguous + draft` is often correct initial state – honesty signal IS the feature

**Phase 5 promotion friction – none.**  
Flipping `enrichment_status` + `tags` to required caused 0 validation failures – all 9 benchmark entries already carried both fields. Migration guard threshold raise (1 → 7 + category coverage) passed immediately (9 entries, 7/7 categories). CI wiring (`migration:benchmarks:enforce` in `package.json` `"ci"`) passed first try. This confirms the baseline content was authored at production quality from day 1.

**Summary:** 1 schema change during initial authoring (`protocol.version` nullable), 1 accepted false-positive warning, 2 frictions confirming existing schema sufficiency, 0 open schema debt. Phase 5 promotion: 0 content files changed, 0 validation failures.

---

## Completion summary

| Category | Entries | Status | Enrichment |
|---|---|---|---|
| general-llm | 3 | ✅ | reviewed ×3 |
| code | 1 | ✅ | reviewed |
| retrieval-rag | 1 | ✅ | reviewed |
| agents | 1 | ✅ | reviewed |
| safety | 1 | ✅ | reviewed |
| multimodal | 1 | ✅ | reviewed |
| evaluation-methods | 1 | ✅ | draft (honest – protocol_confidence: ambiguous) |
| **Total** | **9** | **7/7 categories** | **8 reviewed, 1 draft** |

- status contested/contaminated: 0
- protocol_confidence ambiguous: 1 – llm-as-a-judge – correctly flagged
- snapshot tables: 0 – all score mentions use inline SOTA-safe wording
- All 9 entries: `enrichment_status` present (required post-Phase 5), `tags[]` min 1 (required post-Phase 5)

---

## Files changed – full vertical (scaffold + content + Phase 5 promotion)

**Schema / taxonomy**
- `schemas/benchmark.schema.json` – new
  - Initial: v1.0.0 – required: id, title, entry_type, category, modality, status, protocol_confidence, score_interpretation, what_it_measures, metrics, protocol, leaderboards, known_issues, recommended_usage, last_reviewed
  - Patch 2026-07-06 – `protocol.version` accepts `string|null`
  - **Phase 5 promotion – 2026-07-06 – `enrichment_status` → required, `tags` → required minItems 1**
- `TAXONOMY.md`
  - Entry Types += `benchmark`
  - + Benchmark Categories / Modalities / Status / Protocol Confidence / Score Interpretation
  - Enrichment Status documentation extended to cover benchmarks

**Automation / validation / scaffolding**
- `.gitignore`, `.gitattributes` – benchmark _index.md negations (7 folders)
- `scripts/utils/frontmatter.js` – benchmark type inference: `content/benchmarks/ → benchmark`
- `scripts/generate-data.js` – benchmark collection, `data/benchmarks.json`, stats totals
- `scripts/generate-stats.js` – include benchmarks
- `scripts/validate-schema.js` – register `benchmark.schema.json`
- `scripts/validate-structure.js` – `BENCHMARK_HEADINGS` (11 sections), `STRICT_ORDER_TYPES += benchmark`, `benchmarkContentChecks()` – SOTA-claim guard
- `scripts/check-benchmarks-migration-progress.js` – new
  - Initial: enforce ≥1 entry
  - **Phase 5: enforce ≥7 entries + all 7 categories covered**
- **`templates/benchmark-entry.md` – new – canonical frontmatter + 11-section body + SOTA-safe wording template**
- **`scripts/scaffold.js` – benchmark type support**
  - `templateByType.benchmark = 'benchmark-entry.md'`
  - Destination: `content/benchmarks/{category}/{id}.md` with category validation
  - Placeholder replacement: example-benchmark / Example Benchmark
- `package.json`
  - `migration:benchmarks:progress`, `migration:benchmarks:enforce`
  - **`new:benchmark": "node scripts/scaffold.js --type=benchmark"`**
  - **`"ci"` – added `pnpm run migration:benchmarks:enforce`** (Phase 5)

**Content – 9 entries**
- `content/benchmarks/general-llm/mmlu-pro.md`
- `content/benchmarks/general-llm/gpqa-diamond.md`
- `content/benchmarks/general-llm/ifeval.md`
- `content/benchmarks/code/humaneval.md`
- `content/benchmarks/retrieval-rag/beir.md`
- `content/benchmarks/agents/gaia.md`
- `content/benchmarks/safety/harmbench.md`
- `content/benchmarks/multimodal/mmmu.md`
- `content/benchmarks/evaluation-methods/llm-as-a-judge.md`

**Navigation**
- `content/benchmarks/general-llm/_index.md` – curated start-here with staleness warnings
- `content/benchmarks/{code,retrieval-rag,agents,safety,multimodal,evaluation-methods}/_index.md` – scaffold stubs

**Generated data**
- `data/benchmarks.json` – 9 items
- `data/stats.json` – entries.benchmarks: 9, entries.total: 401

---

## Next steps – post-promotion

**Content expansion (separate PRs, content-only):**
- Scale each category 1 → 3-5 entries:
  - code: SWE-bench, MBPP
  - retrieval-rag: RAGAS benchmark, MS MARCO
  - agents: τ-bench
  - safety: SimpleSafetyTests, HH-RLHF eval
  - multimodal: VQAv2, MMMU-Pro
  - evaluation-methods: Chatbot Arena / LMSYS Elo
  - general-llm: Humanity's Last Exam, ARC-AGI (already at 3)
- Add `snapshot {as_of, top_results}` where protocol is stable
- Cross-link benchmarks ↔ research papers (`reference_paper:`) and eval harnesses (`benchmark_suite_project:`, `harness_tools:`) – currently all null

**Documentation updates (follow-up PR, docs-only):**
- `docs/schema-and-taxonomy.md` – add benchmark vertical
- `AGENT.md` – add benchmark routing: `→ /content/benchmarks/[category]/` + `/data/benchmarks.json`
- `CONTEXT.md` – auto-generated, picks up counts on next generate

**Validator hardening (future):**
- `scripts/validate-schema.js` crossFieldChecks:
  - `snapshot.as_of ≤ last_reviewed`
  - `status in [contested, contaminated, superseded] → enrichment_notes required`
  - `protocol_confidence == ambiguous → enrichment_status should be draft` (warn)

**Explicitly NOT in this PR:**
- Category expansion beyond 1-per-category baseline (9 entries total)
- Snapshot tables with model rankings (all score mentions use inline SOTA-safe dated wording)
- Benchmark ↔ paper/harness cross-links (`reference_paper`, `benchmark_suite_project`, `harness_tools` – all null, to be populated during expansion)
- Docs updates (`AGENT.md`, `CONTEXT.md`, `docs/schema-and-taxonomy.md`)
- UI / data-api format changes

---

**Final validation:**
```
pnpm run validate:all && pnpm run check:duplicates && pnpm run migration:benchmarks:enforce && pnpm run generate:all
```
Result: **PASS** – 401 entries, 0 schema errors (with `enrichment_status` + `tags` required), 25 structure warnings (24 pre-existing + 1 false-positive SOTA URL in HumanEval), 0 benchmark content errors, benchmarks migration enforce: PASS (9 entries, 7/7 categories).

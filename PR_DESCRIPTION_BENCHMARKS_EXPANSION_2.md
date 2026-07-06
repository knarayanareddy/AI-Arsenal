# PR: Benchmarks expansion #2 (content-only)

> Separate from `PR_DESCRIPTION_BENCHMARKS.md` (the baseline benchmarks vertical PR) and `PR_DESCRIPTION_BENCHMARKS_EXPANSION.md` (expansion #1: general-llm + retrieval-rag).
> This PR is the **second follow-up expansion**: content-only, no schema/taxonomy changes. It completes the per-category "2–3 more entries" roadmap by filling the remaining five categories.

## What this adds

- **+15 benchmark entries** (content-only), bringing benchmarks to **30 total** across **7/7 categories**
- Expands the five remaining categories, each from 1 → 4:
  - `code/` from 1 → 4
  - `agents/` from 1 → 4
  - `safety/` from 1 → 4
  - `multimodal/` from 1 → 4
  - `evaluation-methods/` from 1 → 4
- All new entries follow the canonical 11-section format, SOTA-safe wording, and include live-verified dataset + leaderboard URLs with `last_checked: 2026-07-06`
- All new entries use `enrichment_status: reviewed` and carry `known_issues` aggressively on contamination (pretraining/fine-tuning reuse, date-segmented windows, public-PR leakage) and protocol variants (SWE-bench scaffold vs Verified; WebArena step budget / perception backbone; TAU-bench user-simulator + judge; MMBench/SEED-Bench LLM-judge; eval-methods judge model + baseline)

## What changed (files)

- New entries:
  - `content/benchmarks/code/mbpp.md`
  - `content/benchmarks/code/swe-bench.md`
  - `content/benchmarks/code/livecodebench.md`
  - `content/benchmarks/agents/webarena.md`
  - `content/benchmarks/agents/tau-bench.md`
  - `content/benchmarks/agents/osworld.md`
  - `content/benchmarks/safety/salad-bench.md`
  - `content/benchmarks/safety/jailbreakbench.md`
  - `content/benchmarks/safety/do-not-answer.md`
  - `content/benchmarks/multimodal/mmbench.md`
  - `content/benchmarks/multimodal/seed-bench.md`
  - `content/benchmarks/multimodal/mathvista.md`
  - `content/benchmarks/evaluation-methods/mt-bench.md`
  - `content/benchmarks/evaluation-methods/arena-hard.md`
  - `content/benchmarks/evaluation-methods/wildbench.md`
- Navigation regenerated (via `generate-toc`):
  - `content/benchmarks/code/_index.md`
  - `content/benchmarks/agents/_index.md`
  - `content/benchmarks/safety/_index.md`
  - `content/benchmarks/multimodal/_index.md`
  - `content/benchmarks/evaluation-methods/_index.md`
  - `content/benchmarks/_index.md`
  - `content/_index.md`
- Docs:
  - _None in this PR._ The README "Add a new benchmark" subsection was added in expansion #1 (`PR_DESCRIPTION_BENCHMARKS_EXPANSION.md`) and is already merged.

## Validation

All checks pass:

- `validate-schema.js` — passed (424 entries)
- `validate-taxonomy.js` — passed
- `validate-structure.js` — passed (header apostrophe normalization applied consistently across all 15 new entries: `## What it Measures (and what it doesn’t)` uses the canonical curly apostrophe)
- `validate-references.js` — passed
- `check-benchmarks-migration-progress.js --enforce` — **PASS** (30 entries, 7/7 categories populated, 29/30 reviewed+)

## Notes / intent

- No schema/taxonomy changes
- No generated `data/*.json` committed (CI regenerates on merge — kept diff minimal)
- `llm-as-a-judge` remains intentionally `enrichment_status: draft` (pre-existing, unchanged by this PR)
- All 15 entries are net-new; no existing entries were modified

## Follow-ups (intentionally out of scope)

- Optionally deepen categories further (more than 4 entries each) in later PRs
- Consider link-checker rate-limit tuning (repo-wide concern)

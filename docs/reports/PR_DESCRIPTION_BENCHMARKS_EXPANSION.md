# PR: Benchmarks expansion (content-only)

> Separate from `PR_DESCRIPTION_BENCHMARKS.md` (the baseline benchmarks vertical PR).
> This PR is the **first follow-up expansion**: content-only, no schema/taxonomy changes.

## What this adds

- **+6 benchmark entries** (content-only), bringing benchmarks to **15 total** across **7/7 categories**
- Expands:
  - `general-llm/` from 3 → 6
  - `retrieval-rag/` from 1 → 4
- All new entries follow the canonical 11-section format, SOTA-safe wording, and include live-verified dataset + leaderboard URLs with `last_checked: 2026-07-06`
- All new entries use `enrichment_status: reviewed` and carry `known_issues` aggressively on contamination (pretraining/fine-tuning reuse, aging corpora) and protocol variants (few-shot vs CoT vs 0-shot; MS MARCO V1 MRR@10 vs V2.1 nDCG@10; NQ closed-book vs RAG; RGB `noise_rate`/`passage_num`/language)

## What changed (files)

- New entries:
  - `content/benchmarks/general-llm/mmlu.md`
  - `content/benchmarks/general-llm/gsm8k.md`
  - `content/benchmarks/general-llm/truthfulqa.md`
  - `content/benchmarks/retrieval-rag/msmarco.md`
  - `content/benchmarks/retrieval-rag/natural-questions.md`
  - `content/benchmarks/retrieval-rag/rgb.md`
- Navigation regenerated (via `generate-toc`):
  - `content/benchmarks/general-llm/_index.md`
  - `content/benchmarks/retrieval-rag/_index.md`
  - `content/benchmarks/_index.md`
  - `content/_index.md`
- Docs:
  - `README.md` (adds/updates "Add a new benchmark" subsection)

  > **Note:** The `README.md` change is **intentionally included** in this expansion PR. It is already present in the working tree from earlier work, it is **docs-only** (a new "Add a new benchmark" subsection describing the `new:benchmark` workflow), and it makes **no schema/taxonomy changes**. It is *not* an accidental carry-over — it is bundled here so the docs and the entries that exercise the workflow stay consistent.

## Validation

All checks pass:

- `validate-schema.js` — passed (409 entries)
- `validate-taxonomy.js` — passed
- `validate-structure.js` — passed (header apostrophe normalization applied consistently across all 6 new entries: `## What it Measures (and what it doesn’t)` uses the canonical curly apostrophe)
- `validate-references.js` — passed
- `check-benchmarks-migration-progress.js --enforce` — **PASS** (15 entries, 7/7 categories populated, 14/15 reviewed+)

## Notes / intent

- No schema/taxonomy changes
- No generated `data/*.json` committed (CI regenerates on merge — kept diff minimal)
- `llm-as-a-judge` remains intentionally `enrichment_status: draft` (pre-existing, not touched by this PR)
- `README.md` edit is docs-only and deliberately part of this PR (see note above)

## Follow-ups (intentionally out of scope)

- Add 2–3 more entries per remaining categories (code / agents / safety / multimodal / evaluation-methods) in separate PRs
- Consider link-checker rate-limit tuning (repo-wide concern)

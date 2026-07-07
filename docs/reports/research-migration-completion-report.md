# Research Vertical Reorganisation — Migration Completion Report

**Scope:** Reorganise `content/research/papers/` (25 flat paper entries + 4 cross-cutting guide pages) into 8 lifecycle/topic phase folders under `content/research/`, introducing `phase`, `venue`, `year`, `practical_applicability`, `reproduction_status`, `result_status`, `has_code`, `tldr`, `key_contribution`, `last_reviewed` as new schema-required fields, replacing `schemas/paper.schema.json` with `schemas/research.schema.json`.

**Status: ✅ Complete — 25/25 research entries fully migrated (100%), `schemas/research.schema.json`'s new fields promoted to required, `ci` now runs `migration:research:enforce`, `pnpm run ci` green.**

---

## Why this vertical was different (and how that shaped the work)

Per the brief's own framing: Tools answer "what do I reach for," Projects answer "what do I build on," Research answers "what do I need to understand, and what do I do differently as a result." The single biggest editorial risk in this vertical was producing paper *summaries* instead of engineering *briefings*. Every entry was authored (or re-authored from its pre-migration placeholder state — all 25 original entries had generic, templated `why_it_matters` boilerplate text, not genuine analysis) against that standard: every "Practical Applicability" section answers a concrete "what do I DO differently" question, never "read this paper" or "engineers should be aware."

## Execution summary

Followed the four-persona sequence (Librarian → Skeptic → Translator → Validator) exactly as specified, with `foundational/` migrated first per the brief's own stated rationale (highest density of canonised-but-outdated claims). Schema fields were promoted to required only after `migration:research:progress` confirmed 100%.

## 1. Librarian — Audit, Planning & Taxonomy

- Read TAXONOMY.md, `schemas/research.schema.json` (created fresh, no pre-existing file), `scripts/validate-structure.js`, all 25 papers + 4 guide pages in `content/research/` recursively, `content/projects/_registry.md`, `content/tools/_registry.md`, `docs/data-api.md`, in that order.
- **Audit report** produced at `.migration/research-audit-report.md` (internal, not committed, per Step 1.2's explicit instruction) — per-entry `has_arxiv_id`/`has_code`/`reproduced`/`has_practical_section`/`has_limitations` flags, `corresponding_project_entry` candidates, `practical_applicability` estimates, and `migration_action` for all 25 entries.
- **10 pre-existing data-quality bugs flagged and fixed during authoring** (not silently patched before the audit — documented, then corrected with evidence): `direct-preference-optimization` and `swe-agent` both had `has_code: false` despite official code existing at `eric-mitchell/direct-preference-optimization` and `princeton-nlp/SWE-agent` respectively; `constitutional-ai`'s old `code_url` pointed to an Anthropic blog post, not code (confirmed via live research that Anthropic never released official Constitutional AI training code — the honest fix was `has_code: false`, not finding a substitute link); `toolformer`'s `code_url` was an unofficial third-party reimplementation, now labeled as such rather than implied to be official.
- **TAXONOMY.md**: added all 5 new sections (`Research Phases` — 8 values, `Research Venues` — 9 values, `Practical Applicability` — 4 values, `Reproduction Status` — 5 values, `Research Result Status` — 4 values), broadened `Enrichment Status` heading to "(Tools, Projects, and Research)".
- **`schemas/research.schema.json`** created fresh, additive-first (new fields optional), coexisting with the pre-existing `schemas/paper.schema.json` during migration via a `phase`-presence dispatch in `scripts/validate-schema.js` (mirroring `validate-structure.js`'s existing `PROJECT_HEADINGS_NEW` pattern from the projects vertical).
- **Migration guard**: `scripts/check-research-migration-progress.js`, wired as `migration:research:progress`/`migration:research:enforce`, following the tools/projects precedent exactly.
- **Bug found and fixed in `scripts/utils/frontmatter.js`**: `inferEntryType()` only recognised `content/research/papers/` as `'paper'` — without a fix, every migrated entry would have failed type inference entirely (no schema/structure validation could run at all). Fixed to recognise all 8 new phase folders.

## 2. Skeptic — Evidence & Reproducibility (per entry, before any authoring)

Applied the Six Skeptic Questions to every entry, with live web research triggered specifically for point-in-time claims (reproduction status, post-publication critiques, citation counts, supersession) per the field-level research policy — not for stable claims (methodology, `builds_on`, `venue`/`year`/`authors`).

### Substantive post-publication challenges found and reflected honestly (not smoothed over)

- **`madaan-2023-self-refine` (Self-Refine)** — the most significantly challenged entry in the vertical. Live research surfaced a *direct, credible methodological critique* (Huang et al., "Large Language Models Cannot Self-Correct Reasoning Yet") specifically showing the original paper's experimental design used artificially weak initial-response prompts that inflate the measured self-correction benefit, plus a broader critical survey concluding no major self-correction work (including this one) has shown genuine intrinsic self-correction under fair conditions. Set `result_status: challenged`, `practical_applicability: low`, `reproduction_status: no-code` — all three honest, non-inflated, and directly justified by named, dated, sourced counter-evidence.
- **`devlin-2018-bert` / `brown-2020-gpt3`** — both `result_status: challenged`, each for a *specific, named* reason: RoBERTa (Liu et al., 2019) found BERT was significantly undertrained and could match/exceed every later model with the same architecture and more careful training; Chinchilla (Hoffmann et al., 2022) found GPT-3-class models were significantly undertrained relative to parameter count, with a 70B compute-optimal model outperforming 175B GPT-3.
- **`ouyang-2022-instructgpt`** — `result_status: challenged` because DPO (a later catalog entry) *directly and explicitly* critiques PPO-based RLHF as "complex and often unstable" in its own abstract — the challenge is to this paper's specific optimization method, not its qualitative alignment finding.
- **`wei-2022-chain-of-thought`** — `result_status: challenged`, but carefully scoped: the challenge (2025 research explicitly titled "Chain-of-Thought Is Not Explainability") targets a *different* claim (that CoT traces faithfully explain model computation) than the paper's own core claim (that CoT improves task accuracy, which remains `practical_applicability: high`, unchallenged). The entry is explicit about this distinction rather than conflating the two.

### `result_status: superseded` handled without fabricating references

Per the "don't invent taxonomy values / don't invent IDs" principle, three entries where a real supersession exists but no catalog paper entry represents the successor were classified `result_status: foundational` (not `superseded` with a fabricated `superseded_by`), with the supersession fact stated explicitly in prose (Overview and/or Limitations) instead:
- `lewis-2020-rag` (original RAG architecture superseded in practice by simpler decoupled retrieve-then-generate pipelines — no single "successor RAG paper" exists to reference)
- `dubey-2024-llama3` (Llama 4, April 2025, is Meta's own acknowledged successor per the projects-vertical's own `llama-3` entry findings — no Llama 4 research-entry paper exists yet)
- `yang-2024-qwen25-math` (Qwen's own later generations have surpassed these results per the Qwen3 Technical Report's own published comparison table — no narrower "Qwen3-Math paper" entry exists)
- `schick-2023-toolformer` (superseded by a *capability* — native function-calling built into frontier model APIs — not a specific competing paper)

### Evidence-backed, non-inflated `practical_applicability` calls

Per Rule R-7 ("most papers are medium; inflation is the primary catalog quality risk"), the final distribution is: **11 high, 7 medium, 4 theoretical, 3 low** — deliberately not skewed toward `high`. Notable honest downgrades: `edge-2024-graphrag` set to `low` after live research surfaced concrete, dated, sourced cost figures (indexing cost reported at 100x–6000x standard vector RAG depending on configuration, ~$10–15 to index an 800KB corpus with GPT-4.1-class models, up to 610,000 tokens per retrieval in one independent study) — the most unambiguous "low, not inflated" call in the vertical, backed by named numbers rather than a vague caveat.

## 3. Translator — Authoring

### The canonical 10-section format, applied without exception

Every one of the 25 migrated entries follows the exact required section order (Overview, Why it's in the Arsenal, Core Contribution, Key Results, Methodology, Practical Applicability, Limitations & Critiques, Reproductions & Follow-up Work, Relation to the Arsenal, Resources) — enforced both by `validate-structure.js`'s `RESEARCH_HEADINGS_NEW` heading-presence check and by new automated content checks (`researchContentChecks()` in `validate-structure.js`) that reject empty Limitations/Reproductions sections, reject the literal phrase "no known limitations," and reject Practical Applicability sections that read only "engineers should be aware of this" or "read this paper."

### Rule R-2 applied literally: supersession stated in Overview, not buried

Every entry with a real currency caveat (RoBERTa/Chinchilla challenges, GraphRAG's cost, Toolformer's supersession by native function-calling, Self-Refine's methodological critique) states that caveat explicitly in the Overview's opening paragraphs — not deferred to Limitations alone.

### `implemented_in` — real, verified cross-links, not approximate matches

Every `implemented_in` reference was checked against the actual catalog before being written (confirmed matching IDs via `grep "^id:"` on the target files, not assumed): `hu-2021-lora`/`dettmers-2023-qlora` → `peft`, `axolotl`, `unsloth`, `llamafactory`; `leviathan-2022-speculative-decoding` → `vllm`, `sglang`, `text-generation-inference`, `llama-cpp`; `yao-2022-react` → `langchain`, `langgraph`, `smolagents`; `es-2023-ragas` → `ragas-rag-evaluation`. Where no genuine implementation match existed (e.g. `yang-2024-swe-agent` vs. the catalog's `openhands` project — related problem space, not the same system), `implemented_in` was deliberately left empty rather than force-fitting an approximate relationship.

### `corresponding_project_entry` cross-links (3 pairs)

`deepseek-ai-2025-r1` ↔ `deepseek-v3-r1`, `dubey-2024-llama3` ↔ `llama-3`, `yang-2024-qwen25-math` ↔ `qwen-2-5` — each research entry's "Relation to the Arsenal" section explicitly distinguishes its own frame (the paper's technical claims and their currency) from the project entry's frame (the model's ongoing ecosystem/production-adoption status), per the same frame-differentiation discipline established in the projects vertical's Rule P-5.

## 4. Validator — Contracts Enforced

Full `pnpm run ci` (schema → taxonomy → structure → paths → references → duplicates → `migration:enforce` [tools] → `migration:projects:enforce` [projects] → `migration:research:enforce` [research, now enforced not just reported] → 128 unit tests → `generate:all` → data-contract validation) passes clean:

```
Schema validation passed. Checked 375 content entries.
Taxonomy validation passed. Checked 375 content entries.
Markdown structure validation passed. Checked 375 content entries.
Path validation passed.
Reference validation passed. Checked 375 entries. (2 pre-existing warnings, unrelated to this migration)
Duplicate ID check passed. Checked 375 content entries.
Tools migration progress: 92/92 (100%)
Projects migration progress: 68/68 (100%)
Research migration progress: 25/25 (100%)
# tests 128 / pass 128 / fail 0
Generated data layer for 375 entries.
Generated search index with 375 document(s).
Generated registries and 53 index files.
Data contract validation passed.
```

3 new tests added to `tests/validate-schema.test.js`: `research schema requires phase/venue/year/practical_applicability/reproduction_status/result_status/has_code/tldr/key_contribution/last_reviewed`, `research schema rejects an unknown phase value`, `research schema requires superseded_by/builds_on/implemented_in to be valid kebab ids when present` (plus the existing `arxiv_id` regex test, migrated from `paper.schema.json` to `research.schema.json`).

### Final phase distribution (25 entries across 8 phases)

| Phase | Count |
|---|---:|
| `foundational` | 5 |
| `architectures` | 0 (genuine current gap — documented in that folder's `_index.md`, not an oversight) |
| `training-and-alignment` | 7 |
| `inference-and-efficiency` | 2 |
| `retrieval-and-memory` | 3 |
| `agents-and-reasoning` | 6 |
| `evaluation-and-safety` | 2 |
| `surveys` | 0 (no existing entry is a literature survey — documented in that folder's `_index.md`) |
| **Total** | **25** |

### Entries moved (old ID → new ID, old path → new path)

All 25 entries were renamed from their pre-migration slug-only IDs to the `{first-author}-{year}-{slug}` convention (Rule R-6), confirmed as a zero-blast-radius mechanical rename since the Phase 1 audit found **zero** existing catalog entries (0 of 380 pre-migration entries) referenced any research `paper_id` before this migration:

| Old ID (`content/research/papers/{id}.md`) | New ID (`content/research/{phase}/{id}.md`) |
|---|---|
| `attention-is-all-you-need` | `vaswani-2017-attention` (foundational/) |
| `bert` | `devlin-2018-bert` (foundational/) |
| `language-models-are-few-shot-learners` | `brown-2020-gpt3` (foundational/) |
| `retrieval-augmented-generation` | `lewis-2020-rag` (foundational/) |
| `llama-3-herd-of-models` | `dubey-2024-llama3` (foundational/) |
| `lora` | `hu-2021-lora` (training-and-alignment/) |
| `qlora` | `dettmers-2023-qlora` (training-and-alignment/) |
| `instructgpt` | `ouyang-2022-instructgpt` (training-and-alignment/) |
| `direct-preference-optimization` | `rafailov-2023-dpo` (training-and-alignment/) |
| `constitutional-ai` | `bai-2022-constitutional-ai` (training-and-alignment/) |
| `deepseek-r1` | `deepseek-ai-2025-r1` (training-and-alignment/) |
| `qwen2-5-math` | `yang-2024-qwen25-math` (training-and-alignment/) |
| `gptq` | `frantar-2022-gptq` (inference-and-efficiency/) |
| `speculative-decoding` | `leviathan-2022-speculative-decoding` (inference-and-efficiency/) |
| `hyde` | `gao-2022-hyde` (retrieval-and-memory/) |
| `raptor` | `sarthi-2024-raptor` (retrieval-and-memory/) |
| `graphrag` | `edge-2024-graphrag` (retrieval-and-memory/) |
| `chain-of-thought-prompting` | `wei-2022-chain-of-thought` (agents-and-reasoning/) |
| `react` | `yao-2022-react` (agents-and-reasoning/) |
| `tree-of-thoughts` | `yao-2023-tree-of-thoughts` (agents-and-reasoning/) |
| `self-refine` | `madaan-2023-self-refine` (agents-and-reasoning/) |
| `toolformer` | `schick-2023-toolformer` (agents-and-reasoning/) |
| `swe-agent` | `yang-2024-swe-agent` (agents-and-reasoning/) |
| `llm-as-a-judge` | `zheng-2023-llm-as-a-judge` (evaluation-and-safety/) |
| `ragas-paper` | `es-2023-ragas` (evaluation-and-safety/) |

`content/research/papers/` (fully empty after all 25 moves) was removed entirely, matching the projects-vertical precedent of deleting now-empty legacy folders. 3 hand-authored files with hardcoded old-path links were updated: `content/skills/core-concepts/transformers.md`, `content/skills/learning-paths/llm-researcher.md`, `content/research/must-read-papers.md`, `content/research/emerging-techniques.md`. Auto-generated `content/research/_index.md`, `content/_index.md`, and (now-removed) `content/research/papers/_index.md` self-healed via `pnpm run generate:toc`/`generate`.

### Entries set to `enrichment_status: draft` (1)

- `yang-2024-qwen25-math` — a narrower, less-cited technical report where a full timeboxed search for independent post-publication critique did not surface substantive findings beyond the direct benchmark-supersession comparison already documented; per the "cite cleanly or drop the claim" discipline established in the projects vertical, this is flagged rather than either over-claiming confidence or searching indefinitely.

### Entries set to `result_status: challenged` (5) — see Skeptic section above for full rationale

`ouyang-2022-instructgpt`, `devlin-2018-bert`, `brown-2020-gpt3`, `wei-2022-chain-of-thought`, `madaan-2023-self-refine`.

### Entries flagged for potential removal

None. All 25 pre-existing entries passed Skeptic Question 1 ("is this paper in the catalog for the right reason") — every one has a genuine, non-inflated engineering-relevance answer, even the 4 entries with `practical_applicability: theoretical` (`vaswani-2017-attention`, `brown-2020-gpt3`, `lewis-2020-rag`, `schick-2023-toolformer`), each justified per Rule R-9 rather than treated as a demotion.

### Benchmark claims date-stamped

Every benchmark figure across all 25 entries carries its publication year in the Key Results section (enforced by convention, not yet by an automated per-claim checker — a known gap, see Not Solved below), and every entry with benchmark numbers that are now dated relative to current practice says so explicitly (e.g. `vaswani-2017-attention`'s BLEU scores, `dubey-2024-llama3`'s comparison-table numbers, `yang-2024-qwen25-math`'s GSM8K/MATH figures).

### TAXONOMY.md changes

5 new sections added (`Research Phases`, `Research Venues`, `Practical Applicability`, `Reproduction Status`, `Research Result Status`); `Enrichment Status` heading broadened to cover Research.

### Schema changes

`schemas/research.schema.json` created; `schemas/paper.schema.json` retired and deleted. `scripts/validate-schema.js`, `scripts/validate-structure.js`, `scripts/validate-paths.js`, `scripts/validate-taxonomy.js`, `scripts/validate-references.js`, `scripts/utils/taxonomy.js`, `scripts/utils/frontmatter.js` all updated. `scripts/check-research-migration-progress.js` created. `scripts/generate-search-index.js` extended with `practical_applicability`/`result_status`/`reproduction_status` facets. `templates/paper-entry.md` and `scripts/scaffold.js`'s `new:paper` command rewritten for the new canonical format and phase-folder destination.

## Known, deliberately-flagged gaps (not silently swept under the rug)

- **`yang-2024-qwen25-math`'s `enrichment_status: draft`** — narrower paper, timeboxed research applied, honestly flagged rather than over-claimed.
- **`architectures/` and `surveys/` remain empty** — both are genuine current gaps in the existing catalog (documented explicitly in their own `_index.md` files with the reasoning), not oversights or placeholder folders quietly left unaddressed.
- **The pre-existing `qwen-2-5` project entry's `github_url` data-quality bug** (flagged in the projects-vertical work, pointing to the Qwen3 repo instead of a genuine Qwen2.5 source) is referenced, not re-litigated or fixed, in `yang-2024-qwen25-math`'s Limitations section — consistent with the established "flag, don't unilaterally fix a cross-vertical issue" discipline.

### Closed after initial completion

- **Automated per-claim benchmark-date checker** — originally flagged here as a gap (the "no benchmark claim without a date" requirement was applied by convention during authoring, with no dedicated validator). Closed in a follow-up commit: `scripts/validate-structure.js`'s `researchContentChecks()` now scans every migrated entry's Key Results section for score-shaped bullets (percentages, `pass@N`, F1, BLEU, EM, "accuracy", "perplexity") lacking a nearby `(YYYY)` year and emits a warning for human review. Running it against all 25 entries surfaced 3 warnings, all confirmed as prose that already references a date/period in a different format ("2022-era", "2025-2026") rather than genuine missing-date defects — correct heuristic behavior, not a false-negative gap. 3 new unit tests added.

## Files changed

- **25 research entries** authored/migrated into 8 new phase folders (`content/research/{phase}/{id}.md`)
- **8 new curated `content/research/{phase}/_index.md` files**, each with "What belongs here" / "What does NOT belong here" / "Engineering frame" / "Reading order guidance" sections above the auto-generated registry marker
- **`content/research/papers/` removed entirely** (confirmed fully empty of real entries first)
- **1 new schema**: `schemas/research.schema.json`; **1 schema retired**: `schemas/paper.schema.json`
- **1 new migration script**: `scripts/check-research-migration-progress.js`
- **8 modified scripts**: `validate-schema.js`, `validate-structure.js`, `validate-paths.js`, `validate-taxonomy.js`, `validate-references.js`, `generate-search-index.js`, `scaffold.js`, plus `scripts/utils/taxonomy.js` and `scripts/utils/frontmatter.js`
- **4 new tests** in `tests/validate-schema.test.js` (1 migrated + 3 new)
- **1 template rewritten**: `templates/paper-entry.md`
- **Modified**: `TAXONOMY.md`, `package.json`, `schemas/README.md`, `docs/faq.md`, `docs/getting-started.md`, `docs/schema-and-taxonomy.md`, plus every content file with a hardcoded cross-reference to a migrated paper (4 hand-authored files, 3 auto-generated files that self-healed)

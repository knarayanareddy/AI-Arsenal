# Stale-content QA and catalogue additions — 2026-10-24

Follow-up to #115/#116. This round worked the dormant backlog, ran the
catalogue against the editorial rules it had been passing, and added three
entries.

## 1. The dormant 22

Every entry in the dormant bucket was re-checked against the GitHub API and
re-read against its repository. All 22 remain public and none has been
archived, so dormancy here is "the upstream stopped pushing", not "the project
disappeared".

| Outcome | Entries |
|---|---:|
| Stars and last-commit dates refreshed, prose re-read, `last_reviewed` set | 21 |
| Quarantined as out of scope | 1 |
| Needed a prose rewrite (template sections replaced with sourced analysis) | 5 |

The prose rewrites were `deepseek-v3-r1`, `yi`, `mmagic`, `ragatouille` and
`uptrain`. In each case the entry's "Why it's in the Arsenal", Strengths,
Limitations and Use Cases were generator output that repeated the description
and mislabelled the artifact, while the Overview and Architecture sections were
sound; the replacements use the repository's own facts.

Two claims the evidence contradicted:

- `uiverse-design` declared `last_commit: 2026-06-13` while the repository's
  last push was 2024-09-02. That date is the batch-import date, not a commit.
- `yi` claimed `supports_quantization: false` and then reasoned from it, and
  claimed no alternative was catalogued while Qwen, Llama 3 and Gemma all are.

`uiverse-design` is now in `quarantine/2026-10-24/`. It is a CSS/Tailwind
component library with no AI functionality whose own enrichment note asked for a
keep/recategorize/remove decision.

## 2. What the strict rules found

The editorial gate rejected the boilerplate families it knew about, but the
2026-06/07 population batches used other sentence frames. Two rule families were
added:

- **Template prose** — fifteen frames, each produced by filling a fixed sentence
  with the entry's own description and alternative ids. Example: *"Read it
  beside `sentence-transformers`, `cohere`: the choice between them is a
  deployment and cost decision before it is a capability one."*
- **`hosted-claim-contradicted`** — a claim that the subject has "no
  self-hosted path" while the same file's frontmatter documents an open-source
  or self-hostable artifact. This is a factual contradiction inside one file,
  not a style judgement.

Results on 1,300 entries:

| Finding | Count |
|---|---:|
| Entries that described an open-source library as a hosted service | 43 (fixed) |
| Template sentences remaining | 454, across 205 entries |
| False positives in the new contradiction rule | 3 (rule refined) |

The 43 false hosting claims are fixed with the real limitation: Meilisearch's
RAM-bound index and single-node server, Guidance's dependence on a backend that
honours grammar constraints, Triton's model-repository cost, `mlx-lm`'s
Apple-silicon-only path, and so on. The three false positives were hosted-only
products whose open-source SDK had triggered the rule; it now keys on
`self_hostable: true` and on project `artifact_type`, not on the presence of a
`source_url`.

The 454 remaining sentences are inventoried in
`docs/generated-prose-audit.md` (per file, with counts) and carried by
`docs/editorial-baseline.json` until each entry is re-authored. Changed files are
validated strictly and ignore the baseline, so the frames cannot spread; the
baseline can only shrink, and `pnpm run audit:generated-prose` regenerates the
worklist.

## 3. The generator behind it

`scripts/populate-from-toolradar.js` wrote the affected batch. It hardcoded
`last_commit` to its own run date, estimated `github_stars`, and emitted the
template sections. Because `last_commit` drives freshness, a guessed value makes
a stale entry look current and hides it from `check:stale`. The script is retired
to `quarantine/2026-10-24/scripts/` and `GOVERNANCE.md` now bars any script from
writing prose or metrics into `content/`.

## 4. New entries

Each was checked against the live repository and added with sourced frontmatter,
two or more workload-specific `best_when`/`avoid_if` scenarios, and a full body:

- **`deepseek-harness`** (project, agent-system) — DeepSeek's MIT agent harness,
  260k stars in ten weeks, plugin tree on Cordis with `web`/`headless`/`sdk`/`acp`
  profiles. Catalogued as a developer preview, with the breaking-change warning as
  the first limitation.
- **`graphify`** (tool, dx-and-tooling) — tree-sitter AST graph for code plus an
  optional model pass for documents; every edge is tagged `EXTRACTED` or
  `INFERRED`. Verdict `watching`, on the strength of 1,615 open issues and a
  four-month-old repository.
- **`turbovec`** (tool, data-ingestion) — 2-/4-bit TurboQuant vector index with no
  training step and incremental sync; verdict `solid-choice` for large,
  frequently updated embedding sets that must stay in-process, with the linear
  scan and lossy recall stated as the boundaries.

## Verification

```
pnpm run ci                      # exit 0, 310 tests, 1,300 entries
pnpm run check:stale             # 1,000 stale (was 1,022; 22 reviewed, 3 added, 1 quarantined)
pnpm run validate:editorial:all  # 0 new findings (454 baselined)
```

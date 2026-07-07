# Trending Vertical Reorganisation — Completion Report

> Companion to `PR_DESCRIPTION_TRENDING_EXPANSION.md`. Required by the
> Trending Vertical Reorganisation & Authoring Agent Prompt (Phase 4 /
> Execution order → Completion report).

## 1. Schema change vs prior guide usage

**Before:** Trending content lived in `content/trending/` as `entry_type: guide`
with `section: trending`. There was no dedicated schema; the entries used
`guide.schema.json`, which has no notion of `as_of`, `window`, `signals_used`,
`sources`, or `ranked_entries`. The `content/trending/_index.md` even asserted
*"The `guide` entry type already supports trending content, so no new schema
is required."*

**After:** A dedicated `entry_type: trend` validated by `schemas/trend.schema.json`.
Key differences from the old `guide` usage:

| Aspect | Old (`guide` + `section: trending`) | New (`trend`) |
|---|---|---|
| Type | `guide` (shared with docs/architectures-adjacent) | `trend` (own vertical) |
| Time-boundedness | none | required `as_of`; `weekly-snapshot` requires `window` (7–8 day span) |
| Signal model | none | `signals_used` (enum of 9 Trend Signal Types), min 1 |
| Provenance | none | `sources[]` (source enum + url + `last_checked`), min 1 |
| Ranking | prose only | `ranked_entries[]` (rank, entry_id, entry_type, why_here, optional score_snapshot); min 1 for `weekly-snapshot`/`hall-of-fame` |
| Status vocabulary | global `Status Values` (`active`/`archived`/`deprecated`/`watching`) | `Trend Status` (`draft`/`reviewed`/`published`/`deprecated`) |
| Body shape | generic 11-section guide | kind-specific (ranked shape vs source-feed shape), enforced by `validate-structure.js` |
| `additionalProperties` | false (but no trend fields existed) | false, with `allOf`/`if-then` conditional required `window` + `ranked_entries` per `kind` |

The old `guide` entries (`this-week.md`, `hall-of-fame.md`) were migrated in place;
the `_index.md` claim about "no new schema" was corrected.

## 2. Script updates (draft-trending)

`scripts/draft-trending.js` was rewritten from a `guide`-emitting stub into a
`trend` weekly-snapshot generator:

- Reads `data/projects.json`, sorts by `trending_score` (desc), takes top 10.
- Emits `entry_type: "trend"`, `kind: "weekly-snapshot"`, `status: "draft"`,
  `as_of` = today, a 7-day `window` (today − 7 → today), `signals_used`
  (`github-stars-velocity`/`github-stars-total`/`github-activity`), a `github`
  `sources[]` entry with `last_checked`, and `ranked_entries[]` mapping each
  project to `{rank, entry_id, entry_type: "project", why_here, score_snapshot}`.
- Verified end-to-end: running it regenerates `content/trending/this-week.md`,
  which then passes `validate-schema.js` and `validate-references.js`
  (all `entry_id`s resolve). This is the exact path `weekly.yml` uses in CI.

Other script touch-points:
- `scripts/validate-schema.js` — `trend` → `trend.schema.json`.
- `scripts/validate-taxonomy.js` — trend uses `Trend Status`/`Trend Kinds`/
  `Trend Signal Types`/`Trend Sources`; global `Status Values` check skipped for trend.
- `scripts/validate-structure.js` — `TREND_RANKED_HEADINGS` / `TREND_SOURCE_HEADINGS`
  chosen by `kind`.
- `scripts/validate-references.js` — warns on unresolved `ranked_entries[].entry_id`.
- `scripts/generate-data.js` — `trend` collection → emits `data/trending.json`.
- `scripts/check-trending-migration-progress.js` (new) — counts by kind, field
  completeness, `--enforce` gates (≥4 entries, all 3 kinds present).
- `package.json` — `migration:trending:progress`/`migration:trending:enforce`
  added and inserted into `ci` before `pnpm test`.

## 3. URLs live-verified (date: 2026-07-06)

All `sources[].url` values were live-checked with `curl -I -L` (HTTP 200):

| URL | Used by | Result |
|---|---|---|
| `https://github.com/trending` | `this-week`, `hall-of-fame`, `github-trending` | 200 |
| `https://arxiv.org/list/cs.AI/recent` | `this-week` | 200 |
| `https://toolradar.com/featured/techpresso` | `toolradar-techpresso` | 200 |

Per the Phase 2 policy, every `sources[]` entry carries `last_checked: "2026-07-06"`.
The `ranked_entries[].entry_id` references (`crawl4ai`, `ragas-rag-evaluation`,
`qdrant`, `pinecone`, `langfuse`, `choose-llm`) all resolve to existing catalog
entries — confirmed by `validate-references.js` producing 0 warnings.

## 4. Entries left as `status: draft` and why

- **`content/trending/this-week.md`** (`weekly-snapshot`) — intentionally
  `status: draft`. It is an auto-generated *draft for maintainer review*, not a
  published ranking. The ranked project picks and `why_here` reasoning are
  illustrative until a maintainer verifies the underlying buzz/release signals
  against live sources; the `notable_changes` field states this explicitly.
  Promote to `reviewed`/`published` only after that verification.

All other new entries are `status: reviewed` (`hall-of-fame`,
`github-trending`, `toolradar-techpresso`) because their subject is a stable,
verifiable source/feed rather than a time-sensitive ranking.

## 5. Validation summary

- `validate-schema` / `validate-taxonomy` / `validate-structure` /
  `validate-paths` / `validate-references` — all **passed** (426 entries).
- `check-duplicates` — **passed**.
- `check-trending-migration-progress --enforce` — **PASS** (4 entries; kinds:
  weekly-snapshot 1, hall-of-fame 1, source-feed 2; field completeness 4/4).
- All other vertical migration enforces — **PASS**.
- `generate:all` + `validate:data` — **passed**.
- `node --test` — **143/143 passed** (including `taxonomy.test.js`, which
  confirms the new vocabulary sections do not disturb existing parsing).

## 6. Working-tree state (no commits possible)

All changes are left as an uncommitted working-tree set (this environment has
no commit access). `git check-ignore` confirms `content/trending/_index.md` and
`content/trending/by-source/_index.md` are now trackable (the Phase 0
negations work). `data/trending.json` is generated and gitignored, as intended.

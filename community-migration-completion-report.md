# Community Vertical Reorganisation — Completion Report

**Status: COMPLETE — 23/23 entries migrated (100%)**

## Summary

`content/community/` has been reorganised from 5 generic `entry_type: "guide"` directory-style aggregator files (mixing multiple entity kinds under single pages, with zero activity evidence or safety notes) into 23 individually-typed, schema-validated `entry_type: "community"` entries distributed across all 7 canonical entity-kind folders defined in the reorganisation brief.

The pre-existing `content/community/people/` vertical (25 `person`-typed entries) was **out of scope** for this reorganisation — it already had its own dedicated, compliant schema (`person.schema.json`) predating this reorg and was left untouched.

## Before / After

| | Before | After |
|---|---|---|
| Entry type | `guide` + `section: "community"` | `community` (dedicated schema) |
| Structure | 5 directory-style aggregator pages, each listing ~5 unrelated links | 23 individually-typed entries, one per community/resource |
| Activity evidence | None anywhere | Every entry has a dated, sourced `activity_evidence` string |
| Safety notes | None anywhere | 2 entries carry explicit `safety_notes` (r/LocalLLaMA: caution: moderation profile; LAION: caution: documented CSAM incident + remediation) |
| Folders | Flat `content/community/*.md` | `content/community/{forums,chat,newsletters,events,meetups,creators,datasets}/` |

## Final counts by kind

| Kind | Count | Entries |
|---|---:|---|
| chat | 4 | hugging-face-discord, eleutherai-discord, llamaindex-discord, langchain-slack |
| forum | 3 | langchain-forum, openai-developer-forum, r-localllama |
| newsletter | 4 | the-batch, import-ai, interconnects, latent-space-newsletter |
| event | 1 | ai-engineer-worlds-fair |
| meetup | 1 | ai-tinkerers |
| creator | 9 | latent-space-podcast, twiml-ai-podcast, practical-ai-podcast, no-priors-podcast, gradient-dissent-podcast, deeplearningai-youtube, huggingface-youtube, fastai-youtube, assemblyai-youtube |
| dataset | 1 | laion |
| **Total** | **23** | |

## Dead links / stale pointers found and corrected

- **LangChain "Discord"**: the retired `discord-communities.md` aggregator listed LangChain under a "Discord and Community Spaces" heading, but LangChain's original Discord server was permanently deleted on 2024-11-01 (confirmed via multiple independently dated Reddit threads) and the community migrated to Slack. Corrected by authoring `langchain-slack.md` (kind: chat, pointing at the actual current Slack) and a separate `langchain-forum.md` (kind: forum, LangChain's distinct Discourse-based help forum) — this was also a Failure Mode 4 (entity-kind mixing) fix, since the old single entry silently conflated what are now two distinct, correctly-typed community surfaces.
- No other fully dead links were found among the pre-existing entries; all other links resolved live during Phase 2 verification.

## Entries marked `safety_level: caution` and why

- **r/LocalLLaMA** (`forums/r-localllama.md`): large, open subreddit (~761K-767K members) with the typical moderation profile of high-traffic open communities — variable signal quality, occasional low-effort/promotional posts. Not an "avoid": the moderators actively run structured megathreads to manage this, and it remains one of the highest-signal communities in this space. This is a genuinely new coverage addition (not present in any prior aggregator file) discovered during Phase 2 research.
- **LAION** (`datasets/laion.md`): the original LAION-5B dataset was found by Stanford Internet Observatory (December 2023) to contain ~1,008 links to suspected CSAM among 5.8 billion image-text pairs. LAION took the dataset offline immediately and, partnering with the Internet Watch Foundation, the Canadian Centre for Child Protection, and Stanford Internet Observatory, released a cleaned Re-LAION-5B (August 2024) removing 2,236 flagged links. This is corroborated across four independent, dated sources. `safety_notes` give concrete, actionable guidance: only use Re-LAION-5B or later, never a pre-2024 mirror.

No entries were rated `safety_level: avoid`.

## Entries marked `activity_level: unknown` and why

**None.** Every entry in this migration was assigned a concrete `activity_level` (very-active/active/intermittent) backed by at least some dated evidence, even where that evidence was weak (see enrichment_status: draft entries below). `unknown` was reserved for cases where literally no public signal could be found, which did not occur in this batch — the weakest cases (fast.ai's YouTube channel) still had at least a third-party ranking source implying recent-ish content, hence `intermittent` rather than `unknown`.

## Entries marked `enrichment_status: draft` (7 of 23) and why

Per this vertical's honesty convention (mirroring the observability/architectures verticals' `enrichment_status: draft` usage for unconfirmed claims):

1. **hugging-face-discord.md** — Discord itself exposes no public activity metrics; evidence is a third-party qualitative review plus a proxy signal from the adjacent HF forum.
2. **gradient-dissent-podcast.md** — a genuine cross-source discrepancy was found (one directory shows a stale Jan-2025 snapshot, another shows episodes through May 2026) and reported honestly rather than resolved by cherry-picking the favorable source.
3. **deeplearningai-youtube.md** — no channel-specific upload-frequency evidence found; grounded in a parent-organisation proxy signal (The Batch's confirmed weekly cadence).
4. **huggingface-youtube.md** — same pattern: no channel-specific evidence, grounded in the HF forum's proxy activity signal.
5. **assemblyai-youtube.md** — same pattern: no channel-specific evidence, grounded in the company blog's proxy activity signal.
6. **fastai-youtube.md** — the weakest-evidence entry in the whole vertical: no confirmed dated 2026 upload was found at all, only an implication from a 2025-era third-party ranking. Explicitly flagged as most needing a maintainer re-check.
7. **llamaindex-discord.md** — invite link verified live via official docs, but no quantitative activity metric was found; evidence is limited to a qualitative third-party review.

The remaining 16 entries carry `enrichment_status: reviewed` (11) or otherwise, reflecting stronger, more directly-sourced evidence (same-day forum fetches, multi-source cadence corroboration, or first-party organisational statements).

## Taxonomy / schema changes

- **TAXONOMY.md**: added `## Community Entity Kinds`, `## Community Topics`, `## Community Audience`, `## Community Activity Level`, `## Community Safety Level`, `## Community Access`; extended `## Entry Types` and `## Enrichment Status`.
- **schemas/community.schema.json** (new, v1.0.0): required from v1.0.0 with no partial-migration window (all pre-existing content retired-or-rewritten in the same pass). Uses an `allOf`/`if`/`then` conditional requiring non-empty `safety_notes[]` whenever `safety_level != generally-safe`.
- **Migration guard**: `scripts/check-community-migration-progress.js`, structurally identical to the observability guard (including its previously-fixed `total = migrated.length + pending.length` arithmetic), with a `RETIRED_LEGACY_IDS` set for the 5 deleted aggregator files and an explicit exclusion of `content/community/people/` (out of scope, not "retired").
- **Validator wiring**: `validate-schema.js`, `validate-taxonomy.js`, `validate-structure.js` (new `COMMUNITY_HEADINGS` with strict section-order enforcement, matching observability's pattern; new `communityContentChecks()` targeting the brief's 4 named failure modes), `validate-paths.js`, `validate-references.js` all extended.
- **Generators**: `generate-data.js`, `generate-search-index.js`, `generate-stats.js`, `generate-context.js` (new "Community Directory by Kind" CONTEXT.md section) all extended.
- **package.json**: `migration:community:progress`/`:enforce` scripts added; `ci` chain updated to `migration:community:enforce`.

## Final state

- 392 total content entries (was 374 before this vertical's work began).
- All validators pass cleanly (only 2 pre-existing, unrelated dangling-reference warnings remain, from before this session).
- `npm test`: 131/131 passing throughout.
- `node scripts/check-community-migration-progress.js --enforce` exits 0.
- `generate:all` regenerates cleanly, including `data/community.json` and the new CONTEXT.md section.

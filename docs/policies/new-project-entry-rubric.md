# New Project Entry Rubric

Acceptance criteria for adding an entry to `content/projects/`. Two halves:

- **Hard gates (G)** — mechanical. Each one names the script that enforces it, so
  a candidate that passes the gates cannot break `pnpm run ci`. These are not
  opinions; they are the validators re-stated.
- **Judgement gates (J)** — the things no validator can see: is the project real,
  current, and does it earn a slot. These are what a reviewer applies by hand,
  and what `scripts/score-entry-candidates.js` approximates from GitHub API data.

A candidate must pass **every** gate. Failing any single one is a rejection, not
a warning — the catalogue is a filter, not a directory, and every weak entry
raises the review cost of the other 300.

Score each candidate as `PASS` / `FAIL` per gate and record the evidence. A
rejection is only useful if the reason is written down, so rejections are logged
in the scoring table at the bottom of this file with the gate that failed.

---

## Hard gates — enforced by `pnpm run ci`

| # | Gate | Enforced by | Evidence required |
|---|---|---|---|
| G1 | `id` is unique across all 1062 entries and matches the filename stem | `scripts/check-duplicates.js`, `scripts/validate-paths.js` | `id` not present in `data/index.json` |
| G2 | `github_url` is not already catalogued under a different id | `check-duplicates.js` (by id only — this gate is manual) | URL absent from every project's `github_url` |
| G3 | All 24 required frontmatter fields present; every enum value in `TAXONOMY.md` | `scripts/validate-schema.js`, `scripts/validate-taxonomy.js` | schema-valid frontmatter |
| G4 | `phase` set, and the file sits flat at `content/projects/{phase-folder}/{id}.md` | `scripts/validate-paths.js`, `pnpm run migration:projects:enforce` (fails below 100% migrated) | path derived from `phase`, never from `category` |
| G5 | All 10 body sections present, exact names | `scripts/validate-structure.js` (`PROJECT_HEADINGS_NEW`) | see section list below |
| G6 | `Overview`, `Architecture`, `Ecosystem Position`, `Limitations` each ≥180 characters | `scripts/validate-editorial-quality.js` (`project-section-length`) | character count |
| G7 | `Overview`, `Architecture`, `Ecosystem Position` each name a concrete technical artefact (API, GPU, retrieval, batching, checkpoint, dataset, …) | `validate-editorial-quality.js` (`project-section-missing-technical-content`) | `TECHNICAL_TERMS` match |
| G8 | `Ecosystem Position` states a comparison, boundary or relationship (`alternative`, `complements`, `rather than`, `overlaps`, `not a`, …) | `validate-editorial-quality.js` (`ecosystem-position-missing-comparison`) | `COMPARISON_TERMS` match |
| G9 | `best_for` and `avoid_if` each carry ≥2 workload-specific scenarios | `validate-editorial-quality.js` (`best-for-avoid-if-scenarios`) | 2–4 items per field |
| G10 | `Overview` is not a paraphrase of the `description` frontmatter | `validate-editorial-quality.js` (`overview-copied-from-frontmatter`, token overlap >0.88) | independently written prose |
| G11 | **No paragraph of ≥120 characters is shared with any other entry in the catalogue** | `validate-editorial-quality.js` (`repeated-paragraph`, full-catalog mode) | every paragraph bespoke |
| G12 | No rejected boilerplate, no generic frontmatter judgements, no `about a defines/introduces/provides` interpolation errors | `validate-editorial-quality.js` (3 rules) | clean prose |
| G13 | Every tag drawn from the Tag Taxonomy | `scripts/validate-taxonomy.js` | `TAXONOMY.md` § Tag Taxonomy |
| G14 | `alternatives` / `integrates_with` resolve to catalogue ids or a known-external name | `scripts/validate-references.js` (warning) | resolvable ids |
| G15 | Every relative link resolves to a file that exists | `scripts/validate-internal-links.js` | link check |

**G11 is the gate that most new entries fail.** The auto-generated entries in
the catalogue copy `best_for`/`avoid_if` verbatim into *Key Use Cases*,
*Strengths* and *Limitations*, and share an identical *Relation to the Arsenal*
paragraph — that is 189 of the 602 findings in `docs/editorial-baseline.json`.
Because the full-catalog run compares across files, copying any paragraph from a
sibling entry (including a template) produces a new finding, and the ratchet
fails the build on new findings. Write every paragraph for that entry alone.

### The 10 required sections (G5), in order

`Overview` · `Why it's in the Arsenal` · `Architecture` · `Ecosystem Position` ·
`Getting Started` · `Key Use Cases` · `Strengths` · `Limitations` ·
`Relation to the Arsenal` · `Resources`

Order is presence-checked, not sequence-enforced, for projects — but match it
anyway so the generated `_index.md` excerpts read consistently.

---

## Judgement gates — applied by the reviewer

| # | Gate | Threshold | Why |
|---|---|---|---|
| J1 | Repository exists and is **not archived** | `archived: false` | an archived project is a history entry, not a recommendation; if it must be included it needs `status: archived` **and** a non-empty `alternatives` list |
| J2 | Real adoption | ≥5,000 GitHub stars | the catalogue curates; stars are a crude but non-gameable proxy for adoption at this scale |
| J3 | Current | pushed ≤90 days ago → eligible for `health_signals: [actively-maintained]`; 90–180 days → `status: watching` and no `actively-maintained`; >180 days → reject | `TAXONOMY.md` defines `actively-maintained` as "commits in last 30 days"; never claim it without checking at authoring time |
| J4 | Licence identified by name | a real licence string, including fair-code ("Sustainable Use License", "Open WebUI License") | `license: NOASSERTION` is not information. Copyleft (AGPL) and source-available licences change the adoption decision and must be visible in frontmatter |
| J5 | Source code actually in the repo | not a landing page, docs repo, or awesome-list | an entry whose `Architecture` section cannot be traced to code in the repository is unfalsifiable |
| J6 | Fills a gap | not a near-twin of an existing entry | two entries for the same decision point cost a reader a comparison the catalogue should have made for them |
| J7 | Fits one of the 7 lifecycle phases | `TAXONOMY.md` § Project Phases | the phase drives the folder and the phase index |
| J8 | Architecture claimable from primary sources | README/docs/source, not a blog round-up | every architectural sentence in `Architecture` must be checkable against the repository |
| J9 | Facts captured at authoring time, not inherited | stars, language, licence, `last_commit` from the GitHub API on the authoring date, recorded in `enrichment_notes` | this is what stops the `github_stars_last_30d` and stale-report failures the freshness audit found |
| J10 | `enrichment_status` honest | `draft` unless a human has verified the claims by running it | 270 of 322 projects are `draft`; claiming `reviewed` without hands-on verification is the exact inflation this field exists to prevent |

### Scoring

- **PASS** — add the entry, `enrichment_status: draft`.
- **FAIL** — reject and record the gate. Rejections stay recorded so the same
  candidate is not re-litigated at the next pass, and so the gap between "found"
  and "accepted" is auditable.

---

## Scoring log

Candidates were drawn from GitHub's API on 2026-09-03 and deduplicated against
all 322 existing project entries by both `github_url` and normalised name.

Run with `scripts/score-entry-candidates.js`, which applies G1–G2 and J1–J5,
J7 mechanically. G3–G15 are enforced afterwards by `pnpm run ci` on the written
entry, and J6/J8 are the reviewer's call recorded here.

32 candidates scored; **14 cleared the mechanical gates and 8 were added.**

### Added (8 entries)

| Repository | Stars | Licence | Pushed | Entry | Phase |
|---|---:|---|---|---|---|
| `openclaw/openclaw` | 388,702 | MIT¹ | 2026-09-03 | `agent-systems/openclaw.md` | agent-system |
| `anomalyco/opencode` | 203,399 | MIT | 2026-09-03 | `agent-systems/opencode.md` | agent-system |
| `modelcontextprotocol/servers` | 90,043 | Apache-2.0² | 2026-09-03 | `frameworks/mcp-servers.md` | framework |
| `Kilo-Org/kilocode` | 27,155 | MIT | 2026-09-03 | `agent-systems/kilocode.md` | agent-system |
| `trycua/cua` | 22,143 | MIT | 2026-09-03 | `agent-systems/cua.md` | agent-system |
| `pipecat-ai/pipecat` | 15,163 | BSD-2-Clause | 2026-09-03 | `frameworks/pipecat.md` | framework |
| `livekit/agents` | 13,979 | Apache-2.0 | 2026-09-03 | `frameworks/livekit-agents.md` | framework |
| `The-PR-Agent/pr-agent` | 12,832 | MIT | 2026-09-03 | `agent-systems/pr-agent.md` | agent-system |

¹ The GitHub API reports `NOASSERTION`; the repository's `LICENSE` file states
MIT, copyright OpenClaw Foundation. ² The repository documents a transition —
Apache-2.0 for new code and specifications, CC-BY-4.0 for documentation, MIT for
pre-transition contributions — so `NOASSERTION` is expected and Apache-2.0 is
recorded as governing for new contributions.

`pipecat` and `livekit-agents` are phase `framework`, not `agent-system`: both
are libraries you build a worker on, which puts them in `frameworks/` rather
than diluting `agent-systems/`. That corrects an earlier note in this document
that deferred them for lack of a voice lane.

### Rejected, with the gate that failed

| Repository | Stars | Failed | Reason |
|---|---:|---|---|
| `cline/cline` | 67,391 | **G1, G2** | already catalogued as `content/tools/dx-and-tooling/cline.md`. A second project entry needs a distinct id plus `corresponding_tool_entry`, and must clear J6 on its own merits. |
| `mem0ai/mem0` | 64,639 | **G1, G2** | already `content/tools/orchestration/mem0.md`. |
| `BerriAI/litellm` | 57,921 | **G1, G2** | already `content/tools/serving-and-deployment/litellm.md`. |
| `unslothai/unsloth` | 75,538 | **G1, G2** | already `content/tools/model-layer/unsloth.md`. |
| `agno-agi/agno` | 42,023 | **G1, G2** | already `content/tools/orchestration/agno.md`. |
| `e2b-dev/E2B` | 13,661 | **G1, G2** | already `content/tools/orchestration/e2b.md`. |
| `Aider-AI/aider` | 48,694 | **G1, G2** | already `content/tools/dx-and-tooling/aider.md`; also outside the J3 recency window (last push 2026-05-22). |
| `google-gemini/gemini-cli` | 106,789 | **G1, G2** | already `content/tools/dx-and-tooling/gemini-cli.md`. |
| `openai/codex` | 121,117 | **G2** | already catalogued under a different id as `content/tools/dx-and-tooling/openai-codex-cli.md`. |
| `aaif-goose/goose` | 53,871 | **G1** | id `goose` already held by `content/tools/dx-and-tooling/goose.md`. |
| `n8n-io/n8n` | 203,208 | **G1, G2** | already `content/tools/orchestration/n8n.md`. |
| `letta-ai/letta` | 24,599 | **G1, G2, J5** | already `content/tools/orchestration/letta.md`; and the repo is now a landing page — no source at the root, `language: null`, README states the code moved to `letta-ai/letta-code`. Re-score against `letta-ai/letta-code`. |
| `getzep/zep` | 4,890 | **G1, G2, J2** | already `content/tools/orchestration/zep.md`, and 4,890 stars is below the 5,000 floor. |
| `open-webui/open-webui` | 150,784 | **G1, G2** | already catalogued; also a bespoke "Open WebUI License" that J4 would require naming as source-available rather than open source. |
| `FlowiseAI/Flowise` | 55,403 | **G1, G2, J1** | already catalogued, and `archived: true` in the GitHub API. |
| `mindsdb/mindsdb` | 39,686 | **J5** | redirects to `mindsdb/mindshub`, whose language breakdown is Makefile + Dockerfile only — a packaging repo, not the product. |
| `vocode/vocode-core` | — | **J1** | 404; repository renamed or removed, so no facts can be verified. |
| `stanford-oval/storm` | 31,211 | **J3** | last push 2025-09-30, ~11 months before authoring. Work continued as papers, not commits. Re-score if commits resume. |
| `zai-org/GLM-4.5` | 4,422 | **G2, J2, J3** | already catalogued, below the star floor, and last push 2026-02-01. |
| `activepieces/activepieces` | 24,204 | **J6** | workflow automation lane already represented by `n8n`; would duplicate a decision point rather than add one. |
| `ToolJet/ToolJet`, `windmill-labs/windmill` | 40,831 / 17,775 | **J6** | internal-tool builder and script platform whose AI surface is a feature, not the project. |
| `OpenBB-finance/OpenBB` | 72,636 | **J6** | financial data platform; domain-specific data access, not a stack component. |
| `anthropics/claude-agent-sdk-python`, `strands-agents/harness-sdk` | 8,033 / 7,136 | **J6** | vendor-affine SDKs. Real projects, but they are the vendor-locked alternative to entries already catalogued; `strands-agents/sdk-python` also now redirects to `harness-sdk`, so the project boundary is still moving. |

### What the first pass got wrong

The initial run of this rubric accepted 12 entries, eight of which were already
in the catalogue — as **tool** entries, not project entries. The scorer's
dedupe scan was scoped to `content/projects/`, while `check-duplicates.js`
enforces id uniqueness across all 13 entry types. Had those entries been
written, `pnpm run check:duplicates` would have failed on every one of them.

`tests/score-entry-candidates.test.js` now pins the scan to catalogue scope and
names the five colliding ids explicitly, so the mistake cannot recur silently.

The lesson is worth keeping in this file: a rubric is only as good as the scope
of the data it checks. Eighteen of the 32 candidates were rejected on
uniqueness alone, which is the gate easiest to implement wrongly.

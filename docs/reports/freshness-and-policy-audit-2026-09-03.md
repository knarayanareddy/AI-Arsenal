# AI Arsenal — Freshness & Policy Compliance Audit (2026-09-03)

**Question:** the repository states a set of review, freshness, and quality measures. Do they still hold?

**Method:** every row below was checked by running the repo's own tooling (`check:stale`, `report-content-debt`, `validate-editorial-quality --all`, `validate-structure`, the entry loader) or by reading the committed artifact / live GitHub API. Nothing here is inferred from documentation alone. Companion document: [`end-to-end-review-2026-09-03.md`](./end-to-end-review-2026-09-03.md).

**Headline:** the *gates* hold — everything CI can check, it checks correctly. The *cadences* do not — every scheduled human-or-bot review loop is either broken or never implemented. The catalog passes its freshness checks today only because the thresholds have not been reached yet; on the current date distribution the entire corpus ages out between mid-September and mid-October 2026.

| | Holds | Broken / not operating | Passing vacuously or aging |
|---|---:|---:|---:|
| 34 measures audited | **14** | **13** | **7** |

---

## A. Freshness measures

| # | Measure (source) | Verdict | Evidence |
|---|---|---|---|
| A1 | 90-day stale threshold, `data/stale-report.json` (`check-stale.js`, maintainer-runbook) | ⚠️ **Vacuous pass** | `check-stale` → *"No stale entries found."* Oldest entry is **82 days**. Age buckets: 1 entry 0–29d, **723** 30–59d, **338** 60–89d |
| A2 | Stale report refreshed monthly (`monthly.yml`) | ❌ **Broken** | Committed `data/stale-report.json` `generated_at: 2026-06-13T19:58:30Z`; `monthly.yml` is **3/3 failures** |
| A3 | "Stale entry update — Monthly — 30 days" SLA (`GOVERNANCE.md` Quality SLAs) | ❌ **Not operating** | 1,061 of 1,062 entries carry a `last_reviewed`, but they are bulk authoring stamps: **143 in 2026-06, 918 in 2026-07, 1 in 2026-08**. Nothing re-reviews them; the field records creation, not review |
| A4 | "`stale-bot` flags entries due for review" (`GOVERNANCE.md`) | ❌ **Not implemented** | The only occurrence of `stale-bot` in the entire repository is that sentence. `check-stale.js` writes a JSON report; no workflow or script files issues for stale entries (only `create-link-issues.js` exists, for links) |
| A5 | "Star count refresh — Weekly — Automated" (`GOVERNANCE.md`) | ❌ **Broken** | `data/github-cache.json` `generated_at: 2026-06-13T19:57:22Z` holding **30 repos**, against **537** entries with a `github_url`. Never refreshed since bootstrap |
| A6 | Weekly maintenance PR: metrics, links, trending (`automation-policy.md`) | ❌ **Broken** | `weekly.yml` **12/12 failures** — annotation: *"GitHub Actions is not permitted to create or approve pull requests."* Branch `bot/weekly-refresh` is pushed (head `467b3b3`, 2026-08-31) but no PR is ever opened |
| A7 | Monthly digest + stats PR (`automation-policy.md`) | ❌ **Broken** | `monthly.yml` **3/3 failures**, same annotation. Catalog contains exactly **1 digest** |
| A8 | `data/*.json` on `main` refreshed via batched PR (`automation-policy.md`) | ❌ **Stale** | `main` `projects.json` `generated_at: 2026-07-19T21:22:54Z`; `index.json` holds **1,061** entries vs **1,062** actual (missing `xiurouter`, merged 2026-08-30). The `data-release` branch, by contrast, is current: `generated_at: 2026-09-03T08:10:07Z`, `total: 1062, tools: 215` |
| A9 | Benchmarks require live verification: `leaderboards[].last_checked` on every entry (benchmark policy) | ✅ **Holds** | **52/52** benchmark entries have `leaderboards[]`, **0** rows missing `last_checked` |
| A10 | Benchmark verification must not be "obviously stale" (benchmark policy) | ⚠️ **Aging, unautomated** | All 80 leaderboard rows date from **2026-07-06 (58), 2026-07-08 (20), 2026-07-19 (2)** — 46 to 59 days old. No workflow re-verifies benchmarks; `weekly.yml` covers links/stars/trending only |
| A11 | SOTA-safe wording enforced in CI (benchmark policy) | ✅ **Holds** | `validate-structure.js` → *"Markdown structure validation passed. Checked 1062 content entries."* with **0** warnings |
| A12 | `tradeoffs_as_of` on architecture entries (architecture schema) | ✅ present / ⚠️ aging | **29/29** set, all `2026-07` |
| A13 | Tip `verification_status` (`TAXONOMY.md`) | ✅ **Holds** | **171/171** tips set: 28 `production-verified`, 139 `community-reported`, 4 `theoretical` |
| A14 | "Skills pages … should be reviewed quarterly" (stated in the entries themselves) | ⚠️ **Due now** | **23** entries make this promise; their `last_reviewed` values are **8 × 2026-06** and **15 × 2026-07**, so the first quarterly reviews fall due this month and next |
| A15 | "Freshness as trust — stale data is worse than no data" (README pillar 3) | ❌ **Contradicted by the data** | `enrichment_status`: **735 draft (69.2 %)**, 167 reviewed, 156 unset, **4 verified (0.4 %)**. The four verified entries: `vaswani-2017-attention`, `zheng-2023-llm-as-a-judge`, `leviathan-2022-speculative-decoding`, `text-generation-inference` |

**The A1 cliff, precisely:** with `--threshold=90`, **338 entries (32 %) become stale within 30 days** and **1,061 (99.9 %) within 60 days**. Because A2/A4/A7 are all broken, nothing will surface or triage that wave — `data/stale-report.json` will keep saying `stale_count: 0` from its 2026-06-13 timestamp.

---

## B. Editorial and quality measures

| # | Measure (source) | Verdict | Evidence |
|---|---|---|---|
| B1 | Editorial baseline ratchet: "the baseline can only shrink" (maintainer-runbook) | ✅ mechanically / ⚠️ **stalled 40 days** | `validate-editorial-quality --all` → *"602 findings, 602 suppressed… No new findings; baseline is current."* Historical `_meta.count`: **815** (07-12) → 789 → 745 → 723 → 667 → 640 → **602** (07-25), then flat. It has never grown, so the ratchet works; it has not shrunk since 2026-07-25 |
| B2 | Baseline must not retain resolved (stale) entries (baseline `_meta.warning`) | ✅ **Holds** | CI fails on stale baseline entries; `pnpm run ci` exits 0 |
| B3 | Content-debt report reflects current debt (`docs/reports/content-debt-report.md`) | ❌ **Stale artifact** | Report states *"Total suppressed findings: **815**"*; the committed baseline is **602** |
| B4 | Deprecation policy: never delete; set `deprecated`; notice; reason; link alternatives (`GOVERNANCE.md`) | ⚠️ **Partially** | `status` distribution: 719 active, 332 unset, 4 watching, **1 deprecated**, 2 archived, 1 draft, 3 reviewed. The deprecated entry (`autogen.md`) does list 1 alternative ✓. But `mistral-models.md` and `text-generation-inference.md` are `archived` with **0 alternatives**, and the policy only names `deprecated`, so the alternatives check never fires for them. Separately, **92 entries were removed from `content/`** into `quarantine/2026-07-11/` — preserved rather than deleted, but "entries are never deleted" is now a statement about intent, not about `content/` |
| B5 | Body "Last reviewed" footer agrees with frontmatter | ✅ **Mostly** | 444 entries carry a footer, 618 do not; exactly **1 mismatch**: `content/tools/serving-and-deployment/vercel.md` body `2026-06-14` vs frontmatter `2026-06-30` |
| B6 | "PR review — Continuous — 72 hours" (`GOVERNANCE.md`) | ✅ for merged / ❌ for drafts | Merged PRs: #90 opened 08-28 05:12 → merged 08-30 18:08 (**61 h**); #79–#84 all ≤17 h. Drafts **#87, #88, #89 have been open 31 days** (2026-08-03), unreviewed — together 191 files and **−1,531 lines** of boilerplate, ~217 baseline findings |
| B7 | "Broken link fix — Weekly — 7 days after issue" (`GOVERNANCE.md`) | ❌ **Breached** | #85 and #86 opened **2026-07-27 (38 days ago)**, #91 opened 2026-08-31 (3 days). All three URLs are still present in content: `content/projects/foundation-models/sensevoice.md`, `content/projects/training-and-alignment/transformerlab.md`, `content/tools/model-layer/openpipe-art.md` |
| B8 | "Full content audit — Quarterly" (`GOVERNANCE.md`) | ⚠️ **Due 2026-09-13** | Repository created 2026-06-13; no content-audit artifact exists in `docs/reports/` (the reports there are migration completions and a red-team audit) |
| B9 | "Schema version review — Quarterly" (`GOVERNANCE.md`) | ⚠️ **No record** | `schema_version: 1.0.0` in every generated collection; no review record found in the repo |

---

## C. Security, CI, and governance measures

| # | Measure (source) | Verdict | Evidence |
|---|---|---|---|
| C1 | "CodeQL — weekly static analysis" (`SECURITY.md`) | ✅ **Holds** | All-time **83 success / 2 failure / 15 cancelled**; last run **2026-09-03 09:34 success** |
| C2 | "Dependabot — weekly dependency update PRs" (`SECURITY.md`) | ❌ **Does not hold** | **0 Dependabot PRs ever** (`search/issues?q=author:app/dependabot` → `total_count: 0`); Dependabot alerts are **disabled** for the repo (alerts API → 403 *"Dependabot alerts are disabled"*); the labels `dependabot.yml` applies (`dependencies`, `npm`, `github-actions`) do not exist. *Unverified hypothesis:* the `ignore:` blocks use `update-types: ["version-update"]`, which is not a documented Dependabot ignore type (the documented forms are `version-update:semver-major|minor|patch`) — worth checking whether the config parses at all |
| C3 | Branch protection + CODEOWNERS review required (`docs/policies/branch-protection.md`, `docs/policies/continuity.md`, red-team finding S-01) | ❌ **Does not hold** | `GET /branches/main` → `{"protected": false}`; `GET /rulesets` → `[]`. PR #90 merged with **3 failing check suites** (PR Validation, No-Skip-CI, CodeQL) and `reviewDecision: ""`. `continuity.md` asserts *"branch protection + CODEOWNERS ensure no privileged-path change ships without review"* — that sentence is false today. Note red-team finding **S-01** fixed the CODEOWNERS handles but its enforcement half was never applied |
| C4 | Continuity goal 2: "data layer continues to be publishable by automation without maintainer intervention" (`docs/policies/continuity.md`) | ⚠️ **Half true** | `data-release` publishes daily without intervention (**64 success / 18 failure**, last success today) ✓. But the weekly/monthly batched PRs — the other half of the claim — have **never succeeded** ✗ |
| C5 | Scorecard "Posts results as SARIF to the Security tab" (`scorecard.yml` comment) | ❌ **Does not hold** | **12/12 failures** at the `Run Scorecard` step; nothing is published. Root cause not retrievable from this environment (Actions log host unreachable) |
| C6 | Actions pinned by SHA, least-privilege permissions (red-team remediation) | ✅ **Holds** | Every `uses:` is a commit SHA with a version comment; workflow-level `permissions: contents: read` with narrow job escalation |
| C7 | SSRF-hardened link checker, HTML sanitization, cache/path guards (red-team remediation) | ✅ **Holds** | 242 tests pass, including `pinnedLookup fails ENOTFOUND when every approved address is private/empty` and the sanitizer allowlist tests |
| C8 | Migration completeness enforced in CI (`migration:*:enforce` × 10) | ✅ **Holds** | All ten enforcers pass inside `pnpm run ci` |
| C9 | Generated table freshness (`check:tool-facets`, `check:tools-by-job`) | ✅ **Holds** | Both `--enforce` checks pass on a clean tree |
| C10 | Data-contract parity (collections/index/stats/search) | ✅ **Holds** | *"Data contract validation passed for 13 collections."* |

---

## D. Documentation claims that function as measures

These are the numbers a reader (or an agent) is told to trust. All were checked against live state:

| Claim | Where | Actual |
|---|---|---|
| "Tools **214** … Total content entries **1061**" | `README.md` stats table | **215 / 1,062** |
| "`data-refresh.yml` — Batched generated-data refresh PR" | `README.md` workflows table | It publishes to the orphan `data-release` branch and opens no PR (`docs/automation-policy.md` describes it correctly) |
| "`pnpm test` … **220 tests**" | `AGENTS.md` | **231** on `main`, **242** on PR #92 |
| "Categories: agents, llms, rag, observability, multimodal, voice-audio, computer-vision, code-generation, data-pipelines, tooling" | `AGENT.md` (the agent routing map) | Actual folders: `foundation-models, frameworks, inference-engines, agent-systems, data-and-retrieval, training-and-alignment, benchmarks-and-evals` |
| "LAST UPDATED 2026-07-19 … Total content entries: 1061" | `AGENT.md` footer | 1,062 |
| "Trending ⏳ Queued 0/3"; "Skills ✅ Complete 8/8" | `PROGRESS.md` | 4 trend entries exist; `content/skills/` has 35 files |
| `[Unreleased] → Phase 1 foundation scaffolding` | `CHANGELOG.md` | PR numbers run to #92; `generate:changelog` exists but nothing maintains the file |
| `/content/projects/{agents,llms,rag,observability}/`, `/security/` | `.github/CODEOWNERS` | None of these paths exist — silently dead rules |
| "Total suppressed findings: 815" | `docs/reports/content-debt-report.md` | 602 |

---

## Verdict, by category

**Holding (14)** — `A9, A11, A12, A13, B1, B2, B5, B6, C1, C6, C7, C8, C9, C10`: the schema/taxonomy/structure/path/reference/duplicate gates, the editorial baseline ratchet and its stale-entry detection, data-contract parity, generated-table freshness, all ten migration enforcers, CodeQL, the red-team security remediations (SSRF/XSS/cache/path guards), benchmark `last_checked` completeness, the SOTA-wording guard, `tradeoffs_as_of` and tip `verification_status` coverage, footer/frontmatter consistency, and the 72-hour SLA for PRs that actually get reviewed.

**Broken or never implemented (13)** — `A2, A3, A4, A5, A6, A7, A8, A15, B3, B7, C2, C3, C5`: the weekly maintenance PR, the monthly digest/stats PR, `main`'s committed data layer, star-count refresh, the committed stale report, `stale-bot`, the "stale entry update" SLA, the freshness pillar in practice, the content-debt report artifact, the broken-link 7-day SLA, Dependabot, branch protection/CODEOWNERS enforcement, and Scorecard publishing.

**Passing vacuously or aging (7)** — `A1, A10, A14, B4, B8, B9, C4`: the 90-day stale check (0 today, 338 within 30 days), benchmark "not obviously stale" (structurally complete, 46–59 days old, unautomated), the quarterly-review promise in 23 entries, the deprecation policy's `archived` gap, the quarterly content audit (due 2026-09-13), the quarterly schema review (no record), and continuity goal 2 (half true).

**The pattern:** every measure that is a *gate on a PR* holds, because CI runs it on every change. Every measure that depends on a *calendar* — weekly, monthly, quarterly, "30 days after issue" — is broken, because the automation that was supposed to carry it (`weekly.yml`, `monthly.yml`) has never completed a run and the one human-owned cadence (broken-link fixes) has no owner loop behind it. `GOVERNANCE.md`'s Quality SLAs table is, today, a description of intent rather than of behaviour.

## What would restore them, in order

1. **Enable "Allow GitHub Actions to create and approve pull requests"** (Settings → Actions → General) and create the labels `automation`, `weekly-refresh`, `monthly-digest`. This single change reactivates A2, A5, A6, A7, A8 — five of the eleven broken measures — and starts refreshing `github-cache.json`, the stale report, and the digest.
2. **Turn on branch protection** per `docs/policies/branch-protection.md` (C3), which also makes the 72-hour review SLA (B6) enforceable instead of voluntary.
3. **Decide the review-cadence policy before the wave lands.** Either re-baseline `last_reviewed` honestly (it is currently a creation stamp on 1,061 entries) or accept that `data/stale-report.json` goes from 0 to ~338 entries in September and ~1,061 by November, and pre-plan the burn-down. Merging drafts #87/#88/#89 (−1,531 lines, ~217 findings) is the highest-value first step and shrinks the baseline for the first time in 40 days.
4. **Fix or delete the measures that have no implementation:** `stale-bot` (either wire `check-stale.js` into an issue-filing step, as `create-link-issues.js` already does for links, or remove the claim), Dependabot (C2), and Scorecard (C5).
5. **Regenerate the stale artifacts:** `docs/reports/content-debt-report.md` (815 → 602) via `pnpm run report:debt`, plus the documentation table in section D.
6. **Close the three broken-link issues** (#85/#86 are 31 days past their stated 7-day SLA) and add the quarterly content audit (B8) to the calendar — it falls due 2026-09-13.

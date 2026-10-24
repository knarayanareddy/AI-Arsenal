# AI Arsenal — End-to-End Review (2026-10-24)

**Reviewed at:** commit `a8583d8` (`main`, PR #114 "daily curation 2026-10-24")
**Reviewer:** Arena agent on branch `arena/89c86567-ai-arsenal`
**Method:** full local execution of the repository's own pipeline (install → unit tests → every validator → generators → scaffold probes → web build) plus live GitHub API inspection of workflow runs, check annotations, PR state and published branches. Every number below comes from a command run during this review; commands are listed in [Method](#method).

---

## Verdict

`main` is **red on every content gate and has been merged red**. The strongest single fact is that one YAML formatting mistake aborted the *entire* pipeline — all five validators, all nine migration checkers and three unit tests died with the same `YAMLException` stack trace — and it was merged anyway with failing checks, zero reviews, and no branch protection.

That has already happened once before, and the cost is measurable. A single unquoted `": "` in `content/tools/pageindex.md` entered `main` on **2026-10-01** in PR #100 (merged with 6 of 8 checks red and 0 reviews) and stayed there. From that day, **every scheduled maintenance workflow stopped working**: the daily `data-release` publish has failed 24 consecutive times, the monthly digest job died at its first step, and the published API has been frozen at 2026-09-30. Today's PR #114 reproduced the same mistake four more times.

Underneath that accident sits a structural problem: **43 tool entries (16 % of the tools vertical) were written in a retired v1 format and never migrated**. They account for *every* schema, taxonomy, structure and editorial error in the catalogue, they collide with 14 project entries on `id`, and they make `generate:all` fail the data contract. Because the tools migration checker only looks at entries already in a phase folder, it reports "261/261 (100%) — all tool entries fully migrated" while those 43 files sit in the repository root of `content/tools/`.

The content that *has* been through the burn-down is genuinely good, and the security engineering is still the best part of the repo. The maintenance loop is not: all five scheduled workflows fail, the committed data layer is 26 days stale, the published `data-release` branch is 24 days stale, the deployed site serves a hand-copied snapshot, and 81 % of the catalogue is past its own 90-day freshness threshold while `data/stale-report.json` reports `stale_count: 0`.

| Area | Status | Evidence |
|---|---|---|
| `pnpm test` | ✅ 290/290 | 289 at HEAD + 1 new guard added in this branch |
| `validate` (schema) | ❌ 568 errors | all 43 legacy tool files, 0 elsewhere |
| `validate:taxonomy` | ❌ 490 errors | same 43 files |
| `validate:structure` | ❌ 344 errors | same 43 files |
| `validate:editorial:all` | ❌ 516 findings | same 43 files (baseline is empty, so fully strict) |
| `check:duplicates` | ❌ 14 duplicate ids | project ↔ legacy tool pairs |
| `validate:paths` / `validate:refs` / `validate:internal-links` | ✅ pass | 1,311 entries; 7,678 relative links resolve |
| `generate:all` | ❌ exit 1 | 44 data-contract errors; also dirties 40+ tracked files |
| `check:tool-facets` | ❌ crash | `TypeError: (d.stack ?? []).join is not a function` |
| `check:stale` | ❌ crash | `TypeError: dateString.split is not a function` |
| PR gate | ❌ bypassed | PR #114 merged with 4 failing checks, 0 reviews; 8/8 recent PRs have `reviewDecision: ""` |
| Branch protection | ❌ none readable | `rulesets → []`, `branches/main/protection → 403`; policy doc requires both |
| Scheduled automation | ❌ broken | weekly 19/19 fail (never succeeded), monthly 4/4, scorecard 19/19, data-refresh 24 consecutive failures since 2026-10-01 |
| Committed `data/*.json` | ❌ 26 days stale | `generated_at: 2026-09-28`, `total: 1254` vs 1,311 entries on disk |
| `data-release` branch | ❌ 24 days stale | last publish 2026-09-30; the regression is reproducible at commit `d00bfe6` |
| `gh-pages` deploy | ⚠️ 15 days stale | last deploy 2026-10-09; `web/public/data` is a separate, unsynced copy |
| Content freshness | ❌ 81 % stale | 1,061 of 1,311 entries > 90 days; `stale-report.json` says 0 |
| Docs accuracy | ❌ drifted | README/AGENTS.md/llms.txt/mcp.json/`skill.md` all disagree with the data |

---

## Method

Executed from the repo root on a clean checkout of `main`:

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm run validate / validate:taxonomy / validate:structure / validate:paths / validate:refs
pnpm run validate:internal-links
pnpm run validate:editorial:all
pnpm run check:duplicates / check:tool-facets / check:tools-by-job / check:stale
pnpm run migration:enforce + migration:{projects,research,tips,build-examples,architectures,observability,community,benchmarks,trending}:enforce
pnpm run generate              # then generate:all (fails) then revert
node scripts/scaffold.js --type=tool ...   # probe, deleted afterwards
cd web && npm ci && npm run build          # succeeds
gh run list / gh api .../jobs / .../annotations / gh pr view 114
```

**Not verifiable from this sandbox** (stated so it is not read as a pass):

- **Outbound link checks.** Only `github.com`, `api.github.com`, `registry.npmjs.org`, `pypi.org` are reachable; `fetch()` to `api.github.com` also fails because egress is proxied through `gh`. `pnpm run check:links` was not run. The last committed report (`data/link-check-report.json`, 2026-09-30) lists **13 confirmed-broken URLs** still present in content.
- **Actions job logs.** `results-receiver.actions.githubusercontent.com` is unreachable; failure causes come from check-run *annotations* (which do resolve) and from reproducing the failing step locally.
- **Classic branch protection.** `GET /branches/main/protection` → `403 Resource not accessible by integration`. The empty `rulesets` list and the merge history are the evidence used instead.

---

## What is working well (verified)

1. **The security toolchain is real.** `scripts/utils/network-guard.js` resolves every hostname, rejects loopback/link-local/CGNAT/ULA, and pins `lookup` to defeat DNS rebinding; `scripts/utils/html-sanitizer.js` uses an explicit `sanitize-html` allowlist with per-tag scheme rules; `safe-matter.js` caps frontmatter at 64 KB and rejects anchors/aliases/merge keys with the js-yaml 4 engine forced by a pnpm override. No `execSync`, `eval` or `new Function` anywhere in `scripts/`. `tests/safe-matter.test.js` and `tests/network-guard.test.js` cover these.
2. **Internal link validation now exists and passes.** `validate-internal-links.js` resolves 7,678 relative links across 1,406 files — the gap the 2026-09-03 review called out is closed.
3. **The editors' ratchet is at zero debt.** `docs/editorial-baseline.json` is empty (`count: 0`), so the full-catalog editorial gate is fully strict: 516 findings and every one is a real defect, not suppressed debt.
4. **The web app builds clean** (`tsc && vite build`, 1510 modules, no errors) and is a real product surface, not a stub.
5. **Workflows other than Pages are SHA-pinned with least-privilege `permissions:`**, and `no-skip-ci.yml` is a genuinely useful control.
6. **Reviewed content remains strong where it was reviewed.** `content/tools/dx-and-tooling/cursor.md` is a good example: named trade-offs, `enrichment_status: draft`, and an honest "closed-source, cloud-bound" caveat.

---

## Findings

### P0 — One malformed YAML scalar takes down the entire toolchain

**Evidence.** At `HEAD`, `pnpm run validate` (and `.taxonomy`, `.structure`, `.paths`, `.refs`, all migration checkers, `check:stale`, `generate`) all abort with the identical trace:

```
YAMLException: bad indentation of a mapping entry (30:87)
  ... l aspects of agentic workflows: managing user OAuth tokens an ...
    at scripts/utils/safe-matter.js:47:17
```

Cause: a plain YAML scalar containing `": "`. Five files:

| File | Line | Field |
|---|---:|---|
| `content/tools/corsair.md` | 30 | `verdict_rationale` |
| `content/tools/gptme.md` | 7 | `description` |
| `content/tools/kirocrew.md` | 27 | `verdict_rationale` |
| `content/tools/mooncake.md` | 34 | `verdict_rationale` |
| `content/tools/pageindex.md` | 27 | `verdict_rationale` |

Four of these arrived in today's PR #114; `pageindex.md` has been broken since 2026-10-01 (see [P1](#p1--no-scheduled-workflow-succeeds-the-data-layer-and-the-published-api-are-stale)) and is the reason automation has been dead for 24 days. All five come from the same daily-curation pipeline, and `pageindex.md` proves that a defect introduced this way can survive on `main` indefinitely.

Three unit tests failed as collateral damage (`editorial-gate-hardening` ×2, `score-entry-candidates` ×1) because they shell out to validators that crashed.

**Worse than the bug is the detection gap.** Two of those tests (`specific technical prose does not trip the generic-praise rule`, `a real entry body produces no generic-praise finding`) are negative assertions: they assert *no finding*. A crashed validator emits no findings, so **they passed while the whole gate was dead**. That is how a red `main` can look green locally.

**Fixed in this branch.** Values quoted; `tests/catalogue-frontmatter.test.js` added — it parses every `content/**/*.md`, `templates/*.md` and `meta/**/*.md` with the same hardened engine and reports *all* unparseable files with line numbers in one run. Verified failing against the broken file and passing after the fix. `tests/editorial-gate-hardening.test.js` now requires the validator's run summary (`Full-catalog editorial validation: N findings`) before trusting an empty finding list, so a crash fails loudly instead of passing vacuously (verified in both directions).

**Still to do:** the validators themselves should catch per-file parse errors and continue, emitting `file: <reason>` for each bad file rather than an unhandled stack trace. A pipeline that dies on bad input cannot tell you what else is broken — which is exactly what happened here.

---

### P0 — 43 tool entries are in a retired v1 format, and the migration gate says 100 %

**Evidence.** `content/tools/*.md` (flat, next to the six phase folders) holds **43 entries**: `adk-go, adk-java, adk-python, agents-anywhere, ai-engineering-from-scratch, atomic-agent, autogpt, awesome-aitools, awesome-opensource-ai, axonhub, beeai-framework, copilotkit, corsair, db-gpt, docsgpt, dust, genkit, gptme, gpustack, harness-sdk, haystack, kirocrew, langchain, langgraph, langroid, lmcache, localai, mastra, mesh-llm, mooncake, omnigent, open-swe, openagents, openui, optillm, oumi, pageindex, reef, ruby-llm, runanywhere-sdks, screenpipe, sglang, txtai`.

They are not legacy artefacts from an old layout; they are the **current output of the daily-curation pipeline**, accumulating. Checked out at `e46d954` (2026-09-30) the flat set was 3 files (`autogpt`, `langgraph`, `localai`); at `d00bfe6` (2026-10-01) it was 6; today it is 43. Each daily curation PR adds a few more, and nothing rejects them — the pipeline that writes them is the same one that wrote the unquoted colon that killed automation.

Every single schema, taxonomy, structure and editorial failure in the catalogue comes from these 43 files — verified by collapsing each validator's output to unique file names; the sets are exactly equal:

```
validate          568 errors  → 43 files, 0 others
validate:taxonomy 490 errors  → 43 files, 0 others
validate:structure 344 errors → 43 files, 0 others
validate:editorial 516 findings → 43 files, 0 others
```

They are v1 records vs the v2 contract (`content/tools/dx-and-tooling/cursor.md` as reference):

| Field | These 43 files | Schema v2 |
|---|---|---|
| `job` | free-text sentence (`"High-performance inference engine and programming language for LLMs and VLMs"`) | taxonomy enum array (`[prototyping]`) |
| `stack` | comma string (`"Python, PyTorch, Hugging Face Transformers"`) or even `stack: Python` | array of taxonomy values |
| `audience` | free text (`"AI Engineers and Local Agent Developers"`) | enum (`prototype`/`production`/`research`) |
| `best_when` / `avoid_when` | single string | array of strings |
| dates | unquoted → parsed as `Date` objects (86 fields) | quoted ISO strings |
| body | 4 sections (`Overview`, `Why It's in the Arsenal`, `Key Features`, `Trade-offs`) | 11 sections, incl. `Architecture / How It Works`, `Getting Started`, `Use Cases`, `Strengths`, `Limitations / When NOT to Use`, `Integration Patterns`, `Resources`, `Buzz & Reception` |

**The gate that should have caught this cannot see it.** `scripts/check-migration-progress.js` computes `folderPhase = entry.file.split('/')[2]`, then:

```js
const phaseFolderMismatch = entry.data.phase && VALID_PHASES.has(folderPhase) && entry.data.phase !== folderPhase;
```

For a flat file, `folderPhase` is the *filename*, which is never in `VALID_PHASES`, so the mismatch check is skipped. The entry is counted as migrated as long as the fields exist. Hence:

```
Tools migration progress: 261/261 (100%)
All tool entries are fully migrated to the phase-folder model.   exit 0
```

`validate:paths` also passes for flat tool files, so no gate checks the documented destination (`content/tools/{phase}/{id}.md` per `AGENT.md`).

**Knock-on failures**, all traced to these files:
- `check:duplicates` → 14 duplicate ids (see next finding).
- `check:tool-facets` → hard crash `(d.stack ?? []).join is not a function` (12 entries have a string `stack`).
- `check:stale` → hard crash `dateString.split is not a function` (unquoted dates reach `date-fns` `parseISO`). This is why the monthly job's "Check stale entries" never runs.
- `generate:all` → exit 1, 44 data-contract errors.

**Fix.** Decide per entry whether it should exist at all; for the 14 that duplicate a project entry, keep one canonical record and turn the other into a redirect-free cross-reference (or delete it). Then run the same v2 rewrite the other 261 tools already have (`phase` folder, enum `job`/`audience`, array `stack`/`best_when`/`avoid_when`, quoted dates, 11 body sections). Finally, fix `check-migration-progress.js` so a flat `content/tools/{id}.md` path counts as **unmigrated**:

```js
const inPhaseFolder = VALID_PHASES.has(folderPhase);
if (!inPhaseFolder) pending.push(record);   // flat/by-job = unmigrated
```

and add a `validate:structure` rule that rejects tool entries outside `content/tools/{phase}/`.

---

### P0 — `main` merges with failing checks and no review

**Evidence.** PR #114 (merged 2026-10-24T12:04Z):

```
Fast Changed-File Validation           FAILURE
Full-Catalog Editorial (baseline-gated) FAILURE
Global Invariants                      FAILURE
Unit Tests (including script/schema)   FAILURE
Validate Generated Data Contract       FAILURE
No-Skip-CI Enforcement                 CANCELLED
CodeQL / Check New/Modified Links      SUCCESS
reviewDecision: ""   reviews: 0
```

The last eight merged PRs (#106–114) all show `reviewDecision: ""`. `GET /rulesets` returns `[]`; `/branches/main/protection` is not readable by this token. `docs/policies/branch-protection.md` mandates required checks and Code Owner review; `.github/CODEOWNERS` asserts the same. Neither is in force.

**Secondary defect in the policy itself.** The policy names required checks as `validate-changed-content`, `validate-global-invariants`, `validate-data-contract`, `check-links` — those are *job ids* in `on-pr.yml`. GitHub matches required checks on the job **display name** (`Fast Changed-File Validation`, `Global Invariants`, `Validate Generated Data Contract`, `Check New/Modified Links`, …). Configuring the policy verbatim would require checks that never report. The policy also predates the `unit-tests` and `validate-editorial-full` jobs.

**Fix.** Turn on protection with the five job display names (all six, including `Unit Tests` and `Full-Catalog Editorial`), require ≥1 Code Owner review, and note that the weekly curation PR must then actually pass — which it cannot until the 43 entries are handled. For the curation bot specifically, gate it on the same checks rather than exempting it.

---

### P1 — No scheduled workflow succeeds; the data layer and the published API are stale

**Evidence** (workflow history via `gh run list` / `gh api`):

| Workflow | Schedule | Result | Failing step |
|---|---|---|---|
| `weekly.yml` | weekly | 19/19 failure (never succeeded) | `Update GitHub stars` |
| `monthly.yml` | monthly | 4/4 failure (every run since Jul) | `Generate data` (latest) |
| `scorecard.yml` | weekly | 19/19 failure | `Pull gcr.io/openssf/scorecard-action:v2.4.0` |
| `data-refresh.yml` | **daily** | 42/133 all-time, but **24 consecutive failures since 2026-10-01**; last success 2026-09-30 | `Update GitHub stars` |
| `deploy-pages.yml` | on `data/**`, `web/**` | last success 2026-10-09 (runs only when those paths change) | — |

**Root cause of the Oct 1 break, reproduced.** I checked out `d00bfe6` — the `chore: daily curation (2026-10-01)` commit merged as PR #100 — installed the pinned dependencies and ran the job's first step:

```
$ git log -1 --oneline
d00bfe6 chore: daily curation (2026-10-01)
$ node scripts/generate-data.js
YAMLException: bad indentation of a mapping entry (27:87)
  ...
```

A sweep of that commit finds exactly one unparseable file:

```
content/tools/pageindex.md:27 -- bad indentation of a mapping entry
```

i.e. `verdict_rationale: PageIndex addresses a critical bottleneck in traditional RAG pipelines: the loss ...` — a plain scalar containing `": "`. Because `generate-data.js`, `update-star-counts.js` and every validator parse the whole catalogue up front, that one line is enough. PR #100 was merged at 15:03Z with **6 of its 8 checks failing and `reviewDecision: ""`**; the monthly job failed at 16:48Z the same day, and every daily publish since has failed. The file is still on `main` today, unchanged, and this branch quotes it.

Consequences, all verifiable in the tree:

- `data/stats.json`: `generated_at: 2026-09-28`, `total: 1254`. On disk: **1,311** entries. `data/index.json` also has 1,254.
- `data/tools.json` holds 218 tool records; the catalogue has 261.
- `data/github-cache.json`: **30 repos, all `checked_at` 2026-06-13**, against 506 project entries with a `github_url`. Every star count, `last_commit`, archived flag and trending score in the catalogue is a June snapshot.
- `data/stale-report.json`: `generated_at: 2026-06-13`, `stale_count: 0`. Reality: **1,061 of 1,311 entries (81 %) are >90 days old**; age buckets `{0-30: 234, 31-60: 16, 91-180: 1,061}`.
- `data/link-check-report.json`: 2026-09-30, `broken: 13` — never re-run and never filed as issues.
- `data-release` branch: last commit 2026-09-30, so **external consumers of the published API have been reading a 24-day-old catalogue**.
- `gh-pages`: last deploy 2026-10-09, and the deployed data comes from `web/public/data/`, a committed copy that nothing regenerates (`grep -rn "web/public/data" scripts .github` → nothing). It is structurally stale: `projects.json` 1.39 MB vs 6.88 MB in `data/`, `guides.json` 46 KB vs 786 KB.

The `Update GitHub stars` step is the single most consequential failure. Locally, with no network, it exits **0** and reports `Checked 506, updated 0, skipped 511` — every failure is swallowed as a per-repo warning. So even when CI goes green again, this step could silently refresh nothing. It needs a fail-fast guard (e.g. abort when >50 % of fetches fail) and the `previous === 0` velocity bug fixed (`github_stars_last_30d` currently equals total stars on first fetch, inflating trending scores — still present in `scripts/update-star-counts.js`).

`monthly.yml` fails earlier, at `Generate data` on the Oct 1 run — the same class of parse/format breakage, now reproducible locally as the v1-tool failures.

**Fix.** (1) Repair the star step and its fail-fast semantics. (2) Make `check:stale` robust to `Date` objects (or fix the 43 files, which removes the crash). (3) Add a freshness assertion to `on-merge.yml` — a `git diff --exit-code` over `data/`, `CONTEXT.md` and generated `_index.md`/`_registry.md` — so drift is a visible failure rather than a silent one. (4) Regenerate `web/public/data/` in the Pages workflow instead of committing a copy.

---

### P1 — `generate:all` fails, and the "auto-generated" README table is 250 entries behind

**Evidence.** `pnpm run generate:all` on `main` exits 1:

```
Data contract validation failed with 44 error(s):
- data/index.json: duplicate null:atomic-agent   (+13 more)
- data/index.json: entries must have globally unique type/id pairs
- data/search-index.json: duplicate null:atomic-agent (+13 more)
- data/search-index.json: pageindex type project does not match index type tool
- data/search-index.json: sglang type project does not match index type tool
- data/search-index.json: txtai type project does not match index type tool
```

Two defects in one line of output: (a) the data contract prints `duplicate null:<id>` because the index entry's `type` is not being interpolated — a diagnostic bug worth fixing since it hides which vertical collided; (b) the collision itself blocks the build.

`generate:readme-stats` reveals the documentation drift. The README claims its table is generated and must not be hand-edited — and it is wrong by 250 entries:

| Row | README (committed) | Actual content |
|---|---:|---:|
| Projects | 322 | **511** |
| Tools | 214 | **261** |
| Papers | 128 | **138** |
| Community | 32 | **33** |
| Build examples | 8 | **11** |
| Total | 1,061 | **1,311** |

The README also carries **two** identical stats tables — a hand-maintained block immediately followed by the `<!-- AUTO-GENERATED STATS TABLE -->` block, both stale.

**Fix.** Resolve the 14 id collisions, add a `validate:data` step to `on-pr.yml` after `generate` (or assert no diff), delete the hand-maintained README table, and fix the `duplicate null:` message to include the entry type.

---

### P1 — 14 duplicate ids across the project and tool verticals

**Evidence.** `check:duplicates` (exit 1) and the generated index agree on 14 pairs, e.g.:

```
langchain   content/projects/frameworks/langchain.md   +  content/tools/langchain.md
sglang      content/projects/inference-engines/sglang.md +  content/tools/sglang.md
pageindex   content/projects/data-and-retrieval/pageindex.md + content/tools/pageindex.md
```

Full set: `atomic-agent, autogpt, copilotkit, genkit, haystack, langchain, langgraph, localai, mastra, omnigent, oumi, pageindex, sglang, txtai` (all project ↔ flat tool).

This is a modelling conflict, not just a formatting one: `AGENT.md` presents "notable open-source project" and "product/tool" as separate verticals, but `check:duplicates` requires ids to be unique **catalogue-wide**, and `data/index.json` requires unique `type/id` pairs. Either the same entity gets one canonical record, or the id namespace must be per-vertical (`tool:langchain` / `project:langchain`) and every consumer updated.

**Recommendation:** one canonical record per entity. Projects are the richer record (GitHub metadata, stars, license); tools carry the purchasing/`verdict`/`cost_model` view. For the 14 overlaps, keep the project as canonical and either drop the tool entry or re-id it as the tool-side view (e.g. `langchain-platform`) with an explicit `related_entries` link. Whichever way, decide it once and encode it in the schema.

---

### P1 — The contributor scaffolder produces entries in the wrong place with the wrong values

**Evidence.** A non-interactive probe from `AGENTS.md`'s documented invocation:

```bash
node scripts/scaffold.js --type=tool --name="ZZ Probe Tool" --id="zz-probe-tool" \
  --github_username=reviewer --job=prototyping --phase=dx-and-tooling \
  --cost_model=open-source --maturity=beta --tags=agents
```

produces `✅ Created: content/tools/by-job/zz-probe-tool.md` with

```yaml
job: [evaluation]              # --job ignored
cost_model: "freemium"          # --cost_model ignored
maturity: "production"          # --maturity ignored
tags: [evaluation]              # --tags ignored
phase: "evaluation-and-observability"   # --phase ignored
```

Two defects: `scaffold.js:140` hardcodes `content/tools/by-job/${id}.md` (canonical is `content/tools/{phase}/`), and the tool branch never calls `ask()` for `job`/`cost_model`/`maturity`/`tags`/`phase`, so the flags are silently discarded and template defaults ship. A contributor following the docs writes an entry with a fabricated job, cost model, maturity and phase.

The probe passed `validate-schema`, `validate:structure` and `validate:paths`, and failed only the editorial gate — so this lands in the catalogue as "structurally valid but wrong".

**Fix.** Destination `content/tools/{phase}/${id}.md`, with `ask()` for every template field the flags advertise; add a scaffold test asserting `--job`/`--phase` reach the frontmatter and the path.

---

### P2 — Content-quality debt is visible in the shipped catalogue

**Evidence.**

- **81 % of entries are older than the repo's own 90-day freshness claim** (1,061/1,311), while the stale report says zero.
- **58.7 % are `enrichment_status: draft`** (770), 349 `reviewed`, 188 unset, **4 `verified`**.
- **11 tool entries use a GitHub *search* URL as their canonical product URL** — e.g. `content/tools/dx-and-tooling/honen.md` has `url: "https://github.com/search?q=honen.app"`, and the same pattern appears for `claude-artifact-player`, `dropstone-3`, `google-pomelli-2-0`, `shellmate`, `astra-autonomous-pentest`, `conan`, `spotlight-by-backplanes`, `cloudskill`, `agnt-hub`, `recursi`. These resolve with HTTP 200, so the link checker never flags them, but they are not the product's URL.
- **Template generation is still detectable in prose.** 36 entries contain the phrase "Beyond the marketing, …" and reproduce the `Architecture / How It Works` paragraph into `Strengths` verbatim; `honen.md` is an example where "Strengths" restates the architecture word for word and "Use Cases" is a generic three-step template ("Integrating X / Validating the choice / Deciding at all"). The editorial gate does not catch it because the paragraph is entry-specific (only the *scaffold* is shared), so the duplicate-paragraph rule never fires.
- Source generator: `scripts/populate-from-toolradar.js` hardcodes a newsletter-derived entry list whose body sections were template sentences, and whose `stack` defaults to `['python']` for every tool regardless of reality (a macOS dictation app is marked Python).

**Fix.** Delete or de-list the entries that cannot be verified (`url` = GitHub search → not a product page). Treat "prose parallel to the scaffold" as a finding type in the editorial gate (e.g. flag sections that restate another section of the same entry above a similarity threshold). Retire `populate-from-toolradar.js` — it is a one-off backfill referenced by nothing in `package.json` or any workflow.

---

### P2 — The `web/` application contradicts the repository's own documentation

**Evidence.**

- `AGENTS.md`: "This repository … **has no web UI or long-running server**"; "There is no server to run and no ports to expose."
- `README.md`: "⏳ Web UI belongs in a separate future repository consuming `/data/*.json`".
- Reality: `web/` is a full React + Vite + Tailwind application that builds successfully, is deployed to `gh-pages` by `.github/workflows/deploy-pages.yml`, and reads `./data/*.json` from its own `public/` directory.

Additional inconsistencies in the same area:

- `web/public/data/` is a **committed, unsynced duplicate** of `data/` (nothing in `scripts/`, `package.json` or workflows writes it), so the live site shows a frozen snapshot.
- `web/public/llms.txt`, `web/public/mcp.json` and `web/public/skill.md` hardcode `1,254 entries / 500 projects / 218 tools` — and nothing generates them (`grep -rn "llms.txt|mcp.json|skill.md" scripts .github` → empty).
- `deploy-pages.yml` is the **only** workflow that uses mutable action tags (`actions/checkout@v4`, `actions/setup-node@v4`) instead of pinned SHAs, and it `git push --force`s a branch — inconsistent with the pinning and least-privilege posture everywhere else.
- `data/migration-progress.json` is generated by `migration:enforce` but is git-ignored (`!! data/migration-progress.json`), while sibling reports are committed — pick one policy.

**Fix.** Make the docs match reality (the web app exists and is the primary consumer), or move it out. Generate `llms.txt`/`mcp.json`/`skill.md` from `data/`, sync `web/public/data/` inside the Pages workflow, and pin the two actions.

---

### P2 — `check:stale` and `check:tool-facets` crash instead of reporting

Both failures are cheap to make impossible:

- `scripts/check-stale.js:17` passes whatever YAML produced to `parseISO`; `parseISO(2026-10-03T00:00:00Z as Date)` throws instead of returning an invalid date, so the `invalid` accumulator at line 18 is unreachable for this input class. Coerce/validate the type first and push to `invalid_dates` (the report schema already has that field, and `--fail` exists for it).
- `scripts/generate-tool-facet-guides.js:65` calls `(d.stack ?? []).join(', ')`; `stack` is a string in 12 entries. `Array.isArray(d.stack) ? d.stack : String(d.stack ?? '').split(',')` or, better, let the schema be the single source of truth and fail *before* generation.

Neither script has a unit test (`tests/` covers 16 of 63 scripts), which is why a hard crash in a CI-only path survived.

---

### P3 — Local `validate:changed` validates nothing (documented as an untracked-file caveat, but broader)

`scripts/utils/changed-files.js` diffs `${base}...HEAD`, i.e. **committed** changes only. With five modified-but-uncommitted content files, all five changed-file validators report:

```
Schema validation passed. Checked 0 content entries.
...
Editorial quality validation passed for 0 changed entries.
```

`README.md` and `CONTRIBUTING.md` both tell contributors to run `pnpm run validate:changed` before opening a PR — at that point in their workflow it checks nothing. `AGENTS.md` documents the untracked-file case only. Either include the working tree (`git diff --name-only` plus `git ls-files --others --exclude-standard` when not strict) or state the requirement plainly: commit first.

---

### P3 — Documentation and metadata drift

| Artifact | Claim | Reality |
|---|---|---|
| `README.md` | stats table (auto-generated) | 1,061 vs 1,311; duplicates a hand-written copy |
| `README.md` | workflow table | omits `deploy-pages.yml`, `release.yml`, `no-skip-ci.yml`, `codeql.yml` |
| `AGENTS.md` | "no web UI"; "no ports to expose" | `web/` builds and deploys |
| `CONTEXT.md` | `Entries: 1254`, `Generated: 2026-09-28` | 1,311 entries |
| `web/public/llms.txt`, `mcp.json`, `skill.md` | 1,254 / 500 / 218 | 1,311 / 511 / 261 and not generated |
| `PROGRESS.md` | per-sprint "Complete" counts | hand-maintained, predates the current counts |
| `.github/dependabot.yml` | labels `dependencies`, `npm`, `github-actions` | none exist (repo has 11 labels, none of these) |
| `weekly.yml`, `monthly.yml` | labels `automation`, `weekly-refresh`, `monthly-digest` | none exist — these PRs will fail at the label step once the earlier steps pass |
| `scorecard.yml` | comment: "Posts results as SARIF to the Security tab" | uploads an **artifact**, not SARIF; also fails before that at the image pull |
| `docs/policies/branch-protection.md` | required checks by job id | GitHub matches display names; two current jobs missing from the list |

Also: every workflow run carries the annotation *"Node.js 20 is deprecated … forced to run on Node.js 24"* for the pinned `actions/checkout`, `actions/setup-node` and `pnpm/action-setup` SHAs.

---

## What this branch changes

Deliberately narrow — only the defects whose fix is unambiguous and whose absence blocks every other diagnosis:

1. **`content/tools/{corsair,gptme,kirocrew,mooncake,pageindex}.md`** — quote the five scalars containing `": "`. This is what turns a stack-trace abort into a real error list.
2. **`tests/catalogue-frontmatter.test.js`** (new) — parses every content/template/meta Markdown file with the hardened engine and reports all failures with line numbers.
3. **`tests/editorial-gate-hardening.test.js`** — refuse to interpret a crashed validator as "no findings".

Result on this branch: `pnpm test` **290/290 pass**; the pipeline now reports its real debt (`568` schema, `490` taxonomy, `344` structure, `516` editorial, `14` duplicate ids) instead of dying.

Not changed here, because each needs an editorial or governance decision: the 43-entry migration or removal, the 14 duplicate-id resolution, the star-refresh/stale-report repairs, branch protection, and the data/web regeneration policy.

---

## Prioritized action plan

| # | Action | Effort | Unblocks |
|---|---|---|---|
| 1 | Merge the YAML fix + two test guards (this branch) | — | Every other diagnostic |
| 2 | **Gate the daily-curation pipeline on its own output**: run `validate`+`generate` against the generated PR *before* pushing, and block the merge on it. This is the upstream cause of both the 24-day automation outage and the 43 v1 entries | 3 h | Everything below stops regressing |
| 3 | Fix `check-migration-progress.js` so flat `content/tools/*.md` counts as unmigrated; add a structure rule for the canonical tool path | 30 min | Visibility on 43 entries |
| 4 | Resolve the 43 legacy tool entries: decide project-vs-tool canonical form for the 14 duplicates, then migrate or delete the rest | 1–2 days | schema/taxonomy/structure/editorial/`generate:all`/`check:stale`/`check:tool-facets` |
| 5 | Turn on branch protection with the six **display-name** checks and Code Owner review; fix the policy doc | 15 min | Governance; stops red merges |
| 6 | Fix the star-refresh step: fail-fast on mass failure, `previous === 0` velocity bug, verify with `workflow_dispatch` | 2 h | weekly + daily data-refresh; trending data |
| 7 | Add a freshness assertion to `on-merge.yml` (`git diff --exit-code` over `data/`, `CONTEXT.md`, generated indexes) | 30 min | Silent drift |
| 8 | Regenerate and commit `data/` + README stats; delete the duplicate hand-written README table | 1 h | Docs accuracy |
| 9 | Scaffolder: correct destination + honour `--job/--phase/--cost_model/--maturity/--tags`; add a test | 2 h | Contributor path |
| 10 | `check:stale` / `generate-tool-facet-guides` defensive typing + tests; make validators report per-file parse errors and continue | 3 h | Robustness of the whole gate |
| 11 | Sync `web/public/data/` in the Pages workflow, generate `llms.txt`/`mcp.json`/`skill.md`, pin the two mutable actions | 2 h | Live site accuracy |
| 12 | Content pass: replace the 11 `github.com/search` URLs, retire `populate-from-toolradar.js`, add a "section restates another section" rule | 1 day | Editorial credibility |
| 13 | Freshness programme: 1,061 entries past 90 days, 4 `verified` of 1,311 | ongoing | The "freshness as trust" pillar |

---

## Appendix — gate matrix at `HEAD` (before this branch)

| Command | Exit | Output |
|---|---:|---|
| `pnpm test` | 1 | 286 pass / **3 fail** (all cascade from the YAML breakage) |
| `pnpm run validate` | 1 | 568 errors, 56 warnings, 43 files |
| `pnpm run validate:taxonomy` | 1 | 490 errors, 43 files |
| `pnpm run validate:structure` | 1 | 344 errors, 43 files |
| `pnpm run validate:paths` | 0 | pass |
| `pnpm run validate:refs` | 0 | 1,311 entries |
| `pnpm run validate:internal-links` | 0 | 1,406 files, 7,678 links |
| `pnpm run validate:editorial:all` | 1 | 516 findings, 0 suppressed, 43 files |
| `pnpm run check:duplicates` | 1 | 14 duplicate ids |
| `pnpm run check:tool-facets` | 1 | `TypeError: (d.stack ?? []).join is not a function` |
| `pnpm run check:tools-by-job` | 0 | up to date |
| `pnpm run check:stale` | 1 | `TypeError: dateString.split is not a function` |
| `pnpm run validate:data` | 0 | 13 collections (committed data) |
| `pnpm run generate` | 0 | 1,311 entries |
| `pnpm run generate:all` | 1 | 44 data-contract errors |
| `pnpm run migration:enforce` | 0 | "261/261 (100%)" — **false** |
| `pnpm run migration:{projects,research,tips,build-examples,architectures,observability,community,benchmarks,trending}:enforce` | 0 | all pass |
| `pnpm run validate:semantic:all` | 0 | skipped (no API key) |
| `pnpm run validate:changed` | 0 | "Checked 0 content entries" |
| `cd web && npm run build` | 0 | 1,510 modules, no errors |

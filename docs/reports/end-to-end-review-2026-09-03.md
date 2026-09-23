# AI Arsenal — End-to-End Review (2026-09-03)

**Reviewed at:** commit `34db720` (branch `arena/01a0667d-ai-arsenal`, branched from `main`)
**Method:** local execution of the repository's own pipeline plus live GitHub API inspection. Every number below comes from a command run during this review; commands are listed in [Method](#method).

---

## Verdict

The engineering foundation is unusually strong for a content repo: schema-first entries, a real test suite, SSRF-hardened link checking, an editorial debt baseline with dedicated tests, pinned action SHAs, least-privilege workflow permissions. The content that has been through the "burn-down" process is genuinely good.

The problem is that **the maintenance loop is broken end to end**. All three scheduled maintenance workflows have *never* succeeded (weekly 12/12 failures, monthly 3/3, scorecard 12/12), `main` has no branch protection despite a policy document requiring it, PR #90 merged with failing CI and no review, and the committed `data/*.json` layer on `main` is 6 weeks behind the content it claims to represent. On top of that, **no part of the pipeline validates internal Markdown links**, and 46 of them are already broken.

| Area | Status | Evidence |
|---|---|---|
| Local CI (`pnpm run ci`) | ✅ Passes | exit 0; 231 tests pass; data contract OK for 13 collections |
| Content schema/taxonomy/structure integrity | ✅ Passes | 1,062 entries validated, 0 errors |
| Duplicate IDs / path conventions | ✅ Passes | `check:duplicates`, `validate:paths` clean |
| Scheduled maintenance automation | ❌ Never worked | weekly 12/12 fail, monthly 3/3 fail, scorecard 12/12 fail |
| Committed generated data on `main` | ❌ Stale | `generated_at: 2026-07-19`; missing the newest tool entry |
| Internal link integrity | ❌ Unvalidated | 46 broken relative links in `content/`; no validator covers them |
| Branch protection / required review | ❌ Not enforced | `branches/main → protected: false`, `rulesets → []` |
| Content freshness | ⚠️ Cliff ahead | 338 entries cross the 90-day stale threshold within 30 days |
| Trending / star metrics | ⚠️ Unreliable | cache frozen at 2026-06-13 with 30 repos; all 322 scores stale |
| Documentation accuracy | ⚠️ Drifted | README, AGENT.md, AGENTS.md, PROGRESS.md, CODEOWNERS all out of date |
| Test coverage of `scripts/` | ⚠️ Partial | 45 of 58 scripts have no matching test file |

---

## Method

Commands run locally in the checkout (all from the repo root):

```bash
pnpm install --prefer-offline          # 144 packages, lockfile up to date
pnpm test                              # 231 tests, 0 failures
pnpm run ci                            # exit 0
git status --porcelain                 # 32 modified files after generate:all
node scripts/report-content-debt.js    # 602 suppressed findings, enrichment mix
node scripts/check-stale.js            # "No stale entries found."
node scripts/check-duplicates.js       # clean, 1062 entries
node scripts/calculate-trending.js     # "Recalculated trending scores for 322 project entries."
node scripts/scaffold.js --type=tip|tool ...   # then re-ran every validator
node scripts/validate-{schema,taxonomy,structure,paths,references}.js
node scripts/validate-editorial-quality.js --all
node scripts/check-tool-facet-guides.js --enforce
node scripts/check-tools-by-job-tables.js --enforce
```

GitHub state inspected via `gh api` (workflow runs, check-run annotations, branches, labels, PRs, issues, `data-release` branch contents).

**Could not be verified here** (stated so it is not mistaken for a pass):

- **External link checking.** This sandbox only has egress to `github.com`, `api.github.com`, and `registry.npmjs.org` (e.g. `curl https://xiurouter.com` → `000`). `pnpm run check:links` was therefore not run; the link findings below are internal-path only.
- **GitHub Actions job logs.** The log blob hosts (`results-receiver.actions.githubusercontent.com`, `productionresultssa4.blob.core.windows.net`) are unreachable. Failure causes below come from check-run *annotations*, which did resolve.
- **Classic branch-protection settings.** `GET /branches/main/protection` → `403 Resource not accessible by integration`. The `protected: false` flag from `GET /branches/main` and the empty `rulesets` list were readable and are reported as such.
- **Scorecard root cause.** The failing step is identified, but its error text is only in the unreachable log.

The working tree was returned to a clean state (`git status --porcelain` → 0 entries) after all probing; scaffold probes were deleted.

---

## What is working well (verified, not assumed)

1. **The gate is real and green.** `pnpm run ci` exits 0 on a clean checkout: 231 unit tests pass, and `validate:data` reports *"Data contract validation passed for 13 collections."*
2. **The editorial baseline is the standout design.** `docs/editorial-baseline.json` suppresses exactly 602 pre-existing findings by fingerprint, fails on *new* findings, and fails on *stale* (already-resolved) entries. It has 12 dedicated tests in `tests/editorial-baseline.test.js`, including "a rename / path change does NOT inherit the old exemption". This is a ratchet that actually ratchets.
3. **Security posture in the toolchain is deliberate.** `scripts/check-links.js` uses an SSRF-hardened resolver (`assertPublicHostname`, pinned `lookup`, per-host call caps); `scripts/utils/html-sanitizer.js` uses an explicit `sanitize-html` allowlist rather than the removed `remark-html` option; `scripts/scaffold.js` refuses destinations outside `content/` and non-kebab-case filenames; `scripts/utils/cache-guard.js` rejects absurd star/fork values before they can poison the data layer; `update-star-counts.js` takes a file lock and requires `GITHUB_TOKEN` in CI.
4. **Workflows are pinned by SHA and least-privilege.** Every `uses:` is a commit SHA with a version comment, and `permissions:` defaults to `contents: read` with narrow job-level escalation.
5. **No shell injection surface.** The only `child_process` uses are `execFileSync`/`spawn` in 4 scripts; no `execSync`, no `eval`, no `new Function`.
6. **The curation process is honest about its own rejects.** `quarantine/2026-07-11/` preserves 92 rejected entries with a screening report (152 screened, 60 promoted after rewrite) and an explicit rule that structural validity is not promotion.
7. **Reviewed content is genuinely good.** `content/research/foundational/lewis-2020-rag.md` classifies the paper's own architecture as `practical_applicability: theoretical` and explains *why* production RAG abandoned joint training — opinionated, entry-specific analysis, not frontmatter restated.

---

## Findings

### P0 — The maintenance loop has never run successfully

**Evidence.** All three scheduled workflows have a 100 % failure rate across their entire history:

```
weekly.yml    {"failure": 12}      monthly.yml  {"failure": 3}      scorecard.yml {"failure": 12}
```

Failing steps, from check-run annotations on the latest runs:

| Workflow | Run | Failing step | Annotation |
|---|---|---|---|
| `weekly.yml` | 33416734360 (2026-08-31) | `Open batched weekly PR` | **"GitHub Actions is not permitted to create or approve pull requests."** |
| `monthly.yml` | 33519411263 (2026-09-01) | `Open batched monthly PR` | same message |
| `scorecard.yml` | 33385372493 (2026-08-31) | `Run Scorecard` | no annotation; log unreachable |

The bot branches *are* being pushed — `bot/weekly-refresh` head is `467b3b3` (2026-08-31) and `bot/monthly-digest` head is `fac5dd4` (2026-09-01) — so the failure is specifically the `pulls.create` API call inside `peter-evans/create-pull-request`, not the generation steps.

**Root cause.** Repository setting **Settings → Actions → General → Workflow permissions → "Allow GitHub Actions to create and approve pull requests"** is off. This is not fixable from inside the repo; it needs a maintainer click. Note this is orthogonal to the `permissions:` blocks in the workflow files, which are already correct (`contents: write`, `pull-requests: write`).

**Impact.** `weekly.yml` is the *only* mechanism that commits refreshed `data/*.json` back to `main` (its `add-paths` includes `data/*.json` and `CONTEXT.md`). Because it has never succeeded, `main`'s data layer has never been refreshed by automation — see P1 below. `monthly.yml` never produces a digest (only 1 digest exists, `content/digests/`), never refreshes `data/stats.json`, and never refreshes `data/stale-report.json` (committed copy: `2026-06-13T19:58:30Z`).

**Secondary defect.** Even with the setting fixed, the weekly PR will be needlessly huge: see [P2 — frontmatter churn](#p2--update-trending-rewrites-every-project-file-and-reformats-all-frontmatter).

**Fix.** Enable the setting, then run `workflow_dispatch` on `weekly.yml` once to confirm, and add the missing labels it applies (`automation`, `weekly-refresh`, `monthly-digest` — see [P3](#p3--label-and-codeowners-hygiene)).

---

### P1 — Committed `data/*.json` on `main` is stale, and nothing in CI detects it

**Evidence.** `pnpm run generate:all` on a clean checkout dirties **32 files** (`586 insertions(+), 429 deletions(-)`), including every collection JSON, `CONTEXT.md`, 13 `_index.md` files, and `content/tools/_registry.md`.

| Artifact on `main` | Value | Should be |
|---|---|---|
| `data/projects.json` `generated_at` | `2026-07-19T21:22:54Z` | today |
| `data/tools.json` items | **214** | **215** (missing `xiurouter`, merged 2026-08-30) |
| `data/index.json` entries | **1,061** | **1,062** |
| `CONTEXT.md` header | `Entries: 1061`, `Generated: 2026-07-19` | `Entries: 1062` |
| `content/tools/_registry.md` | no `xiurouter` row | one more row |
| `data/github-cache.json` `generated_at` | `2026-06-13T19:57:22Z`, **30 repos** | refreshed weekly |
| `data/link-check-report.json` | `2026-07-19`, `mode: changed-only`, 50 URLs | weekly full run |
| `data/stale-report.json` | `2026-06-13T19:58:30Z` | monthly |

Meanwhile the **`data-release` branch is current** (`chore(data): publish generated data release`, 2026-09-03, `stats.json` → `total: 1062, tools: 215`). So external consumers of the published API are fine; anyone reading `data/` on `main` — which is what `README.md`, `AGENT.md`, and `docs/data-api.md` all point readers at — is reading a 6-week-old snapshot.

**Why CI cannot catch it.** Neither `on-pr.yml` nor `on-merge.yml` asserts freshness: `grep -rn "git diff\|--exit-code\|git status" .github/workflows/` returns **nothing**. `on-merge.yml` regenerates and uploads an artifact, but never fails when the regenerated output differs from what is committed.

**Fix (two parts).**
1. Unblock the weekly PR (P0).
2. Add a freshness assertion to `on-merge.yml` so drift is visible instead of silent:
   ```yaml
   - name: Assert committed generated data matches content
     run: |
       git add -A data CONTEXT.md 'content/**/_index.md' 'content/**/_registry.md'
       git diff --cached --exit-code || { echo "::error::Committed generated data is stale"; exit 1; }
   ```
   (Run it as a non-blocking annotation first if a hard gate would be too noisy while the weekly PR is still blocked.)

---

### P1 — 46 broken internal links, and no validator covers internal links at all

**Evidence.** A relative-link resolution pass over all 1,157 `content/**/*.md` files (code fences and HTML comments stripped first) finds **46 broken links across 33 files**. Full list in [Appendix A](#appendix-a--46-broken-relative-links).

The gap is structural: `scripts/utils/markdown.js` `extractUrls()` matches only `https?://`:

```js
for (const match of markdown.matchAll(/\bhttps?:\/\/[^\s)>'"]+/g)) urls.add(cleanExtractedUrl(match[0]));
for (const match of markdown.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)) urls.add(cleanExtractedUrl(match[1]));
```

and `scripts/validate-references.js` only resolves *frontmatter ID* references (`alternatives`, `integrates_with`, `related_entries`, …), never body links. So relative links are checked by nothing: not `check:links`, not `validate:refs`, not `validate:structure`.

Breakdown by cause — 42 of the 46 are mechanical path corrections:

| Cause | Count | Evidence |
|---|---|---|
| `architectures/decision-trees/` renamed (→ `model-selection/`, `serving-patterns/`, `evaluation-strategy/`, `system-design/`, `data-strategy/`) | **20** | 6 tracked `content/tools/{phase}/_index.md` preambles all link `../../architectures/decision-trees/_index.md` |
| `tips-and-tricks/agent-engineering/` renamed → `agents-and-orchestration/` | **6** | `alert-on-tool-call-error-and-retry-rate.md` alone has 3; targets exist under the new folder (verified `content/tips-and-tricks/agents-and-orchestration/cap-agent-tool-retries.md`) |
| `content/trending/this-week.md` uses repo-root-relative paths without `.md` | **10** | `](content/projects/frameworks/dspy)` from a file inside `content/trending/` |
| Wrong folder, target exists elsewhere | **6** | `choose-memory-solution.md` ×2 (real: `architectures/system-design/`), `tau-bench.md` (real: `benchmarks/agents/`), `rag-vs-fine-tuning.md` linked under `model-selection/` (real: `system-design/`), `log-latency-by-pipeline-stage.md` linked under `tips-and-tricks/observability/` (real: `tips-and-tricks/debugging-and-observability/`), `radford-2021-clip.md` linked under `research/foundational/` (real: `research/architectures/`) |
| Target does not exist anywhere in the repo | **4** | `content/benchmarks/retrieval-rag/hotpotqa.md`, `content/observability/overview.md`, `content/observability/evaluation-pipelines.md`, `content/research/must-read-papers.md → papers/` |

14 of the 46 are inside generated/tracked `_index.md` files, so they are also shipped into `data/*.json` `body_html`.

**Fix.** Add `scripts/validate-internal-links.js` (resolve every non-`http(s)` link against the filesystem; fail on missing targets), wire it into `validate:all` and `on-pr.yml`, and fix the 46. The 20 `decision-trees/` links are one `sed` over the affected files; the 10 `this-week.md` links need `../../` prefixes and `.md` extensions; the 4 missing targets need an editorial decision (create the entry or drop the link).

---

### P1 — `main` is unprotected, and a PR merged with failing CI and no review

**Evidence.**

```
GET /branches/main      → {"protected": false}
GET /rulesets           → []
```

PR #90 (`feat(tools): add XiuRouter`, merged 2026-08-30 by `knarayanareddy`):

- `statusCheckRollup` contains exactly one entry: `CodeRabbit → SUCCESS`.
- `reviewDecision: ""` (no review).
- On its head commit `1a4d716`, all three check suites are `failure` — `PR Validation`, `No-Skip-CI Enforcement`, and `CodeQL` each ran and failed (workflow run list: `2026-08-30T06:04:32Z pull_request codex/add-xiurouter failure` ×3).

This directly contradicts `docs/policies/branch-protection.md`, which mandates required reviews from Code Owners plus four required status checks (`validate-changed-content`, `validate-global-invariants`, `validate-data-contract`, `check-links`), required conversation resolution, and linear history. `CODEOWNERS` reinforces this ("Branch protection in GitHub Settings must require at least one approving review"), but CODEOWNERS has no effect while protection is off.

To be fair to the content: the XiuRouter entry itself is well-written and appropriately hedged (`enrichment_status: draft`, `verdict: watching`, `reviewed_by: null`, explicit "independent production usage has not been reviewed"). The issue is the process, not the prose — but note this is a vendor-submitted entry for a closed-source commercial service that entered a curated catalog with no recorded human review while CI was red.

**Fix.** Apply the policy in `docs/policies/branch-protection.md` to `main` (at minimum: require PR, require Code Owner review, require the four named checks). Then re-run `PR Validation` on `main` to find out what actually failed on #90 — the check-run records for that commit are already empty via the API, so the cause is unrecoverable without a re-run; note that the same content passes `pnpm run ci` locally today, which points at the network-dependent `check-links` job rather than content.

---

### P2 — Freshness cliff: the whole catalog ages out next month

**Evidence.** `check-stale.js` currently reports *"No stale entries found."* — technically true, misleading in context. Review/added dates across all 1,062 entries:

```
2026-06: 143    2026-07: 918    2026-08: 1
age buckets (30d): {"0-29": 1, "30-59": 723, "60-89": 338}
```

With the default `--threshold=90`, **338 entries (32 % of the catalog) cross the stale threshold within the next 30 days**, and the rest follow in October. `1061` of `1062` entries carry an explicit `last_reviewed`, but they were bulk-stamped at authoring time — this is a creation date wearing a review field's name, so the stale report will fire on entries nobody ever claimed to have re-reviewed.

Reinforcing this: `data/github-cache.json` holds **30 repos, all fetched 2026-06-13**, against 537 entries with a `github_url`. Star counts, `last_commit`, and archived/disabled flags for the other ~500 repos have never been fetched.

There is also a real bug in the velocity calculation. `scripts/update-star-counts.js`:

```js
const previous = cache.repos[key]?.stars ?? parsed.data.github_stars ?? 0;
parsed.data.github_stars_last_30d = Math.max(0, current - previous);
```

On a first fetch with no cache entry and no pre-existing star count, `previous` is `0`, so a repo's *entire* star count is recorded as 30-day velocity. **9 projects currently carry `github_stars_last_30d === github_stars`**, e.g. `langchain: 139206`, `dspy: 35010`, `deepeval: 16140`. Feeding `139206` into `min(v/500*40, 40)` maxes the velocity term, which is why `langchain` sits at `trending_score: 70`.

**Fix.**
- Treat `previous === 0 && current > 0` as "no baseline" and leave `github_stars_last_30d` null/0 rather than equalling total stars.
- Re-baseline `last_reviewed` semantics: either rename the bulk-stamped field (`created`/`added_date` already exists) or accept the incoming wave and pre-plan the burn-down, because `data/stale-report.json` goes from 0 to ~338 entries in September.
- Unblocking `weekly.yml` (P0) is what actually refreshes the cache; until then every star-derived number in the catalog is a 2026-06-13 snapshot.

---

### P2 — `update:trending` rewrites every project file and reformats all frontmatter

**Evidence.** Running the real script:

```
$ node scripts/calculate-trending.js
Recalculated trending scores for 322 project entries.
$ git status --porcelain content | wc -l
336
$ git diff --stat content | tail -1
 336 files changed, 7953 insertions(+), 5914 deletions(-)
```

Two separate problems:

1. **All 322 committed scores are already wrong.** e.g. `content/projects/frameworks/langgraph.md`: `trending_score: 40` → `15`. The formula includes a `recencyBonus` that decays against `new Date()`, so scores drift continuously and every run touches every file.
2. **Serialization churn.** `calculate-trending.js`, `update-star-counts.js`, and `enrich-with-buzz-sources.js` write with gray-matter's `matter.stringify`, which re-dumps the entire frontmatter block. One integer change produces:
   ```diff
   -github_url: "https://github.com/langchain-ai/langgraph"
   +github_url: https://github.com/langchain-ai/langgraph
   -tags: [agents, orchestration, graphs, stateful, tool-use]
   +tags:
   +  - agents
   +  - orchestration
   -last_commit: "2026-06-13"
   +last_commit: '2026-06-13'
   ```
   The repo already has `scripts/utils/yaml-serializer.js` for exactly this, but only `migrate-tools-to-phases.js` and `populate-from-toolradar.js` use it.

Once `weekly.yml` is unblocked, its PR will carry ~8k lines of frontmatter noise for a handful of real value changes — which is precisely the "git history pollution" the automation policy says the batching exists to avoid.

**Fix.** Route all three scripts through `scripts/utils/yaml-serializer.js`, and consider dropping the date-relative `recencyBonus` from the *committed* score (or persisting `trending_as_of`) so the stored value is reproducible instead of churning daily.

---

### P2 — Editorial debt: 602 suppressed findings, 69 % of the catalog is `draft`

**Evidence.** `node scripts/report-content-debt.js`:

```
Editorial baseline: 602 suppressed findings
   201  tool-section-missing-technical-content
   189  repeated-paragraph
    81  section-too-short
    67  tool-section-length
    24  project-section-missing-technical-content
    21  research-section-missing-detail
     9  ecosystem-position-missing-comparison
     8  project-section-length
     2  best-for-avoid-if-scenarios

Enrichment status: 1062 entries (draft 69.2%)
   735  draft    167  reviewed    156  unset    4  verified
```

**Only 4 of 1,062 entries are `verified`.** For a repo whose stated pillar is "Freshness as trust — stale data is worse than no data", the ratio is the single biggest credibility risk. 17 files still ship the boilerplate placeholder *"See the project's official documentation (Resources below) for a runnable quickstart tailored to this framework's specific API"* (e.g. `content/projects/frameworks/crewai.md`, `dify.md`, `dspy.md`).

**The burn-down work already exists and is stalled.** Three draft PRs from 2026-08-03, untouched for a month:

| PR | Title | Files | Diff |
|---|---|---:|---|
| #87 | de-boilerplate agent-systems, data-and-retrieval, training-and-alignment | 45 | +73 / −430 |
| #88 | clear the research vertical (58 papers) | 59 | +72 / −498 |
| #89 | de-duplicate shared enrichment-status footers (86 tools) | 87 | +87 / −603 |

Together: **191 files, −1,531 lines**, ~217 baseline findings cleared. Precedent is established — the identical pattern was merged as #79–#84 in July.

**Fix.** Review and merge #87–#89 (they are net-deletion PRs against a baseline ratchet, so they are low-risk), then continue the vertical-by-vertical pattern that already worked.

---

### P3 — Scaffolder output cannot pass the repo's own CI, and tools land in the wrong directory

**Evidence.** I ran the real scaffolder and the real validators:

```
$ node scripts/scaffold.js --type=tool --name="Review Probe Tool" --id="review-probe-tool" --github_username="reviewer"
✅ Created: content/tools/by-job/review-probe-tool.md
```

- `validate-schema` / `validate-taxonomy` / `validate-structure` / `validate-paths` / `validate-references` all pass (`Checked 1064 content entries`).
- `validate-editorial-quality --all` → **exit 1**, with **16 findings** on the probe file alone (`section-too-short` ×9, `tool-section-length` ×4, `tool-section-missing-technical-content` ×3). None are in the baseline, so a scaffolded entry fails `pnpm run ci` until it is substantially rewritten.
- `check-tools-by-job-tables --enforce` → *"missing markers: content/tools/by-job/review-probe-tool.md"*; `check-tool-facet-guides --enforce` also fails.

The destination is the real bug: `scaffold.js` writes tools to `content/tools/by-job/${id}.md`, but `README.md` and `AGENT.md` both state that canonical tool entries live at `content/tools/{phase}/[id].md` and that `by-job/` holds curated shortlist pages. `validate-paths` accepts either, so nothing catches it.

Good news: the *tip* path is fine now. `AGENTS.md` still warns that "the tip template it emits is older than the current validators" and needs extra required frontmatter — **that is no longer true**; the scaffolded tip passed every structural validator unmodified (fixed by PR #77).

**Fix.** Change the tool destination to `content/tools/{phase}/${id}.md` with a `--phase=` prompt (mirroring the tip/paper branches), and document in `README.md`/`CONTRIBUTING.md` that scaffold output is a skeleton that must clear the editorial gate. Update or delete the stale warning in `AGENTS.md`.

---

### P3 — Documentation drift

| File | Claim | Reality |
|---|---|---|
| `README.md` (stats table) | Tools 214, Total 1,061 | 215 / 1,062 after regeneration |
| `README.md` (workflows table) | `data-refresh.yml` = "Batched generated-data refresh PR" | It publishes to the orphan `data-release` branch and opens no PR. `docs/automation-policy.md` describes this correctly; `README.md` is the one that is wrong |
| `README.md` (data API table) | 18 files listed | `data/digests.json` and `data/people.json` are tracked but missing from the table |
| `AGENT.md` | `→ /content/projects/[category]/` "Categories: agents, llms, rag, observability, multimodal, voice-audio, computer-vision, code-generation, data-pipelines, tooling" | Actual folders: `foundation-models, frameworks, inference-engines, agent-systems, data-and-retrieval, training-and-alignment, benchmarks-and-evals`. This is the agent routing map, so an agent following it 404s |
| `AGENT.md` footer | "Total content entries: 1061", "LAST UPDATED 2026-07-19" | 1,062 |
| `AGENTS.md` | "`pnpm test` (Node built-in `node:test`, **220 tests**)" | 231 tests pass |
| `AGENTS.md` | tip template drift warning | no longer reproducible |
| `PROGRESS.md` | "Trending ⏳ Queued 0/3", "Skills ✅ Complete 8/8", "Last Updated 2026-06-14" | 4 trend entries exist; `content/skills/` has 35 files |
| `CHANGELOG.md` | Still bootstrap-era `[Unreleased] → Phase 1 foundation scaffolding` | 90 PRs merged; `generate:changelog` exists but nothing maintains this file |
| `CODEOWNERS` | Owns `/content/projects/agents/`, `/llms/`, `/rag/`, `/observability/`, `/security/` | None of these paths exist post-migration (silently dead rules); `/content/projects/{foundation-models,frameworks,inference-engines,agent-systems,data-and-retrieval,training-and-alignment,benchmarks-and-evals}/` are unowned |
| `content/skills/` | — | A 35-file vertical absent from the README "How to Browse" table and from `PROGRESS.md` counts (its entries are typed `guide`, so they are counted inside the 59 guides) |

**Fix.** Have `generate-context.js` (or a small `generate-readme-stats.js`) own the README stats table and the AGENT.md footer count so they cannot drift, and do one editorial pass on `PROGRESS.md` / `CHANGELOG.md` / `CODEOWNERS`.

---

### P3 — Label and Actions hygiene

- **Missing labels.** The repo has only `broken-link, bug, documentation, duplicate, enhancement, good first issue, help wanted, invalid, needs-review, question, wontfix`. Referenced but absent: `automation`, `weekly-refresh` (`weekly.yml`), `monthly-digest` (`monthly.yml`), `dependencies`, `npm`, `github-actions` (`dependabot.yml`). `peter-evans/create-pull-request` applies labels *after* creating the PR, so these would surface as a second failure immediately after the permissions fix.
- **Node 20 deprecation.** Every workflow run carries the annotation: *"Node.js 20 is deprecated … being forced to run on Node.js 24: actions/checkout@…, actions/setup-node@…, peter-evans/create-pull-request@…, pnpm/action-setup@…"*. Re-pin the four actions to Node-24 releases (Dependabot's `github-actions` ecosystem is configured and will do this).
- **Scorecard has never succeeded** (12/12 failures at the `Run Scorecard` step, `ossf/scorecard-action@62b2cac7…` v2.4.0). The workflow comment promises "Posts results as SARIF to the Security tab and opens an issue on regressions" — neither is happening. Likely candidates worth checking in the log: the `branch_protection_rule` trigger combined with `publish_results: true`, or the missing `id-token` audience on that event. Unverified here (log host unreachable).
- **3 unresolved broken-link issues** (#91 `docs.openpipe.ai/introduction`, #86 `transformerlab.ai/docs/`, #85 `funaudiollm.github.io/`). All three URLs are still present in content (`content/tools/model-layer/openpipe-art.md`, `content/projects/training-and-alignment/transformerlab.md`, `content/projects/foundation-models/sensevoice.md`). Note the committed `data/link-check-report.json` predates all three and reports `broken: 0`.

---

### P4 — Repo hygiene

- **Test coverage of the toolchain is partial.** 45 of 58 `scripts/*.js` have no matching test file. The untested set includes every generator that produces the public data contract (`generate-data.js`, `generate-search-index.js`, `generate-context.js`, `generate-stats.js`, `generate-toc.js`) and every migration checker enforced in CI (`check-{architectures,benchmarks,build-examples,community,observability,projects,research,tips,trending}-migration-progress.js`). The 13 well-tested areas are exactly the ones that have bitten the project before (frontmatter, sanitization, network guard, cache guard, baseline) — the coverage is thoughtful, just incomplete.
- **Dead one-off scripts.** 14 scripts exist purely for completed migrations/backfills (`migrate-projects-*.js` ×6, `migrate-tools-to-phases.js`, `apply-*.js` ×3, `rename-project-type-field.js`, `fix-{project,tool}-link-paths.js`, `populate-from-toolradar.js`). They are referenced only from historical `docs/reports/*-completion-report.md` files, are not in `package.json` or any workflow, and sit behind CODEOWNERS review on `/scripts/`. Archive or delete.
- **Generated data is heavy and mostly redundant.** `data/` is 14 MB committed, against 6.4 MB of source Markdown. `body_html` + `body_text` alone are 62 % of `projects.json`, 66 % of `tools.json`, 65 % of `tips.json`, and **88 % of `guides.json`**. Every refresh rewrites all of it, which is what makes the batched-PR model necessary in the first place. Since `data-release` already serves external consumers from an orphan branch, consider dropping `body_html`/`body_text` from the `main` copies (or from `main` entirely) and letting `data-release` be the single source of rendered output.
- **`quarantine/` is 924 KB / 94 files** inside the shipped repo. It is well-documented, but it is also inert history; a tag or a release artifact would keep it out of every clone.

---

## Prioritized action plan

| # | Action | Effort | Unblocks |
|---|---|---|---|
| 1 | Enable *Settings → Actions → General → "Allow GitHub Actions to create and approve pull requests"*; create labels `automation`, `weekly-refresh`, `monthly-digest`; re-run `weekly.yml` via `workflow_dispatch` | 10 min | P0, P1 (data staleness), P2 (star cache) |
| 2 | Apply `docs/policies/branch-protection.md` to `main` (require PR, Code Owner review, 4 named checks) | 15 min | P1 (governance) |
| 3 | Fix the 46 broken internal links (20 are one `sed` for the `decision-trees/` rename, 10 are `this-week.md` path prefixes, 6 are wrong-folder paths) and add `validate-internal-links.js` to `validate:all` + `on-pr.yml` | 2–3 h | P1 (link rot) — and prevents recurrence |
| 4 | Route `calculate-trending.js` / `update-star-counts.js` / `enrich-with-buzz-sources.js` through `utils/yaml-serializer.js`; fix the `previous === 0` velocity bug | 2 h | P2 (churn + bad trending data) |
| 5 | Add a `git diff --exit-code` freshness assertion to `on-merge.yml` | 20 min | P1 (silent drift) |
| 6 | Review and merge draft PRs #87, #88, #89 (191 files, −1,531 lines, ~217 baseline findings) | 1–2 h | P2 (editorial debt) |
| 7 | Doc pass: README stats table + workflow table + data-API table, `AGENT.md` project categories + footer count, `AGENTS.md` test count and stale scaffold warning, `PROGRESS.md`, `CHANGELOG.md`, `CODEOWNERS` dead paths | 2 h | P3 |
| 8 | Fix scaffolder tool destination to `content/tools/{phase}/`; note the editorial gate in `CONTRIBUTING.md` | 1 h | P3 (contributor path) |
| 9 | Re-pin the four Node-20 actions; debug the Scorecard step | 1 h | P3 |
| 10 | Archive the 14 one-off migration scripts; add generator tests; decide on `body_html`/`body_text` in `main`'s `data/` | half-day | P4 |

---

## Appendix A — 46 broken relative links

```
content/architectures/data-strategy/choose-vector-db.md | ./choose-memory-solution.md
content/architectures/system-design/single-agent-vs-multi-agent.md | ../data-strategy/choose-memory-solution.md
content/benchmarks/retrieval-rag/ruler.md | ./hotpotqa.md
content/benchmarks/safety/agentharm.md | ./tau-bench.md
content/build-examples/agent-systems/starter-simple-react-agent.md | ../../architectures/decision-trees/choose-agent-framework.md
content/build-examples/rag-systems/advanced-self-correcting-rag.md | ../../architectures/decision-trees/rag-vs-fine-tuning.md
content/community/chat/llamaindex-discord.md | ../../architectures/model-selection/rag-vs-fine-tuning.md
content/observability/evaluation-quality/monitor-guardrail-trip-rate-in-production.md | ../../tips-and-tricks/agent-engineering/validate-tool-arguments-before-execution.md
content/observability/incident-response/runbook-for-model-provider-outage-and-failover.md | ../../tips-and-tricks/agent-engineering/define-fallbacks-for-tool-failures.md
content/observability/instrumentation/capture-context-window-utilization-and-truncation.md | ../../tips-and-tricks/agent-engineering/budget-context-before-adding-tools.md
content/observability/monitoring-alerting/alert-on-tool-call-error-and-retry-rate.md | ../../tips-and-tricks/agent-engineering/cap-agent-tool-retries.md
content/observability/monitoring-alerting/alert-on-tool-call-error-and-retry-rate.md | ../../tips-and-tricks/agent-engineering/define-fallbacks-for-tool-failures.md
content/observability/monitoring-alerting/alert-on-tool-call-error-and-retry-rate.md | ../../tips-and-tricks/agent-engineering/detect-repeated-tool-calls.md
content/observability/tracing/propagate-trace-context-across-services-and-streaming.md | ../../tips-and-tricks/observability/log-latency-by-pipeline-stage.md
content/projects/benchmarks-and-evals/_index.md | ../../architectures/decision-trees/choose-eval-framework.md
content/projects/benchmarks-and-evals/_index.md | ../../architectures/decision-trees/choose-observability-tool.md
content/projects/data-and-retrieval/_index.md | ../../architectures/decision-trees/choose-vector-db.md
content/projects/foundation-models/_index.md | ../../architectures/decision-trees/choose-llm.md
content/projects/frameworks/_index.md | ../../architectures/decision-trees/choose-agent-framework.md
content/projects/frameworks/_index.md | ../../architectures/decision-trees/rag-vs-fine-tuning.md
content/projects/inference-engines/_index.md | ../../architectures/decision-trees/choose-llm.md
content/projects/inference-engines/_index.md | ../../architectures/decision-trees/choose-deployment-target.md
content/research/architectures/rombach-2022-ldm.md | ../foundational/radford-2021-clip.md
content/research/must-read-papers.md | papers/
content/skills/core-concepts/embeddings.md | ../../architectures/decision-trees/choose-vector-db.md
content/skills/learning-paths/agent-builder.md | ../../architectures/decision-trees/choose-agent-framework.md
content/skills/learning-paths/ai-engineer.md | ../../observability/overview.md
content/skills/learning-paths/ai-engineer.md | ../../observability/evaluation-pipelines.md
content/skills/learning-paths/ml-engineer.md | ../../architectures/decision-trees/choose-llm.md
content/skills/learning-paths/ml-engineer.md | ../../architectures/decision-trees/choose-deployment-target.md
content/tools/data-ingestion/_index.md | ../../architectures/decision-trees/_index.md
content/tools/dx-and-tooling/_index.md | ../../architectures/decision-trees/_index.md
content/tools/evaluation-and-observability/_index.md | ../../architectures/decision-trees/_index.md
content/tools/model-layer/_index.md | ../../architectures/decision-trees/_index.md
content/tools/orchestration/_index.md | ../../architectures/decision-trees/_index.md
content/tools/serving-and-deployment/_index.md | ../../architectures/decision-trees/_index.md
content/trending/this-week.md | content/projects/benchmarks-and-evals/deepeval
content/trending/this-week.md | content/projects/frameworks/dspy
content/trending/this-week.md | content/projects/foundation-models/gemma
content/trending/this-week.md | content/projects/frameworks/langchain
content/trending/this-week.md | content/projects/foundation-models/phi-cookbook
content/trending/this-week.md | content/projects/frameworks/pydantic-ai
content/trending/this-week.md | content/projects/foundation-models/qwen
content/trending/this-week.md | content/projects/frameworks/semantic-kernel
content/trending/this-week.md | content/projects/data-and-retrieval/surrealdb
content/trending/this-week.md | content/projects/frameworks/microsoft-agent-framework
```

## Appendix B — Catalog snapshot at review time

```
1,062 entries: 322 projects, 215 tools, 171 tips, 128 papers, 59 guides, 52 benchmarks,
               32 community, 29 architectures, 25 people, 16 observability, 8 build examples,
               4 trends, 1 digest
1,157 content/**/*.md files (entries + _index/_registry navigation)
1,504 files in the repository; 9.0 MB content/, 14 MB data/
58 scripts, 28 test files, 231 passing tests
```

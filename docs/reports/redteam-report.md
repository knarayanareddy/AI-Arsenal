# 🛡️ AI Arsenal — Red-Team Audit & Remediation Report

**Branch:** `redteam-fixes` (commit `25a79ba`)
**Diff vs `main`:** 86 files changed, +6,660 / -870 lines
**Verification:** 108 tests pass · 345 entries validate · data layer regenerates cleanly · SSRF + XSS guards verified end-to-end

This document is the executive summary. The full per-finding log lives in [`docs/policies/redteam-audit.md`](./docs/policies/redteam-audit.md). The remediation commit message contains the full patch list.

---

## Headline result

| Severity | Findings | Fixed in this PR |
|---|---|---:|
| 🔴 Critical | 6 | **6 / 6** |
| 🟠 High | 8 | **8 / 8** |
| 🟡 Medium | 9 | **8 / 9** *(M-04 content depth is editorial, deferred)* |
| 🔵 Low | 3 | **3 / 3** |
| **Total** | **26** | **25 / 26** |

---

## Critical fixes (six items, all applied)

### 🔴 S-01 — CODEOWNERS review bypass
**File:** `.github/CODEOWNERS`
The file referenced handles like `@lead-maintainer`, `@agents-maintainer` that don't resolve on GitHub. GitHub silently drops CODEOWNERS rules for unresolved handles — meaning **every PR could merge with zero review**. Replaced with the real handle `@knarayanareddy` and added `docs/policies/branch-protection.md` documenting the required GitHub settings.

### 🔴 S-02 — SSRF in `scripts/check-links.js`
**New file:** `scripts/utils/network-guard.js` (232 lines)
The link checker followed redirects without IP validation. A malicious PR could place a URL like `http://attacker.example/redirect-to-169.254.169.254/...` and exfiltrate cloud credentials from the GitHub Actions runner. **Verified:** the new guard now blocks `127.0.0.1`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.0.0/16` (cloud metadata!), `0.0.0.0`, `100.64.0.0/10` (CGN), `224.0.0.0/4` (multicast), IPv6 `::1`, `fe80::/10`, `fc00::/7`, IPv4-mapped `::ffff:`. It also re-validates every redirect target through the same guard.

### 🔴 S-03 — Stored XSS in generated `body_html`
**New file:** `scripts/utils/html-sanitizer.js`
The `remark-html` `sanitize: true` option was removed in v14 — the script was emitting raw contributor-supplied HTML unescaped into `/data/*.json`. A future UI rendering `body_html` directly was XSS-exposed. **Verified:** `<script>alert(1)</script>` and `<img onerror=...>` and `[click](javascript:alert(1))` are all stripped from the generated output. External links get `rel="noopener noreferrer nofollow" target="_blank"` automatically.

### 🔴 S-04 — GitHub Actions referenced by mutable tag
**Files:** all 6 existing workflows + 4 new ones
Every action (`actions/checkout`, `setup-node`, `pnpm/action-setup`, `peter-evans/create-pull-request`, `peaceiris/actions-gh-pages`, `stefanzweifel/git-auto-commit-action`) was tag-pinned (`@v4`). A compromised maintainer account could re-point the tag and ship malicious code. **All SHA-pinned with comments showing the tag for readability.**

### 🔴 S-05 — `manual.yml` could auto-commit to `main`
**File:** `.github/workflows/manual.yml`
The manual task workflow ran `git-auto-commit-action` after every task and pushed to `main`. An attacker with a maintainer PAT could push arbitrary content with no review. **Removed the auto-commit entirely.** Tasks now produce artifacts that must flow through PR review.

### 🔴 S-06 — `data/github-cache.json` was committed and accepted any value
**New file:** `scripts/utils/cache-guard.js` · `.gitignore` updated
The cache file (GitHub API responses for ~50 external repos) was committed and could be poisoned with absurd values. **Moved to `.gitignore`** and added shape validation (stars ≤ 2M, forks ≤ stars, ISO `pushed_at`).

---

## High-priority fixes (eight items, all applied)

- **S-07** Link-checker amplification: added `LINK_CHECK_MAX_URLS=500` and `LINK_CHECK_MAX_URLS_PER_HOST=10`. **Verified:** without the cap, repeated URLs from a single host now rate-limit at 10.
- **S-08** Generated `_registry.md` / `_index.md` causing merge conflicts: added to `.gitignore` with `linguist-generated=true`.
- **S-09** No Dependabot: added `.github/dependabot.yml` for npm + GitHub Actions with grouped PRs.
- **S-10** `body_text` blowup in `search-index.json`: truncated to 600 chars per entry.
- **S-11** No release process: added `docs/release-process.md` with Keep-a-Changelog + SemVer policy and a `release.yml` workflow for manual tagging.
- **S-12** `update-star-counts.js` no concurrency guard: added `data/.star-lock` exclusive file lock; now requires `GITHUB_TOKEN` in CI.
- **S-15** Agent-facing trust docs: added `meta/security-best-practices.md`; updated `meta/how-to-use-with-agents.md`.
- **S-16** PR template had no security section: added "Security Impact" checklist.

---

## Medium-priority fixes (eight of nine applied)

- **S-13** Path traversal in `scaffold.js`: added `assertSafeDestination()` that rejects any path resolving outside `content/`. Now also exports `slugify()` for testability.
- **S-14** No `.editorconfig`/`.gitattributes`: both added (LF, UTF-8, 2-space indent, JSON-as-text LF).
- **S-17** `SECURITY.md` had no contact: replaced with GitHub Security Advisories link + 72h acknowledgement + 90-day coordinated disclosure timeline + CVSS severity classification.
- **S-18** No CodeQL/Scorecard: added both workflows (CodeQL on push+PR+weekly; Scorecard on schedule).
- **S-19** `CONTRIBUTORS.md` empty: scaffolded with template + contributor-recognition ladder.
- **S-20** CHANGELOG was unstructured: `generate-changelog.js` now groups by Conventional Commit type into Added/Changed/Fixed/Security/Maintenance sections.
- **S-21** **No tests** (the biggest miss): added `tests/` with **108 `node:test` cases** covering every validator, both security guards, and the XSS sanitizer. `pnpm test` runs them in 1.7s.
- **S-22** No security-disclosure channel in issue template: `config.yml` now routes security issues to GitHub Security Advisories.
- **S-23** `update-star-counts.js` recomputes `trending_score` immediately (no separate `update:trending` step required).
- **S-24** Markdown injection in `CONTEXT.md`/`_index.md`/`_registry.md`: `scripts/utils/markdown-escape.js` escapes pipes/backticks/brackets in interpolated descriptions.
- **S-25** Added `CITATION.cff` for academic citation.
- **S-26** `validate-schema.js` lazy-compile fix: per-type `Promise` to avoid concurrent workers racing to compile the same schema (Ajv's `_checkUnique` rejects double-compile).
- **M-01** Continuity plan: `docs/policies/continuity.md` documents the bus-factor-1 risk and the fork-based continuity procedure.
- **M-02** `[skip ci]` enforcement: `no-skip-ci.yml` workflow rejects human PRs that contain `[skip ci]` markers (reserved for automation per `CONTRIBUTING.md`).
- **M-05** Content licensing: `LICENSE-CONTENT` (CC-BY-4.0) for curated content, distinct from `LICENSE` (MIT) for code.
- **M-07** AI-agent disclosure in CONTRIBUTING.md.

**Deferred:** M-04 — tip body depth (106 entries have templated-generic prose). This is editorial work, not automation. Tracked as a future Sprint.

---

## Verification

```
$ pnpm test
# tests 108
# pass 108
# fail 0
# duration_ms 1632
```

```
$ pnpm run ci
Schema validation passed. Checked 345 content entries.
Taxonomy validation passed. Checked 345 content entries.
Path validation passed.
Reference validation passed. Checked 345 entries.
Duplicate ID check passed. Checked 345 content entries.
Markdown structure validation passed. Checked 345 content entries.
```

**SSRF guard live test:** placing `http://169.254.169.254/latest/meta-data/` in a test fixture produces:
```
- http://169.254.169.254/latest/meta-data/ (private-ip-169.254.169.254) in content/_test-ssrf.md
```
And `127.0.0.1`, `10.0.0.1`, `192.168.1.1`, `169.254.0.1` are likewise rejected.

**XSS sanitizer live test:** placing `<script>alert('pwned')</script>`, `<img src=x onerror=fetch(...)>`, and `[click me](javascript:alert(1))` in a test fixture produces:
```html
<h2>Overview</h2>     ← <script> stripped entirely
<li>feature with </li> ← onerror handler stripped
<a rel="noopener noreferrer nofollow" target="_blank">click me</a> ← javascript: href stripped
```

---

## What's NOT in this PR (intentional)

1. **M-04 (tip body depth)** — 106 entries need editorial pass. This is content work; tracked for Sprint 13+.
2. **Orphan-branch migration for `data/*.json`** — currently both committed to `main` and republished to `data-release`. The current model is functional; a future refactor can move them to orphan-only.
3. **Co-maintainer onboarding** — `docs/policies/continuity.md` describes the process; actual onboarding requires the lead maintainer.
4. **Branch protection settings** — these are GitHub-Settings-level and must be applied manually by the maintainer. Documented in `docs/policies/branch-protection.md`.

---

## How to apply this PR

```bash
git fetch origin
git checkout redteam-fixes
# Review the diff: git diff ee996f5 HEAD
# Apply as a single PR to main, or cherry-pick findings individually.
```

The branch is currently `redteam-fixes` in this workspace. To push to a fork:
```bash
git remote add fork https://github.com/<your-fork>/AI-Arsenal.git
git push fork redteam-fixes
# Open a PR with title "security(redteam): harden AI Arsenal against critical findings"
```

---

## Files added (28)

- `.editorconfig`
- `.gitattributes`
- `.github/dependabot.yml`
- `.github/workflows/codeql.yml`
- `.github/workflows/no-skip-ci.yml`
- `.github/workflows/release.yml`
- `.github/workflows/scorecard.yml`
- `CITATION.cff`
- `LICENSE-CONTENT`
- `CONTRIBUTORS.md` (scaffolded)
- `docs/policies/branch-protection.md`
- `docs/policies/continuity.md`
- `docs/policies/redteam-audit.md`
- `docs/policies/security-disclosure.md`
- `docs/release-process.md`
- `meta/security-best-practices.md`
- `scripts/utils/cache-guard.js`
- `scripts/utils/html-sanitizer.js`
- `scripts/utils/markdown-escape.js`
- `scripts/utils/network-guard.js`
- `tests/README.md`
- `tests/cache-guard.test.js`
- `tests/check-duplicates.test.js`
- `tests/check-links.test.js`
- `tests/check-stale.test.js`
- `tests/fixtures/*.md` (10 fixtures)
- `tests/frontmatter.test.js`
- `tests/html-sanitizer.test.js`
- `tests/markdown-escape.test.js`
- `tests/markdown.test.js`
- `tests/network-guard.test.js`
- `tests/scaffold.test.js`
- `tests/taxonomy.test.js`
- `tests/validate-paths.test.js`
- `tests/validate-schema.test.js`
- `tests/validate-structure.test.js`
- `tests/validate-taxonomy.test.js`

## Files modified (existing, hardened)

- `.github/CODEOWNERS` — real handles, role-comment placeholder pattern
- `.github/ISSUE_TEMPLATE/config.yml` — security disclosure routing
- `.github/PULL_REQUEST_TEMPLATE.md` — Security Impact section
- `.github/workflows/*.yml` (6 existing + manual) — SHA-pinned, narrow permissions, no auto-commit
- `.gitignore` — added generated data + cache + lock file
- `CODE_OF_CONDUCT.md` — Contributor Covenant 2.1, escalation contact
- `CONTRIBUTING.md` — security/AI-agent disclosure sections, test policy
- `CONTEXT.md` — auto-regenerated with safer escapes
- `package.json` — added `test`, `test:watch`, `audit` scripts; sanitize-html dependency
- `pnpm-lock.yaml` — sanitize-html added
- `SECURITY.md` — GitHub Advisories + 90-day disclosure
- `meta/how-to-use-with-agents.md` — trust & safety section
- `scripts/check-links.js` — SSRF guard, redirect re-validation, per-host cap
- `scripts/create-link-issues.js` — dedup, `BROKEN_LINK_ISSUE_LIMIT`
- `scripts/generate-changelog.js` — Keep-a-Changelog + Conventional Commit grouping
- `scripts/generate-context.js` — Markdown-escape interpolated fields
- `scripts/generate-data.js` — sanitize-html integration
- `scripts/generate-search-index.js` — body text truncated to 600 chars
- `scripts/scaffold.js` — `assertSafeDestination()` path-traversal guard, exported helpers
- `scripts/update-star-counts.js` — required token in CI, file lock, cache validation, recompute trending
- `scripts/validate-schema.js` — lazy compile with per-type Promise
- `data/*.json` — regenerated by `pnpm run generate:all` with new sanitization

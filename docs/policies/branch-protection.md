# Branch Protection Policy

This document specifies the GitHub branch protection rules that **must** be configured for `main` on `github.com/knarayanareddy/AI-Arsenal`.

These rules are not enforceable from within the repository; they must be set in GitHub → Settings → Branches → Branch protection rules → `main`.

## Required Rules for `main`

### 1. Require a pull request before merging

- ✅ Require a pull request before merging
- ✅ Dismiss stale pull request approvals when new commits are pushed
- ✅ Require review from Code Owners (uses `.github/CODEOWNERS`)
- Required approving reviews: **1** (minimum; raise to 2 once a co-maintainer exists)
- Require review from Code Owners: ✅

### 2. Require status checks before merging

- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- Required status checks (must pass):

  - `validate-changed-content` (from `on-pr.yml`)
  - `validate-global-invariants` (from `on-pr.yml`)
  - `validate-data-contract` (from `on-pr.yml`)
  - `check-links` (from `on-pr.yml`)

### 3. Require conversation resolution

- ✅ Require conversation resolution before merging (blocks merge if any review comment is unresolved)

### 4. Require linear history

- ✅ Require linear history (squash or rebase merges only)

### 5. Require signed commits (recommended)

- ✅ Require signed commits (once maintainers are comfortable with GPG signing)

### 6. Restrict who can push to `main`

- ✅ Restrict pushes that create matching branches: allowed for admins only
- ❌ Do **not** allow force pushes
- ❌ Do **not** allow branch deletion

### 7. Allow specified actors to bypass

- ✅ Allow the lead maintainer (@knarayanareddy) to bypass for emergency hotfixes
- All other actors: cannot bypass

## Workflow Restrictions

Additionally, configure **Settings → Actions → General**:

- ✅ Allow GitHub Actions to create and approve pull requests (for `peter-evans/create-pull-request`)
- ❌ Do **not** allow actions to write to `main` directly (this was the source of the `manual.yml` risk)
- Workflow permissions: **Read repository contents and packages permissions** (default restrictive)

## What CODEOWNERS Enforces

`.github/CODEOWNERS` lists every path. Each path must have **at least one real GitHub handle** — placeholder handles like `@lead-maintainer` are silently dropped by GitHub and create a review-bypass vulnerability.

## Verification

To verify these settings are correctly applied:

1. Open a PR from a non-maintainer account.
2. Attempt to merge.
3. Confirm: branch protection blocks merge until status checks pass and review is approved.

If merge succeeds without review, branch protection is misconfigured.

## Why This Matters

The repo's automation pipeline has `GITHUB_TOKEN` injected into workflows. Without branch protection, an attacker who compromises a single contributor PAT can:

- Push directly to `main`
- Bypass CI (if `[skip ci]` is allowed)
- Merge a PR without review

Branch protection is the **last line of defense** before CODEOWNERS, CI, and maintainer vigilance.

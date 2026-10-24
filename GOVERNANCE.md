# AI Arsenal Governance

## Roles

### Lead Maintainer / BDFL

- Final decision authority on architecture and direction.
- Merge authority for `/schemas/`, `/scripts/`, and `/.github/`.
- Resolves disputes and protects scope.

### Section Maintainers

- Review PRs for their section within 72 hours.
- Flag stale content and run monthly quality audits.
- Vote on cross-cutting changes.

### Contributors

- Submit PRs using templates.
- Report issues and stale content.
- Review others' PRs when helpful.

### Automation

Each item below names the script that actually implements it, so a reader can
verify the claim instead of trusting a bot name.

- Schema validation blocks invalid PRs — `scripts/validate-schema.js` via `on-pr.yml`.
- Link checking flags broken URLs and files issues — `scripts/check-links.js` and
  `scripts/create-link-issues.js` via `weekly.yml`.
- Star metrics are refreshed — `scripts/update-star-counts.js` via `weekly.yml`.
- Stale entries are flagged and issues are filed — `scripts/check-stale.js`
  (writes `data/stale-report.json`) and `scripts/create-stale-issues.js`
  (`pnpm run file:stale-issues`).
- Stale entries are triaged by severity — `scripts/triage-stale-entries.js`
  (`pnpm run triage:stale`) checks each entry's repository and separates
  defects (gone, archived, moved) from scheduling work, writing
  `data/freshness-triage.json` and `docs/freshness-worklist.md`. It measures
  only: bumping `last_reviewed` stays a human decision.
- Generated prose is rejected at the gate — `scripts/validate-editorial-quality.js`
  matches the sentence frames the bulk-authoring scripts produced, and
  `hosted-claim-contradicted` rejects a "no self-hosted path" claim against an
  entry whose own frontmatter says the artifact is open source or self-hostable.
  A changed file fails on every finding not already on record for it, so fixing
  one sentence in a legacy entry does not require re-authoring the rest of it,
  while a new entry inherits nothing and must pass in full. Pre-existing findings
  are listed in `docs/editorial-baseline.json` and reported by
  `scripts/audit-generated-prose.js` (`pnpm run audit:generated-prose`), which
  writes `docs/generated-prose-audit.md`. The baseline may only shrink.
- Status drift is measured separately from freshness — `scripts/audit-status-drift.js`
  (`pnpm run audit:status-drift`) compares each entry's `status` and
  `health_signals` against its own `last_commit`, using the candidate rubric's
  90-day and 180-day windows, and writes `docs/status-drift-audit.md`. A freshly
  reviewed entry can still describe a project that stopped moving a year ago;
  `check-stale.js` cannot see that, because it measures the review date. The
  worklist is a list of claims to re-check, not a bulk edit.
- Content generators are barred. A script may scaffold an entry for a human to
  write, but nothing may write prose or estimate `github_stars`, `last_commit`
  or `last_reviewed` into `content/`. The last generator to do so
  (`scripts/populate-from-toolradar.js`) is retired in
  `quarantine/2026-10-24/` with the evidence in its manifest.

Note: the weekly automation above depends on the repository setting
"Allow GitHub Actions to create and approve pull requests" being enabled, since
both the maintenance PR and issue creation are performed by `GITHUB_TOKEN`.

## Decision Process

| Type | Scope | Process |
|---|---|---|
| A | Specific content add/remove/update | Section maintainer approval |
| B | Schema change | Discussion, 72-hour comment period, lead maintainer decision |
| C | Taxonomy change | Discussion, 1-week comment period, lead + 2 maintainers agree |
| D | Architecture/repo/tooling change | RFC, 2-week discussion, non-binding vote, lead decision |
| E | Governance change | 4-week discussion and supermajority of maintainers |

## Quality SLAs

| Activity | Owner | Frequency | SLA |
|---|---|---|---|
| PR review | Section maintainer | Continuous | 72 hours |
| Broken link fix | Maintainers | Weekly | 7 days after issue |
| Stale entry update | Section maintainer | Monthly | 30 days |
| Star count refresh | Automation | Weekly | Automated |
| Full content audit | Lead maintainer | Quarterly | Quarterly |
| Schema version review | Lead maintainer | Quarterly | Quarterly |

## Deprecation Policy

Published entries are never deleted. When a tool or project becomes obsolete:

1. Set `status: deprecated`.
2. Add a deprecation notice to the top of the entry.
3. Document the reason.
4. Link alternatives.

The one exception is an entry that was never a valid editorial candidate —
out of scope for an AI engineering catalogue, or carrying metadata that cannot
be verified — reviewed and rejected after publication. Those move to
`quarantine/<date>/` with a manifest recording the original path, the reason
and the evidence, and they leave generated data and public counts. Quarantine
is a reviewable removal, not a silent deletion: the file, its git history and
the manifest all remain. See `quarantine/2026-10-24/`.


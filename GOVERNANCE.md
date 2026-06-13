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

### Bots

- `schema-validator` blocks invalid PRs.
- `link-checker` flags broken links.
- `star-tracker` updates metrics.
- `stale-bot` flags entries due for review.

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

Entries are never deleted. When a tool or project becomes obsolete:

1. Set `status: deprecated`.
2. Add a deprecation notice to the top of the entry.
3. Document the reason.
4. Link alternatives.


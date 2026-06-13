# Contributing to AI Arsenal

Thank you for helping keep AI Arsenal curated, fresh, and machine-readable.

For a step-by-step guide, read [`docs/contributor-guide.md`](./docs/contributor-guide.md). For troubleshooting validation failures, read [`docs/troubleshooting.md`](./docs/troubleshooting.md).

## Contribution Paths

1. **Fix an error** — edit an existing Markdown file and open a PR.
2. **Flag stale content** — open an issue with the outdated-content template.
3. **Add a tip/trick** — run `pnpm run new:tip`, fill the template, validate, PR.
4. **Add a tool/project/paper/build example** — scaffold an entry and follow schema rules.
5. **Add a section or major change** — open a Discussion/RFC first.

## Setup

```bash
pnpm install
pnpm run validate:all
pnpm run check:duplicates
```

## Before Opening a PR

- [ ] Frontmatter is complete and valid.
- [ ] Every controlled value appears in `TAXONOMY.md`.
- [ ] Entry `id` is unique and matches the filename.
- [ ] Markdown body follows the template sections.
- [ ] URLs were personally verified.
- [ ] `added_date` and `last_reviewed` use `YYYY-MM-DD`.
- [ ] `added_by` is your GitHub username.

## File Naming Rules

- Use kebab-case filenames.
- No spaces and no underscores, except `_index.md` and `_registry.md`.
- The entry ID in frontmatter must match the filename without `.md`.
- `_index.md` is navigation, not a content entry.
- `_registry.md` is generated and must not be edited manually.

## Schemas and Taxonomy

The frontmatter is the database record. The Markdown body is the human detail view. CI validates frontmatter against `/schemas/*.schema.json` and validates vocabulary against `TAXONOMY.md`.

## Recognition

| Contribution Type | Recognition |
|---|---|
| First merged PR | Added to `CONTRIBUTORS.md` plus first-contribution recognition |
| 5+ merged PRs | Listed in README contributors section |
| 10+ merged PRs | Invited to become section maintainer |
| Maintains a section for 3+ months | Eligible for full maintainer role |

## Commit Convention

Format: `type(scope): message`

Types: `feat`, `update`, `fix`, `chore`, `docs`, `schema`, `infra`

Examples:

```text
feat(projects): add langgraph agent framework entry
update(tools): refresh langfuse pricing info
fix(links): fix broken arxiv link in attention paper
schema(tool): add verified_by field
```

Do not use `[skip ci]` in human commits. It is reserved for automation.


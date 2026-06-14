# Contributing to AI Arsenal

Thank you for helping keep AI Arsenal curated, fresh, and machine-readable.

For a step-by-step guide, read [`docs/contributor-guide.md`](./docs/contributor-guide.md). For troubleshooting validation failures, read [`docs/troubleshooting.md`](./docs/troubleshooting.md).

## Contribution Paths

1. **Fix an error** — edit an existing Markdown file and open a PR.
2. **Flag stale content** — open an issue with the `update-outdated.yml` template.
3. **Add a tip/trick** — run `pnpm run new:tip`, fill the template, validate, PR.
4. **Add a tool/project/paper/build example** — scaffold an entry and follow schema rules.
5. **Add a section or major change** — open a Discussion/RFC first.
6. **Improve documentation** — edit files under `docs/` and `meta/`.
7. **Help with security** — see `SECURITY.md` and `docs/policies/security-disclosure.md`.

## Setup

```bash
pnpm install
pnpm run validate:all
pnpm run check:duplicates
pnpm test
```

## Before Opening a PR

- [ ] Frontmatter is complete and valid.
- [ ] Every controlled value appears in `TAXONOMY.md`.
- [ ] Entry `id` is unique and matches the filename.
- [ ] Markdown body follows the template sections.
- [ ] URLs were personally verified.
- [ ] `added_date` and `last_reviewed` use `YYYY-MM-DD`.
- [ ] `added_by` is your GitHub username.
- [ ] No `[skip ci]` in your commits (it is reserved for automation).
- [ ] No new dependencies unless discussed in an issue first.
- [ ] No secrets, tokens, or personal data in any file.
- [ ] If touching `scripts/` or `schemas/`, run `pnpm test` and update tests.

## File Naming Rules

- Use kebab-case filenames.
- No spaces and no underscores, except `_index.md` and `_registry.md`.
- The entry ID in frontmatter must match the filename without `.md`.
- `_index.md` is navigation, not a content entry.
- `_registry.md` is generated and must not be edited manually.

## Schemas and Taxonomy

The frontmatter is the database record. The Markdown body is the human detail view. CI validates frontmatter against `/schemas/*.schema.json` and validates vocabulary against `TAXONOMY.md`.

## Security

If your PR touches `scripts/`, `.github/workflows/`, or `schemas/`, please:

1. Run `pnpm test` to confirm validator behavior is preserved.
2. Consider opening a security review issue before merging large changes.
3. Avoid introducing new outbound HTTP without using `scripts/utils/network-guard.js`.
4. Never bypass CODEOWNERS or branch protection in your PR.

## AI Agent Contributions

Contributions authored (in whole or part) by an AI agent must:

1. Disclose this in the PR description.
2. Have a human maintainer review every line.
3. Avoid using AI-generated frontmatter verbatim — verify against `TAXONOMY.md`.

Read [`meta/how-to-use-with-agents.md`](./meta/how-to-use-with-agents.md) and [`meta/security-best-practices.md`](./meta/security-best-practices.md) before contributing.

## Recognition

| Contribution Type | Recognition |
|---|---|
| First merged PR | Added to `CONTRIBUTORS.md` plus first-contribution recognition |
| 5+ merged PRs | Listed in README contributors section |
| 10+ merged PRs | Invited to become section maintainer |
| Maintains a section for 3+ months | Eligible for full maintainer role |
| Reported and confirmed security issue | Credited in `CHANGELOG.md` (unless anonymity requested) |

## Commit Convention

Format: `type(scope): message`

Types: `feat`, `update`, `fix`, `chore`, `docs`, `schema`, `infra`

Examples:

```text
feat(projects): add langgraph agent framework entry
update(tools): refresh langfuse pricing info
fix(links): fix broken arxiv link in attention paper
schema(tool): add verified_by field
deps(npm): bump sanitize-html to 2.17.5
ci(workflows): SHA-pin third-party actions
security(check-links): add SSRF protection
```

Do not use `[skip ci]` in human commits. It is reserved for automation.

## Test Policy

Every change to `scripts/` must include or update tests in `tests/`. Run:

```bash
pnpm test
```

Tests use Node's built-in `node:test` runner — no extra dependency required. See `tests/README.md` for the conventions.

## License

By contributing, you agree that your contributions will be licensed under:

- **MIT** for code (per [`LICENSE`](./LICENSE)).
- **CC-BY-4.0** for curated content (per [`LICENSE-CONTENT`](./LICENSE-CONTENT)).

Third-party copyrighted material (project descriptions, paper abstracts) must be used under fair-use principles or with explicit permission noted in the entry.

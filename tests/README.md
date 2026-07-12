# Tests

AI Arsenal uses Node's built-in [`node:test`](https://nodejs.org/api/test.html) runner. No extra dependencies required.

## Conventions

- Test files end in `.test.js`.
- Each test file mirrors the corresponding source file (e.g., `tests/validate-schema.test.js` covers `scripts/validate-schema.js`).
- Tests use `node:assert/strict` for assertions.
- Tests should run in <5 seconds total.
- Tests are isolated — no network, no file writes outside `tests/fixtures/`.

## Running Tests

```bash
pnpm test
```

## Adding Tests

When you change a script, add or update tests in `tests/`:

```bash
# 1. Write a test that exercises the new behavior.
# 2. Run `pnpm test` to confirm.
# 3. Open a PR; CI runs the tests automatically.
```

## What's Tested

| File | Covers |
|---|---|
| `validate-schema.test.js` | JSON Schema validation, kebab ID, cross-field checks |
| `validate-taxonomy.test.js` | Controlled vocabulary enforcement |
| `validate-paths.test.js` | File naming, `_index.md` coverage, project category match |
| `validate-structure.test.js` | Required Markdown headings per entry type |
| `check-duplicates.test.js` | Duplicate ID detection |
| `check-links.test.js` | URL extraction, ignore patterns, SSRF block |
| `check-stale.test.js` | Stale entry detection |
| `network-guard.test.js` | Private IP detection, URL parsing safety |
| `cache-guard.test.js` | Cache validation |
| `html-sanitizer.test.js` | XSS sanitization |
| `taxonomy.test.js` | `TAXONOMY.md` parser |
| `markdown.test.js` | Heading extraction, URL extraction, strip |
| `validate-data-contract.test.js` | Collection/index/stats/search count and ID parity |
| `release-tag.test.js` | Release tag normalization and patch bumping |
| `frontmatter.test.js` | Frontmatter read, type inference, ID derivation |

## What's NOT Tested (intentionally)

- Network-dependent scripts (`update-star-counts.js`, `check-links.js` end-to-end).
- Workflow definitions.
- Generated data files (these are validated by `validate-data-contract.js`).
- Documentation prose.

## Test Isolation

Tests must not require:

- Network access
- A `GITHUB_TOKEN` environment variable
- A git repository (we use `tests/fixtures/` for file fixtures)

If a test needs a fixture, place it under `tests/fixtures/` and read it at runtime.

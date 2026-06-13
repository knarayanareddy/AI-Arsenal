# Troubleshooting

This page explains common validation and automation failures.

## `pnpm` is not installed

Use Corepack:

```bash
corepack enable
corepack prepare pnpm@8 --activate
```

Or run through `npx` temporarily:

```bash
npx pnpm@8 install
```

## Auto-fix minor formatting issues

For changed Markdown content:

```bash
pnpm run fix:changed
```

For all Markdown, JSON, and YAML files:

```bash
pnpm run fix
```

Auto-fixers normalize line endings, remove trailing whitespace, and ensure a final newline. They intentionally avoid risky semantic rewrites.

## Schema validation failed

Run:

```bash
pnpm run validate
```

Common causes:

- missing required frontmatter field
- typo in field name
- wrong type, such as string instead of array
- invalid URL
- invalid date format
- extra unsupported field

Example fix:

```yaml
# Wrong
added_date: 06/13/2026

# Right
added_date: "2026-06-13"
```

## Taxonomy validation failed

Run:

```bash
pnpm run validate:taxonomy
```

This usually means a tag, category, cost model, maturity level, job, status, or verdict is not listed in `TAXONOMY.md`.

Fix by using an existing value. Only add new taxonomy values when they are broadly useful.

## Markdown structure validation failed

Run:

```bash
pnpm run validate:structure
```

Most entries require these sections:

```markdown
## Overview
## Why It's in the Arsenal
## Key Features
## Architecture / How It Works
## Getting Started
## Use Cases
## Strengths
## Limitations / When NOT to Use
## Integration Patterns
## Resources
## Buzz & Reception
```

Add the missing section even if the content is brief.

## Duplicate ID check failed

Run:

```bash
pnpm run check:duplicates
```

Every entry ID must be unique across the repository.

Fix by renaming the new entry ID and filename.

## ID does not match filename

If the file is:

```text
content/projects/rag/vector-databases/qdrant.md
```

Then frontmatter must include:

```yaml
id: "qdrant"
```

## Path validation failed

Run:

```bash
pnpm run validate:paths
```

Common causes:

- missing `_index.md` in a content directory
- non-kebab-case filename
- project category does not match folder
- invalid JSON in `data/`

## Reference validation warnings

Run:

```bash
pnpm run validate:refs
```

Warnings usually mean a reference points to an ID that does not exist yet.

Example:

```yaml
alternatives:
  - "nonexistent-tool"
```

Fix by using the correct ID or adding the referenced entry.

## Link check failed

Run:

```bash
pnpm run check:links
```

The report is written to:

```text
data/link-check-report.json
```

Some sites block automated checks. If a link is valid in a browser but blocked in CI, maintainers can configure ignore patterns through `LINK_CHECK_IGNORE`.

## Generated data contract failed

Run:

```bash
pnpm run generate:all
pnpm run validate:data
```

If it still fails, the generator or source content likely violates the data contract.

## GitHub star refresh failed

Run:

```bash
GITHUB_TOKEN=ghp_xxx pnpm run update:stars
```

Common causes:

- missing or rate-limited GitHub token
- invalid GitHub URL
- repository moved or deleted
- GitHub API outage

## CI passes locally but fails in GitHub

Check:

- Node version is 20+
- pnpm lockfile is committed
- workflow has `fetch-depth: 0` where changed-file detection is needed
- generated files are not stale if the workflow validates data contract

## Clean local dependencies

If dependencies get into a strange state:

```bash
rm -rf node_modules
pnpm install
pnpm run ci
```


# Contributor Guide

This guide walks through common contribution types step by step.

## Contribution Types

| Contribution | Difficulty | Recommended Path |
|---|---:|---|
| Fix typo or broken link | Easy | Edit file directly |
| Update stale content | Easy | Edit existing entry and update `last_reviewed` |
| Add a tip | Easy | `pnpm run new:tip` |
| Add a tool | Medium | `pnpm run new:tool` |
| Add a project | Medium | `pnpm run new:project` |
| Add a paper | Medium | `pnpm run new:paper` |
| Change taxonomy | Advanced | Open discussion/RFC first |
| Change schema | Advanced | Open discussion/RFC first |

## Before You Start

Install dependencies:

```bash
pnpm install
```

Run the full check once:

```bash
pnpm run ci
```

## Add a New Project

```bash
pnpm run new:project
```

The scaffold will create a Markdown file under `content/projects/...`.

Then:

1. Fill in all frontmatter fields.
2. Complete every Markdown section.
3. Verify tags exist in `TAXONOMY.md`.
4. Run:

```bash
pnpm run validate:changed
pnpm run check:duplicates
```

5. Open a PR.

## Add a New Tool

```bash
pnpm run new:tool
```

Make sure `job`, `stack`, `cost_model`, `free_tier`, `open_source`, and `self_hostable` are accurate. If the tool is open source, include `source_url` or `github_url`.

## Add a New Paper

```bash
pnpm run new:paper
```

Required paper metadata includes:

- title
- authors
- date
- venue
- arXiv ID
- arXiv URL
- PDF URL
- importance
- TL;DR
- why it matters

## Add a New Tip

```bash
pnpm run new:tip
```

A good tip should be:

- actionable
- specific
- tied to a common workflow
- clear about when not to apply it

## Update an Existing Entry

1. Edit the Markdown file.
2. Update `last_reviewed` to today's date if you verified the content.
3. Run:

```bash
pnpm run validate:changed
```

## What Makes a Good Entry?

Good entries are:

- specific, not generic
- useful to builders
- honest about limitations
- linked to canonical resources
- structured enough for future filtering/search
- not marketing copy

## PR Checklist

Before opening a PR:

```bash
pnpm run fix:changed
pnpm run validate:changed
pnpm run check:duplicates
```

For larger changes:

```bash
pnpm run fix
pnpm run ci
```

Make sure:

- [ ] `id` matches filename
- [ ] all tags are in `TAXONOMY.md`
- [ ] frontmatter validates
- [ ] body sections are complete
- [ ] URLs work
- [ ] content is not duplicated from another entry
- [ ] generated files are not manually edited unless necessary

## Common Mistakes

### Inventing tags

Wrong:

```yaml
tags:
  - super-ai-agent-platform
```

Right: use existing tags or propose a taxonomy change.

### Mismatched ID and filename

Wrong:

```text
filename: lang-graph.md
id: "langgraph"
```

Right:

```text
filename: langgraph.md
id: "langgraph"
```

### Missing required sections

Most entries need all standard sections, including `Limitations / When NOT to Use` and `Resources`.

## Need Help?

- Read [`troubleshooting.md`](./troubleshooting.md)
- Open an issue using the appropriate template
- For schema/taxonomy changes, open a discussion before a PR


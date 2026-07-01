# Schema and Taxonomy Guide

The schema and taxonomy layers are the quality gatekeepers for AI Arsenal.

## Why They Matter

Without strict schemas and controlled vocabulary, the repository would become a loose collection of Markdown files. With schemas, it becomes queryable, filterable, comparable, and safe for future UI/API/LLM use.

## Schema Files

Schemas live in `schemas/`:

- `project.schema.json`
- `tool.schema.json`
- `research.schema.json` (papers; replaced the retired `paper.schema.json` after the research-vertical reorganisation)
- `tip.schema.json`
- `build-example.schema.json`
- `person.schema.json`
- `digest.schema.json`
- `guide.schema.json`

Each schema defines:

- required fields
- allowed field types
- allowed enum values where appropriate
- URL/date/ID constraints
- whether extra fields are allowed

Most schemas use:

```json
"additionalProperties": false
```

This prevents accidental unsupported metadata from entering the data layer.

## Taxonomy File

`TAXONOMY.md` defines shared vocabulary for:

- entry types
- project categories
- project subcategories
- tool jobs
- tags
- maturity levels
- cost models
- stack languages
- status values
- verdict values
- importance values
- buzz sources

## When to Add a Schema Field

Add a schema field when the value needs to be:

- filtered in the future UI
- compared across entries
- validated by CI
- consumed by LLMs/agents as structured data
- used by automation

Do not add fields for one-off prose. Put that in the Markdown body instead.

## When to Add a Taxonomy Value

Add a taxonomy value when:

- multiple entries will use it
- it improves filtering or search
- it represents a stable concept
- existing values are clearly insufficient

Avoid:

- marketing phrases
- overly narrow tags
- duplicate concepts
- vendor-specific tags unless they are ecosystem anchors

## Schema Change Process

1. Propose the change.
2. Explain why existing fields are insufficient.
3. Update the schema.
4. Update templates.
5. Update validation scripts if needed.
6. Migrate existing content.
7. Regenerate data.
8. Run:

```bash
pnpm run ci
```

## Taxonomy Change Process

1. Search existing values first.
2. Add the new value to `TAXONOMY.md`.
3. Update affected entries.
4. Run:

```bash
pnpm run validate:taxonomy
pnpm run generate:all
```

## Common Validation Commands

```bash
pnpm run validate
pnpm run validate:taxonomy
pnpm run validate:structure
pnpm run validate:paths
pnpm run validate:refs
pnpm run validate:data
```

## Practical Rule

If the value should be sortable, filterable, comparable, or machine-readable, put it in frontmatter.

If the value is explanatory, contextual, or narrative, put it in the Markdown body.


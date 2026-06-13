# Schema System

The schema layer is AI Arsenal's foundation. It enforces that Markdown frontmatter is a queryable, UI-ready database record.

For a fuller explanation of schema and taxonomy decisions, read [`../docs/schema-and-taxonomy.md`](../docs/schema-and-taxonomy.md).

## Files

| Schema | Applies to |
|---|---|
| `project.schema.json` | `content/projects/**/[id].md` |
| `tool.schema.json` | `content/tools/**/[id].md` |
| `paper.schema.json` | `content/research/papers/[id].md` |
| `tip.schema.json` | `content/tips-and-tricks/**/[id].md` |
| `build-example.schema.json` | `content/build-examples/**/[id].md` |
| `person.schema.json` | community people/resources entries |
| `digest.schema.json` | `content/digests/YYYY-MM/digest.md` |

## Validation

```bash
pnpm run validate
pnpm run validate:taxonomy
pnpm run validate:structure
pnpm run check:duplicates
```

Every entry must:

1. Have valid YAML frontmatter.
2. Match the appropriate JSON Schema.
3. Use only taxonomy-approved values.
4. Use a unique `id` that matches the filename.
5. Follow required Markdown body sections.

`_index.md` and `_registry.md` files are navigation/generated files and are excluded from entry schema validation.


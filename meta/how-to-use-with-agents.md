# How to Use AI Arsenal with Agents

Agents should treat `AGENT.md` as the routing index, `TAXONOMY.md` as the controlled vocabulary, and `/data/*.json` as the queryable API surface.

## Agent Workflow

1. Load `AGENT.md`.
2. Determine the smallest target section.
3. Prefer `/data/index.json` for discovery and IDs.
4. Load specific Markdown entries only when detail is required.
5. Never infer taxonomy values not present in `TAXONOMY.md`.

## Write Operations

When creating content, agents must:

- Use templates from `/templates/`.
- Preserve schema field names exactly.
- Run `pnpm run validate:all` and `pnpm run check:duplicates`.
- Avoid editing generated files except through generator scripts.


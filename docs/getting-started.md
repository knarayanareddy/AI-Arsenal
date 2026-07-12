# Getting Started with AI Arsenal

This guide is for people who want to browse, use, validate, or lightly contribute to AI Arsenal without first understanding the whole architecture.

## 1. Understand the Project in One Minute

AI Arsenal is a structured AI engineering knowledge base.

- Humans read Markdown files in `content/`.
- Machines read validated frontmatter and generated JSON in `data/`.
- Contributors use templates and validation scripts.
- Future UIs consume the generated JSON data layer.

The most important rule:

> Edit content in `content/`. Treat `data/` as generated output.

## 2. Install Requirements

You need:

- Node.js 20 or newer
- pnpm 9 or newer

Check your versions:

```bash
node --version
pnpm --version
```

If pnpm is not available:

```bash
corepack enable
corepack prepare pnpm@9 --activate
```

## 3. Install Dependencies

```bash
pnpm install
```

## 4. Run Validation

For the full repository:

```bash
pnpm run ci
```

For only changed content files:

```bash
pnpm run validate:changed
```

## 5. Browse the Knowledge Base

Start here:

| Goal | Start Here |
|---|---|
| Choose an AI architecture | `content/architectures/{system-design,data-strategy,model-selection,serving-patterns,evaluation-strategy}/` |
| Pick a production stack | `content/architectures/reference-stacks/` |
| Compare AI projects | `content/projects/_registry.md` |
| Compare AI tools | `content/tools/_registry.md` |
| Learn observability | `content/observability/` |
| Read papers | `content/research/{phase}/` (see `content/research/_index.md` for all 8 phases) |
| Find practical tips | `content/tips-and-tricks/` |

## 6. Use the Generated Data

If you are building a script, dashboard, or future UI, start with:

```text
data/index.json
data/projects.json
data/tools.json
data/architectures.json
data/benchmarks.json
data/trending.json
data/search-index.json
```

See [`data-api.md`](./data-api.md) for details.

## 7. Make a Small Contribution

The easiest contribution is updating an existing entry.

1. Edit a file in `content/`.
2. Run:

```bash
pnpm run validate:changed
```

3. Open a pull request.

For new entries, use scaffold commands:

```bash
pnpm run new:project
pnpm run new:tool
pnpm run new:paper
pnpm run new:tip
```

## 8. If Something Fails

Read [`troubleshooting.md`](./troubleshooting.md). The most common issues are:

- tag not listed in `TAXONOMY.md`
- missing required frontmatter field
- filename does not match `id`
- missing required Markdown section
- duplicate entry ID


# How to Use AI Arsenal as a Human

## Start Here

1. Read `README.md` for the repository map.
2. Use `TAXONOMY.md` to understand categories and tags.
3. Browse `/content/` sections directly on GitHub.
4. Use templates and scaffold commands when contributing.

## Finding Things

- Tools by job: `/content/tools/by-job/` (curated shortlist pages, linking to canonical entries)
- Tools by lifecycle phase: `/content/tools/{data-ingestion,model-layer,orchestration,serving-and-deployment,evaluation-and-observability,dx-and-tooling}/` (canonical entries with `best_when`/`avoid_when` guidance)
- Projects by category: `/content/projects/`
- Architecture choices: `/content/architectures/ (system-design, data-strategy, model-selection, serving-patterns, evaluation-strategy)`
- Full stacks: `/content/architectures/reference-stacks/`
- Research: `/content/research/`

## Contributing

Run validation before opening a PR:

```bash
pnpm run validate:all
pnpm run check:duplicates
```


# Automation Policy

## Generated Files and Git History

Generated files are useful for UI/API consumers, but committing them on every merge creates noisy history and frequent merge conflicts under high PR volume. AI Arsenal therefore uses a batched generated-data model:

The committed `data/*.json` set is intentional — it is refreshed through `data-refresh.yml` and the weekly/monthly batched maintenance PRs, not on every merge. Do not hand-edit these files; edit `content/` and let automation regenerate them.

1. Pull requests validate content and generated data contracts, but do not require contributors to resolve generated JSON conflicts.
2. Pushes to `main` run post-merge verification and upload generated artifacts, but do not commit directly back to `main`.
3. `data-refresh.yml` publishes root-level generated JSON to the orphan `data-release` branch for external consumers.
4. Weekly/monthly maintenance opens batched PRs instead of pushing directly to `main`.

This preserves the data layer while avoiding constant bot commits and unreadable git history.

## CI Scalability

Validation is split into two classes:

- **Changed-file validation** for schema, taxonomy, and Markdown structure in PRs.
- **Global invariant validation** for duplicate IDs, path conventions, cross references, and generated data contracts.

Parsing helpers use bounded concurrency via `AI_ARSENAL_PARSE_CONCURRENCY` to avoid sequential directory walks becoming a CI bottleneck as the knowledge base grows.

## Recommended CI Strategy

| Workflow | Scope | Purpose |
|---|---|---|
| `on-pr.yml` | changed files + global invariants | fast contributor feedback |
| `on-merge.yml` | full verification + artifact upload | confirm main can generate cleanly |
| `data-refresh.yml` | scheduled/manual data-release publish | publish generated JSON API to orphan branch |
| `weekly.yml` | scheduled PR | metrics, links, trending |
| `monthly.yml` | scheduled PR | digest, stale report, stats |


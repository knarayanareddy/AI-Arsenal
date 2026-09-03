# Automation Policy

## Generated Files and Git History

Generated files are useful for UI/API consumers, but committing them on every merge creates noisy history and frequent merge conflicts under high PR volume. AI Arsenal therefore uses a batched generated-data model:

The committed `data/*.json` set is intentional — it is refreshed through `data-refresh.yml` and the weekly/monthly batched maintenance PRs, not on every merge. Do not hand-edit these files; edit `content/` and let automation regenerate them.

1. Pull requests validate content and generated data contracts, but do not require contributors to resolve generated JSON conflicts.
2. Pushes to `main` run post-merge verification and upload generated artifacts, but do not commit directly back to `main`.
3. The stats table in `README.md` (between the `AUTO-GENERATED STATS TABLE` markers) is generated from `data/stats.json` by `pnpm run generate:readme-stats`, which is part of `generate:all`. It therefore refreshes on the same batched cadence as the rest of the data layer — never hand-edit it, and never commit it separately from `data/stats.json`, since `validate:data` enforces count parity between the two.
4. `data-refresh.yml` publishes root-level generated JSON to the orphan `data-release` branch for external consumers.
5. Weekly/monthly maintenance opens batched PRs instead of pushing directly to `main`.

## Known failure mode (unfixed, requires a repository setting)

`weekly.yml` and `monthly.yml` fail 100% of the time at their `create-pull-request`
step with:

> GitHub Actions is not permitted to create or approve pull requests.

Until **Settings → Actions → General → Workflow permissions → "Allow GitHub
Actions to create and approve pull requests"** is enabled, no calendar automation
can open a PR, so the data layer on `main`, the stale report, the broken-link
issues, and the README stats table all go stale on a schedule nobody notices.
`data-refresh.yml` is unaffected because it pushes to the orphan `data-release`
branch instead of opening a PR. Enabling that setting is a prerequisite for
items 4 and 5 above to have any effect.

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


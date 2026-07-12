# Automation Scripts

Scripts enforce the schema-first architecture and generate the static API/data layer.

For maintainer operations, read [`../docs/maintainer-runbook.md`](../docs/maintainer-runbook.md). For the generated-data batching policy, read [`../docs/automation-policy.md`](../docs/automation-policy.md).

## Validation

- `validate-schema.js` — validates Markdown frontmatter against JSON Schemas and cross-field sanity checks.
- `validate-taxonomy.js` — validates controlled vocabulary against `TAXONOMY.md`.
- `validate-structure.js` — validates required Markdown body sections.
- `validate-paths.js` — validates filenames, folder conventions, `_index.md` coverage, and generated JSON syntax.
- `validate-references.js` — validates/flags ID references such as alternatives, integrations, related entries, and digest references.
- `validate-data-contract.js` — validates the generated `/data/*.json` API contract, including collection/index/stats/search ID and count parity. The canonical collection list lives in `utils/collections.js`.
- `check-duplicates.js` — rejects duplicate content IDs.
- `check-links.js` — concurrent, SSRF-hardened link checker with changed-only/all modes and JSON reporting. The full-mode default supports up to 2,000 unique URLs at current repository scale. Relative redirects are resolved against their source URL. Rate limits (429/403), transient network errors, host-cap skips, and non-404/410 server errors are reported as **soft warnings**; only confirmed dead links (404/410), DNS misses, and SSRF rejections are **hard failures** that fail CI / open issues. Retries with backoff; known rate-limited hosts (GitHub, X) get a raised per-host budget. URLs inside HTML comments are skipped.

## Generation

- `generate-data.js` — parses Markdown, renders sanitized HTML, extracts body text/headings, and generates `/data/*.json`.
- `generate-search-index.js` — creates FlexSearch-compatible search documents and facet counts.
- `generate-toc.js` — regenerates registries and section `_index.md` files.
- `generate-context.js` — regenerates dense LLM context with top projects, tools, papers, and heuristics.
- `generate-stats.js` — regenerates repository statistics.
- `generate-changelog.js` — builds `CHANGELOG.md` from Git history when available.

## Freshness and Maintenance

- `update-star-counts.js` — fetches GitHub metrics, updates project frontmatter, and stores `data/github-cache.json`.
- `calculate-trending.js` — calculates 0–100 trending scores from star velocity, buzz, recency, and total stars.
- `check-stale.js` — writes `data/stale-report.json` and optionally fails for stale entries.
- `create-link-issues.js` — files GitHub Issues from `data/link-check-report.json` when GitHub token/repo env vars are present.
- `draft-trending.js` — generates a schema-compliant weekly trending draft.
- `create-monthly-digest.js` — creates a schema-compliant monthly digest draft.

## Developer Experience

- `scaffold.js` — creates new entries from templates.
- `watch.js` — local validation watcher.

## CI Commands

```bash
pnpm run validate:all
pnpm run check:duplicates
pnpm run generate:all
pnpm run ci
```


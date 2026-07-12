# Generated Data API

The `/data` directory is the static API layer for AI Arsenal. It is generated from Markdown frontmatter and body content.

## Design Goals

The data layer should be:

- stable enough for a future UI
- readable by scripts and LLM agents
- filterable client-side
- independent of a database server
- generated from the Markdown source of truth

## Do Not Edit Manually

In normal contribution workflows, do not edit `data/*.json` directly.

The generated `data/*.json` files are committed to the repository and refreshed through batched maintenance PRs (see [`automation-policy.md`](./automation-policy.md)); they are not regenerated on every merge. Treat them as read-only build artifacts.

Edit files in `content/`, then run:

```bash
pnpm run generate:all
```

Generated data refreshes are published through the dedicated `data-release` branch and batched maintenance workflows to avoid git history pollution.

## Main Files

| File | Description |
|---|---|
| `index.json` | Lightweight master list of all entries |
| `projects.json` | Full project records |
| `tools.json` | Full tool records |
| `papers.json` | Full paper records |
| `tips.json` | Full tip records |
| `guides.json` | Full guide records |
| `build-examples.json` | Full build-example records |
| `architectures.json` | Architecture decision records |
| `observability.json` | Observability playbooks |
| `community.json` | Community resources |
| `benchmarks.json` | Benchmark records |
| `trending.json` | Trending snapshots and source feeds |
| `people.json` | Full people records |
| `digests.json` | Monthly digest records |
| `tags.json` | Tag cloud and type counts |
| `stats.json` | Repository statistics |
| `search-index.json` | FlexSearch-compatible search documents |
| `github-cache.json` | Cached GitHub repo metrics |
| `link-check-report.json` | Latest link-check results |
| `stale-report.json` | Latest stale-entry report |

## `data/index.json`

The lightweight master index has this shape:

```json
{
  "meta": {
    "generated_at": "2026-06-13T00:00:00.000Z",
    "schema_version": "1.0.0",
    "total_projects": 30,
    "total_tools": 20
  },
  "entries": [
    {
      "id": "langgraph",
      "type": "project",
      "name": "LangGraph",
      "description": "...",
      "tags": ["agents", "orchestration"],
      "path": "content/projects/agents/frameworks/langgraph.md",
      "url": "content/projects/agents/frameworks/langgraph",
      "last_updated": "2026-06-13"
    }
  ]
}
```

Use it for fast discovery and routing.

## Full Collection Files

Files such as `projects.json` and `tools.json` contain fully denormalized records.

Common fields include:

- `id`
- `entry_type`
- `path`
- `url`
- `display_name`
- `summary`
- `tags`
- `headings`
- `body_html`
- `body_text`
- `word_count`
- `reading_time_minutes`
- original frontmatter fields

## Collection parity

The collection manifest in `scripts/utils/collections.js` is the source of truth for generated collection files. `validate:data` checks that every manifest collection exists, that collection counts and IDs match `index.json`, that `stats.json` totals match the index, and that the search index covers every searchable collection.

## Search Index

`search-index.json` contains:

- FlexSearch-style config
- search documents
- facets for filtering

Documents include:

- `id`
- `type`
- `name`
- `description`
- `tags`
- `category`
- `path`
- `url`
- `body`

## Filtering Recommendations

Client-side UIs can filter by:

- `type`
- `tags`
- `category`
- `subcategory`
- `maturity`
- `cost_model`
- `status`
- `job`
- `stack`
- `featured`
- `github_stars`
- `trending_score`

## Regeneration Commands

```bash
pnpm run generate
pnpm run generate:search
pnpm run generate:toc
pnpm run generate:context
pnpm run generate:stats
pnpm run generate:all
```

## Validate the Data Contract

```bash
pnpm run validate:data
```

This checks that generated JSON files exist and match the expected API contract.

## Automation Policy

Generated data is not committed on every merge. Instead:

- PRs validate generated output.
- `on-merge.yml` verifies generated state and uploads artifacts.
- `data-refresh.yml` opens/updates a batched generated-data PR.

See [`automation-policy.md`](./automation-policy.md) and [`data-release.md`](./data-release.md).


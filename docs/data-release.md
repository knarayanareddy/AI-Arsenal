# Data Release Branch

AI Arsenal publishes generated JSON data to a dedicated orphan branch named `data-release`.

## Why a Data Release Branch?

The main branch contains source Markdown, schemas, scripts, docs, and generated data snapshots. A separate data-release branch gives external consumers a small, stable, JSON-only surface.

Benefits:

- no need to unpack GitHub Actions artifacts
- simpler fetch URLs for a separate UI repository
- smaller payload for static consumers
- avoids generated-file churn on `main`
- can be force-orphaned safely because it is generated output

## Published URLs

After the workflow runs, consumers can fetch files like:

```text
https://raw.githubusercontent.com/knarayanareddy/AI-Arsenal/data-release/index.json
https://raw.githubusercontent.com/knarayanareddy/AI-Arsenal/data-release/projects.json
https://raw.githubusercontent.com/knarayanareddy/AI-Arsenal/data-release/tools.json
https://raw.githubusercontent.com/knarayanareddy/AI-Arsenal/data-release/search-index.json
https://raw.githubusercontent.com/knarayanareddy/AI-Arsenal/data-release/tags.json
https://raw.githubusercontent.com/knarayanareddy/AI-Arsenal/data-release/stats.json
```

For forks, replace `knarayanareddy/AI-Arsenal` with the actual GitHub repository path.

## Workflow

The publishing workflow is:

```text
.github/workflows/data-refresh.yml
```

It runs on a schedule or manually and performs:

1. install dependencies
2. update GitHub stars
3. recalculate trending scores
4. regenerate all data
5. check stale entries
6. prepare a release directory with root-level JSON files
7. publish `.data-release` to the orphan `data-release` branch

## Local Preview

Generate the same release directory locally:

```bash
pnpm run generate:all
pnpm run prepare:data-release
```

The output appears in:

```text
.data-release/
```

This directory is generated and should not be committed to `main`.

## Consumer Example

```js
const DATA_BASE = 'https://raw.githubusercontent.com/knarayanareddy/AI-Arsenal/data-release';

const [index, projects, search] = await Promise.all([
  fetch(`${DATA_BASE}/index.json`).then((r) => r.json()),
  fetch(`${DATA_BASE}/projects.json`).then((r) => r.json()),
  fetch(`${DATA_BASE}/search-index.json`).then((r) => r.json())
]);
```

## Branch Policy

The `data-release` branch is generated output. Do not edit it manually. It may be force-recreated by automation.


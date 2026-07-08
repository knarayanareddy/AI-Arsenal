---
id: dlt
name: "dlt"
type: tool
job: [data-labeling]
description: "Python-native ELT library: declarative, schema-evolving data pipelines as code, popular with AI/agent workflows"
url: "https://dlthub.com"
cost_model: open-source
pricing_detail: "Apache-2.0 open source; dltHub cloud offerings optional"
tags: [data, llm, cloud]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/dlt-hub/dlt"
docs_url: "https://dlthub.com/docs"
github_url: "https://github.com/dlt-hub/dlt"
alternatives: [airbyte]
integrates_with: [langchain]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, production]
best_when:
  - "You want pipelines as pip-installable Python (runs in Lambda, Airflow, notebooks) instead of operating an ELT platform"
  - "Messy/nested JSON sources — automatic schema inference and evolution remove most maintenance toil"
avoid_when:
  - "Non-Python teams needing UI-driven connector setup — Airbyte's catalog and console fit better"
  - "Massive CDC replication workloads; purpose-built replication tools handle those better"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (5,578), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The best code-first ingestion library in the Python ecosystem; the natural ELT layer inside agentic/data apps"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/dlt-hub/dlt", "date": "2026-07-08", "description": "5,578 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

An open-source Python library for data loading: decorate generators as sources, and dlt handles schema inference/evolution, incremental state, normalization of nested data, and loading to warehouses, vector stores, or files — designed to be embedded anywhere Python runs rather than operated as a platform.

## Why It's in the Arsenal

dlt earns a place in the Arsenal because it directly addresses a recurring decision point: you want pipelines as pip-installable Python (runs in Lambda, Airflow, notebooks) instead of operating an ELT platform. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Pipelines as plain Python with automatic schema evolution
- Incremental loading with managed state; nested-JSON normalization
- Destinations from BigQuery/Snowflake to DuckDB and vector stores

## Architecture / How It Works

Sources yield Python dicts; dlt normalizes them into relational child tables, infers/evolves schemas with configurable contracts, tracks incremental cursors in destination state, and loads via per-destination adapters — so a pipeline is just a script plus credentials.

## Getting Started

```bash
pip install dlt
dlt init rest_api duckdb && python pipeline.py
```

## Use Cases

1. **Scenario**: you want pipelines as pip-installable Python (runs in Lambda, Airflow, notebooks) instead of operating an ELT platform
2. **Scenario**: messy/nested JSON sources — automatic schema inference and evolution remove most maintenance toil
3. **Scenario where this is NOT the right fit**: non-Python teams needing UI-driven connector setup — Airbyte's catalog and console fit better — evaluate an alternative instead

## Strengths

- You want pipelines as pip-installable Python (runs in Lambda, Airflow, notebooks) instead of operating an ELT platform
- Messy/nested JSON sources — automatic schema inference and evolution remove most maintenance toil

## Limitations / When NOT to Use

- Non-Python teams needing UI-driven connector setup — Airbyte's catalog and console fit better
- Massive CDC replication workloads; purpose-built replication tools handle those better

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `airbyte` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `dlt`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://dlthub.com)
- [Documentation](https://dlthub.com/docs)
- [GitHub](https://github.com/dlt-hub/dlt)

## Buzz & Reception

- 5,578 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*

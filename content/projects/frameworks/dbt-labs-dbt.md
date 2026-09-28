---
id: dbt-labs-dbt
name: "dbt"
version_tracked: null
artifact_type: tool
category: data-pipelines
subcategory: tools
description: "SQL-first transformation tool that compiles a project of models into a warehouse DAG with tests and lineage"
github_url: "https://github.com/dbt-labs/dbt"
license: "Apache-2.0"
primary_language: Rust
org_or_maintainer: "dbt-labs"
tags: [data]
maturity: production
cost_model: open-source
github_stars: 13940
github_stars_last_30d: 0
trending_score: 33
last_commit: "2026-09-28"
docs_url: "https://getdbt.com"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "SQL-first transformation tool that compiles a project into a warehouse DAG with tests and lineage, which is how analytic feature inputs for ranking models stay reproducible."
best_for:
  - "You are building analytic feature tables for a ranking or recommendation model and need the transformation logic in version control with tests on every model."
  - "Your analysts write SQL but your pipelines are managed in a scheduler with no lineage, so you cannot answer what broke when a dashboard number moved."
  - "You want a staging-to-marts layering convention enforced by a tool rather than by code review, across several people touching the same warehouse."
avoid_if:
  - "Your transformation logic lives in Python and must stay there, since dbt only orchestrates SQL and Jinja; a Python-heavy project wants a different tool."
  - "You need sub-second or streaming transformations, because dbt compiles to warehouse SQL and inherits the warehouse's execution characteristics."
  - "Your warehouse does not support the SQL dialect dbt targets, in which case you need the adapter layer to cover it first."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (13940), Apache-2.0 license, last commit 2026-09-28, Rust as primary language and the topic list were API-verified. Manifest parsing, ref and source resolution, materialisation strategies, the adapter split introduced in 1.x, and test types come from the official docs; CI and cost caveats are engineering judgement about this class of tooling."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/dbt-labs/dbt", "date": "2026-09-28", "description": "13,940 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

A dbt project is a directory of .sql files, each a model, plus schema.yml declaring tests, and a sources block for upstream tables. Files are named in dependency order — ref() calls to other models and source() calls to raw tables become the edges of a DAG. Running dbt parse or dbt compile resolves that graph; dbt run materialises models in topological order, as a view, a table, an incremental merge, or a snapshot depending on configuration. Jinja provides the programming layer: macros, variables from a vars file, environment configuration, and the ref and source graph. Tests are declared as data contracts rather than assertions — not_null, unique, accepted_values, and relationships check shape and foreign keys, and custom SQL tests do anything else. Since the 1.x line the adapter architecture moved execution to a separate dbt-adapter plugin, with dbt-core holding the Jinja, graph, and test machinery and the adapter holding connection handling, materialisations, and warehouse-specific SQL. Materialisation macros, on-run-start hooks, and incremental strategies are where most version-specific behaviour lives.

## Why it's in the Arsenal

The recurring decision is how much trust to place in a table a model depends on. Without testing and lineage, a silent upstream change — a renamed column, a filter that started dropping rows, a join that became many-to-many — propagates into a training feature set and surfaces weeks later as a model regression nobody can trace. dbt resolves this by making the transformation graph explicit and testable: ref() records who depends on what, the tests express the invariants the business cares about, and run_results plus the manifest give you a queryable record of what ran, what passed, and what changed. The second payoff is organisational — putting SQL in version control with review and CI turns an unwritten tribal pipeline into something a new hire can read.

## Architecture

Compilation is a two-stage pipeline. The parse phase walks the project directory, reads each .sql file, extracts refs, sources, macros, and config blocks, and builds an internal representation held as a manifest. Jinja is rendered at this point with a context exposing ref, source, config, var, and the macro registry, so a ref resolves to a node name rather than a table path. Resolution then topologically sorts the DAG, breaking cycles by raising an error. Execution walks that order and invokes the materialisation macro for each node: a view or table materialisation is a create-or-replace statement with dependencies already in place, an incremental materialisation runs a model query then merges rows into the destination using a unique key and a strategy, and a snapshot runs a merge pattern to track slowly changing dimensions. The adapter layer supplies the connection pool, the warehouse dialect, and the concrete SQL for each of those. Artifacts — the manifest, the run results, and the compiled SQL per node — are written to target/ as JSON, which is what downstream tools and the lineage UI consume. State management stores deployed relations and their checksums so incremental runs can skip or truncate correctly.

## Ecosystem Position

dbt is the reference implementation of the transformation category, competing with its own hosted commercial product at the project level, and with Fivetran and Airbyte on movement rather than transformation. It overlaps with Airflow and Prefect for orchestration at a different altitude: Airflow schedules and runs tasks while dbt compiles a SQL graph, which is why the two are usually combined rather than treated as alternatives. Compared to raw SQL scripts in a scheduler, dbt buys version control, tests, lineage, and documentation, at the cost of a compile step and a learning curve. It is a complement rather than a replacement for a warehouse, and for the modelling side it sits alongside the feature-engineering entries in content/projects/frameworks, where polars and duckdb handle local transforms and a LightGBM model consumes what dbt materialises.

## Getting Started

Initialise a project against a warehouse and run the first materialisation:

```bash
pip install dbt-core dbt-postgres   # or dbt-duckdb, dbt-bigquery, dbt-snowflake
dbt init my_project && cd my_project
dbt deps      # install packages listed in packages.yml
dbt build --target dev
```

A model with an explicit test looks like this:

```sql
-- models/stg_orders.sql
select id, customer_id, ordered_at, status
from {{ source('raw', 'orders') }}
where status <> 'voided'
```

```yaml
models:
  - name: stg_orders
    columns:
      - name: id
        data_tests: [not_null, unique]
      - name: customer_id
        data_tests:
          - relationships:
              to: ref('stg_customers')
              field: id
```

Run `dbt docs generate` to publish a browsable lineage site from the manifest.

## Key Use Cases

1. Materialising versioned feature tables for a ranking model, with a unique-key test on the entity id and an incremental materialisation that avoids a full rebuild each night.
2. Diagnosing a metric regression by reading the lineage graph from the dashboard number back to the raw source table, which is the failure mode dbt exists to prevent.
3. Running transformation changes in CI: open a pull request with a modified model, let `dbt build` against a scratch schema fail the test suite, and block the merge.

## Strengths

- The transformation graph is explicit and testable, so upstream breakage surfaces as a failing test rather than a silent model regression.
- Version control and code review bring software-engineering practice to a layer that historically had none.
- One modelling convention enforced across a team, with materialisation strategies as configuration rather than bespoke SQL.
- Rich run artifacts, docs, and lineage make impact analysis and debugging tractable once a project grows past a handful of models.

## Limitations

Everything compiles to warehouse SQL, so dbt inherits the warehouse's performance and cost characteristics, and a badly written model is just as expensive as a badly written script. Transform logic needing Python or non-relational work is out of scope and has to move elsewhere, which is why adapter boundaries exist and why Python-heavy teams pair it with something else. Compilation time grows with project size and can dominate CI, incremental materialisations are only as correct as their unique keys, and the learning curve in Jinja plus the manifest plus materialisation macros is real for new analysts. Several core features including tests, docs, and most materialisations are open source while a hosted platform layer is commercial, and pinning adapters to your warehouse version is a recurring upgrade chore.

## Relation to the Arsenal

This is the transformation entry in content/projects/frameworks and the place where the feature tables a tabular model learns from are actually built — read it before the LightGBM, CatBoost, and h2o-3 entries in the same folder, which consume its output. Upstream, the ingestion side belongs to content/projects/data-and-retrieval, and the orchestration side is where Airflow, Prefect, Ray, and Flyte entries live. Its outputs also feed the local transforms in polars and duckdb when a feature step needs to run outside the warehouse, and the evaluation entries in content/projects/evaluation are where you decide whether the resulting table is any good.

## Resources

- [dbt documentation](https://docs.getdbt.com)
- [dbt Core GitHub repository](https://github.com/dbt-labs/dbt-core)
- [dbt platform and adapter list](https://docs.getdbt.com/docs/collaborate/data-platforms)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (13,940 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*

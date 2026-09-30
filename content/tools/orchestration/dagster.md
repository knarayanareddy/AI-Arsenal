---
id: dagster
name: Dagster
type: tool
job: [orchestration]
description: "Asset-oriented Python orchestrator where data assets are typed functions with parameter-derived lineage"
url: "https://github.com/dagster-io/dagster"
cost_model: freemium
pricing_detail: Open source or free to start
tags: [orchestration, llm]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/dagster-io/dagster"
docs_url: "https://docs.dagster.io"
github_url: "https://github.com/dagster-io/dagster"
alternatives: [prefect]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [production]
best_when: ["You build data and ML assets whose downstream computation depends on upstream table shapes, and you want the dependency graph inferred from function signatures rather than hand-declared task order.", "You want to unit-test pipeline logic without spinning up a scheduler, because asset functions are plain Python callables that tests can invoke directly.", "You are tracking lineage and freshness for tables, models and reports in one catalog, and you need run metadata attached to each materialisation rather than at the task level."]
avoid_when: ["You want a thin scheduler with minimal concepts, because the asset model adds partitions, resources, sensors and a UI that a simple task runner does not.", "Your whole platform already standardises on SQL-first orchestration, where you would rather express the DAG in dbt or a warehouse-native scheduler than in Python decorators.", "You have no appetite to run the Dagster webserver and its metadata store in production, because the asset graph, asset catalog and run history live there."]
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
enrichment_status: draft
---

## Overview

Dagster's programming model is the @dg.asset decorator. Each decorated Python function produces a named asset, and the function's parameters declare upstream dependencies, so continent_stats(continent_change_model) materialises after continent_change_model, which itself materialises after country_populations. The framework tracks tables, datasets, ML models and reports as first-class materialisations, stores run metadata, lineage and observability per asset, and carries the same model from local development through unit and integration tests, staging, and production. PyPI support spans Python 3.9 through 3.14.

## Why It's in the Arsenal

The engineering decision it removes is how to declare dependencies when the thing you produce is data rather than a task. With a task-level DAG, a changed upstream table shape silently breaks a downstream step that was only ordered correctly by luck. Asset functions force the dependency into the type signature, so a wrong argument name is an import-time failure and a changed column becomes a test failure you wrote before the pipeline ran.

## Key Features

- Dependency edges fall out of function signatures, so a mis-wired pipeline fails early instead of at 3am.
- The same asset code runs in unit tests, integration tests, staging and production with no rewrite.
- Lineage, observability and the asset catalog are built in rather than bolted on as a separate metadata service.
- Apache-2.0 licensed with an open-source Dagster core and a paid cloud tier.

## Architecture / How It Works

Assets are materialised by the execution engine, which resolves the graph from parameter annotations, then runs each node with resources bound through a context object. Partitions slice the graph so the same code materialises per-day or per-entity without duplication, and sensors or schedules trigger runs on the outside. Metadata about every run flows into the Dagster web UI and its backing store, which is where lineage, freshness and observability views are rendered. Because assets are ordinary functions, the same code path is exercised by a unit test, a local run, and a production run.

Work is a graph of steps where one step's output is the next step's input, so a schema change propagates downstream and a retry needs idempotency or you pay for the same tool call twice. The execution model matters more than the feature surface for Dagster unlike `prefect`; on the orchestration path; under a freemium cost model; with `dagster`, `name`, `type`. A call either returns, times out, or is rate-limited, and which of those you get under load is what separates a working integration from a demo.

## Getting Started

Install from PyPI and start the local UI, then declare assets as functions:

```bash
pip install dagster
```

The README's quick start points at the hands-on tutorial; the sample graph defines country_populations, continent_change_model and continent_stats as three @dg.asset functions whose parameters form the edges.

## Use Cases

1. An ML feature pipeline where continent_stats must recompute whenever the regression model's coefficients change, enforced by argument wiring rather than a manual run order.
2. Partitioned daily table builds where one function body materialises every date and Dagster tracks freshness per partition.
3. Local-to-production parity: unit-test an asset function with pytest, then let the same code run under the production scheduler with resources pointing at real warehouses.

## Strengths

Dagster competes with Prefect and Flyte in workflow orchestration, and the difference is where the dependency lives: Prefect stays close to plain Python task decorators, Flyte is a container-and-catalog-first system, while Dagster makes the data asset and its lineage the primary object. It overlaps with dbt for the analytics-engineering audience and complements content/projects/frameworks entries such as Metaflow when both are being weighed for MLOps-heavy teams. It is not a substitute for a warehouse-native scheduler.

## Limitations / When NOT to Use

You are committing to a Python-centric mental model and to running the Dagster webserver plus its metadata store, which is real infrastructure for a small team. The learning curve is steeper than a plain task runner because assets, resources, partitions, sensors and ops all need to be understood before the first production run. Rich metadata is only as good as the instrumentation you add, so an under-instrumented asset graph still tells you little. And the surrounding ecosystem of connectors and partitioning helpers is thinner than the dbt or Airflow worlds it overlaps with.

## Integration Patterns

This is the asset-graph counterpart to the flow orchestrators in content/tools/orchestration, sitting beside prefect and flyte in this catalog. Pair it with content/projects/training-and-alignment entries when the assets being tracked are model checkpoints, and with content/tools/data-ingestion entries such as dlt or Elasticsearch where upstream ingestion feeds the assets. Compare it directly against Prefect before picking one for the same team.

## Resources

- [GitHub — dagster-io/dagster](https://github.com/dagster-io/dagster)
- [Docs and hands-on tutorial](https://docs.dagster.io)
- [Product site — dagster.io](https://dagster.io)

## Buzz & Reception

Declaring @dg.asset functions whose arguments become edges gives you dependency-aware materialisation and unit-testable asset code, not a task DAG in YAML.

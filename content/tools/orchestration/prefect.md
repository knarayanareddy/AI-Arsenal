---
id: prefect
name: Prefect
type: tool
job: [orchestration]
description: "Python workflow framework where @flow and @task decorators add scheduling, caching and retries to plain scripts"
url: "https://github.com/PrefectHQ/prefect"
cost_model: freemium
pricing_detail: Open source or free to start
tags: [orchestration, observability]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/PrefectHQ/prefect"
docs_url: "https://docs.prefect.io"
github_url: "https://github.com/PrefectHQ/prefect"
alternatives: [dagster]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, production]
best_when: ["You have Python scripts that already work and need retries, scheduling and observability added this week rather than after a rewrite into a workflow DSL.", "You want event-driven automation, so a flow can trigger on an arrival rather than only on a cron or sensor schedule.", "You would rather run the orchestrator yourself and can accept a self-hosted Prefect server instead of a vendor-hosted dashboard."]
avoid_when: ["You want asset-level lineage as the primary model, because that is Dagster's design choice and Prefect's unit is the flow and task.", "You need container-per-step isolation and a catalog-driven authoring model, which points at Flyte rather than a decorator-based Python framework.", "You cannot accept any server component, because Prefect Cloud is optional but the self-hosted path still runs a Prefect server for the dashboard and run history."]
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
enrichment_status: draft
---

## Overview

Prefect wraps plain Python in two decorators: @task for a unit of work with retries, caching and result persistence, and @flow for an orchestrated function that composes tasks and can be deployed. The README's smallest example fetches a GitHub star count inside a task inside a flow, which is the whole pitch: the same code runs locally as a script and as a scheduled production workflow. Flows handle retries, dependencies and branching, and activity is tracked in either a self-hosted Prefect server or the hosted Prefect Cloud dashboard.

## Why It's in the Arsenal

The recurring decision is how much of a framework you must accept before your script becomes a workflow. Prefect's answer is nearly none: decorate, and you get persistence, retries, caching and a run history without a YAML file or a container per step. That means an existing notebook-grade script can be promoted to something with an SLA this afternoon, which is not true of most orchestrators that want their authoring model adopted first.

## Key Features

- Lowest adoption cost in the category: decorators on code you already have, no DSL and no container requirement per step.
- Retries, caching and dependency tracking come for free from the decorator rather than from configuration.
- Self-hostable Prefect server keeps run history on your infrastructure, with a hosted tier available when you do not want to operate it.
- Python 3.10+ support with both pip and uv documented paths.

## Architecture / How It Works

A flow is a function whose calls are recorded as a run; tasks inside it execute with Prefect-managed retries, caching rules and state, so a cached task can return a prior result without re-running its body. Dependencies come from the Python call graph inside the flow rather than a separate declaration, and branching uses ordinary Python control flow. A scheduler or event trigger initiates runs against either the local ephemeral server used in development or a persistent self-hosted server or Prefect Cloud.

## Getting Started

Install from PyPI and decorate a function; Python 3.10 or newer is required:

```bash
pip install -U prefect
```

Then import flow and task, wrap the fetch in a task decorator and the script in a flow decorator, and run it. `uv add prefect` is the documented alternative.

## Use Cases

1. Promoting a working ETL script: add a task decorator for the flaky API call, a flow decorator for the script, and you have retries plus a run history without a rewrite.
2. Event-driven automation triggered by a webhook or an arrival rather than a cron schedule.
3. Cached expensive stages so a rerun of the flow replays cached task results instead of re-calling a model or a paid API.

## Strengths

It competes with Dagster, Airflow and Flyte in orchestration, and the sharpest distinction is with Dagster: Prefect keeps the task and flow as the unit and infers dependencies from calls, while Dagster makes the data asset with parameter-derived lineage the unit. It overlaps with content/projects/frameworks/metaflow for the small-team experiment-tracking crowd. Compared with Airflow, Prefect requires no separate DAG-definition file, and it complements the serving entries rather than competing with them.

## Limitations / When NOT to Use

Call-graph-derived dependencies mean you cannot express a DAG the Python call graph does not contain, which matters when a step is conditionally skipped or externally triggered. The in-process model gives you no real isolation between steps, so one task crashing the interpreter takes the run with it. Running the self-hosted server and its backing store is infrastructure a small team has to own, and the hosted tier moves your run history and state to a vendor. Dynamic Python control flow is powerful and also makes the shape of a run harder to read at a glance than a declarative definition.

## Integration Patterns

This is the flow-based orchestrator in content/tools/orchestration, sitting beside dagster and flyte as the three engineering decisions you are choosing between. Pair it with content/tools/model-layer entries when a task wraps a model call whose cost you want cached, and with content/tools/data-ingestion entries such as dlt where ingestion becomes a task inside the flow. Its run-history model lines up with the observability tools in content/tools/evaluation-and-observability.

## Resources

- [GitHub — PrefectHQ/prefect](https://github.com/PrefectHQ/prefect)
- [Docs — docs.prefect.io](https://docs.prefect.io)
- [Prefect Cloud](https://docs.prefect.io/cloud)

## Buzz & Reception

Wrapping existing functions in decorators turns a script into a retryable, cacheable, observable flow without forcing a DSL or a container image per step.

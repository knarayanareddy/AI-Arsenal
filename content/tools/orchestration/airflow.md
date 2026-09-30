---
id: airflow
name: Apache Airflow
type: tool
job: [orchestration]
description: "Batch DAG orchestrator that schedules Python workflows, retries failed tasks and records lineage across data platforms"
url: "https://github.com/apache/airflow"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [orchestration, retrieval]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/apache/airflow"
docs_url: "https://airflow.apache.org/docs/apache-airflow/stable/index.html"
github_url: "https://github.com/apache/airflow"
alternatives: []
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [production]
best_when: ["You are a data or ML platform team and you need daily feature pipelines, model retraining jobs and backfills with a UI that non-engineers can read.", "You are migrating a pile of cron jobs and want dependency ordering, alerting and task-level retries without writing a distributed scheduler yourself.", "You run batch steps across warehouses and clusters and you need one place to see which upstream failure is blocking today's run."]
avoid_when: ["You need sub-second or low-latency event streaming, because Airflow schedules batches on a scheduler loop and a DAG cannot react to a single record.", "You want a small dependency footprint, because a production deployment adds a metadata database, a scheduler process, workers and provider packages that all need upgrading together.", "Your pipelines are genuinely dataflow-shaped with tight per-record transformation, because DAG edges encode task ordering rather than streaming data movement."]
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
enrichment_status: draft
---

## Overview

Airflow treats a workflow as a Python file that declares a DAG of operators, each node taking upstream task outputs and writing its own. Around that core sit a scheduler that decides what is runnable, executors that place tasks on Celery, Kubernetes, local slots or a managed backend, a metadata database holding task state, and an HTTP UI for triggering, clearing and inspecting runs. Data movement itself is delegated to provider packages: the task graph only says that BigQueryExport runs after Extract. Tasks exchange small values through XCom and large artefacts through object storage. Recent major versions split the authoring, scheduling and execution surfaces apart, with a task SDK so workers no longer need the full Airflow package installed.

## Why It's in the Arsenal

The recurring decision is how a batch job fails safely at 3am. Airflow answers it with declarative dependencies, automatic retry with backoff, task-level logs, a run history that shows which attempt of which task succeeded, and catchup or manual backfill for the window you missed. It also answers the people question: the Grid and Graph views let a data owner see that yesterday's revenue table is blocked on a failing extract, without anyone writing a status endpoint. The cost is that you are committing to a large Python platform whose upgrades are real projects.

## Key Features

- Python-native task definitions, so a pipeline step is an ordinary function or script and can be tested without the scheduler.
- Extremely broad provider coverage for warehouses, cloud services, Kubernetes and notification channels, which removes most glue code.
- Rich operational surface: retries, timeouts, pools for concurrency limits, SLA misses, backfill and a full run history.
- Apache-2.0 licensed with a very large installed base, so hiring and Stack Overflow answers are both non-issues.

## Architecture / How It Works

A scheduler process parses DAG files in a configured dags folder, materialises task instances in the metadata database and computes which are schedulable by walking dependencies and marking upstream successful. A task executor then materialises a worker for each due task: LocalExecutor uses process slots, CeleryExecutor pushes to a broker, KubernetesExecutor creates a pod per task, and the newer task execution API lets a separate execution plane handle long-running or deferred work. Workers run the operator's execute method, write structured logs and report state back to the database over REST. XCom rows carry return values for small hand-offs, while anything larger is written to object storage and passed by key. The scheduler-to-database round trip is what introduces the minute-scale scheduling latency and the metadata database that has to be sized and backed up.

## Getting Started

Install into a clean virtualenv first, then run the standalone initialisation which creates the SQLite metadata database and a first login:

```bash
python3 -m venv airflow-env && source airflow-env/bin/activate
pip install "apache-airflow==$(python -c 'import airflow; print(airflow.__version__)')" --constraint "https://raw.githubusercontent.com/apache/airflow/constraints-$(python -c 'import airflow; print(airflow.__version__)')-3.1.0/constraints-3.1.0.txt"
airflow standalone
```

Point `AIRFLOW_HOME` at a versioned directory before the first run; the UI comes up on port 8080 and DAG files go in `$AIRFLOW_HOME/dags`.

## Use Cases

1. Nightly pipeline orchestration: run extraction, transformation, model scoring and reporting as separate retriable tasks with alerting on the task that actually failed.
2. Backfill and reprocessing: clear a failed task to re-run it with upstream state intact, or trigger a date range across a partitioned dataset when a source system is corrected.
3. Training and evaluation pipelines: gate a long training job on data-quality checks, and expose the model artifact path to a downstream serving deployment DAG.

## Strengths

Airflow is the incumbent in batch orchestration and the thing most often compared against, with Dagster, Prefect and Flyte all marketing a cleaner asset or task-centric model, and Argo Workflows and Luigi occupying the Kubernetes-native and legacy-simple ends of the same space. Where Dagster pushes data lineage as the primary object and Prefect pushes Python-native dynamic flows, Airflow holds on to the DAG graph and the largest provider catalogue. It overlaps with the workflow engines in content/projects/agent-systems such as Dify and Langflow for the no-code half of the market, but its scheduling semantics are batch rather than conversational. It complements rather than replaces the engines in content/projects/inference-engines, since an Airflow task is a normal Python process that calls whatever serving stack you run.

## Limitations / When NOT to Use

Scheduling latency is structural: a task becomes runnable only after a scheduler pass and a database write, so per-task overhead is measured in seconds and worst-case delay grows with DAG size and scheduler load. The platform is heavy for small teams: a responsible deployment is a managed Postgres or MySQL metadata database, a scheduler, workers, a secret backend and version-pinned providers, and constraint-file conflicts during upgrades consume real engineering time. It is batch-only, so streaming and continuous triggers are patterns you build around it rather than into it. Auth and RBAC were limited in older releases and moved toward a pluggable auth manager, so governance-sensitive deployments need to read the current version's docs rather than blog posts. DAG-file parsing means a slow or heavy import inside your DAG file slows the whole scheduler loop.

## Integration Patterns

This is the batch backbone entry for the orchestration phase and the natural parent of ML training DAGs that call into content/projects/model-layer tooling such as axolotl or ms-swift, and of serving rollouts that call content/projects/serving-and-deployment entries. Read it alongside content/projects/framework entries such as Ray Serve when you are choosing between a workflow scheduler and a programmatic serving runtime, and against the retrieval-phase entries in content/projects/data-and-retrieval when the DAG's job is to keep a vector index fresh. It is not a substitute for a conversational agent framework; pair it with one of the framework entries rather than bending Airflow into a chat loop.

## Resources

- [GitHub — apache/airflow](https://github.com/apache/airflow)
- [Documentation — airflow.apache.org/docs](https://airflow.apache.org/docs/)
- [Astronomer Registry — providers and release notes](https://registry.astronomer.io/)

## Buzz & Reception

Batch work is the native unit of ML pipelines, and Airflow gives it a scheduler, retries, backfills, SLA tracking and a UI that a crontab cannot.

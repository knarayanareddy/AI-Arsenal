---
id: kestra-io-kestra
name: "kestra"
version_tracked: null
artifact_type: platform
category: tooling
subcategory: platforms
description: "Apache-2.0 Java orchestration platform with event-driven triggers, durable execution, and a UI for data and AI pipelines"
github_url: "https://github.com/kestra-io/kestra"
license: "Apache-2.0"
primary_language: Java
org_or_maintainer: "kestra-io"
tags: [orchestration, data]
maturity: production
cost_model: open-source
github_stars: 28401
github_stars_last_30d: 0
trending_score: 36
last_commit: "2026-09-28"
docs_url: "https://kestra.io/docs"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Event-driven orchestration and scheduling platform for data and AI pipelines, with durable execution semantics and a UI for long-running batch-plus-agent workloads."
best_for:
  - "You are scheduling recurring data and AI work - nightly embeddings, batch scoring, retrieval refreshes - and want a visual UI with run history and lineage instead of a cron job and a log file."
  - "You need event-driven triggers so a new object or a webhook starts the pipeline, and you want the trigger logic in configuration rather than in a scheduler you maintain."
  - "You are orchestrating hybrid batch and long-running agent steps and need one surface to see what is running, what failed, and where it stalled."
avoid_if:
  - "You only need a single job with a schedule, because a cron entry or a simple queue is less to run and to understand than a control plane."
  - "You need deep per-task durability guarantees with version-pinned definitions, because the durability story here is good but shallower than a dedicated execution engine's."
  - "You have no capacity to operate stateful infrastructure, since the platform requires a database, a server, and a worker pool with upgrades and backups to own."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 28401 stars, Apache-2.0 license, Java primary language, last commit 2026-09-28, 20 GitHub topics including ai-agents, data-orchestration, workflow-automation. Trigger types, task catalog, control-flow semantics, and AI task types are from official docs; the platform was not deployed in this session."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/kestra-io/kestra", "date": "2026-09-28", "description": "28,401 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Kestra is an orchestration and scheduling platform written in Java, with a browser UI over a YAML workflow definition. A flow declares its inputs and variables, a list of tasks or subtasks, and triggers - a schedule, a poll, a webhook, a message-queue event, or a flow completion - and the platform executes the tasks in order, recording each one's inputs, outputs, timing, and logs against the run. Tasks come from a large plugin catalog covering shell commands, HTTP calls, database and warehouse operations, container execution, and scripting languages including Python, and flows compose through subflows, conditions, loops, try-catch with error handling, and parallel branches. Recent work has added first-class support for AI and agent steps, so a pipeline can call a model or run an agent as one task among many. Underneath is a Java peer-based server with workers, a metadata database, and a queue, and the whole thing is open source under Apache-2.0 with a hosted commercial offering alongside.

## Why it's in the Arsenal

The recurring decision Kestra resolves is that a data pipeline should be inspectable by someone who did not write it. A cron job plus a shell script tells you whether it ran but not what it did with which inputs, and when a backfill goes wrong the diagnosis starts from log files scattered across machines. Here every run is a first-class object with per-task timing, captured inputs and outputs, and a log stream in the UI, and a flow that failed at task seven of twelve shows exactly which task and why. The second decision is composition without a language tax: expressing a loop, a branch, a retry, or a fan-out in YAML with a plugin per integration means a pipeline does not become a bespoke application the moment it needs conditionals. The third is that AI work has the same shape as ETL once you accept the operational model, and putting model calls and agent steps next to database tasks in one flow is what makes an AI pipeline as observable as a data pipeline.

## Architecture

The architecture is a Java control plane plus worker nodes. A flow definition in YAML is parsed into a graph of task runs; the scheduler evaluates triggers - a cron schedule, an event, a poll - and starts a flow execution, which materializes the root task and its nested tasks as records in the metadata database. The executor distributes task runs to workers over an internal queue; a task run is dispatched to a worker plugin matching its type, which executes in an isolated process or container depending on the plugin, and returns outputs that are stored, referenced by downstream tasks through expressions into the run context, and rendered in logs. Control flow - conditions, loops, try-catch, error triggers, parallel branches - is interpreted by the engine rather than executed by the JVM stack, so a single task failure becomes a state transition the UI can display rather than a dead execution. Namespace and revision management on flows let a flow be versioned, and the UI exposes run history, per-task logs, and the execution graph. For AI workloads the platform adds task types that call a model endpoint or run an agent step, with the model configuration resolved as a plugin so credentials and endpoints live in the platform rather than in each flow. Persistence is a relational database, with object storage commonly used for large task outputs and logs.

## Ecosystem Position

Kestra competes with Airflow, Prefect, Dagster, and the workflow-engine entry in this batch, and compared with Airflow it wins on event-driven triggers, a UI-first experience, and AI task types, while Airflow wins on maturity of the data-ecosystem operator library. It overlaps with the event-driven workflow engine in this batch, which is Java and built for durable microservice and agent processes with compensation, where compared to Kestra the difference is durability depth versus pipeline ergonomics. It is an alternative to a bespoke Airflow DAG or a cron-plus-script setup, and it is rather than a data-processing engine: it orchestrates, and the warehouse, the stream processor, or the model endpoint does the work. Inside the Arsenal it is the scheduling layer that content/projects/data-and-retrieval/ pipelines run on and that content/projects/training-and-alignment/ batch jobs and evaluation sweeps are triggered from. Compared with the in-process analytical engine in this batch, Kestra is the durable coordinator above it rather than a query engine, and the two compose well.

## Getting Started

Run the platform with its bundled PostgreSQL and start the UI:

```bash
docker compose up -d
```

The UI comes up on the mapped port with the default credentials; create a namespace, then author a flow in YAML with a schedule trigger and a shell or HTTP task, and watch the run appear in the execution view.

## Key Use Cases

1. Nightly and hourly AI data work - re-embedding a corpus, refreshing a vector index, batch scoring - with run history and per-task logs instead of a scheduler you own.
2. Event-driven pipelines where a webhook, a new object, or a queue message starts work, with the trigger expressed in configuration.
3. Hybrid batch-and-agent flows where a pipeline calls a model or runs an agent step alongside database and API tasks and the whole run is inspectable in one place.

## Strengths

- Strong event-driven trigger model - schedules, webhooks, polls, and queue events - rather than schedule-only orchestration.
- UI-first with per-run, per-task inputs, outputs, timing, and logs, which is what makes diagnosing a failed pipeline a query rather than an investigation.
- A large plugin catalog including scripting languages, so branching logic does not force you to build a bespoke application.
- Apache-2.0 with first-class AI and agent task types, so model calls are first-class pipeline steps with the same retry and observability as everything else.

## Limitations

Durability and version-pinning guarantees are shallower than a dedicated durable-execution engine, so very long-running or stateful agent workflows can outgrow it. The operational surface is real: a Java server, workers, a metadata database, and usually object storage, all of which you back up and upgrade, and the local development experience is thinner than the hosted one. Plugin coverage is uneven, and a task that a connector does not support means writing a plugin or wrapping the call in a script task, which pushes logic back out of the flow. Run history grows without bound and needs retention configured, and the YAML-plus-UI model is less pleasant for heavily programmatic or version-controlled-at-scale use than a pure-as-code approach with strong diffs. And because the AI task types are new relative to the core, their maturity is behind the data connectors.

## Relation to the Arsenal

The scheduling and orchestration layer of the data-and-retrieval phase, and the natural coordinator for the pipelines, retrieval refreshes, and evaluation sweeps described across content/projects/data-and-retrieval/ and content/projects/evaluation/. Its AI task types are the practical bridge to the model and agent entries in content/projects/foundation-models/ and content/projects/agent-systems/, which supply the work it schedules. The event-driven workflow engine in this batch is the durable-execution alternative for a single long-running process with retries and approvals, and the in-process analytical engine in this batch is the query layer it orchestrates rather than a competitor. The observability entries in content/projects/evaluation/ are where per-run cost and latency would be aggregated, which is where an AI pipeline run becomes an operational number rather than a log line.

## Resources

- [GitHub — kestra-io/kestra](https://github.com/kestra-io/kestra)
- [Kestra documentation](https://kestra.io/docs)
- [Plugin catalog](https://kestra.io/docs/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (28,401 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*

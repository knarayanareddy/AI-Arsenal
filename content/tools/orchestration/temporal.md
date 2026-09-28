---
id: temporal
name: "Temporal"
type: tool
job: [orchestration]
description: "Durable execution server that replays workflow history so long-running processes survive crashes"
url: "https://temporal.io"
cost_model: self-hostable
pricing_detail: "MIT open-source server (self-host free); Temporal Cloud usage-based"
tags: [orchestration, self-hosted, stateful, docker]
maturity: production
stack: [go, polyglot]
free_tier: true
free_tier_limits: "Self-hosting is free; Cloud has usage-based pricing with credits for startups"
self_hostable: true
open_source: true
source_url: "https://github.com/temporalio/temporal"
docs_url: "https://docs.temporal.io"
github_url: "https://github.com/temporalio/temporal"
alternatives: [prefect, dagster, airflow]
integrates_with: [langgraph]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [production]
best_when: ["You are running a process that spans minutes to hours with model calls, payments or human approvals in the middle, and you need it to survive a deploy or a crash mid-flight.", "You have already been burned by a queue-based retry that executed a side effect twice, because event history is what makes a retry safe rather than a source of duplicate charges.", "You want deterministic replay for debugging, since the Go server originates as a fork of Uber's Cadence and the workflow history is the artefact you inspect."]
avoid_when: ["You are orchestrating a sub-second request, because a workflow execution involves persisting events and a worker round trip, which is overhead a plain function call does not pay.", "You want a visual canvas your colleagues can read, because Temporal is a code-first library plus a server, not a drag-and-drop automation tool.", "You cannot operate a stateful service with its own database, since the server owns event history and namespaces, and a single-tenant batch script does not need that surface."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (21,489), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The de facto durable-execution standard; the strongest answer to 'my agent died mid-task' in production"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/temporalio/temporal", "date": "2026-07-08", "description": "21,489 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Temporal is a durable execution platform. You write a Workflow function containing your application logic and Activities containing the side-effecting calls, then register them with a Worker. The server executes workflows resiliently, retrying failed operations and surviving intermittent failures, because it does not hold your process's state in memory: it holds an append-only event history and replays it whenever a worker picks the workflow back up. The technology is a fork of Uber's Cadence, developed by Temporal Technologies, and the server is Go while SDKs exist for Go, Java, TypeScript, Python and others. A local dev server plus a CLI and a Web UI on port 8233 make the loop inspectable during development.

## Why It's in the Arsenal

The recurring decision is whether you can hold program state across a process boundary. A naive agent loop keeps its cursor in a Python variable, so a deploy loses it, a worker restart loses it, and a retry after a partial failure repeats the side effect that already happened. Temporal's answer is to make the state external and the execution a function of history: replay reconstructs the in-memory state, and a completed activity's result is read from history rather than re-executed. For anything that spends money or calls an external API on a human timescale, that is the difference between a retry policy and a correct system.

## Key Features

- Event-history replay makes retries safe for side effects, which is the property queue-based orchestration cannot give you.
- Long-running by design, so a multi-hour process and a multi-day approval wait are the same mechanism rather than a workaround.
- Language SDKs across Go, Java, TypeScript and Python, so the workflow can live where the rest of your service does.
- Local dev server plus CLI and Web UI, which makes workflow debugging an inspection exercise rather than log archaeology.

## Architecture / How It Works

A Workflow is a deterministic function - no direct I/O, no wall-clock reads, no random - whose body replays identically each time. Side effects live in Activities, which run on workers, can be retried independently, and have their results written into the event history. The Go server stores that history per workflow execution, schedules activities, and hands pending work to workers through long polling; a worker crash simply causes a replay from the last recorded event. The CLI exposes namespace and workflow operations, and the Web UI renders live executions, which is where you watch a stuck workflow and see exactly which activity has been retrying.

## Getting Started

Install the CLI and start the development server, which brings its own dependencies:

```bash
brew install temporal
temporal server start-dev
```

Then clone a Go or Java sample and run it against the local server. The Web UI is at http://localhost:8233, and the CLI lists namespaces and workflows for inspection.

## Use Cases

1. Long agent runs: a research or code agent that takes an hour survives a deploy because the cursor is in event history, not in a worker process.
2. Human-in-the-loop approvals: a workflow waits on a signal for days while the rest of the business process stays durable and auditable.
3. Exactly-once-effect patterns: a payment or booking activity that already completed is read back from history on replay rather than re-executed after a failure.

## Strengths

Temporal competes with Airflow and Dagster as the orchestration layer under data and AI pipelines, and the decisive difference is unit of work: Airflow schedules DAGs of tasks, while Temporal drives a single long-lived process through interruptions. It overlaps with n8n in the same batch's orchestration phase, where n8n describes a flow on a canvas and Temporal encodes it in code with durable replay. Compared with a hand-rolled queue plus idempotency keys, Temporal gives you the history and the replay for free at the cost of a service to run and a determinism discipline in your workflow code. It complements rather than replaces the agent frameworks in content/projects/frameworks, which usually need a durable host precisely because their loops can be interrupted.

## Limitations / When NOT to Use

Workflow code must be deterministic, and that constraint bites: no direct database reads, no wall-clock reads, no unseeded randomness inside a workflow, or replay diverges. You are adopting a stateful service with its own persistence, upgrade path and capacity planning, which is a real operational commitment rather than a library. Activity latency and event storage grow the bill for high-fan-out workflows, and the cost model is not a flat licence you can budget from a pricing page. The Go server plus a multi-language SDK surface means debugging a production incident means understanding the server's internals, not just your own code.

## Integration Patterns

This is an orchestration-phase tool and the durable-execution counterpart to n8n in the same phase, which is worth reading as a pair: one is a canvas, one is a coded history. It sits under the agent frameworks in content/projects/frameworks - LangGraph and AutoGen among them - as the host that makes their loops survivable, and under the workflow-automation usage in content/tools/data-ingestion. When you pick an inference engine such as vLLM from content/projects/inference-engines, Temporal is what keeps the job alive while that engine is being restarted.

## Resources

- [GitHub - temporalio/temporal](https://github.com/temporalio/temporal)
- [Documentation - docs.temporal.io](https://docs.temporal.io)
- [Temporal CLI and dev server quick start](https://docs.temporal.io/develop/go/getting-started)

## Buzz & Reception

Replaces in-memory continuation state with an event history the server can replay, which is the only way a multi-hour agent or payment workflow survives a deploy without double-charging a customer

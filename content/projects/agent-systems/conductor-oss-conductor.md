---
id: conductor-oss-conductor
name: "conductor"
version_tracked: null
artifact_type: platform
category: agents
subcategory: autonomous
description: "Apache-2.0 Java workflow engine giving long-running agent and microservice tasks durable retries, timers, and human steps"
github_url: "https://github.com/conductor-oss/conductor"
license: "Apache-2.0"
primary_language: Java
org_or_maintainer: "conductor-oss"
tags: [orchestration, agents]
maturity: production
cost_model: open-source
github_stars: 32238
github_stars_last_30d: 0
trending_score: 36
last_commit: "2026-09-28"
docs_url: "https://docs.conductor-oss.org/"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [deploy-as-is]
health_signals: [actively-maintained]
ecosystem_role:
  - "Durable event-driven workflow engine for agentic systems, giving long-running LLM tasks retries, timers, and human-in-the-loop steps that a request-scoped agent loop cannot."
best_for:
  - "You have an agent task that takes minutes or hours - a large document set, a long tool sequence - and a request-scoped loop will lose all progress the moment a worker restarts or an API rate limit hits."
  - "You need a human approval step in the middle of an automated pipeline, and a chat-based confirmation in the model context is not an audit record you can show a reviewer."
  - "You already run microservices and want orchestration, compensation, and per-task retry in the same system rather than bolting a separate queue and scheduler onto your services."
avoid_if:
  - "Your agent work is request-scoped and finishes in seconds, because a durable workflow engine adds persistence, a control plane, and eventual-consistency semantics for no benefit at that latency."
  - "Your team has no on-call appetite for stateful infrastructure, since losing the database means losing in-flight tasks, and backup and upgrade are your responsibility."
  - "You want a lightweight in-process library rather than a service, because the deployment model assumes a separate control plane and worker fleet you can see and scale."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 32238 stars, Apache-2.0 license, Java primary language, last commit 2026-09-28, 14 GitHub topics including durable-execution, grpc, spring-boot. Task types, definition versioning, retry semantics, and the custom-task SDK are from official documentation; no server was started and no example image tag was verified."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/conductor-oss/conductor", "date": "2026-09-28", "description": "32,238 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Conductor is an event-driven orchestration platform whose central claim is durable execution: a workflow definition is stored, a workflow instance is started against it, and every task's state transitions are persisted, so a worker crash or a host restart resumes rather than restarts. Workflows are defined in JSON, which names tasks and their inputs, describes transitions between them, and specifies retry counts, timeouts, and rate limits per task. A task is either a prebuilt worker type - HTTP, JSONata transformation, script, or a dynamic or custom task your own service registers - or one implemented by your code through the task worker SDK, in which case Conductor schedules it, retries it, and records the outcome. The Java-based server with a gRPC and HTTP surface plus SDKs for several languages is the practical shape: the control plane owns the queue and the state, and worker processes pull work.

## Why it's in the Arsenal

The recurring decision Conductor resolves is the gap between an agent demo and an agent process. A request-scoped loop holds its state in memory, so a provider timeout, a worker deploy, or a token expiry destroys an hour of work and the only remedy is to start over. Here the definition is data, the state is durable, and a task is retried on a policy rather than being lost with the process - which is what makes a multi-hour agent run a supervised operation instead of a gamble. The second recurring decision is human involvement as a first-class step: an approval is a task with a defined outcome and a recorded actor, not a conversational aside in a model context, which matters the moment someone has to demonstrate why an action was approved. And because it is an established orchestration platform with existing SDKs, adding it does not mean inventing a scheduler, a queue, and a console first.

## Architecture

The server is a state machine store plus a dispatcher. A workflow definition, stored as JSON in the metadata store, is versioned by a version number that tasks pin, so a running instance keeps executing the definition it started with even after the definition is updated. Starting a workflow creates an instance whose tasks are materialized into rows, each with a status - scheduled, in-progress, completed, failed, timed out - and a scheduled execution time. The dispatcher polls for due tasks, assigns them to a free worker, and the worker executes and reports the result, which the server writes back as an event and uses to route to the next task through the transition rules. Retry is per-task with configurable counts and backoff, and timeouts plus rate limits are enforced by the server, so a flaky downstream API produces backoff rather than a failed pipeline. Compensation is expressed as additional tasks on a transition, which is how a saga over several services is written. Task types resolve through a registry: built-in workers cover HTTP calls, JSONata transformation, and scripting, while a custom task is a service that registers a task type and polls for work through the SDK, so your business logic lives in your code and orchestration lives in Conductor. The Java server exposes gRPC internally and REST for the API and console, and persistence is a relational database, which is the piece to back up carefully.

## Ecosystem Position

Conductor competes with the general workflow orchestrators such as Airflow, Temporal, and Camunda, and compared with those it is lighter to adopt and shallower in guarantees: it wins on a clean JSON workflow model and a permissive SDK, while Temporal wins on a much stronger execution model and Airflow on data-pipeline maturity. Inside the Arsenal it overlaps with the event-driven orchestration entry in this batch, which targets data and AI pipelines with a scheduling-first design, and the choice there is about durable-execution depth versus a more approachable pipeline UI. It is an alternative to writing your own queue, scheduler, and retry layer around an agent, and rather than an agent framework it is the substrate one runs on: compared with the LLM agent frameworks in content/projects/agent-systems/, Conductor knows nothing about models and provides the reliability they lack. The observability entries in content/projects/evaluation/ are the natural pair, since a durable pipeline is exactly what needs tracing.

## Getting Started

Run the standalone server with Docker and start a workflow through the REST API:

```bash
docker run --rm -p 8080:8080 --name conductor -d orkesio/conductor-standalone:3.21.11
```

```bash
curl -X POST http://localhost:8080/api/workflow/def \
  -H 'Content-Type: application/json' \
  -d '{"name":"summarize-docs","tasks":[{"taskReferenceName":"fetch","type":"HTTP","inputParameters":{"uri":"https://example.com/doc"}}],"inputSchema":[]}'
curl -X PUT http://localhost:8080/api/workflow/summarize-docs \
  -H 'Content-Type: application/json' -d '{"correlationId":"run-1"}'
```

Register a custom task worker in your own service to do the real work; the server schedules, retries, and records it.

## Key Use Cases

1. A long agent pipeline - ingest, chunk, embed, index, evaluate - that must survive a worker restart without losing hours of completed work.
2. Human approval in an automated action, recorded as a task with an actor and outcome rather than a message inside a model context.
3. Multi-service sagas with compensation, where a failure partway through needs an explicit rollback path rather than a manual reconciliation.

## Strengths

- Durable, resumable execution with per-task retry, timeouts, and rate limits, which is the reliability the agent frameworks in this space generally lack.
- Human-in-the-loop as a typed task with a recorded actor, so approvals are auditable.
- Permissive task model: HTTP, transformation, and script workers ship in the box, and a custom task is just a service registering a type.
- Versioned workflow definitions pinned to running instances, so a deploy does not change the behavior of work already in flight.

## Limitations

Guarantees are shallower than a purpose-built durable-execution system, so a long-running workflow under heavy failure still needs application-level idempotency and reconciliation. The persistence layer is your responsibility: losing the database loses in-flight tasks, and restore time scales with the workflow history, which grows because every task transition is a row. Operations are correspondingly real - a Java service, a console, a metadata store, and a worker fleet, with upgrades and version compatibility to plan around - and the JSON workflow model, while readable, is less expressive than a real language for complex logic. Custom task workers are separate processes, which adds deployment surface and a failure mode per task type, and debugging a stuck instance means reading server logs and the console rather than a local trace. It is also simply the wrong tool at request latency, where durable persistence costs more than it saves.

## Relation to the Arsenal

The reliability substrate under the agent entries in content/projects/agent-systems/, several of which are single-request loops that would otherwise lose state on failure. It is the event-driven orchestration counterpart to the data-pipeline orchestration entry in this batch; choose between them on whether the workload is scheduled data movement or a long-running process with retries and approvals. It does not know about models, so the checkpoints served to it come from content/projects/foundation-models/ through the serving entries in content/projects/inference-engines/, and the observability tooling in content/projects/evaluation/ is where you would instrument the pipeline it runs. The event-driven agent platform in this batch solves the reliability problem for many independent sources instead of one long process, which is the useful contrast. If you are still prototyping, use a simpler runtime and add this when the work becomes something you cannot afford to lose.

## Resources

- [GitHub — conductor-oss/conductor](https://github.com/conductor-oss/conductor)
- [Orchestrator documentation](https://docs.conductor-oss.org/)
- [Building custom task workers](https://docs.conductor-oss.org/content/how-tos/system-tasks/custom-task-workers.html)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (32,238 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*

---
id: run-llama-llama-deploy
name: "llama_deploy"
version_tracked: null
artifact_type: tool
category: llms
subcategory: tools
description: "Deployment layer that turns a LlamaIndex agentic workflow into running services with API and control-plane surfaces"
github_url: "https://github.com/run-llama/llama_deploy"
license: "MIT"
primary_language: Python
org_or_maintainer: "run-llama"
tags: [agents, llamaindex, inference]
maturity: beta
cost_model: open-source
github_stars: 2068
github_stars_last_30d: 0
trending_score: 22
last_commit: "2026-04-06"
docs_url: "https://developers.llamaindex.ai/"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [language]
relation_to_stack: [deploy-as-is]
health_signals: [org-backed]
ecosystem_role:
  - "Turns agentic workflows into deployed services with API and control-plane surfaces — the packaging layer between a working notebook and a running multi-agent deployment."
best_for:
  - "You have a working LlamaIndex agent or workflow and need it running as a service with a stable endpoint."
  - "You want to run several agent deployments side by side with versions and traffic rules rather than a single ad hoc process."
  - "You need a control-plane UI or API to inspect and manage deployed agents without building custom tooling."
avoid_if:
  - "You are still iterating on the agent's logic, since deploying before the behaviour is stable is effort you will redo."
  - "You do not use LlamaIndex, since the deployment model is built around its workflow abstractions rather than being framework-neutral."
  - "You need a hardened long-lived platform with SSO and audit, since this is a young open-source control plane without enterprise identity."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (2068), MIT license, last commit 2026-04-06, primary language Python, and all six topics were read from the GitHub API. The event-driven execution model, generated typed API, model deployments with a selector, and the CLI surface come from the official docs; no deployment was run and no control plane was started here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/run-llama/llama_deploy", "date": "2026-09-28", "description": "2,068 stars and last commit 2026-04-06 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

llama_deploy is the deployment layer for LlamaIndex agentic workflows. A workflow, or a plain function or query engine, is wrapped into a deployable object that can be served over a generated API, a web UI, or a Python interface, and the same artifact can run as a single process or be distributed. The model layer is separable: the deployment can run locally against a hosted model, against a locally served one, or against several models with a selector choosing among them per request. The system is built on serverless-style event flows, where an API call triggers a run and progress is streamed back rather than held open, which is what makes long agent runs survive a client disconnect. A control plane provides a UI and API to manage deployments, inspect their state, and route traffic, and the CLI wraps the common operations for local use.

## Why it's in the Arsenal

The decision it resolves is the last mile of an agent system. Once a workflow calls tools, does retrieval, and takes more than a few seconds, a synchronous HTTP handler stops being viable: the client times out, the process dies, and there is no record of what happened. llama_deploy's event-driven execution model makes a run a first-class thing with a status and a stream, so a five-minute agent run is normal rather than an error. The second motivation is iteration: comparing two agent versions on real traffic needs both running with traffic split, which is deployment machinery rather than application code. The third is that a service boundary forces the awkward questions early, such as where the API key lives and what a failure returns, instead of leaving them implicit in a notebook.

## Architecture

A deployment is a set of services: an API server that accepts requests, one or more workflow runtimes that execute the agent logic, and a model deployment that owns the model endpoint and can be a hosted provider, a local server, or a pool behind a selector. Communication between them uses an event-driven serverless layer, so a request enqueues a run and the client subscribes to its events rather than holding a connection to a worker. The API is generated from the workflow's interface, giving typed request and response models and an OpenAPI schema, and streaming responses are exposed both as server-sent events and through the Python client. The control plane is a separate service with a UI and REST API that stores deployment definitions, their state, and their run history, and it can scale out workers for a deployment. The CLI wraps install, run, configure, and inspect so the common path does not require the UI.

## Ecosystem Position

llama_deploy is a rather than an alternative to a general deployment platform: it does not schedule containers or manage infrastructure, it wraps one framework's workflows into services, so a team on a different agent framework gets nothing from it. It overlaps with the control-plane and agent-platform entries in the agent-systems phase, which solve the same operational problem for other frameworks or for a whole fleet rather than for one workflow. Its model layer competes with nothing, since it points at the serving engines in the inference-engine phase, and it complements the observability phase, which supplies the tracing for the runs it records. The nearest thing to a direct alternative is a thin FastAPI wrapper you write yourself, which is faster to start and slower to grow.

## Getting Started

Install and run a workflow as a local service:

```bash
pip install 'llama-deploy[server]'
```

```python
import asyncio
from llama_index.core.workflow import Workflow, step
from llama_deploy import deploy

@step
async def research(ctx, topic: str) -> str:
    # tool calls and retrieval happen here
    return f"research notes on {topic}"

@step
async def write(ctx, notes: str) -> str:
    return f"report based on: {notes}"

@deploy
async def app():
    w = Workflow(timeout=600, verbose=True)
    w.add_step(research).add_step(write)
    return w

asyncio.run(deploy_app(name="research-app"))
```

```bash
# inspect and manage deployments from the CLI
llamactl deployments list
llamactl deployments get research-app
llamactl deployments run research-app --message 'summarize the vLLM release notes'
llamactl workflows new research-app -f workflow.py
```

```bash
# add an API key and a model deployment instead of relying on your shell env
llamactl models add gpt-4o --provider openai
llamactl configure research-app --models gpt-4o
```

A long run streams progress as events, so a client disconnect does not kill the run; the run is still in the control plane's history afterward.

## Key Use Cases

1. Putting a working agent workflow behind a real API so a frontend, another service, or a scheduled job can call it.
2. A/B testing two agent versions on live traffic, with both deployments running and traffic routed between them.
3. Long-running agent jobs that outlive an HTTP timeout, tracked as first-class runs with a status and a replayable history.

## Strengths

- Event-driven run model, so a multi-minute agent run is a normal first-class run rather than a held-open connection.
- Generated typed API with an OpenAPI schema, so the service contract is defined by the workflow rather than hand-written handlers.
- Multiple deployments with versions and traffic rules, which is what makes live comparison of agent variants practical.
- Separable model deployments and a selector, so provider choice is configuration and can vary per request.

## Limitations

The deployment model is built on LlamaIndex workflow abstractions, so a team using a different agent framework gets nothing from it, which is a real scope limit rather than a preference. Event-driven execution and a separate control plane add infrastructure: a serverless-style layer, a control plane service, and its store are all components you now operate, and that is heavy for a single internal agent. The project is young and pre-1.0, so configuration formats, the CLI surface, and deployment behavior have all shifted between releases, and there is no long record of production failures to learn from. Streaming a long run well is not the same as handling a partial failure mid-tool-call, where resume and idempotency are your problem. Auth is basic, so anything beyond a trusted network needs a gateway in front of it, and adding one more service to a small stack is a cost teams underestimate.

## Relation to the Arsenal

This is an inference-engine phase entry in the tools subcategory, and it is the deployment counterpart to the LlamaIndex agent framework entry rather than a competitor to it: the framework builds the workflow, this serves it. Its model layer points at the serving engines in the same phase, so a local deployment can be fronted by a self-hosted runtime instead of a hosted provider. For observability of the runs it records, the observability phase in the catalog supplies tracing, and the agent-systems phase contains the sibling platforms that solve a similar deployment problem for other frameworks.

## Resources

- [llama_deploy GitHub repository](https://github.com/run-llama/llama_deploy)
- [llama_deploy documentation](https://developers.llamaindex.ai/)
- [llama_deploy CLI reference](https://developers.llamaindex.ai/python/llama_deploy/cli/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (2,068 stars, last commit 2026-04-06, license MIT, verified via GitHub API on 2026-09-28)*

---
id: langflow
name: "Langflow"
type: tool
job: [orchestration, prototyping]
description: "Python visual builder for agent and RAG workflows that also serves them as REST endpoints and MCP servers"
url: "https://www.langflow.org"
cost_model: open-source
pricing_detail: "MIT open source; free self-hosted (DataStax-backed hosted options exist)"
tags: [rag, orchestration]
maturity: production
stack: [python, typescript]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/langflow-ai/langflow"
docs_url: "https://docs.langflow.org"
github_url: "https://github.com/langflow-ai/langflow"
alternatives: [flowise, n8n, dify]
integrates_with: [langchain]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype]
best_when: ["You want to hand a non-engineer a canvas for prototyping an agent while keeping an escape hatch to the Python source of any component.", "You need to publish one authored flow two ways, as an HTTP endpoint for your application and as an MCP server tool for an agent client, without rebuilding the graph.", "You are in the eval loop and want step-by-step control in the playground to see which node produced a wrong answer before you change the prompt."]
avoid_when: ["You need the graph to live in version control as reviewable Python, because the canonical artefact is a flow document and the canvas is the primary editing surface.", "You cannot run Python 3.10 through 3.14 environments, because that is the stated support window for the package install path.", "You are deploying to a locked-down Kubernetes cluster with no egress, because Langflow pulls model providers, vector stores and MCP clients at runtime rather than bundling them."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (151,361), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: solid-choice
verdict_rationale: "The leading Python-side visual flow builder; excellent for prototyping, but treat complex visual flows as tech debt in production"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/langflow-ai/langflow", "date": "2026-07-08", "description": "151,361 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Langflow is a visual authoring environment plus serving layer. Flows are drawn from component nodes covering major LLM providers, vector databases and a growing AI tool library, tested in an interactive playground with per-step control, and then deployed as an API, exported as JSON for embedding in Python apps, or served as an MCP server so clients can call the flow as a tool. Multi-agent orchestration with conversation management and retrieval is a first-class feature, and observability hooks into LangSmith and Langfuse. Langflow Desktop bundles every dependency for Windows and macOS.

## Why It's in the Arsenal

The decision it removes is the gap between a prototype and something callable. Most visual builders stop at the canvas, so a flow that works cannot be reached from an application without a rewrite into code. Langflow keeps the serving surface in the box, which means the same flow that a stakeholder edited on the canvas is the one your service calls over HTTP or an MCP client invokes as a tool, and the playground's step-level inspection tells you which node to fix.

## Key Features

- One authored artefact, three consumption modes: playground, REST API and MCP server tool.
- Components are Python, so a node that does not exist yet is a class you write rather than a feature request.
- Langflow Desktop removes environment management entirely for a first evaluation on Windows or macOS.
- MIT licensed and actively released, which is the practical contrast with the archived Flowise entry in this catalog.

## Architecture / How It Works

A React-Flow frontend renders the graph and stores it as a flow document; the Python backend instantiates each node from Langflow's component library and executes them in dependency order. Components are Python classes, so any node can be opened and customised, which is how provider-specific integrations get added. A FastAPI layer exposes the flow over HTTP and an MCP server mode re-publishes the same flow as tools, and tracing events forward to LangSmith or Langfuse for observability.

## Getting Started

The recommended local path uses uv, with Langflow on port 7860:

```bash
uv pip install langflow -U
uv run langflow run
```

Docker is the container route: `docker run -p 7860:7860 langflowai/langflow:latest`. Requires Python 3.10-3.14; `make run_cli` runs it from a source clone.

## Use Cases

1. Rapid RAG prototyping: connect a vector store and a retriever node, iterate on chunking and prompt in the playground, then publish the flow as an endpoint.
2. Multi-agent demos where conversation management and retrieval are configured as nodes instead of written as orchestration code.
3. MCP tool publication: expose an authored flow to an agent client so a research or triage workflow becomes a callable tool.

## Strengths

It competes with Flowise and Dify in the visual LLM-app builder category, and with n8n in broader workflow automation; compared with Flowise, which is now archived, Langflow is the maintained option, and compared with Dify it is more Python-native and ships an MCP server path. It complements content/projects/frameworks entries such as LangChain because it composes LangChain-style components rather than replacing the runtime, and it overlaps with content/tools/serving-and-deployment entries when the flow itself becomes a production endpoint.

## Limitations / When NOT to Use

The canonical artefact is a flow document rather than reviewable source, so changes still want a version-control story you have to build, for example by exporting JSON and diffing it. Runtime component resolution pulls providers on demand, which complicates air-gapped or restricted-network deployments. A long-lived server process holding provider credentials in its config needs the same hardening as any credential store. And for a team that already codes agent graphs in Python, the canvas is an extra layer to debug between the editor and the execution trace.

## Integration Patterns

- *Wiring*: adopt Langflow over an HTTP endpoint from whichever service owns the call site against the `orchestration, prototyping` job.  For a RAG pipeline this is the retrieval leg: keep the embedding model and the index in separate services so you can re-embed the corpus without touching the query path, and re-run the benchmark after any change to the chunking or the vector store.
- *Alternatives*: `flowise`, `n8n`, `dify` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Known integrations*: `langchain` are the documented surfaces worth starting from, because they establish the expected request and response contract. Pin the version you build against — a client library upgrade can change default retrieval or batching behaviour without a breaking version bump.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [GitHub — langflow-ai/langflow](https://github.com/langflow-ai/langflow)
- [Docs — docs.langflow.org](https://docs.langflow.org)
- [Deployment guides](https://docs.langflow.org/deployment)

## Buzz & Reception

Lets you draw a flow on a React-Flow canvas, iterate on it in the built-in playground, then export the same graph as JSON, a REST API or an MCP server.

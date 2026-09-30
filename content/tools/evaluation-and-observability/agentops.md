---
id: agentops
name: "AgentOps"
type: tool
job: [tracing, monitoring, evaluation]
description: "Python SDK and MIT-licensed dashboard for tracing agent runs, LLM cost, session replays and evals across CrewAI, LangGraph, Autogen and the OpenAI Agents SDK"
url: "https://www.agentops.ai"
cost_model: freemium
pricing_detail: "Free tier; paid plans by event volume/retention"
tags: [observability, tracing, agents]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "Free tier with limited monthly events and retention"
self_hostable: false
open_source: true
source_url: "https://github.com/AgentOps-AI/agentops"
docs_url: "https://docs.agentops.ai/"
github_url: "https://github.com/AgentOps-AI/agentops"
alternatives: [langsmith, langfuse-prompts, wandb-weave]
integrates_with: [crewai, autogen, openai-agents-sdk]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [prototype, production]
best_when: ["You already run an agent in production and you have no idea what a single session costs, because token accounting is spread across providers and framework layers and nobody reconciled it.", "You need to debug why a specific agent run went wrong, because the session replay shows the step-by-step execution graph, chat transcript and metadata rather than a log tail.", "You have an agent built on CrewAI, LangGraph, Agno, AG2, LlamaIndex or the OpenAI Agents SDK and want observability that does not require replacing the framework."]
avoid_when: ["You need the full product with no hosted dependency and no account, because the SDK is free but the dashboard and API backend are the hosted service, and self-hosting the app is a separate deployment exercise.", "Your data cannot leave your environment even for tracing, because instrumentation sends run data to the AgentOps backend, and the self-hosted path is the only way to keep it in-network.", "You want a vendor-neutral OpenTelemetry exporter rather than a product, because this is a closed tracing backend with its own span model rather than an instrumentation library that emits to a collector you control."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (5,685), license, and last push (2026-06-25) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: watching
verdict_rationale: "The most agent-native observability product; competes with heavyweight general LLM-obs platforms moving into agents"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/AgentOps-AI/agentops", "date": "2026-07-08", "description": "5,685 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

AgentOps is a two-part system: a Python SDK that instruments agent and LLM calls, and an app that stores, aggregates and visualises them. The SDK surface is deliberately small - agentops.init() at the start of a program and end_session() at the end gets you session replays, and a set of decorators establishes span hierarchy: @session marks the root, @agent tracks an agent, @operation or @task tracks an operation, and @workflow tracks a multi-operation unit. Decorators nest, so a method on an agent class can carry @operation and the enclosing function @session, producing a real tree rather than a flat event log. All of them record input and output, handle exceptions, and work with async, generator and sync functions, with custom attributes and names. The app is open source under MIT in a separate app directory, and there is an MCP server published on Smithery plus native integrations across the major agent frameworks and model providers.

## Why It's in the Arsenal

The recurring decision is whether you can see what an agent is doing and what it costs without rebuilding it. Instrumentation that requires restructuring a framework is instrumentation nobody adopts, which is why this is decorator-based and why the integrations are per-framework rather than requiring a particular agent design. The cost is the coupling that buys the convenience: you get AgentOps's span model, its cost table and its dashboard rather than an export you own, and the honest version of that trade is that a hosted backend is a real dependency for a component that sits in the critical path of your deployment debugging. Self-hosting exists, but it is a separate piece of work rather than the default path.

## Key Features

- Two lines to start, and the decorator model means you instrument a function rather than restructure a class hierarchy.
- Nested decorators produce a real span tree, which is what makes the replay view useful rather than a log list.
- Decorators handle async, generator and sync functions plus exceptions, so you do not have to remember which call style needs special treatment.
- The app is MIT licensed and self-hostable, and an MCP server exposes the traces to agents as well as humans.

## Architecture / How It Works

The SDK wraps provider and framework clients so that every LLM request, tool call and agent step becomes a span with input, output, timing and token counts. Spans nest by decorator, giving the parent-child structure the replay UI renders as an execution graph, and cost is derived per span from the model identifier plus token counts, aggregated per session and per agent. Framework integrations work by intercepting at the framework's own call boundary, which is why CrewAI, AG2, LangGraph, Agno, LlamaIndex, Microsoft integrations, Cohere, Groq, Mistral, Ollama and the OpenAI Agents SDK each have a dedicated page. Those spans go to the AgentOps API backend for storage, which serves the dashboard; the dashboard exposes session drill-down with metadata, a chat viewer, event graphs and summary analytics charts. The app directory is separately open source, so the backend and dashboard can be self-hosted, and an MCP server exposes the same capability to MCP clients.

## Getting Started

Install the SDK, initialise it with a project API key, and close the session at the end of the run:

```bash
pip install agentops
```

```python
import agentops
agentops.init(default_api_key="YOUR_KEY")
...
agentops.end_session("Success")
```

The dashboard at app.agentops.ai shows the sessions. To run the dashboard and API backend yourself, follow app/README.md in the repository.

## Use Cases

1. Per-session cost attribution: wrap an existing CrewAI or LangGraph agent and see token counts and estimated spend broken down by session, so you can price the feature that is quietly consuming your budget.
2. Post-mortem on a failed run: open the session replay and read the execution graph, chat transcript and metadata to find which step diverged.
3. Framework-agnostic instrumentation: apply the same decorators to a custom agent that uses no supported framework, so you still get spans without adopting a framework to be observable.

## Strengths

It competes directly with Langfuse, Helicone and Braintrust in agent observability, and the differentiators are breadth of framework integration and the decorator-first span model rather than a deeper evaluation surface. It overlaps with Phoenix and Opik in the OpenTelemetry-adjacent tracing space, but this is product-first with its own backend rather than collector-first. Compared with content/projects/frameworks entries such as langgraph or crewai, which produce the execution AgentOps records, it is a pure observer with no say in the agent's topology. It is a complement rather than an alternative to the eval tools in the same phase, since ragas and deepeval answer quality questions while this answers what-happened and what-did-it-cost. Its MCP server also means an agent can query its own traces.

## Limitations / When NOT to Use

The default path sends your run data to a hosted backend, and for anything touching customer data or regulated content that is the decision you have to make explicitly - the self-hosted app exists but is a separate deployment you now own. Cost figures are estimates derived from model pricing tables, so they drift from actual invoices and will be wrong for negotiated rates or self-hosted inference where the marginal cost is hardware rather than a per-token price. Instrumentation is only as complete as the integrations: an agent that calls a model through a path no integration covers produces gaps, and a framework that changes its internals can silently break a provider adapter. The platform is also a product with a hosted tier, so long-term behaviour of the hosted service is a factor you are taking on alongside the code. Finally, spans that record input and output are a data-retention question as much as an observability one.

## Integration Patterns

This is one of the observability entries in content/tools/evaluation-and-observability, and it differs from the evaluation tools in the same phase by watching execution rather than scoring quality. The agent frameworks in content/projects/frameworks are what it instruments, so those two folders are read together. For the model-serving side that generates the token counts this tool reports, content/projects/inference-engines holds the runtimes. If the question is security rather than visibility, the red-team scanners in the same phase target a different surface entirely.

## Resources

- [GitHub — AgentOps-AI/agentops](https://github.com/AgentOps-AI/agentops)
- [Documentation — docs.agentops.ai](https://docs.agentops.ai/)
- [Self-hosting the app and API backend](https://github.com/AgentOps-AI/agentops/tree/main/app)

## Buzz & Reception

Instruments existing agents with decorators and an init call rather than requiring a rewrite, so cost and trace data appear without changing the agent's structure.

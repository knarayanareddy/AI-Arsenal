---
title: "Orchestration Tools"
section: "tools/orchestration"
auto_generated: false
---

# Orchestration Tools

## What belongs here

Agent frameworks, workflow/pipeline schedulers, routers, memory layers, and tool-use coordination.

## What does NOT belong here

Raw inference serving belongs in Serving & Deployment; data collection belongs in Data Ingestion.

## Decision guidance

Before picking a tool in this phase, consider:

- See [Architecture Decision Trees](../../architectures/_index.md) for cross-cutting guidance.
- Key question to ask: Does this tool coordinate multiple steps, tools, or agents toward a goal?

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Orchestration in This Phase

### Recently Added

- [Agno](./agno.md)
- [any-agent](./any-agent.md)
- [Composio](./composio.md)
- [E2B](./e2b.md)
- [Flowise](./flowise.md)
- [Langflow](./langflow.md)
- [Mirascope](./mirascope.md)
- [n8n](./n8n.md)
- [Prompt flow (Microsoft)](./promptflow.md)
- [Strands Agents SDK](./strands-agents.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Agno](./agno.md) — Python SDK plus AgentOS runtime for building, serving and operating self-hosted agent platforms
- [AGNT.Hub](./agnt-hub.md) — Build and manage secure, private AI agents with custom skills and policies
- [Apache Airflow](./airflow.md) — Batch DAG orchestrator that schedules Python workflows, retries failed tasks and records lineage across data platforms
- [any-agent](./any-agent.md) — Mozilla AI's thin adapter layer that runs one agent interface across six different agent frameworks
- [Cloudskill](./cloudskill.md) — Manage, govern, and distribute skills for AI agents across teams
- [Composio](./composio.md) — Hosted tool layer supplying agents with pre-authenticated OAuth sessions for more than a thousand apps
- [Dagster](./dagster.md) — Asset-oriented Python orchestrator where data assets are typed functions with parameter-derived lineage
- [E2B](./e2b.md) — Firecracker-microVM sandboxes for running model-generated code, plus code-interpreter and desktop-control SDKs for agents
- [Empromptu AI](./empromptu-ai.md) — Build, deploy, and manage custom AI applications that improve over time
- [Flowise](./flowise.md) — Archived Node.js visual builder for LangChain-style agent graphs, now superseded by the Flowise successor
- [Langflow](./langflow.md) — Python visual builder for agent and RAG workflows that also serves them as REST endpoints and MCP servers
- [Letta](./letta.md) — Stateful agent runtime that gives agents persistent memory and identity, distributed today as a letta-code CLI, App Server and SDK
- [Manus](./manus.md) — AI-powered platform for building full-stack web applications and automating tasks
- [Mem0](./mem0.md) — Memory layer for agents using add-only fact extraction with entity linking and fused multi-signal retrieval
- [Memoriq](./memoriq.md) — Private AI memory layer that learns from your conversations and documents
- [Mirascope](./mirascope.md) — Decorator-based LLM interface with typed provider/model strings, Pydantic structured output and resumable tool loops
- [n8n](./n8n.md) — Fair-code workflow automation canvas with AI nodes, custom code steps and 1500+ integrations
- [OrchestraML](./orchestraml.md) — Automate end-to-end ML workflows from data prep to deployment using AI agents
- [Prefect](./prefect.md) — Python workflow framework where @flow and @task decorators add scheduling, caching and retries to plain scripts
- [Prompt flow (Microsoft)](./promptflow.md) — Microsoft's LLM app development suite — build flows as executable DAGs with a visual trace UI, batch-evaluate them, and deploy the same flow to Azure ML
- [Pydantic AI](./pydantic-ai-tool.md) — Typed Python AI SDK with an agent loop, dependency injection, model swapping by string id, and a harness for long-running work
- [Redis](./redis-memory.md) — In-memory data structure server with multiple eviction policies, TTL expiry, and document and vector query engines on top of key-value storage
- [SeaTicket](./seaticket.md) — Unify and resolve customer-support issues with autonomous AI agents
- [Strands Agents SDK](./strands-agents.md) — Model-driven agent SDK in Python and TypeScript that runs in your process with lifecycle limits, hooks, memory and tracing built in
- [Temporal](./temporal.md) — Durable execution server that replays workflow history so long-running processes survive crashes
- [Zep](./zep.md) — Zep Cloud's examples and integration packages for temporal knowledge-graph agent memory, with the OSS engine in Graphiti

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

- [ADK for Java (Agent Development Kit)](./adk-java.md)
- [BeeAI Framework](./beeai-framework.md)
- [Dust](./dust.md)
- [REEF](./reef.md)
- [Agents-Anywhere](./agents-anywhere.md)
- [OpenAgents](./openagents.md)
- [RubyLLM](./ruby-llm.md)
- [DB-GPT](./db-gpt.md)
- [ADK for Go (Agent Development Kit)](./adk-go.md)
- [Langroid](./langroid.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [ADK for Go (Agent Development Kit)](./adk-go.md) — Google's code-first Go toolkit for building, evaluating and deploying multi-agent systems
- [ADK for Java (Agent Development Kit)](./adk-java.md) — Google's code-first Java toolkit for multi-agent systems on the JVM, with typed tools and tracing
- [Google ADK (Agent Development Kit)](./adk-python.md) — Google's code-first Python SDK for building, evaluating and deploying multi-agent systems
- [Agents-Anywhere](./agents-anywhere.md) — Cross-device workbench for driving and monitoring agents on remote machines over ACP
- [Agno](./agno.md) — Python SDK plus AgentOS runtime for building, serving and operating self-hosted agent platforms
- [AGNT.Hub](./agnt-hub.md) — Build and manage secure, private AI agents with custom skills and policies
- [Apache Airflow](./airflow.md) — Batch DAG orchestrator that schedules Python workflows, retries failed tasks and records lineage across data platforms
- [any-agent](./any-agent.md) — Mozilla AI's thin adapter layer that runs one agent interface across six different agent frameworks
- [BeeAI Framework](./beeai-framework.md) — Agent framework with matching Python and TypeScript SDKs, event-stream telemetry and schema-validated tools
- [Cloudskill](./cloudskill.md) — Manage, govern, and distribute skills for AI agents across teams
- [Composio](./composio.md) — Hosted tool layer supplying agents with pre-authenticated OAuth sessions for more than a thousand apps
- [Dagster](./dagster.md) — Asset-oriented Python orchestrator where data assets are typed functions with parameter-derived lineage
- [DB-GPT](./db-gpt.md) — Agentic data framework for private text-to-SQL, schema-linked RAG and multi-model serving
- [DocsGPT](./docsgpt.md) — Self-hostable RAG platform with ingestion workers, an agent builder and a ready-made chat UI
- [Dust](./dust.md) — Hosted team platform for agents over company data, with connectors, permission-aware retrieval and credit pricing
- [E2B](./e2b.md) — Firecracker-microVM sandboxes for running model-generated code, plus code-interpreter and desktop-control SDKs for agents
- [Empromptu AI](./empromptu-ai.md) — Build, deploy, and manage custom AI applications that improve over time
- [Flowise](./flowise.md) — Archived Node.js visual builder for LangChain-style agent graphs, now superseded by the Flowise successor
- [Harness SDK](./harness-sdk.md) — Dual-language SDK for stateful agent harnesses with MCP tooling and multi-cloud model failover
- [Langflow](./langflow.md) — Python visual builder for agent and RAG workflows that also serves them as REST endpoints and MCP servers
- [Langroid](./langroid.md) — Python multi-agent framework built on message passing, with Pydantic-validated tool calls and built-in RAG
- [Letta](./letta.md) — Stateful agent runtime that gives agents persistent memory and identity, distributed today as a letta-code CLI, App Server and SDK
- [Manus](./manus.md) — AI-powered platform for building full-stack web applications and automating tasks
- [Mem0](./mem0.md) — Memory layer for agents using add-only fact extraction with entity linking and fused multi-signal retrieval
- [Memoriq](./memoriq.md) — Private AI memory layer that learns from your conversations and documents
- [Mirascope](./mirascope.md) — Decorator-based LLM interface with typed provider/model strings, Pydantic structured output and resumable tool loops
- [n8n](./n8n.md) — Fair-code workflow automation canvas with AI nodes, custom code steps and 1500+ integrations
- [Open-SWE](./open-swe.md) — Asynchronous software-engineering agent that plans, edits and tests against a repository in an inspectable loop
- [OpenAgents](./openagents.md) — TypeScript runtime for peer-to-peer agent networks with capability discovery and task routing
- [OrchestraML](./orchestraml.md) — Automate end-to-end ML workflows from data prep to deployment using AI agents
- [Prefect](./prefect.md) — Python workflow framework where @flow and @task decorators add scheduling, caching and retries to plain scripts
- [Prompt flow (Microsoft)](./promptflow.md) — Microsoft's LLM app development suite — build flows as executable DAGs with a visual trace UI, batch-evaluate them, and deploy the same flow to Azure ML
- [Pydantic AI](./pydantic-ai-tool.md) — Typed Python AI SDK with an agent loop, dependency injection, model swapping by string id, and a harness for long-running work
- [Redis](./redis-memory.md) — In-memory data structure server with multiple eviction policies, TTL expiry, and document and vector query engines on top of key-value storage
- [REEF](./reef.md) — Continual-learning infrastructure that turns live agent trajectories into reinforcement-learning updates
- [RubyLLM](./ruby-llm.md) — Idiomatic Ruby client for multi-provider chat, tool calling, structured output and embeddings
- [SeaTicket](./seaticket.md) — Unify and resolve customer-support issues with autonomous AI agents
- [Strands Agents SDK](./strands-agents.md) — Model-driven agent SDK in Python and TypeScript that runs in your process with lifecycle limits, hooks, memory and tracing built in
- [Temporal](./temporal.md) — Durable execution server that replays workflow history so long-running processes survive crashes
- [Zep](./zep.md) — Zep Cloud's examples and integration packages for temporal knowledge-graph agent memory, with the OSS engine in Graphiti

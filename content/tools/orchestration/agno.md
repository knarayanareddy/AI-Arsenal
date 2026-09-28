---
id: agno
name: "Agno"
type: tool
job: [orchestration]
description: "Python SDK plus AgentOS runtime for building, serving and operating self-hosted agent platforms"
url: "https://agno.com"
cost_model: open-source
pricing_detail: "MPL-2.0 open source; free self-hosted runtime (AgentOS), commercial control-plane options"
tags: [agents, security, orchestration]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/agno-agi/agno"
docs_url: "https://docs.agno.com"
github_url: "https://github.com/agno-agi/agno"
alternatives: [pydantic-ai-tool, letta]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, production]
best_when: ["You own your infrastructure and need multi-tenant agent serving with JWT-based RBAC and per-user session isolation instead of routing every turn through a vendor platform.", "You want a production REST surface for agents — the README advertises 50+ endpoints with SSE and websocket streaming — plus cron scheduling and background jobs with no extra queue infrastructure.", "You need agents reachable from Slack, Telegram, WhatsApp, Discord, AG-UI and A2A, and you would rather write one tool definition than one adapter per surface."]
avoid_when: ["You only need a chat loop inside one script, because the framework assumes a Postgres schema, an AgentOS process and a UI before you get any benefit from it.", "You need a provider-hosted product with an SLA, because the license is Apache-2.0 and the README's own path to a managed deployment is a set of third-party community templates rather than a first-party service.", "You must avoid the Database and never run Postgres, since the starter templates persist sessions, memory, knowledge and traces in your own SQL database."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (41,053), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: watching
verdict_rationale: "Fast-growing full-stack agent framework with strong performance claims; API surface still evolving quickly"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/agno-agi/agno", "date": "2026-07-08", "description": "41,053 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Agno splits into an SDK and a runtime. You define an Agent with a model, tools, memory, knowledge and vector config in roughly 20 lines; the AgentOS runtime then exposes that agent as a service. On top of the agent sit toolkits for GitHub, Slack and Postgres, context providers that pull live data from Slack, Drive, wikis and MCP servers, and an OpenTelemetry tracing path. Runs can be paused for human approval, individual tools can be gated behind admin approval, and cron-based scheduling runs jobs inside the same process. The platform is deliberately self-hosted: the Docker starter gives you a REST API, a Postgres instance, an MCP server and a control plane in one compose stack.

## Why It's in the Arsenal

The recurring decision is where agent state lives. Agno answers it with your own database plus JWT-scoped sessions, which matters the moment a user can tell whose memory a retrieval touched. It also answers a second question that most agent frameworks leave open: who is allowed to invoke which tool. Admin approval gates, multi-tenant isolation and audit logs are built into the runtime rather than bolted on, so a team can hand an internal agent to non-engineers without inventing a permission model first.

## Key Features

- Apache-2.0 throughout, with no runtime call home in the default self-hosted path.
- The platform layer is unusually complete: JWT RBAC, multi-tenant isolation, audit logs, human approval gates and OpenTelemetry tracing ship in the same box.
- Storage is yours — sessions, memory, knowledge and traces live in your Postgres, so a migration off the runtime is a dump and a reload.
- 100+ integrations packaged as toolkits rather than hand-written connector code.

## Architecture / How It Works

The SDK layer is a thin Python object model over an agent run loop; the runtime is the part that matters operationally. AgentOS holds a FastAPI surface of 50+ endpoints that stream over SSE and websockets, and it reads and writes sessions, memory, knowledge and traces into Postgres. Context providers sit between the agent and external systems, injecting live Slack, Drive, wiki or MCP content before the model call rather than relying on a static system prompt. Approval is a first-class state in the run, so a tool call can block on a human decision and resume. Interfaces are adapters over the same agent, which is why Slack and A2A share one definition.

## Getting Started

The README's own route is to hand a prompt to a coding agent, but the hand-written path is the twenty-line agent definition. Install the SDK, define an agent, and let the AgentOS runtime wrap it:

```bash
pip install agno agno-os
```

Then point an AgentOS-compatible deployment at your definition; the dockerised starter (agentos-docker) brings up the REST API, Postgres, MCP server and control plane together, and the editor is on port 7777.

## Use Cases

1. Multi-tenant internal assistant: each request carries a JWT, RBAC scopes the tools a given role can reach, and per-user sessions keep one employee's memory out of another's retrievals.
2. Scheduled agent workflows: cron entries run a defined agent on a schedule inside the same runtime, so a nightly report job needs no separate scheduler or worker fleet.
3. Channel fan-out: define the agent once and publish it to Slack, Telegram, WhatsApp and A2A without maintaining four integration codebases.

## Strengths

Agno competes with LangGraph and CrewAI in the agent-framework column, but its centre of gravity is the serving platform rather than the graph: LangGraph gives you an explicit state machine to reason about, while Agno gives you a REST surface, a Postgres schema and a UI. It overlaps with Dify and Flowise, which ship comparable chat-plus-workflow consoles, though those are aimed at end-user app building while Agno is aimed at engineers exposing an agent API. It complements rather than replaces the inference entries — vLLM, SGLang or Ollama sit behind the model interface — and it sits next to LiteLLM if you need one gateway in front of many providers.

## Limitations / When NOT to Use

The dependency floor is real: Postgres is required for the documented starter stack, and the runtime carries 50+ endpoints whose surface you inherit whether you need them or not. Integration count is a claim, not a quality signal — 100+ toolkits means many thin wrappers you will still have to read before trusting an action. Approval and multi-tenancy are platform features you configure, not guarantees; RBAC mistakes remain your responsibility, and there is no independent audit of the security posture in the README. Context providers pull live external data, so token cost per turn varies with whatever Slack or Drive content happens to be large.

## Integration Patterns

This is an orchestration-phase tool that sits upstream of nothing and downstream of the model layer. Compare it against the framework-phase entries such as LangGraph, CrewAI and AutoGen when you are choosing between a code-first graph and a served platform, and pair it with the inference-engine entries in content/projects/inference-engines (vLLM, SGLang, Ollama) which supply the tokens it dispatches. The agent-systems siblings in content/projects/agent-systems such as OpenHands and stagehand solve the task-execution problem instead of the hosting problem, so pick one or the other rather than both.

## Resources

- [GitHub — agno-agi/agno](https://github.com/agno-agi/agno)
- [Documentation — docs.agno.com](https://docs.agno.com)
- [Deployment templates — agentos-docker and friends](https://github.com/agno-agi/agentos-docker)

## Buzz & Reception

Ships the whole platform layer in one Apache-2.0 stack: REST/SSE API, Postgres-backed sessions and traces, JWT RBAC and a control-plane UI, so you are not assembling four vendors

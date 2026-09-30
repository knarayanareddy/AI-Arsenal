---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: agentscope-ai
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: agentscope
name: AgentScope
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: "Apache-2.0 agent framework pairing composable SDK building blocks with a batteries-included FastAPI agent service, web UI, channels and scheduling"
github_url: "https://github.com/agentscope-ai/agentscope"
license: Apache-2.0
primary_language: Python
tags: [retrieval, agents]
maturity: production
cost_model: open-source
github_stars: 32512
last_commit: "2026-09-28"
docs_url: "https://docs.agentscope.io/"
phase: framework
domain:
  - language
  - reasoning
  - multimodal
relation_to_stack:
  - build-on-top
  - fork-and-adapt
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A Python agent framework that makes agent interaction, teams, tools, workspaces, and service operations inspectable.
best_for: ["You need to ship an agent as a multi-user product with session isolation and a web interface, and would rather not build tenancy, persistence and a frontend before writing any agent logic.", "You are deploying an agent into an existing team chat surface such as Feishu, Lark or Discord and want channel routing and message plumbing handled rather than hand-built.", "You want the model's own reasoning to stay in charge of the loop, because the project's stated design position is to supply building blocks and hooks rather than impose an orchestration that constrains stronger models."]
avoid_if: ["You want a small importable library with no server footprint, because the centre of gravity here is the agent service, its storage backends and its web UI, and running any of that is a deployment decision.", "You need a fixed, opinionated graph guaranteeing the same execution path for every request, because the framework's premise is leaving orchestration to the model, which helps capability and hurts determinism.", "You are on Python 3.10 or earlier, because the package requires 3.11 or higher and the constraint is stated at the top of the install section."]
enrichment_notes: Official repository, Apache-2.0 license, and 2026-07-10 activity were reviewed on 2026-07-11. Cross-provider behavior and production fit remain draft.
---

## Overview

AgentScope 2.0 is structured in two layers. The SDK layer is a set of building blocks: a ReAct agent with structured output, realtime interruption and resume, and batched tool execution; a toolkit managing Python tools, MCP servers and skills together with built-in coding tools for shell, file editing and search; model adapters across OpenAI, Anthropic, Gemini, DashScope, DeepSeek, Moonshot, Volcengine, xAI and Ollama; a context layer handling automatic compaction, tool-result offload and context injection; a unified event system streaming reasoning, tool calls and multimodal content to a frontend; a permission system with confirmation and bypass modes; composable middleware; and long-term memory with switchable backends. Above it sits the agent service, a FastAPI application with a pre-built web UI adding multi-tenancy, session isolation, leader-worker agent teams, IM channels, a RAG service with blob storage and an index worker, an MCP and skill hub, resource sharing, SQL and NoSQL persistence, and scheduling with background task offloading.

## Why it's in the Arsenal

The recurring decision is how much application you must build before your first agent is usable. Most frameworks stop at the loop, which leaves tenancy, session state, UI streaming, tool approvals and chat integration as your problem, and those are the parts that never change when you swap models. AgentScope's bet is that they are solved once and belong in the same distribution as the agent primitives, which is why this is two products in one. The cost is size: you take a web framework, storage choices and a channel layer whether or not your first deployment needs them, and you accept a position on orchestration some teams find too permissive.

## Architecture

The agent loop is middleware-driven: hooks fire around replying, reasoning, acting, model calls, permission checks, context compression and system prompt construction, which is the mechanism behind both event streaming and the HITL gate. Because the event system is unified, a tool call, a reasoning span and an image all travel the same path, so a terminal console, a web UI and a chat channel are consumers of one event stream rather than separate integrations. Permission checks sit in that same middleware chain, which is why confirmation and bypass are configuration rather than a wrapper you must remember. Context management is likewise a middleware concern, so compaction and tool-result offloading are not something you call. The service layer persists sessions and agent state to SQL or a document store, and the RAG service adds blob storage plus a separate index worker with multi-tenant retrieval, keeping ingestion off the request path. Sandboxing is pluggable across local, Docker, Apple Container, Bubblewrap, E2B, OpenSandbox, Daytona and Kubernetes. Recent additions include an A2A agent for talking to remote agents, a Pipeline for fixed-logic multi-agent runs, and an experimental realtime voice agent on a full-duplex speech-to-speech API.

## Ecosystem Position

It competes with LangGraph, CrewAI and AutoGen in the agent framework category, and its differentiator is packaging: those three are libraries you compose in a process, while this one is a framework plus a deployable multi-user service. It also overlaps with content/projects/agent-systems entries that focus on a single specialised agent rather than a platform, where the trade is breadth of built-in capability against a smaller surface you fully control. Compared with an open-source workspace such as agenta, AgentScope is the code-first path - you write the agent - whereas agenta is the conversation-first path. The MCP and skill hub it ships consumes the same ecosystem the tool entries in content/tools/dx-and-tooling publish into, so those skills can be installed rather than rewritten.

## Getting Started

Install from PyPI or from source, then run the bundled console to chat with an agent in your terminal:

```bash
uv pip install agentscope
```

```python
from agentscope.agent import Agent
from agentscope.console import launch_console
from agentscope.tool import Toolkit, Bash, Grep, Glob, Read, Write, Edit

agent = Agent(name="Friday", system_prompt="You're a helpful assistant.",
              model=..., toolkit=Toolkit(tools=[Bash(), Grep(), Glob(), Read(), Write(), Edit()]))
await launch_console(agent)
```

For the full service, run examples/agent_service then examples/web_ui with pnpm dev.

## Key Use Cases

1. Ship a multi-user agent product: use the agent service's tenancy, session isolation and web UI instead of building auth, storage and a frontend before your agent exists.
2. Deploy into a team chat: connect Feishu, Lark or Discord through the channel layer with message routing handled, then share the same agent with the same permissions.
3. Long-running background work: offload a slow tool call to the background and have its result wake the agent, so a multi-minute step does not block the conversation.

## Strengths

- Batteries included at the application layer: tenancy, sessions, persistence, channels, scheduling and a web UI are in the same distribution as the primitives.
- Middleware-driven context and permission handling means compaction, tool offload and human-in-the-loop are configuration points rather than code you interleave.
- One unified event stream feeds terminal, web and chat, so adding a surface is a consumer rather than a new integration.
- Apache-2.0 with peer-reviewed publications behind both the original multi-agent platform and the 2.0 developer-centric redesign.

## Limitations

The clearest cost is that you are choosing a platform over a library: storage backends, tenancy model and channel semantics are decisions the project made, and moving off them later is a migration. The permissive orchestration stance is a genuine trade - teams that need reproducible, auditable execution paths will find that a model choosing its own steps is harder to test than a fixed graph. Several surfaces are explicitly experimental, including the realtime voice agent and SOP-style multi-step execution, so they will move. Breadth also means a large surface with more upgrade risk than a focused library, and the dependency set across models, sandboxes, memory backends and channels is correspondingly broad. Documentation and community are bilingual and strongest in Chinese-first ecosystems, which matters if your team operates in English only.

## Relation to the Arsenal

This is the framework entry in content/projects/frameworks, and the most complete platform in that folder: where langgraph and crewai hand you a loop, this hands you a deployable application. Its runtime dependencies - the models in content/projects/inference-engines, the vector stores in content/projects/data-and-retrieval, and the memory backends it names - are catalogued in their own phases, as are the skills its hub installs from the ecosystem in content/tools/dx-and-tooling. Compare it against agenta in the benchmarks-and-evals phase when the question is who builds the agent.

## Resources

- [GitHub — agentscope-ai/agentscope](https://github.com/agentscope-ai/agentscope)
- [Official documentation — docs.agentscope.io](https://docs.agentscope.io/)
- [AgentScope 1.0 paper on arXiv](https://arxiv.org/abs/2508.16279)

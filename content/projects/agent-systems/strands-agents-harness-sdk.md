---
id: strands-agents-harness-sdk
name: "harness-sdk"
version_tracked: null
artifact_type: framework
category: agents
subcategory: frameworks
description: "Agent harness SDK that owns the control loop, session state, and tool routing for agents in Python and TypeScript"
github_url: "https://github.com/strands-agents/harness-sdk"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "strands-agents"
tags: [agents, tool-use, battle-tested, orchestration]
maturity: production
cost_model: open-source
github_stars: 8508
github_stars_last_30d: 0
trending_score: 31
last_commit: "2026-09-28"
docs_url: "http://strandsagents.com/"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Agent harness SDK that owns the control loop, session state, and tool routing so an agent can be driven and observed end-to-end rather than as an ad-hoc loop."
best_for:
  - "You are building a production agent and need session state, tool routing, and lifecycle control in a maintained SDK instead of an in-house while loop."
  - "You want the same agent definition to run in Python and TypeScript, so a service and a frontend share one harness rather than two reimplementations."
  - "You are wiring an agent to an existing tool ecosystem and want MCP-compatible tool registration rather than bespoke adapter glue."
avoid_if:
  - "You want a research loop you can read in one file to study agent design, since a harness SDK abstracts that loop away on purpose."
  - "Your agent is a single prompt with no tools, no state, and no retries, since the harness is overhead until there is something to manage."
  - "You need to own every detail of scheduling, sandboxing, and approval, where an opinionated harness is a constraint rather than an accelerant."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (8508), Apache-2.0, last commit 2026-09-28, Python, and the topic list were API-verified. The model-provider abstraction, loop with tool dispatch, lifecycle hooks, event callbacks, session state, MCP tool registration, and built-in tools come from the official repo README and docs. The operational-responsibility caveat is engineering judgement."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/strands-agents/harness-sdk", "date": "2026-09-28", "description": "8,508 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

This is the harness layer for the Strands agent framework: rather than a prompt-and-tool library, it is the runtime an agent is hosted in. The model layer is a provider abstraction with an Anthropic implementation in the default configuration and an openai implementation for compatibility, and the loop takes a conversation history plus a tool set, sends a model request, and dispatches whatever the model asks for. What it adds over a hand-rolled loop is the operational surface: lifecycle hooks, an event callback so callers can react to and stream agent state, a session concept that carries state and conversation between invocations, and permission-related extensions for hosted deployments. Tool integration is a defining feature — the SDK is built around MCP, so any MCP server's tools become callable by the agent, alongside built-in tools such as the filesystem, shell, and HTTP tools and a local-execution tool. It ships as parallel Python and TypeScript packages from the same design, so the two languages stay feature-compatible, and the project documents it as a model-agnostic and cloud-agnostic layer intended to sit under an agent you deploy rather than a framework you read.

## Why it's in the Arsenal

The recurring decision is who owns the agent loop in production. A hand-written loop is easy to start and expensive to keep: it accumulates retry logic, tool error handling, event emission for the UI, state persistence for resumption, and per-tool approval, and every one of those is missing the first time you need it. A harness SDK takes that work off you by making the loop, session, and event plumbing the product, so the code you write is the agent's definition — its tools and its instructions — while the runtime concerns stay a dependency you upgrade. The dual-language design solves a related recurring problem: the backend and the frontend tool integration otherwise drift, and here both are the same SDK.

## Architecture

The model layer wraps a provider behind a common request interface taking a message list and a tool schema, returning text and tool-use blocks. The agent loop takes a conversation and a registry of tools, calls the model, and if the model requests a tool invocation, resolves it from the registry, executes it, appends the result to the conversation, and calls the model again — repeating until the model returns a final message or a limit is hit. Around that sit the operational pieces: lifecycle hooks that let a caller intercept before and after a model call or a tool execution, an event callback that emits typed events as the loop progresses so a UI can stream state and a host can enforce policy, and a session object that persists conversation and state so an agent can be resumed. Tools are registered with a name, a description, and a JSON schema the model sees, and the built-in set includes filesystem, shell, and HTTP tools plus an MCP client that pulls the tool list from an external server and registers them dynamically. The Python and TypeScript implementations mirror each other's structure, which is what keeps parity across the two surfaces.

## Ecosystem Position

This harness competes with pydantic-ai, the openai-agents-sdk, and Microsoft Agent Framework at the level of agent runtime, and with LangGraph at the level of orchestration. The difference is emphasis: a harness optimises for owning the loop and the operational surface — events, sessions, hooks — while LangGraph optimises for graph-shaped control flow with explicit nodes and edges, which is a better fit when your agent's logic is genuinely a state machine. Against crewai and autogen it is a thinner, less opinionated core with less built-in role scaffolding. It is complementary to the MCP ecosystem rather than a competitor, since MCP tool servers are a primary input to it, and it layers over the model-provider entries in content/projects/inference-engines rather than replacing them. Compared with the SWE-agent entry in agent-systems, this is the production harness where that research loop would be deployed.

## Getting Started

Install the Python SDK, define a tool, and run an agent:

```bash
pip install strands-agents
```

```python
from strands import Agent, tool

@tool
def word_count(text: str) -> int:
    """Count the words in a block of text."""
    return len(text.split())

agent = Agent(tools=[word_count])

def on_event(event):
    print(event)

result = agent("How many words are in this sentence about harness SDKs?")
print(result.message)
```

For TypeScript the same shape is `import { Agent } from "@strands-agents/sdk"`, and an MCP server's tools are registered by pointing the agent at that server's endpoint.

## Key Use Cases

1. Deploying an agent as a service where tool errors, retries, and event streaming to a UI need to be handled consistently rather than per handler.
2. Sharing one agent definition between a Python backend and a TypeScript frontend, where the two implementations of the harness stay feature-compatible.
3. Wiring an agent to an existing MCP tool ecosystem, so tools written for that protocol become callable without writing an adapter per tool.

## Strengths

- Owns the loop, session, and tool registry, so the operational surface a production agent needs is a dependency rather than your own code.
- Parallel Python and TypeScript packages with a shared design, so backend and frontend do not drift.
- MCP-first tool integration, so an existing tool ecosystem plugs in without per-tool adapters.
- Typed event callbacks and lifecycle hooks, which is what makes an agent observable and streamable from a host application.
  

## Limitations

An opinionated harness is a constraint: if you need unusual control flow, custom scheduling, or your own sandboxing model, you are working around the SDK rather than with it. The feature set moves with the underlying agent framework, so upgrades can change tool behaviour, and because the loop is hidden you cannot reason about it as directly as you can in a forty-line script — which is exactly what the research-oriented entries in the same phase offer instead. Model support is broad by intent but not deep: provider-specific features such as extended thinking or provider caching are unevenly covered, and you will end up on a generic path more often than on a tuned one. Operational responsibility still lands on you: sandboxing shell and filesystem tools, cost limits, and secret handling are your problem, and the permission extensions are a hook rather than a policy engine. Ecosystem size is modest compared with LangChain, so examples and integration recipes are thinner.

## Relation to the Arsenal

This is the agent-harness entry in content/projects/agent-systems, and the comparison worth reading alongside is LangGraph and the openai-agents-sdk, which choose different control-flow models for the same problem. Tools come from the MCP ecosystem, and the model providers it wraps live in content/projects/inference-engines. For the observability side, the langfuse and opik entries are where you would trace what this harness emits, and the evaluation entries are where you decide whether the agent's tool-use is actually correct. Versus the SWE-agent entry in the same folder, this is what you would deploy after studying that research loop; versus mem0 and letta, those own memory while this owns execution.

## Resources

- [Strands Agents site and documentation](https://strandsagents.com)
- [Strands harness-sdk GitHub repository](https://github.com/strands-agents/harness-sdk)
- [Model and tool configuration reference](https://strandsagents.com/latest/user-guide/concepts/tools/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (8,508 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*

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
org_or_maintainer: "openai"
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
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: openai-swarm
name: "OpenAI Swarm"
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: "OpenAI's educational Python framework built on two primitives: an Agent and a handoff to another agent"
github_url: "https://github.com/openai/swarm"
license: MIT
primary_language: Python
tags: [agents, llm]
maturity: experimental
cost_model: open-source
github_stars: 22018
last_commit: "2026-04-15"
docs_url: "https://github.com/openai/swarm"
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "study-and-reference"
health_signals:
  - "research-origin"
  - "org-backed"
ecosystem_role:
  - "An educational reference for lightweight multi-agent orchestration via agents, routines, and handoffs."
best_for: ["You want to learn the handoff pattern for multi-agent routing before committing to a production framework, and twenty lines of readable Python is the right unit of study.", "You are porting a mental model from OpenAI's documentation into a design of your own, so you want the smallest implementation that is still correct.", "You are prototyping a triage or router shape and want to confirm a stateless handoff is enough before adding persistence machinery."]
avoid_if: ["You are building something for production, because the README opens by recommending migration to the OpenAI Agents SDK for all production use cases.", "You need durable state or memory between calls, because Swarm runs almost entirely on the client and stores nothing between Chat Completions calls.", "You think the Agents in Swarm relate to the Assistants API, because the README explicitly notes they are unrelated despite the naming."]
enrichment_notes: "Repository, MIT license, and 2026-04-15 activity verified via the GitHub API on 2026-07-12. Explicitly educational and not for production; superseded by the OpenAI Agents SDK."
---

## Overview

Swarm is a small Python library whose entire model is Agents and handoffs. An Agent bundles instructions and tool functions; when the model decides the conversation belongs to a different specialist, one of its functions returns that Agent and the client switches execution over. The client wraps Chat Completions and returns the full message list, so runs are client-side and stateless. The examples directory walks through basic function calling and handoffs, context variables, a triage agent, a weather agent, an airline customer-service setup, and streaming.

## Why it's in the Arsenal

The value is diagnostic rather than operational. Almost every multi-agent framework adds scheduling, persistence and plugin registries before you can see what a handoff is, which makes the core idea hard to evaluate. Swarm shows the pattern with two abstractions and nothing else, so you can decide whether agent routing belongs in your architecture or whether a single tool-calling loop with clearer instructions would do the same job for less complexity.

## Architecture

An Agent holds name, instructions and a list of Python functions. Those functions return either a string, a message or another Agent; returning an Agent is the handoff, and the client reruns the conversation with the new Agent as the active one. Because it runs on the Chat Completions API, there is no server-side thread and no built-in memory, which keeps the execution model inspectable at the cost of any persistence. Streaming is supported, and context variables carry per-run state.

## Ecosystem Position

It is the predecessor to the OpenAI Agents SDK and the README directs production users there, so it competes with nothing today on its own terms. It overlaps with content/projects/frameworks entries such as LangGraph and CrewAI as the lighter alternative: where those give you a graph or a role-based team, Swarm gives you a function that returns an object. Compared with the Assistants API, Swarm is a client-side library rather than a hosted thread with built-in retrieval.

## Getting Started

Installation is from the Git repository rather than PyPI, and the framework needs Python 3.10 or newer:

```bash
pip install git+https://github.com/openai/swarm.git
```

Then import Swarm and Agent, define an agent with instructions and functions, and call the client run method with that agent and a message list.

## Key Use Cases

1. Study a handoff router: read the triage_agent example to see a single routing function dispatching to specialists.
2. Prototype a customer-service split with the airline example, where different request types hand off to different agents.
3. Sketch a tool-calling loop with the weather example to see function results returned as messages before you rewrite it on the Agents SDK.

## Strengths

- Two primitives means the whole execution model fits on one page, which is exactly the point of an educational release.
- Handoffs are ordinary Python returns, so custom routing logic needs no framework extension.
- Runs client-side against Chat Completions, making token cost and message history trivially inspectable.
- MIT licensed and tiny enough to vendor into an internal repo as a reference implementation.

## Limitations

The README labels Swarm experimental and educational, and says plainly that it is replaced by the Agents SDK for production, so it is a dead end for anything shipped. There is no state between calls, so multi-turn conversations and memory are your responsibility. It depends on Chat Completions rather than the Responses API, which is where OpenAI's own new capabilities land. The framework is also not on PyPI, which means no version pinning through normal dependency resolution and a maintenance burden the moment you vendor it.

## Relation to the Arsenal

This entry in content/projects/agent-systems is a historical reference point rather than a recommendation. Read it before the OpenAI Agents SDK entry in content/tools/orchestration to understand where the handoff abstraction came from, and compare its two-primitive model with the graph runtime in content/projects/frameworks/langgraph when you are weighing explicit control flow against declarative orchestration.

## Resources

- [GitHub — openai/swarm](https://github.com/openai/swarm)
- [Examples directory](https://github.com/openai/swarm/tree/main/examples)
- [OpenAI Agents SDK, the stated successor](https://github.com/openai/openai-agents-python)

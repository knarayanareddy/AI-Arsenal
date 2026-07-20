---
id: openai-agents-sdk
name: OpenAI Agents SDK
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Lightweight Python framework for OpenAI-style agents, tools, handoffs, guardrails, and tracing
github_url: https://github.com/openai/openai-agents-python
license: MIT
primary_language: Python
org_or_maintainer: null
tags:
  - agents
  - tool-use
  - guardrails
  - tracing
maturity: production
cost_model: open-source
github_stars: 28034
github_stars_last_30d: 905
trending_score: 55
last_commit: '2026-07-20'
docs_url: https://openai.github.io/openai-agents-python/
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain:
  - language
  - reasoning
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - OpenAI's official, lightweight agent-building SDK, positioned as the provider-native path for building agents against OpenAI's models
best_for:
  - You're building primarily against OpenAI's models and want a lightweight, officially-supported SDK rather than a heavier, provider-agnostic framework
  - You want a simple mental model (agents, handoffs, guardrails) without the abstraction overhead of a full graph-based orchestration framework
avoid_if:
  - You need to be model-provider-agnostic — this SDK is designed around OpenAI's API and model behavior; a framework like LangGraph or Pydantic AI is more naturally multi-provider
  - You need the deep durability/checkpointing features of a graph-based framework — this SDK's simplicity trades away some of that fine-grained state control
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - langgraph
  - crewai
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Limited independent third-party production case studies found beyond OpenAI's own documentation and examples repo; architecture description reflects the publicly documented agents/handoffs/guardrails model rather than an academic source.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: newsletter
    url: https://openai.github.io/openai-agents-python/
    date: '2026-06-13'
    description: Official documentation
featured: false
status: active
---

## Overview

OpenAI's official, lightweight Python SDK for building agentic applications, providing simple primitives for agents, tool use, and handoffs between agents, intended as a production-ready successor to OpenAI's earlier experimental 'Swarm' framework.

## Why it's in the Arsenal

OpenAI's official, lightweight agent-building SDK, positioned as the provider-native path for building agents against OpenAI's models. It earns a place in the Arsenal because it directly addresses a recurring decision point: you're building primarily against OpenAI's models and want a lightweight, officially-supported SDK rather than a heavier, provider-agnostic framework. See Strengths / Limitations below before adopting it.

## Architecture

Built around a small set of primitives: agents (an LLM with instructions and tools), handoffs (explicit transfer of control between agents), and guardrails (input/output validation); orchestration logic is kept intentionally minimal compared to graph-based frameworks.

## Ecosystem Position

Upstream: tightly coupled to OpenAI's API and model behavior. Downstream: none of particular note. Competing: Anthropic and Google's own agent SDKs, LangGraph, Pydantic AI. Complementary: designed to work with OpenAI's function-calling and structured-output features directly.

## Getting Started

```bash
pip install openai-agents-sdk
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Scenario**: you're building primarily against OpenAI's models and want a lightweight, officially-supported SDK rather than a heavier, provider-agnostic framework
2. **Scenario**: you want a simple mental model (agents, handoffs, guardrails) without the abstraction overhead of a full graph-based orchestration framework

## Strengths

- You're building primarily against OpenAI's models and want a lightweight, officially-supported SDK rather than a heavier, provider-agnostic framework
- You want a simple mental model (agents, handoffs, guardrails) without the abstraction overhead of a full graph-based orchestration framework

## Limitations

- You need to be model-provider-agnostic — this SDK is designed around OpenAI's API and model behavior; a framework like LangGraph or Pydantic AI is more naturally multi-provider
- You need the deep durability/checkpointing features of a graph-based framework — this SDK's simplicity trades away some of that fine-grained state control

_Enrichment status: draft — claims above are based on limited third-party sourcing; not yet independently verified. Last reviewed: 2026-07-01._

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/openai/openai-agents-python)
- [Documentation](https://openai.github.io/openai-agents-python/)

---
id: langgraph
name: LangGraph
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Graph-based framework for building stateful, durable LLM agents and workflows
github_url: "https://github.com/langchain-ai/langgraph"
license: MIT
primary_language: Python
org_or_maintainer: null
tags: [agents, orchestration, graphs, stateful, tool-use]
maturity: production
cost_model: open-source
github_stars: 34644
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-06-13"
docs_url: "https://docs.langchain.com/oss/python/langgraph/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, reasoning]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed, community-driven, production-proven]
ecosystem_role:
  - Graph-based orchestration framework for durable, stateful multi-agent workflows, LangChain's production-agent-focused offering
best_for:
  - You need explicit control over agent state, branching, retries, and human-in-the-loop interruptions via a directed-graph execution model, not an implicit conversational loop
  - You're already in the LangChain ecosystem and want production-grade durability (checkpointing, persistence, streaming) for agent workflows
avoid_if:
  - You want a quick single-prompt agent or demo — LangGraph's explicit graph construction is unnecessary overhead for simple, linear tasks
  - You want a no-code visual builder or a simpler role-based abstraction — CrewAI's higher-level API trades control for less setup
upstream_dependencies: []
downstream_consumers: []
alternatives: [crewai, openai-agents-sdk, google-adk]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: This entry already had solid, non-templated content from the tools-vertical era covering architecture, comparison context, and getting-started detail; enrichment here focuses on adding the new phase/domain/ecosystem-position fields rather than rewriting existing accurate content.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://docs.langchain.com/oss/python/langgraph/","date":"2026-06-13","description":"LangGraph launch and ecosystem docs"}
featured: true
status: active
---

## Overview

LangChain's graph-based orchestration framework for building stateful, durable LLM agents and workflows, distinguished from the broader LangChain library by its focus on explicit graph execution rather than linear chains.

## Why it's in the Arsenal

Graph-based orchestration framework for durable, stateful multi-agent workflows, LangChain's production-agent-focused offering. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need explicit control over agent state, branching, retries, and human-in-the-loop interruptions via a directed-graph execution model, not an implicit conversational loop. See Strengths / Limitations below before adopting it.

## Architecture

Applications are modeled as a directed graph of nodes (units of work) and edges (state routing); graph state is persisted across steps via checkpointing, enabling human-in-the-loop pauses, retries, and streaming — a lower-level, more explicit model than conversational-loop agent frameworks.

## Ecosystem Position

Upstream: built on top of LangChain's model/tool integrations. Downstream: LangGraph Platform and LangSmith provide managed deployment and tracing built specifically for LangGraph applications. Competing: CrewAI (higher-level, less explicit control), Microsoft Agent Framework, Google ADK. Complementary: pairs naturally with LangSmith for tracing/evaluation of graph-based agents.

## Getting Started

```bash
pip install langgraph
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Scenario**: you need explicit control over agent state, branching, retries, and human-in-the-loop interruptions via a directed-graph execution model, not an implicit conversational loop
2. **Scenario**: you're already in the LangChain ecosystem and want production-grade durability (checkpointing, persistence, streaming) for agent workflows

## Strengths

- You need explicit control over agent state, branching, retries, and human-in-the-loop interruptions via a directed-graph execution model, not an implicit conversational loop
- You're already in the LangChain ecosystem and want production-grade durability (checkpointing, persistence, streaming) for agent workflows

## Limitations

- You want a quick single-prompt agent or demo — LangGraph's explicit graph construction is unnecessary overhead for simple, linear tasks
- You want a no-code visual builder or a simpler role-based abstraction — CrewAI's higher-level API trades control for less setup

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/langchain-ai/langgraph)
- [Documentation](https://docs.langchain.com/oss/python/langgraph/)

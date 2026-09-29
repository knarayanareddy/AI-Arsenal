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

LangGraph is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

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

1. **Running it in anger**: the first real evaluation of LangGraph is your own traffic, not the documentation's example; instrument latency, error rate and quality on a representative slice of data before the choice is load-bearing.
2. **What the LangGraph scenarios have in common**: each separates building your own loop from adopting one, which is the decision this layer actually forces on you.
3. **Choosing between candidates**: compare LangGraph against `crewai`, `openai-agents-sdk`, `google-adk` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- Beyond the headline description, LangGraph's architecture section is the honest source: applications are modeled as a directed graph of nodes (units of work) and edges (state routing); graph state is persisted across steps via checkpointing, enabling human-in-the-loop pauses, retries, and streaming — a lower-level, more explicit model than conversational-loop agent frameworks.
- Sits in the framework phase alongside the alternatives named in its Ecosystem Position section; cross-phase comparison is usually a category error rather than a useful alternative.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for LangGraph is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- The claims here come from the project's own documentation and public record, not from independent measurement on your workload; benchmark numbers in particular are point-in-time and harness-dependent.
- Where LangGraph overlaps `crewai`, `openai-agents-sdk`, `google-adk`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

LangGraph is LangChain's graph-based runtime for stateful, multi-actor agent workflows with checkpointing. This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/langchain-ai/langgraph)
- [Documentation](https://docs.langchain.com/oss/python/langgraph/)

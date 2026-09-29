---
id: dify
name: Dify
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Visual platform for building agentic workflows, RAG apps, chatbots, and AI automations
github_url: "https://github.com/langgenius/dify"
license: Modified Apache-2.0
primary_language: TypeScript
org_or_maintainer: null
tags: [agents, orchestration, rag, cloud]
maturity: production
cost_model: open-source
github_stars: 145081
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-06-13"
docs_url: "https://docs.dify.ai/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, general-purpose]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [org-backed, community-driven, production-proven]
ecosystem_role:
  - Open-source LLM application development platform with a visual workflow builder, positioned as a low-code alternative to hand-coded agent frameworks
best_for:
  - You want a self-hostable, visual workflow builder for LLM applications (RAG, agents, chatbots) rather than writing orchestration code directly
  - Your team includes non-engineers who need to iterate on prompt/workflow logic without deploying code changes
avoid_if:
  - You need the flexibility of a code-first framework — visual builders like Dify trade off fine-grained control and version-control-friendly workflows for ease of iteration
  - You need deep custom logic that doesn't map cleanly onto Dify's node-based workflow model — at that point a code framework like LangGraph or a custom FastAPI service gives more control
upstream_dependencies: []
downstream_consumers: []
alternatives: [langgraph, crewai]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Dify's very high GitHub star count (145K+) and active documentation site (docs.dify.ai) reflect substantial community adoption; specific enterprise production case studies were not independently verified beyond the project's own marketing, so production-proven is not claimed here.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://docs.dify.ai/","date":"2026-06-13","description":"Official docs"}
featured: false
status: active
---

## Overview

An open-source platform for building LLM applications through a visual workflow builder, combining RAG pipeline construction, agent orchestration, and prompt management in a single self-hostable product.

## Why it's in the Arsenal

The case for Dify rests on its documentation and observed adoption rather than on a controlled comparison here, so the sections below state what it claims to do and what adopting it would commit you to.

## Architecture

Applications are built as node-based visual workflows (similar in spirit to a flowchart) connecting LLM calls, retrieval steps, tool calls, and conditional logic; the platform also exposes a backend API and SDK for embedding built workflows into external applications.

## Ecosystem Position

Upstream: integrates with many external vector databases and model providers as pluggable backends rather than depending on one. Downstream: none of particular note. Competing: Flowise, LangFlow, and other visual LLM-app builders; also competes indirectly with code-first frameworks like LangChain/LlamaIndex for teams choosing between low-code and code-first approaches. Complementary: can call out to vector databases (Qdrant, Milvus, Weaviate) and external APIs as workflow nodes.

## Getting Started

```bash
pip install dify
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Depending on it safely**: the work is the boundary — which calls go through Dify, what happens when it is slow, and what your system does instead, since those three answers determine whether adopting it is cheap or expensive.
2. **What the Dify scenarios have in common**: each separates building your own loop from adopting one, which is the decision this layer actually forces on you.
3. **Choosing between candidates**: compare Dify against `langgraph`, `crewai` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- Beyond the headline description, Dify's architecture section is the honest source: applications are built as node-based visual workflows (similar in spirit to a flowchart) connecting LLM calls, retrieval steps, tool calls, and conditional logic; the platform also exposes a backend API and SDK for embedding built workflows into external applications.
- It is a framework entry in this catalog, so the comparison that matters is against the other framework projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the Dify footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- The claims here come from the project's own documentation and public record, not from independent measurement on your workload; benchmark numbers in particular are point-in-time and harness-dependent.
- Where Dify overlaps `langgraph`, `crewai`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

Dify is an open-source LLM-app platform (visual workflows, RAG, agents) that you self-host. This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/langgenius/dify)
- [Documentation](https://docs.dify.ai/)

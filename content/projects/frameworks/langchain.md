---
id: langchain
name: LangChain
version_tracked: null
artifact_type: framework
category: rag
subcategory: frameworks
description: A framework for composing LLM applications, retrieval flows, tools, and agents
github_url: https://github.com/langchain-ai/langchain
license: MIT
primary_language: Python
org_or_maintainer: null
tags:
  - llm
  - rag
  - agents
  - orchestration
maturity: production
cost_model: open-source
github_stars: 142154
github_stars_last_30d: 2948
trending_score: 55
last_commit: '2026-07-20'
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain:
  - language
  - reasoning
relation_to_stack:
  - build-on-top
health_signals:
  - org-backed
  - community-driven
  - production-proven
ecosystem_role:
  - The most widely-adopted general-purpose framework for composing LLM applications, spanning retrieval, tool use, and agent orchestration
best_for:
  - You need the broadest possible ecosystem of pre-built integrations (model providers, vector stores, document loaders, tools) for assembling an LLM application quickly
  - Your application spans multiple concerns — retrieval, agents, memory, tool use — and you want one consistent set of abstractions across all of them rather than separate libraries
avoid_if:
  - You need explicit, durable multi-agent orchestration with fine-grained state control — LangGraph (built by the same team) is the more purpose-built choice for that specific need
  - You want a minimal dependency footprint — LangChain's breadth comes with a correspondingly large and sometimes criticized abstraction surface; a narrower library may be simpler for a single well-defined task
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Consolidates the former langchain-rag.md entry (same codebase). ZenML's LLMOps database documents Rakuten Group's production use of LangChain+LangSmith across multiple internal/external AI applications, giving concrete production evidence beyond star count.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: hackernews
    url: https://www.zenml.io/llmops-database/building-enterprise-scale-ai-applications-with-langchain-and-langsmith
    date: '2025-01-01'
    description: 'ZenML LLMOps case study: Rakuten Group built and deployed multiple production LLM applications (AI Analyst, AI Agent, AI Librarian) using LangChain and LangSmith'
featured: false
status: active
---

## Overview

A widely-adopted open-source framework for composing LLM-powered applications, providing abstractions for prompts, retrieval, tool use, memory, and agent orchestration across a very large ecosystem of integrations.

## Why it's in the Arsenal

The most widely-adopted general-purpose framework for composing LLM applications, spanning retrieval, tool use, and agent orchestration. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need the broadest possible ecosystem of pre-built integrations (model providers, vector stores, document loaders, tools) for assembling an LLM application quickly. See Strengths / Limitations below before adopting it.

_This entry consolidates the former separate langchain-rag.md entry: the same underlying project is documented here with multiple ecosystem_role values rather than as duplicate files, since it is the same codebase/repository._

## Architecture

Built around composable 'chains' (sequences of calls) and, more recently, the LangChain Expression Language (LCEL) for declaratively composing components; retrieval-specific pieces (document loaders, text splitters, retrievers, vector store integrations) form a cohesive RAG-building toolkit within the broader framework, usable independently of the agent-orchestration pieces.

## Ecosystem Position

Upstream: integrates with virtually every major model provider, vector database, and document source as pluggable components. Downstream: LangGraph is built on top of LangChain's model/tool integrations for more explicit agent orchestration; LangSmith provides tracing/evaluation for LangChain (and LangGraph) applications. Competing: LlamaIndex (more retrieval/RAG-focused), Haystack (more pipeline/production-oriented). Complementary: LangSmith for observability, LangGraph for graph-based agent orchestration built on the same foundations.

## Getting Started

```bash
pip install langchain
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Scenario**: you need the broadest possible ecosystem of pre-built integrations (model providers, vector stores, document loaders, tools) for assembling an LLM application quickly
2. **Scenario**: your application spans multiple concerns — retrieval, agents, memory, tool use — and you want one consistent set of abstractions across all of them rather than separate libraries

## Strengths

- You need the broadest possible ecosystem of pre-built integrations (model providers, vector stores, document loaders, tools) for assembling an LLM application quickly
- Your application spans multiple concerns — retrieval, agents, memory, tool use — and you want one consistent set of abstractions across all of them rather than separate libraries

## Limitations

- You need explicit, durable multi-agent orchestration with fine-grained state control — LangGraph (built by the same team) is the more purpose-built choice for that specific need
- You want a minimal dependency footprint — LangChain's breadth comes with a correspondingly large and sometimes criticized abstraction surface; a narrower library may be simpler for a single well-defined task

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/langchain-ai/langchain)
- [Documentation](https://github.com/langchain-ai/langchain)

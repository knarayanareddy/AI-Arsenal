---
id: haystack
name: Haystack
version_tracked: null
artifact_type: framework
category: rag
subcategory: frameworks
description: Modular framework for production search, RAG, agents, routing, and generation pipelines
github_url: "https://github.com/deepset-ai/haystack"
license: Apache-2.0
primary_language: Other
org_or_maintainer: null
tags: [rag, retrieval, orchestration, agents]
maturity: production
cost_model: open-source
github_stars: 25559
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-06-12"
docs_url: "https://docs.haystack.deepset.ai/"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: framework
domain: [language, reasoning]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed, community-driven, production-proven]
ecosystem_role:
  - Modular pipeline framework spanning production RAG, semantic search, and agent orchestration — deepset's flagship open-source project
best_for:
  - You want a retrieval-first, production-oriented framework with explicit, composable pipeline components (retrievers, generators, routers) rather than an implicit conversational-agent abstraction
  - You need agent capabilities (routing, tool use, memory) built on the same modular pipeline foundation you use for RAG and semantic search, rather than maintaining two separate frameworks for RAG and agents
avoid_if:
  - You need a lightweight single-prompt agent or a no-code visual builder — Haystack's component/pipeline model has more setup overhead than either extreme
  - You want the graph-based explicit-state-machine model that LangGraph offers — Haystack's pipeline abstraction is more linear/DAG-oriented than LangGraph's general graph model
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: deepset (Haystack's maintaining org) publishes case studies and the project has multi-year production adoption in retrieval/QA systems predating the LLM-agent wave, giving it a longer production track record than most agent-specific frameworks.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"conference","url":"https://en.wikipedia.org/wiki/Deepset","date":"2026-06-15","description":"deepset's enterprise Haystack offerings are documented in production use by the European Commission, Airbus, Intel, NVIDIA, Lufthansa, Netflix, and other Global 500 enterprises"}
featured: false
status: active
---

## Overview

deepset's open-source framework for building production search, retrieval-augmented generation, and agent pipelines, originally built around retrieval and question-answering before expanding to cover broader LLM application patterns.

## Why it's in the Arsenal

Modular pipeline framework spanning production RAG, semantic search, and agent orchestration — deepset's flagship open-source project. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want a retrieval-first, production-oriented framework with explicit, composable pipeline components (retrievers, generators, routers) rather than an implicit conversational-agent abstraction. See Strengths / Limitations below before adopting it.

_This entry consolidates the former separate haystack-agents.md entry: the same underlying project is documented here with multiple ecosystem_role values rather than as duplicate files, since it is the same codebase/repository._

## Architecture

Applications are modeled as pipelines of composable components (retrievers, generators, routers, agents) connected in a directed graph; agent workflows are built explicitly from these same components rather than hidden inside a separate conversational abstraction, giving one consistent mental model across RAG and agent use cases.

## Ecosystem Position

Upstream: integrates with many vector databases and model providers as pluggable backends. Downstream: none of particular note as a dependency of other cataloged projects. Competing: LlamaIndex and LangChain for RAG; LangGraph and CrewAI for agent orchestration specifically. Complementary: pairs with any of the vector databases in this catalog (Qdrant, Weaviate, Milvus, etc.) as its retrieval backend.

## Getting Started

```bash
pip install haystack
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Scenario**: you want a retrieval-first, production-oriented framework with explicit, composable pipeline components (retrievers, generators, routers) rather than an implicit conversational-agent abstraction
2. **Scenario**: you need agent capabilities (routing, tool use, memory) built on the same modular pipeline foundation you use for RAG and semantic search, rather than maintaining two separate frameworks for RAG and agents

## Strengths

- You want a retrieval-first, production-oriented framework with explicit, composable pipeline components (retrievers, generators, routers) rather than an implicit conversational-agent abstraction
- You need agent capabilities (routing, tool use, memory) built on the same modular pipeline foundation you use for RAG and semantic search, rather than maintaining two separate frameworks for RAG and agents

## Limitations

- You need a lightweight single-prompt agent or a no-code visual builder — Haystack's component/pipeline model has more setup overhead than either extreme
- You want the graph-based explicit-state-machine model that LangGraph offers — Haystack's pipeline abstraction is more linear/DAG-oriented than LangGraph's general graph model

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/deepset-ai/haystack)
- [Documentation](https://docs.haystack.deepset.ai/)

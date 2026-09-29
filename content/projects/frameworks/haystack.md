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

Haystack appears in this catalog as a reference point for the framework phase; the useful question is what adopting it would commit you to beyond the feature list. The sections below state what it claims to do and what adopting it would commit you to.

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

1. **Running it in anger**: the first real evaluation of Haystack is your own traffic, not the documentation's example; instrument latency, error rate and quality on a representative slice of data before the choice is load-bearing.
2. **What the Haystack scenarios have in common**: each separates building your own loop from adopting one, which is the decision this layer actually forces on you.
3. **Before committing**: pick the criterion that would make you abandon this choice, write it down, and check it against a representative slice of your own data — a catalog entry can tell you what is claimed, only a run tells you what is true.

## Strengths

- Beyond the headline description, Haystack's architecture section is the honest source: applications are modeled as pipelines of composable components (retrievers, generators, routers, agents) connected in a directed graph; agent workflows are built explicitly from these same components rather than hidden inside a separate conversational abstraction, giving one consistent mental model across RAG and agent use cases.
- It is a framework entry in this catalog, so the comparison that matters is against the other framework projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the Haystack footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Nothing in this entry substitutes for running Haystack against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- No alternative is catalogued alongside Haystack here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

Haystack is deepset's framework for building RAG and search pipelines from composable components. This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/deepset-ai/haystack)
- [Documentation](https://docs.haystack.deepset.ai/)

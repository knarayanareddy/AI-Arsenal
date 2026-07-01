---
id: llamaindex
name: LlamaIndex
version_tracked: null
artifact_type: framework
category: rag
subcategory: frameworks
description: Data framework for building document agents, retrieval pipelines, and production RAG systems
github_url: "https://github.com/run-llama/llama_index"
license: MIT
primary_language: Python
org_or_maintainer: null
tags: [rag, retrieval, embeddings, llamaindex]
maturity: production
cost_model: open-source
github_stars: 50109
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-06-12"
docs_url: "https://developers.llamaindex.ai/"
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
relation_to_stack: [build-on-top]
health_signals: [org-backed, community-driven, production-proven]
ecosystem_role:
  - Data framework specifically focused on connecting LLMs to your data via document ingestion, indexing, and retrieval
best_for:
  - Your primary need is building RAG pipelines and document-centric agents — LlamaIndex's abstractions (data connectors, indices, query engines) are purpose-built for retrieval over your own data
  - You want a large library of pre-built data connectors (LlamaHub) for ingesting from many different document/data sources with minimal custom code
avoid_if:
  - Your application is primarily general-purpose agent orchestration with retrieval as a secondary concern — LangGraph or CrewAI may fit the primary use case better, with LlamaIndex as a retrieval component within them
  - You need the broadest non-retrieval integration ecosystem (arbitrary tool use, multi-provider chains) — LangChain's scope is broader beyond the retrieval-specific focus
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: LlamaIndex is one of the two most commonly cited RAG frameworks (alongside LangChain) across LLMOps production case-study collections, and LlamaParse (also in this catalog) is its commercial document-parsing companion product, giving concrete evidence of both open-source and commercial production usage.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"conference","url":"https://www.llamaindex.ai/blog/case-study-netchex-more-efficient-hr-operations-with-llamaindex-powered-askhr-netchex-ai","date":"2024-09-04","description":"LlamaIndex case study: Netchex built and deployed AskHR, a production LlamaIndex-powered HR assistant serving employees 24x7"}
featured: false
status: active
---

## Overview

A data framework purpose-built for connecting large language models to external data sources, providing document ingestion, indexing, and retrieval abstractions specifically oriented around building RAG applications and document-centric agents.

## Why it's in the Arsenal

Data framework specifically focused on connecting LLMs to your data via document ingestion, indexing, and retrieval. It earns a place in the Arsenal because it directly addresses a recurring decision point: your primary need is building RAG pipelines and document-centric agents — LlamaIndex's abstractions (data connectors, indices, query engines) are purpose-built for retrieval over your own data. See Strengths / Limitations below before adopting it.

## Architecture

Data flows through data connectors (ingestion) into indices (vector, keyword, or hybrid), which are then queried through query engines that handle retrieval and response synthesis; higher-level agent abstractions are built on top of this retrieval-centric core rather than being the framework's primary focus.

## Ecosystem Position

Upstream: integrates with virtually every vector database and document source as pluggable connectors (LlamaHub). Downstream: LlamaParse is a commercial document-parsing product built by the same team, tightly integrated with LlamaIndex's ingestion pipeline. Competing: LangChain (broader scope), Haystack (more pipeline/production-oriented). Complementary: any vector database in this catalog can serve as a LlamaIndex backend; frequently paired with LlamaParse for document ingestion.

## Getting Started

```bash
pip install llamaindex
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Scenario**: your primary need is building RAG pipelines and document-centric agents — LlamaIndex's abstractions (data connectors, indices, query engines) are purpose-built for retrieval over your own data
2. **Scenario**: you want a large library of pre-built data connectors (LlamaHub) for ingesting from many different document/data sources with minimal custom code

## Strengths

- Your primary need is building RAG pipelines and document-centric agents — LlamaIndex's abstractions (data connectors, indices, query engines) are purpose-built for retrieval over your own data
- You want a large library of pre-built data connectors (LlamaHub) for ingesting from many different document/data sources with minimal custom code

## Limitations

- Your application is primarily general-purpose agent orchestration with retrieval as a secondary concern — LangGraph or CrewAI may fit the primary use case better, with LlamaIndex as a retrieval component within them
- You need the broadest non-retrieval integration ecosystem (arbitrary tool use, multi-provider chains) — LangChain's scope is broader beyond the retrieval-specific focus

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/run-llama/llama_index)
- [Documentation](https://developers.llamaindex.ai/)

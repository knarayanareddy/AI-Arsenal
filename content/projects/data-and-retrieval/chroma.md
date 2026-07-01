---
id: chroma
name: Chroma
version_tracked: null
artifact_type: platform
category: rag
subcategory: vector-databases
description: Developer-friendly embeddings database for local AI apps, prototypes, and lightweight RAG
github_url: "https://github.com/chroma-core/chroma"
license: Apache-2.0
primary_language: Rust
org_or_maintainer: null
tags: [rag, embeddings, retrieval, local]
maturity: production
cost_model: open-source
github_stars: 28419
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-06-13"
docs_url: "https://docs.trychroma.com/"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: data-and-retrieval
domain: [language]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - Developer-friendly embedded/lightweight vector database, the most common default for RAG prototyping and small-to-medium production apps
best_for:
  - You want the fastest path to a working RAG prototype — Chroma can run embedded in-process with zero infrastructure setup, then scale to a client-server deployment when needed
  - You're building a small-to-medium scale application where operational simplicity matters more than the largest possible scale or the most advanced filtering/indexing features
avoid_if:
  - You need to scale to hundreds of millions or billions of vectors with distributed sharding — Milvus, Qdrant, or a managed service like Pinecone are built for that scale from the ground up
  - You need the most mature enterprise features (RBAC, multi-tenancy, SLA-backed managed hosting) — Chroma's managed offering is newer than Pinecone's or Weaviate Cloud's
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Chroma is the most frequently used vector database in RAG tutorials, LangChain/LlamaIndex quickstarts, and starter templates across the ecosystem, which is strong practical-adoption evidence for the prototyping/small-scale niche it targets.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

An open-source, developer-friendly vector database designed to be embedded directly in an application with minimal setup, widely used as the default choice in RAG tutorials and early-stage production applications.

## Why it's in the Arsenal

Developer-friendly embedded/lightweight vector database, the most common default for RAG prototyping and small-to-medium production apps. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want the fastest path to a working RAG prototype — Chroma can run embedded in-process with zero infrastructure setup, then scale to a client-server deployment when needed. See Strengths / Limitations below before adopting it.

## Architecture

Can run fully embedded in-process (backed by SQLite/DuckDB-style local storage) for prototyping, or as a standalone client-server deployment for production, storing embeddings alongside metadata and supporting approximate nearest-neighbor search with metadata filtering.

## Ecosystem Position

Upstream: none of particular note. Downstream: none of particular note as a dependency, though it's the most commonly referenced default vector store in LangChain and LlamaIndex documentation/tutorials. Competing: Qdrant, Weaviate, Milvus, LanceDB, Pinecone. Complementary: pairs with LangChain, LlamaIndex, or Haystack as the retrieval backend for a RAG pipeline.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Scenario**: you want the fastest path to a working RAG prototype — Chroma can run embedded in-process with zero infrastructure setup, then scale to a client-server deployment when needed
2. **Scenario**: you're building a small-to-medium scale application where operational simplicity matters more than the largest possible scale or the most advanced filtering/indexing features

## Strengths

- You want the fastest path to a working RAG prototype — Chroma can run embedded in-process with zero infrastructure setup, then scale to a client-server deployment when needed
- You're building a small-to-medium scale application where operational simplicity matters more than the largest possible scale or the most advanced filtering/indexing features

## Limitations

- You need to scale to hundreds of millions or billions of vectors with distributed sharding — Milvus, Qdrant, or a managed service like Pinecone are built for that scale from the ground up
- You need the most mature enterprise features (RBAC, multi-tenancy, SLA-backed managed hosting) — Chroma's managed offering is newer than Pinecone's or Weaviate Cloud's

## Relation to the Arsenal

This is a data-and-retrieval entry: it documents a vector database, document-processing tool, or RAG platform. For job-based tool comparisons (e.g. web-scraping, vector-search), see [tools/data-ingestion/](../../tools/data-ingestion/_index.md).

## Resources

- [GitHub](https://github.com/chroma-core/chroma)
- [Documentation](https://docs.trychroma.com/)

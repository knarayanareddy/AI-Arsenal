---
id: milvus
name: Milvus
version_tracked: null
artifact_type: platform
category: rag
subcategory: vector-databases
description: Cloud-native vector database for large-scale ANN search and production vector workloads
github_url: https://github.com/milvus-io/milvus
license: Apache-2.0
primary_language: Go
org_or_maintainer: null
tags:
  - rag
  - embeddings
  - retrieval
  - kubernetes
maturity: production
cost_model: open-source
github_stars: 45277
github_stars_last_30d: 515
trending_score: 55
last_commit: '2026-07-20'
docs_url: https://github.com/milvus-io/milvus
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
domain:
  - language
  - multimodal
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - community-driven
  - actively-maintained
  - production-proven
ecosystem_role:
  - Distributed, horizontally-scalable vector database designed from the ground up for billion-scale vector search, a CNCF-adjacent project backed by Zilliz
best_for:
  - You need to scale vector search to hundreds of millions or billions of vectors with distributed, horizontally-scalable infrastructure
  - You need enterprise-grade features (multi-tenancy, RBAC, hybrid search combining vector and scalar filtering) in a self-hostable, open-source system rather than only through a managed vendor
avoid_if:
  - 'You''re prototyping or building a small-scale application — Milvus''s distributed architecture (multiple microservices: proxy, query nodes, data nodes, etc.) is meaningful operational overhead compared to Chroma or LanceDB''s embedded simplicity'
  - You want the simplest possible operational model — Milvus typically requires Kubernetes or a comparable orchestration layer for production deployment at scale
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Milvus has a long production track record (predating the LLM/RAG wave, originally built for general large-scale similarity search) and is backed by Zilliz, which also offers a managed cloud version — this combination of open-source maturity plus commercial backing gives strong production-proven signal.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: conference
    url: https://cloud.google.com/customers/zilliz
    date: '2025-06-19'
    description: 'Google Cloud case study: Milvus/Zilliz Cloud reported over 10,000 global enterprise customers by end of 2024, running production semantic search, RAG, and agentic workloads'
featured: false
status: active
---

## Overview

An open-source, distributed vector database built by Zilliz for billion-scale similarity search, architected as a set of horizontally-scalable microservices rather than a single-node database.

## Why it's in the Arsenal

Distributed, horizontally-scalable vector database designed from the ground up for billion-scale vector search, a CNCF-adjacent project backed by Zilliz. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need to scale vector search to hundreds of millions or billions of vectors with distributed, horizontally-scalable infrastructure. See Strengths / Limitations below before adopting it.

## Architecture

A cloud-native, distributed architecture separating compute and storage across multiple specialized node types (proxy, query nodes, data nodes, index nodes), enabling independent horizontal scaling of each component; supports multiple ANN index types (IVF, HNSW, DiskANN) and hybrid scalar-vector filtering.

## Ecosystem Position

Upstream: none of particular note. Downstream: none of particular note as a dependency, though it's a common backend choice for large-scale production RAG and recommendation systems. Competing: Qdrant, Weaviate at similar production scale; Chroma/LanceDB at the smaller/embedded end. Complementary: integrates with LangChain, LlamaIndex, and Haystack as a retrieval backend.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Scenario**: you need to scale vector search to hundreds of millions or billions of vectors with distributed, horizontally-scalable infrastructure
2. **Scenario**: you need enterprise-grade features (multi-tenancy, RBAC, hybrid search combining vector and scalar filtering) in a self-hostable, open-source system rather than only through a managed vendor

## Strengths

- You need to scale vector search to hundreds of millions or billions of vectors with distributed, horizontally-scalable infrastructure
- You need enterprise-grade features (multi-tenancy, RBAC, hybrid search combining vector and scalar filtering) in a self-hostable, open-source system rather than only through a managed vendor

## Limitations

- You're prototyping or building a small-scale application — Milvus's distributed architecture (multiple microservices: proxy, query nodes, data nodes, etc.) is meaningful operational overhead compared to Chroma or LanceDB's embedded simplicity
- You want the simplest possible operational model — Milvus typically requires Kubernetes or a comparable orchestration layer for production deployment at scale

## Relation to the Arsenal

This is a data-and-retrieval entry: it documents a vector database, document-processing tool, or RAG platform. For job-based tool comparisons (e.g. web-scraping, vector-search), see [tools/data-ingestion/](../../tools/data-ingestion/_index.md).

## Resources

- [GitHub](https://github.com/milvus-io/milvus)
- [Documentation](https://github.com/milvus-io/milvus)

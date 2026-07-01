---
id: qdrant
name: Qdrant
version_tracked: null
artifact_type: platform
category: rag
subcategory: vector-databases
description: Rust vector database for high-performance similarity search with filtering and hybrid search
github_url: "https://github.com/qdrant/qdrant"
license: Apache-2.0
primary_language: Rust
org_or_maintainer: null
tags: [rag, embeddings, retrieval, self-hosted]
maturity: production
cost_model: open-source
github_stars: 32155
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-06-13"
docs_url: "https://qdrant.tech/documentation/"
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
domain: [language, multimodal]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - Open-source vector database written in Rust, positioned as a performance-focused, self-hostable alternative with a strong managed-cloud option
best_for:
  - You want a self-hostable, open-source vector database with strong performance (Rust implementation) and both a free self-hosted path and a managed cloud option
  - You need rich payload filtering combined with vector search (Qdrant's filtering is a frequently cited strength) for use cases beyond pure nearest-neighbor lookup
avoid_if:
  - You need the absolute simplest embedded/zero-infrastructure setup for prototyping — Chroma or LanceDB have a lower barrier to entry for that specific use case
  - You're already committed to a different database for other reasons and want to minimize the number of systems you operate — pgvector might let you avoid adding a new dedicated system entirely
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "production-proven requires third-party adoption evidence; only technical/how-to production-tuning content was found (Qdrant's own blog, third-party config guides), not a named-customer case study. Not claimed. Last reviewed: 2026-07-01."
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

An open-source vector database written in Rust, offering both self-hosted and managed cloud deployment options, with a particular emphasis on performance and rich payload/metadata filtering alongside vector similarity search.

## Why it's in the Arsenal

Open-source vector database written in Rust, positioned as a performance-focused, self-hostable alternative with a strong managed-cloud option. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want a self-hostable, open-source vector database with strong performance (Rust implementation) and both a free self-hosted path and a managed cloud option. See Strengths / Limitations below before adopting it.

## Architecture

Implemented in Rust for performance, using HNSW-based approximate nearest-neighbor indexing combined with a payload filtering engine that can apply complex boolean/range filters efficiently alongside vector search, plus support for sharding and replication for horizontal scaling.

## Ecosystem Position

Upstream: none of particular note. Downstream: none of particular note as a dependency, though widely used as a RAG retrieval backend. Competing: Milvus and Weaviate at similar scale/feature scope; Chroma/LanceDB for simpler embedded use cases. Complementary: integrates with LangChain, LlamaIndex, and Haystack as a standard vector store backend.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Scenario**: you want a self-hostable, open-source vector database with strong performance (Rust implementation) and both a free self-hosted path and a managed cloud option
2. **Scenario**: you need rich payload filtering combined with vector search (Qdrant's filtering is a frequently cited strength) for use cases beyond pure nearest-neighbor lookup

## Strengths

- You want a self-hostable, open-source vector database with strong performance (Rust implementation) and both a free self-hosted path and a managed cloud option
- You need rich payload filtering combined with vector search (Qdrant's filtering is a frequently cited strength) for use cases beyond pure nearest-neighbor lookup

## Limitations

- You need the absolute simplest embedded/zero-infrastructure setup for prototyping — Chroma or LanceDB have a lower barrier to entry for that specific use case
- You're already committed to a different database for other reasons and want to minimize the number of systems you operate — pgvector might let you avoid adding a new dedicated system entirely

_Enrichment status: draft — architecture/production claims above are based on the vendor's own description or limited third-party sourcing; not yet independently verified. Last reviewed: 2026-07-01._

## Relation to the Arsenal

This is a data-and-retrieval entry: it documents a vector database, document-processing tool, or RAG platform. For job-based tool comparisons (e.g. web-scraping, vector-search), see [tools/data-ingestion/](../../tools/data-ingestion/_index.md).

## Resources

- [GitHub](https://github.com/qdrant/qdrant)
- [Documentation](https://qdrant.tech/documentation/)

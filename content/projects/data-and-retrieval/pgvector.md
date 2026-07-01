---
id: pgvector
name: pgvector
version_tracked: null
artifact_type: library
category: rag
subcategory: vector-databases
description: PostgreSQL extension for vector similarity search inside an existing relational database
github_url: "https://github.com/pgvector/pgvector"
license: PostgreSQL
primary_language: C++
org_or_maintainer: null
tags: [rag, embeddings, retrieval, self-hosted]
maturity: production
cost_model: open-source
github_stars: 21738
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-06-11"
docs_url: "https://github.com/pgvector/pgvector"
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
health_signals: [community-driven, actively-maintained, production-proven]
ecosystem_role:
  - PostgreSQL extension adding vector similarity search, positioned as the 'use the database you already have' option rather than adding a new dedicated vector store
best_for:
  - You already run PostgreSQL for your application data and want to add vector search without introducing and operating a separate dedicated vector database
  - You need vector search combined with the full power of SQL (joins, transactions, complex filtering) in a single consistent system rather than syncing data across two databases
avoid_if:
  - You need the absolute best ANN search performance/recall at very large scale — dedicated vector databases (Milvus, Qdrant) generally outperform pgvector at billion-scale vector counts, since PostgreSQL wasn't originally architected for that
  - You don't already use PostgreSQL — introducing Postgres solely to get pgvector, when you had no other need for a relational database, adds unnecessary operational surface versus a purpose-built vector store
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: pgvector's production-proven status is well-established precisely because it rides on PostgreSQL's decades-long production track record; the extension itself is widely adopted specifically because teams already trust and operate Postgres in production.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"conference","url":"https://www.instacart.com/company/tech-innovation/how-instacart-built-a-modern-search-infrastructure-on-postgres","date":"2025-05-29","description":"Instacart engineering blog: pgvector deployed in a production A/B test, reducing zero-result searches by 6% and driving incremental revenue at scale"}
featured: false
status: active
---

## Overview

An open-source PostgreSQL extension that adds vector similarity search directly into Postgres, letting teams add embeddings-based retrieval to an existing relational database rather than operating a separate dedicated vector store.

## Why it's in the Arsenal

PostgreSQL extension adding vector similarity search, positioned as the 'use the database you already have' option rather than adding a new dedicated vector store. It earns a place in the Arsenal because it directly addresses a recurring decision point: you already run PostgreSQL for your application data and want to add vector search without introducing and operating a separate dedicated vector database. See Strengths / Limitations below before adopting it.

## Architecture

Implemented as a native Postgres extension adding a vector column type and both exact and approximate (IVFFlat, HNSW) nearest-neighbor index types, so vector search queries can be combined with standard SQL joins, filters, and transactions in the same query.

## Ecosystem Position

Upstream: depends entirely on PostgreSQL as its host database. Downstream: supported by every major RAG framework (LangChain, LlamaIndex, Haystack) as a vector store backend option. Competing: dedicated vector databases (Milvus, Qdrant, Weaviate) at larger scale; Chroma/LanceDB for embedded simplicity. Complementary: any application already using PostgreSQL for its primary data store.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Scenario**: you already run PostgreSQL for your application data and want to add vector search without introducing and operating a separate dedicated vector database
2. **Scenario**: you need vector search combined with the full power of SQL (joins, transactions, complex filtering) in a single consistent system rather than syncing data across two databases

## Strengths

- You already run PostgreSQL for your application data and want to add vector search without introducing and operating a separate dedicated vector database
- You need vector search combined with the full power of SQL (joins, transactions, complex filtering) in a single consistent system rather than syncing data across two databases

## Limitations

- You need the absolute best ANN search performance/recall at very large scale — dedicated vector databases (Milvus, Qdrant) generally outperform pgvector at billion-scale vector counts, since PostgreSQL wasn't originally architected for that
- You don't already use PostgreSQL — introducing Postgres solely to get pgvector, when you had no other need for a relational database, adds unnecessary operational surface versus a purpose-built vector store

## Relation to the Arsenal

This is a data-and-retrieval entry: it documents a vector database, document-processing tool, or RAG platform. For job-based tool comparisons (e.g. web-scraping, vector-search), see [tools/data-ingestion/](../../tools/data-ingestion/_index.md).

## Resources

- [GitHub](https://github.com/pgvector/pgvector)
- [Documentation](https://github.com/pgvector/pgvector)

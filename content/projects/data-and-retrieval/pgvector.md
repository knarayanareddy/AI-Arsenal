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

pgvector is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

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

1. **Depending on it safely**: the work is the boundary — which calls go through pgvector, what happens when it is slow, and what your system does instead, since those three answers determine whether adopting it is cheap or expensive.
2. **What dominates the decision**: `already`, `postgresql`, `application`, `data` are the variables that actually move the outcome for pgvector in this phase, and none of them appear in a feature comparison.
3. **Before committing**: pick the criterion that would make you abandon this choice, write it down, and check it against a representative slice of your own data — a catalog entry can tell you what is claimed, only a run tells you what is true.

## Strengths

- The implementation detail worth checking before adopting pgvector is specific — implemented as a native Postgres extension adding a vector column type and both exact and approximate (IVFFlat, HNSW) nearest-neighbor index types, so vector search queries can be combined with standard SQL joins, filters, and transactions in the same query — because that is where the capability claim either survives contact with your data or does not.
- Sits in the data-and-retrieval phase alongside the alternatives named in its Ecosystem Position section; cross-phase comparison is usually a category error rather than a useful alternative.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the pgvector footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Documentation describes intended behaviour, not observed behaviour: latency, memory and failure rates for pgvector at your scale need measuring before this informs a production decision.
- No alternative is catalogued alongside pgvector here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

This is the data-and-retrieval entry for pgvector in this phase, and the honest way to use it is as one candidate among the alternatives listed in the phase index rather than as a default. Read the Strengths and Limitations sections before adopting it: the operational cost, the model or service dependencies, and the failure behaviour are what decide whether it fits your workload, and none of those are settled by the feature list alone.

## Resources

- [GitHub](https://github.com/pgvector/pgvector)
- [Documentation](https://github.com/pgvector/pgvector)

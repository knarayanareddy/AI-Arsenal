---
id: elasticsearch
name: Elasticsearch
type: tool
job: [vector-search]
description: Distributed search and analytics engine with mature BM25, dense-vector kNN, and hybrid retrieval for RAG workloads
url: "https://www.elastic.co/elasticsearch"
cost_model: self-hostable
pricing_detail: Free self-managed tiers (AGPL/ELv2 licensing); Elastic Cloud is usage/resource priced; some ML features gated to paid tiers
tags: [retrieval, rag, self-hosted, monitoring]
maturity: production
stack: [java]
free_tier: true
free_tier_limits: Self-managed basic tier free; Elastic Cloud trial; semantic/ML features vary by license tier
self_hostable: true
open_source: true
source_url: "https://github.com/elastic/elasticsearch"
docs_url: "https://www.elastic.co/docs"
github_url: "https://github.com/elastic/elasticsearch"
alternatives: [qdrant, vespa, pinecone]
integrates_with: [langchain, llamaindex]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: null
phase: data-ingestion
audience: [production]
best_when:
  - Your organization already runs Elasticsearch for search/logging — adding kNN + RRF hybrid retrieval reuses existing operational muscle instead of adding a new datastore
  - You need mature lexical search (analyzers, synonyms, multilingual) alongside vectors; BM25 quality still decides many RAG precision cases
avoid_when:
  - You're starting fresh and only need vector similarity — purpose-built vector DBs are simpler to run and cheaper at equivalent recall
  - "Licensing sensitivity: post-2021 Elasticsearch is AGPL/ELv2, not Apache-2.0 (OpenSearch is the Apache-2.0 fork)"
version_tracked: null
verdict: solid-choice
verdict_rationale: The pragmatic hybrid-retrieval choice wherever an ES cluster already exists; rarely the greenfield pick for pure vector workloads
status: active
enrichment_status: draft
---

> **TL;DR:** The incumbent search engine, now with dense-vector kNN and RRF hybrid retrieval. Strongest where it already runs in your org and lexical quality matters; not the greenfield pure-vector pick.

## Overview

Elasticsearch is the dominant distributed search engine (77K+ stars), built on Lucene, offering mature BM25 full-text search plus, in recent versions, HNSW-based dense-vector kNN, sparse retrieval (ELSER), and reciprocal-rank-fusion hybrid queries — making it a legitimate RAG retrieval backend rather than only a logging/search stack.

## Why It's in the Arsenal

A large share of RAG systems are built inside organizations that already operate Elasticsearch, and the highest-leverage retrieval decision there is usually "extend ES with vectors" versus "introduce a new vector database." The Arsenal needs the incumbent represented honestly: excellent lexical retrieval and operational familiarity on one side; heavier resource profile and licensing nuance on the other.

## Key Features

- Industry-standard BM25 with rich analyzers, synonyms, and multilingual support
- HNSW kNN over dense vectors; ELSER learned-sparse retrieval; RRF hybrid ranking
- Ingest pipelines, aggregations, and security/RBAC mature from a decade of production use
- Massive ecosystem: clients, Kibana, integrations with LangChain/LlamaIndex

## Architecture / How It Works

Documents shard across nodes as Lucene indices; queries fan out and merge. Dense vectors index into per-segment HNSW graphs, so vector recall/latency depends on segment/merge tuning — a real operational difference from purpose-built vector stores that manage a single global graph.

## Getting Started

```bash
curl -fsSL https://elastic.co/start-local | sh   # local dev cluster + Kibana
```

## Use Cases

1. **Scenario**: adding RAG retrieval over documents already indexed in an existing ES cluster, using RRF to fuse BM25 and kNN
2. **Scenario**: search products where exact lexical matching, filters, and aggregations carry as much weight as semantic similarity
3. **Scenario where this is NOT the right fit**: greenfield semantic-only retrieval at startup scale — a lightweight vector DB is simpler and cheaper

## Strengths

- Best-in-class lexical retrieval and text-analysis tooling, which pure vector DBs lack
- One datastore for search, filters, aggregations, and vectors reduces system count
- Enormous operational knowledge base; most infra teams already know how to run it

## Limitations / When NOT to Use

- JVM/Lucene resource appetite is high; vector-heavy workloads need careful heap/segment tuning
- Post-2021 licensing (AGPL/ELv2) and paid-tier gating of some semantic features complicate adoption reviews — OpenSearch is the Apache-2.0 alternative
- Vector-search ergonomics and index-build performance trail purpose-built engines

## Integration Patterns

- Compare against Qdrant-class vector DBs and [Vespa](./vespa.md) before adopting — decide based on whether lexical maturity or vector-native simplicity dominates your retrieval problem.
- Link this tool from job guides using its canonical ID `elasticsearch`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Primary site](https://www.elastic.co/elasticsearch)
- [Documentation](https://www.elastic.co/docs)
- [Source](https://github.com/elastic/elasticsearch)

## Buzz & Reception

- Included because "extend Elasticsearch vs. add a vector DB" is one of the most common real-world RAG architecture decisions, and ES's RRF hybrid search features anchor that comparison in current retrieval writeups.

---
*Last reviewed: 2026-07-08 by @maintainer*

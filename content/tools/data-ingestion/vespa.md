---
id: vespa
name: Vespa
type: tool
job: [vector-search]
description: Open-source search and ranking platform combining vector, lexical, and structured search with on-node ML inference
url: "https://vespa.ai/"
cost_model: open-source
pricing_detail: Apache-2.0 open source; managed Vespa Cloud is usage-priced
tags: [retrieval, rag, self-hosted, embeddings]
maturity: production
stack: [java, cpp]
free_tier: true
free_tier_limits: Fully open source; Vespa Cloud offers trial credits
self_hostable: true
open_source: true
source_url: "https://github.com/vespa-engine/vespa"
docs_url: "https://docs.vespa.ai/"
github_url: "https://github.com/vespa-engine/vespa"
alternatives: [qdrant, weaviate, pinecone]
integrates_with: [langchain, llamaindex]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: null
phase: data-ingestion
audience: [production]
best_when:
  - You need true hybrid retrieval (vector + BM25 + structured filters) with multi-phase ranking expressed in one engine, at large scale
  - Your ranking logic needs ML models (ONNX, cross-encoders) executed on the content nodes next to the data instead of a separate reranking service
avoid_when:
  - You need a simple vector store for a prototype — Vespa's application-package model and deployment complexity dwarf a pgvector or Qdrant setup
  - Your team has no appetite for operating a stateful JVM/C++ cluster; managed lightweight vector DBs are far less to run
version_tracked: null
verdict: solid-choice
verdict_rationale: The most capable open-source engine when retrieval is genuinely hybrid and ranking is the hard part, at the price of real operational complexity
status: active
enrichment_status: draft
---

> **TL;DR:** Open-source search platform doing vector + lexical + structured retrieval and multi-phase ML ranking in one engine, with on-node inference. Immensely capable; operationally heavyweight.

## Overview

Vespa (originating at Yahoo, spun out in 2023) is a search and ranking platform where vector similarity, BM25, and structured filtering are first-class operators in one query language (YQL), and ranking is a multi-phase pipeline that can execute ONNX models — including cross-encoder rerankers — directly on the content nodes holding the data (~7K stars, Apache-2.0; serves Yahoo-scale and perplexity.ai workloads).

## Why It's in the Arsenal

The Arsenal's retrieval guidance (add hybrid search for exact terms; add reranking after recall is acceptable) usually implies wiring together a vector DB, a lexical engine, and a reranking service. Vespa is the counter-architecture: one engine where those are query-time features rather than integration projects — the relevant benchmark when a RAG system's retrieval requirements outgrow single-purpose vector stores.

## Key Features

- Hybrid retrieval: ANN (HNSW), BM25/weakAnd, and structured filters composable in one query
- Multi-phase ranking (cheap first phase, expensive ML second phase) with ONNX model execution on content nodes
- Real-time indexing with immediate searchability; tensor data model for multi-vector/ColBERT-style representations
- Horizontal scaling with automatic data distribution and grouping/aggregation

## Architecture / How It Works

Documents are distributed across stateless container nodes (query processing) and stateful content nodes (index + ranking). Queries fan out; first-phase ranking runs over candidates cheaply, second-phase re-ranks the top-k with expression- or ONNX-based models on the node — moving compute to data instead of shipping candidates to a reranker service.

## Getting Started

```bash
brew install vespa-cli   # or docker run vespaengine/vespa
vespa clone album-recommendation myapp && cd myapp && vespa deploy
```

## Use Cases

1. **Scenario**: RAG retrieval requiring exact-term precision (SKUs, error codes) plus semantic recall plus metadata filters in one ranked result
2. **Scenario**: e-commerce/feed-style search where business-logic ranking phases matter as much as similarity
3. **Scenario where this is NOT the right fit**: a prototype needing cosine similarity over 100K chunks — use a lightweight vector store

## Strengths

- Eliminates the vector-DB + lexical-engine + reranker integration seam; ranking consistency in one place
- Tensor model supports late-interaction (ColBERT) and multi-vector patterns most vector DBs can't express
- Proven at extreme scale for decades of production search at Yahoo

## Limitations / When NOT to Use

- Steep learning curve: application packages, schema definitions, and ranking expressions are a paradigm, not a config file
- Operating the stateful cluster (or paying for Vespa Cloud) is the cost of its capability
- Community/ecosystem smaller than the mainstream vector-DB wave; fewer copy-paste examples

## Integration Patterns

- Compare against Qdrant-class vector stores and [Elasticsearch](./elasticsearch.md) before adopting — if you don't need multi-phase on-node ranking, they're simpler.
- Link this tool from job guides using its canonical ID `vespa`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Primary site](https://vespa.ai/)
- [Documentation](https://docs.vespa.ai/)
- [Source](https://github.com/vespa-engine/vespa)

## Buzz & Reception

- Included because Vespa is the standing counter-example in vector-DB architecture debates — cited in hybrid-search and RAG-at-scale writeups (including perplexity.ai's public stack notes) as the one-engine alternative.

---
*Last reviewed: 2026-07-08 by @maintainer*

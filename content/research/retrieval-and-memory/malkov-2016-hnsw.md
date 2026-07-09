---
id: malkov-2016-hnsw
title: "Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs"
phase: retrieval-and-memory
venue: other
year: 2016
authors:
  - "Malkov, Y. A."
  - "Yashunin, D. A."
arxiv_id: "1603.09320"
arxiv_url: "https://arxiv.org/abs/1603.09320"
pdf_url: "https://arxiv.org/pdf/1603.09320"
code_url: "https://github.com/nmslib/hnswlib"
venue_url: "https://ieeexplore.ieee.org/document/8594636"

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 8000

tldr: "Introduced the HNSW graph index for approximate nearest-neighbor search — the algorithm powering most production vector databases and the retrieval step of essentially every RAG system"
key_contribution: "A multi-layer navigable small-world graph that gives logarithmic-scaling search with high recall, making billion-scale similarity search fast enough for real-time retrieval"

builds_on: []
implemented_in: []

tags:
  - retrieval
  - embeddings
  - rag
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

HNSW (Hierarchical Navigable Small World) is the approximate-nearest-neighbor (ANN) algorithm that most of the catalog's vector databases run under the hood. When a RAG system embeds a query and asks a vector store for the most similar documents, HNSW is very often what actually finds them. It builds a layered proximity graph over the vectors: upper layers have long-range links for fast coarse navigation, lower layers have dense local links for accurate final search. Greedy traversal from the top down reaches a query's nearest neighbors in logarithmic time with high recall — the property that makes real-time semantic retrieval feasible at scale.

## Why it's in the Arsenal

- Vector search is the retrieval backbone of RAG, and HNSW is its dominant index. Understanding its parameters explains the recall/latency/memory tradeoffs you tune in Qdrant, Weaviate, Milvus, pgvector, FAISS, and others.
- It grounds practical decisions: `M` (graph connectivity), `efConstruction` (build-time search width), and `ef` (query-time search width) are HNSW knobs surfaced directly by vector databases, and knowing what they do is the difference between guessing and tuning retrieval.
- `practical_applicability: high` — you don't implement HNSW yourself, but you configure it constantly whenever you operate a vector store.

## Core Contribution

The paper's core idea is a hierarchical, navigable small-world graph. Each vector is a node connected to a bounded number of near neighbors; nodes are assigned to layers with exponentially decaying probability, so a few nodes appear in sparse upper layers and all nodes appear in the dense bottom layer. Search starts at an entry point in the top layer and greedily hops to the neighbor closest to the query, descending a layer when no closer neighbor exists, until it converges in the bottom layer. This produces search complexity that scales logarithmically with dataset size while maintaining high recall, and it supports incremental insertion (build the graph as data arrives) rather than requiring a full rebuild. The connectivity parameter `M` and the search-width parameters `efConstruction`/`ef` trade memory and build/query time against recall.

## Key Results

- Demonstrated state-of-the-art speed/recall tradeoffs on standard ANN benchmarks (2016), outperforming tree- and hashing-based methods and prior graph approaches
- Achieved high recall with logarithmic query scaling, enabling millisecond-scale search over millions to billions of vectors
- Supported incremental construction, important for indexes that grow over time rather than being built once
- Benchmark specifics are from 2016; the durable significance is that HNSW became the default production ANN index, which the vector-database ecosystem reflects to this day.

## Methodology

The authors defined the layered graph construction (probabilistic layer assignment, neighbor selection heuristics that prune redundant links) and the greedy layered search procedure, then evaluated on standard ANN datasets measuring recall versus queries-per-second and memory. Comparisons against tree-based (e.g. KD-trees), LSH, and earlier NSW graphs isolate the benefit of the hierarchy and the neighbor-selection heuristic. The reference implementation (`hnswlib`) is widely used and embedded in many vector stores.

## Practical Applicability

This is knowledge you apply every time you run a vector database. Concrete levers: raise `M` and `efConstruction` for higher recall at the cost of memory and slower builds; raise query-time `ef` to trade latency for recall on hard queries; understand that HNSW is memory-resident, which drives capacity planning versus disk-based indexes (e.g. DiskANN/IVF variants). When retrieval recall is poor or latency is high, tuning these HNSW parameters — or choosing a different index type — is the direct remedy.

## Limitations & Critiques

- Memory-heavy: the graph and vectors are typically held in RAM, so very large collections need sharding or disk-based alternatives.
- Build time and memory grow with `M`/`efConstruction`; high-recall configurations are expensive to construct.
- Deletions are awkward — graphs handle inserts gracefully but true deletes often require tombstoning and periodic rebuilds.
- It is approximate: recall is a tunable, not a guarantee, so adversarial or high-dimensional edge cases can miss true neighbors.

## Reproductions & Follow-up Work

HNSW is one of the most reproduced ANN methods; `hnswlib` and integrations in FAISS, Qdrant, Weaviate, Milvus, Redis, and pgvector attest to it. Follow-up and complementary work includes IVF-PQ and product quantization for memory reduction ([Billion-scale similarity search with GPUs / FAISS](./johnson-2017-faiss.md)) and disk-based graph indexes (DiskANN) for larger-than-RAM collections.

## Relation to the Arsenal

- The algorithm behind the catalog's vector-search tools and the retrieval step of its RAG entries.
- Pairs with [Billion-scale similarity search with GPUs (FAISS)](./johnson-2017-faiss.md) for the quantization/GPU side of ANN, and with dense-retrieval papers like [DPR](./karpukhin-2020-dpr.md) that produce the embeddings HNSW indexes.

## Resources

- [arXiv abstract](https://arxiv.org/abs/1603.09320)
- [PDF](https://arxiv.org/pdf/1603.09320)
- [Reference implementation (nmslib/hnswlib)](https://github.com/nmslib/hnswlib)
- [IEEE TPAMI version](https://ieeexplore.ieee.org/document/8594636)

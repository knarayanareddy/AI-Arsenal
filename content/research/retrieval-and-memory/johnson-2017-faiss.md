---
id: johnson-2017-faiss
title: "Billion-scale similarity search with GPUs"
phase: retrieval-and-memory
venue: other
year: 2017
authors:
  - "Johnson, J."
  - "Douze, M."
  - "Jégou, H."
arxiv_id: "1702.08734"
arxiv_url: "https://arxiv.org/abs/1702.08734"
pdf_url: "https://arxiv.org/pdf/1702.08734"
code_url: "https://github.com/facebookresearch/faiss"
venue_url: "https://ieeexplore.ieee.org/document/8733051"

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 5000

tldr: "The FAISS paper — GPU-accelerated similarity search with product quantization that made billion-vector nearest-neighbor search practical, underpinning large-scale retrieval and vector-store backends"
key_contribution: "GPU-optimized k-selection and inverted-file + product-quantization (IVF-PQ) indexes that compress vectors and search them at scale, trading a controllable amount of recall for order-of-magnitude memory and speed gains"

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

This is the paper behind FAISS, the similarity-search library that a large share of the catalog's retrieval systems and vector stores rely on. Its contribution is making nearest-neighbor search feasible at billion-vector scale by (1) compressing vectors with product quantization so they fit in memory, (2) partitioning the space with an inverted file so only a fraction of vectors are scanned per query, and (3) implementing the whole pipeline — especially the k-nearest selection — efficiently on GPUs. Where [HNSW](./malkov-2016-hnsw.md) is the dominant graph index, FAISS's IVF-PQ family is the dominant *quantization* approach, and the two represent the main axes of production ANN.

## Why it's in the Arsenal

- FAISS is a foundational retrieval building block: many vector databases embed it or its index types, and it is the default for large offline similarity workloads (dedup, clustering, embedding search).
- It grounds the memory side of vector search that HNSW alone does not solve: product quantization is how you fit billions of vectors in limited RAM, at a tunable recall cost.
- `practical_applicability: high` — you use FAISS directly for large-scale embedding search and indirectly whenever a vector store exposes IVF/PQ index types.

## Core Contribution

The paper combines three ideas into a system. Product quantization (PQ) splits each vector into sub-vectors and quantizes each against a small codebook, so a high-dimensional float vector is stored as a handful of bytes — massive memory compression with approximate distance computation. An inverted file (IVF) clusters the dataset (e.g. via k-means) and, at query time, searches only the nearest few clusters, cutting the number of candidate comparisons. The paper's distinct engineering contribution is doing this on GPUs: a novel, GPU-friendly k-selection algorithm to find the top-k smallest distances efficiently (the usual bottleneck), plus careful memory layout, achieving order-of-magnitude speedups over CPU baselines. Together, IVF-PQ on GPU makes billion-scale search tractable with controllable recall.

## Key Results

- Constructed a k-NN graph over 1 billion vectors in about 12 hours on 4 GPUs (2017), far faster than prior CPU-based approaches
- Reported large speedups (roughly an order of magnitude) over the best prior GPU similarity-search results, with high recall on standard billion-scale benchmarks (SIFT1B/Deep1B)
- Demonstrated that PQ compression allows billion-vector datasets to reside in GPU/host memory at a controllable recall tradeoff
- Numbers are 2017 hardware-specific; the durable significance is FAISS itself, which became a standard retrieval component and index toolkit rather than any single benchmark figure.

## Methodology

The authors implemented IVF-PQ indexing with GPU kernels for distance computation and a WarpSelect-style k-selection routine, and benchmarked on SIFT1M/1B and Deep1B for recall@k versus throughput and index build time, comparing against CPU FAISS and prior GPU methods. Ablations covered the number of IVF cells probed (`nprobe`) and PQ code sizes, quantifying the recall/speed/memory frontier. The open-source FAISS library packages these indexes and remains the reference implementation.

## Practical Applicability

FAISS is a workhorse. Use it directly for large offline jobs — searching, clustering, or deduplicating tens of millions to billions of embeddings — where a full vector database is unnecessary. Key levers: choose an index type by scale (flat/exact for small sets; IVF-PQ or IVF-Flat for large; HNSW for in-memory graph search, which FAISS also implements); tune `nprobe` for the recall/latency tradeoff; and pick PQ code size for the memory/recall tradeoff. When a managed vector store exposes IVF/PQ parameters, this paper explains what they mean.

## Limitations & Critiques

- FAISS is a library, not a database: it does not provide persistence, filtering, replication, or an API out of the box — those come from vector databases built around it or similar indexes.
- Product quantization is lossy; aggressive compression lowers recall, so high-recall requirements limit how much you can compress.
- Getting the best performance requires GPU expertise and parameter tuning; naive use can underperform simpler in-memory graph indexes for mid-sized data.

## Reproductions & Follow-up Work

FAISS is heavily used and reproduced; it is embedded in or referenced by many vector stores and is a standard research baseline. It complements graph indexing ([HNSW](./malkov-2016-hnsw.md), which FAISS also implements) and precedes disk-based large-scale indexes (DiskANN). It indexes embeddings produced by dense retrievers such as [DPR](./karpukhin-2020-dpr.md) and sentence encoders like [Sentence-BERT](./reimers-2019-sentence-bert.md).

## Relation to the Arsenal

- Foundational retrieval infrastructure behind the catalog's vector-search tools and large-scale RAG pipelines.
- Pairs with [HNSW](./malkov-2016-hnsw.md) (the graph-index axis of ANN) and with embedding papers like [DPR](./karpukhin-2020-dpr.md) and [Sentence-BERT](./reimers-2019-sentence-bert.md) that generate the vectors it searches.

## Resources

- [arXiv abstract](https://arxiv.org/abs/1702.08734)
- [PDF](https://arxiv.org/pdf/1702.08734)
- [FAISS (facebookresearch/faiss)](https://github.com/facebookresearch/faiss)
- [IEEE version](https://ieeexplore.ieee.org/document/8733051)

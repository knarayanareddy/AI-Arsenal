---
id: faiss
name: "FAISS"
type: tool
job: [vector-search]
description: "C++ similarity search and clustering library for dense vectors with full Python and numpy wrappers and GPU implementations of key indexes"
url: "https://faiss.ai"
cost_model: open-source
pricing_detail: "MIT open source"
tags: [llm, evaluation]
maturity: production
stack: [cpp, python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/facebookresearch/faiss"
docs_url: "https://faiss.ai"
github_url: "https://github.com/facebookresearch/faiss"
alternatives: [qdrant, milvus, pgvector]
integrates_with: [langchain, llamaindex]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [production, research]
best_when: ["You need to choose a vector search algorithm deliberately against a memory or recall budget, because Faiss ships flat, compressed-quantisation and graph-based index families in one library.", "Your index must hold more vectors than fit comfortably in RAM, because the compressed-representation methods are designed to scale to billions of vectors in main memory on a single server.", "You want GPU acceleration as a drop-in replacement, because index names change from the CPU to GPU variant and the memory copies are handled automatically."]
avoid_when: ["You want a running service rather than a library, because Faiss is an in-process C++ library with Python wrappers and no server, cluster or persistence layer of its own.", "You need durable metadata filtering, updates and deletes, because those are application responsibilities you build on top of the index.", "You are not prepared to own index lifecycle, because choosing an index, training quantisers and rebuilding are all decisions Faiss deliberately leaves to you."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (40,464), license, and last push (2026-07-07) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: best-in-class
verdict_rationale: "The reference ANN library the vector-DB industry builds on; unmatched for in-process and research use"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/facebookresearch/faiss", "date": "2026-07-08", "description": "40,464 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Faiss is a C++ library for efficient similarity search and clustering of dense vectors, with complete Python and numpy wrappers and GPU implementations of the most useful algorithms, developed primarily at Meta's Fundamental AI Research group. The model is straightforward: instances are vectors with integer ids, similarity is L2 distance or dot product, and cosine similarity is a dot product on normalised vectors. The library contains several method families, and the split between them is the interesting part. Some methods operate on binary vectors or compact quantisation codes and never keep the original vectors, trading precision for the ability to hold billions of vectors in main memory on one server. Others, such as HNSW and NSG, add an indexing structure on top of raw vectors to make search faster. The GPU implementation accepts input from CPU or GPU memory, and GPU indexes are a drop-in replacement for CPU ones with the copies handled automatically, though keeping both input and output on the GPU is faster. Supporting code for evaluation and parameter tuning is included.

## Why It's in the Arsenal

The decision it removes is treating vector search as a solved black box. In practice a production index is a set of trade-offs, and Faiss puts the whole menu in one library so you can measure the frontier: a flat index is exact and needs no training but scales with the vector count, a compressed code gives up recall for a large memory reduction, and a graph index buys search speed at the cost of build time and memory. The GPU story matters because the same index names exist on both sides, so an experiment that fits on a laptop can move to hardware without rewriting the retrieval code. What you accept is total ownership: Faiss is a library, so persistence, metadata, sharding and consistency are yours.

## Key Features

- The full menu of index families in one library, so algorithm choice is a measured decision rather than a default you inherit.
- Compressed-representation indexes that hold billions of vectors in main memory on a single server, with the recall cost stated rather than hidden.
 - GPU indexes as a drop-in replacement for the CPU ones, with memory copies handled automatically.
 - Mature C++ core with complete Python and numpy wrappers, developed at Meta's FAIR group and with a long changelog.

## Architecture / How It Works

The library is organised around index types over a vector set with integer ids. Flat indexes do exhaustive search and are exact. Product-quantisation-family indexes compress vectors into codes using a trained codebook and can operate on the compressed representation alone, which is the mechanism behind the billions-in-main-memory claim, at a documented cost in search precision. Graph indexes such as HNSW and NSG build a proximity graph over the raw vectors and traverse it at query time, trading build cost for query speed. Binary indexes cover the case where the vector itself is compact. Above these sit the wrapper utilities, with an index factory that builds a configured index, quantisers that must be trained on a sample, and the evaluation and parameter-tuning code for measuring recall against a ground-truth search. The GPU path mirrors the CPU index types, taking input from either memory space and copying as needed, with single and multi-GPU support.

## Getting Started

Install a prebuilt wheel, build an index, and add vectors to it; production distributions need a constraint file rather than an unconstrained pin:

```bash
pip install faiss-cpu
# for GPU builds, use the NVIDIA distribution that matches your CUDA version
```

```python
import faiss, numpy as np

d = 128
index = faiss.IndexFlatL2(d)          # exact search baseline
index.add(np.random.random((10000, d)).astype('float32'))
D, I = index.search(np.random.random((1, d)).astype('float32'), 5)
```

The README links precompiled Anaconda builds and a change log; the GPU variants are the same index classes with a Gpu prefix, so IndexFlatL2 becomes GpuIndexFlatL2.

## Use Cases

1. Choosing a search algorithm on evidence: run flat, quantised and graph indexes over your own vectors and measure recall and latency to pick one, which is what the evaluation and tuning code is for.
2. Search over more vectors than fit comfortably: train a quantiser and use a compressed-code index to hold billions of vectors in main memory on one server.
3. Porting a CPU index to GPU: swap the index class for its Gpu-prefixed counterpart so search accelerates without rewriting retrieval code.

## Strengths

Faiss is the algorithm layer that the vector databases in content/projects/data-and-retrieval are built on or reimplement, so the comparison is layer rather than product: a managed vector store gives you persistence, filtering, sharding and an API in exchange for the index internals, while Faiss gives you the index and nothing else. It overlaps with ANN libraries in the same category, and the honest distinction is the breadth of index families in one place and the reference implementations rather than a distribution-specific feature. It is not an embedding model, so content/projects/foundation-models sits upstream, and it is not a serving stack, so the inference entries in content/projects/inference-engines would host it. In a retrieval pipeline it is the component that decides recall, sitting between the embedding step and whatever storage holds your documents and metadata.

## Limitations / When NOT to Use

It is a library with no server, so durability, replication, sharding, metadata filtering, and concurrent read and write behaviour are all things you build and maintain on top, and index rebuilds are your job. Training quantisers requires representative samples and a rebuild whenever the vector distribution changes, which is an operational routine rather than a one-off. The precision loss of compressed indexes is real and workload-dependent, so a recall target has to be measured on your data rather than assumed. GPU acceleration only pays off when both input and output stay resident on the device, and the automatic copying path is convenient precisely because it is not the fast one. Wrapping this in a service is a project, so teams who need filtered search with durability should look at a vector database first.

## Integration Patterns

This belongs in content/projects/data-and-retrieval as the search-algorithm layer, and it is the component a vector database in the same phase embeds or reimplements. Read it alongside those entries to decide whether you need a managed store or the index itself, and against the embedding models in content/projects/foundation-models that produce the vectors it searches. Where a serving runtime matters, the inference entries in content/projects/inference-engines can host a Faiss index, though a purpose-built vector store is usually the better pairing. In a full RAG pipeline it is the component that sets your recall budget, which makes it the first place to look when retrieval quality is the problem.

## Resources

- [GitHub — facebookresearch/faiss](https://github.com/facebookresearch/faiss)
- [Project site — faiss.ai](https://faiss.ai)
- [Change log](https://github.com/facebookresearch/faiss/blob/main/CHANGELOG.md)

## Buzz & Reception

The reference library for vector search algorithm choice: compressed codes, graph indexes and flat search, so you can trade recall against memory deliberately.

---
id: nmslib-hnswlib
name: "hnswlib"
version_tracked: null
artifact_type: library
category: rag
subcategory: vector-databases
description: "Header-only C++ HNSW implementation with Python bindings, tunable memory versus recall, and no server or daemon"
github_url: "https://github.com/nmslib/hnswlib"
license: "Apache-2.0"
primary_language: C++
org_or_maintainer: "nmslib"
tags: [embeddings, rag]
maturity: production
cost_model: open-source
github_stars: 5334
github_stars_last_30d: 0
trending_score: 29
last_commit: "2026-09-15"
docs_url: "https://github.com/nmslib/hnswlib"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained]
ecosystem_role:
  - "Header-only HNSW implementation giving fast, memory-tunable approximate nearest-neighbour search in-process, without standing up a vector database."
best_for:
  - "You are embedding millions to hundreds of millions of vectors inside one application process and do not want to run a separate database."
  - "You need to tune recall against memory budget for a specific corpus, since M, efConstruction, and efSearch are all exposed at build and query time."
  - "You are prototyping a retrieval component and want a dependency-light index that compiles in seconds rather than a client-server install."
avoid_if:
  - "You need durability, replication, metadata filtering, or concurrent writers across processes, since a header-only index has none of those."
  - "Your collection must be queried by many services, because each one would need its own copy of the index and its own RAM budget."
  - "You need distributed sharding or a managed uptime story, where Qdrant, Milvus, or pgvector supply the operational layer."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (5334), Apache-2.0 license, last commit 2026-09-15, and primary language C++ were read from the GitHub API; the topics array is empty upstream and there is no separate docs site. The HNSW algorithm, the M and efConstruction and efSearch parameters, similarity spaces, and deletion marking come from the official README; no index was built or benchmarked here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/nmslib/hnswlib", "date": "2026-09-28", "description": "5,334 stars and last commit 2026-09-15 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

hnswlib is a header-only C++ implementation of the Hierarchical Navigable Small World graph index, exposed to Python through pybind11. Building an index takes a dimensionality, a max element count, a similarity metric such as cosine, inner product, or Euclidean, and the two graph parameters M and efConstruction, where M sets the number of bidirectional links per node and efConstruction the size of the candidate list during insertion. Queries take efSearch, the beam width, and return the k nearest neighbours with their labels and distances. The library supports adding and updating elements after construction, persists to a binary file, and marks elements for removal, so an incremental build is normal. Search is a best-first beam across the graph's layers, with a decaying hop distribution in the upper layers providing long-range links.

## Why it's in the Arsenal

The decision it resolves is whether a retrieval feature needs a database. For a fixed corpus embedded once and queried by one service, a vector database is a distributed-systems cost with no benefit, and the in-process index is both faster, because there is no network hop or serialization, and cheaper. The library also exposes the two knobs that actually determine retrieval quality, M and efConstruction at build time and efSearch at query time, so you can quantify the recall and memory trade-off for your own corpus instead of accepting a default. That measurability is what makes it a good baseline to beat before you pay for a vector service.

## Architecture

The index is a multi-layer proximity graph. Layer zero holds every element; higher layers hold a geometrically decaying subset reachable through long links, and a search starts at the top layer, greedily descending by distance until it reaches layer zero, where it runs a best-first beam search of width efSearch. Neighbour selection uses the heuristic from the HNSW paper rather than raw distance, which avoids clusters of mutually near duplicates in the graph and is why recall holds up with smaller M than naive linking would need. Storage is flat contiguous arrays sized at construction, so a max count of half the intended size is chosen up front since growing the graph means rebuilding. Construction is single-threaded per element insertion in the reference implementation, so build time scales with corpus size and M rather than with available cores.

## Ecosystem Position

hnswlib is a standalone index rather than a competitor to Qdrant, Milvus, Weaviate, or pgvector on service features, but it competes directly with FAISS and with the index implementations bundled inside those servers, since any of them can be swapped for it and the recall-versus-memory curve is broadly comparable. It is an alternative to a vector database when the whole corpus fits in one process's RAM and the workload is a single writer with many readers. It is not a substitute for LanceDB or a columnar system when you need scan filters, deletions with compaction, or a durable write path, because a header-only graph has no write-ahead log and no merge. Compared to pgvector it wins on query latency and memory at large scale and loses on every operational property, including backups, replication, and SQL integration.

## Getting Started

Install the wheel or compile the header, then build and query an index:

```bash
pip install hnswlib
# or build from source: git clone https://github.com/nmslib/hnswlib && cd hnswlib && pip install .
```

```python
import numpy as np, hnswlib

dim, n = 768, 200_000
data = np.random.random((n, dim)).astype(np.float32)
labels = np.arange(n)

index = hnswlib.Index(space="cosine", dim=dim)
index.init_index(max_elements=n, M=16, ef_construction=200)  # M and efConstruction set recall vs memory
index.add_items(data, labels, num_threads=-1)
index.set_ef(64)                                          # efSearch tunes query recall

neighbors, distances = index.knn_query(data[:3], k=10)
index.save_index("vectors.hnsw")
```

```python
# restore and grow incrementally
index2 = hnswlib.Index(space="cosine", dim=dim)
index2.load_index("vectors.hnsw", max_elements=n * 2)
index2.mark_deleted(17); index2.add_items(new_data, new_labels)
```

Use `num_threads=-1` for every core on the build step; it is the single biggest build-time lever.

## Key Use Cases

1. In-application semantic search over a corpus that fits comfortably in one process, such as a code index, a note archive, or a product catalog snapshot.
2. A retrieval-quality experiment, where sweeping efSearch against measured recall gives you the curve a production index choice depends on.
3. A model-serving process that already loads embeddings and can host the index with no extra network hop, which keeps retrieval on the same host as generation.

## Strengths

- Fast queries with no serialization or network cost, since search happens in the same address space as the caller.
- Explicit control of M, efConstruction, and efSearch, making the recall-versus-memory trade-off measurable on your own corpus.
- Header-only C++ with lightweight pybind11 bindings, so it builds in seconds and adds almost no dependency weight.
- Supports incremental add, delete marking, and on-disk persistence without requiring a separate service process.

## Limitations

The flat storage means the index must be sized at build time, and exceeding the initial capacity forces a rebuild, which is a real problem when your corpus is still growing. There is no durability story: no write-ahead log, no atomic crash recovery, and no replication, so a restart reloads a file you are responsible for backing up. Metadata filtering, which almost every production RAG stack needs, is not supported and usually gets approximated by over-fetching and filtering in application code, which wastes recall. Construction is largely single-threaded, so a billion-vector build is a long job, and the library holds everything in RAM with no memory-mapped option.

## Relation to the Arsenal

This is a data-and-retrieval phase entry in the vector-databases subcategory, and it is the lowest-operations option there, sitting alongside Qdrant, Milvus, and pgvector rather than beside them as an equal service. Its output is the nearest-neighbour candidate set that the RAG entries consume, so a ColBERT or ColPali style late-interaction setup changes what you feed into it but not the index interface. The model entries in foundation-models determine the embedding dimensionality, which is a parameter you must fix before building anything here.

## Resources

- [hnswlib GitHub repository](https://github.com/nmslib/hnswlib)
- [HNSW paper, Malkov and Yashunin](https://arxiv.org/abs/1603.09320)
- [Qdrant documentation on HNSW tuning, as a comparison point](https://qdrant.tech/documentation/concepts/indexing/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (5,334 stars, last commit 2026-09-15, license Apache-2.0, verified via GitHub API on 2026-09-28)*

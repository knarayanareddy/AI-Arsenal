---
id: microsoft-diskann
name: "DiskANN"
version_tracked: null
artifact_type: library
category: rag
subcategory: vector-databases
description: "Disk-based approximate-nearest-neighbour index with filtered search, built for vector collections larger than one machine's memory"
github_url: "https://github.com/microsoft/DiskANN"
license: "MIT"
primary_language: Rust
org_or_maintainer: "microsoft"
tags: [embeddings, retrieval, rag]
maturity: production
cost_model: open-source
github_stars: 1937
github_stars_last_30d: 0
trending_score: 26
last_commit: "2026-09-28"
docs_url: "https://github.com/microsoft/DiskANN"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Disk-based approximate-nearest-neighbour index with filtered search, designed for vector collections far larger than a single machine can hold in RAM."
best_for:
  - "You have more vectors than fit in one machine's memory and need search to stay fast without a large-memory host."
  - "You need filtered search combined with nearest-neighbour search, where the filter is applied inside the index rather than after retrieval."
  - "You want a single-node vector index you control, with a small in-process surface rather than a distributed database to operate."
avoid_if:
  - "Your corpus fits comfortably in memory, where an in-process HNSW index is faster and simpler with no disk layer."
  - "You need durability, replication, and multi-writer concurrency, since a search index is a derived structure rebuilt from source vectors."
  - "You need a rich filter language across many fields, where a general-purpose vector database with secondary indexes is the better fit."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (1937), MIT license, last commit 2026-09-28, and primary language Rust were read from the GitHub API; the topics array is empty upstream and no homepage is declared. The disk-first graph layout, cached hot set, filtered search during traversal, and the Rust-over-C++ structure come from the official README and papers; no index was built here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/microsoft/DiskANN", "date": "2026-09-28", "description": "1,937 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

DiskANN is a disk-based vector index from Microsoft Research that brings fast, fresh, and filtered approximate-nearest-neighbour search to a database. The design premise is that a large collection does not fit in RAM, so the index is stored on disk in a layout optimized for the search access pattern rather than for general reads, and the query path is structured to touch only the blocks that matter. A small set of hot nodes and frequently accessed pages stays cached, giving in-memory-like performance on the majority of queries while the cold majority is served from disk with predictable latency. The system also addresses freshness, so newly inserted vectors become searchable without a full rebuild, and it supports filtered search that runs during the search itself. The core is a Rust implementation with a Python interface, and the C++ components cover the indexing pipeline.

## Why it's in the Arsenal

The decision it resolves is what happens when the corpus outgrows RAM. The usual answer is a distributed vector database, which is a real operational commitment, and the alternative is an in-memory index that stops fitting. DiskANN's answer is to treat disk as the storage of record for the graph and make the query path efficient enough that the penalty is small: most of the index is on disk, a small hot set is cached, and the search visits far fewer blocks than a random-access design would. The second motivation is filter interaction: a filtered nearest-neighbour query that filters after retrieval wastes recall, so running the filter inside the traversal returns the right number of qualifying neighbours. The third is freshness, since a real corpus changes daily and a nightly full rebuild is not a plan.

## Architecture

The index is a proximity graph, in the HNSW family, laid out on disk in a node record format designed so a search reads contiguous, predictable blocks. A query begins at an entry point in the cached region, traverses the graph, and touches a bounded number of nodes, with a beam search whose width controls the number of disk reads and therefore the latency-recall trade. Insertion is supported by an in-memory component that absorbs new vectors and merges them into the on-disk structure, which is what keeps the index fresh without a rebuild. Filtering is applied during traversal so a node failing the predicate is not expanded, and the search continues until the beam is full of qualifying results. A background compaction merges the in-memory tail into the main structure. The Python package exposes build, load, search, and filtered-search calls, and the underlying layout is a C++ library with a Rust driver.

## Ecosystem Position

DiskANN is an alternative to an in-process HNSW index when the corpus exceeds memory, and it competes with the vector databases in the same space on a different axis: it is a search structure inside your process rather than a service, so it wins on the absent network hop and the absent control plane while losing on durability, replication, and query flexibility. Compared to pgvector or a disk-based index inside Postgres, it is a specialized ANN structure with a much higher recall-per-disk-read, and it is a rather than an alternative to a general-purpose database, which will always be the right place for the source vectors and the transactional metadata. It overlaps with the chunked approaches in the vector-database category that trade exactness for scale, and it is a complement to the retrieval framework entries in this catalog, which call it through a thin retriever interface. The ColBERT entry is a natural pairing, since a late-interaction index wants a storage layer built for many vectors per document.

## Getting Started

Build an index from vectors, then search it, including a filtered query:

```bash
pip install diskann
# or build the C++ core from source: cmake -B build && cmake --build build
```

```python
import numpy as np
from diskann import Index

dim, n = 768, 5_000_000
vectors = np.random.random((n, dim)).astype(np.float32)
labels = np.arange(n)

index = Index.build(
    data=vectors, labels=labels,
    graph_degree=32,        # M, the neighbour count; higher is better recall, more disk
    complexity=64,          # build-time search list size
    search_memory_maximum=8 * 1024**3,   # cache budget in bytes
    num_threads=16,
    output_folder='./diskann_index')

query = vectors[0:1]
print(index.ann_search(query, k=10, beam_width=64))
```

```python
# filter applied during traversal, not after retrieval
print(index.ann_search(query, k=10, beam_width=64,
                      filter_expr='tenant_id == 42 and year >= 2024'))
```

Store the index folder next to the source vectors and treat it as rebuildable: it is a derived artifact, not a backup.

## Key Use Cases

1. A billion-scale embedding collection on a single node, where an in-memory index would not fit and a distributed vector database is more operational surface than the problem needs.
2. Metadata-filtered retrieval, such as tenant-scoped or date-ranged search, where filtering during traversal preserves recall instead of over-fetching and discarding.
3. A freshness-sensitive index, where new vectors are absorbed by an in-memory tail and merged rather than requiring a full nightly rebuild.

## Strengths

- Disk-first graph layout with a cached hot set, so in-memory-like query latency holds on a corpus that does not fit in RAM.
- Filtered search applied during traversal, so a filtered query returns qualifying neighbours rather than retrieving then discarding.
- Incremental insertion through an in-memory tail with background compaction, so a daily-changing corpus is searchable without a full rebuild.
- A small in-process surface with no server to run, so it slots into an existing service where a vector database would add an operational dependency.

## Limitations

It is a search index, not a system of record: the source vectors still live in a database, and the index is rebuilt from them, so you now maintain two copies and a build step. Disk search is still disk search, so latency depends on the storage device and the beam width, and on network storage the numbers degrade badly, which means it is tuned for local NVMe rather than a shared volume. A fresh cluster still pays the first read from disk on the very first queries, so benchmark results after a cold start are pessimistic and after a warm cache are optimistic. The filter support is narrower than a general-purpose database's secondary indexes, so multi-field filtering with complex predicates is not the case it optimizes. And the core C++ and Rust components must be built, which makes a source install a prerequisite on platforms without wheels and adds a version-coupling risk on platforms that do.

## Relation to the Arsenal

This is a data-and-retrieval phase entry in the vector-databases subcategory, and it is the scale end of the same choice as the hnswlib entry in this catalog: hnswlib when it fits in memory, DiskANN when it does not. Its output is a candidate set for the RAG entries, and a late-interaction retriever such as ColBERT benefits from it because per-token vectors multiply the corpus size. The foundation-model phase supplies the embeddings, and the benchmarks-and-evals phase is where a recall change from switching index structures would be measured.

## Resources

- [DiskANN GitHub repository](https://github.com/microsoft/DiskANN)
- [DiskANN paper, NeurIPS 2019](https://arxiv.org/abs/1901.09731)
- [FreshDiskANN, a freshness-focused follow-up](https://arxiv.org/abs/2105.09613)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (1,937 stars, last commit 2026-09-28, license MIT, verified via GitHub API on 2026-09-28)*

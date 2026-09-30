---
id: spotify-annoy
name: "annoy"
version_tracked: null
artifact_type: library
category: rag
subcategory: vector-databases
description: "Read-only memory-mapped approximate nearest-neighbour index built on a forest of random-projection trees"
github_url: "https://github.com/spotify/annoy"
license: "Apache-2.0"
primary_language: C++
org_or_maintainer: "spotify"
tags: [embeddings, rag]
maturity: production
cost_model: open-source
github_stars: 14304
github_stars_last_30d: 0
trending_score: 24
last_commit: "2025-10-29"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [org-backed]
ecosystem_role:
  - "Memory-mapped approximate nearest-neighbour index whose read-only mmap file model makes static vector search cheap to ship and serve."
best_for:
  - "You need read-only vector search over a fixed corpus and want a single file that many processes can memory-map instead of a running database service."
  - "You want to prototype or ship a recommender or similarity search where the index is rebuilt occasionally and staleness is acceptable."
  - "You are fitting an index into a memory-constrained container and want a simple, dependency-light C++ library with Python and other language bindings."
avoid_if:
  - "You need frequent inserts, deletes, or updates, because an Annoy index is append-and-rebuild and is not built for mutation."
  - "You need metadata filtering, hybrid search, or a query language, since the library returns only neighbours and distances."
  - "Recall or latency at large scale is critical, since a server-grade engine with better algorithms and a maintained index will beat it on both."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (14304), Apache-2.0 license, last commit 2025-10-29, C++ as primary language and the topic list were API-verified; the repo has no homepage field. The random-projection tree construction, search path, and file layout are from reading the repository source; the recall comparison against hnswlib and ScaNN reflects published benchmarks, not runs performed here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/spotify/annoy", "date": "2026-09-28", "description": "14,304 stars and last commit 2025-10-29 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Annoy builds a forest of random-projection trees over the vector space. When you add an item with its vector, each tree recursively splits the index space by choosing a random hyperplane — two random points, their midpoint, a normal vector, and a sign test — and assigns the item to a leaf. With n_trees set, an item lives in that many leaves, and a search walks each tree, computes exact distances within the leaves it reaches, and merges the candidate sets to produce approximate k-nearest results. A tunable parameter trades accuracy for speed: at its default each tree considers a large node count during search, which slows lookups for higher recall, while lowering it searches less and loses neighbours. The build writes a header, the item vectors, the tree structure, and node offsets to disk, and once saved the file is memory-mapped read-only by any process, which is the design decision that makes the library distinctive. The Python package exposes AnnoyIndex with add_item, build, save, load, get_nns_by_item, get_nns_by_vector, and distance functions, and bindings exist for Go, Lua, Java, JavaScript, Elixir, and Rust.

## Why it's in the Arsenal

The recurring decision is whether a vector search needs a running service at all. Most similarity search does not: the corpus is read far more often than written, the index is built once, and every reader wants the same answer. Annoy takes that literally — build in memory, save, then mmap — so read cost is a page fault plus a handful of distance computations, with no daemon, no connection pool, no per-query network round trip, and no container. A single file also means the index ships with the model: version it, copy it, mount it, and every replica agrees. That is the specific operational simplicity this library buys, and it is why it keeps appearing inside recommender stacks that would otherwise need a hosted vector database.

## Architecture

The index is a forest of random-projection trees over a hypercube. Building: item vectors go into a per-tree list, then build walks the lists repeatedly and for each tree picks a node budget of random points, computes their centroid, draws a normal vector, and splits items by which side of the hyperplane they fall on, recursing until leaves are small. Because splits are random rather than data-aware, trees are independent samples and the ensemble averages out their errors, which is why accuracy scales with n_trees. Searching: a query vector walks the same random hyperplanes, collecting the leaf it lands in for each tree, then scans the vectors in those leaves computing Euclidean or angular distance while keeping a bounded max-heap of the k best. The saved file opens with a header giving item count, vector dimension, metric, and tree count, followed by the item vectors, then each tree's node-to-item assignments and hyperplane normals. load options control whether pages are touched eagerly, and every reader treats the file as immutable.

## Ecosystem Position

Annoy is an alternative to Faiss-style in-memory indexes and to hosted vector databases when the index is small enough to be a file and the query pattern is read-only. It overlaps most with hnswlib, which offers better recall and latency at scale through a hierarchical navigable small-world graph with a mutable add path, and with ScaNN, which trades more index space and build time for materially better accuracy. Compared to a real vector database such as Qdrant or Weaviate, it is not a database: no metadata filtering, no collections, no distributed serving — just a nearest-neighbour structure with a file format. It is a complement to a retrieval stack rather than a replacement for one, since the embedding step upstream is unaffected, and against plain numpy brute-force search it is the right call only once an exact scan stops meeting your latency budget.

## Getting Started

Build a small index, save it, and memory-map it back:

```bash
pip install annoy
```

```python
import random
from annoy import AnnoyIndex

f, n_items = 40, 20000
index = AnnoyIndex(f, "dot")
rng = random.Random(7)
for i in range(n_items):
    index.add_item(i, [rng.uniform(-1, 1) for _ in range(f)])

index.build(50)                 # 50 trees: higher recall, slower queries
index.save("vectors.ann")       # one immutable file

reloaded = AnnoyIndex(f, "dot")
reloaded.load("vectors.ann")    # memory-mapped, read-only
neighbours, distances = reloaded.get_nns_by_item(0, 10)
```

Tune the tree count and the search-time node budget against recall@k measured on your own queries rather than accepting defaults.

## Key Use Cases

1. A recommendation or similarity service where the catalogue changes daily at most, so a nightly rebuild and an mmap into every process is sufficient.
2. Shipping an index as a file next to a model in a container or edge bundle, so all replicas read identical data with no database dependency.
3. A quick offline nearest-neighbour baseline for clustering, deduplication, or evaluation before committing to a server-grade index.

## Strengths

- A single immutable file that any process memory-maps, giving near-zero-cost reads with no service to operate.
- Simple, dependency-free C++ core with bindings across several languages, easy to embed in an existing binary.
- Tunable recall and speed through tree count and the search node budget, so you can hit a latency target deliberately.
- A build-and-save lifecycle that fits a nightly rebuild pattern without distributed indexing infrastructure.

## Limitations

The index is append-and-rebuild — no deletes, no in-place updates, and re-adding an item with a different vector is not a supported operation, so anything that changes frequently is out of scope. Search quality degrades relative to graph-based indexes like hnswlib at high recall targets, and the tree forest is randomised, so the same data builds an index with slightly different behaviour each run. There is no metadata filtering, no hybrid lexical search, no persistence transactionality, and no multi-writer story: two processes writing the same path corrupt it. For tens of millions of vectors or a corpus that changes hourly, a real vector database is the honest choice, and the project is lightly maintained — the last commit is over a year old — so pin a version and expect few upstream fixes.

## Relation to the Arsenal

This is the minimal vector-search entry in content/projects/data-and-retrieval, and it is the bottom rung under a stack that starts with sentence-transformers for embeddings and climbs to chroma, qdrant, or weaviate when you need filtering and a service. The RAG frameworks in that folder — langchain, llamaindex, graphrag — all accept a plain nearest-neighbour callable, which is what makes a file-backed index a drop-in first step. For a server engine with better recall at scale, the alternatives named above are the comparison, and for structured analytics over the same data, duckdb and polars in content/projects/frameworks are a different tool entirely.

## Resources

- [Annoy GitHub repository](https://github.com/spotify/annoy)
- [Annoy README and API reference](https://github.com/spotify/annoy/blob/main/README.rst)
- [hnswlib, the mutable graph-index alternative](https://github.com/nmslib/hnswlib)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (14,304 stars, last commit 2025-10-29, license Apache-2.0, verified via GitHub API on 2026-09-28)*

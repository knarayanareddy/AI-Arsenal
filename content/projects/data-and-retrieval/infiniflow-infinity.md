---
id: infiniflow-infinity
name: "infinity"
version_tracked: null
artifact_type: platform
category: rag
subcategory: vector-databases
description: "C++ database that runs dense, sparse, tensor, and full-text search plus relational filtering in a single engine over one table"
github_url: "https://github.com/infiniflow/infinity"
license: "Apache-2.0"
primary_language: C++
org_or_maintainer: "infiniflow"
tags: [embeddings, retrieval, rag]
maturity: production
cost_model: open-source
github_stars: 4725
github_stars_last_30d: 0
trending_score: 29
last_commit: "2026-09-23"
docs_url: "https://infinityai.org"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "AI-native database unifying dense and sparse vector search with full-text and relational queries, so hybrid retrieval does not require federating two systems."
best_for:
  - "You are building hybrid retrieval and want vector plus BM25 ranking in one query rather than two clients and a merge step in application code."
  - "You need metadata filters combined with semantic search, since filtering is expressed in SQL against the same rows being searched."
  - "You want to swap from a client-server vector store to a single embedded process for a moderate corpus and keep a SQL surface."
avoid_if:
  - "Your corpus is small enough to search exhaustively, where a brute-force scan is simpler and has no approximation error."
  - "You need a managed service with uptime guarantees and horizontal scaling, because this is a database you run and operate yourself."
  - "You want the maturity of a long-established vector store's ecosystem, since this project is younger and its tooling is thinner."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (4725), Apache-2.0 license, last commit 2026-09-23, primary language C++, and all 20 topics were read from the GitHub API. The C++20 modules design, per-column-type index structures, single-table hybrid DSL, and embedded mode come from the official README and docs; no server was started and no query was run here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/infiniflow/infinity", "date": "2026-09-28", "description": "4,725 stars and last commit 2026-09-23 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Infinity is a database written in modern C++ with modules, designed around retrieval workloads for LLM applications. A table holds dense vector columns, sparse vector columns built from BM25-style term statistics, multi-vector or tensor columns, and full-text columns, plus ordinary scalar columns for filtering. Because everything lives in one schema, a single SQL statement can express a full hybrid search: a vector distance predicate, a sparse score predicate, a full-text predicate, and scalar equality or range conditions, with the engine planning how to combine them. It exposes HTTP and Python interfaces, integrates with common embedding models and rerankers through a Python layer, and supports both an embedded mode and a server deployment. The stated goal is to make the retrieval portion of a RAG system a database problem rather than a client-side orchestration problem.

## Why it's in the Arsenal

The decision it resolves is where the merge in hybrid search happens. The standard implementation retrieves top-k by vector, retrieves top-k by BM25 in a separate engine, then fuse the two lists in Python with a reciprocal-rank or weighted-score function, and every additional source multiplies the number of round trips and the failure modes. Putting dense, sparse, and text indexes on the same row with the same filter semantics lets the engine do the scoring in one pass, which cuts latency and removes a class of consistency bug where the two indexes disagree about what exists. It also makes metadata filters a first-class part of the query, so pre-filtering happens inside the engine instead of as an over-fetch and filter in the application.

## Architecture

The engine is a C++20 codebase built with modules, with storage and index layers per column type. Dense columns build HNSW graphs for approximate nearest-neighbour search; sparse columns maintain the inverted-index and term-frequency structures that BM25 scoring needs; full-text columns carry a keyword index with its own ranking; tensor columns hold multiple vectors per row for multi-vector retrieval, which is how late-interaction style scoring is expressed. A table can hold all of them at once, and the SQL planner combines the resulting candidate sets and scores under a weighting expression. The Python client embeds a server or talks to a remote one, registers embedding functions and rerankers by name, and streams results, so the same column definition both stores the vectors and generates them at insert time.

## Ecosystem Position

Infinity competes directly with Qdrant, Milvus, and Weaviate on vector search, and its genuine differentiator is the sparse, full-text, and relational columns in the same table, which is a gap the pure vector databases are still filling. Against Elasticsearch and OpenSearch it is a rather than an alternative, since those are full search engines with a mature inverted index and a decade of operational tooling, while Infinity is built for embedding-native tables and a much smaller operational profile. It is an alternative to the federate-then-fuse pattern in LangChain and LlamaIndex retrieval pipelines, and it overlaps with pgvector plus a separate Postgres full-text index, which is the combination it aims to collapse into one engine. It complements the model entries in the foundation-model phase, since the embedding model and the reranker are registered in the client rather than implemented here.

## Getting Started

Run the server locally and create a hybrid table:

```bash
pip install infinity-embedded     # or infinity-sdk for the remote client
infinity_server --port 23817 --info "127.0.0.1:23817"
```

```python
from infinity_sdk import infinity

db = infinity.connect("http://127.0.0.1:23817")
db.create_database("rag")
db.create_table(
    "rag", "chunks",
    columns=["id int64", "content varchar", "doc_id int64",
             "dense embedding float32 dim 768", "sparse embedding sparse vec"])

res = db.query("rag", "chunks", dsl=(
    "SELECT id, content FROM chunks "
    "WHERE doc_id = 42 AND dense embedding MATCH "
    "TOKENS('night refund policy') USING INNER_PRODUCT "
    "WITH 0.8 AS dense_weight, sparse embedding MATCH "
    "TOKENS('refund policy') USING BM25 WITH 0.2 AS sparse_weight "
    "ORDER BY dense_weight + sparse_weight DESC LIMIT 10"))
```

The embedded build runs the engine in-process, so a small application needs no separate server at all.

## Key Use Cases

1. Hybrid RAG retrieval where dense and BM25 scores are fused in the engine rather than in application code across two systems.
2. Multi-tenant or document-scoped search where a metadata filter must be applied inside the retrieval query, not as a post-filter.
3. Replacing a vector store plus a separate keyword index with one embedded engine when the corpus fits a single node and operational simplicity matters more than horizontal scale.

## Strengths

- Dense, sparse, BM25, and multi-vector columns in one table, so hybrid scoring happens in a single query plan.
- Metadata filters are SQL predicates against the searched rows, which avoids the over-fetch and filter pattern that wastes recall.
- An embedded mode with a Python client that registers embedding and reranking functions, removing a server dependency for moderate corpora.
- Modern C++20 with modules, which is why query latency in published comparisons is competitive with the established vector databases.

## Limitations

It is a database you operate: durability, backups, replication, and multi-writer concurrency are your problem, and a single node caps the corpus size and query throughput. Hybrid weighting syntax and column-level configuration add a real learning surface, and the SQL planning behavior across column types is young enough that query plans are worth inspecting. The embedding ecosystem is narrower than Qdrant's, and you commit to its client conventions, which is its own lock-in even under an open license. Published benchmarks are author-run, and multi-vector columns in particular are the least battle-tested path, so an unusual configuration may hit rough edges.

## Relation to the Arsenal

This is a data-and-retrieval phase entry in the vector-databases subcategory, read as the hybrid-retrieval option against Qdrant, Milvus, Weaviate, and pgvector in the same phase. The late-interaction entries ColBERT and ColPali both produce multi-vector scores that this engine's tensor columns are designed to hold, so the pairing is natural. Its output feeds the generation models in the foundation-model phase, and the RAG framework entries consume it through their vector store interface.

## Resources

- [Infinity GitHub repository](https://github.com/infiniflow/infinity)
- [Infinity documentation](https://infinityai.dev/docs)
- [Infinity hybrid search guide](https://infinityai.dev/docs/hybridsearch)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (4,725 stars, last commit 2026-09-23, license Apache-2.0, verified via GitHub API on 2026-09-28)*

---
id: qdrant
name: Qdrant
version_tracked: null
artifact_type: platform
category: rag
subcategory: vector-databases
description: Rust vector database for high-performance similarity search with filtering and hybrid search
github_url: "https://github.com/qdrant/qdrant"
license: Apache-2.0
primary_language: Rust
org_or_maintainer: null
tags: [rag, embeddings, retrieval, self-hosted]
maturity: production
cost_model: open-source
github_stars: 35239
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-10-23"
docs_url: "https://qdrant.tech/documentation/"
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
domain: [language, multimodal]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, community-driven, actively-maintained]
ecosystem_role:
  - Open-source vector database written in Rust, positioned as a performance-focused, self-hostable alternative with a strong managed-cloud option
best_for:
  - You want a self-hostable, open-source vector database with strong performance (Rust implementation) and both a free self-hosted path and a managed cloud option
  - You need rich payload filtering combined with vector search (Qdrant's filtering is a frequently cited strength) for use cases beyond pure nearest-neighbor lookup
avoid_if:
  - You need the absolute simplest embedded/zero-infrastructure setup for prototyping — Chroma or LanceDB have a lower barrier to entry for that specific use case
  - You're already committed to a different database for other reasons and want to minimize the number of systems you operate — pgvector might let you avoid adding a new dedicated system entirely
upstream_dependencies: []
downstream_consumers: []
alternatives: [milvus, weaviate, chroma, lancedb, pgvector]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Re-verified 2026-10-25: GitHub API 35239 stars, 799 open issues, last push 2026-10-23. Architecture and quantization sections rewritten from the current docs (TurboQuant from v1.18, 8-bit encoding from v1.20, rescoring defaults, Query API fusion) rather than the generator frames."
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Qdrant is an Apache-2.0 vector database written in Rust, distributed as a single binary and offered as a managed cloud. Its differentiating claim is not raw speed on unfiltered nearest-neighbour search — several engines are competitive there — but how it handles the query shape production actually produces: a vector similarity constraint combined with payload conditions that may be highly selective, over a collection that has to be sharded, replicated and kept in memory at a size that fits the budget.

The second half of the story is what you do when it does not fit: quantization, which Qdrant supports at four levels of aggressiveness and documents as a spectrum with per-level recall guidance rather than a single flag.

## Why it's in the Arsenal

Qdrant is the entry that treats filtering as a first-class part of the search problem rather than a post-processing step. Most vector stores retrieve the nearest neighbours and then discard the ones that fail a payload condition, which degrades badly when the filter is selective: you pay for a large candidate set to end up with a handful of results. Qdrant plans the filter into the HNSW traversal, so a query that also requires `tenant_id = X AND created_at > Y` stays efficient as the filter gets tighter.

It is also the most deployment-flexible of the self-hosted options in this phase: the same Apache-2.0 binary runs single-node on a laptop, in a sharded and replicated cluster with Raft, and as Qdrant Cloud, so the choice is a configuration rather than a rewrite.

## Architecture

Storage is segmented: a collection is split into shards, each shard holds segments, and each segment has its own HNSW index plus payload indexes and the original vectors on disk or in memory. The query planner inspects the filter before choosing a strategy — for a highly selective filter it may scan the filtered subset exactly instead of traversing the graph, which is why filtered search on a narrow tenant does not collapse.

Vectors can be quantized to cut memory: 8-bit scalar, 1-2 bit binary, product quantization, and since v1.18 TurboQuant (4x at 8 bits up to 32x at 1 bit) with asymmetric scoring that keeps queries in full precision. Low bit depths rescore against the original vectors by default, which recovers recall at the cost of reading them back — on a disk-backed collection that read is the bottleneck. Hybrid retrieval uses the Query API: a prefetch step retrieves candidates for each vector space (dense and sparse), and a fusion stage combines them, so RRF or DBSF ranks a blended result without a separate search service.

## Ecosystem Position

Against Milvus and Weaviate, the three compete on the same workload — distributed, filtered, hybrid vector search — and the practical split is operational weight versus ecosystem breadth: Qdrant ships as a single binary and manages its own cluster state with Raft, where Milvus brings a dependency stack of etcd, object storage and a message queue. Chroma, LanceDB and pgvector overlap at the small end; if the corpus fits on one node and you already run Postgres, pgvector keeps the vector index inside the database you already operate, and Qdrant's advantage only shows up once filtering and recall tuning become the problem.

Against hosted-only offerings the boundary is data residency: Qdrant can run in your VPC under Apache-2.0 without a commercial relationship, which is the reason many teams in regulated environments stop the comparison here.

## Getting Started

```bash
docker run -p 6333:6333 -p 6334:6334 \
  -v "$(pwd)/qdrant_storage:/qdrant/storage" qdrant/qdrant
# REST on :6333, gRPC on :6334, web UI at http://localhost:6333/dashboard
```

```python
from qdrant_client import QdrantClient, models

client = QdrantClient(url="http://localhost:6333")
client.create_collection(
    "docs",
    vectors_config=models.VectorParams(size=1024, distance=models.Distance.COSINE),
)
client.create_payload_index("docs", "tenant_id", field_schema=models.PayloadSchemaType.KEYWORD)
```

Create the payload index before loading data if you intend to filter on it, and size the collection against the quantization level you plan to run — retrofitting compression onto a collection sized for float32 is a re-index, not a config change.

## Key Use Cases

1. **Multi-tenant retrieval with a hard filter**: per-customer collections are wasteful and a shared collection with a `tenant_id` payload index is the design Qdrant optimises for, including the case where one tenant is far larger than the rest.
2. **Hybrid dense plus sparse search**: a dense embedding for semantics with BM25-style sparse vectors for exact terms, fused in one Query API call, avoids running a separate lexical engine next to the vector database.
3. **Memory-constrained deployments**: quantization is the lever — 8-bit scalar at 4x with negligible loss, binary for high-dimensional centred embeddings at up to 32x, and TurboQuant when you want the middle of that range with better recall than binary.
4. **Scaling past one node**: sharding and replication with snapshot-based recovery, which is what makes it viable as the retrieval tier of a production RAG service rather than a prototype store.
5. **An embedded-ish local index for development**: the same binary via Docker or a local build, so what you test against mirrors what runs in the cluster.

## Strengths

- Filtered search that stays fast as the filter tightens, because the planner can switch from graph traversal to an exact scan of the filtered subset; this is the difference between a demo and a multi-tenant product.
- Quantization is a documented spectrum rather than a switch, with published guidance per compression level and defaults that rescore low-bit vectors — which means you can reason about the memory/recall trade instead of guessing.
- Single binary, Apache-2.0, no etcd or message queue to operate; distributed mode adds Raft-managed sharding and replication rather than an external coordination layer.
- The Query API covers hybrid retrieval and fusion in one request, so dense-plus-sparse does not require a second system and a merge step in application code.
- Snapshots, shard transfers and a documented upgrade path make the operational story complete enough to run without a managed service.

## Limitations

- **Recall is a tuning exercise, not a setting.** HNSW parameters, quantization bit depth and rescoring interact, and the defaults are chosen for general embeddings. A collection that looks fine on a benchmark of 100k vectors can lose recall on 100M with a different embedding model, so an offline recall measurement against exact search belongs in your release process.
- **Quantization trades accuracy for memory, and the vendor's table is a starting point.** The 4-bit TurboQuant default is described as roughly equivalent to scalar quantization at twice the compression, with results varying by dataset and model; only your data says which is right.
- **Memory is still the cost driver.** 799 open issues, an aggressive release cadence and a feature surface that grows quickly (TurboQuant arrived in v1.18 and its 8-bit encoding in v1.20) mean version choices matter and quantization features are worth pinning rather than adopting implicitly.
- **The cluster is yours to operate.** Raft-based distribution removes an external dependency but not the operational work: snapshots, disk planning, shard balancing and upgrade ordering are on you, and a managed alternative exists precisely because that work is real.
- **Not a database in the relational sense.** Payload filtering is not SQL, joins and aggregations are limited, and teams that expect analytical queries over metadata eventually add a second store and a reconciliation job.

## Relation to the Arsenal

Read it beside `milvus` and `weaviate` (the other distributed, filtered search engines), `chroma` and `lancedb` (embedded and file-based, for corpora that fit on one machine), `pgvector` (keep vectors in the Postgres you already run) and `turbovec` in the tools phase (an in-process TurboQuant index without a server). The dividing questions are corpus size, how selective your filters are, and whether you want to operate a distributed system at all.

## Resources

- [GitHub](https://github.com/qdrant/qdrant)
- [Documentation](https://qdrant.tech/documentation/)
- [Quantization guide](https://qdrant.tech/documentation/manage-data/quantization/)
- [Hybrid queries and fusion](https://qdrant.tech/documentation/concepts/hybrid-queries/)


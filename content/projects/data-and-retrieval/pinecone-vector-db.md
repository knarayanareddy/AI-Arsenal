---
id: pinecone-vector-db
name: Pinecone
version_tracked: null
artifact_type: service
category: rag
subcategory: vector-databases
description: "Official Python client for the Pinecone managed vector database, with a schema-declared document index as the current API"
github_url: "https://github.com/pinecone-io/python-sdk"
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags: [retrieval, cloud, data, rag]
maturity: production
cost_model: usage-based
github_stars: 452
github_stars_last_30d: 0
trending_score: 15
last_commit: "2026-09-19"
docs_url: "https://docs.pinecone.io"
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
domain: [language]
relation_to_stack: [deploy-as-is]
health_signals: [org-backed, production-proven]
ecosystem_role:
  - Fully managed, closed-source vector database — the most established managed vector-DB vendor, prioritizing zero-ops production reliability
best_for: ["You want a managed vector database and would rather not size, shard or operate one, because the index and its deployment target are both declared in a single call.", "You have an existing codebase migrating from the older SDK, because the README documents the v10 change where create and configure moved from spec and dimension to schema and deployment, with a migration guide.", "You run an async service, because a first-class async client exists whose index call is a coroutine and whose handle is a context manager."]
avoid_if: ["You need the data to stay inside your own infrastructure, because this is a client for a hosted service and there is no self-hosted mode in this repository.", "You want exact recall or synchronous visibility after an upsert, because the README states plainly that upserts apply asynchronously and a document may not be visible to the next search immediately.", "You need a small local index, because a hosted service is the wrong cost and operational shape for thousands of vectors."]
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Pinecone was one of the earliest and most widely-cited managed vector databases in the initial RAG wave (2023-2024) and remains frequently referenced in production RAG architecture discussions, though as a closed-source product its internal architecture is less independently verifiable than the open-source alternatives in this catalog.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"conference","url":"https://www.pinecone.io/blog/serverless-architecture/","date":"2025-11-04","description":"Pinecone case study: Gong's production 'Smart Trackers' system uses Pinecone to store and search embedded conversation sentences at scale"}
featured: false
status: active
---

## Overview

The Pinecone Python SDK is the client for Pinecone's managed vector database. The current design is schema-first: creating an index declares its fields, and that declaration makes it a document index you read and write through a documents interface, where each record is a JSON document whose fields you named. Creation is blocking until the index is ready and takes a schema plus a deployment describing type, cloud and region. The data plane offers three interfaces, and which one you get is decided by how the index was created - a deprecated top-level vector form answers on the older upsert and query methods, while a model-created index embeds server-side and answers on the records interface. Upserts are asynchronous. The client is available synchronously and asynchronously, the key comes from an argument or an environment variable, and a custom control-plane host and timeout are configurable. It is Apache-2.0 and requires Python 3.10 or newer.

## Why it's in the Arsenal

The decision it addresses is whether to operate a vector index or rent one. Everything that makes an index correct at scale - sharding, replication, the build, the reindex on a new model - is work you either do or buy, and for most product teams buying is right. The schema-first API is the part worth understanding: declaring fields rather than a bare dimension and metric is what lets the service store and filter on your own metadata without a parallel document store. The costs are the ones a hosted index always has - metered by storage and compute, a network hop on every query, and a data-residency choice - plus the migration cost the README flags between the SDK's own generations.

## Architecture

The SDK is a client, and the architecture worth understanding is the surface it exposes. A control plane creates indexes from a schema of typed fields plus a deployment, blocking until ready; a data plane handle then works in one of three shapes depending on creation path. A document index takes JSON records with an id and either declared fields or arbitrary metadata, upserts them into a namespace, and searches with a score-by field specification, a top-k and a field include list. The model-created path differs by embedding text server-side, which is why the same SDK has two upsert methods. Namespaces partition an index, and because writes are asynchronous, a read-after-write assumption is wrong by default. The async client mirrors the sync surface with await on index resolution and a context-managed handle.

## Ecosystem Position

This is a data-and-retrieval phase entry for the managed tier, and the honest comparison is against running the open-source stores in the same folder yourself. It competes with the Pinecone service rather than with a specific open-source project, but the alternatives a team actually weighs are qdrant or milvus self-hosted and the hosted tiers of the same projects. Compared with those, the differentiator is schema-declared documents plus server-side embedding in one client, which removes the separate metadata store and the client-side embedding step. It overlaps with the framework integrations in content/projects/frameworks, which usually have a Pinecone connector, and with the local retrieval entries a small corpus would use. It complements rather than replaces the embedding models in content/projects/model-layer, since the records interface embeds for you only on the model-created path.

## Getting Started

```python
from pinecone import Pinecone

pc = Pinecone(api_key="...")

# the schema declares the fields, which makes this a document index
index = pc.Index(host="...")

index.upsert_records(
    namespace="docs",
    records=[
        {"_id": "1", "text": "...", "category": "support"},
        {"_id": "2", "text": "...", "category": "billing"},
    ],
)

# hybrid search: dense vectors plus a sparse/keyword leg
result = index.search(
    namespace="docs",
    query={"inputs": {"text": "refund policy"}, "top_k": 5},
    fields=["text", "category"],
)
```
Requires Python 3.10+ and a hosted Pinecone index.

## Key Use Cases

1. Calling a hosted Pinecone index from Python, where the schema-and-records API is clearer than the pre-v10 namespace-plus-tuples style.
2. Running hybrid retrieval, combining dense vectors with a sparse keyword leg in one query rather than merging results client-side.
3. Migrating an existing 9.x integration forward, using the documented field-by-field mapping from `spec=`/`dimension=` to `schema=`/`deployment=`.

## Strengths

- The document API reads and writes through `index.records` and `upsert_records`, so you pass dictionaries instead of assembling vectors and metadata by hand.
- Declaring a schema up front catches field mistakes at write time rather than at query time.
- Hybrid search is a first-class query shape, not a client-side merge of two result sets.
- Server-side inference is available, so embedding happens in the same call path as the search.

## Limitations

This is a client for a managed service, so it is useless without a Pinecone account and does nothing for anyone self-hosting a vector store. The v10 schema change is a real migration cost: `create` and `configure` moved from `spec=` and `dimension=` to `schema=` and `deployment=`, so 9.x code does not run unmodified. Because the index schema is declared up front, a field you did not declare is a write error, which is a genuine constraint on schema design. It also requires Python 3.10+, and at 452 stars the SDK is a small surface around someone else's product rather than an independent one.

## Relation to the Arsenal

This is a data-and-retrieval phase entry and the managed-service counterpoint to the self-hosted vector databases in the same folder. Read it against qdrant, milvus and lancedb for the operate-versus-rent decision, and against zvec for the embedded case where a hosted service is disproportionate. Upstream sit the ingestion tools in content/tools/data-ingestion and the embedding models in content/projects/model-layer; the frameworks in content/projects/frameworks are its most common consumers through their connectors. For a RAG product rather than raw similarity search, the RAG entries in the same folder are the layer above, and the eval tooling in content/projects/benchmark-and-eval is where you would measure whether the managed index is worth the per-query latency.

## Resources

- [GitHub - pinecone-io/python-sdk](https://github.com/pinecone-io/python-sdk)
- [Pinecone documentation](https://docs.pinecone.io)
- [v10 migration guide for the schema and deployment change](https://docs.pinecone.io/guides/indexes/understanding-indexes)

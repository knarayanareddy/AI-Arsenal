---
id: zvec
name: zvec
version_tracked: null
artifact_type: library
category: rag
subcategory: vector-databases
description: Lightweight, in-process vector database from Alibaba for local RAG and agent memory
github_url: https://github.com/alibaba/zvec
license: Apache-2.0
primary_language: C++
org_or_maintainer: alibaba
tags:
  - rag
  - retrieval
  - embeddings
  - local
maturity: beta
cost_model: open-source
github_stars: 15173
github_stars_last_30d: 1282
trending_score: 80
last_commit: '2026-07-20'
docs_url: https://zvec.org
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain:
  - general-purpose
relation_to_stack:
  - build-on-top
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - In-process ("SQLite for vectors") vector database — embeds directly in your application with no server to run, filling the gap between FAISS-style raw indexes and full server-based vector databases like Qdrant
best_for:
  - You want vector search inside a local-first or embedded application (desktop app, CLI agent, edge deployment) with zero infrastructure — zvec runs in-process like SQLite, not as a server
  - You need agent memory or small-to-medium RAG (up to millions of vectors) where operating a vector-database server is disproportionate overhead
avoid_if:
  - You need multi-tenant, horizontally scaled retrieval serving many concurrent applications — a server-based vector database (see the Qdrant entry) is the right shape
  - Your team is Python-only and already happy with pgvector inside an existing Postgres — adding a second storage engine needs a concrete reason
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - qdrant
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (13.9k), Apache-2.0 license, and active development (last push 2026-07-07) verified via the GitHub API on 2026-07-07; on GitHub monthly trending. HNSW-based indexing and in-process architecture from the project's own documentation; performance claims not independently benchmarked here.
added_date: '2026-07-07'
last_reviewed: '2026-07-07'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/trending?since=monthly
    date: '2026-07-07'
    description: On GitHub monthly trending; 13.9k stars
featured: false
status: active
---

## Overview

An open-source, in-process vector database from Alibaba: instead of running a separate server, you embed zvec directly in your application (the SQLite model), getting HNSW-indexed similarity search with filtering for local RAG, semantic search, and agent memory workloads.

## Why it's in the Arsenal

In-process vector database that fills a real architectural gap: FAISS gives you a raw index with no database ergonomics, while Qdrant/Weaviate give you a server you must operate. zvec earns a place in the Arsenal because local-first agents and embedded RAG (a growing deployment shape — see the [local-first reference stack](../../architectures/reference-stacks/local-first.md)) need exactly this middle option: durable, queryable vector storage with zero infrastructure. See Strengths / Limitations below before adopting it.

## Architecture

zvec is a C++ core with language bindings, linked into your application process. Vectors are stored durably on local disk and indexed with HNSW for approximate nearest-neighbor search; queries combine similarity search with scalar filtering. Because everything runs in-process, there is no network hop, connection pooling, or server lifecycle — the same trade SQLite makes against client-server databases.

## Ecosystem Position

Upstream: your embedding pipeline (any embedding model; see the [embeddings concept](../../skills/core-concepts/embeddings.md)). Downstream: local RAG applications and agent memory layers. Competing: FAISS (raw index, no persistence ergonomics), [Qdrant](./qdrant.md) and other server-based vector databases (operational overhead, but multi-tenant scale), pgvector (vectors inside an existing Postgres). Complementary: pairs naturally with local inference runtimes like [Ollama](../inference-engines/ollama.md) for fully local RAG.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical installation command for your language binding.
```

## Key Use Cases

1. **Scenario**: you're building a local-first agent or desktop application that needs durable semantic memory without asking users to run a database server
2. **Scenario**: you need small-to-medium RAG (thousands to millions of vectors) inside a single service, where an in-process index removes a network dependency and an operational burden

## Strengths

- Zero-infrastructure deployment: in-process like SQLite, so there is no server to provision, secure, or monitor
- Org-backed (Alibaba), Apache-2.0, and very actively developed (13.9k stars, pushed 2026-07-07)

## Limitations

- Single-process architecture: not the right shape for multi-tenant, horizontally scaled retrieval — server-based vector databases exist for that
- Young project relative to established options; evaluate durability and recall on your own data before trusting it with production memory

## Relation to the Arsenal

This is a data-and-retrieval project entry: it documents an embeddable retrieval engine. For server-based alternatives and job-based comparisons, see [tools/by-job/vector-search](../../tools/by-job/vector-search.md). For retrieval-quality practices, see the [rag-and-retrieval tips](../../tips-and-tricks/rag-and-retrieval/_index.md).

## Resources

- [GitHub](https://github.com/alibaba/zvec)
- [Documentation](https://zvec.org)

---
id: qdrant
name: Qdrant
type: platform
category: rag
subcategory: vector-databases
description: >-
  Rust vector database for high-performance similarity search with filtering and
  hybrid search
github_url: 'https://github.com/qdrant/qdrant'
license: Apache-2.0
primary_language: Rust
tags:
  - rag
  - embeddings
  - retrieval
  - self-hosted
maturity: production
cost_model: open-source
github_stars: 32155
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-13'
docs_url: 'https://qdrant.tech/documentation/'
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
alternatives: []
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

> **TL;DR:** Qdrant is a Rust vector database with strong filtering, performance, and self-hosting support. Use it when vector search is a production workload and you want operational control.

## Overview

Qdrant is a purpose-built vector database available as open source and managed cloud. It is a common RAG choice when metadata filtering and production operations matter.

## Why It's in the Arsenal

Qdrant is one of the most frequently compared vector databases for production RAG because it balances performance, features, and self-hostability.

## Key Features

- Vector and payload filtering
- Hybrid search support
- Self-hosted and cloud options
- Rust implementation
- Collections and payload indexes

## Architecture / How It Works

Qdrant stores vectors with payload metadata and exposes search/filter APIs through HTTP/gRPC clients.

## Vector Database Comparison

| Feature | This DB |
|---|---|
| Self-hostable | Yes |
| Cloud managed | Yes |
| Hybrid search | Yes |
| Disk-based index | Yes |
| Multi-tenancy | Yes, via collections/payload design |
| Free tier | Yes, OSS and cloud free tier options |
| Open source | Yes, Apache-2.0 |
| Best for | Production RAG with filtering and self-hosting |

## Getting Started

```bash
pip install qdrant-client
```

```python
from qdrant_client import QdrantClient

client = QdrantClient(":memory:")
print(client.get_collections())
```

## Use Cases

1. **Scenario**: Production RAG with metadata filters
2. **Scenario**: Self-hosted vector search
3. **Scenario**: Teams wanting Rust-based vector infrastructure

## Strengths

- Strong filtering story
- Good self-host/cloud balance
- Production-oriented APIs

## Limitations / When NOT to Use

- Requires operating a database if self-hosted
- Not as minimal as embedded stores
- Schema/index choices still require testing

## Integration Patterns

- Pair with LlamaIndex, LangChain, Haystack, or custom retrieval code.
- Store document IDs and metadata alongside vectors so answers can cite sources.
- Benchmark recall, latency, filtering, and ingestion under production-shaped data.

## Resources

- [GitHub](https://github.com/qdrant/qdrant)
- [Docs](https://qdrant.tech/documentation/)

## Buzz & Reception

- Included because vector database choice is one of the most common RAG architecture decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*


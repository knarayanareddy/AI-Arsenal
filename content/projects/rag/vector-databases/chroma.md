---
id: chroma
name: Chroma
type: platform
category: rag
subcategory: vector-databases
description: >-
  Developer-friendly embeddings database for local AI apps, prototypes, and
  lightweight RAG
github_url: 'https://github.com/chroma-core/chroma'
license: Apache-2.0
primary_language: Rust
tags:
  - rag
  - embeddings
  - retrieval
  - local
maturity: production
cost_model: open-source
github_stars: 28419
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-13'
docs_url: 'https://docs.trychroma.com/'
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

> **TL;DR:** Chroma is a developer-friendly embeddings database for local prototypes and lightweight RAG apps. Use it when simplicity beats distributed database features.

## Overview

Chroma is often used for quick RAG prototypes because setup is small and local development is straightforward.

## Why It's in the Arsenal

Many builders encounter vector search first through Chroma, so it is important as the simple local baseline.

## Key Features

- Local-first developer experience
- Simple Python/JS clients
- Collections and metadata support
- Good tutorial ecosystem
- Apache-2.0 open source

## Architecture / How It Works

Chroma stores embeddings and metadata in collections and exposes simple APIs for add/query/delete operations.

## Vector Database Comparison

| Feature | This DB |
|---|---|
| Self-hostable | Yes |
| Cloud managed | Yes |
| Hybrid search | Limited / evolving |
| Disk-based index | Yes |
| Multi-tenancy | Basic collection-level separation |
| Free tier | Yes |
| Open source | Yes, Apache-2.0 |
| Best for | Prototypes and local RAG |

## Getting Started

```bash
pip install chromadb
```

```python
import chromadb

client = chromadb.Client()
collection = client.create_collection("docs")
collection.add(ids=["1"], documents=["hello world"])
```

## Use Cases

1. **Scenario**: Local RAG prototypes
2. **Scenario**: Notebooks and demos
3. **Scenario**: Small applications prioritizing simplicity

## Strengths

- Very easy to start
- Great prototype ergonomics
- Works well with common RAG tutorials

## Limitations / When NOT to Use

- Not always the right choice for large production scale
- Advanced filtering/hybrid needs may push you elsewhere
- Operational model differs from managed vector DBs

## Integration Patterns

- Pair with LlamaIndex, LangChain, Haystack, or custom retrieval code.
- Store document IDs and metadata alongside vectors so answers can cite sources.
- Benchmark recall, latency, filtering, and ingestion under production-shaped data.

## Resources

- [GitHub](https://github.com/chroma-core/chroma)
- [Docs](https://docs.trychroma.com/)

## Buzz & Reception

- Included because vector database choice is one of the most common RAG architecture decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*


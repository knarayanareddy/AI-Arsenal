---
id: milvus
name: Milvus
type: platform
category: rag
subcategory: vector-databases
description: >-
  Cloud-native vector database for large-scale ANN search and production vector
  workloads
github_url: 'https://github.com/milvus-io/milvus'
license: Apache-2.0
primary_language: Go
tags:
  - rag
  - embeddings
  - retrieval
  - kubernetes
maturity: production
cost_model: open-source
github_stars: 44762
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-13'
docs_url: 'https://github.com/milvus-io/milvus'
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

> **TL;DR:** Milvus is a cloud-native vector database built for scalable ANN search. Use it when large-scale vector search and distributed operations are central.

## Overview

Milvus is one of the longest-running purpose-built vector databases and is often considered for high-scale vector search infrastructure.

## Why It's in the Arsenal

Milvus is a key option when vector volume, distributed operations, and cloud-native deployment matter more than prototype simplicity.

## Key Features

- Distributed vector database architecture
- High-scale ANN search
- Cloud-native deployment options
- Apache-2.0 open source
- Ecosystem around Zilliz Cloud

## Architecture / How It Works

Milvus separates vector storage, indexing, query, and coordination components for scalable ANN search.

## Vector Database Comparison

| Feature | This DB |
|---|---|
| Self-hostable | Yes |
| Cloud managed | Yes, via Zilliz Cloud |
| Hybrid search | Yes / supported patterns |
| Disk-based index | Yes |
| Multi-tenancy | Yes, via databases/collections/partitions patterns |
| Free tier | Yes, OSS and cloud trials/options |
| Open source | Yes, Apache-2.0 |
| Best for | Large-scale vector search |

## Getting Started

```bash
pip install pymilvus
```

```python
from pymilvus import MilvusClient

client = MilvusClient("./milvus_demo.db")
print(client.list_collections())
```

## Use Cases

1. **Scenario**: Large vector collections
2. **Scenario**: Teams with platform/infra maturity
3. **Scenario**: Cloud-native vector infrastructure

## Strengths

- Designed for scale
- Mature vector database project
- Good managed path through Zilliz

## Limitations / When NOT to Use

- Heavier operations than Chroma/pgvector
- Overkill for small apps
- Requires careful index/cluster planning

## Integration Patterns

- Pair with LlamaIndex, LangChain, Haystack, or custom retrieval code.
- Store document IDs and metadata alongside vectors so answers can cite sources.
- Benchmark recall, latency, filtering, and ingestion under production-shaped data.

## Resources

- [GitHub](https://github.com/milvus-io/milvus)
- [Docs](https://github.com/milvus-io/milvus)

## Buzz & Reception

- Included because vector database choice is one of the most common RAG architecture decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*


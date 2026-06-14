---
id: pgvector
name: pgvector
type: library
category: rag
subcategory: vector-databases
description: >-
  PostgreSQL extension for vector similarity search inside an existing
  relational database
github_url: 'https://github.com/pgvector/pgvector'
license: PostgreSQL
primary_language: C++
tags:
  - rag
  - embeddings
  - retrieval
  - self-hosted
maturity: production
cost_model: open-source
github_stars: 21738
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-11'
docs_url: 'https://github.com/pgvector/pgvector'
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

> **TL;DR:** pgvector adds vector similarity search to PostgreSQL. Use it when your app already runs on Postgres and vector search is not yet a separate platform problem.

## Overview

pgvector is often the simplest production choice because it keeps vectors, metadata, permissions, and application data in Postgres.

## Why It's in the Arsenal

Many teams should start with pgvector before adding a separate vector database because operational simplicity is a feature.

## Key Features

- Postgres extension
- Vector indexes and similarity search
- Keeps metadata and relational data together
- Works with existing backups/ops/security
- Open-source extension

## Architecture / How It Works

pgvector stores embedding vectors in Postgres columns and provides distance operators and indexes for similarity search.

## Vector Database Comparison

| Feature | This DB |
|---|---|
| Self-hostable | Yes |
| Cloud managed | Yes, through Postgres providers that support it |
| Hybrid search | Use SQL/full-text plus vector patterns |
| Disk-based index | Yes, Postgres storage/indexes |
| Multi-tenancy | Yes, using normal Postgres schema/RLS patterns |
| Free tier | Yes |
| Open source | Yes |
| Best for | Apps already using Postgres |

## Getting Started

```bash
CREATE EXTENSION vector;
```

```python
-- SQL
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE docs (id bigserial PRIMARY KEY, embedding vector(3));
```

## Use Cases

1. **Scenario**: Existing Postgres applications
2. **Scenario**: Small-to-medium RAG systems
3. **Scenario**: Teams wanting fewer databases

## Strengths

- Operational simplicity
- Relational metadata and vectors together
- Great first production default for many apps

## Limitations / When NOT to Use

- Not always best for massive ANN scale
- Requires Postgres tuning knowledge
- Feature set differs from dedicated vector DBs

## Integration Patterns

- Pair with LlamaIndex, LangChain, Haystack, or custom retrieval code.
- Store document IDs and metadata alongside vectors so answers can cite sources.
- Benchmark recall, latency, filtering, and ingestion under production-shaped data.

## Resources

- [GitHub](https://github.com/pgvector/pgvector)

## Buzz & Reception

- Included because vector database choice is one of the most common RAG architecture decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*


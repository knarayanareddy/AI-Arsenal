---
id: meilisearch
name: "Meilisearch"
type: tool
job: [vector-search]
description: "Lightning-fast open-source search engine with built-in hybrid keyword+vector search and typo tolerance"
url: "https://www.meilisearch.com"
cost_model: freemium
pricing_detail: "MIT open source self-hosted; Meilisearch Cloud from ~$30/mo"
tags: [retrieval, rag, self-hosted]
maturity: production
stack: [rust]
free_tier: true
free_tier_limits: "Self-hosted free; cloud trial available"
self_hostable: true
open_source: true
source_url: "https://github.com/meilisearch/meilisearch"
docs_url: "https://www.meilisearch.com/docs"
github_url: "https://github.com/meilisearch/meilisearch"
alternatives: [typesense, qdrant]
integrates_with: [langchain, llamaindex]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, production]
best_when:
  - "You want instant-search UX (sub-50ms, typo-tolerant, faceted) plus vector/hybrid search from one small binary"
  - "App search + RAG retrieval in one engine for products that don't need a dedicated vector-DB cluster"
avoid_when:
  - "Billion-scale vector collections or heavy filtering on vectors — dedicated vector DBs (Qdrant, Milvus) scale further"
  - "Log analytics/aggregation workloads; that's Elasticsearch/OpenSearch territory"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (58,458), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The best developer-experience search engine at its scale; hybrid search makes it a legitimate RAG retrieval layer"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/meilisearch/meilisearch", "date": "2026-07-08", "description": "58,458 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A Rust search engine designed around instant, forgiving search-as-you-type: schemaless JSON indexing, typo tolerance, faceting, and — since its AI-search releases — native vector storage with hybrid ranking that fuses keyword and semantic scores, embedding integration included (it can call OpenAI/HF embedders for you).

## Why It's in the Arsenal

Meilisearch earns a place in the Arsenal because it directly addresses a recurring decision point: you want instant-search UX (sub-50ms, typo-tolerant, faceted) plus vector/hybrid search from one small binary. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Sub-50ms typo-tolerant keyword search with faceting
- Native hybrid search: vectors + keywords with semantic ratio control
- Built-in embedder integrations (OpenAI, HF, Ollama, REST)

## Architecture / How It Works

Documents index into an LMDB-backed inverted index plus an HNSW-style vector store (its Arroy library); hybrid queries run both retrievals and interpolate scores by a configurable semanticRatio, and configured embedders auto-vectorize documents and queries so clients never handle embeddings.

## Getting Started

```bash
curl -L https://install.meilisearch.com | sh && ./meilisearch
# or: docker run -p 7700:7700 getmeili/meilisearch
```

## Use Cases

1. **Scenario**: you want instant-search UX (sub-50ms, typo-tolerant, faceted) plus vector/hybrid search from one small binary
2. **Scenario**: app search + RAG retrieval in one engine for products that don't need a dedicated vector-DB cluster
3. **Scenario where this is NOT the right fit**: billion-scale vector collections or heavy filtering on vectors — dedicated vector DBs (Qdrant, Milvus) scale further — evaluate an alternative instead

## Strengths

- You want instant-search UX (sub-50ms, typo-tolerant, faceted) plus vector/hybrid search from one small binary
- App search + RAG retrieval in one engine for products that don't need a dedicated vector-DB cluster

## Limitations / When NOT to Use

- Billion-scale vector collections or heavy filtering on vectors — dedicated vector DBs (Qdrant, Milvus) scale further
- Log analytics/aggregation workloads; that's Elasticsearch/OpenSearch territory

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `typesense`, `qdrant` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `meilisearch`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://www.meilisearch.com)
- [Documentation](https://www.meilisearch.com/docs)
- [GitHub](https://github.com/meilisearch/meilisearch)

## Buzz & Reception

- 58,458 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*

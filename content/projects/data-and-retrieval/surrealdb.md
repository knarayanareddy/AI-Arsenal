---
id: surrealdb
name: SurrealDB
version_tracked: null
artifact_type: platform
category: rag
subcategory: vector-databases
description: Multi-model database combining graph, document, vector, and time-series for AI agents
github_url: "https://github.com/surrealdb/surrealdb"
license: Apache-2.0
primary_language: Rust
org_or_maintainer: null
tags: [rag, retrieval, agents]
maturity: production
cost_model: open-source
github_stars: 28000
github_stars_last_30d: 0
trending_score: 60
last_commit: "2026-06-13"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [language, multimodal, general-purpose]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, actively-maintained, production-proven]
ecosystem_role:
  - Multi-model database (relational, document, graph, vector, time-series) positioned specifically around unifying AI agent memory and context alongside application data
best_for:
  - You want to consolidate multiple data models (relational, document, graph, vector) into a single database rather than operating separate systems for structured data, vector search, and graph relationships
  - You're building AI agents that need persistent, synchronized memory and context graphs embedded directly at the database layer — SurrealDB 3.0 specifically targets this as a first-class capability
avoid_if:
  - You need a database with a long, extensively battle-tested production track record — SurrealDB is comparatively young (founded 2021) and, despite recent funding and 3.0's reliability-focused architecture changes, has a shorter production history than PostgreSQL+pgvector or Milvus
  - You need best-in-class performance in any single data model (pure vector search, pure graph traversal) rather than a well-rounded multi-model system — specialized single-purpose databases will generally outperform a generalist in their specific niche
upstream_dependencies: []
downstream_consumers: []
alternatives: [milvus, lancedb]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: SurrealDB raised a $23M Series A extension (total $44M) in Feb 2026 citing 'strong momentum in real-world usage'; 2.3M downloads and 31K stars reported. Independent named enterprise cases beyond investor-quoted customers (e.g. Later) were limited.
added_date: "2026-06-14"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://toolradar.com/featured/techpresso","date":"2026-06-14","description":"Featured in Techpresso under vector-databases"}
  - {"source":"conference","url":"https://www.finsmes.com/2026/02/surrealdb-raises-23m-in-additional-series-a-funding.html","date":"2026-02-17","description":"SurrealDB raised $23M Series A extension (total $44M) in Feb 2026, reporting 2.3M downloads and 31K GitHub stars; VP of Engineering at Later quoted describing production use for autonomous AI capabilities"}
featured: false
status: active
---

## Overview

A multi-model database combining relational, document, graph, vector, and time-series data types in a single system, positioned specifically around giving AI agents persistent memory and synchronized context alongside application data.

## Why it's in the Arsenal

Multi-model database (relational, document, graph, vector, time-series) positioned specifically around unifying AI agent memory and context alongside application data. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want to consolidate multiple data models (relational, document, graph, vector) into a single database rather than operating separate systems for structured data, vector search, and graph relationships. See Strengths / Limitations below before adopting it.

## Architecture

Built in Rust, SurrealDB 3.0 unifies multiple data models (relational, document, graph, time-series, vector, geospatial, key-value) queryable through a single query language (SurrealQL), with vector indexing for millisecond-precision embedding retrieval and 'context graphs' embedded directly in the database layer specifically designed for AI agent memory, plus a plugin framework (Surrealism) for embedding business logic and access control as transactional modules inside the database runtime.

## Ecosystem Position

Upstream: none of particular note. Downstream: none of particular note yet given its relative newness in the AI-specific use case. Competing: for the vector-search use case specifically, Qdrant, Milvus, Weaviate; for the multi-model consolidation angle, it has few direct competitors positioned the same way. Complementary: designed to reduce or eliminate the need for separate graph/vector/document databases in an AI agent stack.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Scenario**: you want to consolidate multiple data models (relational, document, graph, vector) into a single database rather than operating separate systems for structured data, vector search, and graph relationships
2. **Scenario**: you're building AI agents that need persistent, synchronized memory and context graphs embedded directly at the database layer — SurrealDB 3.0 specifically targets this as a first-class capability

## Strengths

- You want to consolidate multiple data models (relational, document, graph, vector) into a single database rather than operating separate systems for structured data, vector search, and graph relationships
- You're building AI agents that need persistent, synchronized memory and context graphs embedded directly at the database layer — SurrealDB 3.0 specifically targets this as a first-class capability

## Limitations

- You need a database with a long, extensively battle-tested production track record — SurrealDB is comparatively young (founded 2021) and, despite recent funding and 3.0's reliability-focused architecture changes, has a shorter production history than PostgreSQL+pgvector or Milvus
- You need best-in-class performance in any single data model (pure vector search, pure graph traversal) rather than a well-rounded multi-model system — specialized single-purpose databases will generally outperform a generalist in their specific niche

## Relation to the Arsenal

This is a data-and-retrieval entry: it documents a vector database, document-processing tool, or RAG platform. For job-based tool comparisons (e.g. web-scraping, vector-search), see [tools/data-ingestion/](../../tools/data-ingestion/_index.md).

## Resources

- [GitHub](https://github.com/surrealdb/surrealdb)
- [Documentation](https://github.com/surrealdb/surrealdb)

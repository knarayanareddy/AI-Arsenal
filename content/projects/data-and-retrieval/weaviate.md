---
id: weaviate
name: Weaviate
version_tracked: null
artifact_type: platform
category: rag
subcategory: vector-databases
description: Open-source vector database combining object storage, vector search, filtering, and hybrid retrieval
github_url: "https://github.com/weaviate/weaviate"
license: BSD-3-Clause
primary_language: Go
org_or_maintainer: null
tags: [rag, embeddings, retrieval, self-hosted]
maturity: production
cost_model: open-source
github_stars: 16323
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-06-12"
docs_url: "https://weaviate.io/developers/weaviate/"
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
health_signals: [org-backed, community-driven, actively-maintained, production-proven]
ecosystem_role:
  - Open-source vector database with built-in hybrid search (vector + keyword/BM25) and native module system for embeddings/generation
best_for:
  - You want hybrid search (combining vector similarity with traditional keyword/BM25 search) as a first-class, built-in feature rather than something you assemble yourself
  - You want a vector database with built-in modules for generating embeddings or calling LLMs directly from within query pipelines, rather than handling that entirely in application code
avoid_if:
  - You want the absolute simplest deployment model — Weaviate's module system and GraphQL-based query interface add conceptual surface area compared to Chroma's or Qdrant's simpler APIs
  - You need the largest-scale distributed deployment with the most mature Kubernetes-native operational tooling — Milvus has a longer track record specifically at billion-scale distributed deployment
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Weaviate has a well-established managed cloud offering (Weaviate Cloud) with named enterprise customers and is frequently cited alongside Qdrant and Milvus in vector-database production comparisons, giving credible production-adoption evidence.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"conference","url":"https://weaviate.io/case-studies/instabase","date":"2024-05-17","description":"Weaviate case study: Instabase brought Weaviate into production for hybrid dense/sparse search across regulated, on-prem and cloud enterprise deployments"}
featured: false
status: active
---

## Overview

An open-source vector database offering built-in hybrid search (combining vector similarity with BM25 keyword search) and a modular system for embedding generation and LLM integration directly within the database's query pipeline.

## Why it's in the Arsenal

Open-source vector database with built-in hybrid search (vector + keyword/BM25) and native module system for embeddings/generation. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want hybrid search (combining vector similarity with traditional keyword/BM25 search) as a first-class, built-in feature rather than something you assemble yourself. See Strengths / Limitations below before adopting it.

## Architecture

Combines HNSW-based vector indexing with an inverted-index-based keyword search engine, fusing both in hybrid queries; a module system allows plugging in embedding providers or generative models directly into the query flow (e.g. retrieve-then-generate in a single API call) rather than requiring separate application-layer orchestration.

## Ecosystem Position

Upstream: none of particular note. Downstream: none of particular note as a dependency, though widely used as a RAG retrieval backend, particularly where hybrid search is a priority. Competing: Qdrant, Milvus at similar scale/scope. Complementary: integrates with LangChain, LlamaIndex, and Haystack; its module system can reduce the need for separate embedding-generation code.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/deployment command for this specific project.
```

## Key Use Cases

1. **Scenario**: you want hybrid search (combining vector similarity with traditional keyword/BM25 search) as a first-class, built-in feature rather than something you assemble yourself
2. **Scenario**: you want a vector database with built-in modules for generating embeddings or calling LLMs directly from within query pipelines, rather than handling that entirely in application code

## Strengths

- You want hybrid search (combining vector similarity with traditional keyword/BM25 search) as a first-class, built-in feature rather than something you assemble yourself
- You want a vector database with built-in modules for generating embeddings or calling LLMs directly from within query pipelines, rather than handling that entirely in application code

## Limitations

- You want the absolute simplest deployment model — Weaviate's module system and GraphQL-based query interface add conceptual surface area compared to Chroma's or Qdrant's simpler APIs
- You need the largest-scale distributed deployment with the most mature Kubernetes-native operational tooling — Milvus has a longer track record specifically at billion-scale distributed deployment

## Relation to the Arsenal

This is a data-and-retrieval entry: it documents a vector database, document-processing tool, or RAG platform. For job-based tool comparisons (e.g. web-scraping, vector-search), see [tools/data-ingestion/](../../tools/data-ingestion/_index.md).

## Resources

- [GitHub](https://github.com/weaviate/weaviate)
- [Documentation](https://weaviate.io/developers/weaviate/)

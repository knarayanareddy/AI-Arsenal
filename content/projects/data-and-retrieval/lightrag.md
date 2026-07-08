---
id: lightrag
name: LightRAG
version_tracked: null
artifact_type: framework
category: rag
subcategory: advanced-rag
description: Graph-based RAG that builds an entity/relationship knowledge graph over your corpus and does dual-level (local + global) retrieval
github_url: "https://github.com/HKUDS/LightRAG"
license: MIT
primary_language: Python
org_or_maintainer: "HKU Data Intelligence Lab (HKUDS)"
tags: [rag, retrieval, embeddings, llm]
maturity: beta
cost_model: open-source
github_stars: 37469
github_stars_last_30d: 0
trending_score: 45
last_commit: "2026-07-08"
docs_url: "https://github.com/HKUDS/LightRAG"
demo_url: null
paper_url: "https://arxiv.org/abs/2410.05779"
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: data-and-retrieval
domain: [language]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [research-origin, actively-maintained, community-driven]
ecosystem_role:
  - Lightweight graph-RAG framework that positions between plain vector RAG and heavier systems like Microsoft GraphRAG, trading some indexing depth for lower cost and faster incremental updates
best_for:
  - Your questions need multi-hop or global reasoning over a corpus (how do entities relate across many documents) where flat top-k vector retrieval misses the connections a knowledge graph makes explicit
  - You want graph-RAG benefits without GraphRAG's full indexing cost — LightRAG supports incremental insertion so new documents don't force a full graph rebuild
avoid_if:
  - Your workload is simple fact lookup or single-passage Q&A — building and querying a graph adds LLM extraction cost and latency that plain vector search avoids
  - You need a hardened, SLA-backed managed service — this is a research-origin library you self-host and operate yourself
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (37,469), MIT license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture claims from the paper/README; not hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/HKUDS/LightRAG", "date": "2026-07-08", "description": "37,469 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

LightRAG is a retrieval-augmented generation framework that indexes a corpus as a knowledge graph of entities and relationships (extracted by an LLM) alongside vector embeddings, then retrieves at two levels: local (specific entities/neighbors) and global (relationship themes across the graph). The goal is better multi-hop and holistic reasoning than flat vector top-k, at lower cost than heavier graph-RAG systems.

## Why it's in the Arsenal

It represents the "graph-RAG made lightweight" point on the retrieval spectrum: it brings the multi-hop and global-context strengths of a knowledge graph while supporting incremental document insertion, which is the operational pain point of GraphRAG-style systems. It is a comparison point in the data-and-retrieval phase, not an unconditional recommendation.

## Architecture

Ingestion runs LLM extraction over chunks to produce entities and relationships, deduplicates them into a graph, and stores both graph structure and embeddings. At query time a dual-level retriever combines low-level (entity-centric) and high-level (relationship/theme-centric) matches, assembling context that spans multiple documents rather than a single ranked passage list.

## Ecosystem Position

It sits between plain vector RAG (cheaper, simpler, weaker at multi-hop) and Microsoft GraphRAG (deeper community summaries, heavier and costlier to index). Choose LightRAG when you want graph benefits with incremental updates and a smaller footprint.

## Getting Started

```bash
pip install lightrag-hku
# initialize LightRAG with your LLM + embedding functions, insert documents, then query
```

## Key Use Cases

1. **Scenario**: multi-hop question answering over a knowledge base where answers require connecting facts across documents
2. **Scenario**: a frequently-updated corpus where full graph re-indexing (as some graph-RAG systems require) would be too expensive
3. **Scenario where this is NOT the right fit**: single-passage FAQ lookup, where plain vector retrieval is cheaper and simpler

## Strengths

- Multi-hop / global reasoning via graph structure
- Incremental insertion avoids full re-indexing
- Model-agnostic (pluggable LLM + embedding backends)

## Limitations

- LLM extraction adds indexing cost and can introduce graph noise
- Research-origin; operational maturity below managed services
- Overkill for simple retrieval workloads

## Relation to the Arsenal

- Compare against plain vector databases and Microsoft GraphRAG before adopting; they occupy adjacent points in the data-and-retrieval phase.
- Reference this project by its canonical ID `lightrag`.
- Record ingestion LLM costs and update cadence before production adoption.

## Resources

- [GitHub Repository](https://github.com/HKUDS/LightRAG)
- [Paper (arXiv)](https://arxiv.org/abs/2410.05779)

---
id: graphiti
name: "Graphiti"
version_tracked: null
artifact_type: framework
category: rag
subcategory: vector-databases
description: "Framework for building real-time, temporally-aware knowledge graphs that serve as queryable memory for agents"
github_url: "https://github.com/getzep/graphiti"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "Zep AI"
tags: [memory, rag, agents]
maturity: beta
cost_model: open-source
github_stars: 28508
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-08"
docs_url: "https://help.getzep.com/graphiti/graphiti/overview"
demo_url: null
paper_url: "https://arxiv.org/abs/2501.13956"
paper_id: null
phase: data-and-retrieval
domain: [language, general-purpose]
relation_to_stack: [build-on-top]
health_signals: [org-backed, actively-maintained, research-origin]
ecosystem_role:
  - "The temporal-knowledge-graph approach to agent memory: instead of appending embeddings to a vector store, Graphiti incrementally builds an entity-relationship graph where every edge carries validity intervals, so agents can ask what was true when — the engine underneath Zep's memory platform."
best_for:
  - "Your agent's memory must handle facts that change (preferences, org charts, project status) — bi-temporal edges invalidate stale facts instead of letting contradictory chunks compete at retrieval time"
  - "You need sub-second memory queries without LLM calls at read time — retrieval fuses semantic, BM25, and graph-traversal search over precomputed structure rather than summarizing on the fly"
avoid_if:
  - "Your use case is stateless document Q&A — a plain vector store is simpler and cheaper than running Neo4j/FalkorDB plus LLM-driven graph extraction per ingested episode"
  - "You cannot afford ingestion-time LLM costs — every episode triggers entity/edge extraction and deduplication calls, which dominates cost at high write volumes"
upstream_dependencies: []
downstream_consumers: []
alternatives: [mem0]
integrates_with: [letta, zep]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (28,508), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/getzep/graphiti", "date": "2026-07-08", "description": "28,508 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

An open-source framework from Zep for building live knowledge graphs as agent memory: conversations, documents, and structured events are ingested as 'episodes', from which LLMs extract entities and relationships into a graph whose edges carry explicit valid-from/valid-to intervals. Queries combine vector, keyword, and graph search — designed for dynamic data where RAG's static-corpus assumptions break down.

## Why it's in the Arsenal

The temporal-knowledge-graph approach to agent memory: instead of appending embeddings to a vector store, Graphiti incrementally builds an entity-relationship graph where every edge carries validity intervals, so agents can ask what was true when — the engine underneath Zep's memory platform. It earns a place in the Arsenal because it directly addresses a recurring decision point: your agent's memory must handle facts that change (preferences, org charts, project status) — bi-temporal edges invalidate stale facts instead of letting contradictory chunks compete at retrieval time. See Strengths / Limitations below before adopting it.

## Architecture

Episodes flow through LLM extraction (entities, relations, attribute updates) with deduplication against existing nodes; contradictions resolve by closing the older edge's validity interval (bi-temporal model tracking both event time and ingestion time). Storage backends include Neo4j, FalkorDB, and Neptune; hybrid retrieval (cosine similarity + BM25 + breadth-first graph traversal) returns context without runtime LLM summarization. An MCP server exposes memory to Claude-class agent hosts.

## Ecosystem Position

Upstream: Neo4j/FalkorDB graph stores, OpenAI-class LLMs for extraction. Competing: Mem0 (simpler extract-and-store memory), vanilla GraphRAG (batch-oriented, no temporality). Complementary: powers Zep's hosted memory platform (see the zep entry); the arXiv paper reports state-of-the-art Deep Memory Retrieval scores versus prior memory systems — vendor-authored, so verify on your workload.

## Getting Started

```bash
pip install graphiti-core
# python (Neo4j running locally):
from graphiti_core import Graphiti
g = Graphiti('bolt://localhost:7687', 'neo4j', 'password')
await g.add_episode(name='chat-1', episode_body='Alice moved from Acme to Initech in March')
results = await g.search('Where does Alice work?')
```

## Key Use Cases

1. **Scenario**: your agent's memory must handle facts that change (preferences, org charts, project status) — bi-temporal edges invalidate stale facts instead of letting contradictory chunks compete at retrieval time
2. **Scenario**: you need sub-second memory queries without LLM calls at read time — retrieval fuses semantic, BM25, and graph-traversal search over precomputed structure rather than summarizing on the fly

## Strengths

- Your agent's memory must handle facts that change (preferences, org charts, project status) — bi-temporal edges invalidate stale facts instead of letting contradictory chunks compete at retrieval time
- You need sub-second memory queries without LLM calls at read time — retrieval fuses semantic, BM25, and graph-traversal search over precomputed structure rather than summarizing on the fly

## Limitations

- Your use case is stateless document Q&A — a plain vector store is simpler and cheaper than running Neo4j/FalkorDB plus LLM-driven graph extraction per ingested episode
- You cannot afford ingestion-time LLM costs — every episode triggers entity/edge extraction and deduplication calls, which dominates cost at high write volumes

## Relation to the Arsenal

This is a data-and-retrieval entry: it documents a vector database, document-processing tool, or RAG platform. For job-based tool comparisons (e.g. web-scraping, vector-search), see [tools/data-ingestion/](../../tools/data-ingestion/_index.md).

## Resources

- [GitHub](https://github.com/getzep/graphiti)
- [Documentation](https://help.getzep.com/graphiti/graphiti/overview)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (28,508 stars, last commit 2026-07-08, verified via GitHub API on 2026-07-08)*

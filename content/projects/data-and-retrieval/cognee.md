---
id: cognee
name: "Cognee"
version_tracked: null
artifact_type: framework
category: rag
subcategory: vector-databases
description: "Memory engine that replaces naive RAG with ECL pipelines combining knowledge graphs and embeddings over documents and conversations"
github_url: "https://github.com/topoteretes/cognee"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "Topoteretes"
tags: [memory, rag, agents]
maturity: beta
cost_model: open-source
github_stars: 27350
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-08"
docs_url: "https://docs.cognee.ai"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [language, general-purpose]
relation_to_stack: [build-on-top]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - "The pipeline-centric take on agent memory: cognee models memory construction as composable Extract-Cognify-Load (ECL) tasks that build a knowledge graph plus embeddings from any data source, aiming at the space between raw vector RAG and heavyweight graph platforms."
best_for:
  - "You want graph-plus-vector memory with minimal ceremony — `add()` then `cognify()` then `search()` covers ingestion-to-query in three calls while remaining extensible via custom pipeline tasks"
  - "You need to interconnect heterogeneous sources (past chats, files, images, audio transcripts) into one queryable structure rather than per-corpus vector silos"
avoid_if:
  - "You need battle-tested temporal fact invalidation for fast-changing data — Graphiti's bi-temporal model is more explicit about time; cognee's graph is fresher but less specialized there"
  - "Simple semantic search meets your needs — the LLM-driven cognify step adds ingestion cost and latency that plain embedding pipelines avoid"
upstream_dependencies: []
downstream_consumers: []
alternatives: [graphiti, mem0]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (27,350), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/topoteretes/cognee", "date": "2026-07-08", "description": "27,350 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

An open-source memory engine for AI agents built around ECL (Extract, Cognify, Load) pipelines: data from 30+ source types is extracted, 'cognified' into an entity-relationship knowledge graph with embeddings, and loaded into pluggable graph and vector stores. The pitch is replacing naive RAG's flat chunk retrieval with structured, interconnected memory at developer-friendly API depth.

## Why it's in the Arsenal

The pipeline-centric take on agent memory: cognee models memory construction as composable Extract-Cognify-Load (ECL) tasks that build a knowledge graph plus embeddings from any data source, aiming at the space between raw vector RAG and heavyweight graph platforms. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want graph-plus-vector memory with minimal ceremony — `add()` then `cognify()` then `search()` covers ingestion-to-query in three calls while remaining extensible via custom pipeline tasks. See Strengths / Limitations below before adopting it.

## Architecture

Pipelines are typed Python tasks (chunking, entity extraction, graph construction, embedding) composed into DAGs; storage abstracts over vector backends (LanceDB, Qdrant, pgvector) and graph backends (Neo4j, NetworkX, kuzu). Search modes span graph completion, RAG chunks, summaries, and Cypher-style graph queries; ontology support lets you constrain extraction to a domain schema.

## Ecosystem Position

Upstream: LiteLLM for model routing, pluggable graph/vector stores. Competing: Graphiti (temporal graphs), Mem0 (conversation-memory focus), LlamaIndex knowledge-graph indices. Complementary: exposes an MCP server for agent hosts; ships evaluation tooling (HotpotQA-style benchmarks) for comparing memory configurations — self-reported numbers, so validate on your data.

## Getting Started

```bash
pip install cognee
# python:
import cognee, asyncio
async def main():
    await cognee.add('Natural language processing is a field of AI.')
    await cognee.cognify()
    print(await cognee.search('What is NLP?'))
asyncio.run(main())
```

## Key Use Cases

1. **Scenario**: you want graph-plus-vector memory with minimal ceremony — `add()` then `cognify()` then `search()` covers ingestion-to-query in three calls while remaining extensible via custom pipeline tasks
2. **Scenario**: you need to interconnect heterogeneous sources (past chats, files, images, audio transcripts) into one queryable structure rather than per-corpus vector silos

## Strengths

- You want graph-plus-vector memory with minimal ceremony — `add()` then `cognify()` then `search()` covers ingestion-to-query in three calls while remaining extensible via custom pipeline tasks
- You need to interconnect heterogeneous sources (past chats, files, images, audio transcripts) into one queryable structure rather than per-corpus vector silos

## Limitations

- You need battle-tested temporal fact invalidation for fast-changing data — Graphiti's bi-temporal model is more explicit about time; cognee's graph is fresher but less specialized there
- Simple semantic search meets your needs — the LLM-driven cognify step adds ingestion cost and latency that plain embedding pipelines avoid

## Relation to the Arsenal

This is a data-and-retrieval entry: it documents a vector database, document-processing tool, or RAG platform. For job-based tool comparisons (e.g. web-scraping, vector-search), see [tools/data-ingestion/](../../tools/data-ingestion/_index.md).

## Resources

- [GitHub](https://github.com/topoteretes/cognee)
- [Documentation](https://docs.cognee.ai)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (27,350 stars, last commit 2026-07-08, verified via GitHub API on 2026-07-08)*

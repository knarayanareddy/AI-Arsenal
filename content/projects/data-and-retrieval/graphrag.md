---
id: graphrag
name: GraphRAG
version_tracked: null
artifact_type: library
category: rag
subcategory: advanced-rag
description: Microsoft's knowledge-graph RAG — LLM-extracted entity graphs with hierarchical community summaries that answer global questions vector RAG can't
github_url: https://github.com/microsoft/graphrag
license: MIT
primary_language: Python
org_or_maintainer: microsoft
tags:
  - rag
  - graphs
  - retrieval
maturity: production
cost_model: open-source
github_stars: 34524
github_stars_last_30d: 267
trending_score: 61
last_commit: '2026-07-20'
docs_url: https://microsoft.github.io/graphrag/
demo_url: null
paper_url: https://arxiv.org/abs/2404.16130
paper_id: null
phase: data-and-retrieval
domain:
  - language
  - reasoning
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - org-backed
  - actively-maintained
  - research-origin
ecosystem_role:
  - 'The reference implementation of graph-based RAG: named the pattern, published the paper, and defined the pipeline (entity extraction → graph construction → community detection → hierarchical summarization) that the graph-RAG ecosystem now measures itself against'
best_for:
  - Your questions are global/sensemaking queries over a corpus ("what are the main themes?", "how do these actors relate?") — exactly where chunk-level vector retrieval structurally fails and community summaries win
  - Your corpus is entity-rich (investigations, research collections, org documents) and multi-hop relations carry the value — the extracted graph makes relationships first-class instead of hoping they co-occur in a chunk
avoid_if:
  - Your workload is ordinary factoid retrieval over documents — the LLM-driven indexing pass costs orders of magnitude more than embedding, for little gain on local questions
  - Your corpus updates frequently — incremental graph/community maintenance is the pipeline's weak spot; re-indexing costs dominate on fast-moving data
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (34.2k), MIT license, and active development (last push 2026-07-08) verified via the GitHub API on 2026-07-08. Global-vs-local query claims from the GraphRAG paper (arXiv:2404.16130); cost characteristics from official docs and widely-reported community experience, not benchmarked here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/microsoft/graphrag
    date: '2026-07-08'
    description: 34.2k stars, Microsoft-backed, active development
featured: false
status: active
---

## Overview

GraphRAG replaces "embed chunks, retrieve top-k" with an LLM-built knowledge graph: an indexing pipeline extracts entities and relationships from the corpus, clusters the graph into hierarchical communities (Leiden), and pre-summarizes each community. Queries then run in two modes — local (entity-neighborhood retrieval) and global (map-reduce over community summaries) — the latter answering whole-corpus questions that no top-k chunk set can represent.

## Why it's in the Arsenal

Vector RAG's best-known structural failure is the global question — "summarize the key tensions across these 10,000 documents" has no answer in any 5 chunks. GraphRAG is the pattern-defining, Microsoft-backed, paper-grounded response to that failure, and the entry every team evaluating graph-augmented retrieval starts from. It's here as both a usable pipeline and the reference architecture for the graph-RAG design space.

## Architecture

Batch indexing pipeline: text units → LLM entity/relation extraction → graph assembly → Leiden community detection → per-community LLM summarization at multiple hierarchy levels, all persisted as parquet tables. Query side: local search combines entity neighborhoods with associated text units; global search map-reduces over community summaries at a chosen level; DRIFT search blends both. Every stage is prompt-configurable.

## Ecosystem Position

Upstream: an LLM provider (indexing is LLM-call-heavy) and optional vector store for entity embeddings. Competing/adjacent: LightRAG and nano-graphrag (cheaper reimplementations), Neo4j-centric GraphRAG stacks, and plain hybrid retrieval when questions are local. Complementary: standard vector RAG — production deployments typically route global questions to GraphRAG and factoid questions to vector search.

## Getting Started

```bash
pip install graphrag
graphrag init --root ./myproject
graphrag index --root ./myproject
graphrag query --root ./myproject --method global "What are the top themes?"
```

## Key Use Cases

1. **Scenario**: sensemaking over a large entity-rich corpus (investigative documents, research literature, incident reports) where the questions are thematic and relational, not factoid
2. **Scenario**: studying the graph-RAG design space — the pipeline is the cleanest full reference implementation of extraction → communities → hierarchical summarization

## Strengths

- Solves the global-question failure mode of vector RAG by mechanism (community summaries), not by longer context — validated in the accompanying paper's evaluations
- Microsoft-backed with a real paper, active maintenance, and a fully inspectable pipeline (parquet artifacts at every stage)

## Limitations

- Indexing cost is the adoption killer: every text unit passes through LLM extraction and summarization — often 10–100× the cost of embedding the same corpus
- Fast-changing corpora fit poorly (incremental update support is limited); and for local/factoid queries it adds cost without quality gain over tuned vector retrieval

## Relation to the Arsenal

The advanced-RAG counterpoint to the chunking/embedding decision guides in [architectures/data-strategy](../../architectures/data-strategy/_index.md); pairs conceptually with `liu-2023-lost-in-the-middle` (research) on why stuffing more chunks doesn't answer global questions.

## Resources

- [GitHub](https://github.com/microsoft/graphrag)
- [Documentation](https://microsoft.github.io/graphrag/)
- [Paper](https://arxiv.org/abs/2404.16130)

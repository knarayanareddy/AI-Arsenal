---
id: "2026-07"
title: "AI Arsenal Digest — 2026-07"
period: "2026-07"
published_date: "2026-07-07"
summary: "July 2026 digest: 15 new benchmark entries across all 7 categories, a formal Trending vertical (5 commits), and a rounded-out Skills curriculum with 4 learning paths and 8 guides."
highlights:
  - "15 new benchmark entries added across all 7 categories (code, agents, safety, multimodal, evaluation-methods) — total benchmarks now 30"
  - "Trending promoted to a first-class `trend` entry type with schema, taxonomy, migration guard, and CI enforcement (5 commits)"
  - "Skills curriculum now ships 4 learning paths and 8 guides; the previously-empty `by-role` section is populated"
tags:
  - trending
  - benchmark
  - evaluation
top_projects:
  - qdrant
  - langfuse
  - ragas-rag-evaluation
  - crawl4ai
top_tools:
  - pinecone
  - crawl4ai-tool
added_by: "maintainer"
---

## TL;DR

This is the July 2026 Arsenal digest (period `2026-07`, published 2026-07-07). By the numbers:

- **Benchmarks:** +15 entries this month → **30 total** across all 7 categories.
- **Trending:** launched as a first-class `trend` vertical (schema + taxonomy + migration guard + CI).
- **Skills:** **8 guides** across **4 learning paths**; the previously-empty `by-role` section now has an entry.
- **Catalog totals:** 69 projects, 93 tools, 25 papers, 102 tips, 26 guides, 14 architectures, 23 community, 30 benchmarks, 4 trending.

Maintainers should review and extend the "Top" selections below before publishing.

## Top Projects

- [Qdrant](../../projects/data-and-retrieval/qdrant.md) — open-source vector database; foundational to most RAG stacks.
- [Langfuse](../../projects/benchmarks-and-evals/langfuse.md) — open-source LLM observability and evaluation layer.
- [Ragas](../../projects/benchmarks-and-evals/ragas-rag-evaluation.md) — RAG evaluation framework for retrieved-context quality.
- [Crawl4AI](../../projects/data-and-retrieval/crawl4ai.md) — web crawling / data ingestion purpose-built for RAG.

## Top Tools

- [Pinecone](../../tools/data-ingestion/pinecone.md) — managed vector database for production retrieval.
- [Crawl4AI](../../tools/data-ingestion/crawl4ai-tool.md) — tooling to crawl and convert web content into LLM-ready markdown.

## Research Highlights

- [DeepSeek-R1](../../research/training-and-alignment/deepseek-ai-2025-r1.md) — reasoning-model training via large-scale reinforcement learning.
- [QLoRA](../../research/training-and-alignment/dettmers-2023-qlora.md) — fine-tuning 65B-class models on a single 48GB GPU.

The research vertical holds 25 papers; browse `content/research/` for the full set.

## Architecture Notes

- [Choose a Model](../../architectures/model-selection/choose-llm.md) — route by primary need (local vs cloud, latency vs quality).
- [Choose a Vector Database](../../architectures/data-strategy/choose-vector-db.md) — decision tree for vector-DB selection.
- Skills worth revisiting: [Embeddings](../../skills/core-concepts/embeddings.md) and the [AI Engineer Learning Path](../../skills/learning-paths/ai-engineer.md).

## Community Signals

- [AI Engineer Worlds Fair](../../community/events/ai-engineer-worlds-fair.md) — major practitioner event; see `content/community/` for the full curated set.

No new community entries were added this month; maintainers should verify event dates before citing.

## What to Watch Next Month

- Promotion of the Trending weekly snapshot from `draft` to `published` after maintainer verification.
- Continued benchmark coverage and any new evaluation-methods entries.
- Skills: more `by-role` overviews and tighter links between learning paths and build examples.

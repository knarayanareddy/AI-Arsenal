---
id: mteb
name: "MTEB"
version_tracked: null
artifact_type: framework
category: evaluation
subcategory: evaluation
description: "The Massive Text Embedding Benchmark — the standard evaluation suite and leaderboard for embedding and reranker models across 1000+ tasks"
github_url: "https://github.com/embeddings-benchmark/mteb"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "Embeddings-benchmark (HF-affiliated community)"
tags: [evaluation, embeddings, retrieval]
maturity: production
cost_model: open-source
github_stars: 3344
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-07"
docs_url: "https://embeddings-benchmark.github.io/mteb/"
demo_url: null
paper_url: "https://arxiv.org/abs/2210.07316"
paper_id: null
phase: benchmark-and-eval
domain: [language]
relation_to_stack: [study-and-reference, build-on-top]
health_signals: [community-driven, actively-maintained, research-origin]
ecosystem_role:
  - "The de facto standard for comparing embedding models: every serious embedding release (OpenAI, Cohere, Voyage, Qwen, Gemini) reports MTEB scores, and its Hugging Face leaderboard is where retrieval-stack model selection starts."
best_for:
  - "You are choosing an embedding model for RAG or search — MTEB(Multilingual) and task-specific splits (retrieval, reranking, clustering, STS) let you compare on the task type you actually run rather than a single headline number"
  - "You are evaluating your own fine-tuned embedding or reranker — one `mteb.evaluate` call benchmarks any sentence-transformers-compatible or custom encoder against the public reference points"
avoid_if:
  - "You treat the leaderboard rank as ground truth for your domain — public-benchmark overfitting is a known issue; always validate the top candidates on a private slice of your own retrieval data"
  - "You need end-to-end RAG quality evaluation — MTEB scores the encoder in isolation; retrieval-pipeline evals (chunking, rerankers, generation) need separate harnesses"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: [sentence-transformers]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (3,344), primary language, license, and last commit (2026-07-07) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/embeddings-benchmark/mteb", "date": "2026-07-08", "description": "3,344 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

A benchmark suite and evaluation framework for text (and increasingly multimodal) embedding models, spanning retrieval, reranking, classification, clustering, semantic similarity, and instruction-following tasks across 250+ languages. Its public leaderboard on Hugging Face is the reference scoreboard the entire embedding-model ecosystem reports against.

## Why it's in the Arsenal

The de facto standard for comparing embedding models: every serious embedding release (OpenAI, Cohere, Voyage, Qwen, Gemini) reports MTEB scores, and its Hugging Face leaderboard is where retrieval-stack model selection starts. It earns a place in the Arsenal because it directly addresses a recurring decision point: you are choosing an embedding model for RAG or search — MTEB(Multilingual) and task-specific splits (retrieval, reranking, clustering, STS) let you compare on the task type you actually run rather than a single headline number. See Strengths / Limitations below before adopting it.

## Architecture

Tasks are versioned dataset+metric definitions grouped into named benchmarks (MTEB(eng), MTEB(Multilingual), MIEB for images, BEIR compatibility); models implement a minimal encoder interface (or are wrapped automatically from sentence-transformers), and the framework handles batching, caching, metric computation (nDCG@10, MAP, v-measure, Spearman), and result serialization that feeds the public leaderboard.

## Ecosystem Position

Upstream: sentence-transformers (evaluation interface), Hugging Face datasets/hub. Downstream: the leaderboard shapes model selection across the RAG ecosystem, and vendors optimize releases against it. Complementary: BEIR (absorbed as the retrieval core), and zero-shot retrieval evals; pair leaderboard screening with private-data validation to counter benchmark contamination.

## Getting Started

```bash
pip install mteb
import mteb  # python
model = mteb.get_model('sentence-transformers/all-MiniLM-L6-v2')
benchmark = mteb.get_benchmark('MTEB(eng, v2)')
results = mteb.evaluate(model, tasks=benchmark)
```

## Key Use Cases

1. **Scenario**: you are choosing an embedding model for RAG or search — MTEB(Multilingual) and task-specific splits (retrieval, reranking, clustering, STS) let you compare on the task type you actually run rather than a single headline number
2. **Scenario**: you are evaluating your own fine-tuned embedding or reranker — one `mteb.evaluate` call benchmarks any sentence-transformers-compatible or custom encoder against the public reference points

## Strengths

- You are choosing an embedding model for RAG or search — MTEB(Multilingual) and task-specific splits (retrieval, reranking, clustering, STS) let you compare on the task type you actually run rather than a single headline number
- You are evaluating your own fine-tuned embedding or reranker — one `mteb.evaluate` call benchmarks any sentence-transformers-compatible or custom encoder against the public reference points

## Limitations

- You treat the leaderboard rank as ground truth for your domain — public-benchmark overfitting is a known issue; always validate the top candidates on a private slice of your own retrieval data
- You need end-to-end RAG quality evaluation — MTEB scores the encoder in isolation; retrieval-pipeline evals (chunking, rerankers, generation) need separate harnesses

## Relation to the Arsenal

This is a benchmark-and-eval entry: it documents an evaluation, tracing, or observability platform. For job-based tool comparisons (evaluation, tracing, monitoring), see [tools/evaluation-and-observability/](../../tools/evaluation-and-observability/_index.md).

## Resources

- [GitHub](https://github.com/embeddings-benchmark/mteb)
- [Documentation](https://embeddings-benchmark.github.io/mteb/)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (3,344 stars, last commit 2026-07-07, verified via GitHub API on 2026-07-08)*

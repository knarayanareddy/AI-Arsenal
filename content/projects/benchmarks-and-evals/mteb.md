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

MTEB appears in this catalog as a reference point for the benchmark-and-eval phase; the useful question is whether the number it produces would change a decision you are actually facing. The sections below state what it claims to do and what adopting it would commit you to.

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

1. **Running it in anger**: the first real evaluation of MTEB is your own traffic, not the documentation's example; instrument latency, error rate and quality on a representative slice of data before the choice is load-bearing.
2. **What dominates the decision**: `choosing`, `embedding`, `model`, `search` are the variables that actually move the outcome for MTEB in this phase, and none of them appear in a feature comparison.
3. **Before committing**: pick the criterion that would make you abandon this choice, write it down, and check it against a representative slice of your own data — a catalog entry can tell you what is claimed, only a run tells you what is true.

## Strengths

- What MTEB gives you that reading the feature list does not: tasks are versioned dataset+metric definitions grouped into named benchmarks (MTEB(eng), MTEB(Multilingual), MIEB for images, BEIR compatibility); models implement a minimal encoder interface (or are wrapped automatically from sentence-transformers), and the framework handles batching, caching, metric computation (nDCG@10, MAP, v-measure, Spearman), and result serialization that feeds the public leaderboard, which is the part you have to evaluate against your own workload.
- Sits in the benchmark-and-eval phase alongside the alternatives named in its Ecosystem Position section; cross-phase comparison is usually a category error rather than a useful alternative.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the MTEB footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- The claims here come from the project's own documentation and public record, not from independent measurement on your workload; benchmark numbers in particular are point-in-time and harness-dependent.
- No alternative is catalogued alongside MTEB here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

This is the benchmark-and-eval entry for MTEB in this phase, and the honest way to use it is as one candidate among the alternatives listed in the phase index rather than as a default. Read the Strengths and Limitations sections before adopting it: the operational cost, the model or service dependencies, and the failure behaviour are what decide whether it fits your workload, and none of those are settled by the feature list alone.

## Resources

- [GitHub](https://github.com/embeddings-benchmark/mteb)
- [Documentation](https://embeddings-benchmark.github.io/mteb/)

---
*Last reviewed: 2026-07-08 by @maintainer; github_stars 3344 as of 2026-07-08; last commit 2026-07-07; both verified via the GitHub API.*

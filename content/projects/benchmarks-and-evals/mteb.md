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
github_stars: 3476
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-10-26"
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

1. **Shortlisting embedding models for a retrieval stack**: read the retrieval split of MTEB(Multilingual) rather than the headline average, because a model that wins on classification or STS can lose on the task you actually run.
2. **Sanity-checking a vendor claim**: a model card quoting an MTEB score can be reproduced with one `mteb.evaluate` call against the same task revision, which is the difference between a claim and a measurement.
3. **Benchmarking your own fine-tune**: swap a trained encoder into the same task set and see whether the domain adaptation actually moved retrieval quality or only in-domain similarity.
4. **Choosing a reranker**: the reranking tasks score cross-encoders the same way as bi-encoders, so the two stages of a retrieval pipeline can be compared on one scale.
5. **Image retrieval selection**: MIEB extends the harness to vision-language encoders, which matters when a multimodal index is part of the plan.
6. **Regression-gating an embedding upgrade**: run the same task subset in CI before a model swap, so a silent recall drop from a "better" checkpoint fails a build.
## Strengths

- The task suite is broad and versioned: hundreds of dataset-plus-metric definitions grouped into named benchmarks, so a score can be tied to a specific revision rather than to a moving leaderboard.
- The metric coverage matches the job — nDCG@10 and MAP for retrieval, v-measure for clustering, Spearman for STS — instead of collapsing everything into one accuracy number.
- The model interface is minimal: an encoder implementing `encode` works, sentence-transformers models are wrapped automatically, and the harness owns batching, caching and result serialisation.
- Results feed the public Hugging Face leaderboard from the same code path, so a local run is directly comparable with a published one.
- BEIR compatibility and the MIEB image extension mean the same harness covers text retrieval and vision-language encoders, which is rare.
- Apache-2.0 with active development and a maintainer group drawn from the embedding community, which is why releases track new model families closely.
## Limitations

- **Leaderboard overfitting is the central risk.** Public benchmarks are optimised against, sometimes directly in training data selection; a high rank is evidence of general capability, not of fitness for your corpus, and the only defence is a private validation slice.
- **The encoder is scored in isolation.** No chunking strategy, no reranker interaction, no generation — end-to-end RAG quality needs a separate harness, and a pipeline can degrade while the encoder's score improves.
- **Run cost adds up.** Hundreds of tasks across hundreds of datasets is a substantial compute and download job; most teams should run a curated subset and say so, rather than reporting a full-suite number they inferred.
- **Task revisions drift.** A dataset's revision can change its content and therefore its scores; a comparison that does not pin revisions is not a comparison.
- **Domain mismatch is invisible in the aggregate.** Legal, clinical and code corpora are thinly represented relative to web text, so the winner on the leaderboard may be the loser on your documents.
- **Scores are harness-dependent.** Prompt templates, instruction prefixes and pooling choices change results, and reported numbers do not always disclose the exact configuration.

## Relation to the Arsenal

The reference point for the embedding entries in this catalog — `bge-embeddings`, `huggingface-sentence-transformers` and `voyage-ai` all report MTEB numbers, and reading them through this harness is how those claims get checked. `stanford-futuredata-colbert` is the late-interaction alternative whose scores are also reported here.

For end-to-end retrieval evaluation rather than encoder evaluation, pair it with `ragas` and the rest of [Benchmarks and Evals](../benchmarks-and-evals/_index.md); for the vector stores the retrievers sit on, see `qdrant`, `chroma` and `weaviate`.
## Relation to the Arsenal

This is the benchmark-and-eval entry for MTEB in this phase, and the honest way to use it is as one candidate among the alternatives listed in the phase index rather than as a default. Read the Strengths and Limitations sections before adopting it: the operational cost, the model or service dependencies, and the failure behaviour are what decide whether it fits your workload, and none of those are settled by the feature list alone.

## Resources

- [GitHub](https://github.com/embeddings-benchmark/mteb)
- [Documentation](https://embeddings-benchmark.github.io/mteb/)

---
*Last reviewed: 2026-07-08 by @maintainer; github_stars 3344 as of 2026-07-08; last commit 2026-07-07; both verified via the GitHub API.*

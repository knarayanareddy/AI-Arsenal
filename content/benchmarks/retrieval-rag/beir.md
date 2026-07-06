---
id: beir
title: "BEIR"
entry_type: benchmark
category: retrieval-rag
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Zero-shot retrieval generalization – 18 diverse IR datasets across 9 tasks (fact-checking, QA, biomedical, news, argument retrieval, etc.)."
metrics:
  - name: "nDCG@10"
    direction: higher
    notes: "Primary metric, averaged across 18 datasets"
  - name: "Recall@100"
    direction: higher
    notes: "Reported per dataset"
protocol:
  dataset: "BEIR"
  dataset_url: "https://huggingface.co/datasets/BeIR/beir"
  evaluation_setup: "Zero-shot – no in-domain training on BEIR test sets. Dense/sparse/hybrid retrieval evaluated with standard nDCG@10, Recall@k."
  version: null
leaderboards:
  - name: "BEIR – GitHub / Papers with Code"
    url: "https://github.com/beir-cellar/beir"
    last_checked: "2026-07-06"
  - name: "MTEB Retrieval leaderboard (includes BEIR subsets)"
    url: "https://huggingface.co/spaces/mteb/leaderboard"
    last_checked: "2026-07-06"
known_issues:
  - "18 heterogeneous datasets – aggregate nDCG hides large per-domain variance; always check per-dataset breakdown"
  - "English-only – does not measure multilingual retrieval"
  - "Static corpora from 2018-2021 – does not test recency / live retrieval"
  - "Different embedding dimensions / index types affect latency/cost tradeoffs not captured by nDCG alone"
recommended_usage:
  - "Use to compare embedding models / retrievers for zero-shot generalization before domain-specific fine-tuning"
  - "Always report per-dataset nDCG@10, not just the average – a high average can hide catastrophic failure on your target domain"
  - "Pair with a RAG end-to-end eval (e.g. RAGAS) – good retrieval ≠ good answers"
  - "For production RAG, run BEIR-style evaluation on your own corpus – BEIR is a proxy, not a guarantee"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: []
enrichment_status: reviewed
tags: [evaluation, retrieval, rag, benchmark]
---

## Overview

BEIR is a heterogeneous zero-shot retrieval benchmark with 18 datasets spanning 9 IR tasks: fact-checking, QA, biomedical IR, news, argument retrieval, duplicate question retrieval, citation prediction, tweet retrieval, and entity retrieval.

## What it Measures (and what it doesn’t)

Measures: zero-shot retrieval generalization across domains and query types – nDCG@10, Recall@k.

Does not measure: end-to-end RAG answer quality, multilingual retrieval, recency, latency/cost, or reranking quality in isolation (though rerankers can be evaluated on BEIR).

## Dataset & Protocol

- **Dataset:** BEIR – 18 datasets, 9 tasks
- **Dataset URL:** https://huggingface.co/datasets/BeIR/beir
- **Evaluation setup:** Zero-shot – no training on BEIR test sets. Standard nDCG@10 / Recall@100.
- **Version:** –

Harness: https://github.com/beir-cellar/beir

## Metrics

- **nDCG@10** — higher is better — primary aggregate metric
- **Recall@100** — higher is better — per-dataset

## How to Run

```bash
pip install beir
python -m beir.retrieval.evaluation --model your-embedding-model
# See https://github.com/beir-cellar/beir for full harness
```

## Known Issues, Leakage & Gaming Risks

- Aggregate nDCG hides large per-domain variance
- English-only
- Static corpora from 2018-2021 – no recency test
- Embedding dimension / index type tradeoffs not captured

## How to Interpret Scores

- Report per-dataset nDCG@10, not just the average – check your target domain specifically
- As of **2026-07-06**, check the **BEIR GitHub** and **MTEB Retrieval leaderboard** for current model rankings – embedding model leaderboards turn over frequently
- A 1-2 point average nDCG difference is rarely significant given the 18-dataset variance
- Good BEIR scores do not guarantee good RAG answers – always run end-to-end eval

## Recommended Usage

- Use to compare embedding models / retrievers for zero-shot generalization
- Always report per-dataset nDCG@10
- Pair with a RAG end-to-end eval
- Run BEIR-style evaluation on your own corpus for production

## Related Benchmarks

None yet in the Arsenal for retrieval.

## Relation to the Arsenal

Retrieval / RAG evaluation benchmark. Complements RAG projects in `content/projects/data-and-retrieval/`, RAG tips in `content/tips-and-tricks/rag-and-retrieval/`, and vector-search tools.

## Resources

- [Dataset – Hugging Face](https://huggingface.co/datasets/BeIR/beir)
- [GitHub – BEIR](https://github.com/beir-cellar/beir)
- [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard)
- Paper: Thakur et al., "BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models", NeurIPS 2021

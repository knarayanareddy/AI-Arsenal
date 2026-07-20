---
id: bge-embeddings
name: BGE / FlagEmbedding (BAAI)
version_tracked: null
artifact_type: model
category: rag
subcategory: open-source-models
description: BAAI's open embedding and reranker family — BGE-M3's dense+sparse+multi-vector retrieval made it the default self-hosted choice for multilingual RAG
github_url: https://github.com/FlagOpen/FlagEmbedding
license: MIT
primary_language: Python
org_or_maintainer: BAAI (FlagOpen)
tags:
  - embeddings
  - rag
  - self-hosted
maturity: production
cost_model: open-source
github_stars: 11955
github_stars_last_30d: 42
trending_score: 43
last_commit: '2026-04-22'
docs_url: https://github.com/FlagOpen/FlagEmbedding
demo_url: null
paper_url: https://arxiv.org/abs/2402.03216
paper_id: null
phase: foundation-model
domain:
  - language
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - production-proven
  - actively-maintained
ecosystem_role:
  - 'The workhorse open embedding family of the RAG era: BGE checkpoints are what teams actually self-host when they leave OpenAI''s embedding API — and BGE-M3''s trick of emitting dense, sparse (lexical-weight), and ColBERT-style multi-vector representations from one forward pass collapsed the embed-plus-BM25 hybrid stack into a single model'
best_for:
  - 'Self-hosted multilingual RAG: BGE-M3 covers 100+ languages and 8k-token inputs with hybrid dense+sparse retrieval from one model — the pragmatic default when data can''t leave your infrastructure'
  - 'Adding a reranking stage cheaply: the paired bge-reranker cross-encoders are the standard open choice for precision-boosting the top-k of any retriever'
avoid_if:
  - You want peak English-only leaderboard scores — newer LLM-based embedders (Qwen3-Embedding-class, NV-Embed lineage) lead MTEB; BGE wins on deployment economics, not benchmark ceilings
  - You won't operate GPU/CPU inference — a managed embedding API is less machinery for small workloads
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with:
  - milvus
  - qdrant
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (11.9k), MIT, last push 2026-04-22 verified via the GitHub API on 2026-07-08. Paper is the BGE-M3 report (arXiv:2402.03216). "Default self-hosted choice" reflects sustained HF download rankings for bge-m3/bge-reranker; not re-benchmarked here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/FlagOpen/FlagEmbedding
    date: '2026-07-08'
    description: 11.9k stars; BAAI's BGE embedding/reranker family repo
featured: false
status: active
---

## Overview

FlagEmbedding is BAAI's home for the BGE (BAAI General Embedding) family: dense embedders across sizes, the bge-reranker cross-encoders, and BGE-M3 — a single model producing three retrieval representations (dense vectors, sparse lexical weights, and ColBERT-style multi-vectors) over 100+ languages and inputs up to 8192 tokens. The repo carries training/fine-tuning code, evaluation harnesses, and inference wrappers.

## Why it's in the Arsenal

The embedding model is the quiet load-bearing choice in every RAG system, and BGE is what the self-hosted world standardized on: MIT-licensed, small enough to serve cheaply, strong enough multilingually, with M3's unified hybrid retrieval removing the need to run BM25 alongside a dense index. The catalog's vector-DB and RAG entries mostly assume a BGE-shaped model at the front; this entry names it.

## Architecture

Dense BGE models are XLM-R/BERT-lineage encoders contrastively trained (RetroMAE pretraining + large-scale pair training + hard-negative fine-tuning). BGE-M3 adds self-knowledge-distillation so one backbone jointly optimizes dense (CLS), sparse (per-token weights), and multi-vector (per-token embeddings) objectives — the mechanism that lets one forward pass serve hybrid retrieval. Rerankers are cross-encoders scoring query-document pairs directly.

## Ecosystem Position

Serves through sentence-transformers, `text-embeddings-inference`, ONNX/fastembed, and Ollama-ecosystem runtimes; indexes into `milvus`/`qdrant`-class stores (M3's sparse output maps to their hybrid-search APIs). Competing: e5/GTE families, Jina embeddings, nomic-embed on the open side; OpenAI/Cohere/Voyage APIs on the managed side; Qwen3-Embedding-class LLM embedders at the benchmark frontier.

## Getting Started

```bash
pip install -U FlagEmbedding
```

```python
from FlagEmbedding import BGEM3FlagModel
model = BGEM3FlagModel("BAAI/bge-m3", use_fp16=True)
out = model.encode(["what is RAG?"], return_dense=True, return_sparse=True, return_colbert_vecs=True)
```

## Key Use Cases

1. **Scenario**: multilingual enterprise RAG that must run in-VPC — bge-m3 for hybrid retrieval plus bge-reranker-v2-m3 on the top-50, all self-hosted under MIT
2. **Scenario**: replacing a paid embedding API at volume — embedding costs drop to inference compute with quality adequate for most corpora

## Strengths

- M3's one-model hybrid retrieval is an architectural simplification, not a benchmark point: one service, one index pipeline, dense+lexical recall
- Deployment economics: small encoders, MIT license, first-class support in every open serving/indexing stack

## Limitations

- Benchmark frontier has moved to LLM-based embedders; BGE's advantage is operational, and English-only ceilings favor newer families
- Embedding models are corpus-sensitive — BGE's defaults still warrant evaluation on your retrieval set before committing an index

## Relation to the Arsenal

The model at the front of the RAG pipeline entries (`milvus`, `qdrant`, `pgvector`) and beneath the chunking/embedding decision guides in [architectures/data-strategy](../../architectures/data-strategy/_index.md); served in production via `text-embeddings-inference` (tools).

## Resources

- [GitHub](https://github.com/FlagOpen/FlagEmbedding)
- [BGE-M3 paper](https://arxiv.org/abs/2402.03216)

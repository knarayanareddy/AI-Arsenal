---
id: muennighoff-2022-mteb
title: "MTEB: Massive Text Embedding Benchmark"
phase: evaluation-and-safety
venue: acl
year: 2022
authors:
  - "Muennighoff, N."
  - "Tazi, N."
  - "Magne, L."
  - "Reimers, N. (Hugging Face / cohere.ai)"
arxiv_id: "2210.07316"
arxiv_url: "https://arxiv.org/abs/2210.07316"
pdf_url: "https://arxiv.org/pdf/2210.07316"
code_url: "https://github.com/embeddings-benchmark/mteb"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 1500

tldr: "MTEB: 8 embedding task families across 58 datasets and 112 languages, with a public leaderboard — the benchmark that made embedding models comparable and whose central finding still holds: no single model wins everywhere"
key_contribution: "Unified embedding evaluation, which had been task-siloed (STS papers vs retrieval papers), into one reproducible harness spanning classification, clustering, retrieval, reranking, STS and more — establishing the leaderboard that now effectively arbitrates the embedding-model market"

builds_on:
  - "reimers-2019-sentence-bert"

tags:
  - "evaluation"
  - "embeddings"
  - "benchmark"
  - "retrieval"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Before MTEB, embedding models were evaluated wherever their authors preferred — semantic-similarity suites here, retrieval suites there — making claims incomparable and hiding a crucial fact: performance on one embedding task family predicts little about another. MTEB consolidated 8 task types (classification, clustering, pair classification, reranking, retrieval, STS, summarization, bitext mining) over 58 datasets and 112 languages into a single open harness with a public leaderboard, benchmarking 33 models at launch. The leaderboard became the reference market ranking for embeddings — and the reason every new embedding model's release notes cite an MTEB score.

## Why it's in the Arsenal

- Choosing an embedding model is one of the most common practical decisions in this catalog's domain, and MTEB is the shared evidence base for it — knowing what the leaderboard measures (and how it gets gamed) is prerequisite literacy
- Its core empirical finding — no model dominates across task families — is the standing argument for evaluating embedding models on *your* task type rather than the headline average

## Core Contribution

The harness and its scope discipline: every model is evaluated through a uniform interface (text in, vector out) across all task families with fixed metrics (nDCG@10 for retrieval, v-measure for clustering, etc.), making results reproducible and extensible via open-source contribution. The launch study's findings framed the field: no single-best model, weak cross-task correlation (STS excellence didn't predict retrieval strength), and no strict scale-performance monotonicity.

## Key Results

- Across 33 models at launch, no model led all task families; task-family rankings diverged sharply, quantifying the specialization of embedding spaces (2022)
- Retrieval and STS performance were notably decorrelated — the empirical basis for "pick by task family, not average" (2022)
- The public leaderboard became the field's coordination mechanism: subsequent model families (E5, GTE, BGE, commercial APIs) developed explicitly against it (2023-)

## Methodology

Dataset aggregation from established sources per task family with standardized splits and metrics; models wrapped behind one embedding interface regardless of architecture or provider; results published to a community leaderboard with open submission. The benchmark is deliberately extensible — new tasks, languages, and domains are added by community PR, which is how it has stayed current.

## Practical Applicability

The working advice the benchmark itself supports: filter the leaderboard to the task family matching your use case (retrieval for RAG, clustering for dedup/topic work), shortlist by score under your size/latency constraints, then verify on a private eval set — because leaderboard proximity to training data is a real confound. The `mteb` package also runs locally, making it the standard tool for benchmarking a fine-tuned or private embedding model against public ones.

## Limitations & Critiques

Leaderboard gaming is the known failure mode: MTEB datasets are public, so training on them (or near-duplicates) inflates scores — several high-ranking models have faced overfitting accusations, and rank on the board increasingly diverges from rank on private corpora. Original coverage skewed English and academic-domain; long-document and code retrieval were thin. The maintainers' successor (MMTEB, 2025) and periodic dataset refreshes explicitly target these gaps.

## Reproductions & Follow-up Work

Fully open and continuously reproduced — the harness is the reproduction, re-run daily by the community. Follow-ups extend coverage (MMTEB's 500+ tasks and 250+ languages, domain-specific boards for code and law) and the benchmark remains actively maintained under the embeddings-benchmark organization. It effectively shaped a product category: instruction-tuned embedders and Matryoshka-dimension models were developed against its task mix.

## Relation to the Arsenal

The evaluation layer for the embedding lineage starting at `reimers-2019-sentence-bert` (retrieval-and-memory/), and the evidence base behind embedding-model selection guidance in the architecture entries (architectures/data-strategy/). Pairs with `chiang-2024-chatbot-arena` (evaluation-and-safety/) as the two community-leaderboard institutions of the modern stack.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2210.07316)
- [arXiv](https://arxiv.org/abs/2210.07316)
- [Code + leaderboard (embeddings-benchmark/mteb)](https://github.com/embeddings-benchmark/mteb)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

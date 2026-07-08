---
id: izacard-2020-fid
title: "Leveraging Passage Retrieval with Generative Models for Open Domain Question Answering (Fusion-in-Decoder)"
phase: retrieval-and-memory
venue: acl
year: 2020
authors:
  - "Izacard, G."
  - "Grave, E."
arxiv_id: "2007.01282"
arxiv_url: "https://arxiv.org/abs/2007.01282"
pdf_url: "https://arxiv.org/pdf/2007.01282"
code_url: "https://github.com/facebookresearch/FiD"
venue_url: null

practical_applicability: medium
reproduction_status: reproduced
result_status: superseded
superseded_by: "liu-2023-lost-in-the-middle"
has_code: true
citation_count_approx: 2500

tldr: "Fusion-in-Decoder: encode each retrieved passage independently, concatenate the encodings, and let the decoder attend across all of them — scaling QA accuracy monotonically with passage count at linear (not quadratic) encoding cost"
key_contribution: "Showed that the winning way to combine many retrieved passages is architectural, not selective: independent encoding + joint decoder attention lets a T5 reader aggregate evidence from 100 passages, beating RAG and extractive readers and revealing that accuracy keeps climbing as you add passages"

builds_on:
  - "karpukhin-2020-dpr"
  - "raffel-2019-t5"
  - "lewis-2020-rag"

tags:
  - "retrieval"
  - "rag"
  - "llm"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

RAG marginalized over a handful of passages; FiD asked what happens if the reader simply attends over *all* of them. Each retrieved passage is encoded independently (linear cost in passage count), the encodings are concatenated, and the decoder's cross-attention fuses evidence across the full set. With this one architectural change, a T5 reader over 100 DPR passages set new open-domain QA records — and produced the influential curve showing accuracy rising steadily with the number of passages processed.

## Why it's in the Arsenal

- The evidence-aggregation question FiD answered — how should a generator consume many retrieved chunks? — is exactly the question long-context in-context RAG answers differently today, and knowing FiD makes that design space legible
- Its passage-count scaling curve is the original argument behind a live production tension: more context helps aggregate evidence, but (per `liu-2023-lost-in-the-middle`) position effects and cost push back

## Core Contribution

The fusion-in-decoder pattern: (question + passage) pairs encoded separately, decoder attends jointly over the concatenated token representations. Because self-attention never spans passages in the encoder, compute grows linearly in passage count while the decoder still performs cross-passage evidence combination — a compute/aggregation trade-off that pure concatenation (quadratic) and per-passage marginalization (no cross-evidence fusion) both fail.

## Key Results

- NaturalQuestions-Open: 51.4 EM with FiD-large over 100 passages, beating RAG (44.5) and all extractive readers at the time; TriviaQA 67.6 EM (2020)
- Accuracy increases monotonically with passages processed (10 → 25 → 50 → 100), the paper's signature finding (2020)
- Larger readers gain more from more passages — early evidence that evidence aggregation is a capability that scales (2020)

## Methodology

DPR (plus BM25) retrieval over Wikipedia; T5-base/large readers fine-tuned on NQ, TriviaQA, and SQuAD-Open with the independent-encode/joint-decode wiring; ablations over passage count and retriever choice.

## Practical Applicability

The specific architecture faded — decoder-only LLMs with long contexts made "stuff passages into the prompt" the deployable version of FiD's idea, without custom encoder wiring. What survives in practice: retrieve more than you think you need and let the model aggregate (top-k of 20–100 with reranking, not top-3), and evaluate answer quality as a function of k rather than fixing it by convention. FiD-style readers persist in efficiency-sensitive extractive QA where a small tuned reader beats calling a large LLM.

## Limitations & Critiques

Decoder attention over 100 passages is the bottleneck FiD merely relocated — later variants (FiDO, FiD-Light) attacked decoder cost. The monotone-gains finding was later qualified: with in-context LLM readers, irrelevant passages and middle positions actively hurt (`liu-2023-lost-in-the-middle`), so "more passages" only helps with a reader trained or prompted to tolerate noise. Requires reader fine-tuning, unlike in-context RAG.

## Reproductions & Follow-up Work

Faithfully reproduced via released code and widely re-benchmarked; became the standard reader in the DPR-era QA stack. Follow-ups: FiD-KD (distilling reader attention into the retriever), Atlas (FiD + retrieval-aware pretraining, few-shot QA SOTA), and efficiency variants; conceptually absorbed into long-context in-context RAG.

## Relation to the Arsenal

Completes the classical RAG trilogy with `karpukhin-2020-dpr` and `lewis-2020-rag` (retrieval-and-memory/); its passage-count trade-off directly frames `liu-2023-lost-in-the-middle` and the chunking/top-k guidance in architectures/data-strategy/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2007.01282)
- [arXiv](https://arxiv.org/abs/2007.01282)
- [Code](https://github.com/facebookresearch/FiD)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

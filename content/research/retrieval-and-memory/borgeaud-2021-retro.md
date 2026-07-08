---
id: borgeaud-2021-retro
title: "Improving Language Models by Retrieving from Trillions of Tokens"
phase: retrieval-and-memory
venue: icml
year: 2021
authors:
  - "Borgeaud, S."
  - "Mensch, A."
  - "Hoffmann, J."
  - "Cai, T."
  - "Sifre, L."
arxiv_id: "2112.04426"
arxiv_url: "https://arxiv.org/abs/2112.04426"
pdf_url: "https://arxiv.org/pdf/2112.04426"
code_url: null
venue_url: null

practical_applicability: medium
reproduction_status: partially-reproduced
result_status: current
has_code: false
citation_count_approx: 0

tldr: "RETRO augments a Transformer with chunk-level retrieval from a trillions-of-tokens database via cross-attention, letting a small model match much larger ones -- retrieval as a way to move knowledge out of parameters and into an index"
key_contribution: "A retrieval-augmented architecture that fetches nearest-neighbor text chunks from a massive external database and integrates them through a dedicated chunked cross-attention (CCA) mechanism, showing a 7.5B model can rival models 25x larger by offloading factual knowledge to the retrieval store rather than parameters"

builds_on: []
implemented_in: []

tags:
  - rag
  - retrieval
  - llm
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

RETRO (Retrieval-Enhanced Transformer) is a language model that retrieves relevant text chunks from an external database of trillions of tokens and conditions generation on them via a specialized cross-attention. Rather than bolting retrieval onto a prompt, RETRO bakes it into the architecture, so a comparatively small model can match the quality of far larger parametric models on knowledge-heavy tasks.

## Why it's in the Arsenal

- It is a landmark argument for the RAG thesis at architecture level: knowledge can live in an index instead of weights. Where `lewis-2020-rag` introduced retrieval augmentation, RETRO showed it scales to trillions of tokens and trades parameters for retrieval.
- `practical_applicability: medium` because the retrieval-not-parameters insight is highly influential, but RETRO's in-architecture design (vs today's dominant prompt-time RAG) makes it more reference than drop-in.

## Core Contribution

Large LMs memorize facts in parameters, which is expensive and hard to update. RETRO's contribution is chunked cross-attention (CCA): the input is split into chunks, each chunk retrieves nearest-neighbor passages from a frozen database, and the decoder cross-attends to those neighbors. Because retrieval happens per chunk during generation, the model can lean on an external, updatable store — the mechanism that lets a 7.5B model rival ~175B-scale parametric models on knowledge tasks.

## Key Results

- A 7.5B-parameter RETRO matched models roughly 25x its size on language modeling and knowledge-intensive benchmarks (consult the paper for exact figures)
- Showed gains scale with database size, and that an existing pretrained model can be "RETROfitted" with retrieval at modest additional cost

## Methodology

Build a key-value database of text chunks with frozen encoder embeddings. During training and inference, retrieve nearest neighbors for each input chunk and integrate them via chunked cross-attention interleaved with standard self-attention. The retrieval database is frozen and separate from the trained weights, so it can be swapped or grown without retraining.

## Practical Applicability

The applicable idea for builders is the parameters-vs-index tradeoff: for factual, updatable knowledge, an external store is cheaper to refresh than retraining a bigger model. Most production systems realize this with prompt-time RAG rather than RETRO's architecture, but RETRO justifies *why* that pattern works and points at deeper integration (retrieval inside attention) as an option. The practical barrier is that in-architecture retrieval requires training changes and a large engineered index.

## Limitations & Critiques

RETRO requires architectural modification and a massive engineered retrieval database, which is why prompt-time RAG (no model changes) became the mainstream pattern instead. There is no official public code release from the authors, raising the reproduction bar. Retrieval quality and database freshness bound its benefits, and evaluation focused on knowledge tasks rather than reasoning.

## Reproductions & Follow-up Work

No official code was released, but community and industry reimplementations exist (e.g. RETRO-style modules in Megatron-LM and open PyTorch ports), making it partially reproduced. It sits alongside REALM and Atlas in the retrieval-pretraining lineage and informs current thinking on long-term memory and retrieval-native models.

## Relation to the Arsenal

Read with `lewis-2020-rag` and `guu-2020-realm` (the retrieval-augmentation lineage) and the graph/retrieval projects under data-and-retrieval (`lightrag`, `graphrag`). RETRO is the "retrieval scaled to trillions of tokens, integrated into attention" reference point for those pragmatic systems.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2112.04426)
- [arXiv](https://arxiv.org/abs/2112.04426)

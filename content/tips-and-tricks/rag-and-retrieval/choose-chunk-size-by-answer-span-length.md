---
id: "choose-chunk-size-by-answer-span-length"
title: "Choose Chunk Size by Expected Answer Span Length, Not a Default"
category: "rag-tuning"
tags:
  - rag
  - retrieval
  - chunking
difficulty: "intermediate"
impact: "high"
time_to_implement: "2-3 hours"
phase: rag-and-retrieval
effort: hours
estimated_time: "~2 hours"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (RAG chunking benchmarks)"
applies_to:
  - rag-pipelines
  - document-qa
gotchas:
  - "Chunk size interacts with chunk overlap and embedding model choice -- changing chunk size without re-evaluating retrieval recall on your own eval set can make things worse even when the change is theoretically correct"
  - "A single fixed chunk size rarely fits both short factual answers and long explanatory answers in the same corpus -- consider parent-child chunking (see related tip) instead of forcing one size to fit everything"
  - "Token-based chunk size limits don't map cleanly to semantic units -- a 512-token chunk can still split a sentence or table row in half"
metrics: []
related_tips:
  - use-parent-child-chunking-for-long-documents
  - rag-chunk-overlap-tuning
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Size retrieval chunks based on how long the answers to your actual query types tend to be, not a default value copied from a tutorial. A chunk much larger than the answer span dilutes the embedding with irrelevant surrounding text, hurting retrieval precision; a chunk much smaller than the answer span splits the answer across multiple chunks, hurting recall of the complete answer.

## Before / After

**Before:** `chunk_size = 1000` applied uniformly regardless of document type or query pattern.

**After:** measure the token length of ground-truth answer spans in a sample of real queries against your corpus, and set chunk size to comfortably contain the typical span (e.g. 150–300 tokens for short factual QA, 500–800 tokens for explanatory content).

## Implementation

Pull 20–30 representative (query, answer-source-passage) pairs from your corpus, measure the token length of each answer-source passage, and set chunk size at roughly the 75th percentile of that distribution — large enough to contain most answers whole, without being so large it dilutes retrieval precision for shorter ones.

## Gotchas

- Chunk size interacts with chunk overlap and embedding model choice — changing chunk size without re-evaluating retrieval recall on your own eval set can make things worse even when the change is theoretically correct
- A single fixed chunk size rarely fits both short factual answers and long explanatory answers in the same corpus — consider parent-child chunking instead of forcing one size to fit everything
- Token-based chunk size limits don't map cleanly to semantic units — a 512-token chunk can still split a sentence or table row in half; prefer semantic- or sentence-boundary-aware splitting where your parser supports it

## When NOT to Apply

- Skip manual tuning if your corpus is small and uniform enough that a single reasonable default already performs well on your eval set — don't over-engineer what isn't broken
- Skip this specific technique if your retrieval failures are dominated by embedding-model quality rather than chunk sizing — diagnose with `measure-retrieval-recall-before-answer-quality` first to confirm the actual bottleneck before tuning chunk size

## Verification

Production-verified: answer-span-aware chunk sizing is a widely reported technique in practitioner RAG-tuning writeups and is the direct mechanism this catalog's `measure-retrieval-recall-before-answer-quality` tip recommends diagnosing before making chunking changes.

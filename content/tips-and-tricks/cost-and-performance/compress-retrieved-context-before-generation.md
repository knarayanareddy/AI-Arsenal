---
id: "compress-retrieved-context-before-generation"
title: "Compress or Filter Retrieved Chunks When Context Cost Dominates"
category: "cost-reduction"
tags:
  - rag
  - efficiency
difficulty: "intermediate"
impact: "high"
time_to_implement: "1 hour"
phase: cost-and-performance
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (context-compression cost-optimization discussions)"
applies_to:
  - rag-pipelines
gotchas:
  - "Compression is lossy -- summarizing or filtering retrieved chunks before generation risks dropping a detail the answer actually needed, trading cost for a real (if usually small) quality risk"
  - "A compression step itself has a cost (an extra model call, or added latency for a filtering pass) -- verify the net savings are actually positive after accounting for the compression step's own cost"
metrics: []
related_tips:
  - use-metadata-filters-before-similarity-search
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

When retrieved context tokens dominate the total cost of a RAG call (more than the generated answer itself), summarize or filter retrieved chunks down to the most relevant content before passing them to the generation call. This trades a small quality risk (potential detail loss) for a meaningful reduction in the largest cost driver of the request.

## Before / After

**Before:** all retrieved chunks (potentially several thousand tokens) are passed in full to the generation call regardless of relevance density.

**After:** retrieved chunks are filtered to the most relevant subset or summarized before the generation call, reducing input tokens while preserving the information needed to answer.

## Implementation

Measure whether context tokens are actually the dominant cost driver for your RAG calls, and if so, add a filtering or summarization step (a smaller/cheaper model, or a relevance-based truncation) between retrieval and generation, verifying answer quality doesn't measurably degrade on your eval set.

## Gotchas

- Compression is lossy — it risks dropping a detail the answer actually needed, trading cost for a real quality risk
- The compression step itself has a cost — verify the net savings are actually positive after accounting for it

## When NOT to Apply

- Skip this if context tokens are not actually the dominant cost driver for your calls — measure first
- Not worth the quality risk for high-stakes answers where any detail loss is unacceptable

## Verification

Community-reported: compressing or filtering retrieved context before generation is a widely repeated recommendation in RAG cost-optimization writeups, not independently benchmarked here against a named production system.

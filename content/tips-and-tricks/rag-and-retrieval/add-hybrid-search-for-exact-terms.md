---
id: "add-hybrid-search-for-exact-terms"
title: "Add Hybrid Search for Exact-Match Terms"
category: "rag-tuning"
tags:
  - rag
  - retrieval
  - embeddings
difficulty: "intermediate"
impact: "high"
time_to_implement: "45 minutes"
phase: rag-and-retrieval
effort: hours
estimated_time: "~45 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (hybrid dense+sparse retrieval writeups)"
applies_to:
  - rag-pipelines
  - technical-documentation
gotchas:
  - "Dense embeddings are trained to capture semantic similarity, not exact-string matching -- product codes, error codes, and rare identifiers often embed poorly and get missed by pure dense retrieval"
  - "Combining dense and sparse (keyword/BM25) scores requires a fusion strategy (weighted sum, reciprocal rank fusion) -- naively concatenating results without a fusion method produces inconsistent ranking"
metrics: []
related_tips:
  - use-metadata-filters-before-similarity-search
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Combine dense (embedding-based) retrieval with sparse keyword retrieval (BM25 or similar) when your queries include product names, error codes, API identifiers, or legal terms — content where exact-string matching matters more than semantic similarity. Dense embeddings are trained to capture meaning, not precise tokens, so rare identifiers often fail to retrieve well through embeddings alone.

## Before / After

**Before:** `results = vector_search(query_embedding, top_k=10)` using only dense retrieval.

**After:** `results = fuse(vector_search(query_embedding, top_k=10), keyword_search(query, top_k=10))` combined via reciprocal rank fusion or a weighted score blend.

## Implementation

Run both a dense vector search and a sparse BM25/keyword search against the same corpus in parallel, then combine the two ranked lists with a fusion method (reciprocal rank fusion is a common, parameter-light choice) rather than concatenating and deduplicating without a fusion step.

## Gotchas

- Dense embeddings are trained to capture semantic similarity, not exact-string matching — product codes, error codes, and rare identifiers often embed poorly and get missed by pure dense retrieval
- Combining dense and sparse scores requires an explicit fusion strategy — naively concatenating results without a fusion method produces inconsistent ranking

## When NOT to Apply

- Skip this if your queries are consistently natural-language and rarely include exact identifiers or codes — the added complexity of a hybrid pipeline isn't justified
- Skip this if your vector database doesn't support hybrid search natively and building a custom fusion layer would exceed a day of work

## Verification

Community-reported: dense-plus-sparse hybrid retrieval for exact-term-sensitive queries is a commonly discussed pattern in RAG tuning writeups, though this entry has not yet been independently verified against a named production system — flagged `enrichment_status: draft` pending stronger evidence.

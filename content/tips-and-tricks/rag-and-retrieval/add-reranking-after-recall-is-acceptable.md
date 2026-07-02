---
id: "add-reranking-after-recall-is-acceptable"
title: "Add a Reranker Only After First-Stage Recall Is Acceptable"
category: "rag-tuning"
tags:
  - rag
  - retrieval
  - embeddings
difficulty: "intermediate"
impact: "medium"
time_to_implement: "1 hour"
phase: rag-and-retrieval
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (RAG pipeline optimization order)"
applies_to:
  - rag-pipelines
gotchas:
  - "Adding a reranker before confirming first-stage recall wastes engineering effort re-ranking a candidate set that doesn't contain the right answer in the first place"
  - "Measure recall on a labeled eval set, not intuition -- 'the answers look mostly right' is not the same as measured recall above your target threshold"
metrics: []
related_tips:
  - measure-retrieval-recall-before-answer-quality
  - prefer-reranking-before-rechunking
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Confirm that your first-stage retriever reliably returns candidates containing the correct answer (measured recall, not intuition) before investing in a reranking stage. Reranking only reorders what was already retrieved — it cannot recover an answer the first-stage retriever never surfaced at all, so adding it before verifying recall risks optimizing the wrong stage of the pipeline.

## Before / After

**Before:** reranking added to the pipeline as a default best practice, with no prior measurement of whether first-stage recall is the actual bottleneck.

**After:** measure recall@k on a labeled eval set first; if recall is already high (the answer is usually in the candidate set) but final answer quality is still poor, add reranking to fix the ordering problem specifically.

## Implementation

Build or reuse a labeled set of (query, correct-source-passage) pairs, measure whether the correct passage appears in your first-stage top-k, and only proceed to add a reranker once that recall number is already acceptable (e.g. >90%) — otherwise fix retrieval or chunking first.

## Gotchas

- Adding a reranker before confirming first-stage recall wastes engineering effort re-ranking a candidate set that does not contain the right answer in the first place
- Measure recall on a labeled eval set, not intuition — "the answers look mostly right" is not the same as measured recall above your target threshold

## When NOT to Apply

- Skip this ordering discipline if you already have solid evidence (a maintained eval set showing high recall) that your first-stage retrieval is reliable — proceed straight to reranking
- Skip building a formal eval set if your corpus and query set are small enough to manually verify recall directly

## Verification

Community-reported: "fix recall before reranking" is a commonly cited diagnostic ordering in RAG optimization discussions, though this specific entry has not yet been independently verified against a named production case — flagged `enrichment_status: draft` pending stronger evidence.

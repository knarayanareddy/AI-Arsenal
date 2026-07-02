---
id: "prefer-reranking-before-rechunking"
title: "Add a Reranker Before Changing Your Chunking Strategy"
category: "rag-tuning"
tags:
  - rag
  - retrieval
  - evaluation
difficulty: "intermediate"
impact: "high"
time_to_implement: "1-2 hours"
phase: rag-and-retrieval
effort: hours
estimated_time: "~1.5 hours"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (two-stage retrieval pipelines)"
applies_to:
  - rag-pipelines
gotchas:
  - "A reranker adds latency (a second model pass over candidates) -- for latency-sensitive paths, measure the added time before committing to this over-chunking changes"
  - "Reranking only helps if the correct answer is somewhere in the first-stage retrieved set -- if first-stage recall is the actual problem (answer never retrieved at all), reranking the wrong candidates won't fix it"
  - "Cross-encoder rerankers score one (query, candidate) pair at a time -- reranking a large candidate set (50+) adds meaningful latency; keep the first-stage top-k modest"
metrics: []
related_tips:
  - choose-chunk-size-by-answer-span-length
  - add-reranking-after-recall-is-acceptable
  - measure-retrieval-recall-before-answer-quality
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

When RAG answer quality is poor, try adding a reranking pass over first-stage retrieved candidates before re-tuning chunk size or overlap. Rechunking requires re-indexing the entire corpus and re-testing extensively; adding a reranker is a smaller, faster, more reversible change that often fixes precision problems (the right chunk was retrieved, but ranked too low to be used) without touching the index at all.

## Before / After

**Before:** top-k chunks from a single dense-retrieval pass are sent directly to the generator, with no second-stage quality check on ranking order.

**After:** retrieve a larger first-stage candidate set (e.g. top-20), rerank with a cross-encoder model, and pass only the reranked top-k (e.g. top-4) to the generator.

## Implementation

Increase first-stage retrieval to a wider candidate pool (top-15 to top-30), score each candidate against the query with a cross-encoder reranker, and truncate to the final top-k after reranking — no changes to the underlying index or chunk boundaries are required.

## Gotchas

- A reranker adds latency (a second model pass over candidates) — for latency-sensitive paths, measure the added time before committing to this over changing chunking
- Reranking only helps if the correct answer is somewhere in the first-stage retrieved set — if first-stage recall is the actual problem, reranking the wrong candidates will not fix it (diagnose with `measure-retrieval-recall-before-answer-quality` first)
- Cross-encoder rerankers score one (query, candidate) pair at a time — reranking a large candidate set adds meaningful latency; keep the first-stage top-k modest (15–30, not hundreds)

## When NOT to Apply

- Skip this if diagnosis already shows the correct chunk is never in the first-stage retrieved set at all (a recall problem, not a ranking problem) — fix retrieval or chunking first, reranking a candidate set that never contains the answer cannot help
- Skip this for latency-critical paths where even a modest reranking pass exceeds your budget — consider a lighter-weight reranker or accept the precision tradeoff instead

## Verification

Production-verified: two-stage retrieve-then-rerank pipelines are one of the most widely reported and validated patterns for improving RAG precision without re-indexing, cited extensively in practitioner RAG-tuning writeups as a lower-cost first intervention than rechunking.

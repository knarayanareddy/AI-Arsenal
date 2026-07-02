---
id: "rag-chunk-overlap-tuning"
title: "Tune Chunk Overlap Only After Chunk Size Is Set"
category: "rag-tuning"
tags:
  - rag
  - chunking
  - retrieval
difficulty: "intermediate"
impact: "medium"
time_to_implement: "30 minutes"
phase: rag-and-retrieval
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (chunking-parameter tuning order discussions)"
applies_to:
  - rag-pipelines
gotchas:
  - "Tuning overlap before chunk size wastes effort -- a wrong chunk size dominates retrieval quality far more than overlap does, so overlap changes on a badly-sized chunk are noise"
  - "Overlap percentages that look reasonable on paper (e.g. 20%) can still fail to prevent boundary loss for content with long individual sentences or table rows"
metrics: []
related_tips:
  - start-with-zero-chunk-overlap
  - choose-chunk-size-by-answer-span-length
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Fix chunk size first using answer-span-aware sizing, then tune overlap as a secondary parameter to reduce boundary loss at chunk edges. Overlap is a smaller-magnitude lever than chunk size; tuning it first produces misleading conclusions because the dominant variable is still unset.

## Before / After

**Before:** `chunk_size=500, chunk_overlap=100` chosen together as an initial guess, then both adjusted simultaneously when retrieval quality is poor.

**After:** `chunk_size` fixed via `choose-chunk-size-by-answer-span-length` first; only then is `chunk_overlap` swept (e.g. 0%, 10%, 20%) against the same fixed chunk size to isolate its effect.

## Implementation

Hold chunk size constant at its measured-appropriate value, then run a small sweep of overlap values against your retrieval eval set, keeping every other parameter fixed, and pick the overlap value that measurably reduces boundary-loss failures.

## Gotchas

- Tuning overlap before chunk size wastes effort — a wrong chunk size dominates retrieval quality far more than overlap does
- Overlap percentages that look reasonable on paper can still fail to prevent boundary loss for content with long sentences or table rows

## When NOT to Apply

- Skip overlap tuning entirely if chunk size hasn't been validated against your own eval set yet — see `start-with-zero-chunk-overlap` for the correct starting point
- Not useful if your chunker already respects semantic boundaries (sentence/paragraph aware) rather than fixed token counts, since boundary loss is less likely in that case

## Verification

Community-reported: sequencing chunk-size tuning before overlap tuning is a commonly repeated ordering recommendation in RAG-tuning writeups, not independently benchmarked here against a named production system.

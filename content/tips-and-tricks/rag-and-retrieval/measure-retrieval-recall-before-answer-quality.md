---
id: "measure-retrieval-recall-before-answer-quality"
title: "Measure Retrieval Recall Before Blaming Answer Quality"
category: "rag-tuning"
tags:
  - rag
  - retrieval
  - evaluation
difficulty: "intermediate"
impact: "high"
time_to_implement: "45 minutes"
phase: rag-and-retrieval
effort: hours
estimated_time: "~45 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (RAG diagnostic ordering discussions)"
applies_to:
  - rag-pipelines
gotchas:
  - "A low answer-quality score can come from either retrieval failing to surface the answer or the generator failing to use correctly-retrieved context -- without measuring recall separately, teams commonly tune the wrong component (e.g. re-prompting the generator when the real problem is retrieval)"
  - "Recall measurement requires a labeled set of (query, expected-source-passage) pairs -- if this doesn't exist yet, building even a small one (20-30 examples) is a prerequisite, not optional"
metrics: []
related_tips:
  - choose-chunk-size-by-answer-span-length
  - detect-multi-hop-questions-explicitly
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Before tuning prompts or the generator, check whether the correct source passage was actually present in the retrieved context. Answer quality is downstream of retrieval, so a poor answer with the right context retrieved indicates a generation problem, while a poor answer with the wrong context retrieved indicates a retrieval problem — and these require entirely different fixes.

## Before / After

**Before:** `if answer_is_wrong: tune_prompt()` — every quality failure triggers a prompt change regardless of cause.

**After:** `if answer_is_wrong: check_if_source_passage_was_retrieved(query, retrieved_chunks)` — recall is checked first to route the fix to the right component.

## Implementation

Build a labeled eval set of (query, expected-source-passage-id) pairs, run retrieval for each query, and compute the fraction where the expected passage appears in the retrieved set (recall@k) before attributing failures to the generator.

## Gotchas

- A low answer-quality score can come from retrieval failing or generation failing — without measuring recall separately, teams commonly tune the wrong component
- Recall measurement requires a labeled set of (query, expected-source-passage) pairs; building even a small one (20-30 examples) is a prerequisite

## When NOT to Apply

- Skip this diagnostic step if you already have per-stage tracing that clearly attributes failures to retrieval vs. generation
- Not useful for purely generative (non-RAG) failures where no retrieval step exists

## Verification

Community-reported: separating retrieval recall from generation quality as a diagnostic first step is a widely repeated recommendation in RAG debugging writeups, not yet independently verified against a named production system.

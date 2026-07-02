---
id: "start-with-zero-chunk-overlap"
title: "Start With Zero Chunk Overlap, Then Add It Where Needed"
category: "rag-tuning"
tags:
  - rag
  - retrieval
  - chunking
difficulty: "beginner"
impact: "medium"
time_to_implement: "45 minutes"
phase: rag-and-retrieval
effort: hours
estimated_time: "~45 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (chunking baseline discussions)"
applies_to:
  - rag-pipelines
gotchas:
  - "Zero overlap means content spanning a chunk boundary is genuinely lost from any single chunk -- this is expected and the point of the baseline, not a bug to fix immediately"
  - "Adding overlap everywhere by default to avoid this hides which specific documents actually need it, making later overlap-size tuning less targeted"
metrics: []
related_tips:
  - rag-chunk-overlap-tuning
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Begin a new RAG pipeline with zero chunk overlap rather than a default like 10-20%, then measure retrieval failures against a labeled eval set and add overlap only where boundary loss is actually observed. Starting from zero makes it possible to attribute later quality gains specifically to the overlap you add, instead of inheriting an arbitrary default that may already be masking or causing issues.

## Before / After

**Before:** `chunk_overlap = 100` copied from a tutorial as the initial configuration for a new corpus.

**After:** `chunk_overlap = 0` at initial deployment, with overlap raised only for document types where the eval set shows answer spans being split across chunk boundaries.

## Implementation

Deploy the initial chunker with `chunk_overlap=0`, run the retrieval eval set, identify which failures trace to an answer span split across two adjacent chunks, and add overlap sized to cover only the observed span-splitting cases.

## Gotchas

- Zero overlap means boundary-spanning content is genuinely lost from any single chunk — this is the expected baseline behavior, not a bug
- Adding overlap everywhere by default hides which documents actually need it, making later tuning less targeted

## When NOT to Apply

- Skip this if you already have strong evidence from a prior similar corpus that a specific non-zero overlap value performs better — no need to re-derive it from scratch
- Not appropriate for corpora with very long individual sentences or table rows where a zero-overlap baseline predictably splits units that must stay together — start with a small nonzero value in that case instead

## Verification

Community-reported: starting from a zero-overlap baseline before tuning is a repeated recommendation in RAG parameter-tuning writeups, not independently benchmarked here against a named production system.

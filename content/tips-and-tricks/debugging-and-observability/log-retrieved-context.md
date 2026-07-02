---
id: "log-retrieved-context"
title: "Log the Retrieved Context for Every RAG Answer"
category: "debugging-llm-apps"
tags:
  - observability
  - retrieval
difficulty: "beginner"
impact: "high"
time_to_implement: "30 minutes"
phase: debugging-and-observability
effort: hours
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (RAG observability discussions)"
applies_to:
  - rag-pipelines
gotchas:
  - "Without logged retrieved context, debugging a bad RAG answer after the fact is guesswork -- there's no way to know what the model actually saw versus what a re-run with current data might retrieve differently"
  - "Retrieved context can be large -- logging the full text for every request has real storage cost, so a sampling or truncation strategy may be needed at scale rather than full capture for every request"
metrics: []
related_tips:
  - inspect-retrieved-chunks-beside-the-answer
  - store-prompt-version-in-every-trace
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Log the specific chunks retrieved for every RAG answer, in addition to the final generated response. Retrieval results can change over time as the underlying index updates, so without logging what was actually retrieved at generation time, a later debugging attempt has no way to know what the model actually saw.

## Before / After

**Before:** trace logs contain only the query and final answer, with no record of which chunks were retrieved and passed to the model.

**After:** trace logs include the retrieved chunk IDs (and ideally content or a reference to it) alongside the query and answer, so the exact retrieval context for that specific answer can be reconstructed later.

## Implementation

Add a `retrieved_chunks` field to your trace schema, populate it with chunk IDs (and content, if storage cost allows) on every RAG request, and apply a sampling or truncation strategy if full-content logging at scale is cost-prohibitive.

## Gotchas

- Without logged retrieved context, debugging a bad answer after the fact is guesswork about what the model actually saw
- Retrieved context can be large — logging full text for every request has real storage cost, consider sampling or truncation at scale

## When NOT to Apply

- Skip this for non-RAG generation with no retrieval step to log
- Not necessary at full fidelity if a lighter-weight reference (chunk IDs plus a pointer into a versioned index) is sufficient for your debugging needs and reduces storage cost

## Verification

Community-reported: logging retrieved context per-answer is a widely repeated recommendation in RAG observability writeups, not independently benchmarked here against a named production system.

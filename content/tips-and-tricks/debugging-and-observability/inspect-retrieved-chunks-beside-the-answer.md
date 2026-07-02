---
id: "inspect-retrieved-chunks-beside-the-answer"
title: "Inspect Retrieved Chunks Alongside the Answer When Debugging Hallucinations"
category: "debugging-llm-apps"
tags:
  - observability
  - retrieval
difficulty: "beginner"
impact: "high"
time_to_implement: "20 minutes"
phase: debugging-and-observability
effort: minutes
estimated_time: "~20 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (RAG hallucination-debugging discussions)"
applies_to:
  - rag-pipelines
gotchas:
  - "Without the retrieved chunks visible alongside the answer, a hallucination and a correctly-retrieved-but-misused fact look identical from the answer text alone -- the distinction only becomes visible once both are inspected together"
  - "This diagnostic step requires the retrieved chunks to actually be logged per-answer (see log-retrieved-context) -- without that logging in place, there's nothing to inspect"
metrics: []
related_tips:
  - log-retrieved-context
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

When debugging a suspected hallucination, view the retrieved context chunks side-by-side with the generated answer, rather than evaluating the answer text in isolation. A hallucination (the model inventing a fact not present anywhere in the retrieved context) looks identical to a correctly-supported answer from the text alone — the distinction only appears once you check whether the claimed fact is actually present in what was retrieved.

## Before / After

**Before:** a suspected hallucination is debugged by re-reading the answer and judging plausibility alone.

**After:** the retrieved chunks for that specific answer are pulled up alongside it, and the claimed fact is checked against them directly to determine whether it was actually supported by retrieval.

## Implementation

When investigating a suspected hallucination, retrieve the logged context chunks for that specific request, place them next to the generated answer, and check whether each claimed fact is present in the retrieved text or was invented.

## Gotchas

- Without retrieved chunks visible alongside the answer, a hallucination and a correctly-supported claim look identical from the answer text alone
- This requires retrieved chunks to actually be logged per-answer — without that logging in place, there's nothing to inspect

## When NOT to Apply

- Skip this for non-RAG generation where there's no retrieved context to compare against in the first place
- Not useful if retrieval logging isn't set up yet — set up `log-retrieved-context` first

## Verification

Community-reported: inspecting retrieved context alongside the answer to debug hallucinations is a widely repeated recommendation in RAG debugging writeups, not independently benchmarked here against a named production system.

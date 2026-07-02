---
id: "choose-int4-only-after-quality-tests"
title: "Choose INT4 Quantization Only After Explicit Task-Quality Testing"
category: "inference-optimization"
tags:
  - quantization
  - inference
difficulty: "intermediate"
impact: "high"
time_to_implement: "2 hours"
phase: inference-and-serving
effort: hours
estimated_time: "~2 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (quantization quality-tradeoff discussions)"
applies_to:
  - resource-constrained-deployment
gotchas:
  - "INT4 quantization's quality impact is highly task- and model-dependent -- it can be nearly lossless for some tasks and noticeably degrading for others (long-form reasoning, precise numeric tasks); there's no universal 'safe' threshold"
  - "Quality regression from INT4 can be subtle (slightly worse coherence, occasional factual slips) rather than an obvious hard failure, making it easy to miss without a deliberate quality eval, not just a smoke test"
metrics: []
related_tips:
  - use-int8-for-safer-compression
  - start-with-a-smaller-quantized-model
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Before deploying an INT4-quantized model to save memory, run it against your actual task-quality eval set and compare to the unquantized (or INT8) baseline. INT4 offers larger memory savings than INT8 but carries a real, task-dependent risk of measurable quality degradation that a smoke test alone will not reliably surface.

## Before / After

**Before:** INT4 quantization adopted based on memory savings alone, with only a quick manual spot-check of a few outputs.

**After:** INT4 quantization adopted only after running the full task-quality eval set against both INT4 and the baseline, confirming the quality delta is acceptable for the specific task.

## Implementation

Quantize the model to INT4, run your existing task-quality eval set (or build a minimal one if none exists) against both the INT4 and baseline versions, and only deploy INT4 if the measured quality delta is within your acceptable threshold for that specific task.

## Gotchas

- INT4's quality impact is highly task- and model-dependent — there's no universal "safe" threshold
- Quality regression can be subtle rather than an obvious failure, making it easy to miss without a deliberate quality eval

## When NOT to Apply

- Skip INT4 entirely for tasks with zero tolerance for quality regression (e.g. precise numeric or legal-text generation) — use INT8 or full precision instead
- Not necessary if memory isn't actually a constraint for your deployment target — the added quality risk isn't worth taking without a corresponding need

## Verification

Community-reported: gating INT4 adoption on explicit task-quality testing rather than a memory-savings-only decision is a widely repeated recommendation in quantization-tradeoff writeups, not independently benchmarked here against a named production system.

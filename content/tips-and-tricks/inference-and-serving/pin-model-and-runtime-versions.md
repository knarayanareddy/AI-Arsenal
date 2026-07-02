---
id: "pin-model-and-runtime-versions"
title: "Pin Model and Runtime Versions Before Running Any Benchmark"
category: "inference-optimization"
tags:
  - inference
  - efficiency
difficulty: "intermediate"
impact: "high"
time_to_implement: "30 minutes"
phase: inference-and-serving
effort: hours
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (inference-benchmarking reproducibility discussions)"
applies_to:
  - inference-benchmarking
gotchas:
  - "Inference performance can shift meaningfully across model or runtime point releases even without an API change -- a benchmark run against an unpinned 'latest' tag can silently compare against a moving target over time"
  - "This is a narrower, model/runtime-scoped concern than pin-dependencies-for-inference-images' full-stack (OS/CUDA/driver) scope -- track both, they cover different layers"
metrics: []
related_tips:
  - pin-dependencies-for-inference-images
  - benchmark-with-real-context-lengths
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Pin the exact model version and inference runtime version before running any performance benchmark, and record both alongside the results. Inference performance characteristics can shift across model or runtime point releases even without a documented API change, so benchmark numbers gathered against a floating "latest" reference silently compare against a moving target.

## Before / After

**Before:** benchmark results recorded with no reference to which model or runtime version produced them, using whatever "latest" resolved to at run time.

**After:** benchmark results tagged with the exact model version and runtime version (e.g. `model: llama-3.1-8b-instruct@v2`, `runtime: vllm==0.4.2`), so later comparisons are apples-to-apples.

## Implementation

Pin the specific model version and runtime version being benchmarked, record both explicitly in the benchmark report, and re-pin deliberately (not automatically) when either changes, re-running the benchmark against the new pin.

## Gotchas

- Inference performance can shift across point releases without an API change — an unpinned benchmark compares against a moving target
- This is a narrower, model/runtime-scoped concern than the full-stack (OS/CUDA/driver) pinning covered by `pin-dependencies-for-inference-images` — track both

## When NOT to Apply

- Skip formal pinning for one-off exploratory benchmarks not meant for comparison over time
- Not necessary if your provider is a fully managed API where you have no control over or visibility into the underlying model/runtime version anyway

## Verification

Community-reported: pinning model and runtime versions before benchmarking is a widely repeated recommendation in inference-benchmarking reproducibility writeups, not independently benchmarked here against a named production system.

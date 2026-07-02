---
id: "pin-dependencies-for-inference-images"
title: "Pin Runtime, CUDA, Driver, and Model Versions in Inference Container Images"
category: "production-gotchas"
tags:
  - inference
  - docker
difficulty: "intermediate"
impact: "high"
time_to_implement: "1 hour"
phase: inference-and-serving
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (ML inference container reproducibility practices)"
applies_to:
  - model-serving-infrastructure
gotchas:
  - "An unpinned base image or CUDA version can silently change on a rebuild, altering inference performance or numerical output without any code change to point to as the cause"
  - "Pinning needs to cover the full stack -- base OS image, CUDA/driver version, inference runtime, and model version -- pinning only some of these leaves the others as an unversioned variable"
metrics: []
related_tips:
  - pin-model-and-runtime-versions
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Pin exact versions for the base container image, CUDA/driver version, inference runtime, and model weights used in a serving image, rather than allowing any of these to float to "latest." An unpinned dependency in this stack can silently shift inference performance or numerical output on a routine rebuild, with no corresponding code change to explain the regression.

## Before / After

**Before:** `FROM nvidia/cuda:latest` and `pip install vllm` with no version pin — a rebuild can pull in different CUDA and runtime versions than the last deployment.

**After:** `FROM nvidia/cuda:12.1.0-runtime-ubuntu22.04` and `pip install vllm==0.4.2` — every layer of the stack is pinned to an exact, reproducible version.

## Implementation

Audit the full inference image build (base OS/CUDA image, driver assumptions, inference runtime package, model version reference) and replace every floating version reference with an exact pin, then track pin updates as deliberate, reviewed changes rather than automatic rebuild drift.

## Gotchas

- An unpinned base image or CUDA version can silently change on rebuild, altering performance or output with no corresponding code change
- Pinning needs to cover the full stack — pinning only some layers leaves the others as an unversioned variable

## When NOT to Apply

- Skip full-stack pinning for a throwaway local experiment with no reproducibility requirement
- Not necessary if your deployment already uses fully immutable, digest-pinned images as a platform-level policy (in which case this practice is already satisfied)

## Verification

Production-verified: pinning the full dependency stack (base image, CUDA/driver, runtime, model) in ML inference containers is a standard, widely documented reproducibility practice.

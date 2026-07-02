---
id: "tune-batch-size-against-tail-latency"
title: "Increase Batch Size Only Until Tail Latency Becomes Unacceptable"
category: "inference-optimization"
tags:
  - inference
  - batching
difficulty: "intermediate"
impact: "high"
time_to_implement: "2 hours"
phase: inference-and-serving
effort: hours
estimated_time: "~2 hours"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (batch-size/latency tradeoff tuning in serving stacks)"
applies_to:
  - production-serving
gotchas:
  - "Average latency looks fine well past the point where p95/p99 (tail) latency has already degraded -- tuning against the mean instead of the tail hides the actual user-facing regression"
  - "The optimal batch size shifts with input length distribution -- a batch size validated against short prompts can produce unacceptable tail latency once real production-length prompts are mixed in"
metrics:
  - "throughput gains from batching are real but bounded by the point where p95 latency crosses your SLA"
related_tips:
  - measure-queue-time-separately
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Increase serving batch size to improve throughput, but stop increasing it once p95 or p99 latency (or time-to-first-token) crosses your acceptable threshold, not once average latency does. Larger batches improve GPU utilization and aggregate throughput, but individual requests wait longer for their turn in the batch, and this cost shows up in the tail of the latency distribution well before it shows up in the average.

## Before / After

**Before:** batch size tuned by checking that mean latency stays low, then set as high as throughput benchmarks suggest.

**After:** batch size increased incrementally while tracking p95/p99 latency on a realistic request mix, and capped at the point where tail latency crosses the SLA threshold — even if mean latency still looks acceptable at a higher batch size.

## Implementation

Run a load test sweeping batch size upward against a request mix that matches production input-length distribution, plot p95/p99 latency (in addition to the mean) at each batch size, and set the deployed batch size to the highest value that still meets your latency SLA.

## Gotchas

- Average latency looks fine well past the point where tail latency has already degraded — tune against p95/p99, not the mean
- The optimal batch size shifts with input length distribution — a value validated on short prompts can fail once real production-length prompts are mixed in

## When NOT to Apply

- Skip elaborate tail-latency tuning for offline/batch workloads with no per-request latency SLA — see `separate-offline-batch-jobs-from-chat-serving` for that split
- Not necessary if your serving stack's request volume never approaches a level where batching decisions matter (well below your hardware's single-request-latency floor)

## Verification

Production-verified: tuning batch size against tail latency rather than average latency is a widely documented pattern in production LLM-serving tuning guides.

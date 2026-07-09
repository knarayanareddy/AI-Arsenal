---
id: "prefer-continuous-batching-for-online-serving"
title: "Prefer Continuous Batching Over Static Batching for Online Serving"
category: "latency-optimization"
tags:
  - inference
  - batching
  - efficiency
difficulty: "intermediate"
impact: "high"
time_to_implement: "half a day"
phase: inference-and-serving
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "practitioner reports (vLLM/TGI continuous batching)"
applies_to:
  - llm-serving
  - chat-applications
gotchas:
  - "Static batching waits to fill a fixed batch and then runs all sequences to the length of the longest one, so short requests are held hostage by long ones and GPU cycles idle on finished sequences — continuous batching admits and retires sequences per step instead"
  - "Continuous batching raises throughput and utilization but does not reduce single-request latency on an idle server; if you benchmark with one request at a time you will see no difference and wrongly conclude it does not help"
metrics: []
related_tips:
  - tune-batch-size-against-tail-latency
  - benchmark-with-production-shaped-inputs
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

For online LLM serving, use a runtime that does continuous (in-flight) batching rather than static batching. Static batching groups a fixed set of requests and steps them together until the longest sequence finishes, so a batch of mostly-short requests stalls behind one long generation and the GPU wastes cycles on slots that already completed. Continuous batching schedules at the token-step level: it admits new requests into free slots and retires finished ones every step, keeping the GPU saturated and dramatically improving throughput under concurrent load.

## Before / After

**Before:** A static-batching server forms a batch of 8, then runs all 8 to the longest one's length; a single 2000-token generation blocks seven 50-token replies from returning.

**After:** A continuous-batching runtime (vLLM, TGI) retires each sequence as it finishes and slots in waiting requests immediately, so short replies return promptly and utilization stays high.

## Implementation

Serve with a runtime that implements continuous batching (e.g. vLLM, Hugging Face TGI) rather than a naive loop that pads and runs fixed batches. Combine it with prefix caching and a tuned max-concurrency. Validate under concurrent, production-shaped load — not a single serial request — so the throughput gain is actually exercised.

## Gotchas

- Static batching runs all sequences to the longest one's length, so short requests wait on long ones and finished slots idle; continuous batching admits/retires per step.
- The gain is in throughput and utilization under load, not single-request latency on an idle server; a one-request-at-a-time benchmark hides the benefit.

## When NOT to Apply

- Offline batch jobs with uniform-length inputs and no latency SLA may do fine with simple static batching.
- Not a lever you implement yourself for hosted APIs — the provider already batches server-side; this applies to self-hosted serving.

## Verification

Community-reported: continuous batching is the documented default of modern serving stacks (vLLM, TGI) and widely reported to raise throughput; the exact gain is workload-specific and is not benchmarked here.

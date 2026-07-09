---
id: "cap-concurrent-requests-with-admission-control"
title: "Cap Concurrent Requests With Admission Control"
category: "production-gotchas"
tags:
  - inference
  - monitoring
  - efficiency
difficulty: "intermediate"
impact: "high"
time_to_implement: "half a day"
phase: inference-and-serving
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "practitioner reports (GPU serving capacity incidents)"
applies_to:
  - llm-serving
  - self-hosted-inference
gotchas:
  - "A self-hosted model server has a finite KV-cache/VRAM budget; accepting unbounded concurrent requests past that point causes out-of-memory crashes or thrashing that takes down in-flight requests too, turning a load spike into an outage"
  - "Queueing without a bound only moves the failure — requests pile up until latency exceeds every client timeout and the whole queue is wasted work; pair a concurrency cap with a max queue depth and a fast reject/503"
metrics: []
related_tips:
  - warm-up-model-servers-before-routing-traffic
  - tune-batch-size-against-tail-latency
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Put an explicit ceiling on concurrent in-flight requests to a model server and reject or queue beyond it, rather than accepting everything. A GPU inference server has a hard capacity set by VRAM and KV-cache size; past that, admitting more concurrent sequences does not add throughput — it causes out-of-memory crashes, cache eviction thrashing, or latency collapse that harms the requests already running. Admission control converts an overload into graceful backpressure (a bounded queue plus fast 503s) instead of a cascading failure.

## Before / After

**Before:** The server accepts every incoming request; a traffic spike pushes concurrency past VRAM capacity, the process OOM-crashes, and in-flight requests die with it — a spike becomes an outage.

**After:** A concurrency limit and bounded queue admit up to capacity, queue a little, and fast-reject the rest with a 503/backoff hint; the server stays up and healthy requests complete.

## Implementation

Determine the safe max concurrency empirically by loading the server until latency/memory degrade, then set the limit below that knee. Enforce it with a semaphore or the runtime's max-concurrency setting, add a bounded queue with a max depth, and return a fast 503 (with `Retry-After`) when full. Autoscale replicas on queue depth/utilization rather than removing the cap. Monitor rejection rate as a capacity signal.

## Gotchas

- A server has finite KV-cache/VRAM; unbounded concurrency past that causes OOM crashes or thrashing that also kills in-flight requests, turning a spike into an outage.
- Unbounded queueing only relocates the failure — requests pile up past client timeouts; pair the concurrency cap with a max queue depth and a fast reject.

## When NOT to Apply

- Hosted-API backends already enforce their own limits — there you handle their 429s with backoff rather than adding your own server-side cap.
- Less critical for low-traffic internal tools that never approach capacity, though a safety cap is cheap insurance.

## Verification

Community-reported: admission control/backpressure is standard capacity-management practice reflected in GPU-serving incident writeups; the right limit is hardware- and model-specific and is not benchmarked here.

---
id: "measure-queue-time-separately"
title: "Measure Queue Time Separately From Model Generation Time"
category: "latency-optimization"
tags:
  - inference
  - observability
difficulty: "beginner"
impact: "medium"
time_to_implement: "30 minutes"
phase: cost-and-performance
effort: hours
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (latency-bottleneck-attribution discussions)"
applies_to:
  - production-serving
gotchas:
  - "Without separating queue time from generation time, a capacity problem (too many concurrent requests, insufficient scaling) can be misdiagnosed as a model or prompt performance problem, sending the investigation in the wrong direction"
  - "Queue time attribution requires instrumentation at the point a request enters the processing queue, separate from when it starts actual inference -- retrofitting this after the fact into an existing metrics pipeline can require nontrivial instrumentation work"
metrics: []
related_tips:
  - tune-batch-size-against-tail-latency
  - measure-first-token-latency
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Instrument and report queue/wait time as distinct from actual model generation time, so latency regressions can be correctly attributed to capacity issues versus model or prompt performance. Without this separation, a spike in overall latency caused by insufficient serving capacity looks identical to a spike caused by the model itself getting slower, sending debugging effort in the wrong direction.

## Before / After

**Before:** latency dashboards report only end-to-end request time, conflating time spent waiting for a serving slot with time spent actually generating.

**After:** `queue_time` and `generation_time` are tracked as separate metrics, making it possible to tell whether a latency regression is a capacity problem or a model/prompt problem.

## Implementation

Add timestamps at request enqueue and at generation start, compute queue time as the difference, and track it as its own metric distinct from total generation time on your latency dashboards.

## Gotchas

- Without this separation, a capacity problem can be misdiagnosed as a model performance problem
- Requires instrumentation at the point a request enters the processing queue, separate from inference start — retrofitting this can require nontrivial work

## When NOT to Apply

- Skip this if your serving infrastructure has no queueing layer at all (e.g. a fully synchronous, unthrottled setup with no capacity contention)
- Not necessary if request volume is low enough that queue time is consistently negligible

## Verification

Community-reported: separating queue time from generation time for latency bottleneck attribution is a widely repeated recommendation in production serving observability writeups, not independently benchmarked here against a named production system.

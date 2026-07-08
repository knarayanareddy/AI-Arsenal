---
id: "warm-up-model-servers-before-routing-traffic"
title: "Warm Up Model Servers Before Routing Production Traffic to Them"
category: "latency-optimization"
tags:
  - inference
  - self-hosted
difficulty: "intermediate"
impact: "medium"
time_to_implement: "half a day"
phase: inference-and-serving
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "community reports (inference server deployment guides; cold-start latency analyses)"
applies_to:
  - self-hosted-inference
  - production-llm-systems
gotchas:
  - "A TCP/HTTP health check passing does not mean the server is warm — weights may still be loading, CUDA graphs uncaptured, and compilation caches cold; the readiness probe must run a real inference"
  - "Warm-up requests should match production shapes (context lengths, batch sizes) — a 10-token ping doesn't exercise the kernels and cache allocations your real traffic will hit"
  - "During autoscaling events this matters most: scale-up that routes traffic to cold replicas converts your capacity fix into a latency incident"
metrics: []
related_tips:
  - benchmark-with-real-context-lengths
  - tune-batch-size-against-tail-latency
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Gate traffic on a readiness probe that executes real inference requests — not merely a port check — and pre-warm new replicas with production-shaped requests before the load balancer sends them users. LLM servers have deep cold paths: multi-GB weight loading, memory-pool allocation, CUDA-graph capture, and JIT/compilation caches that only build on first execution per shape. A "healthy" cold replica can serve its first requests seconds slower than steady state, and every scale-up event replays that penalty onto live users.

## Before / After

**Before:** Autoscaler adds two replicas during a traffic spike; the LB routes to them the moment port 8000 opens; p99 spikes to 20s+ exactly when the system was supposed to be adding capacity.

**After:** New replicas run a warm-up script (representative context lengths and batch sizes) and only pass readiness after warm inference latency stabilizes; scale-up is latency-invisible to users.

## Implementation

Implement the readiness endpoint to run one or more real generations, add a startup warm-up phase issuing requests that match your production shape distribution, and configure the orchestrator (e.g. Kubernetes readiness probes with appropriate initial delays) so routing strictly follows warm readiness.

## Gotchas

- Health ≠ warm: probe with real inference, not a port check
- Warm up with production-shaped requests — trivial pings don't build the right caches
- Autoscaling is the high-stakes moment; test warm-up behavior under scale-up, not only at deploy time

## When NOT to Apply

- Serverless/scale-to-zero deployments where cold starts are an accepted cost trade-off — there, mitigate with provider snapshotting features instead of blocking on warmth
- Batch/offline serving where first-request latency is irrelevant

## Verification

Community-reported: inference-level readiness probes and shape-matched warm-up are standard guidance in inference-server deployment documentation and cold-start analyses; not independently benchmarked here against a named production system.

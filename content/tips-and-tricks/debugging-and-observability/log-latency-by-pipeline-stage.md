---
id: "log-latency-by-pipeline-stage"
title: "Break Down Latency by Pipeline Stage Before Optimizing Anything"
category: "latency-optimization"
tags:
  - observability
  - tracing
difficulty: "beginner"
impact: "high"
time_to_implement: "2-4 hours"
phase: debugging-and-observability
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "community reports (LLM latency debugging writeups; standard tracing practice)"
applies_to:
  - production-llm-systems
  - rag-pipelines
gotchas:
  - "Averages hide the story — a stage that is 5% of mean latency can be 60% of p99; always look at stage breakdowns at the percentile you care about"
  - "Streaming responses need two generation metrics (time-to-first-token and total generation time); collapsing them into one number makes user-perceived latency invisible"
metrics: []
related_tips:
  - measure-first-token-latency
  - measure-queue-time-separately
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Instrument each pipeline stage — query rewriting, embedding, retrieval, reranking, prompt assembly, queueing, generation, post-processing — as a separate timed span before attempting any latency work. LLM pipelines invite a specific mistake: assuming the model call dominates and reaching for a faster/smaller model, when in practice reranking, sequential retrieval calls, or a guardrail pass are often the real tail-latency culprits. Optimizing without a stage breakdown is guessing with extra steps.

## Before / After

**Before:** "p95 is 6 seconds, the LLM is slow, let's switch to a smaller model" — quality drops, p95 improves by 400ms because generation was never the bottleneck.

**After:** The trace waterfall shows generation at 1.8s, but a sequential rerank + two guardrail LLM calls adding 3.1s; parallelizing and caching those cuts p95 to 3.2s with zero quality cost.

## Implementation

Wrap each stage in a span (OpenTelemetry or your LLM tracing tool's native spans), report per-stage latency at p50/p95/p99 — not only means — and separate time-to-first-token from total generation for streaming paths.

## Gotchas

- Stage shares differ wildly between mean and p99 — analyze at the percentile you're fixing
- Streaming needs TTFT and total-generation tracked separately

## When NOT to Apply

- Single-call pipelines (one prompt, no retrieval, no post-processing) where there is only one stage to measure — provider-side breakdown (queue vs. inference) is the relevant split instead

## Verification

Community-reported: per-stage latency decomposition is standard tracing practice, repeatedly cited in LLM latency post-mortems where non-generation stages dominated tail latency; not independently benchmarked here against a named production system.

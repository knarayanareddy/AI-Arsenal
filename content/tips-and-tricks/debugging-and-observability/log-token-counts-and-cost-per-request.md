---
id: "log-token-counts-and-cost-per-request"
title: "Log Token Counts and Cost Per Request"
category: "production-gotchas"
tags:
  - observability
  - llm
  - efficiency
difficulty: "beginner"
impact: "medium"
time_to_implement: "an hour"
phase: debugging-and-observability
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (LLMOps cost-monitoring practice)"
applies_to:
  - production-deployment
gotchas:
  - "Providers count tokens with their own tokenizer; a local estimate can drift from the billed number -- prefer the usage figures returned in the API response for cost accuracy"
  - "Averages hide the tail: a few pathological requests (runaway context, retry storms) can dominate the bill while the median looks fine -- log per-request and watch percentiles"
metrics: []
related_tips:
  - log-latency-by-pipeline-stage
  - correlate-llm-traces-with-request-ids
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Cost and context bugs are invisible until you measure them per request. Logging prompt tokens, completion tokens, and derived cost on every call gives you the signal to catch a prompt that quietly ballooned, a retrieval step stuffing the context window, or a retry loop multiplying spend. It also turns "the bill went up" from a mystery into a query: group by feature, endpoint, or prompt version and the culprit surfaces. This is the cheapest observability you can add and the first thing you will wish you had when finance asks why costs doubled.

## Before / After

**Before:** The monthly LLM bill jumps 40% and nobody can attribute it; you scroll through code guessing which feature changed.

**After:** Per-request token/cost logs show one feature's average prompt grew from 800 to 6,000 tokens after a retrieval change — attributed in one query.

## Implementation

Record the usage fields the provider returns (prompt/completion/total tokens) plus a computed cost per request, tagged with feature, endpoint, model, and prompt version. Prefer the API's reported usage over a local tokenizer estimate for billing accuracy. Chart percentiles (p50/p95/p99), not only the mean, and alert on sudden shifts in per-request cost.

## Gotchas

- Local token estimates can diverge from billed counts — use the provider's returned usage for cost
- Mean cost masks tail blowups; monitor p95/p99 and per-feature breakdowns

## When NOT to Apply

- Throwaway prototypes with negligible volume can defer detailed cost logging
- If your provider bills a flat rate independent of tokens, per-token cost logging is less useful (still log tokens for context-window debugging)

## Verification

Community-reported: per-request token/cost logging is a standard LLMOps practice and built into most observability tooling. Exact cost formulas depend on provider pricing.

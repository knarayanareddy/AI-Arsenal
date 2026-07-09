---
id: "route-easy-requests-to-a-smaller-model-first"
title: "Route Easy Requests to a Smaller Model First"
category: "cost-reduction"
tags:
  - inference
  - routing
  - efficiency
difficulty: "intermediate"
impact: "high"
time_to_implement: "half a day"
phase: inference-and-serving
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "practitioner reports (model cascade/routing deployments)"
applies_to:
  - llm-serving
  - chat-applications
gotchas:
  - "A large fraction of real traffic is easy (short factual answers, simple classifications) and does not need your most expensive model, but a single-model deployment pays the top-tier price for every request regardless of difficulty"
  - "The router itself adds latency and can misroute; a too-eager route-to-small policy sends hard queries to a weak model and quietly degrades quality, so you must measure escalation/quality on a labeled set, not only cost savings"
metrics: []
related_tips:
  - start-with-a-smaller-quantized-model
  - add-provider-timeout-and-retry-policies
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Send requests to a small, cheap model first and escalate to a larger one only when needed, instead of paying the top-tier price for every call. Production traffic is rarely uniform in difficulty: many requests are short, factual, or simple classifications a small model handles well, while only a minority need the frontier model's capability. A cascade — cheap model with a confidence or verification check, falling through to the expensive model on hard cases — captures most of the quality at a fraction of the average cost.

## Before / After

**Before:** Every request goes to the largest model; simple "what's the capital of X" queries cost the same as complex multi-step reasoning, and the average cost is anchored to the ceiling.

**After:** A small model answers the easy majority; a confidence/verification gate escalates the hard minority to the large model, so average cost drops toward the small-model price while hard queries still get the strong model.

## Implementation

Define a routing signal: a lightweight classifier, a confidence/self-check on the small model's output, or heuristics on the request. Try the cheap model first; escalate on low confidence, a failed verification, or a detected hard category. Measure escalation rate, end-to-end quality on a labeled set, and cost — tune the gate so quality holds rather than optimizing cost alone. Log routing decisions for auditing.

## Gotchas

- Much real traffic is easy and does not need the top model, yet a single-model deployment pays the top price for every request.
- The router adds latency and can misroute; a too-eager small-model policy degrades quality on hard queries, so measure escalation and quality on labels, not only cost.

## When NOT to Apply

- Not worth the complexity when traffic is uniformly hard, or volume is low enough that the savings do not justify a router to build and monitor.
- Skip when strict output consistency across all requests matters and mixing two models' styles is unacceptable.

## Verification

Community-reported: model cascades/routing are a well-documented cost-reduction pattern; the achievable savings and quality tradeoff are workload-specific and are not benchmarked here.

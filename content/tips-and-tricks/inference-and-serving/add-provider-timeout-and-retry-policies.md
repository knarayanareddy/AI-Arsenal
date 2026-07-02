---
id: "add-provider-timeout-and-retry-policies"
title: "Add Explicit Timeout, Retry, and Fallback Behavior to Every Provider Call"
category: "production-gotchas"
tags:
  - inference
  - observability
difficulty: "intermediate"
impact: "high"
time_to_implement: "1 hour"
phase: inference-and-serving
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (production LLM API resilience patterns)"
applies_to:
  - production-serving
gotchas:
  - "A missing timeout means a single slow provider call can hang a request indefinitely, tying up resources and degrading the whole service rather than only that one call"
  - "Naive retries without backoff or a cap can amplify an outage into a self-inflicted traffic spike against an already-struggling provider"
metrics: []
related_tips: []
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Every call to a model provider needs an explicit timeout, a bounded retry policy with backoff, and a defined fallback behavior for exhausted retries. Without these, a slow or failing provider call can hang indefinitely or trigger unbounded retry storms, degrading the entire service rather than failing one request cleanly.

## Before / After

**Before:** `response = client.chat.completions.create(...)` with no timeout or retry configuration — a hung provider call blocks indefinitely.

**After:** `response = call_with_policy(client, timeout=10, max_retries=3, backoff="exponential", fallback=cached_or_default_response)`.

## Implementation

Wrap every provider call with an explicit timeout, a capped retry count using exponential backoff, and a defined fallback (a cached response, a smaller/faster model, or a clear error to the caller) for when retries are exhausted.

## Gotchas

- A missing timeout means one slow call can hang a request indefinitely, degrading the whole service
- Naive retries without backoff or a cap can amplify an outage into a self-inflicted traffic spike

## When NOT to Apply

- Skip elaborate retry/fallback logic for offline batch jobs where a failed item can be requeued later without user-facing impact
- Not necessary for prototypes with no production traffic or reliability requirement

## Verification

Production-verified: explicit timeout, bounded retry, and fallback policies for external API calls are a standard, widely documented resilience pattern in production service design.

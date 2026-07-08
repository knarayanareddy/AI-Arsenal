---
id: "use-provider-batch-apis-for-offline-workloads"
title: "Use Provider Batch APIs for Offline Workloads to Halve Token Costs"
category: "cost-reduction"
tags:
  - batching
  - inference
difficulty: "beginner"
impact: "high"
time_to_implement: "half a day"
phase: cost-and-performance
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "community reports (OpenAI/Anthropic batch API pricing documentation)"
applies_to:
  - offline-llm-workloads
  - data-enrichment-pipelines
gotchas:
  - "Batch APIs are asynchronous with completion windows measured in hours (typically up to 24h) — anything a user is waiting on does not belong there"
  - "Results can complete out of order and individual items can fail; you need an idempotent job design keyed by custom IDs, not positional matching"
  - "Discounts apply to batch-endpoint submissions, not to concurrency you implement yourself against the realtime API"
metrics: []
related_tips:
  - track-cost-per-feature
  - route-simple-tasks-to-smaller-models
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Route non-interactive LLM work — dataset labeling, bulk summarization, enrichment backfills, offline eval runs — through the provider's batch endpoint instead of the realtime API. Major providers (OpenAI, Anthropic, and others) price batch submissions at roughly 50% of realtime rates because they can schedule the work into idle capacity. For workloads where nobody is waiting on the response, paying the realtime premium buys you nothing: it is the single easiest large cost cut in most LLM budgets.

## Before / After

**Before:** A nightly enrichment job fires 200K realtime API calls at full price, competing with production traffic for rate limits.

**After:** The same job uploads one batch file to the batch endpoint, collects results within the completion window at ~half the token cost, and production rate limits are untouched.

## Implementation

Separate workloads by latency requirement, package offline work into the provider's batch format with a custom ID per item, submit, poll for completion, and reconcile results by ID with per-item retry for failures.

## Gotchas

- Asynchronous by design (up to 24h windows) — never put user-facing requests on it
- Match results by custom ID and handle per-item failures; don't assume order or completeness
- The discount is for the batch endpoint itself, not for client-side parallelism

## When NOT to Apply

- Anything interactive or deadline-bound tighter than the provider's completion window
- Self-hosted inference, where the equivalent move is scheduling offline jobs onto idle capacity yourself (see separate-offline-batch-jobs-from-chat-serving)

## Verification

Community-reported: the ~50% batch discount is documented provider pricing (OpenAI Batch API, Anthropic Message Batches) rather than an empirical claim; the tip's judgment is about workload routing, not the discount itself.

---
id: "use-semantic-cache-for-repeated-questions"
title: "Cache Answers for Semantically Similar Repeated Questions"
category: "cost-reduction"
tags:
  - caching
  - embeddings
difficulty: "intermediate"
impact: "high"
time_to_implement: "2 hours"
phase: cost-and-performance
effort: hours
estimated_time: "~2 hours"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (semantic caching for high-repeat-rate query workloads)"
applies_to:
  - customer-support-bots
  - faq-style-workloads
gotchas:
  - "A semantic cache serving a stale or slightly-off-topic cached answer for a similarity-matched-but-not-identical question is a real risk -- the similarity threshold needs tuning against your own false-positive rate, not a generic default"
  - "Cached answers can go stale if the underlying facts change (pricing, policy, availability) -- a semantic cache needs an invalidation or expiry strategy, rather than a fixed all-time cache"
  - "This is a different mechanism from cache-embeddings-by-content-hash (exact-match embedding reuse) -- semantic caching matches near-duplicate queries, not identical ones, and carries a correspondingly higher risk of returning a wrong-but-plausible cached answer"
metrics: []
related_tips:
  - cache-embeddings-by-content-hash
  - route-simple-tasks-to-smaller-models
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

For workloads with a high rate of semantically similar repeated questions (FAQ-style support, common troubleshooting queries), cache answers keyed by embedding similarity rather than exact text match, and serve a cached answer when a new query is similar enough to a previously-answered one. This avoids paying for a full generation call on queries that are effectively repeats of earlier ones, even when worded differently.

## Before / After

**Before:** every incoming question triggers a full generation call, even when it's a reworded version of a question answered minutes earlier.

**After:** incoming questions are embedded and checked against a cache of recent (question-embedding, answer) pairs; a similarity match above threshold returns the cached answer instead of a new generation call.

## Implementation

Embed incoming queries, check against a similarity-indexed cache of recent (embedding, answer) pairs, serve the cached answer above a tuned similarity threshold, and set an expiry or invalidation policy so cached answers don't go stale as underlying facts change.

## Gotchas

- A cached answer for a similarity-matched-but-not-identical question risks being subtly wrong — tune the similarity threshold against your own false-positive rate
- Cached answers can go stale as underlying facts change — an invalidation or expiry strategy is required, rather than a fixed all-time cache
- This differs from `cache-embeddings-by-content-hash` (exact-match reuse) — semantic caching matches near-duplicates and carries higher risk of a wrong-but-plausible cached answer

## When NOT to Apply

- Skip this for workloads with low query repeat rates, where cache hit rate would be too low to justify the added infrastructure
- Not appropriate for queries whose correct answer depends on rapidly-changing, time-sensitive facts where staleness risk outweighs the cost savings

## Verification

Production-verified: semantic caching for high-repeat-rate query workloads is a standard, widely documented cost-optimization pattern in production support-bot and FAQ-style deployments.

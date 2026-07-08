---
id: "cache-idempotent-tool-results-within-a-run"
title: "Cache Idempotent Tool Results Within an Agent Run"
category: "agent-reliability"
tags:
  - agents
  - caching
  - tool-use
difficulty: "intermediate"
impact: "medium"
time_to_implement: "2-4 hours"
phase: agents-and-orchestration
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "community reports (agent framework memoization patterns; redundant-tool-call analyses)"
applies_to:
  - agent-systems
gotchas:
  - "Only cache tools that are actually idempotent and read-only — caching a search over changing data or anything with side effects serves stale results or hides real actions"
  - "Scope the cache to the run (or a short TTL); cross-run caching is a different, riskier decision with staleness and privacy implications"
  - "Cache keys must include all semantically meaningful arguments, normalized — argument order or formatting differences shouldn't cause misses, and different arguments must never collide"
metrics: []
related_tips:
  - detect-repeated-tool-calls
  - cap-agent-tool-retries
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Memoize read-only tool calls (file reads, documentation lookups, search queries) keyed by normalized arguments for the duration of an agent run. Agents re-issue identical calls constantly — after context compaction erases the earlier result, in loops, or across planner/executor handoffs — and each repeat costs tool latency plus the tokens to re-ingest the result. A run-scoped cache returns the prior result instantly and, paired with repeated-call detection, turns wasteful loops into cheap no-ops.

## Before / After

**Before:** A coding agent reads the same 400-line config file five times across a long run — four of them after compaction dropped the earlier content — paying tool latency and ~2K redundant context tokens each time.

**After:** The second through fifth reads hit the run cache; the framework can also inject "(cached — unchanged since last read)" to hint the agent it is looping.

## Implementation

Wrap tool execution with a memoization layer: mark tools as cacheable in their registration metadata, key by tool name plus canonicalized arguments, scope the store to the run, and invalidate on any write action that could affect the cached reads (e.g. a file edit invalidates that file's read cache).

## Gotchas

- Cache only read-only, idempotent tools; anything with side effects must always execute
- Keep cache scope to the run or a short TTL — cross-run reuse raises staleness and privacy questions
- Canonicalize arguments in the key; and invalidate reads after related writes (edit-then-reread must not serve the stale version)

## When NOT to Apply

- Tools querying fast-changing state (live metrics, current time, market data) where staleness within a run is wrong
- Short runs (a handful of steps) where repeats are rare and the invalidation logic costs more than it saves

## Verification

Community-reported: run-scoped tool memoization appears in agent framework patterns and redundant-call analyses of long agent traces; not independently benchmarked here against a named production system.

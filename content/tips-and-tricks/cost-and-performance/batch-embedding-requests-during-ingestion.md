---
id: "batch-embedding-requests-during-ingestion"
title: "Batch Embedding Requests During Ingestion Instead of Embedding One Chunk at a Time"
category: "cost-reduction"
tags:
  - embeddings
  - batching
difficulty: "beginner"
impact: "medium"
time_to_implement: "1-2 hours"
phase: cost-and-performance
effort: hours
estimated_time: "~1-2 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (embedding API docs; RAG ingestion optimization writeups)"
applies_to:
  - rag-ingestion-pipelines
gotchas:
  - "Batch size limits are provider- and model-specific (count and total tokens per request); exceeding them fails the whole batch, so validate limits and split accordingly"
  - "One malformed chunk can fail an entire batch — handle partial failure by retrying the batch's items individually rather than dropping all of them"
  - "Self-hosted embedding servers have an optimal batch size beyond which latency degrades; benchmark rather than maxing out"
metrics: []
related_tips:
  - cache-embeddings-by-content-hash
  - parallelize-independent-retrieval-calls
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Send chunks to the embedding API in batches (tens to hundreds per request) instead of one call per chunk. Per-request overhead — TLS, HTTP round-trip, provider-side queueing — dominates when payloads are tiny: embedding 100K chunks one at a time means 100K round-trips of mostly overhead, turning an hours-long ingestion into days and hammering rate limits. Batching amortizes that overhead across every provider's supported multi-input API.

## Before / After

**Before:** `for chunk in chunks: embed(chunk)` — 100K sequential calls, rate-limit backoff loops, ingestion measured in days.

**After:** `for batch in chunked(chunks, 128): embed(batch)` — ~800 calls, ingestion measured in minutes-to-hours, with far fewer rate-limit collisions.

## Implementation

Chunk the input stream into batches sized against the provider's per-request item and token limits, embed batch-by-batch (optionally with a small concurrency pool), and on batch failure retry items individually to isolate malformed inputs.

## Gotchas

- Respect provider batch limits (items and total tokens) — oversized batches fail atomically
- Retry failed batches item-by-item so one bad chunk doesn't drop the batch
- For self-hosted embedders, benchmark the optimal batch size instead of maximizing it

## When NOT to Apply

- Real-time query-path embedding of a single user query — there is nothing to batch
- Trickle ingestion (a few documents per hour) where latency and cost are already negligible

## Verification

Community-reported: batched embedding is explicitly recommended by embedding API documentation and standard in RAG ingestion frameworks; the round-trip-overhead mechanism is well understood, but speedup ratios are not independently benchmarked here.

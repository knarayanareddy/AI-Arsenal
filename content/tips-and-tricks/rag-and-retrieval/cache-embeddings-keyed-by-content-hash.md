---
id: "cache-embeddings-keyed-by-content-hash"
title: "Cache Embeddings Keyed by a Content Hash"
category: "cost-reduction"
tags:
  - rag
  - embeddings
  - efficiency
difficulty: "beginner"
impact: "medium"
time_to_implement: "an hour"
phase: rag-and-retrieval
effort: hours
estimated_time: "~1-2 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (RAG ingestion cost writeups)"
applies_to:
  - rag-pipelines
  - document-ingestion
gotchas:
  - "The cache key must include the embedding model name and version, not only the text hash — reusing a vector produced by a different model silently mixes incompatible embedding spaces and corrupts retrieval"
  - "Hashing raw text before normalization means trivially different whitespace or casing produces cache misses; decide on a canonicalization step and hash the canonical form, or accept the extra misses"
metrics: []
related_tips:
  - evaluate-embedding-models-before-rechunking
  - store-parser-version-with-every-chunk
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Cache each chunk's embedding under a key derived from a hash of its content (plus the model identity), so re-running ingestion only embeds chunks whose text actually changed. Ingestion pipelines are re-run constantly — a re-crawl, a chunking tweak, a schema migration — and naively re-embedding the whole corpus each time pays the full embedding bill and latency for content that is byte-for-byte identical to last run. A content-hash cache turns a full re-embed into an incremental one.

## Before / After

**Before:** Every ingestion run embeds all N chunks, so fixing a typo in one document re-embeds the entire corpus and re-pays the whole API/compute cost.

**After:** Each chunk is looked up by `hash(canonical_text) + model_id`; unchanged chunks hit the cache, and only new or edited chunks are embedded — cost and time scale with the diff, not the corpus.

## Implementation

Compute a stable hash of the canonicalized chunk text, concatenate the embedding model name and version into the key, and store `key -> vector` in a persistent store (a key-value table or a column alongside the chunk). On each run, look up before embedding; embed and write back only on a miss. Invalidate implicitly by changing the model component of the key when you switch models.

## Gotchas

- The cache key must include the embedding model name and version, not only the text hash — reusing a vector from a different model mixes incompatible embedding spaces and corrupts retrieval.
- Hashing raw text before normalization makes trivial whitespace/casing differences miss; hash a canonical form or accept the extra misses.

## When NOT to Apply

- Skip for a small corpus embedded once and rarely re-ingested — the cache infrastructure outweighs the saving.
- Not worth it when content changes almost entirely between runs (a fully volatile feed), since the hit rate approaches zero.

## Verification

Community-reported: content-hash embedding caches are a common ingestion-cost optimization in RAG writeups; exact savings depend on your corpus churn rate and are not benchmarked here.

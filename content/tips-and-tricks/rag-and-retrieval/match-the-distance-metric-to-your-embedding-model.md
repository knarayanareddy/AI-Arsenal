---
id: "match-the-distance-metric-to-your-embedding-model"
title: "Match the Vector Distance Metric to Your Embedding Model"
category: "rag-tuning"
tags:
  - rag
  - embeddings
  - retrieval
difficulty: "intermediate"
impact: "medium"
time_to_implement: "an hour"
phase: rag-and-retrieval
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (vector store configuration writeups)"
applies_to:
  - rag-pipelines
  - document-ingestion
gotchas:
  - "A vector index configured with the wrong distance metric (e.g. Euclidean on embeddings the model trained for cosine) still returns results and never errors — retrieval quietly degrades and looks like a chunking or embedding-quality problem instead of a config bug"
  - "Cosine and dot-product rankings diverge only when vectors are not unit-normalized; if your model does not normalize outputs, dot product is sensitive to magnitude while cosine is not, and the two can rank candidates differently"
metrics: []
related_tips:
  - evaluate-embedding-models-before-rechunking
  - measure-retrieval-recall-before-answer-quality
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Configure your vector index with the distance metric the embedding model was trained for — usually cosine similarity, sometimes dot product — rather than the store's default. Vector databases default to a metric (often Euclidean/L2) that may not match how the model's embedding space encodes similarity. The index still returns nearest neighbors under the wrong metric and never raises an error, so retrieval quietly underperforms and the failure gets misattributed to chunking or embedding quality instead of a one-line configuration mismatch.

## Before / After

**Before:** The collection is created with the store's default L2 metric while the embedding model documents cosine similarity; recall is mediocre and the team starts re-chunking to fix it.

**After:** The collection uses the model's documented metric (cosine, with normalized vectors); rankings reflect the space the model actually learned, and recall improves with no content change.

## Implementation

Check the embedding model's documentation for its intended similarity function and whether it emits normalized vectors. Create the index/collection with that metric explicitly. If the model expects cosine but your store only offers dot product, normalize vectors to unit length at write time so dot product equals cosine. Re-verify the setting whenever you swap embedding models, since the correct metric can change with the model.

## Gotchas

- A wrong distance metric still returns results and never errors — retrieval degrades quietly and looks like a chunking or embedding-quality problem instead of a config bug.
- Cosine and dot-product rankings diverge when vectors are not unit-normalized; a model that does not normalize makes dot product magnitude-sensitive while cosine is not.

## When NOT to Apply

- No action needed when the store's default already matches the model's intended metric (many default to cosine for text embeddings) — verify rather than change blindly.
- Skip re-tuning if you have not changed the embedding model and retrieval is already validated as healthy.

## Verification

Community-reported: metric-model mismatch is a well-known silent RAG misconfiguration; the retrieval-quality impact is corpus- and model-specific and is not benchmarked here.

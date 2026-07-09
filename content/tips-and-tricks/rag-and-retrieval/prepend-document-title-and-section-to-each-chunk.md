---
id: "prepend-document-title-and-section-to-each-chunk"
title: "Prepend the Document Title and Section Heading to Each Chunk"
category: "rag-tuning"
tags:
  - rag
  - retrieval
  - embeddings
difficulty: "beginner"
impact: "medium"
time_to_implement: "an hour"
phase: rag-and-retrieval
effort: hours
estimated_time: "~1-2 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (contextual chunking writeups)"
applies_to:
  - rag-pipelines
  - long-document-rag
  - document-qa
gotchas:
  - "A mid-document chunk often loses the context that gave it meaning — a paragraph under a heading like 'Refund Policy' embeds and reads as generic text once separated from that heading, so it fails to match a query about refunds"
  - "Prepending too much context (full breadcrumb plus a long title) dilutes the chunk's own content in the embedding and eats into the token budget; keep the prefix short and specific"
metrics: []
related_tips:
  - keep-source-page-and-section-metadata
  - choose-chunk-size-by-answer-span-length
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Prepend a short context prefix — the document title and the enclosing section heading — to each chunk's text before embedding it. Chunking severs a passage from the structure that gave it meaning: a paragraph that made sense under the heading "Refund Policy" becomes ambiguous generic prose once isolated, so it embeds poorly and misses queries it should answer. A compact prefix restores enough context for both the embedding and the generator to place the chunk correctly.

## Before / After

**Before:** A chunk reads "This must be requested within 30 days of purchase." — embedded alone, it matches almost nothing, because the subject ("a refund") lived in the heading two levels up.

**After:** The embedded text is "[Acme Returns Guide > Refund Policy] This must be requested within 30 days of purchase." — now it matches a refund query and the generator knows what "this" refers to.

## Implementation

During chunking, carry the document title and the nearest heading path, and prepend a short bracketed breadcrumb to the chunk text used for embedding (and optionally for the context shown to the model). Keep the prefix terse — title plus one or two heading levels — and store the structural metadata in fields as well so filters and citations can use it.

## Gotchas

- A mid-document chunk loses the context that gave it meaning; without the heading, it embeds and reads as generic text and misses relevant queries.
- Over-long prefixes dilute the chunk's own content in the embedding and consume token budget; keep the prefix short and specific.

## When NOT to Apply

- Skip for flat, single-topic documents with no meaningful heading structure — there is no useful context to prepend.
- Avoid when chunks are already large and self-contained enough that the enclosing subject is obvious from the text itself.

## Verification

Community-reported: contextual/heading-aware chunking is a widely recommended retrieval improvement; the magnitude depends on document structure and is not benchmarked here against a named system.

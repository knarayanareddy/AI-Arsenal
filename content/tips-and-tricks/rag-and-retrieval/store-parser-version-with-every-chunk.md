---
id: "store-parser-version-with-every-chunk"
title: "Store Parser and Chunker Version With Every Chunk"
category: "rag-tuning"
tags:
  - rag
  - retrieval
  - observability
difficulty: "beginner"
impact: "medium"
time_to_implement: "45 minutes"
phase: rag-and-retrieval
effort: hours
estimated_time: "~45 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (RAG ingestion versioning discussions)"
applies_to:
  - rag-pipelines
  - document-ingestion
gotchas:
  - "Without a stored version tag, a retrieval regression after a parser or chunking-logic change is indistinguishable from unrelated content drift, and the two require completely different fixes"
  - "Version metadata added only going forward, without a backfill or re-ingestion plan, leaves old chunks silently untagged, weakening the diagnostic value for anything ingested before the change"
metrics: []
related_tips:
  - keep-source-page-and-section-metadata
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Record the parser version and chunking-logic version as metadata on every chunk at ingestion time. When retrieval quality regresses after an ingestion-pipeline change, this metadata lets you isolate whether the regression correlates with a specific parser/chunker version rather than guessing at the cause.

## Before / After

**Before:** `chunk_metadata = {"source": doc_id, "page": page_num}` — no record of which ingestion code produced the chunk.

**After:** `chunk_metadata = {"source": doc_id, "page": page_num, "parser_version": "pdf-parser-v3.2", "chunker_version": "recursive-splitter-v1.4"}` — every chunk is traceable to the exact ingestion logic that produced it.

## Implementation

Add `parser_version` and `chunker_version` fields to the chunk metadata schema, populate them from a version constant defined alongside the parsing/chunking code, and bump the constant whenever that code changes materially.

## Gotchas

- Without a stored version tag, a retrieval regression after a parser/chunking change is indistinguishable from unrelated content drift
- Version metadata added only going forward, without a backfill or re-ingestion plan, leaves old chunks silently untagged

## When NOT to Apply

- Skip this for a static, one-time-ingested corpus that will never be re-parsed or re-chunked — the traceability benefit only matters when ingestion logic evolves
- Not a substitute for actual regression testing of ingestion changes; version tagging aids diagnosis after the fact, it does not prevent regressions

## Verification

Community-reported: tagging chunks with ingestion-pipeline version metadata is a repeated recommendation in RAG operations writeups, not independently benchmarked here against a named production incident.

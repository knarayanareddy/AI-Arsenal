---
id: "keep-source-page-and-section-metadata"
title: "Store Source Page and Section Metadata With Every Chunk"
category: "rag-tuning"
tags:
  - rag
  - data
  - observability
difficulty: "beginner"
impact: "medium"
time_to_implement: "30 minutes"
phase: rag-and-retrieval
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (citation-enabled RAG systems)"
applies_to:
  - rag-pipelines
  - citation-required-answers
gotchas:
  - "Metadata added after initial ingestion requires reprocessing the whole corpus -- add this at ingestion time from the start rather than retrofitting later"
  - "Page/heading metadata is only as reliable as your document parser's structure extraction -- verify it against a sample of real documents, since some parsers silently drop heading hierarchy on complex layouts"
metrics: []
related_tips:
  - store-parser-version-with-every-chunk
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Attach page number, section heading, and source URL metadata to every chunk at ingestion time, in addition to the raw text. Without this, a generated answer can state a fact but provide no way for a user to verify it against the original source — citation-capable RAG requires this metadata to exist before generation, not reconstructed after the fact.

## Before / After

**Before:** `chunk = {"text": extracted_text}` with no provenance metadata.

**After:** `chunk = {"text": extracted_text, "source_url": doc_url, "page": page_num, "heading": section_heading}` populated during ingestion and carried through to the generator's citation step.

## Implementation

Extract page number and heading hierarchy during document parsing (most parsers expose this) and attach it to each chunk's metadata alongside the source URL; surface this metadata in the generator's final answer as a citation rather than discarding it after retrieval.

## Gotchas

- Metadata added after initial ingestion requires reprocessing the whole corpus — add this at ingestion time from the start rather than retrofitting later
- Page/heading metadata is only as reliable as your document parser's structure extraction — verify it against a sample of real documents, since some parsers silently drop heading hierarchy on complex layouts

## When NOT to Apply

- Skip this if your use case genuinely has no need for citations or source verification (a purely conversational assistant with no evidentiary requirement)
- Skip granular page/heading tracking if your source documents have no meaningful internal structure to extract (e.g. plain unstructured text blobs) — source URL alone may suffice

## Verification

Community-reported: source metadata capture at ingestion time is a standard practice in citation-capable RAG systems, though this specific entry has not yet been independently verified against a named production deployment — flagged `enrichment_status: draft` pending stronger evidence.

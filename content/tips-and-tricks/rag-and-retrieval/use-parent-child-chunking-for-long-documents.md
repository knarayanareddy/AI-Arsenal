---
id: "use-parent-child-chunking-for-long-documents"
title: "Use Parent-Child Chunking to Balance Precision and Context"
category: "rag-tuning"
tags:
  - rag
  - retrieval
  - chunking
difficulty: "advanced"
impact: "high"
time_to_implement: "3-4 hours"
phase: rag-and-retrieval
effort: day
estimated_time: "~4 hours"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (LlamaIndex/LangChain parent-document retrievers)"
applies_to:
  - long-document-rag
  - technical-manuals
gotchas:
  - "Parent-child chunking roughly doubles your indexing and storage complexity (two chunk sizes to manage, a mapping between them) -- only adopt this when a single chunk size genuinely can't serve both precision and context needs"
  - "If the parent chunk is too large, you're back to the original dilution problem one level up -- size the parent deliberately, don't just pick 'the whole document'"
  - "This requires your retrieval framework to support a child-to-parent expansion step at retrieval time -- verify your vector store/framework combination actually supports it before committing to the pattern"
metrics: []
related_tips:
  - choose-chunk-size-by-answer-span-length
  - use-sentence-windows-for-dense-manuals
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Embed and retrieve small, precise "child" chunks for matching, but return their larger enclosing "parent" chunk (a full section or page) to the generator as context. This resolves the standard chunking tradeoff — small chunks retrieve precisely but lack surrounding context; large chunks have context but dilute embeddings — by using small chunks for search and large chunks for generation.

## Before / After

**Before:** one chunk size used for both embedding/matching and the context sent to the generator, forcing a compromise between precision and context completeness.

**After:** small child chunks (e.g. 200 tokens) indexed for retrieval, each tagged with a reference to its parent chunk (e.g. 1,000–2,000 tokens); on retrieval, the matched child's parent is fetched and sent to the generator instead of the child alone.

## Implementation

Split each document into large parent sections first, then split each parent into smaller child chunks, storing a parent-ID reference on each child's metadata; at retrieval time, match against child embeddings but resolve and return the corresponding parent text. Both LlamaIndex and LangChain ship a documented parent-document retriever implementing this pattern directly.

## Gotchas

- Parent-child chunking roughly doubles your indexing and storage complexity (two chunk sizes to manage, a mapping between them) — only adopt this when a single chunk size genuinely cannot serve both precision and context needs
- If the parent chunk is too large, you are back to the original dilution problem one level up — size the parent deliberately, do not default to "the whole document"
- This requires your retrieval framework to support a child-to-parent expansion step at retrieval time — verify your vector store/framework combination actually supports it before committing to the pattern

## When NOT to Apply

- Skip this for short documents where a single chunk size already comfortably captures both precise matching and sufficient context
- Skip this if your framework doesn't support parent-child expansion natively and building it yourself would exceed a day of work — that crosses into build-example territory, not a same-day tip

## Verification

Production-verified: parent-document (parent-child) chunking is a documented, first-class retriever pattern in both LlamaIndex and LangChain, reported by practitioners specifically for long technical-manual and documentation RAG use cases where a single chunk size underperforms.

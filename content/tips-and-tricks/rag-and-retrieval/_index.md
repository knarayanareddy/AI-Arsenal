---
title: "RAG and Retrieval Tips & Tricks"
section: "tips-and-tricks/rag-and-retrieval"
auto_generated: false
---

# RAG and Retrieval Tips & Tricks

## What belongs here

Interventions for the retrieval pipeline itself — chunking strategy, chunk overlap, embedding model selection, reranking, hybrid search, query rewriting, metadata filtering, and chunk-level provenance metadata. Each tip changes one controllable parameter of an existing retrieval pipeline and can be measured against a recall or answer-quality eval set.

## What does NOT belong here

Choosing between naive RAG and agentic RAG, or designing a new retrieval architecture from scratch, is a disguised architecture decision and belongs in `build-examples/` or `architectures/`, not here. A tip about how retrieved context is formatted inside the prompt (delimiters, instruction placement) belongs in `prompting/` unless the failure mode is RAG-specific (e.g. prompt injection via retrieved documents), in which case it stays here.

## Quick-start: highest impact tips in this phase

- [Choose Chunk Size by Expected Answer Span Length, Not a Default](./choose-chunk-size-by-answer-span-length.md) — size chunks against measured answer-span length instead of a copied default
- [Add a Reranker Before Changing Your Chunking Strategy](./prefer-reranking-before-rechunking.md) — try a two-stage reranker before more expensive rechunking work
- [Use Parent-Child Chunking to Balance Precision and Context](./use-parent-child-chunking-for-long-documents.md) — decouple embedding precision from generation context via a parent/child mapping

## Tips in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Rag And Retrieval in This Phase

### Recently Added

- [Add Hybrid Search for Exact-Match Terms](./add-hybrid-search-for-exact-terms.md)
- [Add a Reranker Only After First-Stage Recall Is Acceptable](./add-reranking-after-recall-is-acceptable.md)
- [Classify Multi-Hop Questions Before Relying on Single-Pass Retrieval](./detect-multi-hop-questions-explicitly.md)
- [Keep Instructions Outside Retrieved Context](./keep-instructions-outside-retrieved-context.md)
- [Measure Retrieval Recall Before Blaming Answer Quality](./measure-retrieval-recall-before-answer-quality.md)
- [Start With Zero Chunk Overlap, Then Add It Where Needed](./start-with-zero-chunk-overlap.md)
- [Store Parser and Chunker Version With Every Chunk](./store-parser-version-with-every-chunk.md)
- [Treat Retrieved Text as Untrusted Input](./treat-retrieved-text-as-untrusted.md)
- [Apply Metadata Filters Before Similarity Search](./use-metadata-filters-before-similarity-search.md)
- [Rewrite Vague Queries Before Embedding Them](./use-query-rewriting-for-vague-questions.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Add Hybrid Search for Exact-Match Terms](./add-hybrid-search-for-exact-terms.md) — 
- [Add a Reranker Only After First-Stage Recall Is Acceptable](./add-reranking-after-recall-is-acceptable.md) — 
- [Choose Chunk Size by Expected Answer Span Length, Not a Default](./choose-chunk-size-by-answer-span-length.md) — 
- [Classify Multi-Hop Questions Before Relying on Single-Pass Retrieval](./detect-multi-hop-questions-explicitly.md) — 
- [Compare Embedding Models Before Changing Your Chunking Strategy](./evaluate-embedding-models-before-rechunking.md) — 
- [Keep Instructions Outside Retrieved Context](./keep-instructions-outside-retrieved-context.md) — 
- [Store Source Page and Section Metadata With Every Chunk](./keep-source-page-and-section-metadata.md) — 
- [Measure Retrieval Recall Before Blaming Answer Quality](./measure-retrieval-recall-before-answer-quality.md) — 
- [Add a Reranker Before Changing Your Chunking Strategy](./prefer-reranking-before-rechunking.md) — 
- [Tune Chunk Overlap Only After Chunk Size Is Set](./rag-chunk-overlap-tuning.md) — 
- [Start With Zero Chunk Overlap, Then Add It Where Needed](./start-with-zero-chunk-overlap.md) — 
- [Store Parser and Chunker Version With Every Chunk](./store-parser-version-with-every-chunk.md) — 
- [Treat Retrieved Text as Untrusted Input](./treat-retrieved-text-as-untrusted.md) — 
- [Apply Metadata Filters Before Similarity Search](./use-metadata-filters-before-similarity-search.md) — 
- [Use Parent-Child Chunking to Balance Precision and Context](./use-parent-child-chunking-for-long-documents.md) — 
- [Rewrite Vague Queries Before Embedding Them](./use-query-rewriting-for-vague-questions.md) — 
- [Return Sentence Windows for Dense Manuals and Policy Docs](./use-sentence-windows-for-dense-manuals.md) — 

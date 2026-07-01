---
title: "Retrieval and Memory Research"
section: "research/retrieval-and-memory"
auto_generated: false
---

# Retrieval and Memory Research

## What belongs here

RAG techniques, dense and hybrid retrieval, long-context memory strategies, knowledge-graph-backed retrieval, vector indexing approaches, and retrieval-specific evaluation techniques (like HyDE's zero-shot retrieval or RAPTOR's hierarchical summarization) — papers whose primary contribution is how a system finds and incorporates external information.

## What does NOT belong here

The paper that coined the term "RAG" itself ([Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](../foundational/lewis-2020-rag.md)) lives in `foundational/`, not here, because nearly every entry in this folder is implicitly building on the vocabulary and framing it established — see that entry's placement rationale for the reasoning. A paper about evaluating RAG pipeline quality (rather than proposing a retrieval technique itself) belongs in `evaluation-and-safety/` (see `ragas-paper` there).

## Engineering frame

When I am designing a retrieval or memory system for an LLM application, which technique fits my specific retrieval problem (global summarization vs. targeted lookup vs. zero-shot retrieval without labeled data), and is it still the current default or has simpler tooling superseded it in practice?

## Reading order guidance

- Read [Precise Zero-Shot Dense Retrieval without Relevance Labels (HyDE)](./gao-2022-hyde.md) first for the narrowest, most broadly-applicable technique (useful specifically when you lack labeled relevance data).
- Read [RAPTOR](./sarthi-2024-raptor.md) next for hierarchical, multi-level summarization retrieval — a different retrieval shape than flat top-k search.
- Read [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](./edge-2024-graphrag.md) last — the narrowest-scope entry in this folder, useful specifically for global/holistic summarization queries over private corpora, not general-purpose RAG.

## Papers in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Retrieval And Memory in This Phase

### Recently Added

_No entries yet._

### Most Popular

_No star-tracked entries yet._

### Browse All

_No entries yet._

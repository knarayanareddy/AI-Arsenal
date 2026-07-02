---
id: "use-query-rewriting-for-vague-questions"
title: "Rewrite Vague Queries Before Embedding Them"
category: "rag-tuning"
tags:
  - rag
  - retrieval
  - embeddings
difficulty: "intermediate"
impact: "medium"
time_to_implement: "45 minutes"
phase: rag-and-retrieval
effort: hours
estimated_time: "~45 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (query-rewriting RAG patterns)"
applies_to:
  - conversational-rag
  - rag-pipelines
gotchas:
  - "Query rewriting adds an extra model call and latency before retrieval even starts -- measure the added latency against the recall improvement before adopting it universally"
  - "A rewriting step can over-specify a genuinely ambiguous question, injecting an assumption that wasn't in the original query and skewing retrieval toward the wrong interpretation"
metrics: []
related_tips:
  - detect-multi-hop-questions-explicitly
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Rewrite short, ambiguous, or context-dependent queries (e.g. "what about the second one?") into a self-contained, retrieval-friendly form before embedding them. Embedding models are trained to match well-formed semantic content; a vague or elliptical query embeds poorly and retrieves weakly-related passages even when the underlying information need is answerable from the corpus.

## Before / After

**Before:** `embed_and_search("what about pricing?")` in a multi-turn conversation, with no reference to what "pricing" refers to.

**After:** `rewritten = rewrite_with_conversation_history("what about pricing?", history)` producing `"What is the pricing for the Enterprise plan discussed earlier?"`, then embedding and searching the rewritten query.

## Implementation

Before the retrieval step, pass the raw query plus recent conversation history through a lightweight rewriting call (a smaller/cheaper model is usually sufficient) that resolves references and expands ellipsis, then embed the rewritten form instead of the raw query.

## Gotchas

- Query rewriting adds an extra model call and latency before retrieval even starts — measure the added latency against the recall improvement
- A rewriting step can over-specify a genuinely ambiguous question, injecting an assumption that wasn't in the original query

## When NOT to Apply

- Skip this for single-turn, already well-formed queries where rewriting adds latency without a retrieval benefit
- Not useful if your retrieval failures are dominated by chunking or embedding-model quality rather than query ambiguity — diagnose with `measure-retrieval-recall-before-answer-quality` first

## Verification

Community-reported: query rewriting before retrieval is a commonly cited pattern in conversational RAG writeups, not independently benchmarked here against a named production system.

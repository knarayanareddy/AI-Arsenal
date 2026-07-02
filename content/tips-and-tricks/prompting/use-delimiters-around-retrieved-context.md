---
id: "use-delimiters-around-retrieved-context"
title: "Wrap Retrieved Context in Explicit Delimiters"
category: "prompting"
tags:
  - llm
  - structured-output
difficulty: "beginner"
impact: "medium"
time_to_implement: "20 minutes"
phase: prompting
effort: minutes
estimated_time: "~20 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (RAG prompt-formatting discussions)"
applies_to:
  - rag-pipelines
gotchas:
  - "Without a delimiter, retrieved text can visually blend into surrounding instructions, especially when the retrieved passage itself contains instruction-like phrasing"
  - "Delimiters alone are a formatting aid, not a security boundary -- pair with `treat-retrieved-text-as-untrusted` for actual injection defense, not just readability"
metrics: []
related_tips:
  - use-xml-tags-for-long-prompt-sections
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Wrap retrieved passages in explicit delimiters (XML-style tags, triple backticks, or a clear marker) so the boundary between retrieved content and surrounding instructions is unambiguous. Without a clear boundary, the model can have difficulty distinguishing where retrieved text ends and the next instruction begins, especially for long or multi-passage context.

## Before / After

**Before:** `f"Answer using this: {retrieved_text} Now answer the question: {question}"` — no visual boundary around the retrieved block.

**After:** `f"<context>{retrieved_text}</context>\n\nQuestion: {question}"` — an explicit tag marks where retrieved content starts and ends.

## Implementation

Wrap every retrieved passage in a consistent delimiter (a single tag style used throughout the application) at prompt-assembly time, placed clearly before the question or instruction that follows.

## Gotchas

- Without a delimiter, retrieved text can blend into surrounding instructions, especially if it contains instruction-like phrasing
- Delimiters are a formatting aid, not a security boundary — pair with `treat-retrieved-text-as-untrusted` for actual injection defense

## When NOT to Apply

- Skip this for very short, single-fact retrieved snippets where boundary ambiguity isn't practically possible
- Not a substitute for real prompt-injection defenses if your retrieval sources are untrusted — delimiters improve clarity, not security, on their own

## Verification

Community-reported: wrapping retrieved context in explicit delimiters is a widely repeated recommendation in RAG prompt-formatting writeups, not independently benchmarked here against a named production system.

---
id: "ask-for-quotes-before-answers-in-rag-prompts"
title: "Ask for Supporting Quotes Before Answers in RAG Prompts"
category: "prompting"
tags:
  - rag
  - llm
  - retrieval
difficulty: "beginner"
impact: "medium"
time_to_implement: "30 minutes"
phase: prompting
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (grounded-generation prompt patterns)"
applies_to:
  - rag-pipelines
gotchas:
  - "Models can fabricate plausible-looking quotes -- the pattern only pays off when quotes are programmatically verified against the retrieved text"
  - "Quote-first output adds tokens and latency to every response; budget for it or restrict it to accuracy-critical endpoints"
metrics: []
related_tips:
  - use-delimiters-around-retrieved-context
  - inspect-retrieved-chunks-beside-the-answer
added_date: "2026-07-07"
added_by: maintainer
last_reviewed: "2026-07-07"
enrichment_status: draft
---

## What & Why

In RAG prompts for accuracy-critical answers, instruct the model to first extract verbatim quotes from the retrieved context that support the answer, and then compose the answer from those quotes — with a stated rule for the no-support case ("if no relevant quote exists, say so"). Making support extraction an explicit prior step conditions generation on evidence the model has already committed to, reduces unsupported claims, and produces a machine-checkable artifact: quotes either appear in the retrieved text or they don't.

## Before / After

**Before:** "Answer the question using the context above." The model blends retrieved facts with prior knowledge, and there is no way to tell which claims are grounded.

**After:** "First list verbatim quotes from the context that support your answer (or state that none exist). Then answer using only those quotes." A post-processing check verifies each quote appears in the retrieved chunks and flags responses whose quotes fail the match.

## Implementation

Add the two-step instruction with structured output (a quotes array plus an answer field). Verify quotes with a substring or normalized-fuzzy match against the retrieved chunks; route quote-verification failures to a fallback (regenerate, or answer with a no-support disclaimer). Track the quote-match rate as a groundedness metric per prompt version.

## Gotchas

- Unverified quotes are decoration — fabricated quotes look identical to real ones until matched against the source
- The pattern costs output tokens on every call; apply it where wrong answers are expensive, not everywhere

## When NOT to Apply

- Skip for creative, conversational, or synthesis-heavy endpoints where verbatim support is the wrong contract
- Skip when answers legitimately require reasoning across many fragments — quote lists grow unwieldy; consider citation IDs per claim instead

## Verification

Community-reported: quote-then-answer prompting is a documented grounded-generation pattern (including in provider prompting guides) with the verification step as the operative mechanism; effect sizes are task-dependent.

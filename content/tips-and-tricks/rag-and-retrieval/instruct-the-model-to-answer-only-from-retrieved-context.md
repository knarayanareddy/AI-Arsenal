---
id: "instruct-the-model-to-answer-only-from-retrieved-context"
title: "Instruct the Model to Answer Only From Retrieved Context, With a No-Answer Escape Hatch"
category: "production-gotchas"
tags:
  - rag
  - llm
  - evaluation
difficulty: "beginner"
impact: "high"
time_to_implement: "an hour"
phase: rag-and-retrieval
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (grounded-RAG prompting writeups)"
applies_to:
  - rag-pipelines
  - document-qa
  - citation-required-answers
gotchas:
  - "Without an explicit 'say you don't know if the context lacks the answer' instruction, the model falls back on parametric knowledge when retrieval misses, producing a fluent answer ungrounded in your corpus that looks identical to a grounded one"
  - "A no-answer escape hatch trades some helpfulness for faithfulness — the model may abstain on questions it could have answered from partial context, so tune the strictness and measure both the hallucination rate and the abstention rate, not only one"
metrics: []
related_tips:
  - keep-instructions-outside-retrieved-context
  - measure-retrieval-recall-before-answer-quality
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Tell the model explicitly to answer only from the retrieved context and to say it does not know when the context does not contain the answer. RAG retrieves imperfectly, and when the right passage is missing, an unconstrained model does not fail — it answers from its parametric memory, producing a confident, fluent response that is not grounded in your corpus and is indistinguishable from a grounded one to the end user. An explicit grounding instruction plus a no-answer escape hatch converts silent hallucination into an honest abstention you can detect and route.

## Before / After

**Before:** The prompt is "Answer the question using the context: {context}\n\nQuestion: {q}" — on a retrieval miss the model answers anyway from prior knowledge, and no signal distinguishes that from a grounded answer.

**After:** The prompt adds "Use only the provided context. If the context does not contain the answer, reply exactly: 'I don't have that information.'" — misses now surface as a detectable abstention instead of a fabricated answer.

## Implementation

Add a grounding directive to the system/instruction portion of the prompt (kept structurally separate from the retrieved text) that (1) restricts answers to the supplied context and (2) specifies a fixed no-answer response. Monitor the rate of the no-answer token in production as a retrieval-health signal, and evaluate on a labeled set that includes unanswerable questions so you measure both hallucination and over-abstention.

## Gotchas

- Without an explicit "say you don't know" instruction, the model falls back on parametric knowledge when retrieval misses, producing an ungrounded answer that looks identical to a grounded one.
- The escape hatch trades helpfulness for faithfulness; the model may abstain when it could have partially answered, so measure both hallucination and abstention rates and tune strictness.

## When NOT to Apply

- Skip the strict form when the product intentionally blends retrieved context with the model's general knowledge (an assistant, not a closed-book document QA system).
- Less critical when retrieval recall is measured and consistently high and answers are not user-facing or high-stakes.

## Verification

Community-reported: grounding instructions with a no-answer option are standard in faithful-RAG prompting; the effect on hallucination and abstention is prompt- and model-specific and is not benchmarked here.

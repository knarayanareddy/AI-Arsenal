---
id: "evaluate-the-end-to-end-task-not-only-components"
title: "Evaluate the End-to-End Task, Not Only Components"
category: "production-gotchas"
tags:
  - evaluation
  - llm
  - rag
difficulty: "intermediate"
impact: "high"
time_to_implement: "a day"
phase: evaluation
effort: day
estimated_time: "~1 day"
reversible: true
verification_status: community-reported
verified_by: "community reports (RAG/agent eval practice)"
applies_to:
  - evaluation-pipelines
gotchas:
  - "Strong component scores can coexist with a broken end-to-end result -- perfect retrieval feeding a prompt that ignores the context still fails the user"
  - "End-to-end evals are noisier and harder to attribute; keep component evals too so you can localize a failure once the system eval flags it"
metrics: []
related_tips:
  - slice-eval-metrics-by-input-segment
  - sample-production-traffic-into-eval-sets
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Component metrics — retrieval recall, classifier F1, judge score on an isolated step — are necessary but not sufficient. Users experience the *whole pipeline*, and a system can have excellent component numbers while the end-to-end output is wrong: the retriever finds the right chunk but the generation prompt ignores it, or each agent step is locally correct but the composed trajectory fails. Always maintain an end-to-end eval that measures the final user-facing outcome, and use component evals to *localize* failures the system eval surfaces — not as a substitute for it.

## Before / After

**Before:** Retrieval recall is 95% and the generator scores well on hand-fed context, so the team assumes RAG quality is fine — meanwhile users see answers that ignore the retrieved passages.

**After:** An end-to-end eval on real questions scores the final answer against ground truth, exposes the "ignores context" failure, and the component evals then pinpoint it to the generation step.

## Implementation

Define an end-to-end metric on the actual deliverable (final answer correctness, task completion, resolved ticket) over realistic inputs, ideally sampled from production. Run it alongside your component evals. When the system eval regresses, walk down the component evals and traces to localize the stage at fault. Keep both layers: system-level for truth, component-level for attribution.

## Gotchas

- End-to-end scores are noisier and harder to attribute — retain component evals to localize the cause
- A perfect component score is not evidence of a working system; only the end-to-end result is

## When NOT to Apply

- A single-step feature with no pipeline (one prompt, one output) is already end-to-end — no separate layer needed
- Deep unit-level debugging of one component legitimately isolates it temporarily; do not ship on component metrics alone

## Verification

Community-reported: end-to-end (system-level) evaluation is emphasized across RAG and agent evaluation guides precisely because component metrics can mislead. Specific metrics are task-dependent.

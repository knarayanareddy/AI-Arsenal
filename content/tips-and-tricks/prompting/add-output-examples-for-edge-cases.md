---
id: "add-output-examples-for-edge-cases"
title: "Add Few-Shot Examples for Edge Cases, Not Just the Happy Path"
category: "prompting"
tags:
  - llm
  - structured-output
difficulty: "beginner"
impact: "medium"
time_to_implement: "45 minutes"
phase: prompting
effort: hours
estimated_time: "~45 minutes"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (few-shot prompting failure-mode writeups)"
applies_to:
  - classification-tasks
  - extraction-tasks
gotchas:
  - "A prompt with only happy-path examples silently generalizes badly on inputs shaped like edge cases -- the model has no demonstrated behavior for null values, empty inputs, or out-of-scope requests, and improvises inconsistently"
  - "Adding too many edge-case examples relative to typical-case examples can skew the model toward over-flagging normal inputs as edge cases -- keep the ratio close to your actual input distribution"
metrics: []
related_tips:
  - order-few-shot-examples-by-similarity
  - state-negative-constraints-as-testable-rules
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Include at least one few-shot example demonstrating a known edge case (empty input, ambiguous input, out-of-scope request, malformed data) alongside typical happy-path examples. Few-shot examples teach the model a distribution of expected behavior; if that distribution never includes edge cases, the model has no demonstrated pattern for handling them and improvises inconsistently at inference time.

## Before / After

**Before:** three few-shot examples, all well-formed inputs with clean expected outputs.

**After:** two happy-path examples plus one edge-case example (e.g. an input missing a required field, paired with the exact clarifying-question or fallback output expected).

## Implementation

Identify the 1-3 most frequent edge cases from production traces or known failure modes, write one demonstrated (input, correct-output) pair for each, and insert them alongside your existing happy-path few-shot examples rather than replacing them.

## Gotchas

- A prompt with only happy-path examples generalizes inconsistently on edge-case-shaped inputs, since the model has no demonstrated behavior for them
- Too many edge-case examples relative to typical-case examples can skew the model toward over-flagging normal inputs — keep the ratio close to your real input distribution

## When NOT to Apply

- Skip this if the task genuinely has no meaningful edge cases (e.g. a fixed-format transformation with no ambiguous inputs possible)
- Not useful if you don't yet know what your actual edge cases are — instrument production traces first, then come back and add examples for the ones that actually occur

## Verification

Production-verified: demonstrating edge-case handling via few-shot examples rather than relying on generalization is a well-documented mitigation in few-shot prompting failure-mode writeups.

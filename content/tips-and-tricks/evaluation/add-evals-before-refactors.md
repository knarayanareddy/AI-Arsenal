---
id: "add-evals-before-refactors"
title: "Add an Eval Harness Before Refactoring Prompts or Retrieval Logic"
category: "prompting"
tags:
  - evaluation
  - llm
difficulty: "beginner"
impact: "high"
time_to_implement: "30 minutes"
phase: evaluation
effort: hours
estimated_time: "~30 minutes"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (regression-driven prompt/pipeline change discipline)"
applies_to:
  - prompt-refactoring
  - pipeline-changes
gotchas:
  - "Without a baseline eval run before the change, there is no way to distinguish an actual quality regression from normal output variance -- the comparison point has to exist before the refactor happens, not be reconstructed afterward"
  - "A minimal eval set (even 15-20 representative cases) is enough to catch large regressions -- waiting for a comprehensive eval suite before making any change means changes never happen safely at all"
metrics: []
related_tips:
  - version-your-eval-datasets
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Before refactoring a prompt, retrieval step, or any other part of an LLM pipeline, run the existing behavior against a representative eval set and record the baseline. Without a pre-change baseline, there is no way to tell whether a refactor improved, regressed, or had no effect on output quality — you're left comparing memory of "how it used to feel" against the new behavior.

## Before / After

**Before:** a prompt is edited directly in production code, with quality assessed informally by spot-checking a few outputs after deployment.

**After:** the existing prompt is run against a 15-20 case eval set, the baseline scores are recorded, the refactor is made, and the same eval set is re-run to produce a before/after comparison.

## Implementation

Build or reuse a small eval set (15-20 representative cases covering typical and edge-case inputs), run it against current behavior to record a baseline score, make the intended change, and re-run the same eval set to measure the actual delta before shipping.

## Gotchas

- Without a pre-change baseline, there's no way to distinguish an actual regression from normal output variance
- A minimal eval set is enough to catch large regressions — waiting for a comprehensive suite before any change means changes never happen safely

## When NOT to Apply

- Skip formal eval-before-refactor for cosmetic changes with no behavioral impact (e.g. renaming an internal variable)
- Not sufficient on its own for very high-stakes changes — pair with staged rollout and production monitoring, since a static eval set can't catch every real-world input pattern

## Verification

Production-verified: running a baseline eval before making prompt or pipeline changes is a standard, widely documented practice in LLM application engineering discipline.

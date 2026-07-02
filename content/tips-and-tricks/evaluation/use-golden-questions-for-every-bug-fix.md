---
id: "use-golden-questions-for-every-bug-fix"
title: "Add the Failing Question to Your Eval Set Before Fixing the Bug"
category: "debugging-llm-apps"
tags:
  - observability
  - evaluation
difficulty: "beginner"
impact: "high"
time_to_implement: "20 minutes"
phase: evaluation
effort: minutes
estimated_time: "~20 minutes"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (regression-test-from-real-failure discipline)"
applies_to:
  - eval-dataset-growth
gotchas:
  - "Fixing a bug without adding the case to the eval set means the same failure can silently reappear in a future change with nothing to catch it -- the eval set only grows if this step is actually enforced as part of the fix workflow"
  - "Adding the raw failing question isn't enough on its own -- it needs an expected-correct-answer or acceptance criterion attached, or it can't be used as an automated regression check"
metrics: []
related_tips:
  - version-your-eval-datasets
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Every time a real user-reported failure is diagnosed, add that exact question (with its correct expected answer) to the permanent eval set before fixing the underlying bug. This turns every production failure into a permanent regression test, so the same failure mode is automatically caught if a future change reintroduces it.

## Before / After

**Before:** a bug is fixed based on a reported failure, and the specific failing case is discarded once the fix is verified manually.

**After:** the failing question and its correct expected answer are added to the eval set first, the fix is verified against it, and the case remains as a permanent regression check for all future changes.

## Implementation

When a real failure is diagnosed, capture the exact input and the correct expected output, add both as a new case in the eval dataset, verify the fix resolves that specific case, and keep the case in the suite going forward.

## Gotchas

- Fixing a bug without adding the case to the eval set means the same failure can silently reappear with nothing to catch it
- The raw failing question alone isn't enough — it needs an expected-correct-answer attached to function as an automated regression check

## When NOT to Apply

- Skip this for failures caused by transient infrastructure issues (e.g. a one-off provider outage) rather than a genuine logic or prompt defect
- Not meaningful for failures that are inherently non-reproducible (e.g. dependent on live, constantly-changing external data) — document those separately instead

## Verification

Production-verified: growing an eval set from real production failures is a standard, widely documented regression-testing discipline in LLM application engineering.

---
id: "run-evals-multiple-times-before-trusting-deltas"
title: "Run Evals Multiple Times Before Trusting Small Deltas"
category: "debugging-llm-apps"
tags:
  - evaluation
  - llm
difficulty: "beginner"
impact: "medium"
time_to_implement: "1 hour"
phase: evaluation
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (eval variance discussions)"
applies_to:
  - llm-apps
  - rag-pipelines
  - agents
gotchas:
  - "Setting temperature to 0 does not make hosted-model outputs deterministic -- provider-side nondeterminism persists, so measured variance is still required"
  - "Variance from the judge stacks on variance from the system under test -- repeated runs measure both together unless the judge is deterministic"
metrics: []
related_tips:
  - use-rubric-anchored-llm-judges
  - version-your-eval-datasets
added_date: "2026-07-07"
added_by: maintainer
last_reviewed: "2026-07-07"
enrichment_status: draft
---

## What & Why

Before declaring that a prompt or model change improved quality, run the eval suite several times (3-5) for both variants and compare score distributions, not single numbers. LLM systems are nondeterministic end to end — sampling, provider-side variation even at temperature 0, and judge noise — so single-run scores on a few hundred examples routinely differ by several points between identical runs. A 2-point single-run improvement is frequently sampling noise wearing a victory costume.

## Before / After

**Before:** New prompt scores 84% versus 81% and ships as an improvement. Re-running the old prompt the next day yields 84.5%.

**After:** Both variants run 5 times: old scores 81-85% (mean 83.2), new scores 82-85% (mean 83.6). The delta is within run-to-run noise and the change is judged neutral — saving a false-progress narrative.

## Implementation

Measure your suite's run-to-run variance once by repeating an identical configuration; that spread is your noise floor, and any delta below it needs more runs or a bigger eval set before it means anything. For decisions, run each variant 3-5 times, compare means with the spread in view, and prefer paired per-example comparisons (which variant won on each item) — they detect real differences with fewer runs than aggregate scores.

## Gotchas

- Temperature 0 reduces but does not remove nondeterminism on hosted models — measure, don't assume
- Judge noise and system noise compound; a deterministic programmatic check on the same runs isolates the system's own variance

## When NOT to Apply

- Deltas far above the noise floor (an order of magnitude larger) don't need repeated confirmation before acting
- Fully deterministic pipelines with programmatic checks (fixed seeds, local models, exact-match scoring) can trust single runs

## Verification

Community-reported: run-to-run eval variance on identical configurations is widely documented across eval platforms and benchmark reproduction studies; typical magnitudes depend on suite size and judge design.

---
id: "report-confidence-intervals-on-eval-scores"
title: "Report Confidence Intervals on Small-Set Eval Scores"
category: "debugging-llm-apps"
tags:
  - evaluation
  - llm
difficulty: "intermediate"
impact: "medium"
time_to_implement: "an hour"
phase: evaluation
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (statistical eval practice)"
applies_to:
  - evaluation-pipelines
gotchas:
  - "On a 50-case set, a 4-point score difference is usually inside the noise -- treating it as a real improvement leads to shipping non-changes"
  - "Bootstrapping over eval cases captures sampling noise but not judge/model stochasticity; combine with repeated runs to capture both"
metrics: []
related_tips:
  - run-evals-multiple-times-before-trusting-deltas
  - pair-every-eval-score-with-a-baseline
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Small eval sets produce noisy scores, and a point estimate hides that noise. A model that scores 78% on 50 cases has a confidence interval wide enough that 72% and 84% are both plausible — so a "2-point gain" over the baseline is very likely nothing. Reporting a confidence interval (or at least the set size and a bootstrap range) forces everyone to reason about whether a delta is real before acting on it. It is the difference between measuring an improvement and imagining one.

## Before / After

**Before:** "New version: 80%, old: 78% — ship it." The interval on 50 cases spans roughly ±11 points, so the 2-point gain is noise.

**After:** "New: 80% [70-89%], old: 78% [68-87%] on n=50 — overlapping intervals, not a real gain," and the team either expands the eval set or holds.

## Implementation

Bootstrap resample your eval cases (sample with replacement, recompute the metric, repeat ~1000x) to get a percentile interval, and always report the set size alongside the score. For pass/fail metrics, a binomial interval works too. When the interval is too wide to decide, the fix is more eval cases or more repeated runs — not a bigger claim about a small delta.

## Gotchas

- Bootstrapping captures case-sampling variance but not run-to-run model/judge variance; pair it with repeated runs for the full picture
- Overlapping intervals mean "not distinguishable at this sample size," which is information, not failure

## When NOT to Apply

- Very large eval sets (tens of thousands of cases) have tight intervals where the point estimate is already reliable enough
- Deterministic pass/fail gates on a fixed regression suite may care about specific failing cases, not aggregate intervals

## Verification

Community-reported: reporting uncertainty on benchmark scores is standard statistical practice and increasingly expected in LLM evaluation. Exact interval widths depend on set size and metric and are illustrative here.

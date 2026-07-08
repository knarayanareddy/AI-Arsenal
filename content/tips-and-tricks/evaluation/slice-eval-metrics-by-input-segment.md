---
id: "slice-eval-metrics-by-input-segment"
title: "Slice Eval Metrics by Input Segment Instead of Trusting the Average"
category: "debugging-llm-apps"
tags:
  - evaluation
  - observability
difficulty: "intermediate"
impact: "high"
time_to_implement: "2-4 hours"
phase: evaluation
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "community reports (ML slice-based evaluation practice; eval tooling docs)"
applies_to:
  - llm-evaluation-pipelines
gotchas:
  - "Small slices produce noisy metrics — a 10-example slice swinging 10% per run is sampling noise, not signal; enforce a minimum slice size before trusting deltas"
  - "Slicing by too many dimensions at once creates hundreds of micro-slices nobody reviews; start with 3-5 segments that map to real product decisions"
metrics: []
related_tips:
  - version-your-eval-datasets
  - set-pass-fail-thresholds-before-running-evals
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Tag every eval example with segment metadata (language, intent type, input length, customer tier, difficulty) and report metrics per segment, not only overall. Aggregate scores are dominated by whatever segment is most common in the eval set: a model change that improves easy English queries by 3% while breaking long-context or non-English queries entirely can show up as a net *improvement* in the average. Slices are where regressions actually live.

## Before / After

**Before:** "Accuracy went from 86% to 87%, ship it" — while accuracy on the 8% of traffic that is multi-turn dropped from 80% to 55%.

**After:** Eval report is a table of segments × metrics; the multi-turn row turns red and blocks the release even though the topline improved.

## Implementation

Add a `segment` metadata field (or several) to each eval example, group results by segment in the report, and set minimum slice sizes so noisy micro-slices are flagged as inconclusive rather than pass/fail.

## Gotchas

- Small slices are noisy — enforce a minimum slice size (e.g. 30+ examples) before trusting deltas
- Too many slicing dimensions creates micro-slices nobody reviews — start with 3-5 segments tied to real product decisions

## When NOT to Apply

- Eval sets under ~100 examples: slicing them produces segments too small to be meaningful — grow the set first
- Genuinely homogeneous workloads (single language, single narrow task) where segments would be arbitrary

## Verification

Community-reported: slice-based evaluation is established ML evaluation practice (subgroup analysis) repeatedly recommended in LLM eval writeups and supported natively by eval tooling; not independently benchmarked here against a named production system.

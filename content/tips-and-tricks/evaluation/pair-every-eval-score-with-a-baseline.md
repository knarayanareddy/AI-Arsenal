---
id: "pair-every-eval-score-with-a-baseline"
title: "Pair Every Eval Score With a Baseline"
category: "debugging-llm-apps"
tags:
  - evaluation
  - llm
difficulty: "beginner"
impact: "high"
time_to_implement: "an hour"
phase: evaluation
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (eval methodology practice)"
applies_to:
  - evaluation-pipelines
gotchas:
  - "A single accuracy number with no baseline is uninterpretable -- 82% could be excellent or terrible depending on task difficulty and the prior system"
  - "The baseline must be run on the same eval set and harness; comparing your score to a number quoted from a paper on a different set is not a valid comparison"
metrics: []
related_tips:
  - set-pass-fail-thresholds-before-running-evals
  - run-evals-multiple-times-before-trusting-deltas
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

An eval score in isolation carries almost no information. "The model scores 82%" tells you nothing until you know what a trivial baseline scores and what the previous system scored on the *same* set. Always report your number next to at least one reference point: a naive baseline (majority class, retrieval-only, last release) and, when relevant, a strong reference (a bigger model, human performance). The delta against a baseline is the real signal; the absolute number is often a distraction.

## Before / After

**Before:** A report says "the new prompt scores 82% on our eval," a stakeholder approves it, and nobody notices the old prompt already scored 84%.

**After:** The report shows new 82% vs. previous 84% vs. majority-class 60%; the regression is obvious and the change is held back.

## Implementation

Define one or two baselines up front and run them through the identical eval harness and dataset: a cheap naive baseline for a floor, and the currently-deployed system for the comparison that matters. Report all scores side by side, always as deltas against the deployed baseline. Re-run the baseline whenever the eval set changes so the comparison stays apples-to-apples.

## Gotchas

- Quoting a headline number from a paper or leaderboard as your "baseline" is invalid unless it ran on your exact set and harness
- A baseline that is stale (run on an old version of the eval set) produces a misleading delta

## When NOT to Apply

- Pure exploratory probing where you only want qualitative examples, not a comparison, can skip formal baselines
- If a canonical baseline for the task genuinely does not exist yet, establish the naive floor first rather than skipping the idea

## Verification

Community-reported: baseline-relative reporting is foundational eval methodology across ML and LLM evaluation guides. The choice of baseline is task-specific and not prescribed here.

---
id: "set-pass-fail-thresholds-before-running-evals"
title: "Set Pass/Fail Thresholds Before Running Evals, Not After Seeing Results"
category: "debugging-llm-apps"
tags:
  - evaluation
difficulty: "beginner"
impact: "high"
time_to_implement: "30 minutes"
phase: evaluation
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (eval methodology writeups; standard pre-registration practice)"
applies_to:
  - llm-evaluation-pipelines
gotchas:
  - "Thresholds set without baseline data are guesses — run the eval once on your current system to calibrate, then freeze the threshold for future comparisons"
  - "A single aggregate threshold can hide regressions in critical slices; set per-slice thresholds for high-stakes categories"
metrics: []
related_tips:
  - version-your-eval-datasets
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Decide what score counts as passing — per metric, and per critical slice — before the eval runs. When thresholds are chosen after seeing results, the natural bias is to rationalize whatever the current system scores as acceptable ("87% seems fine"), which quietly converts the eval from a gate into a rubber stamp. Pre-committed thresholds make regressions undeniable and force the team to articulate what quality bar the product actually requires.

## Before / After

**Before:** Run eval → look at score → debate in Slack whether 84% is acceptable this time → ship.

**After:** Threshold recorded in the eval config (`min_accuracy: 0.85`, `max_hallucination_rate: 0.02`) before the run; CI fails the deploy automatically when breached, and changing a threshold requires an explicit reviewed commit.

## Implementation

Calibrate once against your current production system, write thresholds into version-controlled eval config, wire them into CI as blocking assertions, and require threshold changes to go through code review with a stated rationale.

## Gotchas

- Thresholds set without baseline data are guesses — calibrate on the current system first, then freeze
- Aggregate thresholds hide slice regressions — set separate floors for high-stakes categories (safety, top customer intents)

## When NOT to Apply

- Early prototyping where the eval set itself is still churning — premature gates on unstable metrics generate noise, not discipline
- Exploratory evals whose purpose is characterization rather than gating

## Verification

Community-reported: pre-committing acceptance criteria mirrors pre-registration practice in experimental methodology and is a recurring recommendation in LLM eval-pipeline writeups; not independently benchmarked here against a named production system.

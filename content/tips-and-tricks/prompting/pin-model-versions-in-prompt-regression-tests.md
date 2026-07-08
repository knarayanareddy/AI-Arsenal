---
id: "pin-model-versions-in-prompt-regression-tests"
title: "Pin Model Versions in Prompt Regression Tests"
category: "prompting"
tags:
  - evaluation
  - llm
difficulty: "beginner"
impact: "medium"
time_to_implement: "30 minutes"
phase: prompting
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (model-alias drift incidents)"
applies_to:
  - llm-apps
gotchas:
  - "Pinned snapshots get deprecated by providers -- pinning requires a scheduled migration ritual, or tests break on the provider's timeline instead of yours"
  - "Local models need the same discipline via weights/quantization pinning, not only a model name"
metrics: []
related_tips:
  - version-system-prompts-like-code
  - run-evals-multiple-times-before-trusting-deltas
added_date: "2026-07-07"
added_by: maintainer
last_reviewed: "2026-07-07"
enrichment_status: draft
---

## What & Why

Prompt regression tests must call a pinned model snapshot (an exact dated version identifier), never a floating alias like a bare model family name. Providers move aliases to new snapshots without your involvement; when that happens, every prompt test failure becomes ambiguous — did the prompt change break something, or did the model underneath move? Pinning restores the single-variable property that makes a regression test a test.

## Before / After

**Before:** CI prompt tests call a floating `latest`-style alias. One morning a third of them fail with no code change; a day is lost before anyone suspects the alias moved to a new snapshot.

**After:** Tests call an exact dated snapshot. Model upgrades are deliberate: bump the pinned version in a branch, run the full suite, review diffs, merge.

## Implementation

Replace floating aliases with exact snapshot identifiers in test configuration, and record the pinned version inside test output so historical results are interpretable. Add a calendar reminder or deprecation-watch for the pinned snapshot's retirement date, and treat model upgrades as reviewed changes with their own eval run.

## Gotchas

- Pinned snapshots have provider-set end-of-life dates; the migration ritual is part of the practice
- For self-hosted models, pin weights revision and quantization level — the serving engine's model name alone is not identity

## When NOT to Apply

- A small set of canary tests deliberately tracking the floating alias is useful for early warning of upcoming behavior shifts — keep them separate from the regression suite
- Exploratory notebooks don't need pinning; the discipline applies where results gate decisions

## Verification

Community-reported: alias-drift breaking prompt suites is a recurring incident pattern in practitioner reports; snapshot pinning is the standard prevention in provider documentation.

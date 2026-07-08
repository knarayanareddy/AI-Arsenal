---
id: "hold-out-an-eval-set-before-any-training"
title: "Hold Out an Eval Set Before Any Training Run Touches the Data"
category: "production-gotchas"
tags:
  - fine-tuning
  - evaluation
  - data
difficulty: "beginner"
impact: "high"
time_to_implement: "1 hour"
phase: fine-tuning
effort: hours
estimated_time: "~1 hour"
reversible: false
verification_status: community-reported
verified_by: "community reports (standard ML practice applied to LLM tuning)"
applies_to:
  - fine-tuning-workflows
gotchas:
  - "Near-duplicates across the train/eval split leak silently -- deduplicate semantically (embedding similarity), not only by exact string match"
  - "An eval set carved out after several training iterations is contaminated by selection: examples the team looked at while debugging are no longer held out"
metrics: []
related_tips:
  - version-your-eval-datasets
  - establish-a-prompting-baseline-before-fine-tuning
added_date: "2026-07-07"
added_by: maintainer
last_reviewed: "2026-07-07"
enrichment_status: draft
---

## What & Why

Split off a held-out eval set — and freeze it — before the first training run, not after. Post-hoc holdouts are systematically contaminated: examples the team has read while debugging, near-duplicates of training items, and distribution cherry-picking all inflate measured quality. The eval set is the only instrument that can tell you whether fine-tuning worked; it must be created while the data is still untouched by iteration.

## Before / After

**Before:** After three training iterations, 200 examples are set aside as the eval set. Scores look great; production quality doesn't match, because near-duplicates of half the eval items remain in the training set.

**After:** Before any run, 10% of data is split off, semantically deduplicated against the training portion, versioned, and never used for anything except scoring.

## Implementation

At dataset-creation time: shuffle, split, then deduplicate across the boundary using embedding similarity with a conservative threshold (removing eval items whose near-twin remains in training). Store the eval set under version control with a hash, and score every subsequent experiment — including the prompting baseline — against the same frozen set.

## Gotchas

- Exact-match dedup misses paraphrase leakage; semantic dedup across the split boundary is the step teams skip
- Any example a human inspected while iterating on training data is compromised as a holdout — freeze the set first, debug on the training side only

## When NOT to Apply

- Skip building a new holdout when a curated, versioned eval set for the task already exists — use it instead
- For tiny datasets (a few hundred examples) prefer cross-validation over a fixed split, but keep the leakage discipline

## Verification

Community-reported: held-out-first splitting is standard ML methodology; its application discipline for LLM fine-tuning pipelines is repeatedly re-learned in practitioner postmortems rather than benchmarked.

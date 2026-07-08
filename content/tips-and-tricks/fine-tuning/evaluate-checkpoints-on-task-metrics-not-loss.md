---
id: "evaluate-checkpoints-on-task-metrics-not-loss"
title: "Evaluate Checkpoints on Task Metrics, Not Training Loss"
category: "production-gotchas"
tags:
  - fine-tuning
  - evaluation
difficulty: "intermediate"
impact: "medium"
time_to_implement: "3 hours"
phase: fine-tuning
effort: hours
estimated_time: "~3 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (checkpoint-selection practice)"
applies_to:
  - fine-tuning-workflows
gotchas:
  - "Task-metric evaluation per checkpoint costs inference time -- budget it into the training run rather than skipping it when runs get long"
  - "A judge model scoring checkpoints must stay pinned for the duration of the comparison, or checkpoint deltas mix with judge drift"
metrics: []
related_tips:
  - hold-out-an-eval-set-before-any-training
  - version-your-eval-datasets
added_date: "2026-07-07"
added_by: maintainer
last_reviewed: "2026-07-07"
enrichment_status: draft
---

## What & Why

Select fine-tuning checkpoints by scoring each on the frozen task eval set — exact match, rubric scores, pass rates, whatever the task defines as success — instead of picking the lowest validation-loss checkpoint. Loss measures next-token prediction on the training distribution; it correlates loosely and sometimes inversely with task success, because formatting compliance, refusal behavior, and end-of-turn discipline all move independently of loss. The best-loss checkpoint is frequently not the best-task checkpoint.

## Before / After

**Before:** The checkpoint with minimum eval loss ships. It scores worse on the actual extraction task than the checkpoint from one epoch earlier, which nobody evaluated.

**After:** Every saved checkpoint is run against the task eval set; the shipping decision reads the task-metric curve, with loss kept only as a divergence alarm.

## Implementation

Save checkpoints at regular intervals. After training (or asynchronously during it), run each checkpoint over the frozen eval set through the same inference path production uses, and record task metrics per checkpoint. Pick on task metrics; investigate any large loss/task-metric disagreement, since it usually indicates a formatting or template problem.

## Gotchas

- Per-checkpoint inference has real cost on long runs — evaluate a spaced subset first, then densify around the peak
- Keep the judge and eval set pinned across the comparison, or the curve measures drift instead of checkpoints

## When NOT to Apply

- Skip for continued-pretraining runs where the objective genuinely is next-token prediction on a corpus
- If no task eval set exists yet, that is the blocking gap to fix — checkpoint selection is not meaningful without it

## Verification

Community-reported: the loss/task-quality divergence in instruction tuning is widely documented in practitioner writeups and trainer documentation; magnitudes are task-specific.

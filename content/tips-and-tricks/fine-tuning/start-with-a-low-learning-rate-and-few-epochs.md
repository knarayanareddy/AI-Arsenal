---
id: "start-with-a-low-learning-rate-and-few-epochs"
title: "Start With a Low Learning Rate and Few Epochs"
category: "debugging-llm-apps"
tags:
  - fine-tuning
  - llm
  - evaluation
difficulty: "beginner"
impact: "medium"
time_to_implement: "minutes to configure"
phase: fine-tuning
effort: minutes
estimated_time: "~10 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (SFT hyperparameter practice)"
applies_to:
  - fine-tuning-workflows
gotchas:
  - "Too-low a learning rate or too-few epochs underfits -- the model barely changes; the fix is to increase, guided by the eval curve, not to guess high from the start"
  - "Loss going down is not the same as generalizing; a falling train loss with a rising held-out error is overfitting, not progress"
metrics: []
related_tips:
  - hold-out-an-eval-set-before-any-training
  - evaluate-checkpoints-on-task-metrics-not-loss
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

The two hyperparameters most likely to wreck a fine-tune are learning rate and epoch count set too high. A high learning rate destabilizes the pretrained weights (the model "forgets" and outputs degrade); too many epochs over a small set memorizes the data and overfits. Starting conservative — a small learning rate and a single epoch — and increasing only when a held-out eval says the model is underfitting is far cheaper than debugging a model that has already collapsed. It also makes each experiment interpretable: you know which direction to move.

## Before / After

**Before:** First run uses an aggressive learning rate and 5 epochs; the model overfits the training set, loses general ability, and it's unclear which knob caused it.

**After:** First run is 1 epoch at a conservative learning rate; the eval shows mild underfitting, so you raise epochs/LR incrementally and watch the held-out curve turn.

## Implementation

Begin at a small learning rate typical for LoRA SFT (commonly ~1e-4 to 2e-4 for adapters; lower for full fine-tuning) with warmup and 1 epoch. Evaluate on a frozen held-out set, not train loss. If underfitting, increase epochs first, then learning rate, in small steps, re-checking the eval each time. Stop as soon as held-out task metrics plateau or start regressing.

## Gotchas

- Under-training looks like "fine-tuning didn't work" — check the eval before concluding the approach failed; the fix may be more steps, not a different method
- Watch the held-out metric, not the training loss, to distinguish learning from memorizing

## When NOT to Apply

- If you already have validated hyperparameters for this exact model/task/dataset shape, reuse them rather than re-searching from conservative defaults
- Large, diverse datasets tolerate (and may need) more epochs — the "few epochs" caution is strongest for small sets

## Verification

Community-reported: conservative-LR, low-epoch starting points are standard SFT guidance across PEFT and fine-tuning documentation. Exact optimal values are model- and dataset-specific and are not benchmarked here.

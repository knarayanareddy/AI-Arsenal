---
id: "mix-in-general-data-to-prevent-forgetting"
title: "Mix In General Data to Prevent Catastrophic Forgetting"
category: "production-gotchas"
tags:
  - fine-tuning
  - llm
  - evaluation
difficulty: "advanced"
impact: "medium"
time_to_implement: "a few hours"
phase: fine-tuning
effort: hours
estimated_time: "~2-3 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (continual-learning and SFT practice)"
applies_to:
  - fine-tuning-workflows
gotchas:
  - "Too much general data dilutes the task signal and the fine-tune underperforms on the target task; the mix ratio is a tuning knob, not a fixed rule"
  - "Forgetting is invisible unless you test for it -- a task-only eval will look great while general capability quietly degrades"
metrics: []
related_tips:
  - test-for-regressions-outside-the-tuned-task
  - hold-out-an-eval-set-before-any-training
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Fine-tuning hard on a narrow task can cause *catastrophic forgetting*: the model gets better at your task while losing general instruction-following, reasoning, or formatting it previously had. Blending a fraction of general instruction data (or a replay sample of the base model's style) into your task-specific set keeps the weights anchored to broad capability while still shifting toward the target behavior. This matters most for multi-epoch or full-parameter runs, where the drift is largest, but it's cheap insurance for adapter runs too.

## Before / After

**Before:** A model fine-tuned only on terse SQL generation now answers *every* prompt tersely and has lost its ability to explain or hold a normal conversation.

**After:** The training mix includes ~10-30% general instruction data; the model gains SQL skill while retaining general helpfulness, confirmed by a broad regression eval.

## Implementation

Assemble your task set, then blend in a portion of diverse general instruction examples (a common starting range is 10-30% general, tuned by eval). Shuffle so the model doesn't see all task data then all general data. Critically, evaluate on *both* a task metric and a general-capability regression set every run — the mix ratio should be chosen by what keeps both healthy, not by a guess.

## Gotchas

- The right ratio is data- and model-dependent; treat it as a hyperparameter and sweep it against a two-sided eval
- Adding general data increases dataset size and training time — budget for it

## When NOT to Apply

- Skip when the fine-tune is deliberately a single-purpose model that will never be asked general queries (e.g. a classifier head)
- LoRA adapters that are unloaded when not needed already limit blast radius; heavy replay may be unnecessary if the base stays intact

## Verification

Community-reported: replay / data-mixing to mitigate catastrophic forgetting is well documented in continual-learning literature and SFT practice. The optimal mixing ratio varies by task and is not independently benchmarked here.

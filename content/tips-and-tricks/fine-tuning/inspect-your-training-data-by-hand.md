---
id: "inspect-your-training-data-by-hand"
title: "Inspect a Random Sample of Training Data by Hand Before Every Run"
category: "production-gotchas"
tags:
  - fine-tuning
  - data
  - llm
difficulty: "beginner"
impact: "high"
time_to_implement: "1 hour"
phase: fine-tuning
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (data-quality postmortems)"
applies_to:
  - fine-tuning-workflows
gotchas:
  - "Sampling only the head of the file misses systematic corruption introduced mid-pipeline -- sample uniformly at random"
  - "Reviewing pre-formatting source records instead of the final serialized training examples misses template and tokenization bugs, which live in the last step"
metrics: []
related_tips:
  - match-training-and-inference-prompt-formats
added_date: "2026-07-07"
added_by: maintainer
last_reviewed: "2026-07-07"
enrichment_status: draft
---

## What & Why

Before launching any fine-tuning run, read 30-50 uniformly random examples from the final, serialized training file — the exact artifact the trainer will consume. Fine-tuning amplifies whatever is in the data: duplicated examples, leaked eval items, broken chat templates, truncated completions, and mislabeled records all train in silently and surface later as mysterious quality regressions. An hour of reading catches the failure classes that no aggregate statistic flags.

## Before / After

**Before:** The dataset pipeline reports 12,000 examples and passes a schema check; training starts. The model learns to end every response with a stray `</s>assistant` because a template bug affected 40% of examples.

**After:** Random-sample review before the run catches the malformed template in minutes; the run starts on clean data.

## Implementation

Sample uniformly at random from the final training file (not the upstream database). Read each example end-to-end asking: is the completion actually correct, is the format the one inference will use, would I want the model to produce this? Track the defect rate; anything above a few percent blocks the run and triggers a pipeline fix, not manual patching of the sampled items.

## Gotchas

- Head-of-file sampling misses mid-pipeline corruption — randomize
- Reviewing source records rather than serialized examples misses the template bugs that live in the final formatting step

## When NOT to Apply

- Skip re-review when the data pipeline is unchanged and only hyperparameters differ from the previous inspected run
- Manual reading does not replace automated dedup and eval-leakage checks — it complements them; skip neither

## Verification

Community-reported: hand-inspection before training is a standing recommendation in fine-tuning postmortems and data-quality writeups; the specific defect rates it catches are anecdotal.

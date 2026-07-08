---
id: "establish-a-prompting-baseline-before-fine-tuning"
title: "Establish a Prompting Baseline Before Fine-Tuning"
category: "cost-reduction"
tags:
  - fine-tuning
  - llm
  - evaluation
difficulty: "beginner"
impact: "high"
time_to_implement: "2 hours"
phase: fine-tuning
effort: hours
estimated_time: "~2 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (fine-tuning decision writeups)"
applies_to:
  - fine-tuning-workflows
gotchas:
  - "A weak baseline prompt makes fine-tuning look more valuable than it is -- invest real effort (few-shot examples, format instructions) in the baseline before comparing"
  - "Baselines built on a different model than the fine-tune target confound model choice with tuning benefit"
metrics: []
related_tips:
  - version-your-eval-datasets
added_date: "2026-07-07"
added_by: maintainer
last_reviewed: "2026-07-07"
enrichment_status: draft
---

## What & Why

Before committing to a fine-tuning run, build the strongest prompt-based version of the same capability — few-shot examples, explicit format rules, retrieval if applicable — and score it on the eval set the fine-tune will be judged against. Fine-tuning costs data preparation, training runs, and a permanent maintenance burden (re-tuning on every base-model upgrade); a serious prompting baseline is hours of work and frequently closes most of the gap, which changes or cancels the fine-tuning decision.

## Before / After

**Before:** "The model gets our ticket-tagging format wrong, let's fine-tune" — training starts against a one-line zero-shot prompt as the comparison point.

**After:** A tuned prompt with 8 curated few-shot examples scores 91% on the tagging eval set; fine-tuning is only approved if a pilot run beats that number by a margin worth the maintenance cost.

## Implementation

Freeze an eval set first. Iterate the prompt seriously: instructions, few-shot examples selected from real failures, output schema. Record the best score. Only then run a fine-tuning pilot on the same eval set and compare against that number, not against the first prompt you tried.

## Gotchas

- A weak baseline inflates the apparent value of fine-tuning — the comparison is only honest if the prompt was genuinely tuned
- Comparing a fine-tuned small model against a prompted large model conflates two decisions; hold the base model constant in at least one comparison

## When NOT to Apply

- Skip when the goal is something prompting cannot deliver at all: strict latency/cost floors requiring a small model, style cloning from thousands of examples, or removing long system prompts entirely
- Skip when you already have a validated prompting baseline from a previous iteration of the same task

## Verification

Community-reported: "try prompting harder first" is the consistent first recommendation in practitioner fine-tuning guides, including vendor fine-tuning documentation, but the win-rate margin is task-dependent and not independently benchmarked here.

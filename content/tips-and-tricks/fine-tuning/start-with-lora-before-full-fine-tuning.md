---
id: "start-with-lora-before-full-fine-tuning"
title: "Start With LoRA Before Full-Parameter Fine-Tuning"
category: "cost-reduction"
tags:
  - fine-tuning
  - efficiency
  - llm
difficulty: "intermediate"
impact: "high"
time_to_implement: "half a day"
phase: fine-tuning
effort: day
estimated_time: "~1 day"
reversible: true
verification_status: community-reported
verified_by: "community reports (PEFT adoption experience)"
applies_to:
  - fine-tuning-workflows
gotchas:
  - "LoRA underperforms full fine-tuning when the task requires large behavioral shifts or new knowledge domains -- if the LoRA ceiling is below target, the answer may be full tuning, not a bigger rank"
  - "Serving many LoRA adapters efficiently requires an engine with multi-adapter support; naively merging every adapter multiplies stored model copies"
metrics: []
related_tips:
  - version-datasets-and-adapters-together
added_date: "2026-07-07"
added_by: maintainer
last_reviewed: "2026-07-07"
enrichment_status: draft
---

## What & Why

Run your first fine-tuning attempts as LoRA (or QLoRA) adapters rather than full-parameter training. Adapters train on a fraction of the GPU memory, finish faster, produce megabyte-scale artifacts instead of full model copies, and are trivially reversible — you keep the base model untouched and can stack, swap, or discard adapters per experiment. For the majority of instruction-following and style/format tasks, adapter quality is close enough to full tuning that the economics dominate.

## Before / After

**Before:** First experiment is a full fine-tune of a 7B model: multi-GPU reservation, hours per run, a 14GB artifact per experiment, and rollback means redeploying the previous copy.

**After:** First experiments are LoRA runs on a single GPU, each producing a ~50MB adapter; the best adapter is promoted, and rollback is unloading it.

## Implementation

Use a PEFT-supporting trainer, start with the common defaults (rank 8-16, alpha 2x rank, LoRA on attention projections), and iterate data quality before iterating rank. Evaluate each adapter against the frozen eval set; only escalate to full fine-tuning if the adapter approach plateaus measurably below target.

## Gotchas

- Tasks demanding deep behavioral change or new domain knowledge can exceed what adapters deliver — treat a plateau as a real signal, not a tuning failure
- Multi-adapter serving needs engine support (vLLM and peers support it); merging adapters back into weights recreates the full-copy storage problem per variant

## When NOT to Apply

- Skip when you have strong evidence the task needs full-parameter training (e.g. continued pretraining on a new domain corpus)
- Skip for embedding models or small classifiers where full training is already cheap

## Verification

Community-reported: adapter-first is the default recommendation across PEFT documentation and practitioner fine-tuning guides; quality parity claims vary by task and are not independently benchmarked here.

---
title: "Fine-Tuning Workflows Build Examples"
section: "build-examples/fine-tuning-workflows"
auto_generated: false
---

# Fine-Tuning Workflows Build Examples

## What belongs here

End-to-end blueprints for the full fine-tune-and-ship loop: dataset preparation and curation, LoRA/QLoRA training runs, instruction tuning, DPO/RLHF-style preference tuning, and the surrounding evaluate-then-deploy pipeline that turns a base model plus a dataset into a served, evaluated, versioned fine-tuned model.

## What does NOT belong here

A build whose primary artifact is the evaluation harness used to score fine-tuned checkpoints (rather than the training pipeline itself) belongs in `evaluation-pipelines/`. A single tip about learning-rate schedules, LoRA rank selection, or catastrophic-forgetting prevention that doesn't require a full working pipeline belongs in `tips-and-tricks/fine-tuning/`, not here. Choosing whether to fine-tune at all versus using RAG is an architecture decision — see `architectures/decision-trees/rag-vs-fine-tuning.md` — not a build example.

## Quick-start: highest-signal build examples in this phase

_No entries yet. This phase folder was created during the Build Examples vertical reorganisation (2026-07-06) and is queued for content in a follow-up authoring pass — see the migration completion report._

## Build examples in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Fine Tuning Workflows in This Phase

### Recently Added

- [LoRA Fine-Tune on a Single GPU with Unsloth](./starter-lora-finetune-unsloth.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [LoRA Fine-Tune on a Single GPU with Unsloth](./starter-lora-finetune-unsloth.md) — Fine-tune a small open-weight model with LoRA on one consumer GPU using Unsloth, then merge and run the adapter locally

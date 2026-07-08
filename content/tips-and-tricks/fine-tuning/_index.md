---
title: "Fine-Tuning Tips & Tricks"
section: "tips-and-tricks/fine-tuning"
auto_generated: false
---

# Fine-Tuning Tips & Tricks

## What belongs here

Discrete, same-day interventions specific to preparing data for or configuring a fine-tuning run: dataset preparation and cleaning, learning-rate schedule choices, LoRA rank selection heuristics, validation-split strategy, and catastrophic-forgetting prevention.

## What does NOT belong here

A tip about choosing a quantization level or serving configuration for an already-fine-tuned model belongs in `inference-and-serving/`, not here — this folder is specifically about the fine-tuning process itself, not what happens to the model afterward. Setting up a full fine-tuning pipeline from scratch is a multi-day project and belongs in `build-examples/`, not here.

## Quick-start: highest impact tips in this phase

_No tips currently cataloged in this phase — see the note below before treating this as an oversight._

## A note on why this phase is empty

As of the tips-vertical reorganisation (2026-07), this catalog has zero fine-tuning-specific tips, despite `content/tools/model-layer/` cataloging several fine-tuning tools (Axolotl, Unsloth, LLaMA-Factory, PEFT) and the research vertical having dedicated LoRA/QLoRA entries. This mirrors a frame decision already established elsewhere in this catalog: fine-tuning practice-level knowledge (learning rate schedules, LoRA rank selection, dataset preparation specifics) has not yet been distilled into discrete, verified, same-day tips the way agent-reliability and RAG-tuning practices have. This is a genuine content gap and an open contribution area, not an oversight or a folder kept empty by mistake — a future contributor adding a fine-tuning tip should follow the same Pragmatist/Practitioner/Editor discipline as every other phase (a real before/after, a measured or explicitly-labeled-theoretical verification status, and a same-day implementation ceiling).

## Tips in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Fine Tuning in This Phase

### Recently Added

- [Establish a Prompting Baseline Before Fine-Tuning](./establish-a-prompting-baseline-before-fine-tuning.md)
- [Evaluate Checkpoints on Task Metrics, Not Training Loss](./evaluate-checkpoints-on-task-metrics-not-loss.md)
- [Hold Out an Eval Set Before Any Training Run Touches the Data](./hold-out-an-eval-set-before-any-training.md)
- [Inspect a Random Sample of Training Data by Hand Before Every Run](./inspect-your-training-data-by-hand.md)
- [Match Training and Inference Prompt Formats Exactly](./match-training-and-inference-prompt-formats.md)
- [Start With LoRA Before Full-Parameter Fine-Tuning](./start-with-lora-before-full-fine-tuning.md)
- [Test for Regressions Outside the Tuned Task After Every Fine-Tune](./test-for-regressions-outside-the-tuned-task.md)
- [Version Datasets and Adapters Together as One Artifact Pair](./version-datasets-and-adapters-together.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Establish a Prompting Baseline Before Fine-Tuning](./establish-a-prompting-baseline-before-fine-tuning.md) — 
- [Evaluate Checkpoints on Task Metrics, Not Training Loss](./evaluate-checkpoints-on-task-metrics-not-loss.md) — 
- [Hold Out an Eval Set Before Any Training Run Touches the Data](./hold-out-an-eval-set-before-any-training.md) — 
- [Inspect a Random Sample of Training Data by Hand Before Every Run](./inspect-your-training-data-by-hand.md) — 
- [Match Training and Inference Prompt Formats Exactly](./match-training-and-inference-prompt-formats.md) — 
- [Start With LoRA Before Full-Parameter Fine-Tuning](./start-with-lora-before-full-fine-tuning.md) — 
- [Test for Regressions Outside the Tuned Task After Every Fine-Tune](./test-for-regressions-outside-the-tuned-task.md) — 
- [Version Datasets and Adapters Together as One Artifact Pair](./version-datasets-and-adapters-together.md) — 

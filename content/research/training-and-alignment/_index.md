---
title: "Training and Alignment Research"
section: "research/training-and-alignment"
auto_generated: false
---

# Training and Alignment Research

## What belongs here

Pretraining objectives, RLHF and its alternatives (DPO), instruction tuning, parameter-efficient fine-tuning (LoRA, QLoRA), constitutional AI and other AI-feedback alignment approaches, and reward modeling — papers whose primary contribution is a technique for producing or adjusting model weights.

## What does NOT belong here

A paper about a full foundation model family (architecture, training recipe, safety work, and evaluations bundled together as one release) belongs in `foundational/` if it is genuinely field-defining (see `dubey-2024-llama3.md`), not here, even though training methodology is part of what it describes — the distinguishing question is whether the paper's primary contribution is a *reusable technique* (this folder) or a *specific model release* (foundational/ or a project entry). A paper about evaluating alignment or safety properties, rather than producing them, belongs in `evaluation-and-safety/`.

## Engineering frame

When I am deciding how to fine-tune, align, or adapt a model, which technique should I reach for, and does it actually still represent current practice or has something better superseded it?

## Reading order guidance

- Start with [Training Language Models to Follow Instructions with Human Feedback (InstructGPT)](./ouyang-2022-instructgpt.md) for the original 3-stage RLHF recipe that established instruction-tuning-then-alignment as the standard pipeline shape.
- Read [Direct Preference Optimization](./rafailov-2023-dpo.md) next to see the technique that now replaces full RLHF-with-PPO for most practitioners.
- [LoRA](./hu-2021-lora.md) and [QLoRA](./dettmers-2023-qlora.md) are read together — QLoRA builds directly on LoRA to add memory-efficient quantized fine-tuning.
- [Constitutional AI](./bai-2022-constitutional-ai.md) and [DeepSeek-R1](./deepseek-ai-2025-r1.md) cover two different alignment/reasoning-training approaches (AI-feedback-driven harmlessness training, and RL-from-verifiable-rewards for reasoning) worth reading once the fine-tuning basics above are covered.
- [Qwen2.5-Math Technical Report](./yang-2024-qwen25-math.md) is the narrowest-scope entry in this folder (a domain-specific self-improvement training pipeline) — read it only if math-specific model training is your actual use case.

## Papers in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Training And Alignment in This Phase

### Recently Added

_No entries yet._

### Most Popular

_No star-tracked entries yet._

### Browse All

_No entries yet._

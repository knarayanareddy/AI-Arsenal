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

- [Deep Reinforcement Learning from Human Preferences](./christiano-2017-rlhf.md)
- [The Mirage of Optimizing Training Policies: Monotonic Inference Policies as the Real Objective for LLM Reinforcement Learning](./liang-2026-mipi.md)
- [Constitutional AI: Harmlessness from AI Feedback](./bai-2022-constitutional-ai.md)
- [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](./deepseek-ai-2025-r1.md)
- [QLoRA: Efficient Finetuning of Quantized LLMs](./dettmers-2023-qlora.md)
- [LoRA: Low-Rank Adaptation of Large Language Models](./hu-2021-lora.md)
- [Training Language Models to Follow Instructions with Human Feedback](./ouyang-2022-instructgpt.md)
- [Direct Preference Optimization: Your Language Model is Secretly a Reward Model](./rafailov-2023-dpo.md)
- [Qwen2.5-Math Technical Report: Toward Mathematical Expert Model via Self-Improvement](./yang-2024-qwen25-math.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Constitutional AI: Harmlessness from AI Feedback](./bai-2022-constitutional-ai.md) — Trained a harmless assistant using AI self-critique and AI-judged preferences instead of human harm labels -- consider RLAIF when human labeling of harmful content is a bottleneck, though no reference code exists to reproduce it directly
- [Deep Reinforcement Learning from Human Preferences](./christiano-2017-rlhf.md) — The origin of RLHF: learn a reward model from human comparisons of trajectory pairs, then optimize a policy against it — solving tasks where the objective is easier to recognize than to specify, with under 1% of interactions needing human feedback
- [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](./deepseek-ai-2025-r1.md) — Showed RL with automated, verifiable rewards (not human labels) can train strong reasoning directly, then distills into smaller dense models -- consider RL-from-verifiable-rewards for reasoning-heavy domains, not just human-feedback alignment
- [QLoRA: Efficient Finetuning of Quantized LLMs](./dettmers-2023-qlora.md) — Showed you can fine-tune a 4-bit-quantized frozen base model with LoRA adapters trained in full precision, meaning you should use QLoRA when you need to fine-tune a large model on a single consumer GPU that couldn't otherwise fit it
- [LoRA: Low-Rank Adaptation of Large Language Models](./hu-2021-lora.md) — Showed you can fine-tune a large model by training only small low-rank update matrices injected into attention weights, meaning you should use LoRA (not full fine-tuning) whenever GPU memory or storage for many fine-tuned variants is a constraint
- [The Mirage of Optimizing Training Policies: Monotonic Inference Policies as the Real Objective for LLM Reinforcement Learning](./liang-2026-mipi.md) — LLM RL optimizes the training-engine policy, but you deploy the inference-engine policy -- and the two disagree on trajectory probabilities even with synced weights. Proposes MIPI/MIPU to make the deployed policy the optimization objective
- [Training Language Models to Follow Instructions with Human Feedback](./ouyang-2022-instructgpt.md) — Established the 3-stage RLHF recipe (SFT, reward modeling, PPO) that turned GPT-3 into an assistant -- know this pipeline shape, though most teams now reach for simpler DPO instead of implementing PPO-based RLHF directly
- [Direct Preference Optimization: Your Language Model is Secretly a Reward Model](./rafailov-2023-dpo.md) — Showed the RLHF objective can be solved directly with a simple classification loss on preference pairs, with no separate reward model and no online RL -- meaning you should reach for DPO instead of implementing PPO-based RLHF for most alignment/preference-tuning work
- [Qwen2.5-Math Technical Report: Toward Mathematical Expert Model via Self-Improvement](./yang-2024-qwen25-math.md) — Documented a self-improvement pipeline (using the model to generate and filter its own better math training data) producing strong math-specific models -- narrow applicability, and Qwen's own successors have since surpassed these results

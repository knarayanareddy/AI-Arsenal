---
id: "alignment-and-rlhf"
title: "Alignment & RLHF"
entry_type: "guide"
section: "skills"
description: "Conceptual guide to instruction tuning, RLHF, DPO, and why aligned model behavior matters to engineers"
tags:
  - alignment
  - rlhf
  - training
  - llm
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

Alignment is the post-training process that turns a raw next-token predictor into a model that follows instructions, refuses harmful requests, and behaves like an assistant. Engineers rarely run RLHF themselves — but the artifacts of alignment (refusals, sycophancy, format habits, verbosity) shape every prompt you write.

## Why It's in the Arsenal

Model behavior that looks like a bug — over-refusal, agreeable wrongness, hedging — is usually alignment behavior. Recognizing it changes how you prompt, evaluate, and select models.

## Key Features

### Core Concepts

- Pipeline: pretraining → supervised fine-tuning (SFT, instruction-following) → preference optimization (RLHF/PPO or DPO) → sometimes RL on verifiable rewards for reasoning.
- RLHF trains a reward model from human preference pairs, then optimizes the LLM against it; DPO gets similar results directly from preference data without a separate reward model.
- Constitutional AI replaces some human labeling with model self-critique against written principles.
- Alignment shapes style as much as safety: verbosity, hedging, list-heavy formatting, and sycophancy are preference-optimization side effects.
- Reasoning-focused post-training (RL on verifiable math/code rewards, as in DeepSeek-R1) is the current frontier of this stage.

### Engineering Consequences

1. Over-refusal is model-specific — include refusal correctness in your evals when your domain sounds sensitive (security, medical, legal).
2. Sycophancy means models agree with confident-sounding users; do not use "are you sure?" as a validation strategy.
3. Preference-tuned formatting habits (markdown, bullet lists) can fight your output schema — test structured output per model.
4. Chat templates encode alignment assumptions; using the wrong template silently degrades quality on open models.

## Architecture / How It Works

Preference optimization maximizes the probability of preferred responses over rejected ones while a KL penalty keeps the model close to its SFT initialization. That KL leash is why aligned models retain base capabilities but also why alignment cannot fully remove behaviors — it reweights them.

## Getting Started

```text
What to check when adopting a new model:
1. Refusal rate on YOUR legitimate edge-case prompts
2. Sycophancy: does it flip answers under user pushback?
3. Format compliance under your output schema
4. Verbosity at temperature 0 vs your length budgets
```

## Use Cases

1. **Scenario**: Diagnosing why a model refuses legitimate security-engineering questions
2. **Scenario**: Choosing between DPO-tuned open models for a self-hosted assistant
3. **Scenario**: Building evals that separate capability failures from alignment behaviors

## Strengths

- Explains a whole class of "weird model behavior" mechanically
- Directly improves model-selection and eval design
- Foundation for understanding reasoning-model post-training

## Limitations / When NOT to Use

- Alignment details are mostly proprietary for frontier models; behavior must be tested, not assumed
- Running RLHF/DPO yourself requires preference data and evals most teams lack — SFT via LoRA covers most needs
- Alignment is not a security boundary: prompt injection and jailbreaks bypass it; enforce guardrails outside the model

## Integration Patterns

- Read [InstructGPT](../../research/training-and-alignment/ouyang-2022-instructgpt.md), [DPO](../../research/training-and-alignment/rafailov-2023-dpo.md), and [Constitutional AI](../../research/training-and-alignment/bai-2022-constitutional-ai.md) as the primary-source sequence.
- Pair with [Fine-Tuning Methods](./fine-tuning-methods.md) — SFT is the stage you are most likely to run yourself.
- Test adversarially with [prompt-injection regression tests](../../tips-and-tricks/evaluation/run-prompt-injection-regression-tests.md).

## Resources

- [InstructGPT paper](../../research/training-and-alignment/ouyang-2022-instructgpt.md)
- [DPO paper](../../research/training-and-alignment/rafailov-2023-dpo.md)
- [Constitutional AI paper](../../research/training-and-alignment/bai-2022-constitutional-ai.md)
- [DeepSeek-R1 paper](../../research/training-and-alignment/deepseek-ai-2025-r1.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*

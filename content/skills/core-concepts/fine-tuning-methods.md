---
id: "fine-tuning-methods"
title: "Fine-Tuning Methods"
entry_type: "guide"
section: "skills"
description: "Conceptual guide to full fine-tuning, LoRA/QLoRA, and when tuning beats prompting or retrieval"
tags:
  - fine-tuning
  - training
  - llm
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

Fine-tuning adapts a pretrained model's weights to a task. The engineering skill is not running the training loop — libraries handle that — it is knowing when tuning is the right tool, which method fits your budget, and how to build the dataset and evals that make it work.

## Why It's in the Arsenal

"Should we fine-tune?" is one of the most expensive questions to answer by trial and error. A clear mental model of the methods and their failure modes saves weeks.

## Key Features

### Core Concepts

- Full fine-tuning updates all weights: highest quality ceiling, highest cost, risk of catastrophic forgetting.
- LoRA trains small low-rank adapter matrices instead of full weights — most of the quality at a fraction of the memory, and adapters are swappable per task.
- QLoRA runs LoRA on a quantized base model, making 70B-class tuning feasible on a single GPU node.
- Fine-tuning teaches *behavior and format* reliably; it is a poor mechanism for injecting *facts* — retrieval does that better.
- Dataset quality dominates: a few thousand clean, task-shaped examples beat millions of noisy ones.

### Decision Guide

1. Try prompting + few-shot examples first; it is the baseline tuning must beat.
2. Need current or per-customer knowledge → retrieval, not tuning.
3. Need consistent style/format/tone, latency-critical small models, or distillation from a larger model → fine-tune.
4. Start with LoRA/QLoRA; escalate to full fine-tuning only with evidence the adapter ceiling was hit.

## Architecture / How It Works

Supervised fine-tuning continues training on (input, desired output) pairs with a standard language-modeling loss. LoRA freezes base weights and learns rank-r deltas on attention projections; at inference the deltas are added (or merged) with negligible latency cost. Preference-based stages (see Alignment & RLHF) come after SFT.

## Getting Started

```text
Minimal viable fine-tune:
1. 500-5000 curated examples in your exact production format
2. Held-out eval set built BEFORE training
3. QLoRA on a small open model (e.g. 7-8B) as the pilot
4. Compare against the prompted baseline on the same evals
```

## Use Cases

1. **Scenario**: A classification or extraction task where a prompted small model is inconsistent
2. **Scenario**: Distilling an expensive frontier-model behavior into a cheap self-hosted model
3. **Scenario**: Enforcing a strict output schema or brand voice that prompting keeps drifting from

## Strengths

- LoRA/QLoRA put meaningful tuning within a small team's budget
- Reliable for format, style, and narrow-task consistency
- Adapters compose: one base model, many task-specific behaviors

## Limitations / When NOT to Use

- Wrong tool for knowledge freshness — tuned facts go stale and cannot be updated per-request
- Without a pre-built eval set, you cannot tell improvement from overfitting
- Maintenance burden: every base-model upgrade requires re-tuning and re-evaluating

## Integration Patterns

- Route the tune-vs-retrieve decision with [RAG vs Fine-Tuning](../../architectures/system-design/rag-vs-fine-tuning.md).
- Follow the [ML Engineer learning path](../learning-paths/ml-engineer.md) for the training-side skill set.
- Read [LoRA](../../research/training-and-alignment/hu-2021-lora.md) and [QLoRA](../../research/training-and-alignment/dettmers-2023-qlora.md) for the primary sources.

## Resources

- [LoRA: Low-Rank Adaptation](../../research/training-and-alignment/hu-2021-lora.md)
- [QLoRA](../../research/training-and-alignment/dettmers-2023-qlora.md)
- [RAG vs Fine-Tuning decision guide](../../architectures/system-design/rag-vs-fine-tuning.md)
- [Alignment & RLHF](./alignment-and-rlhf.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*

---
id: peft
name: PEFT
type: tool
job: [fine-tuning]
description: Hugging Face library for parameter-efficient fine-tuning methods
url: "https://github.com/huggingface/peft"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [fine-tuning, llm, huggingface]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/huggingface/peft"
docs_url: "https://github.com/huggingface/peft"
github_url: "https://github.com/huggingface/peft"
alternatives: [axolotl, llamafactory, mlx-lm, torchtune, unsloth]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research, production]
best_when:
  - You need a well-maintained, low-level Hugging Face library for parameter-efficient methods like LoRA/QLoRA/IA3 inside an existing training script
  - You want fine-grained control to compose PEFT methods directly into a custom training loop
avoid_when:
  - You want an opinionated end-to-end fine-tuning pipeline with sane defaults out of the box (use Axolotl or LLaMA-Factory on top of it instead)
  - You're not already in the Hugging Face Transformers ecosystem
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** Hugging Face library for parameter-efficient fine-tuning methods. Open source or free to start. Best for LoRA and adapter-based fine-tuning.

## Overview

Hugging Face's library of parameter-efficient fine-tuning methods (LoRA, QLoRA, IA3, prefix tuning, and others), used as a low-level building block inside custom or higher-level training pipelines.

## Why It's in the Arsenal

PEFT earns a place in the Arsenal because it directly addresses a recurring decision point: you need a well-maintained, low-level Hugging Face library for parameter-efficient methods like LoRA/QLoRA/IA3 inside an existing training script. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Multiple PEFT methods (LoRA, QLoRA, IA3, prefix tuning) in one library
- Tight integration with Hugging Face Transformers
- Composable into custom training loops

## Architecture / How It Works

Wraps a base model with small trainable adapter layers (e.g. low-rank matrices for LoRA) while freezing the original weights, drastically reducing the number of trainable parameters.

## Getting Started

```bash
pip install peft
```

## Use Cases

1. **Scenario**: you need a well-maintained, low-level Hugging Face library for parameter-efficient methods like LoRA/QLoRA/IA3 inside an existing training script
2. **Scenario**: you want fine-grained control to compose PEFT methods directly into a custom training loop
3. **Scenario where this is NOT the right fit**: you want an opinionated end-to-end fine-tuning pipeline with sane defaults out of the box (use Axolotl or LLaMA-Factory on top of it instead) — evaluate an alternative instead

## Strengths

- You need a well-maintained, low-level Hugging Face library for parameter-efficient methods like LoRA/QLoRA/IA3 inside an existing training script
- You want fine-grained control to compose PEFT methods directly into a custom training loop

## Limitations / When NOT to Use

- You want an opinionated end-to-end fine-tuning pipeline with sane defaults out of the box (use Axolotl or LLaMA-Factory on top of it instead)
- You're not already in the Hugging Face Transformers ecosystem

## Integration Patterns

- Compare against [Axolotl](./axolotl.md), [LLaMA-Factory](./llamafactory.md), [MLX-LM](./mlx-lm.md), [torchtune](./torchtune.md), [Unsloth](./unsloth.md) before adopting — they solve the same job in this phase.
- Link this tool from job guides using its canonical ID `peft`.
- Record pricing, hosting, and data-retention assumptions before production adoption.


## Resources

- [Primary site](https://github.com/huggingface/peft)
- [Documentation](https://github.com/huggingface/peft)
- [Source](https://github.com/huggingface/peft)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for fine-tuning.

---
*Last reviewed: 2026-06-30 by @maintainer*


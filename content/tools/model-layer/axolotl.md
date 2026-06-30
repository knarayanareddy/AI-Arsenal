---
id: axolotl
name: Axolotl
type: tool
job: [fine-tuning]
description: Configuration-driven fine-tuning framework for many open-weight LLM families
url: "https://github.com/axolotl-ai-cloud/axolotl"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [fine-tuning, llm, pytorch]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/axolotl-ai-cloud/axolotl"
docs_url: "https://github.com/axolotl-ai-cloud/axolotl"
github_url: "https://github.com/axolotl-ai-cloud/axolotl"
alternatives: [llamafactory, mlx-lm, peft, torchtune, unsloth]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research, production]
best_when:
  - You want to fine-tune an open-weight LLM via declarative YAML config instead of hand-writing training loops
  - You need to quickly try many fine-tuning methods (LoRA, QLoRA, full fine-tune) across many model families
  - You're comfortable with a GPU training environment and want strong community-tested defaults
avoid_when:
  - You only need lightweight adapter training on a single small model (a thinner library like PEFT alone may be enough)
  - You need first-class Apple Silicon support (consider MLX-LM instead)
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** Configuration-driven fine-tuning framework for many open-weight LLM families. Open source or free to start. Best for repeatable YAML-driven fine-tuning.

## Overview

An open-source, configuration-driven fine-tuning framework that lets you fine-tune a wide range of open-weight LLMs by editing a YAML file rather than writing custom training code.

## Why It's in the Arsenal

Axolotl earns a place in the Arsenal because it directly addresses a recurring decision point: you want to fine-tune an open-weight LLM via declarative YAML config instead of hand-writing training loops. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- YAML-driven training configuration
- Supports LoRA, QLoRA, and full fine-tuning across many model families
- Active community with tested configs for popular models

## Architecture / How It Works

A training run is fully specified by a YAML config (model, dataset, method, hyperparameters); Axolotl's runner reads the config and drives Hugging Face Transformers/PEFT under the hood.

## Getting Started

```bash
pip install axolotl
```

## Use Cases

1. **Scenario**: you want to fine-tune an open-weight LLM via declarative YAML config instead of hand-writing training loops
2. **Scenario**: you need to quickly try many fine-tuning methods (LoRA, QLoRA, full fine-tune) across many model families
3. **Scenario**: you're comfortable with a GPU training environment and want strong community-tested defaults
4. **Scenario where this is NOT the right fit**: you only need lightweight adapter training on a single small model (a thinner library like PEFT alone may be enough) — evaluate an alternative instead

## Strengths

- You want to fine-tune an open-weight LLM via declarative YAML config instead of hand-writing training loops
- You need to quickly try many fine-tuning methods (LoRA, QLoRA, full fine-tune) across many model families
- You're comfortable with a GPU training environment and want strong community-tested defaults

## Limitations / When NOT to Use

- You only need lightweight adapter training on a single small model (a thinner library like PEFT alone may be enough)
- You need first-class Apple Silicon support (consider MLX-LM instead)

## Integration Patterns

- Compare against [LLaMA-Factory](./llamafactory.md), [MLX-LM](./mlx-lm.md), [PEFT](./peft.md), [torchtune](./torchtune.md), [Unsloth](./unsloth.md) before adopting — they solve the same job in this phase.
- Link this tool from job guides using its canonical ID `axolotl`.
- Record pricing, hosting, and data-retention assumptions before production adoption.


## Resources

- [Primary site](https://github.com/axolotl-ai-cloud/axolotl)
- [Documentation](https://github.com/axolotl-ai-cloud/axolotl)
- [Source](https://github.com/axolotl-ai-cloud/axolotl)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for fine-tuning.

---
*Last reviewed: 2026-06-30 by @maintainer*


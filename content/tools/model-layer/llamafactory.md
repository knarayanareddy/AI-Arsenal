---
id: llamafactory
name: LLaMA-Factory
type: tool
job: [fine-tuning]
description: Unified fine-tuning framework and UI for many LLMs and training methods
url: "https://github.com/hiyouga/LLaMA-Factory"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [fine-tuning, llm, pytorch]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/hiyouga/LLaMA-Factory"
docs_url: "https://github.com/hiyouga/LLaMA-Factory"
github_url: "https://github.com/hiyouga/LLaMA-Factory"
alternatives: [axolotl, mlx-lm, peft, torchtune, unsloth]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research, prototype]
best_when:
  - You want a unified UI plus CLI to fine-tune a very wide range of open models without writing custom training code
  - You're prototyping and want to compare fine-tuning methods (LoRA, full, RLHF-style) quickly via the web UI
avoid_when:
  - You need a minimal, scriptable, CI-friendly fine-tuning pipeline (the broad UI surface adds overhead)
  - You require long-term, narrowly-scoped production training infra rather than a general-purpose toolkit
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** Unified fine-tuning framework and UI for many LLMs and training methods. Open source or free to start. Best for fine-tuning with UI and many model recipes.

## Overview

A unified fine-tuning framework with both a web UI and CLI, supporting a very broad set of open models and training methods so teams can experiment without building custom training scripts.

## Why It's in the Arsenal

LLaMA-Factory earns a place in the Arsenal because it directly addresses a recurring decision point: you want a unified UI plus CLI to fine-tune a very wide range of open models without writing custom training code. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Web UI for no-code fine-tuning experiments
- Broad model-family and training-method coverage
- Built-in evaluation and export tooling

## Architecture / How It Works

Training jobs are configured through the UI or CLI and dispatched to underlying Transformers/PEFT/DeepSpeed training loops, with results exportable as merged or adapter checkpoints.

## Getting Started

```bash
pip install llamafactory
```

## Use Cases

1. **Scenario**: you want a unified UI plus CLI to fine-tune a very wide range of open models without writing custom training code
2. **Scenario**: you're prototyping and want to compare fine-tuning methods (LoRA, full, RLHF-style) quickly via the web UI
3. **Scenario where this is NOT the right fit**: you need a minimal, scriptable, CI-friendly fine-tuning pipeline (the broad UI surface adds overhead) — evaluate an alternative instead

## Strengths

- You want a unified UI plus CLI to fine-tune a very wide range of open models without writing custom training code
- You're prototyping and want to compare fine-tuning methods (LoRA, full, RLHF-style) quickly via the web UI

## Limitations / When NOT to Use

- You need a minimal, scriptable, CI-friendly fine-tuning pipeline (the broad UI surface adds overhead)
- You require long-term, narrowly-scoped production training infra rather than a general-purpose toolkit

## Integration Patterns

- Compare against [Axolotl](./axolotl.md), [MLX-LM](./mlx-lm.md), [PEFT](./peft.md), [torchtune](./torchtune.md), [Unsloth](./unsloth.md) before adopting — they solve the same job in this phase.
- Link this tool from job guides using its canonical ID `llamafactory`.
- Record pricing, hosting, and data-retention assumptions before production adoption.


## Resources

- [Primary site](https://github.com/hiyouga/LLaMA-Factory)
- [Documentation](https://github.com/hiyouga/LLaMA-Factory)
- [Source](https://github.com/hiyouga/LLaMA-Factory)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for fine-tuning.

---
*Last reviewed: 2026-06-30 by @maintainer*


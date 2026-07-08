---
id: accelerate
name: Hugging Face Accelerate
type: tool
job: [fine-tuning]
description: Device-agnostic PyTorch training launcher — the same script runs on CPU, one GPU, multi-GPU, TPU, DeepSpeed, or FSDP via config, not code changes
url: "https://github.com/huggingface/accelerate"
cost_model: open-source
pricing_detail: Open source (Apache-2.0)
tags: [training, fine-tuning, pytorch]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Fully open source; no usage limits
self_hostable: true
open_source: true
source_url: "https://github.com/huggingface/accelerate"
docs_url: "https://huggingface.co/docs/accelerate"
github_url: "https://github.com/huggingface/accelerate"
alternatives: [torchtune, megatron-lm]
integrates_with: [peft, axolotl]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research, production]
best_when:
  - You write your own PyTorch training loops and want them portable across single-GPU, multi-GPU, FSDP, and DeepSpeed without maintaining per-backend code paths
  - You use the Hugging Face ecosystem — Trainer, TRL, and most fine-tuning frameworks already run on Accelerate underneath, so understanding it pays off when debugging distributed runs
avoid_when:
  - You want a full training framework with configs and recipes rather than a thin loop wrapper — Axolotl or LLaMA-Factory sit at that layer
  - Your scale demands hand-tuned parallelism (tensor/pipeline) beyond what FSDP/DeepSpeed-via-config express — Megatron-class stacks apply
version_tracked: null
verdict: recommended
verdict_rationale: The de facto distribution layer under the Hugging Face training stack; the right abstraction when you own the training loop
status: active
---

> **TL;DR:** Device-agnostic PyTorch training launcher. Open source. Best for making custom training loops portable across hardware and distributed backends.

## Overview

Accelerate wraps a plain PyTorch training loop in a few lines (`accelerator.prepare(...)`, `accelerator.backward(loss)`) and moves all device/distribution concerns into a launch-time config: the same script runs on a laptop CPU, a single GPU, multi-node DDP, FSDP, or DeepSpeed. It also provides big-model utilities (`device_map="auto"` loading, offloading) used across the HF ecosystem.

## Why It's in the Arsenal

Most fine-tuning tooling in this phase (Trainer, TRL, Axolotl, PEFT workflows) runs on Accelerate underneath — it's the distribution substrate of the open training stack, and the tool you drop to when a framework's abstraction leaks. For teams writing their own loops, it's the difference between one codebase and one-per-backend. See Strengths / Limitations below before adopting it.

## Key Features

- One training script across CPU/GPU/multi-GPU/multi-node/TPU, selected by `accelerate config`, not code
- First-class FSDP and DeepSpeed integration via config files
- Big-model inference utilities: automatic device maps, CPU/disk offload for models larger than one GPU
- Mixed precision (fp16/bf16/fp8) handled by the accelerator object

## Architecture / How It Works

The `Accelerator` object inspects the launch environment and wraps model, optimizer, and dataloaders with the right distributed containers; `accelerate launch` spawns processes per the saved config. Backend-specific behavior (FSDP wrapping policy, DeepSpeed ZeRO stage) lives in config, keeping the loop code backend-neutral.

## Getting Started

```bash
pip install accelerate
accelerate config   # answer prompts once per machine
accelerate launch train.py
```

## Use Cases

1. **Scenario**: a custom fine-tuning loop that must run on a dev GPU today and an 8×A100 node next week without a rewrite
2. **Scenario**: debugging a distributed run launched by a higher-level framework — the failure surface is usually Accelerate/FSDP/DeepSpeed config
3. **Scenario**: loading a model too large for one GPU for inference or PEFT training via device maps and offload
4. **Scenario where this is NOT the right fit**: you want recipes and YAML-config training rather than owning a loop — use a framework layer instead

## Strengths

- The minimal-abstraction sweet spot: you keep your PyTorch loop, it owns only devices and distribution
- Battle-tested as the substrate of the HF training ecosystem; distributed bugs are widely documented
- FSDP/DeepSpeed become config choices, making backend comparisons cheap

## Limitations / When NOT to Use

- Not a framework: no recipes, datasets, or method implementations — pair with PEFT/TRL or move up a layer
- Extreme-scale parallelism (tensor/pipeline/expert) is out of scope; Megatron-class tooling applies there

## Integration Patterns

- Compare against [Megatron-LM](./megatron-lm.md) and [torchtune](./torchtune.md) before adopting — they overlap at the distribution layer.
- Underlies [PEFT](./peft.md) and [Axolotl](./axolotl.md) workflows; debugging those often means reading Accelerate config.
- Link this tool from job guides using its canonical ID `accelerate`.

## Resources

- [Primary site](https://huggingface.co/docs/accelerate)
- [Documentation](https://huggingface.co/docs/accelerate)
- [Source](https://github.com/huggingface/accelerate)

## Buzz & Reception

- 9.7k GitHub stars and position as the default launcher beneath the Hugging Face training stack (verified via the GitHub API, 2026-07-08).

---
*Last reviewed: 2026-07-08 by @maintainer*

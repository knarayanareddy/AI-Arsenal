---
id: deepspeed
name: "DeepSpeed"
type: tool
job: [fine-tuning]
description: "Microsoft's distributed-training library: ZeRO sharding, offloading, and pipeline parallelism for training beyond single-GPU memory"
url: "https://www.deepspeed.ai"
cost_model: open-source
pricing_detail: "Apache-2.0 open source"
tags: [training, fine-tuning, efficiency, pytorch]
maturity: production
stack: [python, cpp]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/deepspeedai/DeepSpeed"
docs_url: "https://deepspeed.readthedocs.io"
github_url: "https://github.com/deepspeedai/DeepSpeed"
alternatives: [axolotl]
integrates_with: [axolotl, llamafactory, trl]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [production, research]
best_when:
  - "Your model + optimizer states exceed GPU memory — ZeRO-2/3 sharding and CPU/NVMe offload are the standard fix"
  - "Multi-node full fine-tuning where you need battle-tested parallelism configs (most training frameworks expose DeepSpeed as the backend)"
avoid_when:
  - "Single-GPU LoRA/QLoRA jobs — PEFT + Unsloth are simpler and faster at that scale"
  - "You're starting fresh in 2026 and can choose PyTorch-native FSDP2, which covers much of ZeRO's ground with less config"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (42,672), license, and last push (2026-07-07) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "Still the workhorse for memory-constrained distributed training, even as native FSDP erodes its uniqueness"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/deepspeedai/DeepSpeed", "date": "2026-07-08", "description": "42,672 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Microsoft's training-optimization library, best known for ZeRO: partitioning optimizer states, gradients, and parameters across data-parallel workers (stages 1-3) with optional CPU/NVMe offload, enabling models that would otherwise not fit — exposed as a JSON config consumed by most fine-tuning frameworks.

## Why It's in the Arsenal

DeepSpeed earns a place in the Arsenal because it directly addresses a recurring decision point: your model + optimizer states exceed GPU memory — ZeRO-2/3 sharding and CPU/NVMe offload are the standard fix. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- ZeRO stages 1-3 with CPU/NVMe offloading
- 3D parallelism: data, pipeline, and tensor
- Integrates as backend in Transformers, Axolotl, LlamaFactory

## Architecture / How It Works

ZeRO shards training state across ranks and gathers parameters just-in-time per layer (stage 3), trading communication for memory; offload extends sharding to host RAM/NVMe. A JSON config selects stages, precision, and optimizers without changing model code.

## Getting Started

```bash
pip install deepspeed
deepspeed train.py --deepspeed ds_config.json
```

## Use Cases

1. **Scenario**: your model + optimizer states exceed GPU memory — ZeRO-2/3 sharding and CPU/NVMe offload are the standard fix
2. **Scenario**: multi-node full fine-tuning where you need battle-tested parallelism configs (most training frameworks expose DeepSpeed as the backend)
3. **Scenario where this is NOT the right fit**: single-GPU LoRA/QLoRA jobs — PEFT + Unsloth are simpler and faster at that scale — evaluate an alternative instead

## Strengths

- Your model + optimizer states exceed GPU memory — ZeRO-2/3 sharding and CPU/NVMe offload are the standard fix
- Multi-node full fine-tuning where you need battle-tested parallelism configs (most training frameworks expose DeepSpeed as the backend)

## Limitations / When NOT to Use

- Single-GPU LoRA/QLoRA jobs — PEFT + Unsloth are simpler and faster at that scale
- You're starting fresh in 2026 and can choose PyTorch-native FSDP2, which covers much of ZeRO's ground with less config

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `axolotl` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `deepspeed`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://www.deepspeed.ai)
- [Documentation](https://deepspeed.readthedocs.io)
- [GitHub](https://github.com/deepspeedai/DeepSpeed)

## Buzz & Reception

- 42,672 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*

---
id: megatron-lm
name: Megatron-LM
type: tool
job: [fine-tuning]
description: NVIDIA's reference framework for training transformer models at scale with tensor, pipeline, and sequence parallelism
url: "https://github.com/NVIDIA/Megatron-LM"
cost_model: open-source
pricing_detail: Open source (NVIDIA license); compute costs dominate in practice
tags: [training, transformers, efficiency, self-hosted]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Fully open source
self_hostable: true
open_source: true
source_url: "https://github.com/NVIDIA/Megatron-LM"
docs_url: "https://docs.nvidia.com/megatron-core/developer-guide/latest/index.html"
github_url: "https://github.com/NVIDIA/Megatron-LM"
alternatives: [torchtune, axolotl]
integrates_with: [pytorch]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: null
phase: model-layer
audience: [research, production]
best_when:
  - You are pretraining or continued-pretraining a model at multi-node scale and need tensor/pipeline/sequence parallelism that saturates NVIDIA hardware
  - You want the reference implementation the major open-model training stacks derive from (Megatron-Core underpins NeMo and many lab stacks)
avoid_when:
  - You are fine-tuning a single model on one node — Axolotl, torchtune, or PEFT-based stacks are far simpler
  - Your hardware is non-NVIDIA; Megatron's optimizations assume CUDA and NVLink-class interconnects
version_tracked: null
verdict: solid-choice
verdict_rationale: The canonical large-scale transformer-training framework on NVIDIA hardware, but heavy machinery that's wrong for anything below multi-node pretraining
status: active
enrichment_status: draft
---

> **TL;DR:** NVIDIA's reference framework for training transformers at scale — tensor, pipeline, and sequence parallelism. The machinery behind many frontier training stacks; overkill below multi-node scale.

## Overview

Megatron-LM (and its productized core, Megatron-Core) is NVIDIA's ongoing research framework for training transformer models at scale, implementing the tensor-parallelism scheme from the original Megatron paper plus pipeline parallelism, sequence parallelism, distributed optimizers, and FP8 support on Hopper+ GPUs (17K stars; actively developed by NVIDIA).

## Why It's in the Arsenal

When engineers ask "how are large models actually trained across thousands of GPUs," Megatron is the reference answer: its parallelism strategies are the vocabulary of the field (TP/PP/SP), and Megatron-Core underlies NVIDIA NeMo and numerous lab training stacks. It belongs in the catalog as the canonical model-layer training framework at scale, with a clear warning about when it's the wrong tool.

## Key Features

- Tensor, pipeline, sequence, and expert (MoE) parallelism, composable per model size
- Distributed optimizer and activation recomputation for memory efficiency
- FP8 training support on Hopper/Blackwell GPUs
- Reference GPT/BERT/T5/LLaMA-style model implementations and data pipelines

## Architecture / How It Works

Model layers are sharded across GPUs (tensor parallelism), layer groups across pipeline stages (pipeline parallelism), and sequence activations across ranks (sequence parallelism), with communication scheduled to overlap compute. Megatron-Core exposes these as composable library primitives that other frameworks embed.

## Getting Started

```bash
git clone https://github.com/NVIDIA/Megatron-LM
# use NVIDIA's NGC PyTorch container; see repo README for pretraining launch scripts
```

## Use Cases

1. **Scenario**: pretraining a multi-billion-parameter model across multiple nodes of NVIDIA GPUs
2. **Scenario**: continued-pretraining on domain data where throughput per GPU-hour dominates cost
3. **Scenario where this is NOT the right fit**: LoRA fine-tuning a 8B model on one node — use Axolotl/torchtune/Unsloth instead

## Strengths

- Best-documented and most-imitated large-scale parallelism implementation on NVIDIA hardware
- Continuously updated by NVIDIA against new GPU generations (FP8, Blackwell)
- The conceptual reference: understanding Megatron's TP/PP/SP is transferable to every other training stack

## Limitations / When NOT to Use

- Steep operational complexity: cluster setup, container discipline, and parallelism-config tuning are prerequisites
- NVIDIA-centric; portability to other accelerators is not a goal
- Non-standard license (not OSI-listed Apache/MIT) — review terms for commercial redistribution

## Integration Patterns

- Compare against [torchtune](./torchtune.md) and [Axolotl](./axolotl.md) before adopting — for fine-tuning-scale work they solve the job with far less machinery.
- Link this tool from job guides using its canonical ID `megatron-lm`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Source](https://github.com/NVIDIA/Megatron-LM)
- [Megatron-Core docs](https://docs.nvidia.com/megatron-core/developer-guide/latest/index.html)

## Buzz & Reception

- Included because Megatron's parallelism papers and codebase are cited across essentially every large-scale training report, and Megatron-Core underpins NVIDIA NeMo.

---
*Last reviewed: 2026-07-08 by @maintainer*

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

> **TL;DR:** the fine-tuning entry for Megatron-LM. NVIDIA's reference framework for training transformer models at scale with tensor, pipeline, and sequence parallelism — the deciding factor is operational cost and what you have to run, not the feature list.

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

1. **Where it sits**: on the fine-tuning leg, which means the decisions that matter are timeout, retry and degraded-mode behaviour, plus an interface boundary so Megatron-LM can be swapped without touching callers.
2. **Measuring it**: the two numbers this entry does not give you are end-to-end latency at your real request shape and the error rate when the upstream is degraded; both are worth recording before you depend on Megatron-LM.
3. **Choosing between candidates**: Megatron-LM's comparison set is `torchtune`, `axolotl`; the axis that separates them is what you operate, so answer that before reading the feature lists.

## Strengths

- The implementation detail worth reading before adopting Megatron-LM is specific — model layers are sharded across GPUs (tensor parallelism), layer groups across pipeline stages (pipeline parallelism), and sequence activations across ranks (sequence parallelism), with communication scheduled to overlap compute. Megatron-Core exposes these as composable library primitives that other frameworks embed — and that is where a capability claim either survives contact with your data or does not.
- Weighing Megatron-LM against `torchtune`, `axolotl` comes down to one question: who runs the process when it breaks — you or the vendor.
- Pin the client library rather than the API: Megatron-LM is reachable through `pytorch`, and those adapters change defaults without a major version bump.
- What this entry cannot give you is measured behaviour: measure Megatron-LM's latency and its error rate under a degraded upstream before it carries production traffic.

## Limitations / When NOT to Use

- Depending on Megatron-LM means depending on someone else's availability and pricing, and the exit cost rises with how deeply it is wired into your call sites.
- Documentation for Megatron-LM describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.
- Where Megatron-LM overlaps `torchtune`, `axolotl`, choosing on feature lists alone is the mistake; the deciding axis is operational.

## Integration Patterns

- *Wiring*: adopt Megatron-LM as a Python dependency or sidecar service against the `fine-tuning` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `torchtune`, `axolotl` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Known integrations*: `pytorch` are the documented surfaces worth starting from, because they establish the expected request and response contract. Pin the version you build against — a client library upgrade can change default retrieval or batching behaviour without a breaking version bump.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Source](https://github.com/NVIDIA/Megatron-LM)
- [Megatron-Core docs](https://docs.nvidia.com/megatron-core/developer-guide/latest/index.html)

## Buzz & Reception

- Included because Megatron's parallelism papers and codebase are cited across essentially every large-scale training report, and Megatron-Core underpins NVIDIA NeMo.

---
*Last reviewed: 2026-07-08 by @maintainer*

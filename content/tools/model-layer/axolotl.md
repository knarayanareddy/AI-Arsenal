---
id: axolotl
name: Axolotl
type: tool
job: [fine-tuning]
description: YAML-configuration fine-tuning framework for open-weight LLMs — LoRA/QLoRA, DPO/GRPO, FSDP2 and expert parallelism, with GGUF export
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
last_reviewed: "2026-10-26"
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

> **TL;DR:** the reference for configuration-driven fine-tuning. One YAML covers LoRA/QLoRA, DPO/GRPO, FSDP2 and expert parallelism, tracks new open-weight releases within weeks, and exports GGUF — assuming someone on the team owns the CUDA stack.

## Overview

An open-source, configuration-driven fine-tuning framework that lets you fine-tune a wide range of open-weight LLMs by editing a YAML file rather than writing custom training code.

Axolotl is reached over a documented surface unlike `llamafactory`, `mlx-lm`; on the fine-tuning path; under a open-source cost model; with `axolotl`, `name`, `type`, which means the things to measure are end-to-end latency at your real request shape, the error rate when the upstream is degraded, and what your system does when the call times out — none of which the feature list tells you.

## Why It's in the Arsenal

The case for Axolotl rests on its documentation and observed adoption rather than a controlled comparison here; the sections below state what it claims and what depending on it would commit you to.

## Key Features

- YAML-driven training configuration
- Supports LoRA, QLoRA, and full fine-tuning across many model families
- Active community with tested configs for popular models

## Architecture / How It Works

A training run is fully specified by a YAML config (model, dataset, method, hyperparameters); Axolotl's runner reads the config and drives Hugging Face Transformers/PEFT under the hood.

## Getting Started

Install the Python package and its runtime dependencies first, then make one call to confirm the credentials, network path and configuration are reachable before wiring Axolotl into anything else. The command below runs against the `fine-tuning` job and returns a result you can inspect directly.

```bash
pip install axolotl
```

Follow the official documentation at https://github.com/axolotl-ai-cloud/axolotl for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

## Use Cases

1. **Fine-tuning a newly released open-weight model**: Axolotl's cadence is the feature — Gemma 4, Qwen3.5/3.6, GLM-4.6V, MiniCPM5 and Mistral Small 4 all landed within weeks of release, which is the difference between having an adapter and waiting for one.
2. **LoRA on hardware that should not fit the model**: QLoRA plus CPU-staged FSDP2 loading lets a model larger than one GPU be loaded without materialising a quantised replica on every device.
3. **Multi-node training without writing the parallelism**: FSDP2, HSDP, expert parallelism, Ulysses and Ringmaster context parallelism are YAML keys, not implementations you own.
4. **Preference tuning on top of a base model**: DPO, GRPO (with an async variant the release notes measure at up to 58% faster steps), GDPO and EBFT are supported methods rather than recipes in a blog post.
5. **Shipping an adapter into llama.cpp or Ollama**: `axolotl export` produces GGUF with optional quantisation, which closes the loop from training to the runtime most teams actually deploy on.
6. **Reproducing a training run**: a YAML config plus a pinned image is the whole specification, which is what makes a run auditable months later.

## Strengths

- Configuration-first without hiding the stack: the YAML is the interface, and underneath it drives Transformers, PEFT, DeepSpeed and FSDP directly, so escape hatches are ordinary PyTorch rather than a plugin API.
- The breadth of modern techniques in one runner is unusual: NVFP4 LoRA, ScatterMoE and SonicMoE fused MoE LoRA, MixLoRA routed experts, selective activation checkpointing with CPU offload, and Ringmaster context parallelism for long sequences.
- A release cadence that tracks model releases weekly rather than quarterly, with the changelog naming the papers and PRs behind each feature.
- `uv`-first packaging removes the dependency-resolution pain that used to define the first day of fine-tuning a new model.
- Apache-2.0 with a small, engaged maintainer team (249 open issues on a 12.6k-star project is a healthy ratio).
- GGUF export and pluggable cloud launch interfaces mean the same config can end at a local runtime or a serverless job.

## Limitations / When NOT to Use

- **You own the environment.** CUDA, Flash Attention, TorchAO and DeepSpeed versions interact, and a training stack that works on one node type does not automatically work on the next.
- **The YAML surface is large and moving.** Each release adds keys; a config is a snapshot of one version's semantics, so pin Axolotl alongside the model rather than resolving `latest`.
- **No zero-code UI.** LLaMA-Factory wins when a non-specialist needs to launch a run; Axolotl assumes someone can read a config and a stack trace.
- **Multi-node debugging is still multi-node debugging.** The framework removes the code, not the distributed-systems failure modes — NCCL hangs, topology mismatch and storage bottlenecks remain yours.
- **Small team, fast pace.** The maintainers are responsive, and the roadmap is theirs; things you need may not be on it.
- **Benchmarks for new techniques are the authors'.** "58% faster steps" or an NVFP4 accuracy claim depends on hardware and workload — measure it on your own cluster.

## Integration Patterns

- *Wiring*: a config file plus a launch command in CI, with the resulting adapter or merged checkpoint pushed to a registry. Keep the Axolotl version pinned in the same commit as the config.
- *Underneath*: it composes `peft` for adapters, `deepspeed` for ZeRO and offload, and FSDP2 for sharding — those are the layers to understand when a run does not fit.
- *Alternatives*: `llamafactory` for a UI-driven workflow, `mlx-lm` for Apple Silicon, `torchtune` for a leaner PyTorch-native recipe set, and hosted fine-tuning APIs when you would rather not own a cluster.
- *Downstream*: export to GGUF for llama.cpp and Ollama, or keep adapters separate for `vllm` and `sglang` multi-LoRA serving.

## Resources

- [Primary site](https://github.com/axolotl-ai-cloud/axolotl)
- [Documentation](https://github.com/axolotl-ai-cloud/axolotl)
- [Source](https://github.com/axolotl-ai-cloud/axolotl)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for fine-tuning.

---
*Last reviewed: 2026-06-30 by @maintainer*


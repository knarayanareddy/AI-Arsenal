---
id: gllm
name: gLLM
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: "Research-grade serving engine combining paged attention, chunked prefill and composable tensor, expert and pipeline parallelism"
github_url: "https://github.com/gty111/gLLM"
license: Apache-2.0
primary_language: Python
tags: [inference, training]
maturity: beta
cost_model: open-source
github_stars: 73
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://github.com/gty111/gLLM"
demo_url: null
phase: inference-engine
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Gives you a small, readable scheduler codebase to instrument when paged-attention defaults stop fitting a MoE or hybrid-attention workload."
best_for:
  - "You are prototyping a serving-side idea such as token throttling or encoder disaggregation and you need an engine whose scheduler you can actually read and modify."
  - "You serve mixture-of-experts or hybrid-attention models whose attention and expert routing do not match the assumptions baked into an off-the-shelf runtime, and you need expert parallelism wired end to end."
  - "You are teaching distributed inference, and you want a codebase small enough to read where pipeline, tensor and expert parallelism can be combined by hand."
avoid_if:
  - "You need a production SLA or an ecosystem of integrations, because with roughly seventy stars the community around it is very small and support is effectively you."
  - "You need the widest hardware coverage, since the engine targets CUDA and the fused Triton kernels it ships for recent frontier models assume a working Triton toolchain."
  - "You want multimodal serving that works out of the box, because encoder disaggregation is recent and multimodal support for the newest checkpoints is still being added release by release."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "GitHub API verified stars, license string, primary language, topics, last commit, homepage and issue count. Feature claims, model-support dates and install instructions are taken from the README and changelog; throughput and latency were not benchmarked here, and the LICENSE text was not read."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

gLLM is a compact LLM serving engine written for research use, published under Apache-2.0 with a paper accepted at SC'25 and a second contribution, DynaPipe, accepted at NeurIPS'25. It loads dense, mixture-of-experts, multimodal and hybrid-attention checkpoints straight from Hugging Face, including FP8 variants, and it can run them offline for batch inference, online as a service, or in an interactive chat mode. Model support is the most visible activity in the repository: the update log tracks DeepSeek V4 with native mHC hyper-connections, learned C4 and C128 KV compression, a lightning indexer and MXFP4 experts served by fused Triton kernels across the decode path, plus DeepSeek V3.2 with DeepSeek Sparse Attention, Kimi K2.5 through K2.7-Code with image and video input, and Qwen3.5 and Qwen3.6 in dense, MoE, VL and FP8 flavours. It also implements encoder disaggregation, which decouples the multimodal vision encoder from the language model so the two can be scaled on separate resources.

## Why it's in the Arsenal

Production serving stacks grow layers that are hard to remove: custom kernels, sampler plugins, speculative decoding, speculative scheduling, and an admission-control policy that encodes a year of incident response. When you want to test a scheduler hypothesis rather than inherit one, that history is a liability. gLLM's pitch is the opposite: a deliberately small codebase where continuous batching, paged attention, chunked prefill, prefix caching, CUDA graph capture and token throttling are all present but readable, and where pipeline, tensor and expert parallelism can be recombined freely for single-node or multi-node placement. The recurring decision it removes is the fork-versus-upstream problem: when an off-the-shelf engine will not schedule your model the way you need, do you fork a hundred thousand lines or start from a core you can hold in your head.

## Architecture

Serving state lives in a scheduler that admits requests into a continuous batching loop, so sequences join and leave the active batch as prefill and decode complete rather than waiting for a fixed batch to drain. KV cache memory is managed with paged attention over fixed-size blocks, and prefix caching reuses those blocks across requests that share a system prompt, which matters for the multi-turn chat and long-system-prompt workloads gLLM targets. Chunked prefill splits long prompts into pieces so a single large request cannot stall decode, and token throttling schedules a bounded number of tokens per iteration to keep prefill and decode pipeline stages balanced under pipeline parallelism. Tensor parallelism shards individual layers across GPUs, expert parallelism shards mixture-of-experts routers and their expert weights, and any combination of the three can be deployed across nodes. CUDA graph capture removes per-iteration launch overhead for static decode shapes, while Triton kernels implement the specialised expert and attention paths for the newest frontier architectures. For vision-language models, encoder disaggregation runs the vision tower independently and feeds only the resulting embeddings into the language model stage.

## Ecosystem Position

It competes with vLLM and SGLang in the same functional space but at a different scale, since vLLM is the default production answer with a large plugin ecosystem and SGLang optimises for structured and large-batch decoding, while gLLM trades ecosystem depth for a codebase you can modify. It overlaps with lmdeploy and vllm-omni on the multimodal serving path, though its distinguishing feature is the explicit encoder-disaggregation control rather than a fused omni pipeline. It complements rather than replaces the model-layer tooling in content/tools/model-layer, because choosing the engine and choosing weights to load into it are separate decisions. If you are weighing production readiness, compare it against the SGLang and vLLM entries in content/projects/inference-engines and be honest about which risk you are taking on.

## Getting Started

Install from a source checkout for development, or install the released revision. The engine loads Hugging Face checkpoints directly, so no conversion step sits between the hub and the server.

```bash
git clone https://github.com/gty111/gLLM.git
cd gLLM
uv pip install -e .
```

The project is under active development with a `develop` default branch and a permissive-looking Apache-2.0 label in GitHub metadata; check the LICENSE file in the checkout before commercial use, since the catalogue quarantine flagged a non-standard license string for this repository.

## Key Use Cases

1. Scheduler experiments: implement and measure a new prefill/decode balancing policy, with token throttling as a working reference point, in a codebase you can read end to end.
2. Serving a frontier architecture early: run DeepSeek V4 or DeepSeek V3.2 with their sparse attention and MXFP4 experts before the mainstream runtimes support them.
3. Teaching and instrumenting: read a working implementation of paged attention, prefix caching and combinable tensor, expert and pipeline parallelism without wading through a production serving stack.

## Strengths

- Small, readable codebase, so scheduler and memory-management changes are realistic instead of a fork negotiation.
- Pipeline, tensor and expert parallelism combine freely, which covers MoE placement across single nodes or multiple machines.
- Very fast cadence on new architectures, with fused Triton kernels in the decode path for DeepSeek V4, V3.2 and the Qwen3.x line.
- Deliberate minimalism on the serving surface, with offline batch, online serving and interactive chat all built on the same scheduler.

## Limitations

Community size is the headline risk: roughly seventy stars and a handful of open issues is a very different bus-factor picture from vLLM, and dependencies such as Triton and CUDA have to work for whatever you build. Support is uneven by design, since each new frontier model lands as a separate update-log entry with fused kernels you must rebuild for. The project positions itself as a playground as much as a server, so hardening features you would expect in production, autoscaling, request admission control, and long-term operational support, are not the focus. Multimodal support is young, and encoder disaggregation is the newest feature on the list, so expect sharp edges. It is also CUDA-shaped: the fused kernels and the parallelism strategies assume NVIDIA-class accelerators, and AMD or CPU paths are not what this engine optimises for.

## Relation to the Arsenal

This entry belongs in the same shelf as the other engines under content/projects/inference-engines, where it is the research-leaning counterweight to vLLM and SGLang rather than a third option in the same tier. It consumes the model weights catalogued in content/projects/foundation-models, including the MoE and hybrid-attention checkpoints its update log tracks, and it is the layer above whatever you chose with tools in content/tools/model-layer. Where content/tools/serving-and-deployment covers packaging and orchestration, gLLM is the process doing the actual token generation, and it is the natural target for the observability entries in content/tools/evaluation-and-observability once you want traces from a runtime you fully control.

## Resources

- [Repository (gty111/gLLM)](https://github.com/gty111/gLLM)
- [System paper on arXiv](https://arxiv.org/abs/2504.14775)
- [DynaPipe, NeurIPS 2025](https://openreview.net/forum?id=D6w7wIN360)

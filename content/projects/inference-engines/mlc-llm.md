---
id: mlc-llm
name: MLC LLM
version_tracked: null
artifact_type: framework
category: llms
subcategory: inference-engines
description: Machine-learning-compilation stack that runs LLMs natively on iOS, Android, WebGPU, Metal, Vulkan and CUDA from one codebase
github_url: https://github.com/mlc-ai/mlc-llm
license: Apache-2.0
primary_language: Python
org_or_maintainer: MLC (CMU/OctoML lineage)
tags:
  - inference
  - edge
  - llm
maturity: production
cost_model: open-source
github_stars: 22974
github_stars_last_30d: 57
trending_score: 45
last_commit: '2026-07-13'
docs_url: https://llm.mlc.ai/docs/
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain:
  - language
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - research-origin
  - actively-maintained
  - community-driven
ecosystem_role:
  - 'The compiler-based answer to on-device inference: where llama.cpp hand-writes kernels per backend, MLC compiles models through TVM to reach iOS, Android, WebGPU and desktop GPUs from a single pipeline — it powered the first credible in-browser and on-phone Llama demos.'
best_for:
  - You need the same model running across phones, browsers (WebLLM/WebGPU), and desktop GPUs — the compilation pipeline targets Metal, Vulkan, CUDA, ROCm and WebGPU from one model definition
  - You are shipping LLM inference inside a mobile app — the iOS/Android SDKs with quantized weights are among the most mature on-device options
avoid_if:
  - You want maximum server-side throughput on NVIDIA GPUs — vLLM, SGLang, or TensorRT-LLM outperform it for datacenter serving
  - You rely on the newest model architectures immediately — compiler-based stacks lag hand-optimized runtimes when novel attention/MoE variants ship
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - llama-cpp
  - ollama
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (22,917), primary language, license, and last commit (2026-07-07) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/mlc-ai/mlc-llm
    date: '2026-07-08'
    description: 22,917 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

A universal LLM deployment engine built on machine-learning compilation (Apache TVM): model architectures are compiled to optimized kernels for whatever backend the device offers — Metal on Apple hardware, Vulkan on Android, WebGPU in browsers, CUDA/ROCm on desktops. The project's WebLLM spinoff runs quantized Llama-class models entirely client-side in Chrome.

## Why it's in the Arsenal

The compiler-based answer to on-device inference: where llama.cpp hand-writes kernels per backend, MLC compiles models through TVM to reach iOS, Android, WebGPU and desktop GPUs from a single pipeline — it powered the first credible in-browser and on-phone Llama demos. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need the same model running across phones, browsers (WebLLM/WebGPU), and desktop GPUs — the compilation pipeline targets Metal, Vulkan, CUDA, ROCm and WebGPU from one model definition. See Strengths / Limitations below before adopting it.

## Architecture

Models are expressed in a Python IR, quantized (3/4-bit grouped quantization), and compiled through TVM's tensor-program optimization into platform-specific libraries; MLCEngine exposes an OpenAI-compatible API with continuous batching on server targets, while iOS/Android SDKs and the WebLLM JS package wrap the same compiled artifacts for edge targets.

## Ecosystem Position

Upstream: Apache TVM (same research lineage — Tianqi Chen's group). Competing: llama.cpp/Ollama for local desktop inference, ExecuTorch and ONNX Runtime for mobile. Complementary: WebLLM occupies a niche nothing else serves well — production in-browser inference with no server — and MLC's compilation research feeds back into TVM.

## Getting Started

```bash
pip install --pre -U -f https://mlc.ai/wheels mlc-llm-nightly-cpu mlc-ai-nightly-cpu
mlc_llm chat HF://mlc-ai/Llama-3.2-3B-Instruct-q4f16_1-MLC
```

## Key Use Cases

1. **Scenario**: you need the same model running across phones, browsers (WebLLM/WebGPU), and desktop GPUs — the compilation pipeline targets Metal, Vulkan, CUDA, ROCm and WebGPU from one model definition
2. **Scenario**: you are shipping LLM inference inside a mobile app — the iOS/Android SDKs with quantized weights are among the most mature on-device options

## Strengths

- You need the same model running across phones, browsers (WebLLM/WebGPU), and desktop GPUs — the compilation pipeline targets Metal, Vulkan, CUDA, ROCm and WebGPU from one model definition
- You are shipping LLM inference inside a mobile app — the iOS/Android SDKs with quantized weights are among the most mature on-device options

## Limitations

- You want maximum server-side throughput on NVIDIA GPUs — vLLM, SGLang, or TensorRT-LLM outperform it for datacenter serving
- You rely on the newest model architectures immediately — compiler-based stacks lag hand-optimized runtimes when novel attention/MoE variants ship

## Relation to the Arsenal

This is an inference-engine entry: it documents the serving runtime itself. For the model weights it serves, see [Foundation Models](../foundation-models/_index.md). For hosted/managed serving alternatives, see [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub](https://github.com/mlc-ai/mlc-llm)
- [Documentation](https://llm.mlc.ai/docs/)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (22,917 stars, last commit 2026-07-07, verified via GitHub API on 2026-07-08)*

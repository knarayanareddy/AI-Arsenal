---
id: mlc-llm
name: "MLC LLM"
version_tracked: null
artifact_type: framework
category: llms
subcategory: inference-engines
description: "Machine-learning-compilation stack that runs LLMs natively on iOS, Android, WebGPU, Metal, Vulkan and CUDA from one codebase"
github_url: "https://github.com/mlc-ai/mlc-llm"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "MLC (CMU/OctoML lineage)"
tags: [inference, edge, llm]
maturity: production
cost_model: open-source
github_stars: 22917
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-07"
docs_url: "https://llm.mlc.ai/docs/"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [language, general-purpose]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [research-origin, actively-maintained, community-driven]
ecosystem_role:
  - "The compiler-based answer to on-device inference: where llama.cpp hand-writes kernels per backend, MLC compiles models through TVM to reach iOS, Android, WebGPU and desktop GPUs from a single pipeline — it powered the first credible in-browser and on-phone Llama demos."
best_for:
  - "You need the same model running across phones, browsers (WebLLM/WebGPU), and desktop GPUs — the compilation pipeline targets Metal, Vulkan, CUDA, ROCm and WebGPU from one model definition"
  - "You are shipping LLM inference inside a mobile app — the iOS/Android SDKs with quantized weights are among the most mature on-device options"
avoid_if:
  - "You want maximum server-side throughput on NVIDIA GPUs — vLLM, SGLang, or TensorRT-LLM outperform it for datacenter serving"
  - "You rely on the newest model architectures immediately — compiler-based stacks lag hand-optimized runtimes when novel attention/MoE variants ship"
upstream_dependencies: []
downstream_consumers: []
alternatives: [llama-cpp, ollama]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (22,917), primary language, license, and last commit (2026-07-07) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/mlc-ai/mlc-llm", "date": "2026-07-08", "description": "22,917 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

A universal LLM deployment engine built on machine-learning compilation (Apache TVM): model architectures are compiled to optimized kernels for whatever backend the device offers — Metal on Apple hardware, Vulkan on Android, WebGPU in browsers, CUDA/ROCm on desktops. The project's WebLLM spinoff runs quantized Llama-class models entirely client-side in Chrome.

## Why it's in the Arsenal

MLC LLM is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

## Architecture

Models are expressed in a Python IR, quantized (3/4-bit grouped quantization), and compiled through TVM's tensor-program optimization into platform-specific libraries; MLCEngine exposes an OpenAI-compatible API with continuous batching on server targets, while iOS/Android SDKs and the WebLLM JS package wrap the same compiled artifacts for edge targets.

## Ecosystem Position

Upstream: Apache TVM (same research lineage — Tianqi Chen's group). It competes with llama.cpp/Ollama for local desktop inference and with ExecuTorch and ONNX Runtime for on-device models. Complementary: WebLLM occupies a niche nothing else serves well — production in-browser inference with no server — and MLC's compilation research feeds back into TVM.

## Getting Started

```bash
pip install --pre -U -f https://mlc.ai/wheels mlc-llm-nightly-cpu mlc-ai-nightly-cpu
mlc_llm chat HF://mlc-ai/Llama-3.2-3B-Instruct-q4f16_1-MLC
```

## Key Use Cases

1. **Depending on it safely**: the work is the boundary — which calls go through MLC LLM, what happens when it is slow, and what your system does instead, since those three answers determine whether adopting it is cheap or expensive.
2. **What the MLC LLM scenarios have in common**: they are separated by hardware and concurrency rather than by capability, which is the axis on which runtimes genuinely differ.
3. **Choosing between candidates**: compare MLC LLM against `llama-cpp`, `ollama` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- What MLC LLM gives you that reading the feature list does not: models are expressed in a Python IR, quantized (3/4-bit grouped quantization), and compiled through TVM's tensor-program optimization into platform-specific libraries; MLCEngine exposes an OpenAI-compatible API with continuous batching on server targets, while iOS/Android SDKs and the WebLLM JS package wrap the same compiled artifacts for edge targets, which is the part you have to evaluate against your own workload.
- It is a inference-engine entry in this catalog, so the comparison that matters is against the other inference-engine projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the MLC LLM footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- The claims here come from the project's own documentation and public record, not from independent measurement on your workload; benchmark numbers in particular are point-in-time and harness-dependent.
- Where MLC LLM overlaps `llama-cpp`, `ollama`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

MLC LLM is the compiler-based runtime, using TVM to target phones, browsers (WebLLM), and desktop GPUs from one model definition. This is an inference-engine entry: it documents the serving runtime itself. For the model weights it serves, see [Foundation Models](../foundation-models/_index.md). For hosted/managed serving alternatives, see [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub](https://github.com/mlc-ai/mlc-llm)
- [Documentation](https://llm.mlc.ai/docs/)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (22,917 stars, last commit 2026-07-07, verified via GitHub API on 2026-07-08)*

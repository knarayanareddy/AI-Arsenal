---
id: tensorrt-llm
name: "TensorRT-LLM"
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: "NVIDIA's open-source LLM inference library with hand-tuned kernels, in-flight batching and FP8/FP4 quantization for peak GPU throughput"
github_url: "https://github.com/NVIDIA/TensorRT-LLM"
license: "Apache-2.0"
primary_language: C++
org_or_maintainer: "NVIDIA"
tags: [inference, llm, efficiency]
maturity: production
cost_model: open-source
github_stars: 14065
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-08"
docs_url: "https://nvidia.github.io/TensorRT-LLM/"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [language, general-purpose]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, actively-maintained, production-proven]
ecosystem_role:
  - "NVIDIA's first-party inference stack: when you need the last 20-30% of throughput from H100/B200-class hardware and are willing to trade flexibility for hand-optimized kernels, FP8/NVFP4 quantization, and tight Triton Inference Server integration."
best_for:
  - "You run large fleets of NVIDIA GPUs where peak tokens-per-dollar justifies engine-build complexity — TRT-LLM's fused kernels and FP8/FP4 paths typically lead published throughput benchmarks on Hopper/Blackwell"
  - "You already operate Triton Inference Server and want LLMs behind the same production serving layer as your other models"
avoid_if:
  - "You iterate over many models or need instant model swaps — TRT-LLM historically requires per-model engine compilation, and its PyTorch runtime is still maturing relative to vLLM's load-and-go workflow"
  - "You may ever need non-NVIDIA hardware — the stack is CUDA-only by design; vLLM/SGLang preserve portability"
upstream_dependencies: []
downstream_consumers: []
alternatives: [vllm, sglang, lmdeploy]
integrates_with: [triton-inference-server]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (14,065), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/NVIDIA/TensorRT-LLM", "date": "2026-07-08", "description": "14,065 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

An open-source library for high-performance LLM inference on NVIDIA GPUs: models are compiled into optimized engines (or run through the newer PyTorch-based runtime) with hand-fused attention kernels, in-flight (continuous) batching, paged KV caching, speculative decoding, and aggressive quantization down to FP8 and NVFP4. It is the reference stack for peak throughput on NVIDIA hardware.

## Why it's in the Arsenal

NVIDIA's first-party inference stack: when you need the last 20-30% of throughput from H100/B200-class hardware and are willing to trade flexibility for hand-optimized kernels, FP8/NVFP4 quantization, and tight Triton Inference Server integration. It earns a place in the Arsenal because it directly addresses a recurring decision point: you run large fleets of NVIDIA GPUs where peak tokens-per-dollar justifies engine-build complexity — TRT-LLM's fused kernels and FP8/FP4 paths typically lead published throughput benchmarks on Hopper/Blackwell. See Strengths / Limitations below before adopting it.

## Architecture

Two execution paths: the classic TensorRT engine-compilation flow (graph capture, kernel fusion, per-shape optimization) and a PyTorch runtime path that trades some peak performance for flexibility. Serving-critical features — in-flight batching, chunked prefill, paged/quantized KV cache, tensor/pipeline/expert parallelism, speculative decoding (Medusa, EAGLE, draft models) — are built into the runtime, and the Triton Inference Server backend exposes them behind a production API.

## Ecosystem Position

Upstream: CUDA, TensorRT, cuBLAS/cuDNN. Downstream: NVIDIA NIM microservices package TRT-LLM engines; Triton Inference Server is the standard serving frontend. Competing: vLLM (flexibility, ecosystem velocity, hardware breadth) and SGLang (structured/agentic workloads); in practice many teams benchmark TRT-LLM against vLLM per model and pick per-workload.

## Getting Started

```bash
pip install tensorrt-llm
# Quickstart with the LLM API (PyTorch runtime):
python -c "from tensorrt_llm import LLM; llm = LLM(model='TinyLlama/TinyLlama-1.1B-Chat-v1.0'); print(llm.generate('Hello'))"
```

## Key Use Cases

1. **Scenario**: you run large fleets of NVIDIA GPUs where peak tokens-per-dollar justifies engine-build complexity — TRT-LLM's fused kernels and FP8/FP4 paths typically lead published throughput benchmarks on Hopper/Blackwell
2. **Scenario**: you already operate Triton Inference Server and want LLMs behind the same production serving layer as your other models

## Strengths

- You run large fleets of NVIDIA GPUs where peak tokens-per-dollar justifies engine-build complexity — TRT-LLM's fused kernels and FP8/FP4 paths typically lead published throughput benchmarks on Hopper/Blackwell
- You already operate Triton Inference Server and want LLMs behind the same production serving layer as your other models

## Limitations

- You iterate over many models or need instant model swaps — TRT-LLM historically requires per-model engine compilation, and its PyTorch runtime is still maturing relative to vLLM's load-and-go workflow
- You may ever need non-NVIDIA hardware — the stack is CUDA-only by design; vLLM/SGLang preserve portability

## Relation to the Arsenal

This is an inference-engine entry: it documents the serving runtime itself. For the model weights it serves, see [Foundation Models](../foundation-models/_index.md). For hosted/managed serving alternatives, see [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub](https://github.com/NVIDIA/TensorRT-LLM)
- [Documentation](https://nvidia.github.io/TensorRT-LLM/)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (14,065 stars, last commit 2026-07-08, verified via GitHub API on 2026-07-08)*

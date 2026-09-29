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

TensorRT-LLM is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

## Architecture

Two execution paths: the classic TensorRT engine-compilation flow (graph capture, kernel fusion, per-shape optimization) and a PyTorch runtime path that trades some peak performance for flexibility. Serving-critical features — in-flight batching, chunked prefill, paged/quantized KV cache, tensor/pipeline/expert parallelism, speculative decoding (Medusa, EAGLE, draft models) — are built into the runtime, and the Triton Inference Server backend exposes them behind a production API.

## Ecosystem Position

Upstream: CUDA, TensorRT, cuBLAS/cuDNN. Downstream: NVIDIA NIM microservices package TRT-LLM engines; Triton Inference Server is the standard serving frontend. It competes with vLLM (flexibility, ecosystem velocity, hardware breadth) and SGLang (structured/agentic workloads); in practice many teams benchmark TRT-LLM against vLLM per model and pick per-workload.

## Getting Started

```bash
pip install tensorrt-llm
# Quickstart with the LLM API (PyTorch runtime):
python -c "from tensorrt_llm import LLM; llm = LLM(model='TinyLlama/TinyLlama-1.1B-Chat-v1.0'); print(llm.generate('Hello'))"
```

## Key Use Cases

1. **Depending on it safely**: the work is the boundary — which calls go through TensorRT-LLM, what happens when it is slow, and what your system does instead, since those three answers determine whether adopting it is cheap or expensive.
2. **What dominates the decision**: `large`, `fleets`, `nvidia`, `gpus` are the variables that actually move the outcome for TensorRT-LLM in this phase, and none of them appear in a feature comparison.
3. **Choosing between candidates**: compare TensorRT-LLM against `vllm`, `sglang`, `lmdeploy` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- The implementation detail worth checking before adopting TensorRT-LLM is specific — two execution paths: the classic TensorRT engine-compilation flow (graph capture, kernel fusion, per-shape optimization) and a PyTorch runtime path that trades some peak performance for flexibility. Serving-critical features — in-flight batching, chunked prefill, paged/quantized KV cache, tensor/pipeline/expert parallelism, speculative decoding (Medusa, EAGLE, draft models) — are built into the runtime, and the Triton Inference Server backend exposes them behind a production API — because that is where the capability claim either survives contact with your data or does not.
- Sits in the inference-engine phase alongside the alternatives named in its Ecosystem Position section; cross-phase comparison is usually a category error rather than a useful alternative.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for TensorRT-LLM is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- Nothing in this entry substitutes for running TensorRT-LLM against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- Where TensorRT-LLM overlaps `vllm`, `sglang`, `lmdeploy`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

TensorRT-LLM is NVIDIA's peak-throughput serving runtime for Hopper/Blackwell GPUs, trading flexibility for hand-tuned FP8/FP4 kernels and Triton integration. This is an inference-engine entry: it documents the serving runtime itself. For the model weights it serves, see [Foundation Models](../foundation-models/_index.md). For hosted/managed serving alternatives, see [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub](https://github.com/NVIDIA/TensorRT-LLM)
- [Documentation](https://nvidia.github.io/TensorRT-LLM/)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (14,065 stars, last commit 2026-07-08, verified via GitHub API on 2026-07-08)*

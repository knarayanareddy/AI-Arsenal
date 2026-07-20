---
id: onnxruntime
name: ONNX Runtime
version_tracked: null
artifact_type: framework
category: llms
subcategory: inference-engines
description: Microsoft's cross-platform inference runtime for the ONNX graph format — one exported model runs on CPU, GPU, mobile, and browser via execution providers
github_url: https://github.com/microsoft/onnxruntime
license: MIT
primary_language: C++
org_or_maintainer: microsoft
tags:
  - inference
  - efficiency
  - self-hosted
maturity: production
cost_model: open-source
github_stars: 21140
github_stars_last_30d: 103
trending_score: 48
last_commit: '2026-07-20'
docs_url: https://onnxruntime.ai/docs/
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain:
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - production-proven
  - actively-maintained
ecosystem_role:
  - 'The portability layer of production ML inference: export once to ONNX, run anywhere via pluggable execution providers (CUDA, TensorRT, CoreML, DirectML, WebGPU, NNAPI) — the standard answer for shipping the same model across server, mobile, and browser, and the workhorse under countless embedding/reranker/CV deployments'
best_for:
  - Deploying small-to-mid models (embedders, rerankers, classifiers, detectors, Whisper-class) across heterogeneous targets — server CPU/GPU, mobile, and browser — from one exported artifact
  - 'Squeezing production CPU inference: graph optimizations plus int8 quantization routinely beat framework-native CPU inference for transformer encoders (the mechanism behind libraries like fastembed and Transformers.js)'
avoid_if:
  - You're serving large generative LLMs at scale — KV-cache-centric engines (vLLM, SGLang, TensorRT-LLM) own that job; ONNX export of large decoders is possible but not the SOTA path
  - Your model uses ops that don't export cleanly — dynamic control flow and custom kernels can make ONNX conversion the project's hardest part
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - candle
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (21k), MIT, and active development (last push 2026-07-08) verified via the GitHub API on 2026-07-08. Execution-provider list from official docs; CPU-speedup claims are widely reproduced in the transformer-encoder setting but not benchmarked here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/microsoft/onnxruntime
    date: '2026-07-08'
    description: 21k stars; Microsoft-backed standard inference runtime
featured: false
status: active
---

## Overview

ONNX Runtime executes models exported to the ONNX graph format on virtually any target: a graph-optimization pipeline (fusion, constant folding) feeds an execution-provider abstraction that dispatches to CUDA, TensorRT, CoreML, DirectML, OpenVINO, NNAPI, XNNPACK, or WebGPU/WASM — with bindings for Python, C/C++, C#, Java, JS, and Rust. Quantization tooling (int8 dynamic/static, QDQ) is first-class.

## Why it's in the Arsenal

Most production inference isn't a frontier LLM — it's embedders, rerankers, classifiers, and detectors shipped to diverse hardware, and ONNX Runtime is that world's standard substrate: it's what runs under fastembed, Transformers.js, and much of mobile/browser ML. The catalog's inference story is incomplete without the portability pole that complements the LLM-serving engines.

## Architecture

ONNX protobuf graph → graph transformers apply provider-independent then provider-specific optimizations → partitioner assigns subgraphs to registered execution providers by capability, falling back to the CPU EP → runtime executes with pre-allocated buffers. Quantization operates on the graph itself (QDQ nodes), keeping the deployment artifact self-contained.

## Ecosystem Position

Upstream: PyTorch/TF/JAX via ONNX export (torch.onnx, Optimum). Downstream: fastembed, Transformers.js, ML.NET, countless mobile apps. Competing: TensorRT (NVIDIA-only, faster there), OpenVINO (Intel-centric), Core ML (Apple-native), candle/llama.cpp (weights-native, no export step). Its moat is breadth: no other runtime covers server-to-browser from one artifact.

## Getting Started

```bash
pip install onnxruntime  # or onnxruntime-gpu
```

```python
import onnxruntime as ort
sess = ort.InferenceSession("model.onnx", providers=["CUDAExecutionProvider", "CPUExecutionProvider"])
outputs = sess.run(None, {"input_ids": ids, "attention_mask": mask})
```

## Key Use Cases

1. **Scenario**: self-hosting an embedding/reranker model for RAG on CPU nodes — int8 ONNX routinely multiplies throughput over framework-native CPU inference
2. **Scenario**: shipping one trained model to server, iOS/Android (Core ML/NNAPI EPs), and browser (WebGPU/WASM) without per-platform reimplementation

## Strengths

- The widest deployment-target matrix in inference: one artifact, a dozen hardware backends — a structural capability no weights-native runtime matches
- Microsoft-backed production maturity: powers Office/Bing-scale inference; quantization and graph tooling are genuinely first-class

## Limitations

- The export step is the tax: models with dynamic control flow or exotic ops can fail or silently degrade in conversion — debugging exports is a skill of its own
- Not competitive for large-decoder LLM serving, where KV-cache scheduling (vLLM-class) dominates the problem

## Relation to the Arsenal

The portability pole among inference engines, complementing `vllm` (LLM throughput), `llama-cpp` (local weights-native), and `candle` (Rust-native); the runtime beneath embedding-serving patterns discussed in the RAG reference stacks.

## Resources

- [GitHub](https://github.com/microsoft/onnxruntime)
- [Documentation](https://onnxruntime.ai/docs/)

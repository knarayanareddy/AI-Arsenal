---
id: candle
name: Candle
version_tracked: null
artifact_type: framework
category: llms
subcategory: inference-engines
description: Hugging Face's minimalist Rust ML framework — PyTorch-like tensor API compiling to small, Python-free binaries for serverless and embedded inference
github_url: https://github.com/huggingface/candle
license: Apache-2.0
primary_language: Rust
org_or_maintainer: huggingface
tags:
  - inference
  - efficiency
  - llm
maturity: production
cost_model: open-source
github_stars: 20689
github_stars_last_30d: 69
trending_score: 46
last_commit: '2026-07-14'
docs_url: https://huggingface.github.io/candle/
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain:
  - general-purpose
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - 'The Rust foundation of Hugging Face''s production inference stack: where PyTorch deployment drags the Python runtime along, Candle compiles model inference into small static binaries — the substrate under text-embeddings-inference and the base layer the Rust ML ecosystem (mistral.rs and others) builds on'
best_for:
  - Deploying inference where Python is a liability — serverless (cold-start-sensitive), edge devices, WASM in the browser, or security-conscious environments that want one static binary
  - 'Building Rust ML infrastructure: a PyTorch-like tensor/module API with CUDA/Metal backends and ready ports of major architectures (Llama, Whisper, Stable Diffusion, BERT-class embedders)'
avoid_if:
  - You're training or researching models — the ecosystem, autograd maturity, and iteration speed of PyTorch remain far ahead; Candle is inference-first
  - You want maximum LLM serving throughput out of the box — vLLM-class engines or mistral.rs (built on Candle's lineage) package that better than raw Candle
upstream_dependencies: []
downstream_consumers:
  - text-embeddings-inference
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (20.6k), Apache-2.0, and active maintenance (last push 2026-07-06) verified via the GitHub API on 2026-07-08. Its role under text-embeddings-inference is documented in that project's repository; performance positioning is qualitative.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/huggingface/candle
    date: '2026-07-08'
    description: 20.6k stars, Hugging Face's core Rust ML framework
featured: false
status: active
---

## Overview

Candle is Hugging Face's Rust ML framework: a PyTorch-shaped tensor API (`Tensor`, modules, safetensors loading) with CPU (SIMD/MKL), CUDA (incl. flash-attention), Metal, and WASM backends, plus `candle-transformers` shipping ready implementations of the major open architectures. The design goal is serverless-grade deployment: no Python interpreter, no GIL, small static binaries, fast cold starts — models in the browser via WASM included.

## Why it's in the Arsenal

The Python tax on inference deployment (container size, cold start, GIL, dependency surface) is a real production constraint, and Candle is the credible org-backed answer: it's what Hugging Face's own `text-embeddings-inference` — the standard self-hosted embedding server — is built on. It earns its entry as the foundation layer of Rust ML, the direction performance-sensitive inference infrastructure is visibly moving.

## Architecture

Core tensor library with pluggable device backends behind one API; kernels via custom CUDA/Metal implementations (flash-attention, quantized matmuls) and optimized CPU paths; `candle-nn` for module composition; `candle-transformers` as the model zoo; safetensors-native weight loading with support for GGUF-quantized weights; WASM target compiles the same code for in-browser inference.

## Ecosystem Position

Upstream: safetensors/GGUF model weights from the HF Hub. Downstream: `text-embeddings-inference`, mistral.rs (Candle-lineage LLM server), and a growing Rust ML crate ecosystem. Competing: burn (pure-Rust, training-oriented), tch-rs (libtorch bindings — Python-free but not lightweight), and staying on PyTorch/ONNX for teams without Rust.

## Getting Started

```bash
cargo add candle-core candle-nn candle-transformers
# or run an example:
cargo run --example llama --release -- --prompt "Hello"
```

## Key Use Cases

1. **Scenario**: embedding/reranker inference as a static binary in serverless or sidecar deployments — the text-embeddings-inference pattern, reusable for custom models
2. **Scenario**: on-device and in-browser inference (WASM demos, edge boxes) where a Python runtime is unavailable or unacceptable

## Strengths

- Deployment profile no Python framework matches: single static binary, no interpreter, fast cold start, WASM support — mechanisms, not marketing
- Hugging Face backing with production usage in its own inference servers; broad architecture coverage in candle-transformers

## Limitations

- Inference-first: training support exists but is far from PyTorch's maturity — wrong tool for research iteration
- The Rust ML ecosystem is still thin relative to Python; expect to implement more yourself when off the beaten path of candle-transformers

## Relation to the Arsenal

The foundation under `text-embeddings-inference` (tools/serving-and-deployment) and the base of the Rust inference lineage; contrast with `llama-cpp` (C/C++ local runtime) and `onnxruntime` (portable graph runtime) as the three Python-free inference philosophies.

## Resources

- [GitHub](https://github.com/huggingface/candle)
- [Documentation](https://huggingface.github.io/candle/)

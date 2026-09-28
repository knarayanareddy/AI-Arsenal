---
id: candle
name: Candle
version_tracked: null
artifact_type: framework
category: llms
subcategory: inference-engines
description: "Rust machine-learning framework from Hugging Face built around a small Tensor type with CPU, CUDA, Metal and WASM backends and safetensors-native weight loading"
github_url: "https://github.com/huggingface/candle"
license: Apache-2.0
primary_language: Rust
org_or_maintainer: huggingface
tags: [inference, huggingface, efficiency, edge]
maturity: production
cost_model: open-source
github_stars: 21118
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-09-28"
docs_url: "https://huggingface.github.io/candle/guide/installation.html"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [general-purpose]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - "The Rust foundation of Hugging Face's production inference stack: where PyTorch deployment drags the Python runtime along, Candle compiles model inference into small static binaries — the substrate under text-embeddings-inference and the base layer the Rust ML ecosystem (mistral.rs and others) builds on"
best_for: ["You are shipping inference inside a Lambda, a container image or a WASM bundle and you cannot afford a Python runtime in the cold path.", "You want to embed one specific model, such as a Whisper, YOLO or Segment Anything pipeline, and you would rather compile a small binary than vendor a full deep-learning framework.", "You already live in Rust and you want tensor ops, safetensors loading and a transformer implementation that does not require a second language in the build."]
avoid_if: ["You need the breadth of a general training framework, because Candle is deliberately minimalist and the README's comparison is dfdx, burn and tch-rs rather than PyTorch feature parity.", "You need autograd and training loops, because the project is positioned for serverless inference and the example set is dominated by forward-pass model runners.", "You want a drop-in for existing Python model code, because tch-rs exists for that purpose and Candle would mean rewriting your model plumbing in Rust."]
upstream_dependencies: []
downstream_consumers: [text-embeddings-inference]
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (20.6k), Apache-2.0, and active maintenance (last push 2026-07-06) verified via the GitHub API on 2026-07-08. Its role under text-embeddings-inference is documented in that project's repository; performance positioning is qualitative.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/huggingface/candle","date":"2026-07-08","description":"20.6k stars, Hugging Face's core Rust ML framework"}
featured: false
status: active
---

## Overview

Candle is Hugging Face's minimalist ML framework for Rust, dual-licensed MIT and Apache-2.0, organised as a workspace of crates: candle-core for tensors and devices, candle-nn for layers and activations, candle-transformers for model implementations and quantized variants, candle-datasets, candle-onnx, candle-pyo3 for Python bindings, plus dedicated flash-attention and Metal kernel crates and a cuTile opt-in feature for JIT-compiled CUDA kernels. The core abstraction is `Tensor` over a `Device`, and the README's cheat sheet maps PyTorch idioms onto the Rust API: `Tensor::new` for construction, `.i((.., ..4))` for slicing, `.reshape`, `.matmul(&b)?`, `.to_device` and `.to_dtype`, and `candle::safetensors` for save and load. Examples cover LLaMA v1-v3 including SOLAR-10.7B, Falcon, CodeGeeX4, GLM4, Gemma v1 and v2, RecurrentGemma, Phi-1 through Phi-3, StableLM-3B-4E1T, Mamba, Whisper, YOLO, Segment Anything, BLIP, Stable Diffusion XL and Wuerstchen, with WASM builds of Whisper, LLaMA2, T5, Phi and SAM runnable in the browser.

## Why it's in the Arsenal

The decision it removes is whether a deployed model has to drag Python along. The README's own framing is that full frameworks are large, which makes creating instances on a cluster slow, and that Python overhead hurts performance; Candle exists so the same model can compile to a few megabytes and start in milliseconds. The second decision is build-versus-bind: if you already have a working Python model you would rather call than rewrite, tch-rs is the honest answer, and Candle only wins when you are prepared to own the Rust port.

## Architecture

`candle-core` provides `Tensor` as a lazily-evaluated handle over a storage buffer, a `Device` enum selecting CPU, CUDA or Metal, and an indexable operator set; the same code runs unchanged across backends because backends are chosen at device construction, so `Device::Cpu` becomes `Device::new_cuda(0)?` with one line changed. Weights move through the `safetensors` format rather than pickle, and `candle-transformers` supplies the layer primitives, quantized linear layers and the per-model implementations the examples instantiate. Backend features are Cargo flags (`cuda`, `cudnn`, `mkl`, `metal`, `cutile`) resolved at compile time, which is why a CUDA build needs `nvcc` and a pinned `CUDA_COMPUTE_CAP`. Cross-compilation to WASM goes through a separate example set served by `trunk`, and `candle-pyo3` exposes the same types to Python for incremental migration.

## Ecosystem Position

Candle is the Rust alternative to tch-rs and sits alongside burn and dfdx in the same crate ecosystem, and the README names all three explicitly when explaining why it was built. Compared with the inference engines in content/projects/inference-engines such as llama-cpp, it is not a model server at all: llama-cpp is a C++ inference runtime with a GGUF loader, while Candle is a tensor and layer library you link into a program you write, which is why candle-vllm exists in the same phase to put a serving layer on top of it. It also overlaps with the ONNX Runtime and OpenVINO entries in the same phase as a deployment target, but from the model-authoring side rather than the graph-execution side. Where a foundation-model entry such as whisper or phi is a checkpoint, Candle is the code that runs it.

## Getting Started

Add the core crate to a fresh Rust app, then swap the device to reach the GPU:

```bash
cargo new myapp && cd myapp
cargo add --git https://github.com/huggingface/candle.git candle-core
# CUDA: cargo add --git https://github.com/huggingface/candle.git candle-core --features "cuda"
# macOS GPU: add the same crate with --features "metal"
cargo run
```

The README's first example multiplies two random tensors on `Device::Cpu` and prints `Tensor[[2, 4], f32]`.

## Key Use Cases

1. Serverless or edge inference: compile a Whisper or YOLO runner into a static binary that starts without importing a Python interpreter.
2. Single-model microservices: embed one transformer in a Rust service so cold start and resident memory stay small compared with a full framework.
3. Browser-side models: build the WASM examples with trunk and ship a local T5, Phi, Llama or SAM demo with no server round trip.

## Strengths

- Static Rust binaries with no Python runtime, which is the whole argument and the reason the project exists.
- One codebase across CPU, CUDA, cuDNN, MKL, Metal and WASM, selected by Cargo feature at build time.
- safetensors-native weight loading, so no pickle in the loading path and the format is shared with the wider Hugging Face ecosystem.
- Double MIT and Apache-2.0 licensing, and a workspace split into small crates so a dependency can pull candle-core alone.

## Limitations

Coverage is per-model rather than universal: the example list is long but each entry is a specific checkpoint, and a model with no candle-transformers implementation means you write the forward pass yourself. Build ergonomics are the sharp edge. The FAQ documents missing-symbol linker errors with the mkl and accelerate features, a gcc-11 compile failure in flash-attention that requires pointing `NVCC_CCBIN` at gcc-10, and Docker builds that fail silently because `nvidia-smi` cannot detect compute capability inside a container without an explicit `CUDA_COMPUTE_CAP`. Model downloads are gated too: the LLaMA v2 examples return HTTP 401 until you accept Meta's conditions on the Hub and set a token. Finally, this is a framework, not a server, so anything resembling an API, batching or multi-client scheduling is your code or a third-party layer such as candle-vllm.

## Relation to the Arsenal

This is the foundational runtime entry in content/projects/inference-engines, and everything else in that phase either builds on it or competes for the same workload. Read it next to the candle-vllm entry in the same phase, which adds an OpenAI-compatible server on top of this tensor stack, and next to llama-cpp if you are choosing between a Rust tensor library and a C++ GGUF runtime. Model weights themselves live in content/projects/foundation-models, and the ONNX and OpenVINO entries in the same phase are the alternative route when you would rather execute an exported graph than build a Rust forward pass. For training rather than inference, this entry stops where content/projects/training-and-alignment begins.

## Resources

- [GitHub — huggingface/candle](https://github.com/huggingface/candle)
- [Installation guide with backend feature flags](https://huggingface.github.io/candle/guide/installation.html)
- [API docs — docs.rs/candle-core](https://docs.rs/candle-core)

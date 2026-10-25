---
id: llama-cpp
name: llama.cpp
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: C/C++ inference engine for GGUF models on CPUs, consumer GPUs and Apple silicon, with a unified `llama` CLI and OpenAI-compatible server
github_url: "https://github.com/ggml-org/llama.cpp"
license: MIT
primary_language: C++
org_or_maintainer: "ggml-org"
tags: [llm, inference, quantization, local]
maturity: production
cost_model: open-source
github_stars: 132303
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-10-25"
docs_url: "https://llama.app"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: true
supported_formats: [GGUF]
api_compatible: openai
phase: inference-engine
domain: [language, vision]
relation_to_stack: [deploy-as-is, build-on-top, fork-and-adapt]
health_signals: [community-driven, actively-maintained]
ecosystem_role:
  - "The substrate of the local-AI ecosystem: ggml's kernels plus a GGUF format that became the interchange standard, with Ollama, LM Studio, llamafile and most desktop apps running this code underneath"
best_for:
  - You need a model running on hardware nobody else targets — a CPU-only box, Apple silicon, an AMD or Intel GPU through Vulkan, a RISC-V SBC — and cannot afford a Python/CUDA dependency chain
  - "You want the whole model in memory with a quantisation level you choose: 1.5- to 8-bit integer formats let a 30B model fit where a 70B would not, and CPU+GPU offload covers the gap when VRAM is short"
  - You are embedding inference inside a product and need a C library with no runtime to ship, rather than a Python server to operate
avoid_if:
  - You are serving many concurrent users on datacentre GPUs — llama.cpp schedules one request stream well and batches modestly; vLLM and SGLang exist for the throughput case
  - Your team will only ever touch Python — the bindings are real but secondary, and a Python-first server will be less friction
  - You need every new architecture on release day with vendor-grade support — the community adds architectures fast, but occasionally late, and nothing is contracted
upstream_dependencies: [ggml-org-ggml]
downstream_consumers: [ollama, llamafile, localai]
alternatives: [vllm, sglang, ollama, llamafile, mlc-llm, exllamav2]
integrates_with: [hugging-face-hub, llama-cpp]
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-25: 132,303 stars, 2,581 open issues, MIT, last push 2026-10-25. README documents the 2026 `llama` unified CLI (`llama cli -hf …`, `llama serve -hf …`, install scripts at llama.app), 1.5- to 8-bit quantisation, CUDA/HIP/MUSA/Vulkan/SYCL/Metal backends, CPU+GPU hybrid inference, and the built-in web UI."
added_date: "2026-06-13"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

llama.cpp is the C/C++ engine that made running a language model on ordinary hardware normal. It runs GGUF-quantised weights on CPUs and consumer GPUs, treats Apple silicon as a first-class target through ARM NEON, Accelerate and Metal, and covers NVIDIA through custom CUDA kernels, AMD through HIP, Intel and other GPUs through Vulkan and SYCL, and Moore Threads through MUSA.

The 2026 shape of the project is more product than the historical build-it-yourself repo. There is a unified `llama` binary installed by a shell or PowerShell script from llama.app, with `llama cli -hf ggml-org/Qwen3.5-0.8B-GGUF` for a chat session and `llama serve -hf …` for an OpenAI-compatible API with a built-in web UI. Docker images, winget packages and pre-built release binaries exist for every platform, so the compile step is now optional.

Underneath it all is ggml, the tensor library that supplies the kernels, and GGUF, the file format that became the de facto interchange standard for quantised models.

## Why it's in the Arsenal

Two contributions outlive any single benchmark comparison.

The first is GGUF. Quantised weights needed a container that could describe architecture, tokeniser, chat template and per-tensor quantisation in one file, and GGUF became it. Every download named `*-Q4_K_M.gguf` is evidence that a C++ project won a format war against well-funded alternatives, and that decision is why a model can move between llama.cpp, llamafile, Ollama, LM Studio and a phone app without conversion.

The second is hardware reach. A model that runs on an AMD iGPU through Vulkan, an Apple M-series laptop, an AVX-512 server and a RISC-V board from the same source tree is a different kind of artifact from a CUDA-only serving stack. When the constraint is "this must run on the hardware we already own", llama.cpp is usually the only answer that does not require replacing the hardware.

The trade is throughput. One request stream at low latency is its design centre; many concurrent users are not.

## Architecture

ggml provides the backend abstraction: tensors, graph execution, and per-device kernels selected at build time and runtime. llama.cpp layers the model graph, the KV cache, tokeniser and sampling on top, with a `llama` frontend that dispatches to the CLI, the server, or benchmark and quantisation tools.

Quantisation is the technical heart. Integer formats from 1.5-bit to 8-bit, with k-quants (`Q4_K_M` and friends) packing groups of weights into mixed-precision blocks so the sensitive tensors keep more bits. The practical consequence: a 30B model at Q4_K_M fits in about 18GB and runs at usable speed on a single consumer card, where the BF16 original would not fit at all.

CPU+GPU hybrid inference is the other structural feature. Layers that fit in VRAM go to the GPU, the rest stay in system memory and are computed on the CPU, so a model larger than available VRAM still runs — slowly, but it runs. That is the difference between a workload starting today and a hardware purchase.

The server exposes an OpenAI-compatible HTTP surface with streaming, tool-call parsing for the model families that need it, and a web UI for testing, so an application written against the OpenAI schema needs only a base-URL change.

## Ecosystem Position

The catalog is largely downstream of this entry. `ollama` wraps llama.cpp in a daemon and model registry; `llamafile` welds it to Cosmopolitan Libc for single-file distribution; `localai` adds a multi-backend API layer. Those are packaging and product decisions on top of the same kernels, and knowing that changes how you debug them — a slow generation in Ollama is usually a llama.cpp offload decision.

Against `mlc-llm` the boundary is design philosophy: hand-written kernels per backend versus a compiler that generates them. llama.cpp lands faster on new hardware and new model quirks; MLC reaches WebGPU, iOS and Android with one model definition and pays in lag on novel architectures.

Against `vllm` and `sglang` the split is workload, not quality. Continuous batching, PagedAttention and prefix caching exist to keep datacentre GPUs saturated with concurrent requests. llama.cpp's modest batching is fine for a handful of streams and wasteful at fifty. Attempting to serve a team from one llama.cpp instance is the most common misuse of a very good tool.

Against `exllamav2` the overlap is single-user GPU speed: ExLlamaV2 is faster on NVIDIA cards with mixed-bit quantisation, but it is NVIDIA-only with a smaller model catalogue.

## Getting Started

```bash
curl -LsSf https://llama.app/install.sh | sh     # or: irm https://llama.app/install.ps1 | iex
```

```bash
llama cli -hf ggml-org/Qwen3.5-0.8B-GGUF         # interactive session, downloads the GGUF
llama serve -hf ggml-org/Qwen3.5-0.8B-GGUF       # OpenAI-compatible API + web UI on :8080
```

With a model you already have, `llama serve -m ./model-Q4_K_M.gguf -c 8192 -ngl 99` gives an 8K context with all layers offloaded to the GPU; drop `-ngl` when VRAM is short and let the hybrid path spill to RAM. To produce a quantisation from full-precision weights, `llama-quantize` takes the source GGUF and a target type, and the choice of type is the single largest quality decision in a local deployment.

If you build from source instead, the CMake flags decide which backends exist at all: `-DGGML_CUDA=ON`, `-DGGML_VULKAN=ON`, `-DGGML_METAL=ON`. A binary compiled without the flag for your GPU runs on CPU and looks mysteriously slow rather than broken.

## Key Use Cases

1. **Laptop and desktop assistants**: a quantised 8B or 30B model on consumer hardware, with Metal on Apple silicon and CUDA or Vulkan on Windows and Linux, inside an app that never calls a cloud API.
2. **Air-gapped and regulated deployments**: weights and engine on the same machine, no outbound network, and a licence (MIT) that a legal review will not block.
3. **Edge and embedded products**: a C library with no runtime, cross-compiled for ARM boards, phones or appliances, with the model and engine shipped as two files.
4. **Batch processing on CPU fleets**: converting documents, transcripts or logs at scale where GPU capacity is unavailable and throughput per hour matters more than tokens per second.
5. **Quantisation research and QA**: the toolchain for producing and comparing GGUF variants is part of the same repo, so quality-versus-size experiments do not need a second framework.
6. **A reference OpenAI-compatible endpoint for development**: `llama serve` gives a local API with tool-call support, which is the cheapest way to test application code before pointing it at a paid provider.

## Strengths

- Hardware coverage is unmatched: CUDA, HIP, MUSA, Vulkan, SYCL, Metal, CPU with AVX/AVX2/AVX-512/AMX and RISC-V vector extensions, from one codebase.
- GGUF is the interchange standard for quantised models, so weights move between this and almost every other local runtime without conversion.
- The quantisation range — 1.5-bit to 8-bit with k-quants — lets you trade quality for fit deliberately rather than picking from two options.
- CPU+GPU hybrid inference runs models larger than VRAM, which saves a hardware purchase in the common case where the model is slightly too big.
- MIT licence, no telemetry, no account, no network requirement after the weights are on disk.
- 132,000 stars and a daily merge cadence mean any bug you hit on mainstream hardware has likely been reported and fixed.

## Limitations

- **Concurrency is the wrong shape for serving.** Batching is limited and there is no paged KV cache or prefix sharing, so request latency degrades quickly as concurrent users rise.
- **Two thousand five hundred open issues.** The project moves fast and the tracker is enormous; a niche backend bug can sit indefinitely, and the maintainers' priorities follow the hardware vendors who contribute.
- **Quantisation quality needs measuring.** 4-bit k-quants are good, but degradation is workload-dependent and shows up in structured output and long-context recall rather than in perplexity — the metric people check.
- **The build matrix is the hard part.** Backend flags, CUDA toolkit versions, ROCm quirks and per-architecture compile options are where most first attempts fail, and the error messages are compiler errors rather than guidance.
- **CLI churn.** The unified `llama` binary replaced the older `llama-cli`/`llama-server` invocations; tutorials, scripts and LLM-generated commands still reference the old names and will fail.
- **No supported contract.** For a product on the critical path, the absence of a vendor, an SLA or a security-response process is a governance decision, not a technical one.

## Relation to the Arsenal

Read it as the engine under `ollama`, `llamafile` and `localai`, and as the single-machine counterweight to `vllm`, `sglang` and `tensorrt-llm` in [Inference Engines](../inference-engines/_index.md). `mlc-llm` is the compiler-based alternative for mobile and browser targets, `exllamav2` the NVIDIA-only speed alternative.

For weights to quantise, see [Foundation Models](../foundation-models/_index.md). For the ggml tensor library the kernels live in, see `ggml-org-ggml`.

## Resources

- [GitHub](https://github.com/ggml-org/llama.cpp)
- [Install and docs](https://llama.app)
- [Docker guide](https://github.com/ggml-org/llama.cpp/blob/master/docs/docker.md)
- [Build guide](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md)
- [Releases](https://github.com/ggml-org/llama.cpp/releases)

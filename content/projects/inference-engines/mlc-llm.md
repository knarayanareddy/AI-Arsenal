---
id: mlc-llm
name: "MLC LLM"
version_tracked: null
artifact_type: framework
category: llms
subcategory: inference-engines
description: "ML-compilation deployment engine: one model definition compiled to Metal, Vulkan, CUDA, ROCm, WebGPU, OpenCL and WASM for phones, browsers and desktops"
github_url: "https://github.com/mlc-ai/mlc-llm"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "MLC AI"
tags: [inference, edge, llm]
maturity: production
cost_model: open-source
github_stars: 23272
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-10-25"
docs_url: "https://llm.mlc.ai/docs/"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [language, general-purpose]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [research-origin, actively-maintained, community-driven]
ecosystem_role:
  - "The compiler-based answer to on-device inference: instead of hand-writing kernels per accelerator, MLC compiles the model through TVM so one definition reaches iPhone GPUs, Android OpenCL, WebGPU browsers and desktop accelerators — the stack behind WebLLM's in-browser demos"
best_for:
  - The same model must run in a browser tab and on a phone — WebGPU plus WASM in the browser, OpenCL on Adreno and Mali, Metal on Apple A-series, all from one compilation pipeline
  - You are shipping inference inside a mobile app and want an engine with an OpenAI-compatible API surface rather than a bespoke C++ integration per platform
  - Your hardware is GPU-generic rather than NVIDIA-specific — Vulkan, ROCm, Metal and OpenCL support means AMD, Intel and ARM GPUs are first-class rather than tolerated
avoid_if:
  - You serve on NVIDIA datacentre GPUs — `vllm`, `sglang` or `tensorrt-llm` extract more throughput per card and have mature batching
  - You need day-one support for a brand-new architecture — a compiler pipeline needs schedules for new attention and MoE patterns before they can run, so there is always a lag behind hand-written kernel engines
  - You want a single binary with no build step — the compiled-model workflow assumes you can run the compilation (or fetch prebuilt artifacts) for each target, which is more machinery than `llama-cpp`'s one-file path
upstream_dependencies: []
downstream_consumers: []
alternatives: [llama-cpp, ollama, vllm, mllm]
integrates_with: [apache-tvm]
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: "Re-verified 2026-10-25: 23,272 stars, 360 open issues, Apache-2.0, last push 2026-10-25. README documents MLCEngine with an OpenAI-compatible API over REST, Python, JavaScript, iOS and Android, with a support matrix covering Vulkan/ROCm/CUDA/Metal desktop GPUs, WebGPU+WASM in browsers, Metal on iOS/iPadOS and OpenCL on Adreno/Mali Android."
added_date: "2026-07-08"
last_reviewed: "2026-10-25"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source": "github-trending", "url": "https://github.com/mlc-ai/mlc-llm", "date": "2026-07-08", "description": "22,917 stars on GitHub as of 2026-07-08 (GitHub API); 23,272 by 2026-10-25"}
featured: false
status: active
---

## Overview

MLC LLM is what you get if you treat language-model inference as a compilation problem rather than a kernel-writing problem. A model is described once, lowered through TVM into target-specific code, and deployed to whatever accelerator the device has — Metal on an iPhone, OpenCL on an Android Adreno GPU, WebGPU in a browser, Vulkan or ROCm or CUDA on a desktop.

The runtime half is MLCEngine, which presents an OpenAI-compatible API over REST, Python, JavaScript, iOS and Android, all backed by the same compiled engine. The browser story is the one most people have met: WebLLM, the sibling project, runs models entirely in a tab with no server, and it is built on this stack.

## Why it's in the Arsenal

Most inference engines are organised around one hardware assumption and treat everything else as porting work. MLC inverts that: the compiler is the product, and hardware diversity is the point. That makes it the only catalogued engine that credibly covers a browser tab, a mid-range Android phone and a desktop GPU with the same model definition and the same API surface.

The second reason is architectural education. Comparing MLC with `llama-cpp` is the clearest way to understand the trade between a hand-tuned kernel library and an ahead-of-time compiler: the compiler gets breadth and consistency, the hand-written library gets the last 20% of performance and much faster support for new model shapes. Anyone choosing an edge inference strategy benefits from seeing both.

The cost is a build pipeline. That is a real price and it is paid per target platform.

## Architecture

TVM does the heavy lifting. Model weights and a graph description are lowered to target code through TVM's tensor-expression compiler, with per-backend schedules supplying the GPU-specific details. The output is a compiled model library plus weight shards, packaged for the target platform — a `.wasm` and shards for the browser, a native library for iOS or Android.

MLCEngine wraps that artifact with a common serving surface: chat completions, streaming, tool-call parsing and JSON-mode constraints, exposed identically across REST, Python, JavaScript and the mobile SDKs. That uniformity is the design achievement — application code does not branch on platform, only the packaging does.

Quantisation happens at compile time as part of the same pipeline (group-wise int4 and int8 being the common settings), which is why the compiled artifact is small enough for a phone or a browser download but also why changing quantisation means recompiling rather than re-exporting.

## Ecosystem Position

Against `llama-cpp` the trade is legible: GGUF plus hand-written kernels gives better single-machine performance, a much larger model catalogue and a one-file deployment; MLC gives reach into WebGPU, iOS and Android that llama.cpp cannot match without per-platform work. For a desktop or server deployment llama.cpp usually wins; for a phone or a browser MLC is the practical option.

Against `vllm` the comparison is not close in either direction — they solve different problems. vLLM optimises for many concurrent requests on datacenter GPUs; MLC optimises for one model running on unusual hardware. Using MLC for server throughput is a category error, and so is using vLLM for an iOS app.

`ollama` sits at the opposite end of the ergonomics scale: a daemon that downloads and runs models, all hand-written kernels, zero compilation. `mllm` is the lighter-weight multimodal engine worth comparing if the target is on-device vision rather than text. `apache-tvm` is the compiler underneath and the place to look when a backend is missing.

The unresolved strategic question for a reader is WebGPU's trajectory: if browser-side inference matures on top of standards rather than vendor lock-in, MLC's bet appreciates; if it stays a demo medium, the value concentrates on mobile.

## Getting Started

Desktop, through the Python package, is the least painful path to a working model:

```bash
pip install mlc-llm-nightly mlc-ai-nightly-cpu
mlc_llm serve HF://mlc-ai/Qwen3.5-4B-q4f16_1-MLC
```

The server is OpenAI-compatible, so the client is the same one you would point at any provider:

```bash
curl localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"Qwen3.5-4B-q4f16_1-MLC","messages":[{"role":"user","content":"Hello"}],"stream":true}'
```

For iOS, Android or the browser, start from the platform tutorials rather than improvising: each requires a compiled model artifact with a specific quantisation and a matching engine build, and the prebuilt wheels and model libraries exist precisely so that step is not manual. Verify the backend that actually loaded — a model compiled for WebGPU silently falls back to WASM and runs an order of magnitude slower.

## Key Use Cases

1. **In-browser inference with no server**: a WebGPU build puts a small model in a tab, which is the right architecture for privacy-sensitive tools where documents must never leave the device.
2. **Mobile apps with an LLM inside**: iOS and Android SDKs with the same chat-completions interface mean the app layer is written once and the engine ships per platform.
3. **AMD, Intel or ARM GPU fleets**: Vulkan and OpenCL support makes GPUs that CUDA-only engines ignore usable, which matters on laptops and in cost-constrained deployments.
4. **Demos and prototypes for stakeholders**: a phone or a browser tab running local inference is a more persuasive artifact than a slide about on-device AI.
5. **Cross-platform consistency testing**: running the same compiled model across targets reveals quantisation or kernel discrepancies that a single-platform test never surfaces.
6. **Research on compilation-based inference**: the stack is a working laboratory for schedule and quantisation experiments, with a paper trail behind the design.

## Strengths

- Platform coverage is the widest in the catalog: browser WebGPU and WASM, iOS Metal, Android OpenCL, and desktop Vulkan/ROCm/CUDA/Metal.
- One model definition, one API surface, many platforms — application code does not branch by target.
- Compilation makes quantisation a first-class parameter rather than a post-hoc step, with group-wise int4 artifacts that fit on constrained devices.
- The OpenAI-compatible interface across REST, Python, JavaScript and mobile SDKs is unusually consistent for a cross-platform stack.
- Apache-2.0 with an academic lineage (CMU, OctoML) and published design work, so the reasoning is inspectable rather than folklore.
- WebLLM's public demos are ongoing proof that the browser path works at production scale.

## Limitations

- **Compilation lag on new architectures.** A novel attention variant or MoE layout needs schedules before it runs at all, so the newest models arrive later than in hand-written engines.
- **The build pipeline is the barrier.** Per-platform compiled artifacts, quantisation choices and engine versions must line up; the failure mode is a wrong-backend fallback that looks like a slow model.
- **Peak performance trails hand-tuned kernels.** On a machine where llama.cpp has an optimised path, MLC is usually somewhat slower — the compiler buys breadth by giving up the last increment of speed.
- **Documentation assumes compiler literacy.** TVM scheduling, target strings and quantisation configs are the vocabulary, and the docs are written for people who know them.
- **Model catalogue is curated, not open.** Unlike the GGUF ecosystem, you generally run models someone has compiled for MLC or compile your own; choice is narrower.
- **Smaller community than the local-inference mainstream.** 360 open issues and fewer Stack Overflow answers mean edge cases take longer to resolve.

## Relation to the Arsenal

Set it against `llama-cpp` (better desktop performance, GGUF breadth, single-file deployment), `vllm` (server throughput), `ollama` (developer ergonomics) and `mllm` (on-device multimodal). `apache-tvm` is the compiler it is built on; `webllm` is the browser distribution.

For target hardware selection, see `google-ai-edge-mediapipe` and `onnx-onnx` in [Inference Engines](../inference-engines/_index.md); for models worth compiling, see [Foundation Models](../foundation-models/_index.md).

## Resources

- [GitHub](https://github.com/mlc-ai/mlc-llm)
- [Documentation](https://llm.mlc.ai/docs/)
- [Quick start](https://llm.mlc.ai/docs/get_started/quick_start)
- [WebLLM](https://github.com/mlc-ai/web-llm)
- [MLC blog](https://blog.mlc.ai/)

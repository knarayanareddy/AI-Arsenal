---
id: text-generation-inference
name: Text Generation Inference
version_tracked: null
artifact_type: platform
category: llms
subcategory: inference-engines
description: Hugging Face's Rust-and-Python LLM server, now archived after entering maintenance mode in December 2025
github_url: https://github.com/huggingface/text-generation-inference
license: Apache-2.0
primary_language: Python
org_or_maintainer: Hugging Face
tags:
  - llm
  - inference
  - streaming
  - batching
maturity: production
cost_model: open-source
github_stars: 10882
github_stars_last_30d: 19
trending_score: 17
last_commit: '2026-03-21'
docs_url: https://huggingface.co/docs/text-generation-inference
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: true
supported_formats:
  - HF
  - GPTQ
  - AWQ
api_compatible: openai
phase: inference-engine
domain:
  - language
relation_to_stack:
  - deploy-as-is
  - study-and-reference
health_signals:
  - org-backed
ecosystem_role:
  - 'The server that made continuous batching and Hugging Face-native serving the default: TGI forced optimized engines to adopt `transformers` model architectures, and the engines that inherited that idea are where the code goes now'
best_for:
  - You maintain a running TGI deployment and need to know precisely how long it will keep working, which fixes are still accepted, and what migration target matches your hardware
  - You are reading inference-server history and want the design TGI introduced — token streaming, continuous batching, tensor parallelism behind an OpenAI-compatible HTTP and gRPC surface
avoid_if:
  - 'You are choosing a serving engine today: the repository is archived, only minor bug fixes and documentation changes were ever going to be accepted from December 2025, and no new model architectures will be added'
  - You need a model released after early 2026 — the loader will not know the architecture, and there is no upstream to add it
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - vllm
  - sglang
  - llama-cpp
  - vllm-mlx
integrates_with:
  - hugging-face-hub
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: 'Re-verified 2026-10-25: github.com/huggingface/text-generation-inference is archived (last push 2026-03-21, 10,882 stars, 324 open issues). README carries the maintenance-mode caution block naming vLLM, SGLang, llama.cpp and MLX as the engines it recommends. HF docs record the maintenance-mode date as 2025-12-11.'
added_date: '2026-06-13'
last_reviewed: '2026-10-25'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: hackernews
    url: https://huggingface.co/docs/inference-endpoints/en/engines/tgi
    date: '2025-12-11'
    description: Hugging Face's own documentation confirms TGI entered maintenance mode on 12/11/2025, redirecting new inference-engine investment to vLLM, SGLang, llama.cpp, and MLX
featured: false
status: archived
---

## Overview

Text Generation Inference was Hugging Face's production server for large language models: a Rust router in front of Python model shards, speaking HTTP and gRPC, streaming tokens, and batching requests continuously so that a GPU stays busy across users. It powered Hugging Chat, the Inference API and Inference Endpoints, and for a period around 2023–2024 it was the default way to put a Hugging Face model behind an endpoint.

Its life ended slowly and then formally. On 11 December 2025 Hugging Face put the project into maintenance mode, accepting only minor bug fixes, documentation changes and lightweight maintenance. The repository is now archived; the last push was 21 March 2026.

## Why it's in the Arsenal

Not because it is a good deployment target in 2026 — it is not — but because the reason it was retired is the most useful inference lesson of the period.

TGI's own retirement note credits the project with pushing optimized engines to load `transformers` model architectures directly, instead of maintaining a separate architecture implementation per engine. That idea won: vLLM, SGLang, llama.cpp and MLX all read Hugging Face architecture definitions now. The consequence is that a catalog reader evaluating engines can stop asking "which one supports model X" and start asking which one schedules work the way their workload needs, because architecture support converged.

An archived entry also does real work in a catalog: it stops people adopting something because it has ten thousand stars and a familiar name. Stars do not decay when a project is archived — 10,882 of them still sit on a repository that will never support the model you just downloaded.

## Architecture

Three layers, and the split is still visible in its successors.

A Rust HTTP and gRPC router accepts requests, queues them, and handles the token stream back to the client — including the SSE framing that made an OpenAI-compatible endpoint feel instantaneous. Behind it, Python processes hold shards of the model, with tensor parallelism splitting a single model across GPUs and each shard running a `transformers`-defined architecture. Continuous batching lives in the scheduler: a finished sequence leaves the batch and a queued one joins it, rather than waiting for the slowest request in a fixed batch. Quantization was handled at load time, with GPTQ, AWQ and bits-and-bytes families among the supported paths.

The economics it established — that batching is the difference between a GPU at 15% and 85% utilisation — remain the reason every successor exists.

## Ecosystem Position

Superseded, explicitly and by its own maintainers. Hugging Face's maintenance note names vLLM and SGLang as the engines it contributes to and recommends, with llama.cpp and MLX for local and Apple-silicon use. That is not a hedge: the repository is archived and the loader is frozen.

Against `vllm` the loss is PagedAttention and prefix caching, which changed memory behaviour rather than just throughput. Against `sglang` it is structured generation and a faster frontend. Against `llama-cpp` the boundary is hardware class — llama.cpp serves quantised models on CPUs and consumer GPUs where TGI assumed datacentre accelerators.

Teams that still run TGI usually inherited it through Hugging Face Inference Endpoints or an internal template. The migration question is not whether to move but which successor matches the hardware, and the answer is almost always vLLM on NVIDIA, SGLang where constrained decoding or agent workloads dominate, and llama.cpp when the deployment left the datacentre.

## Getting Started

Only as a reproduction of an existing deployment. The container still pulls:

```bash
docker run --gpus all -p 8080:80 \
  -v $PWD/data:/data \
  ghcr.io/huggingface/text-generation-inference:latest \
  --model-id HuggingFaceH4/zephyr-7b-beta
```

```bash
curl localhost:8080/generate_stream \
  -X POST -d '{"inputs":"Explain continuous batching.","parameters":{"max_new_tokens":128}}' \
  -H 'Content-Type: application/json'
```

Pin the image tag rather than using `latest`; no further tags are coming, and a floating tag on an archived project is a reproducibility problem with no fix upstream. If you are migrating, the equivalent `vllm serve HuggingFaceH4/zephyr-7b-beta` is a single command with the same OpenAI-compatible surface.

## Key Use Cases

1. **Keeping an inherited deployment alive**: if a service still points at port 8080 on a TGI container, this entry documents what will and will not be fixed, and why pinning the image is the only maintenance strategy left.
2. **Understanding why serving engines converged**: the retirement note is a primary source for the shift from per-engine architecture implementations to shared `transformers` definitions.
3. **Benchmark archaeology**: throughput comparisons published 2023–2024 were mostly against TGI, and knowing its batching design is what makes those tables readable.
4. **A migration checklist**: every behaviour TGI had — streaming, OpenAI-compatible route, tensor parallelism — has a named equivalent in the successor engines, which makes the port mechanical.
5. **Teaching inference internals**: the Rust-router-plus-Python-shards split is the clearest worked example of where the scheduler belongs and why it is not in Python.

## Strengths

- It made continuous batching and token streaming the baseline expectation for an inference server, and the industry never went back.
- A genuinely OpenAI-compatible HTTP surface plus gRPC, which is why so many internal platforms still carry its route shape in their client code.
- Its advocacy for `transformers`-native architecture loading is the reason engine choice is now about scheduling rather than model support.
- The design is documented and small enough to read, which makes it a better teaching artifact than a live dependency.
- Ten thousand stars of issue history: most failure modes you will hit on a successor engine were first diagnosed in a TGI issue thread.

## Limitations

- **Archived, not merely quiet.** No security fixes, no new model architectures, no compatibility work for anything released after early 2026. Open issues stay open.
- **The model support window is closed.** Anything whose architecture postdates the freeze will fail at load time; there is no supported workaround short of a fork.
- **Forking is a trap.** A fork inherits a Rust router and a Python shard layer that must track upstream `transformers` changes indefinitely — a permanent maintenance obligation for a project the original maintainer judged not worth continuing.
- **Performance figures are historical.** Published throughput comparisons predate PagedAttention-era scheduling and prefix caching, so treating them as current guidance will pick the wrong engine.
- **Memory behaviour was its weakest point even when current.** Without paged KV allocation, long-context concurrency fragmented badly, which is precisely the problem vLLM was built to solve.
- **Stars mislead here more than anywhere.** 10,882 stars and a Hugging Face logo make it look maintained; the archived banner and a last push in March 2026 say otherwise.

## Relation to the Arsenal

This is the entry to read before choosing among the engines in [Inference Engines](../inference-engines/_index.md): `vllm`, `sglang`, `llama-cpp` and `mlx` are the named successors. For the weights it served, see [Foundation Models](../foundation-models/_index.md). For managed endpoints that abstracted it, see [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub (archived)](https://github.com/huggingface/text-generation-inference)
- [Documentation](https://huggingface.co/docs/text-generation-inference)
- [Maintenance-mode notice](https://huggingface.co/docs/inference-endpoints/en/engines/tgi)
- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)

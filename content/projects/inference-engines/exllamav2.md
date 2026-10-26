---
id: exllamav2
name: "ExLlamaV2"
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: "Archived consumer-GPU inference library behind the EXL2 quantisation format — superseded by ExLlamaV3; read it for the design, serve with TabbyAPI"
github_url: "https://github.com/turboderp-org/exllamav2"
license: "MIT"
primary_language: Python
org_or_maintainer: "turboderp"
tags: [inference, quantization, local]
maturity: production
cost_model: open-source
github_stars: 4647
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-03-04"
docs_url: "https://github.com/turboderp-org/exllamav2#readme"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [language]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [community-driven]
ecosystem_role:
  - "The enthusiast-tier quantized-inference engine: EXL2's variable-bitrate quantization (2.0–8.0 bits per weight, mixed within a model) squeezes the largest possible models onto consumer VRAM with better quality-per-bit than fixed-width formats at low bitrates."
best_for:
  - "You run big models on consumer NVIDIA cards (24GB and under) — EXL2's fractional-bit quantization lets you dial model size precisely to your VRAM with measured perplexity trade-offs"
  - "You want the design lesson rather than the binary — reading EXL2 quantisation and the dynamic generator explains why later engines added paged attention, prompt caching and speculative decoding"
avoid_if:
  - "You need a maintained stack — the repository is archived; ExLlamaV3 plus TabbyAPI is the continuation, and llama.cpp is the portable alternative"
  - "You are serving many concurrent users in production — vLLM-class continuous batching and operational tooling are stronger for multi-tenant serving"
upstream_dependencies: []
downstream_consumers: []
alternatives: [llama-cpp, vllm]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Re-verified 2026-10-26: the repository is archived (4,647 stars, 162 open issues, last push 2026-03-04) and the README redirects development to ExLlamaV3 (MIT, 1,752 stars, pushed 2026-10-25). TabbyAPI (AGPL-3.0, 1,496 stars) remains the recommended OpenAI-compatible server."
added_date: "2026-07-08"
last_reviewed: "2026-10-26"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/turboderp-org/exllamav2", "date": "2026-07-08", "description": "4,581 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: archived
---

## Overview

An inference library optimized for running quantized LLMs on consumer GPUs, built around the EXL2 format: weights are quantized with variable bitrates (mixing 2–8 bits within the same model, allocated by measured sensitivity), which delivers better quality at aggressive compression than uniform formats. The successor ExLlamaV3 introduces the QTIP-based EXL3 format.

## Why it's in the Arsenal

ExLlamaV2 appears in this catalog as a reference point for the inference-engine phase; the useful question is which hardware and load it is good for, since that is what separates runtimes in practice. The sections below state what it claims to do and what adopting it would commit you to.

## Architecture

Custom CUDA kernels implement fused attention and quantized matmul over EXL2 tensors; quantization allocates bitrate per layer/matrix by optimizing measured KL-divergence against calibration data. Paged attention, LoRA loading, speculative decoding, and Q4/Q6/Q8 quantized KV cache round out the runtime; TabbyAPI provides the OpenAI-compatible serving layer.

## Ecosystem Position

Upstream: PyTorch + custom CUDA extensions. Downstream: TabbyAPI, text-generation-webui, SillyTavern ecosystems standardize on it for GPU-rich local setups. It competes with llama.cpp/GGUF (broader hardware, larger community) and AWQ/GPTQ paths in vLLM (server-side). The EXL2-vs-GGUF choice is the canonical local-inference trade-off: EXL2 for CUDA speed and bitrate precision, GGUF for portability.

## Getting Started

```bash
pip install exllamav2
# Quantize (or download EXL2 weights from HF), then:
python examples/chat.py -m <path-to-exl2-model> -mode llama3
```

## Key Use Cases

1. **Reading it as a design reference**: EXL2 established variable-bitrate quantisation for consumer GPUs, and the idea — choose bits per layer by measured sensitivity rather than one global width — is why 6-bit-ish weights run on a 24 GB card.
2. **Understanding the successor's model support**: ExLlamaV3 (EXL3, based on QTIP) is where the line continues, with 2-8 bit cache quantisation, tensor and expert parallelism, and CPU offloading for large MoE models.
3. **Choosing a local runtime for a single consumer GPU**: the decision is between ExLlamaV3 via TabbyAPI and `llama.cpp` via its server — the former for CUDA-only throughput, the latter for portability across hardware.
4. **Serving local models behind an OpenAI-compatible API**: TabbyAPI wraps the library with HF downloads, embeddings and Jinja2 chat templates, which is what makes it usable in an existing application.

## Strengths

- EXL2 quantisation is the contribution: bitrate is allocated per layer and per matrix by optimising measured KL-divergence against calibration data, so a 6-bit-ish mix usually beats a flat 4-bit model of the same size — that is the claim to test, not accept, and it is reproducible with the repo's own tooling.
- Consumer-GPU focus throughout: kernels are written for one or two cards, not a datacentre node, and the memory budget assumes VRAM you actually have.
- The dynamic generator consolidated batching, prompt caching, K/V cache deduplication and speculative decoding into one API — features that later became table stakes in every local runtime.
- A clean handover: the README states the archive and names the successor, which is more than most archived projects manage.
- MIT licensed and small enough to read; the quantisation code is a usable reference for anyone writing a runtime.

## Limitations / When NOT to Use

- **It is archived.** Development continues in ExLlamaV3; anything built on this API is frozen, and EXL2-specific tooling is where the risk concentrates.
- **CUDA and consumer GPUs only.** No Apple Silicon, no ROCm path worth the name, no CPU fallback — a portability ceiling that `llama.cpp` does not have.
- **The serving layer was always separate.** The official server is TabbyAPI (AGPL-3.0), so a deployment is two projects with two licences and two release cycles.
- **Smaller ecosystem than llama.cpp or vLLM.** Fewer quantised releases, fewer integrations, and less documentation written by other people.
- **Not a multi-tenant server.** No request queueing policy or adapter multiplexing comparable to vLLM or SGLang; it serves a model, not a fleet.

## Relation to the Arsenal

The consumer-GPU branch of the inference-engine phase: beside `llama-cpp` (portable, CPU-capable, slower on CUDA) and against `vllm` and `sglang` (server-class throughput on datacentre GPUs). For local use in 2026 the live path is ExLlamaV3 through TabbyAPI; this entry is retained because the quantisation approach it introduced is still what most single-GPU local setups rely on.

The serving layer that consumes it belongs to `tools/serving-and-deployment/` — `ray-serve` for orchestration and `replicate` when the model should not run on your own hardware at all.

## Strengths

- Custom CUDA kernels implement fused attention and quantized matmul over EXL2 tensors; quantization allocates bitrate per layer/matrix by optimizing measured KL-divergence against calibration data. Paged attention, LoRA loading, speculative decoding, and Q4/Q6/Q8 quantized KV cache round out the runtime; TabbyAPI provides the OpenAI-compatible serving layer.
- Sits in the inference-engine phase alongside the alternatives named in its Ecosystem Position section; cross-phase comparison is usually a category error rather than a useful alternative.

## Limitations

- **The repository is archived.** No fixes, no new model architectures, no security patches — the README points to ExLlamaV3, and anything built against this API is frozen.
- **CUDA-only in practice.** No Apple Silicon path, no usable CPU fallback, so the portability ceiling is the hardware you bought.
- **Two projects, two licences, one deployment.** The serving layer is TabbyAPI under AGPL-3.0, which is a real licensing question for a commercial product.
- **The ecosystem moved.** Quantised EXL2 releases are still published, but integration effort follows the maintained successors (`vllm`, `sglang`, `llama.cpp`).
- **Not a multi-tenant server.** No adapter multiplexing or queue policy comparable to LoRAX-style designs or vLLM's LoRA support.

## Relation to the Arsenal

ExLlamaV2 is the enthusiast quantized-inference engine, using the variable-bitrate EXL2 format to fit large models on consumer VRAM. This is an inference-engine entry: it documents the serving runtime itself. For the model weights it serves, see [Foundation Models](../foundation-models/_index.md). For hosted/managed serving alternatives, see [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub](https://github.com/turboderp-org/exllamav2)
- [Documentation](https://github.com/turboderp-org/exllamav2#readme)
- [Successor: ExLlamaV3](https://github.com/turboderp-org/exllamav3)
- [TabbyAPI server](https://github.com/theroyallab/tabbyAPI)

---
*Last reviewed: 2026-10-26 by @maintainer — repository confirmed archived via the GitHub API (4,647 stars, last push 2026-03-04); development continues in ExLlamaV3.*

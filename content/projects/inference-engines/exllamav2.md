---
id: exllamav2
name: ExLlamaV2
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: Consumer-GPU-focused inference library with the EXL2 variable-bitrate quantization format for running large models on limited VRAM
github_url: https://github.com/turboderp-org/exllamav2
license: MIT
primary_language: Python
org_or_maintainer: turboderp
tags:
  - inference
  - quantization
  - local
maturity: production
cost_model: open-source
github_stars: 4586
github_stars_last_30d: 5
trending_score: 40
last_commit: '2026-03-04'
docs_url: https://github.com/turboderp-org/exllamav2#readme
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain:
  - language
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - community-driven
  - actively-maintained
ecosystem_role:
  - 'The enthusiast-tier quantized-inference engine: EXL2''s variable-bitrate quantization (2.0–8.0 bits per weight, mixed within a model) squeezes the largest possible models onto consumer VRAM with better quality-per-bit than fixed-width formats at low bitrates.'
best_for:
  - You run big models on consumer NVIDIA cards (24GB and under) — EXL2's fractional-bit quantization lets you dial model size precisely to your VRAM with measured perplexity trade-offs
  - You build local chat/roleplay/agent UIs — it is a standard backend in TabbyAPI and text-generation-webui with fast prompt processing and speculative decoding
avoid_if:
  - You need CPU or Apple Silicon inference — it is CUDA/ROCm only; llama.cpp covers those targets
  - You are serving many concurrent users in production — vLLM-class continuous batching and operational tooling are stronger for multi-tenant serving
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - llama-cpp
  - vllm
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (4,581), primary language, license, and last commit (2026-03-04) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/turboderp-org/exllamav2
    date: '2026-07-08'
    description: 4,581 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

An inference library optimized for running quantized LLMs on consumer GPUs, built around the EXL2 format: weights are quantized with variable bitrates (mixing 2–8 bits within the same model, allocated by measured sensitivity), which delivers better quality at aggressive compression than uniform formats. The successor ExLlamaV3 introduces the QTIP-based EXL3 format.

## Why it's in the Arsenal

The enthusiast-tier quantized-inference engine: EXL2's variable-bitrate quantization (2.0–8.0 bits per weight, mixed within a model) squeezes the largest possible models onto consumer VRAM with better quality-per-bit than fixed-width formats at low bitrates. It earns a place in the Arsenal because it directly addresses a recurring decision point: you run big models on consumer NVIDIA cards (24GB and under) — EXL2's fractional-bit quantization lets you dial model size precisely to your VRAM with measured perplexity trade-offs. See Strengths / Limitations below before adopting it.

## Architecture

Custom CUDA kernels implement fused attention and quantized matmul over EXL2 tensors; quantization allocates bitrate per layer/matrix by optimizing measured KL-divergence against calibration data. Paged attention, LoRA loading, speculative decoding, and Q4/Q6/Q8 quantized KV cache round out the runtime; TabbyAPI provides the OpenAI-compatible serving layer.

## Ecosystem Position

Upstream: PyTorch + custom CUDA extensions. Downstream: TabbyAPI, text-generation-webui, SillyTavern ecosystems standardize on it for GPU-rich local setups. Competing: llama.cpp/GGUF (broader hardware, larger community) and AWQ/GPTQ paths in vLLM (server-side). The EXL2-vs-GGUF choice is the canonical local-inference trade-off: EXL2 for CUDA speed and bitrate precision, GGUF for portability.

## Getting Started

```bash
pip install exllamav2
# Quantize (or download EXL2 weights from HF), then:
python examples/chat.py -m <path-to-exl2-model> -mode llama3
```

## Key Use Cases

1. **Scenario**: you run big models on consumer NVIDIA cards (24GB and under) — EXL2's fractional-bit quantization lets you dial model size precisely to your VRAM with measured perplexity trade-offs
2. **Scenario**: you build local chat/roleplay/agent UIs — it is a standard backend in TabbyAPI and text-generation-webui with fast prompt processing and speculative decoding

## Strengths

- You run big models on consumer NVIDIA cards (24GB and under) — EXL2's fractional-bit quantization lets you dial model size precisely to your VRAM with measured perplexity trade-offs
- You build local chat/roleplay/agent UIs — it is a standard backend in TabbyAPI and text-generation-webui with fast prompt processing and speculative decoding

## Limitations

- You need CPU or Apple Silicon inference — it is CUDA/ROCm only; llama.cpp covers those targets
- You are serving many concurrent users in production — vLLM-class continuous batching and operational tooling are stronger for multi-tenant serving

## Relation to the Arsenal

This is an inference-engine entry: it documents the serving runtime itself. For the model weights it serves, see [Foundation Models](../foundation-models/_index.md). For hosted/managed serving alternatives, see [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub](https://github.com/turboderp-org/exllamav2)
- [Documentation](https://github.com/turboderp-org/exllamav2#readme)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (4,581 stars, last commit 2026-03-04, verified via GitHub API on 2026-07-08)*

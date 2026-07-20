---
id: mistral-rs
name: mistral.rs
version_tracked: null
artifact_type: framework
category: llms
subcategory: inference-engines
description: Pure-Rust cross-modality LLM inference server — text, vision, image generation, and speech behind OpenAI-compatible APIs with ISQ in-place quantization
github_url: https://github.com/EricLBuehler/mistral.rs
license: MIT
primary_language: Rust
org_or_maintainer: EricLBuehler
tags:
  - inference
  - llm
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 7501
github_stars_last_30d: 60
trending_score: 45
last_commit: '2026-07-17'
docs_url: https://ericlbuehler.github.io/mistral.rs/
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain:
  - general-purpose
  - multimodal
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - 'The Rust ecosystem''s answer to a full LLM inference server: what llama.cpp is to C/C++, mistral.rs aims to be for Rust — Candle-lineage kernels, multi-modality (text/vision/image-gen/speech), PagedAttention-style batching, and in-situ quantization (ISQ) that quantizes safetensors weights at load time'
best_for:
  - Rust-native applications that want in-process LLM inference (Rust API, plus Python bindings) instead of shelling out to a separate C++ or Python server
  - Serving from original safetensors checkpoints without a separate quantization step — ISQ quantizes at load, removing the GGUF-conversion pipeline stage
avoid_if:
  - You need maximum multi-GPU datacenter throughput — vLLM/SGLang remain ahead on batched serving performance and ecosystem tooling
  - You want the largest model-format community — llama.cpp's GGUF ecosystem has far more coverage, quants, and debugging lore
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - llama-cpp
  - vllm
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (7.4k), MIT, and active development (last push 2026-07-07) verified via the GitHub API on 2026-07-08. Feature claims (ISQ, modality coverage, PagedAttention) from official docs; no independent benchmarking here. Below the usual star bar but admitted as the leading Rust-native inference server, complementing the candle entry.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/EricLBuehler/mistral.rs
    date: '2026-07-08'
    description: 7.4k stars; the most active Rust-native LLM inference server
featured: false
status: active
---

## Overview

mistral.rs is a pure-Rust inference platform (name notwithstanding, it serves most open architectures): text, vision-language, image generation (FLUX-class), and speech models behind an OpenAI-compatible HTTP server, a Rust crate, and Python bindings. Its signature mechanism is ISQ (in-situ quantization) — quantizing standard safetensors weights at load time — plus GGUF/GPTQ/AWQ support, PagedAttention-style continuous batching, FlashAttention, and CUDA/Metal/CPU backends.

## Why it's in the Arsenal

Two mechanisms distinguish it from the engines already cataloged: in-process inference for Rust applications (a deployment shape neither llama.cpp-via-FFI nor a Python sidecar serves cleanly), and ISQ, which deletes the convert-to-GGUF pipeline stage that dominates local-inference onboarding friction. As the most active server built on the Candle lineage, it completes the Rust inference story that `candle` opens.

## Architecture

Rust core with Candle-lineage tensor/kernel infrastructure; model pipelines per architecture family with a device-mapping layer (split layers across GPUs/CPU); ISQ pass quantizes weights post-load to a chosen level (Q4K through Q8); scheduler implements continuous batching with PagedAttention-style KV management; serves via axum-based OpenAI-compatible HTTP, or embeds via the `mistralrs` crate / `mistralrs-pyo3` Python package.

## Ecosystem Position

Upstream: HF Hub safetensors and GGUF checkpoints; Candle heritage for kernels. Competing: llama.cpp (bigger community, C/C++), vLLM/SGLang (datacenter throughput), Ollama (appliance UX). Complementary: Rust application stacks (axum/tauri services) that want inference as a library, not a sidecar.

## Getting Started

```bash
cargo install mistralrs-server
mistralrs-server --isq Q4K -i plain -m meta-llama/Llama-3.2-3B-Instruct
# OpenAI-compatible API on :1234, or use the interactive mode directly
```

## Key Use Cases

1. **Scenario**: a Rust service or desktop app embedding local LLM inference in-process — one binary, no Python runtime, no external server
2. **Scenario**: serving new model releases straight from safetensors with ISQ, skipping the wait for community GGUF quantizations

## Strengths

- ISQ removes a whole pipeline stage (offline quantization/conversion) — a workflow mechanism, not a benchmark number
- Unusually broad modality coverage for a local engine (text, vision, image generation, speech) behind one API

## Limitations

- Community and quantization lore are an order of magnitude smaller than llama.cpp's; expect to file issues rather than find answers
- Single-maintainer-centric velocity (though sustained for years) is a bus-factor consideration for production bets

## Relation to the Arsenal

Completes the Rust inference lineage started by `candle`; sits between `llama-cpp` (portable C/C++ local runtime) and `vllm` (datacenter serving) as the embed-in-Rust option among inference engines.

## Resources

- [GitHub](https://github.com/EricLBuehler/mistral.rs)
- [Documentation](https://ericlbuehler.github.io/mistral.rs/)

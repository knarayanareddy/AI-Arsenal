---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "EricLBuehler"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: candle-vllm
name: "candle-vllm"
artifact_type: tool
category: llms
subcategory: inference-engines
description: "Rust LLM serving engine on Hugging Face's candle, with an OpenAI-compatible API, Web UI, PagedAttention, continuous batching and TurboQuant KV compression"
github_url: "https://github.com/EricLBuehler/candle-vllm"
license: MIT
primary_language: Rust
tags: [inference, quantization, caching, batching]
maturity: beta
cost_model: open-source
github_stars: 728
last_commit: "2026-09-17"
docs_url: "https://github.com/EricLBuehler/candle-vllm#readme"
phase: inference-engine
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "contribute-to"
health_signals:
  - "community-driven"
  - "experimental"
ecosystem_role:
  - "Rust and Candle alternative to Python-heavy LLM servers, with a narrower model surface than vLLM"
best_for: ["You serve local models on macOS or Apple Silicon and you want an OpenAI-compatible endpoint with continuous batching rather than a single-user desktop runtime.", "You need a long context window on a memory-constrained device and you want to trade KV precision for capacity with turbo8, turbo4 or turbo3 rather than shrinking the model.", "You are on CUDA and want PagedAttention, prefix caching, chunked prefill and Marlin or GPTQ quantization in a single binary, with MCP tool calling on the same server."]
avoid_if: ["You need a benchmark-proven throughput leader for large multi-tenant serving, because the published decode-speed table is single-request on one Hopper GPU and leaves several frontier checkpoints marked TBD.", "You are on an architecture outside CUDA and Metal, because the README lists those two backends and nothing else.", "You need speculative decoding on a non-Qwen3.5-family target, because both documented modes (MTP weights and DFlash2 draft checkpoints) are scoped to the Qwen3.5, 3.6 and 3.8 line."]
enrichment_notes: "MIT-licensed community project with a smaller model-coverage footprint than vLLM. Draft pending review."
---

## Overview

A single Rust binary that serves language models behind an OpenAI-compatible API on port 2000, with an optional ChatGPT-style interface on the port below it. The performance story is built from native Flash Attention, the FlashInfer backend, CUDA Graphs, continuous batching, chunked prefill at 8K by default, and prefix caching that is on unless explicitly disabled. Memory is managed through a PagedAttention block cache, fixed with --mem in megabytes or auto-sized at 60% of remaining device memory with --kv-fraction. Weights arrive as a Hugging Face ID, a local safetensors directory, a single or multi-shard GGUF file, or a directory of GGUFs that is auto-detected, with mmproj vision-tower files loaded on demand for multimodal checkpoints. Quantisation options cover in-situ GGUF, GPTQ, AWQ, Marlin, block-wise FP8 and MXFP4/NVFP4.

## Why it's in the Arsenal

The decision here is whether you want a serving engine you can audit and patch in Rust, on hardware the incumbent does not serve well. vLLM is the reference implementation in the README, and the divergence is deliberate: Metal support makes Apple Silicon a first-class target, and the Rust codebase means the KV-cache experiments live in the same language as the engine. The cost is maturity. With 728 stars and a single visible maintainer, the throughput numbers that matter most for production, deep concurrency behaviour and long-running stability, are exactly the ones the README has not yet characterised.

## Architecture

Requests hit the OpenAI-compatible server, are batched continuously, and draw from a PagedAttention KV cache whose block budget is either fixed with `--mem` in megabytes or auto-sized as a fraction of remaining device memory with `--kv-fraction` (default 0.6). Prefill is chunked at 8K by default, and prefix caching is on unless `--disable-prefix-cache` is passed, so a repeated system prompt is served from cache. Attention kernels come from native Flash Attention or the FlashInfer backend, with CUDA Graphs capturing the decode step; TurboQuant swaps in native flash-attention kernels that disable FlashInfer and applies a Walsh-Hadamard transform to quantise keys and values to 2-4 bits, falling back to standard KV cache for MLA models whose compressed layout it cannot represent. Tensor parallelism runs multi-process by default (GPU count must be a power of two) with a `--multithread` debugging mode, and multi-node uses TCP NCCL bootstrap flags `--num-nodes`, `--node-rank`, `--master-addr` and `--master-port`. Tool calling is parsed by a selectable backend via `--enforce-parser` (`qwen_coder`, `qwen`, `json`, `mistral`).

## Ecosystem Position

Candle-vLLM is a direct alternative to vLLM and SGLang in content/projects/inference-engines, and the README credits vLLM as both the Python reference and the paper source. Where vLLM is CUDA-first with community CPU and Apple paths, this engine is CUDA and Metal by design, which is the decisive difference on a Mac. It sits on top of the candle entry in the same phase and therefore competes with llama-cpp and Ollama for local-model serving, but with a real scheduling stack (PagedAttention, continuous batching, chunked prefill) rather than a desktop inference loop. Compared with the MCP integrations used by the agents in content/tools/dx-and-tooling, this is a serving endpoint those agents talk to, not a browser driver.

## Getting Started

The one-line installer gives you a binary or DEB; the build-from-source path selects the backend features:

```bash
curl -sSL https://ericlbuehler.github.io/candle-vllm/install.sh | bash
# or, macOS/Metal from source:
cargo install --features metal --path .
# then start the API server plus the built-in Web UI:
candle-vllm --m Qwen/Qwen3.6-27B-FP8 --ui-server
```

`--d 0,1` spreads across two GPUs and `--f Q3_K_S` selects a GGUF quantisation from a Hugging Face repo.

## Key Use Cases

1. Local endpoint for an agent: run the OpenAI-compatible server and point a coding agent from content/tools/dx-and-tooling at http://localhost:2000 instead of a paid API.
2. Long-context work on a Mac: load a GGUF quantisation on Metal and reach a context window that would not fit at full KV precision in unified memory.
3. Cost-aware multi-GPU serving: shard one model across two to eight GPUs, enable prefix caching for a repeated system prompt, and quantise KV to turbo4 to hold more concurrent sequences.

## Strengths

- Metal on Apple Silicon is a first-class backend, not a community experiment, so a Mac can serve rather than only develop.
- TurboQuant's three KV modes give a memory-quality dial from 2.6x to 4.7x compression with native flash-attention kernels behind it.
- Breadth of quantisation formats in one binary: in-situ GGUF, GPTQ, AWQ, Marlin, block-wise FP8, MXFP4 and NVFP4.
- Ships the pieces a working endpoint needs rather than a bare model: OpenAI-compatible API, streaming, built-in web UI, MCP tool calling and embedding docs.

## Limitations

The performance table is single-request decode at 4k input and 1k output on one Hopper 80GB, which is the easiest possible measurement and says nothing about aggregate throughput under concurrency. Several frontier rows are literally marked TBD, including DeepSeek V2/V3/R1 BF16, GLM-5.2, Llama4, Gemma4 and the MiniMax M2.5 line, and the 671B DeepSeek AWQ row is a ~20 tks figure with tensor parallel 8 and offloading, which is an extreme configuration. Multi-GPU requires a power-of-two device count, TurboQuant silently falls back on MLA architectures, and turning it on disables the FlashInfer backend. Both speculative-decoding paths only cover the Qwen3.5/3.6/3.8 families. It is also one maintainer's project at 728 stars, so upstream candle or model-format changes land on you directly.

## Relation to the Arsenal

This is the serving layer in content/projects/inference-engines that sits directly on the candle entry in the same phase, and the pair is the natural unit to evaluate if you are considering Rust at all. Read it next to vLLM and SGLang for the CUDA-first comparison, and next to llama-cpp and Ollama for the lighter-weight local path. The MCP and tool-parsing support is the seam used by agents in content/tools/dx-and-tooling, and the embedding API is the piece you would point a vector store from content/projects/data-and-retrieval at. Where content/projects/training-and-alignment covers tuning a model, everything here is inference only.

## Resources

- [GitHub — EricLBuehler/candle-vllm](https://github.com/EricLBuehler/candle-vllm)
- [CLI reference, performance table and roadmap in the README](https://github.com/EricLBuehler/candle-vllm#readme)
- [Docs directory — prefix cache, speculative decoding, MCP, multimodal](https://github.com/EricLBuehler/candle-vllm/tree/master/docs)

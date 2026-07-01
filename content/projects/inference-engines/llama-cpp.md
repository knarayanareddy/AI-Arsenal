---
id: llama-cpp
name: llama.cpp
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: C and C++ inference engine for running GGUF-quantized LLMs locally and on edge devices
github_url: "https://github.com/ggml-org/llama.cpp"
license: MIT
primary_language: C++
org_or_maintainer: null
tags: [llm, inference, quantization, local]
maturity: production
cost_model: open-source
github_stars: 116399
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-06-13"
docs_url: "https://github.com/ggml-org/llama.cpp"
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
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top, fork-and-adapt]
health_signals: [community-driven, actively-maintained, production-proven]
ecosystem_role:
  - Pure C/C++ CPU/GPU inference engine underlying much of the local-LLM ecosystem (Ollama, LM Studio, and others build on it)
best_for:
  - You need to run quantized LLMs efficiently on CPU-only or consumer-GPU hardware, including Apple Silicon, with minimal dependencies
  - You're building a downstream tool or product and want to embed a lightweight, dependency-light inference engine rather than a heavier Python-based server
avoid_if:
  - You need maximum multi-GPU server-side throughput for high-concurrency production serving — vLLM or SGLang's batching and scheduling are purpose-built for that, while llama.cpp targets single-node/edge efficiency first
  - You want a Python-native development experience — llama.cpp's core is C/C++, and while Python bindings exist, they're a secondary interface, not the primary one
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "llama.cpp is the most widely-embedded inference engine in the local-LLM ecosystem: Ollama, LM Studio, GPT4All, and many other downstream tools build directly on it, which is strong production/adoption evidence beyond star count alone."
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"hackernews","url":"https://www.xda-developers.com/ditched-lm-studio-for-llama-cpp-and-local-llm-doesnt-feel-like-downgrade-anymore/","date":"2026-05-23","description":"Independent reporting confirms llama.cpp is the core backend engine underlying LM Studio, Ollama, and most other local-LLM applications in production use"}
featured: false
status: active
---

## Overview

A pure C/C++ inference engine for running LLaMA-family and other GGUF-format quantized models, originally created to make LLM inference feasible on consumer CPU hardware and now the foundation underlying much of the local-LLM tooling ecosystem.

## Why it's in the Arsenal

Pure C/C++ CPU/GPU inference engine underlying much of the local-LLM ecosystem (Ollama, LM Studio, and others build on it). It earns a place in the Arsenal because it directly addresses a recurring decision point: you need to run quantized LLMs efficiently on CPU-only or consumer-GPU hardware, including Apple Silicon, with minimal dependencies. See Strengths / Limitations below before adopting it.

## Architecture

Implements transformer inference directly in C/C++ with extensive support for quantization formats (from 2-bit through 8-bit and beyond) via the GGUF file format, with backend support spanning pure CPU, Apple Metal, CUDA, and Vulkan — prioritizing minimal dependencies and portability over Python-ecosystem integration.

## Ecosystem Position

Upstream: none of particular note — deliberately minimal external dependencies. Downstream: Ollama, LM Studio, GPT4All, and llamafile all build directly on llama.cpp as their inference core, making it one of the most widely depended-upon projects in the local-LLM ecosystem. Competing: vLLM and SGLang for server-side high-throughput serving; MLX for Apple-Silicon-native workflows. Complementary: works with any GGUF-quantized model, including quantized versions of Llama, Qwen, Gemma, and Mistral.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/run command for this specific inference engine.
```

## Key Use Cases

1. **Scenario**: you need to run quantized LLMs efficiently on CPU-only or consumer-GPU hardware, including Apple Silicon, with minimal dependencies
2. **Scenario**: you're building a downstream tool or product and want to embed a lightweight, dependency-light inference engine rather than a heavier Python-based server

## Strengths

- You need to run quantized LLMs efficiently on CPU-only or consumer-GPU hardware, including Apple Silicon, with minimal dependencies
- You're building a downstream tool or product and want to embed a lightweight, dependency-light inference engine rather than a heavier Python-based server

## Limitations

- You need maximum multi-GPU server-side throughput for high-concurrency production serving — vLLM or SGLang's batching and scheduling are purpose-built for that, while llama.cpp targets single-node/edge efficiency first
- You want a Python-native development experience — llama.cpp's core is C/C++, and while Python bindings exist, they're a secondary interface, not the primary one

## Relation to the Arsenal

This is an inference-engine entry: it documents the serving runtime itself. For the model weights it serves, see [Foundation Models](../foundation-models/_index.md). For hosted/managed serving alternatives, see [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub](https://github.com/ggml-org/llama.cpp)
- [Documentation](https://github.com/ggml-org/llama.cpp)

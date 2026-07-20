---
id: vllm
name: vLLM
version_tracked: null
artifact_type: library
category: llms
subcategory: inference-engines
description: High-throughput inference and serving engine for LLMs with batching and OpenAI-compatible APIs
github_url: https://github.com/vllm-project/vllm
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags:
  - llm
  - inference
  - batching
  - caching
maturity: production
cost_model: open-source
github_stars: 86695
github_stars_last_30d: 3925
trending_score: 55
last_commit: '2026-07-20'
docs_url: https://github.com/vllm-project/vllm
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: true
supported_formats:
  - HF
  - AWQ
  - GPTQ
  - FP8
api_compatible: openai
phase: inference-engine
domain:
  - language
  - vision
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - community-driven
  - actively-maintained
  - production-proven
ecosystem_role:
  - The de facto default high-throughput LLM serving engine, built around PagedAttention memory management
best_for:
  - You're deploying an open-weight model to production and want the most broadly adopted, best-supported serving engine with the widest hardware and model-family coverage
  - You need proven, mature continuous batching and memory-efficient KV cache management (PagedAttention) for high-concurrency serving
avoid_if:
  - Your workload is dominated by heavily shared-prefix requests (repeated system prompts, RAG with common context) at scale — SGLang's RadixAttention specifically targets and often outperforms vLLM in that scenario
  - You're serving a single model on a single consumer GPU for local development — the operational overhead of vLLM's server model is unnecessary compared to Ollama or llama.cpp direct usage
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: vLLM's status as the default recommended engine is corroborated by both Hugging Face's own December 2025 TGI maintenance-mode announcement (explicitly redirecting users to vLLM) and independent 2026 benchmark comparisons treating it as the baseline other engines are measured against.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: hackernews
    url: https://www.buildmvpfast.com/blog/vllm-vs-tgi-llm-serving-benchmarks-2026
    date: '2026-04-23'
    description: 'Independent April 2026 benchmark analysis: ''If you are starting fresh in April 2026, vLLM is the safer default'' following Hugging Face''s TGI maintenance-mode announcement'
featured: false
status: active
---

## Overview

An open-source, high-throughput inference and serving engine for large language models, built around PagedAttention, a memory-management technique that treats the KV cache like virtual memory to reduce fragmentation and enable much higher batch concurrency.

## Why it's in the Arsenal

The de facto default high-throughput LLM serving engine, built around PagedAttention memory management. It earns a place in the Arsenal because it directly addresses a recurring decision point: you're deploying an open-weight model to production and want the most broadly adopted, best-supported serving engine with the widest hardware and model-family coverage. See Strengths / Limitations below before adopting it.

## Architecture

PagedAttention divides the KV cache into fixed-size blocks (analogous to OS virtual-memory pages) rather than requiring contiguous memory per sequence, dramatically reducing memory waste and enabling continuous batching across many concurrent requests; supports tensor and pipeline parallelism for multi-GPU serving and an OpenAI-compatible API server.

## Ecosystem Position

Upstream: none of particular note. Downstream: extremely widely used as the serving layer under countless production LLM deployments and referenced as the baseline in nearly every serving-engine benchmark comparison. Competing: SGLang (often faster on prefix-heavy or structured-output workloads), TGI (now in maintenance mode). Complementary: serves virtually every open-weight model family cataloged under Foundation Models.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/run command for this specific inference engine.
```

## Key Use Cases

1. **Scenario**: you're deploying an open-weight model to production and want the most broadly adopted, best-supported serving engine with the widest hardware and model-family coverage
2. **Scenario**: you need proven, mature continuous batching and memory-efficient KV cache management (PagedAttention) for high-concurrency serving

## Strengths

- You're deploying an open-weight model to production and want the most broadly adopted, best-supported serving engine with the widest hardware and model-family coverage
- You need proven, mature continuous batching and memory-efficient KV cache management (PagedAttention) for high-concurrency serving

## Limitations

- Your workload is dominated by heavily shared-prefix requests (repeated system prompts, RAG with common context) at scale — SGLang's RadixAttention specifically targets and often outperforms vLLM in that scenario
- You're serving a single model on a single consumer GPU for local development — the operational overhead of vLLM's server model is unnecessary compared to Ollama or llama.cpp direct usage

## Relation to the Arsenal

This is an inference-engine entry: it documents the serving runtime itself. For the model weights it serves, see [Foundation Models](../foundation-models/_index.md). For hosted/managed serving alternatives, see [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub](https://github.com/vllm-project/vllm)
- [Documentation](https://github.com/vllm-project/vllm)

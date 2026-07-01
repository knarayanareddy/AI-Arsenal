---
id: llama-cpp
name: llama.cpp
artifact_type: library
category: llms
subcategory: inference-engines
description: >-
  C and C++ inference engine for running GGUF-quantized LLMs locally and on edge
  devices
github_url: 'https://github.com/ggml-org/llama.cpp'
license: MIT
primary_language: C++
tags:
  - llm
  - inference
  - quantization
  - local
maturity: production
cost_model: open-source
github_stars: 116399
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-13'
docs_url: 'https://github.com/ggml-org/llama.cpp'
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: true
supported_formats:
  - GGUF
api_compatible: openai
alternatives: []
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

> **TL;DR:** llama.cpp is the core local inference engine for GGUF-quantized models across CPU, GPU, and edge environments. Use it when portability and local deployment matter.

- **API compatibility:** openai
- **Formats:** GGUF
- **Quantization support:** Yes

## Why It's in the Arsenal

llama.cpp underpins much of the local LLM ecosystem and is the reference path for GGUF quantized inference.

## Key Features

- C/C++ portable runtime
- GGUF model format support
- CPU and GPU acceleration paths
- Server mode with OpenAI-compatible API options
- Foundation for many local LLM wrappers
- Strong quantization ecosystem

## Architecture / How It Works

llama.cpp is a low-level inference runtime built around ggml/gguf model execution and portable hardware backends.

## Getting Started

```bash
brew install llama.cpp
```

```bash
llama-server -hf ggml-org/gemma-3-1b-it-GGUF
# then call the local server API
```

## Performance Benchmarks

No benchmark table is included because performance depends heavily on model, quantization, GPU, batching, and kernel version. Run workload-specific benchmarks before choosing.

## Use Cases

1. **Scenario**: CPU/local inference
2. **Scenario**: Edge deployments
3. **Scenario**: Quantized model experiments

## Strengths

- Extremely portable
- Best-known GGUF runtime
- Works where heavyweight Python serving stacks are impractical

## Limitations / When NOT to Use

- Lower-level UX than Ollama
- Production multi-tenant serving requires extra infrastructure
- Model conversion/quantization details can be confusing

## Integration Patterns

- Put an API gateway or observability layer in front of production inference endpoints.
- Benchmark with production-shaped prompts, context lengths, batch sizes, and streaming settings.
- Track model format and quantization separately from serving engine choice.

## Resources

- [GitHub](https://github.com/ggml-org/llama.cpp)
- [llama.cpp server docs](https://github.com/ggml-org/llama.cpp/tree/master/tools/server)

## Buzz & Reception

- Included because inference engine choice directly affects latency, throughput, cost, and operational complexity.

---
*Last reviewed: 2026-06-13 by @maintainer*


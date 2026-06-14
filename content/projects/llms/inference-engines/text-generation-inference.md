---
id: text-generation-inference
name: Text Generation Inference
type: platform
category: llms
subcategory: inference-engines
description: >-
  Hugging Face inference server for serving large text-generation models in
  production
github_url: 'https://github.com/huggingface/text-generation-inference'
license: Apache-2.0
primary_language: Python
tags:
  - llm
  - inference
  - streaming
  - batching
maturity: production
cost_model: open-source
github_stars: 10863
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-03-21'
docs_url: 'https://huggingface.co/docs/text-generation-inference'
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
alternatives: []
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: archived
---

## Overview

> **TL;DR:** Text Generation Inference is Hugging Face’s production inference server for text-generation models. Treat it as important but check repository status because the GitHub repo is currently archived.

- **API compatibility:** openai
- **Formats:** HF, GPTQ, AWQ
- **Quantization support:** Yes

## Why It's in the Arsenal

TGI influenced many production open-model deployments and remains relevant for teams using Hugging Face infrastructure and docs.

## Key Features

- Production text-generation server
- Streaming and batching support
- Hugging Face model ecosystem integration
- Docker deployment path
- Quantization support for supported formats
- OpenAI-compatible serving documentation

## Architecture / How It Works

TGI is a model server optimized for serving Hugging Face text generation models over HTTP APIs.

## Getting Started

```bash
docker run --gpus all --shm-size 1g -p 8080:80 ghcr.io/huggingface/text-generation-inference:latest
```

```bash
curl http://localhost:8080/generate -d '{"inputs":"What is RAG?","parameters":{"max_new_tokens":32}}'
```

## Performance Benchmarks

No benchmark table is included because performance depends heavily on model, quantization, GPU, batching, and kernel version. Run workload-specific benchmarks before choosing.

## Use Cases

1. **Scenario**: Hugging Face-centered serving
2. **Scenario**: Dockerized inference deployments
3. **Scenario**: Teams already using TGI-compatible infrastructure

## Strengths

- Strong Hugging Face ecosystem fit
- Production server features
- Well-known deployment path

## Limitations / When NOT to Use

- Repository is archived as of fetched GitHub metadata
- May not be the best default for new greenfield deployments
- Check current Hugging Face docs before adopting

## Integration Patterns

- Put an API gateway or observability layer in front of production inference endpoints.
- Benchmark with production-shaped prompts, context lengths, batch sizes, and streaming settings.
- Track model format and quantization separately from serving engine choice.

## Resources

- [GitHub](https://github.com/huggingface/text-generation-inference)
- [Docs](https://huggingface.co/docs/text-generation-inference)

## Buzz & Reception

- Included because inference engine choice directly affects latency, throughput, cost, and operational complexity.

---
*Last reviewed: 2026-06-13 by @maintainer*


---
id: lmdeploy
name: LMDeploy
type: platform
category: llms
subcategory: inference-engines
description: >-
  Toolkit for compressing, deploying, and serving LLMs with TurboMind and
  PyTorch backends
github_url: 'https://github.com/InternLM/lmdeploy'
license: Apache-2.0
primary_language: Python
tags:
  - llm
  - inference
  - quantization
  - cloud
maturity: production
cost_model: open-source
github_stars: 7895
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-11'
docs_url: 'https://lmdeploy.readthedocs.io/en/latest/'
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
  - W4A16
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

> **TL;DR:** LMDeploy is a compression, deployment, and serving toolkit for LLMs with TurboMind and PyTorch backends. Use it when its supported model/backend matrix fits your deployment target.

- **API compatibility:** openai
- **Formats:** HF, AWQ, W4A16
- **Quantization support:** Yes

## Why It's in the Arsenal

LMDeploy is relevant for teams evaluating alternative high-performance serving stacks beyond vLLM and SGLang.

## Key Features

- Deployment and serving toolkit
- TurboMind and PyTorch backend options
- Quantization/compression workflows
- OpenAI-compatible server support
- Strong InternLM ecosystem integration
- Useful for supported-model deployments

## Architecture / How It Works

LMDeploy combines model conversion/compression, optimized runtime backends, and serving APIs.

## Getting Started

```bash
pip install lmdeploy
```

```bash
lmdeploy serve api_server internlm/internlm2_5-7b-chat
# then call the OpenAI-compatible endpoint
```

## Performance Benchmarks

No benchmark table is included because performance depends heavily on model, quantization, GPU, batching, and kernel version. Run workload-specific benchmarks before choosing.

## Use Cases

1. **Scenario**: Serving supported open models
2. **Scenario**: Quantization/compression experiments
3. **Scenario**: InternLM-centered deployments

## Strengths

- Integrated deploy/compress toolkit
- Useful alternative to vLLM/SGLang
- OpenAI-compatible serving path

## Limitations / When NOT to Use

- Model/backend support matrix matters
- Smaller ecosystem than vLLM
- Requires careful benchmark validation

## Integration Patterns

- Put an API gateway or observability layer in front of production inference endpoints.
- Benchmark with production-shaped prompts, context lengths, batch sizes, and streaming settings.
- Track model format and quantization separately from serving engine choice.

## Resources

- [GitHub](https://github.com/InternLM/lmdeploy)
- [Docs](https://lmdeploy.readthedocs.io/en/latest/)

## Buzz & Reception

- Included because inference engine choice directly affects latency, throughput, cost, and operational complexity.

---
*Last reviewed: 2026-06-13 by @maintainer*


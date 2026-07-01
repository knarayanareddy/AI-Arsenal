---
id: deepseek-v3-r1
name: DeepSeek-V3 / R1
artifact_type: model
category: llms
subcategory: open-source-models
description: >-
  DeepSeek open-weight MoE and reasoning model family known for strong
  cost-performance
github_url: 'https://github.com/deepseek-ai/DeepSeek-V3'
license: MIT
primary_language: Python
tags:
  - llm
  - reasoning
  - inference
  - efficiency
maturity: production
cost_model: open-source
github_stars: 103749
github_stars_last_30d: 0
trending_score: 30
last_commit: '2025-08-28'
docs_url: 'https://github.com/deepseek-ai/DeepSeek-V3'
demo_url: null
paper_url: null
paper_id: null
hf_url: 'https://huggingface.co/deepseek-ai'
model_sizes:
  - 671B MoE
  - 1.5B distilled
  - 7B distilled
  - 8B distilled
  - 14B distilled
  - 32B distilled
  - 70B distilled
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
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

> **TL;DR:** DeepSeek-V3 and R1 are open-weight DeepSeek models associated with strong cost-performance and reasoning impact. Use them when evaluating open reasoning models or MoE serving tradeoffs.

- **Family / sizes:** 671B MoE, 1.5B distilled, 7B distilled, 8B distilled, 14B distilled, 32B distilled, 70B distilled
- **Best fit:** reasoning model evaluation, MoE serving experiments, distilled reasoning variants
- **Primary source:** [DeepSeek GitHub](https://github.com/deepseek-ai/DeepSeek-V3)

## Why It's in the Arsenal

DeepSeek changed open-model expectations around reasoning and cost-performance, making it a required reference family for model selection.

## Key Features

- Large sparse MoE base/reasoning model family
- Reasoning-focused R1 variants
- Distilled models for smaller deployments
- MIT-licensed GitHub release for V3 repo
- Strong ecosystem adoption in inference tools

## Architecture / How It Works

DeepSeek-V3/R1 are large decoder-only models with sparse MoE architecture for the flagship model and distilled dense variants for smaller deployments.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

pipe = pipeline("text-generation", model="deepseek-ai/DeepSeek-R1-Distill-Qwen-7B")
print(pipe("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Use Cases

1. **Scenario**: You need an open reasoning-model reference
2. **Scenario**: You want to compare sparse MoE serving tradeoffs
3. **Scenario**: You need distilled reasoning models in smaller sizes

## Strengths

- Strong reputation for cost-performance
- Distilled variants make reasoning behavior easier to deploy
- Widely discussed and supported by inference ecosystems

## Limitations / When NOT to Use

- Flagship MoE model is expensive to self-host
- Reasoning models can be slower and harder to control
- Operational details vary by exact model/card/release

## Integration Patterns

- Serve through vLLM, SGLang, TGI, Ollama, llama.cpp, or managed inference when supported by the model format.
- Keep prompt/eval sets model-family-specific; do not assume one Llama/Qwen/Gemma prompt transfers cleanly to another.
- Prefer the smallest variant that passes your task eval before escalating to larger models.

## Resources

- [DeepSeek-V3 GitHub](https://github.com/deepseek-ai/DeepSeek-V3)
- [DeepSeek Hugging Face](https://huggingface.co/deepseek-ai)

## Buzz & Reception

- Included because this family is frequently referenced in open-model selection and deployment decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*


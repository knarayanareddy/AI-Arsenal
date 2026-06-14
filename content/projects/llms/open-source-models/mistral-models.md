---
id: mistral-models
name: Mistral / Mixtral
type: model
category: llms
subcategory: open-source-models
description: >-
  Mistral open-weight model family including dense and mixture-of-experts
  language models
github_url: 'https://github.com/mistralai/mistral-inference'
license: Apache-2.0
primary_language: Python
tags:
  - llm
  - inference
  - local
  - efficiency
maturity: production
cost_model: open-source
github_stars: 10816
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-04-20'
docs_url: 'https://docs.mistral.ai/'
demo_url: null
paper_url: null
paper_id: null
hf_url: 'https://huggingface.co/mistralai'
model_sizes:
  - 7B
  - 8x7B
  - 8x22B
  - 24B
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
status: archived
---

## Overview

> **TL;DR:** Mistral and Mixtral are influential open-weight dense and MoE model families. Use them when you want efficient open models with strong inference ecosystem support.

- **Family / sizes:** 7B, 8x7B, 8x22B, 24B
- **Best fit:** efficient open-weight inference, MoE experimentation, European model vendor options
- **Primary source:** [Mistral docs](https://docs.mistral.ai/)

## Why It's in the Arsenal

Mistral models are common baselines for efficient open-weight deployments and helped popularize high-quality MoE open models.

## Key Features

- Dense and mixture-of-experts model families
- Strong support in inference engines and hosted providers
- Apache-2.0 coverage for several classic open releases
- Good fit for efficient serving experiments
- European vendor ecosystem relevance

## Architecture / How It Works

Mistral includes dense decoder-only transformer models and Mixtral sparse mixture-of-experts variants.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

pipe = pipeline("text-generation", model="mistralai/Mistral-7B-Instruct-v0.3")
print(pipe("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Use Cases

1. **Scenario**: You need efficient open-weight alternatives to Llama
2. **Scenario**: You want to test MoE serving behavior
3. **Scenario**: You prefer a European model ecosystem option

## Strengths

- Efficient model reputation
- Good inference-tool support
- Historically permissive open releases for key models

## Limitations / When NOT to Use

- Current licensing varies by model release; check each model card
- Official inference repo is archived, so use current docs/model cards
- Model naming across releases can be confusing

## Integration Patterns

- Serve through vLLM, SGLang, TGI, Ollama, llama.cpp, or managed inference when supported by the model format.
- Keep prompt/eval sets model-family-specific; do not assume one Llama/Qwen/Gemma prompt transfers cleanly to another.
- Prefer the smallest variant that passes your task eval before escalating to larger models.

## Resources

- [GitHub inference repo](https://github.com/mistralai/mistral-inference)
- [Docs](https://docs.mistral.ai/)
- [Hugging Face organization](https://huggingface.co/mistralai)

## Buzz & Reception

- Included because this family is frequently referenced in open-model selection and deployment decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*


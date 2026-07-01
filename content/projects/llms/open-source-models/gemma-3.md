---
id: gemma-3
name: Gemma 3
artifact_type: model
category: llms
subcategory: open-source-models
description: >-
  Google open model family with efficient text and multimodal variants for local
  and hosted use
github_url: 'https://github.com/google-deepmind/gemma'
license: Custom
primary_language: Python
tags:
  - llm
  - inference
  - multimodal
  - local
maturity: production
cost_model: open-source
github_stars: 985
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-05-09'
docs_url: 'https://ai.google.dev/gemma'
demo_url: null
paper_url: null
paper_id: null
hf_url: 'https://huggingface.co/google'
model_sizes:
  - 1B
  - 4B
  - 12B
  - 27B
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

> **TL;DR:** Gemma 3 is Google’s open model family for efficient text and multimodal applications. Use it when you want Google-supported open weights with small-to-mid-size deployment options.

- **Family / sizes:** 1B, 4B, 12B, 27B
- **Best fit:** local-friendly Google open models, multimodal experiments, educational usage
- **Primary source:** [Gemma docs](https://ai.google.dev/gemma)

## Why It's in the Arsenal

Gemma is a major open-weight family and is often considered alongside Llama, Qwen, Mistral, and Phi for local or self-hosted systems.

## Key Features

- Small-to-mid-size open model ladder
- Text and multimodal variants
- Google tooling and documentation
- Good fit for local and educational experiments
- Supported across common model tooling

## Architecture / How It Works

Gemma models are transformer language models with instruction-tuned and multimodal variants depending on release.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

pipe = pipeline("text-generation", model="google/gemma-3-4b-it")
print(pipe("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Use Cases

1. **Scenario**: You need Google-supported open weights
2. **Scenario**: You want smaller model variants for local inference
3. **Scenario**: You are evaluating multimodal open models

## Strengths

- Clear official docs and model cards
- Good local deployment story for smaller sizes
- Useful alternative to Llama/Qwen for model comparison

## Limitations / When NOT to Use

- Gemma license is custom, not OSI open source
- Largest sizes are smaller than some competing open families
- Check exact model-card limits before production use

## Integration Patterns

- Serve through vLLM, SGLang, TGI, Ollama, llama.cpp, or managed inference when supported by the model format.
- Keep prompt/eval sets model-family-specific; do not assume one Llama/Qwen/Gemma prompt transfers cleanly to another.
- Prefer the smallest variant that passes your task eval before escalating to larger models.

## Resources

- [GitHub](https://github.com/google-deepmind/gemma)
- [Gemma docs](https://ai.google.dev/gemma)
- [Google Hugging Face](https://huggingface.co/google)

## Buzz & Reception

- Included because this family is frequently referenced in open-model selection and deployment decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*


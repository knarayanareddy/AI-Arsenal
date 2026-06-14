---
id: falcon-3
name: Falcon 3
type: model
category: llms
subcategory: open-source-models
description: >-
  TII open model family with compact 1B to 10B text-only variants for local
  deployment
github_url: 'https://huggingface.co/tiiuae/Falcon3-7B-Base'
license: TII Falcon-LLM License 2.0
primary_language: Other
tags:
  - llm
  - inference
  - local
  - efficiency
maturity: production
cost_model: open-source
github_stars: 0
github_stars_last_30d: 0
trending_score: 15
last_commit: '2026-06-13'
docs_url: 'https://falcon-lm.github.io/tutorials/falcon-3/'
demo_url: null
paper_url: null
paper_id: null
hf_url: 'https://huggingface.co/tiiuae'
model_sizes:
  - 1B
  - 3B
  - 7B
  - 10B
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

> **TL;DR:** Falcon 3 is TII’s compact text-only open model family from 1B to 10B. Use it when evaluating small local models with multilingual support and 32K context in larger variants.

- **Family / sizes:** 1B, 3B, 7B, 10B
- **Best fit:** small local models, laptop deployment, multilingual lightweight inference
- **Primary source:** [Falcon 3 model card](https://huggingface.co/tiiuae/Falcon3-7B-Base)

## Why It's in the Arsenal

Falcon 3 is relevant for local-first AI because it targets compact model sizes and practical deployment through common local runtimes.

## Key Features

- 1B to 10B text-only variants
- Base and instruct releases
- Falcon-LLM License 2.0 model license
- Local deployment guides for MLX, llama.cpp, and OpenWebUI
- 32K context for larger variants according to model cards

## Architecture / How It Works

Falcon 3 models are decoder-only transformer language models with grouped-query attention and compact deployment targets.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

pipe = pipeline("text-generation", model="tiiuae/Falcon3-7B-Instruct")
print(pipe("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Use Cases

1. **Scenario**: You need small local models
2. **Scenario**: You want to test compact multilingual inference
3. **Scenario**: You are building laptop-friendly AI demos

## Strengths

- Hardware-friendly size range
- Official local deployment guidance
- Useful alternative to Phi/Gemma/Qwen small models

## Limitations / When NOT to Use

- License is custom, not Apache/MIT
- Less broad ecosystem mindshare than Llama/Qwen
- Not intended as a top frontier model family

## Integration Patterns

- Serve through vLLM, SGLang, TGI, Ollama, llama.cpp, or managed inference when supported by the model format.
- Keep prompt/eval sets model-family-specific; do not assume one Llama/Qwen/Gemma prompt transfers cleanly to another.
- Prefer the smallest variant that passes your task eval before escalating to larger models.

## Resources

- [Falcon 3 model card](https://huggingface.co/tiiuae/Falcon3-7B-Base)
- [Local deployment guide](https://falcon-lm.github.io/tutorials/falcon-3/)
- [TII Hugging Face](https://huggingface.co/tiiuae)

## Buzz & Reception

- Included because this family is frequently referenced in open-model selection and deployment decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*


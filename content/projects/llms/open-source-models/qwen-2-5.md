---
id: qwen-2-5
name: Qwen 2.5 / QwQ
type: model
category: llms
subcategory: open-source-models
description: >-
  Alibaba Qwen open-weight family spanning small, large, coding, math, and
  reasoning models
github_url: 'https://github.com/QwenLM/Qwen3'
license: Apache-2.0
primary_language: Python
tags:
  - llm
  - inference
  - reasoning
  - code-gen
maturity: production
cost_model: open-source
github_stars: 27298
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-01-09'
docs_url: 'https://github.com/QwenLM/Qwen3'
demo_url: null
paper_url: null
paper_id: null
hf_url: 'https://huggingface.co/Qwen'
model_sizes:
  - 0.5B
  - 1.5B
  - 3B
  - 7B
  - 14B
  - 32B
  - 72B
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

> **TL;DR:** Qwen 2.5 and QwQ are Alibaba open-weight models with strong coverage across chat, coding, math, and reasoning. Use them when multilingual or coding/reasoning performance matters.

- **Family / sizes:** 0.5B, 1.5B, 3B, 7B, 14B, 32B, 72B
- **Best fit:** coding, math, multilingual, and reasoning-oriented open model deployments
- **Primary source:** [Qwen documentation](https://github.com/QwenLM/Qwen3)

## Why It's in the Arsenal

Qwen is one of the most practically useful open model families because it spans many sizes and task-specialized variants.

## Key Features

- Wide range of parameter sizes
- Coding and math-specialized variants
- Reasoning-focused QwQ line
- Strong multilingual and tooling ecosystem support
- Commonly supported by inference engines and quantization workflows

## Architecture / How It Works

Qwen models are decoder-only transformer models; QwQ variants emphasize reasoning behavior and longer deliberation.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

pipe = pipeline("text-generation", model="Qwen/Qwen2.5-7B-Instruct")
print(pipe("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Use Cases

1. **Scenario**: You need open coding or math models
2. **Scenario**: You want multiple sizes with a similar prompt style
3. **Scenario**: You need multilingual coverage beyond English-only use cases

## Strengths

- Broad model-size ladder
- Strong coding/math reputation
- Good open ecosystem adoption

## Limitations / When NOT to Use

- Licensing and model cards vary by release
- Reasoning variants can be slower and more verbose
- Some older repo paths redirect as model families evolve

## Integration Patterns

- Serve through vLLM, SGLang, TGI, Ollama, llama.cpp, or managed inference when supported by the model format.
- Keep prompt/eval sets model-family-specific; do not assume one Llama/Qwen/Gemma prompt transfers cleanly to another.
- Prefer the smallest variant that passes your task eval before escalating to larger models.

## Resources

- [GitHub](https://github.com/QwenLM/Qwen3)
- [Docs](https://github.com/QwenLM/Qwen3)
- [Hugging Face organization](https://huggingface.co/Qwen)

## Buzz & Reception

- Included because this family is frequently referenced in open-model selection and deployment decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*


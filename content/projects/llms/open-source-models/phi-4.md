---
id: phi-4
name: Phi-4
type: model
category: llms
subcategory: open-source-models
description: >-
  Microsoft small language model family optimized for efficient reasoning and
  local-friendly deployment
github_url: 'https://huggingface.co/microsoft/phi-4'
license: MIT
primary_language: Other
tags:
  - llm
  - reasoning
  - local
  - efficiency
maturity: production
cost_model: open-source
github_stars: 0
github_stars_last_30d: 0
trending_score: 15
last_commit: '2026-06-13'
docs_url: 'https://huggingface.co/microsoft/phi-4'
demo_url: null
paper_url: null
paper_id: null
hf_url: 'https://huggingface.co/microsoft/phi-4'
model_sizes:
  - 14B
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

> **TL;DR:** Phi-4 is Microsoft’s compact open model focused on efficient reasoning for smaller deployments. Use it when you want a smaller model before escalating to larger open weights.

- **Family / sizes:** 14B
- **Best fit:** small-model reasoning, local experiments, cost-sensitive inference
- **Primary source:** [Phi-4 model card](https://huggingface.co/microsoft/phi-4)

## Why It's in the Arsenal

Phi models are important because they push small-model quality and are useful in routing architectures where not every request needs a large model.

## Key Features

- Compact parameter count relative to large open models
- Reasoning-oriented training focus
- Useful for local and cost-sensitive experiments
- Available through Hugging Face model cards
- Good candidate for small-model routing

## Architecture / How It Works

Phi-4 is a decoder-only language model family member optimized for small-model capability and reasoning tasks.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

pipe = pipeline("text-generation", model="microsoft/phi-4")
print(pipe("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Use Cases

1. **Scenario**: You need a compact reasoning model
2. **Scenario**: You are building model-routing systems
3. **Scenario**: You want a local-friendly baseline before using larger models

## Strengths

- Smaller than many general-purpose frontier open models
- Useful for cheap first-pass reasoning
- Fits local/smaller-GPU experiments better than 70B-class models

## Limitations / When NOT to Use

- Not a replacement for largest models on broad frontier tasks
- Model-card terms should be checked before commercial use
- Smaller context/task coverage than some large model families

## Integration Patterns

- Serve through vLLM, SGLang, TGI, Ollama, llama.cpp, or managed inference when supported by the model format.
- Keep prompt/eval sets model-family-specific; do not assume one Llama/Qwen/Gemma prompt transfers cleanly to another.
- Prefer the smallest variant that passes your task eval before escalating to larger models.

## Resources

- [Hugging Face model card](https://huggingface.co/microsoft/phi-4)
- [Phi Cookbook](https://github.com/microsoft/PhiCookBook)

## Buzz & Reception

- Included because this family is frequently referenced in open-model selection and deployment decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*


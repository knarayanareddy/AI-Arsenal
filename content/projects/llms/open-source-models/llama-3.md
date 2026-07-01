---
id: llama-3
name: Llama 3.x
artifact_type: model
category: llms
subcategory: open-source-models
description: >-
  Meta open-weight Llama 3 family for general, multilingual, code, and
  multimodal applications
github_url: 'https://github.com/meta-llama/llama-models'
license: Custom
primary_language: Other
tags:
  - llm
  - inference
  - local
  - multimodal
maturity: production
cost_model: open-source
github_stars: 9242
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-13'
docs_url: 'https://www.llama.com/'
demo_url: null
paper_url: null
paper_id: null
hf_url: 'https://huggingface.co/meta-llama'
model_sizes:
  - 1B
  - 3B
  - 8B
  - 11B
  - 70B
  - 90B
  - 405B
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

> **TL;DR:** Llama 3.x is Meta’s widely used open-weight model family across small, large, and multimodal variants. Use it when you need broad ecosystem support and many deployment options.

- **Family / sizes:** 1B, 3B, 8B, 11B, 70B, 90B, 405B
- **Best fit:** general open-weight deployments, local inference, fine-tuning, and ecosystem compatibility
- **Primary source:** [Llama official site](https://www.llama.com/)

## Why It's in the Arsenal

Llama is a default reference point for open-weight model selection, tooling support, quantization, fine-tuning, and local deployment.

## Key Features

- Broad size range from small local models to very large frontier-class open weights
- Large ecosystem of quantized, fine-tuned, and hosted variants
- Supported by most inference engines and model platforms
- Useful for both local development and production serving
- Strong documentation and model-card coverage

## Architecture / How It Works

Llama models are decoder-only transformer language models with instruction-tuned variants and multimodal variants in the broader Llama 3 family.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

pipe = pipeline("text-generation", model="meta-llama/Llama-3.1-8B-Instruct")
print(pipe("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Use Cases

1. **Scenario**: You need a widely supported open-weight baseline
2. **Scenario**: You want local or self-hosted inference options
3. **Scenario**: You plan to fine-tune or quantize a common model family

## Strengths

- Best-in-class ecosystem support among open-weight families
- Many deployment paths: Ollama, llama.cpp, vLLM, SGLang, TGI, hosted APIs
- Good default choice when compatibility matters

## Limitations / When NOT to Use

- License and acceptable-use terms must be reviewed for commercial use
- Largest variants require serious GPU infrastructure
- Not always the best specialized model for coding, math, or reasoning tasks

## Integration Patterns

- Serve through vLLM, SGLang, TGI, Ollama, llama.cpp, or managed inference when supported by the model format.
- Keep prompt/eval sets model-family-specific; do not assume one Llama/Qwen/Gemma prompt transfers cleanly to another.
- Prefer the smallest variant that passes your task eval before escalating to larger models.

## Resources

- [GitHub](https://github.com/meta-llama/llama-models)
- [Official Llama site](https://www.llama.com/)
- [Hugging Face organization](https://huggingface.co/meta-llama)

## Buzz & Reception

- Included because this family is frequently referenced in open-model selection and deployment decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*


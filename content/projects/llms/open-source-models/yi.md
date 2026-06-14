---
id: yi
name: Yi
type: model
category: llms
subcategory: open-source-models
description: >-
  01.AI open model family with bilingual and long-context variants from small to
  mid-large sizes
github_url: 'https://github.com/01-ai/Yi'
license: Apache-2.0
primary_language: Other
tags:
  - llm
  - inference
  - local
  - multimodal
maturity: production
cost_model: open-source
github_stars: 7820
github_stars_last_30d: 0
trending_score: 30
last_commit: '2024-11-27'
docs_url: 'https://github.com/01-ai/Yi'
demo_url: null
paper_url: null
paper_id: null
hf_url: 'https://huggingface.co/01-ai'
model_sizes:
  - 6B
  - 9B
  - 34B
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
status: watching
---

## Overview

> **TL;DR:** Yi is 01.AI’s open model family with bilingual and long-context variants. Use it as a comparison baseline, especially when evaluating older open-weight families.

- **Family / sizes:** 6B, 9B, 34B
- **Best fit:** bilingual model comparison, local open-weight experiments, historical baselines
- **Primary source:** [Yi GitHub](https://github.com/01-ai/Yi)

## Why It's in the Arsenal

Yi remains worth tracking as an influential open model family, though current activity should be checked before choosing it for new production systems.

## Key Features

- Bilingual English/Chinese model focus
- 6B, 9B, and 34B-scale variants
- Long-context variants in the broader family
- Apache-2.0 repository license
- Useful historical open-model baseline

## Architecture / How It Works

Yi models are decoder-only transformer language models with chat and base variants across multiple sizes.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

pipe = pipeline("text-generation", model="01-ai/Yi-6B-Chat")
print(pipe("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Use Cases

1. **Scenario**: You need English/Chinese comparison baselines
2. **Scenario**: You are studying open-model evolution
3. **Scenario**: You want local experiments with older established weights

## Strengths

- Permissive repo license
- Useful bilingual baseline
- Multiple model sizes for hardware tradeoffs

## Limitations / When NOT to Use

- Repository activity is lower than newer model families
- May lag current Qwen/Llama/DeepSeek variants
- Check model-card terms and current maintenance before production use

## Integration Patterns

- Serve through vLLM, SGLang, TGI, Ollama, llama.cpp, or managed inference when supported by the model format.
- Keep prompt/eval sets model-family-specific; do not assume one Llama/Qwen/Gemma prompt transfers cleanly to another.
- Prefer the smallest variant that passes your task eval before escalating to larger models.

## Resources

- [GitHub](https://github.com/01-ai/Yi)
- [Hugging Face organization](https://huggingface.co/01-ai)

## Buzz & Reception

- Included because this family is frequently referenced in open-model selection and deployment decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*


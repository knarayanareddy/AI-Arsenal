---
id: command-r-plus
name: Command R+
type: model
category: llms
subcategory: open-source-models
description: >-
  Cohere model family oriented toward enterprise RAG, tool use, and multilingual
  workflows
github_url: 'https://huggingface.co/CohereForAI/c4ai-command-r-plus'
license: Custom
primary_language: Other
tags:
  - llm
  - rag
  - tool-use
  - multimodal
maturity: production
cost_model: open-source
github_stars: 0
github_stars_last_30d: 0
trending_score: 15
last_commit: '2026-06-13'
docs_url: 'https://docs.cohere.com/'
demo_url: null
paper_url: null
paper_id: null
hf_url: 'https://huggingface.co/CohereForAI/c4ai-command-r-plus'
model_sizes:
  - 104B
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

> **TL;DR:** Command R+ is Cohere’s open-weight enterprise-oriented model focused on RAG, tool use, and multilingual workflows. Use it when retrieval and enterprise assistant behavior matter.

- **Family / sizes:** 104B
- **Best fit:** enterprise RAG, tool use, multilingual assistants
- **Primary source:** [Cohere model card](https://huggingface.co/CohereForAI/c4ai-command-r-plus)

## Why It's in the Arsenal

Command R+ is relevant because it was explicitly positioned for retrieval-grounded enterprise assistant workloads rather than only general chat.

## Key Features

- RAG-oriented model positioning
- Tool-use and enterprise assistant focus
- Multilingual support emphasis
- Available model card through CohereForAI
- Useful comparison point against Llama/Qwen/Mistral for RAG

## Architecture / How It Works

Command R+ is a large transformer language model released for enterprise-style RAG and tool-use workflows.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

pipe = pipeline("text-generation", model="CohereForAI/c4ai-command-r-plus")
print(pipe("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Use Cases

1. **Scenario**: You are building retrieval-heavy assistants
2. **Scenario**: You need enterprise-oriented multilingual behavior
3. **Scenario**: You want to compare RAG-specialized open weights

## Strengths

- Designed around retrieval and tool-use use cases
- Good conceptual fit for enterprise assistants
- Useful non-Llama/Qwen baseline

## Limitations / When NOT to Use

- License and terms require careful review
- Large model size makes self-hosting expensive
- Not as broadly deployed in local tooling as Llama/Qwen

## Integration Patterns

- Serve through vLLM, SGLang, TGI, Ollama, llama.cpp, or managed inference when supported by the model format.
- Keep prompt/eval sets model-family-specific; do not assume one Llama/Qwen/Gemma prompt transfers cleanly to another.
- Prefer the smallest variant that passes your task eval before escalating to larger models.

## Resources

- [Hugging Face model card](https://huggingface.co/CohereForAI/c4ai-command-r-plus)
- [Cohere docs](https://docs.cohere.com/)

## Buzz & Reception

- Included because this family is frequently referenced in open-model selection and deployment decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*


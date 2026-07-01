---
id: phi-4
name: Phi-4
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: Microsoft small language model family optimized for efficient reasoning and local-friendly deployment
github_url: "https://huggingface.co/microsoft/phi-4"
license: MIT
primary_language: Other
org_or_maintainer: null
tags: [llm, reasoning, local, efficiency]
maturity: production
cost_model: open-source
github_stars: 0
github_stars_last_30d: 0
trending_score: 15
last_commit: "2026-06-13"
docs_url: "https://huggingface.co/microsoft/phi-4"
demo_url: null
paper_url: null
paper_id: null
hf_url: "https://huggingface.co/microsoft/phi-4"
model_sizes: [14B]
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: foundation-model
domain: [language, reasoning]
relation_to_stack: [deploy-as-is, build-on-top, study-and-reference]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - Microsoft's synthetic-data-centric small language model, optimized for reasoning-per-parameter rather than raw scale
best_for:
  - You want a small (14B) dense model that competes with much larger models on reasoning/knowledge benchmarks (MMLU, GPQA) due to Microsoft's synthetic-data-heavy training approach
  - You need a well-documented, MIT-licensed model with a public technical report detailing its training methodology, useful as a study/reference baseline for data-centric training approaches
avoid_if:
  - You need the largest possible context window — Phi-4's native context is a comparatively modest 16K tokens (extended from a 4K default during midtraining), well below Gemma 3 or Llama's 128K
  - You need strong multimodal or agentic tool-use capability out of the box — Phi-4's core strength is text reasoning/knowledge density, not multimodal or agent-native behavior (Microsoft's separate Phi-4-multimodal variant addresses the former)
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Architecture and training details (14B dense decoder-only transformer, 4096 default context extended to 16K during midtraining, tiktoken tokenizer with 100,352 vocab, ~10T training tokens with heavy synthetic-data emphasis, full attention rather than phi-3-medium's 2K sliding window) are sourced directly from Microsoft's Phi-4 Technical Report (arXiv 2412.08905), not marketing copy.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

A 14-billion-parameter dense language model from Microsoft Research, released in December 2024, distinguished by a training approach that emphasizes large-scale synthetic data generation over raw dataset scale to maximize reasoning performance per parameter.

## Why it's in the Arsenal

Microsoft's synthetic-data-centric small language model, optimized for reasoning-per-parameter rather than raw scale. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want a small (14B) dense model that competes with much larger models on reasoning/knowledge benchmarks (MMLU, GPQA) due to Microsoft's synthetic-data-heavy training approach. See Strengths / Limitations below before adopting it.

## Architecture

A dense decoder-only transformer following the phi-3-medium architecture with modifications: tiktoken tokenizer (100,352 vocabulary) for improved multilingual support, full attention across a 4K context (rather than phi-3-medium's 2K sliding window), later extended to 16K context during a midtraining phase. Trained on approximately 10 trillion tokens with synthetic data constituting the bulk of training data, generated via diverse techniques targeting reasoning-focused tasks, using 1,920 H100 GPUs over 21 days with supervised fine-tuning and direct preference optimization.

## Ecosystem Position

Upstream: builds directly on the phi-3-medium architecture. Downstream: supported by Hugging Face Transformers, Ollama, and llama.cpp; the phi-cookbook project (also in this catalog) is Microsoft's own companion resource for building applications on Phi models. Competing: Llama 3 8B, Qwen 2.5 14B, Gemma at similar parameter scale — Phi-4 specifically targets outperforming larger models on reasoning benchmarks rather than competing on raw scale.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

# Replace with the specific model checkpoint for this family (see Resources).
pipe = pipeline("text-generation", model="<org>/<model-checkpoint>")
print(pipe("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Key Use Cases

1. **Scenario**: you want a small (14B) dense model that competes with much larger models on reasoning/knowledge benchmarks (MMLU, GPQA) due to Microsoft's synthetic-data-heavy training approach
2. **Scenario**: you need a well-documented, MIT-licensed model with a public technical report detailing its training methodology, useful as a study/reference baseline for data-centric training approaches

## Strengths

- You want a small (14B) dense model that competes with much larger models on reasoning/knowledge benchmarks (MMLU, GPQA) due to Microsoft's synthetic-data-heavy training approach
- You need a well-documented, MIT-licensed model with a public technical report detailing its training methodology, useful as a study/reference baseline for data-centric training approaches

## Limitations

- You need the largest possible context window — Phi-4's native context is a comparatively modest 16K tokens (extended from a 4K default during midtraining), well below Gemma 3 or Llama's 128K
- You need strong multimodal or agentic tool-use capability out of the box — Phi-4's core strength is text reasoning/knowledge density, not multimodal or agent-native behavior (Microsoft's separate Phi-4-multimodal variant addresses the former)

## Relation to the Arsenal

This is a foundation-model entry: it documents the weights, architecture, and ecosystem position of the model itself. For guidance on which inference engine or serving tool to use to actually run it in production, see the relevant entries under [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://huggingface.co/microsoft/phi-4)
- [Documentation](https://huggingface.co/microsoft/phi-4)

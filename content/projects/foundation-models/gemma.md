---
id: gemma
name: Gemma
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: Google open model family designed for efficient language and multimodal applications
github_url: https://github.com/google-deepmind/gemma
license: Custom
primary_language: Python
org_or_maintainer: null
tags:
  - llm
  - inference
  - multimodal
  - local
maturity: production
cost_model: open-source
github_stars: 5574
github_stars_last_30d: 0
trending_score: 15
last_commit: '2026-07-17'
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain:
  - language
  - multimodal
relation_to_stack:
  - deploy-as-is
  - build-on-top
  - study-and-reference
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - Google DeepMind's first-generation open-weight small model family (Gemma 1/2)
best_for:
  - You specifically need the original Gemma 1/2 generation for compatibility with existing pipelines or comparative research
  - You want Google's smallest, most local-deployment-friendly open-weight models rather than the larger, newer Gemma 3/4 variants
avoid_if:
  - You're starting a new project — Gemma 3 (and now Gemma 4, released April 2026) supersede this generation with longer context, multimodal input, and better benchmarks at the same or smaller sizes
  - You need the efficient long-context architecture (interleaved local/global attention) that only shipped starting with Gemma 3
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Gemma 4 launched publicly in April 2026 per GitHub issue activity on google-deepmind/gemma referencing 'the April 2026 launch of Gemma 4'; this entry is kept as the original Gemma 1/2 generation, distinct from gemma-3 and the newer, not-yet-catalogued Gemma 4.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

The first generation of Google DeepMind's open-weight small language model family, released in 2024 as a lighter-weight, locally-deployable counterpart to Gemini.

## Why it's in the Arsenal

Google DeepMind's first-generation open-weight small model family (Gemma 1/2). It earns a place in the Arsenal because it directly addresses a recurring decision point: you specifically need the original Gemma 1/2 generation for compatibility with existing pipelines or comparative research. See Strengths / Limitations below before adopting it.

## Architecture

A dense decoder-only transformer built from the same research lineage as Gemini, released in 2B/7B (Gemma 1) and later 2B/9B/27B (Gemma 2) sizes, without the interleaved local/global sliding-window attention mechanism introduced later in Gemma 3.

## Ecosystem Position

Upstream: shares research lineage with Google's Gemini models. Downstream: broad support across Ollama, llama.cpp, vLLM, and Hugging Face Transformers. Competing: Llama 3, Mistral 7B, Qwen at comparable sizes. Superseded by: Gemma 3 (longer context, multimodal, more efficient attention) and, as of April 2026, Gemma 4.

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

1. **Scenario**: you specifically need the original Gemma 1/2 generation for compatibility with existing pipelines or comparative research
2. **Scenario**: you want Google's smallest, most local-deployment-friendly open-weight models rather than the larger, newer Gemma 3/4 variants

## Strengths

- You specifically need the original Gemma 1/2 generation for compatibility with existing pipelines or comparative research
- You want Google's smallest, most local-deployment-friendly open-weight models rather than the larger, newer Gemma 3/4 variants

## Limitations

- You're starting a new project — Gemma 3 (and now Gemma 4, released April 2026) supersede this generation with longer context, multimodal input, and better benchmarks at the same or smaller sizes
- You need the efficient long-context architecture (interleaved local/global attention) that only shipped starting with Gemma 3

## Relation to the Arsenal

This is a foundation-model entry: it documents the weights, architecture, and ecosystem position of the model itself. For guidance on which inference engine or serving tool to use to actually run it in production, see the relevant entries under [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/google-deepmind/gemma)
- [Documentation](https://github.com/google-deepmind/gemma)

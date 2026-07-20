---
id: phi-cookbook
name: Phi Cookbook
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: Microsoft examples and recipes for building with the Phi model family
github_url: https://github.com/microsoft/PhiCookBook
license: MIT
primary_language: Python
org_or_maintainer: null
tags:
  - llm
  - inference
  - local
  - reasoning
maturity: production
cost_model: open-source
github_stars: 3771
github_stars_last_30d: 21
trending_score: 17
last_commit: '2026-07-16'
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain:
  - language
relation_to_stack:
  - study-and-reference
  - fork-and-adapt
health_signals:
  - org-backed
  - actively-maintained
  - community-driven
ecosystem_role:
  - Microsoft's official companion resource of samples and guides for building with the Phi model family
best_for:
  - You're building an application on Phi-4 or other Phi models and want Microsoft's own reference implementations, fine-tuning recipes, and deployment samples rather than reverse-engineering usage patterns
  - You want a curated, actively-maintained (2026 commit activity confirmed) collection of Phi usage patterns across multiple frameworks and deployment targets
avoid_if:
  - You're looking for the model weights themselves rather than usage guidance — this is a cookbook/samples repository, not the Phi-4 model repository
  - You need cookbook-style guidance for a different model family — this repo is Phi-specific and won't transfer directly to Llama, Qwen, or Gemma tooling patterns
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: 'GitHub Actions workflow activity confirmed as recently as January 2026 (PR #454, microsoft/PhiCookBook), and the repo is directly linked from Microsoft''s own Phi-4 Hugging Face model card as the recommended fine-tuning cookbook, confirming both recency and official-status as a companion resource rather than an unofficial community fork.'
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Microsoft's official collection of samples, tutorials, and deployment recipes for building applications with the Phi model family, maintained alongside the model releases themselves.

## Why it's in the Arsenal

Microsoft's official companion resource of samples and guides for building with the Phi model family. It earns a place in the Arsenal because it directly addresses a recurring decision point: you're building an application on Phi-4 or other Phi models and want Microsoft's own reference implementations, fine-tuning recipes, and deployment samples rather than reverse-engineering usage patterns. See Strengths / Limitations below before adopting it.

## Architecture

Not a model architecture itself — a curated repository of Jupyter notebooks, sample code, and guides covering fine-tuning, quantization, and deployment patterns across multiple frameworks (Hugging Face Transformers, ONNX Runtime, Ollama) for the Phi model family.

## Ecosystem Position

Upstream: depends entirely on the Phi model family (phi-4 and predecessors) as its subject matter. Downstream: none — it is a leaf reference resource, not a dependency of other projects. Competing: informal community tutorials and blog posts covering Phi usage; this repo's advantage is being the vendor-official, kept-current version. Complementary: pairs directly with the phi-4 entry in this catalog.

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

1. **Scenario**: you're building an application on Phi-4 or other Phi models and want Microsoft's own reference implementations, fine-tuning recipes, and deployment samples rather than reverse-engineering usage patterns
2. **Scenario**: you want a curated, actively-maintained (2026 commit activity confirmed) collection of Phi usage patterns across multiple frameworks and deployment targets

## Strengths

- You're building an application on Phi-4 or other Phi models and want Microsoft's own reference implementations, fine-tuning recipes, and deployment samples rather than reverse-engineering usage patterns
- You want a curated, actively-maintained (2026 commit activity confirmed) collection of Phi usage patterns across multiple frameworks and deployment targets

## Limitations

- You're looking for the model weights themselves rather than usage guidance — this is a cookbook/samples repository, not the Phi-4 model repository
- You need cookbook-style guidance for a different model family — this repo is Phi-specific and won't transfer directly to Llama, Qwen, or Gemma tooling patterns

## Relation to the Arsenal

This is a foundation-model entry: it documents the weights, architecture, and ecosystem position of the model itself. For guidance on which inference engine or serving tool to use to actually run it in production, see the relevant entries under [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/microsoft/PhiCookBook)
- [Documentation](https://github.com/microsoft/PhiCookBook)

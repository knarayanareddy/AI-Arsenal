---
id: falcon-3
name: Falcon 3
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: TII open model family with compact 1B to 10B text-only variants for local deployment
github_url: "https://huggingface.co/tiiuae/Falcon3-7B-Base"
license: TII Falcon-LLM License 2.0
primary_language: Other
org_or_maintainer: null
tags: [llm, inference, local, efficiency]
maturity: production
cost_model: open-source
github_stars: 0
github_stars_last_30d: 0
trending_score: 15
last_commit: "2026-06-13"
docs_url: "https://falcon-lm.github.io/tutorials/falcon-3/"
demo_url: null
paper_url: null
paper_id: null
hf_url: "https://huggingface.co/tiiuae"
model_sizes: [1B, 3B, 7B, 10B]
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: foundation-model
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed]
ecosystem_role:
  - UAE-backed (TII) open-weight small/mid-size model family
best_for:
  - You want an open-weight model backed by a national research institute (TII, UAE) as an alternative to the US/China-dominated open-weight landscape
  - You need a small-to-mid-size dense model (1B-10B class) for local or edge deployment with a permissive-leaning custom license
avoid_if:
  - You need TII's current architecture — Falcon-3 has been succeeded by Falcon-H1, which uses a hybrid State Space Model plus attention architecture (0.5B-34B) that TII positions as more efficient than Falcon-3's plain transformer design
  - You need the broadest possible community tooling support — Falcon models have meaningfully smaller ecosystem adoption than Llama or Qwen, so quantization/fine-tuning recipes are less abundant
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "TII has publicly moved its flagship line to Falcon-H1 (hybrid SSM+attention, 0.5B-34B, Apache-2.0) per falcon-lm.github.io and Hugging Face model cards; Falcon-3 remains available but is not TII's current focus. License note: Falcon-3 ships under a TII-custom Falcon-LLM license (Apache-2.0-based with acceptable-use terms), distinct from Falcon-H1 which is plain Apache-2.0."
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

An open-weight small-to-mid-size language model family from the Technology Innovation Institute (TII) in the UAE, offered in several parameter sizes for local and edge deployment.

## Why it's in the Arsenal

UAE-backed (TII) open-weight small/mid-size model family. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want an open-weight model backed by a national research institute (TII, UAE) as an alternative to the US/China-dominated open-weight landscape. See Strengths / Limitations below before adopting it.

## Architecture

A dense decoder-only transformer family, documented publicly at the model-card level (parameter counts, context length, tokenizer) but with less architectural novelty disclosed than TII's newer Falcon-H1 line, which explicitly documents its hybrid State Space Model plus attention design.

## Ecosystem Position

Upstream: standard transformer research; TII's own earlier Falcon 1/2 generations. Downstream: supported by Hugging Face Transformers, vLLM, and llama.cpp for inference. Competing: Llama 3, Qwen 2.5, and Gemma at similar parameter scales. Complementary/succeeding: TII's own Falcon-H1 family is the direct architectural successor and the vendor's current recommended path.

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

1. **Scenario**: you want an open-weight model backed by a national research institute (TII, UAE) as an alternative to the US/China-dominated open-weight landscape
2. **Scenario**: you need a small-to-mid-size dense model (1B-10B class) for local or edge deployment with a permissive-leaning custom license

## Strengths

- You want an open-weight model backed by a national research institute (TII, UAE) as an alternative to the US/China-dominated open-weight landscape
- You need a small-to-mid-size dense model (1B-10B class) for local or edge deployment with a permissive-leaning custom license

## Limitations

- You need TII's current architecture — Falcon-3 has been succeeded by Falcon-H1, which uses a hybrid State Space Model plus attention architecture (0.5B-34B) that TII positions as more efficient than Falcon-3's plain transformer design
- You need the broadest possible community tooling support — Falcon models have meaningfully smaller ecosystem adoption than Llama or Qwen, so quantization/fine-tuning recipes are less abundant

## Relation to the Arsenal

This is a foundation-model entry: it documents the weights, architecture, and ecosystem position of the model itself. For guidance on which inference engine or serving tool to use to actually run it in production, see the relevant entries under [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://huggingface.co/tiiuae/Falcon3-7B-Base)
- [Documentation](https://falcon-lm.github.io/tutorials/falcon-3/)

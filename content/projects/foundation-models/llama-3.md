---
id: llama-3
name: Llama 3.x
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: Meta open-weight Llama 3 family for general, multilingual, code, and multimodal applications
github_url: https://github.com/meta-llama/llama-models
license: Custom
primary_language: Other
org_or_maintainer: null
tags:
  - llm
  - inference
  - local
  - multimodal
maturity: production
cost_model: open-source
github_stars: 7657
github_stars_last_30d: 29
trending_score: 17
last_commit: '2026-02-11'
docs_url: https://www.llama.com/
demo_url: null
paper_url: null
paper_id: null
hf_url: https://huggingface.co/meta-llama
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
phase: foundation-model
domain:
  - language
  - vision
  - multimodal
relation_to_stack:
  - deploy-as-is
  - build-on-top
  - study-and-reference
health_signals:
  - org-backed
  - community-driven
  - production-proven
ecosystem_role:
  - Meta's open-weight model family with the broadest inference/tooling ecosystem support of any open model line
best_for:
  - You need the broadest possible ecosystem compatibility — Llama models have the deepest support across inference engines (vLLM, SGLang, TGI, Ollama, llama.cpp), quantization tooling, and fine-tuning frameworks of any open-weight family
  - You need a range of sizes from edge (1B/3B) through frontier-adjacent (405B) within one consistent model family and licensing structure
avoid_if:
  - 'You need Meta''s current-generation architecture — Llama 4 (April 2025) introduced Meta''s first mixture-of-experts design (Scout: 109B total/17B active with a 10M-token context; Maverick: 400B total/17B active) and is the vendor''s recommended path for new projects'
  - Your use case is EU-based commercial deployment — Llama 4's license carries EU-specific restrictions, and Llama 3's custom license also requires review of acceptable-use terms before commercial use
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Llama 4 (Scout/Maverick MoE, April 2025) and reports of an internal 'Muse Spark' replacement (Wikipedia, April 2026) indicate Llama 3.x is not Meta's current frontier line as of mid-2026, though it remains the most widely deployed and tooled open-weight generation.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: hackernews
    url: https://www.zenml.io/blog/llmops-in-production-457-case-studies-of-what-actually-works
    date: '2025-01-20'
    description: ZenML's LLMOps case-study collection documents Addverb using edge-deployed Llama 3 in production for multi-lingual AGV fleet voice control across warehouses
featured: false
status: active
---

## Overview

Meta's third-generation open-weight language model family, spanning 1B to 405B parameters with instruction-tuned, multilingual, and multimodal (vision) variants, released across 2024-2025.

## Why it's in the Arsenal

Meta's open-weight model family with the broadest inference/tooling ecosystem support of any open model line. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need the broadest possible ecosystem compatibility — Llama models have the deepest support across inference engines (vLLM, SGLang, TGI, Ollama, llama.cpp), quantization tooling, and fine-tuning frameworks of any open-weight family. See Strengths / Limitations below before adopting it.

## Architecture

A dense (not MoE) decoder-only transformer family across all Llama 3.x sizes, in contrast to the MoE design Meta introduced later with Llama 4. Sizes span 1B, 3B, 8B, 11B, 70B, 90B, and 405B, with the 11B/90B variants adding vision encoder support for multimodal input.

## Ecosystem Position

Upstream: standard transformer architecture, no unusual dependencies. Downstream: the single most broadly supported open-weight family — every major inference engine (vLLM, SGLang, TGI, Ollama, llama.cpp) and fine-tuning framework (Axolotl, LLaMA-Factory, Unsloth) supports it on day one, and it anchors a vast ecosystem of community fine-tunes. Competing: Qwen 2.5/3, Mistral, Gemma at comparable sizes. Superseded by: Llama 4 (Meta's first MoE generation, April 2025) as the vendor's current recommended line, though Llama 3.x remains heavily deployed due to its ecosystem maturity.

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

1. **Scenario**: you need the broadest possible ecosystem compatibility — Llama models have the deepest support across inference engines (vLLM, SGLang, TGI, Ollama, llama.cpp), quantization tooling, and fine-tuning frameworks of any open-weight family
2. **Scenario**: you need a range of sizes from edge (1B/3B) through frontier-adjacent (405B) within one consistent model family and licensing structure

## Strengths

- You need the broadest possible ecosystem compatibility — Llama models have the deepest support across inference engines (vLLM, SGLang, TGI, Ollama, llama.cpp), quantization tooling, and fine-tuning frameworks of any open-weight family
- You need a range of sizes from edge (1B/3B) through frontier-adjacent (405B) within one consistent model family and licensing structure

## Limitations

- You need Meta's current-generation architecture — Llama 4 (April 2025) introduced Meta's first mixture-of-experts design (Scout: 109B total/17B active with a 10M-token context; Maverick: 400B total/17B active) and is the vendor's recommended path for new projects
- Your use case is EU-based commercial deployment — Llama 4's license carries EU-specific restrictions, and Llama 3's custom license also requires review of acceptable-use terms before commercial use

## Relation to the Arsenal

This is a foundation-model entry: it documents the weights, architecture, and ecosystem position of the model itself. For guidance on which inference engine or serving tool to use to actually run it in production, see the relevant entries under [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/meta-llama/llama-models)
- [Documentation](https://www.llama.com/)

---
id: mistral-models
name: Mistral / Mixtral
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: Mistral open-weight model family including dense and mixture-of-experts language models
github_url: https://github.com/mistralai/mistral-inference
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags:
  - llm
  - inference
  - local
  - efficiency
maturity: production
cost_model: open-source
github_stars: 10831
github_stars_last_30d: 15
trending_score: 16
last_commit: '2026-06-16'
docs_url: https://docs.mistral.ai/
demo_url: null
paper_url: null
paper_id: null
hf_url: https://huggingface.co/mistralai
model_sizes:
  - 7B
  - 8x7B
  - 8x22B
  - 24B
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: foundation-model
domain:
  - language
  - vision
relation_to_stack:
  - deploy-as-is
  - build-on-top
  - study-and-reference
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - Mistral AI's open-weight model family, notable for early and influential sparse Mixture-of-Experts (Mixtral) releases
best_for:
  - You want influential, efficient open-weight dense (7B) or MoE (8x7B/8x22B Mixtral) models with strong performance-per-parameter and a European vendor's terms
  - You need multimodal (Pixtral) or code-specialized (Codestral) variants from the same family and license lineage
avoid_if:
  - You need Mistral's current flagship — as of late 2025/2026 Mistral has shipped Mistral Large 3 (675B total/41B active MoE, Apache-2.0), Ministral 3, and Devstral 2, which supersede the older Mistral 7B/Mixtral models catalogued here on both scale and licensing (Large 3 moved to Apache-2.0 from the older models' more mixed licensing)
  - You need a model with native long-context handling beyond roughly 65K-128K tokens — check the specific variant's context window before committing, since it varies significantly across the Mistral/Mixtral lineage
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Mistral's 2025-2026 release cadence (Mistral Large 3 in Dec 2025, Ministral 3 and Devstral 2 in Dec 2025, Mistral Small 4 in March 2026, per Wikipedia's Mistral AI page) confirms the 7B/Mixtral generation catalogued here is now a legacy tier relative to Mistral's current lineup, though it remains widely deployed and referenced as the influential early MoE release.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: archived
---

## Overview

Mistral AI's open-weight model family, including the original dense Mistral 7B and the influential sparse Mixture-of-Experts Mixtral 8x7B and 8x22B models, released 2023-2024 under Apache-2.0.

## Why it's in the Arsenal

Mistral AI's open-weight model family, notable for early and influential sparse Mixture-of-Experts (Mixtral) releases. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want influential, efficient open-weight dense (7B) or MoE (8x7B/8x22B Mixtral) models with strong performance-per-parameter and a European vendor's terms. See Strengths / Limitations below before adopting it.

## Architecture

Mistral 7B is a dense decoder-only transformer using grouped-query and sliding-window attention. Mixtral 8x7B and 8x22B use a sparse Mixture-of-Experts design (8 experts, 2 active per token), one of the first widely-adopted open-weight MoE releases and a significant influence on the open-model ecosystem's subsequent MoE adoption.

## Ecosystem Position

Upstream: standard transformer/MoE research. Downstream: broadly supported by vLLM, TGI, Ollama, and llama.cpp; the Mixtral architecture directly influenced later MoE designs across the open-weight ecosystem. Competing: Llama 3, Qwen at comparable active-parameter counts. Superseded by: Mistral Large 3, Ministral 3, and Devstral 2 (Mistral's current 2025-2026 generation, Apache-2.0).

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

1. **Scenario**: you want influential, efficient open-weight dense (7B) or MoE (8x7B/8x22B Mixtral) models with strong performance-per-parameter and a European vendor's terms
2. **Scenario**: you need multimodal (Pixtral) or code-specialized (Codestral) variants from the same family and license lineage

## Strengths

- You want influential, efficient open-weight dense (7B) or MoE (8x7B/8x22B Mixtral) models with strong performance-per-parameter and a European vendor's terms
- You need multimodal (Pixtral) or code-specialized (Codestral) variants from the same family and license lineage

## Limitations

- You need Mistral's current flagship — as of late 2025/2026 Mistral has shipped Mistral Large 3 (675B total/41B active MoE, Apache-2.0), Ministral 3, and Devstral 2, which supersede the older Mistral 7B/Mixtral models catalogued here on both scale and licensing (Large 3 moved to Apache-2.0 from the older models' more mixed licensing)
- You need a model with native long-context handling beyond roughly 65K-128K tokens — check the specific variant's context window before committing, since it varies significantly across the Mistral/Mixtral lineage

## Relation to the Arsenal

This is a foundation-model entry: it documents the weights, architecture, and ecosystem position of the model itself. For guidance on which inference engine or serving tool to use to actually run it in production, see the relevant entries under [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/mistralai/mistral-inference)
- [Documentation](https://docs.mistral.ai/)

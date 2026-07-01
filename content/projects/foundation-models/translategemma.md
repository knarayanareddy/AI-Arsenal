---
id: translategemma
name: TranslateGemma
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: Open translation model family built on Gemma 3 supporting 55 languages efficiently
github_url: "https://github.com/google-deepmind/gemma"
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags: [multimodal, llm]
maturity: production
cost_model: open-source
github_stars: 5000
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-06-13"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed]
ecosystem_role:
  - Specialized translation fine-tune built on the Gemma 3 base architecture
best_for:
  - You need an efficient, open-weight machine translation model specifically fine-tuned for 55 languages rather than a general-purpose chat model repurposed for translation
  - You want a translation model that inherits Gemma 3's efficient long-context architecture for translating longer documents
avoid_if:
  - You need general-purpose chat/reasoning capability alongside translation — this is a narrowly specialized derivative, not a general model; use the base Gemma 3 or Gemma 4 for broader tasks
  - You need enterprise translation quality guarantees or the widest language coverage — compare against Cohere's Command A Translate (23 languages, enterprise-positioned) or dedicated commercial translation APIs depending on your quality/language-coverage requirements
upstream_dependencies: []
downstream_consumers: []
alternatives: [gemma-3]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Limited independent third-party coverage found beyond the model's own description; architecture claims (built on Gemma 3, 55-language support) are consistent with Google's Gemma 3 technical report lineage but the translation-specific fine-tuning details have not been independently verified against a technical report or paper.
added_date: "2026-06-14"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://toolradar.com/featured/techpresso","date":"2026-06-14","description":"Featured in Techpresso under open-source-models"}
featured: false
status: active
---

## Overview

undefined

## Why it's in the Arsenal

Specialized translation fine-tune built on the Gemma 3 base architecture. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need an efficient, open-weight machine translation model specifically fine-tuned for 55 languages rather than a general-purpose chat model repurposed for translation. See Strengths / Limitations below before adopting it.

## Architecture

undefined

## Ecosystem Position

undefined

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

1. **Scenario**: you need an efficient, open-weight machine translation model specifically fine-tuned for 55 languages rather than a general-purpose chat model repurposed for translation
2. **Scenario**: you want a translation model that inherits Gemma 3's efficient long-context architecture for translating longer documents

## Strengths

- You need an efficient, open-weight machine translation model specifically fine-tuned for 55 languages rather than a general-purpose chat model repurposed for translation
- You want a translation model that inherits Gemma 3's efficient long-context architecture for translating longer documents

## Limitations

- You need general-purpose chat/reasoning capability alongside translation — this is a narrowly specialized derivative, not a general model; use the base Gemma 3 or Gemma 4 for broader tasks
- You need enterprise translation quality guarantees or the widest language coverage — compare against Cohere's Command A Translate (23 languages, enterprise-positioned) or dedicated commercial translation APIs depending on your quality/language-coverage requirements

_Enrichment status: draft — architecture/production claims above are based on the vendor's own description or limited third-party sourcing; not yet independently verified. Last reviewed: 2026-07-01._

## Relation to the Arsenal

This is a foundation-model entry: it documents the weights, architecture, and ecosystem position of the model itself. For guidance on which inference engine or serving tool to use to actually run it in production, see the relevant entries under [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/google-deepmind/gemma)
- [Documentation](https://github.com/google-deepmind/gemma)

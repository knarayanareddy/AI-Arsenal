---
id: yi
name: Yi
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: 01.AI open model family with bilingual and long-context variants from small to mid-large sizes
github_url: "https://github.com/01-ai/Yi"
license: Apache-2.0
primary_language: Other
org_or_maintainer: null
tags: [llm, inference, local, multimodal]
maturity: production
cost_model: open-source
github_stars: 7820
github_stars_last_30d: 0
trending_score: 30
last_commit: "2024-11-27"
docs_url: "https://github.com/01-ai/Yi"
demo_url: null
paper_url: null
paper_id: null
hf_url: "https://huggingface.co/01-ai"
model_sizes: [6B, 9B, 34B]
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: foundation-model
domain: [language]
relation_to_stack: [study-and-reference]
health_signals: [community-driven]
ecosystem_role:
  - 01.AI's open-weight model family from the 2023-2024 open-model wave
best_for:
  - You're doing comparative research across open-weight models from the 2023-2024 generation and need Yi as a reference point
  - You need a bilingual (English/Chinese) dense model and have already validated Yi meets your specific quality bar versus more actively maintained alternatives
avoid_if:
  - You need active vendor support or frequent updates — GitHub issue activity on 01-ai/Yi shows sparse, community-only engagement in 2026 with no clear maintainer response pattern, and 01.AI's public focus has shifted toward newer, less-established projects
  - You want a model with strong current-generation benchmark performance — Yi has been substantially outpaced by Qwen, Llama 3/4, and Gemma on most public leaderboards since its 2023-2024 release
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Could not confirm official maintenance status beyond sparse, community-authored 2026 issue activity on 01-ai/Yi with no visible maintainer responses; 01.AI's recent GitHub activity is on unrelated newer projects (01-ai/langcrew), suggesting Yi may be in de facto maintenance mode.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: watching
---

## Overview

undefined

## Why it's in the Arsenal

01.AI's open-weight model family from the 2023-2024 open-model wave. It earns a place in the Arsenal because it directly addresses a recurring decision point: you're doing comparative research across open-weight models from the 2023-2024 generation and need Yi as a reference point. See Strengths / Limitations below before adopting it.

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

1. **Scenario**: you're doing comparative research across open-weight models from the 2023-2024 generation and need Yi as a reference point
2. **Scenario**: you need a bilingual (English/Chinese) dense model and have already validated Yi meets your specific quality bar versus more actively maintained alternatives

## Strengths

- You're doing comparative research across open-weight models from the 2023-2024 generation and need Yi as a reference point
- You need a bilingual (English/Chinese) dense model and have already validated Yi meets your specific quality bar versus more actively maintained alternatives

## Limitations

- You need active vendor support or frequent updates — GitHub issue activity on 01-ai/Yi shows sparse, community-only engagement in 2026 with no clear maintainer response pattern, and 01.AI's public focus has shifted toward newer, less-established projects
- You want a model with strong current-generation benchmark performance — Yi has been substantially outpaced by Qwen, Llama 3/4, and Gemma on most public leaderboards since its 2023-2024 release

_Enrichment status: draft — architecture/production claims above are based on the vendor's own description or limited third-party sourcing; not yet independently verified. Last reviewed: 2026-07-01._

## Relation to the Arsenal

This is a foundation-model entry: it documents the weights, architecture, and ecosystem position of the model itself. For guidance on which inference engine or serving tool to use to actually run it in production, see the relevant entries under [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/01-ai/Yi)
- [Documentation](https://github.com/01-ai/Yi)

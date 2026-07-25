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

Yi is 01.AI's family of open-weight, decoder-only large language models released during the 2023-2024 open-model wave, published under Apache-2.0 in 6B, 9B, and 34B dense parameter sizes with weights hosted on Hugging Face under the `01-ai` org. The family targets bilingual English/Chinese use and shipped extended long-context variants. As of the last review the `01-ai/Yi` GitHub repository shows only sparse, community-authored activity, so the Arsenal tracks Yi primarily as a 2023-2024 reference point rather than an actively evolving model.

## Why it's in the Arsenal

Yi is worth keeping as a fixed comparison point: it was one of the stronger bilingual open-weight releases of its generation, so a documented, Apache-2.0 reference checkpoint makes it easier to judge how far newer families have moved. It is included here for comparative research, not as a current production default — see Strengths / Limitations before adopting it.

## Architecture

Yi ships as dense, decoder-only Transformer checkpoints in 6B, 9B, and 34B sizes that load through the standard Hugging Face `transformers` stack, so no bespoke runtime is required. The models are trained for bilingual English/Chinese coverage and were released with long-context variants. The published checkpoints are unquantized (`supports_quantization: false` in this entry's frontmatter), so serving the 34B size for low-latency inference generally means sizing GPU memory accordingly or adding an external quantization/serving layer.

## Ecosystem Position

Within the open-weight LLM landscape Yi sits alongside other 2023-2024 releases such as Llama 2/3, Qwen, and Mistral as a general-purpose bilingual option, but it has since been outpaced: this entry's own frontmatter notes Qwen, Llama 3/4, and Gemma lead it on most public leaderboards. Today it occupies a narrow niche — a reference checkpoint for comparative research rather than a default production model — and, unlike actively maintained families, it receives little upstream maintenance.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

# Yi publishes bilingual EN/ZH checkpoints under the 01-ai org (see Resources).
generate = pipeline("text-generation", model="01-ai/Yi-6B")
print(generate("用一句话解释检索增强生成（RAG）。", max_new_tokens=64)[0]["generated_text"])
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

_Enrichment status: draft. Yi's maintenance status and leaderboard positioning here are inferred from 01.AI's own repository signals and this entry's frontmatter, not from independent benchmarking by the Arsenal. Last reviewed: 2026-07-01._

## Relation to the Arsenal

As a foundation-model entry this documents Yi's weights and positioning, not how to serve it. To run the 6B/9B/34B checkpoints you pair them with an inference/serving stack — see [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md); because the weights are unquantized, a quantization-capable runtime is worth evaluating for the 34B size.

## Resources

- [GitHub](https://github.com/01-ai/Yi)
- [Documentation](https://github.com/01-ai/Yi)

---
id: qwen
name: Qwen
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: Alibaba open-weight model family covering language, coding, and multimodal use cases
github_url: "https://github.com/QwenLM/Qwen"
license: Apache-2.0
primary_language: Other
org_or_maintainer: null
tags: [llm, inference, multimodal, code-gen]
maturity: production
cost_model: open-source
github_stars: 21281
github_stars_last_30d: 21281
trending_score: 70
last_commit: "2026-03-05"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top, study-and-reference]
health_signals: [org-backed, community-driven]
ecosystem_role:
  - Alibaba's original open-weight Qwen model family (Qwen 1/2 generation)
best_for:
  - You specifically need the original Qwen/Qwen2 generation for compatibility with an existing pipeline or as a comparative research baseline
  - You're studying the evolution of Alibaba's open-weight model line from its earlier, simpler dense-transformer generation
avoid_if:
  - You're starting a new project — Alibaba has since shipped Qwen 2.5, Qwen3, and as of 2026 Qwen3.5/3.6/3.7, all of which substantially outperform this generation and are the vendor's actively promoted line
  - You need MoE efficiency or agentic/coding specialization — those capabilities were introduced in later Qwen generations, not this one
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: GitHub org activity (QwenLM/Qwen3, QwenLM/Qwen3.6 repos actively updated through June 2026 per github.com/orgs/QwenLM/repositories) confirms this original Qwen/Qwen2 repo is a legacy generation relative to Alibaba's current, very actively maintained line.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Alibaba Cloud's original open-weight large language model family, first released in 2023, predating the more widely adopted Qwen 2.5 and Qwen3 generations.

## Why it's in the Arsenal

Alibaba's original open-weight Qwen model family (Qwen 1/2 generation). It earns a place in the Arsenal because it directly addresses a recurring decision point: you specifically need the original Qwen/Qwen2 generation for compatibility with an existing pipeline or as a comparative research baseline. See Strengths / Limitations below before adopting it.

## Architecture

A dense decoder-only transformer family released across multiple parameter sizes, following the standard architecture conventions of its 2023-era release window without the later generations' MoE variants or extended multilingual/agentic post-training.

## Ecosystem Position

Upstream: standard transformer research. Downstream: supported by early integrations across Hugging Face Transformers and vLLM. Competing: Llama 2 and early Mistral releases from the same era. Superseded by: Qwen 2.5, Qwen3, and Alibaba's actively developed 2026 generation (Qwen3.5/3.6/3.7).

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

1. **Scenario**: you specifically need the original Qwen/Qwen2 generation for compatibility with an existing pipeline or as a comparative research baseline
2. **Scenario**: you're studying the evolution of Alibaba's open-weight model line from its earlier, simpler dense-transformer generation

## Strengths

- You specifically need the original Qwen/Qwen2 generation for compatibility with an existing pipeline or as a comparative research baseline
- You're studying the evolution of Alibaba's open-weight model line from its earlier, simpler dense-transformer generation

## Limitations

- You're starting a new project — Alibaba has since shipped Qwen 2.5, Qwen3, and as of 2026 Qwen3.5/3.6/3.7, all of which substantially outperform this generation and are the vendor's actively promoted line
- You need MoE efficiency or agentic/coding specialization — those capabilities were introduced in later Qwen generations, not this one

## Relation to the Arsenal

This is a foundation-model entry: it documents the weights, architecture, and ecosystem position of the model itself. For guidance on which inference engine or serving tool to use to actually run it in production, see the relevant entries under [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/QwenLM/Qwen)
- [Documentation](https://github.com/QwenLM/Qwen)

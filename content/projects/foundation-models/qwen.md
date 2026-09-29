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

Alibaba Cloud's original open-weight large language model family — the Qwen/Qwen2 generation — first released in 2023 as dense decoder-only transformer checkpoints under Apache-2.0. It covers general language, coding, and early multimodal use, but predates (and is now superseded by) the more widely adopted Qwen 2.5 and Qwen3 lines and lacks their MoE and agentic post-training.

## Why it's in the Arsenal

The case for Qwen rests on its documentation and observed adoption rather than on a controlled comparison here, so the sections below state what it claims to do and what adopting it would commit you to.

## Architecture

A dense decoder-only transformer family released across multiple parameter sizes, following the standard architecture conventions of its 2023-era release window without the later generations' MoE variants or extended multilingual/agentic post-training.

## Ecosystem Position

Upstream: standard transformer research. Downstream: supported by early integrations across Hugging Face Transformers and vLLM for serving these models. It competes with Llama 2 and early Mistral releases from the same era; compared to them it offered strong bilingual (English/Chinese) coverage, and it has since been superseded by Qwen 2.5, Qwen3, and Alibaba's actively developed 2026 generation (Qwen3.5/3.6/3.7).

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

# The original Qwen generation is published under the Qwen org on Hugging Face (see Resources).
generate = pipeline("text-generation", model="Qwen/Qwen-7B")
print(generate("用一句话解释检索增强生成（RAG）。", max_new_tokens=64)[0]["generated_text"])
```

## Key Use Cases

1. **Running it in anger**: the first real evaluation of Qwen is your own traffic, not the documentation's example; instrument latency, error rate and quality on a representative slice of data before the choice is load-bearing.
2. **What to measure first**: `specifically`, `original`, `qwen`, `qwen2` decide whether Qwen works for you; measure them on your own data because the published numbers are conditioned on someone else's setup.
3. **Before committing**: pick the criterion that would make you abandon this choice, write it down, and check it against a representative slice of your own data — a catalog entry can tell you what is claimed, only a run tells you what is true.

## Strengths

- The implementation detail worth checking before adopting Qwen is specific — a dense decoder-only transformer family released across multiple parameter sizes, following the standard architecture conventions of its 2023-era release window without the later generations' MoE variants or extended multilingual/agentic post-training — because that is where the capability claim either survives contact with your data or does not.
- It is a foundation-model entry in this catalog, so the comparison that matters is against the other foundation-model projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for Qwen is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- The claims here come from the project's own documentation and public record, not from independent measurement on your workload; benchmark numbers in particular are point-in-time and harness-dependent.
- No alternative is catalogued alongside Qwen here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

As a foundation-model entry this documents the original Qwen generation's weights and positioning, not serving. To run these dense checkpoints, pair them with an inference stack — see [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md); for new work prefer the current Qwen line noted above.

## Resources

- [GitHub](https://github.com/QwenLM/Qwen)
- [Documentation](https://github.com/QwenLM/Qwen)

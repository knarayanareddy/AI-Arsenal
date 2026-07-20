---
id: qwen-2-5
name: Qwen 2.5 / QwQ
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: Alibaba Qwen open-weight family spanning small, large, coding, math, and reasoning models
github_url: https://github.com/QwenLM/Qwen3
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags:
  - llm
  - inference
  - reasoning
  - code-gen
maturity: production
cost_model: open-source
github_stars: 27408
github_stars_last_30d: 110
trending_score: 24
last_commit: '2026-01-09'
docs_url: https://github.com/QwenLM/Qwen3
demo_url: null
paper_url: null
paper_id: null
hf_url: https://huggingface.co/Qwen
model_sizes:
  - 0.5B
  - 1.5B
  - 3B
  - 7B
  - 14B
  - 32B
  - 72B
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: foundation-model
domain:
  - language
  - reasoning
relation_to_stack:
  - deploy-as-is
  - build-on-top
  - study-and-reference
health_signals:
  - org-backed
  - actively-maintained
  - production-proven
ecosystem_role:
  - Alibaba's widely-adopted open-weight model generation spanning general, coding, and reasoning-specialized variants
best_for:
  - You need a mature, broadly-supported open-weight generation with dedicated coding (Qwen2.5-Coder) and math/reasoning (QwQ) variants alongside the general chat models
  - You want strong open-weight performance across a very wide range of sizes (0.5B to 72B) with proven production track record
avoid_if:
  - You want Alibaba's current frontier line — as of 2026 Alibaba has shipped Qwen3, Qwen3.5, and Qwen3.6/3.7 (hybrid Gated Delta Networks + sparse MoE architecture, 201-language support), which meaningfully outperform Qwen2.5 on reasoning and agentic benchmarks
  - You need the efficiency of a sparse MoE architecture — Qwen2.5's mainline models are dense; MoE variants arrived in the Qwen3.5+ generation
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: qwen-3
enrichment_status: reviewed
enrichment_notes: This entry's github_url (QwenLM/Qwen3) actually points to the Qwen3 repo, not Qwen2.5 -- a pre-existing data issue from the original population sprint, flagged here rather than silently corrected since fixing it requires a maintainer decision on re-scoping vs. URL correction.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: reddit
    url: https://www.reddit.com/r/Qwen_AI/comments/1mvl274/7_months_of_qwen_in_production_enterprise_what/
    date: '2025-08-20'
    description: Practitioner report of 7 months running Qwen in production enterprise workflows with 99.9% uptime across 50+ concurrent users on vLLM
featured: false
status: active
---

## Overview

Alibaba Cloud's open-weight model generation released in 2024, spanning general-purpose, coding-specialized (Qwen2.5-Coder), and reasoning-specialized (QwQ) variants across sizes from 0.5B to 72B parameters.

## Why it's in the Arsenal

Alibaba's widely-adopted open-weight model generation spanning general, coding, and reasoning-specialized variants. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need a mature, broadly-supported open-weight generation with dedicated coding (Qwen2.5-Coder) and math/reasoning (QwQ) variants alongside the general chat models. See Strengths / Limitations below before adopting it.

## Architecture

A dense decoder-only transformer family (no MoE in the mainline Qwen2.5 sizes) with dedicated post-training branches: Qwen2.5-Coder for code generation and QwQ as an early reasoning-focused variant using extended chain-of-thought training, predating the more thoroughly reasoning-optimized Qwen3 generation.

## Ecosystem Position

Upstream: standard transformer research, building on the original Qwen/Qwen2 line. Downstream: very broadly supported — vLLM, SGLang, Ollama, llama.cpp, and virtually every fine-tuning framework (Axolotl, Unsloth, LLaMA-Factory) support it. Competing: Llama 3, Gemma, Mistral at comparable sizes. Superseded by: Qwen3 and Alibaba's 2026 Qwen3.5/3.6/3.7 generation, which introduce sparse MoE and substantially expanded language coverage.

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

1. **Scenario**: you need a mature, broadly-supported open-weight generation with dedicated coding (Qwen2.5-Coder) and math/reasoning (QwQ) variants alongside the general chat models
2. **Scenario**: you want strong open-weight performance across a very wide range of sizes (0.5B to 72B) with proven production track record

## Strengths

- You need a mature, broadly-supported open-weight generation with dedicated coding (Qwen2.5-Coder) and math/reasoning (QwQ) variants alongside the general chat models
- You want strong open-weight performance across a very wide range of sizes (0.5B to 72B) with proven production track record

## Limitations

- You want Alibaba's current frontier line — as of 2026 Alibaba has shipped Qwen3, Qwen3.5, and Qwen3.6/3.7 (hybrid Gated Delta Networks + sparse MoE architecture, 201-language support), which meaningfully outperform Qwen2.5 on reasoning and agentic benchmarks
- You need the efficiency of a sparse MoE architecture — Qwen2.5's mainline models are dense; MoE variants arrived in the Qwen3.5+ generation

## Relation to the Arsenal

This project entry documents the Qwen2.5 model family's weights, architecture, and generational position (see the enrichment_notes flag about this entry's github_url data-quality issue). For a hosted/managed access path to a current Qwen model, see [Qwen 3](../../tools/model-layer/qwen-3.md) in the tools vertical — that entry does not repeat this one's best_for/avoid_if verbatim, since the frames differ: this entry is about the Qwen model family's architecture, the tool entry is about accessing a hosted Qwen model.

## Resources

- [GitHub](https://github.com/QwenLM/Qwen3)
- [Documentation](https://github.com/QwenLM/Qwen3)

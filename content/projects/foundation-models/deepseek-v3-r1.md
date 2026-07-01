---
id: deepseek-v3-r1
name: DeepSeek-V3 / R1
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: DeepSeek open-weight MoE and reasoning model family known for strong cost-performance
github_url: "https://github.com/deepseek-ai/DeepSeek-V3"
license: MIT
primary_language: Python
org_or_maintainer: null
tags: [llm, reasoning, inference, efficiency]
maturity: production
cost_model: open-source
github_stars: 103749
github_stars_last_30d: 0
trending_score: 30
last_commit: "2025-08-28"
docs_url: "https://github.com/deepseek-ai/DeepSeek-V3"
demo_url: null
paper_url: null
paper_id: null
hf_url: "https://huggingface.co/deepseek-ai"
model_sizes: [671B MoE, 1.5B distilled, 7B distilled, 8B distilled, 14B distilled, 32B distilled, 70B distilled]
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: foundation-model
domain: [language, reasoning]
relation_to_stack: [deploy-as-is, study-and-reference]
health_signals: [org-backed, actively-maintained, production-proven]
ecosystem_role:
  - Open-weight frontier-class reasoning and general-purpose model family, MIT-licensed
best_for:
  - You need frontier-class reasoning performance (R1) or general chat/coding performance (V3) in an MIT-licensed, self-hostable model
  - You have or can access multi-GPU infrastructure capable of serving a 671B-parameter MoE model (37B active per token) and want the best open-weight reasoning quality available
avoid_if:
  - You need to run inference on a single consumer GPU — even with only 37B active parameters, the full 671B parameter set must be resident for MoE routing, which requires serious multi-GPU or high-memory infrastructure
  - You need guaranteed data residency outside China-affiliated infrastructure for regulatory reasons — evaluate DeepSeek's terms of use and your own compliance requirements before adopting for regulated workloads
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Architecture figures (671B total/37B active, MLA, DeepSeekMoE 256 experts, MTP, FP8 training) are from DeepSeek's own technical report, corroborated by NVIDIA Megatron-Bridge docs and DeepSeek's architecture deepwiki. GitHub org shows ongoing 2026 tooling commits; core weight repos are stable, typical for released weights.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"conference","url":"https://www.informationweek.com/machine-learning-ai/will-enterprises-adopt-deepseek-","date":"2025-02-25","description":"InformationWeek reporting on enterprise adoption patterns: mature enterprises deploying private DeepSeek instances for data control while fine-tuning and running inference"}
featured: false
status: active
---

## Overview

An open-weight Mixture-of-Experts language model family from DeepSeek AI: V3 is the general-purpose base/chat model, and R1 is a reasoning-focused variant post-trained on top of it, both released under the MIT license.

## Why it's in the Arsenal

Open-weight frontier-class reasoning and general-purpose model family, MIT-licensed. It earns a place in the Arsenal because it directly addresses a recurring decision point: you need frontier-class reasoning performance (R1) or general chat/coding performance (V3) in an MIT-licensed, self-hostable model. See Strengths / Limitations below before adopting it.

## Architecture

671 billion total parameters with only 37 billion activated per token via a sparse Mixture-of-Experts design (256 routed experts, DeepSeekMoE). Uses Multi-head Latent Attention (MLA) to compress the KV cache and reduce memory pressure at inference, an auxiliary-loss-free load-balancing strategy across experts, a Multi-Token Prediction (MTP) module for speculative-decoding-style training/inference speedups, and native FP8 mixed-precision training — trained on 14.8 trillion tokens for roughly 2.788M H800 GPU-hours.

## Ecosystem Position

Upstream: builds on standard transformer and MoE research; R1 is post-trained on top of the V3-Base checkpoint. Downstream: supported directly by vLLM and SGLang for efficient MoE serving, and referenced heavily in subsequent open-weight reasoning-model research as a baseline. Competing: Qwen3/Qwen3.6, Llama 4, and Mistral Large 3 among open-weight frontier models; against closed models it is frequently benchmarked against GPT-4o-class and o1-class reasoning systems. Complementary: distilled smaller variants (DeepSeek-R1-Distill) are fine-tuned from other open base models (Llama, Qwen) using R1-generated training data.

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

1. **Scenario**: you need frontier-class reasoning performance (R1) or general chat/coding performance (V3) in an MIT-licensed, self-hostable model
2. **Scenario**: you have or can access multi-GPU infrastructure capable of serving a 671B-parameter MoE model (37B active per token) and want the best open-weight reasoning quality available

## Strengths

- You need frontier-class reasoning performance (R1) or general chat/coding performance (V3) in an MIT-licensed, self-hostable model
- You have or can access multi-GPU infrastructure capable of serving a 671B-parameter MoE model (37B active per token) and want the best open-weight reasoning quality available

## Limitations

- You need to run inference on a single consumer GPU — even with only 37B active parameters, the full 671B parameter set must be resident for MoE routing, which requires serious multi-GPU or high-memory infrastructure
- You need guaranteed data residency outside China-affiliated infrastructure for regulatory reasons — evaluate DeepSeek's terms of use and your own compliance requirements before adopting for regulated workloads

## Relation to the Arsenal

This is a foundation-model entry: it documents the weights, architecture, and ecosystem position of the model itself. For guidance on which inference engine or serving tool to use to actually run it in production, see the relevant entries under [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/deepseek-ai/DeepSeek-V3)
- [Documentation](https://github.com/deepseek-ai/DeepSeek-V3)

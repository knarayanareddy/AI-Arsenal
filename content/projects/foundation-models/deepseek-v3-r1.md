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

The case for DeepSeek-V3 / R1 rests on its documentation and observed adoption rather than on a controlled comparison here, so the sections below state what it claims to do and what adopting it would commit you to.

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

# Full weights and smaller distills live under the deepseek-ai org on Hugging Face (see Resources).
generate = pipeline("text-generation", model="deepseek-ai/DeepSeek-R1-Distill-Qwen-7B")
print(generate("Explain retrieval augmented generation in one sentence.", max_new_tokens=64)[0]["generated_text"])
```

## Key Use Cases

1. **Running it in anger**: the first real evaluation of DeepSeek-V3 / R1 is your own traffic, not the documentation's example; instrument latency, error rate and quality on a representative slice of data before the choice is load-bearing.
2. **What the DeepSeek-V3 / R1 scenarios have in common**: each turns on licence, context behaviour or hosting — the constraints a set of weights does not negotiate away.
3. **Before committing**: pick the criterion that would make you abandon this choice, write it down, and check it against a representative slice of your own data — a catalog entry can tell you what is claimed, only a run tells you what is true.

## Strengths

- Beyond the headline description, DeepSeek-V3 / R1's architecture section is the honest source: 671 billion total parameters with only 37 billion activated per token via a sparse Mixture-of-Experts design (256 routed experts, DeepSeekMoE). Uses Multi-head Latent Attention (MLA) to compress the KV cache and reduce memory pressure at inference, an auxiliary-loss-free load-balancing strategy across experts, a Multi-Token Prediction (MTP) module for speculative-decoding-style training/inference speedups, and native FP8 mixed-precision training — trained on 14.8 trillion tokens for roughly 2.788M H800 GPU-hours.
- It is a foundation-model entry in this catalog, so the comparison that matters is against the other foundation-model projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the DeepSeek-V3 / R1 footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Nothing in this entry substitutes for running DeepSeek-V3 / R1 against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- No alternative is catalogued alongside DeepSeek-V3 / R1 here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

As a foundation-model entry this documents the DeepSeek-V3/R1 weights and MoE architecture, not serving. The full 671B model needs multi-GPU serving (vLLM/SGLang handle its MoE efficiently), while the distilled 1.5B-70B variants run on far smaller setups — see [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/deepseek-ai/DeepSeek-V3)
- [Documentation](https://github.com/deepseek-ai/DeepSeek-V3)

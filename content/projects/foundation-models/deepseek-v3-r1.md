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
github_stars: 104597
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
health_signals: [org-backed, production-proven]
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
enrichment_notes: Architecture figures (671B total/37B active, MLA, DeepSeekMoE 256 experts, MTP, FP8 training) are from DeepSeek's own technical report, corroborated by NVIDIA Megatron-Bridge docs and DeepSeek's architecture deepwiki. The weight repository itself has not been pushed since 2025-08-28, which is normal for released weights, so actively-maintained was removed from health_signals on 2026-10-24.
added_date: "2026-06-13"
last_reviewed: "2026-10-24"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"conference","url":"https://www.informationweek.com/machine-learning-ai/will-enterprises-adopt-deepseek-","date":"2025-02-25","description":"InformationWeek reporting on enterprise adoption patterns: mature enterprises deploying private DeepSeek instances for data control while fine-tuning and running inference"}
featured: false
status: watching
---

## Overview

An open-weight Mixture-of-Experts language model family from DeepSeek AI: V3 is the general-purpose base/chat model, and R1 is a reasoning-focused variant post-trained on top of it, both released under the MIT license.

## Why it's in the Arsenal

The reason to keep this family in the catalogue is economic rather than architectural: R1 was the first open-weight reasoning model to reach o1-class benchmark scores — 79.8% pass@1 on AIME 2024 and 96.3% on MATH-500 in the paper's own evaluation — while publishing the training recipe and the 671B/37B MoE weights under MIT. That combination made "reason about it locally, with a model you can inspect" a real option instead of a hosted-API-only one, and it is why the family is the baseline later open reasoning models are compared against.

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

1. **Self-hosted reasoning over sensitive text**: the full R1 weights behind vLLM or SGLang when prompts cannot leave your network and the workload benefits from explicit chain-of-thought (log analysis, contract review, internal search synthesis).
2. **Distillation into a smaller model you already run**: `DeepSeek-R1-Distill-Qwen-7B`/`32B` and the Llama-8B distill are dense checkpoints fine-tuned on R1 trajectories, so a 7B model fits a single 24GB GPU while keeping part of the reasoning behaviour — the usual path when the 671B model is out of reach.
3. **A published baseline for reasoning comparisons**: MIT weights plus a paper that reports AIME, MATH-500, GPQA and LiveCodeBench numbers make it the reference point against which newer open reasoning models are measured.

## Strengths

- Sparse activation is the whole design: 37B of 671B parameters fire per token, so serving throughput tracks the active path while quality tracks the full model — the reason vLLM and SGLang both ship dedicated DeepSeek MoE kernels.
- MLA compresses the KV cache rather than quantizing it, which is what makes long-context serving of a 671B model practical on a single node of H800s.
- R1's reasoning is trained, not prompted: GRPO reinforcement learning on verifiable tasks produced the long chain-of-thought behaviour, and the 7B/32B distills transfer part of it to dense models.
- MIT licence on weights and code, with the training and evaluation methodology published — rare among frontier-scale releases and the basis for independent reproduction.

## Limitations

- The 671B checkpoint needs roughly 350GB+ of weights before KV cache, so it is a multi-GPU (or multi-node) deployment; the distills exist precisely because most teams cannot serve the full model.
- Reasoning traces are long by construction: output tokens dominate cost on R1-class models, and the latency profile is unsuitable for interactive chat without a smaller model in front.
- Safety filtering is lighter than on comparable Western releases, and the model is a text-only LLM — no image or audio input.
- Upstream is a released-weights repository rather than an evolving codebase: the last push was 2025-08-28, so improvements arrive as new model generations (V3.x, R1-0528) rather than as commits here.

## Relation to the Arsenal

As a foundation-model entry this documents the DeepSeek-V3/R1 weights and MoE architecture, not serving. The full 671B model needs multi-GPU serving (vLLM/SGLang handle its MoE efficiently), while the distilled 1.5B-70B variants run on far smaller setups — see [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/deepseek-ai/DeepSeek-V3)
- [Documentation](https://github.com/deepseek-ai/DeepSeek-V3)

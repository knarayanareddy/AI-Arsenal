---
id: ms-swift
name: "ms-swift"
version_tracked: null
artifact_type: framework
category: llms
subcategory: frameworks
description: "ModelScope's one-stop fine-tuning framework supporting 600+ LLMs and 300+ multimodal models with SFT, DPO, GRPO and Megatron backends"
github_url: "https://github.com/modelscope/ms-swift"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "ModelScope (Alibaba)"
tags: [fine-tuning, llm, multimodal]
maturity: production
cost_model: open-source
github_stars: 14751
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-08"
docs_url: "https://swift.readthedocs.io/en/latest/"
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain: [language, multimodal]
relation_to_stack: [build-on-top]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - "Alibaba's answer to LLaMA-Factory: the broadest model-coverage fine-tuning framework, especially strong on Chinese-ecosystem and multimodal models (Qwen-VL, InternVL, DeepSeek-VL) that other trainers support late or not at all."
best_for:
  - "You fine-tune Qwen-family or Chinese-ecosystem multimodal models — ms-swift typically has day-one training support because it is maintained by the same org"
  - "You need one framework spanning SFT, DPO/GRPO, sequence-parallel long-context training, quantized training, and Megatron-backed scale-out without switching stacks"
avoid_if:
  - "Your models are all Western-ecosystem text LLMs — Axolotl or LLaMA-Factory have larger English-speaking communities and more battle-tested recipes for that slice"
  - "You want minimal dependency surface — the framework's breadth (ModelScope hub integration, many optional backends) makes for a heavy install and complex failure modes"
upstream_dependencies: []
downstream_consumers: []
alternatives: [llamafactory, axolotl, unsloth]
integrates_with: [vllm]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (14,751), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/modelscope/ms-swift", "date": "2026-07-08", "description": "14,751 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

A fine-tuning and alignment framework from Alibaba's ModelScope covering 600+ text LLMs and 300+ multimodal models, with training paths from single-GPU LoRA to Megatron tensor-parallel runs. Its distinguishing strength is coverage breadth and freshness for the Qwen/Chinese open-model ecosystem, including vision-language and omni-modal models.

## Why it's in the Arsenal

ms-swift is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

## Architecture

A layered CLI (`swift sft`, `swift rlhf`, `swift infer`, `swift deploy`) over pluggable backends: PEFT-based tuners (LoRA, QLoRA, DoRA, and research tuners), DeepSpeed ZeRO or Megatron parallelism for scale, and vLLM/SGLang/LMDeploy for accelerated rollout and inference. RLHF support includes DPO, GRPO, PPO, KTO and reward-model training across both text and multimodal models.

## Ecosystem Position

Upstream: transformers, PEFT, DeepSpeed, Megatron, vLLM. Competing: LLaMA-Factory (closest in breadth-first philosophy), Axolotl (YAML-recipe culture), Unsloth (single-GPU speed). Complementary: tight ModelScope hub integration mirrors the HF-hub workflow for the Chinese model ecosystem; exported checkpoints remain HF-compatible.

## Getting Started

```bash
pip install ms-swift
swift sft --model Qwen/Qwen3-8B --dataset AI-ModelScope/alpaca-gpt4-data-en --train_type lora
```

## Key Use Cases

1. **Running it in anger**: the first real evaluation of ms-swift is your own traffic, not the documentation's example; instrument latency, error rate and quality on a representative slice of data before the choice is load-bearing.
2. **What dominates the decision**: `fine-tune`, `qwen-family`, `chinese-ecosystem`, `multimodal` are the variables that actually move the outcome for ms-swift in this phase, and none of them appear in a feature comparison.
3. **Choosing between candidates**: compare ms-swift against `llamafactory`, `axolotl`, `unsloth` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- The implementation detail worth checking before adopting ms-swift is specific — a layered CLI (swift sft, swift rlhf, swift infer, swift deploy) over pluggable backends: PEFT-based tuners (LoRA, QLoRA, DoRA, and research tuners), DeepSpeed ZeRO or Megatron parallelism for scale, and vLLM/SGLang/LMDeploy for accelerated rollout and inference. RLHF support includes DPO, GRPO, PPO, KTO and reward-model training across both text and multimodal models — because that is where the capability claim either survives contact with your data or does not.
- It is a training-and-alignment entry in this catalog, so the comparison that matters is against the other training-and-alignment projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the ms-swift footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Nothing in this entry substitutes for running ms-swift against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- Where ms-swift overlaps `llamafactory`, `axolotl`, `unsloth`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

This is the training-and-alignment entry for ms-swift in this phase, and the honest way to use it is as one candidate among the alternatives listed in the phase index rather than as a default. Read the Strengths and Limitations sections before adopting it: the operational cost, the model or service dependencies, and the failure behaviour are what decide whether it fits your workload, and none of those are settled by the feature list alone.

## Resources

- [GitHub](https://github.com/modelscope/ms-swift)
- [Documentation](https://swift.readthedocs.io/en/latest/)

---
*Last reviewed: 2026-07-08 by @maintainer; github_stars 14751 as of 2026-07-08; last commit 2026-07-08; both verified via the GitHub API.*

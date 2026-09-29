---
id: litgpt
name: "LitGPT"
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "Lightning AI's hackable library of 20+ LLM implementations with recipes to pretrain, fine-tune and deploy at scale"
github_url: "https://github.com/Lightning-AI/litgpt"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "Lightning AI"
tags: [fine-tuning, training, llm]
maturity: production
cost_model: open-source
github_stars: 13467
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-06"
docs_url: "https://github.com/Lightning-AI/litgpt/tree/main/tutorials"
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain: [language]
relation_to_stack: [build-on-top, fork-and-adapt, study-and-reference]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - "Readable single-file model implementations plus production training recipes: LitGPT occupies the space between educational nanoGPT-style code and heavyweight training frameworks, with each architecture reimplemented from scratch and no abstraction layers to dig through."
best_for:
  - "You want to actually read and modify the model code you train — every architecture is a from-scratch single-file implementation, not a wrapper over transformers"
  - "You need validated pretraining/fine-tuning recipes (FSDP, TPU support, LoRA/QLoRA) with Lightning Fabric handling the distributed plumbing"
avoid_if:
  - "You need day-one support for every new model release — the from-scratch implementation approach means new architectures land slower than in transformers-based trainers"
  - "You want a YAML-only, no-code fine-tuning experience — Axolotl or LLaMA-Factory are more config-driven"
upstream_dependencies: []
downstream_consumers: []
alternatives: [axolotl, llamafactory, torchtune]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (13,467), primary language, license, and last commit (2026-07-06) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/Lightning-AI/litgpt", "date": "2026-07-08", "description": "13,467 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

A library of 20+ LLM architectures reimplemented from scratch in readable PyTorch, with command-line recipes for pretraining, LoRA/QLoRA fine-tuning, continued pretraining, and deployment. The design bet is transparency: no framework indirection between you and the model code, while Lightning Fabric supplies distributed training (FSDP, DDP, TPU) when you scale.

## Why it's in the Arsenal

The case for LitGPT rests on its documentation and observed adoption rather than on a controlled comparison here, so the sections below state what it claims to do and what adopting it would commit you to.

## Architecture

Each model family (Llama, Gemma, Qwen, Phi, Mistral, and others) is a standalone implementation sharing a common GPT base class; configs are dataclasses, not registry magic. Training uses Lightning Fabric strategies for sharding; quantization paths (bitsandbytes) enable QLoRA on consumer GPUs; `litgpt serve` exposes an OpenAI-compatible endpoint for quick deployment.

## Ecosystem Position

Upstream: PyTorch and Lightning Fabric. Competing: Axolotl and LLaMA-Factory (config-driven fine-tuning), torchtune (Meta's PyTorch-native recipes). Complementary: checkpoints convert to/from Hugging Face format, and its readable implementations are frequently used as reference code when debugging other stacks — it was also the basis for several open pretraining projects (e.g. TinyLlama).

Compared with unlike `axolotl`, `llamafactory`; in the training-and-alignment phase; under a open-source cost model; with `litgpt`, `name`, `version`, LitGPT overlaps on what it does and diverges on how it is run. A feature comparison between the two will understate the difference; a deployment and cost comparison will not, and that is the comparison that should decide it.

## Getting Started

```bash
pip install 'litgpt[extra]'
litgpt download microsoft/phi-2
litgpt finetune_lora microsoft/phi-2 --data JSON --data.json_path my_data.json
```

## Key Use Cases

1. **Depending on it safely**: the work is the boundary — which calls go through LitGPT, what happens when it is slow, and what your system does instead, since those three answers determine whether adopting it is cheap or expensive.
2. **What dominates the decision**: `actually`, `read`, `modify`, `model` are the variables that actually move the outcome for LitGPT in this phase, and none of them appear in a feature comparison.
3. **Choosing between candidates**: compare LitGPT against `axolotl`, `llamafactory`, `torchtune` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- What LitGPT gives you that reading the feature list does not: each model family (Llama, Gemma, Qwen, Phi, Mistral, and others) is a standalone implementation sharing a common GPT base class; configs are dataclasses, not registry magic. Training uses Lightning Fabric strategies for sharding; quantization paths (bitsandbytes) enable QLoRA on consumer GPUs; litgpt serve exposes an OpenAI-compatible endpoint for quick deployment, which is the part you have to evaluate against your own workload.
- It is a training-and-alignment entry in this catalog, so the comparison that matters is against the other training-and-alignment projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for LitGPT is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- Documentation describes intended behaviour, not observed behaviour: latency, memory and failure rates for LitGPT at your scale need measuring before this informs a production decision.
- Where LitGPT overlaps `axolotl`, `llamafactory`, `torchtune`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

This is a self-hosted training and fine-tuning stack in content/projects/training-and-alignment, so it occupies the same slot as deepspeed, peft and trl rather than the managed fine-tuning services catalogued in content/tools/model-layer. The trade it makes is control: you supply the GPUs and the checkpoint, and in exchange you own the training loop, the memory configuration and every failure mode that comes with running the job yourself.

## Resources

- [GitHub](https://github.com/Lightning-AI/litgpt)
- [Documentation](https://github.com/Lightning-AI/litgpt/tree/main/tutorials)

---
*Last reviewed: 2026-07-08 by @maintainer; github_stars 13467 as of 2026-07-08; last commit 2026-07-06; both verified via the GitHub API.*

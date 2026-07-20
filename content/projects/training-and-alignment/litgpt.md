---
id: litgpt
name: LitGPT
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: Lightning AI's hackable library of 20+ LLM implementations with recipes to pretrain, fine-tune and deploy at scale
github_url: https://github.com/Lightning-AI/litgpt
license: Apache-2.0
primary_language: Python
org_or_maintainer: Lightning AI
tags:
  - fine-tuning
  - training
  - llm
maturity: production
cost_model: open-source
github_stars: 13491
github_stars_last_30d: 24
trending_score: 42
last_commit: '2026-07-20'
docs_url: https://github.com/Lightning-AI/litgpt/tree/main/tutorials
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain:
  - language
relation_to_stack:
  - build-on-top
  - fork-and-adapt
  - study-and-reference
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - 'Readable single-file model implementations plus production training recipes: LitGPT occupies the space between educational nanoGPT-style code and heavyweight training frameworks, with each architecture reimplemented from scratch and no abstraction layers to dig through.'
best_for:
  - You want to actually read and modify the model code you train — every architecture is a from-scratch single-file implementation, not a wrapper over transformers
  - You need validated pretraining/fine-tuning recipes (FSDP, TPU support, LoRA/QLoRA) with Lightning Fabric handling the distributed plumbing
avoid_if:
  - You need day-one support for every new model release — the from-scratch implementation approach means new architectures land slower than in transformers-based trainers
  - You want a YAML-only, no-code fine-tuning experience — Axolotl or LLaMA-Factory are more config-driven
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - axolotl
  - llamafactory
  - torchtune
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (13,467), primary language, license, and last commit (2026-07-06) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/Lightning-AI/litgpt
    date: '2026-07-08'
    description: 13,467 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

A library of 20+ LLM architectures reimplemented from scratch in readable PyTorch, with command-line recipes for pretraining, LoRA/QLoRA fine-tuning, continued pretraining, and deployment. The design bet is transparency: no framework indirection between you and the model code, while Lightning Fabric supplies distributed training (FSDP, DDP, TPU) when you scale.

## Why it's in the Arsenal

Readable single-file model implementations plus production training recipes: LitGPT occupies the space between educational nanoGPT-style code and heavyweight training frameworks, with each architecture reimplemented from scratch and no abstraction layers to dig through. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want to actually read and modify the model code you train — every architecture is a from-scratch single-file implementation, not a wrapper over transformers. See Strengths / Limitations below before adopting it.

## Architecture

Each model family (Llama, Gemma, Qwen, Phi, Mistral, and others) is a standalone implementation sharing a common GPT base class; configs are dataclasses, not registry magic. Training uses Lightning Fabric strategies for sharding; quantization paths (bitsandbytes) enable QLoRA on consumer GPUs; `litgpt serve` exposes an OpenAI-compatible endpoint for quick deployment.

## Ecosystem Position

Upstream: PyTorch and Lightning Fabric. Competing: Axolotl and LLaMA-Factory (config-driven fine-tuning), torchtune (Meta's PyTorch-native recipes). Complementary: checkpoints convert to/from Hugging Face format, and its readable implementations are frequently used as reference code when debugging other stacks — it was also the basis for several open pretraining projects (e.g. TinyLlama).

## Getting Started

```bash
pip install 'litgpt[extra]'
litgpt download microsoft/phi-2
litgpt finetune_lora microsoft/phi-2 --data JSON --data.json_path my_data.json
```

## Key Use Cases

1. **Scenario**: you want to actually read and modify the model code you train — every architecture is a from-scratch single-file implementation, not a wrapper over transformers
2. **Scenario**: you need validated pretraining/fine-tuning recipes (FSDP, TPU support, LoRA/QLoRA) with Lightning Fabric handling the distributed plumbing

## Strengths

- You want to actually read and modify the model code you train — every architecture is a from-scratch single-file implementation, not a wrapper over transformers
- You need validated pretraining/fine-tuning recipes (FSDP, TPU support, LoRA/QLoRA) with Lightning Fabric handling the distributed plumbing

## Limitations

- You need day-one support for every new model release — the from-scratch implementation approach means new architectures land slower than in transformers-based trainers
- You want a YAML-only, no-code fine-tuning experience — Axolotl or LLaMA-Factory are more config-driven

## Relation to the Arsenal

This is a training-and-alignment entry: it documents a training/fine-tuning/alignment stack you run yourself. For managed fine-tuning paths and adjacent tooling, see [tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/Lightning-AI/litgpt)
- [Documentation](https://github.com/Lightning-AI/litgpt/tree/main/tutorials)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (13,467 stars, last commit 2026-07-06, verified via GitHub API on 2026-07-08)*

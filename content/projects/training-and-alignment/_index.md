---
title: "Training and Alignment"
section: "projects/training-and-alignment"
auto_generated: false
---

# Training and Alignment

## What belongs here

Fine-tuning frameworks, RLHF/alignment toolkits, and dataset-curation tools for training and aligning models — the training-time counterpart to the inference-time [Inference Engines](../inference-engines/_index.md) folder.

## What does NOT belong here

The model weights that result from training belong in [Foundation Models](../foundation-models/_index.md); serving/inference runtimes belong in [Inference Engines](../inference-engines/_index.md).

## Relation to the Tools vertical

This folder currently has no migrated project entries — the catalog's fine-tuning-related projects (Axolotl, Unsloth, LLaMA-Factory, PEFT, torchtune, and others) are documented as **tools**, not projects, under `content/tools/model-layer/`, since for this catalog's population so far the primary framing has been "what do I reach for to fine-tune a model" (a tool decision) rather than "what do I study/contribute to" (a project decision). See [tools/model-layer/](../../tools/model-layer/_index.md) for that coverage.

## Decision guidance

Before adding an entry here, apply the Frame Decision gate from the projects-vertical reorganisation brief: is the primary value "use this to fine-tune a model" (tools/) or "study/extend/contribute to this training-and-alignment research artifact" (projects/, here)? Only add an entry to this folder if the latter is genuinely primary — do not duplicate an existing tools/model-layer/ entry without a deliberate frame justification recorded in its `corresponding_tool_entry` field.

## Projects in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Training And Alignment in This Phase

### Recently Added

- [The Alignment Handbook (Hugging Face)](./alignment-handbook.md)
- [Colossal-AI (HPC-AI Tech)](./colossalai.md)
- [LitGPT](./litgpt.md)
- [ms-swift](./ms-swift.md)
- [nanoGPT](./nanogpt.md)
- [Open R1 (Hugging Face)](./open-r1.md)
- [OpenRLHF](./openrlhf.md)
- [verl](./verl.md)

### Most Popular

- [nanoGPT](./nanogpt.md) — ⭐ 60962
- [Colossal-AI (HPC-AI Tech)](./colossalai.md) — ⭐ 41407
- [Open R1 (Hugging Face)](./open-r1.md) — ⭐ 26399
- [verl](./verl.md) — ⭐ 22377
- [ms-swift](./ms-swift.md) — ⭐ 14751
- [LitGPT](./litgpt.md) — ⭐ 13467
- [OpenRLHF](./openrlhf.md) — ⭐ 9769
- [The Alignment Handbook (Hugging Face)](./alignment-handbook.md) — ⭐ 5627

### Browse All

- [The Alignment Handbook (Hugging Face)](./alignment-handbook.md) — Hugging Face's reproducible post-training recipes — the exact configs and scripts behind Zephyr-class models for SFT, DPO, and ORPO on open weights
- [Colossal-AI (HPC-AI Tech)](./colossalai.md) — Large-model training system bundling tensor, pipeline, and sequence parallelism plus ZeRO/offload behind one API for training past single-GPU memory
- [LitGPT](./litgpt.md) — Lightning AI's hackable library of 20+ LLM implementations with recipes to pretrain, fine-tune and deploy at scale
- [ms-swift](./ms-swift.md) — ModelScope's one-stop fine-tuning framework supporting 600+ LLMs and 300+ multimodal models with SFT, DPO, GRPO and Megatron backends
- [nanoGPT](./nanogpt.md) — Karpathy's minimal ~600-line GPT training repository — the canonical starting point for understanding LLM pretraining
- [Open R1 (Hugging Face)](./open-r1.md) — Hugging Face's fully open reproduction of the DeepSeek-R1 reasoning pipeline — scripts and recipes to train reasoning models with GRPO-style RL
- [OpenRLHF](./openrlhf.md) — High-performance RLHF/RL training framework built on Ray, vLLM and DeepSpeed for PPO, GRPO and DPO at scale
- [verl](./verl.md) — ByteDance's flexible RL training library for LLMs implementing the HybridFlow paper, powering large-scale GRPO/PPO reasoning runs

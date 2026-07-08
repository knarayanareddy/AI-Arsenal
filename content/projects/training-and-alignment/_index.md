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

- [Colossal-AI (HPC-AI Tech)](./colossalai.md)
- [Open R1 (Hugging Face)](./open-r1.md)

### Most Popular

- [Colossal-AI (HPC-AI Tech)](./colossalai.md) — ⭐ 41407
- [Open R1 (Hugging Face)](./open-r1.md) — ⭐ 26399

### Browse All

- [Colossal-AI (HPC-AI Tech)](./colossalai.md) — Large-model training system bundling tensor, pipeline, and sequence parallelism plus ZeRO/offload behind one API for training past single-GPU memory
- [Open R1 (Hugging Face)](./open-r1.md) — Hugging Face's fully open reproduction of the DeepSeek-R1 reasoning pipeline — scripts and recipes to train reasoning models with GRPO-style RL

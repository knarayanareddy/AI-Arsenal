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

- [mlx-tune](./mlx-tune.md)
- [rLLM](./rllm.md)
- [Agent Lightning](./agent-lightning.md)
- [GPT-NeoX](./gpt-neox.md)
- [H2O LLM Studio](./h2o-llmstudio.md)
- [LoRA for Diffusion (cloneofsimo)](./lora-diffusion.md)
- [Oumi](./oumi.md)
- [Transformer Lab](./transformerlab.md)
- [VLM-R1](./vlm-r1.md)
- [VLM2Vec](./vlm2vec.md)

### Most Popular

- [nanoGPT](./nanogpt.md) — ⭐ 60962
- [Colossal-AI (HPC-AI Tech)](./colossalai.md) — ⭐ 41407
- [Open R1 (Hugging Face)](./open-r1.md) — ⭐ 26399
- [verl](./verl.md) — ⭐ 22377
- [Agent Lightning](./agent-lightning.md) — ⭐ 17381
- [ms-swift](./ms-swift.md) — ⭐ 14751
- [LitGPT](./litgpt.md) — ⭐ 13467
- [OpenRLHF](./openrlhf.md) — ⭐ 9769
- [Oumi](./oumi.md) — ⭐ 9342
- [LoRA for Diffusion (cloneofsimo)](./lora-diffusion.md) — ⭐ 7548

### Browse All

- [Agent Lightning](./agent-lightning.md) — A Microsoft framework for training and optimizing AI agents, including reinforcement learning, that decouples the training loop from any existing agent
- [The Alignment Handbook (Hugging Face)](./alignment-handbook.md) — Hugging Face's reproducible post-training recipes — the exact configs and scripts behind Zephyr-class models for SFT, DPO, and ORPO on open weights
- [Colossal-AI (HPC-AI Tech)](./colossalai.md) — Large-model training system bundling tensor, pipeline, and sequence parallelism plus ZeRO/offload behind one API for training past single-GPU memory
- [GPT-NeoX](./gpt-neox.md) — EleutherAI's library for large-scale model-parallel autoregressive transformer training on GPUs, built on Megatron and DeepSpeed
- [H2O LLM Studio](./h2o-llmstudio.md) — A framework and no-code GUI from H2O.ai for fine-tuning LLMs, supporting LoRA/QLoRA, RLHF/DPO, and experiment tracking without writing training code
- [LitGPT](./litgpt.md) — Lightning AI's hackable library of 20+ LLM implementations with recipes to pretrain, fine-tune and deploy at scale
- [LoRA for Diffusion (cloneofsimo)](./lora-diffusion.md) — An early, influential implementation of Low-Rank Adaptation for quickly fine-tuning Stable Diffusion, popularizing lightweight, composable diffusion adapters
- [mlx-tune](./mlx-tune.md) — Apple Silicon MLX fine-tuning toolkit for language, vision, audio, OCR, embedding, SFT, DPO, and GRPO workflows
- [ms-swift](./ms-swift.md) — ModelScope's one-stop fine-tuning framework supporting 600+ LLMs and 300+ multimodal models with SFT, DPO, GRPO and Megatron backends
- [nanoGPT](./nanogpt.md) — Karpathy's minimal ~600-line GPT training repository — the canonical starting point for understanding LLM pretraining
- [Open R1 (Hugging Face)](./open-r1.md) — Hugging Face's fully open reproduction of the DeepSeek-R1 reasoning pipeline — scripts and recipes to train reasoning models with GRPO-style RL
- [OpenRLHF](./openrlhf.md) — High-performance RLHF/RL training framework built on Ray, vLLM and DeepSpeed for PPO, GRPO and DPO at scale
- [Oumi](./oumi.md) — An end-to-end open platform to fine-tune, evaluate, and deploy foundation LLMs and VLMs, spanning data prep, training, evaluation
- [rLLM](./rllm.md) — Reinforcement-learning framework for training language agents across model backends, sandboxes, rollouts, and benchmarks
- [Transformer Lab](./transformerlab.md) — An open desktop research environment to download, train, fine-tune, evaluate, and chat with LLMs and diffusion models across local hardware and GPU clusters
- [verl](./verl.md) — ByteDance's flexible RL training library for LLMs implementing the HybridFlow paper, powering large-scale GRPO/PPO reasoning runs
- [VLM-R1](./vlm-r1.md) — Open framework for training vision-language models with reinforcement learning (GRPO/R1-style) to improve visual reasoning and grounded understanding
- [VLM2Vec](./vlm2vec.md) — Multimodal embedding and training framework covering VLM2Vec, MMEB, and later multimodal embedding benchmarks
- [XTuner](./xtuner.md) — Training engine and toolkit for efficient fine-tuning and large-scale MoE model training

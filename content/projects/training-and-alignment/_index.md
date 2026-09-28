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

- [LlamaFactory](./hiyouga-llamafactory.md)
- [lerobot](./huggingface-lerobot.md)
- [minimind](./jingyaogong-minimind.md)
- [nanochat](./karpathy-nanochat.md)
- [maestro](./maestro.md)
- [Speech](./nvidia-nemo-speech.md)
- [optuna](./optuna-optuna.md)
- [Qwen-VL-Series-Finetune](./qwen-vl-series-finetune.md)
- [s3prl](./s3prl-s3prl.md)
- [DeepSpec](./deepspec.md)

### Most Popular

- [LlamaFactory](./hiyouga-llamafactory.md) — ⭐ 75142
- [minimind](./jingyaogong-minimind.md) — ⭐ 62810
- [nanoGPT](./nanogpt.md) — ⭐ 60962
- [nanochat](./karpathy-nanochat.md) — ⭐ 58303
- [Colossal-AI (HPC-AI Tech)](./colossalai.md) — ⭐ 41407
- [lerobot](./huggingface-lerobot.md) — ⭐ 27825
- [Open R1 (Hugging Face)](./open-r1.md) — ⭐ 26399
- [verl](./verl.md) — ⭐ 22377
- [Agent Lightning](./agent-lightning.md) — ⭐ 18521
- [Speech](./nvidia-nemo-speech.md) — ⭐ 18518

### Browse All

- [Agent Lightning](./agent-lightning.md) — Microsoft's roughly 3,500-line agentic RL framework that inserts a proxy between your agent and its model so a real harness can be trained without modification
- [The Alignment Handbook (Hugging Face)](./alignment-handbook.md) — Hugging Face's reproducible post-training recipes — the exact configs and scripts behind Zephyr-class models for SFT, DPO, and ORPO on open weights
- [Colossal-AI (HPC-AI Tech)](./colossalai.md) — Large-model training system bundling tensor, pipeline, and sequence parallelism plus ZeRO/offload behind one API for training past single-GPU memory
- [DeepSpec](./deepspec.md) — DeepSeek's full-stack codebase for preparing data, training draft models, and evaluating speculative-decoding acceptance rates
- [GPT-NeoX](./gpt-neox.md) — EleutherAI's library for large-scale model-parallel autoregressive transformer training on GPUs, built on Megatron and DeepSpeed
- [H2O LLM Studio](./h2o-llmstudio.md) — A framework and no-code GUI from H2O.ai for fine-tuning LLMs, supporting LoRA/QLoRA, RLHF/DPO, and experiment tracking without writing training code
- [LlamaFactory](./hiyouga-llamafactory.md) — Apache-2.0 fine-tuning workbench covering 100+ LLM and VLM families behind one YAML config for LoRA, QLoRA, and RLHF
- [lerobot](./huggingface-lerobot.md) — Apache-2.0 robotics learning stack standardizing datasets, policies, and evaluation so imitation learning transfers across robot hardware
- [minimind](./jingyaogong-minimind.md) — Apache-2.0 minimal LLM codebase that pretrains and instruction-tunes a 64M-parameter model on one consumer GPU in roughly two hours
- [nanochat](./karpathy-nanochat.md) — MIT-licensed single-GPU recipe that pretrains, midtrains, and instruction-tunes a small chat model end to end in one repository
- [LitGPT](./litgpt.md) — Lightning AI's hackable library of 20+ LLM implementations with recipes to pretrain, fine-tune and deploy at scale
- [LoRA for Diffusion (cloneofsimo)](./lora-diffusion.md) — An early, influential implementation of Low-Rank Adaptation for quickly fine-tuning Stable Diffusion, popularizing lightweight, composable diffusion adapters
- [maestro](./maestro.md) — Roboflow's fine-tuning toolkit that packages config, data loading and training loops for Florence-2, PaliGemma 2 and Qwen2.5-VL
- [mlx-tune](./mlx-tune.md) — Apple Silicon MLX fine-tuning toolkit for language, vision, audio, OCR, embedding, SFT, DPO, and GRPO workflows
- [ms-swift](./ms-swift.md) — ModelScope's one-stop fine-tuning framework supporting 600+ LLMs and 300+ multimodal models with SFT, DPO, GRPO and Megatron backends
- [nanoGPT](./nanogpt.md) — Karpathy's minimal ~600-line GPT training repository — the canonical starting point for understanding LLM pretraining
- [Speech](./nvidia-nemo-speech.md) — NVIDIA NeMo speech stack for training and serving ASR, TTS, diarization, and translation models
- [Open R1 (Hugging Face)](./open-r1.md) — Hugging Face's fully open reproduction of the DeepSeek-R1 reasoning pipeline — scripts and recipes to train reasoning models with GRPO-style RL
- [OpenEnv](./openenv.md) — Hugging Face's Gymnasium-style interface library for isolated agent environments used in reinforcement-learning post-training and HF Spaces deployment
- [OpenRLHF](./openrlhf.md) — High-performance RLHF/RL training framework built on Ray, vLLM and DeepSpeed for PPO, GRPO and DPO at scale
- [optuna](./optuna-optuna.md) — Define-by-run hyperparameter optimization with pruning, distributed trials, and a study-based API
- [Oumi](./oumi.md) — An end-to-end open platform to fine-tune, evaluate, and deploy foundation LLMs and VLMs, spanning data prep, training, evaluation
- [Qwen-VL-Series-Finetune](./qwen-vl-series-finetune.md) — Single-repo training scripts for Qwen2-VL, Qwen2.5-VL, Qwen3-VL and Qwen3.5 spanning SFT, DPO, GRPO and classification
- [rLLM](./rllm.md) — Reinforcement-learning framework for training language agents across model backends, sandboxes, rollouts, and benchmarks
- [s3prl](./s3prl-s3prl.md) — Research toolkit that wraps dozens of self-supervised speech pretraining methods behind one hidden-state interface, so comparisons run through a single call
- [SkillOpt](./skillopt.md) — Microsoft's text-space optimizer for improving reusable natural-language agent skills from trajectory feedback while keeping the underlying LLM frozen
- [Transformer Lab](./transformerlab.md) — An open desktop research environment to download, train, fine-tune, evaluate, and chat with LLMs and diffusion models across local hardware and GPU clusters
- [verl](./verl.md) — ByteDance's flexible RL training library for LLMs implementing the HybridFlow paper, powering large-scale GRPO/PPO reasoning runs
- [VLM-R1](./vlm-r1.md) — Open framework for training vision-language models with reinforcement learning (GRPO/R1-style) to improve visual reasoning and grounded understanding
- [VLM2Vec](./vlm2vec.md) — Multimodal embedding and training framework covering VLM2Vec, MMEB, and later multimodal embedding benchmarks
- [XTuner](./xtuner.md) — Training engine and toolkit for efficient fine-tuning and large-scale MoE model training

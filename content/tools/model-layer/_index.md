---
title: "Model Layer Tools"
section: "tools/model-layer"
auto_generated: false
---

# Model Layer Tools

## What belongs here

LLM and image-model providers, local model runners, fine-tuning frameworks, model hubs/registries, and structured-generation libraries.

## What does NOT belong here

Hosting/serving infrastructure for those models belongs in Serving & Deployment; agent logic built on top of models belongs in Orchestration.

## Decision guidance

Before picking a tool in this phase, consider:

- See [Architecture Decision Trees](../../architectures/decision-trees/_index.md) for cross-cutting guidance.
- Key question to ask: Is this tool primarily about producing, training, or hosting model weights/outputs, not the pipeline around it?

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Model Layer in This Phase

### Recently Added

- [Hugging Face Accelerate](./accelerate.md)
- [ms-swift](./ms-swift.md)
- [PyTorch Lightning](./pytorch-lightning.md)
- [Ideogram](./ideogram.md)
- [Ideogram AI](./ideogram-ai.md)
- [Kimi K2.5](./kimi-k2-5.md)
- [Qwen 3](./qwen-3.md)
- [Axolotl](./axolotl.md)
- [DVC](./dvc.md)
- [Guidance](./guidance.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Hugging Face Accelerate](./accelerate.md) — Device-agnostic PyTorch training launcher — the same script runs on CPU, one GPU, multi-GPU, TPU, DeepSpeed, or FSDP via config, not code changes
- [Axolotl](./axolotl.md) — Configuration-driven fine-tuning framework for many open-weight LLM families
- [DVC](./dvc.md) — Open-source data and model versioning tool for ML projects and pipelines
- [Guidance](./guidance.md) — Microsoft guidance library for controlling and constraining language model generation
- [Hugging Face Hub](./hugging-face-hub.md) — Model, dataset, and Space hosting platform for sharing and versioning AI artifacts
- [Ideogram](./ideogram.md) — AI image generation with reliable text rendering in outputs
- [Ideogram AI](./ideogram-ai.md) — AI image generation platform with reliable text rendering and broad style coverage
- [Kimi K2.5](./kimi-k2-5.md) — AI assistant with deep understanding, analysis, and reasoning capabilities
- [LLaMA-Factory](./llamafactory.md) — Unified fine-tuning framework and UI for many LLMs and training methods
- [MLflow](./mlflow.md) — Open-source platform for experiment tracking, model registry, and ML lifecycle management
- [MLX-LM](./mlx-lm.md) — Apple MLX library for running and fine-tuning LLMs on Apple Silicon
- [ms-swift](./ms-swift.md) — ModelScope's fine-tuning and RLHF framework covering 500+ LLMs and 200+ multimodal models — the broadest coverage in open fine-tuning, strongest on Qwen
- [Outlines](./outlines.md) — A library for constrained generation and structured outputs with LLMs
- [PEFT](./peft.md) — Hugging Face library for parameter-efficient fine-tuning methods
- [PyTorch Lightning](./pytorch-lightning.md) — The organize-don't-abstract PyTorch training framework — LightningModule structures your code while the Trainer owns distribution and checkpointing
- [Qwen 3](./qwen-3.md) — Alibaba open-weight model family with multimodal and coding variants
- [torchtune](./torchtune.md) — PyTorch-native library for fine-tuning and experimenting with LLMs
- [Unsloth](./unsloth.md) — Efficient fine-tuning toolkit for Llama, Qwen, Mistral, and other open models
- [Weights & Biases](./weights-biases.md) — Experiment tracking and model management platform for ML and AI teams

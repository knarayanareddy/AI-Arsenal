---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: ARahim3
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 1
trending_score: 30
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: mlx-tune
name: mlx-tune
artifact_type: library
category: llms
subcategory: fine-tuning
description: Apple Silicon MLX fine-tuning toolkit for language, vision, audio, OCR, embedding, SFT, DPO, and GRPO workflows
github_url: https://github.com/ARahim3/mlx-tune
license: Apache-2.0
primary_language: Python
tags:
  - llm
  - fine-tuning
  - training
  - multimodal
  - voice
  - vision
  - local
maturity: beta
cost_model: open-source
github_stars: 1364
last_commit: '2026-06-23'
docs_url: https://arahim3.github.io/mlx-tune/
phase: training-and-alignment
domain:
  - language
  - vision
  - audio
relation_to_stack:
  - build-on-top
  - fork-and-adapt
health_signals:
  - community-driven
  - actively-maintained
ecosystem_role:
  - Apple-Silicon fine-tuning alternative that complements MLX model tooling without being an official Unsloth distribution
best_for:
  - Fine-tuning supported models locally on an Apple Silicon Mac
  - Porting an Unsloth-like training script to MLX before using CUDA infrastructure
avoid_if:
  - You need CUDA multi-node training or a model unsupported by the current MLX adapters
  - Your project requires official Unsloth support or identical numerical behavior
enrichment_notes: The README explicitly says mlx-tune is not an official Unsloth project; model and MLX-version compatibility require checking. Draft pending review.
---

## Overview

mlx-tune brings an Unsloth-compatible training style to Apple Silicon through MLX. Its scope spans language-model SFT, DPO, and GRPO as well as vision, TTS, STT, embeddings, OCR, and JEPA experiments, making it a workstation-oriented training toolkit rather than a single-purpose LoRA script.

## Why it's in the Arsenal

It earns a slot because Apple Silicon developers need a practical way to prototype adaptation workflows before renting CUDA capacity. The project is explicit that it solves code portability rather than claiming to replace Unsloth, which is a useful and honest distinction for the Arsenal.

## Architecture

The library exposes `FastLanguageModel`-style loading and trainer entry points over MLX, with LoRA/adaptor outputs and task-specific model wrappers. It supports Hugging Face model loading, quantized and non-quantized checkpoints, and separate entry points such as `FastJEPAModel`, `FastVideoJEPAModel`, and `LLMJEPATrainer`.

## Ecosystem Position

mlx-tune complements MLX-LM and Apple Silicon inference tools and competes with Unsloth for the workflow layer, but it is not an official Unsloth implementation. Its boundary is local adaptation and portability, not CUDA cluster scheduling or a hosted training service.

## Getting Started

Install with `pip install mlx-tune`, update imports from `unsloth_mlx` to `mlx_tune`, and follow the quick-start model-loading example. Select a supported Hugging Face checkpoint, run a small LoRA/SFT job on a Mac, and compare the saved adapter with the target CUDA workflow before scaling training.

## Key Use Cases

Use it for local instruction tuning, DPO/GRPO experiments, audio or OCR adaptation, and portability tests for scripts intended to move from Mac to CUDA. The JEPA entry points also support exploratory video and representation-learning work.

## Strengths

Broad task coverage, MLX-native execution, Hugging Face model loading, and a familiar API reduce the friction of adapting models on Apple hardware. The project also clearly documents its non-official relationship to Unsloth.

## Limitations

Apple Silicon is the primary target, and compatibility varies by model, quantization format, MLX version, and task wrapper. It is explicitly not official Unsloth; numerical parity, throughput, and CUDA portability should be verified rather than assumed.

## Relation to the Arsenal

It complements the Arsenal's training and inference entries and offers a local alternative to CUDA-first fine-tuning. Compared with rLLM, it performs parameter adaptation on one workstation rather than RL over agent environments.

## Resources

- [GitHub](https://github.com/ARahim3/mlx-tune)
- [Documentation](https://arahim3.github.io/mlx-tune/)

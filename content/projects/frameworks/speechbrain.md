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
org_or_maintainer: "speechbrain"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: speechbrain
name: "SpeechBrain"
artifact_type: framework
category: voice-audio
subcategory: frameworks
description: "A PyTorch-based conversational-AI toolkit spanning ASR, TTS, speaker recognition, enhancement, and spoken-language understanding with reproducible training"
github_url: https://github.com/speechbrain/speechbrain
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "voice"
  - "fine-tuning"
  - "multimodal"
  - "self-hosted"
maturity: production
cost_model: open-source
github_stars: 11678
last_commit: "2026-06-15"
docs_url: https://speechbrain.github.io
phase: framework
domain:
  - "audio"
relation_to_stack:
  - "build-on-top"
  - "fork-and-adapt"
health_signals:
  - "actively-maintained"
  - "research-origin"
  - "community-driven"
ecosystem_role:
  - "A unified PyTorch speech framework that provides models, training recipes, and pretrained checkpoints across most speech tasks."
best_for:
  - "You want one PyTorch framework to train, fine-tune, and evaluate models across many speech tasks with reproducible recipes"
  - "You are a researcher or engineer who needs building-block modules (features, augmentation, decoders) rather than a single fixed model"
avoid_if:
  - "You need a tiny embeddable runtime for edge devices, where onnxruntime-based tools fit better"
  - "You want a turnkey product; SpeechBrain is a toolkit that expects you to assemble and train pipelines"
enrichment_notes: "Repository, Apache-2.0 license, and 2026-06-15 activity verified via the GitHub API on 2026-07-12. A widely used academic and applied speech framework."
---

## Overview

SpeechBrain is a PyTorch-based toolkit for conversational AI that covers automatic speech recognition, text-to-speech, speaker recognition and diarization, speech enhancement and separation, and spoken-language understanding. It is organized around reusable modules and YAML-driven training recipes, so the same framework can train new models or run dozens of pretrained checkpoints.

## Why it's in the Arsenal

It is one of the most complete open speech frameworks and a common academic and industrial base for building custom models. Its breadth of tasks and reproducible recipes make it a canonical reference for the voice-audio category.

## Architecture

SpeechBrain expresses experiments as a `Brain` class plus a HyperPyYAML recipe that declares the models, features, and optimizers, which makes training loops reproducible and composable. It provides differentiable front ends (filterbanks, augmentation), encoder architectures (CRDNN, wav2vec2, conformer), and decoders (CTC, attention, transducer), and ships pretrained models on the Hugging Face Hub for immediate inference.

## Ecosystem Position

It competes with NVIDIA NeMo and ESPnet as a full speech framework and complements lightweight runtimes like sherpa-onnx, which serve exported models rather than training them. Compared with single-model releases such as StyleTTS 2, SpeechBrain is broader and more modular, trading turnkey convenience for flexibility across the whole speech-task spectrum.

## Getting Started

Install with `pip install speechbrain`, then either run inference via a pretrained interface such as `EncoderDecoderASR.from_hparams(...)` or clone a recipe under `recipes/` and launch training with a YAML config and `train.py`.

## Key Use Cases

Training and fine-tuning custom ASR/TTS models; speaker verification and diarization; speech enhancement research; building spoken-language-understanding pipelines; academic coursework and reproducible experiments.

## Strengths

Very broad task coverage, modular and reproducible YAML recipes, strong pretrained model hub, active maintenance, Apache-2.0 license, and a large research community.

## Limitations

As a training framework it has a substantial dependency footprint and a learning curve, it is not optimized as an embedded inference runtime, and top accuracy on any single task may require significant tuning versus a purpose-built model.

## Relation to the Arsenal

It anchors training-capable speech work in the voice-audio category alongside ESPnet and NeMo, and links to fine-tuning tips and serving entries.

## Resources

- [GitHub repository](https://github.com/speechbrain/speechbrain)
- [Documentation](https://speechbrain.github.io)

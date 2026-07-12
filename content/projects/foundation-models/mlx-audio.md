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
org_or_maintainer: "Blaizzy"
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
id: mlx-audio
name: "MLX Audio"
artifact_type: library
category: voice-audio
subcategory: open-source-models
description: "Speech library for Apple Silicon built on MLX, providing text-to-speech, speech-to-text, and speech-to-speech inference optimized for on-device use"
github_url: https://github.com/Blaizzy/mlx-audio
license: "MIT"
primary_language: "Python"
tags:
  - "voice"
  - "multimodal"
  - "local"
  - "edge"
  - "inference"
  - "efficiency"
maturity: beta
cost_model: open-source
github_stars: 7531
last_commit: "2026-07-10"
docs_url: https://blaizzy.github.io/mlx-audio/
phase: foundation-model
domain:
  - "audio"
  - "multimodal"
relation_to_stack:
  - "deploy-as-is"
  - "fork-and-adapt"
health_signals:
  - "actively-maintained"
  - "community-driven"
ecosystem_role:
  - "An MLX-based speech toolkit that runs TTS, STT, and speech-to-speech models locally on Apple Silicon with hardware-optimized inference."
best_for:
  - "You want on-device speech synthesis or transcription on Apple Silicon without sending audio to a cloud API."
  - "You are prototyping voice interfaces on Mac/iOS-class hardware and want MLX-optimized model runtimes."
avoid_if:
  - "You need cross-platform (NVIDIA/CPU) deployment; MLX targets Apple Silicon specifically."
  - "You require guaranteed accuracy for a regulated transcription workload without your own evaluation."
enrichment_notes: "Official repository, MIT license, and 2026-07-10 activity were reviewed on 2026-07-12. On-device performance varies by chip and model and remains draft."
---

## Overview

MLX Audio is a Python library for running speech models on Apple Silicon via Apple's MLX framework. It bundles text-to-speech, speech-to-text, and speech-to-speech pipelines with implementations tuned for the unified-memory architecture of M-series chips, enabling local, offline voice inference.

## Why it's in the Arsenal

On-device speech avoids the latency, cost, and privacy exposure of cloud audio APIs, and MLX is the emerging runtime for Apple hardware. This library is worth cataloguing as a concrete option for local voice pipelines and as a reference for how audio models are ported to MLX.

## Architecture

The library implements audio model architectures on top of MLX arrays and operators, exercising Metal-backed compute and unified memory. It exposes TTS, STT, and STS entry points, loads community model checkpoints, and provides a CLI and Python API. Because MLX compiles to Apple's GPU/ANE paths, throughput and memory use depend on the specific chip and model size.

## Ecosystem Position

MLX Audio competes with cross-platform runtimes (whisper.cpp for STT, PyTorch/ONNX TTS) but differentiates on Apple-Silicon GPU/ANE optimization; it complements the broader MLX ecosystem rather than the CUDA stack. Compared to cloud speech APIs it trades managed scale for privacy, offline use, and lower per-request latency, and it targets multimodal speech workloads on-device. Choose it when the deployment target is Apple hardware rather than a general server fleet.

## Getting Started

Install the package on an Apple Silicon Mac, run the CLI to synthesize a short phrase (TTS) or transcribe a clip (STT), and confirm audio quality and latency. Compare against a baseline model, then integrate the Python API and profile memory on your target chip before shipping.

## Key Use Cases

- Offline, privacy-preserving TTS/STT on Mac and Apple Silicon devices.
- Local voice-assistant and dictation prototypes.
- Speech-to-speech experiments without cloud dependencies.

## Strengths

- Optimized for Apple Silicon unified memory and Metal compute.
- Covers TTS, STT, and STS behind one library with a CLI and API.
- Local execution eliminates per-request cloud cost and audio egress.

## Limitations

- Apple Silicon only; no NVIDIA/CPU-server parity.
- Quality and speed vary by chip generation and model; large models strain memory.
- Model availability and API surface move quickly with the MLX ecosystem.

## Relation to the Arsenal

MLX Audio complements the catalog's local-inference and voice entries. Use the Arsenal's local-model and latency tips to size models to the target device and validate transcription accuracy before relying on it.

## Resources

- [Official source](https://github.com/Blaizzy/mlx-audio)
- [Documentation](https://blaizzy.github.io/mlx-audio/)

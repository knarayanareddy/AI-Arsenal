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
org_or_maintainer: magenta
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
id: magenta-realtime
name: Magenta RealTime 2
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: Google Magenta open-weight model for real-time and offline live-music generation
github_url: https://github.com/magenta/magenta-realtime
license: Apache-2.0
primary_language: Python
tags:
  - voice
  - streaming
  - foundational
maturity: beta
cost_model: open-source
github_stars: 1687
last_commit: '2026-07-16'
docs_url: https://magenta.github.io/magenta-realtime/
phase: foundation-model
domain:
  - audio
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - Open-weight live-music model that complements DAW plugins and audio-generation applications rather than general TTS
best_for:
  - Interactive musical improvisation on an Apple Silicon Mac
  - Offline music-generation experiments embedded in a Python application
avoid_if:
  - You need real-time generation on ordinary x86 CPU hardware
  - Your product requires speech synthesis, lyrics alignment, or a general-purpose audio model
enrichment_notes: Real-time streaming requires Apple Silicon; offline inference also supports NVIDIA GPUs. Draft pending review.
---

## Overview

Magenta RealTime 2 is an open-weight model for live music generation, designed around the latency and interaction constraints of a performer or improvising system. It provides a small and a larger checkpoint, a Python library for offline inference, and an Apple-Silicon path for streaming music in real time rather than only rendering a finished clip.

## Why it's in the Arsenal

It belongs in the Arsenal because it is a concrete open-weight audio foundation model with an unusual interaction target: a musician can steer a continuously running generator. Google Magenta backing, Apache-2.0 code, and a DAW/plugin-oriented project make it more useful than a benchmark-only music checkpoint.

## Architecture

MRT2 combines a streaming generation loop with model checkpoints exposed through the `magenta-rt` Python package. The small 230M model is intended to run in real time on Apple Silicon, while offline inference can run on any Apple Silicon Mac or NVIDIA GPU; the repository also documents a DAW plugin and application embedding route.

## Ecosystem Position

Magenta RealTime competes with hosted music-generation systems and complements DAW plugins, MIDI/audio tools, and the Arsenal's speech and multimodal models. Unlike a general TTS model, it optimizes for musical continuation and interactive timing, so its value is between a research checkpoint and a live performance component.

## Getting Started

Install `uv`, create a Python 3.12 environment with `uv venv --python 3.12`, and install `uv pip install "magenta-rt[mlx]"` for Apple Silicon. Download the `google/magenta-realtime-2` weights from Hugging Face, then follow the repository streaming example; use the Python offline path on NVIDIA when real-time Apple Silicon is unavailable.

## Key Use Cases

Use it for interactive accompaniment, generative music sketches, DAW experiments, and offline continuation of musical phrases. The streaming mode is the interesting path for human-in-the-loop systems; batch rendering and application embedding are better fits when latency is less strict.

## Strengths

The project ships open weights, a Python API, two model sizes, and a clear split between streaming and offline execution. The small checkpoint makes experimentation feasible on MacBook-class Apple hardware, while the larger model offers a quality/latency tradeoff within the same project.

## Limitations

Real-time streaming requires Apple Silicon and is not a generic low-latency cloud service. Music quality, timing stability, and memory use vary by model size and host integration; the project should not be substituted for speech or instrument-isolated audio models without testing.

## Relation to the Arsenal

It complements the Arsenal's voice-audio entries by covering live music rather than speech, and sits upstream of creative applications and DAW integrations. Compared with hosted music APIs, it offers local control but requires the operator to provide compatible Apple or NVIDIA hardware.

## Resources

- [GitHub](https://github.com/magenta/magenta-realtime)
- [Documentation](https://magenta.github.io/magenta-realtime/)
- [Model weights](https://huggingface.co/google/magenta-realtime-2)

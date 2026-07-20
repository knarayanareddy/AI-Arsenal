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
org_or_maintainer: coqui-ai
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 37
trending_score: 33
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: coqui-tts
name: Coqui TTS
artifact_type: framework
category: voice-audio
subcategory: frameworks
description: A deep-learning toolkit for text-to-speech with dozens of pretrained models, training recipes, and the XTTS multilingual voice-cloning model
github_url: https://github.com/coqui-ai/TTS
license: MPL-2.0
primary_language: Python
tags:
  - voice
  - fine-tuning
  - self-hosted
  - multimodal
  - llm
maturity: beta
cost_model: open-source
github_stars: 45782
last_commit: '2024-08-16'
docs_url: https://tts.readthedocs.io
phase: framework
domain:
  - audio
relation_to_stack:
  - build-on-top
  - fork-and-adapt
health_signals:
  - community-driven
  - research-origin
ecosystem_role:
  - A batteries-included TTS training and inference framework that spans acoustic models, vocoders, and end-to-end voice cloning.
best_for:
  - You want to fine-tune or self-host a high-quality TTS voice, including cloning from a few seconds of reference audio with XTTS
  - You need a research-grade framework with many model architectures (Tacotron, VITS, XTTS) and reproducible training recipes
avoid_if:
  - You need an actively maintained upstream; the original company wound down and pushes here effectively stopped in 2024, so treat it as community-maintained
  - You only need simple one-off synthesis and would be better served by a smaller single-model package or a hosted API
enrichment_notes: Repository, MPL-2.0 license, and last-commit date of 2024-08-16 verified via the GitHub API on 2026-07-12. The upstream company ceased operations; community forks continue. Included with an explicit maintenance caveat.
---

## Overview

Coqui TTS is a Python text-to-speech framework that bundles many acoustic models and vocoders together with training recipes and a unified inference API. Its best-known artifact is XTTS, a multilingual model that clones a voice from a short reference clip, but the toolkit also implements Tacotron2, Glow-TTS, VITS, and neural vocoders such as HiFi-GAN, making it a broad reference for speech synthesis.

## Why it's in the Arsenal

It remains one of the most complete open TTS codebases, and XTTS is still a common baseline for open voice cloning. It is valuable as a study reference and a fork-and-adapt base even though upstream development has stalled.

## Architecture

The framework separates the synthesis pipeline into a text front end (phonemization and tokenization), an acoustic model that predicts mel-spectrograms or latent audio tokens, and a vocoder that renders waveforms. XTTS uses a GPT-style decoder over discrete audio tokens conditioned on a speaker embedding derived from reference audio, giving zero-shot cloning. Training is configured through JSON/`config` objects and PyTorch Lightning-style trainers.

## Ecosystem Position

It competes with newer models such as fish-speech, StyleTTS2, and F5-TTS on quality, and with hosted APIs like ElevenLabs on convenience, but differentiates by offering a full training stack rather than a single checkpoint. Compared to those alternatives its advantage is breadth and self-hostability; its disadvantage is that maintenance has moved to the community rather than a funded team.

## Getting Started

Install with `pip install TTS`, then synthesize via the `tts` CLI or the `TTS` Python class, selecting a pretrained model such as `xtts_v2`. Voice cloning takes a `speaker_wav` reference; training uses the recipes under `TTS/bin/train_tts.py` with a dataset formatter.

## Key Use Cases

Self-hosted voiceover and narration; multilingual voice cloning for accessibility and localization; research baselines for new TTS methods; on-prem synthesis where sending audio to a cloud API is not acceptable.

## Strengths

Very broad model coverage, mature training recipes, strong multilingual XTTS cloning, permissive MPL-2.0 license, and extensive documentation accumulated over years of releases.

## Limitations

Upstream commits effectively stopped in 2024 after the company closed, so bug fixes and new models now depend on forks. Some model licenses (notably XTTS weights) carry non-commercial terms that must be checked separately, and the large dependency surface can be brittle on new PyTorch versions.

## Relation to the Arsenal

It anchors the voice-audio category as a training-capable counterpart to inference-only entries like whisper.cpp and piper, and cross-links to fine-tuning tips and serving patterns.

## Resources

- [GitHub repository](https://github.com/coqui-ai/TTS)
- [Documentation](https://tts.readthedocs.io)
- [XTTS model card](https://huggingface.co/coqui/XTTS-v2)

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
org_or_maintainer: PaddlePaddle
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 9
trending_score: 31
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: paddlespeech
name: PaddleSpeech
artifact_type: framework
category: voice-audio
subcategory: frameworks
description: An easy-to-use speech toolkit on PaddlePaddle covering streaming ASR with punctuation, streaming TTS, speaker verification, speech translation
github_url: https://github.com/PaddlePaddle/PaddleSpeech
license: Apache-2.0
primary_language: Python
tags:
  - voice
  - inference
  - fine-tuning
  - self-hosted
  - streaming
maturity: production
cost_model: open-source
github_stars: 12650
last_commit: '2026-06-21'
docs_url: https://paddlespeech.readthedocs.io
phase: framework
domain:
  - audio
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - org-backed
  - community-driven
ecosystem_role:
  - A PaddlePaddle-based speech framework offering streaming ASR/TTS, speaker verification, translation, and keyword spotting with pretrained models.
best_for:
  - You work in the PaddlePaddle ecosystem and want streaming ASR with punctuation and streaming TTS out of the box
  - You need strong Chinese speech support with a full task suite (verification, translation, keyword spotting)
avoid_if:
  - Your stack is PyTorch-only and adopting PaddlePaddle is undesirable
  - You need a minimal embedded runtime rather than a full framework
enrichment_notes: Repository, Apache-2.0 license, and 2026-06-21 activity verified via the GitHub API on 2026-07-12. Won a NAACL 2022 best-demo award; strongest for Chinese.
---

## Overview

PaddleSpeech is a speech toolkit built on Baidu's PaddlePaddle deep-learning framework. It provides streaming and non-streaming ASR with punctuation, streaming TTS with a text front end, speaker verification, end-to-end speech translation, and keyword spotting, with an emphasis on ease of use and ready-to-run pretrained models.

## Why it's in the Arsenal

It is the most complete speech framework in the PaddlePaddle ecosystem and offers strong Chinese support and streaming capabilities, making it a distinct, practical option for teams on that stack.

## Architecture

PaddleSpeech implements conformer/transformer ASR encoders with CTC and attention decoding, FastSpeech/VITS-style TTS acoustic models plus neural vocoders, and speaker-embedding models, all in PaddlePaddle. It exposes a command-line and Python API where a single call downloads and runs a pretrained model, and it includes a server module for streaming ASR/TTS deployment.

## Ecosystem Position

It parallels SpeechBrain, ESPnet, and NeMo as a full training-and-inference speech framework, differentiating by targeting PaddlePaddle rather than PyTorch and by strong Chinese-language coverage. Compared with those PyTorch toolkits it is the natural choice inside Baidu's ecosystem for teams training and serving speech models, and unlike lightweight runtimes it is a complete framework rather than an embedded engine.

## Getting Started

Install with `pip install paddlespeech` (and PaddlePaddle), then run tasks through the `paddlespeech` CLI (for example `paddlespeech asr --input audio.wav`) or the Python API; the server module launches streaming ASR/TTS endpoints.

## Key Use Cases

Streaming Chinese/English transcription with punctuation; streaming TTS services; speaker verification; speech translation and keyword spotting; fine-tuning speech models on PaddlePaddle.

## Strengths

Broad task coverage, streaming ASR/TTS, strong Chinese support, easy one-line model usage, active org-backed maintenance, and an Apache-2.0 license.

## Limitations

It requires the PaddlePaddle framework, which is less common than PyTorch outside China; documentation is partly Chinese-first; and, like other full frameworks, it is heavier than a purpose-built embedded runtime.

## Relation to the Arsenal

It adds a PaddlePaddle-based option to the voice-audio framework set alongside the PyTorch toolkits.

## Resources

- [GitHub repository](https://github.com/PaddlePaddle/PaddleSpeech)
- [Documentation](https://paddlespeech.readthedocs.io)

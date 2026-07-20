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
org_or_maintainer: modelscope
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 192
trending_score: 45
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: funasr
name: FunASR
artifact_type: framework
category: voice-audio
subcategory: frameworks
description: An industrial speech-recognition toolkit from Alibaba DAMO offering ASR, VAD, punctuation, diarization
github_url: https://github.com/modelscope/FunASR
license: MIT
primary_language: Python
tags:
  - voice
  - inference
  - self-hosted
  - streaming
  - multimodal
maturity: production
cost_model: open-source
github_stars: 19359
last_commit: '2026-07-20'
docs_url: https://modelscope.github.io/FunASR/
phase: framework
domain:
  - audio
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - org-backed
ecosystem_role:
  - An end-to-end ASR framework bundling non-autoregressive recognition, VAD, punctuation, and diarization with training and serving tooling.
best_for:
  - You need production Chinese/multilingual ASR with punctuation and diarization and want fast non-autoregressive decoding
  - You want one framework covering model training, fine-tuning, and an OpenAI-compatible serving endpoint
avoid_if:
  - Your priority is a tiny embeddable runtime rather than a full Python framework, where whisper.cpp or sherpa-onnx fit better
  - You need best-in-class accuracy on a language poorly covered by the shipped models
enrichment_notes: Repository, MIT license, and 2026-07-10 activity verified via the GitHub API on 2026-07-12. Speed multiples (e.g. 170x realtime) are project-reported and hardware-dependent.
---

## Overview

FunASR is an industrial speech-recognition toolkit from Alibaba's DAMO Academy that packages automatic speech recognition together with voice-activity detection, punctuation restoration, speaker diarization, and timestamp prediction. Its flagship models are the Paraformer family of non-autoregressive recognizers, and it ships both training recipes and an OpenAI-compatible serving path.

## Why it's in the Arsenal

It is one of the most complete open ASR frameworks for production, especially for Chinese, and its non-autoregressive Paraformer design is an instructive contrast to Whisper's autoregressive decoding. The bundled VAD, punctuation, and diarization make it a full pipeline rather than a bare model.

## Architecture

Paraformer performs non-autoregressive decoding: instead of predicting tokens one at a time, it predicts the output sequence in parallel using a continuous integrate-and-fire predictor for token count and a glancing-language-model training scheme, which yields large latency wins. FunASR wires this together with a VAD front end, a punctuation model, and a diarization stage, and exposes streaming and offline modes plus a websocket/server deployment.

## Ecosystem Position

It competes with Whisper-based stacks and NVIDIA NeMo on ASR quality but differentiates through non-autoregressive speed and strong Chinese support. Compared with lightweight runtimes like sherpa-onnx it is a heavier, training-capable framework rather than an embedded inference library, so the two are complementary.

## Getting Started

Install with `pip install funasr`, load a pipeline via the `AutoModel` interface with a Paraformer checkpoint, and call `generate()` on audio; the runtime SDK and Docker images provide an OpenAI-compatible websocket server for production serving.

## Key Use Cases

Production Chinese and multilingual transcription; call-center and meeting analytics with diarization and punctuation; streaming captions; ASR model fine-tuning on domain audio.

## Strengths

Fast non-autoregressive decoding, complete pipeline (VAD, punctuation, diarization), strong Chinese accuracy, active org-backed maintenance, MIT license, and an OpenAI-compatible serving mode.

## Limitations

It is a large Python framework with a nontrivial dependency footprint, documentation is partly Chinese-first, shipped models are strongest for Chinese and a handful of other languages, and reported real-time multiples depend heavily on hardware and model size.

## Relation to the Arsenal

It anchors training-capable ASR in the voice-audio category alongside embedded runtimes and cross-links to serving and observability entries.

## Resources

- [GitHub repository](https://github.com/modelscope/FunASR)
- [Documentation](https://modelscope.github.io/FunASR/)
- [Paraformer paper](https://arxiv.org/abs/2206.08317)

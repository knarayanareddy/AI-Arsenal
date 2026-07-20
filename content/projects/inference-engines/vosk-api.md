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
org_or_maintainer: alphacep
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 31
trending_score: 32
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: vosk-api
name: Vosk
artifact_type: library
category: voice-audio
subcategory: inference-engines
description: An offline speech-recognition API with small, portable Kaldi-based models and bindings for Python, Java, C#, Node, and mobile, supporting 20+ languages
github_url: https://github.com/alphacep/vosk-api
license: Apache-2.0
primary_language: Python
tags:
  - voice
  - inference
  - self-hosted
  - streaming
maturity: production
cost_model: open-source
github_stars: 14962
last_commit: '2026-07-02'
docs_url: https://alphacephei.com/vosk/
phase: inference-engine
domain:
  - audio
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A lightweight offline ASR runtime with compact streaming models and broad language bindings for embedded and desktop use.
best_for:
  - You need small-footprint, streaming offline speech recognition on mobile, Raspberry Pi, or desktop across many languages
  - You want simple per-language model packs and bindings in Python, Java, C#, or Node without a heavy ML stack
avoid_if:
  - You need top-tier accuracy on noisy or accented audio, where larger Whisper-class models do better
  - You require rich features like diarization or emotion, which broader toolkits provide
enrichment_notes: Repository, Apache-2.0 license, and 2026-07-02 activity verified via the GitHub API on 2026-07-12. Accuracy depends on the chosen model pack.
---

## Overview

Vosk is an offline speech-recognition API built on the Kaldi engine that ships small, portable acoustic and language models for 20+ languages. It focuses on streaming recognition with a tiny footprint, so it runs on Android, iOS, Raspberry Pi, and servers, and exposes a simple API through bindings for Python, Java, C#, Node, and more.

## Why it's in the Arsenal

Vosk is a long-standing, practical choice for embedded and privacy-sensitive ASR where model size and streaming latency matter more than absolute accuracy, and its wide language and platform coverage make it a useful, distinct entry.

## Architecture

Under the hood Vosk wraps Kaldi's weighted-finite-state-transducer decoding with neural acoustic models, packaging each language as a downloadable model directory (often tens of megabytes). It performs streaming recognition by feeding audio chunks to a `KaldiRecognizer` that emits partial and final hypotheses, and it supports speaker-adaptation and custom vocabulary/grammar constraints for domain terms.

## Ecosystem Position

It competes with whisper.cpp and sherpa-onnx in the offline ASR space, differentiating on very small models and mature streaming rather than peak accuracy. Compared with Whisper-class models it trades recognition quality for footprint and latency, and unlike cloud APIs it needs no network, making it complementary to heavier recognizers when resources are tight.

## Getting Started

Install with `pip install vosk`, download a language model from the Vosk model list, then create a `Model` and `KaldiRecognizer`, feed audio bytes, and read JSON results; equivalent APIs exist in the other language bindings.

## Key Use Cases

Embedded and mobile voice commands; offline dictation on constrained devices; streaming captions where low latency matters; domain-restricted recognition with custom grammars.

## Strengths

Very small models, mature streaming, broad language and platform support, custom-vocabulary constraints, active maintenance, and an Apache-2.0 license.

## Limitations

Accuracy trails large Whisper-class models, especially on noisy or accented speech; it lacks higher-level features like diarization and emotion; and quality varies significantly by the specific downloaded model pack.

## Relation to the Arsenal

It rounds out on-device ASR options in the voice-audio category next to whisper.cpp and sherpa-onnx.

## Resources

- [GitHub repository](https://github.com/alphacep/vosk-api)
- [Vosk models and docs](https://alphacephei.com/vosk/)

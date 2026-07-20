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
org_or_maintainer: k2-fsa
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 154
trending_score: 42
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: sherpa-onnx
name: sherpa-onnx
artifact_type: library
category: voice-audio
subcategory: inference-engines
description: An offline, on-device speech toolkit (STT, TTS, diarization, VAD, enhancement) built on next-gen Kaldi and onnxruntime with bindings for a dozen languages and
github_url: https://github.com/k2-fsa/sherpa-onnx
license: Apache-2.0
primary_language: C++
tags:
  - voice
  - inference
  - self-hosted
  - streaming
  - multimodal
maturity: production
cost_model: open-source
github_stars: 13667
last_commit: '2026-07-20'
docs_url: https://k2-fsa.github.io/sherpa/onnx/index.html
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
  - A cross-platform on-device speech runtime that unifies ASR, TTS, VAD, diarization, and enhancement behind one onnxruntime-based API.
best_for:
  - You need offline speech features (STT, TTS, VAD, diarization) embedded on mobile, embedded, or edge hardware without a cloud dependency
  - You want one runtime that exposes the same models across C++, Python, Swift, Kotlin, Go, Rust, and the browser
avoid_if:
  - You want a single named SOTA model rather than a runtime that hosts many exported models
  - Your deployment is a cloud GPU service where a Python/PyTorch serving stack is simpler to tune
enrichment_notes: Repository, Apache-2.0 license, and 2026-07-10 activity verified via the GitHub API on 2026-07-12. Accuracy depends on the specific exported model chosen, not the runtime.
---

## Overview

sherpa-onnx is an offline speech toolkit from the next-gen Kaldi (k2-fsa) project that runs speech-to-text, text-to-speech, speaker diarization, voice-activity detection, speech enhancement, and source separation entirely on device using onnxruntime. It targets an unusually wide matrix of platforms and programming languages, making it a practical runtime for embedding speech into native and embedded applications.

## Why it's in the Arsenal

It consolidates the whole on-device speech stack behind one dependency-light runtime with no internet requirement, which is exactly what edge and privacy-sensitive products need. Its breadth across platforms is rare among open speech tools.

## Architecture

Models are exported to ONNX and executed by onnxruntime, so the same C++ core runs on x86, ARM, RISC-V, and various NPUs. It ships streaming and non-streaming ASR (transducer and CTC models), VITS-style TTS, VAD, and diarization pipelines, exposes them through a stable C API, and wraps that API in a dozen language bindings plus a websocket server/client for networked use.

## Ecosystem Position

It complements whisper.cpp (which focuses on the Whisper family) by hosting a broader set of ASR and TTS models and additional tasks like diarization and enhancement. Compared with cloud speech APIs it trades managed scale for offline, private, zero-cost operation, and it sits above raw onnxruntime by providing ready speech pipelines rather than bare tensor execution.

## Getting Started

Install the Python package with `pip install sherpa-onnx` or build the C++ library, download a pretrained model bundle from the project's model zoo, then run the matching example (for example `sherpa-onnx` for offline ASR or the streaming microphone demo). Mobile and WASM builds follow platform-specific guides.

## Key Use Cases

On-device transcription and captions; embedded voice assistants; speaker diarization for meeting tools; VAD and enhancement front ends; browser-based speech via WASM.

## Strengths

Truly offline operation, very broad platform and language support, multiple speech tasks in one runtime, active maintenance, and a permissive Apache-2.0 license.

## Limitations

It is a runtime, not a model, so quality depends entirely on the exported checkpoint you choose, and you must convert or download compatible ONNX models. The multi-platform build system has a learning curve, and cutting-edge large models may not yet have exported versions.

## Relation to the Arsenal

It anchors on-device speech inference in the voice-audio category alongside whisper.cpp and piper, and connects to streaming-latency observability guidance.

## Resources

- [GitHub repository](https://github.com/k2-fsa/sherpa-onnx)
- [Documentation](https://k2-fsa.github.io/sherpa/onnx/index.html)

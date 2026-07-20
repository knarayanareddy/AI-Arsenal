---
id: faster-whisper
name: faster-whisper
version_tracked: null
artifact_type: library
category: voice-audio
subcategory: inference-engines
description: Whisper reimplemented on CTranslate2 — up to 4x faster transcription than openai/whisper at equal accuracy, with int8 quantization for CPU and modest GPUs
github_url: https://github.com/SYSTRAN/faster-whisper
license: MIT
primary_language: Python
org_or_maintainer: SYSTRAN
tags:
  - voice
  - inference
  - quantization
maturity: production
cost_model: open-source
github_stars: 24397
github_stars_last_30d: 283
trending_score: 63
last_commit: '2025-11-19'
docs_url: https://github.com/SYSTRAN/faster-whisper#readme
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain:
  - audio
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - org-backed
  - production-proven
ecosystem_role:
  - 'The de facto production runtime for Whisper: same models, same accuracy, a fraction of the compute — the default backend that downstream speech tooling (WhisperX, speech-to-text servers, home-automation assistants) builds on instead of openai/whisper'
best_for:
  - You're deploying Whisper transcription at scale or on constrained hardware — CTranslate2's fused kernels plus int8/float16 quantization cut latency and memory ~4x with no accuracy loss, changing the cost math of speech pipelines
  - You need batch transcription throughput — the batched inference pipeline multiplies throughput further on long-audio workloads
avoid_if:
  - You need word-level timestamps with high precision or speaker diarization — that's WhisperX's layer on top, not faster-whisper's job
  - You want maximum-accuracy streaming/realtime ASR with sub-second latency — Whisper's 30-second-window architecture is the wrong base; purpose-built streaming models fit better
upstream_dependencies: []
downstream_consumers:
  - whisperx
alternatives:
  - whisper
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (24.1k), MIT, and last push (2025-11-19) verified via the GitHub API on 2026-07-08 — release cadence is slower than app-layer projects, consistent with a mature runtime. The ~4x speed and quantization figures are the project's own benchmarks against openai/whisper, widely corroborated by community reports but not re-measured here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/SYSTRAN/faster-whisper
    date: '2026-07-08'
    description: 24.1k stars, MIT, backbone of the Whisper deployment ecosystem
featured: false
status: active
---

## Overview

faster-whisper runs OpenAI's Whisper models on CTranslate2, a C++ inference engine for transformers with fused kernels, layer caching, and weight quantization. Same checkpoints, same outputs — around 4× the speed of the reference implementation at float16, with int8 modes that make large-v3 practical on CPUs and small GPUs. It is the engine most of the speech ecosystem quietly runs on.

## Why it's in the Arsenal

Whisper made open speech recognition good; faster-whisper made it economical. When transcription cost or latency is the constraint, swapping the reference implementation for faster-whisper is the highest-leverage single change available — a drop-in with no accuracy trade. Its role as the substrate for downstream speech tooling (WhisperX and most self-hosted STT servers) makes it infrastructure, not merely an optimization.

## Architecture

Whisper weights converted to CTranslate2 format; inference through CTranslate2's optimized encoder-decoder runtime (fused attention kernels, KV caching, dynamic batching) with float16/int8_float16/int8 compute types; Python API mirroring common Whisper usage plus a BatchedInferencePipeline for throughput workloads; built-in Silero VAD filtering to skip non-speech.

## Ecosystem Position

Upstream: Whisper model family (including distil-whisper and large-v3-turbo conversions), CTranslate2. Downstream: `whisperx` (alignment/diarization layer), speech-to-text server projects, and countless embedded transcription features. Competing: whisper.cpp (C/C++, edge-focused) and hosted STT APIs on the buy side.

## Getting Started

```python
from faster_whisper import WhisperModel

model = WhisperModel("large-v3", device="cuda", compute_type="float16")
segments, info = model.transcribe("audio.mp3", vad_filter=True)
for s in segments:
    print(f"[{s.start:.2f} -> {s.end:.2f}] {s.text}")
```

## Key Use Cases

1. **Scenario**: production transcription pipelines (meetings, podcasts, call centers) where GPU cost per audio-hour is the metric — 4x throughput is a 4x cost cut
2. **Scenario**: local/on-prem transcription on modest hardware — int8 large-v3 on CPU or an 8GB GPU, keeping audio data on-device

## Strengths

- ~4x faster than openai/whisper at equal accuracy, with quantization options that reference Whisper lacks — verified repeatedly by the project's benchmarks and community measurements
- Boring in the best way: MIT, SYSTRAN-maintained, API-stable, and battle-tested as the base layer of the open speech stack

## Limitations

- Inherits Whisper's architectural limits: 30-second windowing, hallucination on silence/noise (mitigated but not solved by VAD), and no native diarization or precise word timing
- Slower release cadence (last push 2025-11) — fine for a mature runtime, but new Whisper-family variants can take time to land

## Relation to the Arsenal

The inference-engine layer of the open speech stack — `whisperx` builds directly on it for alignment and diarization; contrast with hosted STT covered in voice-audio tooling. The quantization trade-offs discussed in [tips-and-tricks](../../tips-and-tricks/_index.md) apply directly to its compute-type choices.

## Resources

- [GitHub](https://github.com/SYSTRAN/faster-whisper)
- [CTranslate2](https://github.com/OpenNMT/CTranslate2)

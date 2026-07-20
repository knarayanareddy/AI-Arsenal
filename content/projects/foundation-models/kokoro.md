---
id: kokoro
name: Kokoro TTS
version_tracked: null
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: 82M-parameter open TTS that punches far above its size — Apache-2.0 weights, near-instant CPU-capable synthesis, and browser/edge deployment via ONNX
github_url: https://github.com/hexgrad/kokoro
license: Apache-2.0
primary_language: Python
org_or_maintainer: hexgrad
tags:
  - self-hosted
  - inference
  - efficiency
maturity: production
cost_model: open-source
github_stars: 8052
github_stars_last_30d: 164
trending_score: 53
last_commit: '2025-08-06'
docs_url: https://github.com/hexgrad/kokoro
demo_url: https://huggingface.co/spaces/hexgrad/Kokoro-TTS
paper_url: null
paper_id: null
phase: foundation-model
domain:
  - audio
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - community-driven
  - production-proven
ecosystem_role:
  - 'The efficiency pole of open TTS: 82M parameters (roughly 1/100th of flagship systems) delivering quality that topped community TTS arenas, under Apache-2.0 — the model that made ''just bundle TTS into the app'' viable, spawning ONNX/WASM ports that run in browsers, on edge boxes, and on CPUs'
best_for:
  - Voice output for applications where TTS is a feature, not the product — assistants, reading modes, notifications — with negligible compute cost and permissive licensing
  - 'Edge/embedded/browser deployment: kokoro-onnx and web ports run where no GPU exists; real-time synthesis on modest CPUs'
avoid_if:
  - You need voice cloning or emotional/expressive range — Kokoro ships a fixed voice set (voicepack embeddings) and trades expressiveness for size; F5-TTS/Chatterbox-class systems own cloning
  - You need long-form prosody consistency at audiobook quality — flagship-scale systems still lead on naturalness over long passages
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - f5-tts
  - chatterbox
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (7.9k repo; the model's reach is better measured by its HF download volume, consistently among the top TTS models), Apache-2.0, last push 2025-08-06 verified via the GitHub API on 2026-07-08 — checkpoint-release cadence. Arena-ranking claim reflects TTS-Arena community results at release; below the usual star bar, admitted as the efficiency anchor of open TTS.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/hexgrad/kokoro
    date: '2026-07-08'
    description: 7.9k stars; top HF-downloads open TTS at 82M parameters
featured: false
status: active
---

## Overview

Kokoro is an 82M-parameter open-weight TTS model (StyleTTS2-lineage architecture) released under Apache-2.0 with a set of prebuilt voices across English variants and several other languages. Its defining property is the quality-per-parameter ratio: synthesis quality that ranked at or near the top of community TTS arenas from a model small enough to run real-time on CPUs, in browsers via ONNX/WASM, and on edge devices.

## Why it's in the Arsenal

Most TTS decisions aren't "best possible voice" but "good voice at negligible cost," and Kokoro redefined that trade-off: two orders of magnitude smaller than flagship systems at comparable perceived quality for short-form speech. Its Apache-2.0 license and ONNX portability made it the default embedded/self-hosted voice for open assistants and apps — the efficiency anchor against which larger TTS entries should be judged.

## Architecture

A StyleTTS2-derived non-autoregressive pipeline: phoneme input (espeak-ng G2P via the misaki library) conditioned on per-voice style embeddings ("voicepacks"), a decoder-only acoustic path with ISTFTNet-style vocoding — no diffusion at inference, which is where the speed comes from. Distributed as PyTorch weights and community ONNX exports.

## Ecosystem Position

Lineage: StyleTTS2 (architecture), trained largely on synthetic audio. Peers: `f5-tts` (cloning, flow-matching), `chatterbox` (production cloning), Piper (older edge-TTS standard it largely superseded on quality). Downstream: kokoro-onnx, kokoro-web, FastAPI wrappers, and integrations in open assistant stacks (Open WebUI-class ecosystems).

## Getting Started

```bash
pip install kokoro soundfile
```

```python
from kokoro import KPipeline
pipeline = KPipeline(lang_code="a")  # American English
for _, _, audio in pipeline("Hello from Kokoro.", voice="af_heart"):
    ...  # 24kHz audio chunks
```

## Key Use Cases

1. **Scenario**: adding spoken responses to a self-hosted assistant or app with CPU-only real-time synthesis and no licensing friction
2. **Scenario**: fully client-side TTS — browser reading modes, offline devices — via ONNX/WASM ports where cloud APIs aren't an option

## Strengths

- The quality-per-parameter outlier of open TTS: the 82M size is the capability (CPU real-time, browser-deployable, pennies to serve)
- Apache-2.0 weights with a clean voicepack system and a large downstream integration ecosystem

## Limitations

- No cloning, fixed voices, limited expressive range — by design; pair with a cloning system when voices must be custom
- Single-maintainer release cadence (last repo push 2025-08); language coverage beyond English varies in quality

## Relation to the Arsenal

The small-fast pole of the TTS trio with `f5-tts` (cloning/quality) and `chatterbox` (production cloning); the natural voice-output stage after `faster-whisper` recognition in self-hosted voice pipelines.

## Resources

- [GitHub](https://github.com/hexgrad/kokoro)
- [Model weights](https://huggingface.co/hexgrad/Kokoro-82M)
- [Demo Space](https://huggingface.co/spaces/hexgrad/Kokoro-TTS)

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
org_or_maintainer: rhasspy
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 30
trending_score: 32
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: archived
id: piper-tts
name: Piper
artifact_type: library
category: voice-audio
subcategory: inference-engines
description: A fast, local neural text-to-speech system optimized for the Raspberry Pi and low-power devices, using VITS-based voices exported to onnxruntime
github_url: https://github.com/rhasspy/piper
license: MIT
primary_language: C++
tags:
  - voice
  - inference
  - self-hosted
  - streaming
maturity: production
cost_model: open-source
github_stars: 11244
last_commit: '2025-08-26'
docs_url: https://rhasspy.github.io/piper-samples/
phase: inference-engine
domain:
  - audio
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - community-driven
  - actively-maintained
ecosystem_role:
  - A lightweight offline TTS runtime that renders VITS voices with onnxruntime for embedded and accessibility use.
best_for:
  - You need fast, fully offline speech synthesis on a Raspberry Pi, embedded board, or CPU-only server
  - You want a large library of ready-made local voices for many languages behind a simple command-line/streaming interface
avoid_if:
  - You need zero-shot voice cloning or highly expressive prosody, which larger models provide
  - You want to train new voices without an ML pipeline; Piper focuses on running exported voices
enrichment_notes: Repository, MIT license, and 2025-08-26 activity verified via the GitHub API on 2026-07-12. Widely used in the Home Assistant/Rhasspy ecosystem.
---

## Overview

Piper is a fast, local neural text-to-speech system designed to run well on low-power hardware such as the Raspberry Pi. It uses VITS-based voice models exported to ONNX and executed with the onnxruntime engine, and it ships a large collection of ready-made voices across many languages, making high-quality offline speech accessible on modest devices.

## Why it's in the Arsenal

Piper is the de facto local TTS engine for the open smart-home and accessibility ecosystem (Home Assistant, Rhasspy). Its combination of speed, offline operation, and a broad prebuilt voice library fills a very practical deployment niche.

## Architecture

Each Piper voice is a VITS model, an end-to-end variational architecture that couples a text encoder, a stochastic duration predictor, and a normalizing-flow decoder to generate waveforms directly, exported to ONNX. The C++ runtime streams text through onnxruntime and emits audio incrementally, so latency stays low even on ARM CPUs, and voices are distributed as small `.onnx` files with JSON configs.

## Ecosystem Position

Piper competes with cloud TTS APIs on the offline/embedded front and complements heavier models like Coqui XTTS or fish-speech, which offer cloning and expressiveness at much higher compute cost. Compared with those, Piper deliberately trades flexibility for speed and footprint, and it is the standard choice within the Home Assistant/Rhasspy voice stack rather than a general research toolkit.

## Getting Started

Download the Piper binary and a voice model, then run `echo 'Hello world' | piper -m en_US-voice.onnx --output_file out.wav`; Python bindings and a streaming HTTP server exist, and Home Assistant integrates it directly.

## Key Use Cases

Offline voice output for smart-home assistants; accessibility and screen-reader speech; embedded devices and kiosks; low-latency local narration.

## Strengths

Very fast on CPUs and ARM boards, fully offline, large multilingual voice library, tiny model files, MIT license, and deep integration with the open smart-home ecosystem.

## Limitations

Voices are fixed VITS checkpoints, so there is no zero-shot cloning and limited prosody control; expressiveness trails large generative models; training new voices requires a separate pipeline; and upstream cadence is community-paced.

## Relation to the Arsenal

It complements whisper.cpp and sherpa-onnx as the TTS side of the on-device voice-audio stack and links to agent and smart-home build examples.

## Resources

- [GitHub repository](https://github.com/rhasspy/piper)
- [Voice samples](https://rhasspy.github.io/piper-samples/)

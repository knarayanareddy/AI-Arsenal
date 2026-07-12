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
org_or_maintainer: "Uberi"
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
id: speechrecognition
name: "SpeechRecognition (Python)"
artifact_type: library
category: voice-audio
subcategory: libraries
description: "A long-standing Python library offering one simple API over many speech-to-text engines and APIs, both offline and online, including Whisper, Vosk"
github_url: https://github.com/Uberi/speech_recognition
license: "BSD-3-Clause"
primary_language: "Python"
tags:
  - "multimodal"
  - "self-hosted"
  - "inference"
maturity: production
cost_model: open-source
github_stars: 8972
last_commit: "2026-06-16"
docs_url: https://github.com/Uberi/speech_recognition
phase: inference-engine
domain:
  - "audio"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "actively-maintained"
  - "community-driven"
ecosystem_role:
  - "A unifying Python API over many speech-to-text engines, easing prototyping and engine switching."
best_for:
  - "You want one simple Python API to try multiple STT engines (Whisper, Vosk, cloud) without rewrites"
  - "You are prototyping voice input and want microphone capture plus recognition in a few lines"
avoid_if:
  - "You need the deepest control over a specific engine's advanced features and streaming internals"
  - "You need a production streaming ASR service rather than a convenience wrapper"
enrichment_notes: "Repository, BSD-3-Clause license, and 2026-06-16 activity verified via the GitHub API on 2026-07-12. A wrapper; underlying engines/APIs have their own accuracy, cost, and keys."
---

## Overview

SpeechRecognition is a long-standing Python library that provides one simple API over many speech-to-text engines and services, both offline and online. It wraps engines such as OpenAI Whisper and Vosk for local recognition and cloud APIs from Google, Azure, and others, and it includes microphone capture and audio-file handling, so developers can add speech-to-text with minimal code and swap engines easily.

## Why it's in the Arsenal

It remains the fastest way to prototype speech input in Python and to compare STT engines behind a single interface, making it a practical, enduring voice-audio entry despite being a wrapper rather than a model.

## Architecture

The library exposes a `Recognizer` that captures audio (from a microphone via PyAudio or from files) into a normalized `AudioData` object, then dispatches recognition to a chosen backend through methods like `recognize_whisper`, `recognize_vosk`, or `recognize_google`. Each backend adapter handles that engine's model loading or API call and returns transcribed text, so the audio-handling and engine-selection layers are decoupled from the underlying recognizer.

## Ecosystem Position

SpeechRecognition sits above concrete engines like Whisper, Vosk, and cloud STT APIs, complementing rather than competing with them by offering a unifying interface. Compared with calling an engine directly it trades some advanced control for portability and quick engine switching, and compared with a streaming ASR service it is a convenience library for capture-and-recognize workflows.

## Getting Started

Install with `pip install SpeechRecognition` (plus a backend like `openai-whisper` or `vosk` and `pyaudio` for the mic), create a `Recognizer`, capture from `Microphone()` or an audio file, then call the backend method (for example `recognize_whisper`) to get text.

## Key Use Cases

Prototyping voice input; comparing STT engines behind one API; transcribing audio files; adding microphone speech-to-text to Python apps.

## Strengths

One API over many engines, offline and online backends, microphone and file capture, easy engine switching, long-standing maturity, and a permissive BSD license.

## Limitations

It is a wrapper, so accuracy, cost, latency, and API keys depend on the underlying engine, it exposes less advanced control than using an engine directly, and it targets capture-and-recognize rather than production streaming ASR.

## Relation to the Arsenal

It is the unifying convenience layer above the speech-to-text engines in the catalog's voice-audio entries.

## Resources

- [GitHub repository](https://github.com/Uberi/speech_recognition)

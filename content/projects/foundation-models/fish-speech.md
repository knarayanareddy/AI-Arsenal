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
org_or_maintainer: "fishaudio"
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
id: fish-speech
name: "Fish Speech"
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: "An open text-to-speech model family using a dual autoregressive transformer over grouped audio tokens with the Firefly neural codec for fast"
github_url: https://github.com/fishaudio/fish-speech
license: "NOASSERTION"
primary_language: "Python"
tags:
  - "voice"
  - "multimodal"
  - "self-hosted"
  - "llm"
  - "streaming"
maturity: beta
cost_model: open-source
github_stars: 31234
last_commit: "2026-06-09"
docs_url: https://speech.fish.audio
phase: foundation-model
domain:
  - "audio"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "community-driven"
ecosystem_role:
  - "A high-fidelity multilingual TTS model that uses a dual autoregressive transformer over codec tokens for zero-shot voice cloning and streaming."
best_for:
  - "You need high-quality, low-latency multilingual synthesis with zero-shot cloning that is actively maintained"
  - "You want a modern codec-token TTS architecture you can self-host and integrate with a streaming voice loop"
avoid_if:
  - "You cannot resolve non-standard licensing; the repository license is reported as NOASSERTION and must be verified before commercial use"
  - "You need a stable, unchanging API, since the model line iterates quickly across versions"
enrichment_notes: "Repository and 2026-06-09 activity verified via the GitHub API on 2026-07-12. License metadata is NOASSERTION (custom terms); confirm licensing and any model-weight terms before adoption."
---

## Overview

Fish Speech is an actively developed open text-to-speech model family aimed at high-fidelity, multilingual synthesis with zero-shot voice cloning. It pairs a transformer language model over discrete audio tokens with the project's Firefly neural audio codec, and is designed to support streaming generation for interactive voice applications.

## Why it's in the Arsenal

It is one of the more capable and actively maintained open TTS lines, and its dual-AR + codec design is representative of where modern speech generation is heading. That makes it a strong, current baseline for open voice synthesis.

## Architecture

The system encodes waveforms into grouped discrete tokens with the Firefly codec, then a dual autoregressive transformer predicts those tokens from text and a reference-speaker prompt: a slow global transformer models sequence structure while a fast local head predicts the grouped codebook tokens per frame. The codec decoder reconstructs the waveform, and the token-by-token design enables streaming and zero-shot cloning from a short reference clip.

## Ecosystem Position

Fish Speech competes with XTTS, ChatTTS, and StyleTTS2 on open TTS quality and differentiates on active maintenance, multilingual reach, and streaming latency. Compared with hosted services like ElevenLabs it trades managed convenience for self-hostability, and it complements ASR models rather than overlapping with them.

## Getting Started

Install from the repo or use the provided Docker image and WebUI, download the model weights, then run inference with a reference audio prompt for cloning or plain text for the default voice. An API server mode supports streaming integration.

## Key Use Cases

Interactive voice agents needing low-latency speech; multilingual narration and dubbing; zero-shot cloning for personalized voices; research on codec-based TTS.

## Strengths

High fidelity, active development, multilingual support, streaming-friendly token generation, and a self-hostable server with a usable WebUI.

## Limitations

The license is reported as NOASSERTION, meaning custom terms that must be read before commercial deployment; model weights may carry their own conditions. The architecture is compute-heavier than parallel vocoders, and rapid version churn means integrations can break between releases.

## Relation to the Arsenal

It represents the current frontier of open TTS in the voice-audio category and cross-links to serving and streaming-latency observability entries.

## Resources

- [GitHub repository](https://github.com/fishaudio/fish-speech)
- [Documentation](https://speech.fish.audio)

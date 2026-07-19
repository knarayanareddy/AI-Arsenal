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
org_or_maintainer: "QwenLM"
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
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: qwen3-tts
name: "Qwen3-TTS"
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: "Alibaba's open-source TTS series for expressive speech synthesis, voice cloning, and voice design across ten languages"
github_url: https://github.com/QwenLM/Qwen3-TTS
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "voice"
  - "multimodal"
  - "self-hosted"
  - "streaming"
maturity: beta
cost_model: open-source
github_stars: 12480
last_commit: "2026-03-17"
docs_url: https://huggingface.co/collections/Qwen/qwen3-tts
phase: foundation-model
domain:
  - "audio"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "org-backed"
  - "actively-maintained"
ecosystem_role:
  - "Open multilingual TTS family for voice agents, cloning, and voice design"
  - "Self-hosted alternative to provider-only speech APIs"
best_for:
  - "Multilingual voice assistants with streaming responses"
  - "Voice cloning or designed voices for controlled product experiences"
avoid_if:
  - "You need strict speaker-consent and provenance controls not supplied by the model"
  - "Your product cannot provision GPU inference or review generated speech"
enrichment_notes: "Verified against the cached README and GitHub metadata; model quality and voice similarity claims remain workload-dependent. Draft pending review."
---

## Overview

Qwen3-TTS packages 0.6B and 1.7B text-to-speech checkpoints into a family that separates ordinary synthesis from voice cloning and voice design. The ten-language target and 12 Hz speech tokenizer make it a practical foundation for conversational audio, while its open weights expose more control than a black-box provider API.

## Why it's in the Arsenal

Qwen3-TTS earns a slot as an open speech model family that covers synthesis, voice cloning, and voice design rather than only one fixed speaker style. The 0.6B and 1.7B checkpoints, ten-language target, and vLLM path give engineers a practical choice between footprint and expressiveness.

## Architecture

The pipeline combines a text model with a compact speech tokenizer and supports reference-audio conditioning for cloning plus textual descriptions for voice design. The README documents Python inference and vLLM serving, with streaming-oriented generation that can reduce perceived latency in an agent response.

## Ecosystem Position

Qwen3-TTS complements local voice stacks such as open TTS runtimes and competes with hosted speech providers on control and deployment cost. Its Apache-2.0 code and checkpoints are more useful for self-hosted products than a provider-only API, although production teams still need their own safety and consent layer.

## Getting Started

Create a Python environment, install the repository dependencies, and download a Qwen3-TTS checkpoint from the linked Hugging Face collection. Start with the supplied Python inference example, then try the vLLM serving path before wiring streaming audio into an agent.

## Key Use Cases

Use the smaller checkpoint for multilingual spoken responses or accessibility narration, and use reference audio when a product needs a consistent voice. Voice-design prompts are also useful for prototyping distinct characters without training a speaker model from scratch.

## Strengths

The family spans 0.6B and 1.7B sizes, supports ten languages, exposes both cloning and text-described voice design, and uses a 12 Hz tokenizer. Documented vLLM support makes the model easier to place behind a self-hosted service.

## Limitations

The ten-language coverage is not equivalent to uniform quality across accents, prosody, or noisy reference clips. Voice cloning creates consent and impersonation risks, and GPU memory, streaming latency, and vLLM compatibility should be measured for the selected checkpoint rather than inferred from the model card.

## Relation to the Arsenal

Qwen3-TTS complements the voice-audio models and inference engines in the Arsenal, while sitting downstream of foundation-model serving and upstream of spoken agents. It is a model choice alongside other open TTS entries, not a replacement for consent, moderation, or audio delivery infrastructure.

## Resources

- [GitHub](https://github.com/QwenLM/Qwen3-TTS)
- [Hugging Face collection](https://huggingface.co/collections/Qwen/qwen3-tts)

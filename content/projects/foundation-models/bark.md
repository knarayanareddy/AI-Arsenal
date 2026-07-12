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
org_or_maintainer: "suno-ai"
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
id: bark
name: "Bark"
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: "A transformer text-to-audio model from Suno that generates speech, non-speech sounds, music, and sound effects from text prompts via GPT-style audio tokens and"
github_url: https://github.com/suno-ai/bark
license: "MIT"
primary_language: "Python"
tags:
  - "voice"
  - "multimodal"
  - "self-hosted"
  - "llm"
maturity: beta
cost_model: open-source
github_stars: 39191
last_commit: "2024-08-19"
docs_url: https://github.com/suno-ai/bark
phase: foundation-model
domain:
  - "audio"
relation_to_stack:
  - "deploy-as-is"
  - "study-and-reference"
health_signals:
  - "research-origin"
  - "community-driven"
ecosystem_role:
  - "A generative text-to-audio model that produces speech plus laughter, music, and sound effects rather than clean read-aloud narration only."
best_for:
  - "You want expressive, creative audio generation including non-speech sounds, music cues, and multilingual speech from a single model"
  - "You need an MIT-licensed model to study GPT-style audio token generation with the EnCodec codec"
avoid_if:
  - "You need reliable, controllable, word-accurate narration; Bark is generative and can hallucinate or drift from the text"
  - "You need active upstream maintenance, since development effectively paused in 2024"
enrichment_notes: "Repository, MIT license, and last commit 2024-08-19 verified via the GitHub API on 2026-07-12. Maintenance has stalled; included as a canonical study reference with that caveat."
---

## Overview

Bark is a transformer-based text-to-audio model from Suno that generates not just speech but also laughter, sighs, music, and sound effects from a text prompt. Rather than a conventional TTS pipeline, it treats audio generation as language modeling over discrete audio tokens, which gives it a distinctive, expressive, sometimes unpredictable output character.

## Why it's in the Arsenal

Bark was an influential early demonstration that GPT-style token modeling could produce rich, general audio, and its MIT license and clear codebase make it a valuable reference even though it is no longer state of the art.

## Architecture

Bark runs a cascade of transformers: a text-to-semantic model maps text to coarse semantic tokens, a coarse acoustic model predicts EnCodec codebook tokens, and a fine acoustic model fills in the remaining codebook levels; Meta's EnCodec decoder renders the final 24 kHz waveform. Speaker consistency is achieved through history prompts rather than explicit speaker embeddings, and non-verbal cues are expressed with bracketed hints in the text.

## Ecosystem Position

Compared with narration-focused TTS such as Coqui XTTS or StyleTTS2, Bark is broader (any audio) but less controllable, so it complements rather than replaces them. Its token-cascade design foreshadowed later codec-token models like fish-speech, and unlike hosted music/audio services it is fully self-hostable under a permissive license.

## Getting Started

Install with `pip install bark` (or from the repo), then call `generate_audio(text_prompt)` and write the returned array with `scipy.io.wavfile`. History prompts select preset speakers, and small-model flags reduce VRAM for consumer GPUs.

## Key Use Cases

Creative sound and voice generation for media; prototyping expressive multilingual speech; generating sound effects and ambience; studying multi-stage audio token modeling.

## Strengths

Generates a wide range of audio beyond speech, supports many languages, permissive MIT license, and a compact well-documented cascade that is easy to learn from.

## Limitations

As a generative model it can deviate from the input text, insert artifacts, or produce inconsistent speakers, so it is unreliable for exact transcription-faithful narration. Development stalled in 2024, generation is relatively slow, and output length per call is bounded, requiring stitching for long content.

## Relation to the Arsenal

It provides historical and architectural grounding for the voice-audio category and links to newer codec-token TTS entries that built on the same ideas.

## Resources

- [GitHub repository](https://github.com/suno-ai/bark)
- [EnCodec (Meta)](https://github.com/facebookresearch/encodec)

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
org_or_maintainer: netease-youdao
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 5
trending_score: 30
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: emotivoice
name: EmotiVoice
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: A multi-voice, prompt-controlled text-to-speech engine from NetEase Youdao that synthesizes English and Chinese speech with explicit emotion control via style
github_url: https://github.com/netease-youdao/EmotiVoice
license: Apache-2.0
primary_language: Python
tags:
  - voice
  - multimodal
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 8491
last_commit: '2024-08-13'
docs_url: https://github.com/netease-youdao/EmotiVoice
phase: foundation-model
domain:
  - audio
relation_to_stack:
  - deploy-as-is
  - study-and-reference
health_signals:
  - research-origin
  - community-driven
ecosystem_role:
  - A prompt-controlled TTS engine that steers emotional style through natural-language prompts across 2000+ preset voices.
best_for:
  - You need emotion-controllable English/Chinese speech driven by simple style prompts across many preset voices
  - You want an Apache-2.0 TTS engine with an easy web UI and batch scripting for expressive output
avoid_if:
  - You need active upstream maintenance, since commits slowed after 2024
  - You need zero-shot cloning of arbitrary voices rather than a fixed preset voice bank
enrichment_notes: Repository, Apache-2.0 license, and last commit 2024-08-13 verified via the GitHub API on 2026-07-12. Included with a maintenance caveat.
---

## Overview

EmotiVoice is a multi-voice, prompt-controlled text-to-speech engine from NetEase Youdao that synthesizes English and Chinese speech with explicit emotion control. Its distinguishing feature is a style prompt: alongside the text to speak, the user supplies a natural-language description of the desired emotion, and the model conditions its prosody on that prompt over a bank of thousands of preset voices.

## Why it's in the Arsenal

Prompt-driven emotion control is a distinct, useful capability, and EmotiVoice packages it with a large preset voice bank and a friendly UI, making expressive bilingual TTS approachable.

## Architecture

EmotiVoice combines a FastSpeech-style acoustic model with a style encoder that ingests the emotion prompt, so the predicted prosody (pitch, energy, duration) is modulated by the prompt embedding rather than fixed per voice. A neural vocoder renders the waveform, and speaker identity is selected from thousands of preset voice embeddings rather than cloned from reference audio.

## Ecosystem Position

It competes with ChatTTS and StyleTTS 2 on expressive control but differentiates by exposing emotion through explicit text prompts rather than sampled latent styles or oral-control tokens. Compared with cloning-first models like OpenVoice it uses a preset voice bank instead of zero-shot cloning, positioning it as a controllable synthesis engine rather than a voice-copy tool.

## Getting Started

Clone the repository, download the pretrained models, and run the provided web demo or scripts, supplying the text plus an emotion prompt and selecting a preset voice; an OpenAI-compatible API mode is included for integration.

## Key Use Cases

Expressive bilingual narration; emotional voice for characters and assistants; batch generation across many preset voices; research on prompt-controlled prosody.

## Strengths

Explicit prompt-based emotion control, thousands of preset voices, bilingual English/Chinese support, a usable web UI and API, and an Apache-2.0 license.

## Limitations

Upstream activity slowed after 2024, it uses preset voices rather than zero-shot cloning, emotion control is prompt-conditioned and can be inconsistent, and language strength is centered on English and Chinese.

## Relation to the Arsenal

It adds prompt-controlled emotional TTS to the voice-audio category alongside the other expressive models.

## Resources

- [GitHub repository](https://github.com/netease-youdao/EmotiVoice)

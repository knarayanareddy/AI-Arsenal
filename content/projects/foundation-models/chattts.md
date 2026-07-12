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
org_or_maintainer: "2noise"
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
id: chattts
name: "ChatTTS"
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: "A generative speech model tuned for natural conversational dialogue in English and Chinese, with fine-grained prosody and laughter control tokens"
github_url: https://github.com/2noise/ChatTTS
license: "AGPL-3.0"
primary_language: "Python"
tags:
  - "voice"
  - "multimodal"
  - "self-hosted"
  - "llm"
  - "streaming"
maturity: beta
cost_model: open-source
github_stars: 39599
last_commit: "2026-04-10"
docs_url: https://github.com/2noise/ChatTTS
phase: foundation-model
domain:
  - "audio"
relation_to_stack:
  - "deploy-as-is"
  - "study-and-reference"
health_signals:
  - "community-driven"
  - "research-origin"
ecosystem_role:
  - "A dialogue-optimized TTS model that emits expressive, multi-speaker conversational speech with inline prosody and disfluency control."
best_for:
  - "You need conversational, chatbot-style speech with natural pauses, laughter, and prosody rather than flat read-aloud narration"
  - "You are building English/Chinese voice agents and want an open model you can run locally for that specific dialogue register"
avoid_if:
  - "Your use case is commercial and cannot accept AGPL-3.0 copyleft obligations on derived services"
  - "You need broad multilingual coverage beyond English and Chinese, where multilingual models like XTTS fit better"
enrichment_notes: "Repository, AGPL-3.0 license, and 2026-04-10 activity verified via the GitHub API on 2026-07-12. AGPL copyleft has real implications for hosted services; verify licensing before production use."
---

## Overview

ChatTTS is a generative text-to-speech model explicitly optimized for conversational dialogue rather than audiobook-style reading. It is trained on large amounts of spoken dialogue in English and Chinese and exposes control tokens for prosody, pauses, and non-verbal sounds such as laughter, producing speech that sounds like a person talking rather than reciting.

## Why it's in the Arsenal

Most open TTS models target clean narration; ChatTTS fills the distinct niche of natural conversational speech, which is exactly what voice agents and chatbots need. It is a strong, specific baseline for that register.

## Architecture

ChatTTS follows an autoregressive language-model approach to speech: text is encoded and the model predicts discrete acoustic tokens that a decoder renders to waveform. It supports speaker sampling for multi-speaker output and inline oral-control tokens (for example `[laugh]`, `[uv_break]`) that steer prosody and disfluencies, giving finer expressive control than a plain mel-spectrogram acoustic model.

## Ecosystem Position

Compared with narration-first models such as Coqui XTTS and StyleTTS2, ChatTTS deliberately targets the dialogue domain and trades broad multilingual reach for conversational naturalness. It complements ASR models like Whisper in a full voice-agent loop rather than competing with them, and it sits alongside newer expressive models like fish-speech.

## Getting Started

Install from PyPI or clone the repo, load the model with the provided `ChatTTS.Chat` loader, then call `infer()` with text and optional speaker and oral-control parameters. Sampling temperature and the `refine_text` step tune expressiveness.

## Key Use Cases

Voice for conversational agents and companions; expressive dialogue for games and interactive media; Chinese/English podcast- and chat-style synthesis; research on controllable prosody.

## Strengths

Naturalistic conversational output, explicit prosody and laughter control, strong English/Chinese quality, multi-speaker sampling, and an active community.

## Limitations

The AGPL-3.0 license imposes copyleft obligations that affect hosted and commercial use and must be reviewed carefully. Language coverage is centered on English and Chinese, generation is autoregressive and therefore slower than parallel vocoders, and the authors gate some capabilities to discourage misuse such as voice impersonation.

## Relation to the Arsenal

It extends the voice-audio category into the conversational-speech niche and cross-links to agent-system entries where a natural spoken voice matters.

## Resources

- [GitHub repository](https://github.com/2noise/ChatTTS)
- [Project site](https://2noise.com)
- [Hugging Face model](https://huggingface.co/2Noise/ChatTTS)

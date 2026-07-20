---
id: cosyvoice
name: CosyVoice
version_tracked: null
artifact_type: model
category: voice-audio
subcategory: models
description: Multilingual text-to-speech model family from Alibaba with zero-shot voice cloning, cross-lingual synthesis, and streaming generation
github_url: https://github.com/FunAudioLLM/CosyVoice
license: Apache-2.0
primary_language: Python
org_or_maintainer: Alibaba (FunAudioLLM)
tags:
  - multimodal
  - voice
  - inference
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 22289
github_stars_last_30d: 245
trending_score: 60
last_commit: '2026-05-25'
docs_url: https://github.com/FunAudioLLM/CosyVoice
demo_url: null
paper_url: https://arxiv.org/abs/2412.10117
paper_id: null
hf_url: https://huggingface.co/FunAudioLLM
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: foundation-model
domain:
  - audio
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - research-origin
  - actively-maintained
ecosystem_role:
  - Open-weight multilingual TTS/voice-cloning model family, one of the leading self-hostable alternatives to closed TTS APIs like ElevenLabs for teams that need on-prem or cost control
best_for:
  - You need self-hostable, high-quality multilingual TTS with zero-shot voice cloning from a short reference clip, without sending audio to a third-party API
  - You want streaming synthesis for low-latency voice applications (assistants, agents) where waiting for full-utterance generation is too slow
avoid_if:
  - You want a fully managed, zero-ops TTS with an SLA and polished voice library — a hosted API like ElevenLabs removes the GPU/serving burden CosyVoice imposes
  - Your use case is real-time full-duplex conversation (simultaneous listen/speak) — a speech-to-speech model like Moshi targets that directly, whereas CosyVoice is TTS
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (22,044), Apache-2.0 license, and last commit (2026-05-25) verified via the GitHub API on 2026-07-08. Capability claims from the paper/README; not hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/FunAudioLLM/CosyVoice
    date: '2026-07-08'
    description: 22,044 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

CosyVoice is an open-weight text-to-speech model family from Alibaba's FunAudioLLM group. It supports multilingual synthesis, zero-shot voice cloning from a short reference sample, cross-lingual voice transfer, fine-grained control (emotion/prosody via instructions), and streaming generation for low-latency output.

## Why it's in the Arsenal

It is one of the strongest self-hostable answers to closed TTS APIs: teams that need on-prem synthesis, data-residency control, or per-call cost control can run CosyVoice instead of paying per-character to a hosted vendor. It is a comparison point in the voice-audio space, not an unconditional recommendation.

## Architecture

CosyVoice uses an LLM-style token model to map text (and a reference speaker embedding) to speech tokens, followed by a flow-matching / vocoder stage that renders tokens to waveform. Zero-shot cloning works by conditioning on tokens/embeddings extracted from the reference clip; streaming is enabled by generating and vocoding in chunks rather than whole utterances.

## Ecosystem Position

It competes with other open TTS models (e.g. GPT-SoVITS, Fish-Speech, Parler-TTS) and with closed APIs (ElevenLabs, OpenAI TTS). Its niche is multilingual + cross-lingual cloning with streaming, backed by a large org.

## Getting Started

```bash
git clone https://github.com/FunAudioLLM/CosyVoice
# install deps, download weights from Hugging Face, then run zero-shot / cross-lingual inference
```

## Key Use Cases

1. **Scenario**: on-prem multilingual voiceover or assistant speech with a cloned brand voice
2. **Scenario**: low-latency streaming TTS for a voice agent
3. **Scenario where this is NOT the right fit**: a team wanting zero-ops managed TTS with an SLA — a hosted API fits better

## Strengths

- Multilingual + cross-lingual zero-shot cloning
- Streaming generation for low latency
- Open weights (Apache-2.0), org-backed

## Limitations

- You operate the GPU serving and scaling yourself
- Voice cloning raises consent/misuse and legal concerns
- TTS only — not full-duplex speech-to-speech

## Relation to the Arsenal

- Compare against `moshi` (speech-to-speech) and `gpt-sovits` (open voice cloning) before adopting.
- Reference this project by its canonical ID `cosyvoice`.
- Document consent and watermarking policy before deploying voice cloning.

## Resources

- [GitHub Repository](https://github.com/FunAudioLLM/CosyVoice)
- [Paper (arXiv)](https://arxiv.org/abs/2412.10117)

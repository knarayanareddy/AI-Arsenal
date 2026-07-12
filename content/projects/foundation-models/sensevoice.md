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
org_or_maintainer: "FunAudioLLM"
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
id: sensevoice
name: "SenseVoice"
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: "A non-autoregressive multilingual speech-understanding model from Alibaba that jointly does ASR, spoken-language identification, emotion recognition"
github_url: https://github.com/FunAudioLLM/SenseVoice
license: "NOASSERTION"
primary_language: "Python"
tags:
  - "voice"
  - "multimodal"
  - "inference"
  - "self-hosted"
maturity: beta
cost_model: open-source
github_stars: 8839
last_commit: "2026-07-10"
docs_url: https://funaudiollm.github.io/
phase: foundation-model
domain:
  - "audio"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "A speech-understanding model that outputs transcription plus language, emotion, and audio-event labels in one fast non-autoregressive pass."
best_for:
  - "You need more than transcription, for example emotion and audio-event tags, from one low-latency model"
  - "You want very fast multilingual recognition and can accept a non-autoregressive accuracy/latency trade-off"
avoid_if:
  - "You cannot verify the repository's non-standard license for commercial use"
  - "You need word-level timestamps and streaming as first-class features, which autoregressive models handle more directly"
enrichment_notes: "Repository and 2026-07-10 activity verified via the GitHub API on 2026-07-12. License metadata is NOASSERTION; verify before commercial use. Speed comparisons vs. Whisper are project-reported."
---

## Overview

SenseVoice is a multilingual speech-understanding model from Alibaba's FunAudioLLM group that goes beyond transcription: in a single non-autoregressive pass it produces the recognized text plus spoken-language identification, speech-emotion recognition, and acoustic-event detection. It covers 50+ languages and is positioned as substantially faster than autoregressive models like Whisper.

## Why it's in the Arsenal

Joint speech understanding, where one model emits transcript, language, emotion, and event labels together, is a distinct capability from plain ASR, and doing it non-autoregressively for speed makes SenseVoice a differentiated, current model.

## Architecture

SenseVoice uses an encoder that maps audio to a representation from which multiple heads predict outputs in parallel: a non-autoregressive recognition head for text and auxiliary classifiers for language, emotion, and audio events. Parallel decoding avoids the token-by-token latency of autoregressive systems, trading some fine-grained control for throughput, and it shares tooling with the FunASR/CosyVoice ecosystem.

## Ecosystem Position

It complements pure ASR models like Whisper and the Paraformer models in FunASR by adding paralinguistic outputs, and it competes with them on multilingual transcription speed. Rather than a TTS or generation model, it sits on the understanding side of the voice-audio category and pairs naturally with a downstream LLM.

## Getting Started

Install the package, load the SenseVoice model through the FunAudioLLM/FunASR tooling, and call inference on an audio file to receive transcription along with language, emotion, and event tags; ONNX export supports lighter deployment.

## Key Use Cases

Contact-center analytics needing emotion and event cues; multilingual transcription at scale; content moderation and tagging of audio; front-end understanding for voice agents.

## Strengths

Joint transcription plus paralinguistic labels, very fast non-autoregressive inference, broad language coverage, active maintenance, and organizational backing.

## Limitations

The license is reported as NOASSERTION and must be reviewed; non-autoregressive decoding can trail top autoregressive systems on hard audio; streaming and word-level timestamps are less central; and emotion/event labels are coarse and should be validated on your own data.

## Relation to the Arsenal

It adds speech understanding to the voice-audio category and cross-links to FunASR and to agent-system entries that consume spoken input.

## Resources

- [GitHub repository](https://github.com/FunAudioLLM/SenseVoice)
- [Project page](https://funaudiollm.github.io/)

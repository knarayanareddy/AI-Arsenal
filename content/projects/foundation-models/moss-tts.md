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
org_or_maintainer: OpenMOSS
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
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: moss-tts
name: MOSS-TTS
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: Open-source speech and sound generation model family for expressive, long-form, multi-speaker, and streaming audio
github_url: https://github.com/OpenMOSS/MOSS-TTS
license: Apache-2.0
primary_language: Python
tags:
  - voice
  - multimodal
  - inference
  - training
  - streaming
  - local
maturity: beta
cost_model: open-source
github_stars: 3759
last_commit: '2026-06-22'
docs_url: https://github.com/OpenMOSS/MOSS-TTS
phase: foundation-model
domain:
  - audio
  - multimodal
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - org-backed
  - actively-maintained
  - research-origin
ecosystem_role:
  - An open speech/sound model family with local pipelines, long-form and multi-speaker generation, and streaming/low-memory inference paths.
best_for:
  - You need to evaluate expressive speech, dialogue, character voice, or sound generation with local model weights.
  - You can verify checkpoint, voice-data, and downstream audio rights separately from the repository license.
avoid_if:
  - You need a stable hosted TTS API with guaranteed voice quality, latency, or commercial rights.
  - You cannot provision GPU memory or evaluate speaker, language, safety, and consent behavior.
enrichment_notes: Official repository, Apache-2.0 license, model-family scope, and 2026-06-22 activity were reviewed on 2026-07-12. Checkpoint/data terms and quality remain draft.
---

## Overview

MOSS-TTS is an OpenMOSS speech and sound generation model family. The repository covers long-form speech, multi-speaker dialogue, voice/character design, environmental sound effects, and streaming TTS, with local inference paths that include staged low-memory loading and cache/attention options.

## Why it's in the Arsenal

Audio systems have constraints that text-only model catalogs miss: voice identity, prosody, long-form stability, speaker consent, codec quality, and streaming delay all matter. MOSS-TTS is included as an open model family to evaluate, not as a claim that a single checkpoint or voice configuration is production-ready.

## Architecture

The repository organizes model/checkpoint variants, audio tokenization, inference CLIs, local transformer paths, sound-effect components, and configuration for alternate runtimes such as llama.cpp/SGLang-oriented flows. The low-memory pipeline can load and unload encoder, backbone, and decoder stages to reduce peak VRAM, trading memory for stage transitions and latency. Audio output quality depends on text normalization, tokenizer, sampling, speaker conditioning, and post-processing as much as on the backbone.

## Ecosystem Position

MOSS-TTS sits in the audio foundation-model layer below TTS applications and serving wrappers. It overlaps with speech synthesis APIs and open TTS models, while its breadth across speech, dialogue, and sound effects is the differentiator. Compare checkpoints on intelligibility, prosody, speaker similarity, streaming delay, GPU memory, and rights—not only a demo clip.

## Getting Started

Select one checkpoint and language/speaker setting, read the repository’s model and data terms, and run the smallest local CLI. Measure real-time factor, first-audio latency, peak VRAM, long-form drift, pronunciation, and failure behavior. Test consent, voice cloning, prompt injection through text, and output watermark/metadata requirements before user-facing deployment.

## Key Use Cases

- Local expressive TTS and multi-speaker dialogue research.
- Long-form speech, character voice, and environmental sound prototyping.
- Low-memory inference experiments for constrained GPU environments.

## Strengths

- Covers more than short-form neutral TTS and exposes local/runtime tradeoffs.
- Apache-2.0 repository with active model, finetuning, and low-memory inference work.

## Limitations

- Repository license does not automatically grant rights to every checkpoint, voice, speaker identity, or dataset.
- Audio quality and streaming behavior vary by model version, language, hardware, and decoding settings.
- Voice and sound generation require explicit consent, abuse, provenance, and content-safety controls.

## Relation to the Arsenal

MOSS-TTS is a foundation-model project, not a complete TTS service. Pair it with a pinned inference runtime, audio evaluation, identity/consent policy, and deployment-specific latency monitoring.

## Resources

- [Official source](https://github.com/OpenMOSS/MOSS-TTS)

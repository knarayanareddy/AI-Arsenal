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
org_or_maintainer: "open-mmlab"
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
id: amphion
name: "Amphion"
artifact_type: framework
category: voice-audio
subcategory: frameworks
description: "An open toolkit for audio, music, and speech generation that gathers reproducible implementations of TTS, singing-voice, vocoder, and audio-generation models"
github_url: https://github.com/open-mmlab/Amphion
license: "MIT"
primary_language: "Python"
tags:
  - "voice"
  - "multimodal"
  - "fine-tuning"
  - "self-hosted"
maturity: beta
cost_model: open-source
github_stars: 9928
last_commit: "2026-03-25"
docs_url: null
hf_url: https://huggingface.co/amphion
phase: framework
domain:
  - "audio"
relation_to_stack:
  - "study-and-reference"
  - "build-on-top"
health_signals:
  - "research-origin"
  - "community-driven"
ecosystem_role:
  - "A generation-focused audio toolkit that collects reproducible TTS, vocoder, singing-voice, and audio-generation model implementations under one API."
best_for:
  - "You want reference implementations of many audio-generation models (TTS, vocoders, singing voice) to compare or extend"
  - "You are researching audio generation and want a unified codebase with visualizations and evaluation tooling"
avoid_if:
  - "You need a hardened production system rather than a research toolkit"
  - "You need ASR/understanding rather than generation, which sibling toolkits cover better"
enrichment_notes: "Repository, MIT license, and 2026-03-25 activity verified via the GitHub API on 2026-07-12. Research-oriented; treat models as reference implementations."
---

## Overview

Amphion is an open toolkit dedicated to audio, music, and speech generation. Rather than a single model, it collects reproducible implementations of text-to-speech, neural vocoders, singing-voice synthesis and conversion, and general audio generation, aiming to help newcomers get started and to make generation research comparable across methods.

## Why it's in the Arsenal

It is one of the few frameworks focused specifically on the generation side of audio and provides a consistent home for many model families, which is valuable for study, comparison, and extension in the voice-audio category.

## Architecture

Amphion organizes models by task (TTS, vocoder, singing-voice, audio generation) behind shared data, training, and inference interfaces, and integrates evaluation metrics and visualization utilities so that generation quality can be measured consistently. It implements diffusion- and language-model-based generators and multiple vocoders, letting users swap components and reproduce published recipes.

## Ecosystem Position

It complements general speech frameworks such as SpeechBrain and ESPnet, which emphasize recognition alongside generation, by concentrating on generation and adding music and singing-voice tasks they cover less. Compared with single-model releases it is broader, and unlike production TTS engines it prioritizes reproducibility and comparison over deployment.

## Getting Started

Clone the repository, set up the environment per the docs, pick a recipe (for example a TTS or vocoder model), and run the provided training or inference scripts; pretrained checkpoints are released for several models.

## Key Use Cases

Comparing TTS and vocoder architectures; singing-voice synthesis and conversion research; audio-generation experiments; teaching audio generation with runnable examples.

## Strengths

Generation-focused breadth (speech, music, singing voice), consistent interfaces and evaluation tooling, MIT license, and an active research community.

## Limitations

It is research-oriented, so stability, packaging, and long-term support are weaker than production engines; setup can be involved; and quality varies by the specific model implementation rather than being uniform across the toolkit.

## Relation to the Arsenal

It extends the voice-audio category toward music and singing-voice generation and links to the individual TTS model entries.

## Resources

- [GitHub repository](https://github.com/open-mmlab/Amphion)
- [Model hub](https://huggingface.co/amphion)

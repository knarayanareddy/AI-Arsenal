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
org_or_maintainer: "facebookresearch"
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
id: sam-audio
name: "SAM-Audio"
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: "Meta's promptable audio foundation model for isolating sounds from mixtures with text, visual, or temporal prompts"
github_url: https://github.com/facebookresearch/sam-audio
license: "Other"
primary_language: "Python"
tags:
  - "voice"
  - "multimodal"
  - "research"
  - "vision"
maturity: alpha
cost_model: open-source
github_stars: 3571
last_commit: "2026-05-26"
docs_url: https://ai.meta.com/blog/sam-audio/
phase: foundation-model
domain:
  - "audio"
  - "multimodal"
relation_to_stack:
  - "deploy-as-is"
  - "study-and-reference"
health_signals:
  - "org-backed"
  - "research-origin"
ecosystem_role:
  - "Promptable audio separation model with text, visual, and temporal controls"
  - "Research pipeline for Judge-scored candidate reranking"
best_for:
  - "Separating a described sound from complex recordings"
  - "Interactive audio editing with prompt and span control"
avoid_if:
  - "You cannot obtain gated HF checkpoints or run a CUDA-compatible GPU"
  - "You need guaranteed music mastering quality without human review"
enrichment_notes: "The README requires authenticated access to gated Hugging Face checkpoints and recommends a CUDA GPU; the SAM-Audio and Judge licenses are represented as Other. Draft pending review."
---

## Overview

SAM-Audio applies the Segment Anything idea to sound: a user can describe the target with a natural-language phrase, point to visual evidence in video, or provide a temporal span. That prompt flexibility makes it useful for editing mixtures where a fixed class taxonomy is too restrictive.

## Why it's in the Arsenal

SAM-Audio merits a place because it makes sound separation promptable: the target can be described with text, indicated visually in video, or selected by a time span. The accompanying Judge model and candidate reranking turn an interesting separation model into an experimentally controllable audio-editing pipeline.

## Architecture

A Python `SAMAudio` model loads a checkpoint, evaluates on CUDA, and exposes `separate` with optional span prediction and candidate reranking. The system relies on Meta's PE-AV audio-visual encoder; a separate Judge model scores precision, recall, and faithfulness to select among generated candidates.

## Ecosystem Position

SAM-Audio complements classic source-separation libraries and overlaps with interactive audio editors, but its promptable API is the differentiator. It is a research foundation rather than a replacement for a production DSP pipeline, and the PE-AV/Judge dependencies make the stack more coupled than a single waveform model.

## Getting Started

Use Python 3.11 or newer, install the repository with `pip install .`, and request authenticated access to the gated SAM-Audio and PE-AV checkpoints. Load `facebook/sam-audio-large` on a CUDA GPU, call `separate` with a lowercase noun or verb phrase, and enable span prediction or reranking only after the basic path works.

## Key Use Cases

A post-production tool can isolate dialogue, a named sound effect, or a foreground event from a complex recording. Video editors can combine visual prompts with audio prompts, while researchers can compare precision, recall, and faithfulness across reranked candidate separations.

## Strengths

Text, visual, and temporal prompts provide more control than a fixed source label. Optional span prediction and multi-candidate reranking use a dedicated Judge model with precision, recall, and faithfulness axes, making quality trade-offs visible.

## Limitations

Access to gated checkpoints is required, the license is non-standard, and inference is designed around a CUDA GPU. Candidate reranking improves quality at additional latency, while natural-language prompt wording, background similarity, and faithfulness failures can materially change results.

## Relation to the Arsenal

SAM-Audio complements source-separation libraries and the voice-audio projects in the Arsenal, while competing with interactive audio editing products. PE-AV and Judge are upstream model dependencies; this repository is not a complete DSP workstation or media pipeline.

## Resources

- [GitHub](https://github.com/facebookresearch/sam-audio)
- [Meta blog](https://ai.meta.com/blog/sam-audio/)

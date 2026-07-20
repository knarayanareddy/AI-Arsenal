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
org_or_maintainer: nari-labs
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 1
trending_score: 30
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: dia-tts
name: Dia
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: A 1.6B-parameter open dialogue text-to-speech model from Nari Labs that generates multi-speaker conversational audio, including non-verbal cues
github_url: https://github.com/nari-labs/dia
license: Apache-2.0
primary_language: Python
tags:
  - voice
  - multimodal
  - self-hosted
  - llm
maturity: beta
cost_model: open-source
github_stars: 19340
last_commit: '2025-11-19'
docs_url: https://github.com/nari-labs/dia
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
  - A dialogue-first TTS model that renders an entire multi-speaker conversation, with non-verbal sounds, from a single tagged transcript.
best_for:
  - You want to generate two-speaker dialogue or podcast-style audio from one script rather than stitching single-speaker clips
  - You need an Apache-2.0 dialogue model that emits non-verbal cues like laughter and coughs inline
avoid_if:
  - You need single-speaker narration or fine long-form control, which sentence-level TTS handles more predictably
  - You require active upstream support, since commits slowed after late 2025
enrichment_notes: Repository, Apache-2.0 license, and 2025-11-19 activity verified via the GitHub API on 2026-07-12. Included as a distinct dialogue-generation model with a maintenance caveat.
---

## Overview

Dia is a roughly 1.6B-parameter open text-to-speech model from Nari Labs built specifically to generate dialogue: given a transcript tagged with speaker turns, it produces a coherent multi-speaker conversation in a single pass, complete with non-verbal cues such as laughter and coughing. It targets the podcast/conversation use case that single-speaker TTS handles awkwardly.

## Why it's in the Arsenal

Single-pass multi-speaker dialogue generation is a genuinely different capability from sentence-level narration, and an Apache-2.0 model that does it well is a useful, distinct addition to the voice-audio category.

## Architecture

Dia is a transformer that models discrete audio codec tokens conditioned on a speaker-tagged transcript, so it learns turn-taking, timing, and inter-speaker prosody jointly rather than generating each line independently. Non-verbal tokens are represented inline in the transcript, and audio prompts can steer speaker voices for a degree of zero-shot control.

## Ecosystem Position

It overlaps with ChatTTS on conversational speech but goes further by rendering multiple speakers in one generation rather than one voice at a time, and it complements rather than competes with narration models like XTTS and StyleTTS2. Compared with hosted podcast-generation products it is self-hostable and permissively licensed.

## Getting Started

Clone the repository, install dependencies, and run the inference script or Gradio demo with a transcript that marks speaker turns and any non-verbal tags; audio prompts can be supplied to fix speaker identities.

## Key Use Cases

Podcast and dialogue generation from scripts; conversational scenes for games and media; synthetic multi-speaker data; research on joint turn-taking modeling.

## Strengths

Single-pass multi-speaker dialogue, inline non-verbal cues, permissive Apache-2.0 license, and a compact model size that runs on a single modern GPU.

## Limitations

It is specialized for dialogue and less suited to controlled single-speaker long-form narration; upstream activity slowed after late 2025; very long conversations must be chunked; and speaker control is prompt-based rather than a robust cloning system.

## Relation to the Arsenal

It complements ChatTTS and other voice-audio entries by covering the multi-speaker dialogue niche.

## Resources

- [GitHub repository](https://github.com/nari-labs/dia)

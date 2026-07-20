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
org_or_maintainer: myshell-ai
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 66
trending_score: 35
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: openvoice
name: OpenVoice
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: An instant voice-cloning model from MIT and MyShell that separates tone color from a base speaker, enabling cross-lingual cloning and style control
github_url: https://github.com/myshell-ai/OpenVoice
license: MIT
primary_language: Python
tags:
  - voice
  - multimodal
  - self-hosted
  - llm
maturity: beta
cost_model: open-source
github_stars: 36983
last_commit: '2025-04-19'
docs_url: https://research.myshell.ai/open-voice
phase: foundation-model
domain:
  - audio
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - research-origin
  - community-driven
ecosystem_role:
  - A voice-cloning model that transfers a target speaker's tone color onto a controllable base voice, decoupling identity from style and language.
best_for:
  - You need MIT-licensed voice cloning that works across languages the reference speaker never spoke
  - You want independent control of emotion, accent, rhythm, and pauses on top of a cloned timbre
avoid_if:
  - You need a fully end-to-end single model; OpenVoice pairs a base TTS with a tone-color converter and expects that two-stage setup
  - You require the highest raw naturalness of the newest large TTS models, where quality may edge ahead
enrichment_notes: Repository, MIT license, and 2025-04-19 activity verified via the GitHub API on 2026-07-12. V2 weights and some MyShell components may carry separate terms; verify before commercial use.
---

## Overview

OpenVoice is a voice-cloning approach from MIT and MyShell that clones a reference speaker's tone color from a short clip and applies it on top of a controllable base speaker. Its defining property is decoupling: the model separates voice identity (a speaker embedding) from speaking style and language, so a cloned voice can speak languages absent from the reference and can be re-styled for emotion, accent, and rhythm.

## Why it's in the Arsenal

The tone-color-converter design is an instructive, MIT-licensed alternative to monolithic cloning models, and cross-lingual cloning with independent style control is a genuinely differentiated capability worth cataloging.

## Architecture

OpenVoice runs in two stages. A base TTS model generates speech with controllable style parameters (emotion, accent, pace, pauses), and a separately trained tone-color converter transforms that output to match the timbre extracted from the reference speaker via a speaker embedding. Because the converter operates on tone color rather than content, the base model's language and prosody controls remain intact, enabling zero-shot cross-lingual cloning.

## Ecosystem Position

Where XTTS and fish-speech fold cloning into one autoregressive model, OpenVoice keeps identity and style in separate modules, which makes style control more explicit but requires orchestrating two components. It complements base TTS models rather than replacing them, and its permissive license positions it above AGPL-licensed alternatives for teams sensitive to copyleft.

## Getting Started

Clone the repo, download the checkpoints, load the base speaker TTS and the `ToneColorConverter`, extract a target embedding with `se_extractor`, then synthesize and convert. V2 adds improved multilingual base voices and cleaner APIs.

## Key Use Cases

Cross-lingual voice cloning for localization; branded assistant voices; accessibility voices personalized to a user; research on disentangled voice representations.

## Strengths

Explicit style/identity disentanglement, cross-lingual cloning, MIT license on the code, fast conversion, and a clear two-stage design that is easy to reason about.

## Limitations

The two-stage pipeline is more moving parts than an end-to-end model, some V2 assets and the broader MyShell platform may carry separate licensing, upstream commits slowed after early 2025, and cloning quality still depends on reference-clip cleanliness. Voice cloning also raises consent and impersonation concerns that adopters must manage.

## Relation to the Arsenal

It sits alongside other voice-audio models and connects to safety-and-alignment considerations around synthetic voice.

## Resources

- [GitHub repository](https://github.com/myshell-ai/OpenVoice)
- [Research page](https://research.myshell.ai/open-voice)
- [OpenVoice paper](https://arxiv.org/abs/2312.01479)

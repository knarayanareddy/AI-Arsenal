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
org_or_maintainer: "OpenBMB"
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
id: voxcpm
name: "VoxCPM"
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: "A tokenizer-free text-to-speech model that generates speech in a continuous acoustic space for multilingual synthesis, creative voice design"
github_url: https://github.com/OpenBMB/VoxCPM
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "voice"
  - "multimodal"
  - "self-hosted"
  - "llm"
maturity: beta
cost_model: open-source
github_stars: 33194
last_commit: "2026-07-08"
docs_url: https://voxcpm.com
phase: foundation-model
domain:
  - "audio"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "research-origin"
ecosystem_role:
  - "A tokenizer-free TTS model that predicts continuous acoustic representations rather than discrete codec tokens, aiming for higher naturalness."
best_for:
  - "You want an Apache-2.0 TTS model with strong multilingual quality and zero-shot cloning that avoids discrete-codec quantization artifacts"
  - "You are exploring tokenizer-free (continuous) speech generation as an alternative to codec-token approaches"
avoid_if:
  - "You need a long track record in production; the model line is new and still maturing"
  - "You require ultra-low-latency streaming on constrained hardware, where lighter models may be preferable"
enrichment_notes: "Repository, Apache-2.0 license, and 2026-07-08 activity verified via the GitHub API on 2026-07-12. Quality claims are project-reported and not independently benchmarked here."
---

## Overview

VoxCPM is a text-to-speech model from OpenBMB that is notably tokenizer-free: instead of predicting discrete audio-codec tokens, it generates speech in a continuous acoustic representation. The project positions this for multilingual synthesis, creative voice design, and true-to-life zero-shot cloning, under a permissive Apache-2.0 license.

## Why it's in the Arsenal

The tokenizer-free design is a meaningful architectural distinction from the dominant codec-token TTS approach, and pairing that with a permissive license and active development makes VoxCPM a worthwhile, current entry.

## Architecture

Rather than quantizing audio into discrete codebook tokens and modeling them autoregressively, VoxCPM predicts continuous acoustic features directly, avoiding the information loss that quantization can introduce. It conditions on text and a reference speaker for cloning and uses a diffusion- or flow-style continuous decoder to render the waveform, which the authors argue improves naturalness and speaker fidelity.

## Ecosystem Position

It contrasts directly with codec-token models such as fish-speech and Bark: where those model discrete tokens, VoxCPM stays in a continuous space, a design choice that trades a simpler discrete vocabulary for potentially higher fidelity. It competes with XTTS and StyleTTS2 on cloning quality and, unlike AGPL-licensed alternatives, ships under Apache-2.0.

## Getting Started

Install from the repository, download the released weights, and run the provided inference script or WebUI with input text and an optional reference clip for cloning; voice-design controls let you shape a new voice rather than clone an existing one.

## Key Use Cases

Multilingual narration and cloning; designing novel synthetic voices; research comparing continuous vs. discrete speech generation; self-hosted expressive TTS.

## Strengths

Tokenizer-free continuous generation, strong reported multilingual quality, zero-shot cloning, creative voice design, permissive license, and active maintenance.

## Limitations

It is a young model without a long production track record, quality figures are self-reported rather than independently verified, continuous decoders can be compute-heavy, and released weights may carry usage conditions that should be confirmed before commercial deployment.

## Relation to the Arsenal

It broadens the voice-audio category with a distinct architectural approach and cross-links to the other TTS models for comparison.

## Resources

- [GitHub repository](https://github.com/OpenBMB/VoxCPM)
- [Project site](https://voxcpm.com)

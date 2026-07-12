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
org_or_maintainer: "Lightricks"
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
id: ltx-video
name: "LTX-Video"
artifact_type: model
category: multimodal
subcategory: open-source-models
description: "Lightricks' open DiT-based video-generation model optimized for real-time, high-resolution text-to-video and image-to-video synthesis on a single GPU"
github_url: https://github.com/Lightricks/LTX-Video
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "multimodal"
  - "self-hosted"
  - "inference"
maturity: beta
cost_model: open-source
github_stars: 10673
last_commit: "2026-01-05"
docs_url: https://ltx.io/model
phase: foundation-model
domain:
  - "vision"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "A speed-optimized diffusion-transformer video generator that produces high-resolution clips faster than real time on a single GPU."
best_for:
  - "You need fast, self-hostable text-to-video or image-to-video generation on a single modern GPU"
  - "You want an Apache-2.0 video model to build creative or prototyping tools on"
avoid_if:
  - "You need the highest cinematic quality or long-duration coherence, where larger closed models lead"
  - "You lack a capable GPU, since video diffusion is memory- and compute-intensive"
enrichment_notes: "Repository, Apache-2.0 license, and 2026-01-05 activity verified via the GitHub API on 2026-07-12. Speed claims are project-reported and hardware-dependent."
---

## Overview

LTX-Video is Lightricks' open video-generation model built on a diffusion transformer (DiT) and optimized for speed: it targets high-resolution text-to-video and image-to-video synthesis that runs faster than real time on a single modern GPU. It is released under Apache-2.0, making it a practical base for self-hosted video tools.

## Why it's in the Arsenal

Open, fast, self-hostable video generation is rare, and LTX-Video's emphasis on single-GPU real-time-class performance under a permissive license makes it a distinct and useful multimodal entry.

## Architecture

LTX-Video uses a diffusion transformer operating in a compressed video latent space produced by a video VAE, denoising spatiotemporal latent tokens conditioned on text (and optionally a conditioning image for image-to-video). Aggressive latent compression and an efficient DiT design are what let it generate multi-second high-resolution clips quickly rather than requiring a cluster.

## Ecosystem Position

LTX-Video competes with open video models like HunyuanVideo and with closed services, differentiating on inference speed and single-GPU practicality rather than maximum fidelity. It is often used through the Diffusers library, and compared with heavier models it trades some cinematic quality and duration for latency and accessibility.

## Getting Started

Install from the repository or via a Diffusers pipeline, download the model weights, and run text-to-video or image-to-video generation with prompt and resolution/length parameters on a capable GPU.

## Key Use Cases

Fast prototyping of generated video; image-to-video animation; creative and marketing content; building self-hosted video-generation features.

## Strengths

Fast single-GPU generation, high resolution, image-to-video support, Apache-2.0 license, active organizational backing, and Diffusers integration.

## Limitations

Quality and long-duration coherence trail the largest models, it is GPU-memory intensive, reported speed depends heavily on hardware, and outputs still require curation for professional use.

## Relation to the Arsenal

It sits alongside HunyuanVideo and the diffusion entries as an open video generator in the multimodal category.

## Resources

- [GitHub repository](https://github.com/Lightricks/LTX-Video)
- [Model page](https://ltx.io/model)

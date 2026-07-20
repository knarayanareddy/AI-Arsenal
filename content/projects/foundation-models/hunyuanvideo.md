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
org_or_maintainer: Tencent-Hunyuan
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 22
trending_score: 32
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: hunyuanvideo
name: HunyuanVideo
artifact_type: model
category: multimodal
subcategory: open-source-models
description: Tencent's large open text-to-video generation model with a diffusion-transformer backbone and a 3D VAE, targeting cinematic-quality clips
github_url: https://github.com/Tencent-Hunyuan/HunyuanVideo
license: NOASSERTION
primary_language: Python
tags:
  - multimodal
  - self-hosted
  - inference
maturity: beta
cost_model: open-source
github_stars: 12352
last_commit: '2026-06-29'
docs_url: https://aivideo.hunyuan.tencent.com
phase: foundation-model
domain:
  - vision
relation_to_stack:
  - deploy-as-is
  - study-and-reference
health_signals:
  - actively-maintained
  - org-backed
ecosystem_role:
  - A large diffusion-transformer video model targeting high-fidelity text-to-video generation you can self-host.
best_for:
  - You want one of the highest-quality open text-to-video models and have multi-GPU or high-memory hardware
  - You are researching large-scale video diffusion transformers and their 3D VAE latent design
avoid_if:
  - You need fast generation on a single modest GPU, where lighter models like LTX-Video fit better
  - You cannot verify the model's non-standard license terms for your use case
enrichment_notes: Repository and 2026-06-29 activity verified via the GitHub API on 2026-07-12. License is NOASSERTION (custom Tencent terms); verify before use. Very GPU-heavy.
---

## Overview

HunyuanVideo is Tencent's large open text-to-video generation model built on a diffusion-transformer backbone with a 3D variational autoencoder for spatiotemporal compression. It targets cinematic-quality clips with strong motion and prompt adherence and is one of the biggest openly released video models, positioning quality over speed.

## Why it's in the Arsenal

It is among the highest-quality openly available video generators, and studying or self-hosting a frontier-scale video model is valuable, so it earns a place with clear caveats about hardware and licensing.

## Architecture

The model encodes video into a compact latent space with a causal 3D VAE, then a diffusion transformer denoises spatiotemporal latent tokens conditioned on a multimodal large-language-model text encoder for strong prompt understanding. Its large parameter count and full-attention design drive quality but also make it memory- and compute-intensive, and it supports text-to-video with extensions toward image-to-video.

## Ecosystem Position

HunyuanVideo competes with other open video models such as LTX-Video and Mochi and with closed services, differentiating on scale and fidelity rather than speed. Compared with LTX-Video it favors quality over single-GPU practicality, and it is commonly run through the Diffusers library, complementing rather than replacing lighter video generators.

## Getting Started

Clone the repository, install dependencies, download the weights (accepting the license), and run the provided inference scripts with prompt, resolution, and length parameters; multi-GPU or high-memory GPUs and offloading options are typically required.

## Key Use Cases

High-fidelity generated video for media and film prototyping; research on large video diffusion transformers; building premium video-generation features; dataset and capability study.

## Strengths

Strong open video quality, robust prompt adherence via an LLM text encoder, active organizational backing, and Diffusers integration for accessibility.

## Limitations

It is very GPU- and memory-intensive, the license is non-standard (NOASSERTION) and must be reviewed, generation is slow relative to lightweight models, and long-duration coherence remains challenging.

## Relation to the Arsenal

It anchors high-end open video generation next to LTX-Video and the diffusion entries in the multimodal category.

## Resources

- [GitHub repository](https://github.com/Tencent-Hunyuan/HunyuanVideo)
- [Project site](https://aivideo.hunyuan.tencent.com)

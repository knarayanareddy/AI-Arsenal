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
org_or_maintainer: "FoundationVision"
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
id: visual-autoregressive
name: "VAR (Visual Autoregressive)"
artifact_type: model
category: computer-vision
subcategory: open-source-models
description: "A NeurIPS 2024 best-paper image-generation model that reframes autoregression as next-scale prediction, outperforming diffusion on quality and speed at scale"
github_url: https://github.com/FoundationVision/VAR
license: "MIT"
primary_language: "Python"
tags:
  - "multimodal"
  - "self-hosted"
  - "inference"
maturity: beta
cost_model: open-source
github_stars: 8704
last_commit: "2025-11-10"
docs_url: https://github.com/FoundationVision/VAR
phase: foundation-model
domain:
  - "vision"
relation_to_stack:
  - "study-and-reference"
  - "fork-and-adapt"
health_signals:
  - "research-origin"
  - "community-driven"
ecosystem_role:
  - "An image generator that predicts images coarse-to-fine across scales, an autoregressive alternative to diffusion."
best_for:
  - "You are researching autoregressive image generation and want the reference next-scale-prediction implementation"
  - "You want to study scaling laws for visual generation with a clean, permissive codebase"
avoid_if:
  - "You need a turnkey production image generator with a large ecosystem, where diffusion pipelines are more practical"
  - "You need broad conditioning/control features (ControlNet-style), which the diffusion ecosystem provides"
enrichment_notes: "Repository, MIT license, and 2025-11-10 activity verified via the GitHub API on 2026-07-12. NeurIPS 2024 Best Paper; primarily a research reference."
---

## Overview

VAR (Visual Autoregressive modeling) is an image-generation model, awarded a NeurIPS 2024 best paper, that reframes autoregression for images as next-scale prediction: instead of generating tokens one raster position at a time, it predicts progressively higher-resolution token maps. The authors report that this both beats diffusion on quality/FID and generates faster while exhibiting clean scaling laws.

## Why it's in the Arsenal

VAR is an influential, award-winning demonstration that autoregressive models can rival or exceed diffusion for image generation, and its MIT-licensed reference implementation is a valuable study base for the field.

## Architecture

VAR tokenizes an image into a multi-scale pyramid of discrete tokens via a VQ autoencoder, then a transformer autoregressively predicts each scale conditioned on all coarser scales, so generation proceeds coarse-to-fine rather than pixel-by-pixel. This next-scale factorization shortens the autoregressive sequence, improves efficiency, and yields the scaling behavior the paper analyzes.

## Ecosystem Position

VAR competes with diffusion models such as those in the diffusers library and with earlier raster-order autoregressive image models, differentiating through next-scale prediction. Compared with the mature diffusion ecosystem it lacks the breadth of tooling and conditioning options, so it is currently more a research reference and fork base than a production generator.

## Getting Started

Clone the repository, download the released checkpoints, and run the provided sampling scripts or notebooks to generate images; training code and the multi-scale tokenizer are included for extension.

## Key Use Cases

Research on autoregressive image generation; studying visual scaling laws; fork-and-adapt base for new generative models; benchmarking against diffusion.

## Strengths

Award-winning next-scale-prediction design, competitive quality and speed versus diffusion, clean scaling behavior, MIT license, and an approachable reference codebase.

## Limitations

It is primarily a research artifact without the production tooling, control adapters, and community ecosystem of diffusion pipelines; results depend on the discrete tokenizer; and broad conditioning features are not provided out of the box.

## Relation to the Arsenal

It sits alongside the diffusion entries as the autoregressive alternative in image generation.

## Resources

- [GitHub repository](https://github.com/FoundationVision/VAR)
- [VAR paper](https://arxiv.org/abs/2404.02905)

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
org_or_maintainer: hao-ai-lab
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 40
trending_score: 33
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: fastvideo
name: FastVideo
artifact_type: library
category: multimodal
subcategory: inference-engines
description: A unified inference and post-training framework for accelerating video-generation models via techniques like sliding-tile attention and distillation
github_url: https://github.com/hao-ai-lab/FastVideo
license: Apache-2.0
primary_language: Python
tags:
  - multimodal
  - inference
  - fine-tuning
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 3862
last_commit: '2026-07-20'
docs_url: https://hao-ai-lab.github.io/FastVideo
phase: inference-engine
domain:
  - vision
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - actively-maintained
  - research-origin
ecosystem_role:
  - An acceleration framework that speeds up video-diffusion inference and provides distillation-based post-training.
best_for:
  - You need to accelerate open video-diffusion models and want kernels plus distillation recipes in one framework
  - You are researching efficient video generation (sparse attention, step distillation)
avoid_if:
  - You want a ready single video model rather than an acceleration/post-training layer
  - Your target model is unsupported, since optimizations are architecture-specific
enrichment_notes: Repository, Apache-2.0 license, and 2026-07-12 activity verified via the GitHub API on 2026-07-12. From UCSD's Hao AI Lab; young and evolving.
---

## Overview

FastVideo is a unified framework for accelerating video-generation models, covering both faster inference and post-training. It brings together optimizations such as sliding-tile/sparse attention and step-distillation recipes so that heavy video-diffusion models can generate clips with far fewer compute steps and lower latency, and it supports several popular open video models.

## Why it's in the Arsenal

Video generation is bottlenecked by cost, and FastVideo focuses precisely on making existing models practical through acceleration and distillation, which is a distinct and valuable contribution for the multimodal-inference area.

## Architecture

FastVideo attacks two costs. For inference it implements efficient attention kernels (for example sliding-tile attention that exploits spatiotemporal locality) to reduce the quadratic attention burden of long video-token sequences. For quality-preserving speedups it provides post-training distillation that reduces the number of diffusion sampling steps, and it wraps these behind a unified API across supported video models.

## Ecosystem Position

FastVideo is an acceleration and post-training layer that complements video models like HunyuanVideo and LTX-Video rather than replacing them, similar to how Nunchaku accelerates image diffusion. Compared with running a model natively it adds sparse-attention kernels and distilled few-step sampling, and compared with general inference servers it is specialized to the structure of video diffusion.

## Getting Started

Install from the repository, load a supported video model through the FastVideo API, and run accelerated inference; distillation scripts are provided to produce few-step variants for further speedups, with a GPU required.

## Key Use Cases

Speeding up open video-generation models; few-step distilled video sampling; research on efficient attention and distillation for video; building responsive video-generation features.

## Strengths

Combines inference kernels and post-training distillation, supports multiple open video models, active research-lab maintenance, and an Apache-2.0 license.

## Limitations

Optimizations are architecture-specific so support varies by model, it is a young and evolving project, distillation can slightly affect quality, and it accelerates models rather than providing one itself.

## Relation to the Arsenal

It complements the video-generation model entries as their efficiency layer in the multimodal category.

## Resources

- [GitHub repository](https://github.com/hao-ai-lab/FastVideo)
- [Project page](https://hao-ai-lab.github.io/FastVideo)

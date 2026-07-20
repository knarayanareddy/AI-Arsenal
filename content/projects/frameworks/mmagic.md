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
org_or_maintainer: open-mmlab
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 4
trending_score: 30
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: mmagic
name: MMagic
artifact_type: framework
category: multimodal
subcategory: frameworks
description: OpenMMLab's multimodal generative toolbox for AIGC, covering text-to-image, image/video super-resolution, inpainting, matting
github_url: https://github.com/open-mmlab/mmagic
license: Apache-2.0
primary_language: Python
tags:
  - multimodal
  - fine-tuning
  - self-hosted
  - inference
maturity: beta
cost_model: open-source
github_stars: 7442
last_commit: '2024-08-06'
docs_url: https://mmagic.readthedocs.io/en/latest/
phase: framework
domain:
  - vision
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - research-origin
  - community-driven
ecosystem_role:
  - A unified toolbox of generative and low-level vision models spanning generation, restoration, and enhancement.
best_for:
  - You want one framework covering diffusion generation plus super-resolution, inpainting, matting, and restoration
  - You are comparing or fine-tuning many low-level vision and AIGC models under a consistent config API
avoid_if:
  - You only need mainstream diffusion inference, where the Diffusers library is more current and convenient
  - You want an actively evolving project, since upstream cadence slowed after 2024
enrichment_notes: Repository, Apache-2.0 license, and 2024-08-06 activity verified via the GitHub API on 2026-07-12. Broad but upstream cadence slowed; treat as a reference toolbox.
---

## Overview

MMagic is OpenMMLab's multimodal advanced generative and intelligent creation toolbox. Beyond text-to-image generation, it covers a wide span of low-level and generative vision tasks, image and video super-resolution, inpainting, matting, denoising, and restoration, behind the same config-driven API used across the OpenMMLab ecosystem.

## Why it's in the Arsenal

It is unusual in combining diffusion generation with a deep bench of restoration and enhancement models in one framework, which makes it a useful reference and comparison base for AIGC and low-level vision work.

## Architecture

Built on MMEngine/MMCV, MMagic composes each model from registry components declared in Python config files, so datasets, backbones, generators, discriminators, and losses are swappable. It implements diffusion and GAN generators alongside super-resolution and restoration networks, and its unified runner handles training, evaluation with task-specific metrics, and inference through a common `MMagicInferencer` interface.

## Ecosystem Position

MMagic overlaps with the Diffusers library on generation but differentiates by bundling restoration and enhancement tasks Diffusers does not target, and it complements MMDetection as the generative/low-level sibling in the OpenMMLab family. Compared with Diffusers it is broader but less current on the newest diffusion models, so it is often a comparison and fine-tuning base rather than the primary inference path.

## Getting Started

Install MMEngine/MMCV and MMagic, pick a task config from the model zoo, and run training or `MMagicInferencer(model_name)` for inference on images or video; pretrained weights are provided per task.

## Key Use Cases

Image/video super-resolution and restoration; inpainting and matting; comparing generative and low-level vision models; fine-tuning AIGC pipelines under one framework.

## Strengths

Very broad task coverage across generation and restoration, unified config-driven API, large model zoo, Apache-2.0 license, and OpenMMLab ecosystem integration.

## Limitations

Upstream cadence slowed after 2024 so newest diffusion models may be absent, the MMCV/MMEngine stack has a learning curve, and for mainstream generation the Diffusers library is more convenient and current.

## Relation to the Arsenal

It rounds out generative and low-level vision tooling in the multimodal category alongside Diffusers and the OpenMMLab detection framework.

## Resources

- [GitHub repository](https://github.com/open-mmlab/mmagic)
- [Documentation](https://mmagic.readthedocs.io/en/latest/)

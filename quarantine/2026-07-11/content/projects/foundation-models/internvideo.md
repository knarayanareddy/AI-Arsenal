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
org_or_maintainer: OpenGVLab
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
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: internvideo
name: InternVideo
artifact_type: model
category: multimodal
subcategory: models
description: Video foundation-model series and data for multimodal video understanding, generation, and long-context reasoning
github_url: https://github.com/OpenGVLab/InternVideo
license: Apache-2.0
primary_language: Python
tags:
  - multimodal
  - vision
  - research
  - training
  - agents
  - efficiency

maturity: beta
cost_model: open-source
github_stars: 2300
last_commit: '2026-07-01'
docs_url: https://github.com/OpenGVLab/InternVideo
phase: foundation-model
domain:
  - vision
  - multimodal
  - language
  - reasoning

relation_to_stack:
  - study-and-reference
  - fork-and-adapt

health_signals:
  - org-backed
  - research-origin
  - actively-maintained

ecosystem_role:
  - An open research and model family covering multiple generations of video foundation models and data.
best_for:
  - You need video-language checkpoints, training references, or long-video research baselines.
  - You can verify each model and dataset license and provide the required compute.
avoid_if:
  - You need a small, stable video API or an application-ready inference service.
  - You cannot audit model/data terms or reproduce the hardware-heavy workflows.
enrichment_notes: Official repository, Apache-2.0 license, model-family scope, and 2026-07-01 activity were checked on 2026-07-11. Individual checkpoint and dataset terms require separate review.
---

## Overview

InternVideo is a repository for a series of video foundation models, related data, and multimodal video-understanding work. It includes multiple generations and recent work on long-context video reasoning.

## Why it's in the Arsenal

Video is a distinct engineering workload: temporal sampling, long context, multimodal alignment, and expensive evaluation all matter. InternVideo provides an active research reference for those choices rather than a single turnkey product.

## Architecture

The repository groups model generations, training or fine-tuning code, data resources, and inference examples. The exact checkpoint, preprocessing pipeline, and hardware requirements vary by generation, so downstream users must treat each model release as its own artifact.

## Ecosystem Position

InternVideo sits in the foundation-model and multimodal research layer. It can feed video-language applications and evaluation harnesses, but checkpoint and dataset terms must be checked independently.

## Getting Started

Choose a specific model generation, read its release instructions and license notes, and run the smallest inference example. Pin checkpoints and preprocessing code; measure latency, memory, temporal coverage, and task quality on representative videos.

## Key Use Cases

- Video-language understanding and long-video reasoning research
- Studying data and architecture choices for video foundation models

## Strengths

- Continuous research lineage across several model generations
- Public code, model references, and data pointers for multimodal study

## Limitations

- Video inference and training are compute- and memory-intensive
- Model, data, and downstream-use licenses may differ from the repository license

## Relation to the Arsenal

This is a foundation-model research project. Pair it with an inference runtime and a multimodal evaluation harness rather than assuming the repository is an end-to-end serving stack.

## Resources

- [Official source](https://github.com/OpenGVLab/InternVideo)
- [Official license](https://github.com/OpenGVLab/InternVideo/blob/main/LICENSE)
- [InternVideo technical report](https://arxiv.org/abs/2606.12195)


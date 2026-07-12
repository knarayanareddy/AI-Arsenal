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
org_or_maintainer: EvolvingLMMs-Lab
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
id: llava-onevision-2
name: LLaVA-OneVision-2
artifact_type: model
category: multimodal
subcategory: models
description: Fully open multimodal model and training framework spanning image, video, spatial understanding, data, and checkpoints
github_url: https://github.com/EvolvingLMMs-Lab/LLaVA-OneVision-2
license: Apache-2.0
primary_language: Python
tags:
  - multimodal
  - vision
  - training
  - evaluation
  - inference
maturity: beta
cost_model: open-source
github_stars: 1100
last_commit: '2026-07-10'
docs_url: https://github.com/EvolvingLMMs-Lab/LLaVA-OneVision-2
phase: foundation-model
domain:
  - vision
  - multimodal
  - language
relation_to_stack:
  - deploy-as-is
  - study-and-reference
  - fork-and-adapt
health_signals:
  - research-origin
  - actively-maintained
  - community-driven
ecosystem_role:
  - An end-to-end open multimodal model/training stack that exposes data, encoders, checkpoints, conversion, reproduction, and evaluation workflows
best_for:
  - Researching open image/video/spatial multimodal training and evaluation
  - Reproducing or adapting a full multimodal model pipeline rather than only using a hosted checkpoint
avoid_if:
  - You need a simple inference-only model package
  - You cannot meet the dataset, GPU, distributed training, and custom-code requirements
enrichment_notes: Official repository, Apache-2.0 license file, active July 2026 changes, and reproduction documentation were reviewed on 2026-07-11. Hardware and reproduction claims remain draft.
---

## Overview

LLaVA-OneVision-2 is fully open multimodal model and training framework spanning image, video, spatial understanding, data, and checkpoints.

## Why it's in the Arsenal

LLaVA-OneVision-2 is a fresh candidate for the foundation-model layer because it addresses a concrete engineering decision and has an inspectable primary source.

## Architecture

The repository provides the implementation and integrations described by its official documentation. This entry keeps the architecture summary deliberately high-level until independent reproduction confirms exact operational boundaries.

## Ecosystem Position

It complements adjacent AI model, data, agent, serving, and evaluation components. Compare it by evidence, protocol, compatibility, and license—not by popularity alone.

## Getting Started

Follow the official source, pin versions, run a minimal example, and measure the behavior that matters for your workload before enabling real data or side effects.

## Key Use Cases

- Researching open image/video/spatial multimodal training and evaluation
- Reproducing or adapting a full multimodal model pipeline rather than only using a hosted checkpoint

## Strengths

- Clear problem focus and inspectable primary source
- Explicit tradeoffs are documented rather than presented as unconditional recommendations

## Limitations

- Independent production evidence is not established in this first pass
- Compatibility, operational cost, and security boundaries require workload-specific testing

## Relation to the Arsenal

This foundation-model project should be evaluated alongside the relevant AI Arsenal tools, architectures, build examples, and research entries.

## Resources

- [Primary source](https://github.com/EvolvingLMMs-Lab/LLaVA-OneVision-2)

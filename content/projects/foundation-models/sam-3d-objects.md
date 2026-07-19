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
org_or_maintainer: "facebookresearch"
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
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: sam-3d-objects
name: "SAM 3D Objects"
artifact_type: model
category: computer-vision
subcategory: open-source-models
description: "Meta's foundation model for reconstructing object shape, texture, and layout in 3D from a single masked image"
github_url: https://github.com/facebookresearch/sam-3d-objects
license: "Other"
primary_language: "Python"
tags:
  - "vision"
  - "multimodal"
  - "research"
  - "foundational"
maturity: alpha
cost_model: open-source
github_stars: 7142
last_commit: "2026-06-02"
docs_url: https://ai.meta.com/sam3d/
phase: foundation-model
domain:
  - "vision"
  - "multimodal"
relation_to_stack:
  - "deploy-as-is"
  - "study-and-reference"
health_signals:
  - "org-backed"
  - "research-origin"
ecosystem_role:
  - "Meta foundation model for single-image object geometry, texture, and layout reconstruction"
  - "Upstream 3D asset source for graphics and robotics workflows"
best_for:
  - "Single-image asset reconstruction for 3D and robotics prototypes"
  - "A reference point for image-conditioned 3D generation"
avoid_if:
  - "You need editable 3D assets from cluttered natural images"
  - "You require a permissive standard license and turnkey production serving"
enrichment_notes: "NOASSERTION was normalized to Other; the README points to a non-standard SAM License and gated model checkpoints. Draft pending review."
---

## Overview

SAM 3D Objects turns a single natural image plus object mask into a structured 3D result containing geometry, texture, pose, and layout. Its emphasis on occlusion, clutter, and unusual real-world views makes it more than a clean product-photo demo and gives the vision catalog a genuine image-to-3D foundation model.

## Why it's in the Arsenal

SAM 3D Objects earns inclusion because it brings Meta's single-image 3D reconstruction research into a runnable repository with code, checkpoints, an online demo, and a dedicated benchmark. Its emphasis on occlusion and clutter addresses the natural-image conditions that make many image-to-3D demos less useful.

## Architecture

The supplied Python demo loads a tagged checkpoint and pipeline YAML, processes an image and mask, then exports a Gaussian-splat-style representation. Meta describes progressive training and a human-feedback data engine; the repository also shows how object and human reconstruction can be aligned in one frame.

## Ecosystem Position

SAM 3D Objects complements segmentation and 3D asset tools, while competing with image-to-3D generators that assume cleaner inputs. It sits above downstream graphics or robotics workflows rather than replacing them: the model provides a reconstruction baseline, and applications still own mesh cleanup, rendering, and scene semantics.

## Getting Started

Request access to the gated checkpoint, install the repository's Python requirements, and place the selected checkpoint under the documented `checkpoints/<tag>` layout. Run `python demo.py` with an image and object mask, then inspect the exported Gaussian splat before attempting multi-object or alignment examples.

## Key Use Cases

Use it to block out textured 3D objects from reference photographs, explore reconstruction of small or partially occluded items, or align object and human reconstructions in a shared frame. Robotics and graphics teams can treat the output as an initialization for later mesh cleanup rather than a finished asset.

## Strengths

The pipeline reconstructs geometry, texture, pose, and layout from a masked image and is designed for unusual poses, occlusion, and clutter. The repository includes a demo, released checkpoints, a web experience, and a benchmark rather than only an architecture description.

## Limitations

The license is non-standard rather than a familiar MIT or Apache grant, and the weights are gated, so legal review and authenticated download are prerequisites. Single-image reconstruction can hallucinate hidden surfaces and fine materials; GPU requirements, export fidelity, and real-scene accuracy need validation before production use.

## Relation to the Arsenal

SAM 3D Objects sits beside TRELLIS.2 and other computer-vision foundation models, complementing segmentation and downstream graphics tooling. Its output feeds robotics, rendering, and asset pipelines; it does not occupy the role of a general 3D editor or serving runtime.

## Resources

- [GitHub](https://github.com/facebookresearch/sam-3d-objects)
- [Project site](https://ai.meta.com/sam3d/)

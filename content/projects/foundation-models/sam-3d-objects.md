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
  - "A foundation-model source for downstream 3D asset and robotics workflows"
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

This entry adds a concrete, currently relevant building block to the Arsenal: its README exposes a runnable workflow rather than only a paper, while its open repository makes the integration boundary inspectable for engineers. SAM 3D Objects is especially useful because rapid 3d asset blocking from photographs.

## Architecture

The supplied Python demo loads a tagged checkpoint and pipeline YAML, processes an image and mask, then exports a Gaussian-splat-style representation. Meta describes progressive training and a human-feedback data engine; the repository also shows how object and human reconstruction can be aligned in one frame.

## Ecosystem Position

SAM 3D Objects complements segmentation and 3D asset tools, while competing with image-to-3D generators that assume cleaner inputs. It sits above downstream graphics or robotics workflows rather than replacing them: the model provides a reconstruction baseline, and applications still own mesh cleanup, rendering, and scene semantics.

## Getting Started

Begin with the linked README and documentation, install the project in an isolated environment, and reproduce the smallest supplied example before connecting it to production data or an agent loop. For SAM 3D Objects, consult the GitHub entry first.

## Key Use Cases

The strongest fits are Rapid 3D asset blocking from photographs; Research on object reconstruction in cluttered scenes. These scenarios keep the project's intended interface visible and avoid implying capabilities that the README does not promise.

## Strengths

Handles occlusion-aware natural imagery, includes code and checkpoints, and offers a bridge between 2D vision prompts and usable 3D scene representations.

## Limitations

The license is non-standard rather than a familiar MIT or Apache grant, and the weights are gated, so legal review and authenticated download are prerequisites. Single-image reconstruction can hallucinate hidden surfaces and fine materials; GPU requirements, export fidelity, and real-scene accuracy need validation before production use.

## Relation to the Arsenal

SAM 3D Objects sits at a distinct boundary in the catalog: a foundation-model source for downstream 3d asset and robotics workflows. Teams can connect its outputs to adjacent model, tool, or workflow entries, while retaining ownership of deployment policy and workload-specific evaluation.

## Resources

- [GitHub](https://github.com/facebookresearch/sam-3d-objects)
- [Project site](https://ai.meta.com/sam3d/)

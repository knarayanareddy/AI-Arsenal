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
org_or_maintainer: "microsoft"
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
id: trellis-2
name: "TRELLIS.2"
artifact_type: model
category: computer-vision
subcategory: open-source-models
description: "Microsoft's 4B image-to-3D generative model using a field-free sparse-voxel representation and physically based materials"
github_url: https://github.com/microsoft/TRELLIS.2
license: "MIT"
primary_language: "Python"
tags:
  - "vision"
  - "multimodal"
  - "foundational"
  - "research"
maturity: beta
cost_model: open-source
github_stars: 8800
last_commit: "2026-06-05"
docs_url: https://microsoft.github.io/TRELLIS.2
phase: foundation-model
domain:
  - "vision"
  - "multimodal"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "org-backed"
  - "research-origin"
ecosystem_role:
  - "4B image-to-3D model with O-Voxel geometry and PBR material generation"
  - "Open foundation for synthetic assets and graphics experiments"
best_for:
  - "Generating textured 3D assets from reference images"
  - "Prototyping PBR-aware scene and object reconstruction"
avoid_if:
  - "You need lightweight CPU inference or guaranteed topology-ready meshes"
  - "Your input images lack a clear subject or your pipeline cannot post-process assets"
enrichment_notes: "The README describes a 4B model and GPU-oriented generation workflow; reported visual quality is research evidence, not a universal production guarantee. Draft pending review."
---

## Overview

TRELLIS.2 is an image-to-3D model aimed at the difficult last mile between a flat reference image and a renderable 3D asset. Its 4B scale and focus on geometry, texture, and PBR materials make it relevant to games, design, and synthetic-data workflows that need more than a coarse shape.

## Why it's in the Arsenal

TRELLIS.2 earns its place as a substantial open image-to-3D model focused on detailed geometry and physically based appearance. Its O-Voxel representation and 4B scale target the gap between a concept image and an asset that can actually enter a rendering or synthetic-data workflow.

## Architecture

The core representation is O-Voxel, a field-free sparse-voxel structure designed to preserve detailed geometry without relying on a continuous neural field. The Python pipeline conditions generation on an image and decodes shape plus physically based appearance, so GPU memory and post-processing are part of the architecture.

## Ecosystem Position

TRELLIS.2 complements SAM 3D Objects and competes with other image-to-3D model generators, with a distinct emphasis on sparse voxels and PBR output. It sits between research checkpoints and downstream asset pipelines: unlike a modeling package, it does not remove the need for topology repair, artist review, or renderer-specific conversion.

## Getting Started

Install the Python environment described in the TRELLIS.2 repository, download the 4B checkpoint, and run the supplied image-to-3D inference example on a CUDA GPU. Export a generated asset, inspect its PBR materials, and benchmark resolution, sampling time, and memory before building a batch service.

## Key Use Cases

Generate rough but textured props from concept art, create synthetic objects for vision experiments, or explore PBR-aware asset variations for design review. Keep an artist or geometry cleanup step in the loop when topology, hidden surfaces, or exact dimensions matter.

## Strengths

The model uses the field-free O-Voxel sparse-voxel representation and explicitly targets PBR materials, not just a coarse silhouette. Its 4B image-to-3D checkpoint gives researchers a concrete baseline for comparing geometry, texture, and material quality.

## Limitations

A 4B model is expensive for interactive edge use, and image ambiguity still produces incorrect hidden geometry or materials. The MIT code license does not automatically settle the rights to generated assets or training images; benchmark and PBR fidelity claims should be measured on the target asset domain.

## Relation to the Arsenal

TRELLIS.2 complements SAM 3D Objects and downstream graphics tools, while competing with other image-to-3D foundation models. It belongs above renderers and asset editors in the stack: those systems consume and repair its output rather than being replaced by it.

## Resources

- [GitHub](https://github.com/microsoft/TRELLIS.2)
- [Documentation](https://microsoft.github.io/TRELLIS.2)

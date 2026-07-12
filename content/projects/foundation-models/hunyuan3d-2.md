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
org_or_maintainer: "Tencent-Hunyuan"
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
id: hunyuan3d-2
name: "Hunyuan3D-2"
artifact_type: model
category: multimodal
subcategory: open-source-models
description: "Tencent's open model for generating high-resolution textured 3D assets from images or text using a two-stage shape-then-texture diffusion pipeline"
github_url: https://github.com/Tencent-Hunyuan/Hunyuan3D-2
license: "NOASSERTION"
primary_language: "Python"
tags:
  - "multimodal"
  - "self-hosted"
  - "inference"
maturity: beta
cost_model: open-source
github_stars: 14242
last_commit: "2025-10-28"
docs_url: https://3d.hunyuan.tencent.com/
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
  - "A two-stage 3D generation model that produces textured meshes from a single image or text prompt."
best_for:
  - "You need to generate textured 3D meshes from a single image or text for games, AR, or prototyping"
  - "You want a self-hostable open 3D-generation model rather than a paid cloud service"
avoid_if:
  - "You need production-ready, topology-clean meshes without cleanup, which generated assets rarely provide"
  - "You cannot verify the model's non-standard license for your use case"
enrichment_notes: "Repository and 2025-10-28 activity verified via the GitHub API on 2026-07-12. License is NOASSERTION (custom terms); verify before use."
---

## Overview

Hunyuan3D-2 is Tencent's open model for generating high-resolution textured 3D assets from a single image or a text prompt. It uses a two-stage pipeline, first generating geometry and then synthesizing a texture map, so the output is a usable textured mesh rather than only a point cloud or untextured shape.

## Why it's in the Arsenal

Open image/text-to-3D that produces textured meshes is a fast-moving, high-value niche, and Hunyuan3D-2 is one of the most capable openly available models, making it a distinct multimodal entry for asset creation.

## Architecture

The system separates shape and appearance: a shape-generation diffusion model produces the 3D geometry (typically via a latent representation decoded to a mesh), and a second texture-synthesis diffusion model paints a high-resolution texture conditioned on the geometry and the input image or prompt. This decoupling lets each stage specialize, improving both structural accuracy and texture detail over single-stage approaches.

## Ecosystem Position

Hunyuan3D-2 competes with other image-to-3D models and with photogrammetry and NeRF/Gaussian-splatting pipelines, differentiating by generating textured meshes directly from minimal input. Compared with capture-based methods it needs only an image or text rather than many photos, and compared with closed 3D services it is self-hostable, though generated meshes still need cleanup for production.

## Getting Started

Clone the repository, install dependencies, download the weights (accepting the license), and run the shape-then-texture inference scripts or the Gradio demo with an input image or text prompt; a capable GPU is required.

## Key Use Cases

Rapid 3D asset prototyping for games and AR/VR; converting concept images into meshes; populating scenes with generated props; research on 3D generative models.

## Strengths

Textured-mesh output, single-image or text conditioning, strong open quality, two-stage specialization, and active organizational backing.

## Limitations

Generated meshes often need retopology and cleanup for production, it is GPU-intensive, the license is non-standard (NOASSERTION) and must be reviewed, and fine geometric detail and manifold-clean topology are not guaranteed.

## Relation to the Arsenal

It extends generative modeling into 3D within the multimodal category alongside the image and video generators.

## Resources

- [GitHub repository](https://github.com/Tencent-Hunyuan/Hunyuan3D-2)
- [Project site](https://3d.hunyuan.tencent.com/)

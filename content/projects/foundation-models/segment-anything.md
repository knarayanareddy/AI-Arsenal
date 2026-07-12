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
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: segment-anything
name: "Segment Anything (SAM)"
artifact_type: model
category: computer-vision
subcategory: open-source-models
description: "Meta's promptable segmentation foundation model that produces high-quality object masks from point, box, or text-free prompts, with zero-shot generalization"
github_url: https://github.com/facebookresearch/segment-anything
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "multimodal"
  - "self-hosted"
  - "inference"
maturity: production
cost_model: open-source
github_stars: 54527
last_commit: "2024-09-18"
docs_url: https://segment-anything.com
phase: foundation-model
domain:
  - "vision"
relation_to_stack:
  - "build-on-top"
  - "study-and-reference"
health_signals:
  - "research-origin"
  - "community-driven"
ecosystem_role:
  - "A promptable segmentation foundation model that many downstream vision tools call to generate object masks."
best_for:
  - "You need high-quality, zero-shot object masks from point or box prompts to power labeling, editing, or extraction tools"
  - "You want a segmentation backbone to build interactive selection or auto-masking features on top of"
avoid_if:
  - "You need real-time segmentation on constrained hardware, where distilled variants like MobileSAM/FastSAM fit better"
  - "You need semantic class labels; SAM segments regions but does not name them"
enrichment_notes: "Repository, Apache-2.0 license, and 2024-09-18 activity verified via the GitHub API on 2026-07-12. SAM 2 exists for video; this entry covers the original image model."
---

## Overview

Segment Anything (SAM) is Meta's promptable image-segmentation foundation model. Given a point, box, or mask prompt, it returns high-quality object masks and generalizes zero-shot to objects and domains it was not explicitly trained on, which made it a default backbone for interactive selection, auto-labeling, and downstream vision pipelines.

## Why it's in the Arsenal

SAM redefined segmentation as a promptable foundation-model task and is the mask engine behind a large ecosystem of labeling and editing tools. It is a canonical computer-vision entry that many other cataloged projects depend on.

## Architecture

SAM has three parts: a heavy ViT image encoder that runs once per image to produce an embedding, a lightweight prompt encoder for points/boxes/masks, and a fast mask decoder that combines them to emit masks in milliseconds. This split lets an application encode an image once and then interactively query many prompts cheaply, and the model was trained on the billion-mask SA-1B dataset for broad generalization.

## Ecosystem Position

SAM competes with classic instance-segmentation models in mmdetection-style toolkits but differs by being promptable and class-agnostic, so it complements object detectors like Grounding DINO: detectors propose boxes, SAM turns them into precise masks. Compared with distilled variants (MobileSAM, FastSAM) it is more accurate but heavier, and SAM 2 extends the idea to video.

## Getting Started

Install from the repository, download a ViT-H/L/B checkpoint, load `SamPredictor`, call `set_image()` once, then `predict()` with point or box prompts; `SamAutomaticMaskGenerator` produces masks for a whole image.

## Key Use Cases

Interactive object selection in editors; auto-labeling for detection/segmentation datasets; background removal and compositing; region extraction for downstream vision or multimodal models.

## Strengths

Strong zero-shot masks, promptable interactivity, encode-once/query-many efficiency, huge training data, production adoption, and an Apache-2.0 license.

## Limitations

The ViT-H encoder is compute-heavy and not real-time on modest hardware, masks carry no semantic class, upstream commits slowed after 2024, and very fine or ambiguous boundaries can still require prompt refinement.

## Relation to the Arsenal

It is the segmentation backbone in the computer-vision area and pairs with Grounding DINO and labeling tools cataloged nearby.

## Resources

- [GitHub repository](https://github.com/facebookresearch/segment-anything)
- [SAM paper](https://arxiv.org/abs/2304.02643)

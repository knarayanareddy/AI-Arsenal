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
org_or_maintainer: "IDEA-Research"
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
id: grounding-dino
name: "Grounding DINO"
artifact_type: model
category: computer-vision
subcategory: open-source-models
description: "An open-set object detector that localizes arbitrary objects from free-text prompts by fusing language and vision in a DINO-style detection transformer"
github_url: https://github.com/IDEA-Research/GroundingDINO
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "multimodal"
  - "self-hosted"
  - "inference"
maturity: production
cost_model: open-source
github_stars: 10388
last_commit: "2024-08-12"
docs_url: https://arxiv.org/abs/2303.05499
phase: foundation-model
domain:
  - "vision"
  - "language"
relation_to_stack:
  - "build-on-top"
  - "study-and-reference"
health_signals:
  - "research-origin"
  - "community-driven"
ecosystem_role:
  - "An open-vocabulary detector that turns text phrases into bounding boxes, feeding mask and labeling pipelines."
best_for:
  - "You need to detect objects described in free text without training a class-specific detector"
  - "You want to pair text-prompted boxes with SAM to build automatic labeling or extraction pipelines"
avoid_if:
  - "You have a fixed, known class set and abundant data, where a specialized closed-set detector is faster and cheaper"
  - "You need real-time detection on edge devices, since the model is comparatively heavy"
enrichment_notes: "Repository, Apache-2.0 license, and 2024-08-12 activity verified via the GitHub API on 2026-07-12. Widely combined with SAM as Grounded-SAM."
---

## Overview

Grounding DINO is an open-set object detector that localizes arbitrary objects specified by free-text prompts. By fusing a language model's text features with a DINO-style detection transformer, it detects categories it was never explicitly trained on, turning phrases like 'the left handle' into bounding boxes with confidence scores.

## Why it's in the Arsenal

Open-vocabulary detection removes the need to train a new detector for every class, and Grounding DINO is the most widely used open model for it, especially as the detection half of Grounded-SAM pipelines, making it a key computer-vision entry.

## Architecture

The model performs deep cross-modality fusion: a text encoder produces phrase embeddings that are fused with image features at multiple stages of a DINO transformer detector, so text guides both region proposal and box refinement. A contrastive alignment between tokens and regions lets it score arbitrary phrases, and it outputs boxes with phrase-grounded confidences.

## Ecosystem Position

Grounding DINO competes with closed-set detectors in toolkits like mmdetection but differentiates through language-driven open-vocabulary detection, and it complements SAM: its boxes prompt SAM to produce masks in the popular Grounded-SAM stack. Compared with specialized fixed-class detectors it is more flexible but heavier and generally slower.

## Getting Started

Install from the repository, download the pretrained weights and config, then run the demo with an image and a text prompt to get boxes; the Grounded-SAM projects show how to chain outputs into SAM for masks.

## Key Use Cases

Open-vocabulary detection and auto-labeling; text-prompted region extraction; building Grounded-SAM segmentation pipelines; dataset bootstrapping for rare classes.

## Strengths

Detects arbitrary text-specified objects, strong zero-shot generalization, integrates cleanly with SAM, and an Apache-2.0 license with broad community adoption.

## Limitations

It is compute-heavy and not real-time on edge hardware, upstream activity slowed after 2024, accuracy on very fine or ambiguous phrases varies, and for fixed known classes a trained specialized detector is more efficient.

## Relation to the Arsenal

It pairs with SAM and the vision models in the computer-vision area and links to labeling tooling.

## Resources

- [GitHub repository](https://github.com/IDEA-Research/GroundingDINO)
- [Grounding DINO paper](https://arxiv.org/abs/2303.05499)

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
org_or_maintainer: "open-mmlab"
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
id: mmdetection
name: "MMDetection"
artifact_type: framework
category: computer-vision
subcategory: frameworks
description: "OpenMMLab's PyTorch object-detection toolbox with modular components and hundreds of reproducible detector/segmentation model implementations and pretrained"
github_url: https://github.com/open-mmlab/mmdetection
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "multimodal"
  - "fine-tuning"
  - "self-hosted"
  - "inference"
maturity: production
cost_model: open-source
github_stars: 32809
last_commit: "2024-08-21"
docs_url: https://mmdetection.readthedocs.io
phase: framework
domain:
  - "vision"
relation_to_stack:
  - "build-on-top"
  - "fork-and-adapt"
health_signals:
  - "research-origin"
  - "community-driven"
ecosystem_role:
  - "A modular detection framework providing reproducible implementations of most detection and instance-segmentation models."
best_for:
  - "You need to train, fine-tune, or benchmark closed-set object detection and instance segmentation with many model choices"
  - "You want a modular config-driven framework and a large model zoo of pretrained detectors"
avoid_if:
  - "You need open-vocabulary or promptable detection, where Grounding DINO and SAM fit better"
  - "You want a lightweight single-model dependency rather than a large framework"
enrichment_notes: "Repository, Apache-2.0 license, and 2024-08-21 activity verified via the GitHub API on 2026-07-12. A canonical detection framework; upstream cadence slowed after 2024."
---

## Overview

MMDetection is OpenMMLab's PyTorch object-detection toolbox. It decomposes detectors into interchangeable components (backbone, neck, head, loss) driven by config files and ships a large model zoo of reproducible implementations spanning two-stage, one-stage, anchor-free, and instance-segmentation methods with pretrained weights.

## Why it's in the Arsenal

It is one of the most widely used detection frameworks in research and industry, and its modular config system plus extensive model zoo make it the canonical starting point for closed-set detection and segmentation work.

## Architecture

MMDetection builds on the MMEngine/MMCV foundation and expresses each model as a registry-composed pipeline: a backbone (for example ResNet or Swin) feeds a neck (FPN) and task heads, with datasets, augmentations, schedules, and losses all declared in Python config files. Swapping a component is a config edit, and the same runner handles training, evaluation on COCO-style metrics, and inference/export.

## Ecosystem Position

MMDetection competes with Detectron2 and Ultralytics YOLO frameworks, differentiating on breadth of implemented methods and its config-driven modularity. It complements open-vocabulary models like Grounding DINO and promptable SAM, which target flexible or class-agnostic detection, whereas MMDetection excels at training strong closed-set detectors on defined class sets.

## Getting Started

Install MMEngine/MMCV and MMDetection, pick a model config from the zoo, and run `tools/train.py config.py` or `tools/test.py` with a checkpoint; inference uses the `DetInferencer` API on images.

## Key Use Cases

Training and fine-tuning detectors and instance-segmentation models; benchmarking detection methods; industrial vision pipelines with fixed classes; research on new detection architectures.

## Strengths

Huge reproducible model zoo, modular config-driven design, strong benchmarking on COCO-style metrics, broad method coverage, and an Apache-2.0 license.

## Limitations

The MMCV/MMEngine dependency stack and config system have a learning curve, upstream cadence slowed after 2024, it targets closed-set detection rather than open-vocabulary tasks, and it is a heavy framework rather than a single portable model.

## Relation to the Arsenal

It anchors closed-set detection in the computer-vision area alongside the promptable and open-vocabulary models.

## Resources

- [GitHub repository](https://github.com/open-mmlab/mmdetection)
- [Documentation](https://mmdetection.readthedocs.io)

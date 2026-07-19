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
org_or_maintainer: "roboflow"
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
id: rf-detr
name: "RF-DETR"
artifact_type: model
category: computer-vision
subcategory: models
description: "Roboflow real-time DETR architecture for object detection, instance segmentation, and preview keypoint detection"
github_url: https://github.com/roboflow/rf-detr
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "vision"
  - "inference"
  - "fine-tuning"
  - "benchmark"
maturity: beta
cost_model: open-source
github_stars: 8602
last_commit: "2026-07-18"
docs_url: https://github.com/roboflow/rf-detr
phase: foundation-model
domain:
  - "vision"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "org-backed"
  - "actively-maintained"
ecosystem_role:
  - "Real-time DETR alternative to YOLO-style detectors, with Roboflow training and deployment integrations"
best_for:
  - "Fine-tuning a real-time detector on a custom object dataset"
  - "A single Python API spanning detection and instance segmentation"
avoid_if:
  - "You require a fully permissive license for every Plus model variant"
  - "Your target device lacks the CUDA or TensorRT path used by the published latency comparisons"
enrichment_notes: "Core package is Apache-2.0; RF-DETR Plus uses PML 1.0 and benchmarks are Roboflow-reported. Draft pending review."
---

## Overview

RF-DETR is Roboflow's real-time DETR family for object detection and instance segmentation, with preview support for keypoints. It packages a DINOv2 vision-transformer backbone behind a consistent Python API, making the model useful both as a researchable DETR design and as a fine-tuning target for production computer-vision datasets.

## Why it's in the Arsenal

It earns a slot because it brings DETR-style global matching into a practical real-time package rather than leaving the architecture at paper level. The Apache-2.0 core, published training path, and support for detection plus segmentation give vision teams a concrete alternative to the dominant YOLO-shaped workflows.

## Architecture

The `rfdetr` package exposes task-specific model classes, pretrained checkpoints, dataset configuration, training, and prediction. The DINOv2 backbone supplies visual features while the DETR decoder predicts objects without the usual anchor engineering; deployment examples cover Python inference and export paths, with benchmark latency measured using TensorRT, FP16, and batch size one on an NVIDIA T4.

## Ecosystem Position

RF-DETR competes with real-time YOLO and RT-DETR implementations and complements Roboflow's dataset and deployment services. The catalog should distinguish the Apache-2.0 open-source models from RF-DETR Plus, whose PML 1.0 license changes redistribution and commercial-use considerations.

## Getting Started

Create a Python 3.10-or-newer environment and run `pip install rfdetr`. Load the documented pretrained detector or segmentation checkpoint, point the API at images or a supported dataset, and follow the repository training example before attempting source installs from the `develop` branch.

## Key Use Cases

Use it for custom warehouse or retail detection, instance segmentation on industrial imagery, and rapid comparisons of detector accuracy versus latency. The preview keypoint path is suitable for experiments, but should not be treated as the same maturity level as the core detection API.

## Strengths

The unified API covers detection and segmentation, the DINOv2 backbone gives a strong representation starting point, and the package includes fine-tuning rather than only inference. Roboflow also publishes reproducible benchmark methodology and hardware conditions instead of presenting latency as hardware-free.

## Limitations

Benchmark tables and SOTA language are Roboflow-reported and tied to COCO/RF100-VL, TensorRT, FP16, and a T4; they are not guarantees for another GPU or dataset. RF-DETR Plus components use PML 1.0, and keypoint support is preview quality.

## Relation to the Arsenal

RF-DETR complements the Arsenal's vision foundation models and inference tooling, while competing with YOLO-family detectors for real-time deployments. It is a task-focused vision model, not a general multimodal model or a complete annotation and fleet-management platform.

## Resources

- [GitHub](https://github.com/roboflow/rf-detr)
- [Roboflow benchmark post](https://blog.roboflow.com/rf-detr)

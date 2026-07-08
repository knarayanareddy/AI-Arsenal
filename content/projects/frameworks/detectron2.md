---
id: detectron2
name: Detectron2 (Meta)
version_tracked: null
artifact_type: framework
category: computer-vision
subcategory: frameworks
description: Meta's modular library for detection, segmentation, and visual recognition — the reference research platform behind a decade of detection work
github_url: "https://github.com/facebookresearch/detectron2"
license: Apache-2.0
primary_language: Python
org_or_maintainer: Meta AI (FAIR)
tags: [vision, training, self-hosted]
maturity: production
cost_model: open-source
github_stars: 34599
github_stars_last_30d: 0
trending_score: 55
last_commit: "2026-06-07"
docs_url: "https://detectron2.readthedocs.io/en/latest/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [vision]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [org-backed, research-origin, production-proven]
ecosystem_role:
  - The reference detection/segmentation research platform — modular components (backbones, proposal heads, ROI heads) plus a large pretrained model zoo, designed for swapping architectures rather than shipping one fixed detector
best_for:
  - You need a well-tested implementation of classic detection/segmentation architectures (Faster/Mask R-CNN, RetinaNet, panoptic) with pretrained weights and a config system built for experimentation
  - You're doing detection research and want the modular abstractions the field's papers are implemented against
avoid_if:
  - You want the fastest path from dataset to deployed detector — Ultralytics-style train/predict/export workflows are far more streamlined for applied work
  - You need transformer-era open-vocabulary detection as a first-class citizen — Detectron2's zoo centers on the R-CNN lineage; newer approaches live elsewhere
upstream_dependencies: []
downstream_consumers: [sam2]
alternatives: [ultralytics]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: 34.6k stars, Apache-2.0, last push 2026-06-07 verified via the GitHub API on 2026-07-08. Maintenance is steady but conservative; the model zoo reflects the R-CNN era. Included as the reference vision research framework.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending","date":"2026-07-08","description":"34.6k stars; long-standing reference detection framework"}
featured: false
status: active
---

## Overview

Detectron2 is Meta's PyTorch library for object detection, instance/panoptic segmentation, keypoint detection, and related visual recognition tasks. It provides modular implementations of the canonical architectures (Faster R-CNN, Mask R-CNN, RetinaNet, and descendants), a large pretrained model zoo, and a config-driven training system built for swapping components rather than running one fixed pipeline.

## Why it's in the Arsenal

The catalog's vision coverage needs the research-platform pole as well as the applied one: `ultralytics` is the fast path to a deployed detector, while Detectron2 is the framework the detection literature is written against — its backbone/head abstractions and model zoo are what papers fork and benchmarks reference. Cataloging both makes the applied-vs-research trade-off explicit.

## Architecture

Models are composed from interchangeable parts: a backbone (ResNet/FPN variants) produces features, a proposal generator suggests regions, and task-specific ROI heads produce boxes, masks, or keypoints. A registry+config system instantiates any combination from YAML, which is the mechanism that makes architecture swaps a config change. Training uses a hook-based loop with standard distributed support.

## Ecosystem Position

Upstream: PyTorch. Downstream: countless research forks and derived systems — segmentation work like `sam2` comes from the same lab lineage. Competing/complementary: `ultralytics` (streamlined applied YOLO workflows) and MMDetection (the comparable OpenMMLab research platform) occupy the same space.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install and model-zoo usage.
```

## Key Use Cases

1. **Scenario**: training or fine-tuning a classic detection/segmentation architecture with pretrained weights and a modular config system
2. **Scenario**: implementing detection research against the abstractions the literature already uses

## Strengths

- Battle-tested reference implementations plus a large pretrained zoo — the ground truth many papers compare against
- Modularity by construction: swapping backbones/heads is configuration, not surgery

## Limitations

- More setup and ceremony than applied-first toolkits for straightforward dataset-to-detector work
- Model zoo centers on the R-CNN era; transformer/open-vocabulary detection is better served elsewhere

## Relation to the Arsenal

This is a framework entry: a library you build on. For an applied-first detection toolkit see `ultralytics`; for promptable segmentation weights see `sam2`.

## Resources

- [GitHub](https://github.com/facebookresearch/detectron2)
- [Documentation](https://detectron2.readthedocs.io/en/latest/)

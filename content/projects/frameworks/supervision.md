---
id: supervision
name: Supervision
version_tracked: null
artifact_type: library
category: computer-vision
subcategory: libraries
description: Roboflow's model-agnostic CV utilities — one Detections API over any detector, plus annotators, zone/line analytics, tracking, and dataset tools
github_url: "https://github.com/roboflow/supervision"
license: MIT
primary_language: Python
org_or_maintainer: roboflow
tags: [vision, data, tool-use]
maturity: production
cost_model: open-source
github_stars: 47365
github_stars_last_30d: 0
trending_score: 58
last_commit: "2026-07-08"
docs_url: "https://supervision.roboflow.com"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [vision]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, org-backed, community-driven]
ecosystem_role:
  - "The glue layer of applied CV: normalizes every detector's output (Ultralytics, Transformers, Grounding DINO, SAM...) into one Detections structure, then provides the application logic everyone rewrites — annotation, zone counting, line crossing, tracking, dataset conversion"
best_for:
  - You're building CV applications (counting, dwell time, intrusion, speed) on top of any detector — the zone/line/tracking primitives are the difference between a model demo and an analytics product
  - You mix or switch models — the model-agnostic Detections abstraction means your application code survives swapping YOLO for RT-DETR or a zero-shot detector
avoid_if:
  - You need model training or inference itself — Supervision deliberately does neither; it consumes detections, it doesn't produce them
  - Your pipeline is a single fixed model with trivial postprocessing — the abstraction adds a dependency where five lines of NumPy would do
upstream_dependencies: [ultralytics]
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (47.3k), MIT, and active development (last push 2026-07-08) verified via the GitHub API on 2026-07-08. Model-connector coverage per official docs; maintained by Roboflow with a large community.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/roboflow/supervision","date":"2026-07-08","description":"47.3k stars, MIT, Roboflow-backed"}
featured: false
status: active
---

## Overview

Supervision is the utility layer between CV models and CV applications: `sv.Detections` normalizes outputs from any detector or segmenter into one structure, over which the library provides composable annotators (boxes, masks, labels, traces), spatial analytics (polygon zones, line-crossing counters), ByteTrack tracking, and dataset loading/conversion between formats (COCO, YOLO, Pascal VOC). MIT-licensed and maintained by Roboflow.

## Why it's in the Arsenal

Every applied CV project re-implements the same postprocessing — drawing, counting, zone logic, format conversion — and Supervision is the community's consolidation of that layer (47k+ stars). Its model-agnostic core also has architectural value: it decouples application logic from detector choice, which is exactly the coupling that makes CV codebases brittle as the model landscape shifts under them.

## Architecture

A `Detections` dataclass (xyxy, mask, confidence, class_id, tracker_id) with `from_ultralytics`/`from_transformers`/`from_sam`-style connectors; annotator classes composing over frames; geometric primitives (PolygonZone, LineZone) implementing containment/crossing logic against detection anchors; ByteTrack implementation assigning tracker IDs; dataset utilities for loading, splitting, and converting annotation formats.

## Ecosystem Position

Upstream: any detection/segmentation model — Ultralytics YOLO most commonly, plus HF Transformers, Grounding DINO, SAM-family. Competing: nothing directly (its niche is being the neutral layer); overlapping pieces exist inside individual frameworks but locked to those frameworks. Complementary: Roboflow's data platform, though the library is independent of it.

## Getting Started

```python
import supervision as sv
from ultralytics import YOLO

model = YOLO("yolo11n.pt")
detections = sv.Detections.from_ultralytics(model("image.jpg")[0])
annotated = sv.BoxAnnotator().annotate(scene=image, detections=detections)
```

## Key Use Cases

1. **Scenario**: video analytics — people/vehicle counting in polygon zones, line-crossing tallies, dwell-time measurement — assembled from primitives instead of written from scratch
2. **Scenario**: multi-model CV systems where detections from different models (closed-set + zero-shot) must flow through shared tracking, filtering, and visualization code

## Strengths

- The model-agnostic Detections abstraction — application code becomes independent of detector choice, the single best architectural decision available in applied CV
- High-quality implementations of the tedious layer (annotators, zones, trackers, format converters) under MIT with very active maintenance

## Limitations

- Deliberately not a modeling library: no training, no inference — it's additive to a model stack, never a replacement for one
- Utility-library surface area grows fast; pin versions, as minor releases have historically included API refinements

## Relation to the Arsenal

The application-logic companion to `ultralytics` and `sam2` in the CV vertical — consume their outputs through it. Its decoupling pattern mirrors the provider-abstraction argument made in the orchestration tool entries.

## Resources

- [GitHub](https://github.com/roboflow/supervision)
- [Documentation](https://supervision.roboflow.com)

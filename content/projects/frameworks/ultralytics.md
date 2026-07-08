---
id: ultralytics
name: Ultralytics YOLO
version_tracked: null
artifact_type: framework
category: computer-vision
subcategory: frameworks
description: The YOLO family framework — train, validate, and deploy real-time detection, segmentation, pose, and classification models with a three-line API
github_url: "https://github.com/ultralytics/ultralytics"
license: AGPL-3.0
primary_language: Python
org_or_maintainer: ultralytics
tags: [vision, inference, training]
maturity: production
cost_model: self-hostable
github_stars: 59255
github_stars_last_30d: 0
trending_score: 62
last_commit: "2026-07-08"
docs_url: "https://docs.ultralytics.com"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [vision]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained, org-backed, production-proven]
ecosystem_role:
  - "The default entry point to production computer vision: the YOLO lineage (v5/v8/v11) wrapped in one framework covering detect/segment/pose/classify/track, with export to every deployment target (ONNX, TensorRT, CoreML, TFLite) — real-time CV's equivalent of what Transformers is to NLP"
best_for:
  - You need real-time detection/segmentation on your own classes fast — pretrained weights, a three-line fine-tuning API, and mature export paths take you from labeled data to an edge or server deployment in hours
  - Deployment targets are heterogeneous (Jetson, mobile, browser, server GPU) — the export matrix is the most battle-tested in open CV
avoid_if:
  - AGPL-3.0 is incompatible with your product and you won't buy the commercial license — the license applies to the models you train with it, which surprises teams; check legal early
  - Your task is open-vocabulary or promptable detection — zero-shot models (Grounding DINO, OWL-ViT) or SAM-family segmentation fit better than closed-set YOLO training
upstream_dependencies: []
downstream_consumers: [supervision]
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (59.2k), AGPL-3.0, and daily active development (last push 2026-07-08) verified via the GitHub API on 2026-07-08. AGPL applying to trained-model derivatives reflects Ultralytics' own licensing FAQ; accuracy/speed claims per model family come from Ultralytics' published benchmarks, not re-measured here.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/ultralytics/ultralytics","date":"2026-07-08","description":"59.2k stars, the dominant real-time CV training/deployment framework"}
featured: false
status: active
---

## Overview

Ultralytics packages the YOLO model lineage into a single framework: pretrained checkpoints for detection, instance segmentation, pose estimation, classification, oriented boxes, and tracking; a `model.train()/val()/predict()/export()` API that abstracts the training loop; and export to ONNX, TensorRT, OpenVINO, CoreML, and TFLite. It is how most production real-time vision systems outside big labs actually get built.

## Why it's in the Arsenal

The Arsenal's computer-vision coverage needs its center of gravity: for closed-set real-time detection — still the bulk of deployed CV — Ultralytics is the default by adoption (59k+ stars, daily commits), completeness (data → training → export), and edge-deployability. It also carries the space's most important licensing gotcha, which alone justifies a documented entry.

## Architecture

PyTorch training core with task-specific heads sharing a backbone/neck design (v8 onward anchor-free); dataset layer standardized on YOLO-format labels with auto-download hubs; trainer handles augmentation (mosaic, mixup), EMA, and hyperparameter evolution; export layer traces/compiles models per target runtime with quantization options; tracking integrates ByteTrack/BoT-SORT over any detector.

## Ecosystem Position

Upstream: PyTorch; labeled datasets (Roboflow ecosystem adjacency). Downstream: `supervision` for annotation/zone logic on its outputs, deployment runtimes (TensorRT, CoreML). Competing: MMDetection (research flexibility over ergonomics), RT-DETR variants (transformer detectors, included in Ultralytics itself), zero-shot detectors for open-vocabulary needs.

## Getting Started

```python
from ultralytics import YOLO

model = YOLO("yolo11n.pt")
model.train(data="my_dataset.yaml", epochs=50, imgsz=640)
model.export(format="onnx")
```

## Key Use Cases

1. **Scenario**: custom object detection on an edge device — fine-tune on a few thousand labeled images, export int8 TensorRT/TFLite, run at 30+ FPS on Jetson/mobile
2. **Scenario**: video analytics (counting, zone intrusion, tracking) where YOLO detection plus built-in tracking is the standard pipeline base

## Strengths

- End-to-end completeness with the best deployment-export story in open CV — the gap between "trained model" and "running on device" is where alternatives bleed time
- Relentless maintenance velocity and pretrained-model breadth across five task types under one API

## Limitations

- AGPL-3.0 extends to models trained with the framework — commercial products need Ultralytics' paid license or an architecture that isolates it; this is the most-missed licensing trap in applied CV
- Closed-set paradigm: every new class means labels and retraining — open-vocabulary and promptable models are eating this space from the zero-shot side

## Relation to the Arsenal

The training/deployment framework anchoring the computer-vision vertical; `supervision` builds on its outputs, and `sam2` covers the promptable-segmentation paradigm it doesn't. Licensing diligence guidance parallels the elasticsearch entry's licensing caveat in tools/.

## Resources

- [GitHub](https://github.com/ultralytics/ultralytics)
- [Documentation](https://docs.ultralytics.com)

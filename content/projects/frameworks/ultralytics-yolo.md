---
id: ultralytics-yolo
name: Ultralytics YOLO
version_tracked: YOLO26
artifact_type: framework
category: computer-vision
subcategory: frameworks
description: 'Real-time vision framework: YOLO26 detection, segmentation, depth, pose, OBB and tracking behind one train/validate/export API — AGPL-3.0 or a paid licence'
github_url: https://github.com/ultralytics/ultralytics
license: AGPL-3.0
primary_language: Python
org_or_maintainer: Ultralytics
tags:
  - multimodal
  - efficiency
  - data
maturity: production
cost_model: open-source
github_stars: 62857
github_stars_last_30d: 33
trending_score: 18
last_commit: '2026-10-26'
docs_url: https://docs.ultralytics.com
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain:
  - vision
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - actively-maintained
  - production-proven
ecosystem_role:
  - 'The default production path for real-time vision: Ultralytics turned the YOLO lineage into a train/validate/export pipeline complete enough that ''use YOLO'' means ''use this repo'' for detection, segmentation, depth, pose, OBB and tracking'
best_for:
  - You need real-time detection or segmentation on GPU or edge hardware with minimal ML engineering — YOLO26n runs at 1.7 ms on a T4 TensorRT build at 40.9 mAP, and export to ONNX, TensorRT, CoreML or TFLite is one command
  - You fine-tune on your own labelled objects — the training loop, augmentation set, dataset validation and hyperparameter defaults are tuned for small custom datasets rather than for ImageNet-scale pretraining
  - You need more than boxes from one model family — semantic segmentation and monocular depth joined detection, instance segmentation, pose and oriented boxes in the YOLO26 release
avoid_if:
  - AGPL-3.0 does not fit your distribution and you will not buy the Enterprise licence — shipping it inside a closed product triggers copyleft obligations on the whole work, and the licence question should be settled before the model is trained
  - Your classes are not fixed at training time — open-vocabulary and promptable detectors answer questions this architecture cannot, because YOLO predicts from a fixed label set
  - You need permissive-licence weights for a research artefact — RT-DETR variants and Apache-licensed detectors avoid the copyleft issue entirely
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - ultralytics
  - rf-detr
  - detectron2
  - grounding-dino
  - supervision
integrates_with:
  - pytorch-vision
  - onnx-onnx
  - tensorrt-llm
  - openvino
corresponding_tool_entry: null
enrichment_status: verified
enrichment_notes: 'Re-verified 2026-10-25: 62,824 stars, 92 open issues, AGPL-3.0, last push 2026-10-25. README shows YOLO26 as the current line with detection/segmentation/semantic-segmentation/depth/classify/pose/OBB tasks, YOLO26n at 40.9 mAP / 1.7 ms T4 TensorRT, and an Enterprise Licence route for commercial use.'
added_date: '2026-07-08'
last_reviewed: '2026-10-25'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/ultralytics/ultralytics
    date: '2026-07-08'
    description: 59,255 stars on GitHub as of 2026-07-08 (GitHub API); 62,824 by 2026-10-25
featured: false
status: active
---

## Overview

Ultralytics is the company that turned a research lineage into a product. YOLO26 is the current generation, spanning detection, instance segmentation, semantic segmentation, depth estimation, classification, pose estimation and oriented bounding boxes, with tracking that works across the box-producing tasks. The pitch is in the numbers: YOLO26n at 640 pixels reports 40.9 mAP on COCO at 1.7 ms per image on a T4 with TensorRT, in 2.4M parameters and 5.5 GFLOPs.

Around the models sits the part that actually gets adopted — a uniform API where `model.train()`, `model.val()`, `model.predict()` and `model.export()` behave the same regardless of task, plus dataset validation, augmentation, hyperparameter defaults and an export path to ONNX, TensorRT, OpenVINO, CoreML and TFLite.

## Why it's in the Arsenal

Most computer-vision frameworks are research frameworks, and research frameworks assume you have a PhD student's time. Ultralytics assumes you have a dataset and a deadline. That is a real category difference, and it is why the repository has 62,000 stars and appears in so many production systems whose source never mentions it as a research dependency.

YOLO26 sharpened the engineering story in ways that matter beyond accuracy tables. End-to-end NMS-free inference removes a post-processing step that was always awkward to export and profile — non-maximum suppression is a Python/C++ kernel whose Triton implementation on the GPU is a common export failure. Removing it makes the exported graph closer to the trained graph, which is why the export story is better than a per-point mAP win.

The licence is the counterweight, and it belongs in the same paragraph: AGPL-3.0 with a commercial alternative. That is not a detail at the bottom of the page, it is a decision that constrains the product architecture.

## Architecture

A PyTorch training stack with a task-agnostic core. `YOLO("yolo26n.pt")` loads weights and infers the task from the checkpoint, then the same object exposes training, validation, prediction and export. Dataset definitions are YAML, and the trainer validates them — class balance, label sanity, corrupt images — before spending GPU hours.

The YOLO26 changes are structural rather than incremental: distributed focal loss was dropped from the head in favour of a simpler regression formulation, progressive loss balancing and a small-target-aware label assignment scheme were added, and the model is trained end-to-end so no NMS runs at inference. For deployment what matters is that a single forward pass returns final detections, which exports cleanly to ONNX or TensorRT without a custom plugin.

Export is the second half of the architecture and the reason teams stay: one call produces a serialised engine calibrated to a specific hardware target, and the same call path then runs inference on that engine. AutoBatch, AMP and DDP support exist so a single-GPU fine-tune and a multi-GPU run are the same script with a different argument.

## Ecosystem Position

Compared with `rf-detr` the trade is licence for accuracy: RF-DETR is Apache-licensed and competitive on accuracy, which makes it the obvious alternative when copyleft is unacceptable; Ultralytics answers with a licence purchase rather than a technical argument. Against `detectron2` the difference is maintenance era — Detectron2 is the mature research standard for two-stage and Mask R-CNN-family work, and Ultralytics is where real-time single-stage deployment lives.

Against `grounding-dino` and the SAM family the boundary is fixed versus open vocabulary: those models accept a text prompt and can find categories they were never trained on, at higher latency and with less predictable throughput. `supervision` is complementary rather than competing — it handles annotation formats, tracking overlays and zone logic that Ultralytics leaves to the application.

The ecosystem gravity is its own constraint: `ultralytics` (the older catalog entry) documents the broader platform, YOLO26 weights are distributed through the company's own model hub and platform, and the repo is the customer-acquisition surface for the Enterprise licence. That is a legitimate business model and a governance fact worth knowing.

## Getting Started

```bash
pip install ultralytics
```

```python
from ultralytics import YOLO

model = YOLO("yolo26n.pt")                    # pretrained, downloads on first use
results = model.predict("street.jpg", conf=0.25)
print(results[0].boxes.xyxy, results[0].boxes.cls)

model.train(data="my-dataset.yaml", epochs=100, imgsz=640)
model.export(format="engine", half=True)      # TensorRT engine for this GPU
```

A three-line fine-tune on a custom dataset is genuinely three lines — the dataset YAML is where the real work goes. Validate the export before the model is trusted: `YOLO("yolo26n.engine")` and re-run the validation split through the exported engine, because PyTorch and TensorRT do not always agree at the margins and the discrepancy is usually in post-processing, not weights.

Licence hygiene: `ultralytics` prints its licence terms at import and will flag commercial use. Teams that ignore this discover the problem during due diligence, not during development.

## Key Use Cases

1. **Manufacturing and inspection**: defect detection on a line where 30 fps is a hard requirement and the dataset is a few thousand labelled images from one camera.
2. **Retail and logistics counting**: people, pallets, vehicles and empty shelf slots, using tracking to count across frames rather than per-frame detection.
3. **Edge deployment on constrained hardware**: export to TFLite or OpenVINO and run on a Jetson, an Intel NUC or a phone, where the model's small parameter count matters more than its accuracy headroom.
4. **Pose and gesture pipelines**: keypoint models share the training and export tooling with detectors, so a gesture feature does not require a second framework.
5. **Depth from a single camera**: monocular depth in YOLO26 gives cheap scene geometry for robotics and AR prototyping without a stereo rig or LiDAR.
6. **Dataset bootstrapping**: `model.val()` and the confusion matrix on a held-out split surface label errors faster than training curves do, which is the highest-leverage use of the framework on a young dataset.

## Strengths

- The API is uniform across seven task types, so teams move from detection to segmentation or pose without learning a second framework.
- Export is a first-class workflow — ONNX, TensorRT, OpenVINO, CoreML, TFLite, with NMS-free YOLO26 graphs that export without custom plugins.
- Defaults are tuned for small custom datasets, which is where almost all real deployment happens; the augmentation and hyperparameter set is a genuine head start.
- Training speed per accuracy point is still the reason people choose it: 40.9 mAP at 1.7 ms on a T4 is a difficult baseline to beat on cost per inference.
- Documentation, tutorials and community answers exist for nearly every error message, in a dozen languages.
- Actively maintained with a release cadence measured in weeks, not quarters.

## Limitations

- **AGPL-3.0 is a product decision, made early or made painfully.** Network-served use counts as distribution, and the Enterprise licence is priced for companies that can afford it; a side project and a SaaS have different answers.
- **Accuracy claims are company-measured.** The comparison tables come from the vendor's own benchmark harness, and reproduced numbers on your hardware, resolution and class distribution will differ — sometimes by several points.
- **Fixed class set only.** No text-prompted detection: new categories mean relabelling and retraining, which for a long-tail problem is the wrong shape of work.
- **The ecosystem pulls toward the paid platform.** Weights, hub hosting and the Ultralytics Platform are commercial surfaces, so an evaluation that starts open-source can drift into a subscription as the team scales.
- **Exported-engine drift is real.** TensorRT and ONNX Runtime can disagree with PyTorch at confidence margins and on small objects; validating the engine, not the checkpoint, is mandatory.
- **A large, fast-moving dependency tree.** Frequent releases plus pinned CUDA and PyTorch expectations mean environment rebuilds, and issue count sits around ninety open at any time.

## Relation to the Arsenal

The catalogued periphery matters more than the model file: `rf-detr` for an Apache-licensed comparison, `detectron2` for research-grade two-stage work, `grounding-dino` and `sam2` for promptable segmentation, and `supervision` for the annotation and tracking utilities that sit around any detector. `ultralytics` (the platform entry) covers the wider product surface.

Licence-first reading order: decide AGPL versus Enterprise before training, then benchmark YOLO26 against RF-DETR on your own validation split, then choose the export target. For the training infrastructure the fine-tune will occupy, see [Training and Alignment](../training-and-alignment/_index.md).

## Resources

- [GitHub](https://github.com/ultralytics/ultralytics)
- [Documentation](https://docs.ultralytics.com)
- [YOLO26 model page](https://docs.ultralytics.com/models/yolo26)
- [Licensing](https://www.ultralytics.com/license)
- [Export modes](https://docs.ultralytics.com/modes/export)

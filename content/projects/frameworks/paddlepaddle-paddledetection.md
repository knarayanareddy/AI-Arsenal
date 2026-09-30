---
id: paddlepaddle-paddledetection
name: "PaddleDetection"
version_tracked: null
artifact_type: framework
category: computer-vision
subcategory: frameworks
description: "PaddlePaddle object-detection toolkit covering detection, instance segmentation, tracking, and pose"
github_url: "https://github.com/PaddlePaddle/PaddleDetection"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "PaddlePaddle"
tags: [vision]
maturity: production
cost_model: open-source
github_stars: 14434
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-05-28"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [vision]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed]
ecosystem_role:
  - "Object-detection toolkit on PaddlePaddle, notable as a full detection stack that trains and deploys through one vendor framework without a PyTorch dependency."
best_for:
  - "You are already committed to PaddlePaddle and need detection, tracking, and pose in one codebase with matching config-driven training and export tooling."
  - "You need a detection model family in Paddle format because your deployment target is Paddle Inference or a Paddle-supported accelerator, and reconverting to another runtime is not available."
  - "You are looking for a PP-YOLOE or RT-DETR starting point to fine-tune on proprietary data without assembling a training recipe yourself."
avoid_if:
  - "Your stack is PyTorch, since adopting this means adopting PaddlePaddle, and conversion back is lossy and manual."
  - "You need the newest architectures or the strongest pretrained detection weights, which in this ecosystem usually trail the PyTorch ports of the same models."
  - "You want a minimal, single-model dependency for one detection task, because this is a large multi-model research toolkit with a broad configuration surface."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (14434), Apache-2.0, last commit 2026-05-28, Python, and the topic list were API-verified; no homepage field. Model family names, the config-driven pipeline, Deepsort and fairmot composition, and export targets are from the official repo docs and configs. Relative model-quality claims reflect published comparisons, not runs done here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/PaddlePaddle/PaddleDetection", "date": "2026-09-28", "description": "14,434 stars and last commit 2026-05-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

PaddleDetection is PaddlePaddle's detection toolkit, structured as a set of model families selected through YAML or Python config files: PP-YOLOE and its tiny variants as the fast production baseline, PP-YOLOv2 and YOLOv3 reproductions, Faster R-CNN, Cascade R-CNN, and Mask R-CNN for two-stage accuracy work, FCOS and RetinaNet as anchor-free detectors, RT-DETR as a real-time transformer detector, and specialised branches for face detection, pose estimation, and tracking. It also provides Deepsort and FairMOT for multi-object tracking and person keypoints. The pipeline abstraction is the design centre: each config declares a backbone, neck, head, loss, post-processing, and the transforms, and the same config drives training, evaluation, and export to inference or ONNX, which is what makes a model reproducible across stages instead of re-specified by hand.

## Why it's in the Arsenal

The recurring decision in this ecosystem is whether a detection model will survive the trip from training to deployment. A model built as a training script tends to encode preprocessing, post-processing, and label handling inside the training loop, so exporting it produces a graph that differs subtly from the one the metrics were measured on. PaddleDetection resolves this by making the pipeline a first-class configuration object shared across train, eval, and export, and by shipping the anchor-free and one-stage families with all their detail. The second decision is framework lock-in, resolved by accepting it deliberately: if your deployment runs Paddle Inference, every model here is already in the format that runtime wants, and the cost of PaddlePaddle as your training framework is the price of that compatibility.

## Architecture

A config object composes the model: a backbone such as ResNet, CSP, RepVGG, or a hierarchical backbone; a neck such as FPN or BiFPN; one or more heads carrying anchor or anchor-free assignment; and a post-processing stage with NMS, DMatrix, or matrix NMS. Training attaches a detection or classification loss per head and a distributed DataLoader with mosaic-style batch augmentation, mixup, and random crop; the same config's transform pipeline runs at inference. Export walks the model to an inference program and then to ONNX or a Paddle Inference engine file, with calibration-aware paths for quantized variants. Tracking and pose are composed on top of the detector outputs — a detector produces per-frame boxes, then an association module such as Deepsort or a fairmot head adds identity across frames — which is why the tracking configs are separate files rather than flags on a detection config. Deployment targets include the Paddle Inference engine with CPU and GPU kernels and, for the broader ecosystem, a path through ONNX conversion.

## Ecosystem Position

PaddleDetection competes inside the PaddlePaddle ecosystem with the older PaddleSeg and PaddleClas, and outside it with mmdetection, detectron2, and Ultralytics. mmdetection is the deeper research framework with far more modularity and more custom-architecture work; Ultralytics ships a smaller, faster-moving set of strong YOLO checkpoints with a much simpler training path. Compared to Ultralytics, PaddleDetection offers more detection-first breadth and closer affinity to a Paddle deployment target; compared to YOLOX, it wraps the same lineage with an integrated config and export toolchain. It is an alternative to a PyTorch detection stack rather than a complement, though ONNX export means a trained model can still be handed to onnxruntime or TensorRT for serving when the Paddle runtime is not required.

## Getting Started

Install PaddlePaddle and start a PP-YOLOE fine-tune from a config:

```bash
python -m pip install paddlepaddle-gpu
cd PaddleDetection
python tools/train.py -c configs/ppyoloe/ppyoloe_crn_s_300e_coco.yml --eval --flip --use_gpu
```

Evaluate the saved checkpoint, then export it to an inference model for serving:

```bash
python tools/eval.py  -c configs/ppyoloe/ppyoloe_crn_s_300e_coco.yml --checkpoint weights/best_model.pdparams
python tools/export_model.py -c configs/ppyoloe/ppyoloe_crn_s_300e_coco.yml --checkpoint weights/best_model.pdparams -o deploy/ppyoloe_infer
```

Point the dataset roots inside the config at your own data to fine-tune on proprietary data; the same config governs all three commands.

## Key Use Cases

1. A production detection service where latency and cost on the deployment hardware favour the Paddle runtime, so training and serving stay in one framework.
2. A multi-camera tracking pipeline: a YOLO-family detector plus Deepsort or a fairmot head, configured entirely in this repo and exported to a Paddle Inference model.
3. Fine-tuning a PP-YOLOE or RT-DETR baseline on a small proprietary dataset, where a supplied recipe and a matching export path save weeks of setup.

## Strengths

- Detection, instance segmentation, tracking, pose, and face in one repository with a consistent config-driven pipeline.
- Train, evaluate, and export driven by the same config, which keeps the deployed graph faithful to the evaluated one.
- PP-YOLOE delivers a strong speed and accuracy balance with small model variants for edge deployment.
- A Paddle Inference export path avoids cross-runtime conversion for Paddle-targeted hardware.

## Limitations

Adopting this means adopting PaddlePaddle, and for most PyTorch teams that is the disqualifying cost — operator coverage outside the core set is thinner, third-party tooling assumes torch, and leaving later is work. The newest architectures and the strongest published detection weights usually appear first in PyTorch, so you will often be fine-tuning a slightly older model family. The config surface is broad and documentation is uneven, so moving between model families is a real learning cost. Ecosystem momentum outside China has slowed relative to mmdetection and Ultralytics, which means less third-party tooling and fewer recent community reproductions to copy.

## Relation to the Arsenal

This is the detection entry in content/projects/frameworks and the counterpart to mmdetection and detectron2, which is the comparison worth reading next. Upstream, the vision-model entries in content/projects/foundation-models supply pretrained backbones and the annotation platform in content/projects/data-and-retrieval supplies labels for it. Serving is the natural handoff to onnxruntime and nvidia-tensorrt in content/projects/inference-engines, and the training entries in content/projects/training-and-alignment cover the LoRA path when the detector needs domain adaptation rather than full fine-tuning.

## Resources

- [PaddleDetection GitHub repository](https://github.com/PaddlePaddle/PaddleDetection)
- [PaddleDetection model zoo documentation](https://paddledetection.readthedocs.io)
- [PaddlePaddle documentation](https://www.paddlepaddle.org.cn/documentation/docs/en/index.html)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (14,434 stars, last commit 2026-05-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*

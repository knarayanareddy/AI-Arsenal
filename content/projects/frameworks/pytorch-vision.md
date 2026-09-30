---
id: pytorch-vision
name: "vision"
version_tracked: null
artifact_type: library
category: computer-vision
subcategory: libraries
description: "Torchvision's datasets, image transforms, and reference vision models built directly on torch tensors"
github_url: "https://github.com/pytorch/vision"
license: "BSD-3-Clause"
primary_language: Python
org_or_maintainer: "pytorch"
tags: [vision, pytorch, training]
maturity: production
cost_model: open-source
github_stars: 17931
github_stars_last_30d: 0
trending_score: 34
last_commit: "2026-09-28"
docs_url: "https://pytorch.org/vision"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [vision]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Torchvision datasets, transforms, and reference vision models that define the augmentation and preprocessing contract most PyTorch vision training inherits."
best_for:
  - "You are training a vision model on ImageNet-style data and want the reference augmentations, ResNet and ViT weights, and pretrained checkpoint definitions to line up with published numbers."
  - "You are debugging a training run whose accuracy is suspiciously low and need to rule out an augmentation or normalisation bug before touching the model."
  - "You want detection and segmentation reference models with built-in box and mask transforms that correctly invert coordinates back to image space."
avoid_if:
  - "You need operators outside classical image processing, such as learned augmentations or domain-specific warping, since kornia and albumentations are where that lives."
  - "You need framework portability, because the transforms return torch tensors and couple your pipeline to a specific torch version."
  - "Your dataset is not image-like, meaning audio, video, or point clouds, where the module set simply does not cover the modality."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (17931), BSD-3-Clause license, last commit 2026-09-28, Python as primary language and the topic list were API-verified. v2 transform semantics, the weights-enum recipe mechanism, and model and ops contents are from the official docs; no model was downloaded or trained for this entry."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/pytorch/vision", "date": "2026-09-28", "description": "17,931 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

torchvision is the official vision extension of PyTorch and splits into datasets, transforms, models, and ops. Datasets are the torchvision-datasets family, covering ImageNet, CIFAR, COCO detection and segmentation, VOC, and a set of builder classes such as VisionDataset and CocoDetection that let you declare a custom dataset as an indexable tuple of image and target rather than implementing the full protocol. Transforms live in torchvision.transforms (PIL-side: Resize, RandomResizedCrop, RandomHorizontalFlip, ColorJitter, ToTensor) and torchvision.transforms.v2, which is the tensor-native, arbitrary-order, batched API introduced later and now the recommended path. torchvision.io supplies image and video I/O with GPU decode paths for common codecs, and torchvision.ops supplies nms, roi_align, and deformable convolution. Models exposes reference architectures such as ResNet, EfficientNet, ViT, Swin, ConvNeXt, plus detection and segmentation heads, with IMAGENET1K_V1 and V2 pretrained weight enumerations and a quantization-aware helper API.

## Why it's in the Arsenal

The recurring decision is which preprocessing to standardise on so that a training result is comparable and debuggable. Mismatched normalisation, a different interpolation kernel, or an evaluation transform that leaks crop information produces a model that looks broken for reasons unrelated to the model. torchvision solves this by being the reference: published ImageNet numbers, PyTorch tutorials, and countless repos assume its exact Resize/256, CenterCrop/224, and mean and standard-deviation constants, so adopting it is how you guarantee your pipeline is the one those numbers were measured on. It also removes the need to reimplement coordinate transforms for detection, which is where hand-rolled pipelines most often go subtly wrong.

## Architecture

The library is a thin, versioned layer over torch rather than an engine. A builder class reads a data frame, resolves file paths or archives, and returns an image and target dict; a collate_fn batches them; the transform pipeline then does the work. v2 transforms operate on a structural representation of the batch, holding images, bounding boxes, masks, and keypoints as named leaves, and a single call applies geometry and photometric ops in order while propagating each target through the same geometric parameters. That is the substantive design point: RandomHorizontalFlip flips the image and every box by the same amount because the transform holds the leaves together rather than transforming each independently. v2 supports arbitrary composition order and batches tensors directly, which removes the per-sample Python loop that made v1 transforms the training bottleneck. Weights are hosted on download.pytorch.org and enumerated by name, so `weights=ResNet50_Weights.IMAGENET1K_V2` resolves both the URL and the transform recipe attached to that weight set.

## Ecosystem Position

torchvision is the default vision library for PyTorch, competing most directly with timm, which covers far more architectures and modern training recipes but leaves preprocessing to you, and with mmdetection and detectron2, which are detection-first frameworks rather than a shared low-level layer. It overlaps with albumentations for GPU-batched augmentation and with kornia for geometric operators, both of which the v2 API is converging toward in spirit. Compared with OpenCV and Pillow pipelines, torchvision is not a low-level image library: it is the torch-compatible contract. It is a complement to rather than a replacement for the model entries in content/projects/foundation-models, since those weights are usually loaded through torchvision or timm interfaces anyway.

## Getting Started

Wire a reference training transform to pretrained weights:

```bash
pip install torchvision
```

```python
import torch
from torchvision import models
from torchvision.transforms import v2

weights = models.ResNet50_Weights.IMAGENET1K_V2
train_tf = v2.Compose([
    v2.RandomResizedCrop(224, scale=(0.7, 1.0)),
    v2.RandomHorizontalFlip(),
    v2.ToDtype(torch.float32, scale=True),
    v2.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])
model = models.resnet50(weights=weights)
```

Using the weights enum rather than hand-written constants is what keeps your normalisation aligned with the checkpoint you loaded.

## Key Use Cases

1. Reproducing or fine-tuning an ImageNet or COCO reference model where published numbers assume the canonical transform pipeline.
2. Training a detection model where bounding boxes and images must undergo the identical random crop and flip, which v2 handles as one batched operation.
3. Sanity-checking a new training loop by matching torchvision's transform and optimiser settings exactly, so a low score points at your code rather than at preprocessing.

## Strengths

- Reference implementations and pretrained weights whose published accuracies are reproducible with the shipped transforms.
- transforms.v2 applies one composed pipeline to images, boxes, masks, and keypoints together, so targets stay geometrically consistent by construction.
- Batched, tensor-native transforms remove the per-sample Python loop, which is the usual training bottleneck in v1 pipelines.
- Versioned alongside torch itself, so a CUDA or torch mismatch becomes a single install decision rather than a dependency conflict.

## Limitations

The operator set is deliberately classical, with no learned or domain-specific augmentation, and custom photometric effects still need kornia or a custom op. v2 is a newer API, so much community code and most tutorials still use v1, and migrating means checking that your targets are represented as v2-supported types. Coverage is broad rather than deep: detection and segmentation here are reference implementations, not the tuning surface a dedicated framework would give you. Weights download by default from the official host, so an air-gapped environment must mirror them, and some architectures' reference training recipes lag modern timm configurations.

## Relation to the Arsenal

This is the vision entry in content/projects/frameworks that the model entries in content/projects/foundation-models are normally loaded through, and the right predecessor to a detection stack when you need a custom architecture rather than a reference one. For OCR and document parsing, the docling, marker, and paddleocr entries pick up the imaging pipeline and take it further. In the serving direction, onnxruntime and openvino are how a torchvision model gets exported and deployed, and kornia in the same folder is the source of most geometric operators torchvision does not cover.

## Resources

- [torchvision documentation](https://pytorch.org/vision)
- [torchvision GitHub repository](https://github.com/pytorch/vision)
- [Transforms v2 API guide](https://pytorch.org/vision/stable/transforms.html)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (17,931 stars, last commit 2026-09-28, license BSD-3-Clause, verified via GitHub API on 2026-09-28)*

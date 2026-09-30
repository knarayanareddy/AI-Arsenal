---
id: huggingface-pytorch-image-models
name: "pytorch-image-models"
version_tracked: null
artifact_type: library
category: computer-vision
subcategory: libraries
description: "Apache-2.0 collection of PyTorch image encoders with matched training, validation, and ONNX export scripts for fair comparison"
github_url: "https://github.com/huggingface/pytorch-image-models"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "huggingface"
tags: [vision, pytorch]
maturity: production
cost_model: open-source
github_stars: 37173
github_stars_last_30d: 0
trending_score: 37
last_commit: "2026-09-27"
docs_url: "https://huggingface.co/docs/timm"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [vision]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "The largest curated collection of PyTorch image encoders, with matched training, evaluation, and export scripts so backbones are comparable instead of bespoke."
best_for:
  - "You are choosing a backbone and need every candidate evaluated under the same augmentation, schedule, and metric, since a vendor's own training script rarely matches anyone else's numbers."
  - "You are reproducing a paper that reported a result with its authors' script, and the repository ships the reference recipes, configs, and pretrained weights for those architectures."
  - "You need a deployment-friendly encoder such as a MobileNet or EfficientNet variant with a matching ONNX export and a documented accuracy-latency trade-off."
avoid_if:
  - "Your task is detection, segmentation, or video, because the recipes here are image classification and the head, loss, and augmentation for other tasks are not part of the maintained surface."
  - "You need fine-grained control of a custom training loop with a novel loss, since the maintained training script assumes the standard classification setup."
  - "You need a text or multimodal encoder, where the model-definition layer for language and vision-language checkpoints is the relevant dependency instead."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 37173 stars, Apache-2.0 license, Python primary language, last commit 2026-09-27, 19 GitHub topics, homepage huggingface.co/docs/timm. Supported families, training features, and export paths are read from official docs; the GitHub repo name differs from the timm package name, so docs are the authoritative source for model counts."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/huggingface/pytorch-image-models", "date": "2026-09-28", "description": "37,173 stars and last commit 2026-09-27 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

pytorch-image-models, better known as timm, is a repository of image classification architectures and the training machinery to compare them honestly. It implements a very large number of backbones - ResNet and ResNeXt variants, EfficientNet and its predecessors, NFNets, ViT, Swin, ConvNeXt, CoAtNet, MaxViT, MobileNetV2 through V4, RegNet, DPN, CSPNet, and many more - each behind a common factory so a model is selected by name rather than by importing a file. Alongside the architectures it ships a matched training script with a long record of recipes, a validation routine with standard top-k accuracy, mixup and cutmix augmentation, RandAugment and AugMix policies, gradient caching, distributed training support, and per-architecture default configuration files. Pretrained weights are published on the Hub for most models, and export paths reach ONNX and TorchScript.

## Why it's in the Arsenal

The recurring decision timm resolves is comparability of backbones. Every paper ships its own training script, and a model that looks best in a paper may simply have had a better augmentation policy, a longer schedule, or a different weight decay than the comparison. Centralizing architectures together with a single maintained training recipe means a number from this repository is comparable to another number from the same repository, which is exactly what you need to make an architecture decision. It also removes the re-implementation tax: a new backbone is usable the day it lands, with default hyperparameter configs derived from the original work rather than guessed. The trade-off is that the recipe is a strong default and not an optimization target - if your goal is a bespoke training method, you will outgrow the script.

## Architecture

Each model family is implemented as a module factory function that builds a feature extractor, a pooling head, and a classifier head, parameterized by depth and width variants, and registers it by name so the name in a checkpoint config maps to a constructor. Many families share a staged-block design with an early downsampling stem, so a global default configuration per model can carry input size, crop and interpolation policy, mean and std normalization, and the tag used to fetch pretrained weights - which is why the same load call works across hundreds of architectures. The training script wraps a model in the project's own training infrastructure with fused optimizers, optional AMP in several precisions, a scheduler, mixup and cutmix with a configurable probability schedule, RandAugment and AugMix, random erasing, and repeated augmentation, plus a validation pass computing top-1 and top-5 accuracy on a standard ImageNet-style transform. Distributed training uses torchrun with DDP, and gradient caching allows large-batch training to run on smaller accelerators at some throughput cost. A resolve-data-config and create-model path handles pretrained weight loading, and export utilities emit ONNX and TorchScript graphs from the resolved model, which is what makes the accuracy-versus-latency comparisons in the docs possible.

## Ecosystem Position

timm overlaps with torchvision on the ResNet and EfficientNet families, and compared with torchvision it wins decisively on breadth of modern architectures and on the matched recipe, while torchvision keeps the better-supported detection and segmentation models. It is an alternative to vendoring a paper's modeling file, and it is rather than a detector or a segmentation library: for those tasks the detection and segmentation frameworks in content/projects/agent-systems/ and content/projects/frameworks/ are the relevant dependency. It is nearly the default backbone source for the model-definition layer in content/projects/frameworks/, which imports timm models as vision encoders for multimodal checkpoints, so the two are used together more often than they compete. Compared with the general training frameworks it pairs with, it has a narrow, opinionated focus - classification only - which is what lets it stay current on architecture releases at a rate a broader framework does not. It complements OpenCV in this batch for preprocessing and decoding, which is what supplies the tensors timm consumes.

## Getting Started

Install the package and run one of the shipped training recipes on a single GPU:

```bash
python3 -m pip install timm
python train.py --model resnet50.a1_in1k \
  --dataset imagenet \
  --data-dir /path/to/imagenet \
  --batch-size 128 --epochs 90 --lr 4e-3 \
  --output ./output
```

Use validate.py with a Hub model name to score pretrained weights directly against a standard ImageNet-style transform.

## Key Use Cases

1. Selecting a production backbone: sweep several families under one recipe and pick on your own latency and hardware budget rather than on a paper's claim.
2. Reproducing a paper's reported number, since the reference recipe, default configuration, and pretrained weights for its architecture live here.
3. Exporting a validated encoder to ONNX for a C++ or mobile deployment, keeping the exact normalization policy the training run used.

## Strengths

- Breadth and freshness of architectures: new backbones land within weeks, which no general framework matches at this specialization level.
- One maintained training recipe across every model, so comparative numbers are internally consistent.
- A default configuration per architecture carrying input size, normalization, and pretrained-weight metadata, which eliminates a whole class of silent preprocessing bugs.
- ONNX and TorchScript export with accuracy-versus-latency tables, making encoder choice a deployment decision rather than a guess.

## Limitations

The maintained surface is image classification: detection heads, segmentation decoders, and video models live elsewhere, so a segmentation project borrows the backbone and writes the rest. The default recipe is optimized for classification on ImageNet-scale data and is not a research platform - a novel loss, a different sampling strategy, or a specialized domain needs custom code. Training is single-node DDP with no FSDP, ZeRO, or sharding, so very large models at large batch sizes need workarounds, and the gradient-caching path trades throughput for memory. The size of the model zoo also means memory pressure on a developer machine: hundreds of configs, and weight files that accumulate. And because everything moves fast, a pinned version is necessary for reproducibility, and API changes between releases are not always graceful.

## Relation to the Arsenal

The vision-encoder partner to the model-definition layer in content/projects/frameworks/, which imports timm backbones for multimodal checkpoints, and the reference implementation for the detector and segmenter families in content/projects/agent-systems/. The general training framework in this batch is the substrate it runs inside, while OpenCV supplies the decode and preprocessing that feeds it. Its outputs are what the model entries in content/projects/foundation-models/ adapt, and the fine-tuning recipes in content/projects/training-and-alignment/ are the place to change a backbone rather than a language model. For OCR-specific encoders, the document entries in content/projects/data-and-retrieval/ are the closer neighbor.

## Resources

- [GitHub — huggingface/pytorch-image-models](https://github.com/huggingface/pytorch-image-models)
- [timm documentation](https://huggingface.co/docs/timm)
- [Model hub with pretrained weights](https://huggingface.co/models?library=timm)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (37,173 stars, last commit 2026-09-27, license Apache-2.0, verified via GitHub API on 2026-09-28)*

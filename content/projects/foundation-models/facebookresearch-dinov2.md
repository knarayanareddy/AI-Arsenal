---
id: facebookresearch-dinov2
name: "dinov2"
version_tracked: null
artifact_type: model
category: computer-vision
subcategory: models
description: "Self-supervised vision foundation model whose ViT backbones are the default feature extractor when no labels exist"
github_url: "https://github.com/facebookresearch/dinov2"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "facebookresearch"
tags: [vision, embeddings]
maturity: production
cost_model: open-source
github_stars: 13376
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-06-03"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain: [vision]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [org-backed]
ecosystem_role:
  - "Self-supervised vision foundation model whose distilled backbones are the default feature extractor when no task-specific vision dataset exists."
best_for:
  - "You need image embeddings for classification, clustering, or retrieval and have no labelled data for the domain, so you start from a self-supervised backbone."
  - "You are building a vision model for a new task and want to fine-tune a ViT on a small labelled set rather than training a backbone from scratch."
  - "You want a frozen-feature baseline quickly, extracting embeddings with a single forward pass and fitting a linear or k-NN classifier on top."
avoid_if:
  - "You need dense prediction at production resolution and care about throughput, since a full-resolution ViT pass is heavier than a distilled or smaller backbone for the same accuracy."
  - "You are in a text-image or multimodal setting, since these are vision-only checkpoints with no language tower."
  - "You need a domain with a strong specialist checkpoint, since a task-specific model will beat a generic self-supervised backbone on in-domain data."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (13376), Apache-2.0, last commit 2026-06-03, Python, and the topic list were API-verified; no homepage field. Self-distillation with multi-crop, centering plus sharpening, the distilled ViT sizes, and get_intermediate_layers come from the official repo and paper. Comparative claims against CLIP and MAE reflect published results, not runs performed here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/facebookresearch/dinov2", "date": "2026-09-28", "description": "13,376 stars and last commit 2026-06-03 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

DINOv2 is the self-supervised method and model release from Meta that trains a Vision Transformer on images with no labels, using a self-distillation objective with a multi-crop strategy plus a centering and sharpening of the teacher output to avoid collapse. The released weights come in several sizes and patch configurations, and the practical contribution is the distilled variants: small, base, and large ViT-S/14, ViT-B/14, and ViT-L/14 models trained with a teacher-student distillation objective, which retain much of the linear-probe accuracy of the large model at a fraction of the cost. The public API is deliberately thin: torch.hub.load with the facebookresearch/dinov2 repository, a get_intermediate_layers method that returns patch tokens and the class token from chosen blocks, and a standard forward returning the class embedding. Because the features are used as a frozen representation, the fine-tuning path is ordinary PyTorch — attach a head, unfreeze, and train — and reference notebooks cover k-NN, linear, and attentive probes.

## Why it's in the Arsenal

The recurring decision is what to do when a vision task has no labels and no matching pretrained checkpoint. Training a backbone from scratch is not viable at typical data scale, and reaching for ImageNet-supervised weights imports their label bias. A self-supervised backbone resolves both: it was trained on images alone, so its features are not tied to a label taxonomy, and its linear separability means a linear probe on a few hundred labels already works. The distilled variants make this practical rather than theoretical — a small DINOv2 model is cheap enough to embed a large image collection on one GPU, which is what turns it into the default answer rather than a research curiosity.

## Architecture

Training is self-distillation with no labels. A teacher and a student share the architecture; the student sees several smaller global crops plus local crops, the teacher sees only the global crops, and the student is trained to match a sharpened, centered version of the teacher's distribution. The centering operation subtracts a running batch mean from the teacher output to prevent the trivial all-same-vector solution, and sharpening raises the temperature. For the distilled release, the teacher is a larger model with EMA-updated weights and the student regresses the teacher's features over many patch-level and global crops, which is why the small models are cheap and the large ones are not. Inference is a standard ViT: images are split into 14x14 patches, linearly embedded, given a class token, passed through transformer blocks with interpolated position embeddings for non-training resolutions, and the class token — or a pooled patch representation — is the feature vector. get_intermediate_layers exposes hidden states at chosen block indices, which makes the model usable as a dense feature extractor for segmentation, correspondence, and depth probing rather than only as a global embedder.

## Ecosystem Position

DINOv2 competes with CLIP and OpenCLIP for general-purpose visual representation, and the choice turns on whether you need language alignment: DINOv2 is vision-only and tends to be stronger on dense and geometric tasks, while CLIP's text tower is what makes zero-shot classification and text-to-image retrieval possible. It overlaps with MAE and SimCLR, which are training methods rather than checkpoints, and with SAM and DINO-detect for segmentation, where similar features feed different heads. Compared to ImageNet-supervised ResNet backbones it avoids label bias and generalises better out of domain; compared to MAE, DINOv2 is stronger as a frozen feature extractor. It is a complement to the annotation and detection entries rather than a replacement, since it supplies representations that heads are built on, and an alternative to training a self-supervised model yourself when the compute is not justified.

## Getting Started

Load a distilled backbone through torch.hub and extract features:

```bash
pip install torch torchvision
```

```python
import torch

model = torch.hub.load("facebookresearch/dinov2", "dinov2_vits14")
model.eval()

with torch.no_grad():
    x = torch.randn(8, 3, 518, 518)
    cls_token, patch_tokens = model.get_intermediate_layers(x, n=1)[:1]

features = torch.nn.functional.normalize(cls_token, dim=-1)   # (B, 384)
linear = torch.nn.Linear(384, num_classes)                    # probe head
```

Resize to 518 for the best reported linear-probe numbers, and pass n=1 to get patch-level features for a dense task.

## Key Use Cases

1. Embedding a large unlabelled image collection for clustering, deduplication, or similarity search before any labels exist.
2. Linear or k-NN probing of a new classification task with a few hundred labels, which sets a strong baseline in under an hour of compute.
3. Fine-tuning ViT-B/14 on a domain-specific detection or segmentation dataset, with get_intermediate_layers supplying the patch features the head needs.

## Strengths

- Strong frozen features with no labels and no ImageNet label taxonomy, which transfers better out of domain than supervised backbones.
- Distilled ViT-S/14, ViT-B/14, and ViT-L/14 variants give a real cost and accuracy choice rather than one large model.
- A simple torch.hub entry point with get_intermediate_layers, so dense-feature use needs no custom forward code.
- Apache-2.0 weights, which matters for commercial deployment where a research-only licence would block you.

## Limitations

Inference is a plain ViT forward pass, so cost scales with resolution and the release offers no aggressive pruning or token reduction; embedding a large corpus needs batched GPU work. The models are vision-only, so any text-conditioned task needs a different backbone entirely, and dense tasks still need a trained head. Training is not part of this release, so reproducing or extending the self-supervised objective means reimplementing multi-crop distillation and its collapse-avoidance tricks. Resolutions other than the training one rely on interpolated position embeddings, which works but is not free, and benchmark advantages over CLIP or MAE are task-specific — dense and geometric in particular — so the choice should be validated on your data.

## Relation to the Arsenal

This is the vision counterpart to the language-model entries in content/projects/foundation-models and the natural feature source for detection and segmentation work in content/projects/frameworks. It pairs with segmentation heads and with the annotation tooling in content/projects/data-and-retrieval, since features are only as good as the labels used to fine-tune a head on top of them. In the serving direction, onnxruntime is the export path when this backbone has to run outside PyTorch, and the evaluation entries in content/projects/evaluation are where you decide whether a linear probe beat the baseline you started with.

## Resources

- [DINOv2 GitHub repository](https://github.com/facebookresearch/dinov2)
- [DINOv2 Hugging Face model collection](https://huggingface.co/facebook/dinov2-base)
- [Self-supervised vision foundation models announcement](https://ai.meta.com/blog/dino-v2/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (13,376 stars, last commit 2026-06-03, license Apache-2.0, verified via GitHub API on 2026-09-28)*

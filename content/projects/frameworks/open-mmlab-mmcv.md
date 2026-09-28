---
id: open-mmlab-mmcv
name: "mmcv"
version_tracked: null
artifact_type: framework
category: computer-vision
subcategory: frameworks
description: "Vision operator library and config-runner stack that the OpenMMLab detection and segmentation projects are built on"
github_url: "https://github.com/open-mmlab/mmcv"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "open-mmlab"
tags: [vision, pytorch]
maturity: production
cost_model: open-source
github_stars: 6475
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-09-28"
docs_url: "https://mmcv.readthedocs.io/en/latest/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [vision]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained]
ecosystem_role:
  - "OpenMMLab vision foundation whose operator library and config system made research code reproducible across detection, segmentation, and generation tasks."
best_for:
  - "You are maintaining an OpenMMLab-style detection or segmentation codebase and need mmcv and mmengine to keep the runner, config, and checkpoint machinery working."
  - "You need a specific vision operator such as deformable convolution, rotated NMS, or point-based sampling with a tested implementation rather than your own."
  - "You want the config-driven experiment system that OpenMMLab algorithms are written against, so a paper's reported recipe can be reproduced exactly."
avoid_if:
  - "You are starting a new detection project from scratch, because the API surface is enormous and only worth its weight if you are already inside the OpenMMLab ecosystem."
  - "You need inference on a GPU without a matching build, since the compiled operators are ABI-tied to your exact torch and CUDA versions."
  - "Your team prefers Hugging Face Transformers or a plain PyTorch training loop, where the registry and config machinery adds two abstractions to learn for no benefit."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (6475), Apache-2.0 license, last commit 2026-09-28, and primary language Python were read from the GitHub API; the topics array is empty upstream. The 2.x split to mmengine, the MMCV_WITH_OPS build flag, and the operator list come from the official README and hosted docs; no build or operator test was run here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/open-mmlab/mmcv", "date": "2026-09-28", "description": "6,475 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

MMCV is the shared foundation of the OpenMMLab family: mmdetection, mmsegmentation, mmocr, mmpose, mmtracking, mmgeneration, and mmyolo all depend on it. It provides two distinct things under one repository. The first is a library of computer-vision operators, including RoI align, deformable convolution, sparse and dense soft-nms, rotated and rotated-deformable NMS, point sampling, correlation, and upsample modules, exposed through a compile-time flag that decides whether the CUDA extension is built. The second is infrastructure: a configuration system, logging, checkpoints, distributed helpers, and the Runner abstraction that ties dataset, model, and optimizer to a training loop. In the 2.x line the runner, config, and metric machinery moved to the separate mmengine package, and mmcv keeps operators plus a compatibility layer.

## Why it's in the Arsenal

The recurring decision is whether to reimplement vision primitives or depend on someone else's, and the second half of that is reproducibility of published recipes. An operator like deformable convolution or rotated NMS is a few hundred lines that take weeks to get numerically right, and a subtly wrong one silently costs accuracy. Adopting MMCV buys a tested, widely cited implementation. The config system is the other half of the value: because every OpenMMLab algorithm is a config file plus a registry, a paper's setup is diffable, and a training run can be reproduced from a directory containing one YAML file and a checkpoint, which is exactly what many later frameworks took as their own model.

## Architecture

The package is organized as mmcv.ops, a Python layer that dispatches to a compiled C++/CUDA extension, plus mmcv.transforms, image and geometry augmentation pipelines, and mmcv.utils for checkpointing and visualization. In 2.x, the runner, config, metrics, and visualizer moved to mmengine, and mmcv re-exports the pieces other packages need, so a version mismatch between mmcv and mmengine is the most common installation failure. The compiled extension is version-locked against the exact torch and CUDA build, which is why a source install compiles for minutes and a wheel for the wrong combination either fails to import or segfaults. Registry and config lookups happen at construction time, so building a model from a config is a dictionary lookup over registered classes rather than a hardcoded import graph.

## Ecosystem Position

MMCV overlaps with detectron2 and torchvision, both of which also ship compiled vision operators, and it is a genuine alternative to detectron2 for anyone already using OpenMMLab algorithms, since the two share Caffe2-style config and runner design but not APIs. Against torchvision it is not a general-purpose replacement: torchvision's ops are better integrated with mainstream PyTorch releases, while MMCV's set is broader and more research-oriented, including rotated boxes and deformable variants. It also sits in the same space as Hugging Face Transformers for vision-language models, where the Transformers path is a single pip install and MMCV is the choice when you need the detection-specific training recipe. It complements the model entries in the catalog, since mmdetection and mmsegmentation checkpoints are the consumers of these operators, and it overlaps with the data-augmentation side of the inference-engine phase entry DALI without duplicating its GPU execution engine.

## Getting Started

Install a build matched to your torch and CUDA versions, or take a prebuilt wheel from the OpenMMLab index:

```bash
pip install mmengine
pip install mmcv -f https://download.openmmlab.com/mmcv/dist/cu121/torch2.4.0/index.html
```

```bash
# from source, which compiles the CUDA operators
git clone https://github.com/open-mmlab/mmcv.git
MMCV_WITH_OPS=1 pip install -e .
```

```python
import torch, mmcv
from mmcv.ops import nms, RoIAlign
boxes = torch.tensor([[0., 0., 10., 10.], [1., 1., 11., 11.]], device='cuda')
scores = torch.tensor([0.9, 0.8], device='cuda')
keep, _ = mmcv.ops.nms(boxes, scores, iou_threshold=0.5)
```

Verify the operator build with `python -c "from mmcv.ops import nms; print(nms)"`, since a silent fallback would change results.

## Key Use Cases

1. Reproducing a published detector or segmenter whose configuration is expressed in the OpenMMLab config format.
2. Needing a specific operator with a correct implementation, such as rotated NMS for aerial imagery or deformable convolution for DETR variants.
3. Extending an existing OpenMMLab codebase where mmcv and mmengine supply the runner, checkpoint, and distributed plumbing that algorithms assume.

## Strengths

- A deep library of vision operators with tested CUDA implementations, including rotated-box and deformable variants that are hard to get right independently.
- Config-driven experiments where a run is reproducible from one YAML file, a registry lookup, and a checkpoint.
- The stability backbone for a whole algorithm family, so fixing a runner or config bug fixes it for every consumer at once.
- Apache-2.0 licensing with broad ecosystem adoption, meaning most published OpenMMLab checkpoints and reproductions depend on it implicitly.

## Limitations

The compiled extension is ABI-locked to a narrow matrix of torch, CUDA, and Python versions, and an unsupported combination produces import errors or crashes rather than a clear message, which makes the install the single largest operational risk. The API surface is very large and, since the 2.x split, spans two packages whose versions must be kept compatible. Documentation is uneven across the operator surface, and much of the mental model lives in Chinese-language docs and years of accumulated forum knowledge. It is also unmaintained-by-necessity in the sense that new research operators are not prioritized, so cutting-edge architectures still require your own extension build.

## Relation to the Arsenal

This is a framework-phase entry that sits underneath the OpenMMLab model entries in the computer-vision category rather than beside them. Downstream it feeds the training-and-alignment phase, where any fine-tuning of an OpenMMLab checkpoint inherits this runner. The data-pipelines phase, particularly the DALI entry, addresses the same performance problem from the input side rather than the operator side, so the two are complementary. For vision-language retrieval, the ColPali entry in data-and-retrieval is a modern alternative path that skips detection entirely.

## Resources

- [MMCV GitHub repository](https://github.com/open-mmlab/mmcv)
- [MMCV documentation](https://mmcv.readthedocs.io/en/latest/)
- [OpenMMLab installation matrix for CUDA and torch versions](https://mmcv.readthedocs.io/en/latest/get_started/installation.html)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (6,475 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*

---
id: kornia-kornia
name: "kornia"
version_tracked: null
artifact_type: library
category: computer-vision
subcategory: libraries
description: "Differentiable geometric computer-vision library of batched PyTorch operators for warps, homographies, and pose"
github_url: "https://github.com/kornia/kornia"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "kornia"
tags: [vision, pytorch]
maturity: production
cost_model: open-source
github_stars: 11385
github_stars_last_30d: 0
trending_score: 32
last_commit: "2026-09-28"
docs_url: "https://kornia.readthedocs.io"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [vision]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Geometric computer-vision library of differentiable operators on tensors, so warps, homographies, and pose maths are batched and differentiable rather than hand-rolled per project."
best_for:
  - "You need image warps, homography estimation, or camera pose in a training loop and want them batched and differentiable rather than a per-sample OpenCV call."
  - "You are implementing or reproducing geometric vision work — feature matching, optical flow, image registration, SLAM front-ends — where kornia supplies the operators the paper assumes."
  - "You need depth estimation, image alignment, or spatial transformer layers as drop-in PyTorch modules with gradients flowing to the poses and depth maps."
avoid_if:
  - "You need a general-purpose image processing toolbox, since kornia is deliberately focused on geometry and photometric filtering is not its strength."
  - "You are doing classical, non-learned processing on CPU at scale, where OpenCV is faster, better tested, and already parallelised."
  - "You need pre-trained recognition or detection models, since this is an operator library with no model zoo."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (11385), Apache-2.0 license, last commit 2026-09-28, Python as primary language and the topic list were API-verified. grid_sample-based warps, SVD homography solving, pose decomposition, and the geometry and feature namespaces are from the official docs and source; conditioning and export caveats are engineering judgement, not measured here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/kornia/kornia", "date": "2026-09-28", "description": "11,385 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

kornia is a PyTorch-native library whose modules are differentiable, batched, and device-agnostic. It spans geometric computer vision — perspective and affine warps, homography estimation from point correspondences, essential and fundamental matrix estimation, PnP-style camera pose solving, image registration, optical flow, depth estimation, and pose estimation — plus image filtering and morphology, colour and channel operations, feature descriptors, and a set of differentiable augmentation modules, all implemented as torch functions or nn.Module layers that accept batched tensors. Modules come in two flavours: tensor-level functions operating directly on inputs, and Module wrappers that register as layers, so a homography solver can be dropped into a model and its output optimised by backprop. The differentiation trick is that most operations are built from torch primitives — grid_sample for warps, SVD and least-squares solves rather than closed-form numpy calls — so gradients are obtained for free. A geometry module holds explicit camera and point models, and the torch.utils submodule covers discrete and structured operators used by the spatial ones.

## Why it's in the Arsenal

The recurring decision is how to get geometry into a training loop. The default is to call OpenCV or scikit-image per sample inside a data loop, which is not batched, not differentiable, and forces a round trip through CPU arrays on every iteration — a common reason geometric deep-learning papers are slow. kornia resolves this by expressing the same operators as tensor functions built from differentiable primitives, so a warp is a grid_sample call, a homography comes from SVD on a correlation matrix, and the pose parameters receive gradients. That converts a two-stage pipeline of estimate-then-optimise into one end-to-end model, which is the design decision behind essentially every learned-geometry method in the last few years.

## Architecture

A representative path: warp_perspective builds a normalised pixel grid, computes the homography, samples it to produce source coordinates, and calls grid_sample to resample the input batch. Homography estimation from point correspondences builds a linear system from the correspondences, SVD-solves it for the null vector, and rescales to a 3x3 matrix. Camera pose routines take intrinsics and solved matrices, decompose rotation through SVD and translation from the translation vector, and can refine further with Levenberg-Marquardt iterations computed in torch. Optical flow follows coarse-to-fine or TV-L1 variants with a warping loop that is itself differentiable, and depth networks are provided as modules whose outputs feed a differentiable photometric or feature-matching loss. Because everything composes from torch ops, the batch dimension is just another tensor dimension, and device placement follows the input, so the same code runs on CPU and GPU unchanged. The Module wrappers expose parameters where a layer is meant to be learned, and the functional namespace exposes the same math for use inside a custom forward.

## Ecosystem Position

kornia is the PyTorch-native complement to torchvision, which is deliberately the base layer, so the two are used together rather than chosen between — kornia's operators are what the pose, registration, and depth entries in this catalog build on. It competes with the classical toolchain of OpenCV and scikit-image for geometry, winning on differentiability and batching while losing on raw CPU throughput and algorithmic breadth. It overlaps with the Lox and PnP code in recent papers, which is the point: most modern geometric CV papers claiming to be differentiable are using kornia functions underneath. Compared with a domain-specific library like a full SLAM frontend, kornia is operators only, so it is a component rather than a system, and compared to a differentiable renderer it overlaps only on warping and rasterisation primitives.

## Getting Started

Estimate a homography from correspondences and warp a batch of images:

```bash
pip install kornia
```

```python
import torch, kornia as K

img = torch.rand(2, 3, 240, 320, device="cuda")
src = torch.rand(2, 4, 2, device="cuda")
dst = torch.rand(2, 4, 2, device="cuda")

H, order = K.geometry.transform.get_homography_2d_from_points(src, dst, weights=None)
warped = K.geometry.transform.warp_perspective(img, H, dsize=(240, 320))

H.sum().backward()      # gradients flow through H, then back to src and dst
```

The `kornia.geometry` and `kornia.feature` namespaces are where the useful operators live; the top-level names are shortcuts to the same functions.

## Key Use Cases

1. Image alignment or registration inside a training loop, where the estimated homography receives gradients and the warping is batched on GPU.
2. Differentiable geometric augmentation pipelines, using kornia augmentation modules as a trainable replacement for fixed torchvision transforms.
3. Reprovisioning a geometric vision method: feature descriptors, matching, RANSAC-style estimation, and pose decomposition all exist as differentiable torch functions.
  

## Strengths

- Batched and differentiable where the classical toolchain is neither, so geometry can be optimised end to end inside a model.
- Composes from torch primitives, so device placement, autograd, and torch.compile compatibility come for free.
- Covers the full geometric pipeline — estimation, decomposition, warping, flow, depth — in one consistent namespace.
- Lightweight and focused, adding little install weight or complexity to a torch-dependent project.
  

## Limitations

The operator set is narrow by design, so general image processing — filters, morphology, thresholding, most colour spaces — is not its job and OpenCV remains the right tool. Numerical robustness differs from OpenCV: SVD-based solvers and least-squares fits are differentiable but not always as well conditioned, and a degenerate correspondence set produces a plausible-looking wrong answer rather than an error. The library is young enough that some algorithms are less battle-tested than their classical equivalents, and there is no model zoo, so nothing here gives you a pretrained network. Iteration speed can also suffer when a chain of many differentiable ops builds a deep autograd graph inside a per-iteration training loop, a cost that paper-level implementations accept but production may not.

## Relation to the Arsenal

This is the geometric-vision layer in content/projects/frameworks, sitting on top of the torchvision entry in the same folder and underneath any project doing learned pose, depth, or optical flow. It is also the standard implementation behind several robotics-adjacent entries: the depth and pose work in content/projects/foundation-models assumes these operators exist. For classical pipelines it is a complement to rather than a replacement for OpenCV, and in the serving direction an onnxruntime export of a kornia-based model needs the grid_sample and SVD paths supported, which is worth checking before committing.

## Resources

- [Kornia documentation](https://kornia.readthedocs.io)
- [Kornia GitHub repository](https://github.com/kornia/kornia)
- [Geometric computer vision tutorials](https://kornia.readthedocs.io/en/latest/geometric.html)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (11,385 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*

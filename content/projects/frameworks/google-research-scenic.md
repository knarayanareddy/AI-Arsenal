---
id: google-research-scenic
name: "scenic"
version_tracked: null
artifact_type: framework
category: computer-vision
subcategory: frameworks
description: "JAX vision research library that expresses data loading, model, loss, and metrics as whole composable functions rather than mutable modules"
github_url: "https://github.com/google-research/scenic"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "google-research"
tags: [vision, jax, research, training]
maturity: production
cost_model: open-source
github_stars: 3838
github_stars_last_30d: 0
trending_score: 29
last_commit: "2026-09-28"
docs_url: "https://github.com/google-research/scenic"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [vision]
relation_to_stack: [study-and-reference, build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "JAX-based computer-vision research library that expresses whole training pipelines — data loading, model, loss, metrics — as composable jit-compatible functions."
best_for:
  - "You want a full training run for a vision model to compile as one graph, so augmentation, model, and loss fuse instead of round-tripping per step."
  - "You are comparing architectures and want the whole run specified by config, so a change is a diff and not a rewritten training script."
  - "You are porting a PyTorch vision implementation to JAX and want a library whose structure matches the paper's equations."
avoid_if:
  - "You need a large collection of ready-trained vision checkpoints with fine-tune recipes, where the Hugging Face Transformers path is faster to reach a result."
  - "You are new to JAX, since Scenic assumes you are fluent in transformations, pytrees, and static shapes before you read a model."
  - "Your task is an off-the-shelf classification run on ImageNet, where a short PyTorch loop and existing pretrained weights are the pragmatic choice."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (3838), Apache-2.0 license, last commit 2026-09-28, primary language Python, and all seven topics were read from the GitHub API. The functional input pipeline, model, loss, and metrics contract, whole-step compilation, pure callback mixed precision, and scan-based accumulation come from the official README and source layout; no baseline was trained here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/google-research/scenic", "date": "2026-09-28", "description": "3,838 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Scenic is a Google Research library for vision and beyond, built on JAX and Flax, that takes a different shape from the usual training framework. Where most frameworks expose a Model and let the trainer own the loop, Scenic treats the entire training procedure as a pure function: the input pipeline produces batches, the model function produces a structure of predictions, the loss function computes a scalar, and the metrics function consumes that structure. The whole thing is then jitted, pmapped, and compiled, so data augmentation and the model are part of the same graph. A run is configured by a config object, and Scenic ships baselines across classification, segmentation, depth, detection, self-supervised pretraining, and vision-language objectives, with Mixup, CutMix, label smoothing, and standard evaluation protocols implemented against those interfaces.

## Why it's in the Arsenal

The recurring decision is where to draw the line between a compiled model and an eager training loop. In a typical framework only the model's forward pass is compiled, so augmentation, loss, and metric computation still run op by op and the step is bounded by dispatch overhead rather than by the GPU. Scenic compiles the whole procedure, which is the difference between a step that a large vision model dominates and a step where launch overhead is measurable, and it is particularly visible at scale where many small kernels serialize. The functional shape is also why Scenic runs are reproducible from configuration: there is no hidden module state to drift, since the function of config and data is the entire artifact.

## Architecture

A Scenic experiment composes several pure functions through a graph traversal that recognizes the model, loss, metrics, and data interfaces and wires them into a train and evaluate step. Inside the step, the input pipeline is itself jitted or vectorized so augmentation runs on device, and mixed precision is expressed with a pure callback to a float32 loss computation. State is explicit: an optimizer built from Optax transformations, a carry object threaded through a scan or fori_loop over steps, and metrics accumulated in the carry so they survive the loop without a Python callback per step. Checkpointing, distributed sharding, and the train and eval split all operate on those same pytrees, which is why a Scenic run scales across TPU and GPU meshes without a custom parallel trainer.

## Ecosystem Position

Scenic is a rather than an alternative to mainstream vision frameworks: it assumes JAX and Flax, so a team already committed to PyTorch pays a second paradigm for every experiment. It competes with the JAX vision entry in this catalog, namely Flax itself, and the division of labor is that Flax is the layer and Scenic is the collection of research training recipes, so Scenic consumes Flax rather than replacing it. It is an alternative to the MMCV and mmdetection configuration-driven path for vision research, and the two reach similar reproducibility with different trade-offs: OpenMMLab leans on a config system and compiled operators, Scenic leans on whole-program compilation and JAX fusion. It also overlaps with the Brax entry as another Google Research project on the same JAX execution model, so the two together are the reference for what a compiled research codebase looks like.

## Getting Started

Install with a JAX backend and run one of the shipped baselines:

```bash
pip install scenic
# JAX backend, e.g. pip install -U "jax[cuda12]"
```

```bash
# run a small ImageNet classification baseline
export XLA_PYTHON_CLIENT_MEM_FRACTION=0.8
python -m scenic.projects.classification.wrn_28_2.train \
    --config=configs/imagenet.py
```

```python
# the functional contract: a model is a function of inputs and variables
def model_fn(params, batch):
    logits = flax.linen.Dense(1000)(batch.image, params)
    return logits, batch.label

def loss_fn(outputs, params):
    logits, labels = outputs
    return optax.softmax_cross_entropy(logits, labels).mean()
```

Baselines and configs are listed in the repository's `scenic/projects` directory, and pretrained checkpoints are published per baseline.

## Key Use Cases

1. Training a vision model where step time is dominated by launch overhead, and compiling the whole run measurably improves utilization.
2. Porting a paper's equations to JAX, where the functional interface maps directly onto the mathematical description.
3. Reproducing a Scenic baseline, since the released configs and checkpoints give a known reference point for a change you are testing.

## Strengths

- The entire training run, including augmentation and loss, compiles into one graph, so per-step dispatch overhead largely disappears.
- Runs are specified by configuration over pure functions, which makes an experiment diffable and free of hidden module state.
- Metrics and state are carried through a scan as pytrees, so accumulation and checkpointing need no Python callback per step.
- Broad baseline coverage, from classification and segmentation to self-supervised pretraining and vision-language objectives, all on one interface.

## Limitations

Adopting Scenic means adopting JAX, and that is the real cost: transformations, pytrees, sharding, and static shapes are prerequisites, not optional reading. The published baselines are the most reliable path, and running a custom architecture means writing every interface yourself, since there is no loose plug-and-play model API as in PyTorch. Documentation is written for researchers and skips the onboarding detail a production team wants, and debugging inside a jitted step still means recompiling to inspect tensors. The checkpoint and fine-tune ecosystem is far smaller than the PyTorch one, so pretrained starting points for a new task are often absent, and large-scale runs are typically validated on TPU configurations that mirror Google Research's own setup.

## Relation to the Arsenal

This is a framework-phase entry that sits directly on top of the Flax entry, consuming its module and pytree model, and next to the Brax entry, which shares the same JAX execution model in the reinforcement-learning domain. Its outputs are checkpoints consumed by the training-and-alignment phase, and its performance claims are the kind that the benchmark and eval entries in the benchmarks-and-evals phase would be used to verify. For non-JAX vision work the MMCV entry is the comparable configuration-driven path in the same phase.

## Resources

- [Scenic GitHub repository](https://github.com/google-research/scenic)
- [Scenic project directory and baselines](https://github.com/google-research/scenic/tree/main/scenic)
- [JAX documentation](https://jax.readthedocs.io)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (3,838 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*

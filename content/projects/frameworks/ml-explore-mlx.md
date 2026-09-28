---
id: ml-explore-mlx
name: "mlx"
version_tracked: null
artifact_type: framework
category: llms
subcategory: frameworks
description: "MIT-licensed array framework with a NumPy-like API and lazy evaluation built on Apple silicon's unified memory"
github_url: "https://github.com/ml-explore/mlx"
license: "MIT"
primary_language: C++
org_or_maintainer: "ml-explore"
tags: [local]
maturity: beta
cost_model: open-source
github_stars: 28582
github_stars_last_30d: 0
trending_score: 36
last_commit: "2026-09-28"
docs_url: "https://ml-explore.github.io/mlx/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained]
ecosystem_role:
  - "Array framework with a NumPy-like API and a lazy unified-memory execution model, purpose-built for Apple silicon so training and inference loops never leave the SoC."
best_for:
  - "You are on a Mac and want to fine-tune or run a small language model without a separate GPU, because the unified memory removes the host-device copy the CUDA path is built around."
  - "You are porting a NumPy or JAX-style model to a Mac, and you want a familiar functional API plus composition, with the same lazy-graph execution model the array frameworks use."
  - "You are prototyping an on-device model for iOS or macOS and want the same library in the prototype and in a Metal-backed application."
avoid_if:
  - "Your deployment is Linux with an NVIDIA GPU, because the framework targets Apple silicon and you gain nothing from its memory model elsewhere."
  - "You need the breadth of the dominant model-definition ecosystem, since checkpoints and third-party code written against the eager PyTorch interface do not run here without conversion."
  - "You need distributed multi-node training, because the supported execution is local to one machine's unified memory with no cluster story."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 28582 stars, MIT license, C++ primary language, last commit 2026-09-28, single topic 'mlx', homepage ml-explore.github.io. Lazy evaluation, unified-memory scheduling, reverse-mode grad, and conversion utilities are from official docs; the code sample was not executed on Apple hardware here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/ml-explore/mlx", "date": "2026-09-28", "description": "28,582 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

MLX is an array framework from Apple's ML research group designed around the hardware it ships on. Its API is deliberately NumPy-like, with familiar ndarray creation, indexing, and broadcasting, plus a tree of composable transformation functions rather than a class hierarchy, so operations build up into a graph instead of executing immediately. The distinctive piece is the memory model: on Apple silicon the CPU and GPU share physical memory, so a lazy array can sit in one buffer and both the CPU and the Metal GPU can operate on it without a copy, and the framework schedules operations across the two based on what is available. It ships a small set of neural-network layers, an optimizer, quantization, and a conversion path from the dominant checkpoint format, so local fine-tuning of a small model is a realistic use.

## Why it's in the Arsenal

The recurring decision MLX resolves is that a Mac is a unified-memory machine and most array frameworks do not know that. In a CUDA-oriented stack, a model lives in VRAM and any CPU work - tokenizing, preparing a batch, inspecting output - requires an explicit copy back and forth, and the result is a pipeline of transfers that dominates small workloads. Here the array is one allocation that both processors can reach, so the boundary between the eager Python parts and the compiled math effectively disappears, and lazy evaluation then lets the compiler fuse operations across what would have been many separate kernel launches. The second decision is a familiar API: NumPy-style arrays mean existing numerical code ports with small edits rather than a rewrite, and the composable-function style makes transformation of a program natural. The honest limit is scope - this is a local, single-machine framework, so its advantages are exactly the ones a laptop has and its absence of distribution is exactly the one a laptop lacks.

## Architecture

The core is a lazy array type. An operation on an array returns a new node in a graph holding the primitive and its inputs rather than computing immediately, and an `eval` call - or a `value_and_grad` call during training - traverses the graph, topologically sorts it, and schedules each primitive onto the best available backend. That scheduling is where the unified-memory design pays off: the Metal backend and the CPU backend share the same buffer, so a graph that interleaves tensor math with Python-side data manipulation does not pay a transfer for each transition, and the framework can put a whole fused sequence on the GPU or keep small operations on the CPU. Gradients are computed by applying a reverse-mode transform to the graph rather than by a recorded tape, so differentiation composes with any composition of the transformation functions. The library exposes a `nn` module with layers, a `optimizers` module, common loss functions, quantization primitives, and a conversion utility that reads the dominant checkpoint format and writes local weights, which is what makes an existing small language model trainable on a Mac. Distributed primitives exist for multi-device Macs, but the supported scale is one machine.

## Ecosystem Position

MLX competes with PyTorch and with the JAX entry in this batch for local model development, and compared with JAX it shares the composable-transformation and lazy-evaluation ideas while adding Apple's unified-memory scheduling, which is the entire reason to choose it; compared with PyTorch it wins on a Mac and loses everywhere else. It is an alternative to running a small model on a hosted GPU for experimentation, and rather than a serving engine it is a local development and fine-tuning framework: the inference engines in content/projects/inference-engines/ are where production throughput lives, and compared to them MLX optimizes for a single user on one machine. It overlaps with the model-definition layer in content/projects/frameworks/, which is where you get checkpoints, but not natively as a target here - conversion is a real step. It complements the local desktop tooling in this batch, which serves the same hardware, and its quantization support is what makes a larger model fit in the memory a Mac actually has. For evaluation of a trained checkpoint, the harness entry in this batch is the other half of the loop.

## Getting Started

Install the framework on Apple silicon and evaluate a composed function, which shows the lazy-graph behavior:

```bash
python3 -m pip install mlx
```

```python
import mlx.core as mx
import mlx.nn as nn

x = mx.random.normal((256, 512))
model = nn.Sequential(nn.Linear(512, 1024), nn.GELU(), nn.Linear(1024, 10))

def loss_fn(m, x, y):
    return nn.losses.cross_entropy(m(x), y)

loss, grads = nn.value_and_grad(loss_fn, model)(x, mx.zeros((256,), dtype=mx.int32))
mx.eval(grads)
print(loss.item())
```

## Key Use Cases

1. Fine-tuning a small language model on a Mac for a prototype or a personal tool, where a hosted GPU is unnecessary cost and a separate workstation is unavailable.
2. Rapid numerical experimentation with a NumPy-style API, where writing the model as composable functions and letting the compiler fuse operations is the point.
3. An on-device model destined for a Metal-backed iOS or macOS application, so the prototype and the shipped build share a framework.

## Strengths

- Unified memory is used directly: the CPU and GPU share one buffer, so the host-device copies that dominate small CUDA workloads disappear.
- Lazy evaluation plus a composable transformation API, so fusion and differentiation both apply to the program as written rather than to a module tree.
- A familiar NumPy-shaped interface, so numerical code ports with small edits instead of a rewrite.
- Checkpoint conversion and quantization built in, which is what makes adapting an existing small model on a Mac practical rather than theoretical.

## Limitations

The scope is Apple silicon and one machine: no distributed multi-node training, no cluster story, and no reason to use it on an NVIDIA workstation. The ecosystem is the binding constraint - most pretrained tooling, custom kernels, and third-party extensions target the eager PyTorch interface, and the model-definition layer in content/projects/frameworks/ is not natively a target here, so ports cost real work. The API is still moving, which means code written against last quarter's version may need changes. Quantization quality and coverage are narrower than the mature runtimes, and the model formats it handles well are the smaller ones. And the pure-hardware benefit disappears the moment the model is larger than the machine's memory, at which point you need a different tool entirely.

## Relation to the Arsenal

The Apple-silicon branch of the frameworks folder, and the local counterpart to the general training framework and the JAX entry in this batch. Its checkpoints come from content/projects/foundation-models/ through the conversion path rather than a native load, and its training output is what the local serving tools in this batch and the inference engines in content/projects/inference-engines/ would host - with the local runtimes the more natural pairing. The evaluation harness in this batch is the other half of a local experiment loop, and the agent tooling in this batch that can point a model provider at a local endpoint is how you would put a locally fine-tuned model to work. If you are on Linux with an NVIDIA GPU, none of this applies and the framework choices are different; if you are on a Mac, it is the framework whose memory model matches the machine.

## Resources

- [GitHub — ml-explore/mlx](https://github.com/ml-explore/mlx)
- [MLX documentation](https://ml-explore.github.io/mlx/)
- [MLX examples repository](https://github.com/ml-explore/mlx-examples)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (28,582 stars, last commit 2026-09-28, license MIT, verified via GitHub API on 2026-09-28)*

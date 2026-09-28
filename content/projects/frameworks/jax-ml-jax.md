---
id: jax-ml-jax
name: "jax"
version_tracked: null
artifact_type: framework
category: llms
subcategory: frameworks
description: "Apache-2.0 composable array framework whose jit, grad, vmap, and pmap transformations differentiate and compile Python programs"
github_url: "https://github.com/jax-ml/jax"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "jax-ml"
tags: [research, training]
maturity: production
cost_model: open-source
github_stars: 36358
github_stars_last_30d: 0
trending_score: 36
last_commit: "2026-09-28"
docs_url: "https://docs.jax.dev"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Composable array-programming framework whose jit/grad/vmap transformations are the substrate for large-scale model training and differentiable simulators."
best_for:
  - "You want to express a model as pure functions over arrays and have differentiation, vectorization, and compilation applied automatically, so there is no imperative tape or module hierarchy to restructure."
  - "You are training a model at scale across many accelerators and need pmap, sharding annotations, and jit compilation rather than a module-level distributed wrapper."
  - "You need a differentiable simulator, a solver, or a Bayesian model where reverse-mode autodiff through control flow and higher-order derivatives are the hard part and JAX handles them structurally."
avoid_if:
  - "Your project depends on a broad set of PyTorch-only libraries, custom CUDA operators written against that API, or the TorchScript and TorchServe ecosystem, because reimplementing against JAX is a port rather than a config change."
  - "You are a Python engineer who finds eager execution and trace-based compilation debuggable, since a JAX error often points at a tracing stage rather than at the line that failed."
  - "You need an enormous catalogue of prebuilt vision or language layers, because the model-definition layer in content/projects/frameworks/ is written against the dominant eager framework."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 36358 stars, Apache-2.0 license, Python primary language, last commit 2026-09-28, single topic 'jax', homepage docs.jax.dev. Tracing, jaxpr lowering, XLA compilation, pure callbacks, and sharding annotations are described in official docs; no accelerator kernel was benchmarked."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/jax-ml/jax", "date": "2026-09-28", "description": "36,358 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

JAX composes transformations with Python and NumPy rather than wrapping a tensor object: you write a function, then derive jax.jit, jax.grad, jax.vmap, or jax.pmap from it, and each is a new function, so a program can be differentiated, vectorized, and compiled in any order. Underneath, values are immutable arrays on a device, operations dispatch through a lowering to a small intermediate representation, and the XLA compiler fuses and schedules those for the target accelerator. The result is that a batched, differentiated, compiled training step is the normal way to write code rather than a set of decorators layered over an eager loop, and the same source runs on CPU, GPU, and TPU with different backends.

## Why it's in the Arsenal

The recurring decision JAX resolves is how transformation code stops being hand-written plumbing. In an eager framework, batching, gradient computation, and distribution are library calls that impose structure on the program; here they are transformations that compose, so a function written once can be reused at every level, and a missing batch axis becomes a shape error at trace time rather than a subtle numerical bug. The second decision is compilation: XLA fuses elementwise chains and schedules the whole graph, so a compiler-friendly formulation can beat an eager loop by a large margin, which is why JAX is dominant in large-scale research training. The corresponding cost is that a model becomes a function rather than a module, so class-based customization, per-layer hooks, and imperative debugging all get harder, and the ecosystem that assumes those patterns does not transfer for free.

## Architecture

The core is a tracing and lowering pipeline. jax.jit traces a Python function once with abstract Tracer values, so the code runs symbolically over shapes and dtypes and produces a jaxpr - a dataflow description of primitive operations on arrays - which is then lowered to StableHLD and compiled by XLA for the target backend, with the compiled executable cached by shape and static arguments. grad implements reverse-mode automatic differentiation over that same jaxpr, so derivatives are exact and compose through control flow; vmap broadcasts a function over a batch axis by tracing it with an extra leading dimension, and pmap maps it across devices with an explicit device axis for collectives. Values are immutable, which is what lets the compiler reason about aliasing, and side effects are handled through pure callbacks and the newer sharding annotations on arrays rather than by reference mutation. The distributed layer manages a global mesh of devices with named partitions, so a partitioned matmul or a per-host axis is declared rather than written as a collective, and on TPU the same code path is what avoids host round trips. Libraries layer on top: the neural-network library, the optimization library, and the data pipeline library provide the model and training abstractions, while the wider model-definition ecosystem goes through a compatibility path rather than being native.

## Ecosystem Position

JAX competes with PyTorch as the default research framework and with the general framework entry in this batch for large-scale training, and compared with PyTorch it wins on compile-time optimization and functional composition while losing decisively on ecosystem size and on how forgiving it is to debug. It overlaps with the other array-framework entry in this batch, which targets Apple silicon with a different memory model, where compared to MLX the JAX story is scale and cross-backend support rather than unified memory. It is an alternative to writing an eager model plus manual batching and manual gradient plumbing, and rather than a serving engine it is a training and research substrate: for inference throughput the entries in content/projects/inference-engines/ are the other layer, and the Transformer model-definition library is usable with it but not written for it. Its tightest relationship is with the fine-tuning workbench, which can target a JAX backend through the library abstractions - that is a supported path rather than a workaround.

## Getting Started

Install the core library and see differentiation, vectorization, and compilation compose over one function:

```bash
python3 -m pip install --upgrade "jax[cpu]"
```

```python
import jax
import jax.numpy as jnp

def loss(w, x, y):
    return jnp.mean((x @ w - y) ** 2)

step = jax.jit(jax.vmap(jax.grad(loss), in_axes=(None, 0, 0)))
x = jnp.ones((256, 4)); y = jnp.ones((256, 1))
print(step(jnp.zeros((4, 1)), x, y))
```

## Key Use Cases

1. Training a model across many accelerators with sharding annotations and pmap, where compile-time fusion is what makes the step time acceptable.
2. Differentiating through a simulator, solver, or inference routine - higher-order gradients and differentiation through control flow without manual chain rules.
3. Research where the same function must be evaluated over a grid, swept over seeds, or differentiated, and vmap and grad make those one-line transformations instead of separate implementations.

## Strengths

- Transformations compose in any order, so differentiation, batching, and compilation are separate concerns applied to the same function.
- XLA compilation fuses operations and schedules for the target device, which routinely beats eager execution on well-shaped workloads.
- First-class multi-device execution with a named device mesh, so partitioning is declared rather than hand-rolled with collectives.
- TPU support that is not a bolted-on backend, so the same program trains on GPU or TPU with similar performance characteristics.

## Limitations

The functional style is a real barrier: models are functions rather than modules, so class-based customization, per-layer introspection, and the imperative debugging habits most people bring with them are largely unavailable. Errors surface at trace time with abstract shapes, which is much harder to localize than an eager stack trace, and a stray Python-level side effect or a data-dependent branch will either fail or silently change semantics. The ecosystem asymmetry is the biggest practical cost: the great majority of pretrained tooling, custom CUDA kernels, and third-party extensions target the eager framework, so porting means reimplementing rather than installing. Compilation times are non-trivial for large programs, which slows an interactive loop, and distributed debugging across a mesh adds a layer of complexity on top. Memory behavior is also less obvious than in an eager framework, since reuse decisions are the compiler's and allocation pressure shows up as an out-of-memory error at a distance from the cause.

## Relation to the Arsenal

The functional and compile-first counterpart to the general framework entry in this batch, and the substrate under a meaningful share of large-scale open model training. It is the other implementation target the model-definition layer in content/projects/frameworks/ can serve, and the fine-tuning workbench can configure, so those entries are consumed from rather than replaced by it. The array-framework entry for Apple silicon in this batch solves a related problem with a different memory model, and the training-recipe entries in content/projects/training-and-alignment/ are the practical scripts you would run under it. For serving, the engines in content/projects/inference-engines/ take the trained artifact downstream; JAX is upstream of all of that, and choosing it is a bet on the ecosystem's direction rather than on a single capability.

## Resources

- [GitHub — jax-ml/jax](https://github.com/jax-ml/jax)
- [JAX documentation](https://docs.jax.dev)
- [Neural network, optimization, and data pipeline libraries](https://docs.jax.dev/en/latest/index.html)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (36,358 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*

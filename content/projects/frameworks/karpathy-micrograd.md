---
id: karpathy-micrograd
name: "micrograd"
version_tracked: null
artifact_type: library
category: llms
subcategory: libraries
description: "Tiny scalar autograd engine plus neural-network layers with a PyTorch-shaped API, in a few hundred lines"
github_url: "https://github.com/karpathy/micrograd"
license: "MIT"
primary_language: Python
org_or_maintainer: "karpathy"
tags: [pytorch]
maturity: experimental
cost_model: open-source
github_stars: 17686
github_stars_last_30d: 0
trending_score: 32
last_commit: "2026-08-03"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose]
relation_to_stack: [study-and-reference, fork-and-adapt]
health_signals: [community-driven]
ecosystem_role:
  - "A few hundred lines of autograd and neural-net code with a PyTorch-shaped API — the fastest correct way to understand backprop before touching a large framework."
best_for:
  - "You are an engineer who can use PyTorch but cannot yet explain why a broadcasted sum and a mean loss produce the right parameter gradient, and want to see it end to end."
  - "You are designing a custom autodiff or a new framework layer and need a known-correct reference implementation to test your derivative code against."
  - "You are writing a teaching exercise, workshop, or onboarding doc and need a codebase short enough for a reader to hold in their head."
avoid_if:
  - "You need performance, because every value is a Python scalar in a graph of Python objects and a small MLP will be orders of magnitude slower than torch."
  - "You need GPU support, mixed precision, or any distributed training capability, none of which exist in this codebase."
  - "You need a maintained library with a compatibility guarantee, since this is teaching code whose last commit is over a year old and whose API exists to be read."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (17686), MIT license, last commit 2026-08-03, Python as primary language and the topic list were API-verified; the repo has no homepage field. The engine design, layer set, optimizers, and API surface come from reading the source and the official repo; the performance order-of-magnitude claim is an engineering estimate, not a measured benchmark for this entry."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/karpathy/micrograd", "date": "2026-09-28", "description": "17,686 stars and last commit 2026-08-03 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

micrograd contains two pieces. The first is a scalar-valued reverse-mode automatic differentiation engine: Value wraps a float, a list of parents, and a local backward function, and operations such as +, -, *, /, and ** build a DAG by recording how each output depends on each input, so a single backward() pass walks the graph in reverse topological order accumulating gradients into every participating Value. The second is a neural network library layered on top, providing Neuron, Layer, MLP, and a small set of activations (tanh, relu, sigmoid), the SGD, Adam, and AdamW optimizers, and MSE and cross-entropy loss functions, with an nn.Sequential container and parameter printing that mimics PyTorch's repr. The whole package is intentionally a handful of files so a reader can follow a forward pass from data to loss to parameter update without indirection, and every intermediate instance is inspectable, which is what makes the gradient results trustworthy rather than merely plausible.

## Why it's in the Arsenal

The recurring decision this library settles is not an infrastructure question but a comprehension one: whether to keep using gradient descent as an opaque procedure or actually know what backpropagation computes. In practice that opacity produces real bugs, such as mismatched loss reductions, forgotten detach points, or a ReLU that quietly zeroes a whole subgradient, because the engineer has no mental model to debug against. Because the code is short enough to read in one sitting, forward and backward are visible side by side for every layer, which converts an intuition into something you can check by hand on a two-node example. Teams also lift pieces of it directly into interview material and internal docs.

## Architecture

A Value stores data, grad, and a backward closure. When two Values are added, each parent gets a backward function that propagates grad unchanged; when multiplied, each receives the sibling's data as the local derivative; when raised to a power, the exponent times the base raised to one less. Because Python's dunder operators return new Values, ordinary arithmetic assembles the graph with no syntax beyond what you already write. topological_sort uses an ordering function to produce a backprop-safe sequence, and backward seeds the final scalar with grad 1.0 then walks it, summing each node's accumulated gradient from every path that used it, which is exactly why a value used twice accumulates twice. The neural-net layer wraps Value lists in Neuron objects exposing tanh, relu, and sigmoid as explicit methods, Layer holds a weight-plus-bias Neuron per input dimension, and MLP builds layers by consulting a dims list to infer fan-in, so no shape arguments are needed at the call site. SGD and AdamW step parameters using the accumulated grads, and cross_entropy performs log-softmax plus negative log-likelihood in one function.

## Ecosystem Position

micrograd is not a competitor to torch or jax in any functional sense; it is a reading of the same design at a size where nothing is hidden. Where PyTorch's autograd is built for graph tape efficiency and higher-order derivatives over a C++ engine, this is pure Python scalars, so it is an alternative to reading PyTorch internals rather than to using PyTorch. Compared with micrograd-plus, a community fork that adds tensor types and more layers, this repository is deliberately smaller and slower in order to stay readable. It also sits in a family of teaching implementations, alongside tinygrad and a hundred blog-post autograd builds, and the meaningful comparison is pedagogical: it overlaps with the derivatives material in Goodfellow and with Karpathy's later work, but needs no external reading to be complete.

## Getting Started

Clone it, install nothing, and train a small model with plain Python:

```bash
git clone https://github.com/karpathy/micrograd && cd micrograd
```

```python
from micrograd import MLP
from micrograd.engine import Value

model = MLP(2, [16, 16, 1], activation='tanh')
print(model)          # MLP of layers: 2 -> 16 -> 16 -> 1

for step in range(200):
    pred = model(X)                                  # forward
    loss = sum((p - y) ** 2 for p, y in zip(pred, y)) / len(y)
    model.zero_grad()
    loss.backward()                                  # reverse pass over the DAG
    model.update()
    if step % 40 == 0:
        print("loss", loss.data)
```

The Value import is where you can inspect `.grad` on any intermediate and check a derivative by hand.

## Key Use Cases

1. Deriving a correct implementation of a new op's local derivative, writing the backward closure yourself and validating it against a numerical gradient check.
2. Building interview or onboarding material on backpropagation, where a codebase small enough to read beats a slide diagram.
3. Debugging a gradient bug in a real framework by first reproducing the shape of the problem at a scale where the full computation graph is printable.

## Strengths

- Small enough to read completely, which is the whole design goal and the reason it stays useful years after release.
- A genuinely correct reverse-mode engine: the topological ordering handles diamond-shaped graphs and gradient accumulation properly.
- The API deliberately mirrors PyTorch, so concepts learned here transfer directly rather than being a separate dialect.
- Zero dependencies and no build step, so it runs anywhere Python does and cannot rot with a dependency bump.

## Limitations

Everything is a Python float, so it is several orders of magnitude slower than tensor code and useless for anything resembling real training. There is no batching, no broadcasting, no dtype control, and no GPU path, so a matrix multiply is a nested Python loop. The API is frozen in time: it targets a PyTorch 0.4-era surface, so habits formed here, with no modules, no optim namespaces, and no state_dict, do not match modern frameworks, and it will not teach you about distributed training or memory planning. Maintenance is minimal by design, so there is no issue triage and no compatibility promise if you vendor it internally.

## Relation to the Arsenal

Read this as the conceptual predecessor to every entry in content/projects/frameworks that wraps a real autodiff engine, and as the companion to the training entries in content/projects/training-and-alignment where backprop is normally taken on faith. It also pairs well with the Gymnasium entry in the same folder, since implementing a policy update by hand is the clearest way to understand what an RL library hides. If you need something you can build on rather than read, move to pytorch itself; if you need maximum throughput, the inference-engine entries are the other end of the trade.

## Resources

- [micrograd GitHub repository and annotated source](https://github.com/karpathy/micrograd)
- [Karpathy's micrograd video walkthrough](https://www.youtube.com/watch?v=VMj-3S1XkuY)
- [The Micrograd Explained series](https://www.micrograd.xyz/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (17,686 stars, last commit 2026-08-03, license MIT, verified via GitHub API on 2026-09-28)*

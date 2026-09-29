---
id: torchtune
name: torchtune
type: tool
job: [fine-tuning]
description: PyTorch-native library for fine-tuning and experimenting with LLMs
url: "https://github.com/pytorch/torchtune"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [fine-tuning, llm, pytorch]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/pytorch/torchtune"
docs_url: "https://github.com/pytorch/torchtune"
github_url: "https://github.com/pytorch/torchtune"
alternatives: [axolotl, llamafactory, mlx-lm, peft, unsloth]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [research]
best_when:
  - You want a native PyTorch fine-tuning library with hackable, readable recipes rather than a high-abstraction framework
  - You need tight control over training internals for research experimentation
avoid_when:
  - You want the broadest model-family coverage and a config-only workflow (Axolotl/LLaMA-Factory cover more out of the box)
  - Your team prefers not to read and modify PyTorch training code directly
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** PyTorch-native library for fine-tuning and experimenting with LLMs. Open source or free to start. Best for PyTorch-native fine-tuning.

## Overview

A native PyTorch fine-tuning library with readable, hackable training recipes, aimed at researchers who want to understand and modify the training loop rather than use a high-abstraction framework.

## Why It's in the Arsenal

torchtune is a pyTorch-native library for fine-tuning and experimenting with LLMs. Read it beside `axolotl`, `llamafactory`, `mlx-lm`: the choice between them is a deployment and cost decision before it is a capability one.

## Key Features

- Readable, modifiable PyTorch training recipes
- No heavy abstraction layer over PyTorch internals
- Supports common fine-tuning methods for popular open models

## Architecture / How It Works

Recipes are plain PyTorch scripts composed of explicit, swappable components (model, optimizer, dataset, scheduler), making it straightforward to read and modify training behavior directly.

## Getting Started

Install the Python package and its runtime dependencies first, then make one call to confirm the credentials, network path and configuration are reachable before wiring torchtune into anything else. The command below runs against the `fine-tuning` job and returns a result you can inspect directly.

```bash
pip install torchtune
```

Follow the official documentation at https://github.com/pytorch/torchtune for the authentication and configuration options, because the defaults in the quickstart are the ones most likely to need changing for real traffic.

## Use Cases

1. **Where it fits**: You want a native PyTorch fine-tuning library with hackable, readable recipes rather than a high-abstraction framework.
2. **Adoption checkpoint**: compare torchtune against `axolotl`, `llamafactory`, `mlx-lm` on the same `fine-tuning` task and the same traffic shape, and measure the two numbers this entry does not give you — end-to-end latency and the error rate when the dependency is degraded.

## Strengths

- The distinguishing implementation detail for torchtune is worth reading before adopting: recipes are plain PyTorch scripts composed of explicit, swappable components (model, optimizer, dataset, scheduler), making it straightforward to read and modify training behavior directly.
- Weighing torchtune against `axolotl`, `llamafactory`, `mlx-lm`, `peft` comes down to one question you should answer first: who runs the process when it breaks, you or the vendor.
- torchtune is reached over an API rather than vendored as a library, so replacing it later is a client swap; the offset is that its availability, rate limits and pricing are the vendor's to change.
- What this entry does not give you is behaviour under your load: measure torchtune's end-to-end latency and its error rate when the upstream dependency is degraded before you trust it in production.

## Limitations / When NOT to Use

- Depending on torchtune means depending on someone else's availability and pricing, and the exit cost rises with how deeply it is wired into your call sites.
- Documentation for torchtune describes capability rather than behaviour at your request shape, so latency, concurrency and failure handling are the parts you have to measure yourself.

## Integration Patterns

- *Wiring*: adopt torchtune as a Python dependency or sidecar service against the `fine-tuning` job.  Wire it behind a thin adapter so the rest of your system depends on your interface rather than on this tool's API surface, which keeps a swap or a rollback cheap.
- *Alternatives*: `axolotl`, `llamafactory`, `mlx-lm`, `peft` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Primary site](https://github.com/pytorch/torchtune)
- [Documentation](https://github.com/pytorch/torchtune)
- [Source](https://github.com/pytorch/torchtune)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for fine-tuning.

---
*Last reviewed: 2026-06-30 by @maintainer*


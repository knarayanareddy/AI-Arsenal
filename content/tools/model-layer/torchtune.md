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

> **TL;DR:** torchtune covers the fine-tuning leg. The capability is documented; the behaviour at your load is not, so measure latency and degraded-mode handling yourself before adopting it.

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

1. **What it does in a system**: torchtune sits on the fine-tuning leg of the pipeline, so the work is deciding its timeout, retry and degraded-mode behaviour and putting it behind an interface that lets you replace it without a rewrite.
2. **Knowing when it has failed you**: the failure mode to test for is degraded rather than absent, since torchtune is most likely to be slow or rate-limited in production rather than simply gone.
3. **Choosing between candidates**: torchtune's comparison set is `axolotl`, `llamafactory`, `mlx-lm`; the axis that separates them is what you operate, so answer that before reading the feature lists.

## Strengths

- What torchtune gives you that its headline description does not: recipes are plain PyTorch scripts composed of explicit, swappable components (model, optimizer, dataset, scheduler), making it straightforward to read and modify training behavior directly, which is the part to check against your own pipeline before trusting the feature list.
- Weighing torchtune against `axolotl`, `llamafactory`, `mlx-lm`, `peft` comes down to one question: who runs the process when it breaks — you or the vendor.
- torchtune is reached over an API rather than vendored, so replacing it is a client swap; the offset is that its availability and pricing are the vendor's to change.
- What this entry cannot give you is measured behaviour: measure torchtune's latency and its error rate under a degraded upstream before it carries production traffic.

## Limitations / When NOT to Use

- There is no self-hosted path to torchtune, so quota and rate-limit changes are the vendor's to make and yours to absorb.
- Documentation for torchtune describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.
- Where torchtune overlaps `axolotl`, `llamafactory`, `mlx-lm`, choosing on feature lists alone is the mistake; the deciding axis is operational.

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


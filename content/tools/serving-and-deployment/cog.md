---
id: cog
name: Cog (Replicate)
type: tool
job: [deployment]
description: Replicate's open tool for packaging ML models into containers — declare Python/CUDA deps and a predict interface, get a served HTTP API with no Dockerfile
url: "https://github.com/replicate/cog"
cost_model: open-source
pricing_detail: Open source (Apache-2.0); Replicate's hosting platform is a separate paid service
tags: [inference, self-hosted, llm]
maturity: production
stack: [python, go]
free_tier: true
free_tier_limits: Cog itself is free; running on Replicate's cloud is usage-based
self_hostable: true
open_source: true
source_url: "https://github.com/replicate/cog"
docs_url: "https://cog.run"
github_url: "https://github.com/replicate/cog"
alternatives: [bentoml, modal]
integrates_with: [replicate]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: serving-and-deployment
audience: [prototype, production]
best_when:
  - You want to containerize a model without writing a Dockerfile — declare Python/system/CUDA deps in cog.yaml and a Predictor class, and Cog builds a reproducible GPU-ready image exposing a standard HTTP prediction API
  - You're deploying to Replicate or want a Replicate-compatible container — Cog is the native packaging format, so local dev and cloud deploy use the same artifact
avoid_when:
  - You need fine-grained control over the serving layer (custom batching, multi-model graphs, non-standard routing) — a full framework like BentoML or a bespoke server gives more control than Cog's opinionated interface
  - Your model isn't Python, or you already have a hardened container pipeline — Cog's value is generating that pipeline for you
version_tracked: null
verdict: solid-choice
verdict_rationale: The lowest-friction way to turn a Python model into a GPU-served container, especially for Replicate; a focused packaging tool, not a full serving framework
status: active
---

## Overview

Cog is Replicate's open-source tool for packaging machine-learning models as containers. You describe the environment in a `cog.yaml` (Python version, pip/system packages, CUDA) and implement a `Predictor` with a typed `predict()` method; Cog generates an optimized Docker image — resolving the notoriously painful CUDA/PyTorch/driver matrix — that exposes an automatic HTTP prediction API and queue worker. It's the container format Replicate runs, usable standalone anywhere Docker runs.

## Why It's in the Arsenal

The gap between "model works in my notebook" and "model runs as a reliable GPU service" is mostly Docker/CUDA yak-shaving, and Cog closes it declaratively. It's the deployment-side counterpart to the catalog's inference engines: where vLLM/TGI serve LLM weights at throughput, Cog packages arbitrary models (diffusion, audio, custom pipelines) into a standard served artifact — filling the "how do I ship this custom model" slot.

## Key Features

- Dockerfile-free image builds from `cog.yaml`, handling CUDA/cuDNN/PyTorch compatibility automatically
- Typed `Predictor` interface auto-generating an OpenAPI HTTP server, input validation, and a prediction queue
- Local `cog predict` for parity between dev and production; push to any registry
- First-class Replicate deploy path from the same container

## Architecture / How It Works

`cog.yaml` + `predict.py` are the contract: at build, Cog composes a layered image with the declared environment and a web server wrapping your `Predictor`; `setup()` loads weights once at boot, `predict()` handles each request with type-checked inputs, and a queue worker enables async/batched serving — the standard shape Replicate's infrastructure expects.

## Getting Started

```bash
# cog.yaml declares build env; predict.py implements Predictor
cog predict -i prompt="a cat astronaut"
cog build -t my-model && docker run -p 5000:5000 my-model
```

## Use Cases

1. **Scenario**: shipping a Stable-Diffusion/FLUX-class or custom audio model as a GPU HTTP service without hand-writing CUDA Dockerfiles
2. **Scenario**: developing locally and deploying to Replicate with one reproducible artifact across both
3. **Scenario where this is NOT the right fit**: high-throughput LLM token serving — use a dedicated inference engine (vLLM/TGI); Cog packages models, it doesn't optimize LLM decoding

## Strengths

- Removes the single biggest ML-deployment time sink (the CUDA/dep matrix) with a declarative file
- Same artifact from laptop to Replicate cloud — no dev/prod drift in the container

## Limitations / When NOT to Use

- Opinionated single-predictor interface; complex serving graphs or custom batching want a fuller framework
- Deepest value is realized inside the Replicate ecosystem; standalone it's "just" a container builder (a good one)

## Integration Patterns

Link this tool from reference stacks, decision trees, and project entries using its canonical ID `cog` rather than duplicating details.

## Resources

- [GitHub](https://github.com/replicate/cog)
- [Docs](https://cog.run)

## Buzz & Reception

9.4k GitHub stars (verified via API 2026-07-08); Apache-2.0; actively maintained by Replicate. The de facto packaging format for the Replicate model ecosystem.

---
*Last reviewed: 2026-07-08 by @maintainer*

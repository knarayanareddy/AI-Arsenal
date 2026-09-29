---
id: ray-serve
name: "Ray Serve"
type: tool
job: [production-serving, deployment]
description: "Scalable model-serving library on Ray for composing multi-model inference graphs in pure Python"
url: "https://docs.ray.io/en/latest/serve/"
cost_model: open-source
pricing_detail: "Apache-2.0 open source; managed via Anyscale"
tags: [inference, orchestration, batching]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/ray-project/ray"
docs_url: "https://docs.ray.io/en/latest/serve/"
github_url: "https://github.com/ray-project/ray"
alternatives: [triton-inference-server, bentoml, kserve]
integrates_with: [vllm, fastapi]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: serving-and-deployment
audience: [production]
best_when:
  - "Your inference is a Python pipeline (preprocess → embed → LLM → postprocess) you want to scale as one autoscaling app"
  - "You already run Ray for data/training and want serving on the same cluster substrate"
avoid_when:
  - "Single-model LLM serving — a dedicated engine (vLLM) alone is simpler than adding a Ray cluster"
  - "Teams without Ray experience; cluster operations are a real cost you must want to pay"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (43,161), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The most flexible Python-native serving layer; the standard host for multi-stage and multi-model inference graphs"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/ray-project/ray", "date": "2026-07-08", "description": "43,161 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Ray's serving library: define deployments as Python classes, compose them into inference graphs, and Ray Serve handles replica autoscaling, fractional GPUs, request batching, and rolling upgrades across a cluster — commonly used to scale vLLM to many replicas/models.

## Why It's in the Arsenal

The entry exists because Ray Serve is a scalable model-serving library on Ray for composing multi-model inference graphs in pure Python. Read it beside `triton-inference-server`, `bentoml`, `kserve`: the choice between them is a deployment and cost decision before it is a capability one.

## Key Features

- Model composition: chain/branch deployments in Python
- Autoscaling replicas, fractional GPU allocation, dynamic batching
- FastAPI integration and multiplexed multi-model serving

## Architecture / How It Works

Each deployment becomes actor replicas on a Ray cluster; an HTTP proxy routes requests through the deployment graph with backpressure-aware queuing, and the autoscaler adjusts replica counts from queue metrics. LLM-specific APIs wrap vLLM engines as deployments.

## Getting Started

```bash
pip install 'ray[serve]'
# serve.run(MyDeployment.bind()) then hit localhost:8000
```

## Use Cases

1. **Where it fits**: "Your inference is a Python pipeline (preprocess → embed → LLM → postprocess) you want to scale as one autoscaling app.
2. **Adoption checkpoint**: compare Ray Serve against `triton-inference-server`, `bentoml`, `kserve` on the same `production-serving, deployment` task and the same traffic shape, and measure the two numbers this entry does not give you — end-to-end latency and the error rate when the dependency is degraded.

## Strengths

- In concrete terms, Ray Serve is a scalable model-serving library on Ray for composing multi-model inference graphs in pure Python — the mechanism named in this entry's architecture is what to check against your own pipeline, because that is where the behaviour actually lives.
- Against `triton-inference-server`, `bentoml`, `kserve`, the comparison that decides this is deployment model and operational cost rather than the feature list; Ray Serve sits at the hosted-or-embedded end of that axis.
- Ray Serve documents a client surface through `vllm`, `fastapi`, which fixes the expected request and response contract so you are not inferring it from examples.
- Capability is documented; behaviour is not. For Ray Serve, measure end-to-end latency and the error rate under a degraded upstream before this reaches production traffic.

## Limitations / When NOT to Use

- Depending on Ray Serve means depending on someone else's availability and pricing, and the exit cost rises with how deeply it is wired into your call sites.
- Documentation for Ray Serve describes capability rather than behaviour at your request shape, so latency, concurrency and failure handling are the parts you have to measure yourself.

## Integration Patterns

- *Wiring*: adopt Ray Serve as a Python dependency or sidecar service against the `production-serving, deployment` job.  For an agent or workflow integration, keep the call behind a thin adapter so a provider or model swap is a configuration change rather than a refactor of every call site.
- *Alternatives*: `triton-inference-server`, `bentoml`, `kserve` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Known integrations*: `vllm`, `fastapi` are the documented surfaces worth starting from, because they establish the expected request and response contract. Pin the version you build against — a client library upgrade can change default retrieval or batching behaviour without a breaking version bump.
- *Deployment and cost*: The Apache/MIT licence means there is no per-seat or per-call charge to design around; budget for the hosting instead.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://docs.ray.io/en/latest/serve/)
- [Documentation](https://docs.ray.io/en/latest/serve/)
- [GitHub](https://github.com/ray-project/ray)

## Buzz & Reception

- 43,161 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer; both verified via the GitHub API.*

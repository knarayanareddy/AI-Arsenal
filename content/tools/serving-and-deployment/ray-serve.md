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
verdict_rationale: "The right layer when inference is a graph of models rather than one endpoint; vLLM or SGLang remain the better engines underneath it"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/ray-project/ray", "date": "2026-07-08", "description": "43,161 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Ray's serving library: define deployments as Python classes, compose them into inference graphs, and Ray Serve handles replica autoscaling, fractional GPUs, request batching, and rolling upgrades across a cluster — commonly used to scale vLLM to many replicas/models.

## Why It's in the Arsenal

The entry exists because Ray Serve is a scalable model-serving library on Ray for composing multi-model inference graphs in pure Python.

## Key Features

- Model composition: chain/branch deployments in Python
- Autoscaling replicas, fractional GPU allocation, dynamic batching
- FastAPI integration and multiplexed multi-model serving

## Architecture / How It Works

Each deployment becomes actor replicas on a Ray cluster; an HTTP proxy routes requests through the deployment graph with backpressure-aware queuing, and the autoscaler adjusts replica counts from queue metrics. LLM-specific APIs wrap vLLM engines as deployments.

Weights are loaded once and reused across requests, so the cost is memory and warm-up rather than a per-call fee, and cold-start latency is the first thing to measure after deployment. Data crosses a boundary you do not control unlike `triton-inference-server`, `bentoml`; on the production-serving, deployment path; under a open-source cost model; with `ray-serve`, `name`, `serve`, which makes the failure modes specific: timeouts, exhausted quotas and expired credentials. Decide what your system does in each case before the first request, because a dependency that is slow and one that is absent need different handling.

## Getting Started

```bash
pip install 'ray[serve]'
# serve.run(MyDeployment.bind()) then hit localhost:8000
```

## Use Cases

1. **Composing several models into one endpoint**: a retrieval call, a reranker and a generator as separate deployments behind one HTTP ingress is Ray Serve's native shape, not something bolted on.
2. **Python-first serving without a serving DSL**: deployments are classes and functions with `@serve.deployment`, so business logic and serving logic stay in the same language and the same repository.
3. **Autoscaling on queue depth rather than CPU**: Serve scales replicas per deployment on request backlog, which is the right signal for GPU work where utilisation lags concurrency.
4. **Shared GPU capacity across models**: fractional GPU and placement groups let several small models share a card, which is often the difference between viable and not for internal tools.
5. **Batch and online workloads on one cluster**: the same Ray cluster that serves requests can run offline inference and training jobs, so capacity is not stranded between the two.
6. **Model routing and A/B tests**: request routing between deployments, plus weights and shadow traffic, make a canary a configuration change.
7. **Multi-node inference for large models**: deployments that span nodes with tensor or pipeline parallelism, orchestrated by the same control plane as the rest.

## Strengths

- Composability is the differentiator: an application graph of deployments, each with its own replicas and resources, expressed in the Python you already write.
- Autoscaling is request-driven and per deployment, so a slow LLM does not force the router in front of it to scale with it.
- It inherits Ray's scheduler: placement groups, fractional GPUs, node affinity and multi-node deployment come from the cluster layer rather than a bespoke feature.
- FastAPI integration means existing HTTP handlers can be mounted as ingress rather than rewritten.
- Observability is built around Ray's dashboard and metrics, and OpenTelemetry export is available — not best in class, adequate and improving.
- Apache-2.0, 44k stars across Ray, and a large ecosystem of libraries (Data, Train, Tune) that share the cluster.

## Limitations / When NOT to Use

- **Ray is the dependency, and Ray is a distributed system.** Debugging a hung deployment means understanding the cluster, not just the model — a real cost for a team that only wanted an HTTP server.
- **3,650 open issues across Ray.** The core is solid, the surface is enormous, and a specific integration can be months behind.
- **Throughput per GPU is not the headline.** For raw token throughput on a single model, `vllm` and `sglang` are the tuned engines; Serve is the layer that runs them, and the difference shows at scale.
- **Latency overhead is real.** Every request crosses a proxy and a scheduler; for tight p99 targets measure against a direct engine rather than assuming.
- **Operational weight.** A Ray cluster needs a head node, autoscaler configuration, object-store sizing and dashboards — more than a single container and less than Kubernetes, but not nothing.
- **Kubernetes users often get less than they expect.** Ray on K8s works, and KubeRay adds another moving part; teams frequently conclude the platform they already run plus `vllm` is simpler.

## Integration Patterns

- *Wiring*: `serve.run(bind(...))` from a Python entrypoint, with the cluster started by `ray start` or KubeRay; ingress via FastAPI or Serve's own HTTP proxy.
- *Underneath*: `vllm` or `sglang` as the inference engine inside a deployment — the common production pattern is Serve for orchestration and an optimised engine for the forward pass.
- *Alternatives*: `kserve` and `bentoml` for Kubernetes-native model servers, `triton-inference-server` for multi-framework C++ serving, and a plain FastAPI process when there is one model and modest traffic.
- *Pairs with*: `ray`-based data and training jobs sharing the same cluster, and `deepspeed` on the training side of the same infrastructure.

## Resources

- [Official Site](https://docs.ray.io/en/latest/serve/)
- [Documentation](https://docs.ray.io/en/latest/serve/)
- [GitHub](https://github.com/ray-project/ray)

## Buzz & Reception

- 43,161 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer; both verified via the GitHub API.*

---
id: ray
name: Ray
type: tool
job: [production-serving, orchestration, fine-tuning]
description: Distributed compute engine for scaling Python and AI workloads — training, tuning, batch inference, and serving
url: "https://www.ray.io/"
cost_model: open-source
pricing_detail: Apache-2.0 open source; managed hosting available via Anyscale
tags: [inference, training, orchestration, self-hosted]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Fully open source; managed Anyscale platform is paid
self_hostable: true
open_source: true
source_url: "https://github.com/ray-project/ray"
docs_url: "https://docs.ray.io/"
github_url: "https://github.com/ray-project/ray"
alternatives: [modal, bentoml]
integrates_with: [vllm, pytorch]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: null
phase: serving-and-deployment
audience: [production, research]
best_when:
  - You need to scale Python-native AI workloads (training, batch inference, serving) across a cluster without rewriting them in a distributed framework
  - You run heterogeneous pipelines (CPU preprocessing + GPU inference) that benefit from fine-grained task/actor scheduling on shared infrastructure
  - You're operating vLLM or other engines at multi-node scale — Ray is the de facto multi-node backbone (vLLM uses it for distributed serving)
avoid_when:
  - A single machine or a managed endpoint covers your scale — Ray's cluster operations burden (autoscaler, object store, placement groups) is real
  - Your team wants serverless simplicity; Modal or provider endpoints deliver scale-out without cluster management
version_tracked: null
verdict: recommended
verdict_rationale: The default distributed-compute substrate for Python AI at cluster scale, but only worth its ops cost once you actually outgrow one machine
status: active
enrichment_status: draft
---

> **TL;DR:** Distributed compute engine for scaling Python AI workloads — training, tuning, batch inference, and serving. Apache-2.0, self-hostable. Best when your pipeline outgrows one machine.

## Overview

Ray is a distributed compute engine with a core task/actor runtime plus AI libraries layered on top: Ray Train (distributed training), Ray Tune (hyperparameter search), Ray Data (batch/streaming data processing), and Ray Serve (model serving). It lets ordinary Python functions and classes run across a cluster with scheduling, fault tolerance, and a distributed object store handled by the runtime (43K+ GitHub stars, Apache-2.0, actively developed by Anyscale and a large contributor base).

## Why It's in the Arsenal

Ray earns a place because it is the substrate underneath much of production AI infrastructure — vLLM uses it for multi-node serving, and OpenAI, Uber, and Shopify have documented large-scale training/inference platforms on it. When a workload genuinely needs a cluster, Ray is the Python-native answer that avoids rewriting into Spark or Kubernetes-level primitives. It is a comparison point, not an unconditional recommendation — see Limitations.

## Key Features

- Task/actor programming model: decorate Python functions/classes to distribute them
- Ray Serve: composable model-serving with autoscaling and fractional GPU allocation
- Ray Data: streaming batch inference over large datasets with CPU/GPU pipelining
- Ray Train/Tune: distributed training and hyperparameter search integrated with PyTorch and Lightning

## Architecture / How It Works

A head node coordinates worker nodes; each node runs a raylet scheduler and shares a Plasma-based distributed object store. Tasks and actors are scheduled onto resources (including fractional GPUs and custom resources), with object references passed by handle rather than copied. The AI libraries build on this core, so training, data, and serving workloads can share one cluster.

## Getting Started

```bash
pip install "ray[default]"
ray start --head  # start a local cluster
```

## Use Cases

1. **Scenario**: batch-embedding or batch-inference over millions of records, pipelining CPU preprocessing with GPU inference via Ray Data
2. **Scenario**: multi-node vLLM deployment where Ray provides the distributed process group
3. **Scenario where this is NOT the right fit**: a single-GPU app served from one box — a plain FastAPI + engine setup is simpler and easier to debug

## Strengths

- Python-native distribution: minimal rewrite to go from laptop to cluster
- One substrate for training, data, tuning, and serving instead of stitching four systems
- Battle-tested at extreme scale (documented use at OpenAI, Uber, Ant Group)

## Limitations / When NOT to Use

- Cluster operations (autoscaler tuning, object-store memory pressure, placement-group debugging) are a genuine skill investment
- For pure single-model serving, dedicated engines/servers are leaner; Ray Serve shines for composition, not minimal latency
- Local development against a cluster mismatch can hide serialization and resource bugs until deploy

## Integration Patterns

- Compare against [Modal](./modal.md) and [BentoML](./bentoml.md) before adopting — they solve overlapping serving/scale jobs with different ops trade-offs.
- Link this tool from job guides using its canonical ID `ray`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Primary site](https://www.ray.io/)
- [Documentation](https://docs.ray.io/)
- [Source](https://github.com/ray-project/ray)

## Buzz & Reception

- Included because Ray is the de facto distributed backbone in current AI serving stacks (used by vLLM for multi-node inference) and appears throughout production LLM-platform writeups.

---
*Last reviewed: 2026-07-08 by @maintainer*

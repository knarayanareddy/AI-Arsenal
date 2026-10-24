---
id: gpustack
name: "GPUStack"
type: tool
job: [deployment]
description: "Cluster manager that pools NVIDIA, AMD and Ascend GPUs and serves models through vLLM or SGLang"
url: "https://github.com/gpustack/gpustack"
cost_model: open-source
pricing_detail: "Apache-2.0 self-hosted; hardware and datacentre costs dominate, with no per-node licence"
tags: [inference, kubernetes, self-hosted, multimodal, efficiency]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Source is unlimited; the ceiling is the GPUs you own or rent"
self_hostable: true
open_source: true
source_url: "https://github.com/gpustack/gpustack"
docs_url: null
github_url: "https://github.com/gpustack/gpustack"
alternatives: [mooncake]
integrates_with: []
added_date: "2026-10-24"
last_reviewed: "2026-10-24"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "Sits between raw Kubernetes GPU operators and a full cloud control plane: hardware discovery, engine flags and an OpenAI-compatible endpoint without writing scheduler CRDs"
status: active
phase: serving-and-deployment
audience: [production]
best_when:
  - "GPU capacity is spread across vendors and sites, and you want one endpoint with per-model routing rather than one deployment per host"
  - "Engine flags such as tensor-parallel size and memory utilisation should be set from a control plane, not edited per worker by hand"
avoid_when:
  - "Kubernetes with a GPU operator and a GitOps pipeline is already the standard, so a second control plane duplicates the model"
  - "The job is distributed training or non-LLM batch compute, which the engine integration does not target"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Architecture summarised from project documentation; multi-vendor behaviour across CUDA, ROCm and Ascend was not tested on hardware here."
buzz_sources: []
---

## Overview

GPUStack manages GPU nodes for model serving. An agent process on each worker reports driver version, VRAM and topology; a server process owns model placement, routing and authentication, and turns the pool into an OpenAI-compatible endpoint. Deployments are launched into whichever nodes can satisfy the memory and topology constraints the model requires.

The problem it targets is real for teams without a platform group: provisioning vLLM or SGLang across a handful of heterogeneous boxes means writing host scripts, choosing tensor-parallel sizes by hand and keeping the flags consistent as hardware changes. GPUStack makes the engine a managed workload with structured parameters.

It also provisions SSH-accessible developer instances on the same nodes, which is how research and production share one pool without one starving the other.

## Why It's in the Arsenal

The Arsenal separates serving engines from the infrastructure that schedules them. This entry is the scheduler side: it assumes vLLM or SGLang does the inference and takes on placement, discovery and access.

The multi-vendor angle is why it is catalogued rather than folded into a Kubernetes note. Mixed estates — NVIDIA for production, AMD or Ascend where procurement landed — are common in practice and poorly served by tooling that assumes one runtime.

## Key Features

- Automatic discovery of GPU architecture, driver, VRAM and interconnect per node across CUDA, ROCm and Ascend.
- Structured engine parameters — tensor-parallel size, GPU memory utilisation, KV-cache quantisation — applied per deployment.
- An OpenAI-compatible surface for chat, completions and embeddings with model aliasing and load balancing.
- On-demand SSH instances on selected GPU nodes for debugging, fine-tuning and benchmarking.
- Autoscaling of worker replicas driven by queue depth and token latency rather than raw CPU.

## Architecture / How It Works

The server holds a registry of nodes and models and exposes an API and UI; each worker runs an agent that heartbeats telemetry and executes placement decisions by starting or stopping engine containers. When a model is deployed, the scheduler filters nodes by VRAM, accelerator type and requested parallelism, then launches the engine with flags derived from that topology.

Inference requests hit the server, which resolves the model alias to a healthy replica and proxies the call. Because the engine is a child process of the worker agent, engine upgrades are a control-plane operation instead of a host visit — the same property that makes a scheduler failure visible across every model at once.

## Getting Started

Install the server on one host and join a single worker first, deploy a small model, and confirm the reported VRAM matches reality before adding capacity. The failure to catch early is misreported VRAM, since it produces placements that start and then fail during model load. Add the second accelerator vendor only after the single-vendor path is stable.

## Use Cases

1. A laboratory with mixed GPUs wanting one internal endpoint instead of one URL per workstation.
2. Internal model hosting where each team deploys its own model but capacity is centrally accounted.
3. Developer access to GPU hardware through short-lived SSH instances rather than permanent allocations.
4. Serving several quantised models side by side, routing by alias, on a pool smaller than the sum of their full-precision footprints.

## Strengths

- Hardware discovery across three accelerator vendors removes the host-script tax that accumulates in mixed estates.
- Engine parameters become structured fields, which makes tensor-parallel and memory settings reviewable in a diff.
- The OpenAI-compatible gateway means existing clients need no new SDK.
- Developer instances and production serving share one inventory, so capacity is not siloed by accident.
- Autoscaling on queue depth and token latency targets the metrics that actually predict saturation.

## Limitations / When NOT to Use

- A younger management plane than Kubernetes operators: thinner RBAC granularity, fewer GitOps integrations and a smaller plugin ecosystem.
- Multi-node model loading leans on shared storage such as NFS or Ceph; a cold cache turns a scale-out into a long model-load stall.
- Optimised for autoregressive LLM inference, not general batch compute or custom training jobs.
- The server is a single logical control plane — losing it stops new placements and routing changes.
- Vendor drivers remain your problem: ROCm and Ascend stacks version differently from CUDA and will drift.

## Integration Patterns

Treat the server as tier-one: run it with a backed-up database, put it behind your normal ingress, and alert on worker heartbeat loss. Pin engine versions per model so a control-plane upgrade does not silently change inference behaviour, and keep model artefacts in a registry the workers can reach quickly. Front it with your LLM gateway if you need per-tenant budgets, since accounting here is capacity-oriented rather than billing-oriented.

## Resources

- [GitHub — gpustack/gpustack](https://github.com/gpustack/gpustack)
- [GPUStack documentation](https://docs.gpustack.ai/)

## Buzz & Reception

Attention comes from repository activity and from teams operating mixed-vendor clusters; no independent benchmark of its scheduling under contention is recorded here. The number to measure is model cold-start time on your shared storage, which decides whether autoscaling is useful or merely noisy.

---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: llm-d
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with:
  - vllm
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 43
trending_score: 33
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: llm-d
name: llm-d
artifact_type: platform
category: tooling
subcategory: inference-engines
description: Kubernetes-native distributed LLM inference framework with routing, disaggregation, and batch-serving components
github_url: https://github.com/llm-d/llm-d
license: Apache-2.0
primary_language: Other
tags:
  - inference
  - routing
  - batching
  - caching
  - kubernetes
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 3843
last_commit: '2026-07-20'
docs_url: https://llm-d.ai/
phase: inference-engine
domain:
  - language
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - contribute-to
health_signals:
  - org-backed
  - actively-maintained
  - community-driven
ecosystem_role:
  - A Kubernetes-native serving layer that combines optimized inference backends, gateway routing, disaggregated serving, and workload-aware operations.
best_for:
  - You operate multi-GPU Kubernetes infrastructure where routing, batching, and replica utilization matter.
  - You want a community serving layer around Kubernetes and vLLM rather than a single-node server.
avoid_if:
  - You need a local one-node runtime or a single binary with minimal operational dependencies.
  - You cannot own accelerator scheduling, gateway behavior, observability, and release compatibility.
enrichment_notes: Official repository, Apache-2.0 license, documentation, and active July 2026 development were reviewed on 2026-07-11. Performance and production-fit claims remain workload-specific.
---

## Overview

llm-d is a Kubernetes-oriented distributed serving stack for large language models. Its engineering target is the layer above an individual inference server: route requests across model-serving replicas, use accelerator capacity efficiently, and expose deployment patterns for larger workloads. It is therefore a poor fit for someone who only needs to run a quantized model on one machine.

## Why it's in the Arsenal

Distributed inference is increasingly a scheduling problem, not just a kernel problem. llm-d is included because it makes routing, batching, disaggregation, and Kubernetes operations part of one serving design. The tradeoff is that a team must validate a multi-component control plane instead of measuring one server process.

## Architecture

The stack composes Kubernetes resources and serving components around inference backends such as vLLM. Its design space includes gateway-level routing, inference pools, accelerator-aware placement, prefill/decode disaggregation, and request or KV-cache locality. Those pieces change the performance envelope in different ways: routing can improve utilization but add queueing decisions, while disaggregation can separate resource bottlenecks but introduces network and synchronization costs. The right test is a workload matrix covering prompt length, decode length, concurrency, failure, and model replication.

## Ecosystem Position

llm-d sits between Kubernetes/GPU infrastructure and an inference backend. It overlaps with managed model-serving platforms and gateway projects, but its value is greatest for operators who already need cluster-level scheduling and want open interfaces. It should be compared against a simpler replicated inference deployment before adopting its full topology.

## Getting Started

Begin with one model, one serving backend, and a small Kubernetes cluster. Establish a direct-serving baseline, then add routing or disaggregation one change at a time. Capture time-to-first-token, inter-token latency, queue time, GPU utilization, network traffic, error recovery, and cost per request.

## Key Use Cases

- Clustered serving for high-concurrency text-generation workloads.
- Experiments with routing, batching, cache locality, or prefill/decode resource separation.

## Strengths

- Treats distributed inference operations and request routing as first-class design concerns.
- Apache-2.0 project with active community and organizational participation.

## Limitations

- Kubernetes, accelerator, backend, and gateway versions create a large compatibility matrix.
- Optimizations that help throughput can worsen tail latency, fairness, or failure recovery for interactive traffic.

## Relation to the Arsenal

llm-d is an inference-engine platform, not a model registry or a local runner. Pair it with explicit SLOs, load tests, GPU telemetry, cost attribution, and a simpler fallback serving path.

## Resources

- [Official source](https://github.com/llm-d/llm-d)
- [Official documentation](https://llm-d.ai/)

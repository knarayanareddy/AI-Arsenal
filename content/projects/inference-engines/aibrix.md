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
org_or_maintainer: vllm-project
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 30
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: aibrix
name: AIBrix
artifact_type: platform
category: tooling
subcategory: platforms
description: Composable open-source infrastructure for self-hosted and cloud-scale generative AI inference
github_url: https://github.com/vllm-project/aibrix
license: Apache-2.0
primary_language: Go
tags:
  - inference
  - routing
  - batching
  - caching
  - kubernetes
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 4968
last_commit: '2026-07-20'
docs_url: https://aibrix.github.io/
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
  - A Kubernetes-oriented serving and operations layer connecting model deployment, gateway routing, batch workloads, and multiple inference engines.
best_for:
  - You operate a Kubernetes/GPU fleet and need routing, batching, deployment templates, and control-plane components around model servers.
  - You want to compare multi-engine inference operations without building every gateway and workload controller in-house.
avoid_if:
  - You need a single-process local runner or a minimal inference server.
  - You cannot absorb Kubernetes, GPU scheduling, gateway, and preview-feature compatibility risk.
enrichment_notes: AIBrix v0.7.0 materials, Apache-2.0 license, and same-day repository activity were reviewed on 2026-07-11. Preview-feature maturity and deployment complexity remain draft.
---

## Overview

AIBrix is an Apache-2.0 infrastructure project for operating generative-AI inference at fleet scale. It is not another model runtime; it sits around runtimes and supplies deployment, routing, batching, resource, and observability components for teams running self-hosted serving on Kubernetes.

## Why it's in the Arsenal

The project addresses the operational gap between “a server can generate tokens” and “a platform can place, route, batch, and recover many model workloads.” That gap is where GPU utilization, queueing, rollout safety, and cost attribution are decided. AIBrix is worth comparing with a simpler replicated server before adopting its larger control-plane surface.

## Architecture

The repository combines Go services and controllers with Kubernetes deployment assets, gateway routing, runtime/engine adapters, batch state, storage, benchmarks, and a web console. The v0.7 line adds a management console, an OpenAI-compatible Batch API, multi-engine support, and KV-cache-oriented disaggregation work. These components create distinct failure domains: routing can improve utilization while adding queue decisions, batch execution changes retry semantics, and disaggregation trades local memory pressure for network and synchronization cost.

## Ecosystem Position

AIBrix is a platform layer above inference engines and below application gateways. It complements engines such as vLLM, SGLang, or TensorRT-LLM rather than replacing their kernels or model-format support. The meaningful comparison is with the team’s existing Kubernetes deployment: measure whether AIBrix improves utilization, rollout control, and workload isolation enough to justify another control plane.

## Getting Started

Start with the smallest documented installation and one supported engine. Establish a direct-serving baseline, then enable the console, Batch API, routing, or resource-manager features separately. Test prompt/decode length, concurrency, queue time, GPU utilization, failure recovery, rollout rollback, and cost per request before adding production traffic.

## Key Use Cases

- Multi-engine self-hosted inference platforms on Kubernetes.
- Batch and interactive workloads that need different scheduling or routing behavior.
- Teams that need a platform surface for model-serving operations rather than a local model runner.

## Strengths

- Composes workload, engine, gateway, and operations concerns instead of treating serving as one process.
- Apache-2.0 project with active development and a concrete release path for new platform capabilities.

## Limitations

- Kubernetes and accelerator operations are prerequisites, not incidental setup work.
- Several release features are preview or evolving; APIs and deployment assumptions need release-specific tests.
- A platform layer cannot compensate for poor model batching, GPU topology, or an unrepresentative traffic model.

## Relation to the Arsenal

AIBrix belongs in the inference-engine phase. Use it when the hard problem is operating a fleet; use a smaller runtime when the hard problem is simply loading a model on one host.

## Resources

- [Official source](https://github.com/vllm-project/aibrix)
- [Official documentation](https://aibrix.github.io/)
- [v0.7.0 release](https://github.com/vllm-project/aibrix/releases/tag/v0.7.0)

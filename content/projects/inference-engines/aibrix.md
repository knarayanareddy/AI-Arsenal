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
trending_score: 0
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: aibrix
name: AIBrix
artifact_type: platform
category: tooling
subcategory: platforms
description: "Cloud-native control plane from the vLLM project for deploying, routing, autoscaling and serving LLM inference on Kubernetes"
github_url: "https://github.com/vllm-project/aibrix"
license: Apache-2.0
primary_language: Go
tags: [kubernetes, llm]
maturity: production
cost_model: open-source
github_stars: 5116
last_commit: "2026-09-28"
docs_url: "https://aibrix.readthedocs.io/latest/"
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
best_for: ["You run vLLM on Kubernetes and generic HPA scaling misbehaves, because replica count driven by CPU or request rate does not track queue depth or KV cache pressure in an inference workload.", "You need to serve many LoRA adapters over a shared base model without launching a full replica per adapter, and you want dynamic adapter loading handled by the platform.", "You are hitting KV cache capacity limits and want to move cache state to external storage or reuse it across engines rather than sizing GPUs purely for cache."]
avoid_if: ["You are not on Kubernetes, because the entire value proposition is custom resources, controllers and an Envoy-based gateway, and none of it helps a single process on one machine.", "You need every feature to be stable, because the documentation still labels heterogeneous-GPU inference as experimental and other capabilities carry similar caveats.", "You serve a non-vLLM engine and expect equal support, because the project grew out of the vLLM ecosystem and its tightest integrations, including Ray-based distributed inference, assume that lineage."]
enrichment_notes: AIBrix v0.7.0 materials, Apache-2.0 license, and same-day repository activity were reviewed on 2026-07-11. Preview-feature maturity and deployment complexity remain draft.
---

## Overview

AIBrix is a set of infrastructure components for GenAI inference, published by the vLLM project organisation and built around vLLM as the serving engine. The documented feature set covers an LLM gateway and routing layer, high-density LoRA management for many lightweight adapters over a base model, distributed inference across nodes, an autoscaler tuned to inference behaviour rather than generic metrics, a unified runtime sidecar that standardises metrics and handles model download and management, heterogeneous-GPU placement for cost-driven serving, proactive GPU hardware failure detection, and a KV cache offloading framework supporting both straightforward offload and cross-engine reuse. There is also a benchmark tool for measuring inference performance and resource efficiency, a batch API and batch resource manager for neocloud-style offline work, and a semantic router for content-aware model selection. Installation follows the standard operator pattern: a dependency bundle then a core bundle, landing controllers in the aibrix-system namespace. vLLM-Omni is available for multimodal serving.

## Why it's in the Arsenal

The recurring decision is whether generic Kubernetes primitives are good enough for inference. They are not, and the reasons are structural: an inference pod's bottleneck is KV cache capacity and queueing rather than CPU, replicas are expensive and slow to warm, and the useful deployment unit for many applications is an adapter rather than a copy of the weights. AIBrix exists to add the controllers, custom resources and metrics that make those facts first-class, and it does so inside the ecosystem it grew from rather than as a neutral layer. The cost is a second control plane to operate, and the tighter the coupling to vLLM the more capability you get and the less portable the result.

## Architecture

The control plane is a Kubernetes operator built in Go, running a set of controllers the installation documentation enumerates: a pod autoscaler scaling replicas, a distributed inference controller that requires KubeRay for RayClusterFleet and RayClusterReplicaSet workloads and is skipped automatically when those CRDs are absent, a model adapter controller for LoRA management, a KV cache controller orchestrating distributed cache servers with consistent hashing, and a StormService controller handling multi-node orchestration including prefill-decode disaggregation and AFD. Workloads are described with custom resources - the quickstart applies a plain Deployment for a single vLLM server and a StormService for the disaggregated case, where separate prefill and decode roles are wired together through a KV transfer connector with an IPC_LOCK capability and NCCL configuration. The gateway side is an Envoy-based routing layer with plugins, and a metadata service reports inference state back to the autoscaler so scaling keys on inference signals rather than container metrics. An AI engine runtime sidecar standardises what each engine reports. The project also runs without KubeRay, using StormService for both single and multi-node workloads, which lowers the entry bar considerably.

## Ecosystem Position

It sits on top of vLLM, which is catalogued separately in content/projects/inference-engines, and the relationship is complementary rather than competitive: vLLM is the server, AIBrix is the control plane that decides how many of them exist and where they live. It overlaps with KServe and Ray Serve, which also operate model serving on Kubernetes, but the specific claims here are inference-aware: routing keyed to request characteristics, scaling keyed to queue and cache pressure, and KV cache treated as a first-class distributed resource. Compared with the agent-router entry in content/tools/serving-and-deployment, both sit on Envoy, and the split is scope - that one is the enterprise control plane for all AI traffic including hosted providers and MCP, while this one is the serving control plane for one engine's replicas inside a cluster. The LoRA and multi-model management overlaps with a serving proxy's model registry, again at a different layer.

## Getting Started

Install the dependency and core bundles into your cluster, then wait for the controllers to come up:

```bash
kubectl create -f https://github.com/vllm-project/aibrix/releases/download/v0.4.1/aibrix-dependency-v0.4.1.yaml
kubectl create -f https://github.com/vllm-project/aibrix/releases/download/v0.4.1/aibrix-core-v0.4.1.yaml
kubectl wait --timeout=2m -n aibrix-system deployment/aibrix-controller-manager --for=condition=Available
```

Apply a model Deployment and confirm the gateway routes to it; the quickstart also shows a StormService manifest for prefill-decode disaggregation. Pin the release version rather than using latest.

## Key Use Cases

1. Fix autoscaling on an inference workload: replace CPU or request-rate HPA with scaling driven by queue depth and KV cache pressure so replicas track real load.
2. Serve a catalogue of LoRA adapters from one base deployment: load adapters dynamically instead of paying a full replica for each tuned variant.
3. Separate prefill from decode: deploy the StormService topology so compute-heavy prompt processing and memory-bound generation run on appropriately sized GPUs, and move KV state between them with a transfer connector.

## Strengths

- Scaling keyed to inference signals through a metadata service, which is the specific gap generic HPA cannot close for LLM serving.
- KV cache treated as a distributed resource with offloading and cross-engine reuse, directly attacking the capacity limit that forces oversized GPUs.
- One-install deployment of several controllers, and the distributed inference controller disables itself cleanly when KubeRay is absent so you do not need Ray to start.
- Publishes Kubernetes-native CRDs and a benchmark tool, so capacity planning has a measurement tool in the same box.

## Limitations

Kubernetes is not optional, which rules out the substantial number of teams serving models from a handful of GPU hosts without a cluster, and even the local development mode is a cluster. The coupling to vLLM is real: Ray-based distributed inference, the runtime sidecar and much of the routing logic assume that engine, so running SGLang or TensorRT-LLM alongside it means uneven coverage. Feature maturity is uneven, with heterogeneous-GPU inference explicitly marked experimental and the release cadence roughly quarterly, so pinning a version and reading its notes matters. The metadata service and sidecar add components between you and the engine, each a thing that can be misconfigured, and the prefill-decode topology has real operational complexity - NCCL interface names, IPC locks and transfer-connector configuration are the kind of detail that consumes an afternoon. And the whole value proposition presumes the autoscaling problem is urgent; on a stable single-replica deployment it is engineering you do not need yet.

## Relation to the Arsenal

This is the Kubernetes serving entry in content/projects/inference-engines, layered on vLLM in the same folder rather than replacing it. Its gateway-side counterpart is the agent-router entry in content/tools/serving-and-deployment, which covers traffic policy across providers while this covers replica management inside a cluster. For anything above the serving layer, the frameworks in content/projects/frameworks and the agents in content/projects/agent-systems consume these endpoints. If you are still deciding on an engine rather than a control plane, the engine choices live in the same inference-engines folder and should be settled first.

## Resources

- [GitHub — vllm-project/aibrix](https://github.com/vllm-project/aibrix)
- [Official documentation](https://aibrix.readthedocs.io/latest/)
- [White paper on arXiv](https://arxiv.org/abs/2504.03648)

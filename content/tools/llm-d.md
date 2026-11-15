---
id: llm-d
name: llm-d
type: tool
job:
  - Kubernetes-native distributed LLM inference orchestration and intelligent request routing
description: High-performance inference routing and workload orchestration engine for large language models deployed on Kubernetes across heterogeneous GPU accelerators.
url: https://github.com/llm-d/llm-d
cost_model: open-source
pricing_detail: Free and open-source under Apache-2.0 license; infrastructure compute costs managed by host cluster operator.
tags:
  - distributed-inference
  - kubernetes
  - intelligent-routing
  - llm-serving
  - gpu-orchestration
  - cncf
maturity: beta
stack: [Python, Kubernetes, Go, vLLM, Triton]
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-11-15
last_reviewed: 2026-11-15
added_by: repo-maintainer
verdict: recommended
verdict_rationale: llm-d directly addresses the operational mismatch between generic Kubernetes ingress controllers and LLM-specific serving traits. Its awareness of KV-cache hit ratios, sequence length distribution, and distributed Tensor Parallelism placement makes it a top-tier choice for high-throughput containerized inference.
status: active
phase: serving-and-deployment
audience:
  - MLOps Engineers
  - Infrastructure Architects
  - Platform Engineers
best_when: Deploying large language models at scale across heterogeneous GPU clusters on Kubernetes where cache-aware request routing and dynamic load shedding are required.
avoid_when: Operating single-instance LLM deployments, CPU-only edge workloads, or simple API gateway topologies without complex model parallel scheduling needs.
github_url: https://github.com/llm-d/llm-d
docs_url: null
---

## Overview

llm-d is an open-source, Kubernetes-native inference orchestration engine designed to maximize accelerator efficiency during large language model (LLM) serving. Traditional Kubernetes load balancers and ingress controllers operate at Layer 4 or simple HTTP Layer 7 round-robin algorithms, which are blind to LLM operational traits such as Key-Value (KV) cache state, prompt context length, and generation token budgets. llm-d bridges this architectural gap by implementing an intelligent scheduling and routing plane specialized for containerized model servers.

At its technical core, llm-d decouples request routing from standard proxy mechanics by continuously monitoring backend worker states, engine queues, and accelerator memory pressure. It interfaces directly with inference runtimes (such as vLLM or Triton Inference Server) and custom Custom Resource Definitions (CRDs) inside Kubernetes. By scheduling incoming inference calls based on prefix cache locality, available GPU memory allocations, and expected decoding latencies, llm-d minimizes prefill computation overhead and significantly reduces Time to First Token (TTFT).

The engine integrates tightly into existing CNCF ecosystems, mapping cluster topologies, NUMA nodes, and multi-node GPU Interconnects (NVLink/InfiniBand) directly to model execution topologies. This design prevents network bottlenecks across Tensor Parallelism (TP) and Pipeline Parallelism (PP) split ranks while delivering standardized metrics for horizontal pod autoscaling based on true compute saturation.

## Why It's in the Arsenal

Generic ingress solutions like NGINX or Envoy lack visibility into engine-level memory mechanics, often routing long-context queries to workers with fragmented KV caches. llm-d provides KV-cache-aware routing primitives that significantly elevate overall throughput by matching incoming prompt prefixes against active cache blocks across cluster pods.

The project natively abstracts complex accelerator topologies in multi-tenant Kubernetes clusters. By coordinating pod placement and request distribution with awareness of node-level accelerator constraints, llm-d reduces inter-pod communication overhead during distributed tensor-parallel forward passes.

llm-d introduces dynamic load-shedding and queue prioritization directly at the ingress boundaries. When system load breaches configured SLO thresholds, llm-d sheds low-priority batch requests or queues them off-accelerator, preserving interactivity for high-priority latency-sensitive streams.

## Key Features

Cache-Aware Intelligent Routing: Evaluates prompt token prefixes against distributed worker memory indices to direct requests to pods holding matching KV-cache sequences, cutting prefill compute latency.

Kubernetes Native CRDs: Custom resources extend the standard Kubernetes API to manage inference deployments, worker pools, auto-scaling thresholds, and engine-level telemetry.

Dynamic Token-Budget Scheduling: Schedules requests based on cumulative input-output token counts and backend queue depth rather than raw connection counts.

Multi-Engine Compatibility: Interoperates with popular model serving engines, including vLLM, TGI, and Triton, via standardized OpenAI-compliant REST and gRPC proxy layers.

Observability & SLO Guardrails: Emits granular Prometheus metrics covering KV-cache hit ratios, token generation velocities (tokens/sec/user), TTFT, and inter-token latency distribution.

## Trade-offs

Operational Complexity: Requires managing specialized CRDs, custom controller loops, and engine exporter sidecars, increasing maintenance overhead relative to standard Kubernetes deployments.

State Synchronization Latency: Synchronizing KV-cache state and queue depth across distributed routing proxies introduces control plane traffic that can experience state drift under extreme network jitter.

Targeted Ecosystem Constraints: Primarily tuned for high-density GPU infrastructure on Kubernetes; provides minimal utility for serverless FaaS endpoints or simple single-node deployments.

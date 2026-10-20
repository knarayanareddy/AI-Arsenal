---
id: mooncake
name: Mooncake
type: tool
job:
  - KVCache-centric disaggregated LLM serving platform and transfer engine
description: A high-performance KVCache-centric disaggregated LLM serving architecture designed to decouple prefill and decoding clusters while optimizing cross-node cache…
url: https://github.com/kvcache-ai/Mooncake
cost_model: open-source
pricing_detail: Free under Apache 2.0 license
tags:
  - disaggregation
  - inference
  - kvcache
  - llm
  - rdma
  - sglang
  - vllm
maturity: production
stack:
  - c++
  - cuda
  - python
  - rdma
  - vllm
  - sglang
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-10-20
last_reviewed: 2026-10-20
added_by: repo-maintainer
verdict: recommended
verdict_rationale: Mooncake addresses one of the most critical bottlenecks in long-context LLM serving: memory bandwidth and compute contention caused by coupling prefill and decode stages. Its production-proven disaggregated architecture and custom RDMA-accelerated transfer layer make it essential for high-throughput, long-context deployments.
status: active
phase: serving-and-deployment
audience:
  - ml-infrastructure-engineers
  - llm-ops
  - platform-engineers
best_when: You are serving long-context LLM workloads (e.g., Kimi-style millions-token contexts) at scale, experiencing severe prefill/decode interference, and have access to high-speed RDMA (InfiniBand or RoCE) hardware.
avoid_when: You operate small-scale deployments on single nodes, lack high-speed network interfaces (RDMA), or serve short-sequence real-time requests where traditional chunked-prefill in monolithic engines (vLLM, TGI) suffices.
github_url: https://github.com/kvcache-ai/Mooncake
docs_url: null
---

## Overview

Mooncake is an open-source, KVCache-centric disaggregated LLM serving platform originally developed by Moonshot AI to power the Kimi LLM service. Traditional monolithic serving frameworks schedule both the prefill phase (compute-bound processing of input tokens) and the decoding phase (memory-bandwidth-bound generation of output tokens) on the same GPU instances. This monolithic approach leads to extreme resource contention, unpredictable tail latencies, and inefficient GPU utilization under long-context workloads.

Mooncake addresses these limitations by introducing a decoupled architecture that physically separates Prefill instances from Decode instances. At the core of Mooncake is a high-performance cross-node memory and transport layer (Mooncake Transfer Engine) that offloads and streams KV-caches over RDMA (RoCE/InfiniBand) and CXL/PCIe hierarchies. By abstracting DRAM, NVMe, and GPU HBM across the cluster into a unified local/remote cache fabric, Mooncake allows prefill nodes to compute KV-caches at high throughput and immediately hand them off to decoding nodes with minimal latency overhead.

The architecture integrates seamlessly with leading open-source execution backends such as vLLM and SGLang. Through centralized scheduling algorithms that monitor global cache reuse (prefix caching) and transport topology, Mooncake maximizes context reuse across long-context multi-turn conversations and agentic workflows, drastically reducing redundant prefill computation.

## Why It's in the Arsenal

Mooncake represents the state of the art in production-grade disaggregated LLM serving. Standard serving solutions rely on monolithic chunked prefill, which compromises decoding TTFT (Time To First Token) and TPOT (Time Per Output Token) when long inputs land simultaneously with active generation streams. Mooncake eliminates this interference entirely by delegating prefills to dedicated GPU pools optimized for dense matrix math and decoding to memory-bandwidth-optimized pools.

Its principal technological edge lies in its transport architecture. Rather than relying on high-overhead HTTP/gRPC pipelines for KV-cache migration, Mooncake utilizes a C++ native zero-copy RDMA transport engine. By combining prefix-aware scheduling with dynamic allocation across multi-tier storage (HBM, CPU RAM, local NVMe), Mooncake achieves linear scaling for context lengths reaching millions of tokens, making it indispensable for ultra-long-context inference infrastructure.

## Key Features

Disaggregated Prefill and Decode Execution: Decouples prompt processing from token generation into separate clusters, eliminating resource starvation and stabilizing decoding latency.

Mooncake Transfer Engine (MTE): High-throughput C++ transport library supporting zero-copy RDMA (InfiniBand/RoCE), PCIe P2P, and multi-path transfers tailored for tensor structures.

Hierarchical KVCache Storage Pool: Manages GPU HBM, host DRAM, and high-speed SSDs as a contiguous cache space, dynamically evicting and prefetching cache blocks based on prefix hashing.

Monolithic Framework Integration: Native bindings and execution plugins for vLLM and SGLang, enabling existing model weight deployments to leverage disaggregated execution without custom model rewrites.

Global Topology-Aware Scheduler: Centralized scheduler that calculates optimal prefill-to-decode routing based on cache placement, network hop distance, and instance queue length.

## Trade-offs

Hardware Dependency: Requires high-bandwidth RDMA networks (100Gbps+ RoCE v2 or InfiniBand) between prefill and decode nodes to avoid making cache transfer the bottleneck.

Operational Complexity: Managing disaggregated pools introduces distinct cluster topology management, complex multi-tier failure modes, and heterogeneous auto-scaling requirements compared to monolithic vLLM clusters.

Scheduling Overhead: Dynamic cache lookup across remote nodes and dynamic transport allocation add control-plane latency that must be amortized over relatively long context sizes.

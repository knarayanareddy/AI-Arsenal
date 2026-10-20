---
id: lmcache
name: LMCache
type: tool
job:
  - Optimizes Key-Value (KV) cache storage and sharing across distributed LLM inference engines
description: LMCache supercharges LLM serving engines by enabling local and remote KV cache sharing, compression, and offloading across GPU memory, host RAM, and distribute…
url: https://github.com/LMCache/LMCache
cost_model: open-source
pricing_detail: Free (Apache-2.0)
tags:
  - kv-cache
  - vllm
  - cuda
  - rocm
  - llm-inference
  - pytorch
maturity: beta
stack:
  - python
  - c++
  - cuda
  - rocm
  - pytorch
  - vllm
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-10-20
last_reviewed: 2026-10-20
added_by: repo-maintainer
verdict: recommended
verdict_rationale: LMCache addresses a critical bottleneck in long-context LLM serving by decoupled KV cache management. Its native integration with vLLM and cross-node cache sharing capabilities reduce Time-To-First-Byte (TTFB) significantly for repetitive context workflows.
status: active
phase: serving-and-deployment
audience:
  - MLOps Engineers
  - Infrastructure Engineers
  - Inference Platform Teams
best_when: Serving long-context LLM workloads with repeated system prompts, multi-turn conversations, or agentic loops across multi-GPU or multi-node clusters using vLLM.
avoid_when: Serving short, single-turn prompts without context reuse, or using engines that lack explicit KV cache hooks outside of PyTorch/vLLM.
github_url: https://github.com/LMCache/LMCache
docs_url: null
---

## Overview

LMCache is an open-source, high-performance Key-Value (KV) cache storage and transport layer designed for large language model (LLM) serving engines such as vLLM. As contexts expand to tens or hundreds of thousands of tokens, prefilling the KV cache becomes the primary compute and latency bottleneck. LMCache decouples KV cache management from execution engines, allowing computed KV tensors to be saved, retrieved, and shared across heterogeneous storage tiers including local GPU HBM, host CPU RAM, local NVMe SSDs, and remote distributed cache servers.

Architecturally, LMCache hooks directly into the attention and memory management modules of backend engines like vLLM. It chunks incoming token sequences into fixed-size blocks, computes content-aware hashes for each chunk, and asynchronously streams the corresponding KV tensors to offload locations. When a new inference request arrives with a matching token prefix, LMCache resolves the cached chunks and streams them back to the engine's active memory allocations, avoiding redundant prefill computation.

The system is built to handle dynamic, multi-tenant execution topologies across both NVIDIA CUDA and AMD ROCm platforms. By implementing low-overhead serialization, specialized GPU memory copy kernels, and lossy/lossless compression algorithms, LMCache minimizes data movement overhead and saturates available PCI-e and network transport bandwidth.

## Why It's in the Arsenal

Standard LLM serving frameworks keep KV caches transient within local GPU VRAM, discarding them after a request finishes or limiting reuse to strict single-instance prefix caching. LMCache turns transient KV caches into persistent, cluster-wide shared objects. This enables near-zero prefill overhead for workloads like agentic loops, long document analysis, and retrieval-augmented generation (RAG) where system prompts or base documents are reused across disparate execution instances.

LMCache sets itself apart through its multi-tier storage design and support for asynchronous network transport protocols (such as RDMA and gRPC). Rather than blocking the forward execution pass during offloading, tensor transfers occur non-blockingly via dedicated CUDA streams. Additionally, LMCache supports pluggable KV tensor compression techniques (e.g., chunk-level quantization), allowing infrastructure operators to balance network transmission latency, memory capacity, and target generation quality.

## Key Features

Hierarchical KV Storage: Blends local GPU memory, host DRAM, NVMe drives, and remote Redis or custom storage clusters into a single multi-tier caching hierarchy.

Native Engine Integration: Provides seamless integration with vLLM execution paths, enabling KV cache retrieval without modifying underlying engine scheduling paradigms.

Content-Addressed Prefix Matching: Hashes token sequences at configurable block granularities to allow precise prefix matching and partial context retrieval.

Asynchronous Pipeline Transfers: Uses non-blocking memory copies and dedicated background threads to stream KV tensors across PCI-e and network boundaries during generation passes.

Lossy and Lossless Compression: Integrates quantization algorithms (FP16 to INT8/INT4) designed specifically for KV cache structures to maximize throughput and minimize network usage.

Cross-Platform Support: Extends support across both NVIDIA CUDA and AMD ROCm architectures for multi-vendor hardware deployments.

## Trade-offs

Operational Complexity: Introducing LMCache requires managing a distributed storage plane or offload layer, adding auxiliary network nodes and storage state to the serving infrastructure.

PCI-e and Network Bandwidth Dependence: High cache retrieval throughput relies heavily on host PCI-e generation and interconnect speed; saturated network pipelines can negate TTFB gains.

Quantization Precision Loss: Utilizing aggressive lossy KV cache compression to decrease transport payload can introduce slight degradation in generation quality or long-context recall capabilities.

Engine Synchronization Edge-cases: Engine version mismatches or custom modifications to attention mechanisms (e.g., PagedAttention internal layouts) can require dedicated adaptation layers in LMCache.

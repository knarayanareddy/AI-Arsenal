---
id: trnrt
name: trnrt
type: tool
job:
  - Model Serving & Inference Execution
description: High-performance, open-source LLM inference engine optimized for AWS Trainium (Trn1/Trn2) chips, featuring NKI megakernels and long-context processing.
url: https://github.com/RunanywhereAI/trnrt
cost_model: open-source
pricing_detail: Free and open-source under Apache-2.0. Hosting costs depend entirely on AWS EC2 Trn1/Trn1n/Trn2 instance usage.
tags:
  - aws-trainium
  - neuron
  - nki
  - llm-serving
  - inference
  - openai-api
  - megakernels
maturity: alpha
stack:
  - python
  - c++
  - aws-neuron-sdk
  - nki
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-11-20
last_reviewed: 2026-11-20
added_by: repo-maintainer
verdict: watching
verdict_rationale: trnrt fills a critical gap in the AWS Trainium ecosystem by providing an open-source, highly optimized serving runtime built directly on Neuron Kernel Interface (NKI) megakernels. While early in maturity, its focus on context scaling up to 1M tokens and drop-in OpenAI protocol support makes it a key project to track for high-density, low-cost silicon alternatives to NVIDIA GPUs.
status: active
phase: serving-and-deployment
audience:
  - ml-engineers
  - infrastructure-engineers
  - model-serving-architects
best_when: Deploying open-weights LLMs (such as GLM or Llama series) directly on AWS Trainium (Trn1/Trn2) instances where high-throughput, low-latency, and custom hardware kernel optimizations via NKI are required without paying third-party SaaS margins.
avoid_when: Operating exclusively on NVIDIA CUDA or AMD ROCm hardware, or when deploying standard models on AWS Inferentia (Inf2) where pre-compiled AWS Neuron Core runtime graphs (via vLLM-Neuron or standard HuggingFace Optimum Neuron) meet latency SLAs without needing NKI kernel customization.
github_url: https://github.com/RunanywhereAI/trnrt
docs_url: null
---

## Overview

trnrt is an open-source inference engine developed by RunAnywhere specifically targeted at hardware acceleration on AWS Trainium (Trn1 and Trn2) platforms. While standard inference stacks rely on generic AWS Neuron SDK high-level graphs, trnrt leverages the AWS Neuron Kernel Interface (NKI) to construct custom megakernels. By writing specialized lower-level compute kernels, the engine minimizes memory transfer overhead, optimizes tile-based SRAM utilization inside Neuron Cores, and enables ultra-low-latency decoding across multi-node hardware topology.

The architectural architecture of trnrt centers around scaling token context lengths up to 1M tokens without suffering classic memory bandwidth bottlenecks. It achieves this by bypassing standard high-level compiler passes through targeted NKI layout transformations, continuous batching, and highly parallelized Attention mechanisms mapped directly onto Trainium's vector and matrix execution units. The engine exposes an HTTP server compliant with the OpenAI REST format, allowing existing client applications to redirect request pipelines without altering downstream payload schemas.

By addressing the structural limitations of vendor-provided serving pipelines, trnrt bridges the operational efficiency gap between custom CUDA/Triton deployments on NVIDIA hardware and native compilation on AWS custom silicon. It provides a blueprint for leveraging lower-cost Cloud Native Accelerators (CNAs) at enterprise scale without lock-in to proprietary, closed-source SaaS runtimes.

## Why It's in the Arsenal

Standard deployment workflows on AWS Trainium typically depend on `optimum-neuron` or early AWS-managed runtime integrations with vLLM. However, these often suffer from static compilation constraints, high memory overhead, or incomplete kernel-level optimizations for ultra-long context windows. trnrt enters the arsenal because it implements NKI megakernels directly, allowing fine-grained control over execution graph scheduling and layout optimization on Trainium's hardware architecture.

Additionally, trnrt provides direct competition to vendor-locked cloud inference solutions by lowering the barrier to deploying proprietary compute clusters on Trn1/Trn2 hardware. Its native OpenAI API compatibility makes it a drop-in execution back-end for production systems, allowing organizations to maintain self-hosted control over long-context LLM workloads while cutting compute costs relative to traditional H100/A100 instances.

## Key Features

NKI Megakernel Engine: Custom lower-level fused operators written in AWS Neuron Kernel Interface to optimize vector/matrix core scheduling and SRAM reuse.

1M-Token Context Scaling: Memory-efficient attention handling designed to process long-context prompts on Trainium architectures without out-of-memory kernel panics.

OpenAI-Compatible REST Interface: Implements standard `/v1/chat/completions` and `/v1/completions` HTTP endpoints for effortless drop-in deployment.

Hardware-Tailored Model Layouts: Advanced model tensor distribution optimized specifically for Trn1/Trn2 inter-core interconnect topology.

Continuous Batching & Paged Attention Integration: Tailored memory management for KV caches operating on Trainium's distinct memory hierarchy.

## Trade-offs

Hardware Lock-in: Designed strictly around AWS Neuron and Trainium hardware primitives (Trn1/Trn2). The custom NKI kernels offer no execution path on NVIDIA (CUDA), AMD (ROCm), or CPU hardware.

Ecosystem Maturity: Compared to mainstream frameworks like vLLM, TensorRT-LLM, or TGI, trnrt is an active open-source project with a smaller community footprint, requiring team capacity to troubleshoot compiler edge cases and lower-level driver interactions.

Compilation Overhead: Leveraging NKI kernels and specialized Neuron acceleration patterns requires upfront model graph compilation steps, which can complicate rapid local iteration and testing cycles.

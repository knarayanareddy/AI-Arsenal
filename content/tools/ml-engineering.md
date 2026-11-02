---
id: ml-engineering
name: ml-engineering
type: tool
job:
  - Provides actionable hardware, distributed training, and infrastructure operational knowledge for scaling large language models.
description: An open-access engineering manual covering memory optimization, GPU hardware characteristics, cluster networking, PyTorch execution mechanics, and Slurm orches…
url: https://github.com/stas00/ml-engineering
cost_model: open-source
pricing_detail: Free and open source under CC-BY-SA-4.0
tags:
  - ml-engineering
  - pytorch
  - gpus
  - distributed-training
  - slurm
  - llm
  - debugging
  - cuda
maturity: production
stack:
  - python
  - pytorch
  - cuda
  - slurm
  - deepspeed
  - megatron-lm
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-11-02
last_reviewed: 2026-11-02
added_by: repo-maintainer
verdict: best-in-class
verdict_rationale: Unrivaled practical detail on low-level GPU memory mechanics, cluster network bottlenecks, and real-world failure modes encountered when training multi-billion parameter models.
status: active
phase: dx-and-tooling
audience:
  - ML Systems Engineers
  - Infrastructure Engineers
  - Distributed Systems Architects
  - HPC Engineers
best_when: Building, debugging, or optimizing multi-node GPU clusters and high-performance training runs for large foundation models.
avoid_when: Looking for high-level AutoML APIs, enterprise SaaS managed orchestrators, or basic non-distributed machine learning tutorials.
github_url: https://github.com/stas00/ml-engineering
docs_url: null
---

## Overview

The `ml-engineering` repository (commonly referred to as the Machine Learning Engineering Open Book) is a comprehensive, practitioner-focused technical manual authored by Stas Bekman. It addresses the systemic gap between theoretical deep learning research and the low-level mechanical realities of operating large-scale GPU infrastructure. Designed for systems engineers and ML infrastructure architects, the project codifies hard-won operational patterns for distributed model training, memory budget calculation, hardware debugging, and compute resource orchestration.

Architecturally, the book dismantles the full hardware-software stack involved in high-performance model execution. It details the precise interactions between PyTorch execution runtimes, CUDA memory allocators, NCCL communication topologies, interconnect technologies (such as InfiniBand and RoCE), host system architectures (PCIe lanes, NUMA nodes), and storage sub-systems (NVMe caching, Parallel File Systems). Rather than focusing on abstract frameworks, it provides quantitative formulas and concrete diagnostic workflows to triage hardware faults, silent data corruptions, and compute bottlenecks.

The resource serves as a living operational playbook for scaling compute setups. It includes in-depth treatments of memory math (calculating model parameters, optimizer states, activation memory, and KV-cache bounds), Slurm job orchestration scripts, GPU architecture nuances (NVIDIA A100/H100 specs, tensor core utilization), and systematic strategies for recovering from distributed training panics without invalidating checkpoint state.

## Why It's in the Arsenal

Unlike standard framework documentation that assumes ideal execution conditions, `ml-engineering` explicitly targets failure modes, performance degradations, and hardware edge cases encountered when scaling models across hundreds or thousands of GPUs. It provides exact formulas for calculating precise VRAM consumption breakdown across 3D parallelism paradigms (Data, Pipeline, Tensor, and Sequence Parallelism combined with ZeRO states), eliminating trial-and-error memory allocation.

The repository stands out for its zero-fluff approach to low-level systems engineering. It provides actionable scripts and shell commands to diagnose hardware defects (e.g., PCIe bus speed degradation, thermal throttling, single-bit flip memory errors), optimize NUMA node alignment to prevent socket-to-socket transfers, and configure high-throughput Slurm submit scripts tailored for deep learning workloads.

## Key Features

**Quantitative VRAM Budgeting Mechanics**: Formulas to calculate static and dynamic GPU memory requirements, detailing parameter representations (FP32, FP16, BF16, FP8), optimizer overheads (AdamW 8-byte state storage per parameter), activation checkpointing costs, and KV-cache scaling equations.

**Cluster Network & Interconnect Diagnostics**: Direct guidelines for analyzing host-to-device and device-to-device bandwidth, setting NCCL environment variables (`NCCL_DEBUG=INFO`, `NCCL_IB_DISABLE`), and troubleshooting InfiniBand rail-optimized topologies vs Ethernet RoCE v2 performance drops.

**Distributed Parallelism Layouts**: Concrete architectural breakdowns of 3D Parallelism, explaining execution order, memory overhead, and communication costs for Megatron-LM and DeepSpeed paradigms (ZeRO-1, ZeRO-2, ZeRO-3, and ZeRO-Offload).

**Hardware Defect Triage Routines**: Execution patterns for identifying faulty GPUs, degraded NVLink bridges, unstable CUDA runtimes, and silent data corruption using tools like `nvidia-smi`, `dcgmi`, PyTorch sanitizers, and custom synthetic stress tests.

**High-Throughput IO & Storage Strategies**: Best practices for structuring multi-terabyte datasets to prevent storage IOPS bottlenecks, including optimal chunking, host-RAM caching, shared memory (`/dev/shm`) usage, and high-performance dataloader worker tuning (`num_workers`, `pin_memory=True`).

## Trade-offs

**Rapidly Evolving Hardware Specs**: While core distributed systems principles remain timeless, specific microarchitectural details, flag recommendations, and hardware-specific optimizations age quickly as new GPU architectures (e.g., NVIDIA Blackwell) and compiler stacks (e.g., PyTorch 2.x `torch.compile`) evolve.

**NVIDIA and Linux Centricity**: The guide focuses almost exclusively on NVIDIA GPU architecture (CUDA, NCCL, NVLink) and Linux-based HPC cluster infrastructure (Slurm). Software engineers working on alternative hardware accelerators (AMD ROCm, Google TPUs, Apple Silicon) or pure Kubernetes-native workflows (e.g., Kubeflow) must translate these lower-level concepts to their respective ecosystems.

**Unstructured Book Format**: Delivered as an evolving open-source document rather than an indexed software framework, it lacks automated programmatic test suites or CLI toolings. Developers must extract and adapt code snippets, shell scripts, and formulas manually into their codebases.

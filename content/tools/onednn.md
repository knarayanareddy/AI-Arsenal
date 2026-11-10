---
id: onednn
name: oneDNN
type: tool
job:
  - Accelerate deep learning primitive execution on x86, ARM, RISC-V CPUs and Intel GPUs
description: Open-source performance library offering highly optimized primitives for deep learning workloads, including convolutions, matrix multiplications, and attention…
url: https://github.com/uxlfoundation/oneDNN
cost_model: open-source
pricing_detail: Free and open-source under the Apache-2.0 license.
tags:
  - oneAPI
  - oneDNN
  - deep-learning
  - performance
  - matmul
  - convolution
  - x64
  - aarch64
maturity: production
stack:
  - C++
  - C
  - OpenMP
  - SYCL
  - TBB
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-11-10
last_reviewed: 2026-11-10
added_by: repo-maintainer
verdict: best-in-class
verdict_rationale: oneDNN is the canonical low-level primitive compute library for Intel architecture CPU/GPU deep learning execution and a critical engine for PyTorch and TensorFlow execution paths.
status: active
phase: model-layer
audience:
  - Framework Developers
  - HPC Engineers
  - ML Infrastructure Engineers
  - Runtime Engine Authors
best_when: You are targeting Intel CPUs (with AVX-512, AMX, AVX10), Intel GPUs via SYCL, or optimized AArch64/RISC-V deployments requiring maximum throughput for standard neural network primitives.
avoid_when: You are targeting NVIDIA GPUs (where cuDNN is the standard) or AMD GPUs (where MIOpen/ROCm is native), unless using oneDNN SYCL backends built specifically for cross-platform portability.
github_url: https://github.com/uxlfoundation/oneDNN
docs_url: null
---

## Overview

oneDNN (oneAPI Deep Neural Network Library) is an open-source cross-platform performance library of basic building blocks for deep learning applications. Developed under the Unified Acceleration (UXL) Foundation and formerly known as MKL-DNN, it delivers hardware-tailored implementations of operators such as direct and winograd convolutions, matrix multiplication (GEMM), layer normalization, activation functions, and transformer attention mechanisms.

Architecturally, oneDNN sits directly between high-level frameworks—such as PyTorch, TensorFlow, ONNX Runtime, and OpenVINO—and the underlying compute hardware. It relies on JIT (Just-In-Time) compilation for runtime code generation tailored to specific CPU ISA features (including Intel AVX-512, AMX, AVX10, ARM NEON/SVE, and RISC-V vector extensions) and leverages SYCL and OpenCL backends for hardware acceleration on Intel Arc and Data Center GPUs.

The library hides hardware layout complexities by implementing opaque tensor memory formats (`dnnl::memory::format_tag::any`). This enables oneDNN to dynamically select specialized memory blockings (e.g., `nChw16c` or `nChw8c`) that match hardware SIMD vector lengths and cash line sizes, maximizing memory bandwidth utilization and cache locality during execution pipelines.

## Why It's in the Arsenal

oneDNN is the foundational runtime engine powering CPU and Intel GPU inference/training execution in virtually all tier-1 AI frameworks. PyTorch integrates oneDNN via `at::native` and `MKLDNN` tensors, while TensorFlow natively embeds it to dispatch graph nodes directly to hardware-optimized primitives.

Its JIT code generation engine dynamically synthesizes assembly code at runtime, optimizing register allocations, loop unrolling, and vector instructions specifically for the executing processor instruction set. This eliminates compile-time target lock-in while extracting optimal peak FLOPS, especially on hardware features like Intel Advanced Matrix Extensions (AMX) for BF16 and INT8 workloads, as well as emerging Microscaling formats (MXFP8).

## Key Features

JIT-Compiled Assembly Kernel Generation: Emits instruction-level targeted machine code at runtime (using Xbyak for x86) for custom shapes, strides, and fusion patterns.

Hardware-Accelerated Primitive Fusion: Supports fusion of post-ops (e.g., GEMM or Convolution followed by ReLU, BiasAdd, Gelu, or sum) into single kernel executions, mitigating memory bandwidth bottlenecks.

Advanced Datatype Support: Native instruction support for FP32, FP16, BF16, INT8, INT4, and experimental MXFP8 data representations.

Multi-ISA Architecture Target Support: Scales execution across x86-64 (AVX2, AVX-512, AMX, AVX10), AArch64 (NEON, SVE2), RISC-V vector extension architectures, and Intel Xe architecture GPUs via SYCL.

Memory Layout Auto-Tuning: Dynamic memory format queries (`dnnl_format_tag_any`) allow the library to dictate optional tensor transformations to maximize vector register throughput.

## Trade-offs

Opaque Tensor Reordering Overhead: Achieving peak compute efficiency often requires converting framework standard row-major/column-major memory structures into oneDNN's blocked formats (e.g., `nChw16c`), incurring runtime reorder penalties if post-ops or operations cannot stay within the blocked layout.

Binary Size and Compilation Overhead: Incorporating oneDNN alongside its runtime JIT generator increases total binary footprints and requires thread-safe initialization handling for runtime kernel generation caches.

Hardware Ecosystem Constraints: While cross-platform via UXL Foundation specifications, primary performance engineering and day-zero ISA optimizations heavily favor Intel hardware architectures over alternative CPU and GPU vendors.

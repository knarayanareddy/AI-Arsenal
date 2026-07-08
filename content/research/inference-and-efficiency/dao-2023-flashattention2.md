---
id: dao-2023-flashattention2
title: "FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning"
phase: inference-and-efficiency
venue: iclr
year: 2023
authors:
  - "Dao, T."
arxiv_id: "2307.08691"
arxiv_url: "https://arxiv.org/abs/2307.08691"
pdf_url: "https://arxiv.org/pdf/2307.08691"
code_url: "https://github.com/Dao-AILab/flash-attention"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 2500

tldr: "Rewrote FlashAttention to cut non-matmul FLOPs, parallelize across sequence length, and partition work better between GPU warps — roughly 2x faster than v1 and reaching 50-73% of A100 peak, the kernel now underpinning most training and long-context serving."
key_contribution: "Re-engineered the FlashAttention algorithm around GPU execution realities: minimizing expensive non-matmul operations, adding parallelism over the sequence dimension (not just batch/heads), and improving warp-level work partitioning to reduce shared-memory traffic — closing most of the gap to peak GPU throughput for exact attention."

builds_on:
  - "dao-2022-flashattention"
implemented_in:
  - "vllm"
  - "sglang"
  - "text-generation-inference"

tags:
  - "efficiency"
  - "attention"
  - "inference"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

FlashAttention-2 is a from-scratch reimplementation of the FlashAttention kernel tuned to how modern GPUs actually execute work. The original algorithm was IO-optimal in theory but left throughput on the table because of costly non-matmul operations and under-parallelization. Version 2 reorganizes the computation to keep tensor cores busy, parallelizes over the sequence length, and repartitions work among warps to minimize shared-memory shuffles — roughly doubling v1's speed.

## Why it's in the Arsenal

- FlashAttention-2 is the attention kernel actually running in your training runs and long-context serving stack today; v1 is the idea, v2 is what ships in PyTorch SDPA, vLLM, and the training frameworks
- It is a clean case study in the difference between algorithmic and hardware-level optimization: same asymptotics as v1, ~2x faster purely from execution-aware engineering

## Core Contribution

Three concrete changes on top of FlashAttention: (1) reduce non-matmul FLOPs, which are far more expensive per-FLOP than matmul on tensor-core GPUs; (2) add parallelism across the sequence-length dimension so long single sequences saturate the GPU; and (3) partition the work between warps within a thread block to avoid writing intermediates to shared memory. Together these lift utilization from ~25-40% to 50-73% of theoretical peak.

## Key Results

- Reached 50-73% of theoretical peak FLOPs/s on A100 GPUs, roughly 2x faster than FlashAttention-1 (paper, 2023)
- Delivered up to ~1.3x end-to-end GPT-style training speedup over v1 in the reported configurations (2023)

## Methodology

The kernel keeps the tiling + online-softmax structure of v1 but rewrites the CUDA scheduling: loop order is changed so the outer loop is over query blocks (enabling sequence-length parallelism), warp assignments are restructured to avoid shared-memory round-trips, and the number of non-matmul operations per tile is minimized. Benchmarks measure raw attention throughput and end-to-end training speed against v1 and PyTorch baselines.

## Practical Applicability

You rarely call FlashAttention-2 directly, but you depend on it: enabling it (via `attn_implementation="flash_attention_2"` in Transformers, or automatically in vLLM/SGLang) is the single biggest free throughput win for training and long-context inference on Ampere/Hopper GPUs. When you plan long-context serving budgets, v2's memory-linearity and speed are what make 32k-128k contexts affordable. Confirm your GPU/dtype is supported (it targets fp16/bf16 on recent NVIDIA hardware).

## Limitations & Critiques

- Hardware-specific: optimized for Ampere/Hopper NVIDIA GPUs and fp16/bf16; older GPUs and other accelerators see limited or no benefit
- Superseded on Hopper by FlashAttention-3 (2024), which exploits H100-specific features (async, FP8) for further gains
- Implementation complexity is high; correctness depends on the maintained CUDA kernels, not something teams reimplement casually

## Reproductions & Follow-up Work

Reproduced and ubiquitously deployed via the Dao-AILab/flash-attention repo, PyTorch SDPA, and every major serving/training framework. Extended by FlashAttention-3 (2024) for Hopper, and complemented by `kwon-2023-pagedattention` on the memory-management side of serving.

## Relation to the Arsenal

Inference-and-efficiency paper; the practical successor to `dao-2022-flashattention` and a dependency of the `vllm`, `sglang`, and `text-generation-inference` project entries.

## Resources

- [FlashAttention-2 paper](https://arxiv.org/abs/2307.08691)
- [Dao-AILab/flash-attention](https://github.com/Dao-AILab/flash-attention)

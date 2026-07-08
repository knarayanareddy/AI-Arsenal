---
id: dao-2022-flashattention
title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness"
phase: inference-and-efficiency
venue: neurips
year: 2022
authors:
  - "Dao, T."
  - "Fu, D. Y."
  - "Ermon, S."
  - "Rudra, A."
  - "Ré, C."
arxiv_id: "2205.14135"
arxiv_url: "https://arxiv.org/abs/2205.14135"
pdf_url: "https://arxiv.org/pdf/2205.14135"
code_url: "https://github.com/Dao-AILab/flash-attention"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 5000

tldr: "Reframed attention as an IO problem: tiling and online softmax keep the computation in GPU SRAM, avoiding materializing the N×N matrix — exact attention, 2-4x faster and linear memory, now compiled into effectively all training and serving stacks"
key_contribution: "Showed attention is bottlenecked by HBM memory traffic, not FLOPs, and gave an IO-optimal tiled algorithm (online softmax + recomputation in backward) computing exact attention without ever materializing the attention matrix — making long context computationally practical and obsoleting most approximate-attention research"

builds_on:
  - "vaswani-2017-attention"
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

FlashAttention computes exact attention while never writing the N×N score matrix to GPU main memory: it tiles Q/K/V blocks into on-chip SRAM, maintains running softmax statistics (online softmax), and rescales partial outputs as blocks stream through. The result is 2-4x wall-clock speedup and memory linear in sequence length, with the backward pass recomputing attention on the fly instead of storing it. It converted 'attention is quadratic' from a fundamental obstacle into a memory-management detail.

## Why it's in the Arsenal

- FlashAttention is running under every model you train or serve (PyTorch SDPA, vLLM, all training frameworks) — its memory-linearity is the reason 100k+ contexts are feasible at all
- The IO-aware analysis style it introduced is the mental model behind most subsequent systems wins (PagedAttention, FlashInfer, kernel fusion generally) — high-transfer systems thinking, not just one kernel

## Core Contribution

The insight that standard attention is memory-bound — dominated by HBM reads/writes of the intermediate matrix rather than by its FLOPs — plus an algorithm that provably minimizes IO complexity for exact attention. This redirected the field: instead of approximating attention (sparse/linear attention research, which mostly failed to transfer), you keep the exact computation and fix the memory traffic. The paper also proved a lower bound showing its IO complexity is optimal up to constants.

## Key Results

- 3x speedup on GPT-2 attention layers and 15% end-to-end BERT-large training speedup versus the MLPerf record at the time (paper Section 4, 2022)
- Memory footprint linear in sequence length, enabling 16k-64k contexts on hardware where standard attention exhausted memory (2022)
- Block-sparse extension reached 2.8x further speedup, and quality improvements from longer usable context (better perplexity, first models to beat chance on Path-X at 16k) (2022)

## Methodology

Q, K, V are split into blocks sized to SRAM; for each Q block, the algorithm streams K/V blocks, computing partial attention scores, updating running max and sum statistics for a numerically stable online softmax, and rescaling the accumulated output — one pass, no N×N materialization. The backward pass stores only the softmax normalization statistics and recomputes attention blocks, trading FLOPs for memory traffic, which wins because the operation is memory-bound. IO complexity is analyzed formally against a two-level memory model.

## Practical Applicability

You rarely call FlashAttention directly — it is inside PyTorch's scaled_dot_product_attention, every serving engine, and every training framework — but its properties set your operating envelope: context length scales linearly in memory (the KV cache, not attention computation, becomes the binding constraint), and attention kernel choice (FA2/FA3, FlashInfer variants) is a real configuration lever in vLLM/SGLang deployments. When profiling training, the arithmetic-intensity reasoning this paper models is the correct way to predict which optimizations will matter.

## Limitations & Critiques

FlashAttention optimizes exact attention's constant factors; the O(N²) compute remains, so very long contexts still pay quadratically in FLOPs even though memory is linear — which is why linear-attention/SSM research (Mamba) continues in parallel. The kernels are hardware-specific engineering artifacts requiring reimplementation per generation (FlashAttention-2 for better parallelism, FA-3 for Hopper), and coverage of exotic attention variants (arbitrary masks, some MLA configurations) lags the research frontier.

## Reproductions & Follow-up Work

FlashAttention-2 (2023) reworked parallelism for 2x further gains; FlashAttention-3 (2024) exploited Hopper's TMA/FP8 for up to 75% H100 utilization; the approach is upstreamed into PyTorch SDPA, cuDNN, and every major serving/training stack, and inspired IO-aware successors (FlashInfer, FlashDecoding, PagedAttention's kernel design). Among the most thoroughly production-validated systems papers in ML.

## Relation to the Arsenal

Makes the attention of `vaswani-2017-attention` (foundational/) practical at modern context lengths; complements `kwon-2023-pagedattention` (same phase) which manages the KV cache that FlashAttention's linearity exposes as the next bottleneck; both underpin every entry in projects/inference-engines/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2205.14135)
- [arXiv](https://arxiv.org/abs/2205.14135)
- [Code](https://github.com/Dao-AILab/flash-attention)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

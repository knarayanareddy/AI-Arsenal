---
id: kwon-2023-pagedattention
title: "Efficient Memory Management for Large Language Model Serving with PagedAttention"
phase: inference-and-efficiency
venue: other
year: 2023
authors:
  - "Kwon, W."
  - "Li, Z."
  - "Zhuang, S."
  - "Sheng, Y."
  - "Zheng, L."
  - "Yu, C. H."
  - "Gonzalez, J. E."
  - "Zhang, H."
  - "Stoica, I."
arxiv_id: "2309.06180"
arxiv_url: "https://arxiv.org/abs/2309.06180"
pdf_url: "https://arxiv.org/pdf/2309.06180"
code_url: "https://github.com/vllm-project/vllm"
venue_url: "https://dl.acm.org/doi/10.1145/3600006.3613165"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 2500

tldr: "Applied OS virtual-memory paging to the KV cache: non-contiguous fixed-size blocks eliminate the 60-80% memory waste of contiguous allocation, enabling 2-4x serving throughput — this is the vLLM paper, and paged KV caches are now universal"
key_contribution: "Diagnosed that contiguous KV-cache allocation wastes 60-80% of memory to fragmentation and over-reservation, and introduced PagedAttention — block-based virtual KV memory with a block table per sequence, enabling near-zero waste, prefix sharing via copy-on-write, and 2-4x throughput; shipped as vLLM"

builds_on:
  - "vaswani-2017-attention"
  - "dao-2022-flashattention"
implemented_in:
  - "vllm"
  - "sglang"
  - "text-generation-inference"

tags:
  - "inference"
  - "efficiency"
  - "caching"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

The vLLM paper: it measured that production LLM serving systems wasted 60-80% of KV-cache memory through contiguous pre-allocation (reserving max-length buffers per request, internal/external fragmentation) and fixed it by transplanting OS virtual memory: the KV cache is stored in fixed-size blocks, logically contiguous but physically scattered, indexed by per-sequence block tables. Freed memory means bigger batches, which means 2-4x throughput at equal latency — and the open-source system built around it became the default open serving engine.

## Why it's in the Arsenal

- This is the founding paper of vLLM — the most-deployed open serving engine and a catalog staple — and paged KV management is now table stakes in every serving stack (TensorRT-LLM, SGLang, TGI)
- Serving-cost reasoning (why batch size is memory-bound, why prefix caching is nearly free, what 'gpu-memory-utilization' actually allocates) follows directly from this paper's memory model

## Core Contribution

The virtual-memory mapping itself: block tables give each sequence the illusion of contiguous KV memory while physical blocks are allocated on demand, shared across sequences (prefix caching, parallel sampling) with copy-on-write semantics, and evicted/swapped under pressure. This turned KV-cache management from a static allocation problem into a dynamic paging problem, unlocking continuous batching at high occupancy — the systems pattern every subsequent serving engine adopted.

## Key Results

- 2-4x throughput versus FasterTransformer and Orca baselines at equal latency, with larger gains on longer sequences and beam search (paper Section 6, 2023)
- KV-cache memory waste reduced from 60-80% to under 4% (near-optimal utilization) (2023)
- Copy-on-write block sharing cut memory for parallel sampling/beam search by up to 55%, translating to up to 2.2x further throughput (2023)

## Methodology

KV cache is divided into fixed-size blocks (e.g. 16 tokens); a per-request block table maps logical to physical blocks, allocated only as generation proceeds. The attention kernel gathers K/V through the block table (fused lookup), sharing physical blocks across sequences with identical prefixes and copying on divergence. Evaluation serves OPT/Llama-class models on production-trace workloads (ShareGPT, Alpaca) against FasterTransformer/Orca, sweeping request rates and measuring normalized latency and throughput.

## Practical Applicability

If you serve open models, you are almost certainly running this: vLLM's scheduling, prefix caching, and memory-utilization knobs are direct expressions of the paged design. Operationally, it explains why max concurrent requests scales with (VRAM − weights)/KV-per-token, why shared system prompts are nearly free, and why long-context requests crowd out batchmates — the block-table model is the correct mental model for capacity planning on any modern engine, not just vLLM.

## Limitations & Critiques

Paging adds indirection: attention kernels must gather through block tables, costing some kernel efficiency versus contiguous layouts (later engines like SGLang's RadixAttention and TensorRT-LLM refined this trade), and block-size choice trades internal fragmentation against lookup overhead. The paper targets single-model, single-GPU-group serving; disaggregated prefill/decode, multi-LoRA, and cross-node KV transfer arrived in follow-up systems. None of this challenges the core result — paged KV management remains unchallenged as the standard.

## Reproductions & Follow-up Work

vLLM became one of the most-adopted open ML systems ever (now a Linux Foundation-hosted project with massive contributor base); every major serving stack adopted paged KV caches (TensorRT-LLM, TGI, SGLang — the latter extending prefix sharing into radix trees). Research successors include disaggregated serving (DistServe, Mooncake) and KV-transfer architectures, all assuming paged caches as the substrate.

## Relation to the Arsenal

Builds on `dao-2022-flashattention` (kernel-level efficiency) and completes the serving-memory story: FlashAttention makes attention computation linear-memory, PagedAttention makes the KV cache waste-free. The direct foundation of the `vllm` project entry and pattern-setter for `sglang` and `tensorrt-llm` (projects/inference-engines/).

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2309.06180)
- [arXiv](https://arxiv.org/abs/2309.06180)
- [Code](https://github.com/vllm-project/vllm)
- [Venue](https://dl.acm.org/doi/10.1145/3600006.3613165)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

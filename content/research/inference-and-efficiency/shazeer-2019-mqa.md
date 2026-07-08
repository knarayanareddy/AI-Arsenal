---
id: shazeer-2019-mqa
title: "Fast Transformer Decoding: One Write-Head is All You Need (Multi-Query Attention)"
phase: inference-and-efficiency
venue: arxiv-preprint
year: 2019
authors:
  - "Shazeer, N."
arxiv_id: "1911.02150"
arxiv_url: "https://arxiv.org/abs/1911.02150"
pdf_url: "https://arxiv.org/pdf/1911.02150"
code_url: null
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: superseded
superseded_by: "ainslie-2023-gqa"
has_code: false
citation_count_approx: 1200

tldr: "Multi-query attention: share one key/value head across all query heads, shrinking the KV cache by the head count and making incremental decoding memory-bandwidth-cheap — the idea GQA later refined and every modern serving stack depends on"
key_contribution: "Identified KV-cache memory bandwidth as the true bottleneck of incremental transformer decoding and fixed it structurally: keys and values get a single shared head while queries keep many, cutting KV-cache size ~h× with minor quality loss"

builds_on:
  - "vaswani-2017-attention"

tags:
  - "inference"
  - "efficiency"
  - "transformers"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

A single-author paper, years ahead of its need: Shazeer observed that autoregressive decoding is bottlenecked not by FLOPs but by repeatedly reloading the growing key/value cache from memory — and that the cache's size scales with the number of attention heads for no strong reason. Multi-query attention (MQA) keeps h query heads but shares a single key head and value head across them, shrinking the KV cache by roughly the head count and turning decoding from memory-bound toward compute-bound. When LLM serving became an industry five years later, this was the paper the industry needed.

## Why it's in the Arsenal

- KV-cache size is the variable behind most serving economics — batch size limits, context-length pricing, PagedAttention's existence — and MQA is where that bottleneck was first diagnosed and structurally attacked
- Reading MQA and its refinement GQA (`ainslie-2023-gqa`) together explains an attention-config line in every modern model card (`num_key_value_heads`) and why it matters for self-hosting throughput

## Core Contribution

A roofline argument plus an architecture change: incremental decoding's arithmetic intensity is dominated by the memory-to-compute ratio of loading K/V tensors of size n·h·d per step; sharing K/V across heads reduces this by h, removing the dominant term. Quality cost is small because query diversity — not key/value diversity — carries most of multi-head attention's expressive power.

## Key Results

- Decoder inference time cut by an order of magnitude in the incremental setting (e.g. 46μs → 3.8μs per token per layer in the paper's TPU benchmark) with only ~0.1–0.15 BLEU/perplexity degradation on WMT14 En-De and language modeling (2019)
- Training cost essentially unchanged — the savings are specific to autoregressive decoding, where the KV cache is re-read every step (2019)
- Beat alternative cache-shrinking strategies (fewer heads, smaller head dims, local attention) at matched quality (2019)

## Methodology

Transformer encoder-decoder experiments on WMT14 translation and a billion-word LM benchmark, comparing multi-head, multi-query, and reduced-dimension baselines on quality and measured TPU decode latency, grounded in an explicit memory-access accounting of the incremental decoding loop.

## Practical Applicability

Directly embedded in the models and engines everyone runs: PaLM and Falcon used MQA; Llama-2-70B onward, Mistral, and most current open models use its generalization GQA; and serving engines' batch-size/context-length limits are set by exactly the KV-cache arithmetic this paper introduced. For practitioners the operational lesson survives verbatim — when sizing self-hosted serving, compute KV-cache bytes per token (layers × kv_heads × head_dim × 2 × dtype) before anything else.

## Limitations & Critiques

Full K/V sharing measurably hurts quality on larger models and harder tasks — the reason `ainslie-2023-gqa` interpolated with grouped heads (8 KV heads recovering nearly all quality at nearly all the savings), which superseded pure MQA as the default. The paper's evaluation was small-scale by modern standards, and uptraining existing multi-head checkpoints to MQA/GQA (rather than training from scratch) was left to follow-up work.

## Reproductions & Follow-up Work

Validated at scale by PaLM and Falcon training runs and by GQA's controlled comparisons; the lineage continues through `ainslie-2023-gqa`, KV-cache quantization/eviction work, `kwon-2023-pagedattention` (managing the cache MQA shrinks), and multi-head-latent attention (DeepSeek-V2/V3) which compresses K/V further via low-rank projection.

## Relation to the Arsenal

Direct ancestor of `ainslie-2023-gqa` and complementary to `kwon-2023-pagedattention` (inference-and-efficiency/) — one shrinks the KV cache, the other manages it; both underlie the serving-throughput guidance in architectures/serving-patterns/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/1911.02150)
- [arXiv](https://arxiv.org/abs/1911.02150)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

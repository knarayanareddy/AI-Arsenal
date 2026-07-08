---
id: gu-2023-mamba
title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces"
phase: architectures
venue: other
year: 2023
authors:
  - "Gu, A."
  - "Dao, T."
arxiv_id: "2312.00752"
arxiv_url: "https://arxiv.org/abs/2312.00752"
pdf_url: "https://arxiv.org/pdf/2312.00752"
code_url: "https://github.com/state-spaces/mamba"
venue_url: "https://openreview.net/forum?id=tEYskw1VY2"

practical_applicability: medium
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 4000

tldr: "Introduced selective state-space models with input-dependent dynamics and a hardware-aware parallel scan, achieving Transformer-quality language modeling with linear-time inference — the strongest attention alternative, now shipping in hybrid production models"
key_contribution: "Made SSM parameters input-dependent (selective), sacrificing convolutional training form but recovering efficiency with a hardware-aware parallel scan — closing the quality gap between state-space models and Transformers on language while keeping O(1) per-token inference state"

builds_on:
  - "vaswani-2017-attention"

tags:
  - "transformers"
  - "efficiency"
  - "attention"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Mamba is a sequence architecture built on structured state-space models (SSMs) whose dynamics are functions of the input — 'selective' SSMs — allowing the model to propagate or forget information content-dependently, which prior linear-time SSMs (S4) could not. At sizes up to 2.8B it matched Transformers of twice its size on language modeling while offering 5x generation throughput and constant per-token state, reviving serious architectural competition to attention.

## Why it's in the Arsenal

- Mamba is the reference point for every 'do we still need full attention?' conversation — hybrid attention/SSM models (Jamba, Zamba, IBM Granite 4.0, Nemotron-H) are now shipping in production, and evaluating them requires understanding what selectivity bought and what it cannot do
- The recurrent O(1)-state inference property is the mechanism behind SSM hybrids' long-context throughput claims, which is directly relevant when choosing models for long-document or streaming workloads

## Core Contribution

Prior SSMs achieved linear time via time-invariant dynamics, computable as convolutions, but failed at language because they could not do content-based selection. Mamba makes the SSM's transition parameters input-dependent, which breaks the convolutional trick; the paper's second contribution is a hardware-aware selective-scan kernel (fusing the recurrence in SRAM, recomputing states in the backward pass) that keeps training efficient anyway. The combination was the first attention-free architecture to match Transformer scaling laws on language modeling.

## Key Results

- Mamba-2.8B matched or exceeded Pythia-6.9B-class Transformers on standard zero-shot language benchmarks (paper Table 3, 2023)
- 5x higher generation throughput than same-size Transformers, with state size constant in sequence length — no KV cache growth (2023)
- Solved synthetic selective-copying and induction-head tasks that time-invariant SSMs (S4) fail, isolating selectivity as the missing capability (paper Section 4.1, 2023)

## Methodology

The S4 recurrence h' = Ah + Bx, y = Ch is discretized with input-dependent B, C, and step size Δ (selectivity); training computes the recurrence with a work-efficient parallel scan fused into a single kernel to avoid materializing the full state sequence in HBM. Evaluations span synthetic memory tasks, language-model scaling laws against Transformer++ baselines, DNA and audio modeling, and downstream zero-shot benchmarks.

## Practical Applicability

Pure-Mamba LLMs did not displace Transformers, but hybrids did reach production: models interleaving Mamba and attention layers (Jamba, Nemotron-H, Granite 4.0-H, Falcon-H) exploit SSM layers for cheap long-context handling while retaining a few attention layers for precise retrieval. When evaluating such models, expect strong throughput/memory wins on long inputs and weaker in-context recall than full-attention peers — that trade is the direct, predictable consequence of the fixed-size state this paper introduced.

## Limitations & Critiques

A fixed-size recurrent state cannot losslessly store an arbitrary-length context, so Mamba-class models underperform attention on tasks needing exact long-range retrieval (needle-in-haystack, long in-context learning) — later benchmarking made this failure mode well documented, and it is why production adoption converged on hybrids rather than pure SSMs. The original paper's evaluations stop at 2.8B, leaving open questions about pure-SSM behavior at frontier scale that remain unresolved because labs moved to hybrids instead. Notably, the paper was rejected from ICLR 2024 despite (or amid) its outsized influence — a well-known peer-review controversy.

## Reproductions & Follow-up Work

Mamba-2 (Dao & Gu, 2024) unified SSMs and attention theoretically (state-space duality) and improved kernels; hybrid architectures shipping Mamba layers include AI21's Jamba, NVIDIA's Nemotron-H, IBM Granite 4.0, and Falcon-H — moving the idea from paper to production. The codebase is open and widely reproduced; a large academic literature on SSM recall limits and hybrid ratios followed.

## Relation to the Arsenal

Positioned against `vaswani-2017-attention` (foundational/) as the strongest linear-time challenger. Its inference property (no KV cache) contrasts directly with the KV-cache-centric optimizations in `kwon-2023-pagedattention` and the serving engines in projects/inference-engines/ — understanding both sides explains most modern long-context serving trade-offs.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2312.00752)
- [arXiv](https://arxiv.org/abs/2312.00752)
- [Code](https://github.com/state-spaces/mamba)
- [Venue](https://openreview.net/forum?id=tEYskw1VY2)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

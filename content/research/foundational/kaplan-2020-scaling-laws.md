---
id: kaplan-2020-scaling-laws
title: "Scaling Laws for Neural Language Models"
phase: foundational
venue: arxiv-preprint
year: 2020
authors:
  - "Kaplan, J."
  - "McCandlish, S."
  - "Henighan, T."
  - "Brown, T. B."
  - "et al. (OpenAI)"
arxiv_id: "2001.08361"
arxiv_url: "https://arxiv.org/abs/2001.08361"
pdf_url: "https://arxiv.org/pdf/2001.08361"
code_url: null
venue_url: null

practical_applicability: high
reproduction_status: partially-reproduced
result_status: challenged
has_code: false
citation_count_approx: 7000

tldr: "Established that language-model loss falls as smooth power laws in parameters, data, and compute across many orders of magnitude — the empirical foundation of the scaling era — though its specific compute-optimal allocation was later corrected by Chinchilla"
key_contribution: "First systematic demonstration that LM cross-entropy loss scales as predictable power laws in N (parameters), D (data), and C (compute), with performance depending weakly on architecture within the transformer family — turning model development into an extrapolation problem and directly motivating GPT-3"

builds_on:
  - "vaswani-2017-attention"

tags:
  - "training"
  - "llm"
  - "foundational"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Before this paper, making language models bigger was a bet; after it, it was a forecast. Kaplan et al. trained transformers spanning several orders of magnitude in size and showed that test loss follows smooth, predictable power laws in parameters, dataset size, and training compute — and that within the transformer family, architectural details (depth vs. width, attention heads) matter far less than scale. It is the empirical document that justified GPT-3 and inaugurated the scaling era.

## Why it's in the Arsenal

- It is the origin of the field's core planning tool: predicting large-model performance from small-model experiments before committing the budget — the methodology every frontier lab still runs, even where this paper's specific coefficients have been corrected
- Understanding both what it established (power-law predictability, scale-over-architecture) and where it was wrong (compute-optimal allocation) is the fastest way to read any modern scaling discussion critically

## Core Contribution

Three findings define the paper: (1) loss scales as a power law in each of N, D, and C individually, with no deviation across ~7 orders of magnitude of compute; (2) performance depends strongly on scale and only weakly on transformer shape, licensing the field's convergence on simple architectures scaled up; (3) at fixed compute, it is better to train very large models and stop before convergence than to train small models to convergence — implying parameters should grow much faster than data (N ∝ C^0.73).

## Key Results

- Test loss follows L(N) ∝ N^-0.076, L(D) ∝ D^-0.095, L(C) ∝ C^-0.050 on WebText2, smooth across all scales tested (2020)
- Transformer shape (depth/width ratio, heads) shifts loss only a few percent at fixed parameter count, versus orders-of-magnitude effects from scale (2020)
- Sample-efficiency of large models: bigger models reach the same loss with fewer tokens, motivating the large-undertrained-model prescription (2020)

## Methodology

A sweep of decoder-only transformers from ~768K to 1.5B parameters trained on WebText2 with varied dataset sizes and compute budgets; power-law fits to the loss frontier across the sweep, plus an analysis of optimal compute allocation derived from the fitted exponents. The critical (and later criticized) design choice: learning-rate schedules were not matched to each token budget, which biased the allocation analysis.

## Practical Applicability

The paper's durable exports are methodological: small-scale sweeps plus power-law extrapolation remain how training runs are planned, and "scale beats architecture tweaks" remains the default prior when evaluating claimed architectural improvements. Its specific allocation prescription should *not* be used — Chinchilla's equal-scaling correction (≈20 tokens/parameter as the compute-optimal reference) replaced it, and production models deliberately overtrain past even that for inference economics.

## Limitations & Critiques

The headline compute-allocation result (N ∝ C^0.73) was overturned by Hoffmann et al. 2022 (Chinchilla), which traced the bias to cosine-schedule lengths not matched to token budgets — GPT-3-era models built on this prescription were substantially undertrained on data. The laws also concern pretraining loss only: they say nothing about downstream capabilities, emergent behaviors, data quality effects, or inference-cost-aware planning, all of which later work had to add.

## Reproductions & Follow-up Work

The power-law form has been re-derived repeatedly across labs, datasets, and modalities (image, video, math) — that part is among the most-replicated results in deep learning. The allocation coefficients were corrected by Chinchilla, extended to data-constrained regimes (Muennighoff et al. 2023), inference-aware scaling, and MoE scaling laws. GPT-3 (`brown-2020-gpt3`) is the paper's direct experimental sequel.

## Relation to the Arsenal

Direct ancestor of `brown-2020-gpt3` (foundational/) and the result corrected by `hoffmann-2022-chinchilla` (foundational/) — the three papers read together are the scaling era's thesis, demonstration, and revision. The scale-over-architecture finding is background for every entry in projects/foundation-models/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2001.08361)
- [arXiv](https://arxiv.org/abs/2001.08361)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

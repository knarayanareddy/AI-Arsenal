---
id: hoffmann-2022-chinchilla
title: "Training Compute-Optimal Large Language Models"
phase: foundational
venue: neurips
year: 2022
authors:
  - "Hoffmann, J."
  - "Borgeaud, S."
  - "Mensch, A."
  - "Buchatskaya, E."
  - "et al. (DeepMind)"
arxiv_id: "2203.15556"
arxiv_url: "https://arxiv.org/abs/2203.15556"
pdf_url: "https://arxiv.org/pdf/2203.15556"
code_url: null
venue_url: null

practical_applicability: high
reproduction_status: partially-reproduced
result_status: foundational
has_code: false
citation_count_approx: 4000

tldr: "The Chinchilla paper: showed contemporary LLMs were dramatically undertrained — compute-optimal training scales parameters and data equally (~20 tokens per parameter), and a 70B model trained on 1.4T tokens beat a 280B model — resetting how the field allocates training compute"
key_contribution: "Corrected Kaplan et al.'s scaling laws with better-controlled experiments (varying LR schedules with token budgets), finding N and D should scale in equal proportion — 'Chinchilla-optimal' ~20 tokens/parameter — and validated it by training Chinchilla-70B to outperform the 4x-larger Gopher-280B at equal compute"

builds_on:
  - "brown-2020-gpt3"

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

DeepMind's Chinchilla paper asked how to split a fixed training-compute budget between model size (N) and training tokens (D) and found the field had it badly wrong: GPT-3-era models followed Kaplan et al. (2020) in growing parameters much faster than data, but properly controlled experiments show loss-optimal scaling grows both equally — roughly 20 tokens per parameter. The proof: Chinchilla (70B, 1.4T tokens) uniformly outperformed Gopher (280B, 300B tokens) at the same training compute, while being 4x cheaper to run at inference.

## Why it's in the Arsenal

- Every model card conversation about 'trained on X trillion tokens' descends from this paper — it is the reference point for reasoning about model size versus data budget, and for understanding why modern models are 'overtrained' past Chinchilla-optimal for inference economics
- It is also the field's best-known example of a wrong-but-dominant prior result (Kaplan scaling) being overturned by fixing an experimental confound — a methodological lesson that transfers

## Core Contribution

Three converging estimation approaches (fixed-model training curves, IsoFLOP profiles, parametric loss fitting) all yield a ≈ b in the optimal allocation N ∝ C^a, D ∝ C^b — overturning Kaplan's a≈0.73 result, whose bias came from fixed cosine-schedule lengths not matched to token budgets. Beyond the specific 20-tokens/parameter heuristic, the paper established the IsoFLOP methodology that subsequent scaling studies (and every frontier lab's internal planning) use.

## Key Results

- Chinchilla-70B outperformed Gopher-280B, GPT-3-175B, and Megatron-Turing-530B across MMLU, reading comprehension, and most evaluated tasks at equal training FLOPs (paper Section 4, 2022)
- Estimated compute-optimal ratio of roughly 20 training tokens per parameter, implying GPT-3-era models were 3-10x undertrained on data (2022)
- 7% absolute MMLU improvement over Gopher (67.5% vs 60%), demonstrating the loss-level finding transferred to downstream capability (2022)

## Methodology

Over 400 models (70M-16B) trained across token budgets; three analyses: (1) minima of training curves per FLOP budget, (2) IsoFLOP curves sweeping model size at fixed compute and fitting parabola minima, (3) a parametric loss function L(N,D) = E + A/N^α + B/D^β fitted to all runs. All three predicted the optimal 70B/1.4T point for Gopher's budget, which was then trained and evaluated as Chinchilla against identically-configured baselines.

## Practical Applicability

Chinchilla governs training-side intuition but modern practice deliberately deviates: production models (Llama 3 8B at ~1,875 tokens/parameter) are trained far past compute-optimality because inference cost, not training cost, dominates lifetime economics — 'over-training small models' is a rational response to deployment, not a rejection of the law. When you evaluate a model family or plan a fine-tune/pretrain budget, tokens-per-parameter relative to the ~20 baseline is the fastest read on where a checkpoint sits on the size/data trade-off.

## Limitations & Critiques

The law optimizes pretraining loss at fixed training FLOPs — it says nothing about inference-inclusive costs (the reason practice diverged), data quality/repetition (later work shows epoching and curation shift the frontier), or post-training capabilities. A 2024 replication (Besiroglu et al.) found the parametric-fit analysis (Approach 3) had estimation errors, though the headline equal-scaling conclusion survives via the other two approaches. Data-constrained regimes (Muennighoff et al. 2023) require modified laws.

## Reproductions & Follow-up Work

Partially reproduced/re-derived: Approach 3's parameter estimates were corrected in a published replication, while IsoFLOP-based confirmations recur across labs (Llama, DeepSeek scaling studies). Follow-ups extend to data-constrained scaling, inference-optimal scaling, and MoE scaling laws; 'Chinchilla-optimal' became standard vocabulary, and the deliberate over-training of small models is now the dominant industry pattern built knowingly on top of this result.

## Relation to the Arsenal

Directly recalibrates the scaling program initiated by `brown-2020-gpt3` (foundational/). Explains the token budgets cited in every entry in projects/foundation-models/ (e.g. `olmo`'s and `kimi-k2`'s multi-trillion-token runs) and the small-model over-training pattern behind current efficient open models.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2203.15556)
- [arXiv](https://arxiv.org/abs/2203.15556)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

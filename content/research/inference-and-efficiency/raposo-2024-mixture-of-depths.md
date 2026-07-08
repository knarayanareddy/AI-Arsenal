---
id: raposo-2024-mixture-of-depths
title: "Mixture-of-Depths: Dynamically Allocating Compute in Transformer-Based Language Models"
phase: inference-and-efficiency
venue: arxiv-preprint
year: 2024
authors:
  - "Raposo, D."
  - "Ritter, S."
  - "Richards, B."
  - "Lillicrap, T."
  - "Santoro, A."
arxiv_id: "2404.02258"
arxiv_url: "https://arxiv.org/abs/2404.02258"
pdf_url: "https://arxiv.org/pdf/2404.02258"
code_url: null
venue_url: null

practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
has_code: false
citation_count_approx: 0

tldr: "Lets a Transformer spend different amounts of compute on different tokens by having a per-layer router send only the top-k tokens through the block and the rest skip via residual -- a compute budget set by capacity, not by every token"
key_contribution: "A method (MoD) where each layer routes a fixed capacity of tokens through its full computation while others bypass via the residual connection, giving a static compute graph with dynamic per-token depth, so the model can match baseline quality using fewer FLOPs per forward pass"

builds_on: []
implemented_in: []

tags:
  - llm
  - efficiency
  - inference
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Mixture-of-Depths (MoD) makes Transformer compute *conditional* on the token. Standard Transformers apply every layer to every token; MoD adds a per-layer router that selects a fixed top-k set of tokens to pass through the block's full computation while the remaining tokens skip it via the residual connection. The total compute is capped by the chosen capacity, and depth becomes token-dependent.

## Why it's in the Arsenal

- It brings the conditional-computation idea behind Mixture-of-Experts to the *depth* dimension: not every token needs every layer's full processing, so compute can be spent where it matters. This is a clean efficiency lever for both training and inference.
- `practical_applicability: medium`: the idea is influential and composable with MoE, but there is no official public code and adoption is still emerging, so treat it as a promising technique to watch rather than a shipped default.

## Core Contribution

Uniform per-token compute wastes FLOPs on easy tokens. MoD's contribution is a *static* compute graph (a fixed capacity per layer, which keeps tensor shapes predictable and hardware-friendly) that nonetheless allocates compute *dynamically* across tokens: a lightweight router ranks tokens and only the top-k enter the block. Because capacity is fixed rather than threshold-based, the FLOP budget is known ahead of time — the engineering property that makes it practical versus naive early-exit schemes.

## Key Results

- Reported matching baseline model quality at a lower FLOP budget per forward pass, or improved quality at equal FLOPs, by tuning per-layer capacity (see the paper for exact tradeoff curves)
- Showed MoD composes with Mixture-of-Experts (a combined "MoDE" variant), stacking depth-wise and width-wise conditional compute

## Methodology

Insert a per-block router that scores tokens and selects a fixed fraction for full processing; non-selected tokens pass through the residual unchanged. Train end-to-end so the router learns which tokens warrant compute. Capacity per layer is a hyperparameter that sets the compute budget.

## Practical Applicability

The applicable intuition for efficiency-minded builders: uniform depth is wasteful, and routing capacity can trade a controllable amount of quality for FLOP savings. In practice you would need a training-time implementation and careful capacity tuning; absent official code, most teams will encounter MoD through frameworks or larger models that adopt it rather than implementing it from scratch.

## Limitations & Critiques

There is no official public code release, so results are not yet independently reproduced at `last_reviewed: 2026-07-08`. Routing adds a component that must be trained well to avoid dropping important tokens, and the quality/FLOP tradeoff is task- and capacity-dependent. It is a research technique, not a turnkey inference optimization you can apply post-hoc to an existing model.

## Reproductions & Follow-up Work

As of review, MoD is not independently reproduced with official code; community reimplementations exist but vary. It belongs to the conditional-computation lineage with Mixture-of-Experts (`fedus-2021-switch-transformer`, `jiang-2024-mixtral`) and early-exit methods, and composes with them.

## Relation to the Arsenal

Read with `fedus-2021-switch-transformer` and `jiang-2024-mixtral` (width-wise conditional compute via MoE) — MoD is the depth-wise analogue. Conceptually adjacent to inference-optimization work like `leviathan-2022-speculative-decoding` in this folder, all aiming to cut FLOPs without quality loss.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2404.02258)
- [arXiv](https://arxiv.org/abs/2404.02258)

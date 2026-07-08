---
id: ethayarajh-2024-kto
title: "KTO: Model Alignment as Prospect Theoretic Optimization"
phase: training-and-alignment
venue: icml
year: 2024
authors:
  - "Ethayarajh, K."
  - "Xu, W."
  - "Muennighoff, N."
  - "Jurafsky, D."
  - "Kiela, D."
arxiv_id: "2402.01306"
arxiv_url: "https://arxiv.org/abs/2402.01306"
pdf_url: "https://arxiv.org/pdf/2402.01306"
code_url: "https://github.com/ContextualAI/HALOs"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 0

tldr: "Aligns models from a single binary 'good/bad' label per example instead of pairwise preferences, using a human-aware loss inspired by prospect theory -- removes the need to collect matched preferred/rejected pairs"
key_contribution: "KTO (Kahneman-Tversky Optimization), an alignment objective that learns from unpaired binary desirable/undesirable labels using a prospect-theory-inspired utility, matching or beating DPO while dropping the requirement for paired preference data that is expensive to collect"

builds_on: []
implemented_in: []

tags:
  - fine-tuning
  - alignment
  - llm
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

KTO (Kahneman-Tversky Optimization) is a model-alignment method that learns from a single binary judgment per output — was this response desirable or undesirable — rather than from pairwise preferences (A is better than B). Its loss draws on prospect theory's model of how humans weigh gains and losses, so it can align a model without matched preferred/rejected pairs.

## Why it's in the Arsenal

- Preference data (matched pairs) is the expensive bottleneck of RLHF/DPO pipelines. KTO changes the data contract to cheap thumbs-up/thumbs-down labels, which most products already collect, making alignment far more practical.
- `practical_applicability: high`: it is implemented in mainstream alignment libraries (TRL/HALOs) and directly usable on the binary-feedback data teams naturally have.

## Core Contribution

DPO and RLHF need paired comparisons, which are costly and often unavailable. KTO's contribution is showing you can align on *unpaired* binary labels by defining a human-aware loss (HALO) grounded in Kahneman-Tversky prospect theory: it models the utility of a desirable vs undesirable completion relative to a reference point, with loss aversion built in. The mechanism means each example needs only a good/bad tag, not a competitor, and the objective still shapes the policy toward desirable outputs.

## Key Results

- Matched or exceeded DPO across a range of model scales while training on unpaired binary feedback (consult the paper for the comparison tables)
- Showed robustness even under imbalanced or noisier desirable/undesirable data, where paired methods are harder to apply

## Methodology

Collect examples each labeled desirable or undesirable (no pairing needed). Optimize the policy against a reference model using the KTO/HALO loss, which rewards desirable completions and penalizes undesirable ones with prospect-theory weighting. As with DPO, no separate reward model or RL loop is required.

## Practical Applicability

KTO is the alignment method to reach for when you have abundant binary feedback (product thumbs up/down, filter pass/fail) but not curated preference pairs — a common real-world situation. It slots into the same tooling as DPO, so switching is low-cost. Watch data balance and label quality, since the signal per example is coarser than a direct comparison.

## Limitations & Critiques

Binary labels carry less information than pairwise preferences, so on tasks where high-quality pairs exist, DPO-style methods can still be competitive or preferable. Results depend on label quality and the desirable/undesirable ratio, and prospect-theory hyperparameters need tuning. As with all offline alignment, it optimizes against a reference policy and can be gamed if the reward proxy (the labels) is misaligned with true quality.

## Reproductions & Follow-up Work

Official code is released (ContextualAI/HALOs) and KTO is integrated into Hugging Face TRL, so it is widely reproduced and used. It sits in the direct-alignment family with `rafailov-2023-dpo`, `hong-2024-orpo`, and `meng-2024-simpo`, each trading off data format and objective.

## Relation to the Arsenal

Read with `rafailov-2023-dpo` (the paired-preference method it relaxes), `ouyang-2022-instructgpt` and `christiano-2017-rlhf` (the RLHF lineage). Relevant to training tools in the projects catalog such as `openrlhf` and `ms-swift` that implement these objectives.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2402.01306)
- [arXiv](https://arxiv.org/abs/2402.01306)
- [Official Code (HALOs)](https://github.com/ContextualAI/HALOs)

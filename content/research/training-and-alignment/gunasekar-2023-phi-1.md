---
id: gunasekar-2023-phi-1
title: "Textbooks Are All You Need"
phase: training-and-alignment
venue: arxiv-preprint
year: 2023
authors:
  - "Gunasekar, S."
  - "Zhang, Y."
  - "Aneja, J."
  - "Cesar, C."
  - "et al. (Microsoft Research)"
arxiv_id: "2306.11644"
arxiv_url: "https://arxiv.org/abs/2306.11644"
pdf_url: "https://arxiv.org/pdf/2306.11644"
code_url: null
venue_url: null

practical_applicability: high
reproduction_status: not-reproduced
result_status: current
has_code: false
citation_count_approx: 1500

tldr: "The phi-1 paper: a 1.3B model trained on 7B tokens of filtered 'textbook-quality' and synthetic data hit 50.6% HumanEval — the flagship argument that data quality can substitute for orders of magnitude of scale, launching the small-language-model program"
key_contribution: "Demonstrated that aggressive quality filtering (LLM-classifier-selected web code) plus GPT-generated synthetic textbooks and exercises lets a 1.3B model rival much larger code models — establishing data curation and synthetic data as first-class alternatives to parameter scaling"

builds_on:
  - "kaplan-2020-scaling-laws"

tags:
  - "training"
  - "data"
  - "code-gen"
  - "llm"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Against the scaling-laws consensus that capability is bought with parameters and tokens, phi-1 made the data-quality counterargument concrete: a 1.3B-parameter model trained on just 7B tokens — web code filtered for "educational value" by an LLM-based classifier, plus GPT-3.5-generated synthetic textbooks and exercises — reached 50.6% pass@1 on HumanEval, competitive with models tens of times larger. The provocation in the title stuck: curation and synthesis, not just scale, moved the frontier of what small models can do.

## Why it's in the Arsenal

- It is the founding document of the small-language-model program (the phi series and its many imitators) and the most-cited evidence in every "quality over quantity" data argument — a debate that now shapes how all pretraining corpora are built
- Its synthetic-data recipe (generate diverse textbook-style content with a stronger model, train a smaller one) became one of the standard tools of modern training pipelines — and the center of an ongoing contamination controversy worth understanding

## Core Contribution

Three data sources engineered for learning value: (1) web code filtered by a GPT-4-seeded quality classifier selecting self-contained, instructive examples from The Stack (~6B tokens); (2) <1B tokens of GPT-3.5-generated synthetic "textbooks" targeting diversity via constrained topic prompting; (3) ~180M tokens of synthetic exercises for fine-tuning. The striking secondary finding: the small exercise fine-tune unlocked capabilities (library use, instruction following) beyond its direct content — "emergence" driven by data alignment, not scale.

## Key Results

- phi-1 (1.3B, 7B unique tokens): 50.6% pass@1 HumanEval / 55.5% MBPP — above much larger contemporary code models at a fraction of training compute (2023)
- Ablations: the same architecture trained on unfiltered data performed dramatically worse — isolating filtering and synthesis, not architecture, as the driver (2023)
- phi-1-small (350M) still reached 45% HumanEval, underlining how far the recipe compresses capability (2023)

## Methodology

Standard decoder-only transformer, deliberately unremarkable — the paper varies only data. Quality classifier: GPT-4 annotates a sample of code for educational value, a random-forest classifier over embeddings scales the judgment to the corpus. Synthetic diversity is forced by conditioning generation on random topic/audience constraints. Contamination is addressed with n-gram overlap checks plus an alternative graded evaluation of unconventional problems.

## Practical Applicability

The recipe generalized well beyond code: classifier-based quality filtering is now standard in open corpus construction (FineWeb-Edu is essentially this idea at web scale), and stronger-model-generates-training-data is ubiquitous in post-training. For practitioners, the transferable lesson is that for a fixed compute budget, data engineering is often the highest-leverage variable — especially when targeting narrow capabilities with small deployable models.

## Limitations & Critiques

The core criticism is evaluation trust: training on GPT-generated data aimed at coding skills invites subtle benchmark alignment that n-gram decontamination cannot detect, and skeptics argued HumanEval numbers overstate general coding ability (later phi releases faced recurring versions of this charge). Neither the datasets nor the training data pipeline were released, so the result is not independently verifiable. Scope is narrow (Python, docstring-style tasks), and the model is fragile to prompt variation relative to larger models.

## Reproductions & Follow-up Work

Not directly reproduced (data unreleased), but the *approach* was validated repeatedly: the phi series (phi-1.5, phi-2, phi-3/4) scaled the recipe with open weights, and independent efforts (FineWeb-Edu's classifier filtering, countless synthetic-textbook datasets) reproduced the quality-filtering effect on public data. The SLM category it launched — capable sub-4B models for edge deployment — is now a standard segment of every model family.

## Relation to the Arsenal

The data-quality counterpoint to `kaplan-2020-scaling-laws` and `hoffmann-2022-chinchilla` (foundational/) — read all three to understand the modern compute/data/quality triangle. Its filtering lineage leads to the `fineweb` dataset entry (community/datasets/); its synthetic-data pattern recurs in `yang-2024-qwen25-math` (training-and-alignment/).

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2306.11644)
- [arXiv](https://arxiv.org/abs/2306.11644)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

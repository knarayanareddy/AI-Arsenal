---
id: chowdhery-2022-palm
title: "PaLM: Scaling Language Modeling with Pathways"
phase: foundational
venue: other
year: 2022
authors:
  - "Chowdhery, A."
  - "Narang, S."
  - "Devlin, J."
  - "Bosma, M."
  - "et al. (Google)"
arxiv_id: "2204.02311"
arxiv_url: "https://arxiv.org/abs/2204.02311"
pdf_url: "https://arxiv.org/pdf/2204.02311"
code_url: null
venue_url: "https://jmlr.org/papers/v24/22-1144.html"

practical_applicability: medium
reproduction_status: not-reproduced
result_status: superseded
superseded_by: "hoffmann-2022-chinchilla"
has_code: false
citation_count_approx: 6000

tldr: "540B dense transformer trained across two TPU pods — the era's peak few-shot results, the canonical documentation of emergent abilities at scale, and the demonstration that chain-of-thought unlocks reasoning at sufficient size"
key_contribution: "The scaling era's high-water-mark systems and science paper: Pathways-orchestrated training at 6144 TPUs with full logging of discontinuous improvements (BIG-bench breakthrough curves), and the PaLM+CoT result on GSM8K that made 'reasoning emerges with scale' the field's operating assumption"

builds_on:
  - "kaplan-2020-scaling-laws"
  - "brown-2020-gpt3"
  - "wei-2022-chain-of-thought"

tags:
  - "llm"
  - "foundational"
  - "training"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

PaLM was the largest dense language model ever documented in detail at its release: 540B parameters, 780B tokens, trained across two TPU-v4 pods with the Pathways system. Beyond the headline few-shot SOTA on 28 of 29 English NLP tasks, its lasting influence is scientific: careful documentation of *discontinuous* capability improvements with scale (the "emergent abilities" evidence base) and the demonstration — with `wei-2022-chain-of-thought` prompting — that a big enough model plus reasoning traces beats task-specific fine-tuned systems on grade-school math.

## Why it's in the Arsenal

- The emergent-abilities narrative that shaped model-release expectations, capability forecasting, and safety debates rests substantially on PaLM's documented breakthrough curves — reading the primary source (and its later critiques) is necessary to use the concept carefully
- As the last maximal *dense* model of the pre-Chinchilla-correction era, it is one endpoint of the design-space triangle (PaLM: huge/undertrained-dense; Chinchilla: compute-optimal; LLaMA: small/overtrained) that frames every subsequent training decision

## Core Contribution

Systems: Pathways-based two-pod data parallelism at 46.2% model FLOPs utilization — the reference point for large-run efficiency reporting. Architecture: dense decoder with SwiGLU, parallel attention+FFN layers (for throughput), multi-query attention, and RoPE — several choices that became open-model standards. Science: scaling from 8B → 62B → 540B with consistent evaluation, exposing which capabilities improve smoothly and which jump discontinuously.

## Key Results

- Few-shot SOTA on 28/29 English NLP benchmarks; outperformed average human raters on 44% of BIG-bench tasks evaluated (2022)
- PaLM-540B + chain-of-thought + self-consistency reached 58% on GSM8K, beating the prior fine-tuned-with-verifiers SOTA — the result that established prompted reasoning at scale (2022)
- Documented discontinuous jumps (e.g. on BIG-bench tasks like logical inference) between 62B and 540B — the core "emergence" evidence, alongside strong multilingual and code ability from modest non-English/code data fractions (2022)

## Methodology

Dense decoder-only transformer trained on a 780B-token multilingual corpus (webpages, books, code, social conversations) with a single pass; evaluation across few-shot NLP suites, BIG-bench, reasoning benchmarks with CoT, code generation, and translation; scaling comparisons across the 8B/62B/540B family plus memorization and bias analyses.

## Practical Applicability

Nothing to deploy — the model was never released — but two exports are used constantly: the MFU (model FLOPs utilization) accounting it popularized is how training efficiency is still quoted, and its architecture bundle validated at 540B (parallel layers, MQA, RoPE, SwiGLU) de-risked those choices for the open models everyone now runs. For capability planning, its scaling-family design (same data/recipe, three sizes) remains the model for how to measure what scale buys.

## Limitations & Critiques

Trained pre-Chinchilla-correction: at 780B tokens, PaLM-540B was severely undertrained by later standards — Chinchilla-style allocation would have bought the same quality far cheaper, which is exactly what PaLM-2 quietly did. The emergent-abilities interpretation was directly challenged (Schaeffer et al. 2023: many "jumps" are artifacts of discontinuous metrics, smoothing away under continuous ones). Closed model, closed data; contamination analysis was partial; and its BIG-bench human-comparison framing aged poorly as evaluation rigor improved.

## Reproductions & Follow-up Work

Never reproduced at scale (cost-prohibitive, closed data), but its architecture choices were validated downstream by the open models that adopted them. Succeeded by PaLM-2 (Chinchilla-informed, smaller and better) and then Gemini; its emergence claims spawned an entire analysis literature (Wei et al. 2022 "Emergent Abilities," Schaeffer et al. 2023 rebuttal) that remains unresolved at the edges.

## Relation to the Arsenal

The maximal-dense-scaling endpoint read against `hoffmann-2022-chinchilla` (compute-optimal) and `touvron-2023-llama` (inference-optimal) in foundational/; its CoT results connect to `wei-2022-chain-of-thought` and `wang-2022-self-consistency` (agents-and-reasoning/), and its MQA-at-scale validation feeds `shazeer-2019-mqa` (inference-and-efficiency/).

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2204.02311)
- [arXiv](https://arxiv.org/abs/2204.02311)
- [JMLR version](https://jmlr.org/papers/v24/22-1144.html)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

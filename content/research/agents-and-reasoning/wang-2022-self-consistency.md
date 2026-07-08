---
id: wang-2022-self-consistency
title: "Self-Consistency Improves Chain of Thought Reasoning in Language Models"
phase: agents-and-reasoning
venue: iclr
year: 2022
authors:
  - "Wang, X."
  - "Wei, J."
  - "Schuurmans, D."
  - "Le, Q."
  - "et al. (Google)"
arxiv_id: "2203.11171"
arxiv_url: "https://arxiv.org/abs/2203.11171"
pdf_url: "https://arxiv.org/pdf/2203.11171"
code_url: null
venue_url: "https://openreview.net/forum?id=1PL1NIMMrw"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: false
citation_count_approx: 5000

tldr: "Sample multiple reasoning chains at nonzero temperature and majority-vote the final answers: correct answers are reached by many diverse paths while errors scatter, yielding large accuracy gains at linear compute cost — the founding result of inference-time scaling"
key_contribution: "Replaced greedy CoT decoding with sample-and-marginalize: draw k diverse chains, take the most frequent answer, exploiting the asymmetry that valid reasoning paths converge while flawed ones diverge — +17.9% absolute on GSM8K over greedy CoT and the conceptual basis of test-time compute scaling"

builds_on:
  - "wei-2022-chain-of-thought"
  - "kojima-2022-zero-shot-cot"

tags:
  - "reasoning"
  - "inference"
  - "llm"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Greedy decoding commits to one reasoning path; this paper observed that hard problems admit many valid paths that all end at the same correct answer, while incorrect paths scatter across different wrong answers. Sampling k chains and majority-voting the final answers therefore filters errors without any verifier, trained model, or prompt change. It was the first clean demonstration that spending more inference compute buys more reasoning accuracy — the idea reasoning models later internalized.

## Why it's in the Arsenal

- It is the simplest inference-time accuracy lever that still works: no training, no reranker, one hyperparameter (k) — and the accuracy/cost trade-off it introduced is now a first-class serving decision
- Its core insight (answer agreement as a proxy for correctness) underlies modern best-of-n, verifier-guided decoding, and the test-time-compute scaling curves quoted for reasoning models

## Core Contribution

Self-consistency decoding: sample k diverse chains (temperature/top-k sampling), extract each final answer, return the plurality answer — marginalizing over latent reasoning paths rather than trusting one. The mechanism is a statistical filter: it requires an extractable, comparable final answer, and its gains grow with problem difficulty and k (saturating around k≈40).

## Key Results

- GSM8K: +17.9% absolute over greedy CoT with PaLM-540B; SVAMP +11.0%, AQuA +12.2%, ARC-challenge +3.9% (2022)
- Gains are monotone in sample count, with most benefit by k≈10–20 and saturation by ~40 — the original inference-scaling curve (2022)
- Works across model families (PaLM, GPT-3, LaMDA) and beats trained verifier-reranking baselines of the time (2022)

## Methodology

Evaluation on arithmetic and commonsense reasoning benchmarks across three model families, ablating sample count, temperature, and aggregation strategy (majority vote vs. weighted by log-prob — unweighted majority proved as good), always on top of fixed few-shot CoT prompts.

## Practical Applicability

Still directly usable wherever answers are programmatically comparable (math, classification, extraction, code with tests as the vote) and worth k× the token cost — common in offline evaluation and high-stakes pipelines. For frontier reasoning models the technique is partially internalized, but best-of-n with answer voting remains a standard baseline and an evaluation upper-bound probe. Not applicable to open-ended generation, where "same answer" is undefined without an equivalence function.

## Limitations & Critiques

Linear cost in k makes it expensive as a default; majority voting needs a well-defined answer space; and agreement is calibrated confidence, not truth — models can be consistently wrong, especially on adversarial or out-of-distribution problems where all paths share the same flawed premise. Later verifier- and search-based methods (process reward models, tree search) beat pure voting at matched compute on hard math.

## Reproductions & Follow-up Work

Reproduced across essentially every open model family; became the standard "CoT + SC@k" reporting convention in reasoning papers. Follow-ups include universal self-consistency (LLM-judged voting for free-form answers), confidence-weighted variants, and the test-time-scaling literature culminating in RL-trained reasoning models (`deepseek-ai-2025-r1`).

## Relation to the Arsenal

Builds directly on `wei-2022-chain-of-thought` and `kojima-2022-zero-shot-cot` (agents-and-reasoning/); the accuracy-vs-inference-cost trade-off it opened is the same axis discussed in tips-and-tricks/cost-and-performance/ and the serving guidance in architectures/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2203.11171)
- [arXiv](https://arxiv.org/abs/2203.11171)
- [OpenReview](https://openreview.net/forum?id=1PL1NIMMrw)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

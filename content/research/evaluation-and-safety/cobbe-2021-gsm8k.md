---
id: cobbe-2021-gsm8k
title: "Training Verifiers to Solve Math Word Problems"
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2021
authors:
  - "Cobbe, K."
  - "Kosaraju, V."
  - "Bavarian, M."
  - "Chen, M."
  - "et al. (OpenAI)"
arxiv_id: "2110.14168"
arxiv_url: "https://arxiv.org/abs/2110.14168"
pdf_url: "https://arxiv.org/pdf/2110.14168"
code_url: "https://github.com/openai/grade-school-math"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 4000

tldr: "The GSM8K paper: released the 8.5K grade-school math benchmark that anchored LLM reasoning evaluation for years, and introduced verifier-guided sampling — train a model to judge candidate solutions, sample many, pick the best — the seed of verification-based test-time compute"
key_contribution: "Two contributions that outlived each other's context: GSM8K, the standard multi-step arithmetic-reasoning benchmark, and the verification paradigm — a trained verifier reranking sampled solutions beat a 30x-larger fine-tuned model, the founding result for solution-level verification and test-time compute scaling"

builds_on:
  - "brown-2020-gpt3"

tags:
  - "evaluation"
  - "reasoning"
  - "benchmark"
  - "training"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

This paper is doubly foundational. As a dataset release, GSM8K — 8,500 linguistically diverse grade-school math word problems with annotated step-by-step solutions — became the reasoning benchmark every model card reported for years. As a method, it introduced verification: instead of trusting one generated solution, train a verifier model to score correctness, sample ~100 candidates, and return the highest-scored one. That verifier-beats-scale result (a 6B model with verification outperforming a fine-tuned 175B) planted the seed of today's test-time-compute and process-reward-model literature.

## Why it's in the Arsenal

- GSM8K anchored the chain-of-thought and reasoning-model era — the headline metric for `wei-2022-chain-of-thought` and hundreds of successors — and reading it explains both what the benchmark measures and why it eventually saturated
- The verification idea matured into the current frontier: process reward models, best-of-N sampling, and reasoning models trading inference compute for accuracy all descend from this paper's core experiment

## Core Contribution

Dataset: 8.5K problems built by crowdworkers under quality controls targeting the "conceptually simple but multi-step" regime where large models still failed, with natural-language solutions (2-8 steps) rather than formulaic templates. Method: generate solutions from a fine-tuned generator, label each by final-answer correctness, train a verifier on these labels, then at test time sample many solutions and select by verifier score — converting extra inference compute into accuracy.

## Key Results

- Verification: 6B GPT-3 with a trained verifier and 100 samples outperformed a fine-tuned 175B model on GSM8K — verification exhibited a ~30x effective model-size gain (2021)
- Verifier scaling: verification benefits grew with data and model scale, while pure fine-tuning showed much flatter returns on this task family (2021)
- The dataset itself proved durably discriminative: GSM8K remained the standard reasoning report-card until frontier models saturated it years later (2021-2024)

## Methodology

Generator fine-tuned on the training solutions; verifier trained as token-level value prediction on correctness-labeled generator samples (token-level supervision beat solution-level — an early hint toward process rewards). Test-time: sample N solutions at temperature, rank by verifier, report top-1. Careful ablations over N, verifier size, and joint vs. separate objectives; contamination controlled by novel crowdsourced problems.

## Practical Applicability

The verification pattern is now everyday engineering: best-of-N with a reward model or judge, self-consistency voting, and PRM-guided search are standard accuracy levers whenever inference budget exceeds one sample — the practical lineage of this experiment. GSM8K itself is saturated at the frontier and no longer discriminative there (and widely contaminated), but remains useful for evaluating small models and fine-tunes; its harder successors inherit its role.

## Limitations & Critiques

Benchmark-side: GSM8K's public presence in web corpora makes contamination a persistent concern — studies with perturbed variants (e.g. GSM-Symbolic) show accuracy drops under trivial rephrasing, questioning how much measured "reasoning" is memorization or surface pattern-matching. Method-side: the verifier judges by final-answer correctness, so it rewards right answers reached by wrong reasoning; process-level supervision (later PRM work) exists precisely to fix this gap.

## Reproductions & Follow-up Work

Dataset and verification results are open and widely reproduced; GSM8K became infrastructure (in every eval harness) and the verification thread grew into process reward models ("Let's Verify Step by Step"), best-of-N/self-consistency practice, and the verifier-guided RL of the reasoning-model era. Harder descendants (MATH, GSM-hard, GSM-Symbolic, competition math) took over the discriminative role as frontier models saturated the original.

## Relation to the Arsenal

The benchmark half anchors `wei-2022-chain-of-thought` (agents-and-reasoning/) and the math-reasoning line through `yang-2024-qwen25-math` and `shao-2024-deepseekmath` (training-and-alignment/); the verification half is the conceptual ancestor of the test-time-compute methods behind `deepseek-ai-2025-r1`. Complements `hendrycks-2020-mmlu` (evaluation-and-safety/) as the reasoning-vs-knowledge pair of era-defining benchmarks.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2110.14168)
- [arXiv](https://arxiv.org/abs/2110.14168)
- [Dataset + code (openai/grade-school-math)](https://github.com/openai/grade-school-math)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

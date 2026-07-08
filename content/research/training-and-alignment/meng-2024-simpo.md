---
id: meng-2024-simpo
title: "SimPO: Simple Preference Optimization with a Reference-Free Reward"
phase: training-and-alignment
venue: neurips
year: 2024
authors:
  - "Meng, Y."
  - "Xia, M."
  - "Chen, D."
arxiv_id: "2405.14734"
arxiv_url: "https://arxiv.org/abs/2405.14734"
pdf_url: "https://arxiv.org/pdf/2405.14734"
code_url: "https://github.com/princeton-nlp/SimPO"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 800

tldr: "A preference-optimization objective that drops DPO's reference model, using the average log-probability of a response as an implicit reward plus a target margin — simpler, cheaper (no reference forward pass), and often stronger than DPO."
key_contribution: "Showed you can align to preferences without a reference model by using length-normalized average log-likelihood as the implicit reward and adding a target reward margin, aligning the training objective with the generation metric — matching or beating DPO while halving memory/compute per step."

builds_on:
  - "rafailov-2023-dpo"
implemented_in:
  - "trl"
  - "llamafactory"

tags:
  - "alignment"
  - "fine-tuning"
  - "llm"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

SimPO is a preference-optimization method for aligning LLMs that removes the reference model DPO requires. Its reward is the length-normalized average log-probability the policy assigns to a response, and its loss adds a target margin that the preferred response must exceed the rejected one by. Because there is no reference model, SimPO needs one fewer forward pass and less memory per step, while the length-normalized reward better matches how sequences are actually scored at generation time.

## Why it's in the Arsenal

- SimPO is a leading DPO alternative that is cheaper to run (no reference model to load or forward) — a real operational win when aligning large models under memory pressure
- It exposes a subtle but important idea: mismatch between the training reward (DPO's implicit reward includes a reference term) and the generation objective (average token log-prob) can hurt, and fixing it improves results

## Core Contribution

Two changes to the DPO recipe: (1) replace the reference-model-relative implicit reward with the policy's own length-normalized average log-likelihood, eliminating the reference model entirely; and (2) introduce a target reward margin γ so the objective demands a minimum preference gap rather than just any positive gap. The length normalization also mitigates DPO's tendency to exploit response length.

## Key Results

- Matched or outperformed DPO across Mistral and Llama base models on AlpacaEval 2 and Arena-Hard, with the strongest configuration reaching a top length-controlled win rate among comparable methods (paper, 2024)
- Removed the reference model, cutting per-step memory and compute versus DPO (2024)

## Methodology

Given preference pairs (preferred, rejected), SimPO computes each response's average per-token log-probability under the policy, scales by a factor β, and optimizes a logistic loss requiring the preferred response's reward to exceed the rejected one's by at least a margin γ. There is no KL-to-reference term and no reference forward pass. Hyperparameters β and γ are the main knobs; the paper ablates both extensively.

## Practical Applicability

If you already run DPO via TRL or LLaMA-Factory, SimPO is a near drop-in that can lower your memory footprint (no reference model) and often improves win rates — worth A/B testing whenever you do preference tuning. Its length-normalized reward specifically helps if your DPO runs are producing bloated, length-gaming outputs. Tune γ carefully: too large destabilizes training, too small collapses toward plain likelihood.

## Limitations & Critiques

- Sensitive to the β/γ hyperparameters; reported gains depend on tuning, and poor settings can underperform DPO
- Reference-free training removes the KL anchor that constrains drift from the base model, which can matter when you want to stay close to a trusted checkpoint
- Comparisons are on standard preference benchmarks (AlpacaEval 2, Arena-Hard) that are LLM-judge based and can reward stylistic traits; real-world superiority over DPO is workload-dependent

## Reproductions & Follow-up Work

Reproduced via princeton-nlp/SimPO with released models and configs, and available in the TRL and LLaMA-Factory training libraries. Sits in the crowded post-DPO family alongside KTO, ORPO (`hong-2024-orpo`), and IPO, all exploring reference-free or margin-based preference objectives.

## Relation to the Arsenal

Training-and-alignment paper; a direct successor to `rafailov-2023-dpo` and a sibling of `hong-2024-orpo`, implemented in the `trl` and `llamafactory` project entries.

## Resources

- [SimPO paper](https://arxiv.org/abs/2405.14734)
- [princeton-nlp/SimPO](https://github.com/princeton-nlp/SimPO)

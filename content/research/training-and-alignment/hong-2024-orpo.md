---
id: hong-2024-orpo
title: "ORPO: Monolithic Preference Optimization without Reference Model"
phase: training-and-alignment
venue: emnlp
year: 2024
authors:
  - "Hong, J."
  - "Lee, N."
  - "Thorne, J."
arxiv_id: "2403.07691"
arxiv_url: "https://arxiv.org/abs/2403.07691"
pdf_url: "https://arxiv.org/pdf/2403.07691"
code_url: "https://github.com/xfactlab/orpo"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 700

tldr: "Folds preference alignment into supervised fine-tuning in a single stage by adding an odds-ratio penalty to the SFT loss — no separate reference model and no separate DPO/RLHF phase, cutting alignment to one training run."
key_contribution: "Showed that a small odds-ratio-based penalty appended to the standard SFT cross-entropy loss suffices to align a base model to preferences in one monolithic stage — removing both the reference model and the separate preference-optimization phase that SFT-then-DPO/RLHF pipelines require."

builds_on:
  - "rafailov-2023-dpo"
  - "ouyang-2022-instructgpt"
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

ORPO (Odds Ratio Preference Optimization) collapses the usual two-stage alignment pipeline — supervised fine-tuning, then a separate preference phase (DPO or RLHF) — into a single objective. It augments the standard SFT next-token loss with a term based on the log odds ratio between the preferred and rejected responses, so a base model is simultaneously taught to follow instructions and to prefer good responses. There is no reference model and no second training run.

## Why it's in the Arsenal

- ORPO is the operationally simplest alignment recipe in wide use: one stage, one loss, no reference model — attractive when compute, pipeline complexity, or iteration speed matter
- It reframes preference tuning as a regularizer on SFT rather than a downstream phase, which is a genuinely different and instructive way to think about alignment

## Core Contribution

The odds-ratio preference term. Standard SFT maximizes the likelihood of chosen responses but does nothing to suppress plausible bad ones; ORPO adds a penalty proportional to the log odds ratio of generating the preferred vs. the rejected response, weighted by a single coefficient λ. Minimizing SFT loss and this penalty jointly aligns the model in one pass, and the paper shows the odds-ratio (vs. probability-ratio) formulation avoids over-penalizing and keeps training stable.

## Key Results

- Applied to Llama-2 and Mistral base models, ORPO-tuned models reached competitive AlpacaEval 2 length-controlled win rates against SFT+DPO pipelines using a single training stage (paper, 2024)
- Achieved these results without a reference model or a separate preference phase, reducing the alignment pipeline to one run (2024)

## Methodology

Training uses instruction data with (chosen, rejected) response pairs. The loss is the sum of the usual SFT cross-entropy on the chosen response and λ times a log-sigmoid of the log odds ratio between chosen and rejected sequence likelihoods. A single hyperparameter λ balances instruction-following against preference discrimination. Evaluation is on AlpacaEval 2, MT-Bench, and related instruction-following benchmarks.

## Practical Applicability

ORPO is directly useful when you want aligned behavior straight from a base model without standing up a two-phase pipeline: it is supported in TRL and LLaMA-Factory, so you can swap it for SFT+DPO and often match quality with less orchestration and memory (no reference model). It is especially attractive for rapid iteration and for smaller teams. Tune λ carefully — too high harms fluency, too low leaves the model under-aligned.

## Limitations & Critiques

- Requires paired preference data during SFT, so you cannot reuse a plain instruction dataset without preference labels
- Single-stage coupling means you cannot independently iterate on SFT and alignment; a regression in one is entangled with the other
- Benchmark parity with SFT+DPO is configuration- and data-dependent, and evaluations lean on LLM-judge metrics that reward style; it is one strong option among ORPO/DPO/SimPO/KTO rather than a universal winner

## Reproductions & Follow-up Work

Reproduced via xfactlab/orpo with released code and models, and integrated into the TRL and LLaMA-Factory libraries. Part of the reference-free preference-optimization wave alongside `meng-2024-simpo` and KTO, all descending from `rafailov-2023-dpo`.

## Relation to the Arsenal

Training-and-alignment paper; a sibling of `meng-2024-simpo` and successor to `rafailov-2023-dpo`, implemented in the `trl` and `llamafactory` project entries.

## Resources

- [ORPO paper](https://arxiv.org/abs/2403.07691)
- [xfactlab/orpo](https://github.com/xfactlab/orpo)

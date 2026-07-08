---
id: wei-2021-flan
title: "Finetuned Language Models Are Zero-Shot Learners"
phase: training-and-alignment
venue: iclr
year: 2021
authors:
  - "Wei, J."
  - "Bosma, M."
  - "Zhao, V."
  - "Guu, K."
  - "et al. (Google)"
arxiv_id: "2109.01652"
arxiv_url: "https://arxiv.org/abs/2109.01652"
pdf_url: "https://arxiv.org/pdf/2109.01652"
code_url: "https://github.com/google-research/flan"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: true
citation_count_approx: 5000

tldr: "The FLAN paper: fine-tuning a 137B model on 60+ NLP tasks phrased as natural-language instructions makes it follow instructions on unseen tasks — the founding demonstration of instruction tuning, the step every modern usable LLM undergoes"
key_contribution: "Established instruction tuning as a technique: multi-task fine-tuning on instruction-phrased datasets teaches the general skill of following instructions, improving zero-shot performance on held-out task types — with the crucial caveat that the benefit emerges only at sufficient model scale"

builds_on:
  - "brown-2020-gpt3"
  - "raffel-2019-t5"

tags:
  - "training"
  - "llm"
  - "alignment"
  - "foundational"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

GPT-3 showed raw LMs could do tasks from prompts, but coaxing them required careful few-shot scaffolding. FLAN asked: what if you fine-tune the model on a broad mixture of existing NLP datasets, each rephrased as natural-language instructions? The result was a model that *follows instructions as a skill* — outperforming zero-shot GPT-3 on the majority of unseen tasks — establishing instruction tuning as the standard bridge between pretrained models and usable assistants.

## Why it's in the Arsenal

- Instruction tuning is the universal first stage of post-training: every chat model you have used passed through a descendant of this recipe before any preference optimization — FLAN is where that pipeline stage was named and validated
- Its scale-dependence finding (instruction tuning *hurts* small models and helps large ones) is an early, clean example of scale-emergent training behavior that practitioners still encounter when fine-tuning small models

## Core Contribution

The method: take 62 NLP datasets across 12 task clusters, write ~10 natural-language instruction templates per dataset, fine-tune LaMDA-PT 137B on the mixture, and evaluate zero-shot on entire held-out task *clusters* (never just held-out examples) — isolating whether the model learned tasks or learned *instruction-following*. The cluster-holdout design is the paper's methodological signature and the reason its claim is credible.

## Key Results

- FLAN outperformed zero-shot GPT-3 175B on 20 of 25 evaluated held-out datasets, and beat few-shot GPT-3 on several (2021)
- Ablations: more task clusters in training monotonically improved held-out performance — diversity of instructions, not volume per task, drives the effect (2021)
- Scale threshold: below ~8B parameters, instruction tuning *degraded* held-out performance; the benefit emerged only for models large enough to absorb the mixture without capacity crowding (2021)

## Methodology

Instruction-template transformation of existing supervised datasets (avoiding new data collection), mixture-balanced fine-tuning with examples-proportional sampling caps, and leave-one-cluster-out evaluation: to test on NLI, all NLI datasets are excluded from training. Comparisons against the base model and GPT-3 under matched zero/few-shot prompting.

## Practical Applicability

The recipe's direct descendants are standard tooling: Flan-T5 checkpoints (from the scaled follow-up) remain widely used efficient baselines, and every open post-training stack begins with supervised instruction tuning on exactly this pattern. The practical lessons persist verbatim — template diversity matters more than per-task volume, and small models need gentler mixtures — both routinely rediscovered by teams fine-tuning today.

## Limitations & Critiques

FLAN's instructions were academic NLP tasks rephrased, not real user requests — the gap between "follows benchmark instructions" and "helpful assistant" was later closed by human-written prompts and preference data (InstructGPT), which supersedes FLAN in the direct lineage to chat models. Evaluation was classification-heavy (scoring options rather than free generation) and the 137B base model was never released, limiting direct reproduction to the follow-up's open checkpoints.

## Reproductions & Follow-up Work

The finding was independently confirmed by concurrent work (T0's multitask prompted training) and reproduced at scale in Flan 2022 ("Scaling Instruction-Finetuned Language Models" — 1,800+ tasks, chain-of-thought mixtures, public Flan-T5 checkpoints), which remains among the most-downloaded open instruction-tuned families. Instruction-tuned-then-preference-tuned became the canonical post-training pipeline via InstructGPT and successors.

## Relation to the Arsenal

The first stage of the pipeline completed by `ouyang-2022-instructgpt` (training-and-alignment/) — FLAN teaches instruction-following, InstructGPT adds human preferences on top. Builds directly on the multitask framing of `raffel-2019-t5` (foundational/) and the zero-shot claims of `brown-2020-gpt3` (foundational/).

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2109.01652)
- [arXiv](https://arxiv.org/abs/2109.01652)
- [Code (google-research/flan)](https://github.com/google-research/flan)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

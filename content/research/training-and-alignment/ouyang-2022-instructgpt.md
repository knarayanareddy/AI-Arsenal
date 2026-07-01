---
id: ouyang-2022-instructgpt
title: "Training Language Models to Follow Instructions with Human Feedback"
phase: training-and-alignment
venue: neurips
year: 2022
authors:
  - "Ouyang, L."
  - "Wu, J."
  - "Jiang, X."
  - "Almeida, D."
  - "et al."
arxiv_id: "2203.02155"
arxiv_url: "https://arxiv.org/abs/2203.02155"
pdf_url: "https://arxiv.org/pdf/2203.02155"
code_url: "https://github.com/openai/following-instructions-human-feedback"
venue_url: "https://papers.nips.cc/paper_files/paper/2022/hash/b1efde53be364a73914f58805a001731-Abstract-Conference.html"

practical_applicability: medium
reproduction_status: reproduced
result_status: challenged
has_code: true
citation_count_approx: 12000

tldr: "Established the 3-stage RLHF recipe (SFT, reward modeling, PPO) that turned GPT-3 into an assistant -- know this pipeline shape, though most teams now reach for simpler DPO instead of implementing PPO-based RLHF directly"
key_contribution: "Showed that a 1.3B-parameter model fine-tuned with human-feedback-based RLHF was preferred by human raters over the 175B-parameter base GPT-3 model, establishing that alignment technique -- not just scale -- drives usability"

builds_on:
  - brown-2020-gpt3
implemented_in: []

tags:
  - alignment
  - rlhf
  - training
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper established the 3-stage RLHF recipe — supervised fine-tuning on demonstration data, training a reward model on human preference comparisons, then optimizing the policy against that reward model with PPO — that turned raw GPT-3 into InstructGPT, an assistant humans strongly preferred despite it being over 100x smaller. Note: the specific PPO-based RL stage this paper popularized has been directly challenged in practice — Direct Preference Optimization (`rafailov-2023-dpo`, this same phase folder) showed the same alignment outcome can be achieved with a much simpler, more stable classification-style loss that eliminates the need for a separate reward model and the instabilities of online RL, and DPO or a DPO-family method (KTO, ORPO) is now what most teams reach for instead of implementing this paper's PPO pipeline directly.

## Why it's in the Arsenal

- This paper is why "pretrain, then align with human feedback" became the standard shape for producing a usable assistant model, and its 3-stage structure (SFT, reward modeling, RL) is still the conceptual framework most alignment discussions use even when the specific optimization algorithm (PPO) has been replaced.
- `practical_applicability: medium` (not `high`) is an honest classification: while understanding this pipeline shape is valuable context, most engineers today do not implement PPO-based RLHF directly — they either use an already-aligned model, or reach for DPO (see `rafailov-2023-dpo`) which achieves the same result with dramatically less implementation complexity.

## Core Contribution

Prior work had explored using human feedback for language model fine-tuning, but this paper's specific contribution was demonstrating the full pipeline at meaningful scale and showing a striking result: human raters preferred outputs from a 1.3B-parameter InstructGPT model over the 175B-parameter base GPT-3 model, despite the aligned model being over 100 times smaller. In engineering terms: this established that alignment technique, not just parameter count, is what determines whether a model is actually useful and preferred by humans for real interaction — a lesson foundational to why every production-facing LLM today goes through an alignment stage rather than being deployed as a raw pretrained base model.

## Key Results

- Human raters preferred InstructGPT 1.3B outputs over GPT-3 175B base-model outputs in the majority of comparisons (2022) — the paper's central and most-cited empirical claim, demonstrating alignment technique outweighs raw scale for usability
- InstructGPT showed improvements in truthfulness and reductions in toxic output generation relative to GPT-3, measured on the paper's own evaluation suite (2022) — these specific numbers are dated relative to current alignment/safety evaluation standards (see `evaluation-and-safety/` phase entries for current approaches) and should not be cited as current safety benchmarks
- The PPO-based RL stage provided measurable additional improvement over supervised fine-tuning alone on human preference ratings (2022) — this is the specific finding most directly reduced in practical importance by DPO's demonstration that a simpler method can match or exceed PPO-based RLHF's alignment quality without the RL stage's implementation complexity

## Methodology

The paper's pipeline has three stages (paper Section 3): first, supervised fine-tuning (SFT) on a dataset of human-written demonstrations of desired model behavior; second, training a reward model by having human labelers rank multiple model outputs for the same prompt, then fitting a model to predict those preference rankings; third, using that reward model as the optimization signal for reinforcement learning via Proximal Policy Optimization (PPO), fine-tuning the SFT model to maximize predicted reward while a KL-divergence penalty prevents it from drifting too far from the SFT model's distribution (avoiding reward-hacking degenerate outputs). This three-stage structure — SFT, reward modeling, RL against the reward model — became the reference architecture nearly every subsequent alignment paper is described relative to, including papers (like DPO) whose specific contribution is showing you can skip the explicit reward-model-plus-RL machinery entirely.

## Practical Applicability

If you are trying to understand why a raw pretrained language model behaves so differently from a deployed assistant product, this paper's 3-stage pipeline is the conceptual answer, and understanding it is a prerequisite for evaluating or discussing any current alignment technique, even ones (like DPO) that replace its specific RL mechanism. If you are actually implementing an alignment pipeline today, this paper is not the recipe to follow directly — reach for `rafailov-2023-dpo` instead, which achieves comparable or better results with a stable, single-stage classification loss instead of the reward-model-training-plus-PPO machinery this paper requires, avoiding PPO's well-documented instability and hyperparameter sensitivity.

## Limitations & Critiques

The most consequential post-publication development is architectural rather than a failed replication: Direct Preference Optimization (Rafailov et al., 2023) showed the RLHF objective this paper optimizes with PPO can be solved directly with a simple classification loss on preference pairs, without training a separate reward model or running unstable online RL — DPO's paper explicitly frames PPO-based RLHF as "complex and often unstable," a direct critique of this paper's specific optimization approach (not its overall goal). The paper's own evaluation is also necessarily specific to OpenAI's proprietary GPT-3 base model and internal labeling process, meaning the specific quantitative preference-rate improvements are not independently reproducible with the exact same setup, though the qualitative finding (RLHF-aligned smaller models are preferred over larger unaligned ones) has been reproduced by essentially every subsequent aligned-model release. No known failed-replication challenge exists to the paper's central qualitative claim as of `last_reviewed: 2026-07-01` — the critique that has emerged targets its optimization method's complexity and stability, not whether alignment via human feedback works.

## Reproductions & Follow-up Work

The qualitative finding that RLHF-style alignment produces strongly preferred outputs relative to an unaligned base model of the same or larger size has been reproduced by nearly every major LLM lab's alignment pipeline since (Anthropic's Claude via Constitutional AI, see `bai-2022-constitutional-ai`; Meta's Llama post-training, see `dubey-2024-llama3`), even where the specific optimization method differs from this paper's PPO approach. `rafailov-2023-dpo` is the most significant direct follow-up and critique, replacing this paper's reward-model-plus-PPO machinery with a simpler direct optimization approach while targeting the same underlying alignment objective.

## Relation to the Arsenal

This paper builds on `brown-2020-gpt3` (foundational/), applying RLHF-based alignment to that paper's base GPT-3 model. `rafailov-2023-dpo` (this phase folder) directly supersedes this paper's specific PPO-based optimization stage while preserving the same overall SFT-then-alignment pipeline shape — read them together to see both the original 3-stage recipe and its modern simplification. `bai-2022-constitutional-ai` (this phase folder) documents a different alignment approach (AI-feedback-driven rather than exclusively human-feedback-driven) worth reading as a contrasting design point. `dubey-2024-llama3` (foundational/) uses this paper's general alignment framing (via DPO specifically) in its own multi-stage post-training pipeline.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2203.02155)
- [arXiv](https://arxiv.org/abs/2203.02155)
- [Official Code](https://github.com/openai/following-instructions-human-feedback)
- [Venue Proceedings](https://papers.nips.cc/paper_files/paper/2022/hash/b1efde53be364a73914f58805a001731-Abstract-Conference.html)
- [Papers With Code](https://paperswithcode.com/paper/training-language-models-to-follow)
- [Key Reproduction / Analysis](https://decodethefuture.org/en/rlhf-explained/) — 2026 explainer tracing why the field moved from this paper's PPO-based approach toward DPO and DPO-family alternatives as the default alignment technique

---
id: deepseek-ai-2025-r1
title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning"
phase: training-and-alignment
venue: arxiv-preprint
year: 2025
authors:
  - "DeepSeek-AI"
arxiv_id: "2501.12948"
arxiv_url: "https://arxiv.org/abs/2501.12948"
pdf_url: "https://arxiv.org/pdf/2501.12948"
code_url: "https://github.com/deepseek-ai/DeepSeek-R1"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 3000

tldr: "Showed RL with automated, verifiable rewards (not human labels) can train strong reasoning directly, then distills into smaller dense models -- consider RL-from-verifiable-rewards for reasoning-heavy domains, not just human-feedback alignment"
key_contribution: "Demonstrated that reasoning capability can be incentivized through large-scale reinforcement learning using automated, verifiable rewards (correct/incorrect answers, not human preference judgments), without a supervised fine-tuning cold-start, and that this capability distills effectively into smaller dense models"

builds_on: []
implemented_in: []
corresponding_project_entry: deepseek-v3-r1

tags:
  - training
  - reasoning
  - rlhf
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper showed that large-scale reinforcement learning using automated, verifiable rewards — correct or incorrect answers on math and coding tasks, not human preference labels — can directly incentivize strong reasoning behavior in a language model, and that this capability distills effectively into much smaller dense models. This remains current, active practice: RL-from-verifiable-rewards is now a standard technique for training reasoning-focused models, independently reproduced by Hugging Face's Open-R1 project and reflected in this catalog's own `deepseek-v3-r1` project entry's evidence of real production adoption.

## Why it's in the Arsenal

- This paper is the most direct, well-documented demonstration that automated, verifiable rewards (not human preference judgments) can train genuine reasoning capability at scale — a training-signal source fundamentally different from the human-labeled preference data that `ouyang-2022-instructgpt` and `rafailov-2023-dpo` depend on, relevant whenever your domain has automatically checkable correctness (math, code, logic) rather than subjective preference.
- `practical_applicability: high` reflects that this is not a narrow academic curiosity: the specific recipe (RL on verifiable rewards, optionally with a small SFT cold-start, then distillation into smaller models) is now a template multiple labs and open efforts have successfully reproduced and built on.

## Core Contribution

Prior reasoning-improvement techniques for LLMs either relied on human preference labels (RLHF-style) or explicit chain-of-thought prompting without additional training (see `wei-2022-chain-of-thought`). This paper's contribution is DeepSeek-R1-Zero, showing that pure large-scale RL — using only automated, rule-based rewards for whether a final answer is correct, with no supervised fine-tuning cold-start and no human preference labels — is sufficient to incentivize a base model to develop strong reasoning behaviors, including self-verification and reflection patterns the paper terms an "aha moment." The full DeepSeek-R1 model adds a small amount of cold-start supervised data before the same RL process to improve readability and stability, then the paper further shows this reasoning capability can be distilled into much smaller dense models (1.5B to 70B parameters) that inherit substantial reasoning ability from the much larger RL-trained teacher, without those smaller models needing to undergo the RL process themselves.

## Key Results

- DeepSeek-R1-Distill-Qwen-32B reached 72.6% pass@1 on AIME 2024 and 94.3% pass@1 on MATH-500 (2025), scores that substantially exceed the non-reasoning baseline models compared in the same paper table, evidence that distillation preserves a large fraction of the RL-trained teacher's reasoning capability in a much smaller model
- DeepSeek-R1-Distill-Llama-70B reached 70.0% pass@1 on AIME 2024, 94.5% pass@1 on MATH-500, and a CodeForces rating of 1633 (2025), positioning it competitively against substantially larger or more specialized contemporary reasoning models on the paper's own benchmark table
- These AIME/MATH-500/CodeForces/GPQA numbers are current as 2025-era reasoning-model benchmarks but should be checked against newer leaderboards before being cited as current state-of-the-art, since the reasoning-model space has continued to advance rapidly through 2026

## Methodology

DeepSeek-R1-Zero is trained with large-scale reinforcement learning directly on a base model, using rule-based rewards that check whether a final answer is correct (for math) or passes test cases (for code) — a reward signal that requires no human labeling or learned reward model, and is therefore much harder to "hack" than a learned reward model's approximation of human preference (paper Section 2.2). The full DeepSeek-R1 adds a small cold-start supervised fine-tuning stage using a limited set of high-quality chain-of-thought examples before applying the same RL process, specifically to address DeepSeek-R1-Zero's readability issues (language mixing, poorly formatted reasoning traces) without sacrificing the core RL-driven reasoning gains (paper Section 2.3). After training, rejection sampling and additional supervised fine-tuning further refine the model for general-purpose use beyond pure reasoning tasks (paper Section 2.3.3). Distillation into smaller dense models (Qwen and Llama base models ranging 1.5B–70B) is done via straightforward supervised fine-tuning on reasoning traces generated by the full RL-trained DeepSeek-R1, not by re-running RL on the smaller models themselves — the paper explicitly frames this as showing the smaller models benefit more from distilling an already-strong reasoner than from being RL-trained directly at their own scale (paper Section 4.1's ablation).

## Practical Applicability

If you are training or fine-tuning a model for a domain with automatically verifiable correctness — math, code, logic puzzles, anything with a checkable right answer — this paper's core method (RL directly on verifiable rewards, optionally with a small SFT cold-start) is a validated template that avoids the cost and potential reward-hacking risk of training a learned reward model from human preferences. If you need a smaller, cheaper model with strong reasoning ability, this paper's distillation results are the direct evidence that distilling from a larger RL-trained reasoning model into a smaller dense model is often more effective and much cheaper than attempting to RL-train the smaller model from scratch — a concrete, actionable choice this paper's own ablation directly supports.

## Limitations & Critiques

DeepSeek-R1-Zero's raw RL-only training produces known readability problems (language mixing between English and Chinese within a single reasoning trace, poorly structured output) that the paper itself acknowledges and addresses only in the full DeepSeek-R1 via the cold-start SFT stage — meaning the "pure RL, no human data" version of the result is not the one most practitioners should actually deploy, a nuance easy to miss if only the headline claim is read. Verifiable-reward RL is, by construction, limited to domains where correctness can be automatically checked; the paper's own scope (math, code, logic-style reasoning) does not directly establish that the same technique transfers to open-ended, subjective, or non-verifiable tasks, and the paper does not claim otherwise. No independent, credible failed-replication challenge to the paper's core empirical claims has been identified as of `last_reviewed: 2026-07-01` — quite the opposite, independent reproductions (see below) have broadly validated the approach.

## Reproductions & Follow-up Work

Hugging Face's Open-R1 project is a well-documented, fully open, independent reproduction effort explicitly aimed at replicating DeepSeek-R1's training pipeline and evaluation results, including published methodology for reproducing the paper's own AIME/MATH-500/GPQA/LiveCodeBench evaluation numbers — a substantial, credible third-party validation effort beyond DeepSeek's own released weights and code. The paper itself was significantly expanded between its initial release and a later 2026 revision (growing from roughly 22 to 86+ pages) adding much more granular methodology detail, an extended analysis of the "aha moment" self-verification behavior, and a fuller account of failed approaches (process reward models and Monte Carlo tree search, both reported as underperforming relative to the simpler RL approach that was ultimately used) — itself a notable instance of a paper's authors substantially improving reproducibility documentation post-publication in response to community interest.

## Relation to the Arsenal

This paper's `corresponding_project_entry`, `deepseek-v3-r1` (in `content/projects/foundation-models/`), documents the released model family's ongoing ecosystem position and production-adoption evidence (per that entry's own evidence sourced from InformationWeek) — this research entry focuses on the paper's specific RL-from-verifiable-rewards training methodology and its currency, while the project entry tracks the model's real-world deployment status; the two intentionally do not duplicate each other's content. `bai-2022-constitutional-ai` (this phase folder) is a useful contrasting case: both papers reduce dependence on human-labeled training signal, but via different mechanisms (AI self-judgment there, automated verifiable correctness checking here). `wei-2022-chain-of-thought` (agents-and-reasoning/) documents the earlier, purely-prompted approach to eliciting reasoning that this paper's RL-trained models internalize more robustly through training rather than through prompting alone.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2501.12948)
- [arXiv](https://arxiv.org/abs/2501.12948)
- [Official Code](https://github.com/deepseek-ai/DeepSeek-R1)
- [Papers With Code](https://paperswithcode.com/paper/deepseek-r1-incentivizing-reasoning)
- [Key Reproduction / Analysis](https://github.com/huggingface/open-r1) — Hugging Face's fully open, independent reproduction effort, including published methodology for replicating the paper's own benchmark evaluation numbers

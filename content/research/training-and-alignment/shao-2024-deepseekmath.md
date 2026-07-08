---
id: shao-2024-deepseekmath
title: "DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models"
phase: training-and-alignment
venue: arxiv-preprint
year: 2024
authors:
  - "Shao, Z."
  - "Wang, P."
  - "Zhu, Q."
  - "Xu, R."
  - "et al. (DeepSeek-AI)"
arxiv_id: "2402.03300"
arxiv_url: "https://arxiv.org/abs/2402.03300"
pdf_url: "https://arxiv.org/pdf/2402.03300"
code_url: "https://github.com/deepseek-ai/DeepSeek-Math"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 2500

tldr: "Introduced GRPO: group-relative policy optimization drops PPO's value network by baselining rewards against groups of sampled outputs — the algorithm behind DeepSeek-R1 and the reasoning-RL wave — plus a 120B-token math corpus mined from Common Crawl"
key_contribution: "Introduced GRPO (Group Relative Policy Optimization), halving RL training's memory cost by replacing the learned value function with group-normalized reward baselines, and showed careful Common Crawl mining yields a 120B-token math corpus that lifts a 7B model toward much larger models' math performance"

builds_on:
  - "schulman-2017-ppo"
  - "ouyang-2022-instructgpt"

tags:
  - "training"
  - "rlhf"
  - "reasoning"
  - "llm"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

DeepSeekMath is remembered for a method it introduced almost in passing: GRPO. The paper's stated goal was open-model math reasoning — met via a meticulously mined 120B-token math corpus and a 7B model punching far above its weight — but its lasting contribution is the RL algorithm: instead of PPO's learned value network for advantage estimation, sample a *group* of responses per prompt and baseline each response's reward against the group mean. That simplification made large-scale reasoning RL cheap enough to become the field's default.

## Why it's in the Arsenal

- GRPO is the training algorithm of the reasoning era — DeepSeek-R1 and a large fraction of current open reasoning-RL work run on it, and it ships in standard tooling (TRL and every major post-training framework)
- The data-mining half is an equally practical lesson: an iterative classifier-bootstrapped Common Crawl pipeline produced more high-quality math tokens than any prior open corpus — the template for domain-corpus construction

## Core Contribution

GRPO's mechanism: for each prompt, sample G outputs from the current policy, score them with the reward model, and set each output's advantage to its group-normalized reward (reward minus group mean, over group std) — eliminating the value model (~half the memory), which is especially poorly suited to sparse, outcome-level rewards anyway. Plus the corpus: fastText-classifier iterations over Common Crawl, seeded from OpenWebMath and expanded via domain discovery, yielding 120B math tokens shown to beat prior math corpora at matched budgets.

## Key Results

- DeepSeekMath-7B-RL reached 51.7% on competition-level MATH — approaching Gemini-Ultra and GPT-4 performance at 7B scale, unprecedented for open models at the time (2024)
- GRPO improved GSM8K from 82.9% to 88.2% and MATH from 46.8% to 51.7% over the instructed baseline, at roughly half PPO's training memory (2024)
- Corpus ablation: models pretrained on the mined corpus outperformed those trained on MathPile and other open math corpora at equal token budgets (2024)

## Methodology

Three stages: continue pretraining DeepSeek-Coder-Base-7B on the mined 120B-token corpus (math-heavy with code retained — code pretraining measurably helps math); instruction-tune on chain-of-thought and tool-integrated reasoning data; then GRPO with outcome-based rewards. The paper also contributes a unifying analysis framing SFT, rejection sampling, DPO, PPO, and GRPO as variants of one gradient framework — a widely cited conceptual map of post-training methods.

## Practical Applicability

Directly applicable at two levels: GRPO is implemented in TRL and the major open post-training stacks, and is the default choice for outcome-reward reasoning RL where value networks add cost without benefit. The corpus methodology (classifier bootstrapping over Common Crawl with iterative refinement) is the reusable recipe whenever a domain-specialized pretraining corpus is needed.

## Limitations & Critiques

Group-relative baselining assumes reward comparability within a group and can plateau when all samples fail (zero gradient signal on hard prompts — a known issue that successors patch with curriculum or filtering). Later analyses (e.g. Dr. GRPO) identified biases in the length normalization and std division, proposing corrections; the original formulation can inflate response length without accuracy gains. Outcome-only rewards also inherit reward-hacking risks the paper does not fully explore.

## Reproductions & Follow-up Work

Broadly reproduced: GRPO reimplementations exist across TRL, verl, and OpenRLHF, and the algorithm was validated at scale by `deepseek-ai-2025-r1`, which made it famous. An active successor literature (DAPO, Dr. GRPO, GSPO) refines its normalization and stability; the mined-corpus approach influenced subsequent open math/code corpora. Model weights and evaluation code are public.

## Relation to the Arsenal

The algorithmic bridge between `schulman-2017-ppo` (the method it simplifies) and `deepseek-ai-2025-r1` (training-and-alignment/), which scaled GRPO into the reasoning breakthrough. Complements `yang-2024-qwen25-math` (training-and-alignment/) in the open-math-model lineage and the reasoning entries in agents-and-reasoning/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2402.03300)
- [arXiv](https://arxiv.org/abs/2402.03300)
- [Code + weights (deepseek-ai/DeepSeek-Math)](https://github.com/deepseek-ai/DeepSeek-Math)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

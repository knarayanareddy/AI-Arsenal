---
id: schulman-2017-ppo
title: "Proximal Policy Optimization Algorithms"
phase: training-and-alignment
venue: arxiv-preprint
year: 2017
authors:
  - "Schulman, J."
  - "Wolski, F."
  - "Dhariwal, P."
  - "Radford, A."
  - "Klimov, O. (OpenAI)"
arxiv_id: "1707.06347"
arxiv_url: "https://arxiv.org/abs/1707.06347"
pdf_url: "https://arxiv.org/pdf/1707.06347"
code_url: null
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: false
citation_count_approx: 25000

tldr: "PPO: a clipped surrogate objective that keeps policy updates safely small using only first-order optimization — the RL algorithm that, five years later, became the engine of RLHF and thus of ChatGPT-style alignment"
key_contribution: "Replaced trust-region policy optimization's expensive second-order constraint with a simple clipped-ratio objective achieving comparable stability at a fraction of the implementation cost — becoming deep RL's default policy-gradient method and later the standard RLHF optimizer"

builds_on: []

tags:
  - "rlhf"
  - "training"
  - "alignment"
  - "foundational"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

PPO solves a mundane-sounding problem with outsized consequences: policy-gradient RL is unstable because a single too-large update can collapse the policy, but the principled fix (TRPO's trust region) requires second-order optimization few teams can implement well. PPO's clipped surrogate objective gets the same "don't move too far" effect by simply clipping the policy probability ratio — first-order, few lines of code, multiple epochs per batch. It became deep RL's workhorse, and then — the reason it's in this catalog — the optimizer inside RLHF.

## Why it's in the Arsenal

- PPO is the "PO" in most RLHF pipelines: InstructGPT, Llama 2's alignment, and the canonical ChatGPT recipe all optimize the reward model's signal with PPO — understanding aligned LLMs mechanically requires understanding this algorithm
- The current wave of alternatives (DPO, GRPO) is defined *against* PPO's costs, so its mechanics are the baseline for evaluating every modern post-training method

## Core Contribution

The clipped surrogate objective: maximize the expected advantage-weighted probability ratio r(θ) = π_θ/π_old, but clip r into [1−ε, 1+ε] and take the minimum with the unclipped term — removing any incentive to move the policy beyond the clip range in a single update. This pessimistic bound permits multiple optimization epochs over each batch of experience (unlike vanilla policy gradient), yielding TRPO-level stability with SGD-level simplicity.

## Key Results

- Matched or exceeded TRPO and other policy-gradient methods across continuous-control (MuJoCo) and Atari benchmarks with substantially simpler implementation (2017)
- Demonstrated robust performance under a single hyperparameter configuration across task families — the practical robustness that drove adoption (2017)
- Became OpenAI's default RL algorithm, later carried unchanged in structure into RLHF fine-tuning of language models (2019-2022)

## Methodology

Standard policy-gradient setup with generalized advantage estimation; the experimental contribution is comparative — same environments, same budgets, PPO's clipped objective versus TRPO, A2C, and vanilla PG — plus ablations of the clipping parameter and the alternative KL-penalized variant (which the clipped version generally beats). Evaluation across dozens of MuJoCo and Atari tasks established the robustness claim.

## Practical Applicability

In LLM practice, PPO appears wherever full RLHF is run: policy, reference, reward, and value models orchestrated together (as implemented in TRL and similar libraries). That machinery is powerful but heavy — four model copies, sensitive hyperparameters, reward-hacking risks — which is precisely the cost profile that pushed open practice toward DPO (no RL loop) and GRPO (no value model). Knowing PPO tells you what those methods are trading away: on-policy exploration and per-token credit assignment.

## Limitations & Critiques

Later replication studies showed PPO's reported gains depend heavily on code-level details (advantage normalization, value clipping, reward scaling) as much as the core objective — "implementation matters" became its own literature. In RLHF specifically, PPO is memory-hungry, unstable without careful KL control against the reference policy, and prone to reward over-optimization; these practical burdens, not correctness issues, drove the field's partial migration to simpler preference methods.

## Reproductions & Follow-up Work

Reproduced exhaustively — PPO is implemented in every major RL library and validated across thousands of applications; the implementation-details replication literature (e.g. "implementation matters in deep RL") both confirmed and qualified the original claims. In LLM post-training its descendants define the current landscape: `rafailov-2023-dpo` eliminates the RL loop entirely, and `shao-2024-deepseekmath`'s GRPO removes the value network while keeping on-policy RL.

## Relation to the Arsenal

The algorithmic core of `ouyang-2022-instructgpt` and the alignment pipeline in `touvron-2023-llama2` (foundational/); the explicit baseline that `rafailov-2023-dpo` (training-and-alignment/) simplifies away and that `shao-2024-deepseekmath`'s GRPO modifies for reasoning-scale RL.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/1707.06347)
- [arXiv](https://arxiv.org/abs/1707.06347)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

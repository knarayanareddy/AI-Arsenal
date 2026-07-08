---
id: liang-2026-mipi
title: "The Mirage of Optimizing Training Policies: Monotonic Inference Policies as the Real Objective for LLM Reinforcement Learning"
phase: training-and-alignment
venue: arxiv-preprint
year: 2026
authors:
  - "Liang, J."
  - "Tang, H."
  - "Ma, Y."
  - "He, Y."
  - "Wang, W."
  - "Li, X."
arxiv_id: "2606.29526"
arxiv_url: "https://arxiv.org/abs/2606.29526"
pdf_url: "https://arxiv.org/pdf/2606.29526"
code_url: null
venue_url: null

practical_applicability: medium
reproduction_status: no-code
result_status: current
has_code: false
citation_count_approx: 0

tldr: "LLM RL optimizes the training-engine policy, but you deploy the inference-engine policy -- and the two disagree on trajectory probabilities even with synced weights. Proposes MIPI/MIPU to make the deployed policy the optimization objective"
key_contribution: "Identifies an objective misalignment underlying training-inference mismatch in LLM RL -- improving the training-engine policy does not necessarily improve the inference-engine policy actually deployed -- and proposes Monotonic Inference Policy Improvement (MIPI) with a two-step update framework (MIPU) that targets the inference policy directly"

builds_on: []
implemented_in: []

tags:
  - rlhf
  - training
  - inference
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

LLM RL post-training runs two engines: a fast inference engine (vLLM-style) for generation and a precise training engine for gradient updates — and in practice they assign inconsistent probabilities to the same trajectories even with synchronized weights. Prior work treated this training-inference mismatch as off-policyness to be corrected. This paper points out a more basic problem: the optimization objective itself is aimed at the wrong policy. An effective update to the training-engine policy does not necessarily improve the inference-engine policy — the one you actually deploy. It proposes Monotonic Inference Policy Improvement (MIPI) as the corrected objective and a two-step framework (MIPU) to realize it.

## Why it's in the Arsenal

- Training-inference mismatch is one of the most practically consequential and least-discussed causes of RL post-training fragility — anyone running GRPO/PPO-style pipelines with a separate rollout engine has this problem whether they know it or not. The paper's reframing (it's objective misalignment, not just off-policyness noise) is the kind of mechanism-level insight this catalog exists to surface.
- `practical_applicability: medium`: directly actionable if you run RL post-training in-house; for everyone else it's an important lens for reading RL training reports and understanding why "RL collapse" happens.

## Core Contribution

The conceptual contribution is the diagnosis: existing mismatch corrections (importance weighting and similar) stabilize updates to the *training* policy, silently assuming that improving it improves the *inference* policy — which the probability inconsistency between engines breaks. The paper makes the deployed inference policy the explicit optimization target: MIPI is a policy-optimization objective under which each update is constructed to monotonically improve the inference-engine policy, and MIPU is the two-step RL framework that implements it within the standard two-engine setup.

## Key Results

- Demonstrates that trajectory probabilities from training and inference engines diverge even with synchronized parameters — the empirical footing for the objective-misalignment claim (a phenomenon independently documented in the community's numerics work on rollout-training mismatch)
- Reports that MIPU improves stability and end-task performance of LLM RL relative to standard mismatch-handling baselines (consult the paper for benchmark specifics; no official code is available to verify against as of `last_reviewed: 2026-07-08`)

## Methodology

The paper formalizes the two-policy setting — training policy π_train and inference policy π_infer sharing parameters but differing in implementation numerics — and derives an update rule whose improvement guarantee is stated on π_infer rather than π_train. MIPU operationalizes this as a two-step procedure per iteration within a conventional rollout-then-update RL loop, keeping the efficient two-engine architecture rather than forcing training and inference into one engine.

## Practical Applicability

If you run RL post-training: first, measure the mismatch — log per-trajectory probability gaps between your rollout and training engines; large gaps mean your effective objective is not the model you deploy. Second, this paper (and the line of work around it) argues corrections should target the inference policy, not merely reweight for off-policyness. If you don't train models, the takeaway is evaluative: benchmark deltas from RL post-training are measured on the inference engine, so training-side improvements reported without mismatch handling may not transfer.

## Limitations & Critiques

An arXiv preprint without peer review, and no official code release identified as of `last_reviewed: 2026-07-08` — reproduction currently requires reimplementation, which raises the verification bar for its empirical claims. The mismatch magnitude (and thus the payoff of MIPI over simpler corrections) depends on engine/numerics specifics that evolve quickly; results tied to particular engine pairs may age fast. The monotonic-improvement guarantee inherits the usual gap between RL theory assumptions and LLM-scale practice.

## Reproductions & Follow-up Work

No official code and no independent reproductions identified as of `last_reviewed: 2026-07-08`. The paper drew unusually strong attention for a training-methods preprint (157 upvotes on Hugging Face Papers, the top paper of its week) — expect follow-up work and framework implementations; revisit at next review.

## Relation to the Arsenal

Extends the post-training line in this folder — `rafailov-2023-dpo` and `deepseek-ai-2025-r1` establish *what* to optimize (preference and reasoning objectives); this paper interrogates *which policy* those objectives actually land on in a two-engine pipeline. Directly relevant to anyone combining the [training-and-alignment projects](../../projects/training-and-alignment/_index.md) with a separate rollout engine from the [inference engines](../../projects/inference-engines/_index.md) catalog — that combination is precisely where the mismatch lives.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2606.29526)
- [arXiv](https://arxiv.org/abs/2606.29526)

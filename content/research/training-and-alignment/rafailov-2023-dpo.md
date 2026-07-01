---
id: rafailov-2023-dpo
title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model"
phase: training-and-alignment
venue: neurips
year: 2023
authors:
  - "Rafailov, R."
  - "Sharma, A."
  - "Mitchell, E."
  - "Manning, C."
  - "et al."
arxiv_id: "2305.18290"
arxiv_url: "https://arxiv.org/abs/2305.18290"
pdf_url: "https://arxiv.org/pdf/2305.18290"
code_url: "https://github.com/eric-mitchell/direct-preference-optimization"
venue_url: "https://papers.nips.cc/paper_files/paper/2023"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 4600

tldr: "Showed the RLHF objective can be solved directly with a simple classification loss on preference pairs, with no separate reward model and no online RL -- meaning you should reach for DPO instead of implementing PPO-based RLHF for most alignment/preference-tuning work"
key_contribution: "Derived a closed-form relationship between reward functions and optimal RLHF policies, showing the standard RLHF objective can be optimized directly on preference data with a single classification-style loss, eliminating the reward-model-training and online-sampling stages of PPO-based RLHF"

builds_on:
  - ouyang-2022-instructgpt
implemented_in:
  - axolotl
  - llamafactory

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

This paper showed that the standard RLHF objective — the one `ouyang-2022-instructgpt` solves with a separately-trained reward model and PPO-based reinforcement learning — has a closed-form solution that can be optimized directly on human preference data with a single, stable classification-style loss, with no reward model and no online sampling from the policy during training. This finding remains current practice: DPO or a DPO-family variant (KTO, ORPO, SimPO) is what most teams reach for today when aligning a model to preference data, and nothing has fully displaced this direct-optimization approach as the default, though ongoing comparisons against online RL methods for specific use cases (particularly exploration-heavy tasks) are still active research.

## Why it's in the Arsenal

- DPO is the direct, practical answer to "how do I align a model to preference data without building the full RLHF infrastructure (reward model, PPO trainer, online rollout sampling)" — it is implemented as a standard training mode in this catalog's fine-tuning tools (`axolotl`, `llamafactory`) specifically because it removes the operational complexity that made PPO-based RLHF hard to deploy reliably outside a few well-resourced labs.
- `practical_applicability: high` is a direct, non-inflated classification: DPO is not a theoretical simplification, it is the alignment technique most teams actually use in production fine-tuning pipelines today, replacing PPO-based RLHF as the default rather than existing alongside it as a niche alternative.

## Core Contribution

RLHF as described in `ouyang-2022-instructgpt` requires two separate stages after supervised fine-tuning: training a reward model on preference comparisons, then using reinforcement learning (PPO) to optimize the policy against that reward model, subject to a KL-divergence constraint to prevent the policy from drifting too far from its starting point. This paper's key theoretical contribution is a change of variables showing that the reward function implicit in the RLHF objective can be expressed directly in terms of the optimal policy itself — meaning you never need to explicitly parameterize or train a separate reward model. In engineering terms: this reformulation turns the RLHF problem into a simple binary classification loss over preference pairs (which response was preferred), directly optimized on the policy's own log-probabilities, with no reward model, no PPO trainer, and no online sampling from the policy during training — removing exactly the three components that made PPO-based RLHF complex, unstable, and hard to tune.

## Key Results

- DPO matched or exceeded PPO-based RLHF's ability to control the sentiment of generated text in the paper's controlled comparison (2023) — the paper's most direct head-to-head comparison against the method it replaces
- DPO matched or improved response quality relative to PPO-based RLHF on summarization and single-turn dialogue tasks (2023), while being reported as substantially simpler to implement and train, with fewer hyperparameters requiring tuning
- These are 2023-era controlled comparisons on specific tasks (sentiment control, summarization, dialogue); DPO's broad adoption as the default alignment technique across the field since publication (reflected in it being a standard mode in nearly every fine-tuning framework, including two in this catalog) constitutes a much larger body of practical validation than the original paper's own benchmark suite

## Methodology

DPO reframes the RLHF objective using a mathematical identity: for the standard KL-constrained reward maximization objective, there is a closed-form mapping between reward functions and the optimal policy that achieves them (paper Section 4). Substituting this mapping into the standard preference-modeling loss (the Bradley-Terry model used to fit reward models from pairwise comparisons) yields a loss expressed entirely in terms of policy log-probabilities — no reward model term remains. Concretely, DPO trains the policy directly on (prompt, preferred response, dispreferred response) triples, increasing the relative log-probability of the preferred response over the dispreferred one, with a dynamic per-example weighting term (derived from the same closed-form mapping) that prevents the model from over-optimizing on easy examples. Because this loss depends only on the policy being trained (compared against a frozen reference copy of the same starting model) and the static preference dataset, no online generation or sampling from the policy is needed during training — the entire optimization is a supervised-learning-style loss over a fixed dataset, which is why DPO training is dramatically simpler to implement and more stable than PPO-based RLHF.

## Practical Applicability

If you are aligning a model to a preference dataset (whether that's general helpfulness/harmlessness preferences or a narrower task-specific preference signal), this paper's method is why you should default to DPO rather than building PPO-based RLHF infrastructure — DPO requires only a preference dataset and a standard supervised-training loop, whereas PPO-based RLHF requires training and maintaining a separate reward model plus an online RL training loop with well-documented stability and hyperparameter-sensitivity issues. This catalog's own fine-tuning tools (`axolotl`, `llamafactory`) support DPO as a first-class training objective specifically because of this operational simplicity advantage. If your use case specifically benefits from online exploration (the model generating novel responses during training that get scored, rather than learning from a fixed preference dataset), PPO-based online RL may still have an edge worth evaluating — this is an active area of comparison the field has not fully settled.

## Limitations & Critiques

DPO is fundamentally off-policy: it learns from a fixed, pre-collected preference dataset (often generated by the SFT model or an earlier checkpoint), whereas PPO-based RLHF is online, generating new completions and scoring them during training — this means DPO cannot benefit from exploration the way online RL can, a real tradeoff the original paper's framing (emphasizing simplicity and stability) does not foreground as prominently as it could. Since publication, several DPO variants (KTO, IPO, ORPO, SimPO) have been proposed specifically to address particular weaknesses of the original formulation (handling non-paired preference data, reducing sensitivity to the reference-model KL term, or removing the need for a reference model at all) — none of these have been shown to be a strict, universal improvement over DPO in all settings, and DPO remains a strong and widely used baseline rather than a technique conclusively superseded by any one successor. No known failed-replication challenge to the paper's core theoretical derivation or empirical results has been identified as of `last_reviewed: 2026-07-01`.

## Reproductions & Follow-up Work

DPO has been reproduced and integrated as a standard training objective across the fine-tuning ecosystem, including this catalog's `axolotl` and `llamafactory` tool entries, and is also the alignment method used in `dubey-2024-llama3`'s (foundational/) own post-training pipeline, per that paper's own methodology section — a direct, large-scale production validation beyond the original paper's academic benchmarks. Notable follow-up work proposing DPO variants includes KTO (Kahneman-Tversky Optimization, for non-paired preference data) and ORPO (odds-ratio preference optimization, removing the need for a separate reference model) — neither is yet a separately cataloged research entry, but both are active alternatives practitioners weigh against vanilla DPO.

## Relation to the Arsenal

This paper builds directly on `ouyang-2022-instructgpt` (this phase folder), targeting exactly the RLHF objective that paper's PPO-based pipeline optimizes, and should be read as that paper's direct methodological successor rather than an unrelated technique. It is implemented in this catalog's `axolotl` and `llamafactory` tool entries (`content/tools/model-layer/`) as a standard training mode, and is the specific alignment technique `dubey-2024-llama3` (foundational/) uses in its own multi-stage post-training pipeline, per that entry's Methodology section.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2305.18290)
- [arXiv](https://arxiv.org/abs/2305.18290)
- [Official Code](https://github.com/eric-mitchell/direct-preference-optimization)
- [Papers With Code](https://paperswithcode.com/paper/direct-preference-optimization-your-language)
- [Key Reproduction / Analysis](https://vinayakajyothi.com/blog/2026-01-17-rlhf-vs-dpo-alignment/) — 2026 analysis of why DPO became the dominant alignment paradigm over PPO-based RLHF for most teams, including the specific offline-vs-online tradeoff DPO accepts

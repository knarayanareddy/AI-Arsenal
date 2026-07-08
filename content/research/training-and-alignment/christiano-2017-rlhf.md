---
id: christiano-2017-rlhf
title: "Deep Reinforcement Learning from Human Preferences"
phase: training-and-alignment
venue: neurips
year: 2017
authors:
  - "Christiano, P."
  - "Leike, J."
  - "Brown, T. B."
  - "Martic, M."
  - "Legg, S."
  - "Amodei, D."
arxiv_id: "1706.03741"
arxiv_url: "https://arxiv.org/abs/1706.03741"
pdf_url: "https://arxiv.org/pdf/1706.03741"
code_url: null
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: foundational
has_code: false
citation_count_approx: 4500

tldr: "The origin of RLHF: learn a reward model from human comparisons of trajectory pairs, then optimize a policy against it — solving tasks where the objective is easier to recognize than to specify, with under 1% of interactions needing human feedback"
key_contribution: "Established the two-model pattern behind all modern alignment training: fit a Bradley–Terry reward model to pairwise human preferences, train the policy against the learned reward asynchronously — demonstrating that scalable human oversight of RL is possible at ~0.1% feedback density"

builds_on: []

tags:
  - "rlhf"
  - "alignment"
  - "training"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Five years before ChatGPT, this paper solved the problem that made it possible: how do you train with RL when you can't write the reward function? Christiano et al. had humans compare short pairs of agent behavior clips, fit a reward model to those comparisons, and trained Atari and MuJoCo policies against the learned reward — including behaviors with no programmatic reward at all, like a simulated backflip, taught from under an hour of human time. Every RLHF-trained assistant is this loop with a language model in the policy slot.

## Why it's in the Arsenal

- It is the root of the alignment-training lineage: InstructGPT, Constitutional AI, and DPO are all responses to the machinery this paper introduced — you cannot read the alignment literature without it
- Its two central findings — comparisons are a far cheaper and more reliable human signal than absolute ratings, and learned reward models get exploited if not continually corrected — are the two facts that still govern preference-training practice today

## Core Contribution

The RLHF triad: (1) collect pairwise human preferences over behavior segments; (2) fit a reward model via Bradley–Terry maximum likelihood on those comparisons; (3) optimize the policy against the learned reward with standard deep RL, asynchronously and with active selection of maximally-informative pairs. The design insight is economic: preferences over short clips are the highest-signal-per-second form of human oversight, letting <1% of interactions carry feedback.

## Key Results

- Matched or exceeded true-reward RL on most Atari games and MuJoCo tasks using only ~700–5,500 human comparisons, no reward function access (2017)
- Trained novel behaviors with no programmatic reward (Hopper backflip) from ~900 comparisons in under an hour of human time (2017)
- Documented reward hacking directly: agents exploit frozen reward models, requiring continued human feedback to correct — the first clear statement of the over-optimization problem (2017)

## Methodology

Agents (A2C on Atari, TRPO on MuJoCo) trained against an ensemble of small reward-model networks fit to human (and synthetic-oracle) preferences over 1–2 second clip pairs, with queries selected by ensemble disagreement; ablations compared comparisons vs. absolute ratings and online vs. offline feedback.

## Practical Applicability

The pipeline transferred to language models nearly unchanged — InstructGPT is this paper's method applied to text with PPO — so its lessons are directly operational for anyone training with preferences: collect comparisons rather than scores; expect the policy to exploit the reward model (regularize toward a reference, refresh feedback); and treat query selection as a budget-allocation problem. Even teams doing DPO (which removes the explicit reward model) are working inside this paper's problem formulation.

## Limitations & Critiques

Rewards were assumed expressible from short clips — myopic in ways that matter for long-horizon language tasks; ensemble disagreement proved a weak query-selection signal in follow-ups; and the paper's own reward-hacking observation remains the method's standing failure mode, later formalized as reward over-optimization (Gao et al. 2023). Human preference data also encodes annotator bias — a critique that grew central once the method trained public-facing assistants.

## Reproductions & Follow-up Work

Reproduced across labs and re-implemented in most RLHF libraries' tutorial examples; extended by reward modeling from demonstrations + preferences (Ibarz et al. 2018), summarization-from-feedback (Stiennon et al. 2020), `ouyang-2022-instructgpt`, `bai-2022-constitutional-ai` (AI feedback replacing human), and `rafailov-2023-dpo` (collapsing the reward model into the policy objective).

## Relation to the Arsenal

Direct ancestor of `ouyang-2022-instructgpt`, `bai-2022-constitutional-ai`, and `rafailov-2023-dpo` (training-and-alignment/); its reward-hacking finding is the mechanism behind the eval-gaming cautions in evaluation guidance across the Arsenal.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/1706.03741)
- [arXiv](https://arxiv.org/abs/1706.03741)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

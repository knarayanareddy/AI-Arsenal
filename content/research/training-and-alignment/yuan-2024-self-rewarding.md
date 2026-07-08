---
id: yuan-2024-self-rewarding
title: "Self-Rewarding Language Models"
phase: training-and-alignment
venue: arxiv-preprint
year: 2024
authors:
  - "Yuan, W."
  - "Pang, R. Y."
  - "Cho, K."
  - "Sukhbaatar, S."
  - "Weston, J."
arxiv_id: "2401.10020"
arxiv_url: "https://arxiv.org/abs/2401.10020"
pdf_url: "https://arxiv.org/pdf/2401.10020"
code_url: null
venue_url: null

practical_applicability: medium
reproduction_status: partially-reproduced
result_status: current
has_code: false
citation_count_approx: 0

tldr: "The model acts as its own reward model via LLM-as-a-judge, generating and scoring its own responses to build preference pairs for iterative DPO -- so reward quality improves alongside generation, escaping a fixed frozen reward model"
key_contribution: "An iterative self-improvement loop where a single model both generates candidate responses and judges them (LLM-as-a-judge) to create its own preference data for DPO training, showing that letting the reward signal improve with the model can lift instruction-following across rounds without new human labels"

builds_on: []
implemented_in: []

tags:
  - fine-tuning
  - alignment
  - llm
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Self-Rewarding Language Models proposes an alignment loop in which one model plays two roles: it generates candidate responses and it scores them as an LLM-as-a-judge. Those self-generated judgments become preference pairs used to train the next iteration via DPO. Repeating this yields a model whose *reward-giving* ability improves in lockstep with its *response* ability.

## Why it's in the Arsenal

- It targets a structural ceiling of RLHF: a frozen reward model becomes the bottleneck as the policy improves past it. Letting the judge improve with the policy is a conceptually important route toward continued self-improvement without endless human labeling.
- `practical_applicability: medium`: the idea is influential and partially reproduced, but reward-hacking and evaluation-validity concerns mean it is a research direction to apply carefully, not a safe default pipeline.

## Core Contribution

Standard RLHF trains a reward model once and freezes it; as the policy surpasses the reward model's discrimination, further gains stall. This paper's contribution is unifying generator and reward model in one LLM and iterating: the model creates instructions, samples responses, judges them with a rubric prompt, forms preference pairs from its own scores, and DPO-trains on them — then repeats. Because the same improving model does the judging, the reward signal is no longer static, which the paper argues is the key to compounding improvement.

## Key Results

- Reported improved instruction-following (e.g. AlpacaEval-style win rates) across successive self-rewarding iterations without additional human preference labels (see the paper for round-by-round numbers)
- Showed the model's judging ability also improved across iterations, not just its generation

## Methodology

Seed with a small amount of supervised judge/instruction data, then loop: generate new prompts and multiple responses, have the model score each response with an LLM-as-a-judge prompt, construct preference pairs from the scores, and train the next model with DPO. Evaluate instruction-following each round.

## Practical Applicability

The applicable idea is bootstrapping preference data from a capable model's own judgments to reduce human labeling — useful when you have a strong base model but limited annotation budget. The critical caveats: self-judging can drift or reward-hack, and improvements measured by the model's own or correlated judges may overstate real gains, so keep an independent held-out evaluation. Treat it as a semi-supervised augmentation, not fully autonomous alignment.

## Limitations & Critiques

Using the model as its own judge risks reward hacking and self-reinforcing biases, and gains reported against LLM-judged benchmarks can be inflated relative to human judgment. There is no official code release, and results are demonstrated over a few iterations rather than proven to scale indefinitely. Quality of the initial judge and prompts strongly conditions outcomes.

## Reproductions & Follow-up Work

No official code was released; community reimplementations and follow-ups (self-play and self-improvement variants) exist, making it partially reproduced. It connects to the LLM-as-a-judge and RLAIF lines and the broader question of scalable oversight.

## Relation to the Arsenal

Read with `rafailov-2023-dpo` (the training objective it iterates), `zheng-2023-llm-as-a-judge` (the judging mechanism it internalizes), and `lee-2023-rlaif` (AI feedback as a label source). Its reward-hacking caveats echo `wei-2023-jailbroken` on the fragility of learned objectives.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2401.10020)
- [arXiv](https://arxiv.org/abs/2401.10020)

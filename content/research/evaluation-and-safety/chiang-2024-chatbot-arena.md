---
id: chiang-2024-chatbot-arena
title: "Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference"
phase: evaluation-and-safety
venue: icml
year: 2024
authors:
  - "Chiang, W.-L."
  - "Zheng, L."
  - "Sheng, Y."
  - "Angelopoulos, A. N."
  - "Li, T."
  - "Li, D."
  - "Zhang, H."
  - "Zhu, B."
  - "Jordan, M."
  - "Gonzalez, J. E."
  - "Stoica, I."
arxiv_id: "2403.04132"
arxiv_url: "https://arxiv.org/abs/2403.04132"
pdf_url: "https://arxiv.org/pdf/2403.04132"
code_url: "https://github.com/lm-sys/FastChat"
venue_url: "https://proceedings.mlr.press/v235/chiang24b.html"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 1200

tldr: "Formalized the crowdsourced pairwise-battle leaderboard: anonymous side-by-side model comparisons on live user prompts, ranked with Bradley-Terry statistics — the methodology behind LMArena, the de facto public preference ranking for frontier models"
key_contribution: "Built and validated the open evaluation platform where users vote between two anonymous model responses to their own prompts, with a rigorous statistical pipeline (Bradley-Terry estimation, confidence intervals, efficient sampling) — establishing live human preference as a first-class benchmark complementary to static test sets"

builds_on:
  - "zheng-2023-llm-as-a-judge"

tags:
  - "evaluation"
  - "llm"
  - "research"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Chatbot Arena (now LMArena) crowdsources model evaluation: a user submits any prompt, receives responses from two anonymous models, and votes for the better one; identities are revealed only after voting. Aggregated over hundreds of thousands of battles, Bradley-Terry modeling with confidence intervals produces the public leaderboard that became the field's headline human-preference ranking. The paper formalizes the platform, its statistics, and validation of vote quality against experts.

## Why it's in the Arsenal

- Arena Elo is one of the most-watched numbers in the field — every frontier release leads with it — and this paper documents exactly what that number is (fresh-prompt human preference under Bradley-Terry) and what it is not (a task-capability or safety measure)
- Its methodology (pairwise preference + BT ranking + CIs) is the template for internal model-comparison harnesses, directly transferable to A/B-testing your own model or prompt variants

## Core Contribution

Methodological legitimacy for a live leaderboard: (1) fresh, user-generated prompts sidestep the contamination and overfitting that decay static benchmarks; (2) Bradley-Terry estimation with proper confidence intervals and an active-sampling rule replaces naive Elo, giving statistically defensible rankings and sample-efficient model addition; (3) validation showing crowd votes agree with expert judgments at high rates and that arena prompts are diverse and discriminative. Together these established preference leaderboards as credible evaluation infrastructure rather than a popularity poll.

## Key Results

- Crowd votes showed 72-83% agreement with expert annotators — comparable to expert-expert agreement — validating crowdsourced preference as signal (paper Section 5, 2024)
- Topic modeling over 90k+ battle prompts showed broad task diversity, and per-topic rankings demonstrated the platform discriminates models' domain-specific strengths (2024)
- The BT-with-CI pipeline and active sampling reduced the battles needed for stable rankings versus uniform sampling, enabling rapid, statistically grounded placement of new models (2024)

## Methodology

Side-by-side anonymous battles on user prompts; votes (win/loss/tie) feed a Bradley-Terry model estimated by logistic regression, with sandwich-robust confidence intervals and bootstrapping; an active sampling rule prioritizes high-uncertainty model pairs; anomalous-user detection guards vote quality. Validation compares crowd verdicts to expert labels on sampled battles and analyzes prompt distribution via clustering/topic modeling.

## Practical Applicability

Two distinct uses: as a consumer of the leaderboard, read Arena scores as 'average human preference on self-selected chat prompts' — excellent for general assistant quality, weakly predictive of agentic, long-context, or domain-specific performance, and susceptible to style effects (verbosity, formatting) that style-controlled variants attempt to correct; as an evaluation designer, the paper's pairwise-BT-with-CIs recipe is the correct statistical machinery for internal bake-offs between models, prompts, or system versions, and is far more robust than absolute scoring.

## Limitations & Critiques

Preference is not correctness: votes reward style, confidence, and format alongside substance (the platform's own style-control analyses confirm material rank shifts), and the self-selected user population skews toward enthusiast chat use. Subsequent scrutiny (e.g. 2025's 'Leaderboard Illusion' analysis) documented structural advantages for large providers — private variant testing and unequal sampling — prompting policy changes; and as stakes rose, targeted optimization for arena preference ('leaderboard hacking') became its own decay vector. Rankings are also insensitive to safety and hallucination unless users happen to probe them.

## Reproductions & Follow-up Work

The platform grew into LMArena with category leaderboards (coding, hard prompts, vision, image generation), style-controlled rankings, and Arena-Hard — a static benchmark distilled from arena prompts that correlates strongly with live rankings. The battle dataset releases (Chatbot Arena Conversations, LMSYS-Chat-1M) became standard research corpora, and the pairwise-BT methodology is reproduced in internal evaluation systems industry-wide.

## Relation to the Arsenal

Institutionalizes the human-preference axis that `zheng-2023-llm-as-a-judge` (same phase) automates with LLM judges — the two papers share the MT-Bench/Arena lineage and author group. Arena rankings are the preference-side complement to capability benchmarks like `hendrycks-2020-mmlu` (same phase), and the evaluation-methodology guidance in content/skills/applied/evals-in-production.md draws directly on this pairwise-comparison paradigm.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2403.04132)
- [arXiv](https://arxiv.org/abs/2403.04132)
- [Code](https://github.com/lm-sys/FastChat)
- [Venue](https://proceedings.mlr.press/v235/chiang24b.html)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*

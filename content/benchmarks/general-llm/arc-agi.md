---
id: arc-agi
title: "ARC-AGI (Abstraction and Reasoning Corpus)"
entry_type: benchmark
category: general-llm
modality: [text, vision]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Fluid intelligence / skill-acquisition efficiency: solving novel grid-transformation puzzles from a handful of examples, designed so that memorized knowledge and training-set patterns do not help — a deliberate contrast to knowledge-heavy benchmarks."
metrics:
  - name: "percent solved"
    direction: higher
    notes: "Fraction of held-out tasks solved exactly (the output grid must match); the private evaluation set is the headline number"
protocol:
  dataset: "ARC-AGI-1 and ARC-AGI-2 (public training/eval + a secret private eval set)"
  dataset_url: "https://github.com/fchollet/ARC-AGI"
  evaluation_setup: "Each task gives a few input→output grid examples; the solver must infer the transformation and produce the correct output grid for test inputs. Official scores use a held-out private set; a compute-limited track underlies the ARC Prize."
  version: "ARC-AGI-2 (2025)"
leaderboards:
  - name: "ARC Prize leaderboard"
    url: "https://arcprize.org/"
    last_checked: "2026-07-08"
known_issues:
  - "Exact-match grid scoring is strict; near-correct reasoning earns zero, which can understate partial competence"
  - "Results are only meaningful with the compute/cost constraints stated — brute-force program search can inflate uncapped scores"
  - "Public tasks can be trained against; only the private eval set is contamination-safe"
  - "It is deliberately narrow (abstract grid puzzles) and is not a general capability measure despite the name"
recommended_usage:
  - "Cite it as evidence about fluid reasoning / generalization, not broad knowledge or usefulness"
  - "Always report the compute/cost regime alongside the score — it is meaningless without it"
  - "Use ARC-AGI-2 for current frontier comparison; ARC-AGI-1 is largely solved under high compute"
  - "Treat big jumps skeptically until verified on the private set under the stated budget"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["gpqa-diamond", "mmlu-pro"]
enrichment_status: draft
enrichment_notes: "Authored from 'On the Measure of Intelligence' (arXiv:1911.01547), the fchollet/ARC-AGI repo, and arcprize.org; URLs verified 2026-07-08."
tags: [evaluation, reasoning, benchmark, llm]
---

## Overview

ARC-AGI, introduced by François Chollet in *On the Measure of Intelligence* (2019) and now run as the ARC Prize, is designed to resist the memorization that inflates knowledge benchmarks. Each task shows a few input→output grid transformations; the solver must infer the underlying rule and apply it to new inputs. The puzzles require core priors (objectness, counting, symmetry) but no acquired knowledge, making it a proxy for fluid intelligence and skill-acquisition efficiency. ARC-AGI-2 (2025) raised difficulty after ARC-AGI-1 became tractable under heavy compute.

## What it Measures (and what it doesn’t)

Measures the ability to learn a novel abstract transformation from very few examples and generalize it — reasoning efficiency rather than stored knowledge.

Does not measure: factual knowledge, language quality, real-world task usefulness, or broad "AGI" despite the name. It is a narrow, deliberately abstract probe.

## Dataset & Protocol

- **Dataset:** ARC-AGI-1 and ARC-AGI-2, with public train/eval and a secret private evaluation set
- **Dataset URL:** https://github.com/fchollet/ARC-AGI
- **Evaluation setup:** infer the grid transformation from few-shot examples; exact-match output on test inputs; official scores use the private set under a compute/cost cap
- **Version:** ARC-AGI-2 (2025)

## Metrics

- **percent solved** — higher is better — exact grid match on held-out tasks

## How to Run

```bash
git clone https://github.com/fchollet/ARC-AGI
# tasks are JSON grids under data/; run your solver to produce output grids
# score with exact-match against the evaluation tasks (private set via ARC Prize)
```

## Known Issues, Leakage & Gaming Risks

- Strict exact-match scoring gives no partial credit
- Uncapped compute enables brute-force program synthesis that inflates scores — always state the budget
- Public tasks are contaminable; the private set is the trustworthy number
- Narrow scope: a high score is evidence of abstract reasoning, not general capability

## How to Interpret Scores

- Always read the score with its compute/cost regime; ARC deliberately ties capability to *efficiency*, so an unconstrained number is not comparable.
- As of **2026-07-08**, ARC-AGI-2 remains far from human-level under the ARC Prize's constrained budget, even as ARC-AGI-1 is largely solved with high compute.
- Treat headline jumps as claims to verify on the private set under the stated constraints.

## Recommended Usage

- Use as a fluid-reasoning/generalization signal, not a usefulness or knowledge measure
- Always pair the score with the compute budget
- Prefer ARC-AGI-2 for frontier comparisons
- Cross-check with knowledge/reasoning benchmarks for a rounded profile

## Related Benchmarks

- [GPQA-Diamond](./gpqa-diamond.md) — expert knowledge reasoning (a knowledge-heavy contrast)
- [MMLU-Pro](./mmlu-pro.md) — harder multitask knowledge/reasoning

## Relation to the Arsenal

Abstract-reasoning benchmark in the general-llm category; a deliberate counterpoint to knowledge-heavy benchmarks when profiling model reasoning for the Arsenal's model-selection guidance.

## Resources

- [ARC Prize](https://arcprize.org/)
- [fchollet/ARC-AGI repo](https://github.com/fchollet/ARC-AGI)
- [On the Measure of Intelligence — Chollet, 2019](https://arxiv.org/abs/1911.01547)

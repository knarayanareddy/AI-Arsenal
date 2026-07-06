---
id: mathvista
title: "MathVista"
entry_type: benchmark
category: multimodal
modality: [vision, text, multimodal]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Mathematical and quantitative reasoning in visual contexts – ~6,141 questions combining math and multimodal (chart, figure, geometry) understanding."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Exact-match / graded accuracy over the test set"
protocol:
  dataset: "MathVista (UCLA / UW, 2023)"
  dataset_url: "https://github.com/lupantech/MathVista"
  evaluation_setup: "0-shot. Question + figure/chart/diagram → answer (free-form or MC). Scores mathematical reasoning that requires reading the visual. ~6,141 questions."
  version: null
leaderboards:
  - name: "MathVista Leaderboard"
    url: "https://mathvista.github.io/"
    last_checked: "2026-07-06"
  - name: "Papers With Code – MathVista"
    url: "https://paperswithcode.co/benchmark/mathvista"
    last_checked: "2026-07-06"
known_issues:
  - "Some questions are answerable from the text/title without the figure – pair with vision-required splits when isolating visual math"
  - "Free-form answers require exact-match/grading; minor formatting differences can be marked wrong – use the official grader"
  - "Rapid progress – frontier VLMs exceeded ~85-90% by 2025-2026; the easier items are saturated"
  - "Mixes pure-math and visual-understanding skills – report sub-splits to localize weakness"
recommended_usage:
  - "Use to test quantitative / visual reasoning that needs the image"
  - "Report sub-splits (math-only vs visual-required) to localize weakness"
  - "Use the official grader for comparable numbers"
  - "Pair with MMMU (expert knowledge) and MMBench (general) for coverage"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [mmmu]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official MathVista repo/leaderboard, Papers With Code, and the primary paper. Vision-required and grader-protocol notes emphasized per expansion-PR policy."
tags: [evaluation, multimodal, vision, benchmark]
---

## Overview

MathVista is a benchmark for mathematical and quantitative reasoning in visual contexts. Its ~6,141 questions require reading charts, figures, geometry diagrams, and scientific visuals to solve math problems – a harder fusion of vision and reasoning than general VQA.

## What it Measures (and what it doesn’t)

Measures: visual + mathematical reasoning – can the model read a figure/chart and do the math?

Does not measure: open-ended generation, pure text math (see GSM8K/MATH), or expert-domain knowledge (see MMMU).

## Dataset & Protocol

- **Dataset:** MathVista – ~6,141 questions, math + visual
- **Dataset URL:** https://github.com/lupantech/MathVista
- **Evaluation setup:** 0-shot. Question + visual → answer; exact-match/graded. Accuracy.
- **Version:** –

Official eval: https://github.com/lupantech/MathVista

## Metrics

- **accuracy** — higher is better — graded accuracy over the test set

## How to Run

```bash
git clone https://github.com/lupantech/MathVista
# See repo README for the evaluation harness and grader.
```

## Known Issues, Leakage & Gaming Risks

- Some items answerable from text without the figure
- Free-form grading is strict – use the official grader
- Rapid progress – easier items saturated
- Mixes math + visual – report sub-splits

## How to Interpret Scores

- Report math-only vs visual-required sub-splits
- As of **2026-07-06**, check the live leaderboard – frontier VLMs ~85-90%
- Use the official grader for comparability
- Pair with MMMU and MMBench

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **MathVista** leaderboard for **MathVista** (protocol: **multimodal math + visual reasoning, accuracy**) shows frontier VLMs around **90%** — e.g., Qwen3.5-397B at **90.3%** and Kimi K2.5 at **90.1%** (Papers With Code, 2026). This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Test quantitative / visual reasoning that needs the image
- Report sub-splits to localize weakness
- Use the official grader
- Pair with MMMU and MMBench

## Related Benchmarks

- [MMMU](./mmmu.md) – expert-level multimodal knowledge

## Relation to the Arsenal

Multimodal evaluation benchmark. Complements multimodal projects and build examples.

## Resources

- [Leaderboard – MathVista](https://mathvista.github.io/)
- [GitHub – MathVista](https://github.com/lupantech/MathVista)
- Paper: Lu et al., "MathVista: Evaluating Mathematical Reasoning of Foundation Models in Visual Contexts", arXiv:2310.02255

---

*Last reviewed: 2026-07-06 by @maintainer*

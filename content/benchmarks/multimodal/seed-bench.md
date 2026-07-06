---
id: seed-bench
title: "SEED-Bench"
entry_type: benchmark
category: multimodal
modality: [vision, text, multimodal]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Multimodal understanding across images AND videos – ~19k multiple-choice questions spanning 12 evaluation dimensions (image/video comprehension, perception, reasoning)."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "MC accuracy, over image and video subsets"
protocol:
  dataset: "SEED-Bench (Tencent AILab, 2024)"
  dataset_url: "https://github.com/AILab-CVC/SEED-Bench"
  evaluation_setup: "0-shot. Image/video + question + options → model selects an answer; an LLM (GPT/other) judges free-form output. ~19k questions across 12 dimensions, with image and video splits."
  version: null
leaderboards:
  - name: "SEED-Bench – GitHub"
    url: "https://github.com/AILab-CVC/SEED-Bench"
    last_checked: "2026-07-06"
  - name: "Open VLM Leaderboard"
    url: "https://opencompass-open-vlm-leaderboard.hf.space/"
    last_checked: "2026-07-06"
known_issues:
  - "Graded by an LLM judge, which adds variance and can disagree with humans"
  - "Combines image and video subsets – aggregate accuracy hides which modality a model is weak on; report them separately"
  - "Video understanding (temporal reasoning) is much harder than image for most models – the gap is large"
  - "Prompt formatting affects scores – use the official eval script for comparable numbers"
recommended_usage:
  - "Use to test multimodal understanding across both images and videos"
  - "Report image vs video subset separately – never just the aggregate"
  - "Pair with MMBench (general) and MathVista (visual math) for coverage"
  - "Re-check the live leaderboard – VLM video capability is improving fast"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [mmmu]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official SEED-Bench repo and the primary paper. Judge-variance and image-vs-video protocol notes emphasized per expansion-PR policy."
tags: [evaluation, multimodal, vision, benchmark]
---

## Overview

SEED-Bench evaluates multimodal models on both images and videos with ~19k multiple-choice questions across 12 evaluation dimensions. It is one of the few large benchmarks that systematically covers video comprehension alongside image understanding.

## What it Measures (and what it doesn’t)

Measures: image + video multimodal understanding and reasoning across perception, knowledge, and logic dimensions.

Does not measure: open-ended generation, expert-domain knowledge (see MMMU), or visual math (see MathVista).

## Dataset & Protocol

- **Dataset:** SEED-Bench – ~19k MC questions, 12 dimensions, image + video
- **Dataset URL:** https://github.com/AILab-CVC/SEED-Bench
- **Evaluation setup:** 0-shot. Media + question → answer; LLM judge. Accuracy over image/video splits.
- **Version:** –

## Metrics

- **accuracy** — higher is better — MC accuracy, image + video subsets

## How to Run

```bash
git clone https://github.com/AILab-CVC/SEED-Bench
# See repo README for the evaluation harness and LLM-judge setup.
```

## Known Issues, Leakage & Gaming Risks

- LLM-judge adds variance
- Image + video combined – report separately
- Video temporal reasoning is much harder – large gap
- Prompt formatting affects scores

## How to Interpret Scores

- Report image vs video subset separately
- As of **2026-07-06**, frontier VLMs sit around 70-75% on the full set; re-check the live table
- Pair with MMBench and MathVista
- Use the official eval script for comparability

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **SEED-Bench** leaderboard for **SEED-Bench** (protocol: **~19k multiple-choice, image + video**) shows frontier VLMs in the **~70-75%** accuracy range on the full set (video subsets are markedly lower); exact ranking shifts as new VLMs are released, so re-check the live table. This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Test multimodal understanding on images AND videos
- Report image vs video separately
- Pair with MMBench and MathVista
- Re-check the live leaderboard

## Related Benchmarks

- [MMMU](./mmmu.md) – expert-level multimodal knowledge
- [MMBench](./mmbench.md) – general visual understanding

## Relation to the Arsenal

Multimodal evaluation benchmark. Complements multimodal projects and build examples.

## Resources

- [GitHub – SEED-Bench](https://github.com/AILab-CVC/SEED-Bench)
- Paper: Li et al., "SEED-Bench: Benchmarking Multimodal LLMs with Generative Images", arXiv:2307.16125

---

*Last reviewed: 2026-07-06 by @maintainer*

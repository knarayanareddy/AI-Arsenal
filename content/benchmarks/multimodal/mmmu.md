---
id: mmmu
title: "MMMU"
entry_type: benchmark
category: multimodal
modality: [vision, text, multimodal]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Massive multi-discipline multimodal understanding – college-level problems requiring images + text reasoning across 30 subjects (art, business, science, medicine, engineering, humanities)."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Exact match, averaged across 30 subjects"
protocol:
  dataset: "MMMU"
  dataset_url: "https://huggingface.co/datasets/MMMU/MMMU"
  evaluation_setup: "0-shot. Image + text input → multiple choice / open answer. Model must jointly reason over visual and textual content. ~11,500 questions."
  version: null
leaderboards:
  - name: "MMMU Leaderboard"
    url: "https://mmmu-benchmark.github.io/"
    last_checked: "2026-07-06"
  - name: "MMMU-Pro – Hugging Face"
    url: "https://huggingface.co/spaces/MMMU/MMMU-Pro"
    last_checked: "2026-07-06"
known_issues:
  - "Some questions are answerable from text alone without the image – MMMU-Pro filters these out, prefer MMMU-Pro for vision-required evaluation"
  - "College-level expert knowledge required – scores below ~40% are near random for many subjects"
  - "Rapid progress – frontier multimodal models exceeded 70% in 2025, check live leaderboard"
  - "Evaluation harness / prompt formatting affects scores significantly – use the official eval script for comparable numbers"
recommended_usage:
  - "Use to compare vision-language models on expert knowledge tasks requiring joint image+text reasoning"
  - "Prefer MMMU-Pro over vanilla MMMU when you need vision-required questions only"
  - "Report per-discipline breakdown – aggregate accuracy hides domain-specific failure modes"
  - "Pair with a text-only benchmark (e.g. MMLU-Pro) to isolate the vision contribution"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["mmlu-pro"]
enrichment_status: reviewed
tags: [evaluation, multimodal, vision, benchmark]
---

## Overview

MMMU (Massive Multi-discipline Multimodal Understanding) is a college-level multimodal reasoning benchmark with ~11,500 questions across 30 subjects spanning art, business, science, health/medicine, humanities/social science, and engineering – requiring joint image + text understanding.

## What it Measures (and what it doesn’t)

Measures: expert-level multimodal reasoning – can the model answer college exam / textbook questions that require looking at a diagram, chart, artwork, or scientific figure together with text?

Does not measure: video understanding, audio, real-world embodied interaction, or open-ended generation quality.

## Dataset & Protocol

- **Dataset:** MMMU – ~11,500 questions, 30 subjects, image+text
- **Dataset URL:** https://huggingface.co/datasets/MMMU/MMMU
- **Evaluation setup:** 0-shot. Image + text input → multiple choice / open answer. Accuracy.
- **Version:** –

Official eval: https://github.com/MMMU-Benchmark/MMMU

## Metrics

- **accuracy** — higher is better — exact match, averaged across subjects

## How to Run

```bash
git clone https://github.com/MMMU-Benchmark/MMMU
# See repo README for evaluation harness
```

Dataset: https://huggingface.co/datasets/MMMU/MMMU

## Known Issues, Leakage & Gaming Risks

- Some questions are answerable from text alone – use MMMU-Pro for vision-required evaluation
- College-level expert knowledge required
- Rapid progress – check live leaderboard
- Prompt formatting affects scores significantly

## How to Interpret Scores

- Report per-discipline breakdown – aggregate hides domain failures
- As of **2026-07-06**, check the **MMMU Leaderboard** at https://mmmu-benchmark.github.io/ for current scores
- Scores below ~40% are near-random for many subjects
- Pair with a text-only benchmark to isolate the vision contribution
- Use the official eval script for comparable numbers

## Recommended Usage

- Use to compare vision-language models on expert knowledge tasks
- Prefer MMMU-Pro for vision-required questions only
- Report per-discipline breakdown
- Pair with MMLU-Pro to isolate vision contribution

## Related Benchmarks

- [MMLU-Pro](../general-llm/mmlu-pro.md) – text-only counterpart

## Relation to the Arsenal

Multimodal evaluation benchmark. Complements multimodal projects in `content/projects/` and multimodal build examples.

## Resources

- [Leaderboard](https://mmmu-benchmark.github.io/)
- [Dataset – Hugging Face](https://huggingface.co/datasets/MMMU/MMMU)
- [GitHub](https://github.com/MMMU-Benchmark/MMMU)
- Paper: Yue et al., "MMMU: A Massive Multi-discipline Multimodal Understanding and Reasoning Benchmark for Expert AGI", CVPR 2024

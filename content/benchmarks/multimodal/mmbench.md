---
id: mmbench
title: "MMBench"
entry_type: benchmark
category: multimodal
modality: [vision, text, multimodal]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "General visual understanding – ~3,000 multiple-choice questions across 20 ability dimensions, in English and Chinese, graded by a ChatGPT-as-judge."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "MC accuracy, reported per ability dimension and overall"
protocol:
  dataset: "MMBench (OpenCompass, 2023)"
  dataset_url: "https://github.com/open-compass/MMBench"
  evaluation_setup: "0-shot. Image + question + options → model selects an answer; a ChatGPT judge maps free-form output to the correct choice. ~3,000 questions, English (en) and Chinese (cn) test sets."
  version: null
leaderboards:
  - name: "MMBench Leaderboard (OpenCompass)"
    url: "https://mmbench.opencompass.net.cn/"
    last_checked: "2026-07-06"
  - name: "Open VLM Leaderboard"
    url: "https://opencompass-open-vlm-leaderboard.hf.space/"
    last_checked: "2026-07-06"
known_issues:
  - "Graded by a ChatGPT-as-judge, which can disagree with humans and with itself – the judge is a source of variance, not ground truth"
  - "Some questions are answerable from text alone without the image – pair with vision-required variants (e.g., MMBench-EN-v1.1 / MMMU-Pro) for stricter signal"
  - "Rapid progress – frontier VLMs exceeded ~85-88% by 2025-2026; the easy items are saturated"
  - "Prompt formatting / option ordering can shift scores – use the official eval script for comparable numbers"
recommended_usage:
  - "Use to compare general VLM perception/reasoning across 20 ability dimensions"
  - "Report per-dimension breakdown – aggregate hides modality-specific failure modes"
  - "Prefer vision-required variants when you need to isolate the visual contribution"
  - "Pair with MMMU (expert knowledge) and MathVista (visual math) for broader multimodal coverage"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [mmmu]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official MMBench repo/leaderboard, the Open VLM Leaderboard, and the primary paper. Judge-variance and vision-required protocol notes emphasized per expansion-PR policy."
tags: [evaluation, multimodal, vision, benchmark]
---

## Overview

MMBench is a large-scale multimodal understanding benchmark of ~3,000 multiple-choice questions spanning 20 ability dimensions (perception, OCR, reasoning, etc.), available in English and Chinese, with answers graded by a ChatGPT-as-judge.

## What it Measures (and what it doesn’t)

Measures: general visual understanding and reasoning across 20 ability dimensions, with image + text input.

Does not measure: video understanding, open-ended generation quality, or expert-domain knowledge (see MMMU / MathVista).

## Dataset & Protocol

- **Dataset:** MMBench – ~3,000 MC questions, 20 abilities, EN + CN
- **Dataset URL:** https://github.com/open-compass/MMBench
- **Evaluation setup:** 0-shot. Image + question → answer; ChatGPT-as-judge maps output to choice. Accuracy.
- **Version:** – (en / cn / v1.1 variants)

Official eval: https://github.com/open-compass/MMBench

## Metrics

- **accuracy** — higher is better — MC accuracy, per dimension + overall

## How to Run

```bash
git clone https://github.com/open-compass/MMBench
# See repo README for the evaluation harness and ChatGPT-judge setup.
```

## Known Issues, Leakage & Gaming Risks

- ChatGPT-as-judge is a variance source, not ground truth
- Some items answerable from text alone – use vision-required variants
- Rapid progress – easy items saturated
- Prompt/option-ordering affects scores

## How to Interpret Scores

- Report per-dimension breakdown – aggregate hides failure modes
- As of **2026-07-06**, check the live leaderboard – frontier VLMs cluster ~85-88%
- Use vision-required variants to isolate visual contribution
- Pair with MMMU and MathVista

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **MMBench** leaderboard for **MMBench** (protocol: **English test set v1.1, ChatGPT-as-judge accuracy**) shows frontier VLMs clustered around **85-88%** — e.g., Gemini-2.5-Pro at **88.3%** and GPT-5 at **86.6%** on the OpenVLM leaderboard (2025). This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Compare general VLM ability across 20 dimensions
- Report per-dimension breakdown
- Prefer vision-required variants for strict signal
- Pair with MMMU and MathVista

## Related Benchmarks

- [MMMU](./mmmu.md) – expert-level multimodal knowledge

## Relation to the Arsenal

Multimodal evaluation benchmark. Complements multimodal projects and build examples.

## Resources

- [Leaderboard – MMBench](https://mmbench.opencompass.net.cn/)
- [GitHub – MMBench](https://github.com/open-compass/MMBench)
- Paper: Liu et al., "MMBench: Is Your Multi-modal Model an All-around Player?", arXiv:2307.06281

---

*Last reviewed: 2026-07-06 by @maintainer*

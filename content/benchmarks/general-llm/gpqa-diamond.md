---
id: gpqa-diamond
title: "GPQA Diamond"
entry_type: benchmark
category: general-llm
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Graduate-level, Google-proof science reasoning in biology, physics, and chemistry – expert-written questions that non-experts cannot solve even with web access."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Exact match on 198 Diamond-split questions"
protocol:
  dataset: "GPQA Diamond"
  dataset_url: "https://huggingface.co/datasets/Idavidrein/gpqa"
  evaluation_setup: "0-shot, CoT allowed. 4-way multiple choice. Report accuracy on the 198-question Diamond subset."
  version: "Diamond"
leaderboards:
  - name: "Artificial Analysis GPQA Diamond"
    url: "https://artificialanalysis.ai/evaluations/gpqa-diamond"
    last_checked: "2026-07-06"
  - name: "GPQA Diamond – intuitionlabs overview"
    url: "https://intuitionlabs.ai/articles/gpqa-diamond-ai-benchmark"
    last_checked: "2026-07-06"
known_issues:
  - "Small test set (198 questions) – variance is higher than large benchmarks like MMLU-Pro"
  - "Rapid saturation: frontier models exceeded PhD-expert accuracy in 2025, now clustering above 90%"
  - "Contamination risk exists despite Google-proof authoring – check for train/test overlap in your model"
  - "Different CoT budgets / tool-use allowances produce incomparable numbers – always note the protocol"
recommended_usage:
  - "Use to stress-test scientific reasoning, not general knowledge"
  - "Require at least 3 independent runs or report confidence intervals due to small n=198"
  - "Pair with a broader benchmark like MMLU-Pro – GPQA alone is too narrow"
  - "Do not use undated scores – the leaderboard moved from ~40% (GPT-4, 2023) to >90% (2026)"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["mmlu-pro"]
enrichment_status: reviewed
tags: [evaluation, reasoning, benchmark]
---

## Overview

GPQA Diamond is a 198-question expert-written science reasoning benchmark (biology, physics, chemistry) designed to be "Google-proof" – skilled non-experts score ~34% even with 30+ minutes of web access, while PhD experts score ~65-70%.

## What it Measures (and what it doesn’t)

Measures graduate-level scientific reasoning under closed-book conditions. Questions require multi-step deduction, not recall.

Does not measure: coding, instruction following, general knowledge breadth, safety, or tool use. Small n=198 means higher variance than MMLU-Pro.

## Dataset & Protocol

- **Dataset:** GPQA Diamond – 198 questions
- **Dataset URL:** https://huggingface.co/datasets/Idavidrein/gpqa
- **Evaluation setup:** 0-shot, chain-of-thought allowed, 4-way multiple choice, accuracy
- **Version:** Diamond split

## Metrics

- **accuracy** — higher is better — exact match

## How to Run

```bash
# Via Hugging Face datasets
# from datasets import load_dataset
# ds = load_dataset("Idavidrein/gpqa", "gpqa_diamond")
# See the GPQA repo for the official evaluation harness
```

Dataset: https://huggingface.co/datasets/Idavidrein/gpqa

## Known Issues, Leakage & Gaming Risks

- Small test set (198 questions) – variance is higher than large benchmarks
- Rapid saturation: frontier models exceeded PhD-expert accuracy in 2025, now clustering above 90%
- Contamination risk exists despite Google-proof authoring
- Different CoT budgets / tool-use allowances produce incomparable numbers

## How to Interpret Scores

- As of **2026-07-06**, the **Artificial Analysis GPQA Diamond** leaderboard (standard 0-shot CoT protocol) shows frontier models clustering at **88–94%**.
- Human PhD experts score ~65–70% on this benchmark – models above ~75% are superhuman on this specific task distribution.
- A 1–2 point difference on n=198 is within sampling noise – require confidence intervals or multiple runs.
- Snapshot results go stale quickly – re-check the live leaderboard before making decisions.
- Scores without a stated CoT budget / tool-use policy are not comparable.

## Recommended Usage

- Use to stress-test scientific reasoning, not general knowledge
- Require at least 3 independent runs or report confidence intervals due to small n=198
- Pair with a broader benchmark like MMLU-Pro
- Do not use undated scores – the leaderboard moved from ~40% (2023) to >90% (2026)

## Related Benchmarks

- [MMLU-Pro](./mmlu-pro.md) – broader knowledge/reasoning, 12k questions

## Relation to the Arsenal

General LLM reasoning benchmark, evaluation-methods category. Pair with evaluation tooling in `content/tools/evaluation-and-observability/`.

## Resources

- [Dataset – Hugging Face](https://huggingface.co/datasets/Idavidrein/gpqa)
- [Artificial Analysis – GPQA Diamond leaderboard](https://artificialanalysis.ai/evaluations/gpqa-diamond)
- [GPQA paper – Rein et al., 2023](https://arxiv.org/abs/2311.12022)

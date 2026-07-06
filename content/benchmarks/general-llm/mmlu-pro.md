---
id: mmlu-pro
title: "MMLU-Pro"
entry_type: benchmark
category: general-llm
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Broad graduate-level knowledge and reasoning across 14 academic domains, with 10-option multiple choice to reduce guessing."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Macro-average across 14 subjects"
protocol:
  dataset: "MMLU-Pro"
  dataset_url: "https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro"
  evaluation_setup: "5-shot, CoT allowed. 10 answer choices per question. Reported as accuracy."
  version: "v1.1"
leaderboards:
  - name: "Artificial Analysis MMLU-Pro"
    url: "https://artificialanalysis.ai/evaluations/mmlu-pro"
    last_checked: "2026-07-06"
  - name: "BenchLM MMLU-Pro"
    url: "https://benchlm.ai/benchmarks/mmluPro"
    last_checked: "2026-07-06"
known_issues:
  - "Scores are saturating for frontier models (top cluster within ~1 point as of mid-2026); discrimination power is decreasing"
  - "Some questions leak into pretraining corpora; contamination cannot be fully ruled out"
  - "Multiple-choice format still allows partial guessing with 10 options"
  - "5-shot vs 0-shot variants exist in the wild – always check which protocol a reported number uses"
recommended_usage:
  - "Use as a broad knowledge/reasoning sanity check, not a sole model selection criterion"
  - "Compare models using the same few-shot/CoT protocol variant"
  - "Pair with a harder reasoning benchmark (e.g. GPQA) to differentiate frontier models"
  - "Re-check the live leaderboard before making decisions – rankings shift frequently"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: []
enrichment_status: reviewed
tags: [evaluation, reasoning, llm]
---

## Overview

MMLU-Pro is a more robust version of MMLU with 12,000 graduate-level questions across 14 disciplines, expanding answer choices from 4 to 10 and filtering trivial questions to better separate frontier models.

## What it Measures (and what it doesn’t)

Measures broad academic knowledge + reasoning across STEM, humanities, social sciences, and professional domains. Ten-option format reduces random guessing from 25% to 10%.

Does not measure: coding ability, tool use, long-context retrieval, instruction-following adherence, safety, or real-world task completion.

## Dataset & Protocol

- **Dataset:** MMLU-Pro, 12,000+ questions, 14 categories
- **Dataset URL:** https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro
- **Evaluation setup:** 5-shot (default in the official repo; some providers report 0-shot – check), chain-of-thought allowed, accuracy over 10-way multiple choice
- **Version:** v1.1

Run via: https://github.com/TIGER-AI-Lab/MMLU-Pro

## Metrics

- **accuracy** — higher is better — macro-average across 14 subjects

## How to Run

```bash
git clone https://github.com/TIGER-AI-Lab/MMLU-Pro
cd MMLU-Pro
# See repo README for the canonical evaluation harness command
```

Hugging Face dataset: `TIGER-Lab/MMLU-Pro`

## Known Issues, Leakage & Gaming Risks

- Scores are saturating for frontier models – top cluster within ~1 point as of mid-2026
- Some questions leak into pretraining corpora; contamination cannot be fully ruled out
- Multiple-choice format still allows partial guessing
- 5-shot vs 0-shot variants exist – always verify protocol before comparing numbers

## How to Interpret Scores

- Above ~85% is frontier-class as of mid-2026; the spread between top models is narrow
- A 1-2 point difference is usually within measurement noise – do not over-interpret small gaps
- Scores below ~65% indicate the model is not competitive for general knowledge QA
- Always check which few-shot/CoT variant was used – numbers are not comparable across variants
- Snapshot results go stale quickly – re-check the live leaderboard

## Recommended Usage

- Use as a broad knowledge/reasoning sanity check, not a sole model selection criterion
- Compare models using the same few-shot/CoT protocol variant
- Pair with a harder reasoning benchmark (e.g. GPQA) to differentiate frontier models
- Re-check the live leaderboard before making decisions

## Related Benchmarks

- GPQA Diamond – harder graduate-level reasoning, smaller expert-written set

## Relation to the Arsenal

General LLM capability benchmark. Use alongside architecture decision guides in `content/architectures/model-selection/choose-llm.md` and evaluation tooling in `content/tools/evaluation-and-observability/`.

## Resources

- [Dataset – Hugging Face](https://huggingface.co/datasets/TIGER-Lab/MMLU-Pro)
- [GitHub – evaluation harness](https://github.com/TIGER-AI-Lab/MMLU-Pro)
- [Artificial Analysis – MMLU-Pro leaderboard](https://artificialanalysis.ai/evaluations/mmlu-pro)
- [BenchLM – MMLU-Pro leaderboard](https://benchlm.ai/benchmarks/mmluPro)
- Paper: Wang et al., "MMLU-Pro: A More Robust and Challenging Multi-Task Language Understanding Benchmark", arXiv:2406.01574

---
id: mmlu
title: "MMLU"
entry_type: benchmark
category: general-llm
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Broad academic knowledge and reasoning across 57 subjects (STEM, humanities, social sciences, law, medicine) via 4-option multiple-choice questions."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Macro-average across 57 subjects"
protocol:
  dataset: "MMLU (Hendrycks et al., 2020)"
  dataset_url: "https://github.com/hendrycks/test"
  evaluation_setup: "5-shot, 4-option multiple choice, reported as accuracy. 0-shot and chain-of-thought variants also exist in the wild."
  version: null
leaderboards:
  - name: "Papers With Code — MMLU"
    url: "https://paperswithcode.com/dataset/mmlu"
    last_checked: "2026-07-06"
  - name: "Hugging Face Open LLM Leaderboard (MMLU)"
    url: "https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard"
    last_checked: "2026-07-06"
known_issues:
  - "Widely present in pretraining corpora; test-set contamination is a known, unquantified risk — reported scores may partly reflect memorization rather than capability"
  - "5-shot vs 0-shot vs CoT variants produce different numbers — always state the exact protocol when comparing models"
  - "Saturating for frontier models (above 90%); small gaps between top models are within measurement noise — weak discriminator at the top"
  - "4-option format allows ~25% guessing; multiple-choice measures recognition, not open-ended reasoning"
recommended_usage:
  - "Use as a broad general-knowledge sanity check, not a sole model-selection criterion"
  - "Always compare models under the same few-shot/CoT protocol"
  - "Pair with a harder reasoning benchmark (GPQA, MMLU-Pro) to separate frontier models"
  - "Re-check the live leaderboard before decisions — rankings shift frequently"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [mmlu-pro]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via official dataset repo, Papers With Code / HF leaderboards, and the primary paper. Contamination and protocol-variant notes emphasized per expansion-PR policy."
tags: [evaluation, llm, reasoning]
---

## Overview

MMLU (Massive Multitask Language Understanding) is the most widely cited general-knowledge LLM benchmark: 57 multiple-choice subjects from elementary math to professional law and medicine, scored with 5-shot prompting.

## What it Measures (and what it doesn’t)

Measures: broad academic knowledge + reasoning across diverse disciplines via 4-option multiple choice.

Does not measure: coding, tool use, long-context retrieval, instruction-following, safety, or open-ended generation quality.

## Dataset & Protocol

- **Dataset:** MMLU — 57 subjects, ~15,900 questions
- **Dataset URL:** https://github.com/hendrycks/test
- **Evaluation setup:** 5-shot (default), 4-option multiple choice, accuracy; 0-shot and CoT variants exist
- **Version:** – (unversioned original; MMLU-Pro is the separate harder successor)

## Metrics

- **accuracy** — higher is better — macro-average across 57 subjects

## How to Run

```bash
# LM Evaluation Harness
lm_eval --model hf \
  --tasks mmlu \
  --num_fewshot 5
```

## Known Issues, Leakage & Gaming Risks

- Present in many pretraining corpora — contamination risk is real and largely unmeasured
- 5-shot / 0-shot / CoT variants are not comparable — always label the protocol
- Saturating above 90% for frontier models — small gaps are noise
- 4-option format allows guessing — measures recognition, not open-ended skill

## How to Interpret Scores

- Above ~85% is strong general-knowledge performance as of mid-2026; top-cluster spread is narrow
- A 1-2 point gap is usually within noise — do not over-interpret
- Always check the few-shot/CoT variant used

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **Papers With Code / Hugging Face Open LLM Leaderboard** for **MMLU** (protocol: **5-shot**) shows frontier models clustered above **90%** — e.g., o3 at 91.4% and Gemini 2.5 Pro at 90.3% were reported in April 2026 tracking. This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Broad general-knowledge sanity check, not a sole selection criterion
- Compare models under the same few-shot/CoT protocol
- Pair with GPQA / MMLU-Pro for harder reasoning signal
- Re-check the live leaderboard before decisions

## Related Benchmarks

- [MMLU-Pro](./mmlu-pro.md) — harder 10-option successor, less guessable

## Relation to the Arsenal

General LLM capability benchmark. Use alongside `content/architectures/model-selection/choose-llm.md` and evaluation tooling in `content/tools/evaluation-and-observability/`.

## Resources

- [Dataset – GitHub (hendrycks/test)](https://github.com/hendrycks/test)
- [Paper – Hendrycks et al., "Measuring Massive Multitask Language Understanding", arXiv:2009.03300](https://arxiv.org/abs/2009.03300)
- [Papers With Code – MMLU](https://paperswithcode.com/dataset/mmlu)
- [Hugging Face Open LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard)

---

*Last reviewed: 2026-07-06 by @maintainer*

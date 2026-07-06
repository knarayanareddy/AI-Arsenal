---
id: truthfulqa
title: "TruthfulQA"
entry_type: benchmark
category: general-llm
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Whether a model mimics human falsehoods — 817 adversarial questions across 38 categories designed so humans would answer falsely."
metrics:
  - name: "mc1"
    direction: higher
    notes: "Unnormalized single-true multiple-choice accuracy"
  - name: "mc2"
    direction: higher
    notes: "Normalized multi-true multiple-choice accuracy"
protocol:
  dataset: "TruthfulQA (Lin et al., 2021)"
  dataset_url: "https://github.com/sylinrl/TruthfulQA"
  evaluation_setup: "Generation (greedy decoding) or multiple-choice (mc1/mc2). 817 questions across 38 categories (health, law, finance, politics, etc.)."
  version: null
leaderboards:
  - name: "TruthfulQA GitHub"
    url: "https://github.com/sylinrl/TruthfulQA"
    last_checked: "2026-07-06"
  - name: "EleutherAI truthful_qa_mc (Hugging Face)"
    url: "https://huggingface.co/datasets/EleutherAI/truthful_qa_mc"
    last_checked: "2026-07-06"
known_issues:
  - "Adversarial questions can be gamed by models that memorize the 38 category patterns rather than reasoning about truth"
  - "Generation vs multiple-choice (mc1/mc2) measure different things — mix them only deliberately, and report both"
  - "Some questions age poorly (e.g., claims about current events) — re-verify periodically"
  - "High %-true can be inflated by refusal-style answers; pair with informativeness, not truth alone"
recommended_usage:
  - "Use to probe truthfulness / hallucination tendency, especially for chat models"
  - "Report mc1 and mc2 separately, and pair with informativeness"
  - "Treat as an adversarial stress test, not a general-knowledge benchmark"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [mmlu-pro]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via official dataset repo, EleutherAI HF mirror, and the primary paper. Protocol-variant and aging notes emphasized per expansion-PR policy."
tags: [evaluation, llm, reasoning]
---

## Overview

TruthfulQA probes whether a model imitates human falsehoods: 817 questions crafted so that a human would answer falsely due to a misconception, scored on truthfulness rather than correctness.

## What it Measures (and what it doesn’t)

Measures: tendency to produce false or misleading claims when prompted with adversarial / misconception-laden questions.

Does not measure: general knowledge accuracy, reasoning depth, or factuality on non-adversarial inputs (pair with a knowledge benchmark for that).

## Dataset & Protocol

- **Dataset:** TruthfulQA — 817 questions, 38 categories
- **Dataset URL:** https://github.com/sylinrl/TruthfulQA
- **Evaluation setup:** generation (greedy) or multiple-choice (mc1/mc2)
- **Version:** –

## Metrics

- **mc1** — higher is better — unnormalized single-true accuracy
- **mc2** — higher is better — normalized multi-true accuracy

## How to Run

```bash
lm_eval --model hf \
  --tasks truthfulqa_mc \
  --num_fewshot 0
```

## Known Issues, Leakage & Gaming Risks

- Category patterns can be memorized and gamed
- Generation vs MC measure different things — report both
- Some questions age (current-event claims) — re-verify
- Refusals can inflate %-true — pair with informativeness

## How to Interpret Scores

- Above ~85% MC2 indicates strong truthfulness as of mid-2026; exact ranking shifts — re-check the live repo
- mc1 and mc2 are not interchangeable — report both
- High truthfulness on adversarial sets does not imply general factuality

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **TruthfulQA GitHub** leaderboard for **TruthfulQA** (protocol: **multiple-choice, mc2**) shows strong models in the **~85-90% MC2** range — exact ranking shifts, so re-check the live repository. This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Probe truthfulness / hallucination tendency, especially for chat models
- Report mc1 and mc2 separately, and pair with informativeness
- Treat as an adversarial stress test, not a knowledge benchmark

## Related Benchmarks

- [MMLU-Pro](./mmlu-pro.md) — broad knowledge; complements truthfulness testing

## Relation to the Arsenal

Truthfulness / hallucination benchmark. Pair with safety tooling in `content/tools/evaluation-and-observability/` and the evaluation-strategy guides in `content/architectures/evaluation-strategy/`.

## Resources

- [Dataset – GitHub (sylinrl/TruthfulQA)](https://github.com/sylinrl/TruthfulQA)
- [Hugging Face – EleutherAI/truthful_qa_mc](https://huggingface.co/datasets/EleutherAI/truthful_qa_mc)
- [Paper – Lin et al., "TruthfulQA: Measuring How Models Mimic Human Falsehoods", arXiv:2109.07958](https://arxiv.org/abs/2109.07958)

---

*Last reviewed: 2026-07-06 by @maintainer*

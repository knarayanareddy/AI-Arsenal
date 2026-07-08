---
id: hle
title: "Humanity's Last Exam (HLE)"
entry_type: benchmark
category: general-llm
modality: [text, multimodal]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Frontier-level academic reasoning across 100+ subjects – 2,500 expert-written questions designed to remain hard after MMLU-class benchmarks saturated."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Exact-match / judge-graded accuracy over 2,500 questions; calibration error also reported"
protocol:
  dataset: "Humanity's Last Exam"
  dataset_url: "https://huggingface.co/datasets/cais/hle"
  evaluation_setup: "0-shot. Mix of multiple-choice and exact-match short answer; ~14% require image understanding. Official judge prompts in the CAIS repo."
  version: "2025 release (2,500 public questions; private held-out set retained)"
leaderboards:
  - name: "Official HLE leaderboard"
    url: "https://lastexam.ai"
    last_checked: "2026-07-08"
known_issues:
  - "Frontier models progressed from <10% (early 2025) to 25-40%+ within a year – scores stale quickly; always date them"
  - "A private held-out set guards against contamination, but the 2,500 public questions can leak into training data"
  - "Judge-graded short answers introduce grader-model dependence for non-multiple-choice items"
  - "Question difficulty is deliberately adversarial – performance does not translate to everyday task quality"
recommended_usage:
  - "Use as a frontier-capability ceiling check, not a product-quality metric"
  - "Report accuracy and calibration error together – high-confidence wrong answers are the failure mode HLE surfaces"
  - "Pair with GPQA Diamond and MMLU-Pro to separate 'expert reasoning' from 'knowledge breadth'"
  - "Always state model version and date – the leaderboard moves monthly"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["gpqa-diamond", "mmlu-pro"]
enrichment_status: draft
enrichment_notes: "Authored from the HLE paper (arXiv:2501.14249), official site, and HF dataset card; URLs verified 2026-07-08."
tags: [evaluation, reasoning, benchmark]
---

## Overview

Humanity's Last Exam (HLE) is a 2,500-question benchmark assembled by CAIS and Scale AI from ~1,000 subject experts across 100+ fields, built explicitly because MMLU-class benchmarks saturated above 90%. It is positioned as the "final closed-ended academic benchmark" – questions are unambiguous, exact-match gradable, and hard enough that frontier models scored under 10% at release.

## What it Measures (and what it doesn’t)

Measures frontier academic reasoning: graduate-to-research-level questions in math, physics, biology, humanities, and more, including ~14% multimodal items. Also surfaces calibration – models are scored on whether their stated confidence matches accuracy.

Does not measure: open-ended generation, agentic/tool-use ability, coding, safety, or real-world task usefulness. It is a capability ceiling probe, not a product metric.

## Dataset & Protocol

- **Dataset:** Humanity's Last Exam – 2,500 public questions (private held-out set retained by organizers)
- **Dataset URL:** https://huggingface.co/datasets/cais/hle
- **Evaluation setup:** 0-shot; multiple-choice and exact-match short answer; official judge prompts for grading; calibration error reported alongside accuracy
- **Version:** 2025 release

## Metrics

- **accuracy** — higher is better — exact match / judge-graded
- **calibration error** — lower is better — reported alongside accuracy in official results

## How to Run

```bash
# Load the dataset
# from datasets import load_dataset
# ds = load_dataset("cais/hle", split="test")
# Official evaluation code and judge prompts:
# https://github.com/centerforaisafety/hle
```

## Known Issues, Leakage & Gaming Risks

- Public questions can leak into training corpora; the private held-out split is the contamination canary – large public/private gaps indicate leakage
- Judge-graded short answers depend on the grader model for non-MC items
- Rapid score movement (sub-10% to 25-40%+ within a year) makes undated comparisons meaningless
- Adversarially hard questions reward narrow retrieval of obscure facts as well as reasoning

## How to Interpret Scores

- As of **2026-07-08**, frontier reasoning models score roughly **25-40%+** on the official leaderboard (https://lastexam.ai) – nothing is close to saturation.
- Treat single-digit differences cautiously; grading includes judge-model variance on short-answer items.
- High accuracy with high calibration error means confidently-wrong behavior – arguably worse in production than lower accuracy with good calibration.

## Recommended Usage

- Use as a frontier-capability ceiling check when comparing top-tier reasoning models
- Report accuracy with calibration error, and date every number
- Pair with GPQA Diamond (science depth) and MMLU-Pro (knowledge breadth) for a fuller picture
- Do not use to choose models for ordinary product workloads – it is deliberately unrepresentative

## Related Benchmarks

- [GPQA Diamond](./gpqa-diamond.md) – graduate-level science reasoning, smaller and saturating
- [MMLU-Pro](./mmlu-pro.md) – broad knowledge/reasoning, the benchmark HLE was built to succeed

## Relation to the Arsenal

Frontier reasoning benchmark in the general-llm category. Pair with evaluation harnesses in `content/tools/evaluation-and-observability/` when reproducing published numbers.

## Resources

- [Official site and leaderboard](https://lastexam.ai)
- [Dataset – Hugging Face](https://huggingface.co/datasets/cais/hle)
- [HLE paper – Phan et al., 2025](https://arxiv.org/abs/2501.14249)

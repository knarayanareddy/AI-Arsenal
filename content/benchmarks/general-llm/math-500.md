---
id: math-500
title: "MATH-500"
entry_type: benchmark
category: general-llm
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Competition mathematics problem solving – a 500-problem stratified subset of the MATH dataset, popularized as the standard quick math eval for reasoning models."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Exact match on final boxed answer, typically pass@1 with greedy or low-temperature sampling"
protocol:
  dataset: "MATH-500 (subset of Hendrycks MATH)"
  dataset_url: "https://huggingface.co/datasets/HuggingFaceH4/MATH-500"
  evaluation_setup: "0-shot chain-of-thought; final answer extracted from \\boxed{}; exact match against gold answer. Selection follows the OpenAI 'Let's Verify Step by Step' test split."
  version: "500-problem split (levels 1-5 across 7 subjects)"
leaderboards:
  - name: "MATH-500 dataset card (reference results linked)"
    url: "https://huggingface.co/datasets/HuggingFaceH4/MATH-500"
    last_checked: "2026-07-08"
known_issues:
  - "Near-saturated for frontier reasoning models (95%+ as of 2025-2026); discriminative mainly for small/distilled models"
  - "Answer-extraction and equivalence-checking (e.g. 0.5 vs 1/2) differ across harnesses and shift scores several points"
  - "The parent MATH dataset has circulated since 2021 – contamination in modern training corpora is likely"
  - "500 problems → ±2-3 point sampling noise at pass@1"
recommended_usage:
  - "Use as a fast math-reasoning smoke test for small and mid-size models, especially R1-style distills"
  - "Report the answer-equivalence checker used (sympy-based vs string match)"
  - "For frontier models, escalate to AIME-style competition sets – MATH-500 no longer separates them"
  - "Prefer pass@1 with stated temperature; maj@k inflates comparisons if unlabeled"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["gsm8k", "gpqa-diamond"]
enrichment_status: draft
enrichment_notes: "Authored from the HF dataset card and Hendrycks MATH paper (arXiv:2103.03874); URLs verified 2026-07-08."
tags: [evaluation, reasoning, benchmark]
---

## Overview

MATH-500 is the 500-problem test split of the Hendrycks MATH competition-math dataset, selected in OpenAI's "Let's Verify Step by Step" work and since adopted as the community-standard quick math benchmark – it is the "MATH" number reported by DeepSeek-R1, o1-class models, and most reasoning-model releases.

## What it Measures (and what it doesn’t)

Measures multi-step competition mathematics (algebra, geometry, number theory, precalculus, etc., levels 1-5) with chain-of-thought and exact final-answer grading.

Does not measure: proof writing, formal rigor, applied/word-problem robustness, or anything beyond high-school competition scope. Saturation means it no longer differentiates frontier reasoning models.

## Dataset & Protocol

- **Dataset:** MATH-500 – 500 problems stratified across subjects and difficulty
- **Dataset URL:** https://huggingface.co/datasets/HuggingFaceH4/MATH-500
- **Evaluation setup:** 0-shot CoT; extract \boxed{} answer; exact/equivalence match
- **Version:** standard 500-problem split

## Metrics

- **accuracy** — higher is better — pass@1 exact match on final answer

## How to Run

```bash
# from datasets import load_dataset
# ds = load_dataset("HuggingFaceH4/MATH-500", split="test")
# Most harnesses include it: lm-evaluation-harness (`math_500`), lighteval, evalchemy
```

## Known Issues, Leakage & Gaming Risks

- Contamination: parent dataset public since 2021; some releases show suspicious MATH-500-vs-fresh-competition gaps
- Equivalence-checking differences (symbolic vs string) move scores several points between harnesses
- maj@k / best-of-n numbers reported as if pass@1 inflate comparisons
- n=500 gives meaningful sampling noise; single-run 1-2 point deltas are not signal

## How to Interpret Scores

- As of **2026-07-08**, frontier reasoning models cluster at **95%+**, mid-size distills at 80-95%, and non-reasoning small models far lower – the useful discriminative band is below ~95%.
- Compare only numbers produced with the same equivalence checker and sampling setup.
- A large MATH-500-vs-AIME gap for the same model suggests memorization rather than transferable math ability.

## Recommended Usage

- Default quick math eval when iterating on fine-tunes and distills
- Cross-check against a fresh competition set (e.g. current-year AIME) before claiming math capability
- State sampling temperature, n, and checker in every report
- Do not use as a frontier-model differentiator – it is saturated there

## Related Benchmarks

- [GSM8K](./gsm8k.md) – easier grade-school math, fully saturated
- [GPQA Diamond](./gpqa-diamond.md) – expert science reasoning with remaining headroom

## Relation to the Arsenal

Standard math-reasoning benchmark in the general-llm category; referenced by training-and-alignment projects (R1-style RL pipelines) and runnable via harnesses in `content/tools/evaluation-and-observability/`.

## Resources

- [MATH-500 – Hugging Face](https://huggingface.co/datasets/HuggingFaceH4/MATH-500)
- [MATH paper – Hendrycks et al., 2021](https://arxiv.org/abs/2103.03874)

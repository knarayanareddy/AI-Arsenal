---
id: simpleqa
title: "SimpleQA"
entry_type: benchmark
category: general-llm
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: mixed
what_it_measures: "Short-form factuality and hallucination propensity – 4,326 adversarially-collected fact questions with single verifiable answers, scored as correct / incorrect / not attempted."
metrics:
  - name: "correct"
    direction: higher
    notes: "Fraction of questions answered correctly (graded by a judge model against gold answers)"
  - name: "incorrect (hallucination rate)"
    direction: lower
    notes: "Fraction answered confidently but wrongly – the headline hallucination signal"
  - name: "not attempted"
    direction: higher
    notes: "Declining to answer is better than answering wrongly; used to compute calibration-style F-score"
protocol:
  dataset: "SimpleQA"
  dataset_url: "https://github.com/openai/simple-evals"
  evaluation_setup: "0-shot, no tools/browsing. Judge model grades each response as correct, incorrect, or not attempted against a single gold answer."
  version: "2024 release (4,326 questions)"
leaderboards:
  - name: "OpenAI simple-evals (reference results in repo)"
    url: "https://github.com/openai/simple-evals"
    last_checked: "2026-07-08"
known_issues:
  - "Judge-model grading introduces grader dependence; borderline answers can flip between graders"
  - "Adversarially collected against 2024-era GPT-4 – difficulty is calibrated to that family and transfers unevenly"
  - "Closed-book by design: tool-augmented systems trivially saturate it, so it cannot compare agentic setups"
  - "Public gold answers mean contamination accumulates in newer training corpora"
recommended_usage:
  - "Read the three-way split, not just accuracy – a model that answers less but hallucinates less is often preferable"
  - "Use to compare hallucination propensity across model versions under identical no-tool conditions"
  - "Do not evaluate browsing/RAG systems on it – use BrowseComp or RAG benchmarks instead"
  - "Date every score and note the grader model used"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["truthfulqa", "hle"]
enrichment_status: draft
enrichment_notes: "Authored from the SimpleQA paper (arXiv:2411.04368) and the openai/simple-evals repo; URLs verified 2026-07-08."
tags: [evaluation, llm, benchmark]
---

## Overview

SimpleQA is OpenAI's 4,326-question short-form factuality benchmark. Each question has a single, indisputable, time-invariant answer, and questions were adversarially collected so that 2024-era GPT-4 failed them. Its distinctive feature is three-way grading: correct, incorrect, or not attempted – making it a hallucination-propensity measure, not just an accuracy test.

## What it Measures (and what it doesn’t)

Measures parametric factual recall and, more importantly, whether a model knows what it doesn't know: the incorrect-vs-not-attempted split exposes confident hallucination.

Does not measure: reasoning, long-form generation quality, retrieval/browsing ability (tools are banned), or knowledge freshness beyond its collection date.

## Dataset & Protocol

- **Dataset:** SimpleQA – 4,326 fact-seeking questions with gold answers
- **Dataset URL:** https://github.com/openai/simple-evals
- **Evaluation setup:** 0-shot, closed book, no tools; judge model grades correct / incorrect / not attempted
- **Version:** 2024 release

## Metrics

- **correct** — higher is better
- **incorrect** — lower is better — the hallucination-rate headline
- **not attempted** — declining beats hallucinating; combined into an F-score in the paper

## How to Run

```bash
git clone https://github.com/openai/simple-evals
# python -m simple-evals.simple_evals --eval=simpleqa --model=<model>
# Grading requires a judge model API key; see repo README
```

## Known Issues, Leakage & Gaming Risks

- Judge-grading variance: different grader models can shift scores a few points
- Gaming risk: a model tuned to abstain aggressively scores a low hallucination rate while being unhelpful – always read all three numbers
- Public dataset → contamination accumulates in post-2024 training corpora
- Adversarial collection against one model family biases difficulty distribution

## How to Interpret Scores

- As of **2026-07-08**, frontier models still answer a substantial fraction incorrectly when forced closed-book – SimpleQA remains unsaturated (reference results in the simple-evals repo).
- A high correct-rate with a high incorrect-rate signals overconfidence; prefer models whose residual is "not attempted".
- Scores are only comparable under identical no-tool, same-grader conditions.

## Recommended Usage

- Track hallucination-rate regressions across model upgrades in your stack
- Use as a closed-book baseline before measuring how much retrieval improves factuality
- Do not report accuracy alone – the three-way split is the point of the benchmark
- Pair with TruthfulQA for misconception-driven errors vs. pure recall gaps

## Related Benchmarks

- [TruthfulQA](./truthfulqa.md) – misconception-targeted factuality
- [HLE](./hle.md) – frontier-difficulty academic reasoning

## Relation to the Arsenal

General-LLM factuality benchmark; pairs with hallucination-detection tooling in `content/tools/evaluation-and-observability/` and RAG evaluation entries.

## Resources

- [openai/simple-evals – dataset and harness](https://github.com/openai/simple-evals)
- [SimpleQA paper – Wei et al., 2024](https://arxiv.org/abs/2411.04368)

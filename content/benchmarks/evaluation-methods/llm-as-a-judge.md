---
id: llm-as-a-judge
title: "LLM-as-a-Judge"
entry_type: benchmark
category: evaluation-methods
modality: [text]
status: active
protocol_confidence: ambiguous
score_interpretation: mixed
what_it_measures: "Meta-evaluation – how well LLM judges agree with human preferences on open-ended model outputs. Not a single fixed dataset – a methodology family (MT-Bench, AlpacaEval, etc.) with calibration protocols."
metrics:
  - name: "human_agreement_rate"
    direction: higher
    notes: "Agreement between LLM judge and human annotators"
  - name: "pairwise_accuracy"
    direction: higher
    notes: "Accuracy at correctly ranking response pairs"
  - name: "position_bias"
    direction: lower
    notes: "Bias toward first/second position in pairwise comparison"
protocol:
  dataset: "MT-Bench / AlpacaEval / various judge calibration sets"
  dataset_url: "https://huggingface.co/datasets/lmsys/mt_bench_human_judgments"
  evaluation_setup: "LLM judge scores/ranks model outputs on open-ended prompts. Compare judge decisions to human gold labels. Metrics: human agreement rate, pairwise accuracy, position/length/self-enhancement bias. Protocol varies significantly across implementations – see known_issues."
  version: null
leaderboards:
  - name: "MT-Bench – LMSYS"
    url: "https://huggingface.co/datasets/lmsys/mt_bench_human_judgments"
    last_checked: "2026-07-06"
  - name: "AlpacaEval Leaderboard"
    url: "https://tatsu-lab.github.io/alpaca_eval/"
    last_checked: "2026-07-06"
known_issues:
  - "Protocol ambiguity is the norm – judge prompt, temperature, pairwise vs absolute scoring, tie handling all vary across implementations – scores are NOT comparable across different judge setups"
  - "Position bias: judges favor the first (or second) response in pairwise comparisons – must swap order and average"
  - "Length bias: judges favor longer responses – calibrate or control for length"
  - "Self-enhancement bias: a model judging its own outputs (or same-family outputs) inflates scores"
  - "No single canonical 'LLM-as-a-Judge benchmark' – this entry documents the evaluation methodology family, not one fixed dataset"
recommended_usage:
  - "Calibrate your judge against human labels on a sample from YOUR task distribution before trusting automated scores"
  - "Always swap response order in pairwise judgments and average – mitigates position bias"
  - "Report judge model, prompt version, temperature, and scoring rubric alongside any LLM-judged results – otherwise numbers are meaningless"
  - "Use LLM-as-judge for rapid iteration / ranking, not as a sole production quality gate – pair with human eval or golden-set regression tests"
  - "Track judge drift over time – updating the judge model changes scores even if candidate models stay constant"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["mmlu-pro", "ifeval"]
enrichment_status: draft
tags: [evaluation, llm]
---

## Overview

LLM-as-a-Judge is a meta-evaluation methodology – using a strong LLM (e.g. GPT-4, Claude) to score or rank open-ended model outputs where rule-based metrics fail. Popularized by MT-Bench / AlpacaEval. Not a single fixed benchmark – a family of protocols with shared failure modes.

## What it Measures (and what it doesn’t)

Measures: agreement between an LLM judge and human preferences on open-ended responses – pairwise ranking accuracy, absolute scoring correlation.

Does not measure: factual correctness directly (the judge can hallucinate), safety, or performance on closed-form tasks where exact-match metrics exist (use those instead).

## Dataset & Protocol

- **Dataset:** MT-Bench / AlpacaEval / various judge calibration sets – no single canonical dataset
- **Dataset URL:** https://huggingface.co/datasets/lmsys/mt_bench_human_judgments
- **Evaluation setup:** LLM judge scores/ranks model outputs on open-ended prompts. Compare judge decisions to human gold labels. Protocol varies significantly – judge prompt, temperature, pairwise vs absolute, tie handling – see known_issues.
- **Version:** – protocol is evolving

## Metrics

- **human_agreement_rate** — higher is better
- **pairwise_accuracy** — higher is better
- **position_bias** — lower is better

## How to Run

```bash
# MT-Bench judge harness
git clone https://github.com/lm-sys/FastChat
cd FastChat/fastchat/llm_judge
# See repo for judge invocation – prompt template matters enormously
```

- MT-Bench judgments: https://huggingface.co/datasets/lmsys/mt_bench_human_judgments
- AlpacaEval: https://tatsu-lab.github.io/alpaca_eval/

## Known Issues, Leakage & Gaming Risks

- Protocol ambiguity is the norm – judge prompt, temperature, pairwise vs absolute scoring all vary – scores NOT comparable across setups
- Position bias – judges favor first/second position – swap order and average
- Length bias – judges favor longer responses
- Self-enhancement bias – model judging its own outputs inflates scores
- No single canonical "LLM-as-a-Judge benchmark" – this documents a methodology family

## How to Interpret Scores

- Human agreement rate of 80%+ is considered strong for an LLM judge – expect 65-80% typical, never 100%
- Always check: which judge model? which prompt version? pairwise or absolute? temperature?
- Scores from different judge setups are **not comparable** – this is the #1 mistake
- As of **2026-07-06**, check **MT-Bench human judgments** and **AlpacaEval leaderboard** for current calibration data – judge model recommendations evolve
- Track judge drift – updating the judge model changes scores even if candidates stay constant

## Recommended Usage

- Calibrate your judge against human labels on YOUR task distribution
- Always swap response order in pairwise judgments and average
- Report judge model, prompt version, temperature, scoring rubric alongside results
- Use for rapid iteration / ranking, not as sole production quality gate
- Track judge drift over time

## Related Benchmarks

- [MMLU-Pro](../general-llm/mmlu-pro.md)
- [IFEval](../general-llm/ifeval.md)

## Relation to the Arsenal

Evaluation-methods benchmark – meta-evaluation. Complements evaluation tools in `content/tools/evaluation-and-observability/`, evaluation tips in `content/tips-and-tricks/evaluation/`, and the evaluation-strategy architecture guides.

## Resources

- [MT-Bench – human judgments](https://huggingface.co/datasets/lmsys/mt_bench_human_judgments)
- [AlpacaEval Leaderboard](https://tatsu-lab.github.io/alpaca_eval/)
- Paper: Zheng et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena", NeurIPS 2023 – https://arxiv.org/abs/2306.05685

---
id: alpacaeval
title: "AlpacaEval 2.0 (Length-Controlled)"
entry_type: benchmark
category: evaluation-methods
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Automated instruction-following quality via LLM-as-judge – win rate against a reference model on 805 prompts, with a length-controlled correction that neutralizes the verbosity bias of naive judge win rates."
metrics:
  - name: "length-controlled win rate"
    direction: higher
    notes: "Win rate vs. reference (GPT-4-class) after regressing out response-length effects; the headline LC metric"
  - name: "raw win rate"
    direction: higher
    notes: "Uncorrected judge win rate – retained for comparison, biased toward longer answers"
protocol:
  dataset: "AlpacaEval (805 instructions)"
  dataset_url: "https://github.com/tatsu-lab/alpaca_eval"
  evaluation_setup: "Generate answers to 805 prompts; a judge model compares each against the reference model's answer; length-controlled regression removes verbosity bias. Reports LC win rate with ~0.98 correlation to Chatbot Arena at the time of release."
  version: "2.0 with length control (2024)"
leaderboards:
  - name: "AlpacaEval leaderboard"
    url: "https://tatsu-lab.github.io/alpaca_eval/"
    last_checked: "2026-07-08"
known_issues:
  - "Judge-model bias: shares blind spots with the judge (style, formatting, self-preference)"
  - "Length control corrects verbosity but not all stylistic gaming (headers, hedging, flattery)"
  - "805 single-turn prompts – no multi-turn, no grounded factuality, no reasoning depth"
  - "Reference-model and judge-model version changes shift the whole leaderboard; numbers are only comparable within a fixed configuration"
recommended_usage:
  - "Always report the length-controlled number, never the raw win rate alone"
  - "Use for fast, cheap ranking of instruction-tuned/chat models during development"
  - "Confirm promising models on a human-preference benchmark (Chatbot Arena) before shipping claims"
  - "Fix judge and reference model versions across all compared runs"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["mt-bench", "arena-hard", "llm-as-a-judge"]
enrichment_status: draft
enrichment_notes: "Authored from the length-controlled AlpacaEval paper (arXiv:2404.04475) and repo/leaderboard; URLs verified 2026-07-08."
tags: [evaluation, llm]
---

## Overview

AlpacaEval is a fast, automatic instruction-following benchmark: a judge model compares a candidate's answers to a reference model's over 805 prompts and reports a win rate. Its 2.0 length-controlled (LC) variant is the important contribution – it statistically removes the verbosity bias whereby judges prefer longer answers, raising correlation with human Chatbot Arena rankings to ~0.98 at release and making the metric much harder to game by padding.

## What it Measures (and what it doesn’t)

Measures single-turn instruction-following and response quality as judged by an LLM, de-biased for length.

Does not measure: factual correctness, multi-turn coherence, reasoning depth, safety, or grounded/tool-augmented ability. It ranks "which answer a judge prefers", which correlates with but is not identical to real utility.

## Dataset & Protocol

- **Dataset:** AlpacaEval – 805 instructions
- **Dataset URL:** https://github.com/tatsu-lab/alpaca_eval
- **Evaluation setup:** judge compares candidate vs. reference; length-controlled regression yields LC win rate
- **Version:** 2.0 length-controlled (2024)

## Metrics

- **length-controlled win rate** — higher is better — the headline metric
- **raw win rate** — higher is better — verbosity-biased; report only alongside LC

## How to Run

```bash
pip install alpaca-eval
# export OPENAI_API_KEY=...   # for the judge model
# alpaca_eval --model_outputs <your_outputs.json>
# Produces LC and raw win rates vs. the configured reference
```

## Known Issues, Leakage & Gaming Risks

- Self-preference / style bias inherited from the judge model
- LC removes length gaming but not formatting/tone gaming
- Single-turn, ungrounded – blind to factuality and multi-turn behavior
- Changing judge or reference model version invalidates cross-run comparisons

## How to Interpret Scores

- Use the LC win rate. As of **2026-07-08**, top chat models exceed 50% LC win rate against the reference; raw win rates run higher and are misleading.
- Correlation with human preference is high but not perfect – a 1-2 point LC edge is not a decisive quality claim.
- Numbers are only comparable when judge model, reference model, and prompt set versions all match.

## Recommended Usage

- Rapid iteration signal for instruction/chat fine-tunes
- Report LC win rate with judge+reference versions and date
- Validate leaders on Chatbot Arena / human eval before external claims
- Do not use as a factuality or reasoning benchmark

## Related Benchmarks

- [MT-Bench](./mt-bench.md) – multi-turn LLM-as-judge scoring
- [Arena-Hard](./arena-hard.md) – harder auto-eval with high Arena correlation
- [LLM-as-a-Judge](./llm-as-a-judge.md) – the underlying evaluation method and its pitfalls

## Relation to the Arsenal

Automated instruction-following benchmark in the evaluation-methods category; pairs with LLM-as-judge tooling in `content/tools/evaluation-and-observability/` and alignment projects that report AlpacaEval numbers.

## Resources

- [AlpacaEval leaderboard](https://tatsu-lab.github.io/alpaca_eval/)
- [alpaca_eval repo](https://github.com/tatsu-lab/alpaca_eval)
- [Length-controlled AlpacaEval paper – Dubois et al., 2024](https://arxiv.org/abs/2404.04475)

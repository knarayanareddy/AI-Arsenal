---
id: mt-bench
title: "MT-Bench"
entry_type: benchmark
category: evaluation-methods
modality: [text]
status: active
protocol_confidence: ambiguous
score_interpretation: mixed
what_it_measures: "Meta-evaluation of chat/instruction-following – 80 two-turn open-ended questions across 8 categories, graded by an LLM judge (originally GPT-4) on a 1-10 scale."
metrics:
  - name: "mt_bench_score"
    direction: higher
    notes: "Average GPT-4 judge score (1-10) across both turns"
  - name: "judge_agreement"
    direction: higher
    notes: "Agreement between the judge and human preferences"
protocol:
  dataset: "MT-Bench (LMSYS, 2023)"
  dataset_url: "https://github.com/lm-sys/FastChat"
  evaluation_setup: "Model answers 80 two-turn conversational questions; an LLM judge (default GPT-4) scores each turn 1-10. Report average score and per-category breakdown. Protocol varies with judge model/version."
  version: null
leaderboards:
  - name: "MT-Bench – LMSYS"
    url: "https://github.com/lm-sys/FastChat/tree/main/fastchat/llm_judge"
    last_checked: "2026-07-06"
  - name: "MT-Bench human judgments (HF)"
    url: "https://huggingface.co/datasets/lmsys/mt_bench_human_judgments"
    last_checked: "2026-07-06"
known_issues:
  - "Judge-model dependence is the dominant source of variance – MT-Bench with GPT-4 judge is not comparable to MT-Bench with a different judge; always state the judge"
  - "Length bias: judges favor longer responses – a high score can reflect verbosity, not quality"
  - "Position/self-enhancement bias if used pairwise – swap order and average"
  - "Saturated at the top – many frontier models now score ~9+/10, leaving little discrimination"
recommended_usage:
  - "Always report the judge model and version alongside any MT-Bench number"
  - "Use as rapid iteration signal, not a sole production quality gate"
  - "Calibrate your judge against human labels on YOUR task distribution before trusting scores"
  - "Pair with Arena-Hard-Auto / WildBench (auto-judged, harder) and human eval"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [llm-as-a-judge]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official FastChat judge harness, HF human-judgment dataset, and the primary paper. Judge-model/version protocol variance emphasized per expansion-PR policy."
tags: [evaluation, llm, benchmark]
---

## Overview

MT-Bench is a meta-evaluation benchmark: 80 two-turn open-ended questions across 8 categories, scored by an LLM judge (originally GPT-4) on a 1-10 scale. It measures instruction-following and multi-turn coherence rather than a single task.

## What it Measures (and what it doesn’t)

Measures: chat quality and instruction-following across two turns, as judged by an LLM judge.

Does not measure: factual correctness directly (the judge can hallucinate), safety, or closed-form task accuracy (use exact-match metrics instead).

## Dataset & Protocol

- **Dataset:** MT-Bench – 80 two-turn QAs, 8 categories
- **Dataset URL:** https://github.com/lm-sys/FastChat
- **Evaluation setup:** model answers; LLM judge scores 1-10 per turn. Report average + per-category. Judge-dependent.
- **Version:** – (judge protocol evolving)

## Metrics

- **mt_bench_score** — higher is better — avg judge score (1-10)
- **judge_agreement** — higher is better — agreement with human preferences

## How to Run

```bash
git clone https://github.com/lm-sys/FastChat
cd FastChat/fastchat/llm_judge
# See repo for judge invocation – the judge prompt matters enormously.
```

- MT-Bench human judgments: https://huggingface.co/datasets/lmsys/mt_bench_human_judgments

## Known Issues, Leakage & Gaming Risks

- Judge-model dependence is the dominant variance source
- Length bias – high score can reflect verbosity
- Position/self-enhancement bias in pairwise use
- Saturated at the top (~9+/10)

## How to Interpret Scores

- Always report the judge model + version
- Above ~9.0/10 is frontier-class as of mid-2026; the top cluster is tight
- Calibrate your judge against human labels on your distribution
- Pair with Arena-Hard-Auto / WildBench and human eval

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **MT-Bench** benchmark for **MT-Bench** (protocol: **80 two-turn QAs, GPT-4 judge, 1-10 avg**) shows frontier models scoring **~9.0-9.5 / 10** (typical top ~9.4); the score is judge-dependent, so re-check the live table. This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Report the judge model and version
- Use as rapid iteration signal, not sole gate
- Calibrate judge against human labels on your distribution
- Pair with Arena-Hard-Auto / WildBench and human eval

## Related Benchmarks

- [LLM-as-a-Judge](./llm-as-a-judge.md) – the meta-evaluation methodology family

## Relation to the Arsenal

Evaluation-methods benchmark – meta-evaluation. Complements evaluation tools and evaluation-strategy guides.

## Resources

- [MT-Bench judge harness](https://github.com/lm-sys/FastChat/tree/main/fastchat/llm_judge)
- [MT-Bench human judgments (HF)](https://huggingface.co/datasets/lmsys/mt_bench_human_judgments)
- Paper: Zheng et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena", arXiv:2306.05685

---

*Last reviewed: 2026-07-06 by @maintainer*

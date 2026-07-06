---
id: arena-hard
title: "Arena-Hard-Auto"
entry_type: benchmark
category: evaluation-methods
modality: [text]
status: active
protocol_confidence: ambiguous
score_interpretation: mixed
what_it_measures: "Automatic, contamination-mitigated chat evaluation – 500 challenging, real user queries scored by an LLM judge against a baseline model (GPT-4-0314), reporting win rate."
metrics:
  - name: "win_rate"
    direction: higher
    notes: "Win rate vs the GPT-4-0314 baseline, length-controlled"
protocol:
  dataset: "Arena-Hard-Auto (LMSYS, 2024)"
  dataset_url: "https://github.com/lmarena/arena-hard-auto"
  evaluation_setup: "500 difficult queries (filtered from Chatbot Arena logs to be contamination-resistant). Candidate model vs baseline (GPT-4-0314) answers are judged by an LLM judge; report length-controlled win rate. Protocol varies with judge model/version."
  version: null
leaderboards:
  - name: "Arena-Hard-Auto – GitHub"
    url: "https://github.com/lmarena/arena-hard-auto"
    last_checked: "2026-07-06"
  - name: "Arena-Hard-Auto Leaderboard"
    url: "https://github.com/lmarena/arena-hard-auto#leaderboard"
    last_checked: "2026-07-06"
known_issues:
  - "Judge-model dependence: scores shift when the judge (or baseline) changes – always report both"
  - "Query set is fixed and now somewhat dated – contamination-mitigated at release, but aging as models train on 2024-era data"
  - "Win rate is relative to the GPT-4-0314 baseline, not absolute quality – a model's number depends on the baseline choice"
  - "Length-controlled, but residual length/style bias remains; pair with human Elo for confirmation"
recommended_usage:
  - "Always report the judge model, baseline, and whether length-control was applied"
  - "Use as a fast, automated proxy for Chatbot Arena Elo – not a replacement for human preference"
  - "Re-run on a current query set if evaluating a recently-released model"
  - "Pair with MT-Bench and human preference (Arena) for triangulation"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [llm-as-a-judge]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official Arena-Hard-Auto repo/leaderboard and the primary paper. Judge/baseline protocol variance and set-aging notes emphasized per expansion-PR policy."
tags: [evaluation, llm, benchmark]
---

## Overview

Arena-Hard-Auto is an automatic chat-evaluation benchmark built from 500 challenging real user queries, designed to be contamination-mitigated. An LLM judge compares a candidate model against a fixed baseline (GPT-4-0314) and reports a length-controlled win rate – a fast proxy for human preference.

## What it Measures (and what it doesn’t)

Measures: chat-model quality on hard, realistic queries, as a win rate vs a baseline – a proxy for human preference.

Does not measure: factual correctness directly, safety, or multi-turn tool use; it is a relative, judge-based score.

## Dataset & Protocol

- **Dataset:** Arena-Hard-Auto – 500 challenging queries
- **Dataset URL:** https://github.com/lmarena/arena-hard-auto
- **Evaluation setup:** candidate vs baseline answers judged by LLM; length-controlled win rate vs GPT-4-0314. Judge-dependent.
- **Version:** –

## Metrics

- **win_rate** — higher is better — win rate vs GPT-4-0314, length-controlled

## How to Run

```bash
git clone https://github.com/lmarena/arena-hard-auto
cd arena-hard-auto
# See repo README for gen_answer.py / gen_judgement.py / show_results.py.
```

## Known Issues, Leakage & Gaming Risks

- Judge-model dependence (report judge + baseline)
- Fixed, aging query set (released 2024)
- Win rate is relative to the baseline choice, not absolute
- Residual length/style bias remains

## How to Interpret Scores

- Always report judge model, baseline, and length-control
- Above ~80% win rate is frontier-class as of mid-2026; re-check the live table
- Use as a fast proxy for Arena Elo, not a replacement
- Pair with MT-Bench and human preference

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **Arena-Hard-Auto** leaderboard for **Arena-Hard-Auto** (protocol: **500 challenging queries, GPT-4 judge, win-rate vs GPT-4-0314**) shows frontier models **~80%+ win rate** — e.g., o3 at **87.0%** on the public leaderboard (2025); 2026 models score higher. This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Report judge model, baseline, length-control
- Fast proxy for Arena Elo, not a replacement
- Re-run on a current query set for new models
- Pair with MT-Bench and human preference

## Related Benchmarks

- [LLM-as-a-Judge](./llm-as-a-judge.md) – the meta-evaluation methodology family
- [MT-Bench](./mt-bench.md) – two-turn chat judge evaluation

## Relation to the Arsenal

Evaluation-methods benchmark – meta-evaluation. Complements evaluation tooling and evaluation-strategy guides.

## Resources

- [GitHub – Arena-Hard-Auto](https://github.com/lmarena/arena-hard-auto)
- Paper: Li et al., "Arena-Hard-Auto: An Automatic Benchmark for LLM Chatbots", arXiv:2406.11939

---

*Last reviewed: 2026-07-06 by @maintainer*

---
id: wildbench
title: "WildBench"
entry_type: benchmark
category: evaluation-methods
modality: [text]
status: active
protocol_confidence: ambiguous
score_interpretation: mixed
what_it_measures: "Benchmarking LLMs on challenging tasks from real users – 1,024 real user prompts (with task-specific checklists), scored by an LLM judge (WB-Score / WB-Reward)."
metrics:
  - name: "wb_score"
    direction: higher
    notes: "LLM-judge score (1-10, often rescaled 0-1) per task"
  - name: "wb_reward"
    direction: higher
    notes: "Pairwise reward vs a reference, length-penalized"
protocol:
  dataset: "WildBench (Allen AI, 2024)"
  dataset_url: "https://github.com/allenai/WildBench"
  evaluation_setup: "1,024 real-user tasks across 12 categories; model output is judged by an LLM against a task-specific checklist, producing WB-Score (individual) and WB-Reward (pairwise). Protocol varies with judge model/version."
  version: null
leaderboards:
  - name: "WildBench – GitHub"
    url: "https://github.com/allenai/WildBench"
    last_checked: "2026-07-06"
  - name: "WildBench Leaderboard (HF)"
    url: "https://huggingface.co/spaces/allenai/WildBench"
    last_checked: "2026-07-06"
known_issues:
  - "Judge-model dependence: WB-Score shifts with the judge; always report the judge model/version"
  - "Task-specific checklists help but are still LLM-graded – residual judge bias (length/style) remains"
  - "1,024 prompts is a moderate set; per-category variance is real, especially on rare task types"
  - "Rescaled 0-1 WB-Score vs raw 1-10 WB-Score are different scales – confirm which a reported number uses"
recommended_usage:
  - "Always report the judge model and whether WB-Score (rescaled 0-1) or raw (1-10) is used"
  - "Use as a fast, real-user-distribution proxy that correlates with Chatbot Arena Elo (~0.95)"
  - "Report per-category breakdown – aggregate hides task-type weaknesses"
  - "Pair with MT-Bench / Arena-Hard-Auto and human eval for triangulation"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [llm-as-a-judge]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official WildBench repo/leaderboard and the primary paper. Judge-model/version protocol variance and scale (0-1 vs 1-10) notes emphasized per expansion-PR policy."
tags: [evaluation, llm, benchmark]
---

## Overview

WildBench evaluates LLMs on 1,024 challenging tasks sampled from real user-chatbot conversations, each with a task-specific checklist. An LLM judge produces WB-Score (individual quality) and WB-Reward (pairwise), giving a fast, real-world-distribution signal that correlates strongly with human preference.

## What it Measures (and what it doesn’t)

Measures: open-ended response quality on realistic user tasks, LLM-judged against checklists.

Does not measure: factual correctness directly, safety, or tool use; it is a judge-based quality score.

## Dataset & Protocol

- **Dataset:** WildBench – 1,024 real-user tasks, 12 categories
- **Dataset URL:** https://github.com/allenai/WildBench
- **Evaluation setup:** model answers; LLM judge scores vs checklist → WB-Score / WB-Reward. Judge-dependent.
- **Version:** –

## Metrics

- **wb_score** — higher is better — LLM-judge score (1-10, often rescaled 0-1)
- **wb_reward** — higher is better — pairwise reward vs reference

## How to Run

```bash
git clone https://github.com/allenai/WildBench
cd WildBench
# See repo README for inference + scoring (WB-Score) scripts.
```

## Known Issues, Leakage & Gaming Risks

- Judge-model dependence – report judge + version
- Checklists are LLM-graded – residual bias remains
- 1,024 prompts – per-category variance
- 0-1 vs 1-10 scale confusion

## How to Interpret Scores

- Always report the judge and which WB-Score scale is used
- As of **2026-07-06**, frontier models sit around 0.65-0.69 on the rescaled 0-1 WB-Score (e.g., Mistral Large 3 ~0.685); re-check the live table
- Correlates with Arena Elo (~0.95) – a useful proxy, not a substitute
- Pair with MT-Bench / Arena-Hard-Auto and human eval

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **WildBench** leaderboard for **WildBench** (protocol: **1,024 real-user tasks, WB-Score auto-judge**) shows frontier models around **0.65-0.69** on the rescaled 0-1 WB-Score (e.g., Mistral Large 3 ~0.685); correlation with Chatbot Arena Elo is high (~0.95). This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Report judge model + WB-Score scale
- Fast real-user proxy that correlates with Arena Elo
- Report per-category breakdown
- Pair with MT-Bench / Arena-Hard-Auto and human eval

## Related Benchmarks

- [LLM-as-a-Judge](./llm-as-a-judge.md) – the meta-evaluation methodology family
- [MT-Bench](./mt-bench.md) – two-turn chat judge evaluation
- [Arena-Hard-Auto](./arena-hard.md) – win-rate vs baseline

## Relation to the Arsenal

Evaluation-methods benchmark – meta-evaluation. Complements evaluation tooling and evaluation-strategy guides.

## Resources

- [GitHub – WildBench](https://github.com/allenai/WildBench)
- [WildBench Leaderboard (HF)](https://huggingface.co/spaces/allenai/WildBench)
- Paper: Lin et al., "WildBench: Benchmarking LLMs with Challenging Tasks from Real Users in the Wild", arXiv:2406.04770

---

*Last reviewed: 2026-07-06 by @maintainer*

---
id: mbpp
title: "MBPP"
entry_type: benchmark
category: code
modality: [text, code]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Mostly Basic Python Problems – ~974 entry-level Python coding tasks (prompt + human-written solution + test cases) testing practical function synthesis."
metrics:
  - name: "pass@1"
    direction: higher
    notes: "Functional correctness, single sample"
  - name: "pass@10"
    direction: higher
    notes: "At least one correct in 10 samples"
protocol:
  dataset: "MBPP (Google Research, 2021)"
  dataset_url: "https://github.com/google-research/google-research/tree/master/mbpp"
  evaluation_setup: "0-shot or 3-shot. Generate a Python function from a short natural-language prompt, then execute the provided unit tests. Report pass@k (default pass@1)."
  version: null
leaderboards:
  - name: "Papers With Code – MBPP"
    url: "https://paperswithcode.com/sota/code-generation-on-mbpp-test"
    last_checked: "2026-07-06"
  - name: "CodeSOTA – MBPP"
    url: "https://www.codesota.com/benchmark/mbpp"
    last_checked: "2026-07-06"
known_issues:
  - "Only ~974 problems and relatively easy – frontier models now exceed 90% pass@1, so it is close to saturated and a weak discriminator at the top"
  - "Pretraining / contamination risk is high – MBPP has circulated widely since 2021; assume partial memorization by large models"
  - "Python-only, short functions – does not test repo-level, multi-file, or real software-engineering skills"
  - "3-shot prompt format inflates scores vs strict 0-shot; always state the shot count"
recommended_usage:
  - "Use MBPP+ (EvalPlus) rather than vanilla MBPP for robust, contamination-resistant scoring"
  - "Report pass@1 for cost-realistic comparison and pass@10 for capability ceiling"
  - "Pair with HumanEval and a repo-level benchmark (SWE-bench) to separate trivia from engineering skill"
  - "Always state the shot count and whether MBPP or MBPP+ was used"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [humaneval]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via official Google Research repo, Papers With Code / CodeSOTA leaderboards, and the primary paper. Contamination and protocol-variant notes emphasized per expansion-PR policy."
tags: [evaluation, code-gen, benchmark]
---

## Overview

MBPP (Mostly Basic Python Problems) is a set of ~974 entry-level Python programming tasks. Each task gives a short natural-language prompt; the model must write a function, and correctness is verified by executing bundled unit tests (pass@k). It targets practical, everyday coding rather than algorithmic competition.

## What it Measures (and what it doesn’t)

Measures: Python function synthesis from short natural-language specifications, functional correctness via execution.

Does not measure: repo-level / multi-file engineering, debugging existing code, multi-language ability, code review, or agentic tool use.

## Dataset & Protocol

- **Dataset:** MBPP – ~974 Python problems
- **Dataset URL:** https://github.com/google-research/google-research/tree/master/mbpp
- **Evaluation setup:** 0-shot or 3-shot. Generate the function, run the provided tests, compute pass@k. Temperature 0.2 for pass@1, 0.8 for pass@10 (EvalPlus defaults).
- **Version:** –

Prefer EvalPlus for 80× more tests: https://github.com/evalplus/evalplus

## Metrics

- **pass@1** — higher is better — single-sample correctness
- **pass@10** — higher is better — at least one correct in 10 samples

## How to Run

```bash
pip install evalplus
evalplus.evaluate --model "your-model" --dataset mbpp --backend vllm
```

Dataset: https://github.com/google-research/google-research/tree/master/mbpp

## Known Issues, Leakage & Gaming Risks

- ~974 problems, relatively easy – near-saturated at the frontier
- High contamination risk – widely circulated since 2021
- Python-only, short functions
- 3-shot inflates scores vs 0-shot – label the protocol

## How to Interpret Scores

- Above ~90% pass@1 indicates strong basic Python synthesis as of mid-2026; the top cluster is near-ceiling
- A 1-2 point gap is within noise on n=974 – use MBPP+ or aggregate with other coding benchmarks
- Always state the shot count and whether MBPP or MBPP+ was used
- Pair with SWE-bench for real-world engineering signal

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **CodeSOTA / Papers With Code** leaderboard for **MBPP** (protocol: **pass@1, 0-shot**) shows frontier models clustered above **90%** — e.g., o4-mini at **94.9%**, o3-mini at **93.3%**, and Claude Opus 4 at **92%** (reported Mar 2026). This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Use MBPP+ (EvalPlus) rather than vanilla MBPP for robust scoring
- Report pass@1 (cost-realistic) and pass@10 (ceiling)
- Pair with HumanEval and SWE-bench
- Always state shot count and MBPP vs MBPP+

## Related Benchmarks

- [HumanEval](./humaneval.md) – the other canonical Python function-synthesis set

## Relation to the Arsenal

Code generation benchmark. Complements code-generation projects in `content/projects/frameworks/` and code-generation tips.

## Resources

- [Dataset – Google Research](https://github.com/google-research/google-research/tree/master/mbpp)
- [EvalPlus – MBPP+](https://github.com/evalplus/evalplus)
- [CodeSOTA – MBPP](https://www.codesota.com/benchmark/mbpp)
- Paper: Austin et al., "Program Synthesis with Large Language Models", arXiv:2108.07732

---

*Last reviewed: 2026-07-06 by @maintainer*

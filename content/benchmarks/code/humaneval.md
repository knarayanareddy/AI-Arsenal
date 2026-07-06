---
id: humaneval
title: "HumanEval"
entry_type: benchmark
category: code
modality: [text, code]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Python function synthesis from docstrings – 164 hand-written programming problems testing functional correctness."
metrics:
  - name: "pass@1"
    direction: higher
    notes: "Functional correctness, single sample"
  - name: "pass@10"
    direction: higher
    notes: "At least one correct in 10 samples"
protocol:
  dataset: "HumanEval"
  dataset_url: "https://huggingface.co/datasets/openai/openai_humaneval"
  evaluation_setup: "0-shot. Generate Python function body from docstring + signature. Evaluate with provided unit tests. Report pass@k."
  version: null
leaderboards:
  - name: "Papers with Code – HumanEval"
    url: "https://paperswithcode.com/sota/code-generation-on-humaneval"
    last_checked: "2026-07-06"
  - name: "EvalPlus Leaderboard"
    url: "https://evalplus.github.io/leaderboard.html"
    last_checked: "2026-07-06"
known_issues:
  - "Only 164 problems – small test set, high variance, easy to overfit"
  - "Original HumanEval has incomplete test coverage – use HumanEval+ (EvalPlus) with 80× more tests for robust scores"
  - "Python-only – does not measure multi-language coding"
  - "Contamination: problems have circulated widely since 2021; assume partial memorization in large models"
recommended_usage:
  - "Use HumanEval+ (EvalPlus) rather than vanilla HumanEval for production model selection"
  - "Report pass@1 for cost-realistic comparison; pass@10 for capability ceiling"
  - "Pair with a real-world coding benchmark like SWE-bench for practical signal"
  - "Always state temperature, sampling strategy, and whether HumanEval or HumanEval+ was used"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: []
enrichment_status: reviewed
tags: [evaluation, code-gen, benchmark]
---

## Overview

HumanEval is a hand-written set of 164 Python programming problems. Each provides a function signature + docstring; the model must complete the function body. Correctness is verified by executing hidden unit tests – pass@k is the standard metric.

## What it Measures (and what it doesn’t)

Measures: Python function synthesis from natural-language specifications, functional correctness.

Does not measure: multi-file / repo-level coding, debugging existing code, multi-language ability, code review, or real-world software engineering workflow.

## Dataset & Protocol

- **Dataset:** HumanEval – 164 Python problems
- **Dataset URL:** https://huggingface.co/datasets/openai/openai_humaneval
- **Evaluation setup:** 0-shot. Generate completions, run unit tests, compute pass@k. Temperature 0.2 for pass@1, 0.8 for pass@10 (follow EvalPlus defaults).
- **Version:** –

Official harness: https://github.com/openai/human-eval – prefer EvalPlus: https://github.com/evalplus/evalplus

## Metrics

- **pass@1** — higher is better — single-sample correctness
- **pass@10** — higher is better — at least one correct in 10 samples

Use HumanEval+ for 80× more tests per problem.

## How to Run

```bash
pip install evalplus
evalplus.evaluate --model "your-model" --dataset humaneval --backend vllm
```

Dataset: https://huggingface.co/datasets/openai/openai_humaneval

## Known Issues, Leakage & Gaming Risks

- Only 164 problems – small test set, high variance, easy to overfit
- Original HumanEval has incomplete test coverage – use HumanEval+
- Python-only
- Contamination: problems have circulated widely since 2021

## How to Interpret Scores

- As of **2026-07-06**, check the **Papers with Code HumanEval** leaderboard and **EvalPlus Leaderboard** for current scores – rankings change with new code model releases
- Above ~85% pass@1 on HumanEval+ indicates strong Python synthesis capability
- Small absolute differences (<2pp) on n=164 are within noise – use HumanEval+ or aggregate with other coding benchmarks
- Always note whether HumanEval or HumanEval+ was used – scores are not comparable
- Snapshot results go stale quickly

## Recommended Usage

- Use HumanEval+ rather than vanilla HumanEval for production model selection
- Report pass@1 for cost-realistic comparison
- Pair with SWE-bench for real-world signal
- Always state temperature, sampling strategy, and HumanEval vs HumanEval+

## Related Benchmarks

None yet in the Arsenal for code – see `content/benchmarks/code/` index.

## Relation to the Arsenal

Code generation benchmark. Complements code-generation projects in `content/projects/frameworks/` and code-generation tips.

## Resources

- [Dataset – Hugging Face](https://huggingface.co/datasets/openai/openai_humaneval)
- [EvalPlus – HumanEval+](https://github.com/evalplus/evalplus)
- [EvalPlus Leaderboard](https://evalplus.github.io/leaderboard.html)
- [Papers with Code – HumanEval](https://paperswithcode.com/sota/code-generation-on-humaneval)
- Paper: Chen et al., "Evaluating Large Language Models Trained on Code", arXiv:2107.03374

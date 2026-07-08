---
id: crux-eval
title: "CRUXEval (Code Reasoning, Understanding, and eXecution)"
entry_type: benchmark
category: code
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Whether a model can reason about what code *does* — predicting a function's output given an input (output prediction) and finding an input that yields a given output (input prediction) — rather than only writing new code."
metrics:
  - name: "Pass@1 (output prediction)"
    direction: higher
    notes: "Fraction of functions whose output the model predicts correctly on the first try"
  - name: "Pass@1 (input prediction)"
    direction: higher
    notes: "Fraction where the model supplies an input that produces the target output, verified by execution"
protocol:
  dataset: "CRUXEval (800 short Python functions with input/output pairs)"
  dataset_url: "https://github.com/facebookresearch/cruxeval"
  evaluation_setup: "Two tasks per function — predict output from input, and predict an input for a given output — each verified by executing the reference function; report Pass@1 for each task."
  version: "2024 release"
leaderboards:
  - name: "CRUXEval leaderboard"
    url: "https://crux-eval.github.io/"
    last_checked: "2026-07-08"
known_issues:
  - "Functions are short and simple by design; strong scores don't imply reasoning about large or stateful programs"
  - "Chain-of-thought prompting substantially changes scores, so numbers must state the prompting setup"
  - "Python-only and execution-based; results depend on deterministic behavior of the reference functions"
  - "Public set is contaminable over time"
recommended_usage:
  - "Use it to probe code *understanding/execution reasoning*, a different axis from code generation (HumanEval)"
  - "Always report whether CoT was used — it is one of the largest score levers"
  - "Track the gap between output and input prediction; input prediction is typically harder and more discriminative"
  - "Pair with a generation benchmark for a fuller picture of coding ability"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["humaneval", "mbpp"]
enrichment_status: draft
enrichment_notes: "Authored from the CRUXEval paper (arXiv:2401.03065) and facebookresearch/cruxeval repo + site; URLs verified 2026-07-08."
tags: [evaluation, code-gen, reasoning, benchmark]
---

## Overview

CRUXEval (Gu et al., 2024) measures a capability adjacent to but distinct from code generation: reasoning about execution. Given 800 short Python functions, it asks the model two things — predict the output for a given input, and find an input that produces a given output. Both are checked by actually running the reference function. Because a model can generate plausible-looking code without truly understanding execution, CRUXEval isolates that understanding and often reveals gaps that generation benchmarks hide.

## What it Measures (and what it doesn’t)

Measures a model's ability to simulate/execute code mentally and reason bidirectionally about inputs and outputs.

Does not measure: writing new programs, handling large/stateful/multi-file code, non-Python languages, or real debugging. It is a focused reasoning probe on small functions.

## Dataset & Protocol

- **Dataset:** 800 short Python functions with input/output pairs
- **Dataset URL:** https://github.com/facebookresearch/cruxeval
- **Evaluation setup:** output-prediction and input-prediction tasks, each execution-verified; Pass@1 per task
- **Version:** 2024 release

## Metrics

- **Pass@1 (output prediction)** — higher is better
- **Pass@1 (input prediction)** — higher is better — typically the harder, more discriminative task

## How to Run

```bash
git clone https://github.com/facebookresearch/cruxeval
# follow repo instructions to generate predictions for both tasks
# then run the execution-based scorer for output and input prediction
```

## Known Issues, Leakage & Gaming Risks

- Short simple functions cap the ceiling of what a high score implies
- Chain-of-thought prompting is a huge lever — always disclose it
- Execution-based and Python-only; determinism of reference functions matters
- Contamination risk as the set ages

## How to Interpret Scores

- Report the prompting regime (direct vs CoT): CoT can move Pass@1 by double digits, so cross-model comparisons are only valid within the same setup.
- Input prediction lagging output prediction indicates weaker abductive/search-style reasoning.
- As of **2026-07-08**, strong reasoning models score high on output prediction while input prediction remains the harder axis — use it to separate top models.

## Recommended Usage

- Use as an execution-reasoning probe complementing generation benchmarks
- Always fix and disclose the prompting setup
- Watch input-vs-output prediction gap as a reasoning signal
- Combine with HumanEval/BigCodeBench for generation coverage

## Related Benchmarks

- [HumanEval](./humaneval.md) — code *generation* rather than execution reasoning
- [MBPP](./mbpp.md) — basic Python programming tasks

## Relation to the Arsenal

Code-reasoning benchmark in the code category; a useful complement to generation benchmarks when evaluating models for the code-generation tools and projects in the Arsenal.

## Resources

- [CRUXEval site + leaderboard](https://crux-eval.github.io/)
- [facebookresearch/cruxeval repo](https://github.com/facebookresearch/cruxeval)
- [CRUXEval paper — Gu et al., 2024](https://arxiv.org/abs/2401.03065)

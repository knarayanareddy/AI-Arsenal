---
id: livecodebench
title: "LiveCodeBench"
entry_type: benchmark
category: code
modality: [text, code]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Holistic, contamination-free code evaluation – problems drawn live from programming contests (LeetCode, AtCoder, CodeForces) and tagged by release date to evaluate only on post-training-cutoff problems."
metrics:
  - name: "pass@1"
    direction: higher
    notes: "Functional correctness, single sample, on a time window"
  - name: "pass@5"
    direction: higher
    notes: "At least one correct in 5 samples"
protocol:
  dataset: "LiveCodeBench (UIUC et al., 2024)"
  dataset_url: "https://github.com/livecodebench/livecodebench"
  evaluation_setup: "Problems are filtered to those released after a model's training cutoff (date-segmented). Four scenarios: code generation, self-repair, code execution, test-output prediction. Report pass@1 / pass@5 over a chosen date window."
  version: null
leaderboards:
  - name: "LiveCodeBench Leaderboard"
    url: "https://livecodebench.github.io/"
    last_checked: "2026-07-06"
  - name: "CodeSOTA – LiveCodeBench"
    url: "https://www.codesota.com/benchmark/livecodebench"
    last_checked: "2026-07-06"
known_issues:
  - "Contamination-controlled by design (date-segmented), but you must select the right post-cutoff window per model – comparing a 2023-cutoff model on 2024+ problems vs a 2025-cutoff model on the same set is unfair"
  - "Score depends on the release version (v1 vs v2) and whether code_generation_lite is used – results are not directly comparable across versions"
  - "Different scenarios (generation / self-repair / execution / test-output) measure different skills – report them separately"
  - "Still subject to time-limit flakiness in execution checks (sub-0.5 point variance); increase processes / timeout to stabilize"
recommended_usage:
  - "Use the post-cutoff window for each model to get a contamination-free signal"
  - "Always state the release version (v1/v2) and whether code_generation_lite was used"
  - "Report all four scenarios (generation, self-repair, execution, test-output) – don't reduce to a single number"
  - "Pair with SWE-bench for repo-scale signal and HumanEval/MBPP for saturated function synthesis"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [humaneval, mbpp]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official LiveCodeBench repo, livecodebench.github.io, and the primary paper. Contamination-control and version/window protocol notes emphasized per expansion-PR policy."
tags: [evaluation, code-gen, benchmark]
---

## Overview

LiveCodeBench is a continuously updated code benchmark that pulls problems live from competitive-programming platforms and tags each with a release date. By evaluating only on problems released after a model's training cutoff, it makes contamination a measured property rather than a hand-wave – the successor to saturated sets like HumanEval/MBPP.

## What it Measures (and what it doesn’t)

Measures: contamination-resistant code generation, self-repair, code execution, and test-output prediction.

Does not measure: repo-scale engineering (use SWE-bench), multimodal coding, or natural-language specification quality independent of the code.

## Dataset & Protocol

- **Dataset:** LiveCodeBench – 400+ problems (growing), contest-sourced, date-tagged
- **Dataset URL:** https://github.com/livecodebench/livecodebench
- **Evaluation setup:** date-segmented pass@k over chosen window; four scenarios. `python -m lcb_runner.runner.main --model X --scenario codegeneration --evaluate`
- **Version:** – (v1 / v2 releases)

## Metrics

- **pass@1** — higher is better — single-sample correctness on a window
- **pass@5** — higher is better — at least one correct in 5 samples

## How to Run

```bash
git clone https://github.com/livecodebench/livecodebench
cd livecodebench
python -m lcb_runner.runner.main \
  --model your-model \
  --scenario codegeneration \
  --evaluate
# Score over a window: lcb_runner/evaluation/compute_scores.py --start_date 2024-01-01
```

## Known Issues, Leakage & Gaming Risks

- Contamination-free only if you pick the correct post-cutoff window per model
- v1 vs v2 and code_generation_lite change scores – not comparable across versions
- Four scenarios measure different skills – report separately
- Execution time-limit flakiness (sub-0.5 pt variance)

## How to Interpret Scores

- Always state the date window and release version – otherwise numbers are not comparable
- Report generation, self-repair, execution, and test-output separately
- Above ~90% pass@1 on the recent window is frontier-class as of mid-2026
- Pair with SWE-bench for repo-scale and HumanEval/MBPP for saturated synthesis

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **LiveCodeBench** leaderboard for **LiveCodeBench** (protocol: **recent-window pass@1, contamination-controlled**) shows frontier models clustered around **90%** — e.g., Gemini 3 Pro Preview at **91.7%** pass@1 (full-window variants reach ~96% for o4-mini / o3-mini). This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Use post-cutoff windows per model for contamination-free signal
- State release version and code_generation_lite usage
- Report all four scenarios
- Pair with SWE-bench and HumanEval/MBPP

## Related Benchmarks

- [HumanEval](./humaneval.md) – saturated function synthesis
- [MBPP](./mbpp.md) – entry-level function synthesis
- [SWE-bench](./swe-bench.md) – repo-scale engineering

## Relation to the Arsenal

Contamination-resistant code benchmark. Complements code-generation projects and tips.

## Resources

- [Leaderboard – LiveCodeBench](https://livecodebench.github.io/)
- [GitHub – LiveCodeBench](https://github.com/livecodebench/livecodebench)
- Paper: Jain et al., "LiveCodeBench: Holistic and Contamination-Free Evaluation of Large Language Models for Code", arXiv:2403.07974

---

*Last reviewed: 2026-07-06 by @maintainer*

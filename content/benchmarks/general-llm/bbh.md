---
id: bbh
title: "BIG-Bench Hard (BBH)"
entry_type: benchmark
category: general-llm
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Multi-step reasoning across 23 BIG-Bench tasks selected because pre-2022 models scored below the average human rater – the canonical chain-of-thought stress test."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Exact match, macro-averaged across the 23 tasks; reported with and without chain-of-thought"
protocol:
  dataset: "BIG-Bench Hard"
  dataset_url: "https://github.com/suzgunmirac/BIG-Bench-Hard"
  evaluation_setup: "3-shot with or without chain-of-thought prompting; exact-match scoring per task, macro average across 23 tasks."
  version: "2022 release (23 tasks, ~6.5k examples)"
leaderboards:
  - name: "BBH results (paper + repo)"
    url: "https://github.com/suzgunmirac/BIG-Bench-Hard"
    last_checked: "2026-07-08"
known_issues:
  - "Effectively saturated: frontier models exceed 90% with CoT as of 2025-2026, so frontier headroom is gone (treat as contested for top models)"
  - "Contamination is pervasive; BBH has been in training corpora for years"
  - "CoT vs no-CoT numbers differ by tens of points – undated or protocol-free scores are meaningless"
  - "Successor BBEH (BIG-Bench Extra Hard, 2025) replaces each task with a harder variant"
recommended_usage:
  - "Use for small/edge models where headroom remains, not for frontier comparisons"
  - "Always state shot count and whether CoT was used"
  - "For frontier models, prefer BBEH or GPQA Diamond as the reasoning stress test"
  - "Per-task breakdowns are more informative than the macro average – saturation is uneven"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["gpqa-diamond", "gsm8k", "mmlu-pro"]
enrichment_status: draft
enrichment_notes: "Authored from the BBH paper (arXiv:2210.09261) and repo; URLs verified 2026-07-08. status kept active to match the benchmark vertical's taxonomy (Status Values); frontier saturation/contamination documented in known_issues."
tags: [evaluation, reasoning, benchmark]
---

## Overview

BIG-Bench Hard (Suzgun et al., 2022) selected the 23 BIG-Bench tasks where no pre-2022 model beat the average human rater – logical deduction, multi-step arithmetic, word sorting, causal judgment, and similar. It became the canonical demonstration that chain-of-thought prompting unlocks emergent reasoning, and for two years was the default multi-step reasoning benchmark.

## What it Measures (and what it doesn’t)

Measures multi-step symbolic and algorithmic reasoning under few-shot prompting, and the delta CoT provides over direct answering.

Does not measure: knowledge breadth, coding, factuality, or open-ended reasoning. For 2025+ frontier models it mostly measures contamination and ceiling effects rather than capability differences.

## Dataset & Protocol

- **Dataset:** BIG-Bench Hard – 23 tasks, ~6.5k examples
- **Dataset URL:** https://github.com/suzgunmirac/BIG-Bench-Hard
- **Evaluation setup:** 3-shot, with/without chain-of-thought; exact match per task, macro average
- **Version:** 2022 release

## Metrics

- **accuracy** — higher is better — macro-averaged exact match over 23 tasks

## How to Run

```bash
git clone https://github.com/suzgunmirac/BIG-Bench-Hard
# Tasks are JSON; prompts (with official 3-shot CoT exemplars) in cot-prompts/
# Also available in lm-evaluation-harness as `bbh` task group
```

## Known Issues, Leakage & Gaming Risks

- Saturation: frontier models exceed 90% with CoT (2025-2026) – differences at the top are noise
- Long-standing public availability makes train/test contamination near-certain for recent models
- Mixing CoT and no-CoT numbers, or different shot counts, silently invalidates comparisons
- Some tasks (e.g. word sorting) are trivially solvable with tool use – tool policy must be stated

## How to Interpret Scores

- As of **2026-07-08**, treat BBH as saturated for frontier models; meaningful signal remains only for sub-10B and edge models.
- The CoT-vs-direct delta is often more informative than the absolute score – it isolates prompted-reasoning gains.
- A model scoring far below its class on BBH usually has a prompting/formatting issue, not a reasoning deficit – check extraction of final answers first.

## Recommended Usage

- Benchmark small open models where headroom remains
- Use per-task results to find specific reasoning failure modes (e.g. tracking shuffled objects)
- Move to BBEH or GPQA Diamond for frontier-model reasoning comparisons
- State shots, CoT usage, and answer-extraction method with every number

## Related Benchmarks

- [GPQA Diamond](./gpqa-diamond.md) – unsaturated expert science reasoning
- [GSM8K](./gsm8k.md) – grade-school math, similarly saturated
- [MMLU-Pro](./mmlu-pro.md) – knowledge + reasoning breadth

## Relation to the Arsenal

Historical-canon reasoning benchmark in the general-llm category; still useful for small-model evaluation via harnesses in `content/tools/evaluation-and-observability/`.

## Resources

- [BIG-Bench Hard repo](https://github.com/suzgunmirac/BIG-Bench-Hard)
- [BBH paper – Suzgun et al., 2022](https://arxiv.org/abs/2210.09261)

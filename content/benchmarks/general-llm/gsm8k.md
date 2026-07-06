---
id: gsm8k
title: "GSM8K"
entry_type: benchmark
category: general-llm
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Grade-school arithmetic word problems (8.5K) testing multi-step mathematical reasoning with natural-language solutions."
metrics:
  - name: "exact_match"
    direction: higher
    notes: "pass@1 / exact match over 8.5K problems"
protocol:
  dataset: "GSM8K (OpenAI, 2021)"
  dataset_url: "https://github.com/openai/grade-school-math"
  evaluation_setup: "8-shot chain-of-thought, exact-match / pass@1. 0-shot and 5-shot variants also exist; CoT typically adds 50+ points."
  version: null
leaderboards:
  - name: "Papers With Code — GSM8K"
    url: "https://paperswithcode.com/dataset/gsm8k"
    last_checked: "2026-07-06"
  - name: "CodeSOTA — GSM8K"
    url: "https://www.codesota.com/browse/reasoning/mathematical-reasoning/gsm8k"
    last_checked: "2026-07-06"
known_issues:
  - "Heavily used in supervised fine-tuning and RLVR; contamination is likely and largely unmeasured"
  - "CoT vs IO and 5/8-shot variants change scores by 10+ points — never compare across protocols"
  - "Saturating (~95%+ for frontier models); weak signal for distinguishing top reasoning models"
  - "Solutions are short and templated — gauges procedural math, not tool use or real-world numeracy"
recommended_usage:
  - "Use to confirm basic multi-step math competence; not to rank top reasoning models (saturated)"
  - "Report the exact prompt protocol (CoT, shots) with any number"
  - "Pair with MATH / GPQA for harder reasoning signal"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [gpqa-diamond]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via official dataset repo, Papers With Code / CodeSOTA leaderboards, and the primary paper. Contamination and protocol-variant notes emphasized per expansion-PR policy."
tags: [evaluation, llm, reasoning]
---

## Overview

GSM8K (Grade School Math 8K) is OpenAI's 8,500 grade-school word problems with worked solutions, the de-facto standard for measuring multi-step arithmetic reasoning with chain-of-thought.

## What it Measures (and what it doesn’t)

Measures: multi-step mathematical reasoning expressed in natural language, scored by exact-match on the final numeric answer.

Does not measure: code execution, tool use, proof writing, or open-ended problem solving.

## Dataset & Protocol

- **Dataset:** GSM8K — 8.5K problems, train/dev split
- **Dataset URL:** https://github.com/openai/grade-school-math
- **Evaluation setup:** 8-shot CoT, exact-match / pass@1; 0-shot and 5-shot variants exist
- **Version:** –

## Metrics

- **exact_match** — higher is better — pass@1 over 8.5K problems

## How to Run

```bash
lm_eval --model hf \
  --tasks gsm8k \
  --num_fewshot 8
```

## Known Issues, Leakage & Gaming Risks

- Present in many fine-tuning pipelines — contamination risk is high and unmeasured
- CoT vs IO and shot-count change scores by 10+ points — label the protocol
- Saturating above 95% for frontier models — poor top-end discriminator
- Templated short solutions — measures procedure, not robust numeracy

## How to Interpret Scores

- Above ~90% indicates solid grade-school reasoning as of mid-2026; the top cluster is near-ceiling
- CoT vs IO is not comparable — always state the protocol
- A few points of gap is usually noise at the top

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **Papers With Code / CodeSOTA** leaderboard for **GSM8K** (protocol: **8-shot CoT**) shows frontier models clustered above **95%** — e.g., ERNIE-4.5 at 96.6% and Qwen3-235B at 96.4% were reported in April 2026 tracking. This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Confirm basic multi-step math competence; not a top-model differentiator (saturated)
- Report the exact prompt protocol with any number
- Pair with MATH / GPQA for harder reasoning signal

## Related Benchmarks

- [GPQA Diamond](./gpqa-diamond.md) — harder graduate-level reasoning

## Relation to the Arsenal

Math-reasoning benchmark. Pair with evaluation tooling in `content/tools/evaluation-and-observability/` and reasoning guides in `content/architectures/`.

## Resources

- [Dataset – GitHub (openai/grade-school-math)](https://github.com/openai/grade-school-math)
- [Paper – Cobbe et al., "Training Verifiers to Solve Math Word Problems", arXiv:2110.14168](https://arxiv.org/abs/2110.14168)
- [Papers With Code – GSM8K](https://paperswithcode.com/dataset/gsm8k)
- [CodeSOTA – GSM8K](https://www.codesota.com/browse/reasoning/mathematical-reasoning/gsm8k)

---

*Last reviewed: 2026-07-06 by @maintainer*

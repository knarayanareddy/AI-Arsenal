---
id: ifeval
title: "IFEval"
entry_type: benchmark
category: general-llm
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Verifiable instruction-following – whether a model follows explicit, programmatically checkable formatting instructions (e.g. 'mention keyword X exactly 3 times', 'output valid JSON')."
metrics:
  - name: "prompt_level_strict_acc"
    direction: higher
    notes: "Strict accuracy at the prompt level – all instructions in a prompt must be satisfied"
  - name: "inst_level_strict_acc"
    direction: higher
    notes: "Strict accuracy at the individual instruction level"
protocol:
  dataset: "IFEval"
  dataset_url: "https://huggingface.co/datasets/google/IFEval"
  evaluation_setup: "0-shot. ~541 prompts with 1-3 verifiable instructions each. Strict / loose accuracy at prompt and instruction level, automatically verified."
leaderboards:
  - name: "Open LLM Leaderboard – IFEval"
    url: "https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard"
    last_checked: "2026-07-06"
  - name: "IFEval Community Leaderboard"
    url: "https://huggingface.co/spaces/Krisseck/IFEval-Leaderboard"
    last_checked: "2026-07-06"
known_issues:
  - "Only tests verifiable instructions (formatting, keyword counts, JSON structure) – does not measure whether the model follows open-ended stylistic / semantic instructions"
  - "Strict accuracy is harsh – a single missed constraint fails the entire prompt"
  - "Prompt set is English-only in the canonical version"
  - "Models optimized specifically for IFEval-style constraints can overfit – pair with human preference evals"
recommended_usage:
  - "Use to compare instruction-following reliability between models before production adoption"
  - "Report both prompt-level and instruction-level strict accuracy"
  - "Pair with a human-preference or task-success benchmark – IFEval measures format adherence, not output quality"
  - "Run 0-shot with the default prompt template from the official harness for comparable numbers"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["mmlu-pro"]
enrichment_status: reviewed
tags: [evaluation, structured-output, llm]
---

## Overview

IFEval (Instruction-Following Evaluation) tests whether LLMs follow explicit, programmatically verifiable instructions – e.g. "include keyword X exactly N times", "output valid JSON", "wrap the response in a code block". About 541 prompts, 25 instruction types.

## What it Measures (and what it doesn’t)

Measures: verifiable instruction-following accuracy – formatting constraints, keyword frequency, case constraints, JSON validity, etc.

Does not measure: open-ended instruction following that cannot be automatically verified (tone, style, factual correctness, helpfulness), multilingual instruction following (canonical set is English), or reasoning ability.

## Dataset & Protocol

- **Dataset:** IFEval – ~541 prompts
- **Dataset URL:** https://huggingface.co/datasets/google/IFEval
- **Evaluation setup:** 0-shot. Strict and loose accuracy at both prompt-level and instruction-level. Automatically verified – no LLM judge.
- **Version:** –

Run via lm-eval: `--tasks=ifeval --apply_chat_template`

## Metrics

- **prompt_level_strict_acc** — higher is better — all instructions in a prompt must be satisfied
- **inst_level_strict_acc** — higher is better — per-instruction accuracy

Loose variants also exist (case-insensitive / whitespace-tolerant).

## How to Run

```bash
lm_eval --model hf \
  --model_args pretrained=<your_model> \
  --tasks ifeval \
  --apply_chat_template \
  --batch_size auto
```

Dataset: https://huggingface.co/datasets/google/IFEval

## Known Issues, Leakage & Gaming Risks

- Only tests verifiable instructions – does not measure open-ended stylistic / semantic instruction following
- Strict accuracy is harsh – a single missed constraint fails the entire prompt
- Prompt set is English-only in the canonical version
- Models optimized specifically for IFEval-style constraints can overfit

## How to Interpret Scores

- Report both prompt-level and instruction-level strict accuracy – prompt-level is the harder, more realistic number
- As of **2026-07-06**, check the **Open LLM Leaderboard – IFEval** column for current scores – rankings shift with new instruction-tuned releases
- Scores below ~70% prompt-level strict indicate unreliable instruction following for production use
- A model can score highly on IFEval but still fail at open-ended instruction following – pair with human evals
- Always use the same chat template / 0-shot setup when comparing – results are not comparable across different prompting

## Recommended Usage

- Use to compare instruction-following reliability between models before production adoption
- Report both prompt-level and instruction-level strict accuracy
- Pair with a human-preference or task-success benchmark
- Run 0-shot with the default prompt template from the official harness

## Related Benchmarks

- [MMLU-Pro](./mmlu-pro.md) – general knowledge/reasoning

## Relation to the Arsenal

General LLM instruction-following benchmark. Complements prompting tips in `content/tips-and-tricks/prompting/` and structured-output tools in `content/tools/model-layer/`.

## Resources

- [Dataset – Hugging Face](https://huggingface.co/datasets/google/IFEval)
- [Open LLM Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)
- [IFEval Community Leaderboard](https://huggingface.co/spaces/Krisseck/IFEval-Leaderboard)
- Paper: Zhou et al., "Instruction-Following Evaluation for Large Language Models", arXiv:2311.07911

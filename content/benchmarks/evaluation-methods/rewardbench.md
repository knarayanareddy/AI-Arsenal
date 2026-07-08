---
id: rewardbench
title: "RewardBench"
entry_type: benchmark
category: evaluation-methods
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "How good a reward model (or LLM judge) is at ranking a preferred response above a rejected one, across chat, reasoning, safety, and adversarial 'hard' prompt pairs — evaluating the evaluator that drives RLHF and preference tuning."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Fraction of prompt pairs where the reward model scores the known-better response higher than the worse one; reported overall and per category (Chat, Chat-Hard, Safety, Reasoning)"
protocol:
  dataset: "RewardBench prompt-chosen-rejected triples across four categories"
  dataset_url: "https://github.com/allenai/reward-bench"
  evaluation_setup: "For each (prompt, chosen, rejected) triple, score both responses with the reward model and check whether chosen > rejected; report per-category and overall accuracy. Generative LLM judges are evaluated with the same triples."
  version: "RewardBench / v2 (2024-2025)"
leaderboards:
  - name: "RewardBench leaderboard (Hugging Face)"
    url: "https://huggingface.co/spaces/allenai/reward-bench"
    last_checked: "2026-07-08"
known_issues:
  - "High RewardBench accuracy does not guarantee better downstream RLHF outcomes — it measures ranking, not policy improvement"
  - "The Chat-Hard and adversarial slices are where models differ; the overall average can look saturated"
  - "Category coverage is fixed and may not match your domain's preference distribution"
  - "Public pairs can be trained against, and judge models can exhibit self-preference bias"
recommended_usage:
  - "Use it to screen reward models / LLM judges before committing them to an RLHF or eval pipeline"
  - "Read Chat-Hard, Safety, and Reasoning separately — the overall number hides the discriminative slices"
  - "Confirm with a downstream check: a better ranker should yield a better tuned policy on your data"
  - "Watch for self-preference when the judge and the policy come from the same model family"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["llm-as-a-judge", "mt-bench"]
enrichment_status: draft
enrichment_notes: "Authored from the RewardBench paper (arXiv:2403.13787) and allenai/reward-bench repo + HF leaderboard; URLs verified 2026-07-08."
tags: [evaluation, alignment, rlhf, benchmark]
---

## Overview

RewardBench (Allen AI, 2024) is a benchmark for the *evaluator*, not the policy: it tests how reliably a reward model (or a generative LLM judge) ranks a better response above a worse one. Since reward models silently steer RLHF and preference optimization, a bad ranker corrupts everything downstream, yet reward models were historically hard to compare in isolation. RewardBench supplies curated (prompt, chosen, rejected) triples across Chat, Chat-Hard, Safety, and Reasoning categories and reports per-category accuracy.

## What it Measures (and what it doesn’t)

Measures the discriminative quality of a reward model / judge — can it consistently prefer the response humans would prefer, including on hard and adversarial pairs.

Does not measure: whether using that reward model actually improves a tuned policy (ranking accuracy is necessary, not sufficient), calibration of reward magnitudes, or domain fit outside its categories.

## Dataset & Protocol

- **Dataset:** curated prompt/chosen/rejected triples across four categories
- **Dataset URL:** https://github.com/allenai/reward-bench
- **Evaluation setup:** score both responses, check chosen > rejected; per-category and overall accuracy
- **Version:** RewardBench / v2 (2024-2025)

## Metrics

- **accuracy** — higher is better — correct preference ranking, reported overall and per category

## How to Run

```bash
pip install rewardbench
# rewardbench --model <reward-model-or-judge> --batch_size 8
# prints per-category and overall accuracy
```

## Known Issues, Leakage & Gaming Risks

- Ranking accuracy ≠ downstream RLHF gains; validate end-to-end
- Overall average saturates; Chat-Hard/adversarial slices carry the signal
- Fixed categories may not represent your preference distribution
- Contamination and judge self-preference bias are real risks

## How to Interpret Scores

- Read the category breakdown: as of **2026-07-08**, top reward models cluster near the ceiling on easy Chat while still separating on Chat-Hard and Reasoning.
- A high overall score with weak Chat-Hard means the model is fooled by superficially good but wrong answers — dangerous for RLHF.
- Because it scores rankers, always follow up by checking that the better ranker yields a better policy on your own data.

## Recommended Usage

- Screen candidate reward models / judges before pipeline adoption
- Prioritize the hard and safety slices over the overall average
- Confirm with a downstream policy-improvement check
- Guard against self-preference when judge and policy share a base model

## Related Benchmarks

- [LLM-as-a-Judge](./llm-as-a-judge.md) — the broader practice of using models as evaluators
- [MT-Bench](./mt-bench.md) — multi-turn quality scored by an LLM judge

## Relation to the Arsenal

Evaluator-quality benchmark in the evaluation-methods category; informs choice of reward models and LLM judges used across the Arsenal's evaluation tooling and alignment guidance.

## Resources

- [RewardBench leaderboard (Hugging Face)](https://huggingface.co/spaces/allenai/reward-bench)
- [allenai/reward-bench repo](https://github.com/allenai/reward-bench)
- [RewardBench paper — Lambert et al., 2024](https://arxiv.org/abs/2403.13787)

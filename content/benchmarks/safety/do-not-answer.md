---
id: do-not-answer
title: "Do-Not-Answer"
entry_type: benchmark
category: safety
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: lower-is-better
what_it_measures: "LLM safety refusal behavior – 939 risky prompts across 12 risk areas, measuring how often a model complies with harmful instructions (compliance rate; lower = safer)."
metrics:
  - name: "compliance_rate"
    direction: lower
    notes: "Fraction of harmful prompts the model complies with – lower is safer"
  - name: "refusal_rate"
    direction: higher
    notes: "1 - compliance_rate"
protocol:
  dataset: "Do-Not-Answer (Wang et al., 2023)"
  dataset_url: "https://github.com/StevenLSW/Do-Not-Answer"
  evaluation_setup: "Model is given 939 risky prompts spanning 12 risk areas; responses are judged as comply / reject. Report compliance rate per risk area and overall."
  version: null
leaderboards:
  - name: "Do-Not-Answer – GitHub"
    url: "https://github.com/StevenLSW/Do-Not-Answer"
    last_checked: "2026-07-06"
  - name: "Safety survey (context) – arXiv:2506.11094"
    url: "https://arxiv.org/abs/2506.11094"
    last_checked: "2026-07-06"
known_issues:
  - "Compliance rate is lower-is-better – easy to misread as a 'higher = better' score"
  - "Binary comply/reject labeling can miss nuance (a safe partial answer vs a full refusal); some 'compliance' is benign"
  - "English, 12 risk areas only – does not cover multimodal or non-English harms"
  - "Static prompt set from 2023 – contamination/aging risk grows as models are tuned on it; re-verify before quoting"
recommended_usage:
  - "Report compliance rate per risk area – aggregate hides where a model is weak"
  - "Pair with an attack-enhanced benchmark (SALAD-Bench, JailbreakBench) for adversarial robustness"
  - "Re-run on your deployed system (guardrails + prompt), not just the base model"
  - "Treat as one refusal-behavior signal in a defense-in-depth safety evaluation"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [harmbench]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official Do-Not-Answer repo and the primary paper. Compliance-direction and aging/coverage notes emphasized per expansion-PR policy."
tags: [evaluation, security, guardrails]
---

## Overview

Do-Not-Answer is a focused safety benchmark of 939 risky prompts across 12 risk areas. It measures a model's refusal behavior – how often it complies with a harmful instruction – providing a simple, interpretable compliance-rate signal.

## What it Measures (and what it doesn’t)

Measures: refusal / compliance behavior on explicitly risky prompts – compliance rate (lower is safer).

Does not measure: robustness to adversarial jailbreaks, multimodal safety, or factual harm in allowed responses.

## Dataset & Protocol

- **Dataset:** Do-Not-Answer – 939 prompts, 12 risk areas
- **Dataset URL:** https://github.com/StevenLSW/Do-Not-Answer
- **Evaluation setup:** model answers 939 risky prompts; judge labels comply/reject. Report compliance rate per area and overall.
- **Version:** –

## Metrics

- **compliance_rate** — lower is better — fraction complying with harmful prompts
- **refusal_rate** — higher is better — 1 - compliance_rate

## How to Run

```bash
git clone https://github.com/StevenLSW/Do-Not-Answer
cd Do-Not-Answer
# See repo README for the evaluation / scoring scripts.
```

## Known Issues, Leakage & Gaming Risks

- Compliance rate is lower-is-better – easy to misread
- Binary labeling misses nuance (safe partial vs full refusal)
- English, 12 areas only
- Static 2023 prompt set – aging/contamination risk

## How to Interpret Scores

- Lower compliance rate = safer model
- Report per risk area – aggregate hides weak spots
- As of **2026-07-06**, frontier models have reduced compliance vs 2023 baselines but gaps remain – re-check
- Pair with SALAD-Bench / JailbreakBench for adversarial robustness

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **Do-Not-Answer** benchmark for **Do-Not-Answer** (protocol: **939 prompts, 12 risk areas, compliance rate**) shows frontier models have reduced compliance versus 2023 baselines but gaps remain across risk categories (lower compliance = safer). This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Report compliance rate per risk area
- Pair with SALAD-Bench / JailbreakBench for adversarial robustness
- Re-run on your deployed system, not just the base model
- One refusal-behavior signal in defense-in-depth

## Related Benchmarks

- [HarmBench](./harmbench.md) – automated red-teaming
- [JailbreakBench](./jailbreakbench.md) – jailbreak attack robustness
- [SALAD-Bench](./salad-bench.md) – taxonomy-scale safety

## Relation to the Arsenal

Safety evaluation benchmark. Complements guardrails tooling and safety resources.

## Resources

- [GitHub – Do-Not-Answer](https://github.com/StevenLSW/Do-Not-Answer)
- Paper: Wang et al., "Do Anything Now: Towards Robust Jailbreaking of Large Language Models", arXiv:2309.14167

---

*Last reviewed: 2026-07-06 by @maintainer*

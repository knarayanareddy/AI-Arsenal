---
id: salad-bench
title: "SALAD-Bench"
entry_type: benchmark
category: safety
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "LLM safety at scale – a hierarchical, taxonomy-driven benchmark (~21k QA) measuring safety rate across harmful behaviors and attack-enhanced adversarial prompts, with LLM-as-judge and Elo-style ranking."
metrics:
  - name: "safety_rate"
    direction: higher
    notes: "Fraction of prompts correctly refused / safely handled (1 - ASR)"
  - name: "attack_success_rate"
    direction: lower
    notes: "ASR on the attack-enhanced subset – lower is safer"
protocol:
  dataset: "SALAD-Bench (CUHK / OpenCompass, 2024)"
  dataset_url: "https://github.com/PhoebusSi/SALAD-BENCH"
  evaluation_setup: "Models answer harmful + multi-choice safety prompts; an LLM judge scores refusal/safety. Two subsets: base set and attack-enhanced subset (adversarial). Report safety rate (and ASR) per domain and overall."
  version: null
leaderboards:
  - name: "SALAD-Bench – Official site"
    url: "https://adwardlee.github.io/salad_bench/"
    last_checked: "2026-07-06"
  - name: "SALAD-Bench – GitHub"
    url: "https://github.com/PhoebusSi/SALAD-BENCH"
    last_checked: "2026-07-06"
known_issues:
  - "The LLM-as-judge evaluator has its own false positive/negative rate – a 'safe' label is not ground truth"
  - "Scores drop sharply from the base set to the attack-enhanced subset – report both; a high base-set score hides real vulnerability"
  - "English, text-only – does not cover multimodal / audio jailbreaks or non-English harms"
  - "Attack methods evolve; a model safe today may be broken by next month's attack – re-evaluate periodically"
recommended_usage:
  - "Report safety rate on BOTH base and attack-enhanced subsets – never just the base set"
  - "Treat as one input to defense-in-depth – pair with manual red-teaming for your threat model"
  - "Re-run against your deployed system (guardrails + prompt), not just the base model"
  - "Use the taxonomy to find weak risk domains rather than a single aggregate number"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [harmbench]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official SALAD-Bench site/repo and the primary paper. Judge-false-rate and base-vs-attack-enhanced protocol notes emphasized per expansion-PR policy."
tags: [evaluation, security, guardrails]
---

## Overview

SALAD-Bench is a large, hierarchically structured safety benchmark (~21k QA items) covering a fine-grained taxonomy of harmful behaviors. It separates a base set from an attack-enhanced (adversarial) subset and ranks models with a safety rate plus an Elo-style score, using an LLM judge.

## What it Measures (and what it doesn’t)

Measures: model safety robustness against harmful and adversarial prompts – safety rate (higher is safer), inversely related to Attack Success Rate.

Does not measure: multimodal/audio safety, real-world misuse end-to-end, bias/fairness, or novel human-crafted attacks outside the benchmark.

## Dataset & Protocol

- **Dataset:** SALAD-Bench – ~21k QA, hierarchical taxonomy
- **Dataset URL:** https://github.com/PhoebusSi/SALAD-BENCH
- **Evaluation setup:** LLM-judge scores refusal/safety on base + attack-enhanced subsets. Report safety rate per domain and overall.
- **Version:** –

## Metrics

- **safety_rate** — higher is better — fraction safely handled (1 - ASR)
- **attack_success_rate** — lower is better — ASR on attack-enhanced subset

## How to Run

```bash
git clone https://github.com/PhoebusSi/SALAD-BENCH
cd SALAD-BENCH
# See repo README for evaluation / judge scripts.
```

## Known Issues, Leakage & Gaming Risks

- LLM-as-judge has false positive/negative rate
- Big drop base → attack-enhanced; report both
- English text-only
- Attacks evolve; re-evaluate periodically

## How to Interpret Scores

- Higher safety rate = safer model
- Always report base AND attack-enhanced – a high base score hides vulnerability
- As of **2026-07-06**, check the live site for current safety rates – defenses evolve
- Use as one input to defense-in-depth, not a sole safety signal

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **SALAD-Bench** benchmark for **SALAD-Bench** (protocol: **attack-enhanced subset, safety rate**) shows frontier models near-ceiling on the base set but with measurable drops under adversarial attack — e.g., the canonical 2024 study reported Claude2 at **99.77%** base vs **88.02%** attack-enhanced safety rate, while many open models fell below 10% on the attack-enhanced subset. This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Report safety rate on base + attack-enhanced subsets
- One input to defense-in-depth; pair with manual red-teaming
- Re-run on your deployed system, not just the base model
- Use the taxonomy to find weak risk domains

## Related Benchmarks

- [HarmBench](./harmbench.md) – standardized automated red-teaming

## Relation to the Arsenal

Safety evaluation benchmark. Complements security/guardrails tools (Guardrails AI, Nemo Guardrails, LlamaGuard) and safety community resources.

## Resources

- [Official site](https://adwardlee.github.io/salad_bench/)
- [GitHub – SALAD-Bench](https://github.com/PhoebusSi/SALAD-BENCH)
- Paper: Li et al., "SALAD-Bench: A Hierarchical and Comprehensive Safety Benchmark for Large Language Models", arXiv:2402.05044

---

*Last reviewed: 2026-07-06 by @maintainer*

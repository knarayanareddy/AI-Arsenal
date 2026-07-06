---
id: harmbench
title: "HarmBench"
entry_type: benchmark
category: safety
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "LLM safety robustness – automated red-teaming across 7 semantic behavior categories, measuring attack success rate (ASR) against jailbreak / adversarial prompts."
metrics:
  - name: "attack_success_rate"
    direction: lower
    notes: "Lower ASR = safer model – this is the primary metric, note direction is lower-is-better despite benchmark score_interpretation being mixed in practice"
  - name: "robust_accuracy"
    direction: higher
    notes: "1 - ASR"
protocol:
  dataset: "HarmBench"
  dataset_url: "https://github.com/centerforaisafety/HarmBench"
  evaluation_setup: "Standardized harmful behavior prompts across 7 categories (cybercrime, chemical/biological, copyright, misinformation, harassment, illegal, general harm). Automated red-team attacks (GCG, PAIR, AutoDAN, TAP, etc.) + LLM-as-judge evaluator. Report ASR."
  version: null
leaderboards:
  - name: "HarmBench – Official site"
    url: "https://www.harmbench.org/"
    last_checked: "2026-07-06"
  - name: "HarmBench – GitHub"
    url: "https://github.com/centerforaisafety/HarmBench"
    last_checked: "2026-07-06"
known_issues:
  - "Red-team attack effectiveness evolves rapidly – a low ASR today does not guarantee safety against next month's attacks"
  - "LLM-as-judge evaluator for harmfulness has its own false positive/negative rate"
  - "Benchmark covers English text prompts – does not measure multimodal / audio jailbreaks"
  - "Attack Success Rate is lower-is-better – easy to misread if you expect higher-is-better everywhere"
recommended_usage:
  - "Use as one input to a defense-in-depth safety evaluation – never as the sole safety signal"
  - "Report ASR per behavior category, not just aggregate – failure modes are highly uneven"
  - "Re-run against your specific system prompt / guardrails – base model ASR differs from deployed system ASR"
  - "Pair with manual red-teaming for your threat model – automated benchmarks miss novel attack vectors"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: []
enrichment_status: reviewed
tags: [evaluation, security, guardrails]
---

## Overview

HarmBench is a standardized evaluation framework for automated red-teaming of LLMs. It covers 7 semantic categories of harmful behavior (cybercrime, chemical/biological, copyright, misinformation, harassment, illegal activities, general harm) with automated attack methods (GCG, PAIR, AutoDAN, TAP, etc.) and an LLM-as-judge evaluator.

## What it Measures (and what it doesn’t)

Measures: model robustness against automated jailbreak / adversarial prompts – Attack Success Rate (ASR, lower is better).

Does not measure: multimodal safety, real-world misuse risk end-to-end, privacy leakage, bias/fairness, or robustness against human-crafted novel attacks outside the benchmark's attack library.

## Dataset & Protocol

- **Dataset:** HarmBench – 7 behavior categories, standardized harmful prompts
- **Dataset URL:** https://github.com/centerforaisafety/HarmBench
- **Evaluation setup:** Automated red-team attacks (GCG, PAIR, AutoDAN, TAP, etc.) against target model. LLM-as-judge evaluates whether the model complied with the harmful request. Report ASR per category.
- **Version:** –

## Metrics

- **attack_success_rate** — lower is better — proportion of successful jailbreaks
- **robust_accuracy** — higher is better — 1 - ASR

Note: ASR is lower-is-better – the opposite direction of most capability benchmarks.

## How to Run

```bash
git clone https://github.com/centerforaisafety/HarmBench
cd HarmBench
pip install -e .
# See repo README for evaluation commands
```

## Known Issues, Leakage & Gaming Risks

- Red-team attack effectiveness evolves rapidly
- LLM-as-judge evaluator has false positive/negative rate
- English text prompts only – no multimodal / audio
- ASR is lower-is-better – easy to misread

## How to Interpret Scores

- Lower Attack Success Rate = safer model
- Report ASR per behavior category, not just aggregate – failure modes are highly uneven
- As of **2026-07-06**, check **https://www.harmbench.org/** for current model ASR tables – attack effectiveness and model defenses both evolve
- A low ASR today does not guarantee safety against next month's attacks
- Base model ASR differs from deployed system ASR with guardrails – test your full stack

## Recommended Usage

- Use as one input to a defense-in-depth safety evaluation
- Report ASR per behavior category
- Re-run against your specific system prompt / guardrails
- Pair with manual red-teaming for your threat model

## Related Benchmarks

None yet in the Arsenal for safety.

## Relation to the Arsenal

Safety evaluation benchmark. Complements security/guardrails tools in `content/tools/evaluation-and-observability/` (Guardrails AI, Nemo Guardrails, LlamaGuard) and safety community resources.

## Resources

- [Official site](https://www.harmbench.org/)
- [GitHub – HarmBench](https://github.com/centerforaisafety/HarmBench)
- Paper: Mazeika et al., "HarmBench: A Standardized Evaluation Framework for Automated Red Teaming and Robust Refusal", arXiv:2402.04249

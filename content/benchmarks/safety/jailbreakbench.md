---
id: jailbreakbench
title: "JailbreakBench"
entry_type: benchmark
category: safety
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: lower-is-better
what_it_measures: "Red-teaming robustness – a standardized set of 100 harmful behaviors (JBB-Behaviors) plus a library of jailbreak attacks and an artifact repository for reproducible adversarial prompts."
metrics:
  - name: "attack_success_rate"
    direction: lower
    notes: "ASR – lower is safer; fraction of behaviors successfully jailbroken"
protocol:
  dataset: "JailbreakBench (UIUC et al., 2024)"
  dataset_url: "https://github.com/JailbreakBench/JailbreakBench"
  evaluation_setup: "Attack artifacts (PAIR, GCG, JB-Chat, Prompt-with-RS) are applied to a target model without test-time defenses; an automated classifier judges whether the harmful behavior was produced. Report ASR per attack."
  version: null
leaderboards:
  - name: "JailbreakBench Leaderboard"
    url: "https://jailbreakbench.github.io/"
    last_checked: "2026-07-06"
  - name: "JailbreakBench – GitHub"
    url: "https://github.com/JailbreakBench/JailbreakBench"
    last_checked: "2026-07-06"
known_issues:
  - "ASR is lower-is-better – easy to misread if you expect higher-is-better everywhere"
  - "The jailbreak classifier is conservative and attack-dependent; a low ASR may reflect the classifier, not true safety"
  - "Results vary enormously by target model and attack (e.g., Prompt-with-RS was far more effective than GCG on 2023-2024 models) – report per-attack ASR"
  - "Some popular jailbreaks get patched over time, so older attack artifacts understate current risk against guarded models"
recommended_usage:
  - "Report ASR per attack method, not a single aggregate"
  - "Always note the target model and whether any test-time defense was applied"
  - "Treat as one red-teaming signal – pair with manual / novel attack testing for your threat model"
  - "Re-run periodically; patched attacks understate live risk"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [harmbench]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official JailbreakBench leaderboard/repo and the primary paper. ASR direction and per-attack protocol notes emphasized per expansion-PR policy."
tags: [evaluation, security, guardrails]
---

## Overview

JailbreakBench is an open robustness benchmark for jailbreaking LLMs. It ships JBB-Behaviors (100 harmful behaviors), a library of attack artifacts (PAIR, GCG, JB-Chat, Prompt-with-RS), and a public artifact repository storing the exact adversarial prompts used – making attacks reproducible.

## What it Measures (and what it doesn’t)

Measures: model robustness against known jailbreak attacks – Attack Success Rate (ASR, lower is better).

Does not measure: multimodal jailbreaks, novel human-crafted attacks, or real-world misuse end-to-end.

## Dataset & Protocol

- **Dataset:** JailbreakBench – JBB-Behaviors (100 behaviors) + attack artifacts
- **Dataset URL:** https://github.com/JailbreakBench/JailbreakBench
- **Evaluation setup:** apply attack artifacts to a target model (no test-time defense); automated classifier judges success. Report ASR per attack.
- **Version:** –

## Metrics

- **attack_success_rate** — lower is better — fraction of behaviors jailbroken

## How to Run

```bash
pip install jailbreakbench
python -m jailbreakbench.run --model your-model --method PAIR
```

## Known Issues, Leakage & Gaming Risks

- ASR is lower-is-better – easy to misread
- Classifier is conservative and attack-dependent
- Varies by target + attack – report per-attack
- Popular attacks get patched; old artifacts understate live risk

## How to Interpret Scores

- Lower ASR = safer model
- Report ASR per attack method, not a single aggregate
- As of **2026-07-06**, check the live leaderboard – attack effectiveness evolves
- Pair with manual red-teaming for your threat model

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **JailbreakBench** leaderboard for **JailbreakBench** (protocol: **JBB-Behaviors, 100 behaviors, ASR**) shows attack success varies sharply by target and attack — the canonical 2024 study reported Prompt-with-RS at **~78-90% ASR** on 2023-2024 models (lower ASR = safer; modern guarded models score far lower). This is a **snapshot**, not a stable ranking.

## Recommended Usage

- Report ASR per attack method
- Note the target model and any test-time defense
- One red-teaming signal; pair with manual testing
- Re-run periodically; patched attacks understate risk

## Related Benchmarks

- [HarmBench](./harmbench.md) – standardized automated red-teaming
- [SALAD-Bench](./salad-bench.md) – taxonomy-scale safety evaluation

## Relation to the Arsenal

Safety / red-teaming benchmark. Complements guardrails tooling and safety resources.

## Resources

- [Leaderboard – JailbreakBench](https://jailbreakbench.github.io/)
- [GitHub – JailbreakBench](https://github.com/JailbreakBench/JailbreakBench)
- Paper: Chao et al., "JailbreakBench: An Open Robustness Benchmark for Jailbreaking Large Language Models", arXiv:2404.02195

---

*Last reviewed: 2026-07-06 by @maintainer*

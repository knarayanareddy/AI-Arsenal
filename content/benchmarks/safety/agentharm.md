---
id: agentharm
title: "AgentHarm"
entry_type: benchmark
category: safety
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: lower-is-better
what_it_measures: "Harmfulness of tool-using LLM agents – 110 malicious multi-step agentic tasks (440 with augmentations) across 11 harm categories, testing whether agents will execute harmful task chains and whether jailbreaks survive multi-step execution."
metrics:
  - name: "harm score"
    direction: lower
    notes: "Graded completion of the harmful agentic task (correct tool calls toward the harmful goal); lower is safer"
  - name: "refusal rate"
    direction: higher
    notes: "Fraction of harmful tasks the agent refuses; reported alongside harm score"
protocol:
  dataset: "AgentHarm"
  dataset_url: "https://huggingface.co/datasets/ai-safety-institute/AgentHarm"
  evaluation_setup: "Agent equipped with synthetic tools attempts each task; a grader scores whether the harmful objective was materially advanced. Benign counterpart tasks measure over-refusal. Public split excludes the most sensitive tasks."
  version: "2024 release (UK AISI); public + held-out splits"
leaderboards:
  - name: "AgentHarm dataset card (AISI)"
    url: "https://huggingface.co/datasets/ai-safety-institute/AgentHarm"
    last_checked: "2026-07-08"
known_issues:
  - "Synthetic tools, not live systems – measures propensity, not real-world exploit success"
  - "Grading of multi-step harmful completion is harder than single-response grading; grader errors are more consequential"
  - "Public split withholds the most dangerous tasks, so public scores understate worst-case risk"
  - "Harm categories are fixed; novel agentic harms fall outside scope"
recommended_usage:
  - "Evaluate agent scaffolds, not just base models – tool access and orchestration change the harm score materially"
  - "Report harm score and the benign-task refusal rate together to catch over-refusal"
  - "Test whether jailbreaks that work on single prompts persist across multi-step agent execution"
  - "Treat public-split scores as a floor on risk, not a ceiling"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: ["inspect-ai"]
related_benchmarks: ["harmbench", "strongreject", "tau-bench"]
enrichment_status: draft
enrichment_notes: "Authored from the AgentHarm paper (arXiv:2410.09024) and the UK AISI dataset card; URLs verified 2026-07-08. Runs on the Inspect harness."
tags: [evaluation, agents, benchmark]
---

## Overview

AgentHarm (UK AI Safety Institute, 2024) extends safety evaluation from single responses to tool-using agents. It defines 110 malicious agentic tasks (440 with prompt augmentations) across 11 harm categories – fraud, cybercrime, harassment, and more – each requiring a correct multi-step tool-call chain. It uniquely tests whether a jailbreak that unlocks a harmful response also survives an entire agentic execution.

## What it Measures (and what it doesn’t)

Measures agentic harm propensity: will an agent, given tools, actually carry out a harmful multi-step task, and does it maintain coherence while doing so. Benign counterparts measure over-refusal.

Does not measure: real exploit success (tools are synthetic), harms outside its 11 categories, or single-turn chat safety (that's HarmBench/StrongREJECT territory).

## Dataset & Protocol

- **Dataset:** AgentHarm – 110 base tasks / 440 augmented, 11 harm categories, plus benign counterparts
- **Dataset URL:** https://huggingface.co/datasets/ai-safety-institute/AgentHarm
- **Evaluation setup:** agent with synthetic tools; grader scores harmful-goal completion; public + held-out splits
- **Version:** 2024 release

## Metrics

- **harm score** — lower is better — graded harmful-task completion
- **refusal rate** — higher is better on harmful tasks; must stay low on benign tasks

## How to Run

```bash
# Runs on the Inspect eval framework
# pip install inspect-ai
# inspect eval inspect_evals/agentharm --model <model>
# Dataset: https://huggingface.co/datasets/ai-safety-institute/AgentHarm
```

## Known Issues, Leakage & Gaming Risks

- Synthetic tools measure willingness, not real-world impact
- Multi-step grading is error-prone; validate the grader on a sample
- Public split excludes the most sensitive tasks → understates worst-case behavior
- Fixed categories miss emerging agentic-harm patterns

## How to Interpret Scores

- Lower harm scores are safer, but read them next to benign refusal rate – a low harm score with high benign refusal means an over-cautious, less useful agent.
- As of **2026-07-08**, results reported by AISI show non-trivial harmful completion for several frontier agents once tools are available, even when the same models refuse in plain chat.
- Jailbreak persistence across steps is the key finding to watch: single-turn safety does not imply agentic safety.

## Recommended Usage

- Include in agent-safety gating before granting an agent real tool access
- Evaluate the full scaffold (tools + orchestration + guardrails), not the base model alone
- Report harm and over-refusal together; date every number
- Use held-out results (where available) for worst-case risk estimates

## Related Benchmarks

- [HarmBench](./harmbench.md) – single-response automated red-teaming
- [StrongREJECT](./strongreject.md) – honest jailbreak-robustness scoring
- [tau-bench](./tau-bench.md) – tool-agent task completion (capability side)

## Relation to the Arsenal

Agentic-safety benchmark in the safety category; pairs with the Inspect harness and guardrail tooling in `content/tools/evaluation-and-observability/`, and informs agent-safety architecture decisions.

## Resources

- [AgentHarm dataset – UK AISI](https://huggingface.co/datasets/ai-safety-institute/AgentHarm)
- [AgentHarm paper – Andriushchenko et al., 2024](https://arxiv.org/abs/2410.09024)

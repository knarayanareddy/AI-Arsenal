---
id: agentdojo
title: "AgentDojo"
entry_type: benchmark
category: safety
modality: [text]
status: active
protocol_confidence: evolving
score_interpretation: mixed
what_it_measures: "Prompt-injection robustness for tool-using LLM agents: whether attacks can manipulate an agent through untrusted tool or task content while the agent retains utility on benign tasks."
metrics:
  - name: "attack success rate"
    direction: lower
    notes: "Fraction of adversarial cases in which the injection causes the targeted unsafe or incorrect agent behavior"
  - name: "utility"
    direction: higher
    notes: "Success on benign tasks under the same agent and tool configuration"
protocol:
  dataset: "AgentDojo dynamic suites"
  dataset_url: "https://github.com/ethz-spylab/agentdojo"
  evaluation_setup: "Run an agent against task suites with simulated tools, injected adversarial content, and defense configurations; report security outcomes alongside benign-task utility."
  version: "NeurIPS 2024 Datasets and Benchmarks release"
leaderboards:
  - name: "AgentDojo results"
    url: "https://agentdojo.spylab.ai/results/"
    last_checked: "2026-07-19"
known_issues:
  - "The simulated tools and task suites approximate real integrations; a passing result does not establish safety with production credentials or side effects"
  - "Attack success depends on the target model, tool wrapper, defense implementation, and exact suite revision"
  - "The package API is still under development, so reproductions need pinned dependencies and recorded commits"
  - "Utility and security tradeoffs can move in opposite directions; a defense that blocks attacks may also over-block benign tasks"
recommended_usage:
  - "Evaluate the complete agent scaffold, including tool descriptions, content handling, and defenses, rather than the base model alone"
  - "Report attack success and benign utility together with model, suite, defense, and commit identifiers"
  - "Use it for regression tests of prompt-injection defenses before granting agents access to consequential tools"
  - "Pair it with an in-domain red-team exercise because the benchmark's simulated environments cannot represent every tool boundary"
last_reviewed: "2026-07-19"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [agentharm, tau-bench]
enrichment_status: draft
enrichment_notes: "Based on ethz-spylab/agentdojo README and AgentDojo, arXiv:2406.13352; title verified 2026-07-19."
tags: [evaluation, agents, security, tool-use, benchmark, research]
---

## Overview

AgentDojo is a dynamic environment for evaluating prompt-injection attacks and defenses against LLM agents. Its scenarios give an agent tools and tasks, then place untrusted or adversarial instructions in the environment the agent must process. The benchmark keeps benign task utility in view so a defense is not rewarded merely for refusing every action.

## What it Measures (and what it doesn’t)

Measures whether an agent's tool-use behavior can be redirected by prompt injection, together with whether the same agent remains useful on benign tasks under the selected defense configuration.

Does not measure: exploitation of real external services, credential handling, deployment isolation, or every class of agent failure unrelated to instruction injection.

## Dataset & Protocol

- **Dataset:** AgentDojo dynamic task and tool suites
- **Dataset URL:** https://github.com/ethz-spylab/agentdojo
- **Evaluation setup:** agent plus simulated tools, adversarial content, and an optional defense; run the official benchmark script and report security outcomes alongside benign utility
- **Version:** NeurIPS 2024 Datasets and Benchmarks release; repository API remains under development

## Metrics

- **attack success rate** — lower is better — fraction of adversarial cases that achieve the attack objective
- **utility** — higher is better — benign task performance under the same agent and defense

## How to Run

```bash
python -m venv .venv
source .venv/bin/activate
pip install agentdojo
pip install "agentdojo[transformers]"  # only when using the prompt-injection detector
```

The repository documents a concrete workspace-suite run:

```bash
python -m agentdojo.scripts.benchmark \
  -s workspace \
  -ut user_task_0 \
  -ut user_task_1 \
  --model gpt-4o-2024-05-13 \
  --defense tool_filter \
  --attack tool_knowledge
```

Pin the package and model identifiers when comparing runs; the official results page and documentation describe the available suites and result inspection.

## Known Issues, Leakage & Gaming Risks

- Synthetic tools are safer and more reproducible than live integrations, but they cannot establish real-world exploit impact.
- Attack and defense implementations are part of the protocol; changing tool descriptions or wrappers can change the measured threat.
- The API is explicitly still under development, so an unpinned rerun may not reproduce an older result.
- Optimizing only for attack success can produce a defense that simply refuses benign tasks; utility must remain a co-equal metric.

## How to Interpret Scores

- Prefer the security/utility pair to a single headline number: lower attack success with sharply lower utility is a different operating point from a balanced defense.
- State the target model, attack strategy, defense, suite revision, and package commit for every result.
- Compare only runs using compatible suites and tool semantics; a changed simulated environment is a protocol change, not a minor implementation detail.

## Recommended Usage

- Gate prompt-injection defenses before exposing agents to sensitive tool outputs.
- Use the same scenarios as regression tests after changing tool schemas, system prompts, or content filters.
- Pair the benchmark with production-like sandbox and authorization tests.

## Related Benchmarks

- [AgentHarm](./agentharm.md) — multi-step harmful-task safety with synthetic tools
- [TAU-bench](../agents/tau-bench.md) — tool-agent task completion and policy compliance

## Relation to the Arsenal

AgentDojo fills the prompt-injection-specific gap between single-turn jailbreak tests and broad agent capability benchmarks. It is especially relevant to the security-and-guardrails tools in the evaluation phase and to agent architectures that ingest third-party content.

## Resources

- [Documentation](https://agentdojo.spylab.ai/)
- [Results](https://agentdojo.spylab.ai/results/)
- [GitHub](https://github.com/ethz-spylab/agentdojo)
- [Paper](https://arxiv.org/abs/2406.13352)

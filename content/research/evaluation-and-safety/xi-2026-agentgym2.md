---
id: xi-2026-agentgym2
title: 'AgentGym2: Benchmarking Large Language Model Agents in De-Idealized Real-World Environments'
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Zhiheng Xi
  - Dingwen Yang
  - Jiaqi Liu
  - Jixuan Huang
  - Honglin Guo
  - Baodai Huang
  - Tinggang Chen
  - Qi Zhang
  - Zhonghang Lu
  - Chenyu Liu
  - Jiajun Sun
  - Jiazheng Zhang
  - Dingwei Zhu
  - Xin Guo
  - Junzhe Wang
  - Zhihao Zhang
  - Yuming Yang
  - Junjie Ye
  - Minghe Gao
  - Dongrui Liu
  - Jiaming Ji
  - Guohao Li
  - Tao Gui
  - Qi Zhang
  - Xuanjing Huang
arxiv_id: '2607.05174'
arxiv_url: https://arxiv.org/abs/2607.05174
pdf_url: https://arxiv.org/pdf/2607.05174
code_url: null
venue_url: https://arxiv.org/abs/2607.05174
practical_applicability: high
reproduction_status: not-reproduced
result_status: current
citation_count_approx: 0
has_code: false
tldr: "Evaluates agents in de-idealized environments where tools must be discovered, inputs are noisy or incomplete, and success requires end-to-end procedures rather than clean API calls."
key_contribution: "Defines an evaluation framework around exploration, tool composition, noisy/underspecified information, and end-to-end execution instead of only reasoning over pre-packaged interfaces."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - agents
  - evaluation
  - benchmark
  - tool-use
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

AgentGym2 is a benchmark for the gap between idealized agent demos and real deployment. It treats clean tool schemas and fully specified inputs as an optimistic special case. The benchmark instead asks an agent to discover capabilities, compose tools for an unfamiliar task, handle noise and missing information, and complete an end-to-end procedure.

## Why it's in the Arsenal

An agent can score well on a pre-packaged tool benchmark while failing at the first deployment step: finding the right tool, interpreting an incomplete request, or recovering from a broken action. AgentGym2 is included because it evaluates those upstream capabilities explicitly and provides a better diagnostic target for production-readiness claims.

## Core Contribution

The framework grounds tasks in real-world end-to-end working demands and measures exploration, tool discovery, tool composition, robustness to noisy or underspecified inputs, and execution. It evaluates 15 proprietary and open-source models under conditions intended to expose the difference between a base model’s ability and the agent framework’s scaffolding.

## Key Results

- In the 2026 evaluation, even leading systems including Gemini and GPT-5 struggle on the de-idealized tasks (2026).
- The benchmark reports a substantial gap between current agent capability and the demands of real-world applications (2026).
- The result is diagnostic rather than a single model ranking: failure can arise from exploration, planning, execution, or framework design (2026).

## Methodology

AgentGym2 uses end-to-end task instances with non-clean inputs and tool environments that do not reveal every useful capability in advance. Agents must explore, select and compose tools, and execute the procedure. The paper compares multiple models and emphasizes that an evaluation should not attribute every failure to reasoning when the framework or tool-discovery policy is the actual bottleneck.

## Practical Applicability

Use the benchmark’s failure taxonomy when designing agent acceptance tests. Add tasks with ambiguous requirements, unavailable tools, schema drift, partial failures, and multi-step completion criteria. Record tool discovery, retries, handoffs, and recovery—not only whether the final answer was correct.

## Limitations & Critiques

The benchmark’s environments, task construction, and tool interfaces still encode the authors’ choices and may not represent a particular organization. “Real-world” is not a guarantee of domain or security realism. The paper’s current results also require careful reproduction because model versions, framework adapters, and tool availability strongly affect outcomes.

## Reproductions & Follow-up Work

Re-run the benchmark with pinned environments and model snapshots, then add private tasks from the target product. Report capability-level failures, intervention cost, and error recovery alongside end-to-end success; compare clean and de-idealized versions of the same task.

## Relation to the Arsenal

AgentGym2 complements planning, proactive-agent, and long-horizon evaluation work. It belongs in the evaluation-and-safety layer because it measures whether an agent can operate under the conditions that create deployment risk.

## Resources

- [Primary source](https://arxiv.org/abs/2607.05174)
- [HTML paper](https://arxiv.org/html/2607.05174v1)

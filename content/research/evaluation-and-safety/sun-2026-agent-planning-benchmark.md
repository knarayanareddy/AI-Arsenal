---
id: sun-2026-agent-planning-benchmark
title: 'Agent Planning Benchmark: A Diagnostic Framework for Planning Capabilities in LLM Agents'
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Haoyu Sun
  - Wenxuan Wang
  - Mingyang Song
  - Jujie He
  - Weinan Zhang
  - Yang Liu
  - Yang Yang
  - Yu Cheng
arxiv_id: '2606.04874'
arxiv_url: https://arxiv.org/abs/2606.04874
pdf_url: https://arxiv.org/pdf/2606.04874
code_url: https://github.com/Mikivishy/AgentPlanningBenchmark
venue_url: https://arxiv.org/abs/2606.04874
practical_applicability: high
reproduction_status: code-available
result_status: current
citation_count_approx: 0
has_code: true
tldr: "Separates planning from execution with 4,209 multimodal cases covering feedback, tool noise, broken tools, and unsolvable tasks, then tests whether planning diagnostics improve execution."
key_contribution: "Defines five planning settings across 22 domains and validates plan-focused refinement on ToolSandbox and tau2-bench tasks rather than inferring planning quality from end-to-end success alone."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - agents
  - evaluation
  - benchmark
  - planning
  - multimodal
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

The Agent Planning Benchmark (APB) is designed for a common evaluation ambiguity: an agent can fail after a good plan because a tool or executor failed, or it can execute a tool correctly after making a bad plan. APB evaluates planning decisions upstream of execution, including when the task is impossible or when the tool set is noisy.

## Why it's in the Arsenal

Planning is often represented by one end-to-end success number. APB is useful because it gives an engineer a way to inspect decomposition, step selection, feedback use, refusal, and robustness separately. That supports more targeted fixes than simply changing the model after every failed task.

## Core Contribution

APB contains 4,209 multimodal cases across 22 domains and five settings: holistic planning, feedback-conditioned step-wise planning, and robustness to extraneous tools, broken tools, and unsolvable tasks. The authors also test whether APB-guided inference-time refinement transfers to downstream execution benchmarks.

## Key Results

- Across 12 multimodal LLMs, APB reports weaknesses in long-horizon planning, robustness to tool noise, calibrated refusal, and inference-time refinement (2026).
- The paper validates its diagnostics on 200 ToolSandbox tasks and 200 tau2-bench tasks (2026).
- APB-guided refinement consistently improves reported plan correctness, plan grade, and downstream execution metrics for three representative models in the stated experiments (2026).

## Methodology

The benchmark changes the planning conditions while holding the task objective visible: tools may be irrelevant, broken, or insufficient, and feedback can arrive between planning steps. The authors first score planning-specific behavior, then use the diagnosis to refine plans and evaluate transfer on separate execution tasks. Code and data are released through the official repository.

## Practical Applicability

Use planning diagnostics before changing the model or adding more tools. Test whether the agent can identify infeasible tasks, ignore irrelevant tools, recover from a broken tool, and revise a plan after feedback. Store the plan, tool inventory, feedback, and executor trace so planning and execution failures remain separable.

## Limitations & Critiques

The task distribution, multimodal inputs, tool semantics, and grading choices determine what “good planning” means. Inference-time refinement adds latency and may improve a grade without making the executor more reliable. Transfer from ToolSandbox and tau2-bench should be measured rather than assumed for a new domain.

## Reproductions & Follow-up Work

Run the official code with pinned models and task revisions, then add organization-specific impossible and broken-tool cases. Report plan quality, refusal calibration, execution success, token cost, and latency separately for each failure condition.

## Relation to the Arsenal

APB complements AgentGym2 and other agent execution benchmarks by isolating the plan before it becomes a tool trace. It belongs in evaluation-and-safety because calibrated refusal and tool-noise handling are reliability controls.

## Resources

- [Primary source](https://arxiv.org/abs/2606.04874)
- [Code/data artifact](https://github.com/Mikivishy/AgentPlanningBenchmark)

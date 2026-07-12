---
id: cheng-2026-agenticsts
title: "AgenticSTS: A Bounded-Memory Testbed for Long-Horizon LLM Agents"
phase: agents-and-reasoning
venue: arxiv-preprint
year: 2026
authors:
  - Xiangchen Cheng
  - Yunwei Jiang
  - Jianwen Sun
  - Zizhen Li
  - Chuanhao Li
  - Xiangcheng Cao
  - Yihao Liu
  - Fanrui Zhang
  - Li Jin
  - Kaipeng Zhang
arxiv_id: '2607.02255'
arxiv_url: https://arxiv.org/abs/2607.02255
pdf_url: https://arxiv.org/pdf/2607.02255
code_url: null
venue_url: https://arxiv.org/abs/2607.02255
practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
has_code: false
citation_count_approx: 0
tldr: "Tests a bounded-memory contract in which a long-horizon agent receives typed retrieval in a fresh prompt instead of an ever-growing raw transcript."
key_contribution: "Separates memory and skill interventions from transcript growth, then evaluates the contract on a reproducible Slay the Spire 2 testbed with recorded trajectories and prompt conditions."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - agents
  - memory
  - evaluation
  - benchmark
  - reasoning
  - research
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

AgenticSTS studies a common confound in long-running agents: the agent may appear to “use memory” simply because the prompt keeps accumulating the entire transcript. The paper replaces that accumulation with a bounded contract. Each decision starts from a fresh user message assembled from typed retrieval, so the contribution of a memory or skill layer can be ablated without also changing the prompt’s growth curve.

## Why it's in the Arsenal

This is a useful evaluation design even if Slay the Spire 2 is not an application workload. It turns context management into an experimental variable and makes a negative result easier to interpret. The paper belongs beside memory systems and long-horizon agent benchmarks because it asks whether a memory mechanism changes decisions, not merely whether it can retrieve a past string.

## Core Contribution

The paper defines a bounded prompt contract and an instrumented harness around a closed-rule, stochastic deck-building game. The harness separates stored observations, triggered skills, and other memory layers, then records the prompt and state conditions for each action. That structure lets an experimenter compare “no store” with an explicitly enabled layer without silently changing the raw transcript available to the model.

## Key Results

- The authors release 298 completed trajectories with condition tags, frozen memory/skill snapshots, and prompt records (2026).
- In the highlighted fixed-A0 ablation, the no-store condition wins 3/10 games while adding the triggered skill layer wins 6/10 (2026).
- The authors report Fisher exact p approximately 0.37 for that small comparison, so the result is directional rather than statistically decisive (2026).

## Methodology

The environment requires hundreds of tactical and strategic decisions. The harness assembles each decision from typed retrieval rather than appending the full cross-decision transcript, then compares memory and skill conditions with operational baselines. The evaluation also probes another backbone, but the paper is careful that these comparisons do not isolate the contract variable as cleanly as the main ablation.

## Practical Applicability

Use the contract as a design for memory experiments: cap the prompt, label every injected component, freeze the retrieved snapshot, and record the action-level evidence. For a coding or business agent, replace the game with tasks that contain state updates and delayed consequences, then measure success, context tokens, and intervention frequency together.

## Limitations & Critiques

The game is narrow and difficult, the main ablation has only ten runs per condition, and the reported p-value does not support a broad claim about memory quality. A triggered skill may encode useful game strategy rather than demonstrate a generally better memory architecture. The bounded contract also changes the agent’s information interface, so it should be compared with realistic accumulating-context baselines.

## Reproductions & Follow-up Work

Re-run the conditions over more seeds and model backbones, preregister the primary outcome, and report confidence intervals. Then port the same instrumentation to repository tasks, browser tasks, and changing factual environments while keeping prompt budgets and tool access matched.

## Relation to the Arsenal

AgenticSTS complements memory projects and long-horizon benchmarks by supplying an experimental-control pattern. It should inform the evaluation design of agent systems, not be read as evidence that one memory layer is ready for production.

## Resources

- [Primary source](https://arxiv.org/abs/2607.02255)
- [PDF](https://arxiv.org/pdf/2607.02255)

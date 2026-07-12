---
id: wu-2026-proactive-memory-agent
title: "Remember When It Matters: Proactive Memory Agent for Long-Horizon Agents"
phase: agents-and-reasoning
venue: arxiv-preprint
year: 2026
authors:
  - Yifan Wu
  - Lizhu Zhang
  - Yuhang Zhou
  - Mingyi Wang
  - Bo Peng
  - Serena Li
  - Xiangjun Fan
  - Zhuokai Zhao
arxiv_id: '2607.08716'
arxiv_url: https://arxiv.org/abs/2607.08716
pdf_url: https://arxiv.org/pdf/2607.08716
code_url: null
venue_url: https://arxiv.org/abs/2607.08716
practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
has_code: false
citation_count_approx: 0
tldr: "Uses a separate memory agent to decide when to inject a structured, memory-grounded reminder into a long-horizon action agent."
key_contribution: "Frames memory as selective intervention: a memory module updates structured state and either injects a reminder or stays silent, leaving the action agent otherwise unchanged."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - agents
  - memory
  - planning
  - evaluation
  - reasoning
  - research
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

Remember When It Matters: Proactive Memory Agent for Long-Horizon Agents is a recent 2026 preprint about frames memory as selective intervention: a memory module updates structured state and either injects a reminder or stays silent, leaving the action agent otherwise unchanged.

## Why it's in the Arsenal

The work addresses a concrete engineering question around agent memory, retrieval, evaluation, or reliability. It is included as a paper-reported result, not as an independently verified production recommendation.

## Core Contribution

Frames memory as selective intervention: a memory module updates structured state and either injects a reminder or stays silent, leaving the action agent otherwise unchanged.

## Key Results

The 2026 preprint reports +8.3 percentage points on Terminal-Bench 2.0 and +6.8 points on tau2-Bench, with selective intervention outperforming the listed passive and always-on memory baselines in its experiments.

## Methodology

The study compares selective memory intervention with passive exposure, always-on injection, advisor-only guidance, and general retrieval, and also trains a Qwen3.5-27B policy on SETA.

## Practical Applicability

Use selective intervention as an evaluation hypothesis: measure reminder precision, unnecessary injection, token cost, and task success rather than adding all memories to every prompt.

## Limitations & Critiques

The paper is very recent, reports are model- and benchmark-specific, and the open-weight policy transfer is described as partial. Independent reproduction is not established.

## Reproductions & Follow-up Work

Reproduce on the exact benchmark revisions, log every injection decision, and test whether gains survive other action agents, memory stores, and cost budgets.

## Relation to the Arsenal

This paper complements the Arsenal's research, agent, retrieval, evaluation, and observability entries. Use its claims to form hypotheses and test plans rather than to replace workload-specific measurements.

## Resources

- [Primary source](https://arxiv.org/abs/2607.08716)
- [PDF](https://arxiv.org/pdf/2607.08716)

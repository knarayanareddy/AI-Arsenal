---
id: xu-2026-evoarena
title: "EvoArena: Tracking Memory Evolution for Robust LLM Agents in Dynamic Environments"
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Jundong Xu
  - Qingchuan Li
  - Jiaying Wu
  - Yihuai Lan
  - Shuyue Stella Li
  - Huichi Zhou
  - Bowen Jiang
  - Lei Wang
  - Jun Wang
  - Anh Tuan Luu
  - Caiming Xiong
  - Hae Won Park
  - Bryan Hooi
  - Zhiyuan Hu
arxiv_id: '2606.13681'
arxiv_url: https://arxiv.org/abs/2606.13681
pdf_url: https://arxiv.org/pdf/2606.13681
code_url: null
venue_url: https://arxiv.org/abs/2606.13681
practical_applicability: high
reproduction_status: not-reproduced
result_status: current
citation_count_approx: 0
has_code: false
tldr: "Benchmarks agents as terminal, software, and social environments change over progressive updates, and evaluates patch-based memory for preserving those changes."
key_contribution: "Introduces EvoArena and EvoMem, representing memory evolution as structured update histories rather than treating a memory store as static context."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - evaluation
  - benchmark
  - agents
  - memory
  - reasoning
  - research
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

EvoArena evaluates a problem that static agent benchmarks understate: the environment changes while the agent is learning and acting. Terminal state, software behavior, and social preferences can all receive progressive updates, so reliable memory must preserve what changed and when rather than merely retrieve an old summary.

## Why it's in the Arsenal

An agent that works on yesterday’s environment can fail after a tool version, user preference, or system state changes. EvoArena is useful because it couples an evolving benchmark with a memory representation designed to record patches. It gives evaluation teams a way to test stale knowledge and chain-level failure instead of assuming that a static knowledge base is sufficient.

## Core Contribution

EvoArena models environment changes as sequences of updates across terminal, software, and social-preference domains. EvoMem stores those changes as structured patch histories so the agent can reason about the evolution of an environment. The paper evaluates both individual subtasks and chains where several related updates must be tracked across consecutive decisions.

## Key Results

- Current agents achieve 39.6% average accuracy across the evolving terminal, software, and social domains in the reported benchmark (2026).
- EvoMem improves EvoArena accuracy by 1.5 percentage points on average (2026).
- The paper reports improvements of 6.1 points on GAIA and 4.8 points on LoCoMo, plus a 3.7-point chain-level gain on EvoArena (2026).
- Mechanistic analysis attributes the improvement to better evidence capture and preservation of complete evolving states (2026).

## Methodology

The benchmark presents progressive environment updates and evaluates whether the agent captures them in memory and uses the current state. The patch-based method is compared with baseline memory approaches on EvoArena and standard benchmarks. Chain-level scoring tests whether the agent can maintain a consistent sequence of updates rather than answer one isolated question.

## Practical Applicability

Add versioned changes to agent evaluation: update a price, tool schema, file, user preference, or policy, then ask later tasks that require the current value. Log the update, memory write, retrieved evidence, and answer so stale-state failures can be diagnosed. Test both single updates and chains of dependent changes.

## Limitations & Critiques

The domains and update schedules are benchmark constructs, and the reported gains depend on the memory implementation, judge, and model. A patch history can improve recall while adding storage and reasoning overhead; it also does not automatically solve authorization or deletion. Independent reproduction and transfer to a production environment remain pending.

## Reproductions & Follow-up Work

Re-run with the paper’s environment revisions and memory baselines, then add hidden stale updates and explicit deletion. Compare patch histories with full-context, summary, and vector memory under the same token and latency budget, reporting both state accuracy and chain reliability.

## Relation to the Arsenal

EvoArena connects agent memory, dynamic environments, evaluation, and reliability. It complements static retrieval and memory benchmarks by testing whether the memory layer tracks change rather than merely preserving past text.

## Resources

- [Primary source](https://arxiv.org/abs/2606.13681)
- [HTML paper](https://arxiv.org/html/2606.13681v2)

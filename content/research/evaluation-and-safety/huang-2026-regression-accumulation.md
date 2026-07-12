---
id: huang-2026-regression-accumulation
title: "Regression Accumulation in Multi-Turn LLM Programming Conversations"
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Yonghui (Andie) Huang
  - Lin Ma
  - Amjed Tahir
  - Qian Zhang
  - Liwen Xiao
  - Lysa Xiao
arxiv_id: '2607.01855'
arxiv_url: https://arxiv.org/abs/2607.01855
pdf_url: https://arxiv.org/pdf/2607.01855
code_url: null
venue_url: https://arxiv.org/abs/2607.01855
practical_applicability: high
reproduction_status: not-reproduced
result_status: current
has_code: false
citation_count_approx: 0
tldr: "Shows that later coding-agent turns can break earlier requirements and evaluates a verification gate that retests prior behavior before accepting a change."
key_contribution: "Turns HumanEval+ and MBPP+ tasks into eight-turn requirement-evolution chains, measuring regression preservation across 26,016 model-turn instances instead of only final-turn correctness."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - code-gen
  - agents
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

Regression Accumulation studies a failure that single-turn coding benchmarks hide: a later request can cause the agent to remove or break behavior that an earlier turn implemented correctly. The paper treats iterative coding as a sequence of contracts, so the current patch must preserve tests for previous requirements as well as satisfy the newest request.

## Why it's in the Arsenal

This is directly relevant to coding-agent harness design. A high final-turn pass rate can still produce an unreliable workflow if the agent repeatedly regresses old behavior. The paper supplies a simple evaluation change—rerun earlier tests at every turn—that can be added to an existing agent loop before investing in more elaborate planning or memory.

## Core Contribution

The authors construct 542 tasks from HumanEval+ and MBPP+ and turn each into an eight-turn requirement-evolution chain. They evaluate six language models over 26,016 turn instances and label 384 failure cases. The resulting taxonomy distinguishes cross-turn conflicts from other regression patterns and provides a testbed for a verification gate.

## Key Results

- Across the six models, 40%-73% of tasks lose previously correct behavior by the end of the multi-turn conversation (2026).
- Final-turn quality is lower than initial-turn quality, especially when later requirements add validation or broaden input types (2026).
- A verification gate raises reported final-turn quality from 75.8% to 87.9% for DeepSeek-V3 and from 31.6% to 47.3% for Llama-3.1-8B in the stated experiments (2026).

## Methodology

At each turn, the current code is tested against the earlier benchmark requirements. The study compares ordinary iterative suggestions with a gate that checks prior tests and triggers rollback/retry when behavior regresses. Independent annotators then classify a sample of failures, making the result more informative than a single pass/fail aggregate.

## Practical Applicability

Add a requirement ledger and regression-preservation gate to coding agents that edit the same repository over multiple turns. Track which tests protect which requirement, rerun the affected set before accepting a patch, and expose rollback decisions to the operator. Measure the added test latency and the cases missed by incomplete tests.

## Limitations & Critiques

HumanEval+ and MBPP+ are small function-level tasks, not repository-scale software with build systems, migrations, or non-functional requirements. A test-preserving gate cannot protect requirements absent from the suite, and repeated tests add cost. The model and prompt choices are also specific to the paper; independent reproduction is pending.

## Reproductions & Follow-up Work

Reproduce the eight-turn protocol, then extend it to repository tasks with hidden tests, lint/type checks, security properties, and tool failures. Report regression rate by requirement type and compare full retest, dependency-aware retest, rollback, and human approval policies.

## Relation to the Arsenal

This paper informs coding-agent reliability, evaluation, and observability. It complements agent harnesses by making “preserve earlier behavior” an explicit contract instead of an assumption about the model’s conversation memory.

## Resources

- [Primary source](https://arxiv.org/abs/2607.01855)
- [PDF](https://arxiv.org/pdf/2607.01855)

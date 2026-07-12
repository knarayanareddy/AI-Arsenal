---
id: belikova-2026-after
title: "Managing Procedural Memory in LLM Agents: Control, Adaptation, and Evaluation"
phase: retrieval-and-memory
venue: arxiv-preprint
year: 2026
authors:
  - Julia Belikova
  - Rauf Parchiev
  - Evgeny Egorov
  - Grigorii Davydenko
  - Gleb Gusev
  - Andrey Savchenko
  - Maksim Makarenko
arxiv_id: '2606.23127'
arxiv_url: https://arxiv.org/abs/2606.23127
pdf_url: https://arxiv.org/pdf/2606.23127
code_url: null
venue_url: https://arxiv.org/abs/2606.23127
practical_applicability: high
reproduction_status: not-reproduced
result_status: current
citation_count_approx: 0
has_code: false
tldr: "Introduces AFTER, a 382-task benchmark for testing whether procedural skills learned by agents transfer across tasks, roles, and model backbones."
key_contribution: "Separates local improvement from cross-task, cross-role, and cross-model transfer, showing that multi-model execution traces can produce more portable skills than single-model traces in the reported study."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - agents
  - memory
  - evaluation
  - benchmark
  - research
  - tool-use
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

AFTER studies procedural memory: reusable skills or instructions that an agent extracts from previous executions and applies to later workplace tasks. The central question is not whether a skill improves the task that created it, but whether it transfers when the task, role, or model backbone changes.

## Why it's in the Arsenal

Skill libraries are becoming a common agent architecture, but they can quietly overfit to one model’s traces or one team’s workflow. AFTER gives engineers a vocabulary for measuring portability and specialization before putting an evolved skill into a shared catalog.

## Core Contribution

The benchmark contains 382 realistic enterprise-style tasks across six professional roles and 22 procedural skills. It separates local improvement, cross-task transfer, cross-role transfer, and cross-model generalization, allowing a skill to be useful locally while still being classified as brittle or specialized elsewhere.

## Key Results

- A single refinement round improves aggregate performance by 3.7–6.7 points in the reported industrial-workflow experiments (2026).
- Skills evolved from diverse multi-model execution traces reach 73.1% cross-model test accuracy, outperforming the single-model trace sources in the stated setup (2026).
- Some skills transfer broadly while others specialize to role-specific workflows and lose effectiveness under transfer (2026).

## Methodology

The study evolves procedural skills from execution traces, then evaluates them across task, role, and model-backbone splits. This makes trace composition a controlled variable rather than mixing every skill source into one training set. The benchmark’s enterprise framing is practical, but the exact task construction and skill-evolution prompts determine what “transfer” measures.

## Practical Applicability

Evaluate an agent skill library on the task that created each skill, nearby tasks, different roles, and a different model provider. Track success, edits, permissions, stale instructions, and rollback cost. Promote a skill only when its transfer benefit outweighs the risk that it encodes a model- or role-specific shortcut.

## Limitations & Critiques

The tasks are benchmark instances rather than an organization’s full workflow distribution, and skill transfer can be confounded by trace quality, prompt format, and model familiarity. A skill that transfers behaviorally can still leak sensitive procedures or credentials. The reported results are not independently reproduced here.

## Reproductions & Follow-up Work

Create a held-out organizational task set with role and permission boundaries, then compare single-model, multi-model, and human-authored skills. Measure stale-skill detection, deletion, provenance, and performance under model upgrades as well as raw transfer accuracy.

## Relation to the Arsenal

AFTER connects procedural memory, agent skills, evaluation, and governance. It complements memory systems by testing whether remembered procedures remain useful beyond the trace distribution that produced them.

## Resources

- [Primary source](https://arxiv.org/abs/2606.23127)
- [HTML paper](https://arxiv.org/html/2606.23127v1)

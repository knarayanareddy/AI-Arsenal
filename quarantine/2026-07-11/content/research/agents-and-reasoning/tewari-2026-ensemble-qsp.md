---
id: tewari-2026-ensemble-qsp
title: "A Hierarchical Memory Architecture Overcomes Context Limits in Long-Horizon Multi-Agent Computational Modeling"
phase: agents-and-reasoning
venue: arxiv-preprint
year: 2026
authors:
  - Shivendra G. Tewari
  - Holly Kimko
arxiv_id: '2607.07666'
arxiv_url: https://arxiv.org/abs/2607.07666
pdf_url: https://arxiv.org/pdf/2607.07666
code_url: null
venue_url: https://arxiv.org/abs/2607.07666
practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
has_code: false
citation_count_approx: 0
tldr: "Describes a five-worker multi-agent system with three-layer hierarchical memory for long-running pharmacokinetic modeling."
key_contribution: "Introduces bounded hierarchical project memory with category caps and eviction, plus domain-expert oversight and physics-based checklists for computational modeling."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - agents
  - memory
  - reasoning
  - evaluation
  - research
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

A Hierarchical Memory Architecture Overcomes Context Limits in Long-Horizon Multi-Agent Computational Modeling is a recent 2026 preprint about introduces bounded hierarchical project memory with category caps and eviction, plus domain-expert oversight and physics-based checklists for computational modeling.

## Why it's in the Arsenal

The work addresses a concrete engineering question around agent memory, retrieval, evaluation, or reliability. It is included as a paper-reported result, not as an independently verified production recommendation.

## Core Contribution

Introduces bounded hierarchical project memory with category caps and eviction, plus domain-expert oversight and physics-based checklists for computational modeling.

## Key Results

The 2026 preprint reports a median 301-token mid-term project state across 104 runs and improved model selection and debugging behavior in its pharmacokinetic experiments; these are paper-reported results.

## Methodology

The framework assigns work to specialist agents under principal investigators, maintains layered state, and evaluates model selection and parameter recovery across prompts and model costs.

## Practical Applicability

Use the bounded-state and specialist-oversight pattern when long scientific workflows need continuity without replaying all history.

## Limitations & Critiques

The evaluation is domain-specific, the benchmark and implementation are new, and “domain-agnostic” requires validation outside pharmacokinetics. Human-equivalent quality is not established.

## Reproductions & Follow-up Work

Re-run on an unrelated scientific domain with matched context budgets, audit state eviction, and compare against single-agent and full-history baselines.

## Relation to the Arsenal

This paper complements the Arsenal's research, agent, retrieval, evaluation, and observability entries. Use its claims to form hypotheses and test plans rather than to replace workload-specific measurements.

## Resources

- [Primary source](https://arxiv.org/abs/2607.07666)
- [PDF](https://arxiv.org/pdf/2607.07666)

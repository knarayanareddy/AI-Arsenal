---
id: besta-2023-graph-of-thoughts
title: "Graph of Thoughts: Solving Elaborate Problems with Large Language Models"
phase: agents-and-reasoning
venue: arxiv-preprint
year: 2023
authors:
  - "Besta, M."
  - "Blach, N."
  - "Kubicek, A."
  - "Gerstenberger, R."
  - "Hoefler, T."
arxiv_id: "2308.09687"
arxiv_url: "https://arxiv.org/abs/2308.09687"
pdf_url: "https://arxiv.org/pdf/2308.09687"
code_url: "https://github.com/spcl/graph-of-thoughts"
venue_url: null

practical_applicability: medium
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 0

tldr: "Generalizes chain- and tree-of-thought by modeling reasoning as an arbitrary graph, where thoughts can be aggregated, refined, and looped -- enabling operations like merging partial solutions that a tree cannot express"
key_contribution: "A reasoning framework (GoT) that represents LLM thoughts as vertices in a graph with edges as dependencies, supporting aggregation (combining thoughts), refinement (looping on a thought), and generation, which subsumes chain-of-thought and tree-of-thought as special cases and improves quality/cost on tasks with mergeable sub-solutions"

builds_on: []
implemented_in: []

tags:
  - agents
  - reasoning
  - llm
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Graph of Thoughts (GoT) frames LLM reasoning as a graph rather than a line (chain-of-thought) or a branching tree (tree-of-thought). Each "thought" is a vertex; edges encode dependencies. Because it is a graph, GoT supports operations trees cannot — notably aggregating several thoughts into one and refining a thought in a feedback loop — which helps on problems whose sub-solutions can be merged.

## Why it's in the Arsenal

- It completes the CoT -> ToT -> GoT progression of prompt-time reasoning structures, and its distinguishing capability (aggregation/merging of partial results) maps to real tasks like combining retrieved evidence or merging sorted sublists.
- `practical_applicability: medium`: the framework is powerful and has code, but arbitrary-graph orchestration adds LLM-call cost and engineering that only pays off on decomposable/mergeable problems.

## Core Contribution

Tree-of-thought explores alternatives but each node derives from a single parent, so it cannot combine independent partial solutions. GoT's contribution is treating thoughts as a graph with explicit transformation operations — generation, aggregation, and refinement — executed by a controller. Aggregation is the key new primitive: it lets the system merge multiple thought vertices (e.g. partial sorts, sub-answers) into a stronger combined thought, which improves both accuracy and cost on suitable tasks.

## Key Results

- Reported quality improvements and/or cost reductions over tree-of-thought on decomposable tasks (e.g. sorting, set operations, document merging) where aggregation applies — see the paper for task-specific numbers
- Formalized CoT and ToT as special cases of the graph formulation

## Methodology

Define a "graph of operations" (the reasoning topology) and a controller that prompts the LLM to generate, score, aggregate, and refine thought vertices according to that topology, keeping state across steps. The framework is task-configurable: you specify which operations connect which thoughts.

## Practical Applicability

Use GoT when a problem decomposes into partial results you can *combine* (merging retrieved snippets, reconciling multiple drafts, divide-and-conquer), not for simple linear reasoning where chain-of-thought is cheaper. The practical cost is many LLM calls and non-trivial controller design; budget both before adopting it over ToT or plain CoT.

## Limitations & Critiques

The extra structure multiplies LLM calls and latency, so gains only materialize on genuinely mergeable problems; for most everyday reasoning, CoT or self-consistency is more cost-effective. Designing the operation graph is manual and task-specific, and as a 2023 preprint its advantages are demonstrated on selected tasks rather than universally.

## Reproductions & Follow-up Work

Official code is released (spcl/graph-of-thoughts) and the framework has been used and extended by the community. It stands alongside a family of structured-reasoning methods and is best understood as the graph generalization of the tree/chain line rather than a wholly new capability.

## Relation to the Arsenal

Read with `wei-2022-chain-of-thought`, `yao-2023-tree-of-thoughts`, and `wang-2022-self-consistency` (this folder) — GoT generalizes all three. The aggregation primitive is relevant to RAG systems (`lewis-2020-rag`) that must combine multiple retrieved passages into one answer.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2308.09687)
- [arXiv](https://arxiv.org/abs/2308.09687)
- [Official Code](https://github.com/spcl/graph-of-thoughts)

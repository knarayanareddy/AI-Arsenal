---
title: "Evaluation Strategy Architecture Decisions"
section: "architectures/evaluation-strategy"
auto_generated: false
---

# Evaluation Strategy Architecture Decisions

## What belongs here

Decisions about how an AI system's quality is measured and gated: LLM-as-judge vs human evaluation, offline vs online evaluation, regression testing vs exploratory testing, and benchmark selection strategy. The defining trait is that these are approach-level forks in *how you measure quality at all*, not comparisons of specific evaluation tools or products.

## What does NOT belong here

Choosing a specific evaluation platform (Langfuse vs LangSmith vs Braintrust) is a `tools/`-vertical comparison, not an evaluation-strategy fork — evaluation-strategy is about whether to use model-graded evals at all, whether to gate on offline or online signals, etc. A complete, working evaluation harness with code belongs in `build-examples/evaluation-pipelines/`.

## Quick-start: highest-signal architecture decisions in this category

- [Choose an Evaluation Framework](./choose-eval-framework.md) — constraint-first path from golden datasets through model-graded evals

## Architecture decisions in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Evaluation Strategy in This Phase

### Recently Added

_No entries yet._

### Most Popular

_No star-tracked entries yet._

### Browse All

_No entries yet._

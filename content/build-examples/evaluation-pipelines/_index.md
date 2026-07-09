---
title: "Evaluation Pipelines Build Examples"
section: "build-examples/evaluation-pipelines"
auto_generated: false
---

# Evaluation Pipelines Build Examples

## What belongs here

End-to-end blueprints where the primary artifact being built is the evaluation system itself: LLM-as-judge harnesses, golden-dataset construction pipelines, automated CI regression testing for prompts/models, benchmark harnesses, and eval dashboards. The defining trait is that the thing being built *measures* AI system quality, rather than being the AI system under measurement.

## What does NOT belong here

If a build example includes an eval step as part of shipping a RAG system, agent, or fine-tuned model, but the eval is not the primary artifact, it stays in the phase matching the primary system (`rag-systems/`, `agent-systems/`, `fine-tuning-workflows/`). A single tip about metric selection, eval-harness setup, or LLM-as-judge calibration that doesn't require a full working pipeline belongs in `tips-and-tricks/evaluation/`, not here.

## Quick-start: highest-signal build examples in this phase

_No entries yet. This phase folder was created during the Build Examples vertical reorganisation (2026-07-06) and is queued for content in a follow-up authoring pass — see the migration completion report._

## Build examples in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Evaluation Pipelines in This Phase

### Recently Added

- [Golden-Set Eval Harness](./starter-golden-set-eval-harness.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Golden-Set Eval Harness](./starter-golden-set-eval-harness.md) — A minimal, versioned eval harness that scores an LLM feature against a golden question set with both deterministic assertions and an LLM judge

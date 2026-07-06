---
title: "Model Selection Architecture Decisions"
section: "architectures/model-selection"
auto_generated: false
---

# Model Selection Architecture Decisions

## What belongs here

Decisions about *which* model or provider to use, once the system-design layer has already decided a model is needed: open-weight vs API-based models, model size tradeoffs (small/fast vs large/capable), local vs cloud hosting, general-purpose vs domain-specific models, single-model vs ensemble/routing approaches, and agent-framework selection once "use an agent" is already decided. The defining trait is that these decisions assume the higher-level architectural approach is fixed and are choosing among competing implementations of that approach.

## What does NOT belong here

Whether to use a model at all for a given task (e.g. RAG vs fine-tuning as the mechanism for knowledge injection) is a `system-design/` fork, not model-selection — model-selection starts once that fork is resolved. A full stack recommendation spanning model, serving, retrieval, and observability belongs in `reference-stacks/`.

## Quick-start: highest-signal architecture decisions in this category

- [Which LLM Should I Use?](./choose-llm.md) — local vs cloud, reasoning vs code vs multimodal, and a budget-aware routing path
- [Choose an Agent Framework](./choose-agent-framework.md) — language, state-complexity, and provider-native constraints for picking an orchestration framework

## Architecture decisions in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Model Selection in This Phase

### Recently Added

- [Choosing an Agent Framework: State Model, Language, and Provider Constraints](./choose-agent-framework.md)
- [Choosing a Model: Local vs Cloud, and Routing by Primary Need](./choose-llm.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Choosing an Agent Framework: State Model, Language, and Provider Constraints](./choose-agent-framework.md) — 
- [Choosing a Model: Local vs Cloud, and Routing by Primary Need](./choose-llm.md) — 

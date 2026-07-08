---
title: "System Design Architecture Decisions"
section: "architectures/system-design"
auto_generated: false
---

# System Design Architecture Decisions

## What belongs here

Approach-level architectural forks that determine the fundamental shape of an AI system: RAG vs fine-tuning for knowledge/behavior adaptation, monolithic vs microservices for application structure, synchronous vs asynchronous request handling, stateless vs stateful agent design, client-side vs server-side inference. The defining trait is that these are mutually-exclusive-or-composable *approach* decisions made before implementation starts, not choices between specific tools or providers.

## What does NOT belong here

Choosing *which* vector database, LLM provider, or observability tool to use is a `model-selection/` or `tools/` decision, not a system-design fork — system-design is about *whether* to use retrieval, fine-tuning, synchronous calls, etc. at all, not which vendor implements the chosen approach. A complete multi-tool stack recommendation belongs in `reference-stacks/`, not here. A single tool comparison belongs in the `tools/` vertical.

## Quick-start: highest-signal architecture decisions in this category

- [RAG vs Fine-Tuning](./rag-vs-fine-tuning.md) — the most common knowledge-vs-behavior adaptation fork, with concrete dataset-size and update-frequency thresholds

## Architecture decisions in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## System Design in This Phase

### Recently Added

- [Managing a Growing Context Window: Truncation, Summarization, or Retrieval Offload](./choose-context-window-management-strategy.md)
- [Layering LLM Guardrails: Prompt Hardening, Validation Frameworks, Classifier Screens, and Human Gates](./choose-guardrails-strategy.md)
- [Getting Structured Output from LLMs: Prompt-and-Parse, Provider-Native, or Constrained Decoding](./choose-structured-output-strategy.md)
- [Single Agent vs Multi-Agent: When Splitting the Work Actually Helps](./single-agent-vs-multi-agent.md)
- [Choosing an Agent Memory Architecture: Session, Long-Term, and Semantic](./choose-memory-solution.md)
- [RAG vs Fine-Tuning: Knowledge Injection vs Behavior Adaptation](./rag-vs-fine-tuning.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Managing a Growing Context Window: Truncation, Summarization, or Retrieval Offload](./choose-context-window-management-strategy.md) — 
- [Layering LLM Guardrails: Prompt Hardening, Validation Frameworks, Classifier Screens, and Human Gates](./choose-guardrails-strategy.md) — 
- [Choosing an Agent Memory Architecture: Session, Long-Term, and Semantic](./choose-memory-solution.md) — 
- [Getting Structured Output from LLMs: Prompt-and-Parse, Provider-Native, or Constrained Decoding](./choose-structured-output-strategy.md) — 
- [RAG vs Fine-Tuning: Knowledge Injection vs Behavior Adaptation](./rag-vs-fine-tuning.md) — 
- [Single Agent vs Multi-Agent: When Splitting the Work Actually Helps](./single-agent-vs-multi-agent.md) — 

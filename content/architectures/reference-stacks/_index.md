---
title: "Reference Stacks Architecture Decisions"
section: "architectures/reference-stacks"
auto_generated: false
---

# Reference Stacks Architecture Decisions

## What belongs here

Complete, multi-tool stack recommendations for common end-to-end patterns: a full production RAG stack, a local-first stack, an enterprise-scale stack, a multi-agent system stack, a research-platform stack. The defining trait is that these are opinionated bundles of *compatible* choices across system-design, model-selection, data-strategy, serving, and evaluation — not a single decision fork, but a coherent answer to "what should my whole stack look like for pattern X."

## What does NOT belong here

A comparison of two individual tools that plug into the same slot in a stack (e.g. Qdrant vs Weaviate) belongs in the `tools/` vertical, not here — reference stacks assume a specific tool has already been chosen for each layer and focus on how the layers fit together. A single architectural fork (RAG vs fine-tuning, sync vs async) belongs in the category that fork actually falls under (`system-design/`, `data-strategy/`, etc.), not here.

## Quick-start: highest-signal architecture decisions in this category

- [Production RAG Stack](./production-rag.md) — the most commonly needed complete stack: FastAPI + LlamaIndex/LangChain + Qdrant/pgvector + RAGAS + Langfuse
- [Lean MVP Stack](./lean-mvp.md) — fastest path to a working AI product for solo developers and early prototypes
- [Local-First AI Stack](./local-first.md) — a complete stack with no cloud model API dependency

## Architecture decisions in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Reference Stacks in This Phase

### Recently Added

- [Enterprise-Scale AI Stack](./enterprise-scale.md)
- [Lean MVP Stack](./lean-mvp.md)
- [Local-First AI Stack](./local-first.md)
- [Multi-Agent System Stack](./multi-agent-system.md)
- [Production RAG Stack](./production-rag.md)
- [AI Research Platform Stack](./research-platform.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Enterprise-Scale AI Stack](./enterprise-scale.md) — Reference architecture for governed enterprise AI systems with security and platform integration
- [Lean MVP Stack](./lean-mvp.md) — Opinionated stack for solo developers and fast AI product prototypes
- [Local-First AI Stack](./local-first.md) — Reference stack for privacy-first local AI applications without cloud model APIs
- [Multi-Agent System Stack](./multi-agent-system.md) — Reference stack for complex task automation with multiple AI roles and durable state
- [Production RAG Stack](./production-rag.md) — Reference architecture for production retrieval-augmented generation applications
- [AI Research Platform Stack](./research-platform.md) — Reference platform for repeatable model, agent, and retrieval experiments

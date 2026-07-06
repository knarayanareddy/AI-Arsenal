---
title: "Agent Systems Build Examples"
section: "build-examples/agent-systems"
auto_generated: false
---

# Agent Systems Build Examples

## What belongs here

End-to-end blueprints where the primary system being built is an autonomous or tool-using agent: single-tool ReAct agents, multi-tool controllers with validated structured outputs, multi-agent research/writing/review systems, coding agents, and human-in-the-loop approval workflows. The defining trait is that agentic control flow (tool selection, step budgets, state, retries) is the core engineering problem, not just an LLM call wrapped in a loop.

## What does NOT belong here

If the primary artifact is a RAG pipeline that happens to be orchestrated by an agent graph, it belongs in `rag-systems/`, not here (assign by the hardest, most novel part of the build). If the primary challenge is deploying an already-working agent to production infrastructure, it belongs in `production-deployment/`. A single tip about tool validation, step budgets, or retry caps that doesn't require a full working system belongs in `tips-and-tricks/agents-and-orchestration/`, not here.

## Quick-start: highest-signal build examples in this phase

- [Simple ReAct Agent](./starter-simple-react-agent.md) — the smallest complete tool-using agent loop: LangGraph + one or two safe tools + tracing
- [Multi-Tool Agent](./intermediate-multi-tool-agent.md) — validated multi-tool routing with structured outputs and observability
- [Multi-Agent Research System](./advanced-multi-agent-research.md) — planner/researcher/writer/reviewer roles with a citation-checked review loop

## Build examples in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

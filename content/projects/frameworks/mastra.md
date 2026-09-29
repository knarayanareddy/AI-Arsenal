---
id: mastra
name: Mastra
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: TypeScript framework for building AI agents, workflows, evals, and application backends
github_url: "https://github.com/mastra-ai/mastra"
license: Apache-2.0 + EE
primary_language: TypeScript
org_or_maintainer: null
tags: [agents, orchestration, memory, evaluation]
maturity: production
cost_model: open-source
github_stars: 25023
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-06-13"
docs_url: "https://mastra.ai/docs"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language]
relation_to_stack: [build-on-top]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - TypeScript-native agent framework, positioned to serve the JS/TS ecosystem the way LangGraph/CrewAI serve Python
best_for:
  - Your stack is TypeScript/JavaScript-first and you want an agent framework designed natively for that ecosystem rather than a Python framework with a thinner JS wrapper
  - You need agent workflows integrated tightly with a Node.js backend and want first-party TypeScript type safety throughout
avoid_if:
  - Your team is Python-first — the much larger Python agent-framework ecosystem (LangGraph, CrewAI, Pydantic AI) will have more examples, integrations, and community support
  - You need the widest possible third-party integration coverage — as a newer, smaller-ecosystem framework, Mastra has fewer pre-built integrations than the most established Python frameworks
upstream_dependencies: []
downstream_consumers: []
alternatives: [langgraph, crewai]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Limited independent third-party production evidence found; assessment is based on the project's public positioning and GitHub repository rather than a technical report or case study.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://mastra.ai/docs","date":"2026-06-13","description":"Official docs"}
featured: false
status: active
---

## Overview

A TypeScript-native framework for building AI agents and workflows, aimed at giving the JavaScript/Node.js ecosystem a first-class agent-building experience comparable to what Python developers have with LangGraph or CrewAI.

## Why it's in the Arsenal

Mastra appears in this catalog as a reference point for the framework phase; the useful question is what adopting it would commit you to beyond the feature list. The sections below state what it claims to do and what adopting it would commit you to.

## Architecture

Provides agent, workflow, and tool abstractions built natively in TypeScript with full type safety, targeting Node.js backends and integrating with common JS-ecosystem deployment targets (Vercel, Node servers).

## Ecosystem Position

Upstream: built for the Node.js/TypeScript ecosystem specifically. Downstream: none of particular note yet. Competing: LangGraph.js (LangChain's JS port), Vercel AI SDK's agent primitives. Complementary: pairs naturally with Vercel deployment and Next.js applications given its TypeScript-first design.

## Getting Started

```bash
pip install mastra
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Adopting the abstraction**: for Mastra, the question is whether the control-flow model it imposes is one you want in your codebase permanently, since every step written against it is a step you own later.
2. **What dominates the decision**: `stack`, `typescript`, `javascript-first`, `agent` are the variables that actually move the outcome for Mastra in this phase, and none of them appear in a feature comparison.
3. **Choosing between candidates**: compare Mastra against `langgraph`, `crewai` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- Beyond the headline description, Mastra's architecture section is the honest source: provides agent, workflow, and tool abstractions built natively in TypeScript with full type safety, targeting Node.js backends and integrating with common JS-ecosystem deployment targets (Vercel, Node servers).
- Sits in the framework phase alongside the alternatives named in its Ecosystem Position section; cross-phase comparison is usually a category error rather than a useful alternative.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the Mastra footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Nothing in this entry substitutes for running Mastra against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- Where Mastra overlaps `langgraph`, `crewai`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

Mastra is a TypeScript agent framework (from the ex-Gatsby team) with workflows, memory, and RAG built in. This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/mastra-ai/mastra)
- [Documentation](https://mastra.ai/docs)

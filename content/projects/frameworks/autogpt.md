---
id: autogpt
name: AutoGPT
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Autonomous agent platform and classic agent project for accessible AI automation
github_url: "https://github.com/Significant-Gravitas/AutoGPT"
license: MIT + Polyform Shield
primary_language: Python
org_or_maintainer: null
tags: [agents, planning, tool-use, cloud]
maturity: production
cost_model: open-source
github_stars: 184931
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-06-13"
docs_url: "https://docs.agpt.co/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, general-purpose]
relation_to_stack: [deploy-as-is, study-and-reference]
health_signals: [community-driven, actively-maintained]
ecosystem_role:
  - Early, highly-visible autonomous-agent platform that popularized the 'autonomous AI agent' concept
best_for:
  - You want a ready-made, deployable autonomous agent platform with an active project (the Significant-Gravitas/AutoGPT platform continues shipping releases as of May 2026) rather than a bare framework to build with
  - You're studying the history and design patterns of early autonomous-agent systems as a reference point
avoid_if:
  - You need a lightweight, embeddable agent framework to build your own application on top of — AutoGPT is closer to a standalone platform/product than a library, unlike LangGraph, CrewAI, or Pydantic AI
  - You need the most current agent-architecture patterns (planning, tool-use reliability) — AutoGPT's original 2023 design was more exploratory/experimental than today's more disciplined agent frameworks
upstream_dependencies: []
downstream_consumers: []
alternatives: [langgraph, crewai]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: GitHub releases confirm Significant-Gravitas/AutoGPT is actively shipping platform releases as of May 2026 (autogpt-platform-beta-v0.6.61), addressing UX, credential handling, and security concerns -- this is an actively maintained platform, not the abandoned early-2023 script many associate with the AutoGPT name.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://docs.agpt.co/","date":"2026-06-13","description":"Official docs"}
featured: false
status: active
---

## Overview

One of the earliest widely-publicized autonomous AI agent projects, which popularized the idea of an LLM recursively planning and executing its own sub-tasks toward a goal with minimal human intervention.

## Why it's in the Arsenal

AutoGPT appears in this catalog as a reference point for the framework phase; the useful question is what adopting it would commit you to beyond the feature list. The sections below state what it claims to do and what adopting it would commit you to.

## Architecture

Has evolved from its original 2023 single-script recursive-planning-loop design into a fuller platform (AutoGPT Platform) with a web UI, credential management, and a broader agent-building workflow, rather than remaining a bare autonomous-loop library.

## Ecosystem Position

Upstream: none of particular note. Downstream: none of particular note as a dependency, though it strongly influenced the broader 'autonomous agent' category that followed. Competing: AgentGPT, BabyAGI, and other early autonomous-loop projects; more maturely, CrewAI and LangGraph for structured multi-agent orchestration. Complementary: none specific.

## Getting Started

```bash
pip install autogpt
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Adopting the abstraction**: for AutoGPT, the question is whether the control-flow model it imposes is one you want in your codebase permanently, since every step written against it is a step you own later.
2. **What to measure first**: `ready-made`, `deployable`, `autonomous`, `agent` decide whether AutoGPT works for you; measure them on your own data because the published numbers are conditioned on someone else's setup.
3. **Choosing between candidates**: compare AutoGPT against `langgraph`, `crewai` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- Beyond the headline description, AutoGPT's architecture section is the honest source: has evolved from its original 2023 single-script recursive-planning-loop design into a fuller platform (AutoGPT Platform) with a web UI, credential management, and a broader agent-building workflow, rather than remaining a bare autonomous-loop library.
- It is a framework entry in this catalog, so the comparison that matters is against the other framework projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the AutoGPT footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Documentation describes intended behaviour, not observed behaviour: latency, memory and failure rates for AutoGPT at your scale need measuring before this informs a production decision.
- Where AutoGPT overlaps `langgraph`, `crewai`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

AutoGPT is one of the original autonomous-agent projects, now a platform for building and running agent workflows. This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/Significant-Gravitas/AutoGPT)
- [Documentation](https://docs.agpt.co/)

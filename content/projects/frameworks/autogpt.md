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

Early, highly-visible autonomous-agent platform that popularized the 'autonomous AI agent' concept. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want a ready-made, deployable autonomous agent platform with an active project (the Significant-Gravitas/AutoGPT platform continues shipping releases as of May 2026) rather than a bare framework to build with. See Strengths / Limitations below before adopting it.

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

1. **Scenario**: you want a ready-made, deployable autonomous agent platform with an active project (the Significant-Gravitas/AutoGPT platform continues shipping releases as of May 2026) rather than a bare framework to build with
2. **Scenario**: you're studying the history and design patterns of early autonomous-agent systems as a reference point

## Strengths

- You want a ready-made, deployable autonomous agent platform with an active project (the Significant-Gravitas/AutoGPT platform continues shipping releases as of May 2026) rather than a bare framework to build with
- You're studying the history and design patterns of early autonomous-agent systems as a reference point

## Limitations

- You need a lightweight, embeddable agent framework to build your own application on top of — AutoGPT is closer to a standalone platform/product than a library, unlike LangGraph, CrewAI, or Pydantic AI
- You need the most current agent-architecture patterns (planning, tool-use reliability) — AutoGPT's original 2023 design was more exploratory/experimental than today's more disciplined agent frameworks

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/Significant-Gravitas/AutoGPT)
- [Documentation](https://docs.agpt.co/)

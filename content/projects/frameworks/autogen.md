---
id: autogen
name: AutoGen
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Microsoft multi-agent framework now maintained as legacy after Agent Framework convergence
github_url: "https://github.com/microsoft/autogen"
license: CC-BY-4.0
primary_language: Python
org_or_maintainer: null
tags: [agents, orchestration, planning, tool-use]
maturity: production
cost_model: open-source
github_stars: 58925
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-04-15"
docs_url: "https://microsoft.github.io/autogen/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, reasoning]
relation_to_stack: [study-and-reference, build-on-top]
health_signals: [org-backed, community-driven]
ecosystem_role:
  - Microsoft's original multi-agent conversation framework, now in maintenance mode
best_for:
  - You have an existing AutoGen-based system and need to maintain it, or you're studying its agent-to-agent conversation pattern as a research reference
  - You want the community-driven AG2 fork if you need continued feature development on the original AutoGen codebase without moving to Microsoft's newer framework
avoid_if:
  - You're starting a new production project — Microsoft has placed AutoGen in maintenance mode (critical security patches only, no new features) and now recommends Microsoft Agent Framework 1.0 for new work
  - You need enterprise Azure integration, A2A orchestration protocol support, or ongoing architectural improvements — those are only landing in Microsoft Agent Framework, not AutoGen
upstream_dependencies: []
downstream_consumers: []
alternatives: [microsoft-agent-framework]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Multiple 2026 sources (Visual Studio Magazine's April 2026 Agent Framework 1.0 launch coverage, community 'Is AutoGen Deprecated' analysis from May 2026) confirm Microsoft has moved AutoGen to maintenance-mode status with Microsoft Agent Framework as the designated successor; the existing entry's own description already reflected this correctly.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/microsoft/autogen/discussions/7066","date":"2026-06-13","description":"AutoGen update discussion"}
  - {"source":"conference","url":"https://visualstudiomagazine.com/articles/2026/04/06/microsoft-ships-production-ready-agent-framework-1-0-for-net-and-python.aspx","date":"2026-04-06","description":"Visual Studio Magazine reports Microsoft Agent Framework 1.0 as the official successor, with migration guides for existing AutoGen users"}
featured: false
status: deprecated
---

## Overview

Microsoft's early open-source framework for building multi-agent conversational systems, notable for popularizing patterns like agent-to-agent dialogue, role-based coordination, and tool use, now in maintenance mode as Microsoft consolidates around a newer framework.

## Why it's in the Arsenal

Microsoft's original multi-agent conversation framework, now in maintenance mode. It earns a place in the Arsenal because it directly addresses a recurring decision point: you have an existing AutoGen-based system and need to maintain it, or you're studying its agent-to-agent conversation pattern as a research reference. See Strengths / Limitations below before adopting it.

## Architecture

Agents are modeled as conversational participants that exchange messages in a group-chat-style pattern; a 'conversable agent' abstraction handles message passing, tool invocation, and human-in-the-loop checkpoints, with orchestration driven by conversation flow rather than an explicit graph or state machine.

## Ecosystem Position

Upstream: none of particular note. Downstream: the community-driven AG2 fork continues independent development of the original codebase. Competing: CrewAI, LangGraph, Google ADK. Superseded by: Microsoft Agent Framework 1.0 (April 2026), which Microsoft explicitly positions as built on top of and replacing both AutoGen and Semantic Kernel for new agent development.

## Getting Started

```bash
pip install autogen
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Scenario**: you have an existing AutoGen-based system and need to maintain it, or you're studying its agent-to-agent conversation pattern as a research reference
2. **Scenario**: you want the community-driven AG2 fork if you need continued feature development on the original AutoGen codebase without moving to Microsoft's newer framework

## Strengths

- You have an existing AutoGen-based system and need to maintain it, or you're studying its agent-to-agent conversation pattern as a research reference
- You want the community-driven AG2 fork if you need continued feature development on the original AutoGen codebase without moving to Microsoft's newer framework

## Limitations

- You're starting a new production project — Microsoft has placed AutoGen in maintenance mode (critical security patches only, no new features) and now recommends Microsoft Agent Framework 1.0 for new work
- You need enterprise Azure integration, A2A orchestration protocol support, or ongoing architectural improvements — those are only landing in Microsoft Agent Framework, not AutoGen

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/microsoft/autogen)
- [Documentation](https://microsoft.github.io/autogen/)

---
id: microsoft-agent-framework
name: Microsoft Agent Framework
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Microsoft framework for Python and .NET agents, workflows, and production orchestration
github_url: https://github.com/microsoft/agent-framework
license: MIT
primary_language: Python
org_or_maintainer: null
tags:
  - agents
  - orchestration
  - graphs
  - cloud
  - tool-use
maturity: production
cost_model: open-source
github_stars: 12243
github_stars_last_30d: 932
trending_score: 55
last_commit: '2026-07-20'
docs_url: https://learn.microsoft.com/en-us/agent-framework/
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain:
  - language
  - reasoning
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - Microsoft's current, officially-recommended agent framework, positioned as the convergence point for AutoGen and Semantic Kernel
best_for:
  - You're building on Microsoft/Azure and want the officially-supported, enterprise-SLA path for agent development going forward, including migration paths from AutoGen or Semantic Kernel
  - You need production-grade orchestration spanning simple single agents through graph-based multi-agent workflows in both Python and .NET
avoid_if:
  - You need a lighter-weight framework for quick prototyping — reviewers note MAF 1.0 is 'much heavier' than AutoGen's original conversational-loop model, trading simplicity for enterprise rigor
  - Your stack is not Microsoft/Azure-centric — the framework's strongest value proposition (deep Azure telemetry, Semantic Kernel integration, compliance guardrails) is most relevant inside that ecosystem
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - autogen
  - semantic-kernel
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Microsoft shipped Agent Framework 1.0 for Python and .NET in April 2026 per Visual Studio Magazine's coverage, explicitly as the designated evolution/successor to both AutoGen and Semantic Kernel, with official migration guides for users of both predecessor projects.
added_date: '2026-06-13'
last_reviewed: '2026-07-01'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/microsoft/autogen/discussions/7066
    date: '2026-06-13'
    description: AutoGen update discussion
  - source: youtube
    url: https://www.youtube.com/watch?v=AAgdMhftj8w
    date: '2026-06-13'
    description: Intro video
  - source: conference
    url: https://visualstudiomagazine.com/articles/2026/04/06/microsoft-ships-production-ready-agent-framework-1-0-for-net-and-python.aspx
    date: '2026-04-06'
    description: 'Visual Studio Magazine: Microsoft ships production-ready Agent Framework 1.0 for .NET and Python, positioned as building on and superseding AutoGen and Semantic Kernel'
featured: false
status: active
---

## Overview

Microsoft's current agent-development framework, released as a production-ready 1.0 in April 2026, designed to converge and succeed both the earlier AutoGen and Semantic Kernel projects for building and deploying AI agents and multi-agent workflows.

## Why it's in the Arsenal

Microsoft's current, officially-recommended agent framework, positioned as the convergence point for AutoGen and Semantic Kernel. It earns a place in the Arsenal because it directly addresses a recurring decision point: you're building on Microsoft/Azure and want the officially-supported, enterprise-SLA path for agent development going forward, including migration paths from AutoGen or Semantic Kernel. See Strengths / Limitations below before adopting it.

## Architecture

Spans a range of orchestration complexity from simple single agents through graph-based multi-agent workflows, with deep integration into Azure telemetry, Semantic Kernel's plugin/skill model, and enterprise compliance tooling; supports both Python and .NET as first-class languages.

## Ecosystem Position

Upstream: builds directly on top of and unifies AutoGen and Semantic Kernel's prior codebases and design patterns per Microsoft's own framing. Downstream: none of particular note yet given its recent 1.0 release. Competing: Google ADK, LangGraph, CrewAI. Complementary: designed to integrate with the broader Azure AI ecosystem (Azure AI Foundry, Azure OpenAI).

## Getting Started

```bash
pip install microsoft-agent-framework
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Scenario**: you're building on Microsoft/Azure and want the officially-supported, enterprise-SLA path for agent development going forward, including migration paths from AutoGen or Semantic Kernel
2. **Scenario**: you need production-grade orchestration spanning simple single agents through graph-based multi-agent workflows in both Python and .NET

## Strengths

- You're building on Microsoft/Azure and want the officially-supported, enterprise-SLA path for agent development going forward, including migration paths from AutoGen or Semantic Kernel
- You need production-grade orchestration spanning simple single agents through graph-based multi-agent workflows in both Python and .NET

## Limitations

- You need a lighter-weight framework for quick prototyping — reviewers note MAF 1.0 is 'much heavier' than AutoGen's original conversational-loop model, trading simplicity for enterprise rigor
- Your stack is not Microsoft/Azure-centric — the framework's strongest value proposition (deep Azure telemetry, Semantic Kernel integration, compliance guardrails) is most relevant inside that ecosystem

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/microsoft/agent-framework)
- [Documentation](https://learn.microsoft.com/en-us/agent-framework/)

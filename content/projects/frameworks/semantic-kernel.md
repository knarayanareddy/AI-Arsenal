---
id: semantic-kernel
name: Semantic Kernel
version_tracked: null
artifact_type: framework
category: agents
subcategory: frameworks
description: An SDK for integrating AI orchestration into production applications
github_url: "https://github.com/microsoft/semantic-kernel"
license: MIT
primary_language: Python
org_or_maintainer: null
tags: [agents, orchestration, tool-use, planning]
maturity: production
cost_model: open-source
github_stars: 28114
github_stars_last_30d: 28114
trending_score: 70
last_commit: "2026-06-12"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, reasoning]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed, community-driven]
ecosystem_role:
  - Microsoft's earlier SDK for integrating AI orchestration into applications, now being converged into Microsoft Agent Framework
best_for:
  - You have an existing Semantic Kernel-based application in .NET or Python and need to maintain or incrementally extend it
  - You specifically need Semantic Kernel's plugin/skill abstraction model for integrating AI capabilities into a larger existing application architecture
avoid_if:
  - You're starting a new agent project on Microsoft's stack — Microsoft now recommends Agent Framework 1.0, which explicitly builds on and is positioned as the evolution of Semantic Kernel
  - You want the newest agent-orchestration patterns (graph-based multi-agent workflows) — those are the focus of Agent Framework, not Semantic Kernel's original plugin-oriented design
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: Per Visual Studio Magazine's April 2026 coverage of Agent Framework 1.0, Microsoft explicitly frames the new framework as building on and providing migration guidance from Semantic Kernel, indicating Semantic Kernel is being superseded for new agent-development work.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Microsoft's earlier open-source SDK for integrating AI orchestration — plugins, planners, and memory — into existing .NET, Python, and Java applications, predating Microsoft's more recent Agent Framework.

## Why it's in the Arsenal

Microsoft's earlier SDK for integrating AI orchestration into applications, now being converged into Microsoft Agent Framework. It earns a place in the Arsenal because it directly addresses a recurring decision point: you have an existing Semantic Kernel-based application in .NET or Python and need to maintain or incrementally extend it. See Strengths / Limitations below before adopting it.

## Architecture

Applications integrate AI capability through 'plugins' (functions exposed to the model) and 'planners' (components that sequence plugin calls to satisfy a goal), designed to slot into existing application architectures rather than serve as a standalone agent platform.

## Ecosystem Position

Upstream: none of particular note. Downstream: Microsoft Agent Framework builds directly on Semantic Kernel's concepts per Microsoft's own framing. Competing: LangChain, Google ADK. Superseded by: Microsoft Agent Framework 1.0 (April 2026) as Microsoft's current recommended path.

## Getting Started

```bash
pip install semantic-kernel
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Scenario**: you have an existing Semantic Kernel-based application in .NET or Python and need to maintain or incrementally extend it
2. **Scenario**: you specifically need Semantic Kernel's plugin/skill abstraction model for integrating AI capabilities into a larger existing application architecture

## Strengths

- You have an existing Semantic Kernel-based application in .NET or Python and need to maintain or incrementally extend it
- You specifically need Semantic Kernel's plugin/skill abstraction model for integrating AI capabilities into a larger existing application architecture

## Limitations

- You're starting a new agent project on Microsoft's stack — Microsoft now recommends Agent Framework 1.0, which explicitly builds on and is positioned as the evolution of Semantic Kernel
- You want the newest agent-orchestration patterns (graph-based multi-agent workflows) — those are the focus of Agent Framework, not Semantic Kernel's original plugin-oriented design

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/microsoft/semantic-kernel)
- [Documentation](https://github.com/microsoft/semantic-kernel)

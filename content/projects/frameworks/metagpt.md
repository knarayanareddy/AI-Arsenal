---
id: metagpt
name: MetaGPT
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Multi-agent framework that simulates software-company roles for natural-language programming
github_url: "https://github.com/FoundationAgents/MetaGPT"
license: MIT
primary_language: Python
org_or_maintainer: null
tags: [agents, orchestration, planning, code-gen]
maturity: production
cost_model: open-source
github_stars: 68769
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-01-21"
docs_url: "https://docs.deepwisdom.ai/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, reasoning]
relation_to_stack: [study-and-reference, deploy-as-is]
health_signals: [research-origin, community-driven, actively-maintained]
ecosystem_role:
  - Multi-agent framework modeling a software company's roles (PM, architect, engineer, QA) to collaboratively generate software from a requirement
best_for:
  - You're researching multi-agent role-based collaboration patterns for complex, multi-step generation tasks (MetaGPT's core research contribution, published as a paper and accepted at top-tier venues)
  - You want to study or experiment with the 'standard operating procedure' (SOP) approach to constraining multi-agent collaboration, which MetaGPT pioneered
avoid_if:
  - You need a production-ready coding agent for real software delivery — MetaGPT is better understood as a research artifact demonstrating the SOP-based multi-agent pattern than a polished production tool
  - You want an actively-supported commercial product — MGX (MetaGPT's commercial launch) is the productized direction, but the open-source repo itself is maintained more as an active research codebase than an enterprise product
upstream_dependencies: []
downstream_consumers: []
alternatives: [langgraph, crewai]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "MetaGPT originated as a paper ('MetaGPT: Meta Programming for a Multi-Agent Collaborative Framework') with continued academic output (AFlow accepted at ICLR 2025, further papers at NeurIPS/ICML 2025 per third-party coverage), and the GitHub repo shows active issue activity through June 2026, confirming both research-origin and ongoing maintenance."
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://docs.deepwisdom.ai/","date":"2026-06-13","description":"Official docs"}
featured: false
status: active
---

## Overview

A multi-agent framework that assigns LLM agents distinct software-company roles (product manager, architect, engineer, QA) and has them collaborate through a structured 'standard operating procedure' to turn a one-line requirement into working software.

## Why it's in the Arsenal

Multi-agent framework modeling a software company's roles (PM, architect, engineer, QA) to collaboratively generate software from a requirement. It earns a place in the Arsenal because it directly addresses a recurring decision point: you're researching multi-agent role-based collaboration patterns for complex, multi-step generation tasks (MetaGPT's core research contribution, published as a paper and accepted at top-tier venues). See Strengths / Limitations below before adopting it.

## Architecture

Agents are organized into role-based pipelines mirroring a software team's division of labor; a shared message pool and structured document artifacts (requirements docs, design docs) flow between roles in a defined sequence, constraining the otherwise open-ended nature of multi-agent collaboration.

## Ecosystem Position

Upstream: none of particular note. Downstream: MGX is a commercial product built on the same research lineage. Competing: OpenHands and other autonomous coding-agent systems, though MetaGPT's role-based SOP approach is architecturally distinct. Complementary: none specific.

## Getting Started

```bash
pip install metagpt
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Scenario**: you're researching multi-agent role-based collaboration patterns for complex, multi-step generation tasks (MetaGPT's core research contribution, published as a paper and accepted at top-tier venues)
2. **Scenario**: you want to study or experiment with the 'standard operating procedure' (SOP) approach to constraining multi-agent collaboration, which MetaGPT pioneered

## Strengths

- You're researching multi-agent role-based collaboration patterns for complex, multi-step generation tasks (MetaGPT's core research contribution, published as a paper and accepted at top-tier venues)
- You want to study or experiment with the 'standard operating procedure' (SOP) approach to constraining multi-agent collaboration, which MetaGPT pioneered

## Limitations

- You need a production-ready coding agent for real software delivery — MetaGPT is better understood as a research artifact demonstrating the SOP-based multi-agent pattern than a polished production tool
- You want an actively-supported commercial product — MGX (MetaGPT's commercial launch) is the productized direction, but the open-source repo itself is maintained more as an active research codebase than an enterprise product

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/FoundationAgents/MetaGPT)
- [Documentation](https://docs.deepwisdom.ai/)

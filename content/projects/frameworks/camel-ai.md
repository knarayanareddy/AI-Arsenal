---
id: camel-ai
name: "CAMEL"
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: "Research-first multi-agent framework from the earliest agent paper lineage, focused on studying agent societies at scale and synthetic data generation"
github_url: "https://github.com/camel-ai/camel"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "CAMEL-AI.org"
tags: [agents, orchestration, research]
maturity: production
cost_model: open-source
github_stars: 17343
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-07-07"
docs_url: "https://docs.camel-ai.org"
demo_url: null
paper_url: "https://arxiv.org/abs/2303.17760"
paper_id: null
phase: framework
domain: [language, general-purpose]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [research-origin, community-driven, actively-maintained]
ecosystem_role:
  - "The oldest living multi-agent framework (the March 2023 CAMEL paper predates AutoGen and CrewAI) with a research identity: finding the scaling laws of agents by simulating million-agent societies, generating synthetic training data, and spawning the OWL and Loong projects."
best_for:
  - "You research multi-agent behavior — role-playing societies, emergent cooperation, and large-scale simulations are the framework's founding use case, with stateful memory and evolvable environments"
  - "You generate synthetic data with agents — CAMEL's pipelines for instruction data and reasoning traces (feeding projects like Loong) are among the most developed open implementations"
avoid_if:
  - "You want a production business-workflow orchestrator with opinionated guardrails — CrewAI/LangGraph have stronger deployment stories and commercial support"
  - "You need a minimal learning curve — the framework's breadth (societies, benchmarks, environments, data pipelines) is oriented to researchers comfortable reading source"
upstream_dependencies: []
downstream_consumers: []
alternatives: [autogen, crewai, metagpt]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (17,343), primary language, license, and last commit (2026-07-07) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/camel-ai/camel", "date": "2026-07-08", "description": "17,343 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

An open-source multi-agent framework from the group behind the original CAMEL role-playing paper, built around a research mission: understanding how agents behave, cooperate, and scale. It provides agent abstractions with stateful memory, role-playing society orchestration, tool integration, and data-generation pipelines, and underpins the OWL agent system and Loong reasoning-data projects.

## Why it's in the Arsenal

The oldest living multi-agent framework (the March 2023 CAMEL paper predates AutoGen and CrewAI) with a research identity: finding the scaling laws of agents by simulating million-agent societies, generating synthetic training data, and spawning the OWL and Loong projects. It earns a place in the Arsenal because it directly addresses a recurring decision point: you research multi-agent behavior — role-playing societies, emergent cooperation, and large-scale simulations are the framework's founding use case, with stateful memory and evolvable environments. See Strengths / Limitations below before adopting it.

## Architecture

ChatAgent instances wrap models (any provider via a unified backend layer) with memory, tools, and roles; societies coordinate agents through role-playing or workforce patterns; environments support verifiable-reward RL-style loops. The design emphasizes statefulness and simulation fidelity over workflow ergonomics — agents are meant to be studied and evolved, not just pipelined.

## Ecosystem Position

Upstream: all major model providers. Downstream: OWL (its agent system built on top, a strong GAIA benchmark performer), Loong (synthetic reasoning data). Competing: AutoGen/AG2 (conversation-centric), CrewAI (business workflows), MetaGPT (SOP-driven dev agents). Its academic lineage keeps it the reference framework in multi-agent research papers.

## Getting Started

```bash
pip install camel-ai
# python (role-playing two-agent session):
from camel.societies import RolePlaying
session = RolePlaying(assistant_role_name='Python Programmer', user_role_name='Startup Founder', task_prompt='Prototype a stock-alert bot')
session.init_chat()
```

## Key Use Cases

1. **Scenario**: you research multi-agent behavior — role-playing societies, emergent cooperation, and large-scale simulations are the framework's founding use case, with stateful memory and evolvable environments
2. **Scenario**: you generate synthetic data with agents — CAMEL's pipelines for instruction data and reasoning traces (feeding projects like Loong) are among the most developed open implementations

## Strengths

- You research multi-agent behavior — role-playing societies, emergent cooperation, and large-scale simulations are the framework's founding use case, with stateful memory and evolvable environments
- You generate synthetic data with agents — CAMEL's pipelines for instruction data and reasoning traces (feeding projects like Loong) are among the most developed open implementations

## Limitations

- You want a production business-workflow orchestrator with opinionated guardrails — CrewAI/LangGraph have stronger deployment stories and commercial support
- You need a minimal learning curve — the framework's breadth (societies, benchmarks, environments, data pipelines) is oriented to researchers comfortable reading source

## Relation to the Arsenal

This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/camel-ai/camel)
- [Documentation](https://docs.camel-ai.org)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (17,343 stars, last commit 2026-07-07, verified via GitHub API on 2026-07-08)*

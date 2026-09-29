---
id: openhands
name: OpenHands
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: AI software engineering agent platform for coding, terminal work, browser actions, and automation
github_url: "https://github.com/OpenHands/OpenHands"
license: MIT + Enterprise
primary_language: Python
org_or_maintainer: null
tags: [agents, code-gen, tool-use, planning]
maturity: production
cost_model: open-source
github_stars: 76854
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-06-13"
docs_url: "https://docs.all-hands.dev/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, reasoning]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [community-driven, org-backed, actively-maintained]
ecosystem_role:
  - Open-source autonomous coding-agent platform (formerly OpenDevin) for end-to-end software engineering tasks
best_for:
  - You want a deployable, open-source autonomous coding agent that can read/write code, run commands, and browse the web to complete software engineering tasks end to end
  - You need a self-hostable alternative to closed coding-agent products, with the ability to fork and adapt the agent's tool set or execution sandbox
avoid_if:
  - You need a narrowly-scoped code-completion or pair-programming assistant rather than a full autonomous agent — a lighter tool integrated into your IDE may be a better fit than an autonomous execution platform
  - You're not prepared to operate the sandboxed execution environment autonomous coding agents require — running arbitrary generated code safely needs real infrastructure investment
upstream_dependencies: []
downstream_consumers: []
alternatives: [langgraph, crewai]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: OpenHands has a substantial GitHub star count (76K+) and is frequently referenced in coding-agent benchmark comparisons (e.g. SWE-bench leaderboards), which is a stronger signal of real usage than star count alone, though a specific named enterprise production deployment was not independently confirmed.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://docs.all-hands.dev/","date":"2026-06-13","description":"Official docs"}
featured: false
status: active
---

## Overview

An open-source platform for autonomous AI software-engineering agents (formerly named OpenDevin), capable of reading and writing code, executing commands in a sandboxed environment, and browsing the web to complete end-to-end coding tasks.

## Why it's in the Arsenal

The case for OpenHands rests on its documentation and observed adoption rather than on a controlled comparison here, so the sections below state what it claims to do and what adopting it would commit you to.

## Architecture

An agent loop operates within a sandboxed execution environment (typically a Docker container) with access to a shell, code editor, and browser; the agent plans and executes multi-step coding tasks, observing command output and iterating, with the platform providing the surrounding orchestration, sandboxing, and UI.

## Ecosystem Position

Upstream: depends on sandboxing/containerization infrastructure (Docker) for safe code execution. Downstream: frequently used as a baseline/reference implementation in coding-agent benchmarks like SWE-bench. Competing: closed coding-agent products, MetaGPT (different architectural approach). Complementary: can be configured to use any LLM provider as its underlying reasoning engine.

## Getting Started

```bash
pip install openhands
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Depending on it safely**: the work is the boundary — which calls go through OpenHands, what happens when it is slow, and what your system does instead, since those three answers determine whether adopting it is cheap or expensive.
2. **What the OpenHands scenarios have in common**: each separates building your own loop from adopting one, which is the decision this layer actually forces on you.
3. **Choosing between candidates**: compare OpenHands against `langgraph`, `crewai` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- Beyond the headline description, OpenHands's architecture section is the honest source: an agent loop operates within a sandboxed execution environment (typically a Docker container) with access to a shell, code editor, and browser; the agent plans and executes multi-step coding tasks, observing command output and iterating, with the platform providing the surrounding orchestration, sandboxing, and UI.
- It is a framework entry in this catalog, so the comparison that matters is against the other framework projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the OpenHands footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Nothing in this entry substitutes for running OpenHands against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- Where OpenHands overlaps `langgraph`, `crewai`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

OpenHands (formerly OpenDevin) is an autonomous software-development agent platform. This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/OpenHands/OpenHands)
- [Documentation](https://docs.all-hands.dev/)

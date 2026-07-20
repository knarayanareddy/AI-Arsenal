---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: bytedance
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 605
trending_score: 70
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: deer-flow
name: DeerFlow
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Open-source deep-research multi-agent framework built on LangChain/LangGraph that plans, searches, codes, and synthesizes long-horizon tasks into reports
github_url: https://github.com/bytedance/deer-flow
license: MIT
primary_language: Python
tags:
  - agents
  - orchestration
  - planning
  - reasoning
  - tool-use
  - research
maturity: beta
cost_model: open-source
github_stars: 77436
last_commit: '2026-07-20'
docs_url: https://deerflow.tech
phase: framework
domain:
  - language
  - reasoning
relation_to_stack:
  - build-on-top
  - fork-and-adapt
health_signals:
  - actively-maintained
  - org-backed
  - community-driven
ecosystem_role:
  - A LangGraph-based multi-agent framework that decomposes research tasks into planning, retrieval, coding, and writing stages with human-in-the-loop checkpoints.
best_for:
  - You are building deep-research or report-generation agents that need planning, web/search retrieval, code execution, and multi-step synthesis.
  - You already use LangChain/LangGraph and want a structured multi-agent reference rather than a single-prompt loop.
avoid_if:
  - You need a lightweight single-tool assistant; the multi-agent planner adds latency and cost that short tasks do not justify.
  - You require deterministic, auditable outputs; long-horizon agent runs are variable and need evaluation.
enrichment_notes: Official repository, MIT license, and same-day 2026-07-12 activity were reviewed on 2026-07-12. Output reliability for long-horizon runs remains draft.
---

## Overview

DeerFlow is a deep-research framework that coordinates specialized agents—planner, researcher, coder, and reporter—over a LangGraph state machine. It turns an open-ended question into a plan, gathers evidence via search and tools, optionally runs code, and composes a structured report, with human review points along the way.

## Why it's in the Arsenal

Long-horizon research is a canonical multi-agent workload, and DeerFlow is an org-backed, widely referenced implementation of it. It is useful for studying how planning, sub-agent delegation, tool use, and report synthesis are wired together on top of LangGraph, and how human checkpoints are inserted into an otherwise autonomous flow.

## Architecture

The framework models the workflow as a LangGraph graph with typed state passed between nodes. A planner decomposes the task; researcher nodes call search and retrieval tools; a coder node executes Python for analysis; and a reporter synthesizes findings. Sub-agents, memory, sandboxed execution, and a message gateway coordinate steps, and interrupts allow human plan approval before execution continues.

## Ecosystem Position

DeerFlow builds on LangGraph and competes with other deep-research stacks (GPT-Researcher, open 'deep research' clones) rather than with the underlying orchestration library. Compared to a single-agent ReAct loop it trades simplicity for structured decomposition and auditability. Evaluate it alongside alternatives on tool breadth, cost per report, and controllability.

## Getting Started

Install the Python package, configure model and search-tool API keys, and run a scoped research query. Inspect the generated plan, approve or edit it at the human checkpoint, and review the intermediate tool calls and final report before granting broader tool or code-execution access.

## Key Use Cases

- Automated literature or market research producing sourced reports.
- Multi-step analysis that mixes retrieval with code-based computation.
- A studyable template for planner/worker multi-agent decomposition on LangGraph.

## Strengths

- Structured, inspectable multi-agent decomposition with human checkpoints.
- Built on the mature LangChain/LangGraph ecosystem and tooling.
- Org-backed, actively maintained, with broad community attention.

## Limitations

- Multi-agent orchestration adds latency, token cost, and failure surface versus a single agent.
- Output quality depends heavily on the underlying models and search tools, and long runs are variable.
- Code execution and web tools require sandboxing and rate/cost controls.

## Relation to the Arsenal

DeerFlow is a multi-agent counterpart to the single-agent frameworks and orchestration tips in the catalog. Combine it with the Arsenal's guidance on token/cost budgets per run, sandboxed code execution, and agent-reliability evaluation.

## Resources

- [Official source](https://github.com/bytedance/deer-flow)
- [Project site](https://deerflow.tech)

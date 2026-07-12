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
org_or_maintainer: ByteDance
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: deer-flow
name: DeerFlow
artifact_type: platform
category: agents
subcategory: autonomous
description: Open-source long-horizon agent harness with sandboxes, memory, tools, skills, subagents, and messaging
github_url: https://github.com/bytedance/deer-flow
license: MIT
primary_language: Python
tags:
  - agents
  - orchestration
  - memory
  - planning
  - tool-use
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 76786
last_commit: '2026-07-11'
docs_url: https://github.com/bytedance/deer-flow
phase: agent-system
domain:
  - language
  - reasoning
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - org-backed
  - actively-maintained
  - community-driven
ecosystem_role:
  - A long-horizon orchestration harness that combines subagents, sandboxes, memory, skills, and gateway/channel integration for tasks that outlive a short chat turn
best_for:
  - You need delegated research, coding, or creation tasks that can run for minutes to hours
  - You want an open harness with explicit sandbox, memory, and subagent layers
avoid_if:
  - You need deterministic single-agent workflows with a small operational footprint
  - You have not established resource, permission, and cost limits for long-running delegated work
enrichment_notes: Repository metadata, MIT license, and active July 2026 development were reviewed on 2026-07-11. Long-horizon reliability and operational cost claims remain draft.
---

## Overview

DeerFlow is an MIT-licensed long-horizon SuperAgent harness from ByteDance. It combines sandboxes, memory, tools, skills, subagents, and message gateways for research, coding, and creative tasks that can run from minutes to hours.

## Why it's in the Arsenal

It belongs in the Arsenal as a concrete reference for the long-horizon agent-harness pattern: delegated work, durable context, subagent orchestration, and sandboxed execution rather than a short synchronous chat loop.

## Architecture

The harness coordinates a primary agent with subagents, tools, skills, memory, sandboxed execution, and gateway/channel surfaces. Its long-running nature makes resource budgets, approval policies, and failure recovery central to the design.

## Ecosystem Position

DeerFlow complements model providers, agent skills, browser/code sandboxes, memory systems, and message gateways. It overlaps with other autonomous-agent platforms and should be compared by task duration, control surface, and operational risk.

## Getting Started

Use the official repository setup and examples. Start with a bounded task and explicit time, tool, network, filesystem, and spend limits; then inspect memory, subagent, and sandbox behavior before allowing long-running jobs.

## Key Use Cases

- Research or coding tasks that need delegation and persistence across multiple steps
- Teams exploring long-horizon agent orchestration with open-source components

## Strengths

- Clear coverage of sandbox, memory, skills, and subagent concerns
- MIT license and active development

## Limitations

- Long-running agents multiply cost, permission, and reliability failure modes
- The harness is broad and should not be assumed production-safe without local policy and sandbox testing

## Relation to the Arsenal

This is a deployable agent-system project. Pair it with explicit observability, policy, and sandbox entries rather than treating the harness as a complete security boundary.

## Resources

- [Official source](https://github.com/bytedance/deer-flow)

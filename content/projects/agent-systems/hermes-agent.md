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
org_or_maintainer: NousResearch
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
id: hermes-agent
name: Hermes Agent
artifact_type: platform
category: agents
subcategory: autonomous
description: Open-source personal agent platform with tools, memory, skills, subagents, and multi-channel runtimes
github_url: https://github.com/NousResearch/hermes-agent
license: MIT
primary_language: Python
tags:
  - agents
  - orchestration
  - memory
  - tool-use
  - planning
maturity: beta
cost_model: open-source
github_stars: 213237
last_commit: '2026-07-11'
docs_url: https://github.com/NousResearch/hermes-agent
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
  - A general-purpose agent runtime that combines provider access, persistent context, tools, skills, and channel adapters in one deployable system.
best_for:
  - You want one self-hosted assistant surface spanning model providers, persistent sessions, skills, and chat channels.
  - You can put shell, browser, skill, and channel credentials behind explicit approvals and a sandbox.
avoid_if:
  - You need an embeddable agent loop with a small dependency and permission surface.
  - You need a stable, independently audited runtime rather than a fast-moving personal-agent platform.
enrichment_notes: Official repository, MIT license, and same-day repository activity were reviewed on 2026-07-11. Installation, permission defaults, and production suitability still require hands-on review.
---

## Overview

Hermes Agent is a Python personal-agent platform from NousResearch. It combines model-provider adapters, persistent conversations, tool execution, reusable skills, subagent delegation, and channel or gateway surfaces. That combination is the product: it shortens the path from a model API to a usable assistant, but it also makes Hermes responsible for more credentials and side effects than a library-level agent loop.

## Why it's in the Arsenal

Hermes is a useful reference point for the “personal agent as an operated service” category. A team comparing it with a coding-agent harness or a small orchestration SDK should ask whether it needs channel adapters, persistent identity, and a skill ecosystem, or whether those features would create unnecessary policy and upgrade surface.

## Architecture

The runtime is organized around a Python agent core, provider selection, session/context persistence, tool and skill dispatch, and optional subagent work. Gateway and channel integrations expose the same agent capabilities through different interaction surfaces. The important control boundary is the tool and skill runner: shell commands, browser actions, files, network access, and third-party skills should not inherit unrestricted host permissions. Pinning also matters because provider adapters and skill contracts can change independently of the model.

## Ecosystem Position

Hermes sits above model APIs and local inference runtimes, alongside other deployable personal-agent platforms. It is not a neutral MCP server or a low-level workflow graph. It can consume tools and memory components, but teams should keep approval, sandboxing, secret rotation, and trace collection outside the agent’s model-generated policy decisions.

## Getting Started

Start from the official installation path and pin a release or commit. Run a read-only task in a disposable workspace, inspect which skills and channels are enabled, and verify how transcripts, credentials, and tool outputs are stored. Only then test shell, browser, or write access behind an approval boundary.

## Key Use Cases

- A personal or team assistant that needs persistent sessions and more than one interaction channel.
- Long-running research or coding tasks that benefit from reusable skills and delegated subtasks.

## Strengths

- Integrates provider access, memory, tools, skills, and channels instead of forcing a team to assemble all of those surfaces first.
- MIT-licensed source with active development and enough breadth to serve as a reference implementation for personal-agent operations.

## Limitations

- The broad capability surface increases the blast radius of a bad skill, leaked credential, or overly permissive tool policy.
- Beta status and rapid provider/channel changes make release pinning, migration tests, and rollback procedures necessary.

## Relation to the Arsenal

Hermes is a deployable agent platform, not a replacement for a sandbox, policy engine, or observability layer. Evaluate it against narrower agent runtimes when the application needs deterministic workflows or a small, auditable trust boundary.

## Resources

- [Official source](https://github.com/NousResearch/hermes-agent)
- [Official releases](https://github.com/NousResearch/hermes-agent/releases)

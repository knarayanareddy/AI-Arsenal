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
org_or_maintainer: HKUDS
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
id: nanobot
name: nanobot
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Lightweight open-source agent framework for tools, chats, workflows, and multi-provider operation
github_url: https://github.com/HKUDS/nanobot
license: MIT
primary_language: Python
tags:
  - agents
  - orchestration
  - tool-use
  - memory
  - local
maturity: beta
cost_model: open-source
github_stars: 45262
last_commit: '2026-07-11'
docs_url: https://github.com/HKUDS/nanobot
phase: agent-system
domain:
  - language
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A compact personal-agent surface for connecting model providers, tools, chats, and workflows without adopting a larger enterprise platform
best_for:
  - You want a small self-hosted agent surface with chat/channel integrations and tool use
  - You prefer a lightweight system that can be inspected and adapted locally
avoid_if:
  - You require a long-term supported enterprise runtime or formal compliance controls
  - You need verified guarantees around memory isolation, permissions, or multi-tenant operation
enrichment_notes: Repository metadata, MIT license, and active July 2026 maintenance were reviewed on 2026-07-11. Security, isolation, and production maturity remain draft.
---

## Overview

nanobot is an MIT-licensed lightweight agent framework for connecting models to tools, chats, and workflows. It targets a smaller operational footprint than broad enterprise agent platforms.

## Why it's in the Arsenal

It earns a place as a compact personal-agent reference: useful for comparing how much runtime, channel, memory, and tool surface is necessary for a practical self-hosted assistant.

## Architecture

The framework provides provider/model integration, tool and channel wiring, workflow execution, and memory-oriented behavior in a small Python codebase. Exact integrations and security behavior should be checked against the current release.

## Ecosystem Position

nanobot sits at the agent-system layer and can complement local runtimes, hosted APIs, MCP tools, and message channels. It overlaps with personal assistants and lightweight agent harnesses.

## Getting Started

Use the official installation and channel examples. Start with a local model or test account, restrict tool permissions, and inspect data retention and channel authentication before connecting personal systems.

## Key Use Cases

- Small self-hosted assistants with tool and chat integrations
- Learning or adapting a lightweight agent runtime

## Strengths

- Compact positioning and MIT license
- Active development with a broad practical integration target

## Limitations

- Large repository popularity does not establish production safety
- Permissions, memory isolation, and multi-user behavior require independent testing

## Relation to the Arsenal

This is a deployable agent-system project, best compared with other lightweight assistants and harnesses rather than enterprise inference platforms.

## Resources

- [Official source](https://github.com/HKUDS/nanobot)

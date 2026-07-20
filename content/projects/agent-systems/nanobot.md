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
github_stars_last_30d: 34
trending_score: 33
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: nanobot
name: nanobot
artifact_type: framework
category: agents
subcategory: autonomous
description: HKU Data Intelligence Lab's lightweight open-source agent for tool use, chats, and workflows, distributed as the nanobot-ai PyPI package
github_url: https://github.com/HKUDS/nanobot
license: MIT
primary_language: Python
tags:
  - agents
  - tool-use
  - orchestration
  - memory
  - community-favorite
maturity: beta
cost_model: open-source
github_stars: 45924
last_commit: '2026-07-20'
docs_url: https://nanobot.wiki/docs/latest/getting-started/nanobot-overview
phase: agent-system
domain:
  - language
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - community-driven
  - actively-maintained
ecosystem_role:
  - Lightweight Python chat-and-tools agent distributed as nanobot-ai
  - Approachable alternative to heavyweight agent orchestration platforms
best_for:
  - Small self-hosted assistants with chat and tool integrations
  - Learning agent workflow composition without a large framework
avoid_if:
  - You need enterprise governance and isolation out of the box
  - Your workload requires a heavyweight distributed orchestration platform
enrichment_notes: The README and metadata identify an actively developed lightweight project; integrations, model providers, and security posture should still be reviewed before production. Draft pending review.
---

## Overview

nanobot deliberately keeps the surface area of an AI agent small: a Python process can connect chats, tools, and workflows without requiring a large platform deployment. That makes it useful for engineers who want to inspect and extend the control loop rather than adopt a deeply layered orchestration product.

## Why it's in the Arsenal

nanobot earns a slot by keeping a tool-using chat agent small enough to install, inspect, and adapt without adopting a large orchestration platform. The HKU Data Intelligence Lab project is actively developed, MIT-licensed, and distributed as `nanobot-ai`, which lowers the barrier to experimenting with chat and workflow integrations.

## Architecture

The framework centers on a lightweight agent runtime with provider configuration, conversation handling, tool invocation, and workflow-oriented extensions. The PyPI package provides a quick path to installation, while the documentation site is the integration reference; deployment topology and persistence remain the operator's choices.

## Ecosystem Position

nanobot overlaps with larger agent frameworks and complements model-serving APIs and MCP-style tools. Its compact design is an alternative to heavyweight orchestration for personal or team assistants, but it does not provide the same default fleet management, policy enforcement, or observability depth as a production platform.

## Getting Started

Install the PyPI package with `pip install nanobot-ai` or use the repository's documented development setup, then initialize the configuration and provider credentials. Launch the CLI, connect one chat channel, and add a least-privilege tool before composing longer workflows or persistent memory.

## Key Use Cases

Use nanobot for a personal assistant that can call a few local tools, for chat-triggered team workflows, or for teaching agent concepts in a small Python codebase. Its lightweight runtime is also a useful starting point for testing provider routing and tool permissions before moving to a fleet platform.

## Strengths

The project combines Python extensibility, chat integrations, tool calls, and workflow composition in a compact MIT-licensed package. The `nanobot-ai` distribution and current documentation make the first local experiment substantially simpler than assembling those pieces from unrelated libraries.

## Limitations

Lightweight does not mean automatically safe: tool permissions, prompt injection, secret storage, memory retention, and concurrency need explicit controls. Community-driven maintenance can change interfaces quickly, and the framework's small footprint may become a limitation for durable multi-tenant workflows or strict audit requirements.

## Relation to the Arsenal

nanobot complements larger agent frameworks, MCP tools, and local model servers, while competing with minimal personal-assistant runtimes. It is an approachable agent core in the Arsenal rather than a replacement for OpenShell isolation, enterprise observability, or multi-tenant scheduling.

## Resources

- [GitHub](https://github.com/HKUDS/nanobot)
- [Documentation](https://nanobot.wiki/docs/latest/getting-started/nanobot-overview)

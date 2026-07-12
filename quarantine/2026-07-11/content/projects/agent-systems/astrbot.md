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
org_or_maintainer: AstrBotDevs
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
id: astrbot
name: AstrBot
artifact_type: platform
category: agents
subcategory: autonomous
description: Open-source agent assistant and development framework connecting chat platforms, model providers, plugins, and AI features
github_url: https://github.com/AstrBotDevs/AstrBot
license: AGPL-3.0
primary_language: Python
tags:
  - agents
  - orchestration
  - tool-use
  - memory
  - multimodal
  - voice

maturity: beta
cost_model: open-source
github_stars: 36200
last_commit: '2026-07-11'
docs_url: https://github.com/AstrBotDevs/AstrBot
phase: agent-system
domain:
  - language
  - multimodal
  - general-purpose

relation_to_stack:
  - deploy-as-is
  - fork-and-adapt

health_signals:
  - actively-maintained
  - community-driven

ecosystem_role:
  - A channel-oriented agent platform with plugin and provider integration.
best_for:
  - You need a self-hosted assistant exposed through multiple messaging channels.
  - You can operate an AGPL application and review third-party plugins and permissions.
avoid_if:
  - You need a minimal embeddable agent library rather than an application platform.
  - You cannot control plugin provenance, channel credentials, or outbound tool access.
enrichment_notes: Official repository, AGPL-3.0 license, Python implementation, and same-day activity were checked on 2026-07-11. Plugin behavior and production fit remain draft.
---

## Overview

AstrBot is an agent assistant and development framework that connects model providers, messaging platforms, plugins, and AI features. It is designed as an application platform for interactive assistants rather than a single-purpose model or library.

## Why it's in the Arsenal

It is a useful reference for engineers evaluating channel-facing agent platforms. The value is the integration surface—providers, plugins, and conversational channels—along with the corresponding operational responsibility.

## Architecture

The project combines a Python agent core with provider adapters, channel adapters, plugin extension points, and a management surface. Tool and plugin calls cross the application boundary, so credentials, network access, and plugin trust need to be configured explicitly.

## Ecosystem Position

AstrBot sits above model APIs and external channels. It overlaps with self-hosted assistant platforms and can complement model gateways, memory stores, and sandboxed tool runners.

## Getting Started

Follow the official deployment instructions, start with a private channel and read-only plugins, and pin the version. Review the AGPL obligations and audit enabled plugins before connecting organizational data.

## Key Use Cases

- Personal or team assistants on messaging platforms
- Plugin-based experiments with provider and channel integrations

## Strengths

- Broad channel and provider integration surface
- Active community development and an explicit plugin model

## Limitations

- Plugin and channel breadth expands the security and maintenance surface
- AGPL-3.0 licensing and third-party integrations may affect distribution and deployment choices

## Relation to the Arsenal

This is a full agent platform, not a neutral orchestration primitive. Pair it with least-privilege tool policy, secret management, and observability before production exposure.

## Resources

- [Official source](https://github.com/AstrBotDevs/AstrBot)
- [Official license](https://github.com/AstrBotDevs/AstrBot/blob/master/LICENSE)


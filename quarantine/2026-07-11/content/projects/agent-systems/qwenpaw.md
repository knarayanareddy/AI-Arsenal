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
org_or_maintainer: agentscope-ai
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
id: qwenpaw
name: QwenPaw
artifact_type: platform
category: agents
subcategory: autonomous
description: Personal AI assistant platform with local or cloud deployment, channels, skills, memory, and policy controls
github_url: https://github.com/agentscope-ai/QwenPaw
license: Other
primary_language: Python
tags:
  - agents
  - orchestration
  - memory
  - tool-use
  - guardrails
  - multimodal
maturity: beta
cost_model: open-source
github_stars: 21900
last_commit: '2026-07-10'
docs_url: https://github.com/agentscope-ai/QwenPaw
phase: agent-system
domain:
  - language
  - multimodal
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - org-backed
  - actively-maintained
  - community-driven
ecosystem_role:
  - A personal-agent platform combining channels, skills, memory, governance, sandboxing, and a local/cloud deployment surface
best_for:
  - You need a multi-channel personal assistant with explicit resource, governance, and sandbox concepts
  - You want to evaluate AgentScope ecosystem patterns in a packaged end-user platform
avoid_if:
  - You need a minimal embeddable agent library
  - You cannot independently verify channel permissions, credential handling, sandbox boundaries, and license terms
enrichment_notes: Official repository, v2.0 development, and current activity were reviewed on 2026-07-11. License, platform maturity, and operational/security claims remain draft.
---

## Overview

QwenPaw is personal ai assistant platform with local or cloud deployment, channels, skills, memory, and policy controls.

## Why it's in the Arsenal

QwenPaw is a fresh candidate for the agent-system layer because it addresses a concrete engineering decision and has an inspectable primary source.

## Architecture

The repository or paper provides the implementation/design described by its primary source. This entry keeps the architecture summary deliberately high-level until independent reproduction confirms exact operational boundaries.

## Ecosystem Position

It complements adjacent AI model, data, agent, serving, and evaluation components. Compare it by evidence, protocol, compatibility, and license—not by popularity alone.

## Getting Started

Follow the official source, pin versions, run a minimal example or reproduction, and measure the behavior that matters for your workload before enabling real data or side effects.

## Key Use Cases

- You need a multi-channel personal assistant with explicit resource, governance, and sandbox concepts
- You want to evaluate AgentScope ecosystem patterns in a packaged end-user platform

## Strengths

- Clear problem focus and inspectable primary source
- Explicit tradeoffs are documented rather than presented as unconditional recommendations

## Limitations

- Independent production evidence is not established in this first pass
- Compatibility, operational cost, and security boundaries require workload-specific testing

## Relation to the Arsenal

This agent-system project should be evaluated alongside the relevant AI Arsenal tools, architectures, build examples, and research entries.

## Resources

- [Primary source](https://github.com/agentscope-ai/QwenPaw)

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
github_stars_last_30d: 0
trending_score: 0
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: watching
id: ui-tars-desktop
name: UI-TARS Desktop
artifact_type: platform
category: multimodal
subcategory: platforms
description: Multimodal GUI-agent stack with Agent TARS CLI, web interfaces, vision models, and tool integration
github_url: https://github.com/bytedance/UI-TARS-desktop
license: Apache-2.0
primary_language: TypeScript
tags:
  - agents
  - multimodal
  - vision
  - tool-use
  - orchestration
  - research

maturity: alpha
cost_model: open-source
github_stars: 37900
last_commit: '2026-06-30'
docs_url: https://github.com/bytedance/UI-TARS-desktop
phase: agent-system
domain:
  - vision
  - multimodal
  - language

relation_to_stack:
  - study-and-reference
  - deploy-as-is

health_signals:
  - org-backed
  - research-origin
  - experimental

ecosystem_role:
  - A multimodal computer-use and GUI-agent stack whose desktop surface is being phased toward the Agent TARS CLI direction.
best_for:
  - You are evaluating GUI-agent interaction and multimodal tool workflows.
  - You can treat the current repository and release notes as the source of truth for supported surfaces.
avoid_if:
  - You need a stable remote-computer product with an unchanged roadmap.
  - You cannot sandbox GUI, browser, shell, or network side effects.
enrichment_notes: Official repository, Apache-2.0 license, and the 2026-06-30 activity were checked on 2026-07-11. The repository documents sunset changes for parts of the desktop/remote-operator surface, so this entry is watching.
---

## Overview

UI-TARS Desktop is a multimodal GUI-agent stack from ByteDance. The repository includes the Agent TARS CLI direction, web and desktop surfaces, vision-oriented interaction, and connections to real-world tools.

## Why it's in the Arsenal

It captures an important computer-use design point: visual grounding and GUI actions sit beside ordinary model and tool calls, with different failure and safety modes. The repository is also a reminder to read roadmap and sunset notes rather than assuming every surface remains supported.

## Architecture

The stack combines a TypeScript application and CLI layer with model-provider configuration, GUI or browser interaction, event streams, and tool/MCP integration. A GUI agent needs a separate sandbox and approval boundary for clicks, keystrokes, shell commands, and network operations.

## Ecosystem Position

UI-TARS sits at the multimodal agent-system layer. It consumes vision-capable models and tool environments, and overlaps with computer-use and browser-agent systems.

## Getting Started

Read the current README and release notes, choose the Agent TARS surface that is still supported, and run it against a disposable environment. Log every action and disable remote or destructive operations until approvals work.

## Key Use Cases

- Prototyping GUI-agent and computer-use interactions
- Studying event streams and multimodal tool workflows

## Strengths

- Integrates visual interaction with a broader agent stack
- Public source and Apache-2.0 licensing provide an inspectable starting point

## Limitations

- Roadmap and supported surfaces have changed, including sunset notes for desktop/remote-operator components
- GUI actions are difficult to make reliable and safe without isolation and human approval

## Relation to the Arsenal

Treat this as a watching multimodal agent-system project, not an unconditional recommendation. Pair it with sandboxing, action logging, and evaluation on the exact UI tasks that matter.

## Resources

- [Official source](https://github.com/bytedance/UI-TARS-desktop)
- [Official license](https://github.com/bytedance/UI-TARS-desktop/blob/main/LICENSE)
- [Official releases](https://github.com/bytedance/UI-TARS-desktop/releases)


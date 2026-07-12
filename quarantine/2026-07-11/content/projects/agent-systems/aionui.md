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
org_or_maintainer: iOfficeAI
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
id: aionui
name: AionUi
artifact_type: platform
category: agents
subcategory: platforms
description: Local open-source cowork application for coordinating coding-agent CLIs and persistent assistant workflows
github_url: https://github.com/iOfficeAI/AionUi
license: Apache-2.0
primary_language: TypeScript
tags:
  - agents
  - orchestration
  - tool-use
  - local
  - self-hosted
  - multimodal

maturity: beta
cost_model: open-source
github_stars: 29800
last_commit: '2026-07-11'
docs_url: https://github.com/iOfficeAI/AionUi
phase: agent-system
domain:
  - language
  - general-purpose
  - multimodal

relation_to_stack:
  - deploy-as-is
  - fork-and-adapt

health_signals:
  - actively-maintained
  - community-driven

ecosystem_role:
  - A local desktop control surface for multiple coding-agent and assistant backends.
best_for:
  - You want a local cowork UI around supported agent CLIs.
  - You can inspect the CLI permissions and local data paths before use.
avoid_if:
  - You need a headless agent runtime or a small embeddable library.
  - You cannot keep local credentials, files, and agent processes inside a controlled boundary.
enrichment_notes: Official repository, Apache-2.0 license, current version update, and same-day activity were checked on 2026-07-11. Backend compatibility and long-term stability remain draft.
---

## Overview

AionUi is a local, open-source cowork application that provides a desktop surface for coding-agent and assistant command-line backends. It focuses on coordinating multiple assistants, customizing their use, and keeping the interaction local.

## Why it's in the Arsenal

It is relevant to teams deciding whether agent interaction should live in a local control surface rather than a hosted web application. The important boundary is that AionUi coordinates other agents; the security properties of each backend still apply.

## Architecture

The project is a TypeScript/Electron-style application with a user interface, local configuration, agent-process integration, and supporting services. The application launches or connects to selected CLI backends, so process permissions, environment variables, and workspace access need to be audited separately.

## Ecosystem Position

AionUi sits at the local application layer around coding-agent runtimes. It complements local models and coding agents but is not itself a model, inference engine, or policy boundary.

## Getting Started

Install the current release from the official repository, use a test workspace, and configure one backend at a time. Check where credentials, logs, prompts, and generated files are stored before connecting sensitive repositories.

## Key Use Cases

- Local cowork workflows over several coding-agent CLIs
- Desktop experimentation with assistant configuration and context

## Strengths

- Local-first interaction and a broad integration target
- Active development and Apache-2.0 licensing

## Limitations

- The security and reliability of the selected backend are inherited rather than solved
- Desktop process and credential boundaries need platform-specific review

## Relation to the Arsenal

Use AionUi as a local control surface alongside an agent system. Keep sandboxing, secret management, and evaluation in explicit layers instead of assuming the UI provides them.

## Resources

- [Official source](https://github.com/iOfficeAI/AionUi)
- [Official license](https://github.com/iOfficeAI/AionUi/blob/main/LICENSE)


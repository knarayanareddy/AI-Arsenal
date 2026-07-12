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
org_or_maintainer: "smallcloudai"
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
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: refact
name: "Refact.ai"
artifact_type: platform
category: code-generation
subcategory: coding-agents
description: "An open-source AI coding agent that plans and executes engineering tasks end-to-end, integrating with developer tools and supporting self-hosted models"
github_url: https://github.com/smallcloudai/refact
license: "BSD-3-Clause"
primary_language: "Rust"
tags:
  - "agents"
  - "llm"
  - "self-hosted"
maturity: beta
cost_model: open-source
github_stars: 3548
last_commit: "2026-05-30"
docs_url: https://docs.refact.ai/
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "A self-hostable coding agent that plans, executes, and iterates on engineering tasks across developer tools."
best_for:
  - "You want a self-hosted coding agent that integrates with your IDE and tools and can run local models"
  - "You need an end-to-end agent that plans and iterates on tasks rather than just autocompleting code"
avoid_if:
  - "You prefer a fully managed cloud coding assistant with no infrastructure to run"
  - "You need the broadest IDE ecosystem and polish of the largest commercial assistants"
enrichment_notes: "Repository, BSD-3-Clause license, and 2026-05-30 activity verified via the GitHub API on 2026-07-12. Agentic code changes require review before merging."
---

## Overview

Refact.ai is an open-source AI coding agent that handles engineering tasks end-to-end: it integrates with a developer's tools, plans an approach, executes changes, and iterates until it reaches a working result. Beyond autocomplete, it aims to autonomously carry a task from description to a proposed solution, and it can run against self-hosted models for privacy.

## Why it's in the Arsenal

It is a self-hostable, agentic coding tool that emphasizes end-to-end task execution and local-model support, which distinguishes it from cloud-only assistants and makes it a relevant code-generation entry.

## Architecture

Refact combines an IDE plugin front end with a Rust backend agent that plans steps, calls tools (file edits, terminal commands, search, and other integrations) in a loop, and evaluates progress until the task is complete. It supports multiple LLM providers and self-hosted/open models, includes retrieval over the codebase for context, and exposes fine-tuning/customization so teams can adapt it to their stack and keep code on their own infrastructure.

## Ecosystem Position

Refact competes with coding agents and assistants like Aider, Continue, Cursor, and GitHub Copilot, differentiating on being open-source, self-hostable, and able to run local models for privacy. Compared with cloud assistants it favors data control and customization, and compared with autocomplete-only tools it operates as an end-to-end task agent, so it suits teams with privacy or on-prem requirements.

## Getting Started

Install the IDE plugin and run the Refact backend (cloud or self-hosted via Docker), connect a model provider or a local model, then assign it a task in the IDE and review the plan and changes it proposes before accepting.

## Key Use Cases

Self-hosted agentic coding; end-to-end task automation in the IDE; privacy-sensitive teams running local models; codebase-aware refactoring and feature work.

## Strengths

Open-source and self-hostable, end-to-end task agent, local/self-hosted model support, IDE integration, codebase retrieval, and a permissive BSD license.

## Limitations

Its IDE ecosystem and polish are smaller than the largest commercial assistants, self-hosting adds operational work, agentic changes require careful review before merging, and results depend on the chosen model.

## Relation to the Arsenal

It is the self-hostable, privacy-first coding agent alongside the other code-generation entries in the catalog.

## Resources

- [GitHub repository](https://github.com/smallcloudai/refact)
- [Documentation](https://docs.refact.ai/)

---
id: cherry-studio
name: Cherry Studio
version_tracked: null
artifact_type: tool
category: tooling
subcategory: tools
description: Cross-platform desktop LLM client supporting many cloud and local providers, with assistants, knowledge bases, MCP tools, and artifacts in one app
github_url: https://github.com/CherryHQ/cherry-studio
license: AGPL-3.0
primary_language: TypeScript
org_or_maintainer: CherryHQ
tags:
  - llm
  - agents
  - rag
  - self-hosted
maturity: production
cost_model: open-source
github_stars: 48789
github_stars_last_30d: 470
trending_score: 78
last_commit: '2026-07-20'
docs_url: https://docs.cherry-ai.com/
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: framework
domain:
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - community-driven
  - actively-maintained
  - production-proven
ecosystem_role:
  - Popular open desktop front-end that unifies many LLM providers (cloud + local) with assistants, RAG knowledge bases, and MCP tools, competing with clients like LibreChat/Open WebUI but as a native desktop app
best_for:
  - You want one desktop app to talk to many providers (OpenAI, Anthropic, Gemini, local Ollama/LM Studio, etc.) with assistants, local knowledge bases, and MCP tools, without wiring your own UI
  - You want provider optionality and local-model support in a polished client for individuals or small teams, rather than a hosted single-vendor chat
avoid_if:
  - You need a multi-user, server-hosted deployment with centralized auth and admin — a web app like LibreChat/Open WebUI fits that better than a desktop client
  - You are embedding chat into your own product — Cherry Studio is an end-user application, not a library/SDK to build on
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (48,319), AGPL-3.0 license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims from the docs/README; not hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/CherryHQ/cherry-studio
    date: '2026-07-08'
    description: 48,319 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

Cherry Studio is a cross-platform (macOS/Windows/Linux) desktop LLM client. It connects to many cloud providers and local runtimes, and bundles assistants/personas, document knowledge bases (RAG), MCP tool support, and artifact rendering into a single polished application.

## Why it's in the Arsenal

It is one of the most popular open desktop clients for people who want provider optionality — switching between cloud APIs and local models — plus RAG and MCP tools without building a UI. It is a comparison point among LLM front-ends; the distinction from server-hosted web clients is drawn honestly below.

## Architecture

It is an Electron/TypeScript desktop app that abstracts providers behind a common chat interface, stores conversations/knowledge locally, indexes uploaded documents for retrieval, and speaks the Model Context Protocol to invoke external tool servers. Local-model support comes via connectors to runtimes like Ollama/LM Studio.

## Ecosystem Position

It competes with web-hosted clients (LibreChat, Open WebUI) and other desktop clients. Its niche is a feature-rich native desktop experience with strong multi-provider and local-model support for individuals and small teams.

## Getting Started

```text
Download the installer for your OS from the GitHub releases page,
add provider API keys (or connect a local Ollama/LM Studio), and start chatting.
```

## Key Use Cases

1. **Scenario**: a power user juggling multiple providers and local models from one desktop app
2. **Scenario**: personal/team knowledge-base chat (RAG over local documents) with MCP tools
3. **Scenario where this is NOT the right fit**: a multi-user, centrally-administered chat deployment — use a hosted web client

## Strengths

- Broad provider + local-model coverage in one client
- Built-in assistants, RAG knowledge bases, MCP tools
- Polished cross-platform desktop UX

## Limitations

- Desktop app, not a multi-user server or an SDK
- AGPL-3.0 licensing has redistribution implications
- Local data management/security is the user's responsibility

## Relation to the Arsenal

- Compare against LibreChat and Open WebUI before adopting for team use.
- Reference this project by its canonical ID `cherry-studio`.
- Review AGPL-3.0 obligations before bundling or redistributing.

## Resources

- [GitHub Repository](https://github.com/CherryHQ/cherry-studio)
- [Documentation](https://docs.cherry-ai.com/)

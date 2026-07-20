---
id: librechat
name: LibreChat
version_tracked: null
artifact_type: platform
category: agents
subcategory: platforms
description: Self-hosted ChatGPT-style interface unifying OpenAI, Anthropic, Google, and local models with agents, code interpreter, and multi-user auth
github_url: https://github.com/danny-avila/LibreChat
license: MIT
primary_language: TypeScript
org_or_maintainer: LibreChat (Danny Avila)
tags:
  - agents
  - self-hosted
  - llm
maturity: production
cost_model: open-source
github_stars: 40974
github_stars_last_30d: 527
trending_score: 80
last_commit: '2026-07-20'
docs_url: https://www.librechat.ai/docs
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain:
  - language
  - general-purpose
relation_to_stack:
  - deploy-as-is
health_signals:
  - community-driven
  - actively-maintained
ecosystem_role:
  - 'The multi-provider self-hosted chat frontend: where Open WebUI grew up around Ollama, LibreChat grew up around unifying every commercial API (OpenAI, Anthropic, Google, Azure, Bedrock) behind one familiar ChatGPT-clone UX with enterprise-grade auth.'
best_for:
  - Your organization wants one governed chat UI over many providers — per-user API key management, OAuth/LDAP auth, moderation tools, and search across all conversations
  - 'You need ChatGPT-parity features self-hosted: agents with tool use and MCP support, code interpreter API, DALL-E/image generation, forking conversations, and preset switching mid-thread'
avoid_if:
  - You run purely local models and want the tightest Ollama integration — Open WebUI's model management (pull/create/quantize from the UI) is deeper for that workflow
  - You want a minimal-dependency deployment — the stack (MongoDB, MeiliSearch, RAG API service) is heavier than single-container alternatives
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - open-webui
  - anythingllm
integrates_with:
  - ollama
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (40,447), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/danny-avila/LibreChat
    date: '2026-07-08'
    description: 40,447 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

An open-source, self-hosted AI chat platform that clones and extends the ChatGPT experience across providers: one interface for OpenAI, Anthropic, Google, Azure, Bedrock, and local endpoints, with agents, retrieval, code execution, multimodal chat, and real multi-user administration. It targets teams that want commercial-model access with self-hosted control and auditability.

## Why it's in the Arsenal

The multi-provider self-hosted chat frontend: where Open WebUI grew up around Ollama, LibreChat grew up around unifying every commercial API (OpenAI, Anthropic, Google, Azure, Bedrock) behind one familiar ChatGPT-clone UX with enterprise-grade auth. It earns a place in the Arsenal because it directly addresses a recurring decision point: your organization wants one governed chat UI over many providers — per-user API key management, OAuth/LDAP auth, moderation tools, and search across all conversations. See Strengths / Limitations below before adopting it.

## Architecture

A Node/React application backed by MongoDB (conversations, users) and MeiliSearch (full-text search), with a separate RAG API service (pgvector) for document chat. Endpoints abstract provider APIs behind unified chat semantics; the agent system adds tools (web search, code interpreter sandbox, MCP servers, custom actions from OpenAPI specs); auth supports OAuth2, LDAP, and per-user credential encryption.

## Ecosystem Position

Upstream: every major LLM API plus OpenAI-compatible local servers. Competing: Open WebUI (local-first), AnythingLLM (document-appliance focus), commercial team plans from providers. Complementary: MCP tool servers plug in directly; its code-interpreter and RAG services are usable as standalone APIs. One of the most-starred self-hosted AI UIs with a large deployment base.

## Getting Started

```bash
git clone https://github.com/danny-avila/LibreChat.git && cd LibreChat
cp .env.example .env  # add provider API keys
docker compose up -d
# open localhost:3080
```

## Key Use Cases

1. **Scenario**: your organization wants one governed chat UI over many providers — per-user API key management, OAuth/LDAP auth, moderation tools, and search across all conversations
2. **Scenario**: you need ChatGPT-parity features self-hosted: agents with tool use and MCP support, code interpreter API, DALL-E/image generation, forking conversations, and preset switching mid-thread

## Strengths

- Your organization wants one governed chat UI over many providers — per-user API key management, OAuth/LDAP auth, moderation tools, and search across all conversations
- You need ChatGPT-parity features self-hosted: agents with tool use and MCP support, code interpreter API, DALL-E/image generation, forking conversations, and preset switching mid-thread

## Limitations

- You run purely local models and want the tightest Ollama integration — Open WebUI's model management (pull/create/quantize from the UI) is deeper for that workflow
- You want a minimal-dependency deployment — the stack (MongoDB, MeiliSearch, RAG API service) is heavier than single-container alternatives

## Relation to the Arsenal

This is an agent-system entry: it documents a standalone, deployable system rather than a library you import. For a library/SDK to build your own agent with, see [Frameworks](../frameworks/_index.md). For job-based tool comparisons, see [tools/by-job/](../../tools/by-job/_index.md).

## Resources

- [GitHub](https://github.com/danny-avila/LibreChat)
- [Documentation](https://www.librechat.ai/docs)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (40,447 stars, last commit 2026-07-08, verified via GitHub API on 2026-07-08)*

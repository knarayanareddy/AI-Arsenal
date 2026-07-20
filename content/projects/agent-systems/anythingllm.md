---
id: anythingllm
name: AnythingLLM
version_tracked: null
artifact_type: platform
category: agents
subcategory: platforms
description: 'All-in-one desktop and self-hosted AI application: private document chat, RAG, and agents over any LLM with no-code setup'
github_url: https://github.com/Mintplex-Labs/anything-llm
license: MIT
primary_language: Other
org_or_maintainer: Mintplex Labs
tags:
  - rag
  - agents
  - self-hosted
maturity: production
cost_model: open-source
github_stars: 63597
github_stars_last_30d: 683
trending_score: 80
last_commit: '2026-07-18'
docs_url: https://docs.anythingllm.com
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
  - org-backed
  - actively-maintained
  - community-driven
ecosystem_role:
  - 'The ''private ChatGPT over your documents'' appliance: a single Docker container or desktop app bundling ingestion, embedding, vector storage, RAG chat, and no-code agents — the lowest-friction path from documents to a working private assistant.'
best_for:
  - You want document-grounded private chat running today with zero pipeline code — drag in PDFs/docx/websites, pick any LLM (local via Ollama or hosted), and workspaces handle chunking/embedding/retrieval
  - You need multi-user self-hosted deployment with permissions and embeddable chat widgets — the Docker version adds user management that desktop-only tools lack
avoid_if:
  - You need fine-grained control over RAG internals (custom chunking strategies, rerankers, hybrid retrieval tuning) — appliance-style defaults trade configurability for simplicity; build on LlamaIndex/Haystack instead
  - You are already invested in Open WebUI or LibreChat for chat UX — the overlap is large and migrating workspaces is manual
upstream_dependencies: []
downstream_consumers: []
alternatives:
  - open-webui
  - librechat
integrates_with:
  - ollama
  - lm-studio
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (62,914), primary language, license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/Mintplex-Labs/anything-llm
    date: '2026-07-08'
    description: 62,914 stars on GitHub as of 2026-07-08 (GitHub API)
featured: false
status: active
---

## Overview

An open-source AI application that packages the full private-assistant stack — document ingestion, embedding, vector database, RAG chat, multi-user management, and no-code AI agents — into one deployable unit (desktop app or Docker). Its design bet is vertical integration: acceptable defaults for every pipeline stage rather than best-in-class configurability at any one stage.

## Why it's in the Arsenal

The 'private ChatGPT over your documents' appliance: a single Docker container or desktop app bundling ingestion, embedding, vector storage, RAG chat, and no-code agents — the lowest-friction path from documents to a working private assistant. It earns a place in the Arsenal because it directly addresses a recurring decision point: you want document-grounded private chat running today with zero pipeline code — drag in PDFs/docx/websites, pick any LLM (local via Ollama or hosted), and workspaces handle chunking/embedding/retrieval. See Strengths / Limitations below before adopting it.

## Architecture

Workspaces are containerized RAG contexts: documents are chunked and embedded (built-in or pluggable embedders), stored in LanceDB by default (Pinecone/Chroma/others pluggable), and retrieved into chats pinned to that workspace. An agent framework adds tool use (web browsing, file operations, custom skills via MCP support); every major LLM provider plus local runtimes (Ollama, LM Studio, llama.cpp) is a swappable backend.

## Ecosystem Position

Upstream: any LLM provider/runtime, LanceDB and pluggable vector stores. Competing: Open WebUI (deeper Ollama-native community), LibreChat (multi-provider chat focus), Onyx (enterprise search focus). Complementary: MCP support lets it consume the same tool servers as Claude/other agent hosts; Mintplex Labs ships weekly releases with a hosted-cloud option funding development.

## Getting Started

```bash
docker pull mintplexlabs/anythingllm
docker run -d -p 3001:3001 --cap-add SYS_ADMIN -v anythingllm:/app/server/storage mintplexlabs/anythingllm
# open localhost:3001, pick your LLM + embedder, create a workspace, drop documents in
```

## Key Use Cases

1. **Scenario**: you want document-grounded private chat running today with zero pipeline code — drag in PDFs/docx/websites, pick any LLM (local via Ollama or hosted), and workspaces handle chunking/embedding/retrieval
2. **Scenario**: you need multi-user self-hosted deployment with permissions and embeddable chat widgets — the Docker version adds user management that desktop-only tools lack

## Strengths

- You want document-grounded private chat running today with zero pipeline code — drag in PDFs/docx/websites, pick any LLM (local via Ollama or hosted), and workspaces handle chunking/embedding/retrieval
- You need multi-user self-hosted deployment with permissions and embeddable chat widgets — the Docker version adds user management that desktop-only tools lack

## Limitations

- You need fine-grained control over RAG internals (custom chunking strategies, rerankers, hybrid retrieval tuning) — appliance-style defaults trade configurability for simplicity; build on LlamaIndex/Haystack instead
- You are already invested in Open WebUI or LibreChat for chat UX — the overlap is large and migrating workspaces is manual

## Relation to the Arsenal

This is an agent-system entry: it documents a standalone, deployable system rather than a library you import. For a library/SDK to build your own agent with, see [Frameworks](../frameworks/_index.md). For job-based tool comparisons, see [tools/by-job/](../../tools/by-job/_index.md).

## Resources

- [GitHub](https://github.com/Mintplex-Labs/anything-llm)
- [Documentation](https://docs.anythingllm.com)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (62,914 stars, last commit 2026-07-08, verified via GitHub API on 2026-07-08)*

---
id: cherry-studio
name: Cherry Studio
version_tracked: null
artifact_type: tool
category: tooling
subcategory: tools
description: "AGPL-3.0 Electron desktop client for many LLM providers, with 300+ preset assistants, local Ollama and LM Studio support, MCP and an enterprise tier"
github_url: "https://github.com/CherryHQ/cherry-studio"
license: AGPL-3.0
primary_language: TypeScript
org_or_maintainer: "CherryHQ"
tags: [llm, agents, local, tool-use]
maturity: production
cost_model: open-source
github_stars: 52215
github_stars_last_30d: 0
trending_score: 46
last_commit: "2026-09-28"
docs_url: "https://docs.cherry-ai.com/docs/en-us"
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
domain: [general-purpose]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [community-driven, actively-maintained, production-proven]
ecosystem_role:
  - Popular open desktop front-end that unifies many LLM providers (cloud + local) with assistants, RAG knowledge bases, and MCP tools, competing with clients like LibreChat/Open WebUI but as a native desktop app
best_for: ["You evaluate models for a team and you need one client where the same prompt can be sent to OpenAI, Anthropic, Gemini, DeepSeek, a local Ollama model and an LM Studio instance side by side.", "You want a usable desktop surface for MCP servers and agent skills without assembling an editor extension, a terminal harness and a browser tab.", "You are an individual or small team that wants the multi-model conversation, document handling and assistant catalogue of a commercial client under an open-source licence."]
avoid_if: ["You need to embed the AGPL obligations away, because the Community Edition is AGPL-3.0 and the README routes commercial licensing through a sales contact rather than a self-serve exception.", "You need a server-side or team-deployed instance, because the Community Edition has no admin backend and the shared knowledge base, role-based access control and dedicated private deployment are all Enterprise Edition features.", "You need an agent that owns a repository, because the topics tag agent skills and coding harnesses but the product is a chat-and-assistant desktop, not a terminal coding agent."]
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (48,319), AGPL-3.0 license, and last commit (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims from the docs/README; not hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/CherryHQ/cherry-studio", "date": "2026-07-08", "description": "48,319 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

Cherry Studio is an Electron desktop client for Windows, macOS and Linux that fronts multiple LLM providers behind one window, published by CherryHQ under AGPL-3.0. Provider coverage is three-layered: hosted services such as OpenAI, Gemini and Anthropic; AI web services including Claude, Perplexity and Poe; and local runtimes through Ollama and LM Studio. On top of that sit 300+ pre-configured assistants plus custom assistant creation, multi-model simultaneous conversations, document handling for text, images, Office and PDF, WebDAV file management and backup, Mermaid chart rendering, syntax highlighting, global search, a topic system, AI translation, drag-and-drop ordering, mini programs and an MCP server. The roadmap lists selection-assistant improvements, deep research, document preprocessing, an MCP marketplace, notes and collections, OCR, TTS, ASR, mobile apps and a plugin system. The repository is a pnpm workspace with a `packages/` monorepo layout, Playwright tests, a migrations directory, a `v2-refactor-temp/docs/breaking-changes` folder and a separate Enterprise Edition described as partially released to customers with a buyout or subscription model.

## Why it's in the Arsenal

The recurring annoyance is credential sprawl. Every model you evaluate, every local server you run and every web service you use is a different tab with a different login, and comparison work becomes manual copy-paste. Cherry Studio's bet is that the desktop client is the right place to end that: one assistant definition, many model backends, several conversations open at once, and a knowledge base in the same window. The cost is the licence and the split between editions, because the features an organisation actually needs (accounts, access control, shared knowledge, private server) are the ones behind the Enterprise purchase.

## Architecture

The app is an Electron shell with separate main and renderer builds configured through `electron.vite.config.ts` and `electron.vite.entries.config.ts`, packaging via `electron-builder.yml` plus a China-specific `electron-builder.cn.config.cjs`. Provider keys and conversation state live under a Cherry home directory alongside a BootConfig, with Electron's `userData` and logs in sibling paths; in development these are redirected by `CS_DEV_PROFILE_ROOT` or a `CS_DEV_USER_DATA_SUFFIX` so parallel instances do not collide. Internationalisation runs through `i18next.config.ts`, and a `migrations/` directory plus the v2 breaking-changes notes show state migrations are handled explicitly. MCP is supported as a server surface from the client, with a marketplace on the roadmap, and the repo also carries `.agents/` and `.claude/skills/` directories that use symlinks to share agent and skill files across the project.

## Ecosystem Position

Cherry Studio sits in the same category as Chatbox, LobeChat and Open WebUI, and the split from those is desktop-versus-self-hosted: Open WebUI and LobeChat are servers you deploy and share with a team, while this ships as an installed Electron application with per-machine state. Against Dify and Flowise in content/projects/frameworks it is not an orchestration canvas at all, which is why the README's own related-projects list points at LLM gateways such as new-api and one-api for key distribution. It complements rather than replaces the coding agents in content/tools/dx-and-tooling, supplying a GUI chat surface and an MCP client where those supply repository access. Where content/projects/inference-engines runs the local models it connects to via Ollama and LM Studio, this entry is the human-facing client above them.

## Getting Started

Runtime users take a signed build from Releases for Windows, macOS or Linux. Development needs Node from the pinned .node-version, corepack for the pnpm version, and symlink support on Windows:

```bash
git config --global core.symlinks true   # Windows: enable Developer Mode first
corepack enable && pnpm install
cp .env.example .env
pnpm dev
```

`pnpm debug` opens chrome://inspect for the renderer, `pnpm test` runs the Playwright suite, and `pnpm build:mac|build:win|build:linux` produces the installers.

## Key Use Cases

1. Model bake-off: open the same prompt against a frontier API model and a local Ollama model in simultaneous conversations and compare them without switching apps.
2. Persona reuse: pick from or author a 300-plus assistant preset with its own system prompt, tools and knowledge, and reuse it across every provider.
3. Local-first chat: point the client at LM Studio or Ollama and keep prompt and document handling on your own machine, with WebDAV for backup.

## Strengths

- One client across hosted providers, AI web services and local runtimes, which makes model comparison a first-class workflow rather than tab juggling.
- 300+ pre-configured assistants plus custom assistant creation, so common personas do not have to be written from scratch.
- Ships as a signed desktop build for all three major platforms with no environment setup, and an MCP server plus client surface in the app.
- AGPL-3.0 for the Community Edition, with the licence obligations stated plainly and a documented route to a commercial exemption.

## Limitations

The edition split is the sharp boundary. Everything an organisation needs for shared use, employee accounts, role-based permissions on models and knowledge bases, backup and a dedicated private server, is Enterprise Edition under a buyout or subscription, while the Community Edition is an AGPL-3.0 desktop app with no admin backend. Forking into a proprietary product is therefore a licensing conversation, not a technical one. The codebase is mid-refactor, with a `v2-refactor-temp/docs/breaking-changes` directory in the tree and a published breaking-changes process, which means extension points may move between releases. Many of the most interesting features on the roadmap, deep research, OCR, TTS, ASR, notes and the MCP marketplace, are not finished, so the README describes intent as much as capability. Electron also means a Chromium process and a meaningful resident memory footprint compared with a native client.

## Relation to the Arsenal

This is the desktop-client entry in content/projects/frameworks, and its role in the catalog is a human surface rather than a library, so read it beside the other provider-aggregating clients rather than beside orchestration frameworks. The natural comparison is the self-hosted web clients in content/projects/frameworks and content/tools/data-ingestion if you are deciding desktop versus server. Everything it calls sits elsewhere in the catalog: hosted models are in content/projects/foundation-models, local runtimes in content/projects/inference-engines, and the MCP servers it can host or call are the extension surface shared with the coding agents in content/tools/dx-and-tooling. Nothing here replaces content/projects/agent-systems; it is where you would go to talk to one instead.

## Resources

- [GitHub — CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio)
- [Official site — cherry-ai.com](https://cherry-ai.com)
- [Development setup and profile isolation docs](https://github.com/CherryHQ/cherry-studio/blob/main/docs/contrib/development.md)

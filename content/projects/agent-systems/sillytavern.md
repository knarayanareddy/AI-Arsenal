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
org_or_maintainer: SillyTavern
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 340
trending_score: 57
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: sillytavern
name: SillyTavern
artifact_type: platform
category: tooling
subcategory: platforms
description: Self-hosted, extensible chat frontend for local and hosted LLMs, focused on character personas, long conversations, and power-user control over prompts
github_url: https://github.com/SillyTavern/SillyTavern
license: AGPL-3.0
primary_language: Other
tags:
  - llm
  - local
  - self-hosted
  - memory
  - tool-use
  - community-favorite
maturity: production
cost_model: open-source
github_stars: 30923
last_commit: '2026-07-11'
docs_url: https://docs.sillytavern.app
phase: agent-system
domain:
  - language
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A locally hosted conversation frontend that manages personas, prompt assembly, context budgeting, and connections to many local or hosted model backends.
best_for:
  - You want a self-hosted, provider-agnostic chat UI with fine-grained control over system prompts, sampling parameters, and context assembly.
  - You run local models (via KoboldCpp, Ollama, text-generation-webui, or an OpenAI-compatible endpoint) and want character/persona management and extensions.
avoid_if:
  - You need a governed, multi-tenant enterprise assistant with SSO and audit controls rather than a single-user power tool.
  - You want an opinionated, minimal chat box; SillyTavern exposes many knobs that are unnecessary for simple use.
enrichment_notes: Official repository, AGPL-3.0 license, and 2026-07-11 activity were reviewed on 2026-07-12. Suitability beyond single-user/local use remains draft.
---

## Overview

SillyTavern is a browser-based frontend, served from a local Node.js process, for chatting with LLMs. Its distinguishing feature is explicit control over the prompt: character cards, world/lore books, author's notes, and instruct templates are composed into the context window under user-defined rules, and it connects to local runtimes or OpenAI-compatible APIs.

## Why it's in the Arsenal

It is a widely used reference for the client side of local LLM workflows. The engineering interest is in how it does context budgeting, prompt templating, and backend abstraction across many inference servers—problems every conversational application faces once context windows fill up.

## Architecture

A Node.js server hosts a single-page web UI and proxies requests to a configured backend (KoboldCpp, Ollama, text-generation-webui, or a hosted API). Prompt construction is template-driven: persona, chat history, lore-book entries matched by keyword, and instruct formatting are concatenated with token-budget trimming. Extensions run client-side and can add features such as vector-based retrieval of past turns and text-to-speech.

## Ecosystem Position

SillyTavern competes with other local chat frontends (Open WebUI, LM Studio's chat) and complements inference servers rather than replacing them. Compared to hosted assistant UIs it trades polish for control and privacy; compared to a minimal chat client it offers far richer prompt and memory management. The choice hinges on how much manual prompt control you need versus turnkey simplicity.

## Getting Started

Clone and run the Node.js server locally, connect one backend (for example an Ollama or OpenAI-compatible endpoint), import a character card, and send a message. Then inspect the assembled prompt in the UI to confirm how history, persona, and lore entries consume the token budget before enabling extensions.

## Key Use Cases

- Single-user, privacy-preserving chat over local models.
- Prototyping persona/system-prompt and lore-book strategies before porting them into an application.
- A testbed for comparing local inference backends behind one UI.

## Strengths

- Deep, transparent control over prompt assembly and sampling.
- Backend-agnostic: works across many local and hosted inference servers.
- Large community, active maintenance, and an extension ecosystem.

## Limitations

- Designed for single-user local use; it lacks enterprise auth, multi-tenant isolation, and audit logging.
- The abundance of settings has a steep learning curve and can produce inconsistent prompts if misconfigured.
- AGPL-3.0 licensing has network-copyleft implications for hosted derivatives.

## Relation to the Arsenal

SillyTavern is the client-side counterpart to the local inference engines and quantization tooling in the catalog. Treat its prompt-assembly and lore-book mechanics as a case study for context-window management rather than as a production application shell.

## Resources

- [Official source](https://github.com/SillyTavern/SillyTavern)
- [Documentation](https://docs.sillytavern.app)

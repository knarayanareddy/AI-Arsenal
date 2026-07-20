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
org_or_maintainer: TanStack
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 21
trending_score: 32
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: tanstack-ai
name: TanStack AI
artifact_type: framework
category: agents
subcategory: frameworks
description: Type-safe provider-agnostic TypeScript SDK for streaming chat, tool calling, agents, and multimodal apps
github_url: https://github.com/TanStack/ai
license: MIT
primary_language: TypeScript
tags:
  - agents
  - orchestration
  - streaming
  - structured-output
  - multimodal
  - tool-use
maturity: beta
cost_model: open-source
github_stars: 2902
last_commit: '2026-07-20'
docs_url: https://github.com/TanStack/ai
phase: framework
domain:
  - language
  - multimodal
  - general-purpose
relation_to_stack:
  - build-on-top
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A TypeScript AI application layer that normalizes streaming, tool calls, provider adapters, UI integrations, and agent/harness sessions.
best_for:
  - You are building a TypeScript application and want provider-neutral typed chat/tool contracts across frontend frameworks.
  - You need to experiment with resumable sessions, structured output, and agent-harness adapters behind one application surface.
avoid_if:
  - You need a server-side agent runtime with execution policy rather than an application SDK.
  - You cannot own provider-specific streaming, tool, auth, and sandbox compatibility tests.
enrichment_notes: Official repository, MIT license, TypeScript scope, and active July 2026 adapter/sandbox work were reviewed on 2026-07-12. API stability and provider parity remain draft.
---

## Overview

TanStack AI is a TypeScript SDK for streaming chat, tool calling, agents, and multimodal applications. It aims to keep application code provider-agnostic while supporting UI frameworks and, increasingly, adapters that drive existing coding-agent harnesses rather than reimplementing their loops.

## Why it's in the Arsenal

The useful boundary is between a web/application team and the model/provider differences underneath. TanStack AI can reduce UI and stream-protocol glue, but it does not make a tool call safe or make two providers semantically equivalent. The repository is especially interesting as it adds harness and sandbox adapters that connect an application SDK to locally executing agents.

## Architecture

The core engine defines typed messages, streaming events, model/provider adapters, tools, structured output, and middleware. Separate adapters can bridge coding harnesses such as Claude Code, Codex, Gemini CLI, or OpenCode; in that mode the harness owns local tools and emits already-resolved tool events, while TanStack translates the session into application events. Sandbox packages add provider-agnostic contracts and local-process behavior, but local-process is not isolation by itself. These distinctions must remain visible in permissions and logs.

## Ecosystem Position

TanStack AI sits in the application framework layer above model APIs and agent harnesses. It overlaps with TypeScript AI SDKs and UI-oriented orchestration libraries, while its TanStack ecosystem and adapter approach are the differentiators. Compare it on type contracts, streaming semantics, session resume, tool bridging, and provider parity rather than on the number of UI integrations alone.

## Getting Started

Start with one provider and a read-only server tool. Test streamed text, tool-call/result ordering, abort behavior, structured output, and error translation. Then add a second provider or harness adapter and compare the exact event contract. Keep sandbox and permission modes explicit; do not treat the local-process adapter as a security boundary.

## Key Use Cases

- Type-safe TypeScript chat and tool-call applications across several UI frameworks.
- Provider and harness comparison with resumable sessions and structured output.
- Streaming application timelines that need to display tool activity without re-executing harness-owned tools.

## Strengths

- Typed application contracts cover streaming, tools, providers, UI, and session state.
- MIT licensing and active development make it approachable for TypeScript teams to extend.

## Limitations

- Provider-neutral types cannot erase differences in tool semantics, auth, rate limits, or error behavior.
- Harness adapters inherit the security and update surface of the local agent they drive.
- Sandbox capabilities vary by provider; a local-process implementation may only provide path containment, not OS isolation.

## Relation to the Arsenal

TanStack AI is a framework for application integration, not a secure agent runtime or inference server. Pair it with provider contract tests, explicit tool authorization, sandboxing, and event-level observability.

## Resources

- [Official source](https://github.com/TanStack/ai)

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
org_or_maintainer: CopilotKit
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 223
trending_score: 48
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: copilotkit
name: CopilotKit
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: React/TypeScript frontend framework for building in-app copilots, agent chat, and generative UI, and the reference implementation of the AG-UI protocol
github_url: https://github.com/CopilotKit/CopilotKit
license: MIT
primary_language: TypeScript
tags:
  - agents
  - tool-use
  - streaming
  - structured-output
  - orchestration
  - llm
maturity: beta
cost_model: open-source
github_stars: 36169
last_commit: '2026-07-20'
docs_url: https://docs.copilotkit.ai
phase: framework
domain:
  - language
  - general-purpose
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - community-driven
  - org-backed
ecosystem_role:
  - A frontend/UI layer that renders agent state, streams tokens, and lets an agent read and act on application context through typed React hooks.
best_for:
  - You are adding an in-app assistant or generative-UI surface to a React or Next.js application and want the agent to see page state and call frontend actions.
  - You want a standard client protocol (AG-UI) between your UI and a LangGraph, CrewAI, or custom agent backend rather than hand-rolling a websocket contract.
avoid_if:
  - You need a backend agent runtime; CopilotKit is the presentation and interaction layer, not the planner or tool executor.
  - Your product is not React/JS-based, or you require a fully self-contained no-JS assistant.
enrichment_notes: Official repository, MIT license, and same-day 2026-07-12 activity were reviewed on 2026-07-12. Production fit and protocol stability remain draft pending hands-on integration testing.
---

## Overview

CopilotKit provides React hooks and components—`useCopilotAction`, `useCopilotReadable`, chat and sidebar widgets—that connect a web UI to an agent backend. It handles token streaming, human-in-the-loop confirmations, and exposing frontend functions as tools the model can call, so the application layer, not the prompt, decides what the agent may touch.

## Why it's in the Arsenal

Most agent frameworks stop at the orchestration boundary and leave the frontend as an exercise. CopilotKit is worth cataloguing because the UI is where agent state becomes legible to users: streaming, interruptions, approvals, and reading live application context are recurring engineering problems it addresses directly.

## Architecture

The library splits into a React SDK and a runtime endpoint. The SDK publishes readable context and callable actions from the browser; the runtime brokers requests to an LLM provider or an agent graph (LangGraph, CrewAI) and streams events back over the AG-UI protocol. Tool calls resolve either in the frontend (a typed action) or in the backend agent, and the render layer subscribes to intermediate state for progressive UI updates.

## Ecosystem Position

CopilotKit sits above agent runtimes and alongside vendor assistant SDKs, rather than competing with planners like LangGraph. Compared to building a bespoke chat transport, it offers a documented event protocol and typed action model; compared to closed assistant widgets, it keeps the UI and tool surface in your codebase. The comparison should weigh AG-UI lock-in against the cost of a hand-written streaming contract.

## Getting Started

Install the React SDK, mount the provider and a chat component, expose one readable value with `useCopilotReadable`, and register a single `useCopilotAction`. Point the runtime at an OpenAI-compatible provider or a LangGraph endpoint, then verify streaming, an action round-trip, and a human-approval interrupt before wiring real application state.

## Key Use Cases

- In-app copilots that read page/application state and take scoped frontend actions.
- Generative-UI surfaces where the model renders or updates components mid-stream.
- A typed client layer in front of a LangGraph or CrewAI agent backend.

## Strengths

- Typed action and readable-context model keeps tool exposure in application code, not prompts.
- First-party AG-UI protocol and adapters for common agent runtimes.
- Active development and MIT licensing make the UI layer inspectable and forkable.

## Limitations

- It is a frontend layer: without a capable agent backend it does little on its own, and backend security still governs what actions can do.
- Adopting AG-UI couples your client to CopilotKit's event contract and release cadence.
- Generative-UI patterns can leak backend state into the browser if readable context is not scoped carefully.

## Relation to the Arsenal

CopilotKit is the presentation counterpart to the agent frameworks and MCP tooling catalogued elsewhere. Pair it with server-side argument validation and least-privilege tool policy so a compromised or confused frontend action cannot exceed its intended authority.

## Resources

- [Official source](https://github.com/CopilotKit/CopilotKit)
- [Documentation](https://docs.copilotkit.ai)

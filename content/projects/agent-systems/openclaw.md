---
id: openclaw
name: "OpenClaw"
version_tracked: null
artifact_type: platform
category: agents
subcategory: autonomous
description: "Self-hosted personal AI agent that runs on your own hardware and reaches you through messaging channels you already use"
github_url: "https://github.com/openclaw/openclaw"
license: "MIT"
primary_language: TypeScript
org_or_maintainer: "OpenClaw Foundation"
tags: [agents, memory, tool-use, self-hosted]
maturity: beta
cost_model: self-hostable
github_stars: 388702
github_stars_last_30d: 0
trending_score: 97
last_commit: "2026-09-03"
docs_url: "https://github.com/openclaw/openclaw#readme"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [community-driven, actively-maintained]
ecosystem_role:
  - "The reference shape for a self-hosted always-on personal agent: a long-lived Node process holding conversation state on local disk, fronted by channel adapters, with capabilities added as loadable skills rather than baked-in features."
best_for:
  - "You want one persistent agent that answers on WhatsApp, Telegram, Slack, Discord, and Signal from a single process on hardware you own, with conversation history and credentials never leaving that machine"
  - "You are building a personal-assistant product and want a working reference for the channel-adapter plus skill-registry split before committing to your own process model"
avoid_if:
  - "You need per-tenant isolation and an audited permission boundary — a single personal agent holding messaging credentials and shell access is a blast radius, not a multi-tenant service"
  - "Your workload is bounded request/response automation rather than an open-ended assistant, where a scheduled job or a scoped agent framework costs far less to reason about"
upstream_dependencies: []
downstream_consumers: []
alternatives: [anythingllm, librechat, khoj]
integrates_with: [mem0, ollama]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Stars (388,702), forks (81,624), primary language (TypeScript), and last commit (2026-09-03) verified via the GitHub API on 2026-09-03. The API reports licence NOASSERTION; the repository's LICENSE file states MIT, copyright OpenClaw Foundation, and that is what is recorded here. Architecture and channel claims are from the README and topic list, not hands-on verification."
added_date: "2026-09-03"
last_reviewed: "2026-09-03"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/openclaw/openclaw", "date": "2026-09-03", "description": "388,702 stars and 81,624 forks on GitHub as of 2026-09-03 (GitHub API)"}]
featured: true
status: active
---

## Overview

OpenClaw is a self-hosted personal AI assistant written in TypeScript that runs as a long-lived process on hardware the operator controls. Its distinguishing design choice is the boundary it draws between the agent core and the surfaces it speaks through: channel adapters translate inbound messages from messaging platforms into a common turn representation, the core reasons over accumulated state, and a skill registry supplies capabilities that are discovered and loaded at runtime instead of being compiled into the binary. The repository carries the `own-your-data` and `personal` topics alongside `crustacean` and `molty`, and reached roughly 388,700 stars within ten months of its 2025-11-24 creation.

## Why it's in the Arsenal

It is the clearest public example of a category the catalogue otherwise under-documents: the always-on personal agent, as opposed to the session-scoped coding agent or the request-scoped RAG service. Every other agent-system entry here assumes you invoke it and collect a result. OpenClaw assumes the process never stops, which moves the engineering weight onto state persistence, credential handling, and message-channel backpressure — a different problem set from the frameworks in [Frameworks](../frameworks/_index.md), and one worth having a named reference implementation for.

## Architecture

The runtime is a Node.js process exposing an event loop over channel adapters, one per messaging surface, each normalising delivery receipts, threading, and rate limits into a shared turn abstraction. Conversation state is persisted locally, which is what makes the `own-your-data` claim structural rather than a privacy policy. Capabilities arrive through a community-contributed skill registry: a skill declares the tools it exposes and the triggers that should route to it, so adding a capability does not require patching the core. Model access is provider-agnostic, which in practice means it is commonly pointed at a local runtime such as Ollama or at a hosted API behind an abstraction that keeps the key in the operator's environment rather than in the agent's code.

## Ecosystem Position

It sits alongside self-hosted chat surfaces like [AnythingLLM](./anythingllm.md), [LibreChat](./librechat.md), and [Khoj](./khoj.md) rather than competing with them directly: those are primarily interfaces a human opens, while OpenClaw is a process that initiates and persists across channels. The nearest structural comparison is [Goose](../../tools/dx-and-tooling/goose.md), which shares the extension-registry idea but targets a developer's terminal session instead of a messaging surface. Its skill registry complements memory layers such as [Mem0](../../tools/orchestration/mem0.md), which can supply recall without the agent owning a persistence design. It is not a multi-agent orchestration framework — there is no graph runtime or crew abstraction to compare against [LangGraph](../frameworks/langgraph.md).

## Getting Started

```bash
git clone https://github.com/openclaw/openclaw
cd openclaw
npm install
cp .env.example .env   # set model provider credentials and channel tokens
npm run dev            # starts the long-lived agent process
```

Channel adapters are configured individually, so a first deployment normally enables one surface before the rest.

## Key Use Cases

1. **Personal assistant on owned infrastructure** — one process reachable from several messaging apps, with transcripts and credentials staying on the host.
2. **Reference implementation study** — reading the adapter/skill split before designing your own channel-facing agent process.
3. **Household or small-team automation** — scheduled and triggered tasks that need conversational context to survive restarts.

## Strengths

- The channel-adapter abstraction is the genuinely reusable idea: inbound surfaces are isolated behind one turn type, so a new messenger does not touch the reasoning core.
- Runtime-loaded skills keep the binary small and let capability growth happen outside the core release cycle.
- Local-first state means the deployment story is a single process plus a disk, with no managed database in the critical path.

## Limitations

- A single process holding messaging credentials, local file access, and tool execution has one security boundary. There is no per-tenant model, so this is an operator's machine, not a shared service.
- The skill registry is community-supplied, which shifts supply-chain review onto the operator; a malicious skill executes with the agent's privileges.
- Very high star velocity on a young repository means the process model and configuration surface are still moving, so upgrade paths between releases are not yet a settled contract.

## Relation to the Arsenal

Catalogued as an agent-system because it is something you deploy and keep running, not a library you import. For the library side of the same problem, see [Frameworks](../frameworks/_index.md); for browser automation that an agent like this might call, see [Browser Use](./browser-use.md).

## Resources

- [GitHub](https://github.com/openclaw/openclaw)
- [README and deployment notes](https://github.com/openclaw/openclaw#readme)

---
*Verified 2026-09-03 against the GitHub API by @maintainer — enrichment_status: draft. 388,702 stars, 81,624 forks, TypeScript, last commit 2026-09-03. Licence recorded as MIT from the repository LICENSE file, which the GitHub API reports as NOASSERTION.*

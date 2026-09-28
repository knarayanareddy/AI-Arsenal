---
id: letta
name: Letta
type: tool
job: [memory-management]
description: "Stateful agent runtime that gives agents persistent memory and identity, distributed today as a letta-code CLI, App Server and SDK"
url: "https://github.com/letta-ai/letta"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [self-hosted, agents]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/letta-ai/letta"
docs_url: "https://docs.letta.com"
github_url: "https://github.com/letta-ai/letta"
alternatives: [mem0, redis-memory, zep]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, research]
best_when: ["You are building an assistant that should remember a user across weeks of conversations and you are tired of resending history into a context window every session.", "You want a local or self-hosted agent server and you need a terminal UI plus an HTTP App Server to run agents against on your own machine.", "You are wiring an agent into a TypeScript application and you want a documented SDK rather than hand-rolling a memory store around a chat model."]
avoid_when: ["You want the classic MemGPT Python server, because the README says that V1 API server is retired onto an archive branch and active projects should use the current letta-code source.", "Your agents are stateless request-response completions, because the memory server adds a datastore, an identity model and an agent lifecycle you would not otherwise operate.", "You are adding a self-hostable platform and want us to own the infra, because the hosted path is Letta Cloud, a separate service with its own terms."]
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
enrichment_status: draft
---

## Overview

Letta, formerly MemGPT, builds stateful agents with memory that persists and improves over time. Its repository has been reorganised: the current source lives in letta-ai/letta-code and contains the agent harness, an interactive terminal UI, an App Server, channels, and the runtime behind the desktop and web apps, while the original repository retains an archive branch holding the retired V1 API server. Delivery is a global npm install of @letta-ai/letta-code, which gives you a `letta` terminal UI and a `letta server` command for local or self-hosted agents. Beyond that there is a desktop app for macOS, Windows and Linux, a browser client, Slack, Telegram, Discord and custom channel integrations, a TypeScript Agent SDK, and Letta Cloud for keeping agent memory and identity available across machines.

## Why It's in the Arsenal

The decision it addresses is where an agent's long-term memory lives. Prompt-window tricks like summarising old turns degrade information and still cost tokens on every call, whereas Letta makes memory a first-class server-side store the agent reads and writes, with identity as a persistent concept rather than a per-session string. That is what lets a single agent keep a coherent relationship with a user over months, and it is why the project ships channels, a desktop app and a cloud sync rather than just a library. The cost is a service dependency: your agent now needs a reachable memory backend and a defined lifecycle.

## Key Features

- Memory and identity are server-side primitives rather than prompt engineering, which is the substantive difference from most chat wrappers.
- A genuinely multi-channel runtime: terminal, desktop, browser, Slack, Telegram, Discord and custom channels against one agent.
- Self-hostable App Server with a programmatic TypeScript SDK, so the deployment and the integration are both first-party.
- Apache-2.0 licensed, with the historical V1 server preserved on an archive branch for reproducible older deployments.

## Architecture / How It Works

The current code is packaged as letta-code, an npm-distributed runtime that bundles the agent harness, the terminal UI, the App Server and the channel integrations. `letta` opens the interactive client and `letta server` starts the HTTP server that hosts agents for local or self-hosted use, which is the piece your applications talk to. A TypeScript Agent SDK provides the programmatic surface for embedding agents, and Letta Cloud adds a hosted store so memory, identity and conversation history survive moving between machines. The channel layer is the multiplexing point: Slack, Telegram, Discord and custom channels feed the same agent runtime, so a conversation started on one surface continues on another. The V1 Python API server still exists in tags and on the archive branch for reproducibility, which matters if you have pinned deployments built against it.

## Getting Started

Install the current runtime globally, then either open the terminal UI or start the server your applications will connect to:

```bash
npm install -g @letta-ai/letta-code
letta
```

```bash
letta server
```

You need a model provider or a local OpenAI-compatible endpoint configured before the first agent runs, which the docs cover under installation. The desktop app, chat.letta.com, the channel integrations and the TypeScript SDK are documented as alternative ways in.

## Use Cases

1. Long-lived personal or support agents: let an agent keep a user's preferences, history and identity across weeks of sessions instead of a fresh context each time.
2. Cross-surface continuity: reach the same agent from a terminal, the desktop app and a Slack or Telegram channel and have the conversation carry over.
3. Self-hosted agent backend: run `letta server` on your own infrastructure and point the TypeScript SDK at it so no agent state leaves your network.

## Strengths

Letta competes with the other agent-memory platforms in content/projects/agent-systems, notably Mem0, Memvid and Zep, and the difference is architectural: Letta is a full agent server with an identity and channel model, whereas Mem0 and Memvid are primarily memory components you embed in an agent you already run. It also overlaps with the agent frameworks in content/projects/framework, where LangGraph and CrewAI give you a graph or a crew but expect you to supply persistence yourself. Compared with a hosted assistant, the self-hosted App Server is the reason to pick it, and Letta Cloud is the paid path for anyone who wants the memory without running the server. It complements the serving entries in content/projects/serving-and-deployment rather than duplicating them, since Letta stores context rather than hosting model weights.

## Limitations / When NOT to Use

The repository is a redirect point in practice: the README directs all active work to letta-ai/letta-code, so the code in this repository is not where new features land, and pinning to it is pinning to a moving target. Anyone still on the V1 API server is on an archived branch with no further development, which is an upgrade project rather than a patch. Because the agent now depends on a running server and a memory store, local development means two processes and a datastore, and the cloud option is a separate commercial service with its own terms. The npm-distributed runtime also means your Python-based tooling cannot import it directly, so a Python shop either uses the HTTP server or accepts a JS dependency for the agent layer. The README is thin on operational detail such as backup, migration and multi-tenancy, all of which you must read in the external docs.

## Integration Patterns

This is the memory-and-state entry for content/projects/orchestration and the counterpart to the framework entries there: LangGraph and CrewAI define how agents run, while Letta defines what they remember between runs. Compare it against the memory-projects in content/projects/agent-systems such as mem0 and memvid when deciding between an embeddable memory component and a full agent server. Its model calls land on whatever backend you configure, so the inference entries in content/projects/inference-engines are the downstream half of the same deployment. If you need channels and cross-surface identity, this is the entry that covers them; if you need only tool-calling, a framework entry is lighter.

## Resources

- [GitHub — letta-ai/letta](https://github.com/letta-ai/letta)
- [Current source — letta-ai/letta-code](https://github.com/letta-ai/letta-code)
- [Documentation — docs.letta.com](https://docs.letta.com)

## Buzz & Reception

Moves agent memory out of the prompt window into a server-managed store, so an agent accumulates context across sessions instead of restarting blank.

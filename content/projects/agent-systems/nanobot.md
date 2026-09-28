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
org_or_maintainer: "HKUDS"
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
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: nanobot
name: "nanobot"
artifact_type: framework
category: agents
subcategory: autonomous
description: "Lightweight self-hosted Python agent runtime with WebUI, chat channels, MCP tools, memory and an OpenAI-compatible API in one small core"
github_url: "https://github.com/HKUDS/nanobot"
license: MIT
primary_language: Python
tags: [self-hosted, agents]
maturity: beta
cost_model: self-hostable
github_stars: 48647
last_commit: "2026-09-28"
docs_url: "https://nanobot.wiki"
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "community-driven"
  - "actively-maintained"
ecosystem_role:
  - "Lightweight Python chat-and-tools agent distributed as nanobot-ai"
  - "Approachable alternative to heavyweight agent orchestration platforms"
best_for: ["You want one personal agent reachable from Telegram, Discord, Slack, WeChat, Email and a browser at the same time, and you would rather run it yourself than rent a hosted assistant.", "You are building on top of a small agent core and want an OpenAI-compatible API surface plus MCP tool support without adopting a heavy framework.", "You need long-horizon scheduled goals and cron-driven automation running against a local or hosted model of your choosing."]
avoid_if: ["You need a battle-tested framework with a large ecosystem behind it, because nanobot's differentiator is a small readable core rather than a broad integration surface.", "You cannot operate a long-running service, because the runtime is designed to be deployed and left running across channels and web clients.", "Your accuracy depends on a very specific agent architecture, because the framework is a general runtime with delegation and tools rather than a typed state machine."]
enrichment_notes: "The README and metadata identify an actively developed lightweight project; integrations, model providers, and security posture should still be reviewed before production. Draft pending review."
---

## Overview

nanobot is described in the README as an ultra-lightweight, open-source, self-hosted personal AI agent framework written in Python, running in a browser WebUI, a terminal, or chat apps. Its feature set combines tools, long-term memory, MCP integrations, model routing, multi-agent delegation, scheduled automation, and an OpenAI-compatible API in a small, readable core. The channel list is broad: Telegram, Discord, Slack, WeChat, Email, Mattermost and Linear, alongside a WebUI and terminal. Tools named explicitly include files, shell, web search, web fetch, MCP, cron, image generation and subagents, and session history plus long-term memory are handled through a component called Dream. The documentation is organised by audience, with separate pages for getting started, configuration, architecture, development and deployment.

## Why it's in the Arsenal

The decision it addresses is whether a personal assistant has to be a subscription tied to one vendor's model. nanobot runs on your machine, talks to whatever model you point it at, and exposes the same agent over chat platforms you already use, so the assistant is present where you are rather than in a separate tab. The other recurring decision is tool integration: naming MCP alongside built-in shell, file, search and fetch means external systems attach through a protocol rather than a bespoke plugin each. The small readable core is the deliberate trade against frameworks that grow a large surface you have to learn.

## Architecture

A Python runtime hosts the agent loop and dispatches to tools: files, shell, web search, web fetch, MCP servers, cron, image generation and subagents for delegation. Model routing is a first-class concern rather than a hard-coded client, which is what lets the same runtime sit on a local model or a hosted API. Session history and long-term memory are managed through Dream, giving an agent continuity beyond a single conversation, and scheduled automation plus a cron tool let long-horizon goals run without a human present. Front ends are thin: a browser WebUI, a terminal, and channel adapters for Telegram, Discord, Slack, WeChat, Email, Mattermost and Linear, all speaking to the same runtime. An OpenAI-compatible API exposes the agent outward, so existing clients can drive it as if it were a model endpoint.

## Ecosystem Position

nanobot sits in the same personal-assistant space as Khoj and Open WebUI-style self-hosted assistants, and it competes with them on breadth of channels and tool surface rather than on retrieval quality. Where Khoj's differentiator is a personal document corpus with editor clients, nanobot's is a chat-first runtime that reaches you on the messaging apps you already use, plus model routing and delegation. It overlaps with the agent frameworks in content/projects/framework, but as a runnable runtime with a UI and channel connectors rather than a library you import into your own application, which is a closer cousin to the coding agents in content/projects/dx-and-tooling. Its MCP support means it consumes the tool servers that the content/projects/agent-systems entries expose, and it needs a model backend from content/projects/inference-engines to be useful.

## Getting Started

Clone the repository, create a virtual environment, install the package, and start the runtime, which brings up the WebUI and terminal surfaces:

```bash
git clone https://github.com/HKUDS/nanobot.git
cd nanobot
python3 -m venv .venv && source .venv/bin/activate
pip install -e .
nanobot
```

Configure a model provider before your first message; the repository's docs/configuration.md covers the provider keys, and docs/deployment.md covers running it as a long-lived service rather than a foreground process.

## Key Use Cases

1. Multi-channel personal assistant: reach the same agent from Telegram, Discord or Slack with the same tools and memory rather than a separate bot per platform.
2. Scheduled personal automation: define a long-horizon goal or cron-driven job that runs unattended and reports back into your chat surface.
3. Prototype an agent service: use the OpenAI-compatible API to point an existing client or tool at a self-hosted agent with MCP tools attached.

## Strengths

- Small, readable Python core that you can read end to end before committing, which is rare in agent frameworks.
 - Very broad channel coverage in one runtime, including WeChat, Mattermost and Linear alongside the usual Telegram and Discord.
- MCP alongside built-in tools, so external systems attach by protocol rather than a per-tool integration.
- MIT licensed, actively developed, and shipped with model routing so the same code works against local and hosted models.

## Limitations

The feature list is long and the project is young, so the honest reading is that breadth and depth trade against each other here: channels, tools, memory, delegation, automation and an API surface in a deliberately small core means each area is likely thinner than a focused project that does one of them. An OpenAI-compatible endpoint and chat-platform adapters add compatibility surfaces that drift, because each upstream messaging API and model provider changes. Self-hosting is a real operational commitment, since a service that must stay up to serve Telegram and Slack is not a laptop experiment. The documentation is organised and multi-lingual, which helps, but there is no published evidence in the README about reliability, load behaviour, or how Dream's long-term memory scales over months of sessions.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the self-hosted, channel-first personal agent, and it is the natural counterweight to the hosted assistants in the same phase. Read it against khoj in the same phase for document-corpus retrieval versus chat reach, and against the agent frameworks in content/projects/framework when you want to embed an agent in your own product instead of running one. Its MCP tools connect to whatever servers the content/projects/agent-systems entries publish, and it needs a model from content/projects/inference-engines, so those two phases are its dependencies. If your requirement is batch pipeline scheduling rather than an always-on assistant, the orchestration entries are the right place to look instead.

## Resources

- [GitHub — HKUDS/nanobot](https://github.com/HKUDS/nanobot)
- [Documentation site — nanobot.wiki](https://nanobot.wiki)
- [Configuration reference](https://github.com/HKUDS/nanobot/blob/main/docs/configuration.md)

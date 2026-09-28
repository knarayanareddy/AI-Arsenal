---
id: astrbot
name: AstrBot
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Python IM-platform bot framework that fronts many LLM providers, a plugin marketplace, MCP servers and a code sandbox behind chat adapters"
github_url: "https://github.com/AstrBotDevs/AstrBot"
license: AGPL-3.0
primary_language: Python
tags: [agents, security]
maturity: production
cost_model: open-source
github_stars: 41159
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://docs.astrbot.app/"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "One deployment speaks QQ, Telegram, Feishu, DingTalk, Slack, Discord and more, so the assistant lands where users already are."
best_for:
  - "You want an AI assistant that lives inside an instant-messaging platform your team or community already uses, rather than a separate web app to adopt."
  - "You run a community bot and you need an ecosystem of installable plugins for commands, group management and integrations instead of writing every handler yourself."
  - "You need to bridge an existing agent platform such as Dify or Coze into chat, plus local models via Ollama or LM Studio, behind the same adapter layer."
avoid_if:
  - "You need a rich graphical client, because AstrBot's primary surface is a chat adapter plus a WebUI, and the chat-first design cannot express a real editor or terminal."
  - "You are deploying in an environment where AGPL-3.0 terms are unacceptable, because the copyleft reaches any network-served modification you ship."
  - "You need deterministic latency on a large account base, because a very high open-issue count on a 41k-star repo signals the kind of churn that produces regressions under load."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (AGPL-3.0), last commit, primary language, topics and open-issue count came from the GitHub API. Adapter list, model and speech provider tables, plugin count and deploy paths are read from the official README; none of the platforms were connected during authoring."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

AstrBot is a Python 3.12+ bot platform whose core job is adapter fan-out: official adapters cover QQ via the OneBot v11 protocol, Telegram, WeCom and its AI bot variant, WeChat Official Accounts, Feishu/Lark, DingTalk, Slack, Discord, LINE, Satori, KOOK, Misskey, Mattermost and WhatsApp, with Matrix, Rocket.Chat and VoceChat supplied by community plugins. Above the adapters it layers LLM conversation across OpenAI-compatible services, Anthropic, Gemini, Moonshot, Zhipu, DeepSeek, Ollama and LM Studio, plus speech services for Whisper, SenseVoice, GPT-SoVITS, FishAudio, Edge TTS and several vendor TTS endpoints, and platform bridges to Dify, Alibaba Bailian and Coze. A sandbox isolates code and shell execution per session, and over a thousand plugins are available from the marketplace.

## Why it's in the Arsenal

The recurring engineering decision is where an assistant's front door lives. Teams that already run their work in Feishu or Telegram will not adopt another web app, so AstrBot makes the IM platform the primary interface and treats the LLM, the plugin system and the sandbox as replaceable backends. The cost is that you inherit chat-platform constraints: rate limits, message-size caps, group-mention semantics and platform review policies all shape what the agent can actually do.

## Architecture

An inbound message arrives on a platform adapter, is normalised into an internal event, and is dispatched by the plugin system to whichever handler claims it. Model calls go through a provider abstraction keyed on service type, with auto context compression trimming history when a conversation exceeds the window. Tool execution, including generated code and shell calls, is routed into the agent sandbox with session-level resource reuse rather than running in the bot process. Configuration, plugins and knowledge-base data live on disk, and the whole thing installs with uv, runs under Docker Compose, or deploys through BT-Panel, 1Panel or CasaOS.

## Ecosystem Position

AstrBot competes directly with NoneBot2, Koishi and LangBot in the Chinese IM-bot ecosystem, and with Rasa and Botpress in the general chatbot-platform space, but sits closer to the agent end because of its sandbox, MCP support and agent-loop tooling. It complements entries in content/projects/agent-systems by supplying reach rather than capability: an agent such as CrewAI or an MCP server has no chat surface of its own. Compared with content/projects/frameworks entries like LangGraph, AstrBot gives you adapters and a plugin marketplace instead of a programmable graph, and it consumes the LLM serving layer from content/projects/inference-engines if you self-host.

## Getting Started

The uv path is three commands; the Docker Compose path is the more production-ready option and is documented separately:

```bash
uv tool install astrbot --python 3.12
astrbot init   # first run only: creates the environment
astrbot run
```

Upgrade in place with `uv tool upgrade astrbot --python 3.12`, or deploy via Docker Compose following the docs.

## Key Use Cases

1. Community companion on QQ: run a persona bot with plugins for group management, commands and scheduled content, deployed as a long-lived service.
2. Enterprise internal assistant: put a documentation and knowledge-base agent behind Feishu or DingTalk so staff ask questions where they already work.
3. Front door for an existing platform: route chat traffic into Dify, Alibaba Bailian or Coze applications while keeping one adapter layer and one plugin system.

## Strengths

- The broadest adapter list in this category, with official QQ/OneBot, WeCom, Feishu, DingTalk, Slack and Discord support maintained in-tree.
- Over a thousand marketplace plugins, so most integrations need no code from you.
- A dedicated agent sandbox isolates generated code and shell calls and reuses resources per session.
- Multiple deployment shapes from a one-command uv install to Docker Compose, BT-Panel, 1Panel and CasaOS.

## Limitations

AGPL-3.0 is the first thing to settle if you intend to modify and serve it, and the license also constrains how plugins interact with a hosted variant. Chat platforms impose their own ceilings that no amount of framework work removes: message length limits, rate limits, and the need for platform review or bot registration that varies by region. Roughly 1,500 open issues against a 41k-star repository points at real churn, so plan for upgrade friction. The plugin marketplace is a supply-chain surface worth reviewing before installing third-party plugins, and STT/TTS coverage across Chinese vendor endpoints is uneven outside the platforms the maintainers use.

## Relation to the Arsenal

This entry is the IM-reach member of content/projects/agent-systems. It differs from the coding-agent entries in the same phase by owning conversation adapters instead of a repository; compare with QwenPaw and CowAgent, which also bridge chat channels but ship as general assistants with broader local-runtime support. For the model layer, entries in content/projects/inference-engines cover Ollama and vLLM; for plugin-and-workflow design, the frameworks phase holds the orchestration libraries. If you are after retrieval, the data-and-retrieval phase covers the vector and ingestion components a knowledge base would sit on.

## Resources

- [GitHub — AstrBotDevs/AstrBot](https://github.com/AstrBotDevs/AstrBot)
- [Documentation — docs.astrbot.app](https://docs.astrbot.app/)
- [Plugin marketplace and Docker image](https://hub.docker.com/r/soulter/astrbot)

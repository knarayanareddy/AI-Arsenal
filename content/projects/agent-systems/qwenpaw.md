---
id: qwenpaw
name: QwenPaw
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "AgentScope-based personal assistant with three-layer memory, kernel sandboxing, sub-agents and channels from DingTalk to Discord"
github_url: "https://github.com/agentscope-ai/QwenPaw"
license: Apache-2.0
primary_language: TypeScript
tags: [agents, memory, security, voice]
maturity: production
cost_model: open-source
github_stars: 35321
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://qwenpaw.agentscope.io/"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Combines a self-evolving Markdown memory layer with real OS-level sandboxing and a broad IM channel set in one deployable assistant."
best_for:
  - "You want a personal assistant you can reach over DingTalk, Lark, WeChat, Discord, Telegram, iMessage or QQ from one instance rather than one bot per platform."
  - "You need memory that stays readable and editable, because conversations and resources become Markdown you can read, search and correct."
  - "You need it to work without an API key for basic use, because the bundled QwenPaw Local runtime ships 2B, 4B and 9B QwenPaw-Flash models trained for agent tasks."
avoid_if:
  - "You are on Python 3.10 or 3.14+, because the supported range is 3.11 up to but not including 3.14."
  - "You want a minimal install, because this is a full agent OS with sandboxing, plugin marketplaces, sub-agents, scheduled tasks and multiple frontends."
  - "You object to first-run telemetry, because an anonymous usage ping is sent once per version and is auto-accepted when you run init with defaults."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (Apache-2.0), last commit, primary language, topics and issue count came from the GitHub API. Feature pillars, channel list, memory layers, guard components, Python version range, telemetry scope and local model sizes are read from the official README and release notes; the assistant was not installed."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

QwenPaw is an AgentScope 2.0 rewrite that describes itself as an Agent OS. Each agent has three pillars: Resources (transparent on disk), Governance (allow, deny, ask, sandbox) and a Sandbox (macOS, Linux, Windows). Memory is three-layered (live working context, full verbatim history, and a self-evolving personal knowledge base powered by the ReMe project), with conversations and resources continuously becoming readable, editable, searchable and linked Markdown. Safety is layered too: kernel-level sandbox, Tool Guard, File Guard, Skill Scanner and Access Policy, with dangerous commands blocked before execution. It supports sub-agents with their own memory and skills, Agent Communication Protocol for cross-system orchestration, a plugin marketplace, MCP, scheduled tasks, a file workspace with diffs, and QwenPaw-Flash local models alongside 14+ cloud providers.

## Why it's in the Arsenal

The recurring problem in personal assistants is that memory becomes a blob you cannot inspect, and that tools run with your full privileges because that is the path of least resistance. QwenPaw addresses both directly: memory is Markdown you can correct, and Governance plus Sandbox are structural per-agent settings rather than a global toggle. The cost is size: this is an operating-system-shaped assistant with a marketplace, channels, sub-agents and multiple frontends, which is more to run and secure than a focused tool, and the local models are small enough that some tasks will be better served by a cloud provider.

## Architecture

AgentScope 2.0 provides the runtime; QwenPaw layers an Agent OS on top in which each agent owns a Resources directory on disk, a Governance policy set with allow/deny/ask/sandbox outcomes, and a platform sandbox. Requests pass Tool Guard, File Guard, a Skill Scanner and an Access Policy before execution, so a dangerous command is blocked rather than logged after the fact. Memory writes flow into three layers (working context, verbatim history, and a ReMe-backed knowledge base) as Markdown that stays linked and searchable. Sub-agents run with independent memory and skills, coordinated through the Agent Communication Protocol, and frontends (Console, TUI, desktop app) plus IM channels all talk to the same instance.

## Ecosystem Position

QwenPaw competes with OpenClaw, Coze and Dify in the personal-assistant and bot-platform category, and with AstrBot in the IM-reach category, but its differentiator is the combination of an editable Markdown memory layer and kernel-level sandboxing. Compared with content/projects/frameworks entries such as AgentScope itself or LangChain, it is an application built on the framework rather than the framework. Its memory layer overlaps with the agent-memory entries in content/projects/data-and-retrieval, and the ReMe project it depends on is the more composable option if you want memory without the assistant. Local inference is optional and small-model, so for serious reasoning you would pair it with content/projects/inference-engines.

## Getting Started

Python 3.11 to 3.13, then install from PyPI and run the guided initialisation:

```bash
pip install qwenpaw
qwenpaw init
```

The init flow configures a provider (or the bundled local runtime), lets you opt in or out of telemetry, and writes the workspace. Docker and desktop builds are also published.

## Key Use Cases

1. One assistant, many channels: run a single instance and reach it from DingTalk, Lark, WeChat, Discord, Telegram, iMessage or QQ without maintaining separate bots.
2. Inspectable personal knowledge base: let conversations and resources accumulate into linked Markdown you can read, edit and correct, rather than trusting an opaque store.
3. Governed automation: give an agent scheduled tasks and tools inside a sandbox with allow/deny/ask policies, so risky commands are blocked rather than merely discouraged.

## Strengths

- Three-layer memory producing readable, editable, linked Markdown, which makes the assistant's beliefs auditable.
- Real governance stack (Tool Guard, File Guard, Skill Scanner, Access Policy) plus per-agent sandboxing across all three major platforms.
- Works with no API key via bundled QwenPaw-Flash local models, and with 14+ cloud providers when you want more capability.
- Very broad channel coverage from one instance, including Chinese platforms most Western assistants do not support.

## Limitations

The Python floor is 3.11 and the ceiling is just below 3.14, which is an unusual combination that will occasionally conflict with other tooling in an existing environment. Telemetry is collected once per version and auto-accepted under init --defaults, so unattended provisioning sends data without an interactive prompt. The scope is very large for a single product: marketplace, channels, sub-agents, scheduling, sandbox, memory, multiple frontends, and a Hub variant for multi-user self-hosting, each a place for bugs, and the repository carries close to a thousand open issues. The local models are 2B to 9B, which will visibly limit quality on demanding tasks, so cloud fallback is effectively required for serious work. README weight is heavy and English documentation lags the Chinese one.

## Relation to the Arsenal

This is the most platform-complete personal assistant in content/projects/agent-systems, sitting alongside CowAgent, OpenClaw and gini-agent, which share the shape but differ in emphasis: CowAgent leads on memory distillation, gini-agent on runtime-as-gateway and remote approvals, QwenPaw on channel breadth and sandbox governance. Its foundations sit on AgentScope, so for a composable framework rather than a product the frameworks phase is the layer to build on. Its memory approach is the counterpart to the agent-memory entries in content/projects/data-and-retrieval, and if you want local inference under it, the Qwen models and local runtime connect to content/projects/foundation-models and content/projects/inference-engines respectively.

## Resources

- [GitHub — agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [Documentation — qwenpaw.agentscope.io](https://qwenpaw.agentscope.io/)
- [PyPI — qwenpaw](https://pypi.org/project/qwenpaw/)

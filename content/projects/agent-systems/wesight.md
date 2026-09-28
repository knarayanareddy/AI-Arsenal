---
id: wesight
name: wesight
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Electron control console for local coding agents, with one-click setup, model routing, IM channels and per-task runtime metrics"
github_url: "https://github.com/freestylefly/wesight"
license: MIT
primary_language: TypeScript
tags: [agents, observability, routing]
maturity: beta
cost_model: open-source
github_stars: 931
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-19"
docs_url: "https://wesight.ai/"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Puts agent install, model routing, permissions, file diffs, channel delivery and token metrics in one desktop surface."
best_for:
  - "You use several local coding agents and you want one place to install or reuse them instead of managing each CLI separately."
  - "You want per-task cost visibility with engine, model, token usage, TTFT, TPS, tool latency, steps and duration in one dashboard."
  - "You want agent tasks pushed to IM channels such as Feishu with per-engine configuration, and you would rather not build that bridge."
avoid_if:
  - "You are on Linux, because public releases are signed macOS builds for Apple Silicon and Intel plus a Windows x64 installer."
  - "You need a server-side or headless deployment, because WeSight is an Electron desktop application that supervises local agent processes."
  - "You are comfortable with terminal-only tooling and do not want a GUI, because the value here is the visualisation, not the agent capability."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (MIT), last commit, primary language, topics and issue count came from the GitHub API. Supported agent list, telemetry fields, channel support, platform coverage and install steps are read from the official README; the app was not run."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

WeSight is an Electron and React desktop application that acts as a control console for the coding agents already on your machine. It installs or detects Claude Code, Codex, Kimi Code, OpenClaw, Hermes Agent, OpenCode, Qwen Code, DeepSeek-TUI and its own built-in runtime, then exposes a Cowork chat surface with tool panels, slash commands, file diffs and permission prompts. Beyond chat it adds engine and model configuration per agent, IM channel delivery (Feishu and others) with per-engine settings, a runtime dashboard tracking engine, model, token usage, TTFT, TPS, tool latency, steps, status and duration, a unified file workspace, SkillHub skills, scheduled tasks, memory, and a desktop companion. Releases are signed and notarized on macOS.

## Why it's in the Arsenal

The recurring problem is that a coding agent's operating parameters live in half a dozen places: install in one, model routing in another, permissions in a config file, cost nowhere at all. WeSight's contribution is the aggregation layer with measurement: the same dashboard that shows you which engine ran a task also shows what it cost and how long each tool call took, which is the data you need to decide whether the agent is worth keeping. The cost is that it is another Electron process in your stack and it supervises rather than replaces the agents.

## Architecture

The Electron main process manages installed agent binaries and spawns them as child processes, streaming their output into the renderer. The Cowork chat surface renders tool calls and diffs and mediates permission prompts before an action executes. Engine configuration maps each detected agent to a provider and model, and IM channels are bridged per engine so a task can be dispatched and results delivered to Feishu. The runtime dashboard is fed by per-run telemetry (engine, model, tokens, TTFT, TPS, tool latency, step count, status, duration) emitted by those processes. A file workspace, skill system from SkillHub, scheduler and memory layer sit alongside the chat surface.

## Ecosystem Position

WeSight overlaps with AionUi, which is also an Electron supervisor for CLI coding agents, and with WeSight's own list of hosts. Where AionUi's emphasis is document assistants plus a broad adapter surface, WeSight's is metrics and model routing, so the two are genuine alternatives rather than duplicates. Compared with content/projects/frameworks entries such as LangGraph, it is a desktop product rather than a library, and compared with the terminal coding agents in content/projects/agent-systems it wraps rather than competes: it gains value precisely when you run more than one. Model routing overlaps with the gateway entries in other phases, and local model serving connects to content/projects/inference-engines if you point an engine at Ollama.

## Getting Started

Download the signed macOS (Apple Silicon or Intel) or Windows x64 build from Releases and launch it:

```bash
# after installing the .dmg or running the Windows installer
wesight
# then: install or reuse Claude Code, Codex, OpenCode, Hermes Agent, etc. from the Agent Engines panel
```

Configure a provider and model per engine, then use the Cowork chat surface or connect an IM channel.

## Key Use Cases

1. One console for many agents: install, configure and switch between Claude Code, Codex, OpenCode and Hermes Agent without touching their own configs.
2. Cost and latency attribution: read token usage, TTFT, TPS and tool latency per task and decide which engine to use for which kind of work.
3. Channel-delivered agent work: send a task from Feishu with per-engine routing and get results back in the channel.

## Strengths

- Metric depth that most wrappers skip: TTFT, TPS, tool latency, steps and duration per task, not just token counts.
 - Installs or detects nine agents including Hermes, OpenClaw and DeepSeek-TUI, so it fits an existing heterogeneous setup.
- Unified file workspace with diffs and permission prompts in the chat surface rather than only in a terminal.
- Signed and notarized macOS builds plus a Windows installer, which is unusual for a young Electron project.

## Limitations

macOS and Windows only in the public releases, so there is no Linux path. Being an Electron supervisor means another process and another memory footprint between you and the agent, and it sees every prompt and every token your agents handle. Roughly 11 open issues on a 900-star project with frequent commits suggests active but thinly staffed development, and a roadmap is published rather than a stability record. SkillHub and scheduled tasks add dependency surfaces whose supply chain you have to consider. Built-in agent runtime coverage is a nice-to-have but not the strength here; the strength is supervision of agents you install yourself.

## Relation to the Arsenal

This is the metrics-and-routing desktop console in content/projects/agent-systems, and the closest sibling to AionUi in the same phase: both are Electron supervisors for CLI agents, and the difference is that WeSight invests in telemetry and per-engine model routing while AionUi invests in document assistants and adapter breadth. It also sits alongside WeSight's own host list (Hermes, OpenClaw, Codex, Claude Code), so it is complementary to those agents rather than a rival. The observability angle overlaps with the telemetry and tracing tooling in other phases, which is where you would go for production-grade metrics beyond a desktop dashboard; for model serving underneath it, content/projects/inference-engines.

## Resources

- [GitHub — freestylefly/wesight](https://github.com/freestylefly/wesight)
- [Project site — wesight.ai](https://wesight.ai/)
- [Releases — latest build](https://github.com/freestylefly/wesight/releases/latest)

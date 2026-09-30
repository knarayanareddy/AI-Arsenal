---
id: cline
name: "Cline"
type: tool
job: [prototyping]
description: "Apache-2.0 coding agent published simultaneously as a CLI, a Tauri desktop app, VS Code and JetBrains extensions and an embeddable Node SDK"
url: "https://cline.bot"
cost_model: open-source
pricing_detail: "Free extension; bring your own API key (or use its provider marketplace)"
tags: [agents, code-gen, tool-use, battle-tested]
maturity: production
stack: [typescript]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/cline/cline"
docs_url: "https://docs.cline.bot/"
github_url: "https://github.com/cline/cline"
alternatives: [continue-dev, claude-code, cursor]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when: ["You want an agent in whichever surface you happen to be in, because the same engine backs the CLI, the desktop app and the editor extensions rather than four independent implementations.", "You are putting an agent inside your own product and you want the programmatic API, custom tools, lifecycle hooks, connectors and multi-agent teams from a published SDK.", "You need unattended runs, because the CLI is fully headless with JSON output for piping, plus cron-style scheduled agents that survive restarts and chat entry points on Slack, Telegram, Discord, Google Chat, WhatsApp and Linear."]
avoid_when: ["You need a single narrow binary, because the repository is a monorepo spanning SDK, CLI, extension host, desktop app and docs, each with its own changelog and an in-progress migration of the VS Code extension..", "You want the JetBrains plugin source, because the README's index table states the JetBrains plugins are currently not open-sourced even though the plugin ships on the marketplace..", "You are on a network where per-request approval pauses are unacceptable, because every file edit and terminal command requires approval unless you explicitly toggle auto-approve."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (64,446), license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The leading open-source in-IDE agent; the plan/act split plus per-action approvals is a strong safety default"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/cline/cline", "date": "2026-07-08", "description": "64,446 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Cline is an open-source coding agent from Cline Bot Inc, Apache-2.0, that runs in your IDE, terminal and desktop. The README's product table is the architecture: an SDK in `sdk/` providing a Node.js programmatic agent API and extension exports, a CLI in `apps/cli/` with a terminal UI, headless mode and shell commands, the VS Code extension at the repo root which the table marks WIP migrating, a desktop app under `apps/examples/desktop-app/` built as a Tauri shell with a Bun sidecar and Next.js UI, and JetBrains-hosted clients that talk to the shared agent core but whose plugin source is not open. The agent behaviour it documents: it reads project structure and file relationships, watches linter and compiler output and fixes missing imports, type mismatches and syntax errors as it works, shows every edit as a reviewable diff in the editor surfaces, tracks changes with checkpoints for undo, and toggles between Plan mode (explore and propose) and Act mode (execute with approval). Provider support is broad: Anthropic, OpenAI, Google, OpenRouter, the Vercel AI Gateway, AWS Bedrock, Azure and Vertex, Cerebras and Groq, Ollama and LM Studio, and any OpenAI-compatible API.

## Why It's in the Arsenal

The problem it addresses is harness fragmentation. Teams accumulate a terminal agent, an editor extension and a scheduled job, and each has its own session model, its own provider config and its own notion of what the agent is allowed to do. Cline's bet is that the agent core should be a library with clients, so the approval model, the checkpoint history and the provider layer are identical everywhere. The second bet is that the agent should be embeddable, which is why the SDK is a first-class product rather than an afterthought. The cost is a monorepo with a live migration in it and a large surface where the JetBrains client is distributed but not open.

## Key Features

- One agent core across CLI, desktop, VS Code and JetBrains, so approval behaviour, checkpoints and provider config do not drift between surfaces.
- A published SDK with a plugin API, typed custom tools, lifecycle hooks, connectors and multi-agent teams, which is unusual for a coding agent.
- Provider coverage spans hosted gateways and local runtimes including Ollama, LM Studio and any OpenAI-compatible endpoint.
- Operational surfaces beyond chat: headless JSON mode for pipelines, cron schedules that survive restarts, and six chat platforms bridged to sessions.

## Architecture / How It Works

The agent core is shared: SDK, CLI, editor extension and desktop app all construct the same engine, which is why the README describes one behaviour set rather than four. Execution is a loop over model calls plus tool use, where tools cover reading and editing files, running shell commands and browsing, with checkpoints recorded for every change so an over-eager run is reversible. Plan and Act are modes on that loop rather than separate agents, and approval gates each edit and command in Act mode. Extension happens through two paths: a plugin system on the SDK, where `createTool` registers a typed tool with an input schema and an async execute, and MCP servers managed with `cline mcp` in the CLI. Orchestration above the single agent includes coordinator-driven multi-agent teams with persisted state, cron schedules via `cline schedule create --cron ... --workspace ...`, and chat bridges that map each conversation thread to an agent session.

## Getting Started

Install the CLI globally, or add the SDK to a Node project that will host the agent itself:

```bash
npm i -g cline
cline "Run tests and fix any failures"
git diff origin/main | cline "Review these changes for issues"
# embed the engine:
npm install @cline/sdk
```

Headless output is available as JSON with `cline --json "..."`, and editor clients install from the VS Marketplace or the JetBrains Marketplace.

## Use Cases

1. Agent inside your own product: import the SDK, register custom tools with `createTool`, and reuse the same engine that powers the shipped clients rather than writing a loop.
2. Review in CI: pipe a diff into the headless CLI and get a structured review, or run an unattended fix task that repairs a failing test in a pipeline.
3. Scheduled and chat-driven work: register a cron agent for weekday PR summaries, or reach the same session from Telegram, Slack or Discord with a per-thread context and access control.

## Strengths

Cline is the open-source counterpart to Claude Code in content/tools/dx-and-tooling, and the difference is ownership: you can fork this agent core, whereas the other one is a licensed product. It also competes with the provider-neutral terminal agents in content/projects/agent-systems, but Cline's distinguishing axis is the four-surface packaging plus the SDK, which no other entry in that phase offers. Against the frameworks in content/projects/frameworks it is the same relationship reversed: LangChain or CrewAI are libraries you call, and this is a shipped agent whose internals you can also call. It complements the MCP servers in content/tools/dx-and-tooling, which supply browser and DevTools capability to its tool loop, and it consumes whatever model endpoint you point it at, including a self-hosted one from content/projects/inference-engines.

## Limitations / When NOT to Use

The repository is in flux in a way you have to plan around. The index table marks the VS Code extension as WIP migrating, each product carries its own changelog so behaviour differs by surface, and the JetBrains plugin ships on the marketplace while its source is explicitly not open, which is the sharpest licence inconsistency in an Apache-2.0 repo. Being a monorepo across five products raises the maintenance and review cost for a team that only wants one of them. The approval model, while a genuine strength, is also friction by default: every edit and command pauses for you unless you toggle auto-approve, and MCP server management plus four clients is more surface to configure than a single-purpose CLI. Multi-agent teams and connectors are newer features and thinner on documentation than the core loop.

## Integration Patterns

This is the embeddable coding-agent tool in content/tools/dx-and-tooling and the entry to read when you are choosing between accepting a vendor's agent and running one you can extend. Its SDK is the natural counterpart to the programmatic frameworks in content/projects/frameworks, since it exports the same kind of agent API while also shipping clients, and its terminal CLI is the closest sibling of the provider-neutral agents in content/projects/agent-systems. The MCP servers and browser tooling in the same phase attach to its tool loop, and a local model it drives comes from content/projects/inference-engines. For the browser-automation question specifically, compare with the entries in content/projects/agent-systems, which own the browser rather than calling a DevTools server.

## Resources

- [GitHub — cline/cline](https://github.com/cline/cline)
- [Documentation — docs.cline.bot](https://docs.cline.bot/)
- [SDK overview and tool-registration API](https://docs.cline.bot/cline-sdk/overview)

## Buzz & Reception

One agent core across four surfaces, so the same session shape moves between terminal, editor and desktop without changing harness or provider.

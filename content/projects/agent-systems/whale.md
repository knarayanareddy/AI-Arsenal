---
id: whale
name: Whale
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Go terminal coding agent for DeepSeek with a claimed 98% prompt cache hit rate and JavaScript multi-agent workflows"
github_url: "https://github.com/usewhale/Whale"
license: MIT
primary_language: Go
tags: [code-gen, llm, caching, orchestration]
maturity: beta
cost_model: open-source
github_stars: 930
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-08-11"
docs_url: "https://github.com/usewhale/Whale/blob/main/docs/configuration.en.md"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Optimises the DeepSeek prefix cache hard and adds scriptable multi-agent workflows, which is the combination the other DeepSeek CLIs split between them."
best_for:
  - "You want a DeepSeek coding agent whose cache-hit rate stays high enough that a long session costs pennies rather than dollars."
  - "You want multi-agent orchestration you write yourself, because dynamic workflows are JavaScript files that fan out parallel agents and synthesise a result."
  - "You already have Claude Code workflow scripts and you want them to keep working, because the workflow format is claimed to be compatible."
avoid_if:
  - "You need dynamic workflows on by default, because the feature ships disabled and must be turned on in the TUI or in .whale/config.local.toml."
  - "You need multi-provider support, because the tool is DeepSeek-native by design and describes itself as not a generic multi-model wrapper."
  - "You need Windows ARM, where the PowerShell installer is the documented path and Windows support starts at Windows 10 or Server 2016."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language (Go), topics and issue count came from the GitHub API. Install commands, workflow API (agent/parallel), disabled-by-default flag, config keys and the 98% cache claim are read from the official README; the cache figure was not independently measured."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Whale is a Go CLI coding agent built specifically around DeepSeek, and its headline claim is a prompt cache hit rate of roughly 98%, which it argues turns DeepSeek's pricing into per-session pennies. It is distributed through npm (@usewhale/whale), Homebrew, a shell installer and a PowerShell installer, and ships a TUI plus a setup flow for the API key. Beyond the core loop it offers Dynamic Workflows: JavaScript files under .whale/workflows/ that call an agent() function inside parallel() to fan out research, run multi-perspective review or build pipelines, with the result returned from the script. MCP support covers the ecosystem of existing MCP servers, and skills and plugins extend the toolset. Workflows are disabled by default and enabled via /config or the config file.

## Why it's in the Arsenal

The interesting problem is that DeepSeek's cost advantage evaporates if your harness thrashes the prompt prefix. Whale's answer is to hold the hit rate near 98% so the cheap tier applies nearly always, and then to spend the savings on structure rather than more tokens: fan-out research and adversarial validation are exactly the workloads where more tokens is the point. The tradeoff is a provider-locked tool with a feature that ships off, and the 98% figure is the vendor's own measurement on their own workflow.

## Architecture

The Go binary manages the request loop and the prompt construction that keeps the DeepSeek prefix stable, and the TUI renders the session. Dynamic Workflows are JavaScript modules evaluated in the runtime: a workflow file calls agent(prompt) to issue a request and wraps calls in parallel([...]) to fan out, then returns a synthesised result, so orchestration is ordinary code rather than a config graph. Config lives in a TOML file, with .whale/config.local.toml for local overrides, and /config toggles experimental features such as workflows. MCP servers register tools into the same tool surface, and skills and plugins layer on top of the built-in file, shell, git and web tools.

## Ecosystem Position

Whale is a direct alternative to Claude Code and to the sibling DeepSeek agents in content/projects/agent-systems, and it is the only one here that adds a programmable workflow layer: dao-code and DeepSeek-Reasonix optimise cost differently and neither offers scriptable fan-out. Compared with content/projects/frameworks entries such as LangGraph or CrewAI, workflows are the agent API here, but they orchestrate Whale's own agent rather than constructing agents from primitives. It overlaps with content/projects/inference-engines and foundation-models only in that it consumes DeepSeek as a service; no local model path is documented. The MCP and skills surface matches the rest of the phase, which is where you would look for the extension mechanism.

## Getting Started

Install on any of the documented platforms, set the key and launch the TUI:

```bash
npm install -g @usewhale/whale
# or: brew install usewhale/tap/whale
whale setup
whale
```

To enable workflows, run /config in the TUI or set `[workflows] enabled = true` in .whale/config.local.toml.

## Key Use Cases

1. Cheap long sessions: work in DeepSeek's 1M-token context all day without the cache hit rate decaying as history accumulates.
2. Fan-out research and review: write a workflow that runs several agents in parallel on different angles and synthesises a single answer.
3. Adversarial validation: have one agent produce a change and another try to break it, orchestrated from a short JavaScript file.

## Strengths

- Very high claimed prompt cache hit rate (about 98%), which is the whole cost argument and is stated plainly rather than buried.
- Dynamic Workflows give real multi-agent orchestration in a small JavaScript file, with parallel() and agent() as the only primitives you need.
- Workflow scripts written for Claude Code reportedly run unchanged, which lowers migration cost.
- Distributed four ways (npm, Homebrew, curl script, PowerShell) with a TUI and a config file rather than hidden state.
- MCP, skills and plugins cover the extension surface most users expect.

## Limitations

The 98% figure is the project's own measurement of its own preferred workflow on its own preferred model; on a different codebase, a different system prompt or a shorter session the number will be lower, and there is no independent evaluation. DeepSeek-native by construction, so there is no provider fallback and no local model path, which makes the tool hostage to one vendor's availability and pricing. Dynamic Workflows ship disabled, so a first-time user may not discover the feature that differentiates it. JavaScript execution inside the agent runtime is a meaningful trust decision, since a workflow can issue arbitrary tool calls. With roughly 930 stars, 21 open issues and last activity around August 2026, the project is young and outside battle-testing.

## Relation to the Arsenal

This is the workflow-enabled DeepSeek agent in content/projects/agent-systems, and the natural third entry alongside dao-code and DeepSeek-Reasonix when comparing cache-stability strategies: dao-code uses forks for memory and reflection, Reasonix uses checkpoints for safe long runs, Whale adds a programmable orchestration layer. Its scriptable workflows are the closest thing in this phase to what content/projects/frameworks gives you (programmatic agent composition), though here you script Whale's agent rather than build one. For model choice it sits with content/projects/foundation-models, and for extension the MCP and skill surface matches the rest of the phase.

## Resources

- [GitHub — usewhale/Whale](https://github.com/usewhale/Whale)
- [npm — @usewhale/whale](https://www.npmjs.com/package/@usewhale/whale)
- [Workflow documentation — docs/workflows.en.md](https://github.com/usewhale/Whale/blob/main/docs/workflows.en.md)

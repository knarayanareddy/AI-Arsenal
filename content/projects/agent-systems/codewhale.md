---
id: codewhale
name: Codewhale
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Rust terminal agent that reads a repo, edits files and runs commands on hosted or local models, with fleet mode for multi-agent work"
github_url: "https://github.com/Hmbown/Codewhale"
license: MIT
primary_language: Rust
tags: [code-gen, inference, agents]
maturity: beta
cost_model: open-source
github_stars: 41037
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://github.com/Hmbown/Codewhale/blob/main/docs/README.md"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "One native binary covers terminal, bundled web client and desktop, with explicit approval modes and no lock-in to a single model vendor."
best_for:
  - "You want a single fast native binary for coding work and you dislike Electron shells that start slowly or hold a lot of resident memory."
  - "You split a large job across several roles and want to hand different parts to agents running on different models, coordinating them as a fleet rather than one long session."
  - "You need the same agent to run headlessly in CI, because codewhale exec takes a task string and returns results without an interactive TUI."
avoid_if:
  - "You are on Windows and want a one-line installer, because macOS and Linux use the install script while Windows needs a manual download from GitHub Releases."
  - "You need a guaranteed-stable API contract, because the changelog publishes an unreleased candidate section whose changes are not in any download yet."
  - "You want a project with no lineage to a model vendor's tooling, because the README notes it began as deepseek-tui and still preserves that configuration and session compatibility."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language, topics and issue count came from the GitHub API. Install commands, permission modes, runtime architecture, provider options and packaging channels are read from the official README and docs; no agent run was performed here."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Codewhale is a Rust CLI whose terminal and graphical clients both connect to a Codewhale Runtime process that hosts the agent loop and its tools. It supports hosted providers plus local models through Ollama, vLLM or SGLang, auto-detects a running Ollama chat model on first launch, and offers Ask, Auto-Review and Full Access permission modes via Shift+Tab. Longer work is organised with saved sessions, a durable /goal, review-before-run workflows and fleet-style multi-agent coordination. A Computer Use plugin in the current source adds tools for observing and interacting with other applications, and packaging spans crates.io, npm, Docker, Nix, Scoop and Android/Termux.

## Why it's in the Arsenal

The recurring decision is how much autonomy to grant and how to see what happened. Most coding agents make that a binary toggle buried in settings; Codewhale makes it a mode you switch mid-session, and pairs it with /undo and /restore so a runaway edit is recoverable without git archaeology. The second decision it defers is model choice: the README's stance is that unknown model prices stay unknown rather than being reported as free, which is a small honesty signal about how it treats provider metadata.

## Architecture

A client process (the TUI, codewhale web, or codewhale exec) speaks to the Codewhale Runtime, which owns the agent loop, tool dispatch and session state, so permissions and file changes behave identically whichever client you use. Tools cover repository reads, file edits, command execution and inspection of results; plan mode restricts the agent to exploration with no writes or shell, while work mode enables changes. Agent roles live as readable files in project or personal settings, and MCP servers, skills and hooks extend the runtime. Computer Use is a bundled plugin under crates/tui/plugins/computer-use that adds observation and interaction tools for other applications.

## Ecosystem Position

Codewhale competes with the other terminal coding agents in content/projects/agent-systems, particularly Zero, Whale and DeepSeek-Reasonix, but is the one here that treats multi-model fleets and permission modes as first-class rather than incidental. Compared with Claude Code, which is the closest functional analogue, this is provider-neutral and MIT with no account requirement; compared with content/projects/frameworks entries such as LangGraph or CrewAI, it ships an opinionated runtime instead of a library, and it consumes whatever the inference-engines phase serves, whether that is Ollama, vLLM or SGLang.

## Getting Started

macOS and Linux install the published GitHub release; the first run lands straight on the composer with no model connected until you add one:

```bash
curl -fsSL https://codewhale.net/install.sh | sh
"$HOME/.local/bin/codewhale"
```

Then run /provider (or press F3) to add a hosted key or pick a local runtime; codewhale exec "fix the failing tests" runs a task without the TUI.

## Key Use Cases

1. Fleet split for a large migration: assign groundwork, implementation and review to agents on different models and watch them coordinate through the same runtime.
2. CI-friendly fix runs: invoke codewhale exec from a pipeline to repair a failing test and capture the diff as output.
3. Local-only experimentation: point it at Ollama, vLLM or SGLang and keep every token on hardware you control.

## Strengths

- Native Rust build with a TUI, a bundled local web client and a desktop app path from one runtime, so behaviour does not drift between clients.
- Explicit Ask / Auto-Review / Full Access modes plus /undo and /restore, which makes an over-eager run cheap to reverse.
- Provider-neutral including self-hosted Ollama, vLLM and SGLang, so you can switch cost tiers per task.
- Distributed through crates.io, npm, Docker, Nix, Scoop and Termux, with shell completions for five shells.

## Limitations

Windows users get a manual download rather than the scripted install, and the desktop app lives in a separate repository while the hosted app is being rebuilt to match, so the product surface is mid-transition. The changelog's unreleased-candidate section makes it hard to tell which documented features exist in your installed build. Computer Use still requires OS permissions and platform support that the README does not enumerate, and it is opt-in. Fleet coordination adds overhead on small tasks, where a single agent with a clear goal finishes faster. With roughly 233 open issues and rapid weekly releases, expect API churn between versions.

## Relation to the Arsenal

This is a terminal-first coding agent in content/projects/agent-systems, and it is the entry to read alongside Zero and DeepSeek-Reasonix when you are choosing a provider-neutral Rust or Go alternative to Claude Code. The local-model paths point at content/projects/inference-engines, where Ollama, vLLM and SGLang are the backends you would run yourself. Where content/projects/frameworks entries give you an agent you orchestrate in code, Codewhale gives you the runtime as a product; and for the MCP extension surface it shares, the agent-systems phase also holds the harness-focused entries that consume the same protocol.

## Resources

- [GitHub — Hmbown/Codewhale](https://github.com/Hmbown/Codewhale)
- [Install and PATH help — docs/INSTALL.md](https://github.com/Hmbown/Codewhale/blob/main/docs/INSTALL.md)
- [crates.io — codewhale-cli](https://crates.io/crates/codewhale-cli)

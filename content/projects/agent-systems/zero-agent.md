---
id: zero-agent
name: zero
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Go terminal coding agent supporting 25+ providers, scriptable exec mode, permission policies and durable local sessions"
github_url: "https://github.com/Gitlawb/zero"
license: MIT
primary_language: Go
tags: [code-gen, inference, security]
maturity: beta
cost_model: open-source
github_stars: 1683
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://github.com/Gitlawb/zero/blob/main/docs/INSTALL.md"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Provider-neutral by design, with a real sandbox on Linux and an exec mode that fits CI, so you can change models without changing tooling."
best_for:
  - "You want one CLI across OpenAI, Anthropic, Gemini, Groq, OpenRouter, DeepSeek, Mistral, xAI, Qwen, Kimi, GitHub Models, Ollama or LM Studio."
  - "You need the agent in CI or a script, because zero exec supports text, JSON and stream-JSON I/O, isolated worktrees, spec-first runs and meaningful exit codes."
  - "You want Linux-native sandboxing, because a separate sandbox helper binary plus seccomp gives process containment that most agent CLIs skip."
avoid_if:
  - "You need native ARM64 Windows, because the x64 build runs under emulation there."
  - "You want a Graphical interface, because this is a terminal tool with a TUI rather than a desktop application."
  - "You need a guaranteed-stable release, because source builds require Go 1.26.6+ and the installer depends on published GitHub Release assets."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language (Go), topics and issue count came from the GitHub API. Install commands, provider list, permission/sandbox model, exec flags and Go version requirement are read from the official README and docs; the binary was not installed."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Zero is a Go coding agent for the terminal that inspects a repository, edits files, runs commands, uses browser and terminal control helpers, and keeps durable local sessions. Its distinguishing feature is provider breadth: 25+ providers including first-party OpenAI and Anthropic, Gemini, Groq, OpenRouter, DeepSeek, Mistral, xAI, Qwen, Kimi, GitHub Models, and local runtimes through Ollama and LM Studio, plus anything OpenAI- or Anthropic-compatible. Control is explicit: file writes, shell commands, network access and out-of-workspace writes all pass through a permission and sandbox policy, and the Linux build compiles a sandbox helper plus an optional seccomp wrapper. Extensibility comes from MCP servers, skills, plugins, hooks and specialist subagents, and sessions are stored on disk, searchable, resumable and never uploaded as telemetry.

## Why it's in the Arsenal

The engineering decision is that model choice and tooling should be independent. Most coding agents are effectively coupled to one vendor's pricing and availability; Zero's design treats the provider as a config value and invests the engineering budget in control instead: a permission stack that covers network and out-of-workspace writes, worktree isolation for exec, and sessions that stay local. The cost is breadth over depth, and a real risk in that many providers means many provider-specific edge cases.

## Architecture

The Go binary implements the agent loop and dispatches tools; permission and sandbox policy is evaluated before any file write, shell command, network access or out-of-workspace write, which is a stricter gate than most tools apply. On Linux an extra zero-linux-sandbox binary (and optionally zero-seccomp) provides native containment, compiled from source and placed next to the main binary on PATH; macOS needs no helper and Windows can reuse the main executable. The TUI carries model and provider pickers, image input, slash commands, live plan and tool rendering, scrollback, themes and resume/fork, while zero exec bypasses the TUI for scripting with typed output, isolated worktrees and exit codes. Sessions persist on disk; MCP servers, skills, plugins, hooks and subagents extend the tool surface.

## Ecosystem Position

Zero competes directly with Claude Code and with the provider-neutral entries in content/projects/agent-systems such as Codewhale, and it is the most explicitly multi-provider of the set: where Codewhale lists Ollama, vLLM and SGLang, Zero names 25+ endpoints. Compared with content/projects/frameworks entries such as LangChain or CrewAI it is an application rather than a library, and compared with content/projects/inference-engines it consumes those runtimes rather than reimplementing them. The Linux sandbox plus worktree-isolated exec is closer to a CI agent than most entries here, which puts it alongside the devops tooling in other phases rather than purely beside the coding CLIs.

## Getting Started

npm, an install script, or a source build (Go 1.26.6+). The npm wrapper fetches a platform build as an optional dependency:

```bash
npm install -g @gitlawb/zero
zero
zero exec "fix the failing test in ./pkg"
zero exec --output-format stream-json < turns.jsonl
```

For native Linux sandboxing from source, also build the helper and seccomp wrapper and place both next to zero on PATH.

## Key Use Cases

1. Model switching without tool switching: move a task from a frontier API to a local Ollama model mid-project and keep the same session, skills and MCP servers.
2. CI integration: run zero exec in a pipeline with stream-JSON output, an isolated worktree, and exit codes you can branch on.
3. Contained local execution: let the agent write and run code on Linux with the sandbox helper enforcing process and network boundaries.

## Strengths

- 25+ providers plus any OpenAI- or Anthropic-compatible endpoint, so the model is a config value rather than a commitment.
- A real Linux sandbox helper and optional seccomp wrapper, which is stronger than a permission dialog alone.
- Exec mode designed for CI: text/JSON/stream-JSON output, isolated worktrees, spec-first runs and meaningful exit codes.
- Sessions stored locally, searchable and resumable, with no telemetry upload, and a clean uninstall path.

## Limitations

Broad provider support means broad surface for provider-specific failures: an edge case in one vendor's tool-call format can cost you time debugging Zero rather than your agent. Windows on ARM runs the x64 build under emulation, so it is not a first-class target. Source builds need Go 1.26.6+, which is a specific and fairly recent toolchain requirement, and the installers depend on published GitHub Release assets existing. The sandbox helper is a separate binary you must build and place on PATH, and macOS users get weaker isolation than Linux users as a result. It is a terminal tool with no GUI, and at roughly 1,700 stars with 110 open issues it is young and actively changing.

## Relation to the Arsenal

This is the provider-neutral reference point in content/projects/agent-systems: read it against Codewhale (also neutral, also Rust, also multi-model) and against the DeepSeek-locked entries dao-code, Whale and DeepSeek-Reasonix, which make the opposite bet. Its local-model support points at content/projects/inference-engines, where Ollama and the vLLM/SGLang tier are what you would actually run behind it. For CI and pipeline usage it overlaps with the workflow tooling in other phases, and where ECC in this phase installs discipline into a host, Zero ships the whole loop with the discipline built in as permission and sandbox policy.

## Resources

- [GitHub — Gitlawb/zero](https://github.com/Gitlawb/zero)
- [Install guide — docs/INSTALL.md](https://github.com/Gitlawb/zero/blob/main/docs/INSTALL.md)
- [npm packaging notes — docs/NPM_PACKAGING.md](https://github.com/Gitlawb/zero/blob/main/docs/NPM_PACKAGING.md)

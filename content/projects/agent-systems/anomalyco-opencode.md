---
id: anomalyco-opencode
name: "opencode"
version_tracked: null
artifact_type: tool
category: agents
subcategory: coding-agents
description: "MIT-licensed terminal coding agent in TypeScript that edits files, runs shell commands, and exposes a client/server session protocol"
github_url: "https://github.com/anomalyco/opencode"
license: "MIT"
primary_language: TypeScript
org_or_maintainer: "anomalyco"
tags: [code-gen, pytorch, tool-use, agents]
maturity: beta
cost_model: open-source
github_stars: 210538
github_stars_last_30d: 0
trending_score: 43
last_commit: "2026-09-28"
docs_url: "https://opencode.ai"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose, reasoning]
relation_to_stack: [deploy-as-is]
health_signals: [actively-maintained, community-driven]
ecosystem_role:
  - "Terminal-first open-source coding agent: a TypeScript harness that drives an LLM through edit/run/test cycles inside a real shell rather than a chat transcript."
best_for:
  - "You are on SSH in an unfamiliar repository and need an agent that runs the failing test command, reads the stack trace, and patches until the suite is green."
  - "You want model choice to be a config value rather than a vendor account, so you can point the same harness at a local vLLM or llama.cpp endpoint on your own hardware."
  - "You are standardizing agent-driven fixes across a team and want a self-hosted, MIT-licensed harness whose session log is reviewable data instead of a chat scrollback."
avoid_if:
  - "You need a hosted product with managed sandboxing, because opencode runs commands with the permissions of your own shell session on your machine."
  - "Your agents must be reproducible and replayable in CI, since the editing loop is designed for an interactive terminal rather than a locked-down runner."
  - "You need a non-coding agent such as a research, browser, or data agent, because the tool surface and prompts are built around repository edit/run/test cycles."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 210538 stars, MIT license, TypeScript primary language, last commit 2026-09-28, homepage opencode.ai. Repo topics list was empty. All capability claims (LSP-aware editing, client/server session API, provider list) come from the official README and docs, not hands-on verification."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/anomalyco/opencode", "date": "2026-09-28", "description": "210,538 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

opencode is a terminal-resident coding agent whose core is a TypeScript/Bun client-server pair: a client renders the session while a server owns the tool loop, and the same agent core can be driven from a TUI, a desktop app, or an IDE panel. The tool surface is deliberately small and repo-shaped - read and write files, search, list a directory, and run a shell command - and file edits go through an LSP layer so a change respects the language server's view of the file rather than a blind overwrite. Because the backend is a client-server protocol, sessions serialize as data and the model provider is a configuration choice, so the same install can talk to an Anthropic-compatible, OpenAI-compatible, or local OpenAI-style endpoint.

## Why it's in the Arsenal

The recurring decision opencode resolves is where an agent's authority lives. Most coding assistants want you to approve a diff in an IDE; a terminal agent instead needs a sandbox policy, a permission model, and a transcript of every command it ran. opencode makes those three things first-class in one place: commands execute in your real shell with your real credentials and your real environment variables, the session is a portable record, and model selection is a config edit. That combination is what makes it fit CI-adjacent workflows, remote shells, and bring-your-own-endpoint deployments, and it is the reason engineers pick it over a hosted assistant that keeps the loop inside someone else's sandbox.

## Architecture

The agent loop is a typed tool-call cycle: the model emits a tool invocation, the server validates it against the registered tool schemas, executes it, and appends the result as a new message in the session. An LSP client tracks open documents so edits are written against a known-good buffer state and diagnostics can be pulled back into the conversation as evidence that a change compiled. The server exposes an HTTP/WebSocket session API so multiple clients can attach to the same run, and permission-gated execution is expressed as tool-level policy rather than as a prompt instruction, which keeps enforcement outside the model's discretion. Sessions persist as structured messages, so resuming or handing a session to a teammate does not mean re-describing the work.

## Ecosystem Position

opencode competes with Aider, Claude Code, Goose, and Cline in the terminal coding-agent niche, and compared to those tools it sits at the permissive end of the permission spectrum rather than the locked-down end. It consumes Model Context Protocol servers the same way Goose does, so an MCP tool written for one is available in the other, and it overlaps with the Aider convention of presenting changes as reviewable diffs. It is an alternative to hand-rolling a shell-driven edit loop in Python, and it is not a general agent framework: for multi-step browser or data work, the broader orchestration frameworks in content/projects/agent-systems/ fit better.

## Getting Started

Install the package and point it at a provider, then start a session in the repo you want it to work on:

```bash
npm install -g opencode-ai
export ANTHROPIC_API_KEY=sk-...
cd ~/src/my-service
opencode
```

The `opencode` TUI opens an interactive session; `opencode serve` runs the same agent core as a local server for editor or automation clients.

## Key Use Cases

1. Take over a failing test suite: point the agent at a red CI job and have it run the test locally, read the trace, and land a minimal fix.
2. Migrate a codebase mechanically, such as moving from one HTTP client to another across 200 call sites, with a diff review per file.
3. Run an unattended loop against a self-hosted model endpoint on an internal GPU box, so inference cost is a cluster you control rather than a per-seat subscription.

## Strengths

- Bring-your-own-model: any Anthropic-style or OpenAI-style endpoint, including a local server, so the same harness works offline or air-gapped.
- Session log is structured data, which makes an agent run reviewable, shareable, and resumable rather than a scrollback you have to screenshot.
- LSP-aware editing, so changes respect the language server's buffer rather than replacing files wholesale.
- MIT license and a small TypeScript codebase, which makes forking the agent loop a realistic option instead of a legal exercise.

## Limitations

Commands run unsandboxed with the permissions of your interactive shell, so an agent with write and execute access is a genuine blast radius on a developer laptop; the trust boundary is you. There is no hosted execution tier, so there is no per-tenant isolation, no cold-started container per session, and no managed cost ceiling. Binary distribution and shell completion differ across platforms, and Windows support is the least-exercised path. The model-quality ceiling is whatever you attach: with a weak local model the edit loop will thrash, and the harness does nothing to make a 3B model's repository reasoning reliable.

## Relation to the Arsenal

The agent-system phase counterpart to the language work in content/projects/foundation-models/ and the fine-tuning recipes in content/projects/training-and-alignment/. For the same job with a stricter permission model, the Rust-based goose entry in this folder is the closer comparison; for browser-driven work, pair it with the Lightpanda or browser-use entries. Because the harness is provider-agnostic, the serving engines listed under content/projects/inference-engines/ are the natural backing models.

## Resources

- [GitHub — anomalyco/opencode](https://github.com/anomalyco/opencode)
- [Project site and install instructions](https://opencode.ai)
- [MCP servers directory](https://github.com/modelcontextprotocol/servers)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (210,538 stars, last commit 2026-09-28, license MIT, verified via GitHub API on 2026-09-28)*

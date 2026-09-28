---
id: atomic-agent
name: atomic-agent
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "TypeScript terminal agent whose control loop runs on a TurboQuant-patched llama.cpp, with SQLite FTS5 memory and Playwright browser control"
github_url: "https://github.com/AtomicBot-ai/atomic-agent"
license: MIT
primary_language: TypeScript
tags: [local, inference, memory]
maturity: alpha
cost_model: open-source
github_stars: 2515
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://github.com/AtomicBot-ai/atomic-agent#readme"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Keeps the entire loop, state and inference local, so a small quantised model stays useful for long multi-step work with no token bill."
best_for:
  - "You want an agent that runs entirely on your own hardware with no API key, and you accept that a quantised 7-8B-class model will be less capable than a frontier one."
  - "You are evaluating whether local models can hold up on long agentic tasks and you want a GAIA-style benchmark number and a TUI to watch the run happen."
  - "You already use Hermes, OpenClaw, Claude Code or Codex and want to migrate skills, memory, MCP servers, sessions and cron jobs across with a dry-run preview first."
avoid_if:
  - "You need production-grade stability, because the README labels this a developer preview where APIs, commands, config and behaviour are still moving and advises pinning a release."
  - "You are on Windows ARM or an unsupported Linux target, because published binaries cover macOS Apple Silicon, Linux x64/arm64 and Windows x64 only."
  - "You need a hosted-scale multi-agent platform, because this is a single-agent desktop tool with a Tauri sidecar rather than a scheduler or orchestrator."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language, topics and issue count came from the GitHub API. Install commands, TurboQuant and GAIA figures, dependency list (Playwright, better-sqlite3, grammY, pdf.js, Tauri) and import targets are read from the official README and acknowledgements; the GAIA score was not reproduced here."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Atomic Agent runs its whole control loop and state locally. The distinctive piece is inference: the project maintains TurboQuant patches on top of llama.cpp, which the README credits with 30-50% higher throughput on small local models, and it drives GGUF weights through that runtime with bundled GBNF grammars so small models emit structured tool calls reliably. Around that sits Playwright for browser driving, better-sqlite3 with FTS5 for local memory and state, the MCP TypeScript SDK for external tools, an Ink and React TUI, a Telegram channel via grammY, pdf.js for document extraction, and a bundled ripgrep. It reports a GAIA Level 1 score of 69.8%.

## Why it's in the Arsenal

The decision it removes is whether local models are usable for agent work at all. Rather than arguing about model quality in the abstract, this project attacks the plumbing: quantised decode speed, grammar-constrained tool output, and FTS5-backed recall so a small model has cheap, reliable retrieval instead of a huge context. The result is that token cost is structurally zero, which is a different trade from minimising it. What you give up is frontier-level reasoning, and the README's own preview warning is the honest summary.

## Architecture

The agent loop issues tool calls through an Ink/React TUI while a bundled llama.cpp server hosts the model; GBNF grammar files in the grammars/ directory constrain generation so tool arguments parse even from small quantisations. Local memory, sessions, tasks and traces live in an embedded SQLite database using the FTS5 extension for keyword retrieval, and ripgrep ships alongside for fast file search. Browser work runs through Playwright, external capability arrives over MCP, and the same binary can be embedded in another application either over HTTP or as a Tauri sidecar, which is how the desktop shell reuses the loop without a second implementation.

## Ecosystem Position

Atomic Agent overlaps with Ollama and LM Studio at the inference layer but, unlike a plain model server, owns the agent loop, memory store and approval model, so it competes with terminal coding agents such as Codewhale and Zero while diverging sharply on model choice: those are provider-neutral, this one is llama.cpp-first. It is an alternative to cloud-only agents when data cannot leave the machine, and it complements content/projects/agent-systems entries by being embeddable, while the agent frameworks phase (LangGraph, CrewAI) stays at the programmatic layer with no bundled local runtime. Sibling entries in content/projects/inference-engines such as llama-cpp cover the serving side if you want to build your own loop instead.

## Getting Started

One installer line per platform; the shell alias atag is installed next to the binary:

```bash
curl -fsSL https://atomicagent.io/install | sh
atomic-agent
```

Windows PowerShell uses `irm https://atomicagent.io/install.ps1 | iex`. The installer verifies the archive checksum and drops grammars, native prebuilds and ripgrep; pin a release with `atomic-agent update --version <tag>` if you need a stable integration point.

## Key Use Cases

1. Fully offline desktop assistance: browse, read and edit files, and run approved shell commands with no outbound model traffic at all.
2. Harness migration: import skills, memory, MCP servers, sessions, cron jobs and optionally provider keys from Hermes, OpenClaw, Claude Code, Codex or Pi after reviewing a dry-run preview.
3. Embedding the loop in a desktop product: run the agent as a Tauri sidecar or over HTTP inside an application you already ship.
4. Local-model benchmarking: measure GAIA-style task completion on quantised weights to decide whether a local model is viable for your workload.

## Strengths

- TurboQuant llama.cpp patches claimed at 30-50% throughput gain on small models, which directly extends how much work a quantised model can finish per hour.
- GBNF grammars keep tool-call JSON parseable from models too small to be reliable at it unaided.
- SQLite FTS5 gives local keyword recall with no embedding service or vector database to operate.
- A single self-updating binary plus a documented import path from six other agent harnesses.

## Limitations

The README is explicit that this is a developer preview with moving APIs, config and behaviour, so automation built on it needs pinned releases. Capability is bounded by what a quantised local model can do; a 69.8% GAIA Level 1 figure is respectable but well below a frontier model on the same benchmark. Builds are limited to macOS Apple Silicon, Linux x64/arm64 and Windows x64, and only the installed binary can self-update, so a git checkout updates through git. Bundled ripgrep and grammars add platform-specific surface area, and the TurboQuant llama.cpp fork is a dependency you would be tracking rather than upstream llama.cpp.

## Relation to the Arsenal

This is the local-inference-first member of content/projects/agent-systems, and the natural contrast with the provider-neutral terminal agents in the same phase such as Zero and Codewhale. Its model layer belongs with entries in content/projects/inference-engines covering llama-cpp, and if you want to serve a quantised model yourself for other workloads, that phase also holds vLLM and SGLang for the throughput-oriented side. Where content/projects/frameworks gives you an agent you call from Python, this gives you a loop you can install as a binary or embed as a sidecar.

## Resources

- [GitHub — AtomicBot-ai/atomic-agent](https://github.com/AtomicBot-ai/atomic-agent)
- [Project site and install scripts — atomicagent.io](https://atomicagent.io)
- [Memory internals and prompt anatomy in the repo docs](https://github.com/AtomicBot-ai/atomic-agent/tree/main/docs)

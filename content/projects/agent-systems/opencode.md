---
id: opencode
name: "opencode"
version_tracked: null
artifact_type: tool
category: code-generation
subcategory: coding-agents
description: "Terminal coding agent with a full TUI, provider-agnostic model access, and client/server split"
github_url: "https://github.com/anomalyco/opencode"
license: "MIT"
primary_language: TypeScript
org_or_maintainer: "Anomaly"
tags: [code-gen, agents, tool-use, streaming]
maturity: production
cost_model: open-source
github_stars: 203399
github_stars_last_30d: 0
trending_score: 92
last_commit: "2026-09-03"
docs_url: "https://github.com/anomalyco/opencode#readme"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [language, reasoning]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [actively-maintained, community-driven, org-backed]
ecosystem_role:
  - "The most-starred open terminal coding agent: a TypeScript client/server pair where the agent loop runs in a server process and the terminal UI is one of several clients that can attach to it."
best_for:
  - "You live in a terminal and want an editing agent that streams diffs, runs your test suite, and rolls back failed edits without leaving the shell or opening an IDE"
  - "You want to standardise a team on one open coding agent while keeping model choice open, since bring-your-own-key access spans hosted APIs and local runtimes"
avoid_if:
  - "Your engineers work inside an IDE and expect inline completions and gutter affordances — a TUI agent is a different interaction surface, not a drop-in for editor integration"
  - "You need the agent to operate under a reviewed, fixed prompt-and-tool contract; the default configuration is tuned for general software work, not for a constrained tool budget"
upstream_dependencies: []
downstream_consumers: []
alternatives: [openhands, aider, cline]
integrates_with: [mcp-servers]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Stars (203,399), forks (26,532), licence (MIT), primary language (TypeScript), and last commit (2026-09-03) verified via the GitHub API on 2026-09-03. The canonical repository resolves to anomalyco/opencode; earlier references to sst/opencode redirect there after the project moved organisations. Architecture claims derive from the README and repository layout, not hands-on verification."
added_date: "2026-09-03"
last_reviewed: "2026-09-03"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/anomalyco/opencode", "date": "2026-09-03", "description": "203,399 stars on GitHub as of 2026-09-03 (GitHub API), the highest-starred open terminal coding agent surveyed"}]
featured: true
status: active
---

## Overview

opencode is an open-source coding agent whose primary surface is a terminal UI rather than an editor extension. Its defining structural decision is the client/server split: the agent loop, tool execution, and session state live in a server process, and the TUI is a client that attaches to it. That separation is what allows the same session to be driven from a terminal, scripted, or driven from another frontend without reimplementing the reasoning loop. Written in TypeScript and distributed under MIT, it accumulated roughly 203,400 stars and 26,500 forks between its 2025-04-30 creation and 2026-09-03.

## Why it's in the Arsenal

The catalogue carries several coding agents, but almost all of them assume an IDE host or a headless batch invocation. opencode is the reference for the third shape: an interactive agent that owns its own full-screen interface and keeps session state in a server that outlives any single client connection. That process model matters when an agent run spans a long test suite or a multi-file refactor and you want to detach, inspect, and reattach. It is also the useful comparison point for anyone evaluating whether to build a terminal agent on top of an existing loop rather than writing their own.

## Architecture

The server process owns the conversation graph: it holds message history, plans tool calls, and executes them against a sandboxed view of the working tree, streaming partial output back over a local transport. File edits are applied as explicit diffs so a failed change can be reverted rather than leaving the tree dirty. Tool execution covers shell commands, file reads and writes, and searches, with the model deciding the sequence. Model access is bring-your-own-key across hosted APIs and local runtimes, and additional tools can be attached through Model Context Protocol servers, which keeps capability growth outside the core. The TUI renders the stream, the diff view, and session history as a client of that server.

## Ecosystem Position

It competes most directly with [Aider](../../tools/dx-and-tooling/aider.md), which shares the terminal-first, BYOK stance but runs as a single process without a persistent server to detach from. Against [Cline](../../tools/dx-and-tooling/cline.md) and [OpenHands](../frameworks/openhands.md) it trades IDE integration and sandboxed container execution for a lighter local footprint. It sits below [Claude Code](../../tools/dx-and-tooling/claude-code.md) in licensing terms rather than capability terms: both are terminal agents, one is open source and provider-agnostic, the other is a proprietary client bound to one provider. Its MCP support means it complements the reference server implementations rather than duplicating their tool surface.

## Getting Started

```bash
npm install -g opencode-ai
cd your-repository
opencode            # starts the server and attaches the TUI
```

Model credentials are supplied through environment variables, so the same profile works across providers without editing a config per repository.

## Key Use Cases

1. **Interactive refactors in the terminal** — streaming diffs and test output for multi-file changes without switching to an editor.
2. **Long-running sessions** — the server keeps state, so a client can detach during a slow test run and reattach to inspect results.
3. **CI-adjacent scripting** — driving the agent loop from a script when a full-screen UI is not wanted.

## Strengths

- The client/server boundary is the real contribution: session state is not tied to the lifetime of the interface, which is unusual among terminal agents.
- Diff-based editing with explicit rollback keeps the working tree recoverable after a failed change.
- MIT licensing with provider-agnostic keys avoids both licence lock-in and provider lock-in at the same time.

## Limitations

- A full-screen TUI does not compose with editor workflows; teams that live in an IDE will feel the context switch.
- Running shell commands with the invoking user's privileges means the security boundary is the operator's machine, not a container.
- Very fast release cadence means configuration keys and the client transport have shifted between versions, so pinning matters for team rollouts.

## Relation to the Arsenal

Catalogued as an agent-system because it is a deployable, self-contained runtime. For the library you would embed instead, see [Frameworks](../frameworks/_index.md); for tool-level alternatives in the developer-tooling lane, see [tools/dx-and-tooling](../../tools/dx-and-tooling/_index.md).

## Resources

- [GitHub](https://github.com/anomalyco/opencode)
- [README](https://github.com/anomalyco/opencode#readme)

---
*Checked 2026-09-03 via the GitHub API by @maintainer — enrichment_status: draft. 203,399 stars, 26,532 forks, MIT, TypeScript, last commit 2026-09-03.*

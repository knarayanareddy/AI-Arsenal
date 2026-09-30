---
id: mcp-servers
name: "MCP Reference Servers"
version_tracked: null
artifact_type: library
category: tooling
subcategory: libraries
description: "Reference implementations of Model Context Protocol servers that expose files, search, and APIs to agents"
github_url: "https://github.com/modelcontextprotocol/servers"
license: "Apache-2.0"
primary_language: TypeScript
org_or_maintainer: "Model Context Protocol project"
tags: [tool-use, agents, structured-output, security]
maturity: production
cost_model: open-source
github_stars: 90043
github_stars_last_30d: 0
trending_score: 84
last_commit: "2026-09-03"
docs_url: "https://github.com/modelcontextprotocol/servers#readme"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [general-purpose, language]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [actively-maintained, community-driven]
ecosystem_role:
  - "The canonical worked examples of the Model Context Protocol: one repository of small, single-purpose servers that an agent attaches to at runtime, each exposing a narrow tool surface over stdio or HTTP."
best_for:
  - "You are adding tool access to an agent and want a reviewed reference for the request/response shape, capability negotiation, and error handling a conforming server must implement"
  - "You need filesystem, fetch, or search capabilities attached to an agent today, without writing and maintaining a bespoke integration for each provider API"
avoid_if:
  - "You want one gateway that brokers many tools behind a single authorisation boundary — these are deliberately separate processes, each with its own credential scope and failure mode"
  - "Your threat model cannot tolerate a subprocess holding read access to the working tree, since the filesystem server inherits the invoking user's permissions"
upstream_dependencies: []
downstream_consumers: [opencode, claude-code]
alternatives: []
integrates_with: [opencode, claude-code, gemini-cli]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Stars (90,043), forks (11,546), language (TypeScript), last commit (2026-09-03) verified via the GitHub API on 2026-09-03. The API reports NOASSERTION because the repo documents a transition: Apache-2.0 for new code and specs, CC-BY-4.0 for docs, MIT for legacy."
added_date: "2026-09-03"
last_reviewed: "2026-09-03"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/modelcontextprotocol/servers", "date": "2026-09-03", "description": "90,043 stars on GitHub as of 2026-09-03 (GitHub API)"}]
featured: false
status: active
---

## Overview

This repository is the reference implementation set for the Model Context Protocol: a collection of small, independent servers that expose capabilities such as filesystem access, web fetching, memory, and third-party API calls to any agent that speaks the protocol. Each server is a separate process, typically launched over stdio by the client, and declares the tools, resources, and prompts it supports during capability negotiation. The protocol itself is specified elsewhere; what this repository supplies is conforming code you can read, run, and copy, plus the community-contributed servers that grew around it. It reached roughly 90,000 stars by 2026-09-03.

## Why it's in the Arsenal

MCP has become the de facto answer to "how does an agent reach a tool", and the catalogue documents several agents that consume it without documenting the server side. That asymmetry matters because the server is where the engineering risk lives: input validation, capability scoping, credential handling, and error semantics all happen there, not in the agent loop. Having the canonical implementations catalogued gives a reviewer something concrete to compare a third-party server against, and gives a builder a worked example of the handshake rather than only a specification.

## Architecture

A server is a process that speaks JSON-RPC over stdio or HTTP. On connect, client and server exchange capability declarations, after which the client may list tools, read resources, or invoke prompts. Each server implements a narrow slice: the filesystem server resolves and guards paths, the fetch server retrieves and converts remote documents, the memory server persists key-value state across sessions. Because they are separate processes, each has its own credential scope and its own failure domain — a crashing server does not take the agent with it. The reference servers are split between TypeScript and Python packages, and the protocol's transport layer keeps the tool contract identical across both.

## Ecosystem Position

These are complements to agents rather than alternatives to them: [opencode](../agent-systems/opencode.md), [Claude Code](../../tools/dx-and-tooling/claude-code.md), and [Gemini CLI](../../tools/dx-and-tooling/gemini-cli.md) all attach MCP servers instead of hard-coding tool implementations. The repository overlaps with gateway-style proxies such as [LiteLLM](../../tools/serving-and-deployment/litellm.md) only at the edges — LiteLLM brokers model calls, while these broker tool calls, and a deployment commonly runs both. It is not an agent framework: there is no loop, planner, or state machine here to compare against [LangGraph](./langgraph.md). The licensing split matters when vendoring: documentation is CC-BY-4.0 while code is Apache-2.0.

## Getting Started

```bash
npx @modelcontextprotocol/server-filesystem /path/to/allowed/dir
npx @modelcontextprotocol/server-fetch
```

Register the command in your agent's MCP configuration; the agent launches the server as a subprocess and negotiates capabilities on startup.

## Key Use Cases

1. **Grounding an agent in local files** — scoped read access to a directory without giving the model a shell.
2. **Attaching third-party APIs** — swapping a bespoke integration for a maintained server with a documented tool contract.
3. **Learning the protocol** — reading a conforming implementation before writing your own server.

## Strengths

- Narrow, single-purpose servers mean each one is small enough to audit before you grant it credentials.
- Process isolation gives a natural failure and permission boundary that an in-process tool plugin cannot offer.
- Being the reference implementation, the code tracks specification changes ahead of most third-party servers.

## Limitations

- The filesystem server inherits the invoking user's permissions, so path scoping is the only boundary between the model and the rest of the disk.
- A transition in licensing means a vendored copy can mix Apache-2.0, MIT, and CC-BY-4.0 material; the provenance of an older checkout is not uniform.
- Server sprawl is a real operational cost: every attached server is another process, another credential, and another version to track.

## Relation to the Arsenal

Catalogued as a framework-phase entry because these are libraries and processes that other systems build on rather than a system you deploy on its own. For the agents that consume them, see [Agent Systems](../agent-systems/_index.md); for model-call brokering rather than tool brokering, see [tools/serving-and-deployment](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub](https://github.com/modelcontextprotocol/servers)
- [README and server inventory](https://github.com/modelcontextprotocol/servers#readme)

---
*Facts pulled from the GitHub API on 2026-09-03 by @maintainer — enrichment_status: draft. 90,043 stars, 11,546 forks, TypeScript, last commit 2026-09-03. Licence recorded as Apache-2.0 for new contributions; the repository documents MIT legacy code and CC-BY-4.0 documentation.*
